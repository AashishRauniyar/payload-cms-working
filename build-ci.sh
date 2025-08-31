#!/bin/bash

# Build script for CI/CD deployment without database connection
# This script uses the experimental-build-mode to compile without DB

set -e

echo "Starting CI/CD build process..."

# Check if we have environment variables
if [ -z "$PAYLOAD_SECRET" ]; then
  echo "Warning: PAYLOAD_SECRET not set, using fallback for build"
  export PAYLOAD_SECRET="build-time-fallback-secret-not-secure"
fi

# Install dependencies
echo "Installing dependencies..."
pnpm install --frozen-lockfile

# Generate types and importmap
echo "Generating Payload types..."
pnpm generate:types || echo "Warning: Could not generate types, continuing..."

echo "Generating import map..."
pnpm generate:importmap || echo "Warning: Could not generate import map, continuing..."

# Build without database connection
echo "Building application without database connection..."
pnpm build:compile

# Generate environment variables for client-side
echo "Generating environment variables..."
pnpm build:generate-env || echo "Warning: Could not generate env, continuing..."

echo "Build completed successfully!"
echo "Note: Run migrations manually after deployment when database is available"
