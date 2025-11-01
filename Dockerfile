# Multi-stage Docker build for Next.js with Payload CMS
# Optimized for production deployment

FROM node:20.18.1-alpine AS base

# Install dependencies only when needed
FROM base AS deps
# Check https://github.com/nodejs/docker-node/tree/b4117f9333da4138b03a546ec926ef50a31506c3#nodealpine to understand why libc6-compat might be needed.
RUN apk add --no-cache libc6-compat
WORKDIR /app

# Install dependencies based on the preferred package manager
COPY package.json yarn.lock* package-lock.json* pnpm-lock.yaml* ./

RUN \
  if [ -f yarn.lock ]; then yarn --frozen-lockfile; \
  elif [ -f package-lock.json ]; then npm ci; \
  elif [ -f pnpm-lock.yaml ]; then npm install -g pnpm@^9 && pnpm install --frozen-lockfile; \
  else echo "Lockfile not found." && exit 1; \
  fi

# Rebuild the source code only when needed
FROM base AS builder
WORKDIR /app

COPY --from=deps /app/node_modules ./node_modules
COPY . .

# Next.js collects completely anonymous telemetry data about general usage.
ENV NEXT_TELEMETRY_DISABLED=1

# Build the application with build-time variables
RUN \
  export DATABASE_URI=postgresql://placeholder:placeholder@placeholder:5432/placeholder && \
  export PAYLOAD_SECRET=build-time-secret-only-not-for-production-use && \
  export SKIP_MIGRATIONS=true && \
  export PAYLOAD_DISABLE_EMAIL=true && \
  export NODE_ENV=production && \
  if [ -f yarn.lock ]; then yarn run build; \
  elif [ -f package-lock.json ]; then npm run build; \
  elif [ -f pnpm-lock.yaml ]; then npm install -g pnpm@^9 && pnpm run build; \
  else echo "Lockfile not found." && exit 1; \
  fi

# Production image, copy all the files and run next
FROM base AS runner
WORKDIR /app

ENV NODE_ENV=production
ENV NEXT_TELEMETRY_DISABLED=1

RUN addgroup --system --gid 1001 nodejs
RUN adduser --system --uid 1001 nextjs

# Create necessary directories with correct permissions BEFORE copying files
RUN mkdir -p /app/public/media /app/.next /app/uploads
RUN chown -R nextjs:nodejs /app

# Copy public assets
COPY --from=builder --chown=nextjs:nodejs /app/public ./public

# Set the correct permission for prerender cache
RUN mkdir -p .next
RUN chown nextjs:nodejs .next

# Automatically leverage output traces to reduce image size
# https://nextjs.org/docs/advanced-features/output-file-tracing
COPY --from=builder --chown=nextjs:nodejs /app/.next/standalone ./
COPY --from=builder --chown=nextjs:nodejs /app/.next/static ./.next/static

# Copy package.json for potential migrations and payload commands
COPY --from=builder --chown=nextjs:nodejs /app/package.json ./
COPY --from=builder --chown=nextjs:nodejs /app/tsconfig.json ./
COPY --from=builder --chown=nextjs:nodejs /app/src ./src
COPY --from=builder --chown=nextjs:nodejs /app/migrate.js ./migrate.js
COPY --from=builder --chown=nextjs:nodejs /app/docker-entrypoint.sh ./docker-entrypoint.sh

# Copy node_modules with payload CLI for migrations
COPY --from=builder --chown=nextjs:nodejs /app/node_modules ./node_modules

# Ensure media directories exist and have correct permissions
RUN mkdir -p /app/public/media /app/uploads && \
    chown -R nextjs:nodejs /app/public /app/uploads /app/.next && \
    chmod -R 755 /app/public/media /app/uploads && \
    chmod +x /app/docker-entrypoint.sh

USER nextjs

EXPOSE 3019

ENV PORT=3019
ENV HOSTNAME="0.0.0.0"

# Add health check
HEALTHCHECK --interval=30s --timeout=10s --start-period=30s --retries=3 \
  CMD node -e "http.get('http://healthylifestyletips.online/api/health', (res) => { process.exit(res.statusCode === 200 ? 0 : 1) })" || exit 1

# Use the entrypoint script to handle initialization
ENTRYPOINT ["./docker-entrypoint.sh"]