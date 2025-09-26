# Deploy to Coolify
Write-Host "🚀 Preparing for Coolify deployment" -ForegroundColor Cyan
Write-Host "============================" -ForegroundColor Cyan
Write-Host ""

# Make sure everything is updated
Write-Host "👉 Adding changed files to Git..." -ForegroundColor Yellow
git add Dockerfile Dockerfile.package.json .npmrc .pnpmrc

# Commit with a clear message
Write-Host "👉 Committing changes..." -ForegroundColor Yellow
git commit -m "Fix: Switched from pnpm to npm for reliable Sharp installation in Docker"

# Push to the deployment branch
Write-Host "👉 Pushing to deployment branch..." -ForegroundColor Yellow
git push origin deployment

Write-Host "✅ Changes pushed to Git!" -ForegroundColor Green
Write-Host "Now go to Coolify dashboard to deploy the updated version."