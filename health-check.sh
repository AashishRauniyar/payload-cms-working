#!/usr/bin/env bash
set -euo pipefail

# Configuration
DOMAIN="${DOMAIN:-healthylifestyletips.online}"
WWW_DOMAIN="${WWW_DOMAIN:-www.healthylifestyletips.online}"
APP_CONTAINER="${APP_CONTAINER:-payload-app}"
POSTGRES_CONTAINER="${POSTGRES_CONTAINER:-payload-postgres}"
HEALTH_PATH="/api/health"
APP_PORT=3019

echo "=========================================="
echo "🔍 Health Check Diagnostics"
echo "=========================================="
echo "Domain: $DOMAIN"
echo "WWW Domain: $WWW_DOMAIN"
echo "App Container: $APP_CONTAINER"
echo "PostgreSQL Container: $POSTGRES_CONTAINER"
echo "App Port: $APP_PORT"
echo "Health Path: $HEALTH_PATH"
echo "=========================================="
echo ""

# Function to print section headers
section() {
    echo ""
    echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
    echo "📋 $1"
    echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
}

# 1. Docker containers
section "1. Docker Containers Status"
docker ps --format "table {{.Names}}\t{{.Status}}\t{{.Ports}}" || {
    echo "❌ Docker not available or containers not running"
    exit 1
}

# 2. App logs
section "2. App Logs (Last 100 lines)"
docker logs --tail=100 "$APP_CONTAINER" 2>&1 || echo "⚠️ Could not fetch app logs"

# 3. PostgreSQL logs
section "3. PostgreSQL Logs (Last 100 lines)"
docker logs --tail=100 "$POSTGRES_CONTAINER" 2>&1 || echo "⚠️ Could not fetch PostgreSQL logs"

# 4. Inside app: hostname and IP
section "4. App Container Network Info"
docker exec -it "$APP_CONTAINER" sh -c '
    echo "Hostname: $(hostname)"
    echo "Internal IP: $(hostname -i 2>/dev/null || ip route get 8.8.8.8 | awk '\''{print $7}'\'')"
    echo ""
    echo "Environment Variables:"
    env | grep -E "(NODE_ENV|DATABASE_URI|PAYLOAD_SECRET|NEXT_PUBLIC_SERVER_URL|PORT)" | sort
' 2>&1 || echo "⚠️ Could not execute commands in app container"

# 5. Inside app: listening sockets
section "5. App Container Listening Ports"
docker exec -it "$APP_CONTAINER" sh -c '
    if command -v ss >/dev/null 2>&1; then
        ss -lntp
    elif command -v netstat >/dev/null 2>&1; then
        netstat -lntp
    else
        echo "Neither ss nor netstat available, checking process:"
        ps aux | grep -i node || true
    fi
' 2>&1 || echo "⚠️ Could not check listening ports"

# 6. Inside app: health endpoint from localhost
section "6. App Health Endpoint (from inside container)"
docker exec -it "$APP_CONTAINER" sh -c "
    echo 'Testing: http://localhost:${APP_PORT}${HEALTH_PATH}'
    curl -sv http://localhost:${APP_PORT}${HEALTH_PATH} 2>&1 || echo '⚠️ Health endpoint not accessible'
" 2>&1 || echo "⚠️ Could not test health endpoint"

# 7. Docker port mappings
section "7. Port Mappings"
echo "App container exposed ports:"
docker inspect "$APP_CONTAINER" --format '{{json .Config.ExposedPorts}}' | jq '.' 2>/dev/null || \
    docker inspect "$APP_CONTAINER" --format '{{json .Config.ExposedPorts}}' || echo "⚠️ Could not get exposed ports"

echo ""
echo "App container port bindings:"
docker inspect "$APP_CONTAINER" --format '{{json .NetworkSettings.Ports}}' | jq '.' 2>/dev/null || \
    docker inspect "$APP_CONTAINER" --format '{{json .NetworkSettings.Ports}}' || echo "⚠️ Could not get port bindings"

# 8. Database connectivity from app
section "8. Database Connectivity from App"
docker exec -it "$APP_CONTAINER" sh -c '
    if command -v pg_isready >/dev/null 2>&1; then
        echo "Checking PostgreSQL readiness..."
        PGHOST=$(echo $DATABASE_URI | sed -n "s/.*@\([^:]*\):.*/\1/p")
        PGPORT=$(echo $DATABASE_URI | sed -n "s/.*:\([0-9]*\)\/.*/\1/p")
        echo "Host: $PGHOST, Port: $PGPORT"
        pg_isready -h "${PGHOST:-postgres}" -p "${PGPORT:-5432}" || echo "⚠️ PostgreSQL not ready"
    else
        echo "pg_isready not available, trying basic connection test..."
        node -e "
            const uri = process.env.DATABASE_URI;
            if (uri) {
                const host = uri.match(/@([^:]+):/)?.[1];
                console.log(\"Testing connection to:\", host);
            } else {
                console.log(\"No DATABASE_URI found\");
            }
        "
    fi
' 2>&1 || echo "⚠️ Could not test database connectivity"

# 9. DNS resolution
section "9. DNS Resolution"
echo "Primary domain ($DOMAIN):"
dig +short "$DOMAIN" 2>/dev/null || nslookup "$DOMAIN" 2>/dev/null || echo "⚠️ DNS resolution failed"

echo ""
echo "WWW domain ($WWW_DOMAIN):"
dig +short "$WWW_DOMAIN" 2>/dev/null || nslookup "$WWW_DOMAIN" 2>/dev/null || echo "⚠️ DNS resolution failed"

# 10. Public health check (HTTPS)
section "10. Public Health Check (HTTPS)"
echo "Testing: https://${DOMAIN}${HEALTH_PATH}"
curl -vk "https://${DOMAIN}${HEALTH_PATH}" 2>&1 | head -50 || echo "⚠️ HTTPS health check failed"

echo ""
echo "Testing: https://${WWW_DOMAIN}${HEALTH_PATH}"
curl -vk "https://${WWW_DOMAIN}${HEALTH_PATH}" 2>&1 | head -50 || echo "⚠️ HTTPS health check failed"

# 11. TLS/SSL inspection
section "11. TLS/SSL Certificate Check"
openssl s_client -connect "${DOMAIN}:443" -servername "${DOMAIN}" -brief </dev/null 2>&1 | head -20 || echo "⚠️ TLS check failed"

# 12. Traefik logs (if available)
section "12. Traefik Logs (Last 100 lines)"
if docker ps --format "{{.Names}}" | grep -q traefik; then
    docker logs --tail=100 traefik 2>&1 || echo "⚠️ Could not fetch Traefik logs"
else
    echo "ℹ️ Traefik container not found (may not be using Coolify/Traefik)"
fi

# 13. Docker network info
section "13. Docker Network Info"
docker network inspect payload-network 2>/dev/null | jq '.[0].Containers' || echo "⚠️ Network inspection failed or network not found"

# 14. Summary
section "Summary"
echo "✅ Health check completed"
echo ""
echo "🔍 What to look for:"
echo "  • (unhealthy) status → fix health path or port configuration"
echo "  • App listening on 127.0.0.1 only → should be 0.0.0.0"
echo "  • Port mismatches → align app port with exposed port"
echo "  • DNS issues → fix DNS records"
echo "  • HTTPS fails but local works → proxy/domain/SSL config issue"
echo "  • Database connection errors → check DATABASE_URI"
echo ""
echo "For detailed troubleshooting, check: COOLIFY_TROUBLESHOOTING.md"

