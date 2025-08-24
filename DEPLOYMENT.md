# Deployment Guide for Coolify

## Environment Variables Required

Make sure to set these environment variables in your Coolify deployment:

### Required Variables:
- `DATABASE_URI`: PostgreSQL connection string (e.g., `postgresql://username:password@host:port/database`)
- `PAYLOAD_SECRET`: A secure random string for Payload CMS encryption

### Optional Variables:
- `NODE_ENV`: Set to `production` for production deployments
- `NEXT_TELEMETRY_DISABLED`: Set to `1` to disable Next.js telemetry

## Database Setup

1. Ensure your PostgreSQL database is running and accessible
2. The application will automatically run migrations on startup
3. Make sure the database user has sufficient permissions to create tables

## Build Process

The Docker build process:
1. Uses pnpm for package management
2. Installs dependencies with `--frozen-lockfile`
3. Builds the Next.js application
4. Creates a production-ready container

## Runtime Process

On container startup:
1. Runs database migrations using `pnpm migrate`
2. Starts the Next.js application on port 3017

## Troubleshooting

### Build Failures
- Ensure `pnpm-lock.yaml` is committed to the repository
- Check that all environment variables are set correctly
- Verify the database is accessible during build (if needed)

### Runtime Issues
- Check database connectivity
- Verify environment variables are set
- Check application logs for migration errors

## Port Configuration

The application runs on port 3017 by default. Make sure to:
- Set the port in Coolify to 3017
- Configure any reverse proxy to forward to port 3017

## Docker Configuration

This project uses a simplified single-stage Dockerfile that:
- Installs pnpm globally
- Installs dependencies
- Builds the application
- Runs migrations and starts the server on container startup
