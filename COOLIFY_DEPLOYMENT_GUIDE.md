# Coolify Deployment Guide

This guide provides instructions for deploying the Next.js + Payload CMS application to Coolify.

## Prerequisites

- Access to Coolify dashboard
- Git repository with deployment rights
- Required environment variables set up

## Setting Up the Deployment

### 1. Prepare your repository

Create a deployment branch if you don't have one already:

```bash
git checkout -b deployment
```

### 2. Set up environment variables in Coolify

Required variables:

- `NODE_ENV=production`
- `PAYLOAD_CONFIG_PATH=dist/payload.config.js`
- `MONGODB_URI` (Your MongoDB connection string)
- `PAYLOAD_SECRET` (A secure random string)
- `NEXT_PUBLIC_SERVER_URL` (The URL where your app will be accessible)

Optional variables:

- `PAYLOAD_PUBLIC_DRAFT_SECRET` (For draft mode)
- `S3_BUCKET`, `S3_ACCESS_KEY_ID`, `S3_SECRET_ACCESS_KEY`, etc. (For file uploads)

### 3. Configure the service in Coolify

- **Source**: Select your Git repository and deployment branch
- **Build Configuration**:
  - Base Directory: `/`
  - Build Command: (leave empty, handled in Dockerfile)
  - Start Command: `./start-coolify.sh`
  - Root Directory: `/`
  - Publish Directory: `/`
- **Resource Configuration**:
  - Recommended: 1024MB RAM minimum
  - Recommended: 1 CPU minimum
- **Dockerfile**: Leave default (uses Dockerfile in project root)
- **Persistent Storage**: Add volume mount for `/app/media` to preserve uploads
- **Ports**: Map port 3000

### 4. Deploy your application

Use the deploy script to push changes to your deployment branch:

```bash
./deploy-coolify.sh
```

Then, in Coolify dashboard, click "Deploy" to start the deployment process.

### 5. Monitor the build

Watch the build logs in Coolify to ensure successful deployment.

## Troubleshooting

### Build failures

- Check Coolify build logs for specific error messages
- Ensure all required environment variables are set
- Verify MongoDB connection is accessible from Coolify

### Sharp dependency issues

If you encounter issues with the Sharp image processing library:

- The Dockerfile has been optimized to handle Sharp installation correctly
- If problems persist, try manually installing dependencies in the Dockerfile:

```dockerfile
RUN apk add --no-cache vips-dev python3 make g++
```

### Memory issues during build

If the build fails due to memory constraints, increase the allocated memory in Coolify service configuration.

## Updating the Deployment

1. Make your code changes
2. Push to your deployment branch using `./deploy-coolify.sh`
3. Trigger a new deployment in Coolify dashboard

## Reference

- [Coolify Documentation](https://docs.coolify.io/)
- [Next.js Deployment](https://nextjs.org/docs/deployment)
- [Payload CMS Production Deployment](https://payloadcms.com/docs/production/deployment)
