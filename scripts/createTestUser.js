/**
 * Create Test User Script
 * Run this to create a test user in Firebase
 * 
 * Usage: node scripts/createTestUser.js
 */

import { initializeApp } from 'firebase/app';
import { getAuth, createUserWithEmailAndPassword, updateProfile } from 'firebase/auth';
import { getFirestore, doc, setDoc, serverTimestamp } from 'firebase/firestore';

// Firebase config - update with your credentials
const firebaseConfig = {
  apiKey: process.env.VITE_FIREBASE_API_KEY || "your-api-key",
  authDomain: process.env.VITE_FIREBASE_AUTH_DOMAIN || "your-project.firebaseapp.com",
  projectId: process.env.VITE_FIREBASE_PROJECT_ID || "your-project-id",
  storageBucket: process.env.VITE_FIREBASE_STORAGE_BUCKET || "your-project.appspot.com",
  messagingSenderId: process.env.VITE_FIREBASE_MESSAGING_SENDER_ID || "123456789",
  appId: process.env.VITE_FIREBASE_APP_ID || "your-app-id"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

// Test user credentials
const TEST_USER = {
  email: 'test@grimr.app',
  password: 'TestUser123!',
  displayName: 'Test User',
  bio: 'A test user for Grimr - exploring the dark corners of storytelling'
};

async function createTestUser() {
  try {
    console.log('Creating test user...');
    
    // Create user in Firebase Auth
    const userCredential = await createUserWithEmailAndPassword(
      auth,
      TEST_USER.email,
      TEST_USER.password
    );
    
    const user = userCredential.user;
    console.log('✅ User created in Authentication:', user.uid);
    
    // Update display name
    await updateProfile(user, {
      displayName: TEST_USER.displayName
    });
    console.log('✅ Display name updated');
    
    // Create user profile in Firestore
    await setDoc(doc(db, 'users', user.uid), {
      uid: user.uid,
      email: TEST_USER.email,
      displayName: TEST_USER.displayName,
      bio: TEST_USER.bio,
      createdAt: serverTimestamp(),
      isAuthor: true,
      forumPostCount: 0,
      diaryEntryCount: 0,
      totalLikesReceived: 0
    });
    console.log('✅ User profile created in Firestore');
    
    // Initialize user interactions document
    await setDoc(doc(db, 'userInteractions', user.uid), {
      likedStories: [],
      bookmarkedStories: [],
      ratings: {}
    });
    console.log('✅ User interactions initialized');
    
    console.log('\n🎉 Test user created successfully!');
    console.log('\nLogin credentials:');
    console.log('Email:', TEST_USER.email);
    console.log('Password:', TEST_USER.password);
    console.log('\nYou can now sign in with these credentials.');
    
    process.exit(0);
  } catch (error) {
    if (error.code === 'auth/email-already-in-use') {
      console.log('✅ Test user already exists!');
      console.log('\nLogin credentials:');
      console.log('Email:', TEST_USER.email);
      console.log('Password:', TEST_USER.password);
      process.exit(0);
    } else {
      console.error('❌ Error creating test user:', error.message);
      process.exit(1);
    }
  }
}

createTestUser();
