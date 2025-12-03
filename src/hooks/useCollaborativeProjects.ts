import { useState, useEffect } from 'react';
import {
  collection,
  query,
  where,
  orderBy,
  limit as firestoreLimit,
  onSnapshot,
  QueryConstraint,
  doc,
  setDoc,
} from 'firebase/firestore';
import { db } from '../lib/firebase';
import { CollaborativeProject, ProjectStatus } from '../types/collaborativeStory';

interface UseCollaborativeProjectsOptions {
  userId?: string;
  status?: ProjectStatus;
  genre?: string;
  searchTerm?: string;
  limit?: number;
}

export const useCollaborativeProjects = (options: UseCollaborativeProjectsOptions = {}) => {
  const [projects, setProjects] = useState<CollaborativeProject[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);
  const [seeded, setSeeded] = useState(false);

  useEffect(() => {
    const constraints: QueryConstraint[] = [];

    // Filter by status
    if (options.status) {
      constraints.push(where('status', '==', options.status));
    }

    // Filter by genre
    if (options.genre) {
      constraints.push(where('genre', '==', options.genre));
    }

    // Order by most recently updated
    constraints.push(orderBy('updatedAt', 'desc'));

    // Limit results
    if (options.limit) {
      constraints.push(firestoreLimit(options.limit));
    }

    const q = query(collection(db, 'collaborativeProjects'), ...constraints);

    const unsubscribe = onSnapshot(
      q,
      async (snapshot) => {
        const projectsData = snapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        })) as CollaborativeProject[];

        // Auto-seed if no projects exist
        if (projectsData.length === 0 && !seeded) {
          setSeeded(true);
          try {
            const { SAMPLE_COLLABORATIVE_PROJECTS } = await import('../data/sampleCollaborativeProjects');
            await seedCollaborativeProjects(SAMPLE_COLLABORATIVE_PROJECTS);
            // Data will come through the listener
          } catch (err) {
            console.error('Error auto-seeding projects:', err);
          }
        } else {
          // Client-side search filtering (Firestore doesn't support full-text search)
          let filteredProjects = projectsData;
          if (options.searchTerm) {
            const searchLower = options.searchTerm.toLowerCase();
            filteredProjects = projectsData.filter(
              (project) =>
                project.title.toLowerCase().includes(searchLower) ||
                project.ownerName.toLowerCase().includes(searchLower)
            );
          }

          setProjects(filteredProjects);
          setLoading(false);
        }
      },
      (err) => {
        console.error('Error fetching collaborative projects:', err);
        setError(err as Error);
        setLoading(false);
      }
    );

    return () => unsubscribe();
  }, [options.status, options.genre, options.searchTerm, options.limit, seeded]);

  return { projects, loading, error };
};

export async function seedCollaborativeProjects(projects: Omit<CollaborativeProject, 'id'>[]) {
  try {
    for (const project of projects) {
      const projectId = `demo-${project.title.toLowerCase().replace(/\s+/g, '-')}`;
      const projectRef = doc(db, 'collaborativeProjects', projectId);
      await setDoc(projectRef, project, { merge: true });
    }
    console.log('Collaborative projects seeded successfully');
  } catch (err) {
    console.error('Error seeding collaborative projects:', err);
    throw err;
  }
}
