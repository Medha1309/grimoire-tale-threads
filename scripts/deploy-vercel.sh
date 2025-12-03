#!/bin/bash

# Deploy to Vercel
# Usage: ./scripts/deploy-vercel.sh [production|preview]

set -e

ENVIRONMENT=${1:-preview}

echo "🚀 Deploying to Vercel ($ENVIRONMENT)..."

# Check if Vercel CLI is installed
if ! command -v vercel &> /dev/null; then
  echo "❌ Vercel CLI not found. Installing..."
  npm install -g vercel
fi

# Check if .env exists
if [ ! -f ".env" ]; then
  echo "⚠️  .env file not found. Using .env.example as template."
  echo "Please configure environment variables in Vercel dashboard."
fi

# Build the project
echo "📦 Building project..."
pnpm build

# Deploy based on environment
if [ "$ENVIRONMENT" = "production" ]; then
  echo "🌐 Deploying to production..."
  vercel --prod
else
  echo "🔍 Deploying preview..."
  vercel
fi

echo ""
echo "✅ Deployment complete!"
echo ""
echo "Next steps:"
echo "1. Set environment variables in Vercel dashboard:"
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
