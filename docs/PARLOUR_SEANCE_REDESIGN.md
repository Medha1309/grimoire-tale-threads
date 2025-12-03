# The Séance - Parlour Redesign

## Overview
Complete redesign of the Forum/Parlour with a haunted séance theme featuring an interactive multi-step posting experience.

## Key Features

### 🕯️ Séance Atmosphere
- **Floating Candles**: 12 interactive candles that react to mouse movement
- **Ambient Fog**: Pulsing red fog effect creates eerie atmosphere
- **Dark Gradient Background**: Radial gradient from dark gray to pure black
- **Golden Accents**: Warm gold (#e8c547) for text and highlights

### 👁️ Interactive Posting Modal
The new "Summon Spirit" button opens a multi-step séance ritual:

1. **Intro Step**: Welcome screen with animated candle
2. **Title Step**: Enter the spirit's calling
3. **Content Step**: Ouija board-style textarea with floating eye planchette
4. **Tags Step**: Select genre tags with glowing selection states
5. **Summoning Step**: Animated loading state with rotating eye and floating candles

### ✨ Design Highlights
- **Step-by-step flow**: Guides users through posting process
- **Smooth animations**: Framer Motion transitions between steps
- **Thematic language**: "Summon Spirit", "Channel the Message", etc.
- **Visual feedback**: Glowing borders, shadows, and hover effects
- **Responsive**: Works on mobile and desktop

## Removed Components
Cleaned up 15+ unused forum components:
- Old background variations (Hall of Mirrors, Regency, Luxurious, etc.)
- Unused effects (Chandelier, Watching Eyes, Spider Goo, etc.)
- Old modal (CreateThreadModal, CreateWhisperModal)

## Technical Details

### Colors
- Background: `#000000` to `#0a0a0a` radial gradient
- Primary accent: `#e8c547` (warm gold)
- Secondary accent: `#d4af37` (darker gold)
- Borders: `rgba(232, 197, 71, 0.3)` (translucent gold)

### Components
- `src/pages/Forum.tsx` - Main forum page with séance theme
- `src/components/forum/SeancePostModal.tsx` - Multi-step posting modal
- Kept: ForumList, PostView, ReplySection, ForumFilters, CandleLike, etc.

### Functionality
- All posting functionality works (title, content, tags)
- Validation: Min 3 chars for title, 10 chars for content
- Security: Rate limiting and content validation
- Search and filtering maintained
- Thread viewing and replies maintained

## User Experience

### Posting Flow
1. Click "Summon Spirit" button
2. Read welcome message
3. Enter title (with character count)
4. Write content in Ouija-style textarea
5. Optionally select genre tags
6. Submit and watch summoning animation
7. Post appears in the list

### Visual Cohesion
- Matches the haunted house theme
- Consistent with other app sections (Dollhouse, Library)
- Golden accents tie to the overall gothic aesthetic
- Dark, atmospheric, but still readable and functional

## Future Enhancements
- Add sound effects (whispers, creaking)
- Animate planchette movement in textarea
- Add more interactive candle effects
- Spirit message floating animations in list view
