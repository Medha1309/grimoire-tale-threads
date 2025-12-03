/**
 * Seed Forum Data Utility
 * Creates demo posts in Firebase for The Parlour
 * 
 * Usage: Import and call seedForumData() from browser console or a component
 */

import { collection, addDoc, serverTimestamp } from 'firebase/firestore';
import { db } from '../lib/firebase';

export const DEMO_POSTS = [
  {
    authorId: 'demo-user-1',
    authorName: 'Eleanor Blackwood',
    authorAvatar: undefined,
    title: 'The Symbolism of Mirrors in Gothic Literature',
    content: `I've been fascinated by how mirrors are used in gothic horror. They're not just reflective surfaces—they're portals, truth-tellers, and sometimes prisons for the soul.

In "The Haunting of Hill House," mirrors distort reality. In "Carmilla," they reveal what shouldn't be seen. And in countless vampire tales, they expose the undead by showing nothing at all.

What are your favorite uses of mirrors in horror? Do you think they represent self-reflection, or something more sinister?`,
    tags: ['Horror', 'Gothic', 'Literary Analysis'],
    likeCount: 23,
    replyCount: 8,
    isArchived: false,
  },
  {
    authorId: 'demo-user-2',
    authorName: 'Victor Ashford',
    authorAvatar: undefined,
    title: 'Unreliable Narrators: When Can We Trust the Voice?',
    content: `Just finished a story where I realized halfway through that the narrator had been lying to me the entire time. It made me question everything I'd read.

Unreliable narrators are brilliant when done well—they make you complicit in the deception. You WANT to believe them, even when the cracks start showing.

But there's a fine line between "clever twist" and "cheap trick." What makes an unreliable narrator work for you? And which stories have done it best?

Personally, I think the key is planting subtle clues that make sense in retrospect, without being obvious on first read.`,
    tags: ['Mystery', 'Thriller', 'Writing Craft'],
    likeCount: 17,
    replyCount: 12,
    isArchived: false,
  },
  {
    authorId: 'demo-user-3',
    authorName: 'Cordelia Graves',
    authorAvatar: undefined,
    title: 'The Uncanny Valley of AI-Generated Horror',
    content: `Has anyone else noticed how AI-generated images have this inherent creepiness? The slightly-wrong proportions, the dead eyes, the fingers that don't quite work...

It's like they exist in the uncanny valley—close enough to human to trigger recognition, but wrong enough to trigger revulsion. Perfect for horror, actually.

I've been thinking about incorporating this aesthetic into a story. Not about AI itself, but about something that LOOKS almost human but isn't. Something that mimics us but gets the details wrong.

The horror isn't in the monster being obviously monstrous—it's in the subtle wrongness that you can't quite put your finger on.

Thoughts? Is this a new frontier for horror, or just a passing trend?`,
    tags: ['Horror', 'Sci-Fi', 'Discussion'],
    likeCount: 31,
    replyCount: 15,
    isArchived: false,
  },
];

/**
 * Seeds the forum with demo posts
 * @returns Promise with results
 */
export async function seedForumData() {
  console.log('🌱 Starting forum data seeding...\n');

  const results = {
    success: [] as string[],
    errors: [] as string[],
  };

  try {
    for (let i = 0; i < DEMO_POSTS.length; i++) {
      const post = DEMO_POSTS[i];
      
      console.log(`📝 Creating post ${i + 1}/${DEMO_POSTS.length}: "${post.title}"`);
      
      try {
        const docRef = await addDoc(collection(db, 'forum_posts'), {
          ...post,
          createdAt: serverTimestamp(),
          updatedAt: serverTimestamp(),
        });
        
        console.log(`   ✅ Created with ID: ${docRef.id}`);
        results.success.push(docRef.id);
      } catch (error: any) {
        console.error(`   ❌ Failed to create post: ${error.message}`);
        results.errors.push(post.title);
      }
    }

    console.log('\n🎉 Forum seeding complete!');
    console.log(`   ✅ Created: ${results.success.length} posts`);
    if (results.errors.length > 0) {
      console.log(`   ❌ Failed: ${results.errors.length} posts`);
    }
    
    return results;
    
  } catch (error) {
    console.error('❌ Error seeding forum data:', error);
    throw error;
  }
}

/**
 * Quick function to call from browser console
 * Usage: Open browser console and type: window.seedForum()
 */
if (typeof window !== 'undefined') {
  (window as any).seedForum = seedForumData;
}
