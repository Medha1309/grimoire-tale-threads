# Collaborative Stories - Workflow Fix

## Issues Identified

### 1. Text Formatting Inconsistency
**Problem**: CollaborativeStoriesView used generic text styles (text-2xl, text-stone-400) that didn't match the clinical, monospace aesthetic of the Chains page.

**Solution**: Updated all text to match Chains Lab style:
- Headers: `text-base font-semibold tracking-[0.18em] uppercase text-slate-200`
- Descriptions: `text-[11px] text-slate-500 font-mono`
- Labels: `text-[11px] font-mono uppercase tracking-[0.16em]`
- Empty states: `text-sm font-mono uppercase tracking-[0.16em] text-slate-400`

### 2. Missing Workflow Integration
**Problem**: The CollaborationToggle component exists but is NOT integrated into the story editor. Users cannot enable collaboration on their stories.

**Root Cause**: According to the architecture document, the workflow should be:
```
User in Library Story Editor
    ↓
Toggle "Enable Collaboration"
    ↓
Create CollaborativeProject in Chains
    ↓
Redirect to Chain Project Page
```

But the CollaborationToggle component is never imported or used in EnhancedNovelEditor.tsx.

## Required Fixes

### Fix 1: Integrate CollaborationToggle into Story Editor ✅ NEEDED

**File**: `src/components/library/EnhancedNovelEditor.tsx`

**Changes Needed**:
1. Import CollaborationToggle component
2. Add collaboration state management
3. Add toggle UI in the editor sidebar or header
4. Implement onToggle handler that:
   - Calls useProjectActions.createProject()
   - Updates story with chainProjectId
   - Redirects to /chains/projects/{projectId}

**Example Integration**:
```tsx
import { CollaborationToggle } from './CollaborationToggle';
import { useProjectActions } from '../../hooks/useProjectActions';

// In component:
const { createProject } = useProjectActions();
const [collaborationEnabled, setCollaborationEnabled] = useState(false);

const handleCollaborationToggle = async (enabled: boolean, settings?: CollaborationSettings) => {
  if (enabled) {
    // Create Chain project
    const projectId = await createProject(
      storyId,
      title,
      genre,
      settings
    );
    
    // Update story with chainProjectId
    // ... update logic
    
    // Redirect to project
    navigate(`/chains/projects/${projectId}`);
  } else {
    // Disable collaboration
    // Archive Chain project
    // Remove chainProjectId from story
  }
};

// In render:
<CollaborationToggle
  isEnabled={collaborationEnabled}
  onToggle={handleCollaborationToggle}
/>
```

### Fix 2: Add "Create Project" Button in Chains Tab ✅ OPTIONAL

**File**: `src/components/collaborative/CollaborativeStoriesView.tsx`

**Purpose**: Allow users to create collaborative projects directly from Chains (alternative to Library integration)

**Implementation**:
```tsx
<Button
  variant="primary"
  onClick={() => setShowCreateModal(true)}
  className="text-[11px] uppercase tracking-[0.14em]"
>
  + New Project
</Button>

<CreateProjectModal
  isOpen={showCreateModal}
  onClose={() => setShowCreateModal(false)}
/>
```

### Fix 3: Update CreateProjectModal Styling ✅ NEEDED

**File**: `src/components/collaborative/CreateProjectModal.tsx`

**Changes**: Match Chains Lab clinical aesthetic:
- Use monospace fonts
- Update color scheme to slate/lime
- Add uppercase tracking for labels
- Match button styles to Chains page

## Workflow After Fixes

### Primary Workflow (Library → Chains)
```
1. User writes story in Library
2. User clicks "Enable Collaboration" toggle in editor
3. Modal appears with collaboration settings
4. User configures settings and clicks "Enable"
5. System creates Chain project
6. User redirected to /chains/projects/{id}
7. User can now manage co-authors and proposals
```

### Alternative Workflow (Chains → Library)
```
1. User goes to Chains Lab → Collaborative Stories tab
2. User clicks "+ New Project" button
3. Modal appears to select existing story from Library
4. User selects story and configures settings
5. System creates Chain project and links to story
6. User redirected to /chains/projects/{id}
```

## Testing Checklist

After implementing fixes:

- [ ] CollaborationToggle appears in story editor
- [ ] Clicking toggle shows settings modal
- [ ] Creating project from Library works
- [ ] User is redirected to project page
- [ ] Story shows "COLLABORATIVE" badge
- [ ] Project appears in Chains Lab list
- [ ] Text formatting matches Chains aesthetic
- [ ] CreateProjectModal uses correct hook (useUserStories)
- [ ] All buttons use monospace uppercase style

## Files Modified

1. ✅ `src/components/collaborative/CollaborativeStoriesView.tsx` - Text formatting updated
2. ⏳ `src/components/library/EnhancedNovelEditor.tsx` - Needs CollaborationToggle integration
3. ⏳ `src/components/collaborative/CreateProjectModal.tsx` - Needs styling update
4. ⏳ `src/components/library/StoryCard.tsx` - May need collaboration badge

## Next Steps

1. Integrate CollaborationToggle into EnhancedNovelEditor
2. Update CreateProjectModal styling to match Chains aesthetic
3. Add collaboration badge to StoryCard when enabled
4. Test complete workflow end-to-end
5. Update firestore rules to support collaboration fields on stories
