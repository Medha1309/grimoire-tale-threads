# Complete Authentication Setup Guide

## Overview
This guide covers the complete authentication setup for Grimr, including Firebase configuration, user management, and admin access.

## Part 1: Firebase Project Setup

### Step 1: Create Firebase Project

1. Go to [Firebase Console](https://console.firebase.google.com/)
2. Click "Add project"
3. Enter project name: `grimr-app` (or your preferred name)
4. Enable Google Analytics (optional)
5. Click "Create project"

### Step 2: Enable Authentication

1. In Firebase Console, click "Authentication" in left sidebar
2. Click "Get started"
3. Enable **Email/Password** sign-in method:
   - Click "Email/Password"
   - Toggle "Enable"
   - Click "Save"
4. (Optional) Enable **Google** sign-in method:
   - Click "Google"
   - Toggle "Enable"
   - Enter support email
   - Click "Save"

### Step 3: Create Firestore Database

1. Click "Firestore Database" in left sidebar
2. Click "Create database"
3. Choose "Start in production mode"
4. Select a location (choose closest to your users)
5. Click "Enable"

### Step 4: Get Firebase Configuration

1. Click the gear icon → "Project settings"
2. Scroll down to "Your apps"
3. Click the web icon (`</>`)
4. Register app name: `grimr-web`
5. Copy the configuration object

## Part 2: Configure Your App

### Step 1: Create Environment File

Create `.env` in your project root:

```env
# Firebase Configuration
VITE_FIREBASE_API_KEY=AIzaSyXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX
VITE_FIREBASE_AUTH_DOMAIN=your-project.firebaseapp.com
VITE_FIREBASE_PROJECT_ID=your-project-id
VITE_FIREBASE_STORAGE_BUCKET=your-project.appspot.com
VITE_FIREBASE_MESSAGING_SENDER_ID=123456789012
VITE_FIREBASE_APP_ID=1:123456789012:web:abcdef123456
```

Replace with your actual Firebase configuration values.

### Step 2: Deploy Firestore Rules

**Option A: Using Firebase CLI**

```bash
# Install Firebase CLI
npm install -g firebase-tools

# Login
firebase login

# Initialize (if not done)
firebase init firestore

# Deploy rules
firebase deploy --only firestore:rules
```

**Option B: Manual Deployment**

1. Go to Firebase Console → Firestore Database → Rules
2. Copy contents of `firestore.rules` file
3. Paste into rules editor
4. Click "Publish"

### Step 3: Verify Setup

1. Start your app: `npm run dev`
2. Navigate to `/signup`
3. Try creating an account
4. Check Firebase Console → Authentication → Users
5. You should see your new user

## Part 3: Create Admin Account

### Method 1: Sign Up + Manual Admin Grant

1. **Create admin account** through the app:
   ```
   Email: admin@grimr.app
   Password: GrimrAdmin2024!
   Display Name: Admin
   ```

2. **Get User UID**:
   - Firebase Console → Authentication → Users
   - Find admin@grimr.app
   - Copy the UID (e.g., `abc123def456...`)

3. **Grant admin privileges**:
   - Firebase Console → Firestore Database
   - Navigate to `users` collection
   - Find document with admin UID
   - Add field: `isAdmin` = `true` (boolean)
   - Save

### Method 2: Using Browser Console

1. Sign up with admin account
2. Login to the app
3. Open browser console (F12)
4. Run:

```javascript
// Get current user ID
const userId = firebase.auth().currentUser.uid;

// Grant admin privileges
const userRef = firebase.firestore().collection('users').doc(userId);
await userRef.set({ isAdmin: true }, { merge: true });
console.log('Admin privileges granted!');
```

## Part 4: Test Authentication

### Test Regular User Flow

1. **Sign Up**:
   - Go to `/signup`
   - Email: `test@example.com`
   - Password: `Test123!`
   - Display Name: `Test User`
   - Click "Sign Up"

2. **Login**:
   - Go to `/login`
   - Enter credentials
   - Click "Login"

3. **Test Features**:
   - Like a story (should work)
   - Bookmark a story (should work)
   - Add a comment (should work)
   - Write a story (should work)

### Test Admin Flow

1. **Login as Admin**:
   - Email: `admin@grimr.app`
   - Password: `GrimrAdmin2024!`

2. **Test Admin Features**:
   - Go to `/admin/populate`
   - Should see admin populate page
   - Try populating mock data
   - Check Firestore for new data

## Part 5: User Roles & Permissions

### User Types

#### 1. Anonymous (Not Logged In)
**Can:**
- ✅ View stories
- ✅ Read comments
- ✅ Browse forum
- ✅ View stats

**Cannot:**
- ❌ Like stories
- ❌ Bookmark stories
- ❌ Add comments
- ❌ Write stories
- ❌ Create forum posts

#### 2. Regular User (Logged In)
**Can:**
- ✅ Everything anonymous can do
- ✅ Like/unlike stories
- ✅ Bookmark stories
- ✅ Add/edit/delete own comments
- ✅ Write stories
- ✅ Edit/delete own stories
- ✅ Create forum posts
- ✅ Edit/delete own forum posts

**Cannot:**
- ❌ Edit others' content
- ❌ Delete others' content
- ❌ Access admin features

#### 3. Admin User
**Can:**
- ✅ Everything regular users can do
- ✅ Edit any story
- ✅ Delete any story
- ✅ Edit any forum post
- ✅ Delete any forum post
- ✅ Moderate comments
- ✅ Populate mock data
- ✅ Access admin dashboard

## Part 6: Security Checklist

### Before Going Live

- [ ] Change default admin password
- [ ] Review Firestore rules
- [ ] Deploy rules to production
- [ ] Enable 2FA for admin accounts
- [ ] Set up Firebase App Check (optional)
- [ ] Configure CORS settings
- [ ] Set up monitoring and alerts
- [ ] Test all authentication flows
- [ ] Document admin procedures
- [ ] Create backup admin account

### Firestore Rules Deployed

Verify these rules are active:

```javascript
✅ Users can only edit their own profile
✅ Users can only read their own interactions
✅ Users can only edit/delete their own stories
✅ Admins can edit/delete any content
✅ Anonymous users can read public content
✅ Authenticated users can create content
```

## Part 7: Common Issues & Solutions

### Issue: "Permission denied" errors

**Cause**: Firestore rules not deployed or incorrect

**Solution**:
1. Check Firebase Console → Firestore → Rules
2. Verify rules match `firestore.rules` file
3. Redeploy rules if needed

### Issue: "Firebase not configured"

**Cause**: Missing or incorrect `.env` file

**Solution**:
1. Verify `.env` file exists
2. Check all variables are set
3. Restart dev server

### Issue: Can't login after signup

**Cause**: Email verification required or account disabled

**Solution**:
1. Check Firebase Console → Authentication
2. Verify account is enabled
3. Check email verification settings

### Issue: Admin features not showing

**Cause**: `isAdmin` field not set or not true

**Solution**:
1. Check Firestore → users → [admin-uid]
2. Verify `isAdmin: true` exists
3. Logout and login again

### Issue: Stories not saving

**Cause**: Authentication or Firestore rules issue

**Solution**:
1. Verify user is logged in
2. Check browser console for errors
3. Verify Firestore rules allow creation
4. Check Firebase Console → Firestore for errors

## Part 8: Testing Checklist

### Authentication Tests

- [ ] Can sign up with email/password
- [ ] Can login with email/password
- [ ] Can logout
- [ ] Can reset password
- [ ] Can login with Google (if enabled)
- [ ] Session persists on page refresh
- [ ] Redirects to login when needed

### Permission Tests

- [ ] Anonymous users can view content
- [ ] Anonymous users redirected when trying to write
- [ ] Logged-in users can like stories
- [ ] Logged-in users can bookmark stories
- [ ] Logged-in users can comment
- [ ] Logged-in users can write stories
- [ ] Users can only edit own content
- [ ] Admin can edit any content

### Data Tests

- [ ] Stories save to Firestore
- [ ] Comments save to Firestore
- [ ] Likes update in real-time
- [ ] Bookmarks persist across sessions
- [ ] User profile updates correctly

## Part 9: Default Credentials

### Admin Account
```
Email: admin@grimr.app
Password: GrimrAdmin2024!
Role: Admin
```

### Test User Account
```
Email: test@grimr.app
Password: TestUser2024!
Role: Regular User
```

**⚠️ IMPORTANT**: 
- Change these passwords in production
- Never commit real credentials to git
- Use strong, unique passwords

## Part 10: Next Steps

After completing setup:

1. **Test thoroughly** - Try all features
2. **Populate data** - Use admin populate feature
3. **Customize** - Adjust rules as needed
4. **Monitor** - Check Firebase Console regularly
5. **Backup** - Set up automated backups
6. **Document** - Keep admin procedures updated

## Support Resources

- [Firebase Documentation](https://firebase.google.com/docs)
- [Firestore Rules Reference](https://firebase.google.com/docs/firestore/security/get-started)
- [Firebase Authentication](https://firebase.google.com/docs/auth)
- Project Documentation: See `ADMIN_SETUP_GUIDE.md`

---

**Setup Complete!** 🎉

Your authentication system is now fully configured and ready to use.
