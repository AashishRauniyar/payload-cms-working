# Health Check Scripts

Comprehensive diagnostic scripts to troubleshoot your Payload CMS deployment on Docker/Coolify.

## Available Scripts

### 1. `health-check.js` - Public Endpoint Check (Cross-platform)

**Quick and simple** - Run locally without Docker to check public endpoints.

**Features:**

- ✅ DNS resolution check
- ✅ Root URL accessibility
- ✅ Health endpoint testing
- ✅ TLS/SSL certificate verification
- ✅ No Docker required
- ✅ Cross-platform (Windows, macOS, Linux)

**Usage:**

```bash
# Basic usage
node health-check.js

# Or with pnpm
pnpm health-check

# Specify domain
node health-check.js yourdomain.com
```

### 2. `health-check.sh` - Full Diagnostics (Linux/macOS/Git Bash)

Complete health check with all diagnostic tests.

**Features:**

- ✅ Docker container status
- ✅ Application logs
- ✅ PostgreSQL logs
- ✅ Network information
- ✅ Port mappings
- ✅ Health endpoint checks (internal & external)
- ✅ DNS resolution
- ✅ TLS/SSL certificate verification
- ✅ Database connectivity tests
- ✅ Traefik logs (if available)

**Usage:**

```bash
# Basic usage
./health-check.sh

# Custom configuration
DOMAIN=yourdomain.com APP_CONTAINER=your-app ./health-check.sh

# Or with environment variables
export DOMAIN=yourdomain.com
export APP_CONTAINER=your-app
./health-check.sh
```

**Installation:**

```bash
chmod +x health-check.sh
```

### 2. `health-check.ps1` - PowerShell Version (Windows)

Same functionality as the bash script but for PowerShell environments.

**Usage:**

```powershell
# Basic usage
.\health-check.ps1

# Custom configuration
.\health-check.ps1 -Domain "yourdomain.com" -AppContainer "your-app"

# See all parameters
Get-Help .\health-check.ps1 -Full
```

### 3. `health-check-quick.sh` - Quick Check

Fast diagnostic for quick status checks.

**Usage:**

```bash
# Basic usage
./health-check-quick.sh

# Specify container and domain
./health-check-quick.sh payload-app healthylifestyletips.online 3019
```

## Running on Different Environments

### Option A: On Local Machine (Windows)

Use the PowerShell script if you have Docker Desktop installed:

```powershell
.\health-check.ps1
```

### Option B: On Deployment Server (via SSH)

Copy the script to your server and run:

```bash
# Copy script
scp health-check.sh user@your-server:/path/to/project/

# SSH into server
ssh user@your-server

# Run script
cd /path/to/project
chmod +x health-check.sh
./health-check.sh
```

### Option C: Direct in Coolify Terminal

If your Coolify deployment includes SSH access:

```bash
# Access terminal in Coolify dashboard
cd /app
curl -o health-check.sh https://raw.githubusercontent.com/your-repo/health-check.sh
chmod +x health-check.sh
./health-check.sh
```

### Option D: Run Docker Commands Manually

If you can't run the scripts, execute commands manually:

```bash
# 1. Check containers
docker ps --format "table {{.Names}}\t{{.Status}}\t{{.Ports}}"

# 2. Check app logs
docker logs --tail=100 payload-app

# 3. Check health endpoint from inside container
docker exec -it payload-app sh -c 'curl -sv http://localhost:3000/api/health'

# 4. Check listening ports
docker exec -it payload-app sh -c 'ss -lntp || netstat -lntp'

# 5. Check environment
docker exec -it payload-app sh -c 'env | grep -E "(NODE_ENV|DATABASE_URI|PORT)"'

# 6. Check port mappings
docker inspect payload-app --format '{{json .NetworkSettings.Ports}}' | jq

# 7. Test public health
curl -vk https://healthylifestyletips.online/api/health
```

## Common Issues and Solutions

### Issue 1: Health Endpoint Returns 404

**Symptoms:** `curl http://localhost:3000/api/health` returns 404

**Solutions:**

- Verify the health endpoint exists at `src/app/api/health/route.ts`
- Check if the route is properly exported
- Ensure Next.js app is running on the correct port

### Issue 2: App Not Binding to 0.0.0.0

**Symptoms:** Health check works inside container but not externally

**Solutions:**

- Verify your Next.js server binds to `0.0.0.0` (default behavior)
- Check `next.config.js` for hostname restrictions
- Ensure Docker port mapping is correct: `3019:3019`

### Issue 3: Port Mismatch

**Symptoms:** Container listening on different port than exposed

**Solutions:**

- Update `docker-compose.yml` port mapping to match app port
- Set `PORT` environment variable if needed
- Check Next.js default port (usually 3000)

### Issue 4: Database Connection Errors

**Symptoms:** App logs show connection refused to PostgreSQL

**Solutions:**

- Verify `DATABASE_URI` in environment variables
- Check PostgreSQL container is running: `docker ps | grep postgres`
- Test connection from app container:
  ```bash
  docker exec -it payload-app sh -c 'psql "$DATABASE_URI" -c "SELECT 1"'
  ```

### Issue 5: DNS Not Resolving

**Symptoms:** Public health check fails but internal works

**Solutions:**

- Check DNS records: `dig healthylifestyletips.online`
- Verify domain is pointing to server IP
- Check Coolify domain configuration

### Issue 6: TLS/SSL Issues

**Symptoms:** HTTPS connection fails

**Solutions:**

- Verify SSL certificate in Coolify dashboard
- Check Traefik configuration
- Ensure domain is properly configured
- Test with: `openssl s_client -connect healthylifestyletips.online:443 -servername healthylifestyletips.online`

## Configuration Reference

### Environment Variables

The scripts use these default values (configurable):

```bash
DOMAIN="healthylifestyletips.online"          # Your primary domain
WWW_DOMAIN="www.healthylifestyletips.online" # WWW subdomain
APP_CONTAINER="payload-app"                   # App container name
POSTGRES_CONTAINER="payload-postgres"         # PostgreSQL container name
HEALTH_PATH="/api/health"                     # Health check endpoint
APP_PORT=3019                                 # App port
```

### Expected Health Response

Your health endpoint should return:

```json
{
  "status": "ok",
  "timestamp": "2024-01-01T00:00:00.000Z",
  "uptime": 123.456,
  "environment": "production"
}
```

## Integration with CI/CD

### GitHub Actions Example

```yaml
name: Health Check
on:
  schedule:
    - cron: '*/5 * * * *' # Every 5 minutes

jobs:
  health-check:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      - name: Run health check
        run: |
          chmod +x health-check.sh
          ./health-check.sh > health-report.txt
      - name: Notify on failure
        if: failure()
        run: |
          # Send notification
```

## Troubleshooting Checklist

When running health checks, verify:

- [ ] All containers are running (`docker ps`)
- [ ] App container shows "healthy" status
- [ ] No errors in app logs
- [ ] Health endpoint returns 200 OK from inside container
- [ ] Health endpoint returns 200 OK from public URL
- [ ] DNS resolves to correct IP address
- [ ] TLS certificate is valid and not expired
- [ ] Database connection is established
- [ ] Port mappings are correct
- [ ] Environment variables are set correctly

## Related Documentation

- [COOLIFY_DEPLOYMENT_GUIDE.md](./COOLIFY_DEPLOYMENT_GUIDE.md)
- [COOLIFY_TROUBLESHOOTING.md](./COOLIFY_TROUBLESHOOTING.md)
- [DEPLOYMENT_GUIDE.md](./DEPLOYMENT_GUIDE.md)

## Support

If you encounter issues:

1. Run the full health check script
2. Save the output
3. Check the troubleshooting guide
4. Review logs for specific errors
5. Verify environment configuration

---

**Note:** These scripts require Docker to be installed and running. For local development on Windows, install Docker Desktop.
