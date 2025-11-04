#!/bin/bash

# Docker deployment test script
# This script builds and runs the Payload CMS with PostgreSQL in Docker

set -e

echo "🐳 Payload CMS Docker Deployment Script"
echo "========================================"

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

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

# Check if Docker is running
check_docker() {
    print_status "Checking Docker..."
    if ! docker info >/dev/null 2>&1; then
        print_error "Docker is not running. Please start Docker and try again."
        exit 1
    fi
    print_success "Docker is running"
}

# Clean up previous containers and volumes
cleanup() {
    print_status "Cleaning up previous containers..."
    docker-compose down -v 2>/dev/null || true
    docker system prune -f >/dev/null 2>&1 || true
    print_success "Cleanup completed"
}

# Build and start services
build_and_start() {
    print_status "Building and starting services..."
    
    # Build the application
    print_status "Building Docker image..."
    if docker-compose build --no-cache; then
        print_success "Docker image built successfully"
    else
        print_error "Failed to build Docker image"
        exit 1
    fi
    
    # Start services
    print_status "Starting services..."
    if docker-compose up -d; then
        print_success "Services started successfully"
    else
        print_error "Failed to start services"
        exit 1
    fi
}

# Wait for services to be ready
wait_for_services() {
    print_status "Waiting for services to be ready..."
    
    # Wait for database
    print_status "Waiting for PostgreSQL..."
    timeout=60
    counter=0
    
    while [ $counter -lt $timeout ]; do
        if docker-compose exec -T postgres pg_isready -U payload -d payload >/dev/null 2>&1; then
            print_success "PostgreSQL is ready"
            break
        else
            echo -n "."
            sleep 2
            counter=$((counter + 2))
        fi
    done
    
    if [ $counter -ge $timeout ]; then
        print_error "PostgreSQL did not become ready in time"
        docker-compose logs postgres
        exit 1
    fi
    
    # Wait for application
    print_status "Waiting for Payload CMS application..."
    sleep 10
    
    timeout=120
    counter=0
    
    while [ $counter -lt $timeout ]; do
        if curl -s http://localhost:3019/api/health >/dev/null 2>&1; then
            print_success "Payload CMS is ready"
            break
        else
            echo -n "."
            sleep 2
            counter=$((counter + 2))
        fi
    done
    
    if [ $counter -ge $timeout ]; then
        print_warning "Application health check failed, but container might still be starting"
        print_status "Checking application logs..."
        docker-compose logs app
    fi
}

# Show status and URLs
show_status() {
    echo ""
    print_success "🎉 Deployment completed!"
    echo ""
    echo "📋 Service Information:"
    echo "  🌐 Payload CMS: http://localhost:3019"
    echo "  🛠  Admin Panel: http://localhost:3019/admin"
    echo "  🗄  PostgreSQL: localhost:5432"
    echo ""
    echo "📊 Container Status:"
    docker-compose ps
    echo ""
    echo "📝 Useful Commands:"
    echo "  View logs: docker-compose logs -f app"
    echo "  View all logs: docker-compose logs -f"
    echo "  Stop services: docker-compose down"
    echo "  Stop and remove volumes: docker-compose down -v"
    echo ""
}

# Main execution
main() {
    echo "Starting Docker deployment..."
    echo ""
    
    check_docker
    cleanup
    build_and_start
    wait_for_services
    show_status
    
    print_success "Docker deployment completed successfully! 🚀"
    print_status "Visit http://localhost:3019/admin to create your first admin user"
}

# Handle script interruption
trap 'print_error "Script interrupted"; docker-compose down; exit 1' INT

# Run main function
main "$@"
