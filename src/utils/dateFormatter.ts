/**
 * Date Formatting Utilities
 * Handles various date formats including Firestore Timestamps
 */

/**
 * Safely converts any date-like value to a Date object
 */
export function toDate(date: any): Date | null {
  try {
    if (!date) return null;
    
    // Already a Date object
    if (date instanceof Date) {
      return isNaN(date.getTime()) ? null : date;
    }
    
    // Firestore Timestamp
    if (date && typeof date.toDate === 'function') {
      return date.toDate();
    }
    
    // Timestamp object with seconds/nanoseconds
    if (date && typeof date.seconds === 'number') {
      return new Date(date.seconds * 1000);
    }
    
    // String or number
    const converted = new Date(date);
    return isNaN(converted.getTime()) ? null : converted;
  } catch (error) {
    console.error('Error converting to date:', error);
    return null;
  }
}

/**
 * Format date as full date (e.g., "January 15, 2024")
 */
export function formatFullDate(date: any, fallback: string = 'Recently'): string {
  try {
    const dateObj = toDate(date);
    if (!dateObj) return fallback;
    
    return dateObj.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });
  } catch (error) {
    console.error('Error formatting full date:', error);
    return fallback;
  }
}

/**
 * Format date as short date (e.g., "Jan 15")
 */
export function formatShortDate(date: any, fallback: string = 'Recently'): string {
  try {
    const dateObj = toDate(date);
    if (!dateObj) return fallback;
    
    return dateObj.toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
    });
  } catch (error) {
    console.error('Error formatting short date:', error);
    return fallback;
  }
}

/**
 * Format date as relative time (e.g., "2h ago", "3d ago")
 */
export function formatRelativeTime(date: any, fallback: string = 'recently'): string {
  try {
    const dateObj = toDate(date);
    if (!dateObj) return fallback;
    
    const now = new Date();
    const diff = now.getTime() - dateObj.getTime();
    const seconds = Math.floor(diff / 1000);
    const minutes = Math.floor(seconds / 60);
    const hours = Math.floor(minutes / 60);
    const days = Math.floor(hours / 24);
    const weeks = Math.floor(days / 7);

    if (seconds < 60) return 'just now';
    if (minutes < 60) return `${minutes}m ago`;
    if (hours < 24) return `${hours}h ago`;
    if (days === 0) return 'today';
    if (days === 1) return 'yesterday';
    if (days < 7) return `${days}d ago`;
    if (weeks < 4) return `${weeks}w ago`;
    
    return formatShortDate(dateObj, fallback);
  } catch (error) {
    console.error('Error formatting relative time:', error);
    return fallback;
  }
}

/**
 * Format date with year (e.g., "Jan 15, 2024")
 */
export function formatDateWithYear(date: any, fallback: string = 'Recently'): string {
  try {
    const dateObj = toDate(date);
    if (!dateObj) return fallback;
    
    return dateObj.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
    });
  } catch (error) {
    console.error('Error formatting date with year:', error);
    return fallback;
  }
}

/**
 * Format date and time (e.g., "Jan 15, 2024 at 3:30 PM")
 */
export function formatDateTime(date: any, fallback: string = 'Recently'): string {
  try {
    const dateObj = toDate(date);
    if (!dateObj) return fallback;
    
    const dateStr = dateObj.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
    });
    
    const timeStr = dateObj.toLocaleTimeString('en-US', {
      hour: 'numeric',
      minute: '2-digit',
      hour12: true,
    });
    
    return `${dateStr} at ${timeStr}`;
  } catch (error) {
    console.error('Error formatting date time:', error);
    return fallback;
  }
}

/**
 * Check if a date is valid
 */
export function isValidDate(date: any): boolean {
  const dateObj = toDate(date);
  return dateObj !== null;
}

/**
 * Get time ago in words (e.g., "2 hours ago", "3 days ago")
 */
export function getTimeAgo(date: any, fallback: string = 'recently'): string {
  try {
    const dateObj = toDate(date);
    if (!dateObj) return fallback;
    
    const now = new Date();
    const diff = now.getTime() - dateObj.getTime();
    const seconds = Math.floor(diff / 1000);
    const minutes = Math.floor(seconds / 60);
    const hours = Math.floor(minutes / 60);
    const days = Math.floor(hours / 24);
    const weeks = Math.floor(days / 7);
    const months = Math.floor(days / 30);
    const years = Math.floor(days / 365);

    if (seconds < 60) return 'just now';
    if (minutes === 1) return '1 minute ago';
    if (minutes < 60) return `${minutes} minutes ago`;
    if (hours === 1) return '1 hour ago';
    if (hours < 24) return `${hours} hours ago`;
    if (days === 1) return '1 day ago';
    if (days < 7) return `${days} days ago`;
    if (weeks === 1) return '1 week ago';
    if (weeks < 4) return `${weeks} weeks ago`;
    if (months === 1) return '1 month ago';
    if (months < 12) return `${months} months ago`;
    if (years === 1) return '1 year ago';
    return `${years} years ago`;
  } catch (error) {
    console.error('Error getting time ago:', error);
    return fallback;
  }
}
