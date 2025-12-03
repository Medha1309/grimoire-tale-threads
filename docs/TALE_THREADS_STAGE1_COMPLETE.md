# Tale Threads - Complete Redesign Plan

## Stage 1: Rename & Restyle ✅ 80% COMPLETE

### Completed
- ✅ Navbar updated: "Chains" → "Tale Threads"
- ✅ Route changed: `/chains` → `/tale-threads` (with redirect)
- ✅ CSS classes: `chains-page` → `tale-threads-page`
- ✅ Router configuration updated
- ✅ Main page title: "Chain Lab" → "Tale Threads"
- ✅ Icon changed: Σ → ✦ (more gothic)
- ✅ Subtitle: "Collaborative story stitching" → "Weave stories together"
- ✅ Tab names: "Reflection Sessions" → "Live Stories", "Collaborative Stories" → "Story Projects"
- ✅ Header colors: lime green → purple (partial)
- ✅ Online indicator: lime → purple
- ✅ Tab underlines: lime → purple

### Remaining for Stage 1 (20%)
- ⏳ Update main page file (Chains.tsx)
- ⏳ Update all text references
- ⏳ Replace lime green with purple (#9333ea)
- ⏳ Replace cyan with pink (#ec4899)
- ⏳ Update cursor component
- ⏳ Update router configuration
- ⏳ Update CSS classes (chains-page → tale-threads-page)

## Stage 2: UX Improvements (Not Started)
- Click-based navigation (not just keyboard)
- Mobile responsive design
- Onboarding tour for new users
- Empty states with helpful guidance
- Better visual hierarchy
- Tooltips explaining features

## Stage 3: Core Functionality (Not Started)
- Edit own entries
- Delete own entries  
- Search & filter entries
- Real-time notifications
- Participant management
- Thread settings/permissions

## Stage 4: Production Ready (Not Started)
- Complete error handling
- Input validation
- Rate limiting
- Firestore security rules
- Moderation tools
- Analytics

## Files That Need Updates

### High Priority
1. `src/pages/Chains.tsx` - Main page (861 lines!)
2. `src/components/cursors/ChainsCursor.tsx` - Custom cursor
3. `src/hooks/useChainSession.ts` - Data hooks
4. `src/router/index.tsx` - Route configuration
5. `src/index.css` - CSS classes

### Medium Priority
6. `src/pages/SeedChains.tsx` - Admin seeding
7. `src/pages/RetroHub.tsx` - Link reference
8. `src/pages/Desktop.tsx` - Link reference
9. `src/pages/CollaborativeProject.tsx` - Back button
10. `src/pages/ReflectionSessions.tsx` - Title

### Low Priority
- Various documentation files
- Test files
- Sample data files

## Color Palette
**Old (Lime/Cyan):**
- Primary: #84cc16, #bef264
- Accent: #22d3ee, #34d3a9
- Glow: rgba(190,242,100,0.X)

**New (Purple/Pink):**
- Primary: #9333ea, #a855f7  
- Accent: #ec4899, #f472b6
- Glow: rgba(147,51,234,0.X)

## Terminology Changes
| Old | New |
|-----|-----|
| Chains / Chain Lab | Tale Threads |
| Reflection Sessions | Live Stories |
| Collaborative Stories | Story Projects |
| Segment / Link | Entry |
| Stitch | Add Entry |
| Chain hash | Thread ID |

## Next Steps
Continue Stage 1 by updating the main Chains.tsx file with new colors and terminology.
