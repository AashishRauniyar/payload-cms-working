# 🚨 Coolify Deployment Fix Guide

## Issue: Build Failed with pnpm Installation Error

You encountered this error:
```
failed to solve: process "/bin/sh -c if [ -f yarn.lock ]; then yarn --frozen-lockfile; elif [ -f package-lock.json ]; then npm ci; elif [ -f pnpm-lock.yaml ]; then corepack enable pnpm && pnpm i --frozen-lockfile; else echo \"Lockfile not found.\" && exit 1; fi" did not complete successfully: exit code: 1
```

## 🔧 Quick Fix

### Option 1: Use the Fixed Dockerfile (Recommended)

I've fixed the main `Dockerfile` with these improvements:
- ✅ Proper pnpm setup with `corepack enable pnpm`
- ✅ Simplified dependency installation
- ✅ Added system dependencies (curl, libc6-compat)
- ✅ Fixed environment variable format
- ✅ Added health check endpoint

**In Coolify:**
1. Make sure you're using the **main branch** or **deployment branch**
2. Set **Dockerfile Path** to: `./Dockerfile`
3. Don't specify a custom dockerfile - use the default

### Option 2: Use Dockerfile.simple (Alternative)

If the main Dockerfile still has issues:
1. In Coolify, set **Dockerfile Path** to: `./Dockerfile.simple`

## 🚀 Coolify Configuration

### Build Settings:
```
Repository: AashishRauniyar/payload-cms-working
Branch: deployment
Build Pack: Dockerfile
Dockerfile: ./Dockerfile (default)
Port: 3019
```

### Environment Variables:
```bash
DATABASE_URI=postgresql://payload:YOUR_PASSWORD@payload-postgres:5432/payload
PAYLOAD_SECRET=your-32-character-secret-key
CRON_SECRET=your-cron-secret
NODE_ENV=production
NEXT_PUBLIC_SERVER_URL=https://yourdomain.com
NEXT_PUBLIC_SITE_NAME=Healthy Lifestyle Tips
NEXT_PUBLIC_SITE_DESCRIPTION=Your trusted source for evidence-based health and wellness information
NEXT_TELEMETRY_DISABLED=1
```

## 📝 Changes Made

### Fixed Dockerfile Issues:
1. **Added pnpm setup**: `RUN corepack enable pnpm`
2. **Simplified installation**: Removed complex conditionals
3. **Added system deps**: `libc6-compat` and `curl`
4. **Fixed ENV format**: Changed `ENV KEY value` to `ENV KEY=value`
5. **Added health check**: `/api/health` endpoint
6. **Added migration support**: Copied node_modules for payload commands

### New Health Check Endpoint:
- **URL**: `/api/health`
- **Purpose**: Coolify can monitor application health
- **Response**: JSON with status, uptime, version info

## 🔄 Retry Deployment

1. **Commit the changes** to your repository
2. **Trigger a new deployment** in Coolify
3. **Monitor the build logs** for any remaining issues
4. **Test the health endpoint**: `https://yourdomain.com/api/health`

## 📊 Expected Build Flow

```
✅ Base image with Node.js 22.12.0
✅ Install system dependencies (libc6-compat, curl)
✅ Enable pnpm with corepack
✅ Copy package.json and pnpm-lock.yaml
✅ Install dependencies with pnpm
✅ Copy source code
✅ Build with pnpm build:docker (database-less)
✅ Set up non-root user
✅ Copy built files and dependencies
✅ Start with start-coolify.sh
```

## 🆘 Still Having Issues?

### Check Build Logs for:
1. **pnpm version**: Should show pnpm being enabled
2. **Dependencies**: Should install without errors
3. **Build command**: Should run `pnpm build:docker`
4. **File copying**: Should copy all necessary files

### Common Solutions:
- **Clear Coolify build cache** and retry
- **Check branch name** (should be `deployment`)
- **Verify pnpm-lock.yaml** exists in repository
- **Check environment variables** are all set

### Debug Commands (in Coolify console):
```bash
# Check pnpm
pnpm --version

# Check files
ls -la

# Check environment
env | grep -E "(DATABASE|PAYLOAD|NEXT_PUBLIC)"

# Test health endpoint
curl http://localhost:3019/api/health
```

---

**The deployment should now work! 🎉**

If you're still having issues, check the specific error in the build logs and let me know.
