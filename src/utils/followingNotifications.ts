import { 
  collection, 
  query, 
  where, 
  getDocs, 
  addDoc,
  serverTimestamp 
} from 'firebase/firestore';
import { db } from '../lib/firebase';

/**
 * Notify all followers when a user publishes a new story
 */
export const notifyFollowersOfNewStory = async (
  authorId: string,
  authorName: string,
  storyId: string,
  storyTitle: string
) => {
  try {
    // Get all followers of this author
    const followsRef = collection(db, 'follows');
    const q = query(followsRef, where('followingId', '==', authorId));
    const followersSnapshot = await getDocs(q);

    // Create notifications for each follower
    const notificationPromises = followersSnapshot.docs.map(async (followDoc) => {
      const followerData = followDoc.data();
      const notificationRef = collection(db, 'notifications');
      
      return addDoc(notificationRef, {
        userId: followerData.followerId,
        type: 'new_story',
        title: 'New Story Published',
        message: `${authorName} published a new story: "${storyTitle}"`,
        link: `/story/${storyId}`,
        read: false,
        createdAt: serverTimestamp(),
        actorId: authorId,
        actorName: authorName
      });
    });

    await Promise.all(notificationPromises);
  } catch (error) {
    // Error notifying followers
  }
};

/**
 * Notify story author when someone likes their story
 */
export const notifyAuthorOfLike = async (
  authorId: string,
  likerId: string,
  likerName: string,
  storyId: string,
  storyTitle: string
) => {
  try {
    // Don't notify if author likes their own story
    if (authorId === likerId) return;

    const notificationRef = collection(db, 'notifications');
    await addDoc(notificationRef, {
      userId: authorId,
      type: 'story_like',
      title: 'Someone liked your story',
      message: `${likerName} liked your story "${storyTitle}"`,
      link: `/story/${storyId}`,
      read: false,
      createdAt: serverTimestamp(),
      actorId: likerId,
      actorName: likerName
    });
  } catch (error) {
    // Error notifying author of like
  }
};

/**
 * Notify story author when someone comments on their story
 */
export const notifyAuthorOfComment = async (
  authorId: string,
  commenterId: string,
  commenterName: string,
  storyId: string,
  storyTitle: string
) => {
  try {
    // Don't notify if author comments on their own story
    if (authorId === commenterId) return;

    const notificationRef = collection(db, 'notifications');
    await addDoc(notificationRef, {
      userId: authorId,
      type: 'story_comment',
      title: 'New comment on your story',
      message: `${commenterName} commented on "${storyTitle}"`,
      link: `/story/${storyId}`,
      read: false,
      createdAt: serverTimestamp(),
      actorId: commenterId,
      actorName: commenterName
    });
  } catch (error) {
    // Error notifying author of comment
  }
};

/**
 * Notify user when someone replies to their forum post
 */
export const notifyOfForumReply = async (
  postAuthorId: string,
  replierId: string,
  replierName: string,
  postId: string,
  postTitle: string
) => {
  try {
    // Don't notify if replying to own post
    if (postAuthorId === replierId) return;

    const notificationRef = collection(db, 'notifications');
    await addDoc(notificationRef, {
      userId: postAuthorId,
      type: 'forum_reply',
      title: 'New reply to your post',
      message: `${replierName} replied to "${postTitle}"`,
      link: `/forum/${postId}`,
      read: false,
      createdAt: serverTimestamp(),
      actorId: replierId,
      actorName: replierName
    });
  } catch (error) {
    // Error notifying of forum reply
  }
};
