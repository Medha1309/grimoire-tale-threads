# Collaborative Stories - Architecture Overview

## System Design Philosophy

**Library is the Source of Truth**  
Stories live in Library. Chains provides the collaboration layer. When collaboration is enabled, a linked Chain project is created, but the story data remains in Library.

**Git-like Workflow**  
Inspired by GitHub's pull request model: propose changes → review → approve → merge. This ensures quality control and clear attribution.

**Dual-Mode Chains**  
Chains serves two purposes:
1. **Reflection Sessions** - Temporary collaborative writing exercises
2. **Collaborative Stories** - Persistent multi-author story projects

## Architecture Diagram

```
┌─────────────────────────────────────────────────────────────────┐
│                           USER FLOW                              │
└─────────────────────────────────────────────────────────────────┘
                                 │
                    ┌────────────┴────────────┐
                    │                         │
            ┌───────▼────────┐       ┌───────▼────────┐
            │    LIBRARY     │       │     CHAINS     │
            │   (Stories)    │◄─────►│ (Collaboration)│
            └────────────────┘       └────────────────┘
                    │                         │
        ┌───────────┼───────────┐   ┌────────┼────────┐
        │           │           │   │        │        │
    ┌───▼───┐  ┌───▼───┐  ┌───▼───▼───┐  ┌─▼──────┐ │
    │ Write │  │ Read  │  │ Projects  │  │Sessions│ │
    │ Solo  │  │Browse │  │(Collab)   │  │(Temp)  │ │
    └───┬───┘  └───────┘  └───────────┘  └────────┘ │
        │                         │                   │
        │ Enable Collaboration    │                   │
        └────────────────────────►│                   │
                                  │                   │
                          ┌───────▼────────┐          │
                          │ Propose Changes│          │
                          │ Review & Merge │          │
                          │ Finalize & Sign│          │
                          └───────┬────────┘          │
                                  │                   │
                          Publish │                   │
                                  ▼                   │
                          ┌────────────┐              │
                          │  Library   │              │
                          │(Multi-Auth)│              │
                          └────────────┘              │
                                                      │
└─────────────────────────────────────────────────────┘
```

## Data Flow

### 1. Enable Collaboration
```
User in Library Story Editor
    │
    ├─► Toggle "Enable Collaboration"
    │
    ├─► Create CollaborativeProject in Chains
    │   ├─ projectId: generated
    │   ├─ linkedStoryId: story.id
    │   ├─ ownerId: currentUser.id
    │   └─ status: 'recruiting'
    │
    ├─► Update Story in Library
    │   ├─ collaborationEnabled: true
    │   ├─ chainProjectId: project.id
    │   └─ status: 'collaborative'
    │
    └─► Redirect to Chain Project Page
```

### 2. Join Project
```
User in Chains Browse
    │
    ├─► Click "Request to Join"
    │
    ├─► Create JoinRequest
    │   ├─ projectId
    │   ├─ userId
    │   └─ message (optional)
    │
    ├─► Notify Project Owner
    │
Owner Reviews Request
    │
    ├─► Approve
    │   ├─ Add to coAuthors array
    │   ├─ role: 'contributor'
    │   └─ Notify user
    │
    └─► Reject
        └─ Notify user with reason
```

### 3. Propose Changes
```
Co-Author in Project
    │
    ├─► Click "Create Proposal"
    │
    ├─► Fork Current Story Content
    │
    ├─► Edit in Proposal Editor
    │   ├─ Track changes (diff)
    │   └─ Auto-save draft
    │
    ├─► Submit for Review
    │   ├─ Compute final diff
    │   ├─ Create Proposal document
    │   └─ Notify reviewers
    │
Reviewers Review
    │
    ├─► View Diff
    ├─► Add Comments
    └─► Approve/Request Changes/Reject
```

### 4. Merge Proposal
```
Owner/Reviewer Approves
    │
    ├─► Check: Required approvals met?
    │
    ├─► Owner clicks "Merge"
    │
    ├─► Apply Changes to Story
    │   ├─ Fetch current story content
    │   ├─ Apply diff (ContentChange[])
    │   ├─ Update story in Library
    │   └─ Handle conflicts if any
    │
    ├─► Update Proposal
    │   ├─ status: 'merged'
    │   ├─ mergedAt: timestamp
    │   └─ mergedBy: userId
    │
    ├─► Create Activity
    │   └─ type: 'proposal_merged'
    │
    ├─► Increment Author Contribution Count
    │
    └─► Notify All Co-Authors
```

### 5. Finalize & Publish
```
Owner Decides Story Complete
    │
    ├─► Click "Finalize Story"
    │
    ├─► Update Project
    │   └─ status: 'finalizing'
    │
    ├─► Create Signature Requests
    │   └─ For each co-author
    │
Co-Authors Sign
    │
    ├─► Each clicks "Sign"
    │   └─ Add to signatures array
    │
    ├─► Check: All signed?
    │
    └─► Yes → Publish
        │
        ├─► Update Story in Library
        │   ├─ status: 'published'
        │   ├─ coAuthorIds: [all co-authors]
        │   └─ publishedAt: timestamp
        │
        ├─► Archive Project
        │   ├─ status: 'archived'
        │   └─ Make read-only
        │
        └─► Notify All Co-Authors
```

## Database Schema

### Firestore Collections

#### `/stories` (Library)
```typescript
{
  id: string;
  title: string;
  content: string; // Rich text JSON
  authorId: string; // Original author
  genre: string;
  status: 'draft' | 'collaborative' | 'published';
  
  // Collaboration fields
  collaborationEnabled: boolean;
  chainProjectId?: string; // Link to Chain project
  coAuthorIds?: string[]; // Populated when published
  
  createdAt: Timestamp;
  updatedAt: Timestamp;
  publishedAt?: Timestamp;
}
```

#### `/collaborativeProjects` (Chains)
```typescript
{
  id: string;
  linkedStoryId: string; // Reference to Library story
  ownerId: string;
  title: string; // Synced from story
  genre: string; // Synced from story
  
  coAuthors: [
    {
      userId: string;
      displayName: string;
      role: 'owner' | 'reviewer' | 'contributor';
      joinedAt: Timestamp;
      contributionCount: number;
    }
  ];
  
  status: 'recruiting' | 'active' | 'finalizing' | 'archived';
  
  settings: {
    maxCoAuthors: number; // Default 5
    requireApproval: boolean; // Default true
    minReviewers: number; // Default 1
  };
  
  signatures: [
    {
      userId: string;
      signedAt: Timestamp;
    }
  ];
  
  createdAt: Timestamp;
  updatedAt: Timestamp;
  finalizedAt?: Timestamp;
}
```

#### `/proposals`
```typescript
{
  id: string;
  projectId: string;
  authorId: string;
  
  title: string;
  description: string;
  
  // Content changes (diff)
  changes: [
    {
      type: 'insert' | 'delete' | 'modify';
      position: number; // Character position
      oldText?: string;
      newText?: string;
      length: number;
    }
  ];
  
  // Computed for display (cached)
  diffHtml?: string;
  
  status: 'draft' | 'pending' | 'approved' | 'changes_requested' | 'rejected' | 'merged';
  
  reviews: [
    {
      reviewerId: string;
      status: 'approved' | 'changes_requested' | 'rejected';
      comment?: string;
      createdAt: Timestamp;
    }
  ];
  
  createdAt: Timestamp;
  updatedAt: Timestamp;
  submittedAt?: Timestamp;
  mergedAt?: Timestamp;
  mergedBy?: string;
}
```

#### `/projectActivities`
```typescript
{
  id: string;
  projectId: string;
  userId: string;
  type: 'proposal_created' | 'proposal_merged' | 'review_added' | 
        'coauthor_joined' | 'coauthor_left' | 'comment_added' |
        'project_finalized' | 'project_published';
  
  metadata: {
    proposalId?: string;
    proposalTitle?: string;
    reviewStatus?: string;
    // ... type-specific data
  };
  
  createdAt: Timestamp;
}
```

### Firebase Realtime Database (Real-time Features)

#### `/projectPresence/{projectId}/{userId}`
```json
{
  "displayName": "string",
  "photoURL": "string",
  "status": "online",
  "lastSeen": "timestamp",
  "currentView": "story" | "proposals" | "discussion"
}
```

#### `/proposalCursors/{proposalId}/{userId}`
```json
{
  "position": 1234,
  "displayName": "string",
  "color": "#hex"
}
```

## Component Hierarchy

```
App
├── Router
│   ├── /library
│   │   └── Stories (existing)
│   │       └── StoryDetail
│   │           └── EnhancedNovelEditor
│   │               └── CollaborationToggle (NEW)
│   │
│   └── /chains
│       ├── Chains (renamed from ReflectionSessions)
│       │   ├── Tab: Reflection Sessions
│       │   │   └── ReflectionSessionsView (existing)
│       │   │
│       │   └── Tab: Collaborative Stories (NEW)
│       │       └── CollaborativeStoriesView
│       │           ├── ProjectFilters
│       │           └── ProjectGrid
│       │               └── ProjectCard[]
│       │
│       └── /chains/projects/:id
│           └── CollaborativeProject (NEW)
│               ├── ProjectHeader
│               │   ├── Title, Genre, Status
│               │   ├── CoAuthorAvatars
│               │   └── Actions
│               │
│               ├── ProjectTabs
│               │   ├── StoryTab
│               │   │   └── Current story content
│               │   │
│               │   ├── ProposalsTab
│               │   │   └── ProposalCard[]
│               │   │       └── ProposalReview
│               │   │           ├── DiffViewer
│               │   │           └── ReviewActions
│               │   │
│               │   ├── HistoryTab
│               │   │   └── Timeline of merged proposals
│               │   │
│               │   └── DiscussionTab
│               │       └── Thread-based chat
│               │
│               └── ProjectSidebar
│                   ├── CoAuthorList
│                   └── ActivityFeed
```

## Key Utilities

### Diff Engine (`src/utils/diffEngine.ts`)
```typescript
// Uses diff-match-patch library
export function computeDiff(original: string, modified: string): ContentChange[]
export function applyDiff(original: string, changes: ContentChange[]): string
export function formatDiffHtml(changes: ContentChange[]): string
export function detectConflicts(baseVersion: string, changes: ContentChange[]): Conflict[]
```

### Permission Checker (`src/utils/projectPermissions.ts`)
```typescript
export function canCreateProposal(project: CollaborativeProject, userId: string): boolean
export function canReviewProposal(project: CollaborativeProject, userId: string): boolean
export function canMergeProposal(project: CollaborativeProject, userId: string): boolean
export function canManageCoAuthors(project: CollaborativeProject, userId: string): boolean
export function canFinalizeProject(project: CollaborativeProject, userId: string): boolean
```

### Project Publisher (`src/utils/projectPublisher.ts`)
```typescript
export async function publishProject(projectId: string): Promise<void>
// 1. Fetch project and story
// 2. Update story with final content and co-authors
// 3. Change story status to 'published'
// 4. Archive project (read-only)
// 5. Send notifications
// 6. Create activity log
```

## Security Model

### Firestore Rules
```javascript
// Projects: Only co-authors can read/write
match /collaborativeProjects/{projectId} {
  allow read: if isCoAuthor(projectId);
  allow create: if request.auth != null;
  allow update: if isOwner(projectId) || isCoAuthor(projectId);
  allow delete: if isOwner(projectId);
}

// Proposals: Only co-authors can read, author can write
match /proposals/{proposalId} {
  allow read: if isCoAuthorOfProject(proposalId);
  allow create: if isCoAuthorOfProject(proposalId);
  allow update: if isProposalAuthor(proposalId) || isReviewer(proposalId);
  allow delete: if isProposalAuthor(proposalId) && get(/databases/$(database)/documents/proposals/$(proposalId)).data.status == 'draft';
}

// Helper functions
function isCoAuthor(projectId) {
  let project = get(/databases/$(database)/documents/collaborativeProjects/$(projectId));
  return request.auth.uid in project.data.coAuthors.map(a => a.userId);
}

function isOwner(projectId) {
  let project = get(/databases/$(database)/documents/collaborativeProjects/$(projectId));
  return request.auth.uid == project.data.ownerId;
}

function isReviewer(proposalId) {
  let proposal = get(/databases/$(database)/documents/proposals/$(proposalId));
  let project = get(/databases/$(database)/documents/collaborativeProjects/$(proposal.data.projectId));
  let author = project.data.coAuthors.filter(a => a.userId == request.auth.uid)[0];
  return author.role in ['owner', 'reviewer'];
}
```

## Performance Optimizations

### 1. Diff Caching
- Compute diff once when proposal submitted
- Cache `diffHtml` in Firestore
- Only recompute if proposal edited

### 2. Pagination
- Projects: 20 per page
- Proposals: 10 per page
- Activity feed: 50 items, infinite scroll

### 3. Real-time Throttling
- Cursor updates: 50ms throttle
- Presence updates: 5s heartbeat
- Activity feed: Batch updates every 2s

### 4. Lazy Loading
- Proposal content: Load only when opened
- History: Load on-demand
- Discussion: Paginated threads

### 5. Optimistic Updates
- Proposal submission: Show immediately
- Review actions: Update UI instantly
- Merge: Show success, sync in background

## Error Handling

### Conflict Resolution
```typescript
// When merging proposal
const currentStory = await getStory(project.linkedStoryId);
const conflicts = detectConflicts(currentStory.content, proposal.changes);

if (conflicts.length > 0) {
  // Show conflict UI
  return {
    success: false,
    conflicts: conflicts,
    message: 'Story has been updated since proposal created'
  };
}

// No conflicts, proceed with merge
await applyDiff(currentStory.content, proposal.changes);
```

### Network Resilience
- Queue actions offline
- Sync when connection restored
- Show "Offline" indicator
- Retry failed operations

### Permission Errors
- Check permissions client-side before action
- Show clear error messages
- Suggest solutions (e.g., "Ask owner for reviewer role")

## Accessibility

### Keyboard Navigation
- Tab through proposals
- Arrow keys in diff view
- Shortcuts: `r` review, `a` approve, `m` merge, `c` comment

### Screen Readers
- Announce proposal status changes
- Describe diff changes ("5 lines added, 2 deleted")
- Label all interactive elements
- ARIA live regions for real-time updates

### Visual Accessibility
- High contrast diff colors (WCAG AA)
- Adjustable font size
- Focus indicators on all controls
- Color not sole indicator (use icons too)

## Future Enhancements

### Phase 2 Features
- Real-time collaborative editing (Google Docs style)
- Branching proposals (proposals from proposals)
- Visual merge conflict resolution
- Integration with external version control
- Export to Git repository
- AI-powered writing suggestions
- Plagiarism detection
- Style consistency checker

### Scalability
- Support 50+ co-authors
- Handle 1000+ proposals per project
- Distributed diff computation
- CDN for static assets
- Database sharding for large projects
