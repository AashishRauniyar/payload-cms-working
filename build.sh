#!/bin/sh
set -e

echo "Building Next.js application..."

# Set environment variables for build
export NODE_ENV=production
export NEXT_TELEMETRY_DISABLED=1
export SKIP_MIGRATIONS=true
export PAYLOAD_CONFIG_PATH=dist/payload.config.js
export PAYLOAD_DISABLE_EMAIL=true
export PAYLOAD_DISABLE_SHARP=true
export NODE_OPTIONS=--no-deprecation

# Run Next.js build
echo "Running next build..."
next build

echo "Build completed successfully!"