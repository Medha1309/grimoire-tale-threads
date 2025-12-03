import { 
  doc, 
  setDoc, 
  collection, 
  addDoc,
  // serverTimestamp, // Unused
  Timestamp 
} from 'firebase/firestore';
import { db } from '../lib/firebase';
import { MOCK_BOOK_DATA } from '../data/mockBookData';

/**
 * Populates Firebase with mock book data including stats, comments, and ratings
 * This should be run once to initialize the database with sample data
 */
export const populateMockData = async () => {
  console.log('Starting to populate mock data...');
  
  try {
    for (const bookData of MOCK_BOOK_DATA) {
      console.log(`Processing ${bookData.storyId}...`);
      
      // 1. Create story stats
      const statsRef = doc(db, 'storyStats', bookData.storyId);
      await setDoc(statsRef, bookData.stats);
      console.log(`  ✓ Stats created for ${bookData.storyId}`);
      
      // 2. Create comments (with replies)
      const commentIds: { [key: string]: string } = {};
      
      for (const comment of bookData.comments) {
        const commentData = {
          storyId: bookData.storyId,
          userId: `mock_user_${comment.userName.toLowerCase().replace(/\s+/g, '_')}`,
          userName: comment.userName,
          userAvatar: comment.userAvatar,
          text: comment.text,
          parentId: null,
          likes: comment.likes,
          likedBy: [], // Empty for mock data
          createdAt: Timestamp.fromDate(comment.createdAt),
        };
        
        const commentRef = await addDoc(collection(db, 'comments'), commentData);
        commentIds[comment.userName] = commentRef.id;
        
        // Add replies if they exist
        if (comment.replies) {
          for (const reply of comment.replies) {
            const replyData = {
              storyId: bookData.storyId,
              userId: `mock_user_${reply.userName.toLowerCase().replace(/\s+/g, '_')}`,
              userName: reply.userName,
              userAvatar: reply.userAvatar,
              text: reply.text,
              parentId: commentRef.id,
              likes: reply.likes,
              likedBy: [],
              createdAt: Timestamp.fromDate(reply.createdAt),
            };
            
            await addDoc(collection(db, 'comments'), replyData);
          }
        }
      }
      
      console.log(`  ✓ Comments created for ${bookData.storyId}`);
    }
    
    console.log('✅ All mock data populated successfully!');
    return { success: true, message: 'Mock data populated successfully' };
    
  } catch (error) {
    console.error('Error populating mock data:', error);
    return { success: false, error };
  }
};
