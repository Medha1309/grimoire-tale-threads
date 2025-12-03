# Collaborative Stories - Implementation Progress

## Completed (Phase 1-3)

### ✅ Phase 1: Data Layer & Types
- [x] TypeScript types (`src/types/collaborativeStory.ts`)
  - CollaborativeProject, CoAuthor, Proposal, ContentChange, Review, etc.
- [x] Extended Story type with collaboration fields
- [x] Firestore rules for collaborative projects, proposals, activities, join requests
- [x] Firestore indexes for efficient queries
- [x] Diff engine utility (`src/utils/diffEngine.ts`)
  - Uses diff-match-patch library
  - Compute, apply, and format diffs
- [x] Permission checker utility (`src/utils/projectPermissions.ts`)
  - Role-based access control
  - Permission helpers for all actions

### ✅ Phase 2: Core Hooks
- [x] `useCollaborativeProjects` - List projects with filters
- [x] `useCollaborativeProject` - Single project with real-time updates
- [x] `useProjectActions` - All project management actions
  - Create project, join, approve, update roles, finalize, sign

### ✅ Phase 3: UI Components
- [x] `ProjectCard` - Tombstone-shaped project cards
- [x] `ProjectFilters` - Filter by status, genre, search
- [x] `CollaborativeStoriesView` - Main browsing view
- [x] Updated `Chains` page with tabs (Sessions | Projects)
- [x] Router updates - `/chains`, `/chains/projects`, `/chains/projects/:id`

## Known Issues to Fix

### 🔧 Design Token References
The components use incorrect parlour token paths. Need to update:
- `parlourTokens.colors.accent.gold` → `parlourTokens.colors.gold[500]`
- `parlourTokens.colors.text.primary` → `parlourTokens.colors.neutral[50]`
- `parlourTokens.colors.surface.card` → `parlourTokens.colors.neutral[900]`
- `parlourTokens.typography.fontFamily.heading` → Use direct font family

**Files to fix:**
- `src/components/collaborative/ProjectCard.tsx`
- `src/components/collaborative/ProjectFilters.tsx`
- `src/components/collaborative/CollaborativeStoriesView.tsx`

## Next Steps (Phase 4-6)

### Phase 4: Proposal System
- [ ] Proposal hooks (`useProposals`, `useProposal`, `useProposalActions`)
- [ ] `ProposalEditor` component
- [ ] `DiffViewer` component
- [ ] `ProposalCard` component
- [ ] `ProposalReview` component

### Phase 5: Project Detail Page
- [ ] `CollaborativeProject` page
- [ ] `ProjectHeader` component
- [ ] `CoAuthorList` component
- [ ] `ActivityFeed` component
- [ ] Story/Proposals/History/Discussion tabs

### Phase 6: Library Integration
- [ ] `CollaborationToggle` component
- [ ] Update `EnhancedNovelEditor` to support collaboration mode
- [ ] Update `StoryCard` to show collaborative badge
- [ ] Link stories to Chain projects

## Quick Fix Script

To fix the design token issues, replace:

```typescript
// OLD
import parlourTokens from '../../design-system/parlour-tokens';
parlourTokens.colors.accent.gold
parlourTokens.colors.text.primary

// NEW
import { parlourColors } from '../../design-system/parlour-tokens';
parlourColors.gold[500]
parlourColors.neutral[50]
```

## Testing Checklist

Once design tokens are fixed:
- [ ] Navigate to `/chains`
- [ ] Switch between "Reflection Sessions" and "Collaborative Stories" tabs
- [ ] Verify empty state shows correctly
- [ ] Create a test project (will need Library integration first)
- [ ] Verify project cards render correctly
- [ ] Test filters (status, genre, search)

## Database Setup

Before testing, deploy Firestore rules and indexes:
```bash
firebase deploy --only firestore:rules
firebase deploy --only firestore:indexes
```

## Architecture Summary

**Clean Separation:**
- Library = source of truth for stories
- Chains = collaboration layer (Sessions + Projects)
- Stories stay in Library, collaboration happens in Chains

**Git-like Workflow:**
- Proposals (like pull requests)
- Review & approve system
- Merge to main story
- Full version history

**Flow:**
1. Author enables collaboration in Library
2. Creates Chain project automatically
3. Others join as co-authors
4. Co-authors create proposals (diffs)
5. Reviewers approve proposals
6. Owner merges proposals
7. When complete, all co-authors sign
8. Publishes to Library with all authors credited

## Performance Notes

- Real-time subscriptions for projects and proposals
- Diff caching in Firestore
- Pagination (20 projects, 10 proposals per page)
- Throttled cursor updates (50ms)
- Optimistic UI updates

## Security

- Role-based access control (Owner, Reviewer, Contributor)
- Firestore rules enforce permissions
- Only co-authors can view/edit projects
- Audit log of all changes
