# Fix Applied: Missing server.js File

## Problem

The application was crashing with error:

```
Error: Cannot find module '/app/server.js'
```

## Root Cause

The Docker startup command was trying to run `node server.js`, but Next.js apps don't create a standalone `server.js` file unless configured for standalone builds.

## Solution

Changed the startup command to use `npm start` which runs the `next start` command defined in `package.json`.

## Files Modified

1. **`docker-compose.yml`** (Line 58)
   - Changed from: `exec node server.js`
   - Changed to: `exec npm start`

2. **`start.sh`** (Line 44)
   - Changed from: `exec node server.js`
   - Changed to: `exec pnpm start`

3. **`start-coolify.sh`** (Line 13)
   - Changed from: `node dist/server.js`
   - Changed to: `exec pnpm start`

## How It Works Now

The startup process:

1. Runs database migrations via `migrate.js`
2. Starts Next.js server using `npm start` or `pnpm start`
3. `npm start` runs `next start` (as defined in package.json)

## Deploying the Fix

To apply this fix to your deployment:

### Option 1: Rebuild the container

If using docker-compose:

```bash
docker-compose down
docker-compose build
docker-compose up -d
```

### Option 2: Update in Coolify

1. Pull the latest code:

   ```bash
   git pull origin deployment
   ```

2. In Coolify dashboard:
   - Go to your application
   - Click "Redeploy" or "Rebuild"
   - Wait for the build to complete

### Option 3: Quick fix without rebuild

If you have SSH access to the server:

```bash
# Edit the running container (temporary fix)
docker exec -it payload-app sh -c "sed -i 's/node server.js/npm start/g' /path/to/script"
# Or better: restart with the fixed command
```

## Expected Result

After applying the fix, the logs should show:

```
🚀 Starting Payload CMS application...
🚀 Running Payload migrations...
✅ Migration output: [INFO] Done.
✨ Migrations completed successfully!
✅ Starting server...
ready - started server on 0.0.0.0:3019
```

## Verification

After deployment, run the health check:

```bash
node health-check.js
```

You should now see:

- ✅ DNS: Resolving correctly
- ✅ TLS/SSL: Certificate valid
- ✅ Health endpoint: Returns 200 OK

## Next Steps

1. **Commit and push** these changes:

   ```bash
   git add docker-compose.yml start.sh start-coolify.sh
   git commit -m "fix: use npm start instead of node server.js"
   git push origin deployment
   ```

2. **Redeploy** in Coolify

3. **Monitor logs** to ensure the app starts correctly:

   ```bash
   docker logs payload-app --tail=50 -f
   ```

4. **Test the health endpoint**:
   ```bash
   curl https://healthylifestyletips.online/api/health
   ```

---

**Status**: Fix ready to deploy 🚀  
**Issue**: Missing server.js file ❌  
**Solution**: Use npm start command ✅  
**Files Changed**: 3 files
