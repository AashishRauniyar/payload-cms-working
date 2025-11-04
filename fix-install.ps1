# Fix PNPM permission errors on Windows and reinstall packages
Write-Host "🔄 Windows PNPM Permission Fix & Install Script" -ForegroundColor Cyan

# Step 1: Stop any processes that might be locking files
Write-Host "👉 Stopping Node processes that might lock files..." -ForegroundColor Yellow
taskkill /F /IM node.exe 2>$null
taskkill /F /IM npm.cmd 2>$null
taskkill /F /IM pnpm.cmd 2>$null

# Step 2: Try to clean temp directories directly
Write-Host "👉 Cleaning temporary directories..." -ForegroundColor Yellow
$nodeModulesDir = ".\node_modules"
if (Test-Path $nodeModulesDir) {
    Get-ChildItem -Path $nodeModulesDir -Recurse -Directory | 
        Where-Object { $_.Name -match "_tmp_" } | 
        ForEach-Object {
            Write-Host "Removing temp directory: $($_.FullName)" -ForegroundColor Gray
            Remove-Item -Path $_.FullName -Recurse -Force -ErrorAction SilentlyContinue
        }
}

# Step 3: Create empty .npmrc with different settings
Write-Host "👉 Creating fresh .npmrc file..." -ForegroundColor Yellow
@"
legacy-peer-deps=true
node-linker=hoisted
shamefully-hoist=true
"@ | Out-File -FilePath ".\.npmrc" -Encoding utf8 -Force

# Step 4: Try a clean install with npm first to avoid pnpm permission issues
Write-Host "👉 Installing Sharp with NPM..." -ForegroundColor Yellow
npm install --no-save sharp

# Step 5: Try pnpm install with different flags
Write-Host "👉 Installing dependencies with PNPM..." -ForegroundColor Yellow
pnpm install --shamefully-hoist --force

# Step 6: Fix Sharp specifically if needed
Write-Host "👉 Rebuilding Sharp module..." -ForegroundColor Yellow
pnpm rebuild sharp

Write-Host "✅ Installation process completed! Check for errors above." -ForegroundColor Green