# Design Document: Dollhouse Windows 98 Hybrid Redesign

## Overview

The Dollhouse Windows 98 Hybrid redesign transforms the personal creative space into a sophisticated desktop environment that blends gothic aesthetics with retro computing nostalgia. The system maintains the beloved cinematic entrance and Matrix rain animations while introducing a fully functional Windows 98-style interface where each room operates as an independent, draggable window. This design leverages existing Windows 98 components while creating a cohesive, polished experience that elevates the Dollhouse from basic to professional-grade.

## Architecture

### High-Level Architecture

```
┌─────────────────────────────────────────────────────────────┐
│                    Dollhouse Page                            │
│  ┌───────────────────────────────────────────────────────┐  │
│  │         Entrance Sequence Controller                   │  │
│  │  (Dollhouse Zoom → Matrix Rain → Desktop Fade-in)     │  │
│  └───────────────────────────────────────────────────────┘  │
│                           ↓                                  │
│  ┌───────────────────────────────────────────────────────┐  │
│  │           Windows 98 Desktop Environment               │  │
│  │  ┌─────────────────────────────────────────────────┐  │  │
│  │  │         Desktop Background Layer                 │  │  │
│  │  │  (Wallpaper + Film Grain + Matrix Screensaver)  │  │  │
│  │  └─────────────────────────────────────────────────┘  │  │
│  │  ┌─────────────────────────────────────────────────┐  │  │
│  │  │         Desktop Icons Layer                      │  │  │
│  │  │  (Diary, Scrapbook, Art, Archive, Books, Term)  │  │  │
│  │  └─────────────────────────────────────────────────┘  │  │
│  │  ┌─────────────────────────────────────────────────┐  │  │
│  │  │         Window Manager                           │  │  │
│  │  │  - Window positioning & z-index                  │  │  │
│  │  │  - Drag & drop handling                          │  │  │
│  │  │  - Minimize/maximize/close logic                 │  │  │
│  │  │  - Window state persistence                      │  │  │
│  │  └─────────────────────────────────────────────────┘  │  │
│  │  ┌─────────────────────────────────────────────────┐  │  │
│  │  │         Room Windows (0-5 concurrent)            │  │  │
│  │  │  Each wrapped in Windows98Window component       │  │  │
│  │  └─────────────────────────────────────────────────┘  │  │
│  │  ┌─────────────────────────────────────────────────┐  │  │
│  │  │         Taskbar Component                        │  │  │
│  │  │  (Start Menu + Window Buttons + Clock)           │  │  │
│  │  └─────────────────────────────────────────────────┘  │  │
│  └───────────────────────────────────────────────────────┘  │
└─────────────────────────────────────────────────────────────┘
```

### Component Hierarchy

```
DollhousePage
├── EntranceSequenceController
│   ├── DollhouseZoomAnimation
│   ├── MatrixRainTransition
│   └── DesktopFadeIn
├── Windows98Desktop
│   ├── DesktopBackground
│   │   ├── WallpaperLayer
│   │   ├── FilmGrainOverlay
│   │   └── MatrixScreensaver (conditional)
│   ├── DesktopIcons
│   │   ├── DesktopIcon (Diary)
│   │   ├── DesktopIcon (Scrapbook)
│   │   ├── DesktopIcon (Art Studio)
│   │   ├── DesktopIcon (Archive)
│   │   ├── DesktopIcon (Saved Books)
│   │   └── DesktopIcon (Terminal)
│   ├── WindowManager
│   │   └── Windows98Window[] (0-5)
│   │       ├── WindowChrome
│   │       │   ├── TitleBar
│   │       │   ├── MinimizeButton
│   │       │   ├── MaximizeButton
│   │       │   └── CloseButton
│   │       └── WindowContent
│   │           ├── DiaryView (conditional)
│   │           ├── ScrapbookView (conditional)
│   │           ├── ArtStudioView (conditional)
│   │           ├── ArchiveView (conditional)
│   │           ├── SavedBooksView (conditional)
│   │           └── TerminalView (conditional)
│   └── Taskbar
│       ├── StartButton
│       ├── StartMenu (conditional)
│       ├── TaskbarButton[] (per open window)
│       └── SystemClock
└── SoundEffectManager
```

## Components and Interfaces

### 1. EntranceSequenceController

**Purpose**: Orchestrates the three-phase entrance animation sequence.

**Props**:
```typescript
interface EntranceSequenceProps {
  onComplete: () => void;
  allowSkip?: boolean;
}
```

**State**:
```typescript
type SequencePhase = 'dollhouse-zoom' | 'matrix-rain' | 'desktop-fadein' | 'complete';
```

**Behavior**:
- Plays dollhouse zoom (2s)
- Transitions to Matrix rain (3s)
- Fades into desktop (1s)
- Shows "Skip Intro" button after 2s
- Saves completion to localStorage to enable skip on return visits

### 2. Windows98Desktop

**Purpose**: Main desktop environment container managing all desktop elements.

**Props**:
```typescript
interface Windows98DesktopProps {
  wallpaper: 'gothic-roses' | 'pink-matrix' | 'vintage-lace';
  enableScreensaver: boolean;
  screensaverTimeout: number; // minutes
}
```

**State**:
```typescript
interface DesktopState {
  openWindows: WindowState[];
  activeWindowId: string | null;
  isScreensaverActive: boolean;
  lastActivityTime: number;
}
```

### 3. DesktopIcon

**Purpose**: Clickable icon representing a room on the desktop.

**Props**:
```typescript
interface DesktopIconProps {
  id: string;
  label: string;
  icon: React.ReactNode;
  position: { x: number; y: number };
  onDoubleClick: () => void;
  isSelected: boolean;
}
```

**Styling**: Authentic Windows 98 icon with label, blue selection highlight, hover effects.

### 4. WindowManager

**Purpose**: Manages window lifecycle, positioning, z-index, and interactions.

**Interface**:
```typescript
interface WindowManager {
  openWindow: (roomType: RoomType, initialState?: Partial<WindowState>) => string;
  closeWindow: (windowId: string) => void;
  minimizeWindow: (windowId: string) => void;
  maximizeWindow: (windowId: string) => void;
  restoreWindow: (windowId: string) => void;
  focusWindow: (windowId: string) => void;
  updateWindowPosition: (windowId: string, position: Position) => void;
  updateWindowSize: (windowId: string, size: Size) => void;
  getWindowState: (windowId: string) => WindowState | null;
  getAllWindows: () => WindowState[];
  saveState: () => void;
  restoreState: () => void;
}

interface WindowState {
  id: string;
  roomType: RoomType;
  title: string;
  position: Position;
  size: Size;
  zIndex: number;
  isMinimized: boolean;
  isMaximized: boolean;
  previousState?: { position: Position; size: Size }; // for restore
}

type RoomType = 'diary' | 'scrapbook' | 'art' | 'archive' | 'books' | 'terminal';

interface Position {
  x: number;
  y: number;
}

interface Size {
  width: number;
  height: number;
}
```

**Window Positioning Logic**:
- New windows open with 40px offset from previous window
- Windows constrained to desktop bounds (with 20px minimum visible)
- Z-index starts at 1000, increments by 1 for each new window
- Focused window gets highest z-index

### 5. Windows98Window

**Purpose**: Reusable window chrome wrapper (leverages existing component).

**Props**:
```typescript
interface Windows98WindowProps {
  id: string;
  title: string;
  position: Position;
  size: Size;
  zIndex: number;
  isMinimized: boolean;
  isMaximized: boolean;
  onClose: () => void;
  onMinimize: () => void;
  onMaximize: () => void;
  onFocus: () => void;
  onDragStart: () => void;
  onDrag: (delta: Position) => void;
  onDragEnd: () => void;
  children: React.ReactNode;
}
```

**Features**:
- Authentic Windows 98 title bar with system buttons
- Draggable via title bar
- Resizable via borders (optional enhancement)
- Drop shadow for depth
- Active/inactive visual states

### 6. Taskbar

**Purpose**: Bottom bar showing Start menu, open windows, and system clock.

**Props**:
```typescript
interface TaskbarProps {
  openWindows: WindowState[];
  activeWindowId: string | null;
  onWindowClick: (windowId: string) => void;
  onStartClick: () => void;
}
```

**Layout**:
```
[Start] [Window 1] [Window 2] ... [Window N] [Clock: 3:45 PM]
```

### 7. StartMenu

**Purpose**: Popup menu for quick room access and system functions.

**Structure**:
```
┌─────────────────────────┐
│ 🏠 Open Diary           │
│ 📔 Open Scrapbook       │
│ 🎨 Open Art Studio      │
│ 📚 Open Archive         │
│ 🔖 Open Saved Books     │
│ 💻 Open Terminal        │
├─────────────────────────┤
│ ⚙️  Settings            │
│ 🔊 Sound: On            │
│ 🖼️  Change Wallpaper    │
├─────────────────────────┤
│ 🚪 Exit Dollhouse       │
└─────────────────────────┘
```

### 8. SoundEffectManager

**Purpose**: Plays authentic Windows 98 sounds for interactions.

**Interface**:
```typescript
interface SoundEffectManager {
  playWindowOpen: () => void;
  playWindowClose: () => void;
  playMinimize: () => void;
  playMaximize: () => void;
  playError: () => void;
  playClick: () => void;
  setMuted: (muted: boolean) => void;
  isMuted: () => boolean;
}
```

**Sound Files** (to be sourced or created):
- `window-open.mp3`
- `window-close.mp3`
- `minimize.mp3`
- `maximize.mp3`
- `error.mp3`
- `click.mp3`

## Data Models

### WindowState (persisted to localStorage)

```typescript
interface PersistedDesktopState {
  version: number; // for migration
  openWindows: {
    id: string;
    roomType: RoomType;
    position: Position;
    size: Size;
    isMinimized: boolean;
    isMaximized: boolean;
  }[];
  activeWindowId: string | null;
  wallpaper: string;
  soundEnabled: boolean;
  screensaverEnabled: boolean;
  screensaverTimeout: number;
  lastSaved: number; // timestamp
}
```

### Desktop Configuration

```typescript
interface DesktopConfig {
  wallpapers: {
    id: string;
    name: string;
    url: string;
    thumbnail: string;
  }[];
  defaultWindowSizes: Record<RoomType, Size>;
  iconPositions: Record<RoomType, Position>;
  maxWindows: number;
  taskbarHeight: number;
  windowMinSize: Size;
}
```

## Correctness Properties

*A property is a characteristic or behavior that should hold true across all valid executions of a system—essentially, a formal statement about what the system should do. Properties serve as the bridge between human-readable specifications and machine-verifiable correctness guarantees.*

### Property 1: Window Z-Index Ordering

*For any* set of open windows, the focused window should always have the highest z-index value among all windows.

**Validates: Requirements 4.2**

### Property 2: Window Bounds Constraint

*For any* window position update, at least 20 pixels of the window should remain visible within the desktop bounds.

**Validates: Requirements 4.5**

### Property 3: Taskbar Button Correspondence

*For any* open window, there should exist exactly one corresponding taskbar button, and vice versa.

**Validates: Requirements 5.2, 5.4**

### Property 4: Window State Persistence Round-Trip

*For any* valid desktop state, saving then loading should produce an equivalent state (same windows, positions, and properties).

**Validates: Requirements 13.1, 13.2, 13.3**

### Property 5: Maximum Window Limit

*For any* attempt to open a window, if 5 windows are already open, the system should prevent opening additional windows.

**Validates: Requirements 4.1**

### Property 6: Entrance Sequence Completion

*For any* entrance sequence execution, all three phases (zoom, matrix, desktop) should complete in order before desktop interaction is enabled.

**Validates: Requirements 1.1, 1.2, 1.3**

### Property 7: Sound Effect Muting

*For any* sound effect trigger, if muted is true, no audio should play.

**Validates: Requirements 6.6**

### Property 8: Window Minimize-Restore Cycle

*For any* window, minimizing then restoring should return it to its previous position and size.

**Validates: Requirements 3.4**

### Property 9: Desktop Icon Uniqueness

*For any* desktop state, each room type should have exactly one desktop icon.

**Validates: Requirements 2.1**

### Property 10: Screensaver Activation

*For any* idle period exceeding the configured timeout, the screensaver should activate, and any user input should deactivate it.

**Validates: Requirements 15.1, 15.3, 15.4**

## Error Handling

### Window Management Errors

**Scenario**: Attempting to open more than 5 windows
- **Handling**: Display Windows 98-style error dialog: "Cannot open window. Maximum of 5 windows already open."
- **Sound**: Play error sound
- **Recovery**: User must close a window before opening another

**Scenario**: Window position restoration fails (corrupted localStorage)
- **Handling**: Log error, clear corrupted state, start with clean desktop
- **User Feedback**: Silent recovery, no error shown
- **Fallback**: Default icon positions, no windows open

### State Persistence Errors

**Scenario**: localStorage quota exceeded
- **Handling**: Attempt to save only essential state (window types, not positions)
- **User Feedback**: Toast notification: "Desktop layout could not be saved"
- **Fallback**: Session-only state, cleared on page reload

**Scenario**: Invalid window state data
- **Handling**: Validate each window state, skip invalid entries
- **Recovery**: Restore valid windows, ignore corrupted ones
- **Logging**: Console warning with details

### Sound Loading Errors

**Scenario**: Sound file fails to load
- **Handling**: Silently fail, continue without sound
- **User Feedback**: None (sounds are enhancement, not critical)
- **Fallback**: Visual-only feedback

### Animation Performance Issues

**Scenario**: Low-end device struggles with animations
- **Handling**: Detect performance issues via frame rate monitoring
- **Adaptation**: Reduce animation complexity, disable non-essential effects
- **User Control**: Settings option to disable animations

## Testing Strategy

### Unit Testing

**Window Manager Logic**:
- Test window opening with position calculation
- Test z-index management on focus
- Test window bounds constraint enforcement
- Test minimize/maximize/restore state transitions
- Test maximum window limit enforcement

**State Persistence**:
- Test saving desktop state to localStorage
- Test loading desktop state from localStorage
- Test handling corrupted state data
- Test state migration between versions

**Desktop Icon Interactions**:
- Test single-click selection
- Test double-click opening window
- Test hover states
- Test keyboard navigation

### Property-Based Testing

Use **fast-check** (JavaScript/TypeScript property testing library) with minimum 100 iterations per property.

**Property 1: Window Z-Index Ordering**
```typescript
// Feature: dollhouse-windows-hybrid, Property 1: Window Z-Index Ordering
// Validates: Requirements 4.2
fc.assert(
  fc.property(
    fc.array(fc.record({ id: fc.string(), zIndex: fc.integer() }), { minLength: 1, maxLength: 5 }),
    fc.string(),
    (windows, focusedId) => {
      const manager = new WindowManager();
      windows.forEach(w => manager.addWindow(w));
      manager.focusWindow(focusedId);
      const focused = manager.getWindowState(focusedId);
      const allWindows = manager.getAllWindows();
      return allWindows.every(w => w.id === focusedId || w.zIndex < focused.zIndex);
    }
  ),
  { numRuns: 100 }
);
```

**Property 2: Window Bounds Constraint**
```typescript
// Feature: dollhouse-windows-hybrid, Property 2: Window Bounds Constraint
// Validates: Requirements 4.5
fc.assert(
  fc.property(
    fc.record({
      x: fc.integer({ min: -1000, max: 2000 }),
      y: fc.integer({ min: -1000, max: 2000 }),
      width: fc.integer({ min: 100, max: 800 }),
      height: fc.integer({ min: 100, max: 600 })
    }),
    (position) => {
      const constrained = constrainWindowToBounds(position, DESKTOP_BOUNDS);
      const visibleX = constrained.x + constrained.width > 20 && constrained.x < DESKTOP_BOUNDS.width - 20;
      const visibleY = constrained.y + constrained.height > 20 && constrained.y < DESKTOP_BOUNDS.height - 20;
      return visibleX && visibleY;
    }
  ),
  { numRuns: 100 }
);
```

**Property 3: Taskbar Button Correspondence**
```typescript
// Feature: dollhouse-windows-hybrid, Property 3: Taskbar Button Correspondence
// Validates: Requirements 5.2, 5.4
fc.assert(
  fc.property(
    fc.array(fc.record({ id: fc.string(), roomType: fc.constantFrom('diary', 'scrapbook', 'art', 'archive', 'books') }), { maxLength: 5 }),
    (windows) => {
      const manager = new WindowManager();
      windows.forEach(w => manager.openWindow(w.roomType));
      const openWindows = manager.getAllWindows();
      const taskbarButtons = getTaskbarButtons(manager);
      return openWindows.length === taskbarButtons.length &&
             openWindows.every(w => taskbarButtons.some(b => b.windowId === w.id));
    }
  ),
  { numRuns: 100 }
);
```

**Property 4: Window State Persistence Round-Trip**
```typescript
// Feature: dollhouse-windows-hybrid, Property 4: Window State Persistence Round-Trip
// Validates: Requirements 13.1, 13.2, 13.3
fc.assert(
  fc.property(
    fc.array(fc.record({
      roomType: fc.constantFrom('diary', 'scrapbook', 'art', 'archive', 'books'),
      position: fc.record({ x: fc.integer({ min: 0, max: 1000 }), y: fc.integer({ min: 0, max: 800 }) }),
      size: fc.record({ width: fc.integer({ min: 200, max: 800 }), height: fc.integer({ min: 200, max: 600 }) }),
      isMinimized: fc.boolean(),
      isMaximized: fc.boolean()
    }), { maxLength: 5 }),
    (windows) => {
      const manager = new WindowManager();
      windows.forEach(w => manager.openWindow(w.roomType, w));
      const stateBefore = manager.getAllWindows();
      manager.saveState();
      manager.clearAll();
      manager.restoreState();
      const stateAfter = manager.getAllWindows();
      return deepEqual(stateBefore, stateAfter);
    }
  ),
  { numRuns: 100 }
);
```

**Property 5: Maximum Window Limit**
```typescript
// Feature: dollhouse-windows-hybrid, Property 5: Maximum Window Limit
// Validates: Requirements 4.1
fc.assert(
  fc.property(
    fc.array(fc.constantFrom('diary', 'scrapbook', 'art', 'archive', 'books', 'terminal'), { minLength: 6, maxLength: 10 }),
    (roomTypes) => {
      const manager = new WindowManager();
      roomTypes.forEach(type => manager.openWindow(type));
      return manager.getAllWindows().length <= 5;
    }
  ),
  { numRuns: 100 }
);
```

### Integration Testing

**Full Entrance Sequence**:
- Test complete animation sequence from start to desktop
- Verify skip button appears and functions
- Verify localStorage skip preference works

**Multi-Window Workflow**:
- Open multiple windows
- Drag windows to different positions
- Minimize/maximize/restore windows
- Close windows
- Verify taskbar updates correctly

**State Persistence Workflow**:
- Open and position windows
- Close browser/reload page
- Verify windows restore to correct positions

### Visual Regression Testing

- Capture screenshots of desktop with various window configurations
- Compare against baseline images
- Detect unintended visual changes

## Performance Considerations

### Animation Performance

- Use `transform` and `opacity` for animations (GPU-accelerated)
- Avoid layout thrashing during drag operations
- Use `will-change` hint for dragging windows
- Debounce window position updates during drag

### State Management

- Throttle localStorage saves to max once per second
- Use shallow comparison for window state updates
- Memoize window components to prevent unnecessary re-renders

### Sound Loading

- Preload sound files during entrance sequence
- Use Web Audio API for low-latency playback
- Implement sound sprite for efficiency

### Responsive Optimization

- Disable window dragging on mobile (use full-screen mode)
- Reduce animation complexity on low-end devices
- Lazy-load window content until window opens

## Accessibility

- Keyboard navigation for all window controls
- Screen reader announcements for window state changes
- Focus management when windows open/close
- High contrast mode support
- Reduced motion mode (disable animations)

## Future Enhancements

- Window resizing via border drag
- Window snapping to edges (Aero Snap-style)
- Multiple desktop wallpapers with slideshow
- Custom desktop icon arrangement
- Window grouping in taskbar
- Right-click context menus on desktop
- Recycle Bin for deleted content
- My Computer icon for file browsing
- Clippy-style assistant (gothic themed)
