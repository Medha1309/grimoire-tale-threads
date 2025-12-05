/**
 * Application-wide constants
 * Centralized configuration to avoid magic numbers and strings
 */

// App metadata
export const APP_NAME = 'Grimoire';
export const APP_VERSION = '1.0.0';
export const APP_DESCRIPTION = 'A gothic horror storytelling platform';

// Pagination
export const DEFAULT_PAGE_SIZE = 20;
export const MAX_PAGE_SIZE = 100;
export const INFINITE_SCROLL_THRESHOLD = 0.8;

// File upload limits
export const MAX_IMAGE_SIZE_MB = 5;
export const MAX_IMAGE_SIZE_BYTES = MAX_IMAGE_SIZE_MB * 1024 * 1024;
export const MAX_FILE_SIZE_MB = 10;
export const MAX_FILE_SIZE_BYTES = MAX_FILE_SIZE_MB * 1024 * 1024;
export const ALLOWED_IMAGE_TYPES = ['image/jpeg', 'image/png', 'image/gif', 'image/webp'];
export const ALLOWED_FILE_TYPES = [...ALLOWED_IMAGE_TYPES, 'application/pdf', 'text/plain'];

// Text length limits
export const MIN_USERNAME_LENGTH = 3;
export const MAX_USERNAME_LENGTH = 30;
export const MIN_PASSWORD_LENGTH = 8;
export const MAX_PASSWORD_LENGTH = 128;
export const MIN_DISPLAY_NAME_LENGTH = 2;
export const MAX_DISPLAY_NAME_LENGTH = 50;
export const MIN_TITLE_LENGTH = 3;
export const MAX_TITLE_LENGTH = 200;
export const MIN_CONTENT_LENGTH = 1;
export const MAX_CONTENT_LENGTH = 50000;
export const MAX_BIO_LENGTH = 500;
export const MAX_COMMENT_LENGTH = 1000;
export const MAX_REPLY_LENGTH = 500;

// Timeouts and delays
export const DEBOUNCE_DELAY = 300;
export const THROTTLE_DELAY = 1000;
export const AUTO_SAVE_DELAY = 2000;
export const TOAST_DURATION = 3000;
export const LOADING_DELAY = 500;
export const ANIMATION_DURATION = 300;
export const LONG_ANIMATION_DURATION = 600;

// Rate limiting
export const MAX_REQUESTS_PER_MINUTE = 60;
export const MAX_REQUESTS_PER_HOUR = 1000;
export const MAX_LOGIN_ATTEMPTS = 5;
export const LOGIN_LOCKOUT_DURATION = 15 * 60 * 1000; // 15 minutes

// Cache durations (in milliseconds)
export const CACHE_DURATION_SHORT = 5 * 60 * 1000; // 5 minutes
export const CACHE_DURATION_MEDIUM = 30 * 60 * 1000; // 30 minutes
export const CACHE_DURATION_LONG = 24 * 60 * 60 * 1000; // 24 hours

// Local storage keys
export const STORAGE_KEYS = {
  AUTH_TOKEN: 'grimoire_auth_token',
  USER_PREFERENCES: 'grimoire_user_preferences',
  THEME: 'grimoire_theme',
  PERFORMANCE_MODE: 'grimoire_performance_mode',
  DRAFT_PREFIX: 'grimoire_draft_',
  READING_HISTORY: 'grimoire_reading_history',
  BOOKMARKS: 'grimoire_bookmarks',
  LAST_VISIT: 'grimoire_last_visit',
} as const;

// Session storage keys
export const SESSION_KEYS = {
  SCROLL_POSITION: 'grimoire_scroll_position',
  FORM_DATA: 'grimoire_form_data',
  TEMP_DATA: 'grimoire_temp_data',
} as const;

// API endpoints (if using external APIs)
export const API_ENDPOINTS = {
  BASE_URL: import.meta.env.VITE_API_URL || '',
  TIMEOUT: 30000, // 30 seconds
} as const;

// Firebase collection names
export const COLLECTIONS = {
  USERS: 'users',
  STORIES: 'stories',
  CHAPTERS: 'chapters',
  COMMENTS: 'comments',
  LIKES: 'likes',
  BOOKMARKS: 'bookmarks',
  FOLLOWS: 'follows',
  NOTIFICATIONS: 'notifications',
  FORUM_POSTS: 'forumPosts',
  FORUM_REPLIES: 'forumReplies',
  DIARY_ENTRIES: 'diaryEntries',
  SCRAPBOOK_ITEMS: 'scrapbookItems',
  SCRAPBOOK_COLLECTIONS: 'scrapbookCollections',
  ARTWORKS: 'artworks',
  CHAIN_LETTERS: 'chainLetters',
  CHAIN_SESSIONS: 'chainSessions',
  COLLABORATIVE_PROJECTS: 'collaborativeProjects',
  PROPOSALS: 'proposals',
  REFLECTION_SESSIONS: 'reflectionSessions',
  ADMIN_LOGS: 'adminLogs',
  REPORTS: 'reports',
  MESSAGES: 'messages',
} as const;

// User roles
export const USER_ROLES = {
  USER: 'user',
  MODERATOR: 'moderator',
  ADMIN: 'admin',
  SUPER_ADMIN: 'super_admin',
} as const;

// Story statuses
export const STORY_STATUS = {
  DRAFT: 'draft',
  PUBLISHED: 'published',
  ARCHIVED: 'archived',
  DELETED: 'deleted',
} as const;

// Story genres
export const GENRES = [
  'Horror',
  'Gothic',
  'Psychological',
  'Supernatural',
  'Mystery',
  'Thriller',
  'Dark Fantasy',
  'Cosmic Horror',
  'Folk Horror',
  'Body Horror',
] as const;

// Content ratings
export const CONTENT_RATINGS = {
  GENERAL: 'general',
  TEEN: 'teen',
  MATURE: 'mature',
  EXPLICIT: 'explicit',
} as const;

// Notification types
export const NOTIFICATION_TYPES = {
  LIKE: 'like',
  COMMENT: 'comment',
  REPLY: 'reply',
  FOLLOW: 'follow',
  MENTION: 'mention',
  SYSTEM: 'system',
} as const;

// Toast types
export const TOAST_TYPES = {
  SUCCESS: 'success',
  ERROR: 'error',
  WARNING: 'warning',
  INFO: 'info',
} as const;

// Modal sizes
export const MODAL_SIZES = {
  SMALL: 'small',
  MEDIUM: 'medium',
  LARGE: 'large',
  FULL: 'full',
} as const;

// Breakpoints (matching Tailwind)
export const BREAKPOINTS = {
  SM: 640,
  MD: 768,
  LG: 1024,
  XL: 1280,
  '2XL': 1536,
} as const;

// Z-index layers
export const Z_INDEX = {
  BACKGROUND: -1,
  BASE: 0,
  DROPDOWN: 10,
  STICKY: 20,
  FIXED: 30,
  MODAL_BACKDROP: 40,
  MODAL: 50,
  POPOVER: 60,
  TOOLTIP: 70,
  NOTIFICATION: 80,
  CURSOR: 90,
  MAX: 100,
} as const;

// Animation easing
export const EASING = {
  LINEAR: 'linear',
  EASE: 'ease',
  EASE_IN: 'ease-in',
  EASE_OUT: 'ease-out',
  EASE_IN_OUT: 'ease-in-out',
  BOUNCE: 'cubic-bezier(0.68, -0.55, 0.265, 1.55)',
  SMOOTH: 'cubic-bezier(0.4, 0, 0.2, 1)',
} as const;

// Performance thresholds
export const PERFORMANCE = {
  SLOW_NETWORK_THRESHOLD: 1000, // ms
  LARGE_LIST_THRESHOLD: 100, // items
  HEAVY_COMPONENT_THRESHOLD: 50, // ms render time
  BUNDLE_SIZE_WARNING: 500, // KB
} as const;

// Feature flags
export const FEATURES = {
  ENABLE_ANALYTICS: import.meta.env.VITE_ENABLE_ANALYTICS === 'true',
  ENABLE_ERROR_REPORTING: import.meta.env.VITE_ENABLE_ERROR_REPORTING === 'true',
  ENABLE_PERFORMANCE_MONITORING: import.meta.env.VITE_ENABLE_PERFORMANCE_MONITORING === 'true',
  ENABLE_EXPERIMENTAL_FEATURES: import.meta.env.VITE_ENABLE_EXPERIMENTAL === 'true',
} as const;

// Regex patterns
export const PATTERNS = {
  EMAIL: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
  USERNAME: /^[a-zA-Z0-9_-]+$/,
  URL: /^https?:\/\/.+/,
  HEX_COLOR: /^#([A-Fa-f0-9]{6}|[A-Fa-f0-9]{3})$/,
  PHONE: /^[\d\s\-+()]+$/,
} as const;

// Error messages
export const ERROR_MESSAGES = {
  GENERIC: 'Something went wrong. Please try again.',
  NETWORK: 'Network error. Please check your connection.',
  AUTH_REQUIRED: 'Please sign in to continue.',
  PERMISSION_DENIED: 'You don\'t have permission to perform this action.',
  NOT_FOUND: 'The requested resource was not found.',
  VALIDATION_FAILED: 'Please check your input and try again.',
  SERVER_ERROR: 'Server error. Please try again later.',
} as const;

// Success messages
export const SUCCESS_MESSAGES = {
  SAVED: 'Saved successfully!',
  DELETED: 'Deleted successfully!',
  UPDATED: 'Updated successfully!',
  CREATED: 'Created successfully!',
  PUBLISHED: 'Published successfully!',
  SENT: 'Sent successfully!',
} as const;

// Routes
export const ROUTES = {
  HOME: '/',
  ABOUT: '/about',
  CONTACT: '/contact',
  LOGIN: '/login',
  SIGNUP: '/signup',
  PROFILE: '/profile',
  USER_PROFILE: '/user/:userId',
  STORIES: '/stories',
  STORY_DETAIL: '/story/:storyId',
  READER: '/read/:storyId',
  COMPOSE: '/compose',
  FORUM: '/forum',
  DOLLHOUSE: '/dollhouse',
  PARLOUR: '/parlour',
  CHAINS: '/chains',
  CHAIN_LETTERS: '/chains/letters',
  REFLECTION_SESSIONS: '/chains/sessions',
  ACTIVE_SESSION: '/chains/session/:sessionId',
  COLLABORATIVE_PROJECT: '/chains/project/:projectId',
  DESKTOP: '/desktop',
  MYSPACE: '/myspace/:userId',
  ADMIN: '/admin',
  ADMIN_DASHBOARD: '/admin/dashboard',
} as const;

// Date formats
export const DATE_FORMATS = {
  SHORT: 'MMM d, yyyy',
  LONG: 'MMMM d, yyyy h:mm a',
  TIME: 'h:mm a',
  ISO: 'yyyy-MM-dd',
} as const;

// Keyboard shortcuts
export const SHORTCUTS = {
  SAVE: 'Ctrl+S',
  SEARCH: 'Ctrl+K',
  NEW: 'Ctrl+N',
  CLOSE: 'Escape',
  SUBMIT: 'Ctrl+Enter',
} as const;

// Social media links (if applicable)
export const SOCIAL_LINKS = {
  TWITTER: import.meta.env.VITE_TWITTER_URL || '',
  GITHUB: import.meta.env.VITE_GITHUB_URL || '',
  DISCORD: import.meta.env.VITE_DISCORD_URL || '',
} as const;

// Default values
export const DEFAULTS = {
  AVATAR: '/default-avatar.png',
  COVER: '/default-cover.png',
  THEME: 'dark',
  LANGUAGE: 'en',
  TIMEZONE: 'UTC',
} as const;
