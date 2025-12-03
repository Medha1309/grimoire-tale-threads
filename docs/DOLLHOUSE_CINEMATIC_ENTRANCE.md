# Dollhouse Cinematic Entrance Animation

## Overview
Enhanced the Dollhouse entrance with a spooky, cinematic animation sequence featuring multi-line text and flickering effects.

## Animation Sequence

### Phase 1: Eyes (0-4s)
- Multiple pairs of glowing pink eyes slowly materialize across the screen
- Eyes fade in with heavily staggered timing (0.25s delays)
- Slow, hypnotic breathing animation (4s cycles)
- Mysterious, unsettling atmosphere
- Eyes appear gradually from darkness

### Phase 2: Cinematic Text (4-11s)
**Four lines appear sequentially with slow, dramatic timing:**

1. "Some memories write themselves…" (delay: 0s)
2. "Some hide behind doors…" (delay: 1.5s)
3. "Some flicker on old TVs…" (delay: 3.0s)
4. "Some live inside portraits…" (delay: 4.5s)

**Text Effects:**
- Slow fade in from blur with upward motion (1.8s per line)
- Each line takes 1.5s to appear after previous
- Glowing pink text shadow that pulses slowly (3s cycles)
- Blur effect clears as text materializes
- Mysterious, ghostly appearance
- Smaller, more elegant text size

### Phase 3: Lingering Pause (11-12.5s)
- Extended pause after text for dramatic effect
- Allows final line to sink in
- Builds tension and anticipation

### Phase 4: TV Static (12.5-16.5s)
- Vintage TV static effect
- Atmospheric transition (4 seconds)
- Creates disorientation before reveal

### Phase 5: Black Pause (16.5-19s)
- Extended darkness (2.5 seconds)
- Subtle pink glow fades in slowly
- Maximum tension before reveal

### Phase 6: Dollhouse Flicker (19-23s)
**Slow, atmospheric flickering entrance:**
- Dollhouse flickers into view like dying light bulbs struggling to turn on
- Multiple slow flicker pulses: 0 → 15% → 0 → 30% → 0 → 50% → 0 → 70% → 90% → 100%
- Synchronized black overlay creates realistic old electrical effect
- 4-second slow flicker sequence
- Content fades in from blur over 3.5 seconds
- Mysterious, haunting reveal

## Technical Implementation

### DollhouseTransition.tsx
```tsx
// Multi-line text with staggered appearance
{[
  { text: 'Some memories write themselves…', delay: 0 },
  { text: 'Some hide behind doors…', delay: 0.5 },
  { text: 'Some flicker on old TVs…', delay: 1.0 },
  { text: 'Some live inside portraits…', delay: 1.5 },
].map((line, i) => (
  <motion.p
    initial={{ opacity: 0, y: 10 }}
    animate={{ 
      opacity: [0, 1, 1, 0.9],
      y: [10, 0, 0, 0],
      textShadow: [/* pulsing glow */],
    }}
    transition={{ delay: line.delay, duration: 0.8 }}
  >
    {line.text}
  </motion.p>
))}
```

### Dollhouse.tsx
```tsx
// Flickering entrance effect
<motion.section
  animate={{ 
    opacity: [0, 0.3, 0, 0.6, 0, 1, 0.9, 1],
  }}
  transition={{ 
    duration: 2,
    times: [0, 0.1, 0.15, 0.25, 0.3, 0.5, 0.7, 1],
  }}
>
  {/* Synchronized black overlay for flicker effect */}
  <motion.div
    animate={{ 
      opacity: [1, 0, 0.4, 0, 0.6, 0, 0.3, 0],
    }}
  />
```

## Timing Breakdown

| Time | Phase | Description |
|------|-------|-------------|
| 0-4s | Eyes | Glowing eyes slowly materialize |
| 4-11s | Text | Four lines appear with 1.5s spacing |
| 11-12.5s | Pause | Lingering dramatic pause |
| 12.5-16.5s | Static | Extended TV static transition |
| 16.5-19s | Black | Extended darkness with subtle glow |
| 19-23s | Flicker | Slow, atmospheric flicker sequence |
| 23-26.5s | Fade In | Content fades in from blur |
| 26.5s+ | Stable | Dollhouse fully visible |

**Total Duration:** ~26.5 seconds (skippable at any time)
**Pacing:** Slow, mysterious, atmospheric

## Visual Effects

### Text Styling
- Font: Grimoire (serif)
- Size: 3xl-4xl (responsive)
- Color: Pink (#ffb6d9) with 90% opacity
- Glow: Pulsing text shadow (10px → 25px → 20px)
- Animation: Fade up with smooth easing

### Flicker Pattern
- Rapid on/off pulses
- Varying intensities (30%, 60%, 100%)
- Creates old electrical/horror movie effect
- Synchronized overlay for enhanced realism

## User Experience

- **Skip Button:** Always available at bottom
- **Smooth Transitions:** Cinematic easing curves
- **Atmospheric:** Sets tone for Dollhouse experience
- **Memorable:** Creates strong first impression
- **Thematic:** Reinforces horror/mystery aesthetic

## Performance

- Optimized animation keyframes
- Minimal re-renders
- Efficient cleanup with useEffect
- No layout thrashing
- Smooth 60fps animation

## Future Enhancements

Possible additions:
- Sound effects (creaking, static, whispers)
- More eye variations
- Parallax effects
- User preference to disable animation
- Different entrance animations per visit
