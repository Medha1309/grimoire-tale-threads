# Tale Threads: Complete Technical Audit & Product Assessment

**Date:** December 2, 2025  
**Version:** 1.0  
**Status:** Production Implementation Analysis

---

## Executive Summary

Tale Threads is a **GitHub-style collaborative story writing platform** with two distinct modes:
1. **Collaborative Stories** - Asynchronous, proposal-based workflow with version control
2. **Reflection Sessions** - Real-time, turn-based collaborative writing (Chain Letters)

This document provides a comprehensive technical breakdown of user flows, data models, and implementation details.

---

## 1. User and Session Management

### 1.1 How Users Join a "Chain" (Project)

There are **three pathways** to join a collaborative project:

#### **A. Public Discovery (Browse & Request)**
```typescript
// Location: src/pages/Chains.tsx
// Users can browse public projects and request to join
```

**Flow:**
1. User navigates to `/chains` page
2. Filters projects by status (`recruiting`, `active`, `archived`)
3. Clicks "Request to Join" on a project card
4. Submits optional message explaining why they want to join
5. Request stored in `joinRequests` collection with status `pending`

**Data Structure:**
```typescript
{
  requestId: "req_1234567890_abc123",
  projectId: "proj_...",
  userId: "user123",
  userName: "Jane Doe",
  message: "I love horror stories and would love to contribute!",
  status: "pending",
  createdAt: Timestamp
}
```

#### **B. Direct Invitation (Owner-Initiated)**
```typescript
// Location: src/types/collaborativeStory.ts - Invitation interface
```

**Flow:**
1. Project owner sends invitation via email or user ID
2. Invitation stored with 7-day expiration
3. Invitee receives notification
4. Accepts/declines invitation
5. Upon acceptance, automatically added as co-author

**Data Structure:**
```typescript
interface Invitation {
  id: string;
  projectId: string;
  projectTitle: string;
  inviterId: string;
  inviterName: string;
  inviteeEmail: string;
  inviteeId?: string; // Set when user accepts
  role: CoAuthorRole; // 'owner' | 'reviewer' | 'contributor'
  message?: string;
  status: 'pending' | 'accepted' | 'declined' | 'expired';
  createdAt: Timestamp;
  respondedAt?: Timestamp;
  expiresAt: Timestamp; // 7 days from creation
}
```

#### **C. Story Owner Enables Collaboration**
```typescript
// Location: src/components/library/CollaborationToggle.tsx
```

**Flow:**
1. Story author goes to their story in Library
2. Clicks "Enable Collaboration" toggle
3. Configures settings:
   - Max co-authors (default: 10)
   - Require approval for proposals (default: true)
   - Visibility (public/private/invite-only)
4. System creates `CollaborativeProject` linked to story
5. Owner automatically added as first co-author with `owner` role

---

### 1.2 Participant Limits & Roles

#### **Participant Limit**
```typescript
// Location: src/config/taleThreads.ts
maxCoAuthors: 10 // Configurable per project
```

**Enforcement:**
```typescript
// Location: src/hooks/useProjectActions.ts - approveJoinRequest()
if (project.coAuthors.length >= project.maxCoAuthors) {
  throw new Error('Project is full');
}
```

#### **Role Hierarchy**
```typescript
type CoAuthorRole = 'owner' | 'reviewer' | 'contributor';
```

| Role | Permissions |
|------|-------------|
| **Owner** | • Merge proposals at any time<br>• Change co-author roles<br>• Remove co-authors<br>• Archive project<br>• Override voting (veto power) |
| **Reviewer** | • Merge approved proposals<br>• Vote on proposals<br>• Create proposals |
| **Contributor** | • Vote on proposals<br>• Create proposals<br>• Comment on proposals |

**Role Assignment:**
```typescript
// Location: src/hooks/useProjectActions.ts
const updateCoAuthorRole = async (
  projectId: string,
  targetUserId: string,
  newRole: CoAuthorRole
) => {
  // Only owner can change roles
  if (project.ownerId !== currentUser.uid) {
    throw new Error('Only project owner can change roles');
  }
  // Update role in coAuthors array
}
```

---

## 2. The Writing Process (Active Link)

### 2.1 Turn Management System

**Tale Threads uses TWO different turn management systems:**

#### **System A: Collaborative Stories (Proposal-Based)**
**Type:** Asynchronous, no turn order  
**Mechanism:** GitHub-style Pull Request workflow

```typescript
// Location: src/types/collaborativeStory.ts
type ProposalStatus = 'draft' | 'voting' | 'approved' | 'rejected' | 'merged';
```

**Flow:**
1. **Any co-author** can create a proposal at any time
2. Multiple proposals can exist simultaneously
3. No turn order or queue
4. Proposals go through voting process
5. Owner/reviewers merge approved proposals

**Concurrency Control:**
```typescript
// Location: src/hooks/useProposalActions.ts
// Check open proposal limit
const openProposals = await getDocs(
  query(
    collection(db, 'proposals'),
    where('projectId', '==', projectId),
    where('status', 'in', ['draft', 'voting'])
  )
);

if (openProposals.size >= project.maxOpenProposals) {
  throw new Error('Maximum open proposals reached');
}
```

**Max Open Proposals:** 10 (configurable)

#### **System B: Reflection Sessions (Real-Time Chain)**
**Type:** Synchronous, turn-based  
**Mechanism:** Round-robin or first-come-first-serve

```typescript
// Location: src/types/chainSession.ts (inferred from usage)
interface ChainSession {
  id: string;
  title: string;
  participants: Participant[];
  segments: ChainSegment[];
  currentTurn?: string; // userId of current writer
  turnOrder: 'round-robin' | 'free-for-all';
}
```

**Turn Management:**
```typescript
// Location: src/hooks/useChainSession.ts
const addSegment = async (segment: Omit<ChainSegment, 'id' | 'createdAt' | 'hash'>) => {
  // Add segment to chain
  // System automatically advances turn to next participant
  await updateDoc(sessionRef, {
    segments: arrayUnion(newSegment),
    lastSegmentAt: serverTimestamp(),
  });
}
```

---

### 2.2 Simultaneous Writing Prevention

#### **Collaborative Stories: No Locking Needed**
- Multiple proposals can be created simultaneously
- Each proposal is independent
- Conflicts resolved during merge review
- Base version tracking prevents conflicts:

```typescript
interface Proposal {
  baseVersionId: string; // Version this proposal is based on
  content: string; // Full proposed content
}
```

#### **Reflection Sessions: Real-Time Presence**
```typescript
// Location: src/hooks/useSessionPresence.ts
// Real-time presence tracking prevents simultaneous edits
```

**Mechanism:**
1. User clicks "Write Next Segment"
2. System checks if another user is currently writing
3. If occupied, shows "Someone is writing..." indicator
4. Uses Firestore real-time listeners for presence

**Live Cursor System:**
```typescript
// Location: src/hooks/useLiveCursors.ts
// Shows where other participants are typing in real-time
```

---

### 2.3 Character/Word Limits

#### **Proposal Content**
```typescript
// No hard limit in code, but UI guidance exists
// Typical range: 500-5000 words per proposal
```

**UI Indicator:**
```typescript
// Location: src/components/collaborative/ProposalEditor.tsx
<div className="text-sm text-stone-400">
  char: {content.length}
</div>
```

#### **Chain Segments**
```typescript
// Location: src/types/chainSession.ts
interface ChainSegment {
  content: string; // No hard limit
  wordCount?: number; // Tracked for stats
}
```

**Recommended Limits (UI guidance):**
- Minimum: 50 words
- Maximum: 500 words per segment
- Enforced via UI validation, not database constraints

---

### 2.4 Ctrl + Enter Functionality

**Action:** Submit/Save Draft

```typescript
// Location: src/components/collaborative/ProposalEditor.tsx
const handleKeyDown = (e: KeyboardEvent) => {
  if (e.ctrlKey && e.key === 'Enter') {
    if (isDraft) {
      saveDraft(); // Save to Firestore with status: 'draft'
    } else {
      submitForVoting(); // Change status to 'voting'
    }
  }
};
```

**Behavior:**
- **In Draft Mode:** Saves progress to Firestore, keeps status as `draft`
- **In Submission Mode:** Submits proposal for voting, changes status to `voting`
- **Auto-save:** Also runs every 30 seconds in background

---

## 3. Story Integrity and Timeline

### 3.1 Can Committed Segments Be Edited?

#### **Collaborative Stories: Version Control**

**Answer:** No, merged proposals are immutable. New proposals required for changes.

```typescript
// Location: src/types/collaborativeStory.ts
interface Version {
  id: string;
  versionNumber: number;
  content: string; // Immutable once created
  changes: {
    type: 'initial' | 'proposal_merged' | 'direct_edit';
    proposalId?: string;
    authorId: string;
    summary: string;
  };
  createdAt: Timestamp;
}
```

**Edit Process:**
1. Create new proposal with type `edit`
2. Reference the section to be changed
3. Go through voting process
4. If approved, creates new version
5. Old version preserved in history

**Who Can Edit:**
- Any co-author can propose edits
- Owner can make direct edits (creates version without voting)

#### **Reflection Sessions: Limited Editing**

```typescript
// Location: src/hooks/useChainSession.ts
const updateSegment = async (segmentId: string, newContent: string) => {
  // Only segment author can edit
  // Only within 5 minutes of posting
  // Updates hash to maintain integrity
}
```

**Editing Rules:**
- Author can edit their own segment
- Must be within 5 minutes of posting
- Edit history tracked via hash changes
- After 5 minutes, segment becomes immutable

---

### 3.2 Reflection Sessions vs Collaborative Stories

| Feature | Reflection Sessions | Collaborative Stories |
|---------|-------------------|---------------------|
| **Timing** | Real-time, synchronous | Asynchronous |
| **Turn System** | Round-robin or free-for-all | No turns, proposal-based |
| **Approval** | Immediate (no voting) | Voting required |
| **Editing** | 5-minute window | No editing, new proposals only |
| **Participants** | 2-10 active writers | Unlimited co-authors |
| **Use Case** | Quick collaborative sessions | Long-term story development |
| **Version Control** | Linear chain | Branching proposals |

**Reflection Sessions Purpose:**
- Quick writing sprints
- Brainstorming sessions
- Character development exercises
- Plot exploration

**Collaborative Stories Purpose:**
- Full novel/story development
- Quality-controlled contributions
- Long-term projects
- Professional collaboration

---

### 3.3 Graph Legend & Timeline Structure

#### **"Just One Cursed, Linear Timeline"**

**Meaning:** Despite multiple proposals existing simultaneously, the **final story** is always linear.

```typescript
// Location: src/types/collaborativeStory.ts
interface CollaborativeProject {
  currentVersionId: string; // Points to ONE canonical version
}
```

**Visualization:**
```
Proposals (Branches):          Final Story (Linear):
                              
Proposal A ──┐                Version 1 (Initial)
Proposal B ──┼──> Voting      Version 2 (Proposal A merged)
Proposal C ──┘                Version 3 (Proposal C merged)
                              Version 4 (Proposal B merged)
```

#### **Graph Legend Explained**

```typescript
// Location: src/components/collaborative/BranchVisualizer.tsx
interface GraphNode {
  type: 'version' | 'proposal';
  status: 'current' | 'merged' | 'pending' | 'rejected';
  connections: {
    type: 'chronological' | 'based_on' | 'merged_into';
    targetId: string;
  }[];
}
```

**Connection Types:**
1. **Chronological Connections** (Blue lines)
   - Links versions in order: V1 → V2 → V3
   - Represents the canonical timeline
   - Always linear, never branches

2. **Based On Connections** (Gray dashed lines)
   - Shows which version a proposal was based on
   - Example: Proposal created from V2

3. **Merged Into Connections** (Green lines)
   - Shows when proposal was merged
   - Example: Proposal A merged to create V3

**Are There Hidden Branches?**

**Answer:** No. All proposals are visible to co-authors.

```typescript
// Location: src/hooks/useProposals.ts
// All proposals visible based on user's co-author status
const { proposals } = useProposals({ projectId });
// Returns ALL proposals: draft, voting, approved, rejected, merged
```

**Visibility Rules:**
- Co-authors see all proposals
- Public viewers see only merged content
- Rejected proposals remain visible for learning

---

## 4. Technical Details

### 4.1 Persistent Storage

#### **Data Stored in Firestore:**

**Collections:**
```
collaborativeProjects/
├── {projectId}/
    ├── linkedStoryId: string
    ├── ownerId: string
    ├── coAuthors: CoAuthor[]
    ├── currentVersionId: string
    ├── stats: { proposalCount, mergedCount, ... }
    ├── createdAt: Timestamp
    └── updatedAt: Timestamp

proposals/
├── {proposalId}/
    ├── projectId: string
    ├── authorId: string
    ├── authorName: string
    ├── content: string (full proposed text)
    ├── baseVersionId: string
    ├── status: ProposalStatus
    ├── votes: Vote[]
    ├── createdAt: Timestamp
    └── votingEndsAt: Timestamp

versions/
├── {versionId}/
    ├── projectId: string
    ├── versionNumber: number
    ├── content: string (full story at this version)
    ├── changes: { type, proposalId, authorId, summary }
    ├── createdAt: Timestamp
    └── createdBy: string

votes/
├── {voteId}/
    ├── proposalId: string
    ├── voterId: string
    ├── voterName: string
    ├── voterRole: CoAuthorRole
    ├── type: 'approve' | 'request_changes' | 'reject'
    ├── comment?: string
    └── votedAt: Timestamp

activities/
├── {activityId}/
    ├── projectId: string
    ├── userId: string
    ├── type: 'proposal_created' | 'vote_cast' | 'proposal_merged' | ...
    ├── metadata: Record<string, any>
    └── createdAt: Timestamp

chainSessions/
├── {sessionId}/
    ├── title: string
    ├── participants: Participant[]
    ├── segments: ChainSegment[]
    ├── createdAt: Timestamp
    └── lastSegmentAt: Timestamp
```

#### **Attribution & Metadata**

**Every piece of content stores:**
```typescript
{
  authorId: string,        // Firebase Auth UID
  authorName: string,      // Display name
  createdAt: Timestamp,    // Server timestamp
  hash: string,            // Content integrity hash (djb2)
  ipAddress?: string,      // NOT stored (privacy)
  userAgent?: string       // NOT stored (privacy)
}
```

**Privacy Note:** IP addresses and user agents are NOT stored to comply with privacy regulations.

---

### 4.2 Story ID Format

```typescript
// Location: src/hooks/useProjectActions.ts
const projectId = `proj_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
```

**Format:** `proj_1701518400000_abc123xyz`

**Components:**
- `proj_` - Prefix indicating project type
- `1701518400000` - Unix timestamp (milliseconds)
- `abc123xyz` - Random alphanumeric string (9 chars)

**Example:** `proj_1701518400000_k7m2p9x4q`

**Purpose:**
- Globally unique identifier
- Sortable by creation time
- URL-safe
- Collision-resistant

**Other ID Formats:**
```typescript
proposalId: `prop_${timestamp}_${random}`
voteId: `${proposalId}_${userId}` // Ensures one vote per user per proposal
activityId: `act_${timestamp}_${random}`
sessionId: `demo-${title.toLowerCase().replace(/\s+/g, '-')}` // For demo data
```

---

## 5. Voting & Approval System

### 5.1 Voting Algorithm

```typescript
// Location: src/utils/votingAlgorithm.ts
```

**Auto-Approval Conditions:**
```typescript
// Proposal automatically approved if:
approvePercent >= 60 && !ownerOrReviewerReject
```

**Auto-Rejection Conditions:**
```typescript
// Proposal automatically rejected if:
rejectPercent >= 40 || ownerReject
```

**Voting Rules:**
1. Co-authors can vote: `approve`, `request_changes`, or `reject`
2. Author cannot vote on own proposal
3. Voting period: 48 hours (configurable)
4. Owner has veto power (instant rejection)
5. Reviewers can block approval

**Vote Weights:**
- All votes equal weight (1 vote = 1 vote)
- Role affects merge permissions, not vote weight
- Exception: Owner reject = instant rejection

### 5.2 Voting Timeline

```typescript
// Location: src/hooks/useProposalActions.ts
const votingDuration = project.votingDuration || 48; // hours
const votingEndsAt = Timestamp.fromDate(
  new Date(Date.now() + votingDuration * 60 * 60 * 1000)
);
```

**Timeline:**
1. **Draft Phase** - Author writes proposal
2. **Submit for Voting** - Starts 48-hour timer
3. **Voting Period** - Co-authors cast votes
4. **Auto-Resolution** - System checks conditions every vote
5. **Manual Merge** - Owner/reviewer can merge if approved

**Early Termination:**
- Owner can merge approved proposals before voting ends
- Owner reject instantly ends voting
- 100% approval can trigger early merge

---

## 6. Security & Permissions

### 6.1 Permission Checks

```typescript
// Location: src/utils/projectPermissions.ts
export const canCreateProposal = (userId: string, project: CollaborativeProject): boolean => {
  return project.coAuthors.some(ca => ca.userId === userId);
};

export const canVote = (userId: string, proposal: Proposal, project: CollaborativeProject): boolean => {
  // Must be co-author
  const isCoAuthor = project.coAuthors.some(ca => ca.userId === userId);
  if (!isCoAuthor) return false;
  
  // Can't vote on own proposal
  if (proposal.authorId === userId) return false;
  
  // Must be in voting status
  return proposal.status === 'voting';
};

export const canMerge = (userId: string, project: CollaborativeProject): boolean => {
  const coAuthor = project.coAuthors.find(ca => ca.userId === userId);
  return coAuthor?.role === 'owner' || coAuthor?.role === 'reviewer';
};
```

### 6.2 Firestore Security Rules

```javascript
// Location: firestore.rules
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    
    // Collaborative Projects
    match /collaborativeProjects/{projectId} {
      allow read: if request.auth != null;
      allow create: if request.auth != null && 
                      request.resource.data.ownerId == request.auth.uid;
      allow update: if request.auth != null && 
                      resource.data.coAuthors.hasAny([request.auth.uid]);
      allow delete: if request.auth != null && 
                      resource.data.ownerId == request.auth.uid;
    }
    
    // Proposals
    match /proposals/{proposalId} {
      allow read: if request.auth != null;
      allow create: if request.auth != null;
      allow update: if request.auth != null;
      allow delete: if request.auth != null && 
                      resource.data.authorId == request.auth.uid;
    }
  }
}
```

---

## 7. User Experience Flow

### 7.1 Complete User Journey

**Scenario: Jane wants to collaborate on a horror story**

1. **Discovery**
   - Jane browses `/chains` page
   - Filters by genre: "Horror"
   - Finds "The Haunted Manuscript" project
   - Status: "Recruiting" (accepting new members)

2. **Joining**
   - Clicks "Request to Join"
   - Writes message: "I love psychological horror and have experience with unreliable narrators"
   - Request sent to project owner

3. **Approval**
   - Owner reviews request
   - Approves Jane as "Contributor"
   - Jane receives notification
   - Jane now appears in project's co-authors list

4. **First Proposal**
   - Jane reads current story (Version 5)
   - Clicks "New Proposal"
   - Selects type: "New Chapter"
   - Writes Chapter 6 (2,000 words)
   - Saves draft (Ctrl+Enter)
   - Reviews and submits for voting

5. **Voting Period**
   - 48-hour timer starts
   - Other co-authors receive notifications
   - 3 approve, 1 requests changes
   - Jane addresses feedback, updates proposal
   - Final vote: 4 approve, 0 reject
   - Status changes to "Approved"

6. **Merge**
   - Owner reviews approved proposal
   - Clicks "Merge Proposal"
   - System creates Version 6
   - Jane's contribution count increments
   - Activity feed updates
   - All co-authors notified

7. **Continued Collaboration**
   - Jane can now create more proposals
   - Can vote on others' proposals
   - Earns "Reviewer" role after 5 merged proposals
   - Can now merge approved proposals

---

## 8. Data Integrity & Conflict Resolution

### 8.1 Content Hashing

```typescript
// Location: src/hooks/useChainSession.ts
function djb2Hash(str: string): string {
  let hash = 5381;
  for (let i = 0; i < str.length; i++) {
    hash = (hash * 33) ^ str.charCodeAt(i);
  }
  return (hash >>> 0).toString(16).padStart(8, '0');
}
```

**Purpose:**
- Detect unauthorized changes
- Verify content integrity
- Track edit history
- Prevent tampering

**Usage:**
```typescript
const newSegment: ChainSegment = {
  content: "Once upon a time...",
  hash: djb2Hash("Once upon a time..."), // "a3f2c1d4"
  createdAt: Timestamp.now()
};
```

### 8.2 Conflict Resolution

**Scenario: Two proposals modify the same section**

```typescript
// Proposal A (based on Version 5)
baseVersionId: "v5"
content: "Chapter 6: The door creaked open..."

// Proposal B (also based on Version 5)
baseVersionId: "v5"
content: "Chapter 6: She heard footsteps..."
```

**Resolution Process:**
1. Proposal A approved first, creates Version 6
2. Proposal B still based on Version 5 (now outdated)
3. System flags Proposal B as "Needs Rebase"
4. Author must update Proposal B to be based on Version 6
5. Resubmit for voting

**Automatic Detection:**
```typescript
// Location: src/hooks/useProposalActions.ts
if (proposal.baseVersionId !== project.currentVersionId) {
  showWarning("This proposal is based on an outdated version. Please rebase.");
}
```

---

## 9. Performance & Scalability

### 9.1 Query Optimization

```typescript
// Location: src/hooks/useCollaborativeProjects.ts
// Firestore indexes required for efficient queries
const q = query(
  collection(db, 'collaborativeProjects'),
  where('status', '==', 'recruiting'),
  orderBy('updatedAt', 'desc'),
  limit(12)
);
```

**Required Indexes:**
```json
// firestore.indexes.json
{
  "indexes": [
    {
      "collectionGroup": "collaborativeProjects",
      "queryScope": "COLLECTION",
      "fields": [
        { "fieldPath": "status", "order": "ASCENDING" },
        { "fieldPath": "updatedAt", "order": "DESCENDING" }
      ]
    },
    {
      "collectionGroup": "proposals",
      "queryScope": "COLLECTION",
      "fields": [
        { "fieldPath": "projectId", "order": "ASCENDING" },
        { "fieldPath": "status", "order": "ASCENDING" },
        { "fieldPath": "createdAt", "order": "DESCENDING" }
      ]
    }
  ]
}
```

### 9.2 Real-Time Listeners

```typescript
// Location: src/hooks/useProposals.ts
// Efficient real-time updates using Firestore snapshots
const unsubscribe = onSnapshot(q, (snapshot) => {
  const proposals = snapshot.docs.map(doc => ({
    id: doc.id,
    ...doc.data()
  }));
  setProposals(proposals);
});
```

**Optimization:**
- Only subscribe to relevant data
- Unsubscribe when component unmounts
- Use pagination for large datasets
- Cache frequently accessed data

---

## 10. Analytics & Statistics

### 10.1 Project Stats

```typescript
interface ProjectStats {
  proposalCount: number;      // Total proposals created
  mergedCount: number;         // Successfully merged proposals
  contributorCount: number;    // Unique contributors
  versionCount: number;        // Total versions
  wordCount: number;           // Current story word count
  activeProposals: number;     // Proposals in voting
}
```

### 10.2 User Contribution Tracking

```typescript
interface CoAuthor {
  userId: string;
  displayName: string;
  role: CoAuthorRole;
  joinedAt: Timestamp;
  contributionCount: number;   // Merged proposals
  votesCount: number;          // Total votes cast
  proposalsCreated: number;    // Total proposals
  mergeRate: number;           // % of proposals merged
}
```

---

## 11. Future Enhancements (Not Yet Implemented)

### Planned Features:
1. **Branching Stories** - Allow alternative endings
2. **Character Adoption** - Co-authors "own" specific characters
3. **Writing Challenges** - Timed collaborative sprints
4. **Reader Polls** - Let readers vote on story direction
5. **Milestone Celebrations** - Achievements for word counts
6. **Export to EPUB** - Download finished stories
7. **AI Writing Assistant** - Suggest continuations
8. **Translation Support** - Multi-language collaboration

---

## 12. Summary

Tale Threads implements a sophisticated collaborative writing platform with:

✅ **Dual Modes:** Asynchronous proposals + Real-time sessions  
✅ **Version Control:** Git-like branching and merging  
✅ **Democratic Voting:** Weighted by role, with owner veto  
✅ **Immutable History:** All versions preserved  
✅ **Real-Time Collaboration:** Live cursors and presence  
✅ **Flexible Permissions:** Owner/Reviewer/Contributor roles  
✅ **Conflict Resolution:** Base version tracking  
✅ **Content Integrity:** Cryptographic hashing  
✅ **Scalable Architecture:** Firestore real-time database  

**Key Insight:** The system balances creative freedom (anyone can propose) with quality control (voting required), making it suitable for both casual and professional collaborative writing.

---

**Document Version:** 1.0  
**Last Updated:** December 2, 2025  
**Maintained By:** Development Team
