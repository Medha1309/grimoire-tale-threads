# Default Credentials - Quick Reference

## Admin Account

```
Email:    admin@grimr.app
Password: GrimrAdmin2024!
Role:     Administrator
```

**Admin Capabilities:**
- ✅ Full access to all features
- ✅ Edit/delete any content
- ✅ Manage users
- ✅ Populate mock data
- ✅ Access admin dashboard

## Test User Account

```
Email:    test@grimr.app
Password: TestUser2024!
Role:     Regular User
```

**User Capabilities:**
- ✅ Read all content
- ✅ Like/bookmark stories
- ✅ Write stories
- ✅ Comment on stories
- ✅ Create forum posts
- ❌ Cannot edit others' content

## Setup Instructions

### 1. Create Admin Account

1. Go to `/signup` in your app
2. Sign up with admin credentials above
3. Note the User UID from Firebase Console
4. Grant admin privileges:
   - Firebase Console → Firestore → users collection
   - Find user document
   - Add field: `isAdmin` = `true` (boolean)

### 2. Create Test Account

1. Go to `/signup`
2. Sign up with test user credentials
3. No additional setup needed

## Quick Test

### Test Admin Access
```bash
1. Login with admin@grimr.app
2. Navigate to /admin/populate
3. Should see admin dashboard
```

### Test User Access
```bash
1. Login with test@grimr.app
2. Try writing a story
3. Try liking a story
4. Try commenting
```

## Security Notes

⚠️ **IMPORTANT**:
- Change these passwords before production deployment
- Never commit real credentials to version control
- Use strong, unique passwords in production
- Enable 2FA for admin accounts

## Password Requirements

For production, use passwords that:
- Are at least 12 characters long
- Include uppercase and lowercase letters
- Include numbers and symbols
- Are unique (not used elsewhere)
- Are stored securely (password manager)

## Changing Passwords

### Via Firebase Console
1. Go to Authentication → Users
2. Find the user
3. Click three dots → Reset password
4. Send password reset email

### Via App
1. Go to `/login`
2. Click "Forgot password?"
3. Enter email
4. Follow reset link in email

## Troubleshooting

### Can't login with these credentials?

**Check:**
1. Account exists in Firebase Console → Authentication
2. Account is not disabled
3. Email/Password auth is enabled
4. Correct password (case-sensitive)

### Admin features not working?

**Check:**
1. `isAdmin: true` is set in Firestore users collection
2. Firestore rules are deployed
3. Logged out and back in after granting admin

### Need to create new admin?

**Steps:**
1. Sign up normally
2. Get User UID from Firebase Console
3. Add `isAdmin: true` to user document in Firestore

---

**Quick Start**: Sign up with admin@grimr.app, grant admin privileges in Firestore, and you're ready to go!
