#!/bin/bash
set -e

echo "🧪 Testing production build locally..."

# Set environment variables for production build
export NODE_ENV=production
export PAYLOAD_CONFIG_PATH=dist/payload.config.js
export NEXT_PUBLIC_SERVER_URL=http://localhost:3000

# Install dependencies if needed
if [ "$1" == "--fresh" ]; then
    echo "Installing fresh dependencies..."
    npm ci
fi

# Run the build
echo "Building for production..."
npm run build

# Check if build was successful
if [ $? -eq 0 ]; then
    echo "✅ Production build successful!"
    
    echo "You can now start the production server with:"
    echo "npm start"
else
    echo "❌ Production build failed!"
    exit 1
fi
