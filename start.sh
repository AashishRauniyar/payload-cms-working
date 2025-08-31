#!/bin/bash

# Exit on any error
set -e

echo "Starting application..."

# Check if database is available and migrate if needed
echo "Checking database connection..."
if [ -n "$DATABASE_URI" ]; then
  echo "Database URI found, running migrations..."
  # Wait for database to be ready
  timeout=30
  counter=0
  
  while [ $counter -lt $timeout ]; do
    if pnpm migrate --check-only 2>/dev/null; then
      echo "Database is ready, running migrations..."
      pnpm migrate
      break
    else
      echo "Waiting for database... ($counter/$timeout)"
      sleep 2
      counter=$((counter + 1))
    fi
  done
  
  if [ $counter -eq $timeout ]; then
    echo "Warning: Database not ready after $timeout attempts, starting without migration"
  fi
else
  echo "No DATABASE_URI found, skipping migrations"
fi

# Start the application
echo "Starting Next.js application..."
exec node server.js
