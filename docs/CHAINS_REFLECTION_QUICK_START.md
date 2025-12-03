# Chains Reflection Sessions - Quick Start

## What Is It?

Chains has been redesigned from a pass-the-story system into **scheduled collaborative reflection sessions** where users can:
- Create scheduled sessions with themes (reflection, memory, creative, open)
- Join sessions with 2-8 participants
- Collaborate in real-time on scrapbooks and writing (coming soon)
- See live cursors and presence of other participants (coming soon)

## Current Status: Session Browser Complete ✅

You can now:
1. Browse upcoming, past, and your sessions
2. Create new sessions with full customization
3. See tombstone-shaped session cards with all details
4. Filter and sort sessions
5. View active session alerts

## How to Use

### Creating a Session

1. Navigate to `/chains`
2. Click "Create Session" button
3. Fill in the form:
   - **Title**: Name your session (e.g., "Evening Reflections")
   - **Theme**: Choose reflection, memory, creative, or open
   - **Description**: Optional details about what you'll explore
   - **Date & Time**: When the session will start
   - **Duration**: 30 minutes to 3 hours
   - **Capacity**: 2-8 participants
   - **Public/Private**: Toggle visibility
4. Click "Create Session"
5. You'll be redirected to the session (detail page coming soon)

### Browsing Sessions

**Filters:**
- **Upcoming**: Sessions that haven't started yet
- **Past**: Completed sessions
- **My Sessions**: Sessions you're hosting or participating in

**Sort:**
- **Date**: Chronological order
- **Participants**: By number of participants
- **Recent**: Most recently created

### Session Card Info

Each tombstone card shows:
- Theme emoji (🕯️ 📸 🎨 ✨)
- Session title
- Host name
- Date and time
- Duration
- Participant count and avatars
- Status (Scheduled, In Progress, Completed, Cancelled)
- Time until start or time remaining

## What's Coming Next

### Phase 3: Real-Time Infrastructure
- Live cursor tracking
- Presence system (who's online/active)
- Real-time sync utilities

### Phase 4: Scrapbook Canvas
- Collaborative photo board
- Add stickers, text, drawings
- Drag and arrange elements
- See others' contributions in real-time

### Phase 5: Co-Writing Editor
- Shared document
- Live cursor positions
- Character-by-character sync
- Writing prompts
- Optional "pass the pen" mode

### Phase 6: Active Session Experience
- Full-screen collaboration space
- Session timer with warnings
- Mode switching (scrapbook/writing)
- Export artifacts as PDF/PNG/TXT

## Technical Details

### Data Models
- **ReflectionSession**: Main session data
- **SessionParticipant**: User info with cursor color
- **SessionArtifact**: Scrapbook + writing content
- **ScrapbookElement**: Photos, stickers, text, drawings
- **CursorPosition**: Real-time cursor tracking

### Firebase Collections
- `reflectionSessions`: Persistent session data
- Realtime DB for live features (cursors, presence)

### Key Features
- Capacity limits (2-8 people)
- Late join window (15 minutes)
- Session extension (30 min increments)
- Auto-save every 30 seconds
- Cursor throttling (50ms updates)

## Design Philosophy

- **No AI**: Pure human collaboration
- **Gothic Aesthetic**: Graveyard theme with tombstone cards
- **Real-Time**: See others' actions as they happen
- **Scheduled**: Sessions have specific start times
- **Collaborative**: Multiple people creating together

## Routes

- `/chains` - Session browser
- `/sessions/:sessionId` - Session detail (coming soon)

## Testing

To test the current implementation:
1. Sign in to the app
2. Navigate to `/chains`
3. Create a test session
4. Try different filters and sorts
5. Check that session cards display correctly
6. Verify time calculations are accurate

## Known Limitations (Current Phase)

- Session detail page not yet implemented
- Can't actually join/participate in sessions yet
- No real-time collaboration features yet
- No scrapbook or writing tools yet
- No artifact export yet

These will be added in upcoming phases!
