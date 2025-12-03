# About Page - Visual Layout Guide

## Scene Overview

```
┌─────────────────────────────────────────────────────────────────┐
│  [BRASS PLAQUE NAVBAR: ← BACK | ABOUT]                         │
│                                                                  │
│                  "The Dollhouse Diary"                          │
│                  (disappears after 5s)                          │
│                                                                  │
│  ┌──────────┐                                    ┌────────────┐ │
│  │ WINDOW   │                                    │ BLUEPRINT  │ │
│  │  ┌──┬──┐ │                                    │  ON WALL   │ │
│  │  │  │  │ │  [Light beams →→→]                │            │ │
│  │  ├──┼──┤ │                                    │  [Tacks]   │ │
│  │  │  │  │ │                                    │            │ │
│  │  └──┴──┘ │                                    │ Dollhouse  │ │
│  └──────────┘                                    │ Cutaway    │ │
│      │                                           │ Diagram    │ │
│      └─[Text Plaque]                             └────────────┘ │
│        "Why it matters"                                         │
│                                                                  │
│                                                                  │
│                                    ┌──────────────┐             │
│                                    │ MEMORY CHEST │             │
│  ┌──────────────┐                 │   [Lock]     │             │
│  │ WOODEN CRATE │                 │              │             │
│  │  ┌─────────┐ │                 │  (Click to   │             │
│  │  │ JOURNAL │ │                 │   open)      │             │
│  │  │  The    │ │                 └──────────────┘             │
│  │  │Dollhouse│ │                                               │
│  │  │  Diary  │ │                                               │
│  │  │    🖊️   │ │                                               │
│  │  └─────────┘ │                                               │
│  └──────────────┘                                               │
│                                                                  │
│  [Wooden Floor with Planks]                                     │
└─────────────────────────────────────────────────────────────────┘
     ↑ Sloped Roof Beams ↑              ↑ Dust Particles ↑
```

## Depth Layers (Z-Index)

```
Layer 50: Modals (opened journal/blueprint)
Layer 40: Navbar plaque
Layer 30: Disappearing title
Layer 20: Vignette & film grain
Layer 10: Interactive objects (journal, chest, blueprint)
Layer 5:  Rain & spiders
Layer 2:  Watching eyes (subtle)
Layer 1:  Floating toys & broken parts
Layer 0:  Base attic structure (floor, roof, window)
```

## Object Positions

### Window (Upper-Left)
```
Position: left: 8%, top: 15%
Size: 180px × 240px
Features:
- Wooden frame with cross bars
- Foggy glass
- Light source
- Text plaque below
```

### Journal on Crate (Lower-Left)
```
Position: left: 10%, bottom: 25%
Size: 380px wide
Features:
- Wooden crate (120px height)
- Leather journal (280px height)
- Fountain pen (diagonal)
- Ink stain
```

### Wall Blueprint (Right Wall)
```
Position: right: 10%, top: 20%
Size: 420px × 500px
Features:
- Metal tacks (4 corners)
- Aged paper
- Architectural diagram
- Handwritten notes
- Torn bottom edge
```

### Memory Chest (Center-Right Floor)
```
Position: right: 35%, bottom: 20%
Size: 320px wide × 180px height
Features:
- Ornate wooden chest
- Metal bands
- Lock & hinges
- Warm glow from cracks
- Opens to reveal objects
```

## Lighting Diagram

```
        [WINDOW]
           │
           │ ╲
           │   ╲  Light Beam
           │     ╲
           │       ╲
           │         ╲
           ▼           ▼
    [Journal]      [Chest]
    (Lit)          (Partially lit)

                        [Blueprint]
                        (Shadowed)
```

## Color Zones

```
┌─────────────────────────────────────────┐
│ DARK (Roof)                             │
│ rgba(25, 20, 15, 0.95)                  │
├─────────────────────────────────────────┤
│                                         │
│ MEDIUM (Walls)                          │
│ rgba(35, 30, 25, 0.9)                   │
│                                         │
│  [LIGHT ZONE]                           │
│  rgba(220, 220, 210, 0.2)               │
│                                         │
├─────────────────────────────────────────┤
│ MEDIUM-DARK (Floor)                     │
│ rgba(45, 40, 35, 0.95)                  │
└─────────────────────────────────────────┘
```

## Interaction Zones

### Hover States
```
Journal:
  ├─ Cover lifts 4px
  ├─ Ink smoke appears
  └─ Cursor: pointer

Blueprint:
  ├─ Scale: 1.02
  └─ Cursor: pointer

Chest:
  ├─ Moves up 2px
  ├─ Shivers (if closed)
  └─ Cursor: pointer

Objects in Chest:
  ├─ Scale: 1.2
  ├─ Rotate: ±5deg
  └─ Tooltip appears
```

### Click Actions
```
Journal → Opens modal with two-page spread
Blueprint → Opens modal with data flow
Chest → Opens lid, reveals objects
Objects → Shows tooltip (already visible on hover)
Back Button → Navigate to home
```

## Scroll Behavior

```
Scroll Position: 0px
├─ Camera: Normal view
├─ Objects: Base position
└─ Parallax: 0

Scroll Position: 500px
├─ Camera: Slight zoom (1.05x)
├─ Objects: Subtle shift
└─ Parallax: 25px offset

Scroll Position: 1000px
├─ Camera: More zoom (1.1x)
├─ Objects: More shift
└─ Parallax: 50px offset
```

## Particle Effects

### Rain Drops
```
Count: 40
Distribution: Random across viewport
Speed: 0.4-0.8s per drop
Opacity: 0 → 0.5 → 0
Direction: Top to bottom
```

### Dust Particles
```
Count: 30
Location: Near window (light beam)
Speed: 8-14s per particle
Movement: Upward float with drift
Opacity: 0 → 0.6 → 0
```

### Spiders
```
Count: 8
Size: 20px
Color: Default (dark)
Behavior: Crawling across screen
Speed: Slow, realistic
```

## Modal Layouts

### Journal Modal
```
┌─────────────────────────────────────┐
│  [Close on click outside]           │
│                                     │
│  ┌──────────────┬──────────────┐   │
│  │ LEFT PAGE    │ RIGHT PAGE   │   │
│  │              │              │   │
│  │ Paragraph    │ • Bullet 1   │   │
│  │ text with    │ • Bullet 2   │   │
│  │ first letter │ • Bullet 3   │   │
│  │ drop cap     │ • Bullet 4   │   │
│  │              │              │   │
│  │ More text... │              │   │
│  └──────────────┴──────────────┘   │
│                                     │
└─────────────────────────────────────┘
```

### Blueprint Modal
```
┌─────────────────────────────────────┐
│  [Close on click outside]           │
│                                     │
│  How Data Flows Through The System  │
│                                     │
│  Frontend Layer                     │
│  ├─ React 18 + TypeScript          │
│  └─ Framer Motion animations       │
│                                     │
│  AI Processing                      │
│  ├─ Gemini API integration         │
│  └─ Photo → Video pipeline         │
│                                     │
│  Storage & Security                 │
│  ├─ Client-side encryption         │
│  └─ Cloud Storage                  │
│                                     │
│  Deployment                         │
│  └─ Google Cloud Run               │
│                                     │
└─────────────────────────────────────┘
```

## Responsive Breakpoints

### Desktop (1024px+)
```
Full cinematic layout
All objects visible
Parallax enabled
Full particle effects
```

### Tablet (768px - 1023px)
```
Adjusted object positions
Reduced particles (30 rain, 6 spiders)
Simplified parallax
Touch-friendly hit areas
```

### Mobile (< 768px)
```
Stacked layout
Objects repositioned vertically
Minimal particles (20 rain, 4 spiders)
No parallax
Larger touch targets
```

## Animation Timing

```
Timeline:
0s    → Page loads, attic fades in
0.5s  → Navbar appears
0s    → Title appears
5s    → Title fades out
Continuous → Rain, dust, spiders animate
Random → Window flickers (every 8s, 20% chance)
On Scroll → Camera parallax
On Hover → Object effects
On Click → Modal animations
```

## Performance Budget

```
Initial Load:
├─ HTML: < 5KB
├─ CSS: < 10KB (inline)
├─ JS: < 50KB (component code)
└─ Total: < 65KB

Runtime:
├─ FPS: 60fps target
├─ Paint: < 16ms per frame
├─ Layout: Minimal reflows
└─ Memory: < 50MB
```

## Accessibility Landmarks

```
<nav>     → Brass plaque navbar
<main>    → Attic scene container
<article> → Journal content
<aside>   → Blueprint details
<section> → Memory chest features
<footer>  → Window text plaque
```

---

**This layout creates a cohesive, cinematic experience where every element feels physically present in the attic space.**
