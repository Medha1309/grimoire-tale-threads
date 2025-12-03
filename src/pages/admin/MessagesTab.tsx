import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { doc, updateDoc } from 'firebase/firestore';
import { db } from '../../lib/firebase';
import { ContactMessage } from '../../types';
import { Button } from '../../components/ui';

interface MessagesTabProps {
  messages: ContactMessage[];
}

export const MessagesTab: React.FC<MessagesTabProps> = ({ messages }) => {
  const [selectedMessage, setSelectedMessage] = useState<ContactMessage | null>(null);

  const markAsRead = async (messageId: string) => {
    try {
      await updateDoc(doc(db, 'contactMessages', messageId), { read: true });
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

  return (
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
  );
};
