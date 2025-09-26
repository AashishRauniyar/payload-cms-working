#!/bin/bash
set -e

# Set environment for production build
export NODE_ENV=production
export PAYLOAD_CONFIG_PATH=dist/payload.config.js
export NEXT_PUBLIC_SERVER_URL=${NEXT_PUBLIC_SERVER_URL:-http://localhost:3000}

echo "🚀 Starting application in Coolify production mode..."
echo "Using SERVER_URL: $NEXT_PUBLIC_SERVER_URL"

# Use direct node command instead of npm scripts for better control
node dist/server.js

echo "✅ Server started successfully!"
