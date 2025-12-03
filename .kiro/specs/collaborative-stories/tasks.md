# Collaborative Stories - Implementation Tasks

## Phase 1: Data Layer & Types

### Task 1.1: TypeScript Types
**File:** `src/types/collaborativeStory.ts`
- [ ] CollaborativeProject interface
- [ ] CoAuthor interface with roles
- [ ] Proposal interface (with voting fields)
- [ ] Vote interface (userId, decision, comment, timestamp)
- [ ] ContentChange interface (diff structure)
- [ ] Activity interface
- [ ] ProjectStatus type ('recruiting' | 'active' | 'finalizing' | 'archived')
- [ ] ProposalStatus type ('draft' | 'voting' | 'approved' | 'rejected' | 'merged')
- [ ] CoAuthorRole type ('owner' | 'reviewer' | 'contributor')
- [ ] VoteDecision type ('approve' | 'request_changes' | 'reject')

**Acceptance:** Types compile without errors, exported for use
**Requirements:** 1.1, 1.2, 1.3

### Task 1.2: Extend Story Type
**File:** `src/types/index.ts`
- [ ] Add `collaborationEnabled: boolean`
- [ ] Add `chainProjectId?: string`
- [ ] Add `coAuthorIds?: string[]`
- [ ] Update status type to include 'collaborative'

**Acceptance:** Story type supports collaboration fields

### Task 1.3: Firestore Collections Setup
**File:** `firestore.rules`
- [ ] Add `/collaborativeProjects/{projectId}` rules
- [ ] Add `/proposals/{proposalId}` rules
- [ ] Add `/projectActivities/{activityId}` rules
- [ ] Role-based access control functions
- [ ] Co-author verification functions

**File:** `firestore.indexes.json`
- [ ] Index: projects by status + updatedAt
- [ ] Index: projects by genre + status
- [ ] Index: proposals by projectId + status
- [ ] Index: activities by projectId + createdAt

**Acceptance:** Rules deployed, indexes created

## Phase 2: Library Integration

### Task 2.1: Collaboration Toggle Component
**File:** `src/components/library/CollaborationToggle.tsx`
- [ ] Toggle switch UI (parlour design)
- [ ] Settings modal (max co-authors, require approval)
- [ ] Create Chain project on enable
- [ ] Link story to project
- [ ] Update story status to 'collaborative'
- [ ] Error handling & loading states

**Acceptance:** Can enable/disable collaboration from story editor

### Task 2.2: Update Story Editor
**File:** `src/components/library/EnhancedNovelEditor.tsx`
- [ ] Add CollaborationToggle to toolbar
- [ ] Show "Collaborative" badge when enabled
- [ ] Add "View Collaboration" button (links to Chain project)
- [ ] Disable direct editing when collaborative (must use proposals)
- [ ] Show co-author avatars

**Acceptance:** Story editor supports collaboration mode

### Task 2.3: Story Card Updates
**File:** `src/components/library/StoryCard.tsx`
- [ ] Show "Collaborative" badge
- [ ] Display co-author count
- [ ] Link to Chain project from card
- [ ] Visual indicator for collaborative stories

**Acceptance:** Collaborative stories visually distinct in Library

## Phase 3: Collaborative Projects Core

### Task 3.1: Project Data Hooks
**File:** `src/hooks/useCollaborativeProjects.ts`
- [ ] `useCollaborativeProjects()` - List all projects
- [ ] Filter by status, genre
- [ ] Search by title/author
- [ ] Pagination support
- [ ] Real-time updates

**File:** `src/hooks/useCollaborativeProject.ts`
- [ ] `useCollaborativeProject(id)` - Single project
- [ ] Real-time co-author updates
- [ ] Real-time proposal updates
- [ ] Activity feed subscription

**Acceptance:** Hooks fetch and sync project data

### Task 3.2: Project Actions Hook
**File:** `src/hooks/useProjectActions.ts`
- [ ] `createProject(storyId, settings)` - Create from Library story
- [ ] `requestToJoin(projectId, message)` - Join request
- [ ] `approveJoinRequest(projectId, userId)` - Approve member
- [ ] `rejectJoinRequest(projectId, userId, reason)` - Reject member
- [ ] `updateCoAuthorRole(projectId, userId, role)` - Change role
- [ ] `removeCoAuthor(projectId, userId)` - Remove member
- [ ] `finalizeProject(projectId)` - Start finalization
- [ ] `signProject(projectId)` - Co-author signature
- [ ] Error handling with toast notifications

**Acceptance:** All project management actions work

### Task 3.3: Project Card Component
**File:** `src/components/collaborative/ProjectCard.tsx`
- [ ] Tombstone-shaped card (match session cards)
- [ ] Display: title, genre, owner, co-author count
- [ ] Status badge (recruiting, active, finalizing)
- [ ] "Request to Join" button
- [ ] Hover effects (graveyard theme)
- [ ] Click → Navigate to project page

**Acceptance:** Project cards render with graveyard aesthetic

### Task 3.4: Project Filters
**File:** `src/components/collaborative/ProjectFilters.tsx`
- [ ] Filter by status (recruiting, active, finalizing)
- [ ] Filter by genre
- [ ] Search input (title/author)
- [ ] Sort options (newest, most active, alphabetical)
- [ ] Clear filters button

**Acceptance:** Filters work and update project list

### Task 3.5: Collaborative Stories View
**File:** `src/components/collaborative/CollaborativeStoriesView.tsx`
- [ ] ProjectFilters component
- [ ] ProjectGrid with cards
- [ ] Empty state (no projects)
- [ ] Loading skeleton
- [ ] Pagination controls
- [ ] "Create Project" button (opens Library)

**Acceptance:** Full project browsing experience

## Phase 4: Chains Page Integration

### Task 4.1: Update Chains Page
**File:** `src/pages/ReflectionSessions.tsx` → Rename to `src/pages/Chains.tsx`
- [ ] Add tab navigation (Reflection Sessions | Collaborative Stories)
- [ ] Route: `/chains` → default to sessions tab
- [ ] Route: `/chains/projects` → collaborative stories tab
- [ ] Preserve existing reflection sessions view
- [ ] Add CollaborativeStoriesView
- [ ] Update page title and metadata

**Acceptance:** Chains page has both tabs, navigation works

### Task 4.2: Update Router
**File:** `src/router/index.tsx`
- [ ] Update route from `/reflection-sessions` to `/chains`
- [ ] Add `/chains/projects/:id` route
- [ ] Add `/chains/proposals/:id` route
- [ ] Redirect old URLs for backwards compatibility

**Acceptance:** All routes work, no broken links

### Task 4.3: Update Navigation
**File:** `src/components/Navbar.tsx`
- [ ] Update link text from "Reflection Sessions" to "Chains"
- [ ] Update link href to `/chains`
- [ ] Ensure active state works

**Acceptance:** Navbar reflects new structure

## Phase 5: Proposal System

### Task 5.1: Voting Algorithm Utilities
**File:** `src/utils/votingAlgorithm.ts`
- [ ] `tallyVotes(proposal, coAuthors)` - Calculate vote results
- [ ] `hasVotingEnded(proposal)` - Check if 48hr period expired
- [ ] `canMerge(proposal)` - Check if >50% approved
- [ ] `shouldExtend(proposal)` - Check if tied and not yet extended
- [ ] `getVotePercentages(proposal, coAuthors)` - Calculate percentages
- [ ] `hasUserVoted(proposal, userId)` - Check if user voted
- [ ] `getUserVote(proposal, userId)` - Get user's vote
- [ ] Handle edge cases (author leaving, co-authors added mid-vote)

**Acceptance:** Voting logic works correctly for all scenarios
**Requirements:** 6.1, 6.2, 6.3

### Task 5.2: Diff Utilities
**File:** `src/utils/diffEngine.ts`
- [ ] Install `diff-match-patch` library
- [ ] `computeDiff(original, modified)` - Generate diff
- [ ] `applyDiff(original, changes)` - Apply changes
- [ ] `formatDiff(changes)` - Format for display
- [ ] `detectConflicts(baseVersion, changes)` - Conflict detection
- [ ] Cache diff results

**Acceptance:** Diff computation works efficiently
**Requirements:** 5.1, 5.2, 5.3

### Task 5.3: Proposal Data Hooks
**File:** `src/hooks/useProposals.ts`
- [ ] `useProposals(projectId)` - List proposals
- [ ] Filter by status (draft, voting, approved, rejected, merged)
- [ ] Real-time updates for vote changes
- [ ] Sort by date

**File:** `src/hooks/useProposal.ts`
- [ ] `useProposal(id)` - Single proposal
- [ ] Real-time vote updates
- [ ] Real-time status changes
- [ ] Computed diff from base version

**Acceptance:** Proposal data hooks work with real-time voting updates
**Requirements:** 4.1, 4.2, 6.1, 6.2

### Task 5.4: Proposal Actions Hook
**File:** `src/hooks/useProposalActions.ts`
- [ ] `createProposal(projectId, title, description)` - Create draft
- [ ] `updateProposal(id, content)` - Update draft content
- [ ] `submitProposal(id)` - Submit for voting (locks proposal, starts 48hr timer)
- [ ] `voteOnProposal(id, decision, comment)` - Cast vote
- [ ] `changeVote(id, decision, comment)` - Change vote before period ends
- [ ] `tallyVotes(id)` - Calculate vote results
- [ ] `extendVoting(id)` - Extend by 24 hours if tied
- [ ] `mergeProposal(id)` - Merge approved proposal to main story
- [ ] `deleteProposal(id)` - Delete draft
- [ ] Notifications for all actions

**Acceptance:** All proposal actions work, voting logic correct
**Requirements:** 4.1, 4.2, 4.3, 4.4, 6.1, 6.2, 6.3, 7.1

### Task 5.5: Proposal Editor Component (Uses Rich Text Editor)
**File:** `src/components/collaborative/ProposalEditor.tsx`
- [ ] Title and description inputs
- [ ] Import and use `EnhancedWritingEditor` from diary/library
- [ ] Pass proposal content to editor
- [ ] Handle content changes from editor
- [ ] Auto-save draft every 30 seconds
- [ ] Show auto-save indicator
- [ ] Word count display
- [ ] Preview tab (rendered HTML)
- [ ] Submit for Voting button (disabled until title + content)
- [ ] Discard button
- [ ] Maintain current Chain Lab aesthetic (lime green accents, clinical feel)

**Acceptance:** Can write proposals with full rich text formatting
**Requirements:** 4.1, 4.2, 4.3, 4.4

### Task 5.6: Diff Viewer Component
**File:** `src/components/collaborative/DiffViewer.tsx`
- [ ] Side-by-side view option
- [ ] Inline view option
- [ ] Color coding: green (add), red (delete), gray (context)
- [ ] Line numbers
- [ ] Expand/collapse unchanged sections
- [ ] Smooth scrolling

**Acceptance:** Diffs render clearly and are easy to read

### Task 5.7: Proposal Card Component
**File:** `src/components/collaborative/ProposalCard.tsx`
- [ ] Weathered parchment aesthetic
- [ ] Display: title, author, status, timestamp
- [ ] Status badge with wax seal icon
- [ ] Review count indicator
- [ ] Click → Open proposal detail
- [ ] Hover effects

**Acceptance:** Proposal cards match graveyard theme

### Task 5.8: Proposal Voting Component
**File:** `src/components/collaborative/ProposalVoting.tsx`
- [ ] Proposal header (author avatar, name, submission time, status badge)
- [ ] Voting countdown timer (shows time remaining in 48hr period)
- [ ] Voting stats section:
  - [ ] Vote counts (Approve: X, Request Changes: Y, Reject: Z)
  - [ ] Progress bars for each option
  - [ ] Percentage calculations
  - [ ] Required threshold indicator (>50% for approval)
- [ ] Content tabs: "Proposal" | "Diff" | "Discussion"
- [ ] Proposal tab: Full rich text content rendered
- [ ] Diff tab: Side-by-side comparison with current story
- [ ] Discussion tab: Vote comments and discussion thread
- [ ] Voting actions (if user hasn't voted):
  - [ ] Approve button (lime green)
  - [ ] Request Changes button (orange)
  - [ ] Reject button (red)
  - [ ] Optional comment textarea
  - [ ] Submit vote button
- [ ] Show user's vote if already voted (with option to change)
- [ ] Merge button (owner/reviewer only, if status is 'approved')
- [ ] Real-time vote updates
- [ ] Maintain Chain Lab aesthetic

**Acceptance:** Full voting workflow functional, real-time updates work
**Requirements:** 5.1, 5.2, 5.3, 5.4, 6.1, 6.2, 6.3, 7.1

- [ ] 5.9 Checkpoint - Ensure all tests pass
  - Ensure all tests pass, ask the user if questions arise.

## Phase 6: Project Page

### Task 6.1: Project Header Component
**File:** `src/components/collaborative/ProjectHeader.tsx`
- [ ] Title and genre
- [ ] Status badge
- [ ] Co-author avatars (with roles)
- [ ] "Request to Join" button (if not member)
- [ ] "Leave Project" button (if member, not owner)
- [ ] "Finalize" button (owner only)
- [ ] Link back to Library story

**Acceptance:** Header shows all project info and actions

### Task 6.2: Co-Author List Component
**File:** `src/components/collaborative/CoAuthorList.tsx`
- [ ] List all co-authors with avatars
- [ ] Show role badges (owner/reviewer/contributor)
- [ ] Show contribution count
- [ ] Online status indicator
- [ ] Role change dropdown (owner only)
- [ ] Remove button (owner only)

**Acceptance:** Co-author management works

### Task 6.3: Activity Feed Component
**File:** `src/components/collaborative/ActivityFeed.tsx`
- [ ] Real-time activity stream
- [ ] Activity types: proposal created/merged, review added, member joined/left
- [ ] Timestamps (relative: "2 hours ago")
- [ ] User avatars
- [ ] Click activity → Navigate to relevant item
- [ ] Infinite scroll

**Acceptance:** Activity feed updates in real-time

### Task 6.4: Story Tab
**File:** `src/components/collaborative/StoryTab.tsx`
- [ ] Display current story content (read-only)
- [ ] Rich text rendering
- [ ] "Create Proposal" button
- [ ] Version indicator (last merged proposal)
- [ ] Export options (PDF, EPUB)

**Acceptance:** Can view current story version

### Task 6.5: Proposals Tab
**File:** `src/components/collaborative/ProposalsTab.tsx`
- [ ] List all proposals
- [ ] Filter by status (pending, approved, merged, rejected)
- [ ] Sort options
- [ ] ProposalCard components
- [ ] "Create Proposal" button
- [ ] Empty state

**Acceptance:** Proposal list works with filters

### Task 6.6: History Tab
**File:** `src/components/collaborative/HistoryTab.tsx`
- [ ] Timeline of merged proposals
- [ ] Each entry: author, date, title, summary
- [ ] Click → View proposal details
- [ ] "View at this point" button (time travel)
- [ ] Revert option (owner only)

**Acceptance:** Can view project history

### Task 6.7: Discussion Tab
**File:** `src/components/collaborative/DiscussionTab.tsx`
- [ ] Thread-based discussion (like forum)
- [ ] Create new thread
- [ ] Reply to threads
- [ ] @mention co-authors
- [ ] Real-time updates
- [ ] Markdown support

**Acceptance:** Team communication works

### Task 6.8: Project Page Assembly
**File:** `src/pages/CollaborativeProject.tsx`
- [ ] ProjectHeader component
- [ ] Tab navigation (Story, Proposals, History, Discussion)
- [ ] Tab content rendering
- [ ] Sidebar: CoAuthorList, ActivityFeed
- [ ] Loading states
- [ ] Error handling
- [ ] Graveyard background effects

**Acceptance:** Full project page functional

## Phase 7: Finalization & Publishing

### Task 7.1: Finalization Modal
**File:** `src/components/collaborative/FinalizeModal.tsx`
- [ ] Confirmation dialog
- [ ] List all co-authors who need to sign
- [ ] Warning: "Project will archive after publishing"
- [ ] "Start Finalization" button
- [ ] Cancel button

**Acceptance:** Owner can initiate finalization

### Task 7.2: Signature Page
**File:** `src/components/collaborative/SignaturePage.tsx`
- [ ] Old contract aesthetic
- [ ] Story summary
- [ ] List of co-authors with signature status
- [ ] "Sign" button (digital signature)
- [ ] Quill pen animation on sign
- [ ] Progress indicator (X of Y signed)
- [ ] Auto-publish when all signed

**Acceptance:** Co-authors can sign, auto-publishes

### Task 7.3: Publishing Logic
**File:** `src/utils/projectPublisher.ts`
- [ ] `publishProject(projectId)` - Publish to Library
- [ ] Update story with final content
- [ ] Add all co-authors to story
- [ ] Change story status to 'published'
- [ ] Archive Chain project (read-only)
- [ ] Send notifications to all co-authors
- [ ] Create activity log entry

**Acceptance:** Published stories appear in Library with all authors

## Phase 8: Real-time Features

### Task 8.1: Presence System
**File:** `src/hooks/useProjectPresence.ts`
- [ ] Reuse/adapt `useSessionPresence`
- [ ] Track online co-authors
- [ ] Show who's viewing project
- [ ] Show who's editing proposals
- [ ] Heartbeat mechanism

**Acceptance:** Can see who's online in project

### Task 8.2: Live Cursors in Proposals
**File:** `src/hooks/useProposalCursors.ts`
- [ ] Reuse/adapt `useLiveCursors`
- [ ] Track cursor positions in proposal editor
- [ ] Show other authors' cursors
- [ ] Color-code by user
- [ ] Throttle updates (50ms)

**Acceptance:** Live cursors work in proposal editor

### Task 8.3: Real-time Notifications
**File:** `src/hooks/useProjectNotifications.ts`
- [ ] Subscribe to project events
- [ ] Toast notifications for:
  - New proposal submitted
  - Proposal reviewed
  - Proposal merged
  - New co-author joined
  - Project finalized
- [ ] In-app notification bell
- [ ] Mark as read functionality

**Acceptance:** Real-time notifications work

## Phase 9: Polish & UX

### Task 9.1: Loading States
- [ ] Skeleton loaders for project cards
- [ ] Skeleton for project page
- [ ] Skeleton for proposals
- [ ] Spinner for actions (submit, merge, etc.)
- [ ] Progress bars for long operations

**Acceptance:** No jarring loading experiences

### Task 9.2: Error Handling
- [ ] Network error recovery
- [ ] Conflict detection UI
- [ ] Permission denied messages
- [ ] Validation errors (forms)
- [ ] Retry mechanisms

**Acceptance:** Errors handled gracefully

### Task 9.3: Empty States
- [ ] No projects yet (with CTA)
- [ ] No proposals yet (with CTA)
- [ ] No activity yet
- [ ] No co-authors yet
- [ ] Search returned no results

**Acceptance:** Empty states are helpful, not confusing

### Task 9.4: Animations & Transitions
- [ ] Page transitions (graveyard theme)
- [ ] Card hover effects
- [ ] Button interactions
- [ ] Toast slide-ins
- [ ] Signature animation (quill pen)
- [ ] Finalization celebration effect

**Acceptance:** Smooth, thematic animations

### Task 9.5: Responsive Design
- [ ] Mobile layout for project cards
- [ ] Mobile layout for project page
- [ ] Mobile-friendly diff viewer
- [ ] Touch-friendly controls
- [ ] Responsive sidebar

**Acceptance:** Works well on mobile devices

## Phase 10: Testing & Documentation

### Task 10.1: Unit Tests*
- [ ]* Test diff engine utilities
- [ ]* Test proposal actions
- [ ]* Test project actions
- [ ]* Test permission checks
- [ ]* Test data transformations

**Acceptance:** 80%+ code coverage

### Task 10.2: Integration Tests*
**File:** `src/__tests__/integration/CollaborativeStories.test.tsx`
- [ ]* Test: Enable collaboration from Library
- [ ]* Test: Join project workflow
- [ ]* Test: Create and submit proposal
- [ ]* Test: Review and merge proposal
- [ ]* Test: Finalize and publish
- [ ]* Test: Real-time updates

**Acceptance:** All critical paths tested

### Task 10.3: User Documentation*
**File:** `docs/COLLABORATIVE_STORIES_GUIDE.md`
- [ ]* How to enable collaboration
- [ ]* How to join projects
- [ ]* How to create proposals
- [ ]* How to review proposals
- [ ]* How to finalize and publish
- [ ]* Role permissions reference
- [ ]* Troubleshooting section

**Acceptance:** Clear, comprehensive guide

### Task 10.4: Quick Start Guide*
**File:** `docs/COLLABORATIVE_STORIES_QUICK_START.md`
- [ ]* 5-minute walkthrough
- [ ]* Screenshots/GIFs
- [ ]* Common workflows
- [ ]* Tips and best practices

**Acceptance:** New users can get started quickly

## Phase 11: Deployment

### Task 11.1: Database Migration
- [ ] Deploy Firestore rules
- [ ] Create Firestore indexes
- [ ] Set up Realtime Database structure
- [ ] Test in staging environment

**Acceptance:** Database ready for production

### Task 11.2: Feature Flag
- [ ] Add feature flag for collaborative stories
- [ ] Enable for beta testers first
- [ ] Monitor for issues
- [ ] Gradual rollout

**Acceptance:** Safe, controlled release

### Task 11.3: Performance Monitoring
- [ ] Set up analytics for collaborative features
- [ ] Track: project creation, proposals, merges
- [ ] Monitor: load times, error rates
- [ ] Set up alerts for issues

**Acceptance:** Can monitor feature health

## Success Criteria

### Functional
- ✓ Can enable collaboration from Library
- ✓ Can join and leave projects
- ✓ Can create, review, and merge proposals
- ✓ Can finalize and publish multi-author stories
- ✓ Real-time updates work smoothly
- ✓ Permissions enforced correctly

### Performance
- ✓ Project list loads in <1s
- ✓ Diff computation in <500ms
- ✓ Real-time updates propagate in <1s
- ✓ Supports 10 concurrent co-authors

### UX
- ✓ Intuitive workflow (no confusion)
- ✓ Consistent with app aesthetic
- ✓ Helpful error messages
- ✓ Smooth animations
- ✓ Mobile-friendly

### Quality
- ✓ 80%+ test coverage
- ✓ No critical bugs
- ✓ Accessible (WCAG AA)
- ✓ Documentation complete
