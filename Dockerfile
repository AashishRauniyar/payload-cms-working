# Multi-stage Docker build for Payload CMS production
# Based on official Payload documentation and Next.js with-docker example

FROM node:22.12.0-alpine AS base

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
  elif [ -f pnpm-lock.yaml ]; then npm install --legacy-peer-deps; \
  else echo "Lockfile not found." && exit 1; \
  fi

# Rebuild the source code only when needed
FROM base AS builder
WORKDIR /app

COPY --from=deps /app/node_modules ./node_modules
COPY . .

# Next.js collects completely anonymous telemetry data about general usage.
ENV NEXT_TELEMETRY_DISABLED=1

# Build the application using regular build
ENV DATABASE_URI=postgresql://placeholder:placeholder@placeholder:5432/placeholder
RUN \
  if [ -f yarn.lock ]; then yarn run build; \
  elif [ -f package-lock.json ]; then npm run build; \
  elif [ -f pnpm-lock.yaml ]; then npm run build; \
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

# Copy node_modules with payload CLI for migrations
COPY --from=builder --chown=nextjs:nodejs /app/node_modules ./node_modules

# Ensure media directories exist and have correct permissions
RUN mkdir -p /app/public/media /app/uploads && \
    chown -R nextjs:nodejs /app/public /app/uploads /app/.next && \
    chmod -R 755 /app/public/media /app/uploads

USER nextjs

EXPOSE 3019

ENV PORT=3019
ENV HOSTNAME="0.0.0.0"

# Add health check
HEALTHCHECK --interval=30s --timeout=10s --start-period=30s --retries=3 \
  CMD node -e "http.get('http://localhost:3019/api/health', (res) => { process.exit(res.statusCode === 200 ? 0 : 1) })" || exit 1

# server.js is created by next build from the standalone output
CMD ["node", "server.js"]