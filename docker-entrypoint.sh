#!/bin/sh

# Docker entrypoint script for Payload CMS
echo "🚀 Starting Next.js with Payload CMS application..."

# Function to wait for database
wait_for_db() {
    echo "⏳ Waiting for PostgreSQL to be ready..."
    
    until node -e "
        const { Pool } = require('pg');
        const pool = new Pool({ connectionString: process.env.DATABASE_URI });
        pool.query('SELECT 1')
          .then(() => { console.log('✅ Database is ready!'); process.exit(0); })
          .catch(() => process.exit(1));
    " 2>/dev/null; do
        echo "⏳ Database is unavailable - sleeping for 2 seconds..."
        sleep 2
    done
}

# Function to run migrations
run_migrations() {
    echo "🔄 Running database migrations..."
    
    # Check if migration directory exists
    if [ -d "./src/migrations" ] && [ "$(ls -A ./src/migrations)" ]; then
        echo "📁 Migration files found, running migrations..."
        
        if node migrate.js; then
            echo "✅ Migrations completed successfully!"
        else
            echo "⚠️  Migration failed, but continuing (Payload will handle schema creation)"
        fi
    else
        echo "ℹ️  No migration files found, skipping migrations"
    fi
}

# Main execution
echo "🔍 Environment: $NODE_ENV"
echo "🔍 Database: ${DATABASE_URI%@*}@***"

# Check if we should skip all database operations
if [ "$SKIP_MIGRATIONS" = "true" ] && [ "$SKIP_DB_WAIT" = "true" ]; then
    echo "⚠️  Skipping database wait and migrations (SKIP_DB_WAIT=true)"
else
    # Wait for database to be ready
    wait_for_db
    
    # Run migrations if needed
    if [ "$SKIP_MIGRATIONS" != "true" ]; then
        run_migrations
    fi
fi

# Start the Next.js server
echo "🌟 Starting Next.js server..."
exec node server.js