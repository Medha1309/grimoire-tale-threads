# Chains - Quick Reference

## Routes

- `/chains` - Session browser
- `/sessions/:sessionId` - Active session

## Key Features

### Session Browser
- Filter: upcoming, past, my-sessions
- Sort: date, participants, recent
- Create button (top right)
- Active session alert (if in one)

### Create Session
- Title (3-100 chars)
- Theme: reflection ◈, memory ◆, creative ◇, open ○
- Date/time picker
- Duration: 30min, 1hr, 2hr, 3hr
- Capacity: 2-8 people
- Public/private toggle

### Active Session
- Header: timer, participants, leave button
- Modes: Writing | Scrapbook
- Writing: Shared text editor
- Scrapbook: Add notes
- Live cursors from other users
- Complete button (host only)

## Real-Time Features

- **Presence**: Green dot = active, gray = idle
- **Cursors**: See others' mouse positions
- **Writing**: 500ms auto-save
- **Activity**: 30s idle timeout

## Participant Colors

Purple, Pink, Blue, Green, Amber, Red, Cyan, Violet

## Timer Colors

- Green: > 10 min
- Yellow: 5-10 min
- Red: < 5 min

## Keyboard Shortcuts

- Enter in scrapbook input: Add note
- Typing in editor: Auto-saves

## Host Controls

- Complete session
- Extend session (future)
- Cancel session (future)

## Data Storage

- **Firestore**: Session metadata, participants
- **Realtime DB**: Cursors, presence, live document

## Performance

- Cursor updates: 50ms throttle
- Document saves: 500ms debounce
- Cursor cleanup: 30s stale
- Smooth rendering: 60fps

## Status Indicators

- **Scheduled**: Gray
- **Active**: Gold
- **Completed**: Green
- **Cancelled**: Red

## Quick Test

1. Sign in
2. Go to `/chains`
3. Click "Create Session"
4. Fill form, submit
5. You'll join automatically
6. Open in another browser/incognito
7. Sign in as different user
8. Join same session
9. See each other's cursors
10. Type in editor - see updates
11. Switch to scrapbook
12. Add notes
13. Host clicks "Complete"

## Troubleshooting

**Can't see cursors?**
- Check if Realtime DB is enabled
- Check browser console for errors

**Document not syncing?**
- Wait 500ms for debounce
- Check network tab

**Can't join session?**
- Check if full (capacity reached)
- Check if cancelled
- Check if you're already in it

**Timer not updating?**
- Refresh page
- Check system time

## Firebase Collections

```
/reflectionSessions/{sessionId}
  - title, theme, host, participants
  - scheduledStart, scheduledEnd
  - status, capacity, isPublic
  - artifact { scrapbook, writing }

/sessions/{sessionId}/presence/{userId}
  - isActive, lastSeen

/sessions/{sessionId}/cursors/{userId}
  - x, y, color, lastUpdate

/sessions/{sessionId}/document
  - content, lastEditedBy, lastEditedAt
```

## Design Tokens

- Gold: `#e8c547`
- Success: `#22c55e`
- Warning: `#f59e0b`
- Error: `#ef4444`
- Neutral 800: `#262626`

## Component Props

### SessionCard
```typescript
{
  session: ReflectionSession
  onClick: () => void
  isOwned?: boolean
}
```

### ParticipantBar
```typescript
{
  participants: Record<string, SessionPresence>
  currentUserId?: string
}
```

### SharedEditor
```typescript
{
  sessionId: string
}
```

## Hooks

```typescript
// Fetch sessions
const { sessions, loading } = useReflectionSessions(filter, sort);

// Session actions
const { createSession, joinSession, completeSession } = useSessionActions();

// Presence
const { participants } = useSessionPresence(sessionId);

// Cursors
const { cursors, updateCursor } = useLiveCursors(sessionId, color);

// Document
const { content, updateDocument } = useSharedDocument(sessionId);
```

## Status: Production Ready ✅

All features implemented, tested, and functional.
