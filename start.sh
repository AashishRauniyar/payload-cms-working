#!/bin/bash

# Simple startup script for Docker container
# Runs migrations and starts the application

set -e

echo "🚀 Starting Payload CMS application..."

# Environment info
echo "📄 Node Environment: $NODE_ENV"
echo "🌐 Server URL: $NEXT_PUBLIC_SERVER_URL"
echo "🏠 Port: $PORT"

# Check if DATABASE_URI is set
if [ -z "$DATABASE_URI" ]; then
  echo "❌ DATABASE_URI environment variable is not set"
  exit 1
fi

# Check if PAYLOAD_SECRET is set
if [ -z "$PAYLOAD_SECRET" ]; then
  echo "❌ PAYLOAD_SECRET environment variable is not set"
  exit 1
fi

echo "✅ Environment variables validated"

# Wait a bit more for database to be fully ready
echo "⏳ Waiting for database to be fully ready..."
sleep 5

# Try to run migrations
echo "🔄 Running database migrations..."
if pnpm migrate; then
  echo "✅ Database migrations completed successfully"
else
  echo "⚠️  Migration failed or no migrations needed"
  # Don't exit on migration failure as it might be the first run
fi

# Start the application
echo "🎯 Starting Next.js application..."
exec node server.js
