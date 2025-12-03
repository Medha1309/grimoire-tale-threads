# Archive Room - Quick Start

## Installation (3 steps)

### 1. Add Route
```tsx
// src/router/index.tsx
import ArchiveRoom from '../pages/ArchiveRoom';

// Add to routes array:
{ path: '/archive', element: <ArchiveRoom /> }
```

### 2. Add Navigation
```tsx
// In your Navbar:
<Link to="/archive">📚 Archive</Link>
```

### 3. Done!
Navigate to `/archive` and start adding books.

## Quick Usage

### Add a Book
- Click "+ Add Book" or press `n`
- Fill in title (required), author, date, rating, notes, tags
- Click Save

### Search & Filter
- Type in search box or press `/` to focus
- Click tags or authors in sidebar to filter
- Use sort dropdown to change order

### Bulk Operations
- Check boxes to select multiple books
- Press `Delete` key to remove selected
- Click "Undo" in toast to restore

### Export/Import
- Click "Export" to download JSON backup
- Click "Import" to restore from JSON file

## Keyboard Shortcuts
- `/` - Focus search
- `n` - New book
- `Delete` - Delete selected
- `Escape` - Close modal
- `Enter` - Save/Open

## Customization

### Change Storage Key
```ts
// src/hooks/useArchiveStorage.ts
const STORAGE_KEY = "your_custom_key:v1";
```

### Disable Matrix Background
```tsx
// Default off:
const [showMatrix, setShowMatrix] = useState(false);
```

### Change Theme Colors
Replace `emerald` with your color in all components:
- `bg-emerald-600` → `bg-blue-600`
- `text-emerald-600` → `text-blue-600`
- etc.

## Testing

### Run Tests
```bash
npm test -- useArchiveStorage
npm test -- BookCard
```

### Manual Testing Checklist
- [ ] Add a book
- [ ] Edit a book
- [ ] Delete a book (check undo)
- [ ] Search books
- [ ] Filter by tag
- [ ] Filter by author
- [ ] Sort by date/title
- [ ] Select multiple books
- [ ] Bulk delete
- [ ] Export JSON
- [ ] Import JSON
- [ ] Toggle matrix background
- [ ] Toggle grid/list view
- [ ] Test keyboard shortcuts
- [ ] Test on mobile

## Troubleshooting

### Books not persisting?
Check browser localStorage is enabled and not full.

### Matrix background laggy?
Toggle it off or reduce canvas size in MatrixBackground.tsx.

### Import not working?
Ensure JSON file has correct structure (array of Book objects).

### Dark mode issues?
Check your app's dark mode implementation uses `dark:` classes.

## Next Steps

- Add book cover images
- Integrate with Goodreads API
- Add reading progress tracking
- Create reading statistics dashboard
- Add social sharing features

## Support

Check the full integration guide: `docs/ARCHIVE_ROOM_INTEGRATION.md`
