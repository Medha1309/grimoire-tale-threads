import { useState, useEffect } from 'react';
import { doc, getDoc, setDoc, updateDoc, Timestamp, increment } from 'firebase/firestore';
import { db } from '../lib/firebase';
import { ProfileCustomization, DEFAULT_CUSTOMIZATION, MySpaceProfile } from '../types/myspace';

export const useProfileCustomization = (userId: string, isOwnProfile: boolean = false) => {
  const [customization, setCustomization] = useState<ProfileCustomization>(DEFAULT_CUSTOMIZATION);
  const [profileViews, setProfileViews] = useState(0);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    loadCustomization();
    
    // Increment view count if viewing someone else's profile
    if (!isOwnProfile) {
      incrementViewCount();
    }
  }, [userId, isOwnProfile]);

  const loadCustomization = async () => {
    try {
      setLoading(true);
      const profileDoc = await getDoc(doc(db, 'myspace_profiles', userId));
      
      if (profileDoc.exists()) {
        const data = profileDoc.data() as MySpaceProfile;
        setCustomization(data.customization || DEFAULT_CUSTOMIZATION);
        setProfileViews(data.profileViews || 0);
      } else {
        setCustomization(DEFAULT_CUSTOMIZATION);
        setProfileViews(0);
      }
    } catch (err) {
      console.error('Error loading customization:', err);
    } finally {
      setLoading(false);
    }
  };

  const saveCustomization = async (newCustomization: Partial<ProfileCustomization>) => {
    try {
      setSaving(true);
      const updated = { ...customization, ...newCustomization };
      
      const profileRef = doc(db, 'myspace_profiles', userId);
      const profileDoc = await getDoc(profileRef);

      if (profileDoc.exists()) {
        await updateDoc(profileRef, {
          customization: updated,
          lastUpdated: Timestamp.now(),
        });
      } else {
        await setDoc(profileRef, {
          userId,
          customization: updated,
          top8Friends: [],
          profileViews: 0,
          lastUpdated: Timestamp.now(),
        });
      }

      setCustomization(updated);
      return { success: true };
    } catch (err: any) {
      console.error('Error saving customization:', err);
      return { success: false, error: err.message };
    } finally {
      setSaving(false);
    }
  };

  const incrementViewCount = async () => {
    try {
      const profileRef = doc(db, 'myspace_profiles', userId);
      const profileDoc = await getDoc(profileRef);

      if (profileDoc.exists()) {
        await updateDoc(profileRef, {
          profileViews: increment(1),
        });
      } else {
        await setDoc(profileRef, {
          userId,
          customization: DEFAULT_CUSTOMIZATION,
          top8Friends: [],
          profileViews: 1,
          lastUpdated: Timestamp.now(),
        });
      }
    } catch (err) {
      console.error('Error incrementing view count:', err);
    }
  };

  return {
    customization,
    profileViews,
    loading,
    saving,
    saveCustomization,
    refresh: loadCustomization,
  };
};
