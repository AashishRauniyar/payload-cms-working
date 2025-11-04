# PowerShell Health Check Script
# Run this from your local machine (with Docker Desktop) or on your deployment server

param(
    [string]$Domain = "healthylifestyletips.online",
    [string]$WwwDomain = "www.healthylifestyletips.online",
    [string]$AppContainer = "payload-app",
    [string]$PostgresContainer = "payload-postgres",
    [string]$HealthPath = "/api/health",
    [int]$AppPort = 3019
)

function Write-Section {
    param([string]$Title)
    Write-Host ""
    Write-Host "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━" -ForegroundColor Cyan
    Write-Host "📋 $Title" -ForegroundColor Cyan
    Write-Host "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━" -ForegroundColor Cyan
}

Write-Host "==========================================" -ForegroundColor Green
Write-Host "🔍 Health Check Diagnostics" -ForegroundColor Green
Write-Host "==========================================" -ForegroundColor Green
Write-Host "Domain: $Domain"
Write-Host "WWW Domain: $WwwDomain"
Write-Host "App Container: $AppContainer"
Write-Host "PostgreSQL Container: $PostgresContainer"
Write-Host "App Port: $AppPort"
Write-Host "Health Path: $HealthPath"
Write-Host "==========================================" -ForegroundColor Green

# Check if Docker is available
try {
    docker --version | Out-Null
} catch {
    Write-Host "❌ Docker is not available. Please install Docker Desktop or run this on a server with Docker." -ForegroundColor Red
    exit 1
}

# 1. Docker containers
Write-Section "1. Docker Containers Status"
docker ps --format "table {{.Names}}`t{{.Status}}`t{{.Ports}}"

# 2. App logs
Write-Section "2. App Logs (Last 100 lines)"
docker logs --tail=100 $AppContainer 2>&1

# 3. PostgreSQL logs
Write-Section "3. PostgreSQL Logs (Last 100 lines)"
docker logs --tail=100 $PostgresContainer 2>&1

# 4. Inside app: network info
Write-Section "4. App Container Network Info"
docker exec $AppContainer sh -c "hostname; hostname -i" 2>&1

# 5. App environment
Write-Section "5. App Environment Variables"
docker exec $AppContainer sh -c "env | grep -E '(NODE_ENV|DATABASE_URI|PAYLOAD_SECRET|NEXT_PUBLIC_SERVER_URL|PORT)'" 2>&1

# 6. Listening ports
Write-Section "6. App Container Listening Ports"
docker exec $AppContainer sh -c "netstat -ano | findstr LISTENING" 2>&1

# 7. Health endpoint from inside
Write-Section "7. App Health Endpoint (from inside container)"
docker exec $AppContainer sh -c "curl -sv http://localhost:$AppPort$HealthPath" 2>&1

# 8. Port mappings
Write-Section "8. Port Mappings"
Write-Host "App container exposed ports:"
docker inspect $AppContainer --format "{{json .Config.ExposedPorts}}" | ConvertFrom-Json | ConvertTo-Json -Depth 10

Write-Host "`nApp container port bindings:"
docker inspect $AppContainer --format "{{json .NetworkSettings.Ports}}" | ConvertFrom-Json | ConvertTo-Json -Depth 10

# 9. Database connectivity
Write-Section "9. Database Connectivity from App"
# This would need pg_isready installed in container or a Node.js connection test
Write-Host "To test database connectivity, check DATABASE_URI in environment variables above"

# 10. DNS resolution
Write-Section "10. DNS Resolution"
Write-Host "Primary domain ($Domain):"
Resolve-DnsName $Domain -Type A -ErrorAction SilentlyContinue | Select-Object -First 5

Write-Host "`nWWW domain ($WwwDomain):"
Resolve-DnsName $WwwDomain -Type A -ErrorAction SilentlyContinue | Select-Object -First 5

# 11. Public health check
Write-Section "11. Public Health Check"
Write-Host "Testing: https://${Domain}${HealthPath}"
try {
    $response = Invoke-WebRequest -Uri "https://${Domain}${HealthPath}" -SkipCertificateCheck -UseBasicParsing -TimeoutSec 10
    Write-Host "Status: $($response.StatusCode)" -ForegroundColor Green
    Write-Host "Response: $($response.Content)"
} catch {
    Write-Host "❌ HTTPS health check failed: $_" -ForegroundColor Red
}

# 12. TLS check
Write-Section "12. TLS/SSL Certificate Check"
try {
    $tcpClient = New-Object System.Net.Sockets.TcpClient($Domain, 443)
    Write-Host "✅ Port 443 is accessible" -ForegroundColor Green
    $tcpClient.Close()
} catch {
    Write-Host "❌ Port 443 not accessible: $_" -ForegroundColor Red
}

# 13. Traefik logs
Write-Section "13. Traefik Logs (Last 100 lines)"
if (docker ps --format "{{.Names}}" | Select-String "traefik") {
    docker logs --tail=100 traefik 2>&1
} else {
    Write-Host "ℹ️ Traefik container not found"
}

# 14. Summary
Write-Section "Summary"
Write-Host "✅ Health check completed" -ForegroundColor Green
Write-Host ""
Write-Host "🔍 What to look for:" -ForegroundColor Yellow
Write-Host "  • (unhealthy) status → fix health path or port configuration"
Write-Host "  • App listening on 127.0.0.1 only → should be 0.0.0.0"
Write-Host "  • Port mismatches → align app port with exposed port"
Write-Host "  • DNS issues → fix DNS records"
Write-Host "  • HTTPS fails but local works → proxy/domain/SSL config issue"
Write-Host "  • Database connection errors → check DATABASE_URI"

