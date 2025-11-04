# Deployment Guide

This guide explains how to deploy your Payload CMS application without database connection issues.

## Problem Summary

The deployment was failing due to:
1. Next.js SSG requiring database connection during build
2. Missing Payload secret key
3. Docker build process requiring database access

## Solutions Implemented

### 1. Database-less Build Mode

We've implemented Next.js experimental build mode to compile without database:

```bash
# For Docker/CI deployment
pnpm build:docker

# For manual deployment without DB
pnpm build:compile

# Generate static assets when DB is available
pnpm build:generate
```

### 2. Environment Variables

Updated configuration to handle missing environment variables gracefully:

- `PAYLOAD_SECRET`: Now has fallback for build-time
- `DATABASE_URI`: Handled gracefully when missing
- Added production environment template

### 3. Docker Improvements

- Added health checks for database
- Updated build process to use compile mode
- Improved startup script with database readiness checks

## Deployment Options

### Option 1: Docker Compose (Recommended)

```bash
# Update environment variables in docker-compose.yml
# Then deploy:
docker-compose up --build -d
```

### Option 2: Manual Build for CI/CD

```bash
# Use the CI build script
./build-ci.sh

# Or manually:
pnpm build:compile
pnpm build:generate-env
```

### Option 3: Traditional Build (when DB is available)

```bash
pnpm build:with-migrate
```

## Environment Variables Setup

### Required for Production:

1. `DATABASE_URI` - Your PostgreSQL connection string
2. `PAYLOAD_SECRET` - 32+ character secret key
3. `NEXT_PUBLIC_SERVER_URL` - Your domain URL
4. `CRON_SECRET` - Secret for cron job authentication

### Example Production .env:

```bash
DATABASE_URI=postgresql://user:password@host:5432/database
PAYLOAD_SECRET=your-32-character-secret-key-here
NEXT_PUBLIC_SERVER_URL=https://yourdomain.com
CRON_SECRET=your-cron-secret-here
NODE_ENV=production
```

## Deployment Steps

### For Cloud Platforms (Vercel, Netlify, etc.):

1. Set environment variables in platform dashboard
2. Use build command: `pnpm build:compile`
3. Set start command: `pnpm start:migrate`

### For VPS/Server:

1. Clone repository
2. Copy `.env.production` and update values
3. Run `./build-ci.sh` or `pnpm build:compile`
4. Start with `pnpm start:migrate`

### For Docker:

1. Update `docker-compose.yml` environment variables
2. Run `docker-compose up --build -d`

## Troubleshooting

### "Database not found" during build:
- Use `pnpm build:compile` instead of regular build
- Ensure Docker uses the updated build command

### "Payload secret required":
- Set `PAYLOAD_SECRET` environment variable
- Use fallback for build-time (already implemented)

### Migration issues:
- Run migrations separately: `pnpm migrate`
- Use `pnpm start:migrate` to migrate on startup

## Important Notes

1. **Security**: Always use strong, unique secrets in production
2. **Database**: Ensure database is accessible from your deployment environment
3. **Environment**: Never commit production `.env` files to version control
4. **Performance**: Compile mode disables static optimization - use generate mode when possible

## Support

If you encounter issues:
1. Check environment variables are set correctly
2. Verify database connectivity
3. Use compile mode for builds without database
4. Check logs for specific error messages
