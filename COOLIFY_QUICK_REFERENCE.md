# Coolify Quick Reference

This document provides quick reference commands and tips for managing your Payload CMS deployment on Coolify.

## Common Commands

### Deployment

```bash
# Deploy changes to Coolify
./deploy-coolify.sh
```

### Local Testing

```bash
# Test Docker build locally before deploying
./test-docker.sh

# Build locally with production settings
./test-build.sh
```

### Environment Management

```bash
# Copy template environment file as starting point
cp coolify-env-template.txt .env.production
```

## Common Operations

### Restart Service

If you need to restart the service in Coolify:

1. Navigate to your service in Coolify dashboard
2. Click on "Settings" tab
3. Find "Restart" button and confirm

### View Logs

To view application logs:

1. Navigate to your service in Coolify dashboard
2. Click on "Logs" tab
3. Select appropriate log stream (application, build, etc.)

### Scale Resources

If you need more resources:

1. Navigate to your service in Coolify dashboard
2. Click on "Settings" tab
3. Find "Resources" section
4. Adjust CPU and RAM allocation as needed

### Update Environment Variables

To update environment variables:

1. Navigate to your service in Coolify dashboard
2. Click on "Settings" tab
3. Find "Environment Variables" section
4. Add or modify variables as needed
5. Click "Save" and then "Redeploy"

## Status Checks

### Health Check

The application exposes a health check endpoint at:

```text
/api/health
```

Use this to monitor application health in Coolify or external monitoring tools.

### Database Connection

If MongoDB connection issues occur, verify:

1. MongoDB service is running
2. Connection string in environment variables is correct
3. Network access is properly configured

## Migration Commands

If you need to run migrations manually:

```bash
# Connect to container shell in Coolify dashboard
# Then run:
cd /app
node migrate.js
```
