
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
# FROM node:18-alpine

# # Install necessary dependencies
# RUN apk add --no-cache \
#     python3 \
#     make \
#     g++ \
#     git \
#     libc6-compat \
#     vips-dev

# WORKDIR /app

# # Copy package files first for better caching
# COPY package.json ./

# # Install ALL dependencies (including dev dependencies) for build
# RUN echo "Installing dependencies..." && \
#     npm install --legacy-peer-deps && \
#     npm install -g cross-env

# # Copy the rest of the application
# COPY . .

# # Set up environment variables for build
# ENV NODE_ENV=development \
#     NEXT_TELEMETRY_DISABLED=1 \
#     PAYLOAD_CONFIG_PATH=src/payload.config.ts \
#     SKIP_MIGRATIONS=true \
#     PAYLOAD_DISABLE_EMAIL=true \
#     PAYLOAD_DISABLE_SHARP=true

# # Build the application - use compile mode to avoid database connection issues
# RUN echo "Building application..." && \
#     echo "NODE_ENV is: $NODE_ENV" && \
#     echo "Checking if .next directory exists..." && \
#     ls -la | grep .next || echo "No .next directory yet" && \
#     echo "Running build command..." && \
#     DATABASE_URI="postgresql://placeholder:placeholder@localhost:5432/placeholder" \
#     PAYLOAD_SECRET="placeholder-secret-for-build" \
#     npm run build:docker 2>&1 || \
#     (echo "Build failed, attempting alternative..." && \
#      DATABASE_URI="postgresql://placeholder:placeholder@localhost:5432/placeholder" \
#      PAYLOAD_SECRET="placeholder-secret-for-build" \
#      npm run build 2>&1) && \
#     echo "Build completed, checking .next directory..." && \
#     ls -la .next/ || echo "Build directory not found!"

# # Create media directory and ensure proper permissions
# RUN mkdir -p /app/public/media && \
#     chmod -R 755 /app/public/media

# # Debug: Check what files were created during build
# RUN echo "=== BUILD ARTIFACTS DEBUG ===" && \
#     echo "Contents of /app:" && \
#     ls -la /app && \
#     echo "Contents of .next (if exists):" && \
#     ls -la .next/ || echo ".next directory not found" && \
#     echo "Contents of .next/standalone (if exists):" && \
#     ls -la .next/standalone/ || echo ".next/standalone directory not found" && \
#     echo "=== END DEBUG ==="

# # Set runtime environment variables
# ENV NODE_ENV=production \
#     PORT=3019 \
#     HOSTNAME=0.0.0.0 \
#     NEXT_TELEMETRY_DISABLED=1

# # Expose port
# EXPOSE 3019

# # Define health check for the running app
# HEALTHCHECK --interval=30s --timeout=10s --start-period=40s --retries=3 \
#   CMD node -e "require('http').get('http://localhost:3019/api/health', r => process.exit(r.statusCode===200?0:1)).on('error',()=>process.exit(1))" || exit 1

# # Create a startup script that handles different server locations
# RUN echo '#!/bin/sh\n\
# echo "🚀 Starting Payload CMS application..."\n\
# echo "🔍 Environment Check:"\n\
# echo "  NODE_ENV: $NODE_ENV"\n\
# echo "  PORT: $PORT"\n\
# echo "  DATABASE_URI: ${DATABASE_URI:0:30}..."\n\
# echo "  PAYLOAD_SECRET: ${PAYLOAD_SECRET:0:10}..."\n\
# echo "Current directory: $(pwd)"\n\
# echo "Directory contents:"\n\
# ls -la\n\
# \n\
# # Check database connection\n\
# echo "🔍 Checking database connection..."\n\
# if [ ! -z "$DATABASE_URI" ]; then\n\
#     echo "✅ Database URI is set"\n\
# else\n\
#     echo "❌ DATABASE_URI not found!"\n\
#     exit 1\n\
# fi\n\
# \n\
# echo "✅ Database is ready!"\n\
# \n\
# # Try to run migrations first\n\
# echo "🚀 Running Payload migrations..."\n\
# if [ -f "migrate.js" ]; then\n\
#     echo "Using migrate.js file..."\n\
#     node migrate.js 2>&1 && echo "✅ Migration output completed" || echo "⚠️ Migration failed but continuing..."\n\
# elif command -v payload >/dev/null 2>&1; then\n\
#     echo "Using payload CLI..."\n\
#     npx payload migrate 2>&1 && echo "✅ Migration output completed" || echo "⚠️ Migration failed but continuing..."\n\
# else\n\
#     echo "ℹ️ No migration method found, skipping..."\n\
# fi\n\
# \n\
# echo "✨ Migrations completed successfully!"\n\
# echo "✅ Starting server..."\n\
# \n\
# # Check for standalone server.js first\n\
# if [ -f ".next/standalone/server.js" ]; then\n\
#     echo "Found standalone server, copying necessary files..."\n\
#     # Copy static files to standalone\n\
#     cp -r public .next/standalone/public 2>/dev/null || true\n\
#     cp -r .next/static .next/standalone/.next/static 2>/dev/null || true\n\
#     cd .next/standalone\n\
#     echo "Starting with: node server.js"\n\
#     HOSTNAME=0.0.0.0 PORT=3019 node server.js\n\
# else\n\
#     echo "Using npm start command..."\n\
#     PORT=3019 HOSTNAME=0.0.0.0 npm start\n\
# fi' > /app/start.sh && chmod +x /app/start.sh

# # Start the application using our startup script
# CMD ["/app/start.sh"]

#############################################
# Ultra-Simple Dockerfile for Coolify        #
#############################################

# Use Node 18 for better Sharp compatibility
# FROM node:18-alpine

# # Install necessary dependencies
# RUN apk add --no-cache \
#     python3 \
#     make \
#     g++ \
#     git \
#     libc6-compat \
#     vips-dev

# WORKDIR /app

# # Copy package files first for better caching
# COPY package.json ./

# # Install ALL dependencies (including dev dependencies) for build
# RUN echo "Installing dependencies..." && \
#     npm install --legacy-peer-deps && \
#     npm install -g cross-env

# # Copy the rest of the application
# COPY . .

# # Set up environment variables for build
# ENV NODE_ENV=development \
#     NEXT_TELEMETRY_DISABLED=1 \
#     PAYLOAD_CONFIG_PATH=src/payload.config.ts \
#     SKIP_MIGRATIONS=true \
#     PAYLOAD_DISABLE_EMAIL=true \
#     PAYLOAD_DISABLE_SHARP=true

# # Debug and build with verbose output
# RUN echo "Starting build process..." && \
#     echo "Node version: $(node -v)" && \
#     echo "NPM version: $(npm -v)" && \
#     echo "Current NODE_ENV: $NODE_ENV" && \
#     echo "Override NODE_ENV to development for build..." && \
#     export NODE_ENV=development && \
#     echo "New NODE_ENV: $NODE_ENV" && \
#     echo "Checking if cross-env is available:" && \
#     which cross-env || echo "cross-env not found in PATH" && \
#     echo "Attempting simple next build first..." && \
#     (NODE_ENV=development NODE_OPTIONS=--no-deprecation npx next build || \
#      echo "Direct next build failed, trying with cross-env..." && \
#      NODE_ENV=development cross-env NODE_OPTIONS=--no-deprecation next build || \
#      echo "Cross-env build failed, trying npm run build..." && \
#      NODE_ENV=development npm run build || \
#      echo "All build attempts failed!")

# # Create media directory and ensure proper permissions
# RUN mkdir -p /app/public/media && \


# syntax=docker/dockerfile:1

############################################
# Base image used by all stages
############################################
FROM node:18-alpine AS base
# Needed by some native modules
RUN apk add --no-cache libc6-compat
WORKDIR /app

############################################
# Dependencies (build tooling + dev deps)
############################################
FROM base AS deps
# Toolchain for native modules and libvips for sharp
RUN apk add --no-cache python3 make g++ git vips-dev
# Enable corepack so pnpm is available when lockfile exists
RUN corepack enable

# Copy only the manifests to leverage Docker layer caching
COPY package.json ./
COPY pnpm-lock.yaml* package-lock.json* ./

# Install dependencies:
# - pnpm if pnpm-lock.yaml exists
# - otherwise npm (ci if lockfile exists)
RUN if [ -f pnpm-lock.yaml ]; then \
      pnpm install --frozen-lockfile; \
    elif [ -f package-lock.json ]; then \
      npm ci --legacy-peer-deps; \
    else \
      npm install --legacy-peer-deps; \
    fi

############################################
# Build (Next.js/Payload)
############################################
FROM deps AS build
ENV NODE_ENV=development
ENV NEXT_TELEMETRY_DISABLED=1

# Copy the rest of the app
COPY . .

# Ensure media directory exists during build (no dangling &&)
RUN mkdir -p /app/public/media

# Build with whichever package manager we installed above
RUN if [ -f pnpm-lock.yaml ]; then \
      pnpm run build; \
    else \
      npm run build; \
    fi

# Produce production-only node_modules for the runtime image
RUN if [ -f pnpm-lock.yaml ]; then \
      pnpm prune --prod; \
    else \
      npm prune --omit=dev; \
    fi

############################################
# Runtime (slim, prod-only)
############################################
FROM base AS runner
ENV NODE_ENV=production
ENV NEXT_TELEMETRY_DISABLED=1
# If your Payload config is compiled to JS, this is the safest default.
# Override in Coolify if your project needs a different path.
ENV PAYLOAD_CONFIG_PATH=dist/payload.config.js
ENV PORT=3000

# Runtime libvips for sharp
RUN apk add --no-cache vips

# App directory & media folder with correct permissions
RUN mkdir -p /app/public/media
# Copy built artifacts and prod dependencies from build stage
COPY --from=build /app/package.json ./package.json
COPY --from=build /app/node_modules ./node_modules
COPY --from=build /app/.next ./.next
COPY --from=build /app/public ./public
# If your build outputs server code / Payload compiled files
COPY --from=build /app/dist ./dist
# Optionally keep src if your app reads non-compiled assets at runtime
COPY --from=build /app/src ./src

# Use an unprivileged user
RUN chown -R node:node /app
USER node

EXPOSE 3000

# Rely on your package.json "start" script (e.g., next start or custom server)
CMD ["npm", "run", "start"]
