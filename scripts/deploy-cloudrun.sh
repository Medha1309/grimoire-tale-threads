#!/bin/bash

# Deploy to Google Cloud Run
# Usage: ./scripts/deploy-cloudrun.sh [project-id] [region]

set -e

PROJECT_ID=${1:-grimoire-prod}
REGION=${2:-us-central1}
SERVICE_NAME="grimoire-tale-threads"

echo "🚀 Deploying to Google Cloud Run..."
echo "  Project: $PROJECT_ID"
echo "  Region: $REGION"
echo "  Service: $SERVICE_NAME"

# Check if gcloud CLI is installed
if ! command -v gcloud &> /dev/null; then
  echo "❌ gcloud CLI not found. Please install it first:"
  echo "   https://cloud.google.com/sdk/docs/install"
  exit 1
fi

# Check if Docker is installed
if ! command -v docker &> /dev/null; then
  echo "❌ Docker not found. Please install it first:"
  echo "   https://docs.docker.com/get-docker/"
  exit 1
fi

# Set project
echo "📋 Setting project..."
gcloud config set project $PROJECT_ID

# Build the project
echo "📦 Building project..."
pnpm build

# Create Dockerfile if it doesn't exist
if [ ! -f "Dockerfile" ]; then
  echo "📝 Creating Dockerfile..."
  cat > Dockerfile << 'EOF'
FROM node:18-alpine AS builder
WORKDIR /app
COPY package*.json pnpm-lock.yaml ./
RUN npm install -g pnpm
RUN pnpm install --frozen-lockfile
COPY . .
RUN pnpm build

FROM nginx:alpine
COPY --from=builder /app/dist /usr/share/nginx/html
COPY nginx.conf /etc/nginx/conf.d/default.conf
EXPOSE 8080
CMD ["nginx", "-g", "daemon off;"]
EOF
fi

# Create nginx.conf if it doesn't exist
if [ ! -f "nginx.conf" ]; then
  echo "📝 Creating nginx.conf..."
  cat > nginx.conf << 'EOF'
server {
  listen 8080;
  server_name _;
  root /usr/share/nginx/html;
  index index.html;

  location / {
    try_files $uri $uri/ /index.html;
  }

  location ~* \.(js|css|png|jpg|jpeg|gif|ico|svg|woff|woff2|ttf|eot)$ {
    expires 1y;
    add_header Cache-Control "public, immutable";
  }
}
EOF
fi

# Build Docker image
echo "🐳 Building Docker image..."
docker build -t gcr.io/$PROJECT_ID/$SERVICE_NAME:latest .

# Push to Google Container Registry
echo "📤 Pushing to Container Registry..."
docker push gcr.io/$PROJECT_ID/$SERVICE_NAME:latest

# Deploy to Cloud Run
echo "🌐 Deploying to Cloud Run..."
gcloud run deploy $SERVICE_NAME \
  --image gcr.io/$PROJECT_ID/$SERVICE_NAME:latest \
  --platform managed \
  --region $REGION \
  --allow-unauthenticated \
  --set-env-vars "VITE_FIREBASE_API_KEY=$VITE_FIREBASE_API_KEY,VITE_FIREBASE_AUTH_DOMAIN=$VITE_FIREBASE_AUTH_DOMAIN,VITE_FIREBASE_PROJECT_ID=$VITE_FIREBASE_PROJECT_ID,VITE_FIREBASE_STORAGE_BUCKET=$VITE_FIREBASE_STORAGE_BUCKET,VITE_FIREBASE_MESSAGING_SENDER_ID=$VITE_FIREBASE_MESSAGING_SENDER_ID,VITE_FIREBASE_APP_ID=$VITE_FIREBASE_APP_ID"

echo ""
echo "✅ Deployment complete!"
echo ""
echo "Get your service URL:"
echo "  gcloud run services describe $SERVICE_NAME --region $REGION --format 'value(status.url)'"
echo ""
