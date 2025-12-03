import { doc, setDoc, getDoc } from 'firebase/firestore';
import { db } from '../lib/firebase';

/**
 * Make a user an admin
 * This should be called manually or through a secure admin interface
 */
export const makeUserAdmin = async (userId: string): Promise<void> => {
  try {
    const userRef = doc(db, 'users', userId);
    await setDoc(userRef, { isAdmin: true }, { merge: true });
    console.log(`User ${userId} is now an admin`);
  } catch (error) {
    console.error('Error making user admin:', error);
    throw error;
  }
};

/**
 * Check if a user is an admin
 */
export const isUserAdmin = async (userId: string): Promise<boolean> => {
  try {
    const userRef = doc(db, 'users', userId);
    const userSnap = await getDoc(userRef);
    
    if (userSnap.exists()) {
      return userSnap.data().isAdmin === true;
    }
    return false;
  } catch (error) {
    console.error('Error checking admin status:', error);
    return false;
  }
};

/**
 * Remove admin privileges from a user
 */
export const removeAdminPrivileges = async (userId: string): Promise<void> => {
  try {
    const userRef = doc(db, 'users', userId);
    await setDoc(userRef, { isAdmin: false }, { merge: true });
    console.log(`Admin privileges removed from user ${userId}`);
  } catch (error) {
    console.error('Error removing admin privileges:', error);
    throw error;
  }
};
