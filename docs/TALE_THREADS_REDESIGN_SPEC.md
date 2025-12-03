# Tale Threads: GitHub-Style Collaborative Stories
## Simplified, Functional Redesign

**Goal**: Make collaborative story writing work like GitHub - intuitive version control with proposals, voting, and merging.

---

## Core Concept

Think of it like GitHub for stories:
- **Projects** = Repositories (your story)
- **Proposals** = Pull Requests (suggested changes)
- **Voting** = Code Review (approve/reject)
- **Merge** = Accept changes into main story
- **Versions** = Commit history

---

## What Users Actually Do

### 1. Create a Project
- Start from an existing story in your Library
- Enable collaboration → creates a project
- Invite co-authors with roles

### 2. Make Proposals
- Co-author writes a change (new chapter, edit, etc.)
- Submit as proposal → enters voting
- Others review and vote

### 3. Vote on Proposals
- **Approve** = I like this
- **Request Changes** = Needs work
- **Reject** = Don't add this

### 4. Merge Approved Proposals
- Owner/reviewers merge approved proposals
- Story updates with new content
- Version history preserved

### 5. View History
- See all versions
- Compare changes (diff view)
- Revert if needed

---

## Simplified Features

### MVP (Must Have)

#### Project Management
- ✅ Create project from Library story
- ✅ Invite co-authors (owner/reviewer/contributor)
- ✅ Set visibility (public/private/invite-only)
- ✅ View project dashboard

#### Proposals
- ✅ Create proposal with content
- ✅ Submit for voting
- ✅ View proposal list (open/merged/rejected)
- ✅ Comment on proposals

#### Voting
- ✅ Cast vote (approve/request changes/reject)
- ✅ View vote counts
- ✅ Auto-approve when threshold met
- ✅ Owner can override

#### Merging
- ✅ Merge approved proposals
- ✅ Create new version
- ✅ Update main story content

#### Version Control
- ✅ View version history
- ✅ See what changed (diff)
- ✅ Track who made changes

### Phase 2 (Nice to Have)

- 🔄 Branching (work on multiple ideas)
- 🔄 Conflict resolution (when proposals overlap)
- 🔄 Real-time collaboration
- 🔄 Export to PDF/ePub
- 🔄 Analytics (contribution stats)

---

## User Roles & Permissions

### Owner
- Full control
- Merge proposals
- Manage co-authors
- Delete project
- Override votes

### Reviewer
- Create proposals
- Vote on proposals
- Merge proposals
- Comment

### Contributor
- Create proposals
- Vote on proposals
- Comment

---

## Proposal Workflow

```
1. DRAFT
   ↓ (author writes)
2. VOTING
   ↓ (co-authors vote)
3. APPROVED / REJECTED
   ↓ (if approved)
4. MERGED
   ↓
5. Story Updated
```

### Voting Rules

**Auto-Approve** when:
- 60%+ approve votes
- No reject votes from owner/reviewers
- Voting period complete (48 hours)

**Auto-Reject** when:
- 40%+ reject votes
- Owner rejects

**Owner Override**:
- Owner can merge anytime
- Owner can reject anytime

---

## UI Structure

### Main Page: `/chains?tab=projects`

```
┌─────────────────────────────────────────┐
│ Tale Threads                            │
│ ┌─────────────┬──────────────────────┐ │
│ │ Sessions    │ Projects ✓           │ │
│ └─────────────┴──────────────────────┘ │
├─────────────────────────────────────────┤
│ [+ New Project]  [Filters ▾]            │
├─────────────────────────────────────────┤
│ 📖 The Haunted Manor                    │
│    5 co-authors • 3 open proposals      │
│    Updated 2 hours ago                  │
├─────────────────────────────────────────┤
│ 📖 Cyberpunk Chronicles                 │
│    2 co-authors • 1 open proposal       │
│    Updated 1 day ago                    │
└─────────────────────────────────────────┘
```

### Project Page: `/chains/projects/:id`

```
┌─────────────────────────────────────────┐
│ ← Back to Projects                      │
│                                         │
│ 📖 The Haunted Manor                    │
│ by Alice • Horror • 5 co-authors        │
│                                         │
│ ┌─────┬──────────┬─────────┬─────────┐ │
│ │ Code│ Proposals│ Versions│ Settings│ │
│ └─────┴──────────┴─────────┴─────────┘ │
├─────────────────────────────────────────┤
│ [+ New Proposal]                        │
│                                         │
│ Open Proposals (3)                      │
│ ┌─────────────────────────────────────┐ │
│ │ #12 Add Chapter 5                   │ │
│ │ by Bob • 2 approve, 0 reject        │ │
│ │ ✓ Ready to merge                    │ │
│ └─────────────────────────────────────┘ │
│ ┌─────────────────────────────────────┐ │
│ │ #11 Fix typos in Chapter 3          │ │
│ │ by Carol • 1 approve, 1 changes     │ │
│ │ ⏱ Voting ends in 24h                │ │
│ └─────────────────────────────────────┘ │
└─────────────────────────────────────────┘
```

### Proposal Detail: `/chains/projects/:id/proposals/:proposalId`

```
┌─────────────────────────────────────────┐
│ ← Back to Project                       │
│                                         │
│ #12 Add Chapter 5                       │
│ by Bob • opened 2 days ago              │
│                                         │
│ ┌─────────────┬──────────┬───────────┐ │
│ │ Conversation│ Changes  │ Commits   │ │
│ └─────────────┴──────────┴───────────┘ │
├─────────────────────────────────────────┤
│ Bob commented 2 days ago:               │
│ "Adding the climax chapter where..."   │
│                                         │
│ [View Changes] [View Full Content]      │
│                                         │
│ Votes (2/5 co-authors)                  │
│ ✓ Alice approved                        │
│ ✓ Carol approved                        │
│ ⏱ David, Eve, Frank haven't voted      │
│                                         │
│ [✓ Approve] [✎ Request Changes] [✕ Reject] │
│                                         │
│ [Merge Proposal] (owner/reviewer only)  │
└─────────────────────────────────────────┘
```

---

## Data Model (Simplified)

### Projects Collection

```typescript
{
  id: string;
  linkedStoryId: string; // From Library
  ownerId: string;
  title: string;
  genre: string;
  description: string;
  
  coAuthors: [
    {
      userId: string;
      displayName: string;
      role: 'owner' | 'reviewer' | 'contributor';
      joinedAt: Timestamp;
    }
  ];
  
  status: 'recruiting' | 'active' | 'archived';
  visibility: 'public' | 'private' | 'invite-only';
  currentVersionId: string;
  
  stats: {
    proposalCount: number;
    mergedCount: number;
    contributorCount: number;
  };
  
  createdAt: Timestamp;
  updatedAt: Timestamp;
}
```

### Proposals Collection

```typescript
{
  id: string;
  projectId: string;
  authorId: string;
  authorName: string;
  
  title: string;
  description: string;
  type: 'new_chapter' | 'edit' | 'character' | 'plot';
  
  content: string; // Full proposed content
  baseVersionId: string; // Version this is based on
  
  status: 'draft' | 'voting' | 'approved' | 'rejected' | 'merged';
  
  votes: [
    {
      userId: string;
      userName: string;
      type: 'approve' | 'request_changes' | 'reject';
      comment: string;
      votedAt: Timestamp;
    }
  ];
  
  votingEndsAt: Timestamp; // 48 hours from submission
  
  createdAt: Timestamp;
  updatedAt: Timestamp;
  mergedAt?: Timestamp;
  mergedBy?: string;
}
```

### Versions Collection

```typescript
{
  id: string;
  projectId: string;
  versionNumber: number;
  
  content: string; // Full story content at this version
  
  changes: {
    type: 'initial' | 'proposal_merged' | 'direct_edit';
    proposalId?: string;
    authorId: string;
    authorName: string;
    summary: string;
  };
  
  createdAt: Timestamp;
  createdBy: string;
}
```

### Comments Collection

```typescript
{
  id: string;
  proposalId: string;
  authorId: string;
  authorName: string;
  content: string;
  createdAt: Timestamp;
}
```

---

## API Endpoints (Conceptual)

### Projects

```
POST   /api/projects              Create project
GET    /api/projects              List projects
GET    /api/projects/:id          Get project
PATCH  /api/projects/:id          Update project
DELETE /api/projects/:id          Delete project

POST   /api/projects/:id/invite   Invite co-author
DELETE /api/projects/:id/coauthors/:userId  Remove co-author
```

### Proposals

```
POST   /api/projects/:id/proposals           Create proposal
GET    /api/projects/:id/proposals           List proposals
GET    /api/proposals/:id                    Get proposal
PATCH  /api/proposals/:id                    Update proposal
DELETE /api/proposals/:id                    Delete proposal

POST   /api/proposals/:id/submit             Submit for voting
POST   /api/proposals/:id/vote               Cast vote
POST   /api/proposals/:id/merge              Merge proposal
```

### Versions

```
GET    /api/projects/:id/versions            List versions
GET    /api/versions/:id                     Get version
GET    /api/versions/:id/diff                Get diff
```

### Comments

```
POST   /api/proposals/:id/comments           Add comment
GET    /api/proposals/:id/comments           List comments
```

---

## Implementation Priority

### Week 1: Core Project CRUD
- [ ] Create project from story
- [ ] List projects
- [ ] View project details
- [ ] Invite co-authors
- [ ] Basic permissions

### Week 2: Proposals
- [ ] Create proposal
- [ ] List proposals
- [ ] View proposal details
- [ ] Edit proposal (draft only)
- [ ] Delete proposal

### Week 3: Voting
- [ ] Submit proposal for voting
- [ ] Cast votes
- [ ] View vote counts
- [ ] Auto-approve logic
- [ ] Voting deadline

### Week 4: Merging & Versions
- [ ] Merge proposal
- [ ] Create version
- [ ] Update story content
- [ ] View version history
- [ ] Basic diff view

### Week 5: Polish
- [ ] Comments on proposals
- [ ] Activity feed
- [ ] Notifications
- [ ] Search/filters
- [ ] Mobile responsive

---

## Key Differences from Current

### Removed Complexity
- ❌ Reflection Sessions (separate feature)
- ❌ Real-time cursors (Phase 2)
- ❌ Scrapbook elements (not needed)
- ❌ Complex branching (Phase 2)

### Simplified
- ✅ One clear workflow: Draft → Vote → Merge
- ✅ Simple roles: Owner, Reviewer, Contributor
- ✅ Clear voting rules
- ✅ GitHub-inspired UI

### Added Clarity
- ✅ Proposals are like Pull Requests
- ✅ Versions are like Commits
- ✅ Merging updates the main story
- ✅ History is preserved

---

## Success Metrics

### MVP Success = All These Work
1. ✅ Create project from story
2. ✅ Invite 2+ co-authors
3. ✅ Create proposal
4. ✅ Vote on proposal
5. ✅ Merge approved proposal
6. ✅ See updated story
7. ✅ View version history

### User Feedback
- "I understand what to do"
- "It's like GitHub but for stories"
- "Voting is clear"
- "I can see what changed"

---

## Next Steps

1. **Review this spec** - Does it make sense?
2. **Simplify data model** - Remove unused fields
3. **Build project CRUD** - Start with basics
4. **Add proposal system** - Core workflow
5. **Implement voting** - Make it work
6. **Test with real users** - Get feedback

---

## Questions to Answer

1. **Conflict Resolution**: What if two proposals edit the same section?
   - **Answer**: Last merged wins. Show warning. Phase 2: smart merge.

2. **Voting Ties**: What if votes are 50/50?
   - **Answer**: Owner decides. Or extend voting 24h.

3. **Version Limits**: How many versions to keep?
   - **Answer**: All versions. Add cleanup later if needed.

4. **Proposal Limits**: Max open proposals?
   - **Answer**: 10 per project. Prevents spam.

5. **Co-Author Limits**: Max co-authors?
   - **Answer**: 10. Keeps voting manageable.

---

**This spec focuses on making ONE thing work really well: collaborative story writing with version control.**

Let me know what you think, and I'll start implementing!
