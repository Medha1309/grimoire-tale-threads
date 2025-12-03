# GRIMOIRE Button Visual Reference

## 🎨 Quick Visual Guide

---

## Button Variants

### 1. Primary Button
```
┌─────────────────┐
│      Write      │  ← Red background (#6a0000)
└─────────────────┘     White text
     Hover: Darker red
```
**Use for:** Main actions (Write, Create, Submit, Save)

---

### 2. Secondary Button
```
┌─────────────────┐
│     Cancel      │  ← Border only
└─────────────────┘     Gray text
     Hover: Lighter border
```
**Use for:** Alternative actions (Cancel, Back alternative)

---

### 3. Ghost Button
```
  Skip  ← No border, gray text
  Hover: Lighter gray
```
**Use for:** Subtle actions (Skip, Close, Back)

---

### 4. Danger Button
```
┌─────────────────┐
│     Delete      │  ← Red border, red background
└─────────────────┘     Red text
     Hover: Darker red
```
**Use for:** Destructive actions (Delete, Remove)

---

### 5. Icon Button
```
  ✕  ← Small, icon only
  Hover: Background appears
```
**Use for:** Close buttons, toolbar icons

---

### 6. Link Button
```
  Forgot password?  ← Underline on hover
  Hover: Lighter color
```
**Use for:** Inline links, subtle navigation

---

## Button Positions

### Page Layout
```
┌─────────────────────────────────────────────────────┐
│ [Back]                                    [Write]   │ ← Top bar
│                                                      │   Back: Top-left
│                                                      │   Write: Top-right
│                                                      │
│                  MAIN CONTENT                        │
│                                                      │
│                                                      │
│                                                      │
│                                                      │
│                     [Skip]                           │ ← Bottom-center
└─────────────────────────────────────────────────────┘
```

---

### Modal Layout
```
┌─────────────────────────────────────────────────────┐
│ Modal Title                                    [×]   │ ← Close: Top-right
│                                                      │
│                  MODAL CONTENT                       │
│                                                      │
│                                                      │
│ [Delete]                      [Cancel]    [Save]     │ ← Actions: Bottom
└─────────────────────────────────────────────────────┘
   Danger left                  Secondary  Primary
```

---

### Form Layout
```
┌─────────────────────────────────────────────────────┐
│                                                      │
│  Name:     [________________]                        │
│                                                      │
│  Email:    [________________]                        │
│                                                      │
│  Message:  [________________]                        │
│            [________________]                        │
│                                                      │
│                              [Cancel]    [Submit]    │ ← Right-aligned
└─────────────────────────────────────────────────────┘
```

---

## Button States

### Default State
```
┌─────────────────┐
│      Write      │  opacity: 100%
└─────────────────┘
```

### Hover State
```
┌─────────────────┐
│      Write      │  opacity: 90%, scale: 1.02
└─────────────────┘
```

### Disabled State
```
┌─────────────────┐
│      Write      │  opacity: 50%, cursor: not-allowed
└─────────────────┘
```

### Loading State
```
┌─────────────────┐
│  ⟳   Saving...  │  opacity: 70%, spinner animation
└─────────────────┘
```

---

## Button Groups

### Horizontal Group
```
[Cancel]  [Save]  [Submit]
   ↑        ↑        ↑
  gap-3   gap-3   gap-3
```

### Vertical Group
```
[Option 1]
    ↓ gap-2
[Option 2]
    ↓ gap-2
[Option 3]
```

### Split Group
```
[Delete]                    [Cancel]  [Save]
   ↑                            ↑        ↑
  Left                        Right    Right
```

---

## Real-World Examples

### Dollhouse Page
```
┌─────────────────────────────────────────────────────┐
│ [Back]                                    [Write]   │
│                                                      │
│  ┌──────────────┐  ┌──────────────┐                │
│  │   Diary      │  │  Scrapbook   │                │
│  │              │  │              │                │
│  └──────────────┘  └──────────────┘                │
│                                                      │
│  ┌──────────────┐  ┌──────────────┐                │
│  │  Bookmarks   │  │   Archive    │                │
│  │              │  │              │                │
│  └──────────────┘  └──────────────┘                │
│                                                      │
│                     [Skip]                           │
└─────────────────────────────────────────────────────┘
```

### Forum Page
```
┌─────────────────────────────────────────────────────┐
│ [Back]                                  [Create]     │
│                                                      │
│  Thread: "The Haunting of Hill House"               │
│  ┌────────────────────────────────────────────┐    │
│  │ User: @darkwriter                          │    │
│  │ Has anyone read this? The ending...        │    │
│  │                                             │    │
│  │ [Reply]                              [Like] │    │
│  └────────────────────────────────────────────┘    │
│                                                      │
│  Thread: "Best Horror Novels of 2024"               │
│  ┌────────────────────────────────────────────┐    │
│  │ User: @horrorlover                         │    │
│  │ My top 5 picks for this year...            │    │
│  │                                             │    │
│  │ [Reply]                              [Like] │    │
│  └────────────────────────────────────────────┘    │
└─────────────────────────────────────────────────────┘
```

### Write Modal
```
┌─────────────────────────────────────────────────────┐
│ New Entry                                      [×]   │
│                                                      │
│  Title:  [_____________________________________]     │
│                                                      │
│  Mood:   [Joy] [Sorrow] [Calm] [Unrest]             │
│                                                      │
│  Content:                                            │
│  ┌────────────────────────────────────────────┐    │
│  │                                             │    │
│  │                                             │    │
│  │                                             │    │
│  │                                             │    │
│  └────────────────────────────────────────────┘    │
│                                                      │
│                              [Cancel]    [Save]      │
└─────────────────────────────────────────────────────┘
```

### Delete Confirmation Modal
```
┌─────────────────────────────────────────────────────┐
│ Confirm Deletion                               [×]   │
│                                                      │
│  Are you sure you want to delete this entry?        │
│  This action cannot be undone.                      │
│                                                      │
│                                                      │
│ [Delete]                      [Cancel]               │
└─────────────────────────────────────────────────────┘
   Danger                       Secondary
```

---

## Color Reference

### Primary Button
- Background: `#6a0000` (Crimson)
- Text: `#f4f4f5` (Zinc-100)
- Hover: `#8B0000` (Darker crimson)

### Secondary Button
- Border: `#27272a` (Zinc-800)
- Text: `#a1a1aa` (Zinc-400)
- Hover Border: `#3f3f46` (Zinc-700)
- Hover Text: `#d4d4d8` (Zinc-300)

### Ghost Button
- Text: `#71717a` (Zinc-500)
- Hover Text: `#d4d4d8` (Zinc-300)

### Danger Button
- Background: `rgba(69, 10, 10, 0.2)` (Red-950/20)
- Border: `rgba(106, 0, 0, 0.4)` (Red-900/40)
- Text: `#f87171` (Red-400)
- Hover Background: `rgba(69, 10, 10, 0.3)`
- Hover Border: `rgba(106, 0, 0, 0.6)`

---

## Spacing Reference

### Button Padding
- Primary/Secondary/Danger: `px-6 py-3` (24px × 12px)
- Ghost: `px-4 py-2` (16px × 8px)
- Icon: `p-2` (8px)

### Button Gaps
- Horizontal group: `gap-3` (12px)
- Vertical group: `gap-2` (8px)

### Position Offsets
- Top/Left/Right: `4` (16px from edge)
- Bottom: `8` (32px from edge)

---

## Typography Reference

### Font
- Family: `font-serif` (Crimson Text)
- Size: `text-sm` (14px)
- Tracking: `tracking-wider` (0.05em)

### Text Transform
- Labels: Normal case (not uppercase)
- Example: "Write" not "WRITE"

---

## Animation Reference

### Hover Animation
```
scale: 1.0 → 1.02
duration: 200ms
easing: ease-in-out
```

### Tap Animation
```
scale: 1.0 → 0.98
duration: 100ms
easing: ease-in-out
```

### Loading Spinner
```
rotation: 0° → 360°
duration: 1000ms
repeat: infinite
easing: linear
```

---

## Accessibility Reference

### Minimum Touch Target
- Size: 44px × 44px (mobile)
- Spacing: 8px between targets

### Keyboard Navigation
- Tab: Focus next button
- Shift+Tab: Focus previous button
- Enter/Space: Activate button

### Screen Reader
- All buttons have descriptive labels
- Loading state announced
- Disabled state announced

---

## Mobile Considerations

### Touch Targets
```
┌─────────────────┐
│                 │  ← Minimum 44px height
│      Write      │
│                 │
└─────────────────┘
```

### Responsive Positions
- Top buttons: Stay at top
- Bottom buttons: Stay at bottom
- Side margins: Reduce on mobile

### Mobile Layout
```
┌───────────────────┐
│ [Back]    [Write] │ ← Smaller padding
│                   │
│   CONTENT         │
│                   │
│     [Skip]        │
└───────────────────┘
```

---

## Dark Mode (Current)

All buttons designed for dark background:
- Background: `#000000` (Black)
- Text: Light colors for contrast
- Borders: Subtle zinc colors

---

## Print Reference Card

```
╔═══════════════════════════════════════════════════════╗
║              GRIMOIRE BUTTON REFERENCE                ║
╠═══════════════════════════════════════════════════════╣
║ VARIANTS                                              ║
║ • Primary    → Red bg, white text (Write, Create)    ║
║ • Secondary  → Border only (Cancel, Back)            ║
║ • Ghost      → Text only (Skip, Close)               ║
║ • Danger     → Red theme (Delete, Remove)            ║
║ • Icon       → Small, icon only (✕)                  ║
║ • Link       → Underline on hover (Links)            ║
╠═══════════════════════════════════════════════════════╣
║ POSITIONS                                             ║
║ • Write/Create  → Top-right                          ║
║ • Back/Close    → Top-left                           ║
║ • Skip          → Bottom-center                      ║
║ • Form Actions  → Bottom-right                       ║
║ • Modal Actions → Bottom full-width                  ║
╠═══════════════════════════════════════════════════════╣
║ STATES                                                ║
║ • Default   → opacity-100                            ║
║ • Hover     → opacity-90, scale-102                  ║
║ • Disabled  → opacity-50                             ║
║ • Loading   → opacity-70, spinner                    ║
╚═══════════════════════════════════════════════════════╝
```

---

**Made with 🕯️ for GRIMOIRE consistency**
