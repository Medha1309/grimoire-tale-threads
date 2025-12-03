# Design Document

## Overview

This design document outlines the architecture and implementation strategy for two new pages in the GRIMOIRE horror writing platform: **The Gilded Parlour** (forum) and **The Dollhouse** (diary). Both features extend the existing React + TypeScript + Firebase architecture while introducing distinct visual themes and interaction patterns.

### Design Goals

1. **Aesthetic Cohesion**: Maintain the gothic horror theme while introducing Regency-era opulence (forum) and pastel-gothic dollhouse aesthetics (diary)
2. **Seamless Integration**: Leverage existing authentication, routing, and component patterns
3. **Performance**: Optimize for smooth animations and efficient data loading
4. **Scalability**: Design data models that support future features (moderation, notifications, analytics)
5. **User Experience**: Create immersive, intuitive interfaces with consistent microcopy and motion design

### Technology Stack

- **Frontend**: React 18, TypeScript, Framer Motion, Tailwind CSS
- **Backend**: Firebase (Firestore, Authentication, Storage)
- **AI Integration**: Google Gemini API (optional diary reflection)
- **Fonts**: Playfair Display, Cormorant Garamond, Inter, Lora, Parisienne, Petit Formal Script
- **State Management**: React Context + Custom Hooks

## Architecture

### High-Level Component Structure

```
App.tsx
├── AuthProvider (existing)
├── Navbar (updated with new routes)
├── GildedParlour (new page)
│   ├── ForumList
│   ├── PostView
│   ├── CreateWhisperModal
│   ├── ReplySection
│   └── ForumFilters
└── Dollhouse (new page)
    ├── DiaryGrid
    ├── DiaryEntryView
    ├── CreateConfessionModal
    ├── RibbonPicker
    └── DiaryTimeline
```

### Routing Updates


The existing app uses a state-based routing system with a `Page` type. We'll extend this:

**Updated Page Type**:
```typescript
export type Page = 
  | "landing" | "stories" | "reader" | "contact" | "about" 
  | "storyDetail" | "signup" | "login" | "profile" | "compose"
  | "forum" | "forumPost" | "diary" | "diaryEntry";
```

**Navigation Flow**:
- Forum: `landing` → `forum` → `forumPost` (with postId)
- Diary: `landing` → `diary` → `diaryEntry` (with entryId)
- Cross-navigation: Forum posts can link to diary, diary entries can convert to forum drafts

### Data Architecture

#### Firestore Collections

**1. Forum Posts Collection (`forum_posts`)**
```typescript
interface ForumPost {
  id: string;
  authorId: string;
  authorName: string;
  authorAvatar?: string;
  title: string;
  content: string;
  tags: string[]; // ["Romance", "Mystery", "Folklore", etc.]
  likeCount: number;
  replyCount: number;
  createdAt: Timestamp;
  updatedAt: Timestamp;
  isArchived: boolean;
}
```

**2. Forum Replies Collection (`forum_replies`)**
```typescript
interface ForumReply {
  id: string;
  postId: string;
  parentReplyId?: string; // For nested replies
  authorId: string;
  authorName: string;
  authorAvatar?: string;
  content: string;
  likeCount: number;
  createdAt: Timestamp;
  depth: number; // 0-2 for max 3 levels
}
```


**3. Forum Likes Collection (`forum_likes`)**
```typescript
interface ForumLike {
  id: string;
  userId: string;
  targetId: string; // postId or replyId
  targetType: "post" | "reply";
  createdAt: Timestamp;
}
```

**4. Diary Entries Collection (`diary_entries`)**
```typescript
interface DiaryEntry {
  id: string;
  userId: string;
  content: string;
  encryptedContent?: string; // When locked
  mood: "joy" | "sorrow" | "calm" | "unrest";
  isLocked: boolean;
  aiReflection?: string;
  createdAt: Timestamp;
  updatedAt: Timestamp;
}
```

**5. User Profiles Collection (existing, extended)**
```typescript
interface UserProfile {
  uid: string;
  email: string;
  displayName: string;
  photoURL?: string;
  bio?: string;
  createdAt: any;
  isAuthor: boolean;
  // New fields
  forumPostCount?: number;
  diaryEntryCount?: number;
  totalLikesReceived?: number;
}
```

#### Firestore Security Rules

```javascript
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    // Forum posts - public read, authenticated write
    match /forum_posts/{postId} {
      allow read: if true;
      allow create: if request.auth != null;
      allow update, delete: if request.auth.uid == resource.data.authorId;
    }
    
    // Forum replies - public read, authenticated write
    match /forum_replies/{replyId} {
      allow read: if true;
      allow create: if request.auth != null;
      allow update, delete: if request.auth.uid == resource.data.authorId;
    }
    
    // Forum likes - authenticated users only
    match /forum_likes/{likeId} {
      allow read: if request.auth != null;
      allow create: if request.auth != null && request.auth.uid == request.resource.data.userId;
      allow delete: if request.auth.uid == resource.data.userId;
    }
    
    // Diary entries - private, user-specific
    match /diary_entries/{entryId} {
      allow read, write: if request.auth != null && request.auth.uid == resource.data.userId;
    }
  }
}
```


### State Management Strategy

**Custom Hooks Pattern** (following existing codebase conventions):

1. `useForumPosts()` - Fetch and manage forum posts with pagination
2. `useForumPost(postId)` - Fetch single post with replies
3. `useForumLikes()` - Manage like/unlike actions
4. `useDiaryEntries()` - Fetch user's diary entries
5. `useDiaryEntry(entryId)` - Fetch and manage single entry
6. `useAIReflection()` - Generate AI summaries via Gemini API

**Example Hook Structure**:
```typescript
export const useForumPosts = (filters?: ForumFilters) => {
  const [posts, setPosts] = useState<ForumPost[]>([]);
  const [loading, setLoading] = useState(true);
  const [hasMore, setHasMore] = useState(true);
  const [lastDoc, setLastDoc] = useState<DocumentSnapshot | null>(null);

  const loadPosts = async () => {
    // Firestore query with pagination
  };

  const createPost = async (data: CreatePostData) => {
    // Create new post
  };

  return { posts, loading, hasMore, loadPosts, createPost };
};
```

## Components and Interfaces

### The Gilded Parlour (Forum)

#### 1. GildedParlour Page Component

**Location**: `src/pages/GildedParlour.tsx`

**Responsibilities**:
- Render forum landing with background image
- Display ForumList component
- Handle navigation to post detail view
- Manage filter state

**Props**:
```typescript
interface GildedParlourProps extends NavigationProps {
  postId?: string; // Optional for direct post navigation
}
```

**Key Features**:
- Regency parlour background with parallax effect
- Gold-trimmed header with "The Gilded Parlour" title
- Subtitle: "Dearest reader, the whispers await."
- Filter tags for genres
- Pagination controls


#### 2. ForumList Component

**Location**: `src/components/forum/ForumList.tsx`

**Responsibilities**:
- Display grid of post preview cards
- Handle infinite scroll or pagination
- Show loading states with "The candles gossip..." message

**Styling**:
```typescript
// Post card styling
<div className="bg-[#2a2b31] border border-[#b89b3e]/40 rounded-xl 
     shadow-[0_0_40px_-10px_rgba(184,155,62,0.3)] 
     hover:shadow-[0_0_25px_-8px_rgba(184,155,62,0.6)] 
     transition-all duration-300 p-6 cursor-pointer">
  <h3 className="font-playfair text-xl text-[#b89b3e] mb-2">{title}</h3>
  <p className="text-[#d8cfc5]/70 text-sm line-clamp-3">{excerpt}</p>
  <div className="flex items-center gap-4 mt-4 text-xs text-[#b89b3e]/60">
    <span>🕯️ {likeCount}</span>
    <span>💬 {replyCount}</span>
  </div>
</div>
```

#### 3. PostView Component

**Location**: `src/components/forum/PostView.tsx`

**Responsibilities**:
- Display full post content in letter layout
- Show author information with cameo avatar
- Render CandleLike component
- Display ReplySection below

**Layout**:
- Wax seal header decoration
- Ornate border with gold accents
- Author signature at bottom
- "Leave an Echo" reply button

#### 4. CreateWhisperModal Component

**Location**: `src/components/forum/CreateWhisperModal.tsx`

**Responsibilities**:
- Modal form for creating new posts
- Title, content, and tag selection
- Wax seal animation on submit
- Form validation

**Animation Sequence**:
1. Modal slides up with fade
2. Form fields appear with stagger
3. On submit: wax seal melts (Lottie or CSS animation)
4. Success message: "The candles gossip..."
5. Modal closes with fade


#### 5. ReplySection Component

**Location**: `src/components/forum/ReplySection.tsx`

**Responsibilities**:
- Display nested reply threads (max 3 levels)
- Handle reply creation
- Show reply count and expand/collapse

**Nested Reply Structure**:
```typescript
interface ReplyNode {
  reply: ForumReply;
  children: ReplyNode[];
}

// Recursive rendering with indentation
const renderReply = (node: ReplyNode, depth: number) => (
  <div style={{ marginLeft: `${depth * 24}px` }}>
    <ReplyCard reply={node.reply} />
    {node.children.map(child => renderReply(child, depth + 1))}
  </div>
);
```

#### 6. CandleLike Component

**Location**: `src/components/forum/CandleLike.tsx`

**Responsibilities**:
- Display candle icon with like count
- Handle like/unlike toggle
- Animate brightness on interaction

**Animation**:
```typescript
<motion.button
  whileTap={{ scale: 0.95 }}
  onClick={handleLike}
  className="flex items-center gap-2"
>
  <motion.div
    animate={{ 
      filter: isLiked 
        ? `brightness(1.5) drop-shadow(0 0 8px rgba(184,155,62,0.8))` 
        : `brightness(1)` 
    }}
    transition={{ duration: 0.3 }}
  >
    🕯️
  </motion.div>
  <span className={`text-sm ${isLiked ? 'text-[#b89b3e]' : 'text-[#d8cfc5]/60'}`}>
    {likeCount}
  </span>
</motion.button>
```

### The Dollhouse (Diary)

#### 7. Dollhouse Page Component

**Location**: `src/pages/Dollhouse.tsx`

**Responsibilities**:
- Render diary landing with dollhouse background
- Display DiaryGrid component
- Handle navigation to entry detail view
- Manage timeline/calendar state

**Props**:
```typescript
interface DollhouseProps extends NavigationProps {
  entryId?: string; // Optional for direct entry navigation
}
```


**Key Features**:
- Dollhouse interior background with subtle parallax
- Pastel rose (#f3c9d1) base color
- Title in Parisienne font: "The Dollhouse"
- Subtitle: "A secret too sweet to tell."
- Porcelain heart button for new entries
- Timeline navigation

#### 8. DiaryGrid Component

**Location**: `src/components/diary/DiaryGrid.tsx`

**Responsibilities**:
- Display grid of diary entry cards styled as drawers/envelopes
- Show mood ribbon indicators
- Handle entry selection
- Display locked/unlocked states

**Styling**:
```typescript
<div className="bg-[#fffaf9]/70 backdrop-blur-sm border-4 border-[#fffaf9] 
     rounded-2xl shadow-[inset_0_0_40px_-10px_rgba(0,0,0,0.3)] 
     p-4 cursor-pointer hover:scale-105 transition-transform">
  <div className="flex items-center justify-between mb-2">
    <span className="text-xs text-[#3a2f2f]/60">{date}</span>
    {isLocked && <span>🔒</span>}
  </div>
  <div className={`h-2 w-full rounded-full bg-${moodColor}`} />
  <p className="text-sm text-[#2a2b31] mt-2 line-clamp-2">{excerpt}</p>
</div>
```

#### 9. DiaryEntryView Component

**Location**: `src/components/diary/DiaryEntryView.tsx`

**Responsibilities**:
- Display full entry content
- Show mood ribbon
- Render lock/unlock toggle
- Display AI reflection if available
- Handle entry editing

**Layout**:
- Wax seal opening animation on mount
- Lace border decoration
- Mood ribbon at top
- Lock toggle at bottom
- Optional AI reflection card


#### 10. CreateConfessionModal Component

**Location**: `src/components/diary/CreateConfessionModal.tsx`

**Responsibilities**:
- Modal form for creating diary entries
- Content textarea with character count
- RibbonPicker for mood selection
- Privacy toggle (locked by default)

**Form Fields**:
```typescript
interface ConfessionFormData {
  content: string;
  mood: "joy" | "sorrow" | "calm" | "unrest";
  isLocked: boolean;
  enableAI: boolean; // Optional AI reflection
}
```

#### 11. RibbonPicker Component

**Location**: `src/components/diary/RibbonPicker.tsx`

**Responsibilities**:
- Display 4 mood options as colored ribbons
- Handle mood selection
- Animate selection with ribbon unfurling

**Mood Colors**:
```typescript
const moodColors = {
  joy: "#ffd700",      // Gold
  sorrow: "#6b7280",   // Gray
  calm: "#93c5fd",     // Light blue
  unrest: "#a53e3e",   // Crimson
};
```

**Styling**:
```typescript
<div className="flex gap-4 justify-center">
  {moods.map(mood => (
    <motion.button
      key={mood}
      whileHover={{ scale: 1.1 }}
      whileTap={{ scale: 0.95 }}
      onClick={() => onSelect(mood)}
      className={`w-16 h-24 rounded-lg border-2 transition-all
        ${selected === mood 
          ? 'border-[#a53e3e] shadow-lg' 
          : 'border-[#d8cfc5]/30'}`}
      style={{ backgroundColor: moodColors[mood] }}
    >
      <span className="text-xs font-parisienne">{mood}</span>
    </motion.button>
  ))}
</div>
```


#### 12. DiaryTimeline Component

**Location**: `src/components/diary/DiaryTimeline.tsx`

**Responsibilities**:
- Display clock-hand UI for date navigation
- Highlight dates with entries
- Filter entries by selected date range

**Implementation**:
- SVG clock face with interactive hand
- Date markers around perimeter
- Smooth rotation animation
- Touch/drag support for mobile

#### 13. LockSeal Component

**Location**: `src/components/diary/LockSeal.tsx`

**Responsibilities**:
- Toggle entry lock state
- Animate wax melting/sealing
- Handle encryption/decryption

**Animation Sequence**:
- Locked → Unlocked: Wax melts with drip effect
- Unlocked → Locked: Wax pours and solidifies

### Shared Components

#### 14. UserCameo Component

**Location**: `src/components/shared/UserCameo.tsx`

**Responsibilities**:
- Display user avatar in circular frame
- Show silhouette if no avatar
- Handle click to view profile

**Styling**:
```typescript
<div className="relative w-12 h-12 rounded-full border-2 border-[#b89b3e] 
     overflow-hidden bg-[#1a1c24]">
  {photoURL ? (
    <img src={photoURL} alt={displayName} className="w-full h-full object-cover" />
  ) : (
    <div className="w-full h-full flex items-center justify-center">
      <span className="text-[#b89b3e] text-xl">👤</span>
    </div>
  )}
</div>
```


## Data Models

### TypeScript Interfaces

**Location**: `src/types/forum.ts`

```typescript
export interface ForumPost {
  id: string;
  authorId: string;
  authorName: string;
  authorAvatar?: string;
  title: string;
  content: string;
  tags: string[];
  likeCount: number;
  replyCount: number;
  createdAt: Date;
  updatedAt: Date;
  isArchived: boolean;
}

export interface ForumReply {
  id: string;
  postId: string;
  parentReplyId?: string;
  authorId: string;
  authorName: string;
  authorAvatar?: string;
  content: string;
  likeCount: number;
  createdAt: Date;
  depth: number;
}

export interface ForumLike {
  id: string;
  userId: string;
  targetId: string;
  targetType: "post" | "reply";
  createdAt: Date;
}

export interface ForumFilters {
  tags?: string[];
  sortBy?: "recent" | "popular" | "replies";
  searchQuery?: string;
}

export interface CreatePostData {
  title: string;
  content: string;
  tags: string[];
}

export interface CreateReplyData {
  postId: string;
  parentReplyId?: string;
  content: string;
}
```

**Location**: `src/types/diary.ts`

```typescript
export type DiaryMood = "joy" | "sorrow" | "calm" | "unrest";

export interface DiaryEntry {
  id: string;
  userId: string;
  content: string;
  encryptedContent?: string;
  mood: DiaryMood;
  isLocked: boolean;
  aiReflection?: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface CreateEntryData {
  content: string;
  mood: DiaryMood;
  isLocked: boolean;
  enableAI: boolean;
}

export interface DiaryFilters {
  dateRange?: { start: Date; end: Date };
  mood?: DiaryMood;
}
```


## Error Handling

### Forum Error Scenarios

1. **Post Creation Failure**
   - Display toast: "The whisper faded into darkness. Please try again."
   - Log error to console
   - Preserve form data for retry

2. **Post Loading Failure**
   - Show skeleton cards with error message
   - Provide retry button
   - Fallback: "The parlour is silent. Please refresh."

3. **Like Action Failure**
   - Optimistic UI update with rollback on error
   - Silent retry (max 2 attempts)
   - Toast on persistent failure: "The candle refuses to light."

4. **Reply Submission Failure**
   - Preserve reply content
   - Show inline error message
   - Retry button below reply form

### Diary Error Scenarios

1. **Entry Creation Failure**
   - Display toast: "The dolls couldn't hear you. Please try again."
   - Preserve entry content in localStorage
   - Auto-restore on modal reopen

2. **Entry Loading Failure**
   - Show empty state with error message
   - Provide refresh button
   - Fallback: "The dollhouse is empty."

3. **Lock/Unlock Failure**
   - Revert lock state immediately
   - Toast: "The seal won't budge. Please try again."
   - Disable toggle during retry

4. **AI Reflection Failure**
   - Show placeholder: "The dolls are silent today."
   - Provide manual retry button
   - Cache successful responses

### Global Error Handling

```typescript
// src/utils/errorHandler.ts
export const handleFirestoreError = (error: any, context: string) => {
  console.error(`[${context}]`, error);
  
  const errorMessages: Record<string, string> = {
    'permission-denied': 'You don\'t have permission to do that.',
    'not-found': 'The content has vanished into the shadows.',
    'already-exists': 'This already exists in the archives.',
    'unauthenticated': 'Please sign in to continue.',
  };
  
  return errorMessages[error.code] || 'Something went wrong. Please try again.';
};
```


## Testing Strategy

### Unit Tests

**Forum Components**:
- `CandleLike.test.tsx`: Like/unlike toggle, count display, animation states
- `ReplySection.test.tsx`: Nested reply rendering, depth limits, collapse/expand
- `ForumFilters.test.tsx`: Tag filtering, search, sort options

**Diary Components**:
- `RibbonPicker.test.tsx`: Mood selection, visual feedback
- `LockSeal.test.tsx`: Lock/unlock toggle, animation triggers
- `DiaryTimeline.test.tsx`: Date navigation, entry filtering

**Custom Hooks**:
- `useForumPosts.test.ts`: Pagination, filtering, post creation
- `useDiaryEntries.test.ts`: Entry CRUD operations, encryption
- `useForumLikes.test.ts`: Like/unlike actions, optimistic updates

### Integration Tests

1. **Forum Flow**:
   - User creates post → Post appears in list → User likes post → Like count updates
   - User views post → User replies → Reply appears nested → User likes reply

2. **Diary Flow**:
   - User creates entry → Entry appears in grid → User locks entry → Content encrypted
   - User unlocks entry → Content decrypted → User edits entry → Changes saved

3. **Cross-Navigation**:
   - User in forum → Clicks "Keep a Private Reflection" → Navigates to diary
   - User in diary → Clicks "Share to Parlour" → Entry converts to post draft

### E2E Tests (Optional)

- Complete user journey: Sign up → Create post → Reply to post → Create diary entry
- Performance: Load 100 posts, measure render time
- Accessibility: Keyboard navigation, screen reader compatibility

### Testing Tools

- **Unit/Integration**: Vitest + React Testing Library
- **E2E**: Playwright (optional)
- **Visual Regression**: Percy or Chromatic (optional)


## Performance Optimizations

### Forum Optimizations

1. **Pagination**:
   - Load 12 posts per page
   - Implement cursor-based pagination with Firestore `startAfter()`
   - Prefetch next page on scroll to 80% of current page

2. **Reply Loading**:
   - Lazy load replies (show "Load replies" button)
   - Limit initial render to top 5 replies
   - Collapse deeply nested threads by default

3. **Image Optimization**:
   - Use Firebase Storage for user avatars
   - Implement lazy loading for avatar images
   - Generate thumbnails (64x64) for cameo displays

4. **Caching**:
   - Cache post list in React Query or SWR
   - Implement stale-while-revalidate pattern
   - Cache user profiles to avoid redundant fetches

### Diary Optimizations

1. **Entry Loading**:
   - Load entries in batches of 20
   - Implement virtual scrolling for large entry lists
   - Index by date for efficient timeline queries

2. **Encryption**:
   - Use Web Crypto API for client-side encryption
   - Cache decryption keys in session storage
   - Encrypt/decrypt only when lock state changes

3. **AI Reflection**:
   - Debounce AI requests (wait 2s after typing stops)
   - Cache responses in Firestore to avoid redundant API calls
   - Implement request queue to prevent rate limiting

### General Optimizations

1. **Code Splitting**:
   - Lazy load forum and diary pages
   - Split large components (modals, timeline)
   - Use React.lazy() and Suspense

2. **Animation Performance**:
   - Use CSS transforms for animations (GPU-accelerated)
   - Implement `will-change` for frequently animated elements
   - Reduce motion for users with `prefers-reduced-motion`

3. **Bundle Size**:
   - Tree-shake unused Framer Motion components
   - Use dynamic imports for heavy libraries
   - Optimize font loading with `font-display: swap`


## Security Considerations

### Forum Security

1. **Content Moderation**:
   - Implement profanity filter for post/reply content
   - Add report functionality for inappropriate content
   - Admin dashboard for content review (future feature)

2. **Rate Limiting**:
   - Limit post creation to 5 per hour per user
   - Limit replies to 20 per hour per user
   - Implement client-side throttling with cooldown timers

3. **XSS Prevention**:
   - Sanitize all user-generated content with DOMPurify
   - Escape HTML in post/reply content
   - Use `dangerouslySetInnerHTML` only for sanitized content

4. **Spam Prevention**:
   - Implement honeypot field in forms
   - Require email verification for posting
   - Track user behavior patterns (future feature)

### Diary Security

1. **Encryption**:
   - Use AES-256-GCM for entry encryption
   - Derive encryption key from user password + salt
   - Store only encrypted content in Firestore when locked

2. **Access Control**:
   - Enforce user-specific queries with Firestore rules
   - Validate userId on all diary operations
   - Prevent cross-user data access

3. **Data Privacy**:
   - Never send locked entries to AI API
   - Implement data retention policy (user-controlled)
   - Provide export and delete functionality

### AI Integration Security

1. **API Key Protection**:
   - Store Gemini API key in environment variables
   - Use Cloud Functions to proxy AI requests
   - Never expose API key to client

2. **Content Filtering**:
   - Validate entry content before sending to AI
   - Implement content length limits (max 5000 chars)
   - Filter sensitive information (emails, phone numbers)

3. **Rate Limiting**:
   - Limit AI requests to 10 per day per user
   - Implement exponential backoff on failures
   - Cache responses to reduce API calls


## Accessibility

### WCAG 2.1 AA Compliance

1. **Color Contrast**:
   - Ensure 4.5:1 contrast ratio for body text
   - Use 3:1 for large text (18pt+)
   - Test with WebAIM Contrast Checker

2. **Keyboard Navigation**:
   - All interactive elements accessible via Tab
   - Implement focus indicators (gold outline)
   - Support Escape to close modals
   - Arrow keys for timeline navigation

3. **Screen Reader Support**:
   - Add ARIA labels to all interactive elements
   - Use semantic HTML (nav, main, article, aside)
   - Announce dynamic content changes with aria-live

4. **Focus Management**:
   - Trap focus within modals
   - Return focus to trigger element on modal close
   - Skip navigation link for keyboard users

### Specific Implementations

**Forum**:
```typescript
<button
  aria-label={`Like post by ${authorName}`}
  aria-pressed={isLiked}
  onClick={handleLike}
>
  <span aria-hidden="true">🕯️</span>
  <span className="sr-only">{likeCount} likes</span>
</button>
```

**Diary**:
```typescript
<button
  aria-label={isLocked ? "Unlock entry" : "Lock entry"}
  aria-pressed={isLocked}
  onClick={toggleLock}
>
  <span aria-hidden="true">{isLocked ? "🔒" : "🔓"}</span>
</button>
```

**Timeline**:
```typescript
<div
  role="slider"
  aria-label="Select date"
  aria-valuemin={minDate}
  aria-valuemax={maxDate}
  aria-valuenow={selectedDate}
  tabIndex={0}
  onKeyDown={handleKeyboardNavigation}
>
  {/* Clock hand UI */}
</div>
```


## Responsive Design

### Breakpoints

```typescript
// tailwind.config.js
module.exports = {
  theme: {
    screens: {
      'sm': '640px',   // Mobile landscape
      'md': '768px',   // Tablet
      'lg': '1024px',  // Desktop
      'xl': '1280px',  // Large desktop
    }
  }
}
```

### Layout Adaptations

**Forum Grid**:
- Mobile (< 640px): 1 column
- Tablet (640-1024px): 2 columns
- Desktop (> 1024px): 3 columns

**Diary Grid**:
- Mobile (< 640px): 1 column
- Tablet (640-1024px): 2 columns
- Desktop (> 1024px): 4 columns

**Modals**:
- Mobile: Full-screen overlay
- Tablet/Desktop: Centered modal (max-width: 600px)

**Typography**:
- Mobile: Base font 14px, headings scale down 20%
- Tablet: Base font 15px, headings scale down 10%
- Desktop: Base font 16px, full heading sizes

### Touch Interactions

1. **Swipe Gestures**:
   - Swipe left/right on post cards to navigate
   - Swipe down to close modals
   - Implement with Framer Motion drag constraints

2. **Touch Targets**:
   - Minimum 44x44px for all buttons
   - Increase padding on mobile for easier tapping
   - Add visual feedback on touch (scale animation)

3. **Mobile-Specific Features**:
   - Pull-to-refresh on forum/diary lists
   - Bottom sheet modals instead of centered
   - Sticky "Create" button at bottom right


## Animation Specifications

### Framer Motion Variants

**Page Transitions**:
```typescript
export const pageVariants = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0, transition: { duration: 0.4 } },
  exit: { opacity: 0, y: -20, transition: { duration: 0.3 } }
};
```

**Modal Animations**:
```typescript
export const modalVariants = {
  hidden: { opacity: 0, scale: 0.95, y: 20 },
  visible: { 
    opacity: 1, 
    scale: 1, 
    y: 0,
    transition: { type: "spring", damping: 25, stiffness: 300 }
  },
  exit: { 
    opacity: 0, 
    scale: 0.95, 
    y: 20,
    transition: { duration: 0.2 }
  }
};
```

**Wax Seal Animation**:
```typescript
export const waxSealVariants = {
  sealed: { 
    scale: 1, 
    rotate: 0,
    filter: "brightness(1)"
  },
  melting: { 
    scale: [1, 1.1, 0.9, 0],
    rotate: [0, 5, -5, 0],
    filter: ["brightness(1)", "brightness(1.2)", "brightness(0.8)", "brightness(0)"],
    transition: { duration: 1.5, times: [0, 0.3, 0.7, 1] }
  }
};
```

**Candle Glow Animation**:
```typescript
export const candleGlowVariants = {
  idle: { 
    filter: "brightness(1) drop-shadow(0 0 4px rgba(184,155,62,0.3))",
    transition: { duration: 2, repeat: Infinity, repeatType: "reverse" }
  },
  active: { 
    filter: "brightness(1.5) drop-shadow(0 0 12px rgba(184,155,62,0.8))",
    transition: { duration: 0.3 }
  }
};
```

**Stagger Children**:
```typescript
export const staggerContainer = {
  animate: {
    transition: {
      staggerChildren: 0.1
    }
  }
};

export const staggerItem = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 }
};
```

### CSS Animations

**Cursor Shadow Effect**:
```css
.cursor-shadow {
  position: fixed;
  width: 40px;
  height: 40px;
  border-radius: 50%;
  background: radial-gradient(circle, rgba(184,155,62,0.3) 0%, transparent 70%);
  pointer-events: none;
  z-index: 9999;
  transition: transform 0.1s ease-out;
}
```

**Parallax Background**:
```css
.parallax-bg {
  background-attachment: fixed;
  background-size: cover;
  background-position: center;
  will-change: transform;
}
```


## Typography System

### Font Loading

**Location**: `src/index.css`

```css
/* Headings - Playfair Display */
@import url('https://fonts.googleapis.com/css2?family=Playfair+Display:wght@400;600;700&display=swap');

/* Headings Alternative - Cormorant Garamond */
@import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:wght@400;600;700&display=swap');

/* Body - Inter */
@import url('https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600&display=swap');

/* Body Alternative - Lora */
@import url('https://fonts.googleapis.com/css2?family=Lora:wght@400;500;600&display=swap');

/* Decorative - Parisienne */
@import url('https://fonts.googleapis.com/css2?family=Parisienne&display=swap');

/* Decorative Alternative - Petit Formal Script */
@import url('https://fonts.googleapis.com/css2?family=Petit+Formal+Script&display=swap');
```

### Tailwind Configuration

**Location**: `tailwind.config.js`

```javascript
module.exports = {
  theme: {
    extend: {
      fontFamily: {
        playfair: ['Playfair Display', 'serif'],
        cormorant: ['Cormorant Garamond', 'serif'],
        inter: ['Inter', 'sans-serif'],
        lora: ['Lora', 'serif'],
        parisienne: ['Parisienne', 'cursive'],
        petit: ['Petit Formal Script', 'cursive'],
      },
      colors: {
        'velvet-black': '#0b0a0a',
        'candle-gold': '#b89b3e',
        'bone-white': '#f5f5f5',
        'crimson': '#a53e3e',
        'navy-depth': '#1a1c24',
        'pastel-rose': '#f3c9d1',
        'charcoal-shadow': '#141414',
        'parchment': '#2a2b31',
        'ivory': '#fffaf9',
      }
    }
  }
}
```

### Typography Scale

**Forum (Gilded Parlour)**:
- Page Title: `font-playfair text-4xl md:text-5xl text-candle-gold`
- Post Title: `font-playfair text-xl md:text-2xl text-candle-gold`
- Body Text: `font-lora text-base text-bone-white/90`
- Labels: `font-inter text-sm text-candle-gold/60`

**Diary (Dollhouse)**:
- Page Title: `font-parisienne text-3xl md:text-4xl text-crimson`
- Entry Title: `font-parisienne text-xl md:text-2xl text-crimson`
- Body Text: `font-lora text-base text-[#2a2b31]`
- Labels: `font-inter text-xs text-[#3a2f2f]/60`


## AI Integration (Gemini API)

### Architecture

**Cloud Function**: `functions/src/generateReflection.ts`

```typescript
import { onCall } from "firebase-functions/v2/https";
import { GoogleGenerativeAI } from "@google/generative-ai";

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY!);

export const generateReflection = onCall(async (request) => {
  const { entryContent, userId } = request.data;
  
  // Validate user authentication
  if (!request.auth) {
    throw new Error("Unauthenticated");
  }
  
  // Rate limiting check (implement with Firestore counter)
  const dailyCount = await checkDailyUsage(userId);
  if (dailyCount >= 10) {
    throw new Error("Daily limit reached");
  }
  
  // Generate reflection
  const model = genAI.getGenerativeModel({ model: "gemini-pro" });
  const prompt = `You are a Victorian-era doll observing a diary entry. 
    Provide a brief, poetic emotional reflection (max 50 words) in the style of:
    "The dolls sense [emotion]..."
    
    Entry: ${entryContent}`;
  
  const result = await model.generateContent(prompt);
  const reflection = result.response.text();
  
  // Increment usage counter
  await incrementDailyUsage(userId);
  
  return { reflection };
});
```

### Client-Side Hook

**Location**: `src/hooks/useAIReflection.ts`

```typescript
import { useState } from 'react';
import { httpsCallable } from 'firebase/functions';
import { functions } from '../lib/firebase';

export const useAIReflection = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const generateReflection = async (entryContent: string) => {
    setLoading(true);
    setError(null);
    
    try {
      const callable = httpsCallable(functions, 'generateReflection');
      const result = await callable({ entryContent });
      return result.data.reflection;
    } catch (err: any) {
      setError(err.message || 'Failed to generate reflection');
      return null;
    } finally {
      setLoading(false);
    }
  };

  return { generateReflection, loading, error };
};
```

### Caching Strategy

- Cache reflections in Firestore `diary_entries` collection
- Only regenerate if entry content changes significantly (> 30% edit)
- Implement client-side cache with 24-hour TTL


## Background Image Generation

### Image Specifications

**Gilded Parlour Background**:
- Dimensions: 1920x1080 (16:9)
- Format: WebP with JPEG fallback
- File size: < 500KB (optimized)
- Placement: `public/images/gilded-parlour-bg.webp`

**Dollhouse Background**:
- Dimensions: 1920x1080 (16:9)
- Format: WebP with JPEG fallback
- File size: < 500KB (optimized)
- Placement: `public/images/dollhouse-bg.webp`

### Generation Prompts (for AI image tools)

**Gilded Parlour**:
```
A hauntingly elegant Regency-era parlour with ornate wallpaper, gold chandeliers, 
velvet drapes, and flickering candlelight. The scene feels opulent but subtly decayed: 
cracks in plaster, faded portraits with eyes that seem to follow you. The atmosphere 
combines Bridgerton luxury with gothic unease. Lighting is warm candle-gold and shadowed 
indigo. The perspective shows a grand sitting room where invisible guests whisper, 
cinematic composition, digital painting style, 16:9, hyper-detailed textures, 
cohesive with dark storytelling UI.
```

**Dollhouse**:
```
A vintage dollhouse interior viewed from above, pastel pink and ivory walls, lace curtains, 
miniature wooden furniture, and porcelain dolls arranged perfectly. One doll's face is cracked, 
and faint shadows move subtly under the furniture. The atmosphere is cute but eerie, Victorian 
meets horror, cinematic soft light, dust motes floating. The scene feels intimate, feminine, 
and slightly uncanny. Perfect for a writing app background, cohesive with haunted UI design.
```

### Implementation

```typescript
// src/components/BackgroundImage.tsx
interface BackgroundImageProps {
  src: string;
  alt: string;
  parallax?: boolean;
}

export const BackgroundImage: React.FC<BackgroundImageProps> = ({ 
  src, 
  alt, 
  parallax = false 
}) => {
  return (
    <div className="fixed inset-0 -z-10 overflow-hidden">
      <picture>
        <source srcSet={`${src}.webp`} type="image/webp" />
        <img
          src={`${src}.jpg`}
          alt={alt}
          className={`w-full h-full object-cover ${parallax ? 'parallax-bg' : ''}`}
          loading="eager"
        />
      </picture>
      <div className="absolute inset-0 bg-gradient-to-b from-black/60 to-black/80" />
    </div>
  );
};
```


## Cross-Page Navigation

### Navigation Links

**Forum → Diary**:
- Location: End of forum post view
- Label: "Keep a Private Reflection"
- Styling: Subtle link with diary icon
- Behavior: Fade transition to diary page

**Diary → Forum**:
- Location: Diary entry view (when unlocked)
- Label: "Share this story to the Parlour"
- Styling: Button with forum icon
- Behavior: Opens CreateWhisperModal with pre-filled content

### Implementation

**Location**: `src/components/CrossNavigation.tsx`

```typescript
interface CrossNavProps {
  type: "forum-to-diary" | "diary-to-forum";
  content?: string; // For diary-to-forum conversion
  go: (page: Page) => void;
}

export const CrossNavigation: React.FC<CrossNavProps> = ({ type, content, go }) => {
  const handleDiaryToForum = () => {
    // Store content in localStorage for draft
    if (content) {
      localStorage.setItem('forum_draft', JSON.stringify({
        content,
        source: 'diary',
        timestamp: Date.now()
      }));
    }
    go('forum');
  };

  if (type === 'forum-to-diary') {
    return (
      <motion.button
        whileHover={{ scale: 1.02 }}
        onClick={() => go('diary')}
        className="flex items-center gap-2 text-sm text-pastel-rose/70 
                   hover:text-pastel-rose transition-colors"
      >
        <span>📖</span>
        <span className="font-parisienne">Keep a Private Reflection</span>
      </motion.button>
    );
  }

  return (
    <motion.button
      whileHover={{ scale: 1.02 }}
      onClick={handleDiaryToForum}
      className="flex items-center gap-2 px-4 py-2 rounded-lg 
                 bg-candle-gold/10 border border-candle-gold/30 
                 text-candle-gold hover:bg-candle-gold/20 transition-colors"
    >
      <span>🕯️</span>
      <span className="font-inter text-sm">Share this story to the Parlour</span>
    </motion.button>
  );
};
```

### Draft Management

**Location**: `src/utils/draftManager.ts`

```typescript
interface ForumDraft {
  content: string;
  source: 'diary' | 'manual';
  timestamp: number;
}

export const saveDraft = (draft: ForumDraft) => {
  localStorage.setItem('forum_draft', JSON.stringify(draft));
};

export const loadDraft = (): ForumDraft | null => {
  const stored = localStorage.getItem('forum_draft');
  if (!stored) return null;
  
  const draft = JSON.parse(stored);
  // Expire drafts older than 24 hours
  if (Date.now() - draft.timestamp > 86400000) {
    clearDraft();
    return null;
  }
  
  return draft;
};

export const clearDraft = () => {
  localStorage.removeItem('forum_draft');
};
```


## Deployment Considerations

### Environment Variables

**Location**: `.env.example`

```bash
# Existing Firebase config
VITE_FIREBASE_API_KEY=your_api_key
VITE_FIREBASE_AUTH_DOMAIN=your_auth_domain
VITE_FIREBASE_PROJECT_ID=your_project_id
VITE_FIREBASE_STORAGE_BUCKET=your_storage_bucket
VITE_FIREBASE_MESSAGING_SENDER_ID=your_sender_id
VITE_FIREBASE_APP_ID=your_app_id

# New: Gemini API (server-side only)
GEMINI_API_KEY=your_gemini_api_key

# Optional: Feature flags
VITE_ENABLE_AI_REFLECTION=true
VITE_ENABLE_FORUM=true
VITE_ENABLE_DIARY=true
```

### Build Configuration

**Location**: `vite.config.ts`

```typescript
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  build: {
    rollupOptions: {
      output: {
        manualChunks: {
          'vendor': ['react', 'react-dom'],
          'firebase': ['firebase/app', 'firebase/auth', 'firebase/firestore'],
          'animation': ['framer-motion'],
          'forum': ['./src/pages/GildedParlour.tsx', './src/components/forum'],
          'diary': ['./src/pages/Dollhouse.tsx', './src/components/diary'],
        }
      }
    }
  }
});
```

### Firebase Indexes

**Location**: `firestore.indexes.json`

```json
{
  "indexes": [
    {
      "collectionGroup": "forum_posts",
      "queryScope": "COLLECTION",
      "fields": [
        { "fieldPath": "tags", "arrayConfig": "CONTAINS" },
        { "fieldPath": "createdAt", "order": "DESCENDING" }
      ]
    },
    {
      "collectionGroup": "forum_posts",
      "queryScope": "COLLECTION",
      "fields": [
        { "fieldPath": "likeCount", "order": "DESCENDING" },
        { "fieldPath": "createdAt", "order": "DESCENDING" }
      ]
    },
    {
      "collectionGroup": "forum_replies",
      "queryScope": "COLLECTION",
      "fields": [
        { "fieldPath": "postId", "order": "ASCENDING" },
        { "fieldPath": "createdAt", "order": "ASCENDING" }
      ]
    },
    {
      "collectionGroup": "diary_entries",
      "queryScope": "COLLECTION",
      "fields": [
        { "fieldPath": "userId", "order": "ASCENDING" },
        { "fieldPath": "createdAt", "order": "DESCENDING" }
      ]
    }
  ]
}
```

### Monitoring and Analytics

1. **Firebase Analytics**:
   - Track page views (forum, diary)
   - Track user actions (post creation, likes, diary entries)
   - Monitor AI reflection usage

2. **Performance Monitoring**:
   - Track page load times
   - Monitor Firestore query performance
   - Alert on slow AI API responses

3. **Error Tracking**:
   - Implement Sentry or Firebase Crashlytics
   - Log client-side errors with context
   - Monitor Cloud Function errors


## Future Enhancements

### Phase 2 Features (Post-MVP)

1. **Forum Enhancements**:
   - User mentions (@username)
   - Rich text editor with formatting
   - Image attachments in posts
   - Bookmarking/saving posts
   - User reputation system
   - Moderator tools and admin dashboard

2. **Diary Enhancements**:
   - Voice-to-text entry creation
   - Mood analytics dashboard
   - Entry templates (prompts)
   - Collaborative diaries (shared with friends)
   - Export to PDF with custom styling
   - Integration with calendar apps

3. **AI Features**:
   - Sentiment analysis trends over time
   - Writing style suggestions
   - Story idea generation from diary entries
   - Character development insights
   - Automated tagging and categorization

4. **Social Features**:
   - Follow other users
   - Private messaging
   - Notifications for replies and likes
   - User profiles with bio and stats
   - Achievement badges

5. **Monetization** (Optional):
   - Premium tier with unlimited AI reflections
   - Custom themes and fonts
   - Advanced analytics
   - Priority support

### Technical Debt to Address

1. **Testing Coverage**:
   - Increase unit test coverage to 80%
   - Add E2E tests for critical flows
   - Implement visual regression testing

2. **Performance**:
   - Implement service worker for offline support
   - Add progressive image loading
   - Optimize bundle size (target < 200KB initial load)

3. **Accessibility**:
   - Conduct full WCAG audit
   - Add keyboard shortcuts documentation
   - Implement high contrast mode

4. **Documentation**:
   - Create component storybook
   - Write API documentation
   - Add inline code comments

## Design Decisions and Rationale

### Why Firestore over REST API?

- Real-time updates for forum posts and replies
- Built-in authentication integration
- Offline support with local caching
- Scalable without server management
- Security rules for fine-grained access control

### Why Client-Side Encryption for Diary?

- User privacy and trust
- Compliance with data protection regulations
- No server-side decryption keys
- User controls their own data

### Why Framer Motion over CSS Animations?

- Declarative animation API
- Better performance with GPU acceleration
- Gesture support (drag, swipe)
- Easier to maintain complex animation sequences
- Built-in accessibility features (respects prefers-reduced-motion)

### Why Separate Pages Instead of Tabs?

- Distinct visual themes require full-page context
- Better SEO and deep linking
- Clearer mental model for users
- Easier to implement lazy loading
- Allows for future expansion (e.g., separate URLs)

## Conclusion

This design document provides a comprehensive blueprint for implementing The Gilded Parlour and The Dollhouse features. The architecture leverages existing patterns in the GRIMOIRE codebase while introducing new components and data models that support the gothic literary aesthetic. The design prioritizes user experience, performance, security, and accessibility while maintaining flexibility for future enhancements.

Key design principles:
- **Aesthetic Cohesion**: Consistent gothic theme with distinct page identities
- **Performance First**: Optimized loading, caching, and animations
- **User Privacy**: Client-side encryption and secure data handling
- **Accessibility**: WCAG 2.1 AA compliance throughout
- **Scalability**: Data models and architecture support future growth

The implementation plan (tasks.md) will break down this design into actionable coding steps.
