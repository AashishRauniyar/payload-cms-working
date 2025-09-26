# Coolify Troubleshooting Guide

This guide helps you diagnose and fix common issues when deploying the Next.js + Payload CMS application on Coolify.

## Build Failures

### Issue: npm install fails with Sharp dependency errors

**Symptoms:**

- Build logs show errors related to Sharp package
- Messages about missing native dependencies

**Solutions:**

1. Verify the Dockerfile is using the optimized build process with proper dependencies:

```dockerfile
RUN apk add --no-cache vips-dev build-base python3
```

2. Try using a specific Node.js version known to work with Sharp:

```dockerfile
FROM node:18-alpine AS base
```

3. If using volumes, check permissions on mounted directories.

### Issue: Memory errors during build

**Symptoms:**

- "JavaScript heap out of memory" errors
- Build process terminates unexpectedly

**Solutions:**

1. Increase memory allocation in Coolify service settings
2. Add NODE_OPTIONS to increase memory limit:

```
NODE_OPTIONS="--max-old-space-size=4096"
```

3. Optimize build process to reduce memory usage:
   - Consider multi-stage builds
   - Reduce parallel processes

## Runtime Errors

### Issue: Application starts but shows 500 errors

**Symptoms:**

- Server starts without errors
- API requests return 500 status codes

**Solutions:**

1. Check MongoDB connection:
   - Verify MONGODB_URI is correct
   - Check if MongoDB service is accessible from Coolify
   - Test connection with a simple script

2. Verify payload configuration:
   - Ensure PAYLOAD_CONFIG_PATH is correct
   - Check that dist/payload.config.js exists
   - Verify all required environment variables are set

3. Check application logs for specific errors:
   - Navigate to Coolify dashboard > Logs
   - Look for error patterns or stack traces

### Issue: Media uploads fail

**Symptoms:**

- Cannot upload images or files
- Error messages about permissions or storage

**Solutions:**

1. If using local storage:
   - Ensure `/app/media` directory exists and has write permissions
   - Verify it's mounted as a volume in Coolify

2. If using S3:
   - Verify all S3 environment variables are correctly set
   - Check S3 bucket permissions
   - Test S3 connection with a simple script

## Network Issues

### Issue: Cannot access deployed application

**Symptoms:**

- Service shows as running in Coolify
- Unable to access application URL

**Solutions:**

1. Check port configuration:
   - Verify port 3000 is exposed in Dockerfile
   - Check port mapping in Coolify service settings

2. Verify proxy settings:
   - If using Traefik or Nginx, check configuration
   - Verify domain DNS settings point to correct IP

3. Check firewall settings:
   - Ensure required ports are open
   - Verify network rules allow traffic

## Database Issues

### Issue: MongoDB connection failures

**Symptoms:**

- Errors about MongoDB connection in logs
- Application fails to start or operate correctly

**Solutions:**

1. Verify connection string:
   - Check MONGODB_URI format is correct
   - Ensure username/password are properly URL encoded

2. Check network connectivity:
   - Ensure MongoDB is accessible from Coolify
   - Check if MongoDB service is running

3. Database permissions:
   - Verify user has appropriate permissions
   - Check database and collection existence

## Environment Variables

### Issue: Missing or incorrect environment variables

**Symptoms:**

- Application fails with reference errors
- Features don't work as expected

**Solutions:**

1. Compare environment variables with template:
   - Check coolify-env-template.txt against your configuration
   - Ensure all required variables are set

2. Check for typos or formatting issues:
   - Verify no extra spaces or quotes in values
   - Check for proper escaping of special characters

3. Reload environment:
   - After changing environment variables, redeploy the service

## Persistent Issues

If problems persist:

1. Try a clean rebuild:
   - In Coolify dashboard, select "Rebuild" with cache disabled
2. Compare with local development:
   - Test locally with similar environment settings
   - Identify differences between local and Coolify environment

3. Check resource usage:
   - Monitor CPU, memory, and disk usage
   - Increase resources if consistently at high utilization
