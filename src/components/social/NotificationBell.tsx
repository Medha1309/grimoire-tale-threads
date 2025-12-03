import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useNotifications } from '../../hooks/useNotifications';
import { useNavigate } from 'react-router-dom';
import { formatDistanceToNow } from 'date-fns';

export const NotificationBell: React.FC = () => {
  const { notifications, unreadCount, loading, markAsRead, markAllAsRead } = useNotifications();
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const navigate = useNavigate();

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleNotificationClick = async (notification: any) => {
    await markAsRead(notification.id);
    setIsOpen(false);
    
    // Navigate based on notification type
    if (notification.link) {
      navigate(notification.link);
    } else if (notification.actorId) {
      navigate(`/profile/${notification.actorId}`);
    }
  };

  const getNotificationIcon = (type: string) => {
    const iconClass = "w-5 h-5";
    switch (type) {
      case 'new_follower':
        return (
          <svg className={iconClass} fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
          </svg>
        );
      case 'new_story':
        return (
          <svg className={iconClass} fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
          </svg>
        );
      case 'story_like':
        return (
          <svg className={iconClass} fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
          </svg>
        );
      case 'story_comment':
      case 'forum_reply':
        return (
          <svg className={iconClass} fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
          </svg>
        );
      default:
        return (
          <svg className={iconClass} fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
          </svg>
        );
    }
  };

  return (
    <div className="relative" ref={dropdownRef}>
      {/* Gothic Bell Icon with Haunting Effects */}
      <motion.button
        onClick={() => setIsOpen(!isOpen)}
        className="relative p-2 group"
        aria-label="Notifications"
        whileHover="hover"
        initial="initial"
      >
        {/* Ethereal glow on hover */}
        <motion.div
          className="absolute inset-0 rounded-lg bg-gradient-to-br from-red-950/0 via-red-900/0 to-red-950/0 blur-md"
          variants={{
            initial: { opacity: 0, scale: 0.8 },
            hover: { opacity: 0.4, scale: 1.2 }
          }}
          transition={{ duration: 0.3 }}
        />

        {/* Bell SVG with Gothic styling */}
        <motion.svg
          className="w-5 h-5 relative z-10 text-zinc-400 transition-all duration-300"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
          variants={{
            initial: { rotate: 0, scale: 1 },
            hover: { 
              rotate: [0, -15, 15, -10, 10, 0],
              scale: 1.1,
              color: '#d4c4a8'
            }
          }}
          transition={{ duration: 0.6, ease: "easeInOut" }}
        >
          <path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9" />
          <path d="M13.73 21a2 2 0 0 1-3.46 0" />
          
          {/* Subtle crack detail */}
          <motion.path
            d="M12 4v1M9 7l1 1M15 7l-1 1"
            strokeWidth="1"
            className="opacity-30"
            variants={{
              initial: { pathLength: 0, opacity: 0 },
              hover: { pathLength: 1, opacity: 0.3 }
            }}
            transition={{ duration: 0.4 }}
          />
        </motion.svg>

        {/* Unread Badge - Blood drop style */}
        <AnimatePresence>
          {unreadCount > 0 && (
            <motion.div
              initial={{ scale: 0, y: -10 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0, y: -10 }}
              className="absolute -top-0.5 -right-0.5 z-20"
            >
              {/* Pulsing glow */}
              <motion.div
                className="absolute inset-0 rounded-full bg-red-600/40 blur-sm"
                animate={{
                  scale: [1, 1.4, 1],
                  opacity: [0.5, 0.8, 0.5]
                }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                  ease: "easeInOut"
                }}
              />
              
              {/* Badge */}
              <div className="relative flex items-center justify-center min-w-[18px] h-[18px] px-1.5 text-[10px] font-bold text-white bg-gradient-to-br from-red-600 via-red-700 to-red-900 rounded-full border border-red-950/50 shadow-lg shadow-red-900/50">
                <motion.span
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.1 }}
                >
                  {unreadCount > 9 ? '9+' : unreadCount}
                </motion.span>
                
                {/* Shine effect */}
                <motion.div
                  className="absolute inset-0 rounded-full bg-gradient-to-br from-white/30 via-transparent to-transparent"
                  animate={{
                    opacity: [0.3, 0.6, 0.3]
                  }}
                  transition={{
                    duration: 2,
                    repeat: Infinity,
                    ease: "easeInOut"
                  }}
                />
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Floating particles on hover */}
        {[...Array(3)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-1 h-1 bg-red-900/60 rounded-full pointer-events-none"
            style={{
              left: `${30 + i * 15}%`,
              top: `${20 + i * 20}%`,
            }}
            variants={{
              initial: { opacity: 0, y: 0, scale: 0 },
              hover: {
                opacity: [0, 0.6, 0],
                y: [-10, -20, -30],
                scale: [0, 1, 0.5],
              }
            }}
            transition={{
              duration: 1.5,
              delay: i * 0.15,
              repeat: Infinity,
              repeatDelay: 0.5
            }}
          />
        ))}
      </motion.button>

      {/* Dropdown - Haunted Parchment Style */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10, scale: 0.95, rotateX: -15 }}
            animate={{ opacity: 1, y: 0, scale: 1, rotateX: 0 }}
            exit={{ opacity: 0, y: -10, scale: 0.95, rotateX: -15 }}
            transition={{ duration: 0.3, ease: [0.4, 0, 0.2, 1] }}
            className="absolute right-0 mt-2 w-80 max-h-[500px] overflow-hidden rounded-lg z-50"
            style={{
              transformOrigin: 'top right',
              background: 'rgba(10, 10, 10, 0.85)',
              backdropFilter: 'blur(16px)',
              boxShadow: `
                0 4px 24px rgba(0, 0, 0, 0.5),
                inset 0 1px 0 rgba(255, 255, 255, 0.05)
              `,
              border: '1px solid rgba(255, 255, 255, 0.1)',
            }}
          >
            {/* Animated border glow */}
            <motion.div
              className="absolute inset-0 rounded-lg pointer-events-none"
              style={{
                background: 'linear-gradient(90deg, transparent, rgba(139, 0, 0, 0.3), transparent)',
              }}
              animate={{
                x: ['-100%', '200%'],
              }}
              transition={{
                duration: 3,
                repeat: Infinity,
                ease: 'linear',
                repeatDelay: 2
              }}
            />

            {/* Aged paper texture overlay */}
            <div 
              className="absolute inset-0 pointer-events-none opacity-[0.03] mix-blend-overlay"
              style={{
                backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 400 400' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`,
              }}
            />

            {/* Vignette with blood tint */}
            <div className="absolute inset-0 pointer-events-none bg-gradient-radial from-transparent via-transparent to-red-950/20" />

            {/* Header */}
            <div className="relative flex items-center justify-between px-5 py-4 border-b border-red-950/30">
              <div className="flex items-center gap-2">
                <motion.div
                  animate={{
                    rotate: [0, 5, -5, 0],
                  }}
                  transition={{
                    duration: 2,
                    repeat: Infinity,
                    ease: "easeInOut"
                  }}
                >
                  <svg className="w-4 h-4 text-red-900/60" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M12 2C8.5 2 6 4.5 6 8v8c0 .5-.2 1-.6 1.4L4 19h16l-1.4-1.6c-.4-.4-.6-.9-.6-1.4V8c0-3.5-2.5-6-6-6z" />
                  </svg>
                </motion.div>
                <h3 className="font-medium text-sm text-zinc-200">
                  Notifications
                </h3>
              </div>
              {unreadCount > 0 && (
                <motion.button
                  onClick={markAllAsRead}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="text-xs text-zinc-400 hover:text-zinc-200 transition-colors duration-200"
                >
                  Mark all read
                </motion.button>
              )}
            </div>

            {/* Notifications List */}
            <div className="relative max-h-[500px] overflow-y-auto scrollbar-thin scrollbar-track-transparent scrollbar-thumb-zinc-800">
              {loading ? (
                <div className="flex items-center justify-center py-16">
                  <div className="w-8 h-8 border-2 border-zinc-700 border-t-zinc-500 rounded-full animate-spin" />
                </div>
              ) : notifications.length === 0 ? (
                <div className="py-16 px-6 text-center">
                  {/* Haunting empty state */}
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5 }}
                  >
                    <motion.svg
                      className="w-16 h-16 mx-auto mb-4 text-zinc-800/50"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="1"
                      animate={{
                        y: [0, -5, 0],
                        opacity: [0.3, 0.5, 0.3]
                      }}
                      transition={{
                        duration: 3,
                        repeat: Infinity,
                        ease: "easeInOut"
                      }}
                    >
                      <path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9" />
                      <path d="M13.73 21a2 2 0 0 1-3.46 0" />
                      {/* Cobwebs */}
                      <path d="M8 6L6 4M16 6l2-2M12 2v2" strokeWidth="0.5" className="opacity-30" />
                    </motion.svg>
                    
                    <p className="text-zinc-400 text-sm mb-2">
                      No notifications yet
                    </p>
                    <p className="text-zinc-500 text-xs leading-relaxed max-w-xs mx-auto">
                      Follow other users to see their activity here
                    </p>
                  </motion.div>
                </div>
              ) : (
                <div className="divide-y divide-red-950/20">
                  {notifications.map((notification, index) => (
                    <motion.button
                      key={notification.id}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: index * 0.05 }}
                      onClick={() => handleNotificationClick(notification)}
                      whileHover={{ x: 4 }}
                      className={`relative w-full text-left px-5 py-4 transition-all duration-200 group overflow-hidden ${
                        !notification.read 
                          ? 'bg-gradient-to-r from-red-950/20 to-transparent' 
                          : 'hover:bg-zinc-900/30'
                      }`}
                    >
                      {/* Hover glow effect */}
                      <motion.div
                        className="absolute inset-0 bg-gradient-to-r from-red-950/0 via-red-900/10 to-red-950/0 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                        initial={false}
                      />

                      <div className="flex gap-3.5 relative z-10">
                        {/* Icon with glow */}
                        <motion.div 
                          className="flex-shrink-0 mt-0.5 relative"
                          whileHover={{ scale: 1.1 }}
                        >
                          <div className="absolute inset-0 bg-red-900/20 blur-md opacity-0 group-hover:opacity-100 transition-opacity" />
                          <div className="relative text-zinc-600 group-hover:text-bone-DEFAULT/70 transition-colors">
                            {getNotificationIcon(notification.type)}
                          </div>
                        </motion.div>

                        {/* Content */}
                        <div className="flex-1 min-w-0">
                          <div className="flex items-start justify-between gap-2 mb-1">
                            <p className="text-sm text-zinc-200 group-hover:text-white leading-snug transition-colors">
                              {notification.title}
                            </p>
                            {!notification.read && (
                              <motion.span
                                initial={{ scale: 0 }}
                                animate={{ scale: 1 }}
                                className="relative flex-shrink-0 mt-1.5"
                              >
                                {/* Pulsing glow */}
                                <motion.span
                                  className="absolute inset-0 w-1.5 h-1.5 bg-red-600 rounded-full blur-sm"
                                  animate={{
                                    scale: [1, 1.5, 1],
                                    opacity: [0.5, 0.8, 0.5]
                                  }}
                                  transition={{
                                    duration: 2,
                                    repeat: Infinity,
                                    ease: "easeInOut"
                                  }}
                                />
                                <span className="relative block w-1.5 h-1.5 bg-red-600 rounded-full shadow-sm shadow-red-900/50" />
                              </motion.span>
                            )}
                          </div>
                          <p className="text-sm text-zinc-400 group-hover:text-zinc-300 leading-relaxed line-clamp-2 transition-colors">
                            {notification.message}
                          </p>
                          <p className="text-xs text-zinc-500 group-hover:text-zinc-400 mt-2 transition-colors">
                            {notification.createdAt?.toDate
                              ? formatDistanceToNow(notification.createdAt.toDate(), {
                                  addSuffix: true,
                                })
                              : 'moments ago'}
                          </p>
                        </div>
                      </div>

                      {/* Subtle divider line on hover */}
                      <motion.div
                        className="absolute bottom-0 left-5 right-5 h-px bg-gradient-to-r from-transparent via-red-900/30 to-transparent"
                        initial={{ scaleX: 0 }}
                        whileHover={{ scaleX: 1 }}
                        transition={{ duration: 0.3 }}
                      />
                    </motion.button>
                  ))}
                </div>
              )}
            </div>

            {/* Footer */}
            {notifications.length > 0 && (
              <div className="relative px-5 py-4 border-t border-red-950/30 text-center bg-gradient-to-b from-transparent to-black/40">
                <motion.button
                  onClick={() => {
                    setIsOpen(false);
                    navigate('/notifications');
                  }}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="relative group text-xs text-zinc-400 hover:text-zinc-200 transition-colors duration-200"
                >
                  <span className="relative z-10">View all notifications</span>
                  
                  {/* Underline effect */}
                  <motion.span
                    className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[#d4c4a8]/50 to-transparent"
                    initial={{ scaleX: 0 }}
                    whileHover={{ scaleX: 1 }}
                    transition={{ duration: 0.3 }}
                  />
                </motion.button>
              </div>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};
