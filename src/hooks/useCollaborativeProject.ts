import { useState, useEffect } from 'react';
import { doc, onSnapshot } from 'firebase/firestore';
import { db } from '../lib/firebase';
import { CollaborativeProject } from '../types/collaborativeStory';

export function useCollaborativeProject(projectId: string | undefined) {
  const [project, setProject] = useState<CollaborativeProject | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    if (!projectId) {
      setProject(null);
      setLoading(false);
      return;
    }

    const unsubscribe = onSnapshot(
      doc(db, 'collaborativeProjects', projectId),
      (snapshot) => {
        if (snapshot.exists()) {
          setProject({
            id: snapshot.id,
            ...snapshot.data(),
          } as CollaborativeProject);
        } else {
          setProject(null);
          setError(new Error('Project not found'));
        }
        setLoading(false);
      },
      (err) => {
        console.error('Error fetching project:', err);
        setError(err as Error);
        setLoading(false);
      }
    );

    return () => unsubscribe();
  }, [projectId]);

  return { project, loading, error };
}
