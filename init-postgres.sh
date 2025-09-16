#!/bin/bash
set -e

# This script runs during PostgreSQL initialization
# It creates the postgres superuser role if it doesn't exist

echo "🔧 Initializing PostgreSQL with proper user roles..."

# Create postgres superuser role if it doesn't exist
psql -v ON_ERROR_STOP=1 --username "$POSTGRES_USER" --dbname "$POSTGRES_DB" <<-EOSQL
    -- Create postgres superuser if it doesn't exist
    DO \$\$
    BEGIN
        IF NOT EXISTS (SELECT 1 FROM pg_roles WHERE rolname = 'postgres') THEN
            CREATE ROLE postgres WITH SUPERUSER CREATEDB CREATEROLE LOGIN;
            ALTER ROLE postgres PASSWORD 'postgres';
            GRANT ALL PRIVILEGES ON DATABASE $POSTGRES_DB TO postgres;
        END IF;
    END
    \$\$;

    -- Ensure payload user has proper permissions
    GRANT ALL PRIVILEGES ON DATABASE $POSTGRES_DB TO $POSTGRES_USER;
    ALTER USER $POSTGRES_USER CREATEDB;
EOSQL

echo "✅ PostgreSQL initialization complete!"
echo "   - User 'payload' created with database access"
echo "   - User 'postgres' created as superuser"
echo "   - Database '$POSTGRES_DB' ready for connections"