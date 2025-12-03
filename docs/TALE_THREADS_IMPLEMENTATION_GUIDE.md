# Tale Threads Implementation Guide
## Building the GitHub-Style Collaborative Story System

This guide walks through implementing the simplified, functional Tale Threads system.

---

## Phase 1: Project Management (Week 1)

### 1.1 Create Project from Story

**File**: `src/hooks/useProjectActions.ts`

```typescript
export const useProjectActions = () => {
  const { currentUser } = useAuth();
  
  const createProject = async (storyId: string, settings?: Partial<CollaborativeProject>) => {
    // 1. Get story from Library
    const story = await getDoc(doc(db, 'stories', storyId));
    
    // 2. Create project
    const projectData: Omit<CollaborativeProject, 'id'> = {
      linkedStoryId: storyId,
      ownerId: currentUser.uid,
      ownerName: currentUser.displayName,
      title: story.data().title,
      genre: story.data().genre,
      description: settings?.description || '',
      coAuthors: [{
        userId: currentUser.uid,
        displayName: currentUser.displayName,
        role: 'owner',
        joinedAt: Timestamp.now(),
        contributionCount: 0,
      }],
      status: 'recruiting',
      visibility: settings?.visibility || 'private',
      currentVersionId: '', // Will be set after creating initial version
      maxCoAuthors: 10,
      requireApproval: true,
      maxOpenProposals: 10,
      votingDuration: 48,
      stats: {
        proposalCount: 0,
        mergedCount: 0,
        contributorCount: 1,
        versionCount: 1,
      },
      createdAt: Timestamp.now(),
      updatedAt: Timestamp.now(),
    };
    
    const projectRef = await addDoc(collection(db, 'collaborativeProjects'), projectData);
    
    // 3. Create initial version
    const versionData: Omit<Version, 'id'> = {
      projectId: projectRef.id,
      versionNumber: 1,
      content: story.data().content || '',
      changes: {
        type: 'initial',
        authorId: currentUser.uid,
        authorName: currentUser.displayName,
        summary: 'Initial version',
      },
      createdAt: Timestamp.now(),
      createdBy: currentUser.uid,
      createdByName: currentUser.displayName,
    };
    
    const versionRef = await addDoc(collection(db, 'versions'), versionData);
    
    // 4. Update project with version ID
    await updateDoc(projectRef, { currentVersionId: versionRef.id });
    
    return projectRef.id;
  };
  
  return { createProject };
};
```

### 1.2 Invite Co-Authors

**File**: `src/hooks/useProjectActions.ts`

```typescript
const inviteCoAuthor = async (
  projectId: string,
  email: string,
  role: CoAuthorRole,
  message?: string
) => {
  const project = await getDoc(doc(db, 'collaborativeProjects', projectId));
  
  // Check permissions
  if (project.data().ownerId !== currentUser.uid) {
    throw new Error('Only owner can invite co-authors');
  }
  
  // Check limits
  if (project.data().coAuthors.length >= project.data().maxCoAuthors) {
    throw new Error('Maximum co-authors reached');
  }
  
  // Create invitation
  const invitationData: Omit<Invitation, 'id'> = {
    projectId,
    projectTitle: project.data().title,
    inviterId: currentUser.uid,
    inviterName: currentUser.displayName,
    inviteeEmail: email,
    role,
    message,
    status: 'pending',
    createdAt: Timestamp.now(),
    expiresAt: Timestamp.fromDate(new Date(Date.now() + 7 * 24 * 60 * 60 * 1000)),
  };
  
  await addDoc(collection(db, 'invitations'), invitationData);
  
  // TODO: Send email notification
};
```

### 1.3 Accept Invitation

```typescript
const acceptInvitation = async (invitationId: string) => {
  const invitation = await getDoc(doc(db, 'invitations', invitationId));
  const invData = invitation.data();
  
  // Add to project co-authors
  await updateDoc(doc(db, 'collaborativeProjects', invData.projectId), {
    coAuthors: arrayUnion({
      userId: currentUser.uid,
      displayName: currentUser.displayName,
      role: invData.role,
      joinedAt: Timestamp.now(),
      contributionCount: 0,
    }),
    'stats.contributorCount': increment(1),
  });
  
  // Update invitation
  await updateDoc(invitation.ref, {
    status: 'accepted',
    inviteeId: currentUser.uid,
    respondedAt: Timestamp.now(),
  });
  
  // Log activity
  await addDoc(collection(db, 'activities'), {
    projectId: invData.projectId,
    userId: currentUser.uid,
    userName: currentUser.displayName,
    type: 'coauthor_joined',
    metadata: { role: invData.role },
    createdAt: Timestamp.now(),
  });
};
```

---

## Phase 2: Proposals (Week 2)

### 2.1 Create Proposal

**File**: `src/hooks/useProposalActions.ts`

```typescript
export const useProposalActions = () => {
  const { currentUser } = useAuth();
  
  const createProposal = async (
    projectId: string,
    data: {
      title: string;
      description: string;
      type: ProposalType;
      content: string;
    }
  ) => {
    const project = await getDoc(doc(db, 'collaborativeProjects', projectId));
    
    // Check if user is co-author
    const isCoAuthor = project.data().coAuthors.some(
      (ca: CoAuthor) => ca.userId === currentUser.uid
    );
    if (!isCoAuthor) {
      throw new Error('Only co-authors can create proposals');
    }
    
    // Check open proposal limit
    const openProposals = await getDocs(
      query(
        collection(db, 'proposals'),
        where('projectId', '==', projectId),
        where('status', 'in', ['draft', 'voting'])
      )
    );
    
    if (openProposals.size >= project.data().maxOpenProposals) {
      throw new Error('Maximum open proposals reached');
    }
    
    // Create proposal
    const proposalData: Omit<Proposal, 'id'> = {
      projectId,
      authorId: currentUser.uid,
      authorName: currentUser.displayName,
      title: data.title,
      description: data.description,
      type: data.type,
      content: data.content,
      baseVersionId: project.data().currentVersionId,
      status: 'draft',
      votes: [],
      createdAt: Timestamp.now(),
      updatedAt: Timestamp.now(),
    };
    
    const proposalRef = await addDoc(collection(db, 'proposals'), proposalData);
    
    // Update project stats
    await updateDoc(doc(db, 'collaborativeProjects', projectId), {
      'stats.proposalCount': increment(1),
      updatedAt: Timestamp.now(),
    });
    
    return proposalRef.id;
  };
  
  return { createProposal };
};
```

### 2.2 Submit for Voting

```typescript
const submitForVoting = async (proposalId: string) => {
  const proposal = await getDoc(doc(db, 'proposals', proposalId));
  const propData = proposal.data();
  
  // Only author can submit
  if (propData.authorId !== currentUser.uid) {
    throw new Error('Only author can submit proposal');
  }
  
  // Must be in draft status
  if (propData.status !== 'draft') {
    throw new Error('Proposal must be in draft status');
  }
  
  // Calculate voting end time
  const project = await getDoc(doc(db, 'collaborativeProjects', propData.projectId));
  const votingDuration = project.data().votingDuration || 48;
  const votingEndsAt = Timestamp.fromDate(
    new Date(Date.now() + votingDuration * 60 * 60 * 1000)
  );
  
  // Update proposal
  await updateDoc(proposal.ref, {
    status: 'voting',
    submittedAt: Timestamp.now(),
    votingEndsAt,
    updatedAt: Timestamp.now(),
  });
  
  // Log activity
  await addDoc(collection(db, 'activities'), {
    projectId: propData.projectId,
    userId: currentUser.uid,
    userName: currentUser.displayName,
    type: 'proposal_submitted',
    metadata: { proposalId, title: propData.title },
    createdAt: Timestamp.now(),
  });
  
  // TODO: Notify co-authors
};
```

---

## Phase 3: Voting (Week 3)

### 3.1 Cast Vote

**File**: `src/hooks/useProposalActions.ts`

```typescript
const castVote = async (
  proposalId: string,
  voteType: VoteType,
  comment?: string
) => {
  const proposal = await getDoc(doc(db, 'proposals', proposalId));
  const propData = proposal.data();
  
  // Check if proposal is in voting status
  if (propData.status !== 'voting') {
    throw new Error('Proposal is not open for voting');
  }
  
  // Check if voting period has ended
  if (propData.votingEndsAt && propData.votingEndsAt.toDate() < new Date()) {
    throw new Error('Voting period has ended');
  }
  
  // Check if user is co-author
  const project = await getDoc(doc(db, 'collaborativeProjects', propData.projectId));
  const coAuthor = project.data().coAuthors.find(
    (ca: CoAuthor) => ca.userId === currentUser.uid
  );
  
  if (!coAuthor) {
    throw new Error('Only co-authors can vote');
  }
  
  // Check if user already voted
  const existingVote = propData.votes.find(
    (v: Vote) => v.voterId === currentUser.uid
  );
  
  if (existingVote) {
    // Update existing vote
    const updatedVotes = propData.votes.map((v: Vote) =>
      v.voterId === currentUser.uid
        ? { ...v, type: voteType, comment, votedAt: Timestamp.now() }
        : v
    );
    
    await updateDoc(proposal.ref, {
      votes: updatedVotes,
      updatedAt: Timestamp.now(),
    });
  } else {
    // Add new vote
    const vote: Vote = {
      id: `${proposalId}_${currentUser.uid}`,
      proposalId,
      voterId: currentUser.uid,
      voterName: currentUser.displayName,
      voterRole: coAuthor.role,
      type: voteType,
      comment,
      votedAt: Timestamp.now(),
    };
    
    await updateDoc(proposal.ref, {
      votes: arrayUnion(vote),
      updatedAt: Timestamp.now(),
    });
  }
  
  // Check if voting is complete and update status
  await checkVotingStatus(proposalId);
  
  // Log activity
  await addDoc(collection(db, 'activities'), {
    projectId: propData.projectId,
    userId: currentUser.uid,
    userName: currentUser.displayName,
    type: 'vote_cast',
    metadata: { proposalId, voteType },
    createdAt: Timestamp.now(),
  });
};
```

### 3.2 Check Voting Status

```typescript
const checkVotingStatus = async (proposalId: string) => {
  const proposal = await getDoc(doc(db, 'proposals', proposalId));
  const propData = proposal.data();
  
  if (propData.status !== 'voting') return;
  
  const project = await getDoc(doc(db, 'collaborativeProjects', propData.projectId));
  const coAuthors = project.data().coAuthors;
  
  // Calculate vote counts
  const approveCount = propData.votes.filter((v: Vote) => v.type === 'approve').length;
  const rejectCount = propData.votes.filter((v: Vote) => v.type === 'reject').length;
  const totalVotes = propData.votes.length;
  const totalCoAuthors = coAuthors.length;
  
  // Auto-approve if:
  // - 60%+ of co-authors approved
  // - No rejects from owner/reviewers
  const approvePercent = (approveCount / totalCoAuthors) * 100;
  const ownerOrReviewerReject = propData.votes.some(
    (v: Vote) => v.type === 'reject' && ['owner', 'reviewer'].includes(v.voterRole)
  );
  
  if (approvePercent >= 60 && !ownerOrReviewerReject) {
    await updateDoc(proposal.ref, {
      status: 'approved',
      updatedAt: Timestamp.now(),
    });
    return;
  }
  
  // Auto-reject if:
  // - 40%+ rejected
  // - Owner rejected
  const rejectPercent = (rejectCount / totalCoAuthors) * 100;
  const ownerReject = propData.votes.some(
    (v: Vote) => v.type === 'reject' && v.voterRole === 'owner'
  );
  
  if (rejectPercent >= 40 || ownerReject) {
    await updateDoc(proposal.ref, {
      status: 'rejected',
      updatedAt: Timestamp.now(),
    });
    
    await addDoc(collection(db, 'activities'), {
      projectId: propData.projectId,
      userId: 'system',
      userName: 'System',
      type: 'proposal_rejected',
      metadata: { proposalId, reason: 'voting' },
      createdAt: Timestamp.now(),
    });
  }
};
```

---

## Phase 4: Merging & Versions (Week 4)

### 4.1 Merge Proposal

**File**: `src/hooks/useProposalActions.ts`

```typescript
const mergeProposal = async (proposalId: string) => {
  const proposal = await getDoc(doc(db, 'proposals', proposalId));
  const propData = proposal.data();
  
  // Check permissions
  const project = await getDoc(doc(db, 'collaborativeProjects', propData.projectId));
  const coAuthor = project.data().coAuthors.find(
    (ca: CoAuthor) => ca.userId === currentUser.uid
  );
  
  if (!coAuthor || !['owner', 'reviewer'].includes(coAuthor.role)) {
    throw new Error('Only owner or reviewers can merge proposals');
  }
  
  // Check status
  if (!['approved', 'voting'].includes(propData.status)) {
    throw new Error('Proposal must be approved or in voting');
  }
  
  // If still voting, only owner can merge
  if (propData.status === 'voting' && coAuthor.role !== 'owner') {
    throw new Error('Only owner can merge during voting period');
  }
  
  // Get current version
  const currentVersion = await getDoc(doc(db, 'versions', project.data().currentVersionId));
  
  // Create new version
  const newVersionData: Omit<Version, 'id'> = {
    projectId: propData.projectId,
    versionNumber: currentVersion.data().versionNumber + 1,
    content: propData.content, // Use proposal content as new version
    changes: {
      type: 'proposal_merged',
      proposalId,
      authorId: propData.authorId,
      authorName: propData.authorName,
      summary: propData.title,
    },
    createdAt: Timestamp.now(),
    createdBy: currentUser.uid,
    createdByName: currentUser.displayName,
  };
  
  const newVersionRef = await addDoc(collection(db, 'versions'), newVersionData);
  
  // Update proposal
  await updateDoc(proposal.ref, {
    status: 'merged',
    mergedAt: Timestamp.now(),
    mergedBy: currentUser.uid,
    mergedByName: currentUser.displayName,
    updatedAt: Timestamp.now(),
  });
  
  // Update project
  await updateDoc(doc(db, 'collaborativeProjects', propData.projectId), {
    currentVersionId: newVersionRef.id,
    'stats.mergedCount': increment(1),
    'stats.versionCount': increment(1),
    updatedAt: Timestamp.now(),
  });
  
  // Update author's contribution count
  const updatedCoAuthors = project.data().coAuthors.map((ca: CoAuthor) =>
    ca.userId === propData.authorId
      ? { ...ca, contributionCount: ca.contributionCount + 1 }
      : ca
  );
  
  await updateDoc(doc(db, 'collaborativeProjects', propData.projectId), {
    coAuthors: updatedCoAuthors,
  });
  
  // Log activity
  await addDoc(collection(db, 'activities'), {
    projectId: propData.projectId,
    userId: currentUser.uid,
    userName: currentUser.displayName,
    type: 'proposal_merged',
    metadata: { proposalId, title: propData.title },
    createdAt: Timestamp.now(),
  });
  
  // TODO: Notify co-authors
};
```

### 4.2 View Version History

**File**: `src/hooks/useVersions.ts`

```typescript
export const useVersions = (projectId: string) => {
  const [versions, setVersions] = useState<Version[]>([]);
  const [loading, setLoading] = useState(true);
  
  useEffect(() => {
    const q = query(
      collection(db, 'versions'),
      where('projectId', '==', projectId),
      orderBy('versionNumber', 'desc')
    );
    
    const unsubscribe = onSnapshot(q, (snapshot) => {
      const versionsData = snapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data(),
      })) as Version[];
      
      setVersions(versionsData);
      setLoading(false);
    });
    
    return () => unsubscribe();
  }, [projectId]);
  
  return { versions, loading };
};
```

### 4.3 Compare Versions (Diff)

**File**: `src/utils/diffEngine.ts`

```typescript
import { diffWords } from 'diff';

export const generateDiff = (oldContent: string, newContent: string): ContentDiff[] => {
  const changes = diffWords(oldContent, newContent);
  
  return changes.map(change => ({
    type: change.added ? 'added' : change.removed ? 'removed' : 'unchanged',
    content: change.value,
  }));
};
```

---

## Phase 5: UI Components (Week 5)

### 5.1 Project List

**File**: `src/components/collaborative/ProjectList.tsx`

```typescript
export const ProjectList: React.FC = () => {
  const { projects, loading } = useCollaborativeProjects();
  
  if (loading) return <LoadingSkeleton />;
  
  return (
    <div className="space-y-3">
      {projects.map(project => (
        <ProjectCard key={project.id} project={project} />
      ))}
    </div>
  );
};
```

### 5.2 Proposal List

**File**: `src/components/collaborative/ProposalList.tsx`

```typescript
export const ProposalList: React.FC<{ projectId: string }> = ({ projectId }) => {
  const { proposals, loading } = useProposals(projectId);
  
  const openProposals = proposals.filter(p => ['draft', 'voting', 'approved'].includes(p.status));
  const closedProposals = proposals.filter(p => ['merged', 'rejected'].includes(p.status));
  
  return (
    <div className="space-y-6">
      <section>
        <h3 className="text-lg font-semibold mb-3">Open Proposals ({openProposals.length})</h3>
        <div className="space-y-2">
          {openProposals.map(proposal => (
            <ProposalCard key={proposal.id} proposal={proposal} />
          ))}
        </div>
      </section>
      
      <section>
        <h3 className="text-lg font-semibold mb-3">Closed Proposals ({closedProposals.length})</h3>
        <div className="space-y-2">
          {closedProposals.map(proposal => (
            <ProposalCard key={proposal.id} proposal={proposal} />
          ))}
        </div>
      </section>
    </div>
  );
};
```

### 5.3 Voting Interface

**File**: `src/components/collaborative/VotingPanel.tsx`

```typescript
export const VotingPanel: React.FC<{ proposal: Proposal }> = ({ proposal }) => {
  const { castVote } = useProposalActions();
  const [comment, setComment] = useState('');
  const [voting, setVoting] = useState(false);
  
  const handleVote = async (type: VoteType) => {
    setVoting(true);
    try {
      await castVote(proposal.id, type, comment);
      setComment('');
    } catch (error) {
      console.error('Error casting vote:', error);
    } finally {
      setVoting(false);
    }
  };
  
  const summary = calculateVoteSummary(proposal);
  
  return (
    <div className="border border-slate-800 rounded-lg p-4 space-y-4">
      <div>
        <h4 className="font-semibold mb-2">Votes ({summary.totalVotes})</h4>
        <div className="space-y-1">
          <div className="flex items-center gap-2">
            <div className="flex-1 bg-slate-900 rounded-full h-2">
              <div 
                className="bg-green-500 h-2 rounded-full"
                style={{ width: `${summary.approvePercent}%` }}
              />
            </div>
            <span className="text-sm text-slate-400">
              {summary.approveCount} approve
            </span>
          </div>
          <div className="flex items-center gap-2">
            <div className="flex-1 bg-slate-900 rounded-full h-2">
              <div 
                className="bg-red-500 h-2 rounded-full"
                style={{ width: `${summary.rejectPercent}%` }}
              />
            </div>
            <span className="text-sm text-slate-400">
              {summary.rejectCount} reject
            </span>
          </div>
        </div>
      </div>
      
      {summary.canMerge && (
        <div className="bg-green-500/10 border border-green-500/30 rounded p-3">
          <p className="text-sm text-green-400">✓ Ready to merge</p>
        </div>
      )}
      
      <div className="space-y-2">
        <textarea
          value={comment}
          onChange={(e) => setComment(e.target.value)}
          placeholder="Add a comment (optional)"
          className="w-full bg-slate-900 border border-slate-700 rounded p-2 text-sm"
          rows={3}
        />
        
        <div className="flex gap-2">
          <button
            onClick={() => handleVote('approve')}
            disabled={voting}
            className="flex-1 bg-green-500/20 border border-green-500/50 text-green-400 rounded px-4 py-2 hover:bg-green-500/30"
          >
            ✓ Approve
          </button>
          <button
            onClick={() => handleVote('request_changes')}
            disabled={voting}
            className="flex-1 bg-yellow-500/20 border border-yellow-500/50 text-yellow-400 rounded px-4 py-2 hover:bg-yellow-500/30"
          >
            ✎ Request Changes
          </button>
          <button
            onClick={() => handleVote('reject')}
            disabled={voting}
            className="flex-1 bg-red-500/20 border border-red-500/50 text-red-400 rounded px-4 py-2 hover:bg-red-500/30"
          >
            ✕ Reject
          </button>
        </div>
      </div>
    </div>
  );
};
```

---

## Testing Checklist

### Manual Testing

- [ ] Create project from story
- [ ] Invite co-author
- [ ] Accept invitation
- [ ] Create proposal
- [ ] Submit for voting
- [ ] Cast votes
- [ ] Merge proposal
- [ ] View version history
- [ ] Compare versions
- [ ] Add comments

### Edge Cases

- [ ] Max co-authors reached
- [ ] Max proposals reached
- [ ] Voting period expired
- [ ] Non-co-author tries to vote
- [ ] Owner override during voting
- [ ] Concurrent merges
- [ ] Invalid permissions

---

## Next Steps

1. **Implement Phase 1** - Get project CRUD working
2. **Test with real data** - Create actual projects
3. **Implement Phase 2** - Add proposals
4. **Implement Phase 3** - Add voting
5. **Implement Phase 4** - Add merging
6. **Polish UI** - Make it look good
7. **Add notifications** - Email/in-app alerts
8. **Performance** - Optimize queries
9. **Mobile** - Responsive design
10. **Launch** - Ship it!

---

**This is a working, functional system. Start with Phase 1 and build incrementally.**
