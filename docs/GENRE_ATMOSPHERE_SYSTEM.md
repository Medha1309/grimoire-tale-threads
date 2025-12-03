# Genre Atmosphere System

## Overview
The Genre Atmosphere System creates immersive writing environments that change based on the story's genre. When writers select a genre, the entire editor interface transforms with atmospheric effects, colors, and animations that match the mood of their story.

## Features

### 12 Unique Genres
Each genre has its own distinct visual identity:

1. **Horror** - Flickering candlelight in darkness (dark red/orange)
2. **Thriller** - Electric tension and suspense (purple)
3. **Mystery** - Misty moonlit investigation (blue)
4. **Romance** - Warm candlelit intimacy (orange)
5. **Fantasy** - Magical sparkles and wonder (violet)
6. **Sci-Fi** - Neon-lit futuristic interface (cyan)
7. **Dystopian** - Decaying industrial wasteland (gray/brown)
8. **Paranormal** - Ethereal spirits drifting (purple)
9. **Dark Fantasy** - Blood magic and shadows (crimson)
10. **Gothic** - Victorian shadows and decay (dark gray)
11. **Psychological** - Unsettling mental distortion (amber)
12. **Supernatural** - Otherworldly energy (emerald)

### Atmospheric Effects

Each genre includes:
- **Custom color palette** (primary, secondary, accent, glow, text)
- **Animated background effects** (flicker, pulse, fog, particles, static, glow, drift, shimmer)
- **Intensity levels** (subtle, moderate, intense)
- **Ambient description** for mood setting

### Visual Components

#### Background Effects
- Animated gradients and particles
- Genre-specific motion (flickering, pulsing, drifting)
- Layered atmospheric overlays
- Subtle texture and vignette

#### UI Integration
- Genre selector with live preview
- Color-coded buttons and borders
- Glowing effects matching genre
- Atmospheric sidebar styling

## Implementation

### Core Files

**`src/utils/genreAtmospheres.ts`**
- Defines all genre types and atmospheres
- Color palettes and effect configurations
- Helper functions for genre data

**`src/components/library/GenreAtmosphereBackground.tsx`**
- Renders animated background effects
- Handles all effect types (flicker, pulse, fog, etc.)
- Adjustable intensity levels

**`src/components/library/EnhancedNovelEditor.tsx`**
- Main writing interface
- Integrates genre atmosphere system
- Dynamic UI theming based on genre

### Usage Example

```typescript
import { Genre, getGenreAtmosphere } from '../../utils/genreAtmospheres';
import { GenreAtmosphereBackground } from './GenreAtmosphereBackground';

// Get atmosphere data
const atmosphere = getGenreAtmosphere('horror');

// Render background
<GenreAtmosphereBackground genre="horror" intensity="medium" />

// Use colors in UI
<button style={{
  backgroundColor: atmosphere.colors.primary,
  color: atmosphere.colors.text,
  boxShadow: `0 0 20px ${atmosphere.colors.glow}`,
}}>
  Write
</button>
```

## User Experience

### Writing Flow
1. User clicks "Write New Story" in library
2. Selects a genre from the expanded genre picker
3. Entire editor transforms with genre atmosphere
4. Background animates with genre-specific effects
5. UI elements adopt genre color scheme
6. Writer is immersed in the mood of their story

### Genre Selection
- Grid layout with all 12 genres
- Active genre highlighted with glow effect
- Genre info card shows name and ambiance description
- Smooth transitions between genre changes

### Atmospheric Intensity
- Low: Subtle effects, minimal distraction
- Medium: Balanced atmosphere (default)
- High: Intense immersion, maximum effect

## Technical Details

### Performance
- CSS-based animations where possible
- Framer Motion for complex effects
- Optimized particle counts
- Conditional rendering based on intensity

### Accessibility
- Effects don't interfere with text readability
- Pointer events disabled on background layers
- Maintains contrast ratios for text
- Respects reduced motion preferences (future enhancement)

### Extensibility
- Easy to add new genres
- Modular effect system
- Customizable color palettes
- Adjustable animation parameters

## Future Enhancements

- [ ] User preference for atmosphere intensity
- [ ] Custom genre creation
- [ ] Sound effects per genre
- [ ] Time-of-day variations
- [ ] Seasonal themes
- [ ] Reduced motion mode
- [ ] Genre-specific writing prompts
- [ ] Mood-based music integration

## Related Files

- `src/utils/genreAtmospheres.ts` - Genre definitions
- `src/components/library/GenreAtmosphereBackground.tsx` - Background effects
- `src/components/library/EnhancedNovelEditor.tsx` - Main editor
- `src/components/library/StoryCard.tsx` - Genre-aware cards
- `src/utils/generatePlaceholderCover.ts` - Genre-based covers
- `src/types/index.ts` - Type exports
- `src/index.css` - Custom scrollbar styles

## Testing

To test the genre atmosphere system:

1. Navigate to the Library page
2. Click "Write New Story" or edit existing story
3. Try different genres from the selector
4. Observe background effects and color changes
5. Test writing experience in each atmosphere
6. Verify smooth transitions between genres

## Notes

- All genre effects are purely visual and don't affect functionality
- Effects are optimized for performance on modern browsers
- Background animations loop infinitely
- Genre selection persists with story data
- Compatible with existing story system
