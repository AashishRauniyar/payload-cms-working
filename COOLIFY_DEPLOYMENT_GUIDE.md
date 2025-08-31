# Coolify Deployment Guide for Payload CMS

This guide will help you deploy your Payload CMS application to Coolify with proper database configuration and environment setup.

## Prerequisites

1. Coolify instance running on your server
2. Domain name pointing to your Coolify server
3. PostgreSQL database (can be created in Coolify)

## Step 1: Prepare Your Repository

Ensure your repository has the following files (already created):
- `Dockerfile.coolify` (optimized for Coolify)
- `start-coolify.sh` (Coolify startup script)
- `docker-compose.yml` (for local testing)
- `build-ci.sh` (CI/CD script)

## Step 2: Create Database in Coolify

1. **Login to Coolify Dashboard**
2. **Go to "Resources" → "Add Resource" → "Database"**
3. **Select "PostgreSQL"**
4. **Configure:**
   ```
   Name: payload-postgres
   Database Name: payload
   Username: payload
   Password: [Generate strong password - save this!]
   Version: 15
   ```
5. **Deploy the database**
6. **Get the internal connection string from the database overview**

## Step 3: Create Application in Coolify

1. **Go to "Resources" → "Add Resource" → "Application"**
2. **Select "Public Repository"**
3. **Configure:**
   ```
   Repository URL: https://github.com/AashishRauniyar/payload-cms-working
   Branch: deployment
   Build Pack: Dockerfile
   ```

## Step 4: Configure Application Settings

### General Settings:
- **Name:** `payload-cms`
- **Domain:** `yourdomain.com` (or subdomain)
- **Port:** `3019`
- **Dockerfile:** `Dockerfile.coolify`

### Build Settings:
- **Build Command:** `pnpm build:compile`
- **Start Command:** `./start-coolify.sh`
- **Working Directory:** `/app`

## Step 5: Environment Variables

Add these in Coolify's Environment tab:

### Essential Variables:
```bash
# Database Connection (get from your Coolify PostgreSQL resource)
DATABASE_URI=postgresql://payload:your-password@payload-postgres:5432/payload

# Payload Security (CRITICAL - change these!)
PAYLOAD_SECRET=change-this-to-32-character-secret-key
CRON_SECRET=change-this-secure-cron-secret

# Application URLs
NEXT_PUBLIC_SERVER_URL=https://yourdomain.com
NEXT_PUBLIC_SITE_NAME=Healthy Lifestyle Tips
NEXT_PUBLIC_SITE_DESCRIPTION=Your trusted source for evidence-based health and wellness information

# Environment
NODE_ENV=production
NEXT_TELEMETRY_DISABLED=1
```

### Performance Variables (Optional):
```bash
NODE_OPTIONS=--max-old-space-size=2048
PAYLOAD_DEBUG=false
```

## Step 6: Set Resource Dependencies

In Coolify, make sure to:
1. **Connect Database:** Link your PostgreSQL database to the application
2. **Set Network:** Ensure both services are on the same Docker network
3. **Resource Dependencies:** Set the app to depend on the database

## Step 7: Deploy

1. **Click "Deploy"** in Coolify
2. **Monitor the build logs** for any issues
3. **Check application logs** after deployment
4. **Test the application** at your domain

## Step 8: Post-Deployment Setup

### Initial Admin User:
1. Visit `https://yourdomain.com/admin`
2. Create your first admin user
3. Configure your content collections

### SSL Certificate:
Coolify should automatically handle SSL via Let's Encrypt. If not:
1. Go to your application settings
2. Enable "Generate SSL Certificate"

## Troubleshooting

### Common Issues:

#### 1. Database Connection Failed
```bash
# Check database status in Coolify
# Verify DATABASE_URI format:
postgresql://username:password@database-name:5432/database
```

#### 2. Build Fails
```bash
# Use the database-less build:
pnpm build:compile

# Check build logs for specific errors
```

#### 3. Application Won't Start
```bash
# Check environment variables are set
# Verify PAYLOAD_SECRET is at least 32 characters
# Check application logs in Coolify
```

#### 4. Migration Issues
```bash
# Run migrations manually via Coolify console:
pnpm migrate

# Or reset database:
pnpm migrate:fresh
```

### Debug Commands

Access your application console in Coolify and run:

```bash
# Check environment
env | grep -E "(DATABASE|PAYLOAD|NEXT_PUBLIC)"

# Test database connection
node -e "const {Client} = require('pg'); const c = new Client({connectionString: process.env.DATABASE_URI}); c.connect().then(() => console.log('DB OK')).catch(console.error);"

# Check Payload config
pnpm payload --help
```

## Security Checklist

- [ ] Changed default `PAYLOAD_SECRET`
- [ ] Changed default `CRON_SECRET`
- [ ] Database password is strong
- [ ] Environment variables are not exposed in logs
- [ ] Domain has SSL certificate
- [ ] Database is only accessible internally

## Performance Optimization

### Resource Allocation:
- **CPU:** 1-2 cores minimum
- **RAM:** 2GB minimum (4GB recommended)
- **Storage:** 10GB+ depending on media uploads

### Scaling:
- Enable horizontal scaling in Coolify if needed
- Consider using external storage for media files
- Implement Redis caching for better performance

## Backup Strategy

### Database Backups:
1. Enable automatic backups in Coolify PostgreSQL settings
2. Set backup retention period
3. Test restore procedure

### Application Backups:
1. Repository is already version controlled
2. Environment variables should be documented securely
3. Media files should be backed up separately

## Monitoring

### Health Checks:
Coolify will automatically monitor:
- Application uptime
- Response time
- Resource usage

### Custom Monitoring:
Add these endpoints for monitoring:
- `GET /api/health` - Application health
- `GET /admin` - Admin panel accessibility

## Support and Resources

- **Coolify Documentation:** https://coolify.io/docs
- **Payload CMS Docs:** https://payloadcms.com/docs
- **Community Discord:** https://discord.gg/payload

## Next Steps

1. **Configure your collections** in the admin panel
2. **Set up your content structure**
3. **Configure media storage** if needed
4. **Set up automated backups**
5. **Monitor application performance**

---

**🎉 Your Payload CMS should now be successfully deployed on Coolify!**

Visit `https://yourdomain.com/admin` to start managing your content.
