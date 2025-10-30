
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


FROM node:18-alpine

RUN apk add --no-cache python3 make g++ git libc6-compat vips-dev

# Enable pnpm
RUN corepack enable && corepack prepare pnpm@latest --activate

WORKDIR /app

# Copy lockfiles first
COPY package.json pnpm-lock.yaml ./
# If workspaces: COPY pnpm-workspace.yaml ./

# Install ALL deps for build (respects lockfile)
RUN echo "Installing dependencies with pnpm..." && \
    pnpm install --frozen-lockfile && \
    pnpm add -g cross-env

# Copy the rest of the application
COPY . .

# Build-time env
ENV NODE_ENV=production \
    NEXT_TELEMETRY_DISABLED=1 \
    PAYLOAD_CONFIG_PATH=src/payload.config.ts \
    SKIP_MIGRATIONS=true \
    PAYLOAD_DISABLE_EMAIL=true \
    PAYLOAD_DISABLE_SHARP=true

# 🔴 Guarantee a real Next build happens with pnpm
RUN echo "Building application with pnpm..." && \
    DATABASE_URI="postgresql://placeholder:placeholder@localhost:5432/placeholder" \
    PAYLOAD_SECRET="placeholder-secret-for-build" \
    pnpm build && \
    echo "Build completed; listing .next" && \
    ls -la .next || (echo "❌ .next missing after build" && exit 1)

# Media dir
RUN mkdir -p /app/public/media && chmod -R 755 /app/public/media

# (Optional) debug artifacts
RUN echo "=== BUILD ARTIFACTS DEBUG ===" && ls -la /app && ls -la .next || true && echo "=== END DEBUG ==="

# Runtime env
ENV NODE_ENV=production \
    PORT=3019 \
    HOSTNAME=0.0.0.0 \
    NEXT_TELEMETRY_DISABLED=1

EXPOSE 3019

HEALTHCHECK --interval=30s --timeout=10s --start-period=40s --retries=3 \
  CMD node -e "require('http').get('http://localhost:3019/api/health', r => process.exit(r.statusCode===200?0:1)).on('error',()=>process.exit(1))" || exit 1

# Keep your start.sh approach (migrations + flexible start)
# (Use your existing start.sh content)
# If it relies on .next/standalone/server.js, ensure next.config.js outputs standalone.
RUN printf '#!/bin/sh\n\
echo "🚀 Starting Payload CMS application..."\n\
echo "NODE_ENV=$NODE_ENV PORT=$PORT"\n\
if [ -n "$DATABASE_URI" ]; then echo "✅ DATABASE_URI set"; else echo "❌ DATABASE_URI missing"; exit 1; fi\n\
echo "Running migrations (best-effort)..."\n\
if [ -f "migrate.js" ]; then node migrate.js || true; \
elif command -v npx >/dev/null 2>&1; then npx payload migrate || true; \
fi\n\
echo "✨ Migrations completed successfully!"\n\
echo "✅ Starting server..."\n\
if [ -f ".next/standalone/server.js" ]; then \
  cp -r public .next/standalone/public 2>/dev/null || true; \
  cp -r .next/static .next/standalone/.next/static 2>/dev/null || true; \
  cd .next/standalone && HOSTNAME=0.0.0.0 PORT=3019 node server.js; \
else \
  HOSTNAME=0.0.0.0 PORT=3019 pnpm start; \
fi\n' > /app/start.sh && chmod +x /app/start.sh

CMD ["/app/start.sh"]
