# Mock Book Data Setup Guide

This guide explains how to populate your library with mock book data including stats, comments, and ratings.

## What's Included

The mock data system provides:

- **18 Complete Stories** with full content
- **Story Statistics**: Views, likes, bookmarks, and ratings for each story
- **User Comments**: Realistic comments with timestamps and user avatars
- **Nested Replies**: Comments with threaded replies
- **Engagement Metrics**: Like counts and user interactions
- **Ratings & Reviews**: Star ratings with written reviews

## Files Created

1. **`src/data/mockBookData.ts`** - Contains all mock data definitions
2. **`src/utils/populateMockData.ts`** - Utility to populate Firebase
3. **`src/pages/AdminPopulate.tsx`** - Admin interface to trigger population
4. **Router updates** - Added admin route

## How to Use

### Method 1: Using the Admin Page (Recommended)

1. Start your development server:
   ```bash
   npm run dev
   ```

2. Navigate to the admin page:
   ```
   http://localhost:5173/admin/populate
   ```

3. Click the "Populate Mock Data" button

4. Confirm the action when prompted

5. Wait for the success message

### Method 2: Programmatic Population

You can also call the function directly in your code:

```typescript
import { populateMockData } from './utils/populateMockData';

// Call this once to populate
await populateMockData();
```

## What Gets Created in Firebase

### Collections

1. **`storyStats`** collection:
   - Document ID: `{storyId}`
   - Fields: views, likes, bookmarks, avgRating, totalRatings

2. **`comments`** collection:
   - Fields: storyId, userId, userName, userAvatar, text, parentId, likes, likedBy, createdAt

## Stories Included

All 18 stories from your library will have mock data:

1. The Haunting of Blackwood Manor
2. The Whispering Shadows
3. The Last Breath
4. The Dollmaker's Daughter
5. Beneath the Floorboards
6. The Midnight Train
7. The Bone Orchard
8. The Lighthouse Keeper
9. The Crimson Room
10. The Forgotten Ward
11. The Watcher in the Walls
12. The Thirteenth Step
13. Voices in the Static
14. The Portrait
15. The Well of Whispers
16. The Collector's Prize
17. House of Echoes
18. About Me: Diaries of a Stoner

## Viewing the Data

Once populated, you can see the data in action:

1. **Story Pages**: Visit any story detail page to see:
   - View counts
   - Like and bookmark counts
   - Star ratings
   - Comments section with replies

2. **Library Page**: The main library will show:
   - Updated engagement metrics
   - Popular stories based on stats

## Customizing Mock Data

To modify the mock data, edit `src/data/mockBookData.ts`:

```typescript
export const MOCK_BOOK_DATA: MockBookData[] = [
  {
    storyId: 'your-story-slug',
    stats: {
      views: 1000,
      likes: 50,
      bookmarks: 25,
      avgRating: 4.5,
      totalRatings: 30,
    },
    comments: [
      {
        userName: 'Reader123',
        text: 'Great story!',
        likes: 10,
        createdAt: new Date(),
        replies: []
      }
    ],
    ratings: []
  }
];
```

## Important Notes

⚠️ **Firebase Permissions**: Make sure your Firebase rules allow writes to `storyStats` and `comments` collections.

⚠️ **One-Time Operation**: This should typically be run once to initialize data. Running it multiple times will create duplicate comments.

⚠️ **Mock Users**: The comments use mock user IDs. They won't be associated with real user accounts.

## Troubleshooting

### "Permission Denied" Error

Update your Firestore rules to allow writes:

```javascript
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    match /storyStats/{storyId} {
      allow read: if true;
      allow write: if true; // Or add proper auth
    }
    
    match /comments/{commentId} {
      allow read: if true;
      allow write: if true; // Or add proper auth
    }
  }
}
```

### Comments Not Showing

1. Check browser console for errors
2. Verify Firebase connection
3. Check that `storyId` matches your story slugs
4. Ensure Firestore indexes are created (check Firebase console)

### Data Not Persisting

1. Verify Firebase configuration in `src/lib/firebase.ts`
2. Check that you're not in offline mode
3. Verify your Firebase project has Firestore enabled

## Next Steps

After populating the data:

1. Test the comments section on story pages
2. Verify like/bookmark functionality
3. Check rating displays
4. Test comment replies
5. Ensure all engagement metrics display correctly

## Cleanup

To remove all mock data:

```typescript
// You'll need to create a cleanup function or manually delete from Firebase console
// Navigate to Firebase Console > Firestore Database
// Delete the storyStats and comments collections
```

---

**Need Help?** Check the Firebase console to verify data was created correctly.
