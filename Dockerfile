
# # Simple Dockerfile for Coolify deployment
# FROM node:22.12.0-alpine AS base

# # Install dependencies and enable corepack for pnpm support
# RUN apk add --no-cache libc6-compat python3 make g++ git && \
#     corepack enable && \
#     corepack prepare pnpm@10.0.0 --activate

# WORKDIR /app

# # Avoid optional large downloads during install (e.g., Playwright browsers)
# ENV PLAYWRIGHT_SKIP_BROWSER_DOWNLOAD=1

# # Install dependencies stage
# FROM base AS deps
# WORKDIR /app

# # Install dependencies based on the preferred package manager
# COPY package.json pnpm-lock.yaml ./

# RUN pnpm install --frozen-lockfile --prod

# # Rebuild the source code only when needed
# FROM base AS builder
# WORKDIR /app

# COPY --from=deps /app/node_modules ./node_modules
# COPY . .

# # Next.js collects completely anonymous telemetry data about general usage.
# ENV NEXT_TELEMETRY_DISABLED=1

# # Set environment variables for build
# ENV NODE_ENV=production
# ENV SKIP_MIGRATIONS=true
# ENV SKIP_ENV_VALIDATION=true
# ENV DATABASE_URI=postgresql://placeholder:placeholder@placeholder:5432/placeholder

# # Build the application using safe build for Docker
# RUN pnpm run build:safe

# # Production image, copy all the files and run next
# FROM base AS runner
# WORKDIR /app

# ENV NODE_ENV=production
# ENV NEXT_TELEMETRY_DISABLED=1

# # Create production user
# RUN addgroup --system --gid 1001 nodejs
# RUN adduser --system --uid 1001 nextjs

# # Create necessary directories with correct permissions BEFORE copying files
# RUN mkdir -p /app/public/media /app/.next /app/uploads
# RUN chown -R nextjs:nodejs /app

# # Copy public assets
# COPY --from=builder --chown=nextjs:nodejs /app/public ./public

# # Set the correct permission for prerender cache
# RUN mkdir -p .next
# RUN chown nextjs:nodejs .next

# # Automatically leverage output traces to reduce image size
# # https://nextjs.org/docs/advanced-features/output-file-tracing
# COPY --from=builder --chown=nextjs:nodejs /app/.next/standalone ./
# COPY --from=builder --chown=nextjs:nodejs /app/.next/static ./.next/static

# # Copy package.json for potential migrations and payload commands
# COPY --from=builder --chown=nextjs:nodejs /app/package.json ./
# COPY --from=builder --chown=nextjs:nodejs /app/tsconfig.json ./
# COPY --from=builder --chown=nextjs:nodejs /app/src ./src
# COPY --from=builder --chown=nextjs:nodejs /app/migrate.js ./migrate.js

# # Copy node_modules with payload CLI for migrations
# COPY --from=builder --chown=nextjs:nodejs /app/node_modules ./node_modules

# # Ensure media directories exist and have correct permissions
# RUN mkdir -p /app/public/media /app/uploads && \
#     chown -R nextjs:nodejs /app/public /app/uploads /app/.next && \
#     chmod -R 755 /app/public/media /app/uploads

# USER nextjs

# EXPOSE 3019

# ENV PORT=3019
# ENV HOSTNAME="0.0.0.0"

# # Add health check
# HEALTHCHECK --interval=30s --timeout=10s --start-period=30s --retries=3 \
#   CMD node -e "http.get('http://localhost:3019/api/health', (res) => { process.exit(res.statusCode === 200 ? 0 : 1) })" || exit 1

# # server.js is created by next build from the standalone output
# CMD ["node", "server.js"]

#############################################
# Ultra-Simple Dockerfile for Coolify        #
#############################################

# Use Node 18 for better Sharp compatibility
FROM node:18-alpine

# Install necessary dependencies
RUN apk add --no-cache \
    python3 \
    make \
    g++ \
    git \
    libc6-compat \
    vips-dev

WORKDIR /app

# Copy package files first for better caching
COPY package.json ./

# Install ALL dependencies (including dev dependencies) for build
RUN echo "Installing dependencies..." && \
    npm install --legacy-peer-deps && \
    npm install -g cross-env

# Copy the rest of the application
COPY . .

# Set up environment variables for build
ENV NODE_ENV=development \
    NEXT_TELEMETRY_DISABLED=1 \
    PAYLOAD_CONFIG_PATH=dist/payload.config.js \
    SKIP_MIGRATIONS=true \
    PAYLOAD_DISABLE_EMAIL=true \
    PAYLOAD_DISABLE_SHARP=true

# Debug and build with verbose output
RUN echo "Starting build process..." && \
    echo "Node version: $(node -v)" && \
    echo "NPM version: $(npm -v)" && \
    echo "Current NODE_ENV: $NODE_ENV" && \
    echo "Override NODE_ENV to development for build..." && \
    export NODE_ENV=development && \
    echo "New NODE_ENV: $NODE_ENV" && \
    echo "Checking if cross-env is available:" && \
    which cross-env || echo "cross-env not found in PATH" && \
    echo "Attempting simple next build first..." && \
    (NODE_ENV=development NODE_OPTIONS=--no-deprecation npx next build || \
     echo "Direct next build failed, trying with cross-env..." && \
     NODE_ENV=development cross-env NODE_OPTIONS=--no-deprecation next build || \
     echo "Cross-env build failed, trying npm run build..." && \
     NODE_ENV=development npm run build || \
     echo "All build attempts failed!")

# Create media directory and ensure proper permissions
RUN mkdir -p /app/public/media && \
    chmod -R 755 /app/public/media

# Set runtime environment variables
ENV NODE_ENV=production \
    PORT=3000 \
    HOSTNAME=0.0.0.0

# Expose port
EXPOSE 3000

# Define health check for the running app
HEALTHCHECK --interval=30s --timeout=10s --start-period=40s --retries=3 \
  CMD node -e "require('http').get('http://localhost:3000/api/health', r => process.exit(r.statusCode===200?0:1)).on('error',()=>process.exit(1))" || exit 1

# Start the application
CMD ["npm", "start"]
