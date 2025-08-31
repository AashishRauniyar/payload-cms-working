#!/bin/bash

# Coolify Deployment Script
# This script helps you deploy your Payload CMS to Coolify

set -e

echo "🎯 Coolify Deployment Helper for Payload CMS"
echo "=============================================="

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

# Function to print colored output
print_status() {
    echo -e "${BLUE}[INFO]${NC} $1"
}

print_success() {
    echo -e "${GREEN}[SUCCESS]${NC} $1"
}

print_warning() {
    echo -e "${YELLOW}[WARNING]${NC} $1"
}

print_error() {
    echo -e "${RED}[ERROR]${NC} $1"
}

# Check if required files exist
check_files() {
    print_status "Checking required files..."
    
    local required_files=(
        "Dockerfile.coolify"
        "start-coolify.sh"
        "package.json"
        "src/payload.config.ts"
    )
    
    for file in "${required_files[@]}"; do
        if [[ -f "$file" ]]; then
            print_success "✓ $file exists"
        else
            print_error "✗ $file is missing"
            exit 1
        fi
    done
}

# Generate environment variables template
generate_env_template() {
    print_status "Generating environment variables template..."
    
    cat > coolify-env-template.txt << 'EOF'
# Copy these environment variables to your Coolify application

# === REQUIRED VARIABLES ===

# Database Connection (replace with your Coolify PostgreSQL connection)
DATABASE_URI=postgresql://payload:YOUR_DB_PASSWORD@YOUR_DB_NAME:5432/payload

# Security Keys (CHANGE THESE!)
PAYLOAD_SECRET=change-this-to-a-32-character-secret-key-minimum
CRON_SECRET=change-this-to-a-secure-cron-secret-key

# Application Configuration
NODE_ENV=production
NEXT_PUBLIC_SERVER_URL=https://yourdomain.com
NEXT_PUBLIC_SITE_NAME=Healthy Lifestyle Tips
NEXT_PUBLIC_SITE_DESCRIPTION=Your trusted source for evidence-based health and wellness information

# === OPTIONAL VARIABLES ===

# Performance
NODE_OPTIONS=--max-old-space-size=2048
NEXT_TELEMETRY_DISABLED=1

# Debugging (set to false in production)
PAYLOAD_DEBUG=false

# === COOLIFY SPECIFIC ===

# Build settings (if using custom build commands)
DOCKERFILE_PATH=./Dockerfile.coolify
BUILD_COMMAND=pnpm build:compile
START_COMMAND=./start-coolify.sh
PORT=3019
EOF

    print_success "Environment template created: coolify-env-template.txt"
}

# Generate secure secrets
generate_secrets() {
    print_status "Generating secure secrets..."
    
    echo ""
    echo "=== GENERATED SECRETS ==="
    echo "Copy these to your Coolify environment variables:"
    echo ""
    
    # Generate PAYLOAD_SECRET (32 characters)
    PAYLOAD_SECRET=$(openssl rand -hex 16 2>/dev/null || head -c 32 /dev/urandom | xxd -p -c 32)
    echo "PAYLOAD_SECRET=$PAYLOAD_SECRET"
    
    # Generate CRON_SECRET (32 characters)
    CRON_SECRET=$(openssl rand -hex 16 2>/dev/null || head -c 32 /dev/urandom | xxd -p -c 32)
    echo "CRON_SECRET=$CRON_SECRET"
    
    echo ""
    print_warning "Save these secrets securely! You'll need them in Coolify."
    echo ""
}

# Build test (local)
test_build() {
    print_status "Testing local build..."
    
    if command -v pnpm &> /dev/null; then
        print_status "Running pnpm build:compile..."
        if pnpm build:compile; then
            print_success "Build test successful!"
        else
            print_error "Build test failed!"
            exit 1
        fi
    else
        print_warning "pnpm not found, skipping build test"
    fi
}

# Display deployment checklist
deployment_checklist() {
    echo ""
    echo "🚀 COOLIFY DEPLOYMENT CHECKLIST"
    echo "================================"
    echo ""
    echo "□ 1. Create PostgreSQL database in Coolify"
    echo "□ 2. Note down the database connection string"
    echo "□ 3. Create new application in Coolify"
    echo "□ 4. Set repository to: https://github.com/AashishRauniyar/payload-cms-working"
    echo "□ 5. Set branch to: deployment"
    echo "□ 6. Set Dockerfile to: Dockerfile.coolify"
    echo "□ 7. Add all environment variables from coolify-env-template.txt"
    echo "□ 8. Update DATABASE_URI with your actual database connection"
    echo "□ 9. Update NEXT_PUBLIC_SERVER_URL with your domain"
    echo "□ 10. Deploy and monitor logs"
    echo "□ 11. Visit /admin to create first user"
    echo ""
}

# Display troubleshooting tips
troubleshooting_tips() {
    echo ""
    echo "🔧 TROUBLESHOOTING TIPS"
    echo "======================"
    echo ""
    echo "Build Issues:"
    echo "- Ensure you're using 'pnpm build:compile' as build command"
    echo "- Check that PAYLOAD_SECRET is set during build"
    echo ""
    echo "Database Issues:"
    echo "- Verify DATABASE_URI format and credentials"
    echo "- Ensure database and app are on same Docker network"
    echo "- Check database is running before starting app"
    echo ""
    echo "Runtime Issues:"
    echo "- Check all required environment variables are set"
    echo "- Monitor application logs in Coolify"
    echo "- Verify domain and SSL certificate"
    echo ""
    echo "Migration Issues:"
    echo "- Run 'pnpm migrate' manually via Coolify console"
    echo "- Check database permissions"
    echo ""
}

# Main execution
main() {
    echo "Starting deployment preparation..."
    echo ""
    
    # Run checks
    check_files
    generate_env_template
    generate_secrets
    
    # Optional build test
    read -p "Do you want to test the build locally? (y/n): " -n 1 -r
    echo ""
    if [[ $REPLY =~ ^[Yy]$ ]]; then
        test_build
    fi
    
    # Display guides
    deployment_checklist
    troubleshooting_tips
    
    print_success "Deployment preparation complete!"
    print_status "Next steps:"
    echo "1. Review coolify-env-template.txt"
    echo "2. Follow the deployment checklist above"
    echo "3. Deploy in Coolify dashboard"
    echo ""
    print_success "Good luck with your deployment! 🚀"
}

# Run main function
main "$@"
