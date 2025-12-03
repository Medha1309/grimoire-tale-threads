# 🔒 Security Policy

## Overview

GRIMOIRE: Tale Threads takes security seriously. This document explains how secrets are managed, how to report vulnerabilities, and how judges can safely run the application.

---

## 🔑 Secrets Management

### What Are Secrets?

Secrets are sensitive credentials that should NEVER be committed to the repository:

- Firebase API keys
- Firebase project IDs
- Database URLs
- Third-party API keys
- Private keys
- Authentication tokens

### How We Handle Secrets

#### 1. Environment Variables

All secrets are stored in `.env` files that are **gitignored**.

**Example `.env` file:**
```env
VITE_FIREBASE_API_KEY=your_api_key_here
VITE_FIREBASE_AUTH_DOMAIN=your_project.firebaseapp.com
VITE_FIREBASE_PROJECT_ID=your_project_id
VITE_FIREBASE_STORAGE_BUCKET=your_project.appspot.com
VITE_FIREBASE_MESSAGING_SENDER_ID=123456789
VITE_FIREBASE_APP_ID=1:123456789:web:abcdef
```

#### 2. `.env.example` Template

We provide `.env.example` with placeholder values:

```env
VITE_FIREBASE_API_KEY=your_api_key_here
VITE_FIREBASE_AUTH_DOMAIN=your_auth_domain
VITE_FIREBASE_PROJECT_ID=your_project_id
VITE_FIREBASE_STORAGE_BUCKET=your_storage_bucket
VITE_FIREBASE_MESSAGING_SENDER_ID=your_sender_id
VITE_FIREBASE_APP_ID=your_app_id
```

#### 3. `.gitignore` Configuration

Our `.gitignore` ensures secrets are never committed:

```gitignore
# Environment variables
.env
.env.local
.env.production
.env.development

# Firebase
.firebase/
firebase-debug.log

# Secrets
*.key
*.pem
secrets/
```

**IMPORTANT:** The `.kiro/` directory is **NOT** in `.gitignore` as required by hackathon rules.

---

## 🔐 GitHub Secrets for CI/CD

### Setting Up GitHub Secrets

For CI/CD pipelines, secrets are stored in GitHub Secrets (not in the repository).

#### Via GitHub UI

1. Go to your repository on GitHub
2. Click **Settings** → **Secrets and variables** → **Actions**
3. Click **New repository secret**
4. Add each secret:

| Secret Name | Description | Example Value |
|-------------|-------------|---------------|
| `VITE_FIREBASE_API_KEY` | Firebase API key | `AIzaSyC...` |
| `VITE_FIREBASE_AUTH_DOMAIN` | Firebase auth domain | `grimoire.firebaseapp.com` |
| `VITE_FIREBASE_PROJECT_ID` | Firebase project ID | `grimoire-prod` |
| `VITE_FIREBASE_STORAGE_BUCKET` | Firebase storage bucket | `grimoire-prod.appspot.com` |
| `VITE_FIREBASE_MESSAGING_SENDER_ID` | Firebase sender ID | `123456789` |
| `VITE_FIREBASE_APP_ID` | Firebase app ID | `1:123:web:abc` |
| `VERCEL_TOKEN` | Vercel deployment token | `vercel_token_...` |

#### Via GitHub CLI

```bash
gh secret set VITE_FIREBASE_API_KEY --body "your_api_key"
gh secret set VITE_FIREBASE_AUTH_DOMAIN --body "your_auth_domain"
gh secret set VITE_FIREBASE_PROJECT_ID --body "your_project_id"
# ... repeat for all secrets
```

### How CI Uses Secrets

Our GitHub Actions workflow (`.github/workflows/ci.yml`) injects secrets as environment variables:

```yaml
env:
  VITE_FIREBASE_API_KEY: ${{ secrets.VITE_FIREBASE_API_KEY }}
  VITE_FIREBASE_AUTH_DOMAIN: ${{ secrets.VITE_FIREBASE_AUTH_DOMAIN }}
  # ... other secrets
```

---

## 🛡️ Secret Scanning

### Automated Checks

Our CI pipeline includes a secret scanning step:

```bash
# Check for accidentally committed secrets
./scripts/check-no-secrets.sh
```

This script scans for patterns like:
- `API_KEY`
- `SECRET`
- `PRIVATE_KEY`
- `GEMINI`
- `firebase.*apiKey`

### Manual Verification

Before committing, always run:

```bash
git diff --cached | grep -iE "(api_key|secret|private_key|password|token)"
```

If this returns any matches, **DO NOT COMMIT**.

---

## 👨‍⚖️ For Judges: Running Safely

### Option 1: Use the Live Demo

**Recommended for quick evaluation.**

- **Demo URL:** [{{DEMO_URL}}]({{DEMO_URL}})
- **Test Credentials:**
  - Username: `judge@grimoire.test`
  - Password: `JudgeDemo2024!`

No setup required. All features are accessible.

### Option 2: Run Locally with Your Own Firebase

**For full code inspection and testing.**

#### Step 1: Create Firebase Project

1. Go to [Firebase Console](https://console.firebase.google.com/)
2. Click **Add Project**
3. Name it `grimoire-judge-test`
4. Enable Google Analytics (optional)
5. Click **Create Project**

#### Step 2: Enable Firebase Services

1. **Authentication:**
   - Go to **Authentication** → **Sign-in method**
   - Enable **Email/Password**

2. **Firestore:**
   - Go to **Firestore Database** → **Create database**
   - Start in **test mode** (for evaluation only)
   - Choose a location

3. **Storage:**
   - Go to **Storage** → **Get started**
   - Start in **test mode**

#### Step 3: Get Firebase Config

1. Go to **Project Settings** (gear icon)
2. Scroll to **Your apps** → **Web app**
3. Click **Add app** (</> icon)
4. Register app as `grimoire-judge`
5. Copy the config object

#### Step 4: Configure Locally

1. Clone the repository:
   ```bash
   git clone https://github.com/{{YOUR_USERNAME}}/grimoire-tale-threads.git
   cd grimoire-tale-threads
   ```

2. Install dependencies:
   ```bash
   pnpm install
   ```

3. Create `.env` file:
   ```bash
   cp .env.example .env
   ```

4. Edit `.env` with your Firebase config:
   ```env
   VITE_FIREBASE_API_KEY=your_api_key_from_step3
   VITE_FIREBASE_AUTH_DOMAIN=your_auth_domain
   VITE_FIREBASE_PROJECT_ID=your_project_id
   VITE_FIREBASE_STORAGE_BUCKET=your_storage_bucket
   VITE_FIREBASE_MESSAGING_SENDER_ID=your_sender_id
   VITE_FIREBASE_APP_ID=your_app_id
   ```

5. Deploy Firestore rules:
   ```bash
   firebase login
   firebase use --add  # Select your project
   firebase deploy --only firestore:rules,firestore:indexes
   ```

6. Start the app:
   ```bash
   pnpm dev
   ```

7. Open browser:
   ```
   http://localhost:5173
   ```

#### Step 5: Create Test Account

1. Click **Sign Up**
2. Create an account with any email/password
3. Explore the app

### Option 3: Use Mock Data (No Firebase)

**For offline evaluation.**

```bash
# Run with mock data (no Firebase required)
pnpm dev:mock
```

This uses in-memory data stores. Changes won't persist.

---

## 🚨 Reporting Vulnerabilities

### Scope

We welcome security reports for:

- Authentication bypass
- Authorization issues
- XSS vulnerabilities
- CSRF vulnerabilities
- Data leaks
- Injection attacks

### How to Report

**Email:** {{YOUR_EMAIL}}

**Include:**
1. Description of the vulnerability
2. Steps to reproduce
3. Potential impact
4. Suggested fix (if any)

**Response Time:** We aim to respond within 48 hours.

### Out of Scope

- Social engineering
- Physical attacks
- Denial of service (DoS)
- Issues in third-party dependencies (report to maintainers)

---

## 🔍 Security Features

### Authentication

- Firebase Authentication with JWT tokens
- Password requirements: min 8 characters
- Email verification (optional)
- Session management with automatic logout

### Authorization

- Firestore security rules enforce permissions
- Role-based access control (RBAC)
- User can only access their own data
- Admin role for moderation

### Data Protection

- **Encryption:** Diary entries encrypted client-side (AES-256)
- **Sanitization:** All user input sanitized to prevent XSS
- **Validation:** Client-side + server-side validation
- **Rate Limiting:** Prevents abuse (10 requests/minute per user)

### Firestore Security Rules

```javascript
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    // Users can only read/write their own data
    match /users/{userId} {
      allow read, write: if request.auth != null && request.auth.uid == userId;
    }
    
    // Diary entries are private
    match /diaryEntries/{entryId} {
      allow read, write: if request.auth != null 
        && request.auth.uid == resource.data.userId;
    }
    
    // Stories are public read, owner write
    match /stories/{storyId} {
      allow read: if true;
      allow write: if request.auth != null 
        && request.auth.uid == resource.data.authorId;
    }
    
    // Projects have permission-based access
    match /projects/{projectId} {
      allow read: if request.auth != null;
      allow write: if request.auth != null 
        && (request.auth.uid == resource.data.ownerId 
            || request.auth.uid in resource.data.collaborators);
    }
  }
}
```

### Storage Security Rules

```javascript
rules_version = '2';
service firebase.storage {
  match /b/{bucket}/o {
    // Users can only upload to their own folder
    match /users/{userId}/{allPaths=**} {
      allow read: if true;
      allow write: if request.auth != null 
        && request.auth.uid == userId
        && request.resource.size < 5 * 1024 * 1024; // 5MB limit
    }
  }
}
```

---

## ✅ Security Checklist

### Before Deployment

- [ ] All secrets in `.env` (not committed)
- [ ] `.gitignore` includes `.env`
- [ ] GitHub Secrets configured for CI
- [ ] Firestore security rules deployed
- [ ] Storage security rules deployed
- [ ] Rate limiting enabled
- [ ] Input validation on all forms
- [ ] XSS protection (sanitize user input)
- [ ] CSRF protection (Firebase handles this)
- [ ] HTTPS enforced (Vercel handles this)

### Regular Maintenance

- [ ] Review Firestore security rules monthly
- [ ] Update dependencies (security patches)
- [ ] Monitor Firebase usage for anomalies
- [ ] Review audit logs for suspicious activity
- [ ] Rotate API keys annually

---

## 📚 Additional Resources

- [Firebase Security Rules Documentation](https://firebase.google.com/docs/rules)
- [OWASP Top 10](https://owasp.org/www-project-top-ten/)
- [Web Security Cheat Sheet](https://cheatsheetseries.owasp.org/)

---

**Last Updated:** December 2, 2024  
**Security Contact:** {{YOUR_EMAIL}}
