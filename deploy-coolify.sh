#!/bin/bash
set -e

echo "🚀 Deploying to Coolify..."
echo "Adding files to git..."
git add Dockerfile Dockerfile.package.json build.sh

echo "Committing changes..."
git commit -m "Fix: Added build script for Docker deployment"

echo "Pushing to deployment branch..."
git push origin deployment

echo "✅ Changes pushed! Go to Coolify dashboard to trigger deployment."
