# Chain Lab - Interactive Features Guide

## 🎯 Everything You Can Click, Hover, and Interact With

### Header Section

#### Top Row
- **← Back Button** - Returns to home page
  - Hover: Lighter color

#### Bottom Row
- **Σ Icon** - Visual branding element
  - Hover: Enhanced glow effect
  
- **Chain Dropdown** - Switch between different story chains
  - Hover: Border changes to lime
  - Click: Opens dropdown menu
  
- **+ New Button** - Create a new chain
  - Hover: Brighter background + glow
  - Click: Opens creation modal
  
- **Participant Count** - Shows online users
  - Animated pulse effect

---

### Left Sidebar - Chain Timeline

#### Segment Cards
- **Click any card** - View that segment in detail
- **Hover effects**:
  - Card scales up slightly
  - Border brightens
  - Text becomes lighter
  - Shadow intensifies
  
#### Numbered Nodes
- Small circles on the left spine
- Shows segment number
- Active segment glows lime

---

### Center Panel

#### Navigation Strip
- **← Previous Button** - Go to previous segment
  - Hover: Lime border + text
  - Disabled at first segment
  
- **→ Next Button** - Go to next segment
  - Hover: Lime border + text
  - Disabled at last segment
  
- **Segment Counter** - Shows position (#X / Total)

#### Active Segment Card
- **Hover effects**:
  - Border brightens
  - Shadow deepens
  - Text becomes whiter
  - Author dot glows brighter

#### Story Metrics Card
- **Words stat** - Hover to highlight
- **Chain hash** - Click to copy to clipboard
- **Links stat** - Hover to highlight
- **Entire card** - Hover for border effect

#### Writing Editor
- **Textarea** - Type your segment
  - Ctrl+Enter to submit
  
- **Author Input** - Change your display name
  
- **Stitch Link Button** - Submit segment
  - Disabled when empty
  - Shows "stitching..." during submit
  - Gradient glow effect on hover

---

### Right Sidebar - Algorithm Lens

#### Interactive Graph
- **Click any node** - Jump to that segment instantly
- **Hover any node** - Border changes to lime
- **Active node** - Larger, lime-filled circle
- **Connection lines** - Hover card to brighten
- **Entire graph card** - Hover for border effect

#### Graph Legend
- Visual guide to understand the graph
- Static informational content

#### How It Works
- Explains the system architecture
- Static informational content

#### Session Stats (All Interactive!)
- **Total Segments** - Hover for lime highlight
- **Participants** - Hover for lime highlight
- **Total Words** - Hover for lime highlight
- **Chain Hash** - Click to copy full hash
  - Hover for lime highlight

#### Contributors
- **Each badge** - Hover to see join date
  - Border changes to lime
  - Background brightens
  - Text becomes lime

---

### New Chain Modal

#### When "+ New" is clicked:
- **Title Input** - Type chain name (required)
- **Description Textarea** - Optional details
- **Cancel Button** - Close modal
  - Hover: Lighter border + text
- **Create Button** - Submit new chain
  - Disabled when title empty
  - Gradient glow effect
  - Shows "Creating..." during process

---

## ⌨️ Keyboard Shortcuts

| Key | Action | Context |
|-----|--------|---------|
| `←` | Previous segment | When not typing |
| `→` | Next segment | When not typing |
| `Ctrl + Enter` | Submit segment | In textarea |

---

## 🎨 Visual Feedback

### Hover States
- **Lime accent** (#bef264) - Primary interactive color
- **Scale effects** - Cards grow 1-2%
- **Border changes** - Slate → Lime
- **Shadow intensifies** - Depth increases
- **Text brightens** - Slate → White/Lime

### Active States
- **Lime glow** - Active segment highlighted
- **Larger nodes** - Active in graph
- **Scale up** - Active card slightly bigger

### Disabled States
- **30% opacity** - Clearly non-interactive
- **No hover effects** - Cursor shows not-allowed
- **Muted colors** - Slate gray

### Loading States
- **"stitching..."** - During segment submission
- **"Creating..."** - During chain creation
- **Disabled inputs** - Can't interact while loading

---

## 🔥 Real-Time Features

### Automatic Updates
- New segments appear instantly
- Participant count updates live
- Graph updates automatically
- Stats recalculate in real-time

### Firebase Sync
- All changes saved immediately
- Multiple users see updates instantly
- No manual refresh needed
- Persistent across sessions

---

## 💡 Pro Tips

1. **Fast Navigation**: Use arrow keys to quickly browse segments
2. **Quick Submit**: Ctrl+Enter to submit without clicking
3. **Copy Hash**: Click the chain hash to copy for sharing
4. **Graph Navigation**: Click graph nodes for visual navigation
5. **Hover to Learn**: Hover over stats and badges for tooltips

---

## ✨ Polish Details

- Smooth 200ms transitions on all interactions
- Consistent lime accent throughout
- Scanline effects for retro-tech aesthetic
- Gradient backgrounds for depth
- Neon glows on active elements
- Clinical, professional design language
- Mature aesthetic for 50+ audience

---

**Everything is clickable, hoverable, and fully functional!**
