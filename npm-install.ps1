# Direct npm install script (bypasses pnpm)
Write-Host "🔄 Installing with npm (bypass pnpm permission issues)" -ForegroundColor Cyan

# Step 1: Move current node_modules out of the way if it exists
if (Test-Path ".\node_modules") {
    Write-Host "👉 Moving existing node_modules to node_modules_old..." -ForegroundColor Yellow
    if (Test-Path ".\node_modules_old") {
        Remove-Item -Path ".\node_modules_old" -Recurse -Force -ErrorAction SilentlyContinue
    }
    # Attempt to move or just remove if move fails
    try {
        Move-Item -Path ".\node_modules" -Destination ".\node_modules_old" -Force
    } catch {
        Write-Host "⚠️ Could not move node_modules, attempting to delete..." -ForegroundColor Yellow
        Remove-Item -Path ".\node_modules" -Recurse -Force -ErrorAction SilentlyContinue
    }
}

# Step 2: Install dependencies with npm
Write-Host "👉 Installing dependencies with npm..." -ForegroundColor Yellow
npm install --legacy-peer-deps

# Step 3: Install Sharp specifically
Write-Host "👉 Installing Sharp specifically..." -ForegroundColor Yellow
npm install --legacy-peer-deps sharp@0.34.2

Write-Host "✅ npm installation complete!" -ForegroundColor Green
Write-Host "You can now run 'npm run build' to build the project."