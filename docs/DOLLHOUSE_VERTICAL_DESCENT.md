# Dollhouse: Vertical Descent into the Subconscious

## Design Philosophy

The Dollhouse page now uses **vertical storytelling** to create a psychological descent as users scroll. This breaks the symmetry of the previous 2x2 grid and creates a narrative arc from innocence to corruption.

## The Three Levels

### 🎀 TOP LEVEL - Bright & Childlike (Write Room)
**Visual Treatment:**
- Bright, saturated pink toys (🎀🧸)
- Sparkles (✨) on both sides
- High brightness (1.3) and saturation (1.5)
- Clean, innocent aesthetic
- Lighter background gradient

**Psychological Message:**
- "This is where new thoughts begin"
- Innocence, creativity, fresh starts
- Safe space for expression

---

### 📖 MID LEVEL - Neutral Transition (Library Room)
**Visual Treatment:**
- Faded, grayscale decorations (📖🕯️)
- 50% opacity on surrounding elements
- Neutral gray tones
- Transitional gradient darkening

**Psychological Message:**
- "The archive of your mind"
- Memory, reflection, organization
- Neither innocent nor corrupted - just existing

---

### 🪆 BOTTOM LEVEL - Dark & Corrupted (Scrapbook & Bookmarks)
**Visual Treatment:**
- Heavily desaturated, dark toys (🪆🧸)
- Visible cracks overlaid on rooms (dark red #8B0000)
- Multiple crack patterns on the bottom-most room
- Grayscale filter (0.8-1.0)
- Low brightness (0.3-0.6)
- Dark vignette effect
- Corrupted, broken aesthetic
- Darkest background gradient

**Psychological Message:**
- "The deeper you go, the darker it gets"
- Hidden memories, buried secrets
- The weight of accumulated experiences
- Decay and corruption of innocence

---

## Technical Implementation

### Vertical Layout
```tsx
<div className="space-y-32"> {/* Large vertical spacing */}
  {/* Top Room */}
  {/* Transition gradient */}
  {/* Mid Room */}
  {/* Darker transition */}
  {/* Bottom Rooms with space-y-24 */}
</div>
```

### Progressive Darkening
- **Background**: `from-zinc-900 via-zinc-950 to-black`
- **Checkered pattern**: Fades using mask-image gradient
- **Floating toys**: Brightness/saturation decrease by index
- **Overlays**: Gradual darkening transitions between levels

### Crack Effects
- SVG paths overlaid on bottom rooms
- Dark red color (#8B0000) for blood/corruption feel
- Multiple cracks on the deepest room
- Opacity 0.3-0.4 for subtle horror

---

## User Experience

As users scroll down the page:
1. **Initial impression**: Bright, playful, inviting (Write)
2. **Middle section**: Calm, organized, neutral (Library)
3. **Deep dive**: Dark, unsettling, corrupted (Scrapbook, Bookmarks)

This creates a **psychological journey** that mirrors:
- Descending into memory
- Exploring the subconscious
- Confronting buried emotions
- The corruption of innocence over time

---

## Haunted UX Benefits

✅ **Breaks symmetry** - No more predictable 2x2 grid
✅ **Narrative arc** - Story unfolds as you scroll
✅ **Psychological depth** - Visual metaphor for the mind
✅ **Unsettling progression** - Gradual shift from light to dark
✅ **Memorable experience** - Users feel the descent

---

## Future Enhancements

- **Parallax scrolling**: Rooms move at different speeds
- **Scroll-triggered animations**: Elements appear/corrupt as you scroll
- **Sound design**: Ambient sounds get darker/distorted
- **Interactive cracks**: Cracks spread as you hover
- **Depth perception**: Rooms appear to recede into darkness
