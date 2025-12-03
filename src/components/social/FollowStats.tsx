import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useFollowing, useFollowers, useFollowingList } from '../../hooks/useFollowing';
import { Modal } from '../shared/Modal';
import { FollowButton } from './FollowButton';
import { useNavigate } from 'react-router-dom';

interface FollowStatsProps {
  userId: string;
  variant?: 'default' | 'compact';
}

export const FollowStats: React.FC<FollowStatsProps> = ({ userId, variant = 'default' }) => {
  const { followStats, loading } = useFollowing(userId);
  const [showModal, setShowModal] = useState<'followers' | 'following' | null>(null);

  if (loading) {
    return (
      <div className="flex gap-6 text-sm">
        <div className="animate-pulse">
          <div className="h-4 w-16 bg-zinc-800 rounded" />
        </div>
        <div className="animate-pulse">
          <div className="h-4 w-16 bg-zinc-800 rounded" />
        </div>
      </div>
    );
  }

  const followersCount = followStats?.followersCount || 0;
  const followingCount = followStats?.followingCount || 0;

  const compactClasses = variant === 'compact' ? 'text-xs' : 'text-sm';

  return (
    <>
      <div className={`flex gap-6 ${compactClasses}`}>
        <button
          onClick={() => setShowModal('followers')}
          className="group transition-colors hover:text-zinc-200"
        >
          <span className="font-bold text-zinc-100">{followersCount}</span>
          <span className="text-zinc-500 ml-1 group-hover:text-zinc-400">
            {followersCount === 1 ? 'Follower' : 'Followers'}
          </span>
        </button>

        <button
          onClick={() => setShowModal('following')}
          className="group transition-colors hover:text-zinc-200"
        >
          <span className="font-bold text-zinc-100">{followingCount}</span>
          <span className="text-zinc-500 ml-1 group-hover:text-zinc-400">Following</span>
        </button>
      </div>

      {/* Followers/Following Modal */}
      <AnimatePresence>
        {showModal && (
          <FollowListModal
            userId={userId}
            type={showModal}
            onClose={() => setShowModal(null)}
          />
        )}
      </AnimatePresence>
    </>
  );
};

interface FollowListModalProps {
  userId: string;
  type: 'followers' | 'following';
  onClose: () => void;
}

const FollowListModal: React.FC<FollowListModalProps> = ({ userId, type, onClose }) => {
  const { followers, loading: followersLoading } = useFollowers(userId);
  const { following, loading: followingLoading } = useFollowingList(userId);
  const navigate = useNavigate();

  const list = type === 'followers' ? followers : following;
  const loading = type === 'followers' ? followersLoading : followingLoading;

  const handleUserClick = (targetUserId: string) => {
    onClose();
    navigate(`/profile/${targetUserId}`);
  };

  return (
    <Modal isOpen={true} onClose={onClose} title={type === 'followers' ? 'Followers' : 'Following'}>
      <div className="max-h-[500px] overflow-y-auto">
        {loading ? (
          <div className="flex items-center justify-center py-12">
            <div className="w-6 h-6 border-2 border-red-900 border-t-transparent rounded-full animate-spin" />
          </div>
        ) : list.length === 0 ? (
          <div className="py-12 text-center">
            <p className="text-zinc-500 text-sm">
              {type === 'followers' ? 'No followers yet' : 'Not following anyone yet'}
            </p>
          </div>
        ) : (
          <div className="space-y-3">
            {list.map((item) => {
              const targetUserId = type === 'followers' ? item.followerId : item.followingId;
              const displayName = type === 'followers' ? item.followerName : item.followingName;

              return (
                <motion.div
                  key={item.id}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="flex items-center justify-between p-3 rounded-lg border border-zinc-800 bg-zinc-900/50 hover:bg-zinc-800/50 transition-colors"
                >
                  <button
                    onClick={() => handleUserClick(targetUserId)}
                    className="flex items-center gap-3 flex-1 text-left"
                  >
                    <div className="w-10 h-10 rounded-full bg-gradient-to-br from-red-900 to-zinc-900 flex items-center justify-center text-lg font-serif text-zinc-100">
                      {displayName?.charAt(0)?.toUpperCase() || '?'}
                    </div>
                    <div>
                      <p className="text-sm font-medium text-zinc-200">{displayName || 'Unknown User'}</p>
                      <p className="text-xs text-zinc-500">
                        {item.createdAt?.toDate?.()?.toLocaleDateString() || 'Recently'}
                      </p>
                    </div>
                  </button>

                  <FollowButton userId={targetUserId} variant="compact" />
                </motion.div>
              );
            })}
          </div>
        )}
      </div>
    </Modal>
  );
};
