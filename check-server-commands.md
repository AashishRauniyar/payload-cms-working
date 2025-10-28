# Server Diagnostic Commands

Since Docker is not available locally, here are the commands to run **on your deployment server** to diagnose the issue.

## Quick Check (SSH to your server and run)

```bash
# 1. Check if containers are running
docker ps -a

# 2. Check app container status specifically
docker ps -a | grep -E "payload|NAME"

# 3. Check app logs (last 100 lines)
docker logs payload-app --tail=100

# 4. Check if container is actually running
docker inspect payload-app --format '{{.State.Status}}'

# 5. Check container health
docker inspect payload-app --format '{{.State.Health.Status}}'

# 6. Check container resource usage
docker stats payload-app --no-stream

# 7. Check if app is listening on port 3000 inside container
docker exec -it payload-app sh -c 'ss -lntp || netstat -lntp'

# 8. Test health endpoint from inside container
docker exec -it payload-app sh -c 'curl -sv http://localhost:3000/api/health'

# 9. Check PostgreSQL status
docker logs payload-postgres --tail=50

# 10. Check if database is accessible from app
docker exec -it payload-app sh -c 'pg_isready -h postgres -p 5432'

# 11. Check environment variables
docker exec -it payload-app sh -c 'env | grep -E "(DATABASE_URI|PAYLOAD_SECRET|NODE_ENV|PORT)"'

# 12. Restart the container
docker restart payload-app

# 13. If using Docker Compose
docker-compose ps
docker-compose logs app --tail=100
docker-compose restart app
```

## For Coolify Users

If you're using Coolify, you can:

1. **Access Coolify Dashboard**
   - Go to your Coolify instance URL
   - Navigate to your application
   - Click on the application name

2. **Check Build Logs**
   - Look for recent deployments
   - Check if the build was successful
   - Look for any errors in the build process

3. **Check Runtime Logs**
   - Click on "Logs" tab
   - Look for recent errors or crashes
   - Check if the app started successfully

4. **Check Resource Limits**
   - Click on "Settings" or "Resources"
   - Verify CPU and Memory limits
   - Ensure they're sufficient for your app

5. **Restart Service**
   - Click "Restart" or "Redeploy"
   - Monitor the logs during restart

## All-in-One Diagnostic Script

Copy and paste this into your server's terminal:

```bash
#!/bin/bash
echo "=== CONTAINER STATUS ==="
docker ps -a

echo ""
echo "=== APP LOGS (last 50 lines) ==="
docker logs payload-app --tail=50

echo ""
echo "=== CONTAINER STATUS ==="
docker inspect payload-app --format 'Status: {{.State.Status}} | Health: {{.State.Health.Status}} | Restarts: {{.RestartCount}}'

echo ""
echo "=== LISTENING PORTS ==="
docker exec payload-app sh -c 'ss -lntp 2>/dev/null || netstat -lntp 2>/dev/null || echo "Cannot check ports"'

echo ""
echo "=== RESOURCE USAGE ==="
docker stats payload-app --no-stream

echo ""
echo "=== HEALTH ENDPOINT TEST ==="
docker exec payload-app sh -c 'curl -sv http://localhost:3000/api/health' 2>&1 || echo "Health check failed"
```

## Common Issues to Look For

### 1. Container is Stopped/Exited

**Symptom:** Container shows "Exited" status
**Solution:**

```bash
docker logs payload-app  # Check why it stopped
docker restart payload-app  # Try to restart
```

### 2. Out of Memory

**Symptom:** Container restarts frequently
**Solution:** Increase memory limit in Coolify settings

### 3. Database Connection Error

**Symptom:** Logs show "ECONNREFUSED" or "Connection refused"
**Solution:**

```bash
docker logs payload-postgres  # Check database
docker restart payload-postgres  # Restart database
```

### 4. Port Binding Issue

**Symptom:** App is running but not accessible
**Solution:** Check port mappings in Coolify/Docker Compose

### 5. SSL/Certificate Issue

**Symptom:** HTTPS works for cert but app times out
**Solution:** Check Traefik/SSL configuration in Coolify

## Next Steps

1. Run the diagnostic script above on your server
2. Check the output and identify the specific issue
3. Use the appropriate solution based on the error
4. If stuck, save the logs and contact support

## Need Help?

If you can't access your server, you can also:

- Access Coolify web terminal (if available)
- Use Coolify's built-in SSH terminal
- Contact your hosting provider for server access
