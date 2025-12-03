# Chain Lab - Permissions & Publishing Model

## Current Implementation: Open Collaborative Writing

### Permission Model

**Current Setup: Fully Open**
- ✅ **Anyone can read** - All authenticated users see all sessions
- ✅ **Anyone can write** - All participants can add segments
- ✅ **No approval needed** - Segments appear immediately
- ✅ **No reviewers** - Direct append model
- ✅ **Owner can delete** - Session owner has admin rights

### How It Works Now

1. **Auto-Seeded Content**
   - Demo sessions automatically created on first load
   - Everyone sees the same starting stories
   - Like opening a shared novel that anyone can continue

2. **Adding Segments**
   - Type in the editor
   - Press Ctrl+Enter or click "Stitch Link"
   - Segment immediately appears for everyone
   - Real-time Firebase sync

3. **No Gatekeeping**
   - No approval process
   - No review system
   - Pure collaborative flow
   - Like a shared Google Doc for stories

## Future: Path to Published Book

### Proposed Publishing Workflow

#### Phase 1: Open Writing (Current)
- Anyone can contribute
- All segments visible immediately
- Pure creative flow
- No restrictions

#### Phase 2: Review & Curation (Future)
When ready to "finalize" a chain into a book:

**Option A: Owner Approval Model**
```typescript
{
  requireApproval: true,
  minReviewers: 1, // Owner must approve
  status: 'finalizing'
}
```
- Owner reviews all segments
- Can accept/reject/request changes
- Like GitHub pull requests
- Approved segments become "locked"

**Option B: Community Voting**
```typescript
{
  votingEnabled: true,
  minVotes: 3,
  votingThreshold: 0.7 // 70% approval
}
```
- Participants vote on segments
- High-voted segments stay
- Low-voted segments can be revised
- Democratic curation

**Option C: Editorial Board**
```typescript
{
  editors: ['userId1', 'userId2'],
  requireEditorApproval: true,
  minEditorApprovals: 2
}
```
- Designated editors review
- Multiple approvals required
- Professional curation
- Quality control

#### Phase 3: Finalization
```typescript
{
  status: 'archived',
  finalizedAt: Timestamp,
  signatures: [
    { userId, displayName, signedAt }
  ],
  published: true
}
```
- All participants "sign off"
- Chain becomes read-only
- Can export as book
- Attribution preserved

### Export Options (Future)

**1. Plain Text**
```
The Digital Haunting
By Dr. Moreau, Guest, CodeWhisperer

The first link in the chain hummed softly...
```

**2. Markdown**
```markdown
# The Digital Haunting

**Authors:** Dr. Moreau, Guest, CodeWhisperer

## Chapter 1
The first link in the chain...
```

**3. PDF/EPUB**
- Formatted book layout
- Table of contents
- Author attributions
- Chapter breaks

**4. Annotated Version**
```
[Segment 1 - Dr. Moreau - 23:12]
The first link in the chain...

[Segment 2 - Guest - 23:19]
Someone new touched the file...
```

## Permissions in Firestore Rules

### Current Rules
```javascript
match /chainSessions/{sessionId} {
  // Anyone authenticated can read
  allow read: if isAuthenticated();
  
  // Owner creates
  allow create: if isActiveUser() && 
                  request.resource.data.ownerId == request.auth.uid;
  
  // Owner OR participants can update (add segments)
  allow update: if isAuthenticated() &&
                  (resource.data.ownerId == request.auth.uid || 
                   request.auth.uid in resource.data.participants.map(p => p.userId));
  
  // Only owner can delete
  allow delete: if isAuthenticated() && 
                  resource.data.ownerId == request.auth.uid;
}
```

### Future Rules (With Approval)
```javascript
match /chainSessions/{sessionId} {
  allow read: if isAuthenticated();
  
  allow create: if isActiveUser() && 
                  request.resource.data.ownerId == request.auth.uid;
  
  // Different rules based on status
  allow update: if isAuthenticated() &&
                  (
                    // Open phase: anyone can add
                    (resource.data.status == 'open' && 
                     request.auth.uid in resource.data.participants.map(p => p.userId)) ||
                    
                    // Finalizing: only owner/editors
                    (resource.data.status == 'finalizing' && 
                     (resource.data.ownerId == request.auth.uid ||
                      request.auth.uid in resource.data.editors)) ||
                    
                    // Archived: no changes
                    (resource.data.status == 'archived' && false)
                  );
  
  allow delete: if isAuthenticated() && 
                  resource.data.ownerId == request.auth.uid;
}
```

## Comparison with Other Models

### Current Chain Lab vs. Other Systems

**Chain Lab (Current)**
- ✅ Immediate publishing
- ✅ No gatekeepers
- ✅ Real-time collaboration
- ✅ Simple & fast
- ❌ No quality control
- ❌ No curation

**GitHub Model (Collaborative Projects)**
- ✅ Pull requests
- ✅ Code review
- ✅ Approval process
- ✅ Quality control
- ❌ Slower
- ❌ More complex

**Google Docs Model**
- ✅ Real-time editing
- ✅ Anyone can write
- ✅ Simple
- ❌ No version control
- ❌ No approval workflow

**Wikipedia Model**
- ✅ Anyone can edit
- ✅ History tracking
- ✅ Revert capability
- ❌ Edit wars
- ❌ Vandalism risk

## Recommended Hybrid Approach

### Best of Both Worlds

**Phase 1: Open Writing**
```typescript
{
  status: 'open',
  requireApproval: false,
  anyoneCanWrite: true
}
```
- Current implementation
- Fast, creative, collaborative
- No barriers

**Phase 2: Soft Curation**
```typescript
{
  status: 'curating',
  votingEnabled: true,
  canStillAdd: true
}
```
- Can still add segments
- Community votes on quality
- Highlights best contributions
- Non-destructive

**Phase 3: Hard Finalization**
```typescript
{
  status: 'finalizing',
  requireApproval: true,
  owner: 'userId',
  readOnly: false // for owner
}
```
- Owner reviews all
- Can remove/reorder segments
- Prepares for publication
- Others can view but not edit

**Phase 4: Published**
```typescript
{
  status: 'published',
  readOnly: true,
  exportable: true,
  isbn: '...' // if published
}
```
- Completely locked
- Can export
- Attribution preserved
- Permanent record

## Current Limitations & Future Enhancements

### Current Limitations
1. **No undo** - Can't remove segments once added
2. **No editing** - Can't modify existing segments
3. **No branching** - Linear timeline only
4. **No voting** - No quality indicators
5. **No export** - Can't download as book

### Planned Enhancements
1. **Segment editing** - Edit your own segments
2. **Segment deletion** - Remove your contributions
3. **Voting system** - Upvote/downvote segments
4. **Branching** - Multiple story paths
5. **Export tools** - PDF, EPUB, Markdown
6. **Attribution** - Clear author credits
7. **Licensing** - Choose CC license
8. **ISBN integration** - Publish as real book

## Conclusion

**Current Model: Perfect for Creative Flow**
- Open, collaborative, immediate
- Like a jam session for writers
- No barriers, pure creativity

**Future Model: Path to Publication**
- Add curation when ready
- Transform into polished book
- Preserve all contributions
- Professional output

The beauty is you can **start open** (current) and **add structure later** (future) without losing any work. Every segment is preserved with full attribution, ready to become part of a published book when the community decides it's ready.
