# 🎨 Art Studio - Haunted Gothic Edition

## Quick Start

```tsx
import ArtStudioPage from './components/artstudio/ArtStudioPage';

// In your router
<Route path="/art-studio" element={<ArtStudioPage />} />
```

## Features

✅ **Drawing Tools**: Brush, Eraser, Line, Rectangle, Ellipse, Fill Bucket, Eyedropper, Select
✅ **Layer System**: Multiple layers with visibility, opacity, and naming
✅ **History**: Undo/Redo with keyboard shortcuts (Ctrl+Z, Ctrl+Shift+Z)
✅ **Export**: PNG image and JSON project export
✅ **Import**: Load project metadata from JSON
✅ **Auto-save**: Draft metadata persisted to localStorage
✅ **Gothic Mode**: Animated fog, particles, and haunted cursor
✅ **Accessibility**: Full keyboard control and ARIA labels
✅ **Responsive**: Optimized for desktop use

## Keyboard Shortcuts

| Key | Action |
|-----|--------|
| `B` | Brush tool |
| `E` | Eraser tool |
| `L` | Line tool |
| `R` | Rectangle tool |
| `O` | Ellipse tool |
| `F` | Fill bucket |
| `T` | Text tool |
| `I` | Eyedropper |
| `S` | Select tool |
| `Ctrl+Z` | Undo |
| `Ctrl+Shift+Z` | Redo |
| `Ctrl+S` | Export |
| `Ctrl+N` | New layer |

## Components

- **ArtStudioPage** - Main container with state management
- **GothicCanvas** - Drawing surface with tool implementations
- **GothicToolbar** - Tool selection and controls
- **LayerPanel** - Layer management UI
- **GothicBackground** - Animated atmospheric effects
- **HauntedCursor** - Custom cursor with trails
- **ExportModal** - Export dialog
- **ImportModal** - Import dialog

## Storage

- **Key**: `artstudio:draft:v1`
- **Data**: Layer metadata, tool settings, active layer
- **Note**: Canvas pixel data not stored (too large)

## Customization

### Colors
Edit the rose/pink accent colors in Tailwind classes:
- `rose-200` - Light text
- `rose-400` - Accents
- `rose-600` - Primary actions
- `slate-900` - Dark backgrounds

### Canvas Size
Change `CANVAS_WIDTH` and `CANVAS_HEIGHT` constants in `ArtStudioPage.tsx`

### Particle Count
Adjust particle count in `GothicBackground.tsx` (line 48)

## Browser Support

- Chrome 90+
- Firefox 88+
- Safari 14+
- Edge 90+

## Performance

- 60fps animations
- Optimized canvas operations
- History limited to prevent memory issues
- Particle system uses requestAnimationFrame

## Future Enhancements

- [ ] Text tool implementation
- [ ] Selection tool with move/scale
- [ ] Layer reordering via drag-and-drop
- [ ] Brush presets
- [ ] Filters and effects
- [ ] Symmetry modes
- [ ] Canvas resize
- [ ] Grid and guides
- [ ] Color palette management
- [ ] Mobile touch support

## License

Part of the Grimoire project
