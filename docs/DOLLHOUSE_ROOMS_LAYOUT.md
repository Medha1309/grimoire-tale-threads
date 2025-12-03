# Dollhouse Rooms Layout

Visual guide to the Boudoir (Dollhouse) room layout.

---

## Room Structure

```
┌─────────────────────────────────────────────────────┐
│                   BOUDOIR HOME                       │
├─────────────────────────────────────────────────────┤
│                                                      │
│              [Terminal Interface]                    │
│                                                      │
│  ┌────────────────────────────────────────────┐    │
│  │                                             │    │
│  │              DIARY (Main Room)              │    │
│  │           [Featured, Centered]              │    │
│  │                                             │    │
│  └────────────────────────────────────────────┘    │
│                                                      │
│  ┌──────────┐ ┌──────────┐ ┌──────────┐ ┌──────────┐
│  │          │ │          │ │          │ │          │
│  │ Scrapbook│ │   Art    │ │ Archive  │ │  Saved   │
│  │          │ │  Studio  │ │          │ │  Books   │
│  │          │ │          │ │          │ │          │
│  └──────────┘ └──────────┘ └──────────┘ └──────────┘
│                                                      │
└─────────────────────────────────────────────────────┘
```

---

## Room Details

### 1. Diary (Main Room)
**Position**: Top center, featured  
**Size**: Large (w-80)  
**Room Index**: 0  
**Purpose**: Write and view diary entries  
**Features**:
- Create new entries
- View existing entries
- Book, list, and grid layouts
- Mood selection
- Lock entries

### 2. Scrapbook
**Position**: Bottom row, first  
**Room Index**: 1  
**Purpose**: Memory scrapbook with photos and notes  
**Features**:
- Add photos
- Add notes
- Vintage polaroid effects
- Stickers and filters
- Scratch-off secrets

### 3. Art Studio
**Position**: Bottom row, second  
**Room Index**: 2  
**Purpose**: Create and view artwork  
**Features**:
- Drawing canvas
- Brush tools
- Color palette
- Shape tools
- Text tools
- Gallery view

### 4. Archive (NEW!)
**Position**: Bottom row, third  
**Room Index**: 3  
**Purpose**: Reading history with pink Matrix aesthetic  
**Glow Color**: Pink (`rgba(255, 105, 180, 0.3)`)  
**Features**:
- View reading history
- Add personal notes
- Rate books (1-5 stars)
- Reading statistics
- Pink Matrix rain background
- Book covers display

### 5. Saved Books
**Position**: Bottom row, fourth  
**Room Index**: 4  
**Purpose**: Bookmarked stories from the library  
**Features**:
- View bookmarked stories
- Remove bookmarks
- Navigate to stories
- Navigate to library

---

## Grid Layout

### Desktop (md and up)
```
4 columns: grid-cols-4
[Scrapbook] [Art Studio] [Archive] [Saved Books]
```

### Mobile
```
2 columns: grid-cols-2
[Scrapbook] [Art Studio]
[Archive]   [Saved Books]
```

---

## Room Interactions

### Hover Effects
- Glow appears around room
- Opacity increases
- Smooth transition (0.3s)

### Click Actions
- Navigate to room view
- Smooth fade transition
- Room content loads

### Terminal Commands
All rooms accessible via terminal:
- `cd diary` or `ls diary`
- `cd scrapbook` or `ls scrapbook`
- `cd art` or `ls art`
- `cd archive` or `ls archive`
- `cd bookmarks` or `ls bookmarks`

---

## Visual Hierarchy

1. **Terminal** - Top, always visible
2. **Diary** - Main featured room, largest
3. **Secondary Rooms** - Equal size, grid layout

---

## Responsive Behavior

### Large Screens (1024px+)
- All rooms visible
- 4-column grid for secondary rooms
- Optimal spacing

### Medium Screens (768px - 1023px)
- All rooms visible
- 4-column grid (slightly tighter)
- Reduced spacing

### Small Screens (< 768px)
- All rooms visible
- 2-column grid
- Stacked layout
- Touch-friendly sizing

---

## Animation Sequence

1. **Terminal** - Fades in from top (delay: 0.1s)
2. **Diary** - Scales up (delay: 0.2s)
3. **Scrapbook** - Scales up (delay: 0.3s)
4. **Art Studio** - Scales up (delay: 0.35s)
5. **Archive** - Scales up (delay: 0.4s)
6. **Saved Books** - Scales up (delay: 0.45s)

Each room has a staggered entrance for a cascading effect.

---

## Room Glow Colors

- **Default**: `rgba(255,182,217,0.3)` (soft pink)
- **Archive**: `rgba(255, 105, 180, 0.3)` (hot pink - matches Matrix theme)

---

## Navigation Flow

```
Landing Page
    │
    ▼
Boudoir Home
    │
    ├─▶ Diary ──▶ Write/View Entries
    │
    ├─▶ Scrapbook ──▶ Memory Collection
    │
    ├─▶ Art Studio ──▶ Create/View Art
    │
    ├─▶ Archive ──▶ Reading History
    │
    └─▶ Saved Books ──▶ Bookmarked Stories
```

---

## Recent Changes

### December 1, 2025
- ✅ Added Archive room to visual layout
- ✅ Changed grid from 3 to 4 columns
- ✅ Updated room indices
- ✅ Added pink glow for Archive
- ✅ Made responsive (2 cols mobile, 4 cols desktop)

### Previous
- Diary as main featured room
- 3 secondary rooms (Scrapbook, Art Studio, Saved Books)
- Terminal navigation

---

## Future Enhancements

Potential additions:
- Investigation Board room
- Music Box room
- Secret Room (unlockable)
- Guest Book room
- Time Capsule room

---

## Technical Details

### Component
`src/components/diary/DollhouseHomeView.tsx`

### Props
```typescript
interface DollhouseHomeViewProps {
  litRoom: number;
  hoveredRoom: number;
  possessedRoom: number;
  onRoomHover: (roomIndex: number) => void;
  onRoomLeave: () => void;
  onNavigateToRoom: (view: 'diary' | 'scrapbook' | 'bookmarks' | 'archive' | 'art') => void;
  onBack?: () => void;
}
```

### Room Wrapper
Handles hover effects, lighting, and animations for each room.

---

## Accessibility

- All rooms keyboard navigable
- Focus states visible
- Screen reader friendly labels
- Touch targets sized appropriately
- High contrast on hover

---

## Summary

The Boudoir now has **5 rooms** total:
1. Diary (main)
2. Scrapbook
3. Art Studio
4. **Archive** (newly visible)
5. Saved Books

All rooms are accessible via both visual doors and terminal commands.

