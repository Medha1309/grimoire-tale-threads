# Chains Reflection Sessions - Design Document

## System Architecture

### Component Hierarchy
```
ChainsSessions (Page)
├── SessionBrowser
│   ├── SessionFilters (upcoming, past, my-sessions)
│   ├── SessionCard (tombstone-shaped)
│   └── CreateSessionModal
│
└── ActiveSession (Full-screen experience)
    ├── SessionHeader (timer, session name, participants, exit)
    ├── CollaborationArea
    │   ├── ScrapbookCanvas
    │   │   ├── CanvasElement (photo, sticker, text)
    │   │   ├── LiveCursors
    │   │   └── CanvasToolbar
    │   └── CoWritingEditor
    │       ├── RichTextEditor
    │       ├── LiveCursors
    │       └── WritingPrompts
    └── SessionControls (save, export, extend)
```

## Data Flow

### Real-Time Sync Strategy

#### Cursor Positions (Firebase Realtime DB)
```javascript
// Update every 50ms
/sessions/{sessionId}/cursors/{userId}
{
  x: number,
  y: number,
  userName: string,
  color: string,
  timestamp: number
}

// Listen to all cursors
onValue(ref(db, `sessions/${sessionId}/cursors`), (snapshot) => {
  // Update cursor positions
});
```

#### Scrapbook Elements (Firestore + Realtime DB)
```javascript
// Optimistic update pattern
1. User drags element → Update local state immediately
2. Debounce 500ms → Write to Realtime DB
3. Every 30s → Persist to Firestore

// Conflict resolution: Last write wins with timestamp
```

#### Co-Writing (Operational Transform)
```javascript
// Use Y.js or similar CRDT library
// Character-level sync with conflict-free merging
const ydoc = new Y.Doc();
const ytext = ydoc.getText('content');

// Sync via Firebase Realtime DB
const provider = new FirebaseProvider(ydoc, sessionId);
```

### Presence System
```javascript
// Firebase Realtime DB presence
const presenceRef = ref(db, `sessions/${sessionId}/presence/${userId}`);

// Set online status
onValue(ref(db, '.info/connected'), (snapshot) => {
  if (snapshot.val()) {
    onDisconnect(presenceRef).remove();
    set(presenceRef, {
      userName,
      color,
      joinedAt: serverTimestamp(),
      isActive: true
    });
  }
});
```

## UI/UX Design

### Session Browser View

#### Layout
```
┌─────────────────────────────────────────────┐
│  CHAINS - Reflection Sessions               │
│  "Gather in the parlour to reflect..."      │
├─────────────────────────────────────────────┤
│  [Upcoming] [Past] [My Sessions]            │
│                        [+ Create Session]    │
├─────────────────────────────────────────────┤
│  ┌──────┐  ┌──────┐  ┌──────┐              │
│  │ 🕯   │  │ 👻   │  │ 💀   │              │
│  │Title │  │Title │  │Title │              │
│  │Time  │  │Time  │  │Time  │              │
│  │3/5   │  │5/8   │  │2/4   │              │
│  └──────┘  └──────┘  └──────┘              │
└─────────────────────────────────────────────┘
```

#### Session Card (Tombstone)
- **Shape**: Rounded-top tombstone
- **Content**: 
  - Icon at top (🕯 scheduled, 👻 active, 💀 completed)
  - Session title (engraved text effect)
  - Host name
  - Date/time
  - Participant count (3/5)
  - Theme tag
- **States**:
  - Scheduled: Gray with purple glow
  - Active: Pulsing purple glow
  - Completed: Emerald glow
  - Full: Dimmed with "FULL" overlay
- **Hover**: Lifts up, shows preview

### Active Session View

#### Layout
```
┌─────────────────────────────────────────────┐
│ ⏱ 45:23  Session Name    👤👤👤👤  [Exit]  │
├─────────────────────────────────────────────┤
│                                             │
│                                             │
│         Collaboration Area                  │
│         (Canvas or Editor)                  │
│                                             │
│                                             │
└─────────────────────────────────────────────┘
```

#### Participant Indicators (Header Bar)
- **Avatar Circles**: Small circles with user initials in header
- **Glow Effect**: Pulses when user is actively contributing
- **Cursor Color**: Matches their cursor/contribution color
- **Status**: 
  - Bright: Active (moved cursor in last 30s)
  - Dim: Idle
  - Offline: Grayed out
- **Hover**: Shows username and "Active" or "Idle" status

### Scrapbook Canvas

#### Canvas Features
- **Infinite Canvas**: Pan with mouse drag, zoom with scroll
- **Grid Background**: Subtle vintage paper texture
- **Element Types**:
  - Photos: Polaroid frame with drop shadow
  - Stickers: Emoji or custom graphics
  - Text: Handwritten font options
  - Drawings: Freehand with brush tool

#### Element Interaction
- **Select**: Click to select, shows resize handles
- **Move**: Drag to reposition
- **Resize**: Drag corner handles
- **Rotate**: Drag rotation handle
- **Delete**: Press Delete key or trash icon
- **Attribution**: Hover shows "Added by [User]"

#### Toolbar
```
[📷 Photo] [✨ Sticker] [✏️ Text] [🎨 Draw] | [↩️ Undo] [↪️ Redo] | [💾 Save]
```

#### Live Cursors
- **Cursor Shape**: Ghostly hand with trailing effect
- **Label**: Username above cursor
- **Color**: Unique per user (purple, pink, blue, green, yellow)
- **Animation**: Smooth interpolation between positions

### Co-Writing Editor

#### Editor Layout
```
┌─────────────────────────────────────────┐
│ [B] [I] [H1] [H2]    Words: 234         │
├─────────────────────────────────────────┤
│                                         │
│  Once upon a midnight dreary...        │
│  [User1's cursor here]                  │
│                                         │
│  While I pondered, weak and weary...    │
│  [User2's cursor here]                  │
│                                         │
└─────────────────────────────────────────┘
│ 💡 Prompt: "Describe a forgotten memory"│
└─────────────────────────────────────────┘
```

#### Cursor Indicators
- **Caret**: Blinking cursor with user color
- **Label**: Username in small tag above cursor
- **Selection**: Highlighted text shows user color
- **Typing Indicator**: "User is typing..." when active

#### Writing Prompts
- Appear every 10 minutes (optional)
- Slide in from bottom
- Themed to session topic
- Can be dismissed
- Examples:
  - "What haunts you?"
  - "Describe a moment of connection"
  - "Write about a place you'll never return to"

### Session Timer

#### Visual Design
- **Hourglass Icon**: Animated sand falling
- **Time Display**: MM:SS format
- **Color Coding**:
  - Green: > 30 min remaining
  - Yellow: 10-30 min remaining
  - Red: < 10 min remaining
  - Pulsing: < 5 min remaining

#### Extend Session
- Host can extend by 30 min
- Shows notification to all participants
- Max 2 extensions per session

## Interaction Patterns

### Creating a Session

1. Click "Create Session" button
2. Modal appears with form:
   - Title (required)
   - Theme (dropdown: Reflection, Memory, Creative, Open)
   - Date/Time picker
   - Duration (30min, 1hr, 2hr, 3hr)
   - Capacity (2-8 people)
   - Public/Private toggle
   - Description (optional)
3. Click "Schedule Session"
4. Confirmation with shareable link
5. Option to invite specific users

### Joining a Session

1. Browse upcoming sessions
2. Click session card
3. Preview modal shows:
   - Session details
   - Current participants
   - Host info
   - Theme description
4. Click "Join Session"
5. Added to participant list
6. Receive reminder notification

### During Session

#### Scrapbook Mode
1. Session starts → Canvas appears
2. Click "Add Photo" → Upload dialog
3. Photo appears on canvas with Polaroid frame
4. Drag to position, resize, rotate
5. See others' photos appearing in real-time
6. Add stickers and text
7. Arrange collaboratively

#### Writing Mode
1. Switch to "Writing" tab
2. Shared document appears
3. Click to place cursor
4. Start typing → Others see text appear
5. See others' cursors moving
6. Optional: Enable "Pass the Pen" mode
   - Only one person can write at a time
   - Click "Pass" to give turn to next person
   - Visual indicator shows whose turn

### Ending Session

1. Timer reaches 0:00 → Auto-save triggered
2. Modal appears: "Session Complete!"
3. Preview of artifact
4. Options:
   - Download PDF
   - Share link
   - View in archive
   - Schedule follow-up session
5. Thank you message with participant list

## Technical Implementation

### Key Technologies

- **React**: UI components
- **Framer Motion**: Animations
- **Firebase Realtime Database**: Live cursor/presence
- **Firestore**: Persistent data storage
- **Y.js**: CRDT for co-writing
- **Fabric.js**: Canvas manipulation
- **React-Quill**: Rich text editor
- **date-fns**: Date/time handling

### Performance Optimizations

#### Cursor Throttling
```typescript
const throttledCursorUpdate = useCallback(
  throttle((x: number, y: number) => {
    update(cursorRef, { x, y, timestamp: Date.now() });
  }, 50), // Update max every 50ms
  []
);
```

#### Canvas Virtualization
```typescript
// Only render elements in viewport
const visibleElements = useMemo(() => {
  return elements.filter(el => 
    isInViewport(el, viewport)
  );
}, [elements, viewport]);
```

#### Debounced Saves
```typescript
const debouncedSave = useCallback(
  debounce((artifact: SessionArtifact) => {
    updateDoc(sessionRef, { artifact });
  }, 30000), // Save every 30s
  []
);
```

### Security Rules

```javascript
// Firestore Rules
match /reflectionSessions/{sessionId} {
  allow read: if request.auth != null;
  allow create: if request.auth != null 
    && request.resource.data.hostId == request.auth.uid;
  allow update: if request.auth != null 
    && request.auth.uid in resource.data.participants;
  allow delete: if request.auth != null 
    && request.auth.uid == resource.data.hostId;
}

// Realtime DB Rules
{
  "sessions": {
    "$sessionId": {
      "cursors": {
        ".read": "auth != null",
        ".write": "auth != null"
      },
      "presence": {
        ".read": "auth != null",
        ".write": "auth != null"
      }
    }
  }
}
```

## Error Handling

### Connection Loss
- Show "Reconnecting..." overlay
- Queue local changes
- Sync when connection restored
- Notify user if sync fails

### Concurrent Edits
- Use timestamps for conflict resolution
- Last write wins for position/properties
- Show notification if element moved by another user

### Session Full
- Disable join button
- Show "Session Full" message
- Suggest similar upcoming sessions

### Late Join
- Allow join within first 15 minutes
- Show "Joining in progress..." message
- Sync current state on entry
- Notify existing participants

## Accessibility

### Keyboard Navigation
- Tab through all interactive elements
- Arrow keys to move selected canvas element
- Ctrl+Z/Y for undo/redo
- Escape to deselect

### Screen Reader
- Announce participant joins/leaves
- Describe canvas elements on focus
- Read timer updates
- Announce writing prompts

### Visual
- High contrast mode option
- Cursor size adjustment
- Font size controls
- Color blind friendly palette

## Testing Strategy

### Unit Tests
- Cursor position calculations
- Element collision detection
- Time formatting
- Presence state management

### Integration Tests
- Session creation flow
- Join session flow
- Real-time sync
- Artifact export

### E2E Tests
- Full session lifecycle
- Multi-user collaboration
- Connection loss recovery
- Session expiry

## Metrics & Analytics

### Track
- Sessions created per day
- Average participants per session
- Session completion rate
- Average session duration
- Elements added per session
- Words written per session
- User retention (repeat attendance)
- Artifact shares

### Dashboards
- Real-time active sessions
- Popular session themes
- Peak usage times
- User engagement scores
