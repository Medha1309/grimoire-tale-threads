# Chains - Collaborative Reflection Sessions

## Overview
Transform Chains from a pass-the-story system into a **scheduled collaborative reflection space** where users can create/join timed sessions to co-create scrapbooks, write together, and reflect collectively. No AI - pure human collaboration.

## Core Concept
"Chains" represents the bonds between people who reflect together. Sessions are scheduled gatherings where participants collaborate in real-time on shared creative artifacts.

## User Stories

### Session Creation & Discovery
- As a user, I want to **create a scheduled reflection session** with a theme, date/time, and duration
- As a user, I want to **browse upcoming sessions** and see who's hosting
- As a user, I want to **join public sessions** or receive invitations to private ones
- As a user, I want to **set session capacity** (2-8 participants)
- As a user, I want to **receive reminders** before my sessions start

### Collaborative Scrapbook
- As a participant, I want to **add photos to a shared canvas** during the session
- As a participant, I want to **place stickers, text, and drawings** collaboratively
- As a participant, I want to **see others' cursors** moving in real-time with their names
- As a participant, I want to **drag and arrange elements** on the shared canvas
- As a participant, I want to **apply vintage filters** to photos together
- As a participant, I want to **see who added what** (attribution on hover)

### Co-Writing
- As a participant, I want to **write in a shared document** with others
- As a participant, I want to **see live cursor positions** of other writers
- As a participant, I want to **see text appearing** as others type
- As a participant, I want to **use writing prompts** that appear during the session
- As a participant, I want to **take turns writing** in "pass the pen" mode (optional)

### Session Experience
- As a participant, I want to **see a timer** showing remaining session time
- As a participant, I want to **see who's actively contributing** (glowing indicators)
- As a participant, I want to **chat via text** during the session (optional)
- As a participant, I want to **save the session artifact** when complete
- As a participant, I want to **export the final creation** as a keepsake

### Post-Session
- As a participant, I want to **view past session artifacts** in my archive
- As a participant, I want to **share session creations** with others
- As a user, I want to **see my reflection history** (sessions attended, artifacts created)
- As a user, I want to **reconnect with past collaborators**

## Functional Requirements

### Session Management
- Create session with: title, theme, date/time, duration (30min-3hrs), capacity, public/private
- Session states: scheduled, active, completed, cancelled
- Automatic session start/end based on schedule
- Late join allowed (within first 15 minutes)
- Host can extend session by 30min increments

### Real-Time Collaboration
- Firebase Realtime Database for live updates
- Cursor position tracking (x, y, username, color)
- Presence system (who's online/active)
- Conflict resolution for simultaneous edits
- Auto-save every 30 seconds
- Optimistic UI updates

### Shared Scrapbook Canvas
- Infinite canvas with zoom/pan
- Element types: photo, sticker, text, drawing
- Drag-and-drop positioning
- Layer ordering (bring to front/send to back)
- Undo/redo (per user)
- Attribution metadata on each element

### Co-Writing Document
- Rich text editor (bold, italic, headings)
- Live cursor indicators with user names
- Character-by-character sync
- Optional "pass the pen" mode (one writer at a time)
- Writing prompts appear every 10 minutes (optional)
- Word count tracker

### Session Artifacts
- Final artifact includes: all scrapbook elements, written content, participant list, timestamps
- Export formats: PDF, PNG (scrapbook), TXT (writing)
- Shareable link to view (read-only)
- Archive in user's "Reflection Archive"

## Non-Functional Requirements

### Performance
- Real-time updates < 100ms latency
- Support 8 concurrent users smoothly
- Canvas handles 50+ elements without lag
- Optimistic UI for instant feedback

### Security
- Only session participants can edit
- Session links expire after completion
- Private sessions require invitation
- Rate limiting on session creation (5/day per user)

### Accessibility
- Keyboard navigation for all features
- Screen reader support for session info
- High contrast mode for canvas
- Clear focus indicators

## Visual Design

### Graveyard Theme (Chains Aesthetic)
- **Session Cards**: Tombstone-shaped cards with session details
- **Active Session**: Full-screen collaboration space with clean header
- **Scrapbook Canvas**: Vintage photo album aesthetic with aged paper texture
- **Cursors**: Ghostly hand cursors with trailing effects
- **Timer**: Hourglass or pocket watch visual
- **Atmosphere**: Candlelit, foggy, gothic parlour setting

### Color Palette
- Base: Deep blacks, charcoal grays
- Accent: Purple/violet for active elements
- User Colors: Distinct colors for each participant's cursor/contributions
- Completed: Emerald green glow
- Expired: Red fade

## Technical Architecture

### Data Models
```typescript
interface ReflectionSession {
  id: string;
  title: string;
  theme: string;
  hostId: string;
  hostName: string;
  
  scheduledStart: Timestamp;
  scheduledEnd: Timestamp;
  actualStart?: Timestamp;
  actualEnd?: Timestamp;
  
  status: 'scheduled' | 'active' | 'completed' | 'cancelled';
  capacity: number;
  isPublic: boolean;
  
  participants: SessionParticipant[];
  artifact: SessionArtifact;
  
  createdAt: Timestamp;
  updatedAt: Timestamp;
}

interface SessionParticipant {
  userId: string;
  userName: string;
  joinedAt: Timestamp;
  isActive: boolean; // Currently online
  cursorColor: string;
  contributionCount: number;
}

interface SessionArtifact {
  scrapbook: ScrapbookElement[];
  writing: WritingContent;
  metadata: ArtifactMetadata;
}

interface ScrapbookElement {
  id: string;
  type: 'photo' | 'sticker' | 'text' | 'drawing';
  position: { x: number; y: number };
  size: { width: number; height: number };
  rotation: number;
  zIndex: number;
  
  content: any; // Type-specific content
  addedBy: string;
  addedAt: Timestamp;
}

interface WritingContent {
  text: string; // Rich text HTML
  contributors: string[]; // User IDs
  wordCount: number;
}

interface CursorPosition {
  userId: string;
  userName: string;
  x: number;
  y: number;
  color: string;
  lastUpdate: number;
}
```

### Firebase Structure
```
/reflectionSessions/{sessionId}
  - metadata
  - participants
  - artifact
  
/sessionPresence/{sessionId}/{userId}
  - isActive
  - lastSeen
  - cursorPosition
  
/sessionEdits/{sessionId}
  - scrapbookElements
  - writingContent
  - editHistory
```

## Success Metrics
- Sessions created per week
- Average participants per session
- Session completion rate
- Artifacts created and shared
- User retention (repeat session attendance)
- Average session duration
- Collaboration intensity (edits per minute)

## Future Enhancements
- Voice chat integration
- Video presence (small webcam circles)
- Session templates (guided prompts)
- Public gallery of shared artifacts
- Collaborative playlists during sessions
- Achievement badges for collaboration
- Session series (recurring weekly reflections)

## Out of Scope (v1)
- AI assistance or suggestions
- Video recording of sessions
- Mobile app (web only initially)
- Monetization features
- Integration with external tools
