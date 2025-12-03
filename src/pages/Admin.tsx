import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { collection, query, orderBy, onSnapshot, doc, updateDoc, getDocs } from 'firebase/firestore';
import { db } from '../lib/firebase';
import { ContactMessage, UserProfile } from '../types';
import { useAuth } from '../contexts/AuthContext';
import { Button } from '../components/ui';
import { useNavigate } from 'react-router-dom';
import { BackButton } from '../components/shared/NavigationButtons';

export const Admin: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'messages' | 'users'>('messages');
  const [messages, setMessages] = useState<ContactMessage[]>([]);
  const [users, setUsers] = useState<UserProfile[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedMessage, setSelectedMessage] = useState<ContactMessage | null>(null);
  const [selectedUser, setSelectedUser] = useState<UserProfile | null>(null);
  const { currentUser } = useAuth();
  const navigate = useNavigate();

  // Load contact messages
  useEffect(() => {
    if (!currentUser) {
      navigate('/login');
      return;
    }

    const q = query(
      collection(db, 'contactMessages'),
      orderBy('createdAt', 'desc')
    );

    const unsubscribe = onSnapshot(q, (snapshot) => {
      const msgs: ContactMessage[] = [];
      snapshot.forEach((doc) => {
        msgs.push({ id: doc.id, ...doc.data() } as ContactMessage);
      });
      setMessages(msgs);
      setLoading(false);
    });

    return () => unsubscribe();
  }, [currentUser, navigate]);

  // Load users
  useEffect(() => {
    const loadUsers = async () => {
      if (!currentUser) return;

      try {
        const usersSnap = await getDocs(
          query(collection(db, 'users'), orderBy('createdAt', 'desc'))
        );
        const usersList: UserProfile[] = [];
        usersSnap.forEach((doc) => {
          usersList.push({ uid: doc.id, ...doc.data() } as UserProfile);
        });
        setUsers(usersList);
      } catch (error) {
        console.error('Error loading users:', error);
      }
    };

    if (activeTab === 'users') {
      loadUsers();
    }
  }, [currentUser, activeTab]);

  const markAsRead = async (messageId: string) => {
    try {
      await updateDoc(doc(db, 'contactMessages', messageId), {
        read: true,
      });
    } catch (error) {
      console.error('Error marking message as read:', error);
    }
  };

  const handleMessageClick = (message: ContactMessage) => {
    setSelectedMessage(message);
    if (!message.read) {
      markAsRead(message.id);
    }
  };

  const unreadCount = messages.filter(m => !m.read).length;

  if (loading) {
    return (
      <section className="relative min-h-screen bg-zinc-950 px-6 py-16 text-zinc-100">
        <div className="mx-auto max-w-6xl">
          <p className="text-center text-zinc-500">Loading messages...</p>
        </div>
      </section>
    );
  }

  return (
    <section className="relative min-h-screen bg-zinc-950 px-6 py-16 text-zinc-100">
      <div className="mx-auto max-w-6xl">
        <header className="mb-8 border-b border-zinc-900/40 pb-6">
          <div className="flex items-center justify-between mb-6">
            <BackButton onClick={() => navigate('/')} variant="ghost" />
            <div className="flex-1 text-center">
              <h1 className="font-serif text-4xl tracking-wider text-zinc-300">
                Admin Panel
              </h1>
              <p className="mt-2 text-zinc-500">
                Manage users, messages, and site data
              </p>
            </div>
            <Button onClick={() => navigate('/admin/populate')} variant="secondary">
              Populate Data
            </Button>
          </div>

          {/* Tabs */}
          <div className="flex gap-4">
            <button
              onClick={() => setActiveTab('messages')}
              className={`pb-3 px-1 font-serif text-sm transition-colors ${
                activeTab === 'messages'
                  ? 'text-zinc-300 border-b-2 border-red-900'
                  : 'text-zinc-600 hover:text-zinc-400'
              }`}
            >
              Contact Messages {unreadCount > 0 && (
                <span className="ml-2 px-2 py-0.5 text-xs rounded-full bg-red-900/30 text-red-400">
                  {unreadCount}
                </span>
              )}
            </button>
            <button
              onClick={() => setActiveTab('users')}
              className={`pb-3 px-1 font-serif text-sm transition-colors ${
                activeTab === 'users'
                  ? 'text-zinc-300 border-b-2 border-red-900'
                  : 'text-zinc-600 hover:text-zinc-400'
              }`}
            >
              Users ({users.length})
            </button>
          </div>
        </header>

        {/* Messages Tab */}
        {activeTab === 'messages' && (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Messages List */}
          <div className="space-y-4">
            <h2 className="font-serif text-2xl text-zinc-400 mb-4">
              Messages ({messages.length})
            </h2>
            
            {messages.length === 0 ? (
              <div className="rounded-lg border border-zinc-800 bg-zinc-900/50 p-8 text-center">
                <p className="text-zinc-500">No messages yet</p>
              </div>
            ) : (
              <div className="space-y-3 max-h-[calc(100vh-300px)] overflow-y-auto pr-2">
                {messages.map((message) => (
                  <motion.div
                    key={message.id}
                    whileHover={{ scale: 1.01 }}
                    onClick={() => handleMessageClick(message)}
                    className={`cursor-pointer rounded-lg border p-4 transition-colors ${
                      message.read
                        ? 'border-zinc-800 bg-zinc-900/30'
                        : 'border-red-900/50 bg-red-950/20'
                    } ${
                      selectedMessage?.id === message.id
                        ? 'ring-2 ring-zinc-700'
                        : ''
                    }`}
                  >
                    <div className="flex items-start justify-between gap-3">
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2">
                          {!message.read && (
                            <span className="h-2 w-2 rounded-full bg-red-500" />
                          )}
                          <h3 className="font-serif text-lg text-zinc-300 truncate">
                            {message.subject}
                          </h3>
                        </div>
                        <p className="text-sm text-zinc-500 mt-1">
                          From: {message.name}
                        </p>
                        <p className="text-xs text-zinc-600 mt-1">
                          {message.createdAt?.toDate?.()?.toLocaleString() || 'Just now'}
                        </p>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            )}
          </div>

          {/* Message Detail */}
          <div className="lg:sticky lg:top-24 lg:h-fit">
            <AnimatePresence mode="wait">
              {selectedMessage ? (
                <motion.div
                  key={selectedMessage.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  className="rounded-lg border border-zinc-800 bg-zinc-900/50 p-6"
                >
                  <div className="mb-6 border-b border-zinc-800 pb-4">
                    <h2 className="font-serif text-2xl text-zinc-300 mb-2">
                      {selectedMessage.subject}
                    </h2>
                    <div className="space-y-1 text-sm text-zinc-500">
                      <p>
                        <span className="text-zinc-600">From:</span> {selectedMessage.name}
                      </p>
                      <p>
                        <span className="text-zinc-600">Email:</span>{' '}
                        <a
                          href={`mailto:${selectedMessage.email}`}
                          className="text-blue-400 hover:underline"
                        >
                          {selectedMessage.email}
                        </a>
                      </p>
                      <p>
                        <span className="text-zinc-600">Date:</span>{' '}
                        {selectedMessage.createdAt?.toDate?.()?.toLocaleString() || 'Just now'}
                      </p>
                    </div>
                  </div>

                  <div className="prose prose-invert max-w-none">
                    <p className="text-zinc-400 whitespace-pre-wrap">
                      {selectedMessage.message}
                    </p>
                  </div>

                  <div className="mt-6 pt-4 border-t border-zinc-800">
                    <Button
                      onClick={() => window.open(`mailto:${selectedMessage.email}?subject=Re: ${selectedMessage.subject}`)}
                      variant="primary"
                      className="w-full"
                    >
                      Reply via Email
                    </Button>
                  </div>
                </motion.div>
              ) : (
                <motion.div
                  key="empty"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="rounded-lg border border-zinc-800 bg-zinc-900/50 p-12 text-center"
                >
                  <p className="text-zinc-500">Select a message to view details</p>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
        )}

        {/* Users Tab */}
        {activeTab === 'users' && (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Users List */}
            <div className="space-y-4">
              <h2 className="font-serif text-2xl text-zinc-400 mb-4">
                Registered Users ({users.length})
              </h2>
              
              {users.length === 0 ? (
                <div className="rounded-lg border border-zinc-800 bg-zinc-900/50 p-8 text-center">
                  <p className="text-zinc-500">No users yet</p>
                </div>
              ) : (
                <div className="space-y-3 max-h-[calc(100vh-300px)] overflow-y-auto pr-2">
                  {users.map((user) => (
                    <motion.div
                      key={user.uid}
                      whileHover={{ scale: 1.01 }}
                      onClick={() => setSelectedUser(user)}
                      className={`cursor-pointer rounded-lg border p-4 transition-colors ${
                        selectedUser?.uid === user.uid
                          ? 'border-zinc-700 bg-zinc-900/50 ring-2 ring-zinc-700'
                          : 'border-zinc-800 bg-zinc-900/30 hover:bg-zinc-900/40'
                      }`}
                    >
                      <div className="flex items-start gap-3">
                        <div className="h-10 w-10 rounded-full bg-gradient-to-br from-red-900 to-zinc-900 flex items-center justify-center text-sm font-serif text-zinc-300 flex-shrink-0">
                          {user.displayName?.charAt(0).toUpperCase() || 'U'}
                        </div>
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center gap-2">
                            <h3 className="font-serif text-lg text-zinc-300 truncate">
                              {user.displayName}
                            </h3>
                            {user.isAuthor && (
                              <span className="px-2 py-0.5 text-xs rounded-full bg-red-900/30 text-red-400 border border-red-900/50">
                                Author
                              </span>
                            )}
                          </div>
                          <p className="text-sm text-zinc-500 mt-1 truncate">
                            {user.email}
                          </p>
                          <p className="text-xs text-zinc-600 mt-1">
                            Joined: {user.createdAt?.toDate?.()?.toLocaleDateString() || 'Recently'}
                          </p>
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </div>
              )}
            </div>

            {/* User Detail */}
            <div className="lg:sticky lg:top-24 lg:h-fit">
              <AnimatePresence mode="wait">
                {selectedUser ? (
                  <motion.div
                    key={selectedUser.uid}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -20 }}
                    className="rounded-lg border border-zinc-800 bg-zinc-900/50 p-6"
                  >
                    <div className="mb-6 border-b border-zinc-800 pb-4">
                      <div className="flex items-center gap-4 mb-4">
                        <div className="h-16 w-16 rounded-full bg-gradient-to-br from-red-900 to-zinc-900 flex items-center justify-center text-2xl font-serif text-zinc-300">
                          {selectedUser.displayName?.charAt(0).toUpperCase() || 'U'}
                        </div>
                        <div>
                          <h2 className="font-serif text-2xl text-zinc-300">
                            {selectedUser.displayName}
                          </h2>
                          <p className="text-sm text-zinc-500">{selectedUser.email}</p>
                        </div>
                      </div>
                      
                      <div className="flex gap-2">
                        {selectedUser.isAuthor && (
                          <span className="px-3 py-1 text-xs rounded-full bg-red-900/30 text-red-400 border border-red-900/50">
                            Author
                          </span>
                        )}
                        {selectedUser.isAdmin && (
                          <span className="px-3 py-1 text-xs rounded-full bg-blue-900/30 text-blue-400 border border-blue-900/50">
                            Admin
                          </span>
                        )}
                      </div>
                    </div>

                    <div className="space-y-4">
                      <div>
                        <label className="text-xs text-zinc-600 uppercase tracking-wider">User ID</label>
                        <p className="text-sm text-zinc-400 font-mono mt-1">{selectedUser.uid}</p>
                      </div>

                      <div>
                        <label className="text-xs text-zinc-600 uppercase tracking-wider">Email</label>
                        <p className="text-sm text-zinc-400 mt-1">{selectedUser.email}</p>
                      </div>

                      {selectedUser.bio && (
                        <div>
                          <label className="text-xs text-zinc-600 uppercase tracking-wider">Bio</label>
                          <p className="text-sm text-zinc-400 mt-1">{selectedUser.bio}</p>
                        </div>
                      )}

                      <div>
                        <label className="text-xs text-zinc-600 uppercase tracking-wider">Member Since</label>
                        <p className="text-sm text-zinc-400 mt-1">
                          {selectedUser.createdAt?.toDate?.()?.toLocaleString() || 'Recently'}
                        </p>
                      </div>

                      <div className="grid grid-cols-3 gap-4 pt-4 border-t border-zinc-800">
                        <div className="text-center">
                          <div className="text-2xl font-serif text-red-400">
                            {selectedUser.forumPostCount || 0}
                          </div>
                          <div className="text-xs text-zinc-600 mt-1">Forum Posts</div>
                        </div>
                        <div className="text-center">
                          <div className="text-2xl font-serif text-red-400">
                            {selectedUser.diaryEntryCount || 0}
                          </div>
                          <div className="text-xs text-zinc-600 mt-1">Diary Entries</div>
                        </div>
                        <div className="text-center">
                          <div className="text-2xl font-serif text-red-400">
                            {selectedUser.totalLikesReceived || 0}
                          </div>
                          <div className="text-xs text-zinc-600 mt-1">Likes</div>
                        </div>
                      </div>
                    </div>

                    <div className="mt-6 pt-4 border-t border-zinc-800 space-y-3">
                      <Button
                        onClick={() => window.open(`mailto:${selectedUser.email}`)}
                        variant="secondary"
                        className="w-full"
                      >
                        Email User
                      </Button>
                      <Button
                        onClick={() => alert('User management features coming soon')}
                        variant="ghost"
                        className="w-full"
                      >
                        Manage Permissions
                      </Button>
                    </div>
                  </motion.div>
                ) : (
                  <motion.div
                    key="empty"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="rounded-lg border border-zinc-800 bg-zinc-900/50 p-12 text-center"
                  >
                    <p className="text-zinc-500">Select a user to view details</p>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>
        )}
      </div>
    </section>
  );
};
