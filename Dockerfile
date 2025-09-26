
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
# Production Dockerfile (Coolify friendly)   #
# Optimized for Payload + Next standalone    #
# Uses Node 18 (better Sharp compatibility)  #
#############################################

# Use Node 18 for better Sharp compatibility 
FROM node:18-alpine AS base

# Install necessary system dependencies - minimum needed set
RUN apk add --no-cache \
  g++ \
  git \
  libc6-compat \
  make \
  python3

WORKDIR /app

# Dependencies stage - use npm for better compatibility with native modules
FROM base AS deps
WORKDIR /app

# Copy package files (use package.json only, skip pnpm lock)
COPY package.json ./

# Use npm instead of pnpm for more reliable native module builds
RUN npm install --legacy-peer-deps && \
    npm install cross-env -g

# Rebuild the source code only when needed
FROM base AS builder
WORKDIR /app

# Set environment variables needed for build
ENV NEXT_TELEMETRY_DISABLED=1 \
    NODE_ENV=development \
    SKIP_MIGRATIONS=true \
    SKIP_ENV_VALIDATION=true \
    PAYLOAD_DISABLE_EMAIL=true \
    PAYLOAD_DISABLE_SHARP=true \
    NODE_OPTIONS=--no-deprecation

# Copy node_modules and source files into builder stage
COPY --from=deps /app/node_modules ./node_modules
COPY . .

# Create simplified build script that doesn't rely on complex package.json
RUN echo '#!/bin/sh\nNODE_OPTIONS=--no-deprecation SKIP_MIGRATIONS=true PAYLOAD_DISABLE_EMAIL=true PAYLOAD_DISABLE_SHARP=true exec next build "$@"' > /app/build.sh && \
    chmod +x /app/build.sh

# Use simplified package.json for the build
COPY Dockerfile.package.json ./package.json

# Build with direct script instead of relying on package.json scripts
RUN set -ex && \
    echo "Node version: $(node -v)" && \
    echo "Starting simplified build..." && \
    /app/build.sh

# Production image, copy all the necessary files and run next
FROM base AS runner
WORKDIR /app

# Set environment variables for production runtime
ENV NODE_ENV=production \
    NEXT_TELEMETRY_DISABLED=1 \
    PORT=3019 \
    HOSTNAME=0.0.0.0

# Create application user & dirs (to ensure permissions are set correctly)
RUN addgroup --system --gid 1001 nodejs && \
    adduser --system --uid 1001 nextjs && \
    mkdir -p /app/public/media /app/uploads /app/.next && \
    chown -R nextjs:nodejs /app

# Copy necessary runtime files from the builder stage
COPY --from=builder --chown=nextjs:nodejs /app/.next/standalone ./ 
COPY --from=builder --chown=nextjs:nodejs /app/.next/static ./.next/static
COPY --from=builder --chown=nextjs:nodejs /app/public ./public
COPY --from=builder --chown=nextjs:nodejs /app/package.json ./ 
COPY --from=builder --chown=nextjs:nodejs /app/tsconfig.json ./ 
COPY --from=builder --chown=nextjs:nodejs /app/src ./src
COPY --from=builder --chown=nextjs:nodejs /app/migrate.js ./migrate.js
COPY --from=builder --chown=nextjs:nodejs /app/node_modules ./node_modules

# Optionally prune dev dependencies for smaller runtime image
# RUN npm prune --production

# Ensure proper permissions for public directories
RUN chmod -R 755 /app/public && mkdir -p /app/public/media && chmod -R 755 /app/public/media

# Use the non-root user to run the app
USER nextjs

EXPOSE 3019

# Define health check for the running app
HEALTHCHECK --interval=30s --timeout=10s --start-period=40s --retries=3 \
  CMD node -e "require('http').get('http://localhost:3019/api/health', r => process.exit(r.statusCode===200?0:1)).on('error',()=>process.exit(1))" || exit 1

# Start the application
CMD ["node", "server.js"]
