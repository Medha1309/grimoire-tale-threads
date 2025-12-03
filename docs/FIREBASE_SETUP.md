# Firebase Setup Guide for GRIMOIRE

## Step 1: Create Firebase Project

1. Go to [Firebase Console](https://console.firebase.google.com/)
2. Click "Add project"
3. Enter project name: `grimoire-horror-platform` (or your choice)
4. Disable Google Analytics (optional for MVP)
5. Click "Create project"

## Step 2: Register Your Web App

1. In your Firebase project, click the **Web icon** (`</>`)
2. Register app with nickname: `GRIMOIRE Web`
3. **Don't** check "Firebase Hosting" yet
4. Click "Register app"
5. Copy the configuration object (you'll need this next)

## Step 3: Configure Environment Variables

1. Create a `.env` file in your project root (copy from `.env.example`)
2. Add your Firebase configuration:

```env
VITE_FIREBASE_API_KEY=your_api_key_here
VITE_FIREBASE_AUTH_DOMAIN=your_project.firebaseapp.com
VITE_FIREBASE_PROJECT_ID=your_project_id
VITE_FIREBASE_STORAGE_BUCKET=your_project.appspot.com
VITE_FIREBASE_MESSAGING_SENDER_ID=your_sender_id
VITE_FIREBASE_APP_ID=your_app_id
```

3. **Important**: Add `.env` to your `.gitignore` file:
```
# Environment variables
.env
.env.local
```

## Step 4: Enable Authentication

1. In Firebase Console, go to **Build > Authentication**
2. Click "Get started"
3. Enable **Email/Password** sign-in method
4. Enable **Google** sign-in method (optional but recommended)
   - Add your support email
   - Save

## Step 5: Set Up Firestore Database

1. Go to **Build > Firestore Database**
2. Click "Create database"
3. Choose **Start in test mode** (for development)
4. Select your region (choose closest to your users)
5. Click "Enable"

### Security Rules (Update Later)

For now, test mode allows read/write. Before production, update rules:

```javascript
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    // Users can read/write their own profile
    match /users/{userId} {
      allow read: if true;
      allow write: if request.auth != null && request.auth.uid == userId;
    }
    
    // Stories are readable by all, writable by author
    match /stories/{storyId} {
      allow read: if true;
      allow create: if request.auth != null;
      allow update, delete: if request.auth != null && 
        request.auth.uid == resource.data.authorId;
    }
    
    // Chapters follow story permissions
    match /chapters/{chapterId} {
      allow read: if true;
      allow write: if request.auth != null;
    }
    
    // Interactions are user-specific
    match /interactions/{userId} {
      allow read, write: if request.auth != null && request.auth.uid == userId;
    }
    
    // Comments are readable by all, writable by authenticated users
    match /comments/{commentId} {
      allow read: if true;
      allow create: if request.auth != null;
      allow update, delete: if request.auth != null && 
        request.auth.uid == resource.data.userId;
    }
  }
}
```

## Step 6: Set Up Storage (Optional - for user avatars)

1. Go to **Build > Storage**
2. Click "Get started"
3. Start in **test mode**
4. Choose your region
5. Click "Done"

### Storage Rules

```javascript
rules_version = '2';
service firebase.storage {
  match /b/{bucket}/o {
    match /avatars/{userId}/{allPaths=**} {
      allow read: if true;
      allow write: if request.auth != null && request.auth.uid == userId;
    }
    match /covers/{allPaths=**} {
      allow read: if true;
      allow write: if request.auth != null;
    }
  }
}
```

## Step 7: Test Your Setup

1. Start your development server:
```bash
npm run dev
```

2. Navigate to the signup page
3. Create a test account
4. Check Firebase Console:
   - **Authentication > Users** - should show your new user
   - **Firestore Database** - should have a `users` collection with your profile

## Step 8: Initialize Database with Stories

You can migrate your existing stories to Firestore using a script or manually. Here's a quick script:

Create `scripts/migrate-stories.ts`:

```typescript
import { db } from '../src/lib/firebase';
import { collection, doc, setDoc } from 'firebase/firestore';
import { STORIES } from '../src/data/stories';

async function migrateStories() {
  for (const story of STORIES) {
    const storyRef = doc(collection(db, 'stories'), story.slug);
    
    // Create story document
    await setDoc(storyRef, {
      slug: story.slug,
      title: story.title,
      author: story.author,
      authorId: 'system', // Replace with actual author ID
      cover: story.cover,
      genre: story.genre,
      blurb: story.blurb,
      published: true,
      createdAt: new Date(),
      updatedAt: new Date(),
      stats: {
        views: 0,
        likes: 0,
        bookmarks: 0,
        avgRating: 0,
        totalRatings: 0,
      }
    });
    
    // Create chapters
    for (const chapter of story.content) {
      const chapterRef = doc(collection(db, 'chapters'));
      await setDoc(chapterRef, {
        storyId: story.slug,
        number: chapter.page,
        title: `Chapter ${chapter.page}`,
        content: chapter.text,
        wordCount: chapter.text.split(' ').length,
        createdAt: new Date(),
      });
    }
    
    console.log(`Migrated: ${story.title}`);
  }
  
  console.log('Migration complete!');
}

migrateStories();
```

## Troubleshooting

### "Firebase: Error (auth/configuration-not-found)"
- Make sure your `.env` file is in the project root
- Restart your dev server after adding environment variables
- Check that all VITE_ prefixed variables are correct

### "Missing or insufficient permissions"
- Check your Firestore security rules
- Make sure you're authenticated before writing data
- Verify the user has permission for the operation

### Google Sign-In Not Working
- Add authorized domains in Firebase Console:
  - Go to Authentication > Settings > Authorized domains
  - Add `localhost` for development
  - Add your production domain when deploying

## Next Steps

1. ✅ Authentication is working
2. ⏭️ Implement story interactions (likes, bookmarks, ratings)
3. ⏭️ Add comments system
4. ⏭️ Create story composer
5. ⏭️ Build analytics dashboard
6. ⏭️ Deploy to production

## Production Checklist

Before going live:
- [ ] Update Firestore security rules (remove test mode)
- [ ] Update Storage security rules (remove test mode)
- [ ] Add authorized domains for production
- [ ] Set up Firebase Hosting or deploy to your platform
- [ ] Enable email verification (optional)
- [ ] Set up error monitoring
- [ ] Configure backup strategy
- [ ] Review Firebase usage limits and upgrade plan if needed

## Cost Monitoring

Firebase free tier (Spark Plan):
- **Authentication**: 10,000 verifications/month
- **Firestore**: 50,000 reads, 20,000 writes, 20,000 deletes per day
- **Storage**: 5 GB
- **Hosting**: 10 GB/month transfer

Monitor usage in Firebase Console > Usage and billing

## Support

- [Firebase Documentation](https://firebase.google.com/docs)
- [Firebase Support](https://firebase.google.com/support)
- [Stack Overflow - Firebase](https://stackoverflow.com/questions/tagged/firebase)
