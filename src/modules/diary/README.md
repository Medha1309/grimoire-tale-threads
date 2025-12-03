# Diary Module - Production Ready

A fully functional, self-contained diary feature with modern UX and nostalgic 2000s vibes.

## Features

### Core Functionality
- ✅ **Full CRUD Operations**: Create, read, update, delete entries
- ✅ **Local Persistence**: IndexedDB with LocalStorage fallback
- ✅ **Auto-save**: Saves every 3 seconds while typing
- ✅ **Error Handling**: Comprehensive error handling for all operations
- ✅ **Smooth Transitions**: Animated page transitions
- ✅ **Responsive Design**: Works on mobile and desktop

### Innovative Features
1. **Mood Sticker System**: Select from 20+ stickers across 4 categories
2. **Auto-generated Headlines**: AI-like headline generation from entry content
3. **Noise Mode**: Toggle CRT grain overlay for 2000s nostalgia
4. **Keyboard Shortcuts**: 
   - `Ctrl+S` to save
   - `Shift+Enter` for new entry
   - `Esc` to cancel
5. **Timeline View**: Quick preview of last 7 entries in horizontal scroll
6. **Easter Egg**: Floating pixel heart appears after 30 seconds of idle time

### Additional Features
- Favorite entries
- Mood-based filtering
- Search functionality
- Entry statistics
- Word count tracker
- Date formatting
- Mood distribution analytics

## File Structure

```
src/modules/diary/
├── components/
│   ├── DiaryPage.tsx          # Main page component
│   ├── DiaryEditor.tsx         # Rich text editor
│   ├── EntryCard.tsx           # Entry list item
│   ├── EntryDetail.tsx         # Full entry view
│   ├── Sidebar.tsx             # Navigation & filters
│   ├── Timeline.tsx            # Recent entries strip
│   ├── NoiseMode.tsx           # CRT effect overlay
│   └── FloatingHeart.tsx       # Easter egg component
├── hooks/
│   └── useDiary.ts             # Main data hook
├── utils/
│   ├── storage.ts              # IndexedDB/LocalStorage
│   └── headlineGenerator.ts   # Headline generation
├── types.ts                    # TypeScript definitions
├── constants.ts                # Configuration
├── index.ts                    # Public API
└── README.md                   # This file
```

## Integration Steps

### 1. Install in Router

Add to your `src/router/index.tsx`:

```typescript
import { DiaryPage } from '../modules/diary';

// In your routes array:
{
  path: '/diary',
  element: <ProtectedRoute><DiaryPage /></ProtectedRoute>,
}
```

### 2. Add Navigation Link

In your `Navbar.tsx`:

```typescript
<Link to="/diary">My Diary</Link>
```

### 3. Ensure Auth Context

The module uses `useAuth()` from `src/contexts/AuthContext.tsx`. Make sure it's available.

## Usage Examples

### Basic Usage

```typescript
import { DiaryPage } from './modules/diary';

function App() {
  return <DiaryPage />;
}
```

### Using the Hook Directly

```typescript
import { useDiary } from './modules/diary';

function MyComponent() {
  const { entries, createEntry, loading } = useDiary('user-id');
  
  const handleCreate = async () => {
    await createEntry(
      'My Title',
      'Entry content...',
      'happy',
      ['heart', 'star'],
      ['personal']
    );
  };
  
  return <div>{/* Your UI */}</div>;
}
```

### Custom Styling

All components use Tailwind CSS classes. Override with your own classes:

```typescript
<DiaryPage className="custom-diary-theme" />
```

## Technical Details

### Storage Strategy
1. **Primary**: IndexedDB for large-scale storage
2. **Fallback**: LocalStorage if IndexedDB fails
3. **Auto-migration**: Seamless fallback without data loss

### Performance
- Lazy loading of components
- Debounced auto-save (3s)
- Optimized re-renders with React.memo
- Efficient filtering with useMemo

### Accessibility
- Keyboard navigation support
- ARIA labels on interactive elements
- Focus management
- Screen reader friendly

### Browser Support
- Chrome/Edge: Full support
- Firefox: Full support
- Safari: Full support
- Mobile browsers: Full support

## API Reference

### useDiary Hook

```typescript
const {
  entries,           // DiaryEntry[]
  loading,           // boolean
  error,             // string | null
  isSaving,          // boolean
  createEntry,       // (title, content, mood, stickers, tags) => Promise<DiaryEntry>
  updateEntry,       // (id, updates) => Promise<void>
  deleteEntry,       // (id) => Promise<void>
  toggleFavorite,    // (id) => Promise<void>
  scheduleAutoSave,  // (entryData) => void
  filterEntries,     // (filters) => DiaryEntry[]
  getStats,          // () => DiaryStats
  refreshEntries,    // () => Promise<void>
} = useDiary(userId);
```

### Types

```typescript
type DiaryMood = 'happy' | 'sad' | 'calm' | 'anxious' | 'excited' | 'thoughtful';

interface DiaryEntry {
  id: string;
  userId: string;
  title: string;
  content: string;
  mood: DiaryMood;
  stickers: string[];
  headline?: string;
  createdAt: Date;
  updatedAt: Date;
  tags: string[];
  isFavorite: boolean;
}
```

## Troubleshooting

### IndexedDB Not Working
- Check browser console for errors
- Verify browser supports IndexedDB
- Module automatically falls back to LocalStorage

### Auto-save Not Triggering
- Ensure `onAutoSave` prop is passed to DiaryEditor
- Check console for errors
- Verify 3-second delay is acceptable

### Entries Not Persisting
- Check browser storage quota
- Verify userId is consistent
- Clear browser cache and retry

## Future Enhancements

Potential additions (not implemented):
- Export entries to JSON/PDF
- Import from other diary apps
- Cloud sync with Firebase
- Rich text formatting (bold, italic, etc.)
- Image attachments
- Voice-to-text entries
- Mood analytics charts
- Reminder notifications

## License

Part of the Grimr application. See main LICENSE file.
