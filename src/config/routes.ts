/**
 * Route configuration
 */

export const ROUTES = {
  HOME: '/',
  STORIES: '/stories',
  STORY_DETAIL: '/story/:slug',
  READER: '/read/:slug',
  ABOUT: '/about',
  CONTACT: '/contact',
  COMPOSE: '/compose',
  LOGIN: '/login',
  SIGNUP: '/signup',
  PROFILE: '/profile',
  FORUM: '/forum',
  FORUM_POST: '/forum/:postId',
  DIARY: '/diary',
  DIARY_ENTRY: '/diary/:entryId',
  ADMIN: '/admin',
  ADMIN_POPULATE: '/admin/populate',
  DESKTOP: '/desktop',
  RETRO: '/retro',
} as const;

export const buildRoute = {
  storyDetail: (slug: string) => `/story/${slug}`,
  reader: (slug: string) => `/read/${slug}`,
  forumPost: (postId: string) => `/forum/${postId}`,
  diaryEntry: (entryId: string) => `/diary/${entryId}`,
};
