# Tale Threads - Architecture Diagram

## Current Implementation (What Actually Exists)

```
┌─────────────────────────────────────────────────────────────────┐
│                         USER INTERFACE                          │
├─────────────────────────────────────────────────────────────────┤
│                                                                 │
│  ┌──────────────────────────────────────────────────────────┐  │
│  │              Forum.tsx (Main Page)                       │  │
│  │  • Search bar                                            │  │
│  │  • Filter chips (genre, sort)                            │  │
│  │  • "New Post" button                                     │  │
│  │  • Thread list OR Thread detail view                     │  │
│  └──────────────────────────────────────────────────────────┘  │
│                           │                                     │
│              ┌────────────┴────────────┐                        │
│              │                         │                        │
│  ┌───────────▼──────────┐  ┌──────────▼──────────┐            │
│  │   ForumList.tsx      │  │  ThreadView.tsx     │            │
│  │  • Magazine layout   │  │  • Full thread      │            │
│  │  • Thread cards      │  │  • Author info      │            │
│  │  • Hover previews    │  │  • Like/share       │            │
│  │  • Pagination        │  │  • Edit/delete      │            │
│  └──────────────────────┘  └─────────┬───────────┘            │
│                                       │                         │
│                           ┌───────────▼───────────┐            │
│                           │  ReplySection.tsx     │            │
│                           │  • Reply form         │            │
│                           │  • Nested replies     │            │
│                           │  • Quote/like         │            │
│                           └───────────────────────┘            │
│                                                                 │
├─────────────────────────────────────────────────────────────────┤
│                      SUPPORTING COMPONENTS                      │
├─────────────────────────────────────────────────────────────────┤
│                                                                 │
│  ThreadPreview.tsx    FilterChips.tsx    CandleLike.tsx       │
│  ShareTray.tsx        ReportModal.tsx    UnifiedWritingModal  │
│                                                                 │
└─────────────────────────────────────────────────────────────────┘
                              │
                              │
┌─────────────────────────────▼─────────────────────────────────┐
│                        DATA LAYER                              │
├────────────────────────────────────────────────────────────────┤
│                                                                │
│  ┌──────────────────┐  ┌──────────────────┐  ┌─────────────┐ │
│  │ useForumPosts    │  │ useForumPost     │  │ useForumLikes│ │
│  │ • Fetch threads  │  │ • Fetch thread   │  │ • Like/unlike│ │
│  │ • Create thread  │  │ • Fetch replies  │  │ • Optimistic │ │
│  │ • Pagination     │  │ • Build tree     │  │   updates    │ │
│  │ • Caching        │  │                  │  │              │ │
│  └────────┬─────────┘  └────────┬─────────┘  └──────┬───────┘ │
│           │                     │                    │         │
│           └─────────────────────┼────────────────────┘         │
│                                 │                              │
└─────────────────────────────────┼──────────────────────────────┘
                                  │
                                  │
┌─────────────────────────────────▼──────────────────────────────┐
│                         FIREBASE                               │
├────────────────────────────────────────────────────────────────┤
│                                                                │
│  ┌──────────────────┐  ┌──────────────────┐  ┌─────────────┐ │
│  │  forum_posts     │  │  forum_replies   │  │ forum_likes │ │
│  │  • id            │  │  • id            │  │ • userId    │ │
│  │  • authorId      │  │  • threadId      │  │ • targetId  │ │
│  │  • title         │  │  • parentReplyId │  │ • targetType│ │
│  │  • content       │  │  • content       │  │ • createdAt │ │
│  │  • tags[]        │  │  • authorId      │  └─────────────┘ │
│  │  • likeCount     │  │  • likeCount     │                  │
│  │  • replyCount    │  │  • depth         │  ┌─────────────┐ │
│  │  • createdAt     │  │  • createdAt     │  │forum_reports│ │
│  └──────────────────┘  └──────────────────┘  │ • targetId  │ │
│                                               │ • reason    │ │
│                                               │ • status    │ │
│                                               └─────────────┘ │
└────────────────────────────────────────────────────────────────┘
```

---

## Data Flow: Creating a Thread

```
┌──────────┐
│  User    │
│  clicks  │
│ "New Post"│
└────┬─────┘
     │
     ▼
┌────────────────────┐
│ UnifiedWritingModal│
│ • Title input      │
│ • Content textarea │
│ • Tag selector     │
└────┬───────────────┘
     │ User submits
     ▼
┌────────────────────┐
│ useForumPosts      │
│ createPost()       │
└────┬───────────────┘
     │
     ├─► Security Check (rate limiting)
     │
     ├─► Validation (length, profanity)
     │
     ▼
┌────────────────────┐
│ Firebase           │
│ addDoc()           │
│ → forum_posts      │
└────┬───────────────┘
     │
     ▼
┌────────────────────┐
│ Local State Update │
│ (optimistic)       │
└────┬───────────────┘
     │
     ▼
┌────────────────────┐
│ UI Updates         │
│ • Modal closes     │
│ • Thread appears   │
│   at top of list   │
└────────────────────┘
```

---

## Data Flow: Viewing Thread with Replies

```
┌──────────┐
│  User    │
│  clicks  │
│  thread  │
└────┬─────┘
     │
     ▼
┌────────────────────┐
│ Forum.tsx          │
│ setViewingThreadId │
└────┬───────────────┘
     │
     ▼
┌────────────────────┐
│ useForumPost       │
│ (threadId)         │
└────┬───────────────┘
     │
     ├─► Fetch thread from Firebase
     │   (forum_posts/{id})
     │
     └─► Fetch replies from Firebase
         (forum_replies where threadId == id)
         │
         ▼
    ┌────────────────────┐
    │ buildReplyTree()   │
    │ • Group by parent  │
    │ • Nest children    │
    │ • Max 2 levels     │
    └────┬───────────────┘
         │
         ▼
    ┌────────────────────┐
    │ ThreadView.tsx     │
    │ • Display thread   │
    │ • Show actions     │
    └────────────────────┘
         │
         ▼
    ┌────────────────────┐
    │ ReplySection.tsx   │
    │ • Render tree      │
    │ • Reply form       │
    └────────────────────┘
```

---

## Component Hierarchy

```
Forum.tsx
├── BackButton
├── Search Input
├── FilterChips
│   └── Tag buttons (13 genres)
├── Create Button → UnifiedWritingModal
│
├── ForumList (if !viewingThreadId)
│   ├── Featured Thread Card
│   │   ├── Title, content, tags
│   │   ├── Meta (author, date, likes, replies)
│   │   ├── Badges (New, Popular)
│   │   └── ThreadPreview (on hover)
│   │
│   └── Regular Thread Cards (grid)
│       └── (same structure as featured)
│
└── ThreadView (if viewingThreadId)
    ├── BackButton
    ├── Thread Content
    │   ├── Story association (if linked)
    │   ├── Title
    │   ├── Tags
    │   ├── Content
    │   ├── Actions
    │   │   ├── CandleLike
    │   │   ├── Share → ShareTray
    │   │   ├── Report → ReportModal
    │   │   ├── Edit (if author) → UnifiedWritingModal
    │   │   └── Delete (if author) → Confirm Modal
    │   └── Author Info
    │
    └── ReplySection
        ├── Reply List
        │   └── ReplyCard (recursive)
        │       ├── Author + Avatar
        │       ├── Content
        │       ├── Actions (like, quote, reply, delete)
        │       └── Children (nested replies)
        │
        └── Reply Form
            ├── Textarea
            ├── Character count
            └── Submit button
```

---

## State Management

```
┌─────────────────────────────────────────────────────────────┐
│                    LOCAL STATE (React)                      │
├─────────────────────────────────────────────────────────────┤
│                                                             │
│  Forum.tsx:                                                 │
│  • filters: { sortBy, tags, searchQuery }                   │
│  • viewingThreadId: string | undefined                      │
│  • searchQuery: string                                      │
│  • mousePosition: { x, y }                                  │
│                                                             │
│  useForumPosts:                                             │
│  • posts: ForumThread[]                                     │
│  • loading: boolean                                         │
│  • hasMore: boolean                                         │
│  • lastDoc: DocumentSnapshot | null                         │
│  • error: string | null                                     │
│                                                             │
│  useForumPost:                                              │
│  • post: ForumThread | null                                 │
│  • replies: ReplyNode[]                                     │
│  • loading: boolean                                         │
│  • error: string | null                                     │
│                                                             │
│  useForumLikes:                                             │
│  • isLiked: boolean                                         │
│  • likeCount: number                                        │
│  • loading: boolean                                         │
│  • error: string | null                                     │
│                                                             │
└─────────────────────────────────────────────────────────────┘

┌─────────────────────────────────────────────────────────────┐
│                  PERSISTENT STATE                           │
├─────────────────────────────────────────────────────────────┤
│                                                             │
│  localStorage:                                              │
│  • forumFilters: { sortBy, tags }                           │
│  • threadActivity_{userId}: { [threadId]: lastViewed }      │
│                                                             │
│  dataCache (in-memory):                                     │
│  • forum-posts-{sortBy}-{tags}: ForumThread[]               │
│  • TTL: Until manual invalidation                           │
│                                                             │
└─────────────────────────────────────────────────────────────┘
```

---

## Dead Code (Not Connected)

```
┌─────────────────────────────────────────────────────────────┐
│              UNUSED CONFIGURATION SYSTEM                    │
├─────────────────────────────────────────────────────────────┤
│                                                             │
│  src/config/taleThreads.ts                                  │
│  ├── PROJECT_CONFIG (for collaborative projects)           │
│  ├── PROPOSAL_CONFIG (for voting system)                    │
│  ├── ROLE_CONFIG (for permissions)                          │
│  ├── GENRE_CONFIG (genres list)                             │
│  ├── UI_CONFIG (UI settings)                                │
│  └── SESSION_CONFIG (for live sessions)                     │
│                                                             │
│  src/hooks/useTaleThreadsConfig.ts                          │
│  ├── useTaleThreadsConfig()                                 │
│  ├── usePermissions()                                        │
│  ├── useProposalVoting()                                     │
│  ├── useProjectCapacity()                                    │
│  └── useSessionCapacity()                                    │
│                                                             │
│  src/contexts/TaleThreadsConfigContext.tsx                  │
│  └── TaleThreadsConfigProvider (never added to app)         │
│                                                             │
│  src/components/collaborative/                              │
│  ├── StatusBadge.tsx (never imported)                       │
│  ├── RoleBadge.tsx (never imported)                         │
│  └── ProposalTypeBadge.tsx (never imported)                 │
│                                                             │
│  src/components/admin/                                      │
│  └── ConfigViewer.tsx (never used)                          │
│                                                             │
│  ❌ NO CONNECTIONS TO ACTUAL FORUM CODE                     │
│                                                             │
└─────────────────────────────────────────────────────────────┘
```

---

## Visual Design Elements

```
┌─────────────────────────────────────────────────────────────┐
│                    THE TEA ROOM THEME                       │
├─────────────────────────────────────────────────────────────┤
│                                                             │
│  Background:                                                │
│  • Radial gradient: #0a0a0a → #000000                       │
│  • Ambient fog layer (pulsing opacity)                      │
│  • Film grain texture overlay                               │
│                                                             │
│  Floating Candles (12):                                     │
│  • Follow mouse movement                                    │
│  • Flame flicker animation                                  │
│  • Glow effect (blur + shadow)                              │
│  • Positioned in 4x3 grid                                   │
│                                                             │
│  Thread Cards:                                              │
│  • Background: rgba(35, 25, 20, 0.5)                        │
│  • Border: 1px solid rgba(139, 115, 85, 0.15)               │
│  • Left accent: 2px solid rgba(139, 115, 85, 0.25)          │
│  • Corner accents (subtle)                                  │
│  • Box shadow with gold glow                                │
│  • Hover: translate-y(-4px)                                 │
│                                                             │
│  Typography:                                                │
│  • Headers: Serif, candle gold (#e8c547, #d4af37)           │
│  • Body: Serif, bone white (#e8dcc8, #d5d5d5)               │
│  • Meta: Sans-serif, muted (#8B7355, #6a6a6a)               │
│  • Text shadow on gold text                                 │
│                                                             │
│  Ornaments:                                                 │
│  • Corner brackets on cards                                 │
│  • Divider lines with gradient                              │
│  • Decorative dots and symbols (✦)                          │
│                                                             │
└─────────────────────────────────────────────────────────────┘
```

---

## Security Flow

```
User Action (Create/Reply/Like)
        │
        ▼
┌───────────────────┐
│ Authentication    │
│ • currentUser?    │
│ • userProfile?    │
│ • displayName?    │
└────────┬──────────┘
         │ ✓
         ▼
┌───────────────────┐
│ Rate Limiting     │
│ • Check action    │
│ • Check user ID   │
│ • Check timestamp │
└────────┬──────────┘
         │ ✓
         ▼
┌───────────────────┐
│ Input Validation  │
│ • Length checks   │
│ • Profanity filter│
│ • XSS prevention  │
└────────┬──────────┘
         │ ✓
         ▼
┌───────────────────┐
│ Firebase Write    │
│ • Security rules  │
│ • Ownership check │
└────────┬──────────┘
         │ ✓
         ▼
┌───────────────────┐
│ Success           │
│ • Update UI       │
│ • Show feedback   │
└───────────────────┘
```

---

## Performance Bottlenecks

```
❌ ISSUE: Mouse tracking updates every pixel
   ├─► Triggers re-render of 12 candle components
   └─► FIX: Throttle to 100ms or use CSS transforms

❌ ISSUE: No pagination
   ├─► Loads all matching threads at once
   └─► FIX: Implement cursor-based pagination

❌ ISSUE: No virtualization
   ├─► Renders all thread cards in DOM
   └─► FIX: Use react-window for lists

❌ ISSUE: No code splitting
   ├─► All forum code loads upfront
   └─► FIX: Lazy load ThreadView component

✅ GOOD: Optimistic updates for likes
✅ GOOD: Caching with dataCache utility
✅ GOOD: Memoized filter computations
```

---

## Routing

```
/forum
├─► Forum.tsx (list view)
│   └─► Shows ForumList component
│
/forum?thread={id}
└─► Forum.tsx (detail view)
    └─► Shows ThreadView + ReplySection

/tale-threads
└─► Redirects to /forum (legacy route)

/chains
└─► Redirects to /tale-threads (legacy route)
```

---

This diagram shows the **actual implementation** of Tale Threads as a discussion forum. The collaborative project system described in documentation does not exist in the codebase.
