import { useState, useEffect } from 'react';
import {
  collection,
  query,
  where,
  orderBy,
  onSnapshot,
  getDoc,
  doc,
} from 'firebase/firestore';
import { db } from '../services/firebase.service';
import type { Version } from '../types/collaborativeStory';

export const useVersions = (projectId: string) => {
  const [versions, setVersions] = useState<Version[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!projectId) {
      setVersions([]);
      setLoading(false);
      return;
    }

    setLoading(true);
    setError(null);

    const q = query(
      collection(db, 'versions'),
      where('projectId', '==', projectId),
      orderBy('versionNumber', 'desc')
    );

    const unsubscribe = onSnapshot(
      q,
      (snapshot) => {
        const versionsData = snapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        })) as Version[];

        setVersions(versionsData);
        setLoading(false);
      },
      (err) => {
        console.error('Error fetching versions:', err);
        setError(err.message);
        setLoading(false);
      }
    );

    return () => unsubscribe();
  }, [projectId]);

  const getVersion = async (versionId: string): Promise<Version | null> => {
    try {
      const versionDoc = await getDoc(doc(db, 'versions', versionId));
      if (!versionDoc.exists()) return null;

      return {
        id: versionDoc.id,
        ...versionDoc.data(),
      } as Version;
    } catch (err) {
      console.error('Error fetching version:', err);
      return null;
    }
  };

  return {
    versions,
    loading,
    error,
    getVersion,
  };
};
