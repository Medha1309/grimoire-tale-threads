# Implementation Plan: Dollhouse Windows 98 Hybrid Redesign

- [x] 1. Set up core infrastructure and types



  - Create TypeScript interfaces for WindowState, Position, Size, RoomType
  - Create DesktopConfig constants (default sizes, positions, limits)
  - Set up localStorage keys and versioning for state persistence
  - _Requirements: 13.1, 13.2_

- [ ] 2. Implement WindowManager hook
- [ ] 2.1 Create useWindowManager hook with state management
  - Implement window state array management
  - Implement active window tracking
  - Implement z-index counter
  - _Requirements: 4.1, 4.2_

- [ ] 2.2 Implement window lifecycle methods
  - Implement openWindow with position calculation (40px offset)
  - Implement closeWindow with cleanup
  - Implement focusWindow with z-index update
  - _Requirements: 3.1, 3.6, 4.2_

- [ ] 2.3 Implement window state methods
  - Implement minimizeWindow
  - Implement maximizeWindow with previous state storage
  - Implement restoreWindow
  - _Requirements: 3.4, 3.5_

- [ ] 2.4 Implement window positioning logic
  - Implement updateWindowPosition with bounds constraint
  - Implement constrainToBounds utility (20px minimum visible)
  - Implement position validation
  - _Requirements: 4.5_

- [ ]* 2.5 Write property test for window z-index ordering
  - **Property 1: Window Z-Index Ordering**
  - **Validates: Requirements 4.2**

- [ ]* 2.6 Write property test for window bounds constraint
  - **Property 2: Window Bounds Constraint**
  - **Validates: Requirements 4.5**

- [ ]* 2.7 Write property test for maximum window limit
  - **Property 5: Maximum Window Limit**
  - **Validates: Requirements 4.1**

- [ ] 3. Implement state persistence
- [ ] 3.1 Create state serialization utilities
  - Implement serializeDesktopState
  - Implement deserializeDesktopState
  - Implement state validation
  - _Requirements: 13.1, 13.2_

- [ ] 3.2 Implement saveState and restoreState in WindowManager
  - Implement saveState with localStorage write
  - Implement restoreState with error handling
  - Implement state migration for version changes
  - _Requirements: 13.1, 13.2, 13.3, 13.4_

- [ ]* 3.3 Write property test for state persistence round-trip
  - **Property 4: Window State Persistence Round-Trip**
  - **Validates: Requirements 13.1, 13.2, 13.3**

- [ ] 4. Create DesktopIcon component
- [ ] 4.1 Implement DesktopIcon component
  - Create component with Windows 98 styling
  - Implement single-click selection state
  - Implement double-click handler
  - Implement hover effects
  - _Requirements: 2.2, 2.3, 2.4, 2.5_

- [ ] 4.2 Create icon assets and positioning
  - Define icon positions for 6 icons (Diary, Scrapbook, Art, Archive, Books, Terminal)
  - Create or source icon graphics
  - Implement icon grid layout
  - _Requirements: 2.1_

- [ ]* 4.3 Write property test for desktop icon uniqueness
  - **Property 9: Desktop Icon Uniqueness**
  - **Validates: Requirements 2.1**

- [ ] 5. Enhance Windows98Window component
- [ ] 5.1 Update Windows98Window for Dollhouse use
  - Add drag-and-drop functionality via title bar
  - Add minimize/maximize/close callbacks
  - Add focus callback
  - Ensure proper z-index rendering
  - _Requirements: 3.2, 3.3, 3.4, 3.5, 3.6_

- [ ] 5.2 Implement window animations
  - Add open animation (scale + fade, 300ms)
  - Add close animation (scale + fade, 200ms)
  - Add minimize animation (to taskbar, 250ms)
  - Add maximize animation (expand, 200ms)
  - _Requirements: 7.1, 7.2, 7.3, 7.4, 7.5_

- [ ]* 5.3 Write unit tests for window animations
  - Test animation timing
  - Test animation completion callbacks
  - Test animation interruption handling
  - _Requirements: 7.1, 7.2, 7.3, 7.4_

- [ ] 6. Create Taskbar component
- [ ] 6.1 Implement Taskbar layout
  - Create taskbar container with Windows 98 styling
  - Implement Start button
  - Implement window button area
  - Implement system clock
  - _Requirements: 5.1, 5.5_

- [ ] 6.2 Implement TaskbarButton component
  - Create button for each open window
  - Implement active/inactive states
  - Implement click handler to focus/restore window
  - _Requirements: 5.2, 5.3_

- [ ]* 6.3 Write property test for taskbar button correspondence
  - **Property 3: Taskbar Button Correspondence**
  - **Validates: Requirements 5.2, 5.4**

- [ ] 7. Create StartMenu component
- [ ] 7.1 Implement StartMenu popup
  - Create menu with Windows 98 styling
  - Add menu items for each room
  - Add settings section
  - Add exit option
  - _Requirements: 5.6_

- [ ] 7.2 Implement StartMenu interactions
  - Implement room opening from menu
  - Implement settings toggles (sound, wallpaper)
  - Implement menu close on outside click
  - _Requirements: 5.6_

- [ ] 8. Implement SoundEffectManager
- [ ] 8.1 Create sound effect system
  - Source or create Windows 98 sound files
  - Implement sound preloading
  - Implement playSound utility with mute check
  - Create useSoundEffects hook
  - _Requirements: 6.1, 6.2, 6.3, 6.4, 6.5, 6.6_

- [ ] 8.2 Integrate sounds with interactions
  - Add sound to window open
  - Add sound to window close
  - Add sound to minimize
  - Add sound to maximize
  - Add sound to errors
  - _Requirements: 6.1, 6.2, 6.3, 6.4_

- [ ]* 8.3 Write property test for sound muting
  - **Property 7: Sound Effect Muting**
  - **Validates: Requirements 6.6**

- [ ] 9. Create DesktopBackground component
- [ ] 9.1 Implement wallpaper system
  - Create 3 gothic-themed wallpaper options
  - Implement wallpaper rendering (tiled/centered)
  - Add film grain overlay
  - _Requirements: 8.1, 8.2, 8.3, 8.4_

- [ ] 9.2 Implement wallpaper selection
  - Add wallpaper picker in settings
  - Persist wallpaper choice to localStorage
  - _Requirements: 8.5_

- [ ] 10. Implement Matrix screensaver
- [ ] 10.1 Create screensaver system
  - Implement idle time tracking
  - Implement Matrix rain overlay component
  - Implement activation/deactivation logic
  - _Requirements: 15.1, 15.2, 15.3, 15.4_

- [ ] 10.2 Add screensaver configuration
  - Add timeout setting (default 5 minutes)
  - Add enable/disable toggle
  - Persist settings to localStorage
  - _Requirements: 15.5_

- [ ]* 10.3 Write property test for screensaver activation
  - **Property 10: Screensaver Activation**
  - **Validates: Requirements 15.1, 15.3, 15.4**

- [ ] 11. Create EntranceSequenceController
- [ ] 11.1 Implement entrance sequence phases
  - Implement dollhouse zoom animation (2s)
  - Implement Matrix rain transition (3s)
  - Implement desktop fade-in (1s)
  - Implement phase progression logic
  - _Requirements: 1.1, 1.2, 1.3_

- [ ] 11.2 Implement skip functionality
  - Add "Skip Intro" button after 2s
  - Implement skip to desktop
  - Save skip preference to localStorage
  - _Requirements: 1.5_

- [ ]* 11.3 Write property test for entrance sequence completion
  - **Property 6: Entrance Sequence Completion**
  - **Validates: Requirements 1.1, 1.2, 1.3**

- [ ] 12. Assemble Windows98Desktop component
- [ ] 12.1 Create main desktop container
  - Integrate DesktopBackground
  - Integrate DesktopIcons layer
  - Integrate WindowManager
  - Integrate Taskbar
  - _Requirements: 2.1, 3.1, 5.1_

- [ ] 12.2 Implement desktop interaction logic
  - Handle icon double-clicks to open windows
  - Handle window focus clicks
  - Handle desktop click to deselect icons
  - _Requirements: 2.5, 4.2_

- [ ] 13. Integrate room content into windows
- [ ] 13.1 Wrap existing room views for window display
  - Wrap DiaryView component
  - Wrap ScrapbookView component
  - Wrap ArtStudioView component
  - Wrap ArchiveView component
  - Wrap SavedBooksView component
  - Wrap TerminalView component
  - _Requirements: 9.1, 9.2, 9.3, 9.4, 9.5, 9.6_

- [ ] 13.2 Ensure room functionality within windows
  - Test diary entry creation in window
  - Test scrapbook interactions in window
  - Test art studio tools in window
  - Test archive browsing in window
  - Test saved books navigation in window
  - Test terminal commands in window
  - _Requirements: 9.1, 9.2, 9.3, 9.4, 9.5, 9.6_

- [ ] 14. Implement keyboard shortcuts
- [ ] 14.1 Create keyboard shortcut system
  - Implement useKeyboardShortcuts hook
  - Add Alt+F4 for close window
  - Add Alt+Tab for window cycling
  - Add Windows+D for minimize all
  - Add Escape for close modals
  - Add Alt+Space for window menu
  - _Requirements: 10.1, 10.2, 10.3, 10.4, 10.5_

- [ ]* 14.2 Write unit tests for keyboard shortcuts
  - Test each shortcut triggers correct action
  - Test shortcuts only work when desktop is focused
  - Test shortcut conflicts are handled
  - _Requirements: 10.1, 10.2, 10.3, 10.4, 10.5_

- [ ] 15. Implement responsive design
- [ ] 15.1 Add responsive breakpoints
  - Implement desktop mode (>1024px)
  - Implement tablet mode (768-1023px)
  - Implement mobile mode (<768px)
  - _Requirements: 12.1, 12.2, 12.3_

- [ ] 15.2 Adapt interactions for touch devices
  - Implement touch-friendly window controls
  - Implement single-window mode for mobile
  - Implement swipe gestures for window switching
  - _Requirements: 12.5_

- [ ] 15.3 Handle window repositioning on resize
  - Implement viewport change detection
  - Reposition windows to remain visible
  - _Requirements: 12.4_

- [ ] 16. Add error handling and edge cases
- [ ] 16.1 Implement error dialogs
  - Create Windows 98-style error dialog component
  - Add error for maximum windows exceeded
  - Add error for invalid operations
  - _Requirements: 14.1, 14.2, 14.3, 14.4_

- [ ] 16.2 Handle state corruption gracefully
  - Add try-catch around localStorage operations
  - Implement fallback to default state
  - Add console logging for debugging
  - _Requirements: 13.4_

- [ ]* 16.3 Write unit tests for error scenarios
  - Test maximum window limit error
  - Test corrupted state recovery
  - Test localStorage quota exceeded
  - Test sound loading failures

- [ ] 17. Optimize performance
- [ ] 17.1 Implement performance optimizations
  - Add React.memo to window components
  - Throttle localStorage saves
  - Use transform for animations
  - Add will-change hints for dragging
  - Debounce window position updates

- [ ] 17.2 Add performance monitoring
  - Implement frame rate detection
  - Add reduced animation mode for low-end devices
  - Add performance settings toggle

- [ ] 18. Polish and visual refinement
- [ ] 18.1 Refine visual details
  - Perfect Windows 98 button styling
  - Add authentic window shadows
  - Polish taskbar appearance
  - Refine icon spacing and alignment

- [ ] 18.2 Add micro-interactions
  - Add button press animations
  - Add hover state transitions
  - Add focus indicators
  - Add loading states

- [ ] 19. Accessibility improvements
- [ ] 19.1 Implement accessibility features
  - Add ARIA labels to all interactive elements
  - Implement keyboard navigation for windows
  - Add screen reader announcements
  - Implement focus management

- [ ] 19.2 Add accessibility modes
  - Implement high contrast mode
  - Implement reduced motion mode
  - Add focus visible indicators

- [ ] 20. Integration and testing
- [ ] 20.1 Update Dollhouse page to use new system
  - Replace old DollhouseHomeView with EntranceSequenceController
  - Replace room navigation with Windows98Desktop
  - Remove old room-based navigation code
  - Update routing if needed

- [ ] 20.2 Perform end-to-end testing
  - Test complete user flow from entrance to multi-window work
  - Test state persistence across sessions
  - Test all keyboard shortcuts
  - Test responsive behavior
  - Test error scenarios

- [ ]* 20.3 Write integration tests
  - Test full entrance sequence
  - Test multi-window workflow
  - Test state persistence workflow
  - Test keyboard navigation workflow

- [ ] 21. Final checkpoint - Ensure all tests pass
  - Ensure all tests pass, ask the user if questions arise.
