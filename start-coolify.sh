#!/bin/bash

# Coolify-optimized startup script
# Handles database migrations and application startup for Coolify

set -e

echo "🚀 Starting Payload CMS application in Coolify..."

# Function to check if database is reachable
check_database() {
  if [ -z "$DATABASE_URI" ]; then
    echo "❌ DATABASE_URI not set"
    return 1
  fi
  
  # Extract database details for connection test
  echo "🔍 Checking database connection..."
  
  # Simple connection test using node
  node -e "
    const { Client } = require('pg');
    const client = new Client({ connectionString: process.env.DATABASE_URI });
    client.connect()
      .then(() => {
        console.log('✅ Database connection successful');
        client.end();
        process.exit(0);
      })
      .catch(err => {
        console.log('❌ Database connection failed:', err.message);
        client.end();
        process.exit(1);
      });
  " 2>/dev/null
}

# Function to run migrations
run_migrations() {
  echo "🔄 Running database migrations..."
  
  if pnpm migrate 2>/dev/null; then
    echo "✅ Migrations completed successfully"
  else
    echo "⚠️  Migration failed or no migrations needed"
    # Don't exit on migration failure in case it's a fresh install
  fi
}

# Wait for database with timeout
wait_for_database() {
  local timeout=60
  local counter=0
  
  while [ $counter -lt $timeout ]; do
    if check_database; then
      echo "✅ Database is ready"
      return 0
    else
      echo "⏳ Waiting for database... ($counter/$timeout)"
      sleep 2
      counter=$((counter + 1))
    fi
  done
  
  echo "❌ Database not ready after $timeout seconds"
  return 1
}

# Main execution
main() {
  echo "🌟 Environment: $NODE_ENV"
  echo "🏠 Server URL: $NEXT_PUBLIC_SERVER_URL"
  
  # Check required environment variables
  if [ -z "$PAYLOAD_SECRET" ]; then
    echo "❌ PAYLOAD_SECRET is required"
    exit 1
  fi
  
  # Wait for database and run migrations
  if wait_for_database; then
    run_migrations
  else
    echo "⚠️  Starting without database - migrations skipped"
  fi
  
  # Generate types if possible
  echo "📝 Generating types..."
  pnpm generate:types 2>/dev/null || echo "⚠️  Could not generate types"
  
  # Start the application
  echo "🎯 Starting Next.js application..."
  echo "🌐 Application will be available at: $NEXT_PUBLIC_SERVER_URL"
  echo "🚪 Internal port: 3019"
  
  exec node server.js
}

# Run main function
main "$@"
