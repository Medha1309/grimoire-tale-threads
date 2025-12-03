/**
 * Chain Letters Hook
 * Manages fetching and filtering chain letters
 */

import { useState, useEffect } from 'react';
import { collection, query, where, orderBy, onSnapshot, limit, getDocs } from 'firebase/firestore';
import { db } from '../lib/firebase';
import { ChainLetter, ChainFilterType, ChainSortType } from '../types/chainLetter';
import { useAuth } from '../contexts/AuthContext';

export const useChainLetters = (filterType: ChainFilterType = 'all', sortType: ChainSortType = 'recent') => {
  const { currentUser } = useAuth();
  const [chains, setChains] = useState<ChainLetter[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!currentUser) {
      setChains([]);
      setLoading(false);
      return;
    }

    try {
      let q = query(collection(db, 'chainLetters'));

      // Apply filters
      switch (filterType) {
        case 'active':
          q = query(q, where('status', '==', 'active'));
          break;
        case 'completed':
          q = query(q, where('status', '==', 'completed'));
          break;
        case 'graveyard':
          q = query(q, where('status', 'in', ['broken', 'expired']));
          break;
        case 'my-chains':
          q = query(q, where('cursedBy', 'array-contains', currentUser.uid));
          break;
      }

      // Apply sorting
      switch (sortType) {
        case 'recent':
          q = query(q, orderBy('lastPassedAt', 'desc'));
          break;
        case 'popular':
          q = query(q, orderBy('likeCount', 'desc'));
          break;
        case 'longest':
          q = query(q, orderBy('chainLength', 'desc'));
          break;
        case 'cursed':
          q = query(q, orderBy('curseLevel', 'desc'));
          break;
      }

      q = query(q, limit(50));

      const unsubscribe = onSnapshot(
        q,
        (snapshot) => {
          const chainData = snapshot.docs.map(doc => ({
            id: doc.id,
            ...doc.data()
          })) as ChainLetter[];
          
          setChains(chainData);
          setLoading(false);
        },
        (err) => {
          console.error('Error fetching chains:', err);
          setError(err.message);
          setLoading(false);
        }
      );

      return () => unsubscribe();
    } catch (err: any) {
      console.error('Error setting up chain listener:', err);
      setError(err.message);
      setLoading(false);
    }
  }, [currentUser, filterType, sortType]);

  return { chains, loading, error };
};

export const useMyActiveChain = () => {
  const { currentUser } = useAuth();
  const [activeChain, setActiveChain] = useState<ChainLetter | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!currentUser) {
      setActiveChain(null);
      setLoading(false);
      return;
    }

    const q = query(
      collection(db, 'chainLetters'),
      where('currentHolderId', '==', currentUser.uid),
      where('status', '==', 'active'),
      limit(1)
    );

    const unsubscribe = onSnapshot(q, (snapshot) => {
      if (!snapshot.empty) {
        const doc = snapshot.docs[0];
        setActiveChain({ id: doc.id, ...doc.data() } as ChainLetter);
      } else {
        setActiveChain(null);
      }
      setLoading(false);
    });

    return () => unsubscribe();
  }, [currentUser]);

  return { activeChain, loading };
};

export const useChainStats = () => {
  const { currentUser } = useAuth();
  const [stats, setStats] = useState({
    totalChains: 0,
    activeChains: 0,
    completedChains: 0,
    graveyardChains: 0,
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!currentUser) {
      setLoading(false);
      return;
    }

    const fetchStats = async () => {
      try {
        const [totalSnap, activeSnap, completedSnap, graveyardSnap] = await Promise.all([
          getDocs(query(collection(db, 'chainLetters'))),
          getDocs(query(collection(db, 'chainLetters'), where('status', '==', 'active'))),
          getDocs(query(collection(db, 'chainLetters'), where('status', '==', 'completed'))),
          getDocs(query(collection(db, 'chainLetters'), where('status', 'in', ['broken', 'expired']))),
        ]);

        setStats({
          totalChains: totalSnap.size,
          activeChains: activeSnap.size,
          completedChains: completedSnap.size,
          graveyardChains: graveyardSnap.size,
        });
        setLoading(false);
      } catch (err) {
        console.error('Error fetching chain stats:', err);
        setLoading(false);
      }
    };

    fetchStats();
  }, [currentUser]);

  return { stats, loading };
};
