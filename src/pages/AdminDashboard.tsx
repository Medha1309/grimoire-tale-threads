import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { collection, query, orderBy, onSnapshot, getDocs } from 'firebase/firestore';
import { db } from '../lib/firebase';
import { ContactMessage, UserProfile, AdminLog } from '../types';
import { useAuth } from '../contexts/AuthContext';
import { Button } from '../components/ui';
import { useNavigate } from 'react-router-dom';
import { useAdminActions } from '../hooks/useAdminActions';
import { AdminLogger } from '../utils/adminLogger';

type TabType = 'overview' | 'users' | 'messages' | 'content' | 'audit' | 'settings';

export const AdminDashboard: React.FC = () => {
  const [activeTab, setActiveTab] = useState<TabType>('overview');
  const [messages, setMessages] = useState<ContactMessage[]>([]);
  const [users, setUsers] = useState<UserProfile[]>([]);
  const [auditLogs, setAuditLogs] = useState<AdminLog[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedUser, setSelectedUser] = useState<UserProfile | null>(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState<'all' | 'active' | 'suspended'>('all');
  
  const { currentUser, userProfile } = useAuth();
  const navigate = useNavigate();
  const adminActions = useAdminActions();

  // Check admin access
  useEffect(() => {
    if (!currentUser || !userProfile?.isAdmin) {
      navigate('/');
    }
  }, [currentUser, userProfile, navigate]);

  // Load messages
  useEffect(() => {
    if (!currentUser) return;

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
  }, [currentUser]);

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

    loadUsers();
  }, [currentUser]);

  // Load audit logs
  useEffect(() => {
    const loadAuditLogs = async () => {
      if (!currentUser || activeTab !== 'audit') return;

      try {
        const logs = await AdminLogger.getRecentLogs(100);
        setAuditLogs(logs);
      } catch (error) {
        console.error('Error loading audit logs:', error);
      }
    };

    loadAuditLogs();
  }, [currentUser, activeTab]);

  // Filter users
  const filteredUsers = users.filter(user => {
    const matchesSearch = 
      user.displayName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.email.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesStatus = 
      filterStatus === 'all' ||
      (filterStatus === 'active' && (!user.accountStatus || user.accountStatus === 'active')) ||
      (filterStatus === 'suspended' && user.accountStatus === 'suspended');

    return matchesSearch && matchesStatus;
  });

  const unreadCount = messages.filter(m => !m.read).length;
  const activeUsersCount = users.filter(u => !u.accountStatus || u.accountStatus === 'active').length;
  const suspendedUsersCount = users.filter(u => u.accountStatus === 'suspended').length;

  if (loading) {
    return (
      <section className="relative min-h-screen bg-zinc-950 px-6 py-16 text-zinc-100">
        <div className="mx-auto max-w-7xl">
          <p className="text-center text-zinc-500">Loading admin dashboard...</p>
        </div>
      </section>
    );
  }

  return (
    <section className="relative min-h-screen bg-zinc-950 px-6 py-16 text-zinc-100">
      <div className="mx-auto max-w-7xl">
        {/* Header */}
        <header className="mb-8 border-b border-zinc-900/40 pb-6">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h1 className="font-serif text-4xl tracking-wider text-zinc-300">
                Admin Dashboard
              </h1>
              <p className="mt-2 text-zinc-500">
                FIPPA-Compliant User & Data Management
              </p>
            </div>
            <div className="flex gap-3">
              <Button onClick={() => navigate('/admin/populate')} variant="ghost">
                Populate Data
              </Button>
              <Button onClick={() => navigate('/')} variant="secondary">
                Back to Site
              </Button>
            </div>
          </div>

          {/* Tabs */}
          <div className="flex gap-4 overflow-x-auto">
            {[
              { id: 'overview', label: 'Overview' },
              { id: 'users', label: 'Users', badge: users.length },
              { id: 'messages', label: 'Messages', badge: unreadCount },
              { id: 'content', label: 'Content' },
              { id: 'audit', label: 'Audit Logs' },
              { id: 'settings', label: 'Settings' },
            ].map(tab => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as TabType)}
                className={`pb-3 px-1 font-serif text-sm transition-colors whitespace-nowrap ${
                  activeTab === tab.id
                    ? 'text-zinc-300 border-b-2 border-red-900'
                    : 'text-zinc-600 hover:text-zinc-400'
                }`}
              >
                {tab.label}
                {tab.badge !== undefined && tab.badge > 0 && (
                  <span className="ml-2 px-2 py-0.5 text-xs rounded-full bg-red-900/30 text-red-400">
                    {tab.badge}
                  </span>
                )}
              </button>
            ))}
          </div>
        </header>

        {/* Overview Tab */}
        {activeTab === 'overview' && (
          <div className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              <StatCard
                title="Total Users"
                value={users.length}
                subtitle={`${activeUsersCount} active`}
                icon="👥"
              />
              <StatCard
                title="Unread Messages"
                value={unreadCount}
                subtitle={`${messages.length} total`}
                icon="✉️"
              />
              <StatCard
                title="Suspended Users"
                value={suspendedUsersCount}
                subtitle="Requires attention"
                icon="⚠️"
                alert={suspendedUsersCount > 0}
              />
              <StatCard
                title="Admin Actions"
                value={auditLogs.length}
                subtitle="Last 100 logs"
                icon="📋"
              />
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <QuickAccessCard
                title="Recent Users"
                items={users.slice(0, 5).map(u => ({
                  label: u.displayName,
                  sublabel: u.email,
                  onClick: () => {
                    setSelectedUser(u);
                    setActiveTab('users');
                  }
                }))}
              />
              <QuickAccessCard
                title="Recent Messages"
                items={messages.slice(0, 5).map(m => ({
                  label: m.subject,
                  sublabel: m.name,
                  badge: !m.read,
                  onClick: () => setActiveTab('messages')
                }))}
              />
            </div>
          </div>
        )}

        {/* Users Tab */}
        {activeTab === 'users' && (
          <UserManagementTab
            users={filteredUsers}
            selectedUser={selectedUser}
            setSelectedUser={setSelectedUser}
            searchTerm={searchTerm}
            setSearchTerm={setSearchTerm}
            filterStatus={filterStatus}
            setFilterStatus={setFilterStatus}
            adminActions={adminActions}
          />
        )}

        {/* Messages Tab */}
        {activeTab === 'messages' && (
          <MessagesTab messages={messages} />
        )}

        {/* Content Tab */}
        {activeTab === 'content' && (
          <ContentModerationTab adminActions={adminActions} />
        )}

        {/* Audit Tab */}
        {activeTab === 'audit' && (
          <AuditLogsTab logs={auditLogs} />
        )}

        {/* Settings Tab */}
        {activeTab === 'settings' && (
          <SettingsTab />
        )}
      </div>
    </section>
  );
};

// Stat Card Component
const StatCard: React.FC<{
  title: string;
  value: number;
  subtitle: string;
  icon: string;
  alert?: boolean;
}> = ({ title, value, subtitle, icon, alert }) => (
  <motion.div
    whileHover={{ scale: 1.02 }}
    className={`rounded-lg border p-6 ${
      alert 
        ? 'border-red-900/50 bg-red-950/20' 
        : 'border-zinc-800 bg-zinc-900/50'
    }`}
  >
    <div className="flex items-start justify-between mb-3">
      <span className="text-2xl">{icon}</span>
      {alert && <span className="h-2 w-2 rounded-full bg-red-500 animate-pulse" />}
    </div>
    <div className="text-3xl font-serif text-zinc-300 mb-1">{value}</div>
    <div className="text-sm text-zinc-600 uppercase tracking-wider mb-1">{title}</div>
    <div className="text-xs text-zinc-500">{subtitle}</div>
  </motion.div>
);

// Quick Access Card Component
const QuickAccessCard: React.FC<{
  title: string;
  items: Array<{
    label: string;
    sublabel: string;
    badge?: boolean;
    onClick: () => void;
  }>;
}> = ({ title, items }) => (
  <div className="rounded-lg border border-zinc-800 bg-zinc-900/50 p-6">
    <h3 className="font-serif text-xl text-zinc-300 mb-4">{title}</h3>
    <div className="space-y-2">
      {items.map((item, idx) => (
        <button
          key={idx}
          onClick={item.onClick}
          className="w-full text-left p-3 rounded border border-zinc-800 hover:bg-zinc-800/50 transition-colors"
        >
          <div className="flex items-center justify-between">
            <div className="flex-1 min-w-0">
              <div className="text-sm text-zinc-300 truncate">{item.label}</div>
              <div className="text-xs text-zinc-500 truncate">{item.sublabel}</div>
            </div>
            {item.badge && (
              <span className="h-2 w-2 rounded-full bg-red-500 ml-2" />
            )}
          </div>
        </button>
      ))}
    </div>
  </div>
);

// Import sub-components
import { UserManagementTab } from '../pages/admin/UserManagementTab';
import { MessagesTab } from '../pages/admin/MessagesTab';
import { ContentModerationTab } from '../pages/admin/ContentModerationTab';
import { AuditLogsTab } from '../pages/admin/AuditLogsTab';
import { SettingsTab } from '../pages/admin/SettingsTab';
