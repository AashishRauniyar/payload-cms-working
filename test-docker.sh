#!/bin/bash
set -e

echo "🧪 Testing Docker build locally..."

# Build the Docker image
echo "Building Docker image..."
docker build -t payload-cms-test -f Dockerfile .

# Check if build was successful
if [ $? -eq 0 ]; then
    echo "✅ Docker build successful!"
    
    echo "Starting container for testing..."
    docker run -p 3000:3000 --rm -it \
      -e NODE_ENV=production \
      -e PAYLOAD_CONFIG_PATH=dist/payload.config.js \
      -e MONGODB_URI=mongodb://localhost:27017/payload-cms-test \
      -e PAYLOAD_SECRET=test-secret-key \
      -e NEXT_PUBLIC_SERVER_URL=http://localhost:3000 \
      payload-cms-test
else
    echo "❌ Docker build failed!"
    exit 1
fi
