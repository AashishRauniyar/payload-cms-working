#!/bin/bash
set -e

echo "🚀 Deploying to Coolify..."
echo "Adding files to git..."
git add Dockerfile Dockerfile.package.json

echo "Committing changes..."
git commit -m "Fix: Simplified Docker build process for reliable deployment"

echo "Pushing to deployment branch..."
git push origin deployment

echo "✅ Changes pushed! Go to Coolify dashboard to trigger deployment."
