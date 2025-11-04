#!/bin/bash
set -e

# Set environment for production build
export NODE_ENV=production
export PAYLOAD_CONFIG_PATH=dist/payload.config.js
export NEXT_PUBLIC_SERVER_URL=${NEXT_PUBLIC_SERVER_URL:-http://localhost:3000}

echo "🚀 Starting application in Coolify production mode..."
echo "Using SERVER_URL: $NEXT_PUBLIC_SERVER_URL"

# Start Next.js in production mode
exec pnpm start

echo "✅ Server started successfully!"
