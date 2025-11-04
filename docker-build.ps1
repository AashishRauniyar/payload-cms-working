# Build with Docker (completely bypasses local permission issues)
Write-Host "🔄 Building with Docker" -ForegroundColor Cyan

# Step 1: Check if Docker is available
docker --version
if ($LASTEXITCODE -ne 0) {
    Write-Host "⚠️ Docker not available. Please install Docker and try again." -ForegroundColor Red
    exit 1
}

# Step 2: Build the Docker image
Write-Host "👉 Building Docker image..." -ForegroundColor Yellow
docker build -t payload-app .

# Step 3: Create a container to extract the build artifacts
Write-Host "👉 Creating container to extract build artifacts..." -ForegroundColor Yellow
docker create --name payload-build-container payload-app

# Step 4: Extract the build artifacts
Write-Host "👉 Extracting build artifacts..." -ForegroundColor Yellow
# Create directory if it doesn't exist
if (-not (Test-Path ".\docker-build")) {
    New-Item -Path ".\docker-build" -ItemType Directory -Force
}

# Extract .next directory (the build output)
docker cp payload-build-container:/app/.next ./docker-build/

# Step 5: Clean up
Write-Host "👉 Cleaning up..." -ForegroundColor Yellow
docker rm payload-build-container

Write-Host "✅ Docker build complete! The build artifacts are in ./docker-build/.next" -ForegroundColor Green