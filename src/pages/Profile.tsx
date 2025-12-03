import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { NavigationProps } from "../types";
import { useAuth } from "../contexts/AuthContext";
import { collection, query, where, getDocs } from "firebase/firestore";
import { db } from "../lib/firebase";
import { updatePassword, EmailAuthProvider, reauthenticateWithCredential } from "firebase/auth";
import { useToast } from "../hooks/useToast";
import { Toast } from "../components/shared/Toast";
import { MESSAGES, getFirebaseErrorMessage } from "../utils/messages";
import { FollowStats } from "../components/social/FollowStats";
import { BackButton } from "../components/shared/NavigationButtons";

interface ProfileProps extends NavigationProps {}

export const Profile: React.FC<ProfileProps> = ({ go }) => {
  const { currentUser, userProfile, logout, updateUserProfile } = useAuth();
  const { toast, showSuccess, showError, showInfo, hideToast } = useToast();
  const [editing, setEditing] = useState(false);
  const [formData, setFormData] = useState({
    displayName: userProfile?.displayName || "",
    bio: userProfile?.bio || "",
  });
  const [loading, setLoading] = useState(false);
  const [activeTab, setActiveTab] = useState<"profile" | "security" | "activity">("profile");
  
  // Activity stats
  const [stats, setStats] = useState({
    stories: 0,
    forumPosts: 0,
    diaryEntries: 0,
    loading: true,
  });

  // Password change
  const [passwordForm, setPasswordForm] = useState({
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
  });
  const [passwordLoading, setPasswordLoading] = useState(false);

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

  // Load user activity stats
  useEffect(() => {
    const loadStats = async () => {
      if (!currentUser) return;

      try {
        const [storiesSnap, forumSnap, diarySnap] = await Promise.all([
          getDocs(query(collection(db, "userStories"), where("authorId", "==", currentUser.uid))),
          getDocs(query(collection(db, "forum_posts"), where("authorId", "==", currentUser.uid))),
          getDocs(query(collection(db, "diary_entries"), where("userId", "==", currentUser.uid))),
        ]);

        setStats({
          stories: storiesSnap.size,
          forumPosts: forumSnap.size,
          diaryEntries: diarySnap.size,
          loading: false,
        });
      } catch (error) {
        console.error("Error loading stats:", error);
        setStats(prev => ({ ...prev, loading: false }));
      }
    };

    loadStats();
  }, [currentUser]);



  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      setLoading(true);
      await updateUserProfile(formData);
      showSuccess(MESSAGES.PROFILE.UPDATE_SUCCESS);
      setEditing(false);
    } catch (error) {
      showError(MESSAGES.PROFILE.UPDATE_ERROR);
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = async () => {
    try {
      await logout();
      go("landing");
    } catch (error) {
      console.error("Failed to log out:", error);
    }
  };

  const handlePasswordChange = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (passwordForm.newPassword !== passwordForm.confirmPassword) {
      showError(MESSAGES.AUTH.PASSWORD_MISMATCH);
      return;
    }

    if (passwordForm.newPassword.length < 6) {
      showError(MESSAGES.AUTH.PASSWORD_TOO_SHORT);
      return;
    }

    try {
      setPasswordLoading(true);
      
      if (currentUser?.email) {
        const credential = EmailAuthProvider.credential(
          currentUser.email,
          passwordForm.currentPassword
        );
        await reauthenticateWithCredential(currentUser, credential);
      }

      if (currentUser) {
        await updatePassword(currentUser, passwordForm.newPassword);
        showSuccess(MESSAGES.AUTH.PASSWORD_UPDATED);
        setPasswordForm({ currentPassword: "", newPassword: "", confirmPassword: "" });
      }
    } catch (error: any) {
      showError(getFirebaseErrorMessage(error.code));
    } finally {
      setPasswordLoading(false);
    }
  };

  if (!currentUser || !userProfile) {
    return null;
  }

  return (
    <section className="relative min-h-screen bg-gradient-to-b from-black via-purple-950/20 to-black text-zinc-100 overflow-hidden">
      {/* Magical floating particles with color */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {particles.map((particle) => (
          <motion.div
            key={particle.id}
            className="absolute w-1 h-1 rounded-full"
            style={{
              background: particle.id % 3 === 0 ? 'rgba(139, 0, 0, 0.4)' : particle.id % 3 === 1 ? 'rgba(147, 51, 234, 0.3)' : 'rgba(236, 72, 153, 0.3)'
            }}
            initial={{ x: `${particle.x}%`, y: `${particle.y}%`, opacity: 0 }}
            animate={{
              y: [`${particle.y}%`, `${particle.y - 50}%`, `${particle.y}%`],
              opacity: [0, 0.8, 0],
              scale: [0, 2, 0],
            }}
            transition={{
              duration: particle.duration,
              delay: particle.delay,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          />
        ))}
      </div>

      {/* Ambient glows - multiple colors */}
      <div className="absolute top-0 left-1/4 w-[600px] h-[600px] bg-purple-900/20 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute top-1/3 right-1/4 w-[500px] h-[500px] bg-red-900/15 rounded-full blur-[100px] pointer-events-none" />
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[700px] h-[700px] bg-pink-900/10 rounded-full blur-[130px] pointer-events-none" />

      <div className="relative z-10 mx-auto max-w-6xl px-6 py-16">
        {/* Header with back button */}
        <BackButton 
          onClick={() => go("landing")} 
          variant="ghost"
          className="mb-8"
        />

        {/* Toast Notification */}
        <Toast
          message={toast.message}
          type={toast.type}
          isVisible={toast.isVisible}
          onClose={hideToast}
        />

        {/* Profile Hero */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-12 text-center"
        >
          <div className="relative inline-block mb-6">
            {/* Outer glow rings */}
            <motion.div
              animate={{
                scale: [1, 1.1, 1],
                opacity: [0.3, 0.5, 0.3],
              }}
              transition={{ duration: 3, repeat: Infinity }}
              className="absolute inset-0 rounded-full bg-gradient-to-r from-purple-500/30 via-pink-500/30 to-red-500/30 blur-xl"
              style={{ width: '140px', height: '140px', left: '-4px', top: '-4px' }}
            />
            
            <motion.div
              animate={{
                boxShadow: [
                  "0 0 30px rgba(147, 51, 234, 0.4), 0 0 60px rgba(236, 72, 153, 0.2)",
                  "0 0 50px rgba(236, 72, 153, 0.5), 0 0 80px rgba(147, 51, 234, 0.3)",
                  "0 0 30px rgba(147, 51, 234, 0.4), 0 0 60px rgba(236, 72, 153, 0.2)",
                ],
              }}
              transition={{ duration: 4, repeat: Infinity }}
              className="relative h-32 w-32 rounded-full bg-gradient-to-br from-purple-900 via-pink-900 to-red-900 flex items-center justify-center text-5xl font-serif text-zinc-100 shadow-2xl ring-2 ring-purple-500/50"
            >
              {userProfile.displayName.charAt(0).toUpperCase()}
              <div className="absolute inset-0 rounded-full bg-gradient-to-t from-transparent via-transparent to-white/30" />
              
              {/* Sparkle effects */}
              {[...Array(3)].map((_, i) => (
                <motion.div
                  key={i}
                  className="absolute w-1 h-1 bg-white rounded-full"
                  style={{
                    left: `${20 + i * 30}%`,
                    top: `${15 + i * 25}%`,
                  }}
                  animate={{
                    scale: [0, 1.5, 0],
                    opacity: [0, 1, 0],
                  }}
                  transition={{
                    duration: 2,
                    delay: i * 0.7,
                    repeat: Infinity,
                  }}
                />
              ))}
            </motion.div>
            
            {userProfile.isAuthor && (
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ delay: 0.3, type: "spring" }}
                className="absolute -bottom-2 -right-2 px-3 py-1 text-xs rounded-full bg-gradient-to-r from-purple-900 to-pink-900 text-purple-100 border border-purple-500/50 shadow-lg shadow-purple-500/30 font-serif"
              >
                ✨ Author
              </motion.div>
            )}
          </div>
          
          <motion.h1
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="font-serif text-4xl text-zinc-100 mb-2"
          >
            {userProfile.displayName}
          </motion.h1>
          
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
            className="text-zinc-500 mb-4"
          >
            {userProfile.email}
          </motion.p>

          {/* Follow Stats */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.35 }}
            className="flex items-center justify-center mb-6"
          >
            <FollowStats userId={currentUser.uid} />
          </motion.div>

          {/* Social Profile Link */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4 }}
            className="mb-6"
          >
            <button
              onClick={() => window.location.href = `/myspace/${currentUser.uid}`}
              className="w-full max-w-xs mx-auto flex items-center justify-center gap-2 px-6 py-3 rounded-lg bg-zinc-900 text-zinc-300 font-medium hover:bg-zinc-800 hover:text-zinc-200 transition-all border border-zinc-700"
            >
              View Social Profile
            </button>
          </motion.div>

          {userProfile.bio && (
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.4 }}
              className="max-w-2xl mx-auto text-zinc-400 italic"
            >
              "{userProfile.bio}"
            </motion.p>
          )}
        </motion.div>

        {/* Tabs */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
          className="mb-8 flex justify-center gap-2 border-b border-purple-900/30"
        >
          {[
            { id: "profile", label: "Profile" },
            { id: "activity", label: "Activity" },
            { id: "security", label: "Security" },
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as any)}
              className={`relative pb-4 px-6 font-serif text-sm transition-all group ${
                activeTab === tab.id
                  ? "text-purple-200"
                  : "text-zinc-500 hover:text-purple-300"
              }`}
            >
              {tab.label}
              {activeTab === tab.id && (
                <motion.div
                  layoutId="activeTab"
                  className="absolute bottom-0 left-0 right-0 h-0.5 bg-gradient-to-r from-purple-500 via-pink-500 to-purple-500"
                  style={{
                    boxShadow: '0 0 10px rgba(147, 51, 234, 0.5)'
                  }}
                  transition={{ type: "spring", stiffness: 380, damping: 30 }}
                />
              )}
            </button>
          ))}
        </motion.div>

        {/* Tab Content */}
        <AnimatePresence mode="wait">
          {activeTab === "profile" && (
            <motion.div
              key="profile"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="max-w-2xl mx-auto"
            >
              <div className="rounded-2xl border border-purple-900/30 bg-gradient-to-br from-purple-950/30 via-black/50 to-pink-950/20 backdrop-blur-sm p-8 shadow-2xl" style={{ boxShadow: '0 0 30px rgba(147, 51, 234, 0.1)' }}>
                <div className="flex items-center justify-between mb-6">
                  <h3 className="font-serif text-2xl text-purple-100">Profile Information</h3>
                  {!editing && (
                    <button
                      onClick={() => setEditing(true)}
                      className="px-4 py-2 rounded-lg border border-purple-700/50 text-sm text-purple-300 transition hover:border-purple-600 hover:text-purple-200 hover:bg-purple-900/30 hover:shadow-lg hover:shadow-purple-500/20"
                    >
                      Edit
                    </button>
                  )}
                </div>

                {editing ? (
                  <form onSubmit={handleSubmit} className="space-y-6">
                    <div>
                      <label className="block mb-2 text-sm text-zinc-400 font-serif">Display Name</label>
                      <input
                        name="displayName"
                        value={formData.displayName}
                        onChange={handleChange}
                        placeholder="Your name"
                        required
                        className="w-full rounded-lg border border-zinc-800 bg-black/40 px-4 py-3 text-zinc-300 placeholder-zinc-600 transition focus:border-zinc-600 focus:outline-none focus:ring-1 focus:ring-zinc-600"
                      />
                    </div>

                    <div>
                      <label className="block mb-2 text-sm text-zinc-400 font-serif">Bio</label>
                      <textarea
                        name="bio"
                        value={formData.bio}
                        onChange={handleChange}
                        placeholder="Tell us about yourself..."
                        rows={4}
                        className="w-full rounded-lg border border-zinc-800 bg-black/40 px-4 py-3 text-zinc-300 placeholder-zinc-600 transition focus:border-zinc-600 focus:outline-none focus:ring-1 focus:ring-zinc-600 resize-none"
                      />
                    </div>

                    <div className="flex gap-3">
                      <button
                        type="submit"
                        disabled={loading}
                        className="flex-1 rounded-lg bg-gradient-to-r from-purple-900 to-pink-900 px-6 py-3 text-sm font-medium text-purple-100 transition-all hover:from-purple-800 hover:to-pink-800 border border-purple-700/50 disabled:opacity-50 disabled:cursor-not-allowed shadow-lg shadow-purple-900/30 hover:shadow-purple-500/30"
                      >
                        {loading ? "Saving..." : "Save Changes"}
                      </button>
                      <button
                        type="button"
                        onClick={() => {
                          setEditing(false);
                          setFormData({
                            displayName: userProfile.displayName,
                            bio: userProfile.bio || "",
                          });
                        }}
                        className="px-6 py-3 rounded-lg border border-purple-700/50 text-sm text-purple-300 transition hover:border-purple-600 hover:text-purple-200 hover:bg-purple-900/30"
                      >
                        Cancel
                      </button>
                    </div>
                  </form>
                ) : (
                  <div className="space-y-6">
                    <div>
                      <label className="block mb-2 text-sm text-zinc-500 font-serif">Display Name</label>
                      <p className="text-zinc-200 text-lg">{userProfile.displayName}</p>
                    </div>

                    <div>
                      <label className="block mb-2 text-sm text-zinc-500 font-serif">Email</label>
                      <p className="text-zinc-200">{userProfile.email}</p>
                    </div>

                    <div>
                      <label className="block mb-2 text-sm text-zinc-500 font-serif">Bio</label>
                      <p className="text-zinc-300 italic">
                        {userProfile.bio || "No bio yet. Click Edit to add one."}
                      </p>
                    </div>

                    <div>
                      <label className="block mb-2 text-sm text-zinc-500 font-serif">Member Since</label>
                      <p className="text-zinc-300">
                        {userProfile.createdAt?.toDate?.()?.toLocaleDateString("en-US", {
                          year: "numeric",
                          month: "long",
                          day: "numeric",
                        }) || "Recently"}
                      </p>
                    </div>

                    <div className="pt-6 border-t border-zinc-800/50">
                      <button
                        onClick={handleLogout}
                        className="w-full rounded-lg border border-zinc-700 px-6 py-3 text-sm text-zinc-400 transition hover:border-red-900/50 hover:text-red-400 hover:bg-red-950/20"
                      >
                        Log Out
                      </button>
                    </div>
                  </div>
                )}
              </div>
            </motion.div>
          )}

          {activeTab === "activity" && (
            <motion.div
              key="activity"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="space-y-6"
            >
              <div className="rounded-2xl border border-pink-900/30 bg-gradient-to-br from-pink-950/30 via-black/50 to-purple-950/20 backdrop-blur-sm p-8 shadow-2xl" style={{ boxShadow: '0 0 30px rgba(236, 72, 153, 0.1)' }}>
                <h3 className="font-serif text-2xl text-pink-100 mb-6">Your Activity</h3>
                
                {stats.loading ? (
                  <div className="text-center py-12">
                    <div className="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-red-900"></div>
                    <p className="text-zinc-500 mt-4">Loading stats...</p>
                  </div>
                ) : (
                  <div className="grid gap-6 sm:grid-cols-3">
                    {[
                      { label: "Stories Written", value: stats.stories, gradient: "from-purple-900/40 via-purple-800/30 to-purple-900/40", glow: "purple" },
                      { label: "Forum Posts", value: stats.forumPosts, gradient: "from-pink-900/40 via-pink-800/30 to-pink-900/40", glow: "pink" },
                      { label: "Diary Entries", value: stats.diaryEntries, gradient: "from-red-900/40 via-red-800/30 to-red-900/40", glow: "red" },
                    ].map((stat, i) => (
                      <motion.div
                        key={stat.label}
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ delay: i * 0.1 }}
                        className={`relative overflow-hidden text-center p-6 rounded-xl border bg-gradient-to-br ${stat.gradient} shadow-lg`}
                        style={{
                          borderColor: stat.glow === 'purple' ? 'rgba(147, 51, 234, 0.3)' : stat.glow === 'pink' ? 'rgba(236, 72, 153, 0.3)' : 'rgba(185, 28, 28, 0.3)',
                          boxShadow: stat.glow === 'purple' ? '0 0 20px rgba(147, 51, 234, 0.2)' : stat.glow === 'pink' ? '0 0 20px rgba(236, 72, 153, 0.2)' : '0 0 20px rgba(185, 28, 28, 0.2)'
                        }}
                      >
                        <motion.div 
                          className="text-5xl font-serif text-zinc-100 mb-2 font-bold"
                          animate={{ scale: [1, 1.05, 1] }}
                          transition={{ duration: 2, repeat: Infinity, delay: i * 0.3 }}
                        >
                          {stat.value}
                        </motion.div>
                        <div className="text-sm text-zinc-300">{stat.label}</div>
                        <div 
                          className="absolute top-0 right-0 w-24 h-24 rounded-full blur-2xl"
                          style={{
                            background: stat.glow === 'purple' ? 'rgba(147, 51, 234, 0.15)' : stat.glow === 'pink' ? 'rgba(236, 72, 153, 0.15)' : 'rgba(185, 28, 28, 0.15)'
                          }}
                        />
                      </motion.div>
                    ))}
                  </div>
                )}
              </div>

              <div className="rounded-2xl border border-purple-900/30 bg-gradient-to-br from-purple-950/20 via-black/50 to-pink-950/30 backdrop-blur-sm p-8 shadow-2xl" style={{ boxShadow: '0 0 20px rgba(147, 51, 234, 0.08)' }}>
                <h3 className="font-serif text-xl text-purple-100 mb-4">Recent Activity</h3>
                <p className="text-zinc-400 text-sm">
                  Your recent stories, posts, and diary entries will appear here.
                </p>
              </div>
            </motion.div>
          )}

          {activeTab === "security" && (
            <motion.div
              key="security"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="max-w-2xl mx-auto space-y-6"
            >
              <div className="rounded-2xl border border-purple-900/30 bg-gradient-to-br from-purple-950/30 via-black/50 to-red-950/20 backdrop-blur-sm p-8 shadow-2xl" style={{ boxShadow: '0 0 30px rgba(147, 51, 234, 0.1)' }}>
                <h3 className="font-serif text-2xl text-purple-100 mb-6">Change Password</h3>
                
                <form onSubmit={handlePasswordChange} className="space-y-6">
                  <div>
                    <label className="block mb-2 text-sm text-zinc-400 font-serif">Current Password</label>
                    <input
                      type="password"
                      value={passwordForm.currentPassword}
                      onChange={(e) => setPasswordForm(prev => ({ ...prev, currentPassword: e.target.value }))}
                      placeholder="Enter current password"
                      required
                      className="w-full rounded-lg border border-zinc-800 bg-black/40 px-4 py-3 text-zinc-300 placeholder-zinc-600 transition focus:border-red-900/50 focus:outline-none focus:ring-2 focus:ring-red-900/20"
                    />
                  </div>

                  <div>
                    <label className="block mb-2 text-sm text-zinc-400 font-serif">New Password</label>
                    <input
                      type="password"
                      value={passwordForm.newPassword}
                      onChange={(e) => setPasswordForm(prev => ({ ...prev, newPassword: e.target.value }))}
                      placeholder="Enter new password"
                      required
                      className="w-full rounded-lg border border-zinc-800 bg-black/40 px-4 py-3 text-zinc-300 placeholder-zinc-600 transition focus:border-red-900/50 focus:outline-none focus:ring-2 focus:ring-red-900/20"
                    />
                  </div>

                  <div>
                    <label className="block mb-2 text-sm text-zinc-400 font-serif">Confirm New Password</label>
                    <input
                      type="password"
                      value={passwordForm.confirmPassword}
                      onChange={(e) => setPasswordForm(prev => ({ ...prev, confirmPassword: e.target.value }))}
                      placeholder="Confirm new password"
                      required
                      className="w-full rounded-lg border border-zinc-800 bg-black/40 px-4 py-3 text-zinc-300 placeholder-zinc-600 transition focus:border-red-900/50 focus:outline-none focus:ring-2 focus:ring-red-900/20"
                    />
                  </div>

                  <button
                    type="submit"
                    disabled={passwordLoading}
                    className="w-full rounded-lg bg-gradient-to-r from-purple-900 to-pink-900 px-6 py-3 text-sm font-medium text-purple-100 transition-all hover:from-purple-800 hover:to-pink-800 border border-purple-700/50 disabled:opacity-50 disabled:cursor-not-allowed shadow-lg shadow-purple-900/30 hover:shadow-purple-500/30"
                  >
                    {passwordLoading ? "Updating..." : "Update Password"}
                  </button>
                </form>
              </div>

              <div className="rounded-2xl border border-red-900/30 bg-gradient-to-br from-red-950/30 to-black/50 backdrop-blur-sm p-8 shadow-2xl">
                <h3 className="font-serif text-xl text-red-400 mb-2">Danger Zone</h3>
                <p className="text-sm text-zinc-500 mb-4">
                  Irreversible actions that affect your account
                </p>
                <button
                  onClick={() => {
                    if (confirm(MESSAGES.ADMIN.DELETE_CONFIRM)) {
                      showInfo("Account deletion feature coming soon. Please contact support.");
                    }
                  }}
                  className="w-full rounded-lg border border-red-900/50 px-6 py-3 text-sm text-red-400 transition hover:bg-red-950/30 hover:border-red-800"
                >
                  Delete Account
                </button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
};
