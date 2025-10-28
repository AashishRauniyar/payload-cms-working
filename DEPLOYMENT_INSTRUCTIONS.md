# Deployment Instructions

## Changes Made

✅ **Updated Dockerfile** - Added debugging output and better build error handling
✅ **Fixed docker-compose.yml** - Changed from `node server.js` to `npm start`
✅ **Updated startup scripts** - Fixed server startup commands

## What's Fixed

1. **Server startup**: Changed from `node server.js` to `npm start` (which runs `next start`)
2. **Build process**: Added better error handling and debugging output
3. **Environment**: Properly configured for building

## Current Issue

The build is failing with exit code 1. The new debugging output will show exactly what's going wrong.

## Next Steps

### 1. Redeploy in Coolify

The changes are already pushed to the `deployment` branch. Now:

1. Go to your **Coolify dashboard**
2. Navigate to your application
3. Click **"Redeploy"** or **"Build"**
4. Monitor the build logs

### 2. Check Build Logs

The new Dockerfile will show detailed debugging information:

- NODE_ENV value
- Whether .next directory exists
- Build command output
- Error messages

Look for these in the build logs:

```
NODE_ENV is: development
Running build command...
Build completed, checking .next directory...
```

### 3. If Build Still Fails

If the build still fails, you'll see specific error messages. Common issues:

#### Issue A: Database Connection During Build

**Error**: "ECONNREFUSED" or database connection error

**Fix**: Set in Coolify environment variables (Build-time):

```
DATABASE_URI=postgresql://placeholder:placeholder@localhost:5432/placeholder
SKIP_MIGRATIONS=true
```

#### Issue B: Missing Dependencies

**Error**: "Cannot find module" errors

**Fix**: The Dockerfile now installs all dependencies including devDependencies. If this still happens:

1. Check if `npm install --legacy-peer-deps` completed successfully in logs
2. May need to install specific missing packages

#### Issue C: TypeScript/Compilation Errors

**Error**: TypeScript compilation errors

**Fix**:

1. Check your TypeScript code for errors
2. May need to set `SKIP_ENV_VALIDATION=true` during build

### 4. Monitor Runtime Logs

After the build succeeds and container starts, check runtime logs:

```bash
# In Coolify, click "Logs" tab
# Or SSH to server:
docker logs payload-app --tail=100 -f
```

You should see:

```
🚀 Starting Payload CMS application...
✨ Migrations completed successfully!
✅ Starting server...
ready - started server on 0.0.0.0:3019
```

### 5. Test the Application

After deployment, run the health check:

```bash
node health-check.js
```

Or visit: https://healthylifestyletips.online/api/health

Expected response:

```json
{
  "status": "ok",
  "timestamp": "...",
  "uptime": ...,
  "environment": "production"
}
```

## Troubleshooting

### If You See "Could not find a production build in the '.next' directory"

This means the build failed. Check:

1. Build logs for errors
2. Make sure DATABASE_URI is set during build
3. Verify PAYLOAD_SECRET is set
4. Check if all dependencies installed correctly

### If You See "Error: Cannot find module '/app/server.js'"

This is fixed in the new version. Make sure you redeployed with the latest code.

### If You See Database Connection Errors

Make sure:

1. PostgreSQL container is running
2. DATABASE_URI environment variable is correct
3. Database is accessible from app container

### If You See Port Already in Use

Check if the port is already occupied:

```bash
docker ps
docker logs payload-app
```

## Environment Variables

Required in Coolify (Runtime):

```
DATABASE_URI=postgresql://payload:password123@postgres:5432/payload
PAYLOAD_SECRET=your-secret-key-here
NODE_ENV=production
NEXT_PUBLIC_SERVER_URL=https://healthylifestyletips.online
PORT=3019
```

Optional for build:

```
SKIP_MIGRATIONS=true
PAYLOAD_DISABLE_EMAIL=true
```

## Quick Reference

**Rebuild command**: Click "Redeploy" in Coolify
**Check logs**: Coolify Dashboard → Application → Logs tab
**Test health**: `curl https://healthylifestyletips.online/api/health`
**View running containers**: `docker ps` (if you have SSH access)

## Support

If the build still fails:

1. Copy the full build log output
2. Note the exact error message
3. Check which step failed (install, build, start)
4. Share the logs for further assistance

---

**Status**: Changes pushed to deployment branch ✅  
**Action Required**: Redeploy in Coolify 🚀  
**What to Watch**: Build logs for specific error messages 👀
