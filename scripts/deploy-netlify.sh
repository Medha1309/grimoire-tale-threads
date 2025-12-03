#!/bin/bash

# Deploy to Netlify
# Usage: ./scripts/deploy-netlify.sh [production|preview]

set -e

ENVIRONMENT=${1:-preview}

echo "🚀 Deploying to Netlify ($ENVIRONMENT)..."

# Check if Netlify CLI is installed
if ! command -v netlify &> /dev/null; then
  echo "❌ Netlify CLI not found. Installing..."
  npm install -g netlify-cli
fi

# Check if .env exists
if [ ! -f ".env" ]; then
  echo "⚠️  .env file not found. Using .env.example as template."
  echo "Please configure environment variables in Netlify dashboard."
fi

# Build the project
echo "📦 Building project..."
pnpm build

# Deploy based on environment
if [ "$ENVIRONMENT" = "production" ]; then
  echo "🌐 Deploying to production..."
  netlify deploy --prod --dir=dist
else
  echo "🔍 Deploying preview..."
  netlify deploy --dir=dist
fi

echo ""
echo "✅ Deployment complete!"
echo ""
echo "Next steps:"
echo "1. Set environment variables in Netlify dashboard:"
echo "   - VITE_FIREBASE_API_KEY"
echo "   - VITE_FIREBASE_AUTH_DOMAIN"
echo "   - VITE_FIREBASE_PROJECT_ID"
echo "   - VITE_FIREBASE_STORAGE_BUCKET"
echo "   - VITE_FIREBASE_MESSAGING_SENDER_ID"
echo "   - VITE_FIREBASE_APP_ID"
echo ""
echo "2. Visit your deployment URL"
echo "3. Test all features"
echo ""
