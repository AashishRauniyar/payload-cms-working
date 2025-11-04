# Build options menu
Write-Host "🛠️ Payload CMS Build Options" -ForegroundColor Cyan
Write-Host "==============================" -ForegroundColor Cyan
Write-Host ""

Write-Host "Choose a build option:" -ForegroundColor Yellow
Write-Host "1: Fix PNPM permissions and reinstall (recommended first try)" -ForegroundColor White
Write-Host "2: Install with NPM instead of PNPM (bypass permission issues)" -ForegroundColor White
Write-Host "3: Run safe build script (skip problematic steps)" -ForegroundColor White
Write-Host "4: Build with Docker (completely bypass local issues)" -ForegroundColor White
Write-Host "5: Deploy to Coolify (uses CI/CD - requires git commit)" -ForegroundColor White
Write-Host "q: Quit" -ForegroundColor White
Write-Host ""

$choice = Read-Host "Enter your choice (1-5, or q)"

switch ($choice) {
    "1" {
        Write-Host "Running PNPM fix script..." -ForegroundColor Cyan
        . .\fix-install.ps1
    }
    "2" {
        Write-Host "Installing with NPM instead..." -ForegroundColor Cyan
        . .\npm-install.ps1
    }
    "3" {
        Write-Host "Running safe build script..." -ForegroundColor Cyan
        . .\safe-build.ps1
    }
    "4" {
        Write-Host "Building with Docker..." -ForegroundColor Cyan
        . .\docker-build.ps1
    }
    "5" {
        Write-Host "Preparing for Coolify deployment..." -ForegroundColor Cyan
        Write-Host "Committing changes and pushing to Git..."
        git add -A
        git commit -m "Fix: Dockerfile build and dependency issues"
        git push origin deployment
        
        Write-Host "✅ Changes pushed to Git. Deploy from Coolify dashboard." -ForegroundColor Green
    }
    "q" {
        Write-Host "Exiting..." -ForegroundColor Yellow
        exit 0
    }
    default {
        Write-Host "Invalid choice. Exiting..." -ForegroundColor Red
        exit 1
    }
}