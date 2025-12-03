# Quick Start - Testing Guide 🚀

## ✅ Bookmark System is Working!

The bookmark button on the story detail page is now functional. Here's how to test it:

## Create a Test User (3 Easy Options)

### Option 1: Browser Tool (Easiest) ⭐
1. Navigate to: `http://localhost:5173/create-test-user.html`
2. Click "Create Test User"
3. Wait for success message
4. You'll be redirected to login

### Option 2: Sign Up Through App
1. Go to `http://localhost:5173/signup`
2. Fill in:
   - Display Name: `Test User`
   - Email: `test@grimr.app`
   - Password: `TestUser123!`
3. Click "Sign Up"

### Option 3: Use Existing Account
If you already have an account, just log in with your credentials!

## Test Credentials
```
Email: test@grimr.app
Password: TestUser123!
```

## Testing the Complete Library System

### 1. Browse Library
```
✅ Go to /stories
✅ Hover over books → see glowing stats
✅ Click any book card
```

### 2. Bookmark a Story
```
✅ On story detail page
✅ Click the "Bookmark" button
✅ Button glows pink and says "Bookmarked"
✅ Click again to unbookmark
```

### 3. View Bookmarks in Dollhouse
```
✅ Go to /diary (Dollhouse)
✅ Click "Bookmarks" room
✅ See your bookmarked stories
✅ Click any story to return to detail page
```

### 4. Write a Story
```
✅ Go to /stories
✅ Click "Write" button
✅ Write content with chapter breaks:
   
   # Chapter 1
   
   Your content...
   
   ---
   
   # Chapter 2
   
   More content...

✅ Click "Publish"
✅ Story appears in "Your Tales"
```

### 5. Read a Story
```
✅ Click any story card
✅ Click "Start Reading"
✅ See chapters displayed
✅ Scroll to track progress
```

## What's Working Now

### Library System ✅
- Real-time stats (views, likes, bookmarks, ratings)
- Glowing hover effects on stats
- Clean card design
- Chapter-based writing
- Story publishing

### Bookmark System ✅
- Bookmark button on detail page
- Pink glow when bookmarked
- Syncs to Firebase
- Syncs to localStorage
- Appears in Dollhouse
- Cross-tab synchronization

### Dollhouse Integration ✅
- Bookmarks room shows saved stories
- Click to navigate back to story
- Real-time updates
- Remove bookmarks

### Reader ✅
- Chapter navigation
- Progress tracking
- Supports both chapter-based and plain text
- Beautiful reading experience

## Troubleshooting

### Can't Create User?
- Check Firebase console is set up
- Verify `.env` file has correct credentials
- Make sure Authentication is enabled
- Check Email/Password provider is enabled

### Bookmark Not Working?
- Make sure you're logged in
- Check browser console for errors
- Verify Firestore rules allow writes
- Try refreshing the page

### Stats Not Showing?
- Stats may be 0 for new stories
- Try bookmarking/liking to see changes
- Check Firebase console for data

## Firebase Console Quick Links

1. **Authentication**: Check users
2. **Firestore**: View data collections
3. **Rules**: Verify security rules

## Next Steps

Once logged in, you can:
- ✍️ Write stories with chapters
- 📚 Bookmark your favorites
- 💬 Comment on stories
- ❤️ Like and rate stories
- 🏠 Access Dollhouse features
- 💭 Post in Gilded Parlour (forum)

---

**Everything is connected and working!** Enjoy testing the complete library system. 🎉
