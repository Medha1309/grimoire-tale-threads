import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { UserProfile } from '../../types';
import { Button } from '../../components/ui';
import { useAdminActions } from '../../hooks/useAdminActions';

interface UserManagementTabProps {
  users: UserProfile[];
  selectedUser: UserProfile | null;
  setSelectedUser: (user: UserProfile | null) => void;
  searchTerm: string;
  setSearchTerm: (term: string) => void;
  filterStatus: 'all' | 'active' | 'suspended';
  setFilterStatus: (status: 'all' | 'active' | 'suspended') => void;
  adminActions: ReturnType<typeof useAdminActions>;
}

export const UserManagementTab: React.FC<UserManagementTabProps> = ({
  users,
  selectedUser,
  setSelectedUser,
  searchTerm,
  setSearchTerm,
  filterStatus,
  setFilterStatus,
  adminActions,
}) => {
  const [showSuspendModal, setShowSuspendModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [suspendReason, setSuspendReason] = useState('');
  const [deleteReason, setDeleteReason] = useState('');
  const [anonymizeData, setAnonymizeData] = useState(true);

  const handleSuspend = async () => {
    if (!selectedUser || !suspendReason) return;
    
    const result = await adminActions.suspendUser(selectedUser.uid, suspendReason);
    if (result.success) {
      alert(result.message);
      setShowSuspendModal(false);
      setSuspendReason('');
    } else {
      alert(result.message);
    }
  };

  const handleReactivate = async () => {
    if (!selectedUser) return;
    
    const result = await adminActions.reactivateUser(selectedUser.uid);
    if (result.success) {
      alert(result.message);
    } else {
      alert(result.message);
    }
  };

  const handleDelete = async () => {
    if (!selectedUser || !deleteReason) return;
    
    const confirmed = window.confirm(
      `Are you sure you want to ${anonymizeData ? 'anonymize' : 'permanently delete'} this user? This action cannot be undone.`
    );
    
    if (!confirmed) return;

    const result = await adminActions.deleteUser(selectedUser.uid, deleteReason, anonymizeData);
    if (result.success) {
      alert(result.message);
      setShowDeleteModal(false);
      setDeleteReason('');
      setSelectedUser(null);
    } else {
      alert(result.message);
    }
  };

  const handleExportJSON = async () => {
    if (!selectedUser) return;
    await adminActions.exportUserDataJSON(selectedUser.uid, selectedUser.displayName);
  };

  const handleExportCSV = async () => {
    if (!selectedUser) return;
    await adminActions.exportUserDataCSV(selectedUser.uid, selectedUser.displayName);
  };

  const handleToggleRole = async (role: 'isAuthor' | 'isAdmin') => {
    if (!selectedUser) return;
    
    const newValue = !selectedUser[role];
    const result = await adminActions.updateUser(selectedUser.uid, { [role]: newValue });
    
    if (result.success) {
      alert(`User ${role === 'isAuthor' ? 'author' : 'admin'} status updated`);
      // Update local state
      setSelectedUser({ ...selectedUser, [role]: newValue });
    } else {
      alert(result.message);
    }
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
      {/* Users List */}
      <div className="space-y-4">
        {/* Search and Filters */}
        <div className="space-y-3">
          <input
            type="text"
            placeholder="Search users by name or email..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full px-4 py-2 bg-zinc-900 border border-zinc-800 rounded-lg text-zinc-300 placeholder-zinc-600 focus:outline-none focus:border-red-900"
          />
          
          <div className="flex gap-2">
            {(['all', 'active', 'suspended'] as const).map(status => (
              <button
                key={status}
                onClick={() => setFilterStatus(status)}
                className={`px-4 py-2 rounded-lg text-sm font-serif transition-colors ${
                  filterStatus === status
                    ? 'bg-red-900/30 text-red-400 border border-red-900/50'
                    : 'bg-zinc-900 text-zinc-500 border border-zinc-800 hover:text-zinc-300'
                }`}
              >
                {status.charAt(0).toUpperCase() + status.slice(1)}
              </button>
            ))}
          </div>
        </div>

        <h2 className="font-serif text-2xl text-zinc-400">
          Users ({users.length})
        </h2>
        
        {users.length === 0 ? (
          <div className="rounded-lg border border-zinc-800 bg-zinc-900/50 p-8 text-center">
            <p className="text-zinc-500">No users found</p>
          </div>
        ) : (
          <div className="space-y-3 max-h-[calc(100vh-400px)] overflow-y-auto pr-2">
            {users.map((user) => (
              <motion.div
                key={user.uid}
                whileHover={{ scale: 1.01 }}
                onClick={() => setSelectedUser(user)}
                className={`cursor-pointer rounded-lg border p-4 transition-colors ${
                  user.accountStatus === 'suspended'
                    ? 'border-red-900/50 bg-red-950/20'
                    : selectedUser?.uid === user.uid
                    ? 'border-zinc-700 bg-zinc-900/50 ring-2 ring-zinc-700'
                    : 'border-zinc-800 bg-zinc-900/30 hover:bg-zinc-900/40'
                }`}
              >
                <div className="flex items-start gap-3">
                  <div className="h-10 w-10 rounded-full bg-gradient-to-br from-red-900 to-zinc-900 flex items-center justify-center text-sm font-serif text-zinc-300 flex-shrink-0">
                    {user.displayName?.charAt(0).toUpperCase() || 'U'}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 flex-wrap">
                      <h3 className="font-serif text-lg text-zinc-300 truncate">
                        {user.displayName}
                      </h3>
                      {user.isAuthor && (
                        <span className="px-2 py-0.5 text-xs rounded-full bg-red-900/30 text-red-400 border border-red-900/50">
                          Author
                        </span>
                      )}
                      {user.isAdmin && (
                        <span className="px-2 py-0.5 text-xs rounded-full bg-blue-900/30 text-blue-400 border border-blue-900/50">
                          Admin
                        </span>
                      )}
                      {user.accountStatus === 'suspended' && (
                        <span className="px-2 py-0.5 text-xs rounded-full bg-yellow-900/30 text-yellow-400 border border-yellow-900/50">
                          Suspended
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
              className="rounded-lg border border-zinc-800 bg-zinc-900/50 p-6 space-y-6"
            >
              {/* User Header */}
              <div className="border-b border-zinc-800 pb-4">
                <div className="flex items-center gap-4 mb-4">
                  <div className="h-16 w-16 rounded-full bg-gradient-to-br from-red-900 to-zinc-900 flex items-center justify-center text-2xl font-serif text-zinc-300">
                    {selectedUser.displayName?.charAt(0).toUpperCase() || 'U'}
                  </div>
                  <div className="flex-1">
                    <h2 className="font-serif text-2xl text-zinc-300">
                      {selectedUser.displayName}
                    </h2>
                    <p className="text-sm text-zinc-500">{selectedUser.email}</p>
                  </div>
                </div>
                
                <div className="flex gap-2 flex-wrap">
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
                  {selectedUser.accountStatus === 'suspended' && (
                    <span className="px-3 py-1 text-xs rounded-full bg-yellow-900/30 text-yellow-400 border border-yellow-900/50">
                      Suspended
                    </span>
                  )}
                </div>
              </div>

              {/* User Info */}
              <div className="space-y-4">
                <div>
                  <label className="text-xs text-zinc-600 uppercase tracking-wider">User ID</label>
                  <p className="text-sm text-zinc-400 font-mono mt-1">{selectedUser.uid}</p>
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

                {selectedUser.accountStatus === 'suspended' && selectedUser.suspensionReason && (
                  <div>
                    <label className="text-xs text-zinc-600 uppercase tracking-wider">Suspension Reason</label>
                    <p className="text-sm text-yellow-400 mt-1">{selectedUser.suspensionReason}</p>
                  </div>
                )}
              </div>

              {/* Role Management */}
              <div className="border-t border-zinc-800 pt-4">
                <label className="text-xs text-zinc-600 uppercase tracking-wider mb-3 block">
                  Role Management
                </label>
                <div className="space-y-2">
                  <button
                    onClick={() => handleToggleRole('isAuthor')}
                    className={`w-full p-3 rounded border text-left transition-colors ${
                      selectedUser.isAuthor
                        ? 'border-red-900/50 bg-red-950/20 text-red-400'
                        : 'border-zinc-800 bg-zinc-900/30 text-zinc-500 hover:text-zinc-300'
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <span className="text-sm">Author Status</span>
                      <span className="text-xs">{selectedUser.isAuthor ? 'Enabled' : 'Disabled'}</span>
                    </div>
                  </button>
                  <button
                    onClick={() => handleToggleRole('isAdmin')}
                    className={`w-full p-3 rounded border text-left transition-colors ${
                      selectedUser.isAdmin
                        ? 'border-blue-900/50 bg-blue-950/20 text-blue-400'
                        : 'border-zinc-800 bg-zinc-900/30 text-zinc-500 hover:text-zinc-300'
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <span className="text-sm">Admin Status</span>
                      <span className="text-xs">{selectedUser.isAdmin ? 'Enabled' : 'Disabled'}</span>
                    </div>
                  </button>
                </div>
              </div>

              {/* Actions */}
              <div className="border-t border-zinc-800 pt-4 space-y-3">
                <div className="grid grid-cols-2 gap-3">
                  <Button
                    onClick={handleExportJSON}
                    variant="secondary"
                    className="w-full text-sm"
                  >
                    Export JSON
                  </Button>
                  <Button
                    onClick={handleExportCSV}
                    variant="secondary"
                    className="w-full text-sm"
                  >
                    Export CSV
                  </Button>
                </div>

                {selectedUser.accountStatus === 'suspended' ? (
                  <Button
                    onClick={handleReactivate}
                    variant="primary"
                    className="w-full"
                  >
                    Reactivate Account
                  </Button>
                ) : (
                  <Button
                    onClick={() => setShowSuspendModal(true)}
                    variant="ghost"
                    className="w-full"
                  >
                    Suspend Account
                  </Button>
                )}

                <Button
                  onClick={() => setShowDeleteModal(true)}
                  variant="ghost"
                  className="w-full text-red-400 hover:text-red-300"
                >
                  Delete/Anonymize User
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

      {/* Suspend Modal */}
      {showSuspendModal && selectedUser && (
        <div className="fixed inset-0 bg-black/80 flex items-center justify-center z-50 p-4">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="bg-zinc-900 border border-zinc-800 rounded-lg p-6 max-w-md w-full"
          >
            <h3 className="font-serif text-2xl text-zinc-300 mb-4">
              Suspend User
            </h3>
            <p className="text-sm text-zinc-500 mb-4">
              Suspending {selectedUser.displayName}. Please provide a reason:
            </p>
            <textarea
              value={suspendReason}
              onChange={(e) => setSuspendReason(e.target.value)}
              placeholder="Reason for suspension..."
              className="w-full px-4 py-2 bg-zinc-950 border border-zinc-800 rounded-lg text-zinc-300 placeholder-zinc-600 focus:outline-none focus:border-red-900 min-h-[100px]"
            />
            <div className="flex gap-3 mt-4">
              <Button
                onClick={handleSuspend}
                variant="primary"
                className="flex-1"
                disabled={!suspendReason}
              >
                Suspend
              </Button>
              <Button
                onClick={() => {
                  setShowSuspendModal(false);
                  setSuspendReason('');
                }}
                variant="ghost"
                className="flex-1"
              >
                Cancel
              </Button>
            </div>
          </motion.div>
        </div>
      )}

      {/* Delete Modal */}
      {showDeleteModal && selectedUser && (
        <div className="fixed inset-0 bg-black/80 flex items-center justify-center z-50 p-4">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="bg-zinc-900 border border-zinc-800 rounded-lg p-6 max-w-md w-full"
          >
            <h3 className="font-serif text-2xl text-zinc-300 mb-4">
              Delete User Data
            </h3>
            <p className="text-sm text-zinc-500 mb-4">
              Choose how to handle {selectedUser.displayName}'s data:
            </p>
            
            <div className="space-y-3 mb-4">
              <label className="flex items-start gap-3 p-3 border border-zinc-800 rounded-lg cursor-pointer hover:bg-zinc-800/50">
                <input
                  type="radio"
                  checked={anonymizeData}
                  onChange={() => setAnonymizeData(true)}
                  className="mt-1"
                />
                <div>
                  <div className="text-sm text-zinc-300">Anonymize (Recommended)</div>
                  <div className="text-xs text-zinc-500">Keep content but remove personal info</div>
                </div>
              </label>
              <label className="flex items-start gap-3 p-3 border border-zinc-800 rounded-lg cursor-pointer hover:bg-zinc-800/50">
                <input
                  type="radio"
                  checked={!anonymizeData}
                  onChange={() => setAnonymizeData(false)}
                  className="mt-1"
                />
                <div>
                  <div className="text-sm text-zinc-300">Permanent Delete</div>
                  <div className="text-xs text-zinc-500">Remove all user data completely</div>
                </div>
              </label>
            </div>

            <textarea
              value={deleteReason}
              onChange={(e) => setDeleteReason(e.target.value)}
              placeholder="Reason for deletion (required for audit)..."
              className="w-full px-4 py-2 bg-zinc-950 border border-zinc-800 rounded-lg text-zinc-300 placeholder-zinc-600 focus:outline-none focus:border-red-900 min-h-[100px]"
            />
            <div className="flex gap-3 mt-4">
              <Button
                onClick={handleDelete}
                variant="primary"
                className="flex-1 bg-red-900 hover:bg-red-800"
                disabled={!deleteReason}
              >
                {anonymizeData ? 'Anonymize' : 'Delete'}
              </Button>
              <Button
                onClick={() => {
                  setShowDeleteModal(false);
                  setDeleteReason('');
                }}
                variant="ghost"
                className="flex-1"
              >
                Cancel
              </Button>
            </div>
          </motion.div>
        </div>
      )}
    </div>
  );
};
