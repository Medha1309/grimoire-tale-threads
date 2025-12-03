# Dollhouse Transition Flow Diagram

## Entry Flow (First Visit)

```
User clicks "Diary" in navbar
         ↓
Page starts loading
         ↓
┌─────────────────────────────────────┐
│  STAGE 1: Door Opening (2s)         │
│  ┌───────────────────────────────┐  │
│  │  🚪 Wooden doors creak open   │  │
│  │  Darkness revealed behind     │  │
│  │  *creak* sound effect text    │  │
│  └───────────────────────────────┘  │
└─────────────────────────────────────┘
         ↓
┌─────────────────────────────────────┐
│  STAGE 2: Eyes Appearing (1.5s)     │
│  ┌───────────────────────────────┐  │
│  │  👁️👁️ Multiple pairs of eyes  │  │
│  │  Glowing pink, watching       │  │
│  │  Blinking animation           │  │
│  │  *breathing* sound effect     │  │
│  └───────────────────────────────┘  │
└─────────────────────────────────────┘
         ↓
┌─────────────────────────────────────┐
│  STAGE 3: Whisper (1.5s)            │
│  ┌───────────────────────────────┐  │
│  │  "come inside..."             │  │
│  │  (glowing pink text)          │  │
│  │                               │  │
│  │  "the dolls are waiting"      │  │
│  │  (gray subtitle)              │  │
│  └───────────────────────────────┘  │
└─────────────────────────────────────┘
         ↓
Dollhouse page fades in
         ↓
sessionStorage.setItem('dollhouseTransitionShown', 'true')
```

## Subsequent Visits (Same Session)

```
User clicks "Diary" in navbar
         ↓
Check sessionStorage
         ↓
'dollhouseTransitionShown' === 'true'
         ↓
Skip transition, load page directly
```

## Room Navigation Flow (Always)

```
User clicks on a room (e.g., "View All Entries")
         ↓
┌─────────────────────────────────────┐
│  Room Transition (1.2s)             │
│  ┌───────────────────────────────┐  │
│  │  🕯️ Flickering candle         │  │
│  │  (center of screen)           │  │
│  │                               │  │
│  │  👤 Shadow figure passes      │  │
│  │  (left to right)              │  │
│  │                               │  │
│  │  "entering..."                │  │
│  │  (whisper text at bottom)     │  │
│  └───────────────────────────────┘  │
└─────────────────────────────────────┘
         ↓
New room view fades in
```

## Visual Timeline

### Entry Animation (5.5 seconds total)

```
0s    1s    2s    3s    3.5s  4s    5s    5.5s
|-----|-----|-----|-----|-----|-----|-----|
[  Door Opening   ]
                  [  Eyes  ]
                            [ Whisper ]
                                          [Fade]
```

### Room Animation (1.2 seconds)

```
0s    0.3s  0.6s  0.9s  1.2s
|-----|-----|-----|-----|
[Fade In]
    [Candle Flicker]
        [Shadow Pass]
            [Whisper]
                  [Complete]
```

## State Management

### DollhousePageWrapper State
```typescript
showTransition: boolean        // Controls if transition is visible
hasShownTransition: boolean    // Tracks if transition completed
```

### Dollhouse Page State
```typescript
showRoomTransition: boolean    // Controls room transition visibility
pendingView: string | null     // Target view after transition
```

## Component Hierarchy

```
Router
  └─ DollhousePageWrapper
      ├─ DollhouseTransition (conditional, first visit only)
      └─ Dollhouse
          ├─ DollhouseRoom (multiple)
          └─ RoomTransition (conditional, on room navigation)
```

## User Experience Flow

### First Time Visitor
```
Landing → Click "Diary" → Door Animation → Eyes → Whisper → Dollhouse Home
                                                                    ↓
                                                          Click "Library"
                                                                    ↓
                                                          Candle Transition
                                                                    ↓
                                                          Library View
```

### Returning Visitor (Same Session)
```
Landing → Click "Diary" → Dollhouse Home (instant)
                                ↓
                      Click "Scrapbook"
                                ↓
                      Candle Transition
                                ↓
                      Scrapbook View
```

### New Session (After Closing Browser)
```
Landing → Click "Diary" → Door Animation (plays again) → Dollhouse Home
```

## Animation Details

### Door Opening
- Duration: 2 seconds
- Effect: Doors scale from 1 to 0 (scaleX)
- Origin: Left door from left, right door from right
- Darkness fades in behind doors

### Eyes Appearing
- 5 pairs of eyes at different positions
- Staggered appearance (0.2s delay between each)
- Blinking animation (scale pulse)
- Pink glow (#ff1493)

### Whisper Text
- Font: Parisienne (cursive)
- Color: Pink (#ffb6d9) with glow
- Animation: Pulsing text shadow
- Subtitle in gray

### Candle Flicker
- Scale: [1, 1.1, 0.9, 1.05, 1]
- Opacity: [0.8, 1, 0.7, 0.9, 0.8]
- Glow: Radial gradient (orange/yellow)

### Shadow Figure
- Moves from -10% to 110% (left to right)
- Opacity: [0, 0.6, 0.6, 0]
- Blur: 2xl
- Shape: Humanoid silhouette
