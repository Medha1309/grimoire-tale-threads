# Saved Quotes Integration Guide

## Quick Integration

To integrate the Saved Quotes feature into your Stories/Library page, follow these steps:

### 1. Import Components

```typescript
import { SavedQuotesView } from '../components/library/SavedQuotesView';
```

### 2. Add View State

```typescript
const [currentView, setCurrentView] = useState<'library' | 'savedBooks' | 'savedQuotes' | 'archive'>('library');
```

### 3. Update SavedBooksView Props

```typescript
<SavedBooksView
  savedBooks={savedBooks}
  onBack={() => setCurrentView('library')}
  onRemoveBook={handleRemoveBook}
  onArchiveBook={handleArchiveBook}
  onViewBook={handleViewBook}
  onBrowseLibrary={() => setCurrentView('library')}
  archivedCount={archivedBooks.length}
  onViewArchive={() => setCurrentView('archive')}
  onViewQuotes={() => setCurrentView('savedQuotes')}  // NEW
/>
```

### 4. Add Quotes View Rendering

```typescript
{currentView === 'savedQuotes' && (
  <SavedQuotesView
    onBack={() => setCurrentView('savedBooks')}
    onViewBook={(storyId) => {
      // Navigate to story detail or reader
      goTo.storyDetail(storyId);
    }}
  />
)}
```

## Complete Example

```typescript
export const Stories: React.FC = () => {
  const [currentView, setCurrentView] = useState<'library' | 'savedBooks' | 'savedQuotes' | 'archive'>('library');
  const { goTo } = useNavigation();
  
  // ... other state and handlers ...

  return (
    <section className="relative min-h-screen">
      {currentView === 'library' && (
        <LibraryView
          onViewSavedBooks={() => setCurrentView('savedBooks')}
          // ... other props
        />
      )}

      {currentView === 'savedBooks' && (
        <SavedBooksView
          savedBooks={savedBooks}
          onBack={() => setCurrentView('library')}
          onRemoveBook={handleRemoveBook}
          onArchiveBook={handleArchiveBook}
          onViewBook={handleViewBook}
          onBrowseLibrary={() => setCurrentView('library')}
          archivedCount={archivedBooks.length}
          onViewArchive={() => setCurrentView('archive')}
          onViewQuotes={() => setCurrentView('savedQuotes')}
        />
      )}

      {currentView === 'savedQuotes' && (
        <SavedQuotesView
          onBack={() => setCurrentView('savedBooks')}
          onViewBook={(storyId) => goTo.storyDetail(storyId)}
        />
      )}

      {currentView === 'archive' && (
        <ArchiveView
          onBack={() => setCurrentView('savedBooks')}
          // ... other props
        />
      )}
    </section>
  );
};
```

## Reader Integration

The Reader component is already set up! Text selection automatically triggers the quote save popup. No additional integration needed.

## Testing

1. **Save a Quote**:
   - Navigate to any story reader
   - Select 10-500 characters of text
   - Click "Save Quote" in the popup

2. **View Quotes**:
   - Go to Saved Books
   - Click "Saved Quotes" card
   - See all your saved quotes

3. **Add Notes**:
   - Click on any quote
   - Add your thoughts
   - Click "Save"

4. **Navigate to Book**:
   - Click the book title in any quote
   - Should navigate to that story

## Firestore Setup

The feature requires the `savedQuotes` collection. Security rules are already configured in `firestore.rules`.

No additional Firestore setup needed - the collection will be created automatically when the first quote is saved.

## Styling

The feature uses your existing design system:
- Colors from `dollhouse-tokens.ts` and `parlour-tokens.ts`
- Typography from `regency-typography.ts`
- Button system from `button-system.ts`

All styling is consistent with your horror aesthetic!
