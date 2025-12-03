import React, { createContext, useContext, useEffect, useState, useMemo } from 'react';
import {
  User,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  onAuthStateChanged,
  updateProfile,
  sendPasswordResetEmail,
  GoogleAuthProvider,
  signInWithPopup,
} from 'firebase/auth';
import { doc, setDoc, getDoc, serverTimestamp } from 'firebase/firestore';
import { auth, db } from '../lib/firebase';
import { dataCache } from '../utils/cache';

interface UserProfile {
  uid: string;
  email: string;
  displayName: string;
  photoURL?: string;
  bio?: string;
  createdAt: any;
  isAuthor: boolean;
  isAdmin?: boolean;
}

interface AuthContextType {
  currentUser: User | null;
  userProfile: UserProfile | null;
  loading: boolean;
  signup: (email: string, password: string, displayName: string) => Promise<void>;
  login: (email: string, password: string) => Promise<void>;
  logout: () => Promise<void>;
  resetPassword: (email: string) => Promise<void>;
  loginWithGoogle: () => Promise<void>;
  updateUserProfile: (data: Partial<UserProfile>) => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [userProfile, setUserProfile] = useState<UserProfile | null>(null);
  const [loading, setLoading] = useState(true);

  // Fetch user profile from Firestore with caching
  const fetchUserProfile = React.useCallback(async (uid: string) => {
    try {
      const cacheKey = `user-profile-${uid}`;
      const cached = dataCache.get(cacheKey) as UserProfile | null;
      if (cached) {
        setUserProfile(cached);
        return;
      }

      const docRef = doc(db, 'users', uid);
      const docSnap = await getDoc(docRef);
      if (docSnap.exists()) {
        const profile = docSnap.data() as UserProfile;
        setUserProfile(profile);
        dataCache.set(cacheKey, profile);
      }
    } catch (error) {
      console.error('Error fetching user profile:', error);
    }
  }, []);

  // Sign up with email and password
  const signup = React.useCallback(async (email: string, password: string, displayName: string) => {
    const userCredential = await createUserWithEmailAndPassword(auth, email, password);
    const user = userCredential.user;

    // Update display name
    await updateProfile(user, { displayName });

    // Create user profile in Firestore
    const userProfile: UserProfile = {
      uid: user.uid,
      email: user.email!,
      displayName,
      createdAt: serverTimestamp(),
      isAuthor: false,
    };

    await setDoc(doc(db, 'users', user.uid), userProfile);
    setUserProfile(userProfile);
    dataCache.set(`user-profile-${user.uid}`, userProfile);
  }, []);

  // Login with email and password
  const login = React.useCallback(async (email: string, password: string) => {
    await signInWithEmailAndPassword(auth, email, password);
  }, []);

  // Login with Google
  const loginWithGoogle = React.useCallback(async () => {
    const provider = new GoogleAuthProvider();
    const userCredential = await signInWithPopup(auth, provider);
    const user = userCredential.user;

    // Check if user profile exists, if not create one
    const docRef = doc(db, 'users', user.uid);
    const docSnap = await getDoc(docRef);

    if (!docSnap.exists()) {
      const userProfile: UserProfile = {
        uid: user.uid,
        email: user.email!,
        displayName: user.displayName || 'Anonymous',
        photoURL: user.photoURL || undefined,
        createdAt: serverTimestamp(),
        isAuthor: false,
      };
      await setDoc(docRef, userProfile);
      setUserProfile(userProfile);
      dataCache.set(`user-profile-${user.uid}`, userProfile);
    }
  }, []);

  // Logout
  const logout = React.useCallback(async () => {
    if (currentUser) {
      dataCache.delete(`user-profile-${currentUser.uid}`);
    }
    await signOut(auth);
    setUserProfile(null);
  }, [currentUser]);

  // Reset password
  const resetPassword = React.useCallback(async (email: string) => {
    await sendPasswordResetEmail(auth, email);
  }, []);

  // Update user profile
  const updateUserProfile = React.useCallback(async (data: Partial<UserProfile>) => {
    if (!currentUser) return;

    const docRef = doc(db, 'users', currentUser.uid);
    await setDoc(docRef, data, { merge: true });

    // Update local state and cache
    const updated = userProfile ? { ...userProfile, ...data } : null;
    setUserProfile(updated);
    if (updated) {
      dataCache.set(`user-profile-${currentUser.uid}`, updated);
    }

    // Update auth profile if displayName or photoURL changed
    if (data.displayName || data.photoURL) {
      await updateProfile(currentUser, {
        displayName: data.displayName,
        photoURL: data.photoURL,
      });
    }
  }, [currentUser, userProfile]);

  // Listen to auth state changes
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      setCurrentUser(user);
      if (user) {
        await fetchUserProfile(user.uid);
      } else {
        setUserProfile(null);
      }
      setLoading(false);
    });

    return unsubscribe;
  }, []);

  const value: AuthContextType = useMemo(() => ({
    currentUser,
    userProfile,
    loading,
    signup,
    login,
    logout,
    resetPassword,
    loginWithGoogle,
    updateUserProfile,
  }), [currentUser, userProfile, loading, signup, login, logout, resetPassword, loginWithGoogle, updateUserProfile]);

  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  );
};
