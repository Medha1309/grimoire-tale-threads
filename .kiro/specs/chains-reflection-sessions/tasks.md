# Chains Reflection Sessions - Implementation Tasks

## Phase 1: Foundation (Core Data & Types)

### Task 1.1: Type Definitions
- [ ] Create `src/types/reflectionSession.ts`
  - ReflectionSession interface
  - SessionParticipant interface
  - SessionArtifact interface
  - ScrapbookElement interface
  - WritingContent interface
  - CursorPosition interface
  - SessionStatus enum
  - ElementType enum

### Task 1.2: Firebase Setup
- [ ] Update `firestore.rules` for reflectionSessions collection
- [ ] Update `firestore.indexes.json` for session queries
- [ ] Create Realtime Database rules for cursors/presence
- [ ] Test security rules

### Task 1.3: Utility Functions
- [ ] Create `src/utils/sessionHelpers.ts`
  - generateSessionId()
  - calculateSessionDuration()
  - isSessionActive()
  - canJoinSession()
  - assignParticipantColor()
- [ ] Create `src/utils/cursorSync.ts`
  - throttleCursorUpdate()
  - interpolateCursorPosition()
  - cleanupStaleCursors()

## Phase 2: Session Management

### Task 2.1: Session Hooks
- [ ] Create `src/hooks/useReflectionSessions.ts`
  - Fetch sessions with filters (upcoming, past, my-sessions)
  - Real-time updates
  - Pagination
- [ ] Create `src/hooks/useSessionActions.ts`
  - createSession()
  - joinSession()
  - leaveSession()
  - cancelSession()
  - extendSession()
- [ ] Create `src/hooks/useSessionPresence.ts`
  - Track online participants
  - Update presence status
  - Handle disconnections

### Task 2.2: Session Browser Components
- [ ] Create `src/components/sessions/SessionCard.tsx`
  - Tombstone-shaped card
  - Session info display
  - Status indicators
  - Hover effects
- [ ] Create `src/components/sessions/SessionFilters.tsx`
  - Filter buttons (upcoming, past, my-sessions)
  - Sort options
- [ ] Create `src/components/sessions/CreateSessionModal.tsx`
  - Form with all session fields
  - Date/time picker
  - Validation
  - Submit handler

### Task 2.3: Session Browser Page
- [ ] Create `src/pages/ReflectionSessions.tsx`
  - Header with title and CTA
  - Session grid/list
  - Empty states
  - Loading states
  - Graveyard background integration

## Phase 3: Real-Time Collaboration Infrastructure

### Task 3.1: Cursor System
- [ ] Create `src/hooks/useLiveCursors.ts`
  - Track local cursor position
  - Sync to Realtime DB (throttled)
  - Subscribe to other cursors
  - Cleanup on unmount
- [ ] Create `src/components/sessions/LiveCursor.tsx`
  - Ghostly cursor visual
  - Username label
  - Color coding
  - Smooth animation

### Task 3.2: Presence System
- [ ] Create `src/hooks/useSessionPresence.ts`
  - Online/offline detection
  - Last seen tracking
  - Active/idle states
  - Participant list updates
- [ ] Create `src/components/sessions/ParticipantBar.tsx`
  - Horizontal participant list in header
  - Participant avatars
  - Active indicators
  - Glow effects

### Task 3.3: Real-Time Sync
- [ ] Create `src/hooks/useRealtimeSync.ts`
  - Generic sync hook for Realtime DB
  - Optimistic updates
  - Conflict resolution
  - Error handling

## Phase 4: Scrapbook Canvas

### Task 4.1: Canvas Foundation
- [ ] Create `src/components/sessions/ScrapbookCanvas.tsx`
  - Fabric.js integration
  - Pan and zoom
  - Background texture
  - Element rendering
- [ ] Create `src/hooks/useCanvasElements.ts`
  - Add/remove/update elements
  - Sync to Firestore
  - Real-time updates from others
  - Undo/redo stack

### Task 4.2: Canvas Elements
- [ ] Create `src/components/sessions/canvas/PhotoElement.tsx`
  - Polaroid frame
  - Upload handler
  - Resize/rotate
  - Attribution
- [ ] Create `src/components/sessions/canvas/StickerElement.tsx`
  - Sticker picker
  - Placement
  - Resize
- [ ] Create `src/components/sessions/canvas/TextElement.tsx`
  - Text input
  - Font selection
  - Styling options
- [ ] Create `src/components/sessions/canvas/DrawingElement.tsx`
  - Freehand drawing
  - Brush options
  - Color picker

### Task 4.3: Canvas Toolbar
- [ ] Create `src/components/sessions/CanvasToolbar.tsx`
  - Tool buttons
  - Undo/redo
  - Save indicator
  - Element counter

### Task 4.4: Canvas Interactions
- [ ] Implement element selection
- [ ] Implement drag-to-move
- [ ] Implement resize handles
- [ ] Implement rotation handle
- [ ] Implement delete
- [ ] Implement z-index controls
- [ ] Implement multi-select (optional)

## Phase 5: Co-Writing Editor

### Task 5.1: Editor Foundation
- [ ] Create `src/components/sessions/CoWritingEditor.tsx`
  - React-Quill integration
  - Rich text toolbar
  - Word count
  - Auto-save indicator
- [ ] Integrate Y.js for CRDT
  - Setup Y.Doc
  - Bind to Quill
  - Sync via Firebase

### Task 5.2: Live Cursors in Editor
- [ ] Create `src/components/sessions/EditorCursor.tsx`
  - Cursor position in text
  - Username label
  - Color coding
  - Selection highlighting
- [ ] Implement cursor position sync
  - Track cursor index
  - Update Realtime DB
  - Render other cursors

### Task 5.3: Writing Prompts
- [ ] Create `src/components/sessions/WritingPrompt.tsx`
  - Prompt display
  - Slide-in animation
  - Dismiss button
  - Theme-based prompts
- [ ] Create `src/utils/writingPrompts.ts`
  - Prompt library
  - Random selection
  - Theme filtering
- [ ] Implement prompt timer (every 10 min)

### Task 5.4: Pass the Pen Mode
- [ ] Create `src/hooks/usePassThePen.ts`
  - Turn management
  - Lock/unlock editor
  - Pass turn logic
- [ ] Create `src/components/sessions/PassThePenControls.tsx`
  - Current writer indicator
  - Pass button
  - Turn queue

## Phase 6: Active Session Experience

### Task 6.1: Session Layout
- [ ] Create `src/pages/ActiveSession.tsx`
  - Full-screen layout
  - Header with timer
  - Participant circle
  - Collaboration area
  - Controls footer
- [ ] Create `src/components/sessions/SessionHeader.tsx`
  - Session title
  - Timer display
  - Participant count
  - Exit button

### Task 6.2: Session Timer
- [ ] Create `src/components/sessions/SessionTimer.tsx`
  - Countdown display
  - Color coding
  - Hourglass animation
  - Expiry warning
- [ ] Create `src/hooks/useSessionTimer.ts`
  - Calculate remaining time
  - Trigger warnings
  - Handle expiry
  - Extend session

### Task 6.3: Mode Switching
- [ ] Create `src/components/sessions/ModeToggle.tsx`
  - Scrapbook/Writing tabs
  - Smooth transitions
  - State preservation
- [ ] Implement mode state management
  - Save current mode
  - Restore on rejoin
  - Sync across users (optional)

### Task 6.4: Session Controls
- [ ] Create `src/components/sessions/SessionControls.tsx`
  - Save button
  - Export button
  - Extend button (host only)
  - End session button (host only)

## Phase 7: Session Completion & Artifacts

### Task 7.1: Artifact Generation
- [ ] Create `src/utils/artifactGenerator.ts`
  - Compile scrapbook elements
  - Compile writing content
  - Generate metadata
  - Create shareable link
- [ ] Create `src/utils/artifactExport.ts`
  - Export to PDF
  - Export scrapbook as PNG
  - Export writing as TXT
  - Generate ZIP with all formats

### Task 7.2: Completion Flow
- [ ] Create `src/components/sessions/SessionCompleteModal.tsx`
  - Completion message
  - Artifact preview
  - Export options
  - Share button
  - Schedule follow-up
- [ ] Implement auto-save on completion
- [ ] Implement artifact archiving

### Task 7.3: Artifact Viewing
- [ ] Create `src/components/sessions/ArtifactViewer.tsx`
  - Read-only scrapbook view
  - Read-only writing view
  - Participant list
  - Timestamps
- [ ] Create `src/pages/SessionArtifact.tsx`
  - Public artifact page
  - Shareable URL
  - Download options

## Phase 8: Notifications & Reminders

### Task 8.1: Session Reminders
- [ ] Create `src/utils/sessionNotifications.ts`
  - Schedule reminder (1 hour before)
  - Session starting notification
  - Session ending warning (5 min)
  - Session completed notification
- [ ] Integrate with existing notification system

### Task 8.2: Participant Notifications
- [ ] Notify on invitation
- [ ] Notify on participant join
- [ ] Notify on participant leave
- [ ] Notify on session extension
- [ ] Notify on session cancellation

## Phase 9: Archive & History

### Task 9.1: Reflection Archive
- [ ] Create `src/components/sessions/ReflectionArchive.tsx`
  - Grid of past sessions
  - Filter by date/theme
  - Search functionality
- [ ] Create `src/hooks/useSessionHistory.ts`
  - Fetch user's past sessions
  - Pagination
  - Stats calculation

### Task 9.2: User Stats
- [ ] Create `src/components/sessions/SessionStats.tsx`
  - Sessions attended
  - Artifacts created
  - Collaborators met
  - Favorite themes
- [ ] Calculate and display stats

## Phase 10: Polish & Optimization

### Task 10.1: Performance
- [ ] Implement cursor throttling
- [ ] Implement canvas virtualization
- [ ] Implement debounced saves
- [ ] Optimize Realtime DB reads
- [ ] Add loading skeletons

### Task 10.2: Error Handling
- [ ] Handle connection loss
- [ ] Handle session full
- [ ] Handle late join
- [ ] Handle concurrent edits
- [ ] Add error boundaries

### Task 10.3: Accessibility
- [ ] Keyboard navigation
- [ ] Screen reader support
- [ ] Focus management
- [ ] ARIA labels
- [ ] High contrast mode

### Task 10.4: Visual Polish
- [ ] Graveyard background for browser
- [ ] Séance parlour for active session
- [ ] Smooth transitions
- [ ] Loading states
- [ ] Empty states
- [ ] Success animations

## Phase 11: Testing

### Task 11.1: Unit Tests
- [ ] Test session helpers
- [ ] Test cursor sync
- [ ] Test presence logic
- [ ] Test artifact generation
- [ ] Test export functions

### Task 11.2: Integration Tests
- [ ] Test session creation flow
- [ ] Test join session flow
- [ ] Test real-time sync
- [ ] Test artifact export
- [ ] Test notification delivery

### Task 11.3: E2E Tests
- [ ] Test full session lifecycle
- [ ] Test multi-user collaboration
- [ ] Test connection recovery
- [ ] Test session expiry
- [ ] Test artifact viewing

## Phase 12: Documentation

### Task 12.1: User Documentation
- [ ] Create user guide for creating sessions
- [ ] Create user guide for collaboration
- [ ] Create FAQ
- [ ] Create video tutorial (optional)

### Task 12.2: Developer Documentation
- [ ] Document data models
- [ ] Document API hooks
- [ ] Document real-time sync patterns
- [ ] Document security rules
- [ ] Create architecture diagram

## Phase 13: Launch Preparation

### Task 13.1: Data Migration
- [ ] Archive old chain letters system
- [ ] Migrate relevant data (if any)
- [ ] Update navigation
- [ ] Update routing

### Task 13.2: Monitoring
- [ ] Setup analytics tracking
- [ ] Setup error monitoring
- [ ] Setup performance monitoring
- [ ] Create admin dashboard

### Task 13.3: Soft Launch
- [ ] Beta test with small group
- [ ] Gather feedback
- [ ] Fix critical bugs
- [ ] Optimize based on usage

## Estimated Timeline

- **Phase 1-2**: 3-4 days (Foundation & Session Management)
- **Phase 3**: 2-3 days (Real-Time Infrastructure)
- **Phase 4**: 4-5 days (Scrapbook Canvas)
- **Phase 5**: 3-4 days (Co-Writing Editor)
- **Phase 6**: 2-3 days (Active Session Experience)
- **Phase 7**: 2-3 days (Artifacts)
- **Phase 8**: 1-2 days (Notifications)
- **Phase 9**: 2-3 days (Archive)
- **Phase 10**: 2-3 days (Polish)
- **Phase 11**: 3-4 days (Testing)
- **Phase 12**: 1-2 days (Documentation)
- **Phase 13**: 2-3 days (Launch)

**Total: ~30-40 days of development**

## Priority Order

### MVP (Minimum Viable Product)
1. Phase 1-2: Foundation & Session Management
2. Phase 3: Real-Time Infrastructure
3. Phase 4: Scrapbook Canvas (basic)
4. Phase 6: Active Session Experience
5. Phase 7: Artifacts (basic export)

### Post-MVP
6. Phase 5: Co-Writing Editor
7. Phase 8: Notifications
8. Phase 9: Archive
9. Phase 10: Polish
10. Phase 11-13: Testing & Launch

## Dependencies

- **External Libraries**:
  - Fabric.js (canvas manipulation)
  - Y.js (CRDT for co-writing)
  - React-Quill (rich text editor)
  - date-fns (date handling)
  - jsPDF (PDF export)
  - html2canvas (canvas to image)

- **Firebase**:
  - Realtime Database (cursors, presence)
  - Firestore (persistent data)
  - Storage (photo uploads)
  - Functions (notifications, cleanup)

- **Existing Systems**:
  - Auth system
  - Notification system
  - User profiles
  - Design system (buttons, modals, etc.)
