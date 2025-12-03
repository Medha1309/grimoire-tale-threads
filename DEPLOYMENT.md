# 🚀 Deployment Guide

Complete guide for deploying GRIMOIRE: Tale Threads to production.

---

## 📋 Table of Contents

- [Prerequisites](#prerequisites)
- [Environment Variables](#environment-variables)
- [Vercel (Recommended)](#vercel-recommended)
- [Netlify (Alternative)](#netlify-alternative)
- [Google Cloud Run (Alternative)](#google-cloud-run-alternative)
- [Post-Deployment](#post-deployment)
- [Troubleshooting](#troubleshooting)

---

## ✅ Prerequisites

### Required

- Node.js 18+
- pnpm
- Firebase project (Auth, Firestore, Storage enabled)
- Git

### Platform-Specific

**Vercel:**
- Vercel account
- Vercel CLI: `npm install -g vercel`

**Netlify:**
- Netlify account
- Netlify CLI: `npm install -g netlify-cli`

**Cloud Run:**
- Google Cloud account
- gcloud CLI installed
- Docker installed

---

## 🔑 Environment Variables

All platforms require these environment variables:

```env
VITE_FIREBASE_API_KEY=your_api_key
VITE_FIREBASE_AUTH_DOMAIN=your_project.firebaseapp.com
VITE_FIREBASE_PROJECT_ID=your_project_id
VITE_FIREBASE_STORAGE_BUCKET=your_project.appspot.com
VITE_FIREBASE_MESSAGING_SENDER_ID=123456789
VITE_FIREBASE_APP_ID=1:123456789:web:abcdef
```

**Get these values:**
1. Go to [Firebase Console](https://console.firebase.google.com/)
2. Select your project
3. Go to Project Settings (gear icon)
4. Scroll to "Your apps" → Web app
5. Copy the config values

---

## 🟢 Vercel (Recommended)

### Why Vercel?

- Zero-config deployment
- Automatic HTTPS
- Global CDN
- Preview deployments for PRs
- Easy environment variable management

### One-Command Deploy

```bash
pnpm deploy:vercel
```

Or use the script:

```bash
chmod +x scripts/deploy-vercel.sh
./scripts/deploy-vercel.sh production
```

### Manual Deploy

#### 1. Install Vercel CLI

```bash
npm install -g vercel
```

#### 2. Login

```bash
vercel login
```

#### 3. Link Project

```bash
vercel link
```

Follow prompts to create or link to existing project.

#### 4. Set Environment Variables

**Option A: Via CLI**

```bash
vercel env add VITE_FIREBASE_API_KEY production
# Paste your API key when prompted
# Repeat for all environment variables
```

**Option B: Via Dashboard**

1. Go to [Vercel Dashboard](https://vercel.com/dashboard)
2. Select your project
3. Go to Settings → Environment Variables
4. Add each variable

#### 5. Deploy

**Preview deployment:**
```bash
vercel
```

**Production deployment:**
```bash
vercel --prod
```

### Automatic Deployments

Vercel automatically deploys:
- **Production:** Pushes to `main` branch
- **Preview:** Pull requests

Configure in Vercel dashboard → Settings → Git.

---

## 🔵 Netlify (Alternative)

### Why Netlify?

- Simple deployment
- Form handling
- Serverless functions
- Split testing

### One-Command Deploy

```bash
pnpm deploy:netlify
```

Or use the script:

```bash
chmod +x scripts/deploy-netlify.sh
./scripts/deploy-netlify.sh production
```

### Manual Deploy

#### 1. Install Netlify CLI

```bash
npm install -g netlify-cli
```

#### 2. Login

```bash
netlify login
```

#### 3. Initialize Site

```bash
netlify init
```

Follow prompts to create or link to existing site.

#### 4. Set Environment Variables

**Option A: Via CLI**

```bash
netlify env:set VITE_FIREBASE_API_KEY "your_api_key"
# Repeat for all environment variables
```

**Option B: Via Dashboard**

1. Go to [Netlify Dashboard](https://app.netlify.com/)
2. Select your site
3. Go to Site settings → Environment variables
4. Add each variable

#### 5. Deploy

**Preview deployment:**
```bash
netlify deploy --dir=dist
```

**Production deployment:**
```bash
netlify deploy --prod --dir=dist
```

### Netlify Configuration

Create `netlify.toml`:

```toml
[build]
  command = "pnpm build"
  publish = "dist"

[[redirects]]
  from = "/*"
  to = "/index.html"
  status = 200

[build.environment]
  NODE_VERSION = "18"
```

---

## 🔴 Google Cloud Run (Alternative)

### Why Cloud Run?

- Containerized deployment
- Auto-scaling
- Pay-per-use pricing
- Full control over environment

### One-Command Deploy

```bash
chmod +x scripts/deploy-cloudrun.sh
./scripts/deploy-cloudrun.sh your-project-id us-central1
```

### Manual Deploy

#### 1. Install gcloud CLI

Follow: https://cloud.google.com/sdk/docs/install

#### 2. Login and Set Project

```bash
gcloud auth login
gcloud config set project your-project-id
```

#### 3. Enable APIs

```bash
gcloud services enable run.googleapis.com
gcloud services enable containerregistry.googleapis.com
```

#### 4. Build Docker Image

```bash
docker build -t gcr.io/your-project-id/grimoire:latest .
```

#### 5. Push to Container Registry

```bash
docker push gcr.io/your-project-id/grimoire:latest
```

#### 6. Deploy to Cloud Run

```bash
gcloud run deploy grimoire \
  --image gcr.io/your-project-id/grimoire:latest \
  --platform managed \
  --region us-central1 \
  --allow-unauthenticated \
  --set-env-vars "VITE_FIREBASE_API_KEY=your_key,..."
```

#### 7. Get Service URL

```bash
gcloud run services describe grimoire \
  --region us-central1 \
  --format 'value(status.url)'
```

---

## 🔧 Post-Deployment

### 1. Verify Deployment

- [ ] Visit deployment URL
- [ ] Test authentication (login/signup)
- [ ] Create diary entry
- [ ] Create Tale Threads project
- [ ] Test all major features

### 2. Configure Firebase

#### Update Authorized Domains

1. Go to Firebase Console → Authentication → Settings
2. Add your deployment domain to "Authorized domains"

#### Update CORS

If using Storage:

```bash
firebase deploy --only storage
```

### 3. Set Up Monitoring

**Vercel:**
- Analytics: Vercel Dashboard → Analytics
- Logs: Vercel Dashboard → Deployments → View Logs

**Netlify:**
- Analytics: Netlify Dashboard → Analytics
- Logs: Netlify Dashboard → Deploys → View Logs

**Cloud Run:**
- Logs: Cloud Console → Cloud Run → Logs
- Monitoring: Cloud Console → Monitoring

### 4. Configure Custom Domain (Optional)

**Vercel:**
1. Go to Project Settings → Domains
2. Add your domain
3. Update DNS records as instructed

**Netlify:**
1. Go to Site Settings → Domain management
2. Add custom domain
3. Update DNS records

**Cloud Run:**
1. Go to Cloud Run service → Manage Custom Domains
2. Add domain
3. Verify ownership
4. Update DNS records

---

## 🐛 Troubleshooting

### Build Fails

**Error:** `Module not found`

**Solution:**
```bash
# Clear cache and reinstall
rm -rf node_modules pnpm-lock.yaml
pnpm install
pnpm build
```

### Environment Variables Not Working

**Error:** `Firebase not initialized`

**Solution:**
- Verify all environment variables are set
- Check variable names (must start with `VITE_`)
- Redeploy after setting variables

### Firebase Authentication Fails

**Error:** `auth/unauthorized-domain`

**Solution:**
1. Go to Firebase Console → Authentication → Settings
2. Add deployment domain to "Authorized domains"

### CORS Errors

**Error:** `Access-Control-Allow-Origin`

**Solution:**
1. Update Firebase Storage CORS rules
2. Deploy: `firebase deploy --only storage`

### 404 on Refresh

**Error:** Page not found when refreshing

**Solution:**
- **Vercel:** Automatically handled
- **Netlify:** Add `netlify.toml` with redirects (see above)
- **Cloud Run:** Configure nginx (see `nginx.conf`)

### Slow Performance

**Solution:**
1. Check Lighthouse score
2. Enable compression (Vercel/Netlify handle this)
3. Optimize images
4. Enable caching headers

---

## 📊 Performance Optimization

### Enable Compression

**Vercel/Netlify:** Automatic

**Cloud Run:** Add to `nginx.conf`:
```nginx
gzip on;
gzip_types text/plain text/css application/json application/javascript;
```

### Enable Caching

**Vercel:** Add `vercel.json`:
```json
{
  "headers": [
    {
      "source": "/assets/(.*)",
      "headers": [
        {
          "key": "Cache-Control",
          "value": "public, max-age=31536000, immutable"
        }
      ]
    }
  ]
}
```

### CDN Configuration

All platforms provide global CDN by default.

---

## 🔒 Security Checklist

- [ ] Environment variables set (not committed)
- [ ] Firebase security rules deployed
- [ ] HTTPS enabled (automatic on all platforms)
- [ ] Authorized domains configured
- [ ] CORS configured
- [ ] Rate limiting enabled (Firebase)
- [ ] Error tracking configured

---

## 📚 Additional Resources

- [Vercel Documentation](https://vercel.com/docs)
- [Netlify Documentation](https://docs.netlify.com/)
- [Cloud Run Documentation](https://cloud.google.com/run/docs)
- [Firebase Hosting](https://firebase.google.com/docs/hosting)

---

## 📞 Support

**Issues?** Open an issue on [GitHub]({{REPO_URL}}/issues)

**Email:** {{YOUR_EMAIL}}

---

**Last Updated:** December 2, 2024
