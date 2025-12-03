# Forum Seeding Guide 🌱

Quick guide to populate your forum with demo posts for testing and demonstration.

## 🎯 What Gets Created

**3 Demo Posts** with realistic content:

1. **"The Symbolism of Mirrors in Gothic Literature"**
   - Author: Eleanor Blackwood
   - Tags: Horror, Gothic, Literary Analysis
   - 23 likes, 8 replies

2. **"Unreliable Narrators: When Can We Trust the Voice?"**
   - Author: Victor Ashford
   - Tags: Mystery, Thriller, Writing Craft
   - 17 likes, 12 replies

3. **"The Uncanny Valley of AI-Generated Horror"**
   - Author: Cordelia Graves
   - Tags: Horror, Sci-Fi, Discussion
   - 31 likes, 15 replies

## 🚀 Method 1: Seed Page (Easiest)

### Step 1: Navigate to Seed Page
```
http://localhost:5173/seed-forum
```

### Step 2: Click Button
Click the **"🌱 Seed Forum with Demo Posts"** button

### Step 3: Done!
Posts are created in Firebase. Navigate to The Parlour to see them!

## 💻 Method 2: Browser Console

### Step 1: Open DevTools
Press `F12` or right-click → Inspect

### Step 2: Go to Console Tab
Click the "Console" tab

### Step 3: Run Command
```javascript
window.seedForum()
```

### Step 4: Check Results
You'll see:
```
🌱 Starting forum data seeding...
📝 Creating post 1/3: "The Symbolism of Mirrors..."
   ✅ Created with ID: abc123...
📝 Creating post 2/3: "Unreliable Narrators..."
   ✅ Created with ID: def456...
📝 Creating post 3/3: "The Uncanny Valley..."
   ✅ Created with ID: ghi789...
🎉 Forum seeding complete!
```

## 🔧 Method 3: Import in Code

If you want to seed programmatically:

```typescript
import { seedForumData } from './utils/seedForumData';

// Call it anywhere
await seedForumData();
```

## 📊 Verify in Firebase

### Check Firebase Console:
1. Go to Firebase Console
2. Navigate to Firestore Database
3. Look for `forum_posts` collection
4. You should see 3 new documents

### Check in App:
1. Navigate to `/parlour`
2. You should see 3 posts
3. Click on them to view full content
4. Try liking, replying, etc.

## 🔄 Re-seeding

### To seed again:
- The script will create **new** posts each time
- It doesn't check for duplicates
- You may want to delete old demo posts first

### To delete demo posts:
```javascript
// In browser console
import { collection, query, where, getDocs, deleteDoc } from 'firebase/firestore';
import { db } from './lib/firebase';

async function deleteDemoPosts() {
  const q = query(
    collection(db, 'forum_posts'),
    where('authorId', 'in', ['demo-user-1', 'demo-user-2', 'demo-user-3'])
  );
  const snapshot = await getDocs(q);
  for (const doc of snapshot.docs) {
    await deleteDoc(doc.ref);
  }
  console.log(`Deleted ${snapshot.size} demo posts`);
}

deleteDemoPosts();
```

## 🎨 Customizing Demo Posts

Edit `src/utils/seedForumData.ts` to customize:

```typescript
export const DEMO_POSTS = [
  {
    authorId: 'your-user-id',
    authorName: 'Your Name',
    title: 'Your Title',
    content: 'Your content...',
    tags: ['Tag1', 'Tag2'],
    likeCount: 0,
    replyCount: 0,
    isArchived: false,
  },
  // Add more posts...
];
```

## 🐛 Troubleshooting

### "Permission denied"
- Check Firebase security rules
- Make sure `forum_posts` collection allows writes
- You may need to be authenticated

### "window.seedForum is not a function"
- Make sure you're on a page that loads the app
- Try refreshing the page
- Check browser console for errors

### Posts not appearing
- Hard refresh: `Ctrl+Shift+R` (Windows) or `Cmd+Shift+R` (Mac)
- Check Firebase Console to verify posts were created
- Check browser console for errors

### Seeding fails silently
- Open browser console to see errors
- Check Firebase configuration
- Verify internet connection

## 📝 Notes

### Demo User IDs
- Posts use fake user IDs: `demo-user-1`, `demo-user-2`, `demo-user-3`
- These won't link to real user profiles
- You can edit posts to use real user IDs if needed

### Engagement Numbers
- Like counts and reply counts are hardcoded
- They won't match actual likes/replies
- They're just for visual demonstration

### Timestamps
- Uses `serverTimestamp()` for accurate Firebase timestamps
- Posts will appear as "just now" when first created

## 🎯 Best Practices

### For Development:
- Seed once at the start of development
- Delete and re-seed when testing fresh states
- Use real user accounts for testing interactions

### For Demos:
- Seed before showing the app
- Use realistic content that showcases features
- Consider adding replies to demo posts too

### For Production:
- **Don't seed in production!**
- Remove or protect the `/seed-forum` route
- Use real user-generated content

## 🔐 Security

### Protect the Seed Route:
Add authentication check in `SeedForum.tsx`:

```typescript
const { userProfile } = useAuth();

if (!userProfile?.isAdmin) {
  return <div>Access denied</div>;
}
```

### Or remove the route entirely:
Delete from `src/router/index.tsx`:
```typescript
{
  path: '/seed-forum',
  element: <AnimatedPage><WithNavigation>{(go) => <SeedForum go={go} />}</WithNavigation></AnimatedPage>,
},
```

## ✅ Quick Checklist

- [ ] Navigate to `/seed-forum`
- [ ] Click "Seed Forum" button
- [ ] Wait for success message
- [ ] Navigate to `/parlour`
- [ ] Verify 3 posts appear
- [ ] Click on a post to view details
- [ ] Try liking a post
- [ ] Try replying to a post
- [ ] Check Firebase Console

## 🎉 Done!

Your forum now has demo content to showcase features and test functionality!

---

**Need help?** Check the browser console for detailed error messages.

**Want more posts?** Edit `DEMO_POSTS` in `src/utils/seedForumData.ts`.

**Ready for production?** Remove the seed route and use real content!
