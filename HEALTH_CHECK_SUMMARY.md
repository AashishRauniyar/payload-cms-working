# Health Check Scripts - Summary

## What Was Created

I've created a comprehensive set of health check diagnostic scripts for your Payload CMS deployment on Coolify/Docker.

## Quick Start

### Option 1: Quick Public Check (No Docker needed)

```bash
node health-check.js
```

or

```bash
pnpm health-check
```

### Option 2: On Deployment Server

```bash
chmod +x health-check.sh
./health-check.sh
```

### Option 3: Windows PowerShell

```powershell
.\health-check.ps1
```

## Current Status (from initial test)

Based on the health check run:

- ✅ **DNS**: Resolving correctly to 167.88.39.114
- ✅ **TLS/SSL**: Certificate is valid (expires Jan 26, 2026)
- ❌ **Service**: Returning 503 (Service Unavailable)
  - This indicates the app is not running or the reverse proxy is down

## Files Created

1. **`health-check.js`** - Node.js script for public endpoint checks
   - No Docker needed
   - Tests: DNS, HTTPS, Health endpoint, TLS certificate
   - Cross-platform

2. **`health-check.sh`** - Comprehensive bash script
   - Full diagnostics with Docker
   - Tests containers, logs, ports, network, database
   - For Linux/macOS servers

3. **`health-check.ps1`** - PowerShell version
   - Same features as bash script
   - For Windows environments with Docker

4. **`health-check-quick.sh`** - Quick diagnostics
   - Fast status check
   - Minimal output

5. **`HEALTH_CHECK_README.md`** - Comprehensive documentation
   - Usage instructions
   - Troubleshooting guide
   - Common issues and solutions

## Next Steps

### If the app is returning 503:

1. **Check if containers are running:**

   ```bash
   # On your server
   docker ps
   ```

2. **Check app logs:**

   ```bash
   docker logs payload-app --tail=100
   ```

3. **Check if the app is listening:**

   ```bash
   docker exec -it payload-app sh -c 'ss -lntp'
   ```

4. **Restart the service in Coolify:**
   - Log into Coolify dashboard
   - Check service status
   - Restart the service

### Run Full Diagnostics:

1. **Copy scripts to your server:**

   ```bash
   scp health-check.sh user@your-server:/path/
   ```

2. **SSH and run:**
   ```bash
   ssh user@your-server
   chmod +x health-check.sh
   ./health-check.sh
   ```

## Configuration

Default values (can be customized):

```bash
DOMAIN="healthylifestyletips.online"
APP_CONTAINER="payload-app"
POSTGRES_CONTAINER="payload-postgres"
HEALTH_PATH="/api/health"
APP_PORT=3019
```

## Integration

The health check can be integrated into:

- CI/CD pipelines
- Monitoring systems
- Automated alerting
- Cron jobs for periodic checks

## Script Comparison

| Script                  | Platform    | Docker Needed | Full Diagnostics | Quick Check |
| ----------------------- | ----------- | ------------- | ---------------- | ----------- |
| `health-check.js`       | Any         | ❌            | ❌               | ✅          |
| `health-check.sh`       | Linux/macOS | ✅            | ✅               | ❌          |
| `health-check.ps1`      | Windows     | ✅            | ✅               | ❌          |
| `health-check-quick.sh` | Linux/macOS | ✅            | ❌               | ✅          |

## Common Issues Found

From the initial run, here's what to address:

### Issue: 503 Service Unavailable

**Possible causes:**

1. App container not running
2. App crashed on startup
3. Database connection issues
4. Reverse proxy configuration problem
5. Out of memory

**Solutions:**

1. Check container status: `docker ps`
2. Check logs: `docker logs payload-app`
3. Check resource usage: `docker stats`
4. Restart service in Coolify
5. Verify environment variables are set

## Documentation

- Full guide: `HEALTH_CHECK_README.md`
- Troubleshooting: `COOLIFY_TROUBLESHOOTING.md`
- Deployment: `COOLIFY_DEPLOYMENT_GUIDE.md`

## Support

If issues persist:

1. Run `./health-check.sh` for full diagnostics
2. Check Coolify dashboard for service status
3. Review container logs
4. Check Coolify logs for proxy/SSL issues

---

**Note:** These scripts are ready to use. Copy them to your deployment server and run them to diagnose issues with your Payload CMS deployment.
