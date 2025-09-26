# Safe build script for Windows
Write-Host "🔄 Starting safe build process..." -ForegroundColor Cyan

# Step 1: Set environment variables
$env:SKIP_MIGRATIONS = "true"
$env:PAYLOAD_DISABLE_EMAIL = "true"
$env:NODE_OPTIONS = "--no-deprecation"
$env:NODE_ENV = "development"

# Step 2: Verify Sharp installation
Write-Host "👉 Checking Sharp installation..." -ForegroundColor Yellow
$sharpCheck = node -e "try { require('sharp'); console.log('Sharp is properly installed'); } catch(e) { console.error('Sharp not available:', e.message); try { require('@img/sharp'); console.log('@img/sharp is available'); } catch(e2) { console.error('@img/sharp not available:', e2.message); } }"
Write-Host $sharpCheck

# Step 3: Run generate:types with error tolerance
Write-Host "👉 Running generate:types (continuing on errors)..." -ForegroundColor Yellow
pnpm run generate:types
if ($LASTEXITCODE -ne 0) {
    Write-Host "⚠️ Type generation failed but continuing..." -ForegroundColor Yellow
}

# Step 4: Run build
Write-Host "👉 Running Next.js build..." -ForegroundColor Yellow
npx next build

Write-Host "✅ Build process completed! Check for errors above." -ForegroundColor Green