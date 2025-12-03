# Room Naming Update

## Overview
Updated all room names throughout the application to better reflect a house metaphor with more appropriate naming.

## Name Changes

### 1. Parlour → Tea Room
**Old Name:** Parlour / Gilded Parlour  
**New Name:** Tea Room  
**Reason:** More fitting for a gossip/discussion space

**Files Updated:**
- `src/components/Navbar.tsx` - Navigation menu
- `src/pages/Forum.tsx` - Page title "THE TEA ROOM"
- `src/components/about/JournalOnCrate.tsx` - Feature description
- `src/components/about/MemoryChest.tsx` - Room card
- `src/components/about/PolaroidWall.tsx` - Polaroid title
- `src/components/about/TypewriterSequence.tsx` - Typewriter text
- `src/components/about/WallBlueprint.tsx` - Blueprint description
- `src/components/forum/PostView.tsx` - Back button text
- `src/components/shared/EmptyState.tsx` - Empty state message
- `src/pages/SeedForum.tsx` - Page title and button
- `src/pages/Dollhouse.tsx` - Publish button text
- `src/components/art/ArtworkDetail.tsx` - Publish button text
- `src/components/forum/ShareTray.tsx` - Share URL and text
- `src/components/forum/ReplySection.tsx` - Comment styling

### 2. Dollhouse → Boudoir
**Old Name:** Dollhouse  
**New Name:** Boudoir  
**Reason:** More elegant and fitting for a private diary/personal space

**Files Updated:**
- `src/components/Navbar.tsx` - Navigation menu
- `src/pages/Dollhouse.tsx` - Page comment
- `src/components/diary/DollhouseTitle.tsx` - Main title (all instances)
- `src/components/about/JournalOnCrate.tsx` - Feature description
- `src/components/about/WallBlueprint.tsx` - Blueprint description
- `src/pages/__tests__/Dollhouse.test.tsx` - Test assertion

### 3. Chains → Chains
**Old Name:** Chains / Cursed Chains  
**New Name:** Chains (kept as is)  
**Reason:** User requested to keep this name

## Additional Fixes

### Cursor Issue on Chains Page
**Problem:** Cursor was disappearing when hovering over the Chains page  
**Solution:** Removed `style={{ cursor: 'default' }}` from the main section and container div in `src/pages/ChainLetters.tsx`

## Final Room Structure

The application now has a cohesive house metaphor:
- **Home** - Landing page
- **Library** - Browse and read stories
- **Tea Room** - Discuss stories with others (forum)
- **Chains** - Collaborative chain letter stories
- **Boudoir** - Private diary entries

## Notes

- All component file names remain unchanged (e.g., `Dollhouse.tsx`, `DollhouseTitle.tsx`) to avoid breaking imports
- Only display names and user-facing text were updated
- The naming is now more consistent with a Victorian/Gothic house theme
- "Tea Room" fits the gossip/discussion nature better than "Parlour"
- "Boudoir" is more elegant and intimate for private diary entries
