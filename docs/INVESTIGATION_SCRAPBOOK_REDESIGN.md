# 🔍 Investigation Scrapbook v2.0 - Complete Redesign

## Overview

Transformed the basic scrapbook into a **Figma-inspired investigation board** with professional tools, evidence board aesthetics, and horror elements.

---

## 🎯 Core Concept

**"Detective's Evidence Board meets Figma"**

- Cork board background with thumbtacks
- Photos as evidence with tags
- GIFs as surveillance footage
- Red string connections between clues
- Typewriter notes and annotations
- Full Figma-style editing tools

---

## ✨ Key Features

### 1. **Figma-Inspired Tools**

#### Toolbar (Top)
- 🔍 Select Tool - Click and drag elements
- ✋ Pan Tool - Navigate the board
- 📷 Add Photo - Upload evidence photos
- 🎬 Add GIF - Upload animated surveillance
- 📝 Add Note - Create investigation notes
- 🔴 Draw Connection - Red string between evidence
- ✏️ Annotate - Circle/highlight areas
- ↶↷ Undo/Redo - Full history (Ctrl+Z)
- ±  Zoom - In/out controls

#### Layers Panel (Left Sidebar)
- See all elements in z-index order
- Search/filter layers
- Toggle visibility (👁️/🚫)
- Lock/unlock elements (🔒/🔓)
- Delete elements (🗑️)
- Shows element type icons

#### Properties Panel (Right Sidebar)
- Transform: X, Y, Rotation, Opacity
- Photo: Filters, Evidence Tags, Thumbtacks
- GIF: VHS Effect, Timestamp, Camera Label
- Note: Style, Font Size, Color
- Layer: Locked, Visible

### 2. **Evidence Board Aesthetics**

#### Cork Board Background
- Realistic cork texture
- Grid pattern for alignment
- Creepy ambient shadows
- Vintage investigation vibe

#### Photo Elements
- Polaroid-style frames
- Thumbtacks pinning photos
- Evidence tags ("EXHIBIT A", "WITNESS PHOTO")
- Filters: Sepia, Vintage, Horror, VHS
- Timestamps for documentation
- Rotated at angles like real evidence

#### GIF Elements
- VHS scanlines effect
- Static noise overlay
- Tracking lines
- "REC" indicator (blinking)
- Surveillance camera labels ("CAM 01")
- Real-time timestamp
- Security footage aesthetic

#### Note Elements
- **Sticky Notes**: Yellow post-its
- **Typewriter**: Vintage typed text
- **Handwritten**: Cursive script
- **Redacted**: Black bars over text
- Editable on double-click
- Rotated for organic feel

#### Red String Connections
- Curved paths between evidence
- Animated flow
- Thumbtacks at connection points
- Arrow options
- Dashed line options

### 3. **Professional Editing**

#### Drag & Drop
- Click and drag any element
- Snap to grid (optional)
- Multi-select with Shift+Click
- Drag multiple elements together

#### Keyboard Shortcuts
- `Ctrl+Z` - Undo
- `Ctrl+Shift+Z` - Redo
- `Delete` - Delete selected
- `Ctrl+D` - Duplicate
- `Ctrl+A` - Select all
- `Escape` - Clear selection
- `Space` - Pan tool
- `Ctrl+/-` - Zoom in/out

#### History System
- Up to 50 undo states
- Shows current action
- Can undo/redo any change
- Never lose work

#### Layer Management
- Bring to front
- Send to back
- Lock to prevent edits
- Hide without deleting
- Group related elements

### 4. **Horror Elements**

#### Ambient Effects
- Flickering shadows
- Moving darkness
- Creepy atmosphere
- Subtle animations

#### VHS Glitches
- Scanlines
- Static noise
- Tracking errors
- Color distortion

#### Evidence Tags
- Blood-red labels
- "CLASSIFIED" stamps
- "CRIME SCENE" markers
- Ominous timestamps

---

## 📁 File Structure

```
src/
├── types/
│   └── investigationScrapbook.ts          # All type definitions
├── hooks/
│   └── useInvestigationBoard.ts           # State management + undo/redo
├── components/diary/
│   ├── InvestigationBoard.tsx             # Main container
│   ├── InvestigationToolbar.tsx           # Top toolbar
│   ├── InvestigationLayersPanel.tsx       # Left sidebar
│   ├── InvestigationCanvas.tsx            # Center canvas
│   ├── InvestigationPropertiesPanel.tsx   # Right sidebar
│   └── elements/
│       ├── InvestigationPhotoElement.tsx  # Photo with thumbtack
│       ├── InvestigationGifElement.tsx    # GIF with VHS
│       ├── InvestigationNoteElement.tsx   # Notes
│       └── InvestigationConnectionElement.tsx # Red strings
```

---

## 🎨 Design Tokens

### Colors
- **Cork Board**: `#3d2817` (dark brown)
- **Primary**: `#ff1493` (deep pink)
- **Evidence Tag**: `#dc2626` (red)
- **Surveillance**: `#ef4444` (bright red)
- **Background**: `#09090b` (zinc-950)
- **Panel**: `#18181b` (zinc-900)
- **Border**: `#27272a` (zinc-800)

### Typography
- **Typewriter**: `Courier New, monospace`
- **Handwritten**: `cursive`
- **Evidence**: `monospace`
- **UI**: `system-ui`

---

## 🚀 Usage

### Creating a New Investigation Board

```typescript
import { InvestigationBoard } from './components/diary/InvestigationBoard';

const initialBoard = {
  id: 'case-001',
  title: 'The Missing Person Case',
  date: new Date(),
  thought: 'Something doesn't add up...',
  elements: [],
  groups: [],
  comments: [],
  connections: [],
  backgroundColor: '#3d2817',
  backgroundTexture: 'cork',
  zoom: 1,
  pan: { x: 0, y: 0 },
};

<InvestigationBoard
  initialBoard={initialBoard}
  onSave={(board) => console.log('Saved:', board)}
  onBack={() => console.log('Back clicked')}
/>
```

### Adding Elements Programmatically

```typescript
// Add a photo
const photoElement = {
  id: `photo-${Date.now()}`,
  type: 'photo',
  position: { x: 30, y: 30 },
  size: { width: 20, height: 20 },
  rotation: -5,
  zIndex: 0,
  locked: false,
  visible: true,
  opacity: 1,
  imageUrl: 'data:image/jpeg;base64,...',
  filter: 'vintage',
  evidenceTag: 'EXHIBIT A',
  hasThumbTack: true,
  thumbTackColor: '#ff1493',
};

actions.addElement(photoElement);
```

---

## 🎯 Key Improvements Over Old Scrapbook

| Feature | Old Scrapbook | Investigation Board |
|---------|---------------|---------------------|
| Layout | Fixed grid | Free-form canvas |
| Positioning | Auto-arranged | Drag anywhere |
| Editing | Limited | Full Figma-style |
| Undo/Redo | ❌ | ✅ 50 states |
| Layers | ❌ | ✅ Full panel |
| Connections | ❌ | ✅ Red strings |
| GIF Support | ❌ | ✅ With VHS effects |
| Annotations | ❌ | ✅ Multiple types |
| Keyboard Shortcuts | ❌ | ✅ Full set |
| Properties Panel | ❌ | ✅ Live editing |
| Multi-Select | ❌ | ✅ Shift+Click |
| Zoom/Pan | ❌ | ✅ Infinite canvas |
| Professional Feel | Basic | High-functioning |

---

## 🎭 Horror Aesthetic Elements

### Visual Design
- Cork board texture (investigation wall)
- Thumbtacks holding evidence
- Red evidence tags
- VHS surveillance footage
- Typewriter notes
- Redacted documents
- Creepy shadows
- Flickering effects

### Interaction Design
- Photos pinned at angles
- Red string connections
- Glitchy GIF effects
- Ominous timestamps
- "REC" indicators
- Static noise
- Scanlines

---

## 📊 Performance

### Optimizations
- GPU-accelerated transforms
- Lazy rendering of off-screen elements
- Debounced drag updates
- Memoized element renders
- Efficient history management

### Limits
- Max 50 undo states
- Recommended: < 100 elements per board
- Image size: < 5MB per photo
- GIF size: < 10MB per file

---

## 🔧 Technical Details

### State Management
- Custom `useInvestigationBoard` hook
- Immutable state updates
- History tracking
- Undo/redo stack

### Drag & Drop
- Mouse event handling
- Position calculations
- Boundary constraints
- Multi-element dragging

### Canvas Rendering
- Transform-based positioning
- Z-index layering
- Zoom/pan transforms
- Selection highlighting

---

## 🎯 Future Enhancements

### Phase 2 (Optional)
- [ ] Multi-select drag box
- [ ] Copy/paste elements
- [ ] Export as image/PDF
- [ ] Collaborative editing
- [ ] Templates library
- [ ] Auto-save to Firebase
- [ ] Mobile touch support
- [ ] Voice annotations
- [ ] Timeline view
- [ ] Search within notes

---

## 🎉 Summary

You now have a **professional-grade investigation board** that:

✅ Feels like Figma (drag, layers, properties)  
✅ Looks like a detective's evidence wall  
✅ Maintains horror aesthetic  
✅ Supports all scrapbook features (dates, thoughts, photos)  
✅ Adds GIFs, notes, connections, annotations  
✅ Has full undo/redo  
✅ Desktop-optimized  
✅ Minimal storage (localStorage)  
✅ Perfect for hackathon demo  

**Status**: ✅ Ready to integrate and test  
**Vibe**: 🔍 True Crime Investigation + 👻 Horror + 🎨 Figma  
**Functionality**: 📈 10x more powerful than before

---

**Created**: November 2025  
**Theme**: Investigation Evidence Board  
**Inspiration**: Figma + True Crime + Horror
