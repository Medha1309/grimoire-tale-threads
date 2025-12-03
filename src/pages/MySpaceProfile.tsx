import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useParams, useNavigate } from 'react-router-dom';
import { doc, getDoc } from 'firebase/firestore';
import { db } from '../lib/firebase';
import { UserProfile as UserProfileType } from '../types';
import { useAuth } from '../contexts/AuthContext';
import { useProfileCustomization } from '../hooks/useProfileCustomization';
import { useTop8Friends } from '../hooks/useTop8Friends';
import { Top8Grid } from '../components/myspace/Top8Grid';
import { AddToTop8Modal } from '../components/myspace/AddToTop8Modal';
import { ProfileCustomizer } from '../components/myspace/ProfileCustomizer';
import { BackButton } from '../components/shared/NavigationButtons';
import { PageWrapper } from '../components/PageWrapper';

export const MySpaceProfile: React.FC = () => {
  const { userId } = useParams<{ userId: string }>();
  const navigate = useNavigate();
  const { currentUser } = useAuth();
  const [profile, setProfile] = useState<UserProfileType | null>(null);
  const [loading, setLoading] = useState(true);
  
  const isOwnProfile = currentUser?.uid === userId;
  const { customization, profileViews, loading: customLoading } = useProfileCustomization(
    userId || '',
    isOwnProfile
  );
  const { top8, removeFromTop8, refresh: refreshTop8 } = useTop8Friends(userId || '');
  
  const [showAddModal, setShowAddModal] = useState(false);
  const [showCustomizer, setShowCustomizer] = useState(false);

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

  const handleRemoveFriend = async (friendUserId: string) => {
    if (confirm('Remove this friend from your Top 8?')) {
      await removeFromTop8(friendUserId);
    }
  };

  if (loading || customLoading) {
    return (
      <section className="relative min-h-screen bg-black text-white flex items-center justify-center">
        <div className="w-8 h-8 border-2 border-purple-500 border-t-transparent rounded-full animate-spin" />
      </section>
    );
  }

  if (!profile) {
    return (
      <section className="relative min-h-screen bg-black text-white flex items-center justify-center">
        <div className="text-center">
          <p className="text-zinc-400 mb-4">User not found</p>
          <button
            onClick={() => navigate('/')}
            className="text-purple-500 hover:text-purple-400 transition-colors"
          >
            Go back home
          </button>
        </div>
      </section>
    );
  }

  // Apply custom styling
  const profileStyle = {
    backgroundColor: customization.backgroundColor,
    color: customization.textColor,
    backgroundImage: customization.backgroundImage
      ? `url(${customization.backgroundImage})`
      : undefined,
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    backgroundAttachment: 'fixed',
  };

  return (
    <PageWrapper>
      <>
        <section className="relative min-h-screen overflow-hidden" style={profileStyle}>
        {/* Overlay for readability */}
        <div className="absolute inset-0 bg-black/40 backdrop-blur-[2px]" />

        {/* Haunted particles effect */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          {Array.from({ length: 10 }).map((_, i) => (
            <motion.div
              key={i}
              className="absolute w-px h-px bg-zinc-500/20 rounded-full"
              initial={{ x: `${Math.random() * 100}%`, y: `${Math.random() * 100}%`, opacity: 0 }}
              animate={{
                y: [`${Math.random() * 100}%`, `${Math.random() * 100 - 50}%`, `${Math.random() * 100}%`],
                opacity: [0, 0.3, 0],
                scale: [0, 1, 0],
              }}
              transition={{
                duration: 15 + Math.random() * 10,
                delay: Math.random() * 5,
                repeat: Infinity,
                ease: 'easeInOut',
              }}
            />
          ))}
        </div>

      <div className="relative z-10 mx-auto max-w-7xl px-6 py-8">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <BackButton onClick={() => navigate(-1)} variant="ghost" />
          
          <div className="flex items-center gap-4">
            {/* Profile views */}
            <div className="flex items-center gap-2 px-4 py-2 rounded-lg bg-black/40 backdrop-blur-sm border border-white/10">
              <span className="text-sm">{profileViews} views</span>
            </div>

            {/* Edit button (own profile only) */}
            {isOwnProfile && (
              <button
                onClick={() => setShowCustomizer(true)}
                className="flex items-center gap-2 px-4 py-2 rounded-lg bg-zinc-900 text-zinc-300 hover:bg-zinc-800 hover:text-zinc-200 transition-all border border-zinc-700"
              >
                Customize
              </button>
            )}
          </div>
        </div>

        {/* Main Content Grid */}
        <div className="grid lg:grid-cols-3 gap-8">
          {/* Left Column - Profile Info */}
          <div className="lg:col-span-1 space-y-6">
            {/* Profile Card */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="rounded-2xl border-2 border-white/20 bg-black/60 backdrop-blur-md p-6 shadow-2xl"
            >
              {/* Avatar */}
              <div className="relative mb-4">
                <motion.div
                  animate={{
                    boxShadow: [
                      `0 0 20px ${customization.linkColor}40`,
                      `0 0 40px ${customization.linkColor}60`,
                      `0 0 20px ${customization.linkColor}40`,
                    ],
                  }}
                  transition={{ duration: 3, repeat: Infinity }}
                  className="w-32 h-32 mx-auto rounded-full bg-gradient-to-br from-zinc-700 to-zinc-800 flex items-center justify-center text-5xl font-bold text-zinc-200 shadow-2xl"
                >
                  {profile.displayName.charAt(0).toUpperCase()}
                </motion.div>
                
                {profile.isAuthor && (
                  <div className="absolute bottom-0 right-1/2 translate-x-1/2 translate-y-2 px-3 py-1 text-xs rounded-full bg-gradient-to-r from-amber-500 to-yellow-500 text-white font-bold shadow-lg">
                    ⭐ Author
                  </div>
                )}
              </div>

              {/* Name */}
              <h1 className="font-['Comic_Sans_MS',_cursive] text-3xl text-center mb-2">
                {profile.displayName}
              </h1>

              {/* Online status */}
              <div className="flex items-center justify-center gap-2 mb-4">
                <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
                <span className="text-sm opacity-80">Online Now</span>
              </div>

              {/* Profile song */}
              {customization.profileSong && (
                <div className="mb-4 p-3 rounded-lg bg-white/5 border border-white/10">
                  <div className="flex items-center gap-2 mb-1">
                    <span className="text-xs opacity-70">Now Playing:</span>
                  </div>
                  <p className="text-sm font-medium">{customization.profileSong.title}</p>
                  <p className="text-xs opacity-70">{customization.profileSong.artist}</p>
                </div>
              )}

              {/* Bio */}
              {profile.bio && (
                <p className="text-sm text-center italic opacity-90 mb-4">
                  "{profile.bio}"
                </p>
              )}

              {/* Stats */}
              <div className="grid grid-cols-2 gap-2 text-center text-sm">
                <div className="p-2 rounded-lg bg-white/5">
                  <div className="font-bold text-lg">{top8.length}</div>
                  <div className="opacity-70">Friends</div>
                </div>
                <div className="p-2 rounded-lg bg-white/5">
                  <div className="font-bold text-lg">{profileViews}</div>
                  <div className="opacity-70">Views</div>
                </div>
              </div>
            </motion.div>

            {/* About Me */}
            {customization.aboutMe && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 }}
                className="rounded-2xl border-2 border-white/20 bg-black/60 backdrop-blur-md p-6 shadow-2xl"
              >
                <h2 className="font-['Comic_Sans_MS',_cursive] text-xl mb-3" style={{ color: customization.linkColor }}>
                  About Me
                </h2>
                <p className="text-sm whitespace-pre-wrap">{customization.aboutMe}</p>
              </motion.div>
            )}

            {/* Interests */}
            {customization.interests && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
                className="rounded-2xl border-2 border-white/20 bg-black/60 backdrop-blur-md p-6 shadow-2xl"
              >
                <h2 className="font-['Comic_Sans_MS',_cursive] text-xl mb-3" style={{ color: customization.linkColor }}>
                  Interests
                </h2>
                <p className="text-sm whitespace-pre-wrap">{customization.interests}</p>
              </motion.div>
            )}

            {/* Favorite Quote */}
            {customization.favoriteQuote && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
                className="rounded-2xl border-2 border-white/20 bg-black/60 backdrop-blur-md p-6 shadow-2xl"
              >
                <h2 className="font-['Comic_Sans_MS',_cursive] text-xl mb-3" style={{ color: customization.linkColor }}>
                  Favorite Quote
                </h2>
                <p className="text-sm italic">"{customization.favoriteQuote}"</p>
              </motion.div>
            )}
          </div>

          {/* Right Column - Top 8 & Activity */}
          <div className="lg:col-span-2 space-y-6">
            {/* Top 8 */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              className="rounded-2xl border-2 border-white/20 bg-black/60 backdrop-blur-md p-8 shadow-2xl"
            >
              <div className="flex items-center justify-between mb-6">
                <div />
                {isOwnProfile && (
                  <button
                    onClick={() => setShowAddModal(true)}
                    disabled={top8.length >= 8}
                    className="flex items-center gap-2 px-4 py-2 rounded-lg bg-zinc-900 text-zinc-300 text-sm hover:bg-zinc-800 hover:text-zinc-200 disabled:opacity-50 disabled:cursor-not-allowed transition-all border border-zinc-700"
                  >
                    Add Friend
                  </button>
                )}
              </div>

              <Top8Grid
                friends={top8}
                canEdit={isOwnProfile}
                onRemove={isOwnProfile ? handleRemoveFriend : undefined}
              />
            </motion.div>

            {/* Recent Activity */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
              className="rounded-2xl border-2 border-white/20 bg-black/60 backdrop-blur-md p-8 shadow-2xl"
            >
              <h2 className="font-['Comic_Sans_MS',_cursive] text-2xl mb-4" style={{ color: customization.linkColor }}>
                Recent Activity
              </h2>
              <p className="text-sm opacity-70">
                {profile.displayName}'s recent stories, posts, and updates will appear here.
              </p>
            </motion.div>
          </div>
        </div>
      </div>

      {/* Modals */}
      {isOwnProfile && (
        <>
          <AddToTop8Modal
            isOpen={showAddModal}
            onClose={() => setShowAddModal(false)}
            userId={userId || ''}
            onSuccess={refreshTop8}
          />

          <ProfileCustomizer
            isOpen={showCustomizer}
            onClose={() => setShowCustomizer(false)}
            userId={userId || ''}
            onSuccess={() => window.location.reload()}
          />
        </>
      )}
        </section>
      </>
    </PageWrapper>
  );
};
