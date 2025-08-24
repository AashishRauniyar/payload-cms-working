#!/bin/bash

# Exit on any error
set -e

echo "Starting application..."

# Run database migrations
echo "Running database migrations..."
pnpm migrate

# Start the application
echo "Starting Next.js application..."
exec node server.js
