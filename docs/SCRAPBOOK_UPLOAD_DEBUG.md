# Scrapbook Upload Not Working - Debug Guide

## Which Scrapbook Are You Using?

Your app has **TWO different scrapbook systems**:

### 1. Collections Scrapbook (Firebase) - Currently Active
- **Location**: `/scrapbook` route
- **Storage**: Firebase Firestore + Firebase Storage
- **Requires**: Firebase authentication + creating collections first
- **Upload**: Images uploaded to Firebase Storage

### 2. Diary Scrapbook (LocalStorage) - Not Currently Used
- **Location**: Can be accessed from Dollhouse
- **Storage**: Browser localStorage (no server needed)
- **Requires**: Nothing - works offline
- **Upload**: Images stored as base64 in localStorage

## Current Issue

When you click Scrapbook from Dollhouse, it goes to the **Collections Scrapbook** which needs:

1. ✅ Firebase configured (you have this)
2. ✅ User logged in (you need this)
3. ✅ Create a collection first
4. Then upload images to that collection

## Quick Fix Options

### Option A: Use Diary Scrapbook Instead (Simpler)

Change the Dollhouse to use the localStorage-based scrapbook:

**File**: `src/pages/Dollhouse.tsx`

Find this line (around line 59):
```typescript
if (newView === 'scrapbook') {
  navigate('/scrapbook');
  return;
}
```

Change to:
```typescript
if (newView === 'scrapbook') {
  // Use diary scrapbook instead
  setCurrentView('scrapbook');
  return;
}
```

This will use the MemoryScrapbook component which:
- Works without Firebase
- Stores images in localStorage
- No need to create collections
- Upload works immediately

### Option B: Fix Collections Scrapbook

If you want to use the Firebase version:

1. **Make sure you're logged in**
   - Check if you see your username in the navbar
   - If not, sign up/login first

2. **Create a collection first**
   - Click "Create Collection" button
   - Give it a name
   - Then click on that collection
   - Now you can upload images

3. **Check Firebase Storage Rules**
   - Make sure storage rules allow uploads
   - Check `firestore.rules` file

## Test Which One You're Using

Open browser console and type:
```javascript
window.location.pathname
```

- If it shows `/scrapbook` → You're using Collections (Firebase)
- If it shows `/dollhouse` → You're using Diary (localStorage)

## Recommended Solution

**Use Option A** (Diary Scrapbook) because:
- ✅ No Firebase needed
- ✅ Works offline
- ✅ Simpler upload
- ✅ No collections needed
- ✅ Already fixed and working

The Collections version is more complex and meant for sharing/collaboration features.
