#!/bin/bash

# Docker Build Test Script for Payload CMS
# This script helps test the Docker build with proper error handling

echo "🐳 Starting Docker build test for Payload CMS..."

# Check if Docker is running
if ! docker info >/dev/null 2>&1; then
    echo "❌ Docker is not running. Please start Docker Desktop and try again."
    echo "💡 To start Docker Desktop:"
    echo "   - Windows: Open Docker Desktop from Start Menu"
    echo "   - Or run: 'Docker Desktop' from command line"
    exit 1
fi

echo "✅ Docker is running"

# Build the Docker image
echo "🔨 Building Docker image..."
docker build -t payload-cms:latest . 

if [ $? -eq 0 ]; then
    echo "✅ Docker build completed successfully!"
    echo "🚀 You can now run: docker-compose up"
else
    echo "❌ Docker build failed. Check the error messages above."
    exit 1
fi

echo "📋 Built image info:"
docker images payload-cms:latest

echo "🎉 Build test completed!"