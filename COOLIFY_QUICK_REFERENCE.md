# 🚀 Coolify Quick Deploy Reference

## TL;DR - Deploy in 5 Steps

### 1. **Create Database**
```
Coolify → Resources → Add → Database → PostgreSQL
Name: payload-postgres
Database: payload
User: payload
Password: [generate strong]
```

### 2. **Create Application**
```
Coolify → Resources → Add → Application → Public Repository
Repository: https://github.com/AashishRauniyar/payload-cms-working
Branch: deployment
Dockerfile: Dockerfile.coolify
```

### 3. **Environment Variables**
```bash
DATABASE_URI=postgresql://payload:PASSWORD@payload-postgres:5432/payload
PAYLOAD_SECRET=your-32-character-secret-key
NEXT_PUBLIC_SERVER_URL=https://yourdomain.com
NODE_ENV=production
CRON_SECRET=your-cron-secret
```

### 4. **Deploy Settings**
```
Build Command: pnpm build:compile
Start Command: ./start-coolify.sh
Port: 3019
Domain: yourdomain.com
```

### 5. **Deploy & Test**
```
Click Deploy → Monitor Logs → Visit /admin
```

---

## 📋 Essential Files Created

- `Dockerfile.coolify` - Optimized Docker build
- `start-coolify.sh` - Smart startup script
- `deploy-coolify.sh` - Deployment helper
- `COOLIFY_DEPLOYMENT_GUIDE.md` - Complete guide

---

## 🔧 Quick Commands

```bash
# Run deployment helper
./deploy-coolify.sh

# Test build locally
pnpm build:compile

# Test database connection
node -e "const {Client} = require('pg'); const c = new Client({connectionString: process.env.DATABASE_URI}); c.connect().then(() => console.log('DB OK')).catch(console.error);"
```

---

## 🆘 Common Fixes

**Build fails?**
```bash
Use: ./Dockerfile (fixed version)
Check: pnpm-lock.yaml exists
Check: Branch is 'deployment'
```

**pnpm installation fails?**
```bash
Fix: Updated Dockerfile with proper pnpm setup
Use: Dockerfile.simple as alternative
Clear: Coolify build cache and retry
```

**Database connection fails?**
```bash
Format: postgresql://user:pass@host:5432/db
Check: Database is running
Check: Both services on same network
```

**App won't start?**
```bash
Check: All env vars set
Check: PAYLOAD_SECRET > 32 chars
Check: /api/health endpoint works
```

---

## 🎯 Success Indicators

✅ Build completes without errors  
✅ Database migrations run successfully  
✅ App starts and responds on port 3019  
✅ `/admin` loads without errors  
✅ Can create first admin user  

---

*Need help? Check the full guide: `COOLIFY_DEPLOYMENT_GUIDE.md`*
