# Deploy Firestore Rules - Quick Guide

## The Problem
Your library write functionality (likes, bookmarks, comments) isn't working because the Firestore security rules are missing permissions for story-related collections.

## The Solution
Deploy the updated `firestore.rules` file to your Firebase project.

## Method 1: Manual Deployment (Fastest - 2 minutes)

1. Open [Firebase Console](https://console.firebase.google.com/)
2. Select your project
3. Click **Firestore Database** in the left sidebar
4. Click the **Rules** tab at the top
5. Copy the entire contents of your `firestore.rules` file
6. Paste it into the rules editor
7. Click **Publish**

✅ Done! Test your app immediately.

## Method 2: Using Firebase CLI (Recommended for future updates)

### First Time Setup

1. **Install Firebase CLI**
```bash
npm install -g firebase-tools
```

2. **Login to Firebase**
```bash
firebase login
```

3. **Initialize Firebase in your project**
```bash
firebase init
```
- Select: Firestore
- Use existing project
- Accept default file names (firestore.rules, firestore.indexes.json)

### Deploy Rules

```bash
firebase deploy --only firestore:rules
```

## Verify It's Working

After deploying, test these features in your app:

1. **Without Login:**
   - View stories ✓
   - See view counts ✓
   - See like/bookmark counts ✓
   - Read comments ✓

2. **With Login:**
   - Like a story ✓
   - Bookmark a story ✓
   - Add a comment ✓
   - Reply to a comment ✓
   - Like a comment ✓
   - Edit your own comment ✓
   - Delete your own comment ✓

## What Changed in the Rules

Added three new collection rules:

### 1. storyStats
- Tracks views, likes, bookmarks for each story
- Anyone can read
- Anyone can create/update (for view counts)

### 2. userInteractions
- Stores each user's likes, bookmarks, ratings
- Users can only access their own data

### 3. comments
- Stores all story comments
- Anyone can read
- Authenticated users can create
- Users can only edit/delete their own

## Troubleshooting

### "Permission denied" in console
→ Rules not deployed yet. Use Method 1 above.

### "Firebase not configured"
→ Create `.env` file with your Firebase credentials (see `.env.example`)

### "Must be logged in"
→ Expected behavior! Sign up or login first.

### Still not working?
1. Check browser console for specific errors
2. Verify you're logged in
3. Check Firebase Console → Firestore → Rules to confirm deployment
4. Clear browser cache and reload

## Quick Test Commands

Open browser console on your app and run:

```javascript
// Check if Firebase is configured
console.log(firebase.app().options);

// Check if user is logged in
firebase.auth().currentUser;

// Test Firestore connection
firebase.firestore().collection('storyStats').doc('test').get()
  .then(() => console.log('✓ Firestore connected'))
  .catch(err => console.error('✗ Error:', err.message));
```
