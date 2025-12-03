/**
 * Security configuration and constants
 */

export const SECURITY_CONFIG = {
  // Content limits
  MAX_TITLE_LENGTH: 200,
  MAX_POST_LENGTH: 50000,
  MAX_COMMENT_LENGTH: 5000,
  MAX_BIO_LENGTH: 500,
  MAX_DISPLAY_NAME_LENGTH: 50,
  
  // Rate limits (requests per window)
  RATE_LIMITS: {
    POST_CREATION: { max: 5, windowMs: 60000 }, // 5 posts per minute
    COMMENT_CREATION: { max: 10, windowMs: 60000 }, // 10 comments per minute
    FOLLOW_ACTION: { max: 20, windowMs: 60000 }, // 20 follows per minute
    LIKE_ACTION: { max: 30, windowMs: 60000 }, // 30 likes per minute
  },
  
  // Allowed origins (for CSRF protection)
  ALLOWED_ORIGINS: [
    'http://localhost:5173',
    'http://localhost:3000',
    // Add production domains here
  ],
  
  // File upload limits
  MAX_FILE_SIZE: 5 * 1024 * 1024, // 5MB
  ALLOWED_IMAGE_TYPES: ['image/jpeg', 'image/png', 'image/gif', 'image/webp'],
  
  // Session
  SESSION_TIMEOUT_MS: 24 * 60 * 60 * 1000, // 24 hours
  
  // Password requirements
  PASSWORD_MIN_LENGTH: 6,
  PASSWORD_REQUIRE_UPPERCASE: false,
  PASSWORD_REQUIRE_NUMBER: false,
  PASSWORD_REQUIRE_SPECIAL: false,
};

// Sensitive routes that require authentication
export const PROTECTED_ROUTES = [
  '/profile',
  '/compose',
  '/diary',
  '/admin',
];

// Admin-only routes
export const ADMIN_ROUTES = [
  '/admin',
  '/admin/dashboard',
  '/admin/users',
  '/admin/content',
];

// Public routes (no auth required)
export const PUBLIC_ROUTES = [
  '/',
  '/stories',
  '/about',
  '/contact',
  '/login',
  '/signup',
  '/forum',
];
