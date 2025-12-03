# Test User Account

## Quick Sign Up
Since Firebase Authentication is set up, you can create your own account:

1. Go to the app in your browser
2. Click "Sign Up" in the navigation
3. Use any email and password you want

**OR** use these test credentials:

## Test Account
- **Email**: `test@grimr.app`
- **Password**: `TestUser123!`

## How to Create This Account

### Option 1: Sign Up Through the App (Recommended)
1. Navigate to `/signup` in your app
2. Fill in the form:
   - Display Name: `Test User`
   - Email: `test@grimr.app`
   - Password: `TestUser123!`
3. Click "Sign Up"
4. You're logged in!

### Option 2: Firebase Console
1. Go to [Firebase Console](https://console.firebase.google.com/)
2. Select your project
3. Go to Authentication → Users
4. Click "Add User"
5. Enter:
   - Email: `test@grimr.app`
   - Password: `TestUser123!`
6. Click "Add User"

### Option 3: Use the Script Below

Run this in your browser console while on the app:

```javascript
// Sign up a test user
const signUpTestUser = async () => {
  const response = await fetch('http://localhost:5173/signup', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      email: 'test@grimr.app',
      password: 'TestUser123!',
      displayName: 'Test User'
    })
  });
  console.log('User created!', await response.json());
};

signUpTestUser();
```

## What You Can Do Once Logged In

✅ **Library**
- Write and publish stories
- Bookmark stories (syncs to Dollhouse)
- Like stories
- Rate stories
- Comment on stories

✅ **Dollhouse**
- Write private diary entries
- Create confessions
- View bookmarked stories
- Access different rooms

✅ **Gilded Parlour (Forum)**
- Create threads
- Post replies
- Like posts
- Report content

✅ **Profile**
- View your stats
- See your stories
- Manage your content

## Testing the Bookmark System

1. **Sign in** with the test account
2. Go to **Library** (`/stories`)
3. Click on any book card
4. On the detail page, click the **Bookmark** button
5. Button should glow pink and say "Bookmarked"
6. Go to **Dollhouse** (`/diary`)
7. Click the **Bookmarks** room
8. Your bookmarked story should appear there!

## Firebase Setup Check

If you're having issues, make sure:
- Firebase config is in `.env` file
- Firebase Authentication is enabled in console
- Firestore is set up with proper rules
- Email/Password provider is enabled in Authentication

Check `FIREBASE_SETUP.md` for detailed setup instructions.
