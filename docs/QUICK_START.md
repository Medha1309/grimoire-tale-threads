# Quick Start Guide - Get Everything Working in 5 Minutes

## Step 1: Configure Firebase (2 minutes)

1. Create `.env` file in project root:
```env
VITE_FIREBASE_API_KEY=your_api_key_here
VITE_FIREBASE_AUTH_DOMAIN=your_project.firebaseapp.com
VITE_FIREBASE_PROJECT_ID=your_project_id
VITE_FIREBASE_STORAGE_BUCKET=your_project.appspot.com
VITE_FIREBASE_MESSAGING_SENDER_ID=your_sender_id
VITE_FIREBASE_APP_ID=your_app_id
```

Get these from: [Firebase Console](https://console.firebase.google.com/) → Project Settings

## Step 2: Deploy Firestore Rules (1 minute)

**Option A: Firebase Console (Easiest)**
1. Go to Firebase Console → Firestore Database → Rules
2. Copy ALL content from `firestore.rules` file
3. Paste and click "Publish"

**Option B: Firebase CLI**
```bash
firebase deploy --only firestore:rules
```

## Step 3: Create Admin Account (2 minutes)

1. **Start your app**: `npm run dev`

2. **Sign up** at `/signup`:
   - Email: `admin@grimr.app`
   - Password: `GrimrAdmin2024!`
   - Display Name: `Admin`

3. **Grant admin privileges**:
   - Go to Firebase Console → Firestore Database
   - Click on `users` collection
   - Find your admin user document
   - Click "Add field"
   - Field name: `isAdmin`
   - Type: `boolean`
   - Value: `true`
   - Click "Add"

## Step 4: Test Everything (30 seconds)

1. **Login** with admin@grimr.app
2. **Go to Library** → Click "Write"
3. **Write a story** → Should save successfully
4. **Go to Gilded Parlour** → Click "Write"
5. **Create a post** → Should work

## ✅ Done!

Everything should now work:
- ✅ Authentication
- ✅ Library write functionality
- ✅ Forum write functionality
- ✅ Admin access

## Default Credentials

### Admin
```
Email: admin@grimr.app
Password: GrimrAdmin2024!
```

### Test User
```
Email: test@grimr.app
Password: TestUser2024!
```

## Troubleshooting

### "Permission denied" errors?
→ Deploy Firestore rules (Step 2)

### "Firebase not configured"?
→ Create `.env` file (Step 1)

### Admin features not working?
→ Add `isAdmin: true` in Firestore (Step 3)

### Write button causes error?
→ Already fixed! Just follow steps above.

## Need More Help?

See detailed guides:
- `COMPLETE_FIX_SUMMARY.md` - Everything that was fixed
- `AUTHENTICATION_COMPLETE_SETUP.md` - Full auth setup
- `ADMIN_SETUP_GUIDE.md` - Admin configuration
- `DEFAULT_CREDENTIALS.md` - Login credentials

---

**That's it!** You're ready to use all features.
