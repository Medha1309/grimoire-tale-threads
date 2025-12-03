# GRIMOIRE: COMPLETE ENGINEERING AUDIT - PART 2: COMPONENTS INVENTORY

## 2. COMPONENTS: FULL INVENTORY

### GENERATION STATUS KEY
- 🤖 Kiro Generated
- ✏️ Kiro Refactored/Modified
- 👤 User Created
- 🔧 Kiro + User Collaboration

### ROOT COMPONENTS (src/components/)

| Component | Path | Purpose | Status | Dependencies |
|-----------|------|---------|--------|--------------|
| Navbar | src/components/Navbar.tsx | Main navigation with auth state | ✏️ | AuthContext, router |
| Footer | src/components/Footer.tsx | Site footer | 👤 | None |
| PageWrapper | src/components/PageWrapper.tsx | Page layout wrapper with animations | 🤖 | Framer Motion |
| PageLoader | src/components/PageLoader.tsx | Loading spinner | 🤖 | None |
| ErrorBoundary | src/components/ErrorBoundary.tsx | React error boundary | 🤖 | React |
| ProtectedRoute | src/components/ProtectedRoute.tsx | Auth-protected route wrapper | 🤖 | AuthContext, router |
| Effects | src/components/Effects.tsx | Global atmospheric effects | 🤖 | Framer Motion |
| Creatures | src/components/Creatures.tsx | Animated creatures (spiders, moths) | 🤖 | Framer Motion, config/creatures |
| OuijaBoard | src/components/OuijaBoard.tsx | Interactive Ouija board | 🤖 | React state, mouse tracking |
| OuijaBoardBackground | src/components/OuijaBoardBackground.tsx | Animated Ouija background | 🤖 | Canvas API |
| Comment | src/components/Comment.tsx | Single comment display | 🤖 | Firebase, AuthContext |
| CommentsSection | src/components/CommentsSection.tsx | Comment thread | 🤖 | useComments hook |
| StoryStats | src/components/StoryStats.tsx | Story statistics | 🤖 | Firebase |
| OptimizedChandelier | src/components/OptimizedChandelier.tsx | Performance-optimized chandelier | ✏️ | Three.js, performance config |
| OptimizedSparkles | src/components/OptimizedSparkles.tsx | Performance-optimized sparkles | ✏️ | Framer Motion |
| OptimizedWatchingEyes | src/components/OptimizedWatchingEyes.tsx | Performance-optimized eyes | ✏️ | Canvas API |
| CrawlingSnakesScene | src/components/CrawlingSnakesScene.tsx | Animated snakes background | 🤖 | Canvas API |

### ABOUT PAGE COMPONENTS (src/components/about/)

| Component | Path | Purpose | Status | Special Behavior |
|-----------|------|---------|--------|------------------|
| AtticScene | src/components/about/AtticScene.tsx | Main attic container | 🤖 | Parallax, scroll-triggered reveals |
| AtticWindow | src/components/about/AtticWindow.tsx | Animated window with weather | 🤖 | Rain animation, lightning flashes |
| MemoryChest | src/components/about/MemoryChest.tsx | Interactive chest | 🤖 | Click to open, reveals features |
| WallBlueprint | src/components/about/WallBlueprint.tsx | Blueprint diagram | 🤖 | Hover highlights |
| JournalOnCrate | src/components/about/JournalOnCrate.tsx | Interactive journal | 🤖 | Page flip animation |
| InvestigationRoom | src/components/about/InvestigationRoom.tsx | Detective board | 🤖 | String connections, photo pins |
| PolaroidWall | src/components/about/PolaroidWall.tsx | Photo wall | 🤖 | Hover tilt effect |
| TypewriterSequence | src/components/about/TypewriterSequence.tsx | Typewriter text | 🤖 | Character-by-character reveal |
| GlitchEffect | src/components/about/GlitchEffect.tsx | Glitch distortion | 🤖 | Random glitch triggers |
| CinematicSequenceController | src/components/about/CinematicSequenceController.tsx | Cinematic reveals | 🤖 | Scroll-based sequencing |
| ParallaxMouseEffect | src/components/about/ParallaxMouseEffect.tsx | Mouse parallax | 🤖 | Mouse position tracking |

### ART STUDIO COMPONENTS (src/components/art/)

| Component | Path | Purpose | Status | Features |
|-----------|------|---------|--------|----------|
| GothicCanvas | src/components/art/GothicCanvas.tsx | Main canvas | 🤖 | HTML5 Canvas, drawing |
| EnhancedCanvas | src/components/art/EnhancedCanvas.tsx | Enhanced canvas | ✏️ | Layers, effects |
| BrushPalette | src/components/art/BrushPalette.tsx | Brush selection | 🤖 | Multiple brush types |
| EnhancedBrushPalette | src/components/art/EnhancedBrushPalette.tsx | Advanced brushes | ✏️ | Haunted effects, textures |
| ColorPalette | src/components/art/ColorPalette.tsx | Color picker | 🤖 | HSL color picker |
| CanvasControls | src/components/art/CanvasControls.tsx | Zoom, pan, undo/redo | 🤖 | History stack |
| ArtStudioEditor | src/components/art/ArtStudioEditor.tsx | Main editor container | 🤖 | State management |
| ArtGallery | src/components/art/ArtGallery.tsx | Gallery view | 🤖 | Firebase integration |
| ArtworkDetail | src/components/art/ArtworkDetail.tsx | Artwork detail view | 🤖 | Comments, likes |
| HauntedEffects | src/components/art/HauntedEffects.tsx | Spooky effects | 🤖 | Glitch, distortion |
| CanvasDistortions | src/components/art/CanvasDistortions.tsx | Canvas distortions | 🤖 | Wave, ripple effects |
| AdvancedToolbar | src/components/art/AdvancedToolbar.tsx | Advanced tools | ✏️ | Layers, filters |
| ShareArtworkModal | src/components/art/ShareArtworkModal.tsx | Share modal | 🤖 | Social sharing |
| FigmaStyleEditor | src/components/art/FigmaStyleEditor.tsx | Layer editor | ✏️ | Figma-inspired UI |
| MasonryGallery | src/components/art/MasonryGallery.tsx | Masonry layout | 🤖 | react-masonry-css |
| ShapeTools | src/components/art/ShapeTools.tsx | Shape drawing | 🤖 | Rectangle, circle, line |
| TextTool | src/components/art/TextTool.tsx | Text tool | 🤖 | Font selection, sizing |

### CHAINS COMPONENTS (src/components/chains/)

| Component | Path | Purpose | Status |
|-----------|------|---------|--------|
| GraveyardBackground | src/components/chains/GraveyardBackground.tsx | Graveyard theme | 🤖 |
| ChainLetterCard | src/components/chains/ChainLetterCard.tsx | Chain letter display | 🤖 |
| StartChainModal | src/components/chains/StartChainModal.tsx | Create chain modal | 🤖 |

### COLLABORATIVE COMPONENTS (src/components/collaborative/)

| Component | Path | Purpose | Status | Real-time Features |
|-----------|------|---------|--------|-------------------|
| CollaborativeStoriesView | src/components/collaborative/CollaborativeStoriesView.tsx | Main view | 🤖 | Project list |
| ProjectCard | src/components/collaborative/ProjectCard.tsx | Project card | 🤖 | Status, participants |
| ProjectFilters | src/components/collaborative/ProjectFilters.tsx | Filter controls | 🤖 | Genre, status filters |
| CreateProjectModal | src/components/collaborative/CreateProjectModal.tsx | Create project | 🤖 | Form validation |
| ProposalEditor | src/components/collaborative/ProposalEditor.tsx | Proposal editor | 🤖 | Rich text editor |
| ProposalVoting | src/components/collaborative/ProposalVoting.tsx | Voting interface | 🤖 | Real-time vote counts |
| ProposalList | src/components/collaborative/ProposalList.tsx | Proposal list | 🤖 | Sort by votes |

### CURSOR COMPONENTS (src/components/cursors/)

| Component | Path | Purpose | Status | Cursor Style |
|-----------|------|---------|--------|--------------|
| CustomCursor | src/components/shared/CustomCursor.tsx | Base cursor | 🤖 | Generic |
| AboutCursor | src/components/cursors/AboutCursor.tsx | About page | 🤖 | Magnifying glass |
| AuthCursor | src/components/cursors/AuthCursor.tsx | Auth pages | 🤖 | Key |
| ContactCursor | src/components/cursors/ContactCursor.tsx | Contact page | 🤖 | Quill pen |
| DollhouseCursor | src/components/cursors/DollhouseCursor.tsx | Dollhouse | 🤖 | Candle |
| ForumCursor | src/components/cursors/ForumCursor.tsx | Forum | 🤖 | Candelabra |
| StoriesCursor | src/components/cursors/StoriesCursor.tsx | Library | 🤖 | Book |
| ArtStudioCursor | src/components/cursors/ArtStudioCursor.tsx | Art studio | 🤖 | Paintbrush |
| ScrapbookCursor | src/components/cursors/ScrapbookCursor.tsx | Scrapbook | 🤖 | Scissors |
| ChainsCursor | src/components/cursors/ChainsCursor.tsx | Chains | 🤖 | Chain link |
| SocialProfileCursor | src/components/cursors/SocialProfileCursor.tsx | Profiles | 🤖 | Profile icon |

### DIARY/DOLLHOUSE COMPONENTS (src/components/diary/)

**Main Components:**
| Component | Path | Purpose | Status |
|-----------|------|---------|--------|
| DollhouseBackground | src/components/diary/DollhouseBackground.tsx | Animated background | 🤖 |
| DollhouseTitle | src/components/diary/DollhouseTitle.tsx | Animated title | 🤖 |
| DollhouseRoom | src/components/diary/DollhouseRoom.tsx | Individual room | 🤖 |
| DollhousePageWrapper | src/components/diary/DollhousePageWrapper.tsx | Page wrapper | 🤖 |
| DollhouseTransition | src/components/diary/DollhouseTransition.tsx | Transitions | 🤖 |
| RoomTransition | src/components/diary/RoomTransition.tsx | Room transitions | 🤖 |
| DollhouseViewRouter | src/components/diary/DollhouseViewRouter.tsx | View router | 🤖 |
| DollhouseHomeView | src/components/diary/DollhouseHomeView.tsx | Home view | 🤖 |
| DollhouseDecorations | src/components/diary/DollhouseDecorations.tsx | Decorations | 🤖 |

**Diary Components:**
| Component | Path | Purpose | Status |
|-----------|------|---------|--------|
| DiaryView | src/components/diary/DiaryView.tsx | Diary list | 🤖 |
| DiaryGrid | src/components/diary/DiaryGrid.tsx | Grid layout | 🤖 |
| DiaryLayoutGrid | src/components/diary/DiaryLayoutGrid.tsx | Layout system | 🤖 |
| DiaryListHeader | src/components/diary/DiaryListHeader.tsx | List header | 🤖 |
| DiaryEntryView | src/components/diary/DiaryEntryView.tsx | Entry display | 🤖 |
| CreateConfessionModal | src/components/diary/CreateConfessionModal.tsx | Create entry | 🤖 |
| LockSeal | src/components/diary/LockSeal.tsx | Lock/unlock | 🤖 |
| RibbonPicker | src/components/diary/RibbonPicker.tsx | Ribbon colors | 🤖 |
| MoodSelector | src/components/diary/MoodSelector.tsx | Mood selection | 🤖 |

**Writing Components:**
| Component | Path | Purpose | Status |
|-----------|------|---------|--------|
| WriteView | src/components/diary/WriteView.tsx | Writing interface | 🤖 |
| EnhancedWritingEditor | src/components/diary/EnhancedWritingEditor.tsx | Enhanced editor | ✏️ |
| EnhancedDiaryEditor | src/components/diary/EnhancedDiaryEditor.tsx | Diary editor | ✏️ |
| WritingEditorHeader | src/components/diary/WritingEditorHeader.tsx | Editor header | 🤖 |
| WritingEditorMetadata | src/components/diary/WritingEditorMetadata.tsx | Metadata editor | 🤖 |
| WritingFeaturesTour | src/components/diary/WritingFeaturesTour.tsx | Feature tour | 🤖 |
| WritingEnhancements | src/components/diary/WritingEnhancements.tsx | Enhancement tools | 🤖 |
| WritingGoals | src/components/diary/WritingGoals.tsx | Goal tracker | 🤖 |
| FocusMode | src/components/diary/FocusMode.tsx | Focus mode | 🤖 |
| AutoSaveIndicator | src/components/diary/AutoSaveIndicator.tsx | Auto-save status | 🤖 |
| SaveSuccessToast | src/components/diary/SaveSuccessToast.tsx | Save notification | 🤖 |

**Effects & Backgrounds:**
| Component | Path | Purpose | Status |
|-----------|------|---------|--------|
| MatrixView | src/components/diary/MatrixView.tsx | Matrix view mode | 🤖 |
| MatrixRainBackground | src/components/diary/MatrixRainBackground.tsx | Matrix rain | 🤖 |
| PinkMatrixRainBackground | src/components/diary/PinkMatrixRainBackground.tsx | Pink matrix | 🤖 |
| MagicalTypingEffect | src/components/diary/MagicalTypingEffect.tsx | Typing effect | 🤖 |
| VintageSignalEffect | src/components/diary/VintageSignalEffect.tsx | TV signal effect | 🤖 |

**Archive Components:**
| Component | Path | Purpose | Status |
|-----------|------|---------|--------|
| ArchiveView | src/components/diary/ArchiveView.tsx | Archive view | 🤖 |
| PolishedArchiveView | src/components/diary/PolishedArchiveView.tsx | Enhanced archive | ✏️ |
| ArchiveDoor | src/components/diary/ArchiveDoor.tsx | Interactive door | 🤖 |
| ReadingArchiveView | src/components/diary/ReadingArchiveView.tsx | Reading archive | 🤖 |

**Scrapbook Components:**
| Component | Path | Purpose | Status |
|-----------|------|---------|--------|
| MemoryScrapbook | src/components/diary/MemoryScrapbook.tsx | Scrapbook main | 🤖 |
| AddScrapbookModal | src/components/diary/AddScrapbookModal.tsx | Add modal | 🤖 |
| ScrapbookAddModal | src/components/diary/ScrapbookAddModal.tsx | Alt add modal | 🤖 |
| ScrapbookCard | src/components/diary/ScrapbookCard.tsx | Scrapbook card | 🤖 |
| ScrapbookDetail | src/components/diary/ScrapbookDetail.tsx | Detail view | 🤖 |
| EnhancedScrapbookCard | src/components/diary/EnhancedScrapbookCard.tsx | Enhanced card | ✏️ |
| EnhancedScrapbookDetail | src/components/diary/EnhancedScrapbookDetail.tsx | Enhanced detail | ✏️ |
| StickerPicker | src/components/diary/StickerPicker.tsx | Sticker selection | 🤖 |
| PhotoFilterSelector | src/components/diary/PhotoFilterSelector.tsx | Photo filters | 🤖 |
| ScratchOffSecret | src/components/diary/ScratchOffSecret.tsx | Scratch-off effect | 🤖 |
| VintagePolaroidEffects | src/components/diary/VintagePolaroidEffects.tsx | Polaroid effects | 🤖 |
| DragDropUpload | src/components/diary/DragDropUpload.tsx | Drag-drop upload | 🤖 |
| FlashbulbEffect | src/components/diary/FlashbulbEffect.tsx | Camera flash | 🤖 |

**Art Studio (in Dollhouse):**
| Component | Path | Purpose | Status |
|-----------|------|---------|--------|
| ArtStudioView | src/components/diary/ArtStudioView.tsx | Art studio room | 🤖 |

**Investigation Board:**
| Component | Path | Purpose | Status |
|-----------|------|---------|--------|
| InvestigationBoard | src/components/diary/InvestigationBoard.tsx | Main board | 🤖 |
| InvestigationToolbar | src/components/diary/InvestigationToolbar.tsx | Toolbar | 🤖 |
| InvestigationLayersPanel | src/components/diary/InvestigationLayersPanel.tsx | Layers panel | 🤖 |
| InvestigationNoteElement | src/components/diary/elements/InvestigationNoteElement.tsx | Note element | 🤖 |
| InvestigationPhotoElement | src/components/diary/elements/InvestigationPhotoElement.tsx | Photo element | 🤖 |

**Shared Dollhouse Components:**
| Component | Path | Purpose | Status |
|-----------|------|---------|--------|
| DollhouseBackgroundEffects | src/components/diary/shared/DollhouseBackgroundEffects.tsx | Background FX | 🤖 |
| DollhouseRoomHeader | src/components/diary/shared/DollhouseRoomHeader.tsx | Room header | 🤖 |
| DollhouseContentCard | src/components/diary/shared/DollhouseContentCard.tsx | Content card | 🤖 |
| DollhouseEmptyState | src/components/diary/shared/DollhouseEmptyState.tsx | Empty state | 🤖 |

**TOTAL DIARY COMPONENTS: 60+**
