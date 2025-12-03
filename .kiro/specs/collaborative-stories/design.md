# Collaborative Stories - Design

## Architecture

### System Overview
```
┌─────────────────────────────────────────────────────────────┐
│                         LIBRARY                              │
│  ┌──────────────────────────────────────────────────────┐  │
│  │  Story (Source of Truth)                             │  │
│  │  - id, title, content, genre                         │  │
│  │  - authorId (original)                               │  │
│  │  - collaborationEnabled: boolean                     │  │
│  │  - chainProjectId?: string (if collaborative)        │  │
│  │  - status: 'draft' | 'collaborative' | 'published'   │  │
│  └──────────────────────────────────────────────────────┘  │
└─────────────────────────────────────────────────────────────┘
                              ↕
                    (linked when enabled)
                              ↕
┌─────────────────────────────────────────────────────────────┐
│                         CHAINS                               │
│  ┌──────────────────────────────────────────────────────┐  │
│  │  Collaborative Project                               │  │
│  │  - linkedStoryId: string                             │  │
│  │  - coAuthors: { userId, role, joinedAt }[]          │  │
│  │  - proposals: Proposal[]                             │  │
│  │  - status: 'recruiting' | 'active' | 'finalizing'   │  │
│  │  - signatures: { userId, signedAt }[]               │  │
│  └──────────────────────────────────────────────────────┘  │
└─────────────────────────────────────────────────────────────┘
```

### Data Models

#### CollaborativeProject
```typescript
interface CollaborativeProject {
  id: string;
  linkedStoryId: string; // Reference to Library story
  ownerId: string;
  title: string; // Synced from story
  genre: string; // Synced from story
  
  coAuthors: CoAuthor[];
  status: 'recruiting' | 'active' | 'finalizing' | 'archived';
  
  // Settings
  maxCoAuthors: number; // Default 5
  requireApproval: boolean; // Default true
  
  // Metadata
  createdAt: Timestamp;
  updatedAt: Timestamp;
  finalizedAt?: Timestamp;
}

interface CoAuthor {
  userId: string;
  displayName: string;
  role: 'owner' | 'reviewer' | 'contributor';
  joinedAt: Timestamp;
  contributionCount: number; // Merged proposals
}
```

#### Proposal (Git-like Change Request with Voting)
```typescript
interface Proposal {
  id: string;
  projectId: string;
  authorId: string;
  authorName: string;
  
  title: string;
  description: string;
  
  // Full content (not just diffs)
  content: string; // Rich text HTML from editor
  baseVersion: string; // Story version this was based on
  
  // Voting system
  status: 'draft' | 'voting' | 'approved' | 'rejected' | 'merged';
  votes: Vote[];
  votingEndsAt: Timestamp; // 48 hours from submission
  votingExtended: boolean; // If extended due to tie
  
  // Metadata
  createdAt: Timestamp;
  updatedAt: Timestamp;
  submittedAt?: Timestamp; // When moved from draft to voting
  mergedAt?: Timestamp;
  mergedBy?: string;
}

interface Vote {
  userId: string;
  userName: string;
  decision: 'approve' | 'request_changes' | 'reject';
  comment?: string;
  votedAt: Timestamp;
}

interface ContentChange {
  type: 'insert' | 'delete' | 'modify';
  position: number; // Character position in story
  oldText?: string; // For delete/modify
  newText?: string; // For insert/modify
  length: number;
}
```
```

#### Story Extension (Library)
```typescript
interface Story {
  // ... existing fields
  
  // Collaboration fields
  collaborationEnabled: boolean;
  chainProjectId?: string;
  coAuthorIds?: string[]; // Populated when finalized
  
  // Status now includes 'collaborative'
  status: 'draft' | 'collaborative' | 'published';
}
```

## Component Architecture

### Chains Page Structure
```
ReflectionSessions.tsx (rename to Chains.tsx)
├── TabNavigation
│   ├── "Reflection Sessions" tab
│   └── "Collaborative Stories" tab
├── ReflectionSessionsView (existing)
└── CollaborativeStoriesView (new)
    ├── ProjectFilters
    ├── ProjectGrid
    │   └── ProjectCard[]
    └── CreateProjectModal
```

### Collaborative Project Page
```
CollaborativeProject.tsx
├── ProjectHeader
│   ├── Title, genre, status badge
│   ├── CoAuthorAvatars
│   └── Actions (join, leave, finalize)
├── ProjectTabs
│   ├── "Story" - Current version
│   ├── "Proposals" - Pending changes
│   ├── "History" - Merged proposals
│   └── "Discussion" - Team chat
└── ProjectSidebar
    ├── CoAuthorList (with roles)
    ├── ActivityFeed
    └── ProjectSettings (owner only)
```

### Proposal Editor (Uses Rich Text Editor)
```
ProposalEditor.tsx
├── ProposalMetadata
│   ├── Title input
│   └── Description textarea
├── EnhancedWritingEditor (reused from Library/Diary)
│   ├── Rich text formatting toolbar
│   ├── Auto-save indicator
│   ├── Word count
│   └── Focus mode toggle
├── PreviewTab
│   └── Rendered proposal content
└── Actions
    ├── Save Draft (auto-saves every 30s)
    ├── Submit for Voting
    └── Discard
```

### Proposal Voting View
```
ProposalVoting.tsx
├── ProposalHeader
│   ├── Author avatar & name
│   ├── Submission timestamp
│   ├── Status badge (Voting/Approved/Rejected)
│   └── Voting countdown timer
├── VotingStats
│   ├── Vote counts (Approve: X, Changes: Y, Reject: Z)
│   ├── Progress bars
│   └── Required threshold indicator
├── ContentTabs
│   ├── "Proposal" - Full content view
│   ├── "Diff" - Side-by-side comparison
│   └── "Discussion" - Vote comments
├── DiffViewer (when on Diff tab)
│   ├── Current story (left)
│   ├── Proposed changes (right)
│   ├── Additions highlighted green
│   └── Deletions highlighted red
└── VotingActions (if user hasn't voted)
    ├── Approve button
    ├── Request Changes button
    ├── Reject button
    └── Comment textarea (optional)
```

## User Flows

### Flow 1: Enable Collaboration
1. Author writing story in Library
2. Clicks "Enable Collaboration" toggle
3. Modal: "Open your story for collaboration?"
   - Set max co-authors (default 5)
   - Require approval for join requests (default yes)
4. Confirms → Creates Chain project
5. Story status → 'collaborative'
6. Redirects to Chain project page

### Flow 2: Join Project
1. User browses Collaborative Stories in Chains
2. Finds interesting project
3. Clicks "Request to Join"
4. Modal: "Why do you want to join?" (optional message)
5. Submits → Owner notified
6. Owner reviews request
7. Approves → User becomes co-author (contributor role)

### Flow 3: Write and Submit Proposal
1. Co-author opens project
2. Clicks "New Proposal"
3. Enters title & description
4. Opens rich text editor (same as Library/Diary)
5. Writes chapter/changes with full formatting
6. Auto-saves draft every 30 seconds
7. Reviews content in preview tab
8. Clicks "Submit for Voting"
9. Proposal locks and voting period starts (48 hours)
10. All co-authors notified

### Flow 4: Vote on Proposal
1. Co-author receives notification
2. Opens proposal voting view
3. Reads full proposal content
4. Switches to Diff tab to see changes
5. Reviews what's being added/removed
6. Chooses vote: Approve / Request Changes / Reject
7. Optionally adds comment explaining vote
8. Submits vote
9. Vote counts update in real-time
10. When voting ends:
    - If >50% approve → Status: "Approved"
    - If >50% reject → Status: "Rejected"
    - If tied → Extends 24 hours, notifies all

### Flow 5: Merge Approved Proposal
1. Owner/Reviewer sees "Approved" proposal
2. Clicks "Merge into Story"
3. System checks for conflicts with current version
4. If no conflicts:
   - Proposal content merges into main story
   - Version history updated
   - Author's contribution count increments
   - All co-authors notified
5. If conflicts:
   - Shows conflict resolution UI
   - Owner manually resolves
   - Then merges

### Flow 6: Finalize & Publish
1. Owner decides story is complete
2. Clicks "Finalize Story"
3. Modal: "Ready to publish?"
   - Shows final word count
   - Lists all co-authors
   - Explains all must sign off
   - Story will publish to Library
   - Project will archive
4. Confirms → Status changes to "Finalizing"
5. Signature requests sent to all co-authors
6. Each co-author reviews final story
7. Each co-author clicks "Sign Off"
8. Digital signature recorded with timestamp
9. When all have signed:
   - Story publishes to Library as new published story
   - All co-authors listed as authors
   - Chain project archives (read-only)
   - Success notification sent to all
10. Published story shows "Collaborative Work" badge in Library

## Voting System

### Voting Algorithm
```typescript
function tallyVotes(proposal: Proposal): VoteResult {
  const totalCoAuthors = getCoAuthors(proposal.projectId).length;
  const votes = proposal.votes;
  
  const approveCount = votes.filter(v => v.decision === 'approve').length;
  const rejectCount = votes.filter(v => v.decision === 'reject').length;
  const changesCount = votes.filter(v => v.decision === 'request_changes').length;
  
  const approvePercent = (approveCount / totalCoAuthors) * 100;
  const rejectPercent = (rejectCount / totalCoAuthors) * 100;
  
  // Majority approval (>50%)
  if (approvePercent > 50) {
    return { status: 'approved', canMerge: true };
  }
  
  // Majority rejection (>50%)
  if (rejectPercent > 50) {
    return { status: 'rejected', canMerge: false };
  }
  
  // Voting period ended but no majority
  if (hasVotingEnded(proposal)) {
    if (!proposal.votingExtended) {
      // Extend by 24 hours
      return { status: 'extended', canMerge: false };
    } else {
      // Already extended, owner decides
      return { status: 'owner_decision', canMerge: false };
    }
  }
  
  // Still voting
  return { status: 'voting', canMerge: false };
}
```

### Voting Rules
1. Voting period: 48 hours from submission
2. All co-authors can vote (including author)
3. Votes can be changed before period ends
4. Majority (>50%) approval required to merge
5. Majority (>50%) rejection closes proposal
6. If tied when period ends: Extend 24 hours
7. If still tied after extension: Owner makes final decision
8. "Request Changes" counts as neither approve nor reject

## Real-time Features

### Presence System
- Reuse existing `useSessionPresence` hook
- Show online co-authors with avatars
- Indicate who's viewing/editing proposals
- Show who has voted vs. who hasn't

### Live Updates
- Firebase Realtime Database for:
  - Vote submissions (instant update)
  - Proposal status changes
  - New comments
  - Signature updates
  - Presence/online status
- Firestore for:
  - Story content (source of truth)
  - Proposal content
  - Project metadata
  - Vote records

### Activity Feed
```typescript
interface Activity {
  id: string;
  projectId: string;
  userId: string;
  userName: string;
  type: 'proposal_created' | 'proposal_submitted' | 'vote_cast' | 
        'proposal_approved' | 'proposal_rejected' | 'proposal_merged' |
        'coauthor_joined' | 'coauthor_left' | 'comment_added' |
        'signature_added' | 'story_finalized';
  metadata: Record<string, any>;
  createdAt: Timestamp;
}
```

## Visual Design

### Aesthetic: Graveyard Collaboration
- Tombstone-shaped project cards (consistent with sessions)
- Proposal cards: weathered parchment with wax seals
- Diff view: ink splatters for deletions, ghostly glow for additions
- Signature page: old contract with quill signatures

### Color Palette (from parlour-tokens)
```typescript
collaborative: {
  owner: '#d4af37',      // Gold
  reviewer: '#9370db',   // Purple
  contributor: '#708090', // Slate
  pending: '#ffa500',    // Orange
  approved: '#32cd32',   // Green
  rejected: '#dc143c',   // Crimson
}
```

### Typography
- Project titles: Cinzel (elegant serif)
- Proposal text: Crimson Text (readable serif)
- Diff annotations: Courier New (monospace)

## Security & Permissions

### Role Permissions Matrix
| Action | Owner | Reviewer | Contributor |
|--------|-------|----------|-------------|
| Create proposal | ✓ | ✓ | ✓ |
| Vote on proposal | ✓ | ✓ | ✓ |
| Merge approved proposal | ✓ | ✓ | ✗ |
| Break voting ties | ✓ | ✗ | ✗ |
| Manage co-authors | ✓ | ✗ | ✗ |
| Change settings | ✓ | ✗ | ✗ |
| Finalize project | ✓ | ✗ | ✗ |
| Assign roles | ✓ | ✗ | ✗ |

### Firestore Rules
```javascript
// Collaborative projects
match /collaborativeProjects/{projectId} {
  allow read: if isCoAuthor(projectId);
  allow create: if request.auth != null;
  allow update: if isOwner(projectId);
  allow delete: if isOwner(projectId);
}

// Proposals
match /proposals/{proposalId} {
  allow read: if isCoAuthor(getProject(proposalId));
  allow create: if isCoAuthor(getProject(proposalId));
  allow update: if isAuthorOrReviewer(proposalId);
}
```

## Performance Considerations

### Diff Algorithm
- Use `diff-match-patch` library for efficient diffs
- Cache computed diffs in Firestore
- Lazy load proposal content (only when opened)

### Pagination
- Projects: 20 per page
- Proposals: 10 per page
- Activity feed: 50 items, infinite scroll

### Optimistic Updates
- Proposal submission: Show immediately, sync in background
- Review actions: Update UI instantly, confirm with server
- Presence: Local state + periodic sync

## Rich Text Editor Integration

### Reusing Existing Editor
The proposal editor will reuse the `EnhancedWritingEditor` component from Library/Diary:

```typescript
// In ProposalEditor.tsx
import { EnhancedWritingEditor } from '../diary/EnhancedWritingEditor';

<EnhancedWritingEditor
  content={proposalContent}
  onChange={handleContentChange}
  onSave={handleAutoSave}
  placeholder="Write your chapter or changes here..."
  autoSaveInterval={30000} // 30 seconds
  showWordCount={true}
  showAutoSaveIndicator={true}
  enableFocusMode={true}
/>
```

### Editor Features Available
- Rich text formatting (bold, italic, underline, strikethrough)
- Headings (H1, H2, H3)
- Lists (ordered, unordered)
- Block quotes
- Code blocks
- Links
- Auto-save with indicator
- Word count
- Focus mode
- Undo/redo

### Content Storage
- Proposals store content as HTML (same as Library stories)
- Diff algorithm compares HTML strings
- Rendering uses same `richTextRenderer` utility

## Integration Points

### Library Integration
```typescript
// In Library story editor
<CollaborationToggle
  storyId={story.id}
  enabled={story.collaborationEnabled}
  onToggle={handleToggleCollaboration}
/>

// Link to Chain project
{story.chainProjectId && (
  <Button onClick={() => navigate(`/chains/projects/${story.chainProjectId}`)}>
    View Collaboration
  </Button>
)}

// When story is collaborative
{story.status === 'collaborative' && (
  <Badge variant="collaborative">
    Collaborative Work in Progress
  </Badge>
)}
```

### Chains Integration
```typescript
// In Chains page - now shows both types
<Tabs>
  <Tab label="Reflection Sessions">
    <ReflectionSessionsView />
  </Tab>
  <Tab label="Collaborative Stories">
    <CollaborativeStoriesView />
  </Tab>
</Tabs>
```

## Error Handling

### Conflict Resolution
- Detect if story changed since proposal created
- Show warning: "Story has been updated since you started"
- Options: Rebase proposal, Cancel, Force merge (owner only)

### Network Issues
- Queue proposal submissions offline
- Sync when connection restored
- Show "Offline" indicator

### Edge Cases
- Owner leaves project → Transfer ownership to oldest reviewer
- All reviewers leave → Owner becomes sole reviewer
- Proposal author leaves → Proposal remains, marked "Author left"

## Accessibility

### Keyboard Navigation
- Tab through proposals
- Arrow keys in diff view
- Shortcuts: `r` review, `a` approve, `m` merge

### Screen Readers
- Announce proposal status changes
- Describe diff changes ("5 lines added, 2 deleted")
- Label all interactive elements

### Visual Accessibility
- High contrast diff colors
- Adjustable font size in editor
- Focus indicators on all controls
