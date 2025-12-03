# GRIMOIRE - Quick Start Guide 🎃

## Get Up and Running in 10 Minutes

### Step 1: Firebase Project (3 minutes)

1. **Go to Firebase Console**
   ```
   https://console.firebase.google.com/
   ```

2. **Create Project**
   - Click "Add project"
   - Name: `grimoire-horror` (or your choice)
   - Disable Google Analytics (optional)
   - Click "Create project"

3. **Add Web App**
   - Click the Web icon (`</>`)
   - App nickname: `GRIMOIRE Web`
   - Don't check Firebase Hosting
   - Click "Register app"
   - **Copy the config object** (you'll need this next!)

### Step 2: Enable Services (2 minutes)

1. **Enable Authentication**
   - Go to Build → Authentication
   - Click "Get started"
   - Enable "Email/Password"
   - Enable "Google" (add your email as support email)

2. **Create Firestore Database**
   - Go to Build → Firestore Database
   - Click "Create database"
   - Choose "Start in test mode"
   - Select your region
   - Click "Enable"

### Step 3: Configure Your App (2 minutes)

1. **Create `.env` file** in project root:
   ```env
   VITE_FIREBASE_API_KEY=your_api_key_here
   VITE_FIREBASE_AUTH_DOMAIN=your_project.firebaseapp.com
   VITE_FIREBASE_PROJECT_ID=your_project_id
   VITE_FIREBASE_STORAGE_BUCKET=your_project.appspot.com
   VITE_FIREBASE_MESSAGING_SENDER_ID=your_sender_id
   VITE_FIREBASE_APP_ID=your_app_id
   ```

2. **Paste your Firebase config** from Step 1

### Step 4: Run the App (1 minute)

```bash
# Install dependencies (if not done)
npm install

# Start development server
npm run dev
```

### Step 5: Test It! (2 minutes)

1. Open http://localhost:5173
2. Click "Sign Up" in navbar
3. Create an account
4. You're in! 🎉

### Verify It Worked

**Check Firebase Console:**
- Authentication → Users (should see your account)
- Firestore → Data → users (should see your profile)

**Check the App:**
- Navbar shows your name and avatar
- Click your name → Profile page
- Edit your bio
- Log out and log back in

## That's It! 🎃

You now have a fully functional authentication system!

## What's Next?

### Explore the Features
- Sign up / Log in
- Edit your profile
- Browse the library
- Read stories

### Build More Features
See `IMPLEMENTATION_SUMMARY.md` for next steps:
- Story interactions (likes, bookmarks, ratings)
- Comments system
- Story composer
- And more!

## Need Help?

**Common Issues:**

1. **"Configuration not found"**
   - Make sure `.env` file exists in project root
   - Restart dev server: `Ctrl+C` then `npm run dev`

2. **Google Sign-In not working**
   - Add `localhost` to authorized domains in Firebase Console
   - Go to Authentication → Settings → Authorized domains

3. **Can't create account**
   - Check Firebase Console for errors
   - Make sure Authentication is enabled
   - Check browser console for error messages

**Documentation:**
- `FIREBASE_SETUP.md` - Detailed setup guide
- `README_FIREBASE.md` - Feature overview
- `IMPLEMENTATION_SUMMARY.md` - Complete technical details

## Quick Commands

```bash
# Development
npm run dev              # Start dev server
npm run build            # Build for production
npm run preview          # Preview production build

# Firebase
firebase login           # Login to Firebase CLI
firebase init            # Initialize Firebase in project
firebase deploy          # Deploy to Firebase Hosting
```

## Security Note

⚠️ **Current setup is for development only!**

Before production:
1. Update Firestore security rules (remove test mode)
2. Add proper validation
3. Enable email verification
4. Set up monitoring

See `FIREBASE_SETUP.md` for production security rules.

## Success! 🎉

You're now ready to build the next great horror story platform!

**Happy coding! 👻**
