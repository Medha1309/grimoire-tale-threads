import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useParams, useNavigate } from 'react-router-dom';
import { doc, getDoc, collection, query, where, getDocs, orderBy, limit } from 'firebase/firestore';
import { db } from '../lib/firebase';
import { UserProfile as UserProfileType } from '../types';
import { FollowButton } from '../components/social/FollowButton';
import { FollowStats } from '../components/social/FollowStats';
import { useAuth } from '../contexts/AuthContext';
import { BackButton } from '../components/shared/NavigationButtons';
import { typography, cards, backgrounds } from '../utils/themeClasses';

export const UserProfile: React.FC = () => {
  const { userId } = useParams<{ userId: string }>();
  const navigate = useNavigate();
  const { currentUser } = useAuth();
  const [profile, setProfile] = useState<UserProfileType | null>(null);
  const [loading, setLoading] = useState(true);
  const [stats, setStats] = useState({
    stories: 0,
    forumPosts: 0,
    loading: true,
  });
  const [recentStories, setRecentStories] = useState<any[]>([]);

  // Floating particles effect
  const [particles] = useState(() =>
    Array.from({ length: 20 }, (_, i) => ({
      id: i,
      x: Math.random() * 100,
      y: Math.random() * 100,
      delay: Math.random() * 5,
      duration: 10 + Math.random() * 10,
    }))
  );

  useEffect(() => {
    const loadProfile = async () => {
      if (!userId) return;

      try {
        const userDoc = await getDoc(doc(db, 'users', userId));
        if (userDoc.exists()) {
          setProfile({ uid: userDoc.id, ...userDoc.data() } as UserProfileType);
        }
      } catch (error) {
        console.error('Error loading profile:', error);
      } finally {
        setLoading(false);
      }
    };

    loadProfile();
  }, [userId]);

  useEffect(() => {
    const loadStats = async () => {
      if (!userId) return;

      try {
        const [storiesSnap, forumSnap, storiesQuery] = await Promise.all([
          getDocs(query(collection(db, 'userStories'), where('authorId', '==', userId))),
          getDocs(query(collection(db, 'forum_posts'), where('authorId', '==', userId))),
          getDocs(
            query(
              collection(db, 'userStories'),
              where('authorId', '==', userId),
              where('published', '==', true),
              orderBy('createdAt', 'desc'),
              limit(5)
            )
          ),
        ]);

        setStats({
          stories: storiesSnap.size,
          forumPosts: forumSnap.size,
          loading: false,
        });

        setRecentStories(storiesQuery.docs.map(doc => ({ id: doc.id, ...doc.data() })));
      } catch (error) {
        console.error('Error loading stats:', error);
        setStats(prev => ({ ...prev, loading: false }));
      }
    };

    loadStats();
  }, [userId]);

  // Redirect to own profile if viewing self
  useEffect(() => {
    if (currentUser && userId === currentUser.uid) {
      navigate('/profile');
    }
  }, [currentUser, userId, navigate]);

  if (loading) {
    return (
      <section className={`relative min-h-screen ${backgrounds.page} flex items-center justify-center`}>
        <div className="w-8 h-8 border-2 border-gothic-blood border-t-transparent rounded-full animate-spin" />
      </section>
    );
  }

  if (!profile) {
    return (
      <section className={`relative min-h-screen ${backgrounds.page} flex items-center justify-center`}>
        <div className="text-center">
          <p className={`${typography.bodySecondary} mb-4`}>User not found</p>
          <button
            onClick={() => navigate('/')}
            className="text-gothic-blood hover:text-gothic-blood-light transition-colors"
          >
            Go back home
          </button>
        </div>
      </section>
    );
  }

  return (
    <section className={`relative min-h-screen ${backgrounds.page} overflow-hidden`}>
      {/* Magical floating particles */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {particles.map((particle) => (
          <motion.div
            key={particle.id}
            className="absolute w-px h-px bg-zinc-500/20 rounded-full"
            initial={{ x: `${particle.x}%`, y: `${particle.y}%`, opacity: 0 }}
            animate={{
              y: [`${particle.y}%`, `${particle.y - 50}%`, `${particle.y}%`],
              opacity: [0, 0.6, 0],
              scale: [0, 1.5, 0],
            }}
            transition={{
              duration: particle.duration,
              delay: particle.delay,
              repeat: Infinity,
              ease: 'easeInOut',
            }}
          />
        ))}
      </div>

      {/* Ambient glow */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[800px] bg-zinc-900/10 rounded-full blur-[120px] pointer-events-none" />

      <div className="relative z-10 mx-auto max-w-6xl px-6 py-16">
        {/* Header with back button */}
        <BackButton 
          onClick={() => navigate(-1)} 
          variant="ghost"
          className="mb-8"
        />

        {/* Profile Hero */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-12 text-center"
        >
          <div className="relative inline-block mb-6">
            <motion.div
              animate={{
                boxShadow: [
                  '0 0 20px rgba(185, 28, 28, 0.3)',
                  '0 0 40px rgba(185, 28, 28, 0.5)',
                  '0 0 20px rgba(185, 28, 28, 0.3)',
                ],
              }}
              transition={{ duration: 3, repeat: Infinity }}
              className="relative h-32 w-32 rounded-full bg-gradient-to-br from-zinc-700 via-zinc-800 to-zinc-900 flex items-center justify-center text-5xl font-serif text-zinc-200 shadow-2xl ring-4 ring-zinc-700/30"
            >
              {profile.displayName.charAt(0).toUpperCase()}
              <div className="absolute inset-0 rounded-full bg-gradient-to-t from-transparent via-transparent to-white/20" />
            </motion.div>
            {profile.isAuthor && (
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ delay: 0.3, type: 'spring' }}
                className="absolute -bottom-2 -right-2 px-3 py-1 text-xs rounded-full bg-zinc-800 text-zinc-300 border border-zinc-700 shadow-lg font-serif"
              >
                Author
              </motion.div>
            )}
          </div>

          <motion.h1
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
            className={typography.pageTitle}
          >
            {profile.displayName}
          </motion.h1>

          {profile.bio && (
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.3 }}
              className={`max-w-2xl mx-auto ${typography.bodySecondary} italic mb-6`}
            >
              "{profile.bio}"
            </motion.p>
          )}

          {/* Follow Stats */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4 }}
            className="flex items-center justify-center gap-6 mb-6"
          >
            <FollowStats userId={profile.uid} />
          </motion.div>

          {/* Follow Button */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
          >
            <FollowButton userId={profile.uid} />
          </motion.div>
        </motion.div>

        {/* Activity Stats */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
          className="mb-12"
        >
          <div className={cards.elevated}>
            <h3 className={`${typography.subsectionTitle} mb-6`}>Activity</h3>

            {stats.loading ? (
              <div className="text-center py-12">
                <div className="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-red-900"></div>
              </div>
            ) : (
              <div className="grid gap-6 sm:grid-cols-2">
                {[
                  { label: 'Stories Written', value: stats.stories, color: 'from-zinc-800 to-zinc-900' },
                  { label: 'Forum Posts', value: stats.forumPosts, color: 'from-zinc-800 to-zinc-900' },
                ].map((stat, i) => (
                  <motion.div
                    key={stat.label}
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 0.7 + i * 0.1 }}
                    className={`relative overflow-hidden text-center p-6 rounded-xl border border-zinc-800/50 bg-gradient-to-br ${stat.color} shadow-lg`}
                  >
                    <div className="text-5xl font-serif text-zinc-100 mb-2 font-bold">{stat.value}</div>
                    <div className="text-sm text-zinc-300">{stat.label}</div>
                    <div className="absolute top-0 right-0 w-24 h-24 bg-white/5 rounded-full blur-2xl" />
                  </motion.div>
                ))}
              </div>
            )}
          </div>
        </motion.div>

        {/* Recent Stories */}
        {recentStories.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.8 }}
          >
            <div className={cards.elevated}>
              <h3 className={`${typography.subsectionTitle} mb-6`}>Recent Stories</h3>
              <div className="space-y-4">
                {recentStories.map((story, i) => (
                  <motion.button
                    key={story.id}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.9 + i * 0.1 }}
                    onClick={() => navigate(`/story/${story.id}`)}
                    className="w-full text-left p-4 rounded-lg border border-zinc-800 bg-zinc-900/50 hover:bg-zinc-800/50 hover:border-zinc-700 transition-all group"
                  >
                    <h4 className="font-serif text-lg text-zinc-200 mb-1 group-hover:text-red-400 transition-colors">
                      {story.title}
                    </h4>
                    {story.description && (
                      <p className="text-sm text-zinc-500 line-clamp-2">{story.description}</p>
                    )}
                  </motion.button>
                ))}
              </div>
            </div>
          </motion.div>
        )}
      </div>
    </section>
  );
};
