# 📤 Publishing Guide

Step-by-step guide to make your repository public and submit to the hackathon.

---

## 🚀 Quick Start

```bash
# 1. Verify everything is ready
./scripts/check-no-secrets.sh
pnpm test:all

# 2. Make repository public (see below)

# 3. Deploy to production (see DEPLOYMENT.md)
pnpm deploy:vercel

# 4. Submit to Devpost (see devpost_submission.md)
```

---

## 📋 Pre-Publish Checklist

### 1. Code Quality

```bash
# Run linter
pnpm lint

# Fix lint errors
pnpm lint:fix

# Type check
pnpm type-check

# Run all tests
pnpm test:all
```

**Expected:** All checks pass with no errors.

### 2. Security Check

```bash
# Check for accidentally committed secrets
./scripts/check-no-secrets.sh

# Verify .env is gitignored
grep -q "^\.env$" .gitignore && echo "✓ .env is gitignored" || echo "✗ Add .env to .gitignore"

# Verify no .env files committed
git ls-files | grep -E "^\.env" && echo "✗ .env files committed!" || echo "✓ No .env files committed"
```

**Expected:** No secrets found, .env is gitignored.

### 3. Verify .kiro Directory

```bash
# Check if .kiro exists
test -d .kiro && echo "✓ .kiro directory exists" || echo "✗ .kiro directory missing!"

# Check if .kiro is NOT in .gitignore
grep -q ".kiro" .gitignore && echo "✗ .kiro is gitignored!" || echo "✓ .kiro is NOT gitignored"

# Verify .kiro contents
ls -la .kiro/
```

**Expected:** .kiro exists, is NOT gitignored, contains specs, hooks, steering.md, README.md.

### 4. Verify LICENSE

```bash
# Check if LICENSE exists
test -f LICENSE && echo "✓ LICENSE file exists" || echo "✗ LICENSE file missing!"

# Show license type
head -n 1 LICENSE
```

**Expected:** LICENSE file exists, shows MIT or Apache-2.0.

### 5. Documentation Check

```bash
# Verify key files exist
for file in README.md SECURITY.md TESTING_INSTRUCTIONS.md DEPLOYMENT.md demo-script.md video-script.txt devpost_submission.md SUBMISSION_CHECKLIST.md CONTRIBUTING.md; do
  test -f $file && echo "✓ $file" || echo "✗ $file missing"
done
```

**Expected:** All files exist.

---

## 🌐 Making Repository Public

### Option 1: GitHub Web UI

1. **Go to your repository** on GitHub
2. **Click Settings** (gear icon)
3. **Scroll to "Danger Zone"** at the bottom
4. **Click "Change visibility"**
5. **Select "Make public"**
6. **Type repository name** to confirm
7. **Click "I understand, make this repository public"**

### Option 2: GitHub CLI

```bash
# Install GitHub CLI (if not installed)
# macOS: brew install gh
# Windows: winget install GitHub.cli
# Linux: See https://github.com/cli/cli#installation

# Login
gh auth login

# Make repository public
gh repo edit --visibility public

# Verify
gh repo view --json visibility
```

### Option 3: Git Command Line

```bash
# This requires GitHub API token
# Get token from: https://github.com/settings/tokens

# Set token
export GITHUB_TOKEN=your_token_here

# Make public via API
curl -X PATCH \
  -H "Authorization: token $GITHUB_TOKEN" \
  -H "Accept: application/vnd.github.v3+json" \
  https://api.github.com/repos/YOUR_USERNAME/grimoire-tale-threads \
  -d '{"private":false}'
```

---

## 🔐 Setting GitHub Secrets

### Why GitHub Secrets?

GitHub Secrets store sensitive data (API keys, tokens) securely for CI/CD without committing them to the repository.

### Required Secrets

```
VITE_FIREBASE_API_KEY
VITE_FIREBASE_AUTH_DOMAIN
VITE_FIREBASE_PROJECT_ID
VITE_FIREBASE_STORAGE_BUCKET
VITE_FIREBASE_MESSAGING_SENDER_ID
VITE_FIREBASE_APP_ID
```

### Option 1: GitHub Web UI

1. **Go to repository** on GitHub
2. **Click Settings** → **Secrets and variables** → **Actions**
3. **Click "New repository secret"**
4. **Add each secret:**
   - Name: `VITE_FIREBASE_API_KEY`
   - Value: Your Firebase API key
   - Click "Add secret"
5. **Repeat** for all secrets

### Option 2: GitHub CLI

```bash
# Set secrets one by one
gh secret set VITE_FIREBASE_API_KEY --body "your_api_key_here"
gh secret set VITE_FIREBASE_AUTH_DOMAIN --body "your_auth_domain"
gh secret set VITE_FIREBASE_PROJECT_ID --body "your_project_id"
gh secret set VITE_FIREBASE_STORAGE_BUCKET --body "your_storage_bucket"
gh secret set VITE_FIREBASE_MESSAGING_SENDER_ID --body "your_sender_id"
gh secret set VITE_FIREBASE_APP_ID --body "your_app_id"

# Verify secrets are set
gh secret list
```

### Option 3: Bulk Set from .env

```bash
# Create a script to set all secrets from .env
cat > set-secrets.sh << 'EOF'
#!/bin/bash
set -e

if [ ! -f ".env" ]; then
  echo "Error: .env file not found"
  exit 1
fi

while IFS='=' read -r key value; do
  # Skip comments and empty lines
  [[ $key =~ ^#.*$ ]] && continue
  [[ -z $key ]] && continue
  
  # Remove quotes from value
  value=$(echo $value | sed -e 's/^"//' -e 's/"$//' -e "s/^'//" -e "s/'$//")
  
  echo "Setting secret: $key"
  gh secret set "$key" --body "$value"
done < .env

echo "✓ All secrets set"
EOF

chmod +x set-secrets.sh
./set-secrets.sh
```

---

## 🚀 Deployment

### 1. Choose Platform

- **Vercel** (Recommended): Zero-config, automatic HTTPS, global CDN
- **Netlify** (Alternative): Simple deployment, form handling
- **Cloud Run** (Alternative): Containerized, auto-scaling

### 2. Deploy

**Vercel:**
```bash
# Install Vercel CLI
npm install -g vercel

# Login
vercel login

# Deploy
pnpm deploy:vercel

# Or use script
./scripts/deploy-vercel.sh production
```

**Netlify:**
```bash
# Install Netlify CLI
npm install -g netlify-cli

# Login
netlify login

# Deploy
pnpm deploy:netlify

# Or use script
./scripts/deploy-netlify.sh production
```

**Cloud Run:**
```bash
# Requires gcloud CLI and Docker
./scripts/deploy-cloudrun.sh your-project-id us-central1
```

### 3. Set Environment Variables

**Vercel:**
```bash
# Via CLI
vercel env add VITE_FIREBASE_API_KEY production

# Or via dashboard
# https://vercel.com/dashboard → Project → Settings → Environment Variables
```

**Netlify:**
```bash
# Via CLI
netlify env:set VITE_FIREBASE_API_KEY "your_api_key"

# Or via dashboard
# https://app.netlify.com → Site → Site settings → Environment variables
```

**Cloud Run:**
```bash
# Set via gcloud command (see deploy script)
```

### 4. Verify Deployment

```bash
# Visit your deployment URL
# Test login
# Test core features
# Check browser console for errors
```

---

## 🎥 Recording Demo Video

### 1. Prepare

```bash
# Ensure demo environment is ready
# - Logged in with test account
# - Test data seeded
# - Browser clean (no extra tabs)
```

### 2. Record

Follow `video-script.txt`:

- **Duration:** 3 minutes max
- **Resolution:** 1920x1080
- **Frame rate:** 60fps
- **Software:** OBS Studio, Loom, or screen recorder

### 3. Edit

- Add text overlays
- Add background music (royalty-free)
- Color grade for gothic aesthetic
- Export as MP4

### 4. Upload

**YouTube:**
```
1. Go to youtube.com/upload
2. Upload video
3. Title: "GRIMOIRE: Tale Threads - Kiro Hackathon 2024"
4. Description: Include demo URL, repo URL, features
5. Visibility: Unlisted (for judges) or Public
6. Get shareable link
```

**Vimeo:**
```
1. Go to vimeo.com/upload
2. Upload video
3. Add title and description
4. Set privacy to "Anyone" or "Only people with the link"
5. Get shareable link
```

---

## 📝 Submitting to Devpost

### 1. Prepare Content

Open `devpost_submission.md` and fill in placeholders:

```bash
# Replace placeholders
sed -i 's/{{DEMO_URL}}/https:\/\/your-demo-url.vercel.app/g' devpost_submission.md
sed -i 's/{{REPO_URL}}/https:\/\/github.com\/YOUR_USERNAME\/grimoire-tale-threads/g' devpost_submission.md
sed -i 's/{{VIDEO_URL}}/https:\/\/youtube.com\/watch?v=YOUR_VIDEO_ID/g' devpost_submission.md
sed -i 's/{{YOUR_NAME}}/Your Name/g' devpost_submission.md
sed -i 's/{{YOUR_EMAIL}}/your.email@example.com/g' devpost_submission.md
sed -i 's/{{YOUR_USERNAME}}/your-github-username/g' devpost_submission.md
```

### 2. Go to Devpost

1. Visit [kiro.devpost.com](https://kiro.devpost.com)
2. Click "Enter a Submission"
3. Log in or create account

### 3. Fill Form

Copy content from `devpost_submission.md` into corresponding fields:

**Project Title:**
```
GRIMOIRE: Tale Threads
```

**Tagline:**
```
A gothic storytelling platform with collaborative editing, real-time sessions, and immersive environments—built with Kiro AI.
```

**Category:**
- Primary: Costume Contest
- Secondary: Frankenstein

**About the Project:**
- Copy from devpost_submission.md → "About the Project" section

**Built With:**
```
react, typescript, vite, firebase, firestore, tailwindcss, framer-motion, playwright, vitest, kiro-ai
```

**Try It Out Links:**
- Demo URL: Your deployment URL
- GitHub: Your repository URL

**Video Demo Link:**
- Your YouTube/Vimeo URL

**Open Source Code Repository:**
- Your GitHub repository URL

**How Kiro Was Used:**
- Copy from devpost_submission.md → "How Kiro Was Used" section

### 4. Review and Submit

- [ ] All fields filled
- [ ] Links work
- [ ] Video plays
- [ ] Repository is public
- [ ] .kiro directory visible
- [ ] LICENSE visible

**Click "Submit"**

---

## ✅ Final Verification

```bash
# Run final checks
echo "=== Final Verification ==="

# 1. Repository is public
echo "1. Check if repository is public:"
echo "   Visit: https://github.com/YOUR_USERNAME/grimoire-tale-threads"
echo "   Should be accessible without login"

# 2. CI passes
echo "2. Check if CI passes:"
echo "   Visit: https://github.com/YOUR_USERNAME/grimoire-tale-threads/actions"
echo "   Latest workflow should be green"

# 3. Demo is live
echo "3. Check if demo is live:"
echo "   Visit: YOUR_DEMO_URL"
echo "   Should load without errors"

# 4. Video is accessible
echo "4. Check if video is accessible:"
echo "   Visit: YOUR_VIDEO_URL"
echo "   Should play without errors"

# 5. .kiro directory visible
echo "5. Check if .kiro directory is visible:"
echo "   Visit: https://github.com/YOUR_USERNAME/grimoire-tale-threads/tree/main/.kiro"
echo "   Should show specs, hooks, steering.md, README.md"

# 6. LICENSE visible
echo "6. Check if LICENSE is visible:"
echo "   Visit: https://github.com/YOUR_USERNAME/grimoire-tale-threads/blob/main/LICENSE"
echo "   Should show MIT or Apache-2.0 license"

echo ""
echo "=== All checks complete! ==="
```

---

## 🎉 You're Done!

Congratulations! Your project is now:
- ✅ Public on GitHub
- ✅ Deployed to production
- ✅ Video recorded and uploaded
- ✅ Submitted to Devpost

### What's Next?

1. **Monitor CI:** Ensure all checks continue to pass
2. **Test Demo:** Verify demo works for judges
3. **Respond to Questions:** Check Devpost for judge questions
4. **Celebrate:** You've completed the hackathon! 🎊

---

## 🐛 Troubleshooting

### Repository Won't Go Public

**Issue:** "This repository cannot be made public"

**Solution:**
- Check if you have permission (must be owner)
- Check if organization allows public repos
- Contact GitHub support

### CI Fails After Making Public

**Issue:** CI fails with "secrets not found"

**Solution:**
- Verify GitHub Secrets are set (see above)
- Re-run workflow
- Check secret names match exactly

### Demo Not Loading

**Issue:** Deployment URL shows error

**Solution:**
- Check deployment logs
- Verify environment variables are set
- Redeploy: `pnpm deploy:vercel`

### Video Won't Upload

**Issue:** Video file too large

**Solution:**
- Compress video (target < 100MB)
- Use H.264 codec
- Reduce resolution to 1080p
- Use online compressor: handbrake.fr

---

## 📞 Support

**Need help?**
- Email: {{YOUR_EMAIL}}
- GitHub Issues: {{REPO_URL}}/issues
- Devpost Support: help@devpost.com

---

**Last Updated:** December 2, 2024  
**Hackathon:** Kiro Hackathon 2024
