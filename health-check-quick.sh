#!/usr/bin/env bash
# Quick one-liner health check script
# Usage: ./health-check-quick.sh [container-name] [domain]

set -e

APP="${1:-payload-app}"
DOMAIN="${2:-healthylifestyletips.online}"
PORT="${3:-3019}"

echo "🔍 Quick Health Check"
echo "Container: $APP"
echo "Domain: $DOMAIN"
echo "Port: $PORT"
echo ""

echo "1️⃣ Containers:"
docker ps --format "table {{.Names}}\t{{.Status}}" | grep -E "(NAMES|$APP|postgres)"

echo ""
echo "2️⃣ App logs (last 20 lines):"
docker logs --tail=20 "$APP" 2>&1 | grep -i error || echo "No recent errors"

echo ""
echo "3️⃣ Health endpoint (internal):"
docker exec -it "$APP" curl -s http://localhost:$PORT/api/health || echo "❌ Health check failed"

echo ""
echo "4️⃣ Public health check:"
curl -sk "https://$DOMAIN/api/health" || echo "❌ Public health check failed"

echo ""
echo "5️⃣ DNS:"
dig +short "$DOMAIN" || nslookup "$DOMAIN" | grep Address | grep -v "#53"

echo ""
echo "6️⃣ Port bindings:"
docker port "$APP" 2>/dev/null || echo "No port mappings found"

echo ""
echo "✅ Quick check complete"

