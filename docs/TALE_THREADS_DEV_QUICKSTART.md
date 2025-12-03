# Tale Threads Developer Quick Start
## Get Building in 5 Minutes

Everything you need to start implementing the GitHub-style collaborative story system.

---

## 📚 Read These First

1. **[Redesign Spec](TALE_THREADS_REDESIGN_SPEC.md)** - What we're building (10 min read)
2. **[Visual Guide](TALE_THREADS_VISUAL_GUIDE.md)** - What it looks like (5 min read)
3. **[Implementation Guide](TALE_THREADS_IMPLEMENTATION_GUIDE.md)** - How to build it (20 min read)

---

## 🎯 Core Concept

**Tale Threads = GitHub for Stories**

- **Projects** = Repositories
- **Proposals** = Pull Requests
- **Voting** = Code Review
- **Merge** = Accept changes
- **Versions** = Commits

---

## 🗂️ Data Model

### Collections

```
collaborativeProjects/
  {projectId}/
    - linkedStoryId
    - ownerId, ownerName
    - title, genre, description
    - coAuthors[]
    - status, visibility
    - currentVersionId
    - stats{}
    - createdAt, updatedAt

proposals/
  {proposalId}/
    - projectId
    - authorId, authorName
    - title, description, type
    - content
    - baseVersionId
    - status
    - votes[]
    - votingEndsAt
    - createdAt, updatedAt

versions/
  {versionId}/
    - projectId
    - versionNumber
    - content
    - changes{}
    - createdAt, createdBy

comments/
  {commentId}/
    - proposalId
    - authorId, authorName
    - content
    - createdAt

invitations/
  {invitationId}/
    - projectId
    - inviterId, inviteeEmail
    - role
    - status
    - createdAt, expiresAt

activities/
  {activityId}/
    - projectId
    - userId, userName
    - type
    - metadata{}
    - createdAt
```

---

## 🔑 Key Types

```typescript
// Project
type ProjectStatus = 'recruiting' | 'active' | 'archived';
type CoAuthorRole = 'owner' | 'reviewer' | 'contributor';

// Proposal
type ProposalStatus = 'draft' | 'voting' | 'approved' | 'rejected' | 'merged';
type ProposalType = 'new_chapter' | 'edit' | 'character' | 'plot';
type VoteType = 'approve' | 'request_changes' | 'reject';
```

---

## 🛠️ Implementation Order

### Week 1: Projects
```typescript
// 1. Create project from story
const createProject = async (storyId: string) => {
  // Get story → Create project → Create initial version
};

// 2. Invite co-authors
const inviteCoAuthor = async (projectId: string, email: string, role: CoAuthorRole) => {
  // Create invitation → Send email
};

// 3. Accept invitation
const acceptInvitation = async (invitationId: string) => {
  // Add to coAuthors → Update invitation
};
```

### Week 2: Proposals
```typescript
// 1. Create proposal
const createProposal = async (projectId: string, data: ProposalData) => {
  // Check permissions → Create proposal → Update stats
};

// 2. Submit for voting
const submitForVoting = async (proposalId: string) => {
  // Set votingEndsAt → Update status → Notify co-authors
};
```

### Week 3: Voting
```typescript
// 1. Cast vote
const castVote = async (proposalId: string, type: VoteType, comment?: string) => {
  // Check permissions → Add/update vote → Check status
};

// 2. Check voting status
const checkVotingStatus = async (proposalId: string) => {
  // Calculate votes → Auto-approve/reject if thresholds met
};
```

### Week 4: Merging
```typescript
// 1. Merge proposal
const mergeProposal = async (proposalId: string) => {
  // Check permissions → Create new version → Update project → Log activity
};

// 2. View versions
const useVersions = (projectId: string) => {
  // Query versions → Return sorted list
};

// 3. Compare versions
const generateDiff = (oldContent: string, newContent: string) => {
  // Use diff library → Return changes
};
```

---

## 🎨 UI Components

### Pages
```
/chains?tab=projects          → Project list
/chains/projects/:id          → Project detail
/chains/projects/:id/proposals/:pid → Proposal detail
```

### Components
```typescript
<ProjectList />               // List all projects
<ProjectCard />               // Single project card
<ProjectDetail />             // Project overview
<ProposalList />              // List proposals
<ProposalCard />              // Single proposal card
<ProposalDetail />            // Proposal with voting
<VotingPanel />               // Vote interface
<VersionHistory />            // List versions
<DiffView />                  // Compare versions
```

---

## 🔐 Permissions

### Owner
- ✅ Everything
- ✅ Merge anytime
- ✅ Override votes
- ✅ Manage co-authors
- ✅ Delete project

### Reviewer
- ✅ Create proposals
- ✅ Vote
- ✅ Merge approved proposals
- ✅ Comment
- ❌ Override votes
- ❌ Manage co-authors

### Contributor
- ✅ Create proposals
- ✅ Vote
- ✅ Comment
- ❌ Merge
- ❌ Manage co-authors

---

## 📊 Voting Rules

### Auto-Approve
- 60%+ approve votes
- No reject from owner/reviewers
- Voting period complete

### Auto-Reject
- 40%+ reject votes
- Owner rejects

### Owner Override
- Owner can merge anytime
- Owner can reject anytime

---

## 🧪 Testing Checklist

### Basic Flow
- [ ] Create project
- [ ] Invite co-author
- [ ] Accept invitation
- [ ] Create proposal
- [ ] Submit for voting
- [ ] Cast votes
- [ ] Merge proposal
- [ ] View history

### Edge Cases
- [ ] Max co-authors
- [ ] Max proposals
- [ ] Expired voting
- [ ] Invalid permissions
- [ ] Concurrent merges

---

## 🚀 Quick Commands

### Create Project
```typescript
const projectId = await createProject('story-123', {
  description: 'Collaborative horror story',
  visibility: 'private',
});
```

### Invite Co-Author
```typescript
await inviteCoAuthor(projectId, 'friend@example.com', 'reviewer');
```

### Create Proposal
```typescript
const proposalId = await createProposal(projectId, {
  title: 'Add Chapter 5',
  description: 'The climax chapter',
  type: 'new_chapter',
  content: '# Chapter 5\n\nThe revelation...',
});
```

### Submit for Voting
```typescript
await submitForVoting(proposalId);
```

### Cast Vote
```typescript
await castVote(proposalId, 'approve', 'Love it!');
```

### Merge
```typescript
await mergeProposal(proposalId);
```

---

## 📦 Dependencies

```json
{
  "firebase": "^10.x",
  "react": "^18.x",
  "react-router-dom": "^6.x",
  "diff": "^5.x"
}
```

---

## 🎯 Success Metrics

### MVP Complete When:
1. ✅ Can create project
2. ✅ Can invite co-authors
3. ✅ Can create proposals
4. ✅ Can vote on proposals
5. ✅ Can merge proposals
6. ✅ Can view history
7. ✅ All tests pass

### User Feedback:
- "I understand what to do"
- "It's like GitHub but for stories"
- "Voting is clear"
- "I can see what changed"

---

## 🐛 Common Issues

### "Permission denied"
→ Check if user is co-author

### "Max proposals reached"
→ Close some proposals first

### "Voting period expired"
→ Owner can still merge

### "Can't merge"
→ Check role (owner/reviewer only)

---

## 📚 File Structure

```
src/
├── types/
│   └── collaborativeStory.ts    ← All types
├── hooks/
│   ├── useCollaborativeProjects.ts
│   ├── useProjectActions.ts
│   ├── useProposals.ts
│   ├── useProposalActions.ts
│   └── useVersions.ts
├── components/
│   └── collaborative/
│       ├── ProjectList.tsx
│       ├── ProjectCard.tsx
│       ├── ProjectDetail.tsx
│       ├── ProposalList.tsx
│       ├── ProposalCard.tsx
│       ├── ProposalDetail.tsx
│       ├── VotingPanel.tsx
│       ├── VersionHistory.tsx
│       └── DiffView.tsx
├── pages/
│   ├── Chains.tsx               ← Main page
│   └── CollaborativeProject.tsx ← Project detail
└── utils/
    ├── projectPermissions.ts
    ├── votingAlgorithm.ts
    └── diffEngine.ts
```

---

## 🎬 Next Steps

1. **Read the spec** - [TALE_THREADS_REDESIGN_SPEC.md](TALE_THREADS_REDESIGN_SPEC.md)
2. **Check the visuals** - [TALE_THREADS_VISUAL_GUIDE.md](TALE_THREADS_VISUAL_GUIDE.md)
3. **Follow the guide** - [TALE_THREADS_IMPLEMENTATION_GUIDE.md](TALE_THREADS_IMPLEMENTATION_GUIDE.md)
4. **Start coding** - Begin with Week 1: Projects
5. **Test everything** - Use the testing checklist
6. **Ship it** - Deploy and get feedback

---

## 💡 Pro Tips

1. **Start simple** - Get basic CRUD working first
2. **Test early** - Don't wait until the end
3. **Use real data** - Create actual projects
4. **Get feedback** - Show users early versions
5. **Iterate** - Improve based on feedback

---

## 🆘 Need Help?

1. Check the [Implementation Guide](TALE_THREADS_IMPLEMENTATION_GUIDE.md)
2. Review the [Redesign Spec](TALE_THREADS_REDESIGN_SPEC.md)
3. Look at the [Visual Guide](TALE_THREADS_VISUAL_GUIDE.md)
4. Check existing code in `src/components/collaborative/`

---

**You're ready to build! Start with Week 1 and work incrementally.**

Good luck! 🚀
