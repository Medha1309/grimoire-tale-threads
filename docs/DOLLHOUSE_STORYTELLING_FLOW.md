# Dollhouse Storytelling Flow Update

## Changes Made

### 1. Fullscreen Static Effect
**Before:** Static appeared in a TV frame (felt gimmicky and disconnected)
**After:** Static fills the entire screen (immersive, connected to dollhouse world)

- Removed TV bezel/frame
- Static now covers full viewport
- Creates seamless transition into dollhouse
- Feels like entering another dimension

### 2. Sequential Text Fade (Storytelling Flow)
**Before:** All lines visible simultaneously
**After:** Each line appears, stays briefly, then fades out before next line

**Animation Flow:**
1. Line 1 appears → stays → fades out
2. Line 2 appears → stays → fades out  
3. Line 3 appears → stays → fades out
4. Line 4 appears → stays → fades out
5. Smooth transition to static

**Timing:**
- Line 1: 0s - 1.6s
- Line 2: 1.8s - 3.4s
- Line 3: 3.6s - 5.2s
- Line 4: 5.4s - 7.0s
- Static begins: 12.5s (with smooth 1.2s fade-in)

### 3. Improved Text Animation
**Each line now:**
- Fades in from blur (0.15s)
- Becomes clear and glows (0.35s - 0.75s)
- Fades out with blur (0.75s - 1.0s)
- Moves up slightly as it fades (-10px)
- Uses absolute positioning (centered, one at a time)

**Visual Effects:**
- Blur: 4px → 0px → 6px
- Opacity: 0 → 1 → 0
- Y position: 20px → 0px → -10px
- Text shadow: subtle → bright → subtle

### 4. Smoother Static Transition
**Before:** Abrupt 0.2s fade-in
**After:** Smooth 1.2s fade-in with easing

- Duration: 1.2s (6x longer)
- Easing: [0.16, 1, 0.3, 1] (smooth curve)
- Feels like reality dissolving into static
- Creates sense of crossing threshold

## Storytelling Experience

### Narrative Flow:
The animation now tells a story:

1. **Eyes watching** (mysterious presence)
2. **Line 1:** "Some memories write themselves in time..." (introduction)
3. **Line 2:** "Some flicker through the static's grime..." (foreshadowing)
4. **Line 3:** "Some hide behind the locked-up doors..." (mystery)
5. **Line 4:** "Some sleep in portraits evermore..." (haunting conclusion)
6. **Static** (reality breaking down)
7. **Darkness** (crossing threshold)
8. **Dollhouse** (arrival in new world)

### Emotional Journey:
- **Wonder** → **Curiosity** → **Unease** → **Anticipation** → **Immersion**

## Technical Implementation

### Text Positioning:
```tsx
className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-full px-8"
```
- Centered on screen
- One line visible at a time
- Smooth transitions between lines

### Animation Keyframes:
```tsx
opacity: [0, 0, 1, 1, 0]
y: [20, 20, 0, 0, -10]
filter: ['blur(4px)', 'blur(4px)', 'blur(0px)', 'blur(0px)', 'blur(6px)']
times: [0, 0.15, 0.35, 0.75, 1]
```

### Static Fade-In:
```tsx
transition={{ 
  duration: 1.2,
  ease: [0.16, 1, 0.3, 1]
}}
```

## User Experience

### Before:
- Felt disjointed
- TV frame broke immersion
- All text at once was overwhelming
- Abrupt transitions

### After:
- Cohesive storytelling
- Fullscreen creates immersion
- One line at a time is digestible
- Smooth, cinematic transitions
- Feels like entering a story/world

## Thematic Coherence

The sequence now feels like:
- **Opening credits** of a horror film
- **Storybook narration** coming to life
- **Portal** into the dollhouse world
- **Threshold crossing** in hero's journey

Perfect for setting the tone of mystery, horror, and wonder that defines the Dollhouse experience.
