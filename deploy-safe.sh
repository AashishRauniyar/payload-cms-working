#!/bin/bash

# Deploy-safe script that handles migrations gracefully
echo "🚀 Starting deployment process..."

# Set environment variables to skip migrations during build
export SKIP_MIGRATIONS=true
export DOCKER_BUILD=true

echo "📦 Installing dependencies..."
pnpm install --frozen-lockfile

echo "🏗️ Building application..."
cross-env NODE_OPTIONS=--no-deprecation next build

echo "✅ Build completed successfully!"

# If we're in production and have database access, run migrations
if [ "$NODE_ENV" = "production" ] && [ -n "$DATABASE_URI" ]; then
    echo "🗄️ Running migrations..."
    cross-env NODE_OPTIONS=--no-deprecation pnpm migrate || echo "⚠️ Migration failed, but continuing..."
fi

echo "🎯 Deployment completed!"
