# Chains User Flow Analysis

## Current State

### What Works ✅
1. **Reflection Sessions Tab** - Fully functional
   - View list of chain sessions
   - Create new sessions
   - Add segments (messages) to chains
   - Navigate between segments
   - Edit/delete own segments
   - Real-time Firebase sync

2. **Collaborative Stories Tab** - Partially functional
   - View list of collaborative projects
   - Filter by status, genre, search
   - Click on a project → navigates to `/chains/projects/{id}`
   - View project details (title, description, collaborators, stats)

### What's Missing ❌

The **Collaborative Stories** system is essentially a **read-only browser** right now. Here's what's broken:

## Missing Functionality

### 1. **No Way to CREATE a Collaborative Project**
**Problem**: Users can browse projects but can't create new ones.

**What's needed**:
- "Create Project" button in CollaborativeStoriesView
- Modal/form to create a new project with:
  - Title
  - Description
  - Genre
  - Target word count
  - Visibility (public/private)
  - Initial content (optional)
- Firebase write logic in `useProjectActions.ts`

### 2. **No Way to JOIN a Project**
**Problem**: Users can view projects but can't become collaborators.

**What's needed**:
- "Join Project" button on project detail page
- Logic to add user to `coAuthors` array
- Permission checks (is project accepting new members?)
- Firebase update logic

### 3. **Proposals Don't Actually Work**
**Problem**: The proposal system UI exists but has no backend logic.

**What's needed**:
- Create proposal → Save to Firestore `proposals` collection
- Vote on proposal → Update vote counts
- Accept proposal → Merge changes into main story
- Reject proposal → Mark as rejected
- All the Firebase CRUD operations

### 4. **No Story Editing**
**Problem**: Can't actually write or edit the story content.

**What's needed**:
- Story editor component (like the segment editor in Reflection Sessions)
- Save story content to Firebase
- Version history tracking
- Conflict resolution

### 5. **No Proposal Merging Logic**
**Problem**: Even if proposals are created, there's no way to merge them into the main story.

**What's needed**:
- Diff/merge algorithm (already exists in `src/utils/diffEngine.ts`)
- UI to review changes
- Accept/reject buttons that actually work
- Update main story content after merge

## User Flow (How It SHOULD Work)

### Creating a Project
1. User clicks "Create Project" button
2. Fills out form (title, description, genre, etc.)
3. System creates project in Firestore
4. User is added as owner and first collaborator
5. Redirects to project page

### Joining a Project
1. User browses projects list
2. Clicks on interesting project
3. Sees "Join Project" button
4. Clicks button → added to collaborators
5. Can now create proposals

### Making Changes (Proposal Flow)
1. User clicks "New Proposal" button
2. Writes proposed changes in editor
3. Adds title and description
4. Submits proposal → saved to Firestore
5. Other collaborators see proposal in list
6. They vote (approve/reject)
7. When threshold met, owner can merge
8. Merged content updates main story

### Reading the Story
1. User clicks "Story" tab
2. Sees current version of story
3. Can see word count, progress bar
4. Can see who contributed what (eventually)

## What Needs to Be Built

### Priority 1: Core CRUD Operations
```typescript
// In useProjectActions.ts
- createProject(data) → Create new project
- joinProject(projectId, userId) → Add user as collaborator
- leaveProject(projectId, userId) → Remove user
- updateProject(projectId, updates) → Update project metadata
- deleteProject(projectId) → Delete project (owner only)
```

### Priority 2: Proposal System
```typescript
// In useProposalActions.ts
- createProposal(projectId, data) → Create new proposal
- voteOnProposal(proposalId, vote) → Cast vote
- mergeProposal(proposalId) → Merge into main story
- rejectProposal(proposalId) → Mark as rejected
- deleteProposal(proposalId) → Delete proposal
```

### Priority 3: Story Editor
```typescript
// New component: StoryEditor.tsx
- Rich text editor for story content
- Auto-save functionality
- Version history
- Collaborative editing indicators
```

### Priority 4: Permissions & Validation
```typescript
// In projectPermissions.ts (already exists but incomplete)
- canJoinProject(user, project) → Check if user can join
- canCreateProposal(user, project) → Check if user can propose
- canVote(user, project, proposal) → Check if user can vote
- canMerge(user, project, proposal) → Check if user can merge
- canEdit(user, project) → Check if user can edit
```

## Firebase Collections Needed

### `collaborativeProjects`
```typescript
{
  id: string;
  title: string;
  description: string;
  ownerId: string;
  ownerName: string;
  coAuthors: Array<{
    userId: string;
    displayName: string;
    role: 'owner' | 'editor' | 'viewer';
    joinedAt: Timestamp;
  }>;
  currentContent: string; // Main story text
  genre: string;
  status: 'active' | 'completed' | 'archived';
  visibility: 'public' | 'private';
  targetWordCount: number;
  createdAt: Timestamp;
  updatedAt: Timestamp;
}
```

### `proposals`
```typescript
{
  id: string;
  projectId: string;
  authorId: string;
  authorName: string;
  title: string;
  description: string;
  proposedText: string; // New version of story
  originalText: string; // Old version for diff
  status: 'pending' | 'accepted' | 'rejected';
  votes: {
    approve: number;
    reject: number;
    voters: string[]; // userIds who voted
  };
  createdAt: Timestamp;
  updatedAt: Timestamp;
}
```

### `votes` (subcollection of proposals)
```typescript
{
  id: string; // userId
  proposalId: string;
  vote: 'approve' | 'reject';
  votedAt: Timestamp;
}
```

## Quick Wins to Make It Functional

### 1. Add "Create Project" Button (30 min)
- Add button to CollaborativeStoriesView
- Create modal with form
- Wire up to Firebase

### 2. Add "Join Project" Button (20 min)
- Add button to CollaborativeProject page
- Update coAuthors array in Firestore
- Show success message

### 3. Make Proposals Actually Save (45 min)
- Wire up ProposalEditor to Firestore
- Save proposal data
- Show in ProposalList

### 4. Add Basic Voting (30 min)
- Wire up vote buttons
- Update vote counts in Firestore
- Show vote results

### 5. Add Story Editor (1 hour)
- Create simple textarea editor
- Save to currentContent field
- Show in Story tab

## Total Estimated Time
**~3-4 hours** to make the basic flow functional.

## Current Status
**The system is 40% complete:**
- ✅ UI components exist
- ✅ Routing works
- ✅ Data models defined
- ❌ No Firebase write operations
- ❌ No actual collaboration logic
- ❌ No proposal merging

It's essentially a **static prototype** that needs the backend logic implemented.
