# Saved Quotes Feature

## Overview
The Saved Quotes feature allows users to save memorable passages from stories they're reading. Quotes appear as vintage bookmarks with a horror aesthetic, integrated into the existing Saved Books door.

## User Flow

### Saving a Quote
1. **While Reading**: User selects text in the Reader (10-500 characters)
2. **Popup Appears**: Quote selection popup shows above the selection
3. **Quick Save**: Click "Save Quote" for instant save
4. **Add Note**: Click "+ Note" to add personal thoughts before saving
5. **Confirmation**: Toast notification confirms the save

### Viewing Quotes
1. **From Saved Books**: Click "Saved Quotes" card to view all quotes
2. **Per Book**: Each book card shows quote count (e.g., "3 quotes")
3. **Quote Wall**: All quotes displayed as vintage bookmarks with:
   - Quote text with decorative quotation marks
   - Source book title and author (clickable)
   - Chapter number (if available)
   - Personal notes (editable)
   - Colored ribbon bookmark indicator

### Managing Quotes
- **Add Notes**: Click on quote to add/edit personal thoughts
- **Remove**: Hover over quote → click "Remove"
- **Filter**: Search by text or filter by story
- **Navigate**: Click book title to jump to that story

## Technical Implementation

### Data Structure
```typescript
interface SavedQuote {
  id: string;
  userId: string;
  storyId: string;
  storyTitle: string;
  storyAuthor: string;
  quote: string;
  context?: string;
  chapterNumber?: number;
  savedAt: Timestamp;
  tags?: string[];
  ribbonColor?: string;
  isPrivate: boolean;
  notes?: string;
}
```

### Components
- `QuoteSelectionPopup` - Text selection UI in Reader
- `SavedQuotesView` - Main quotes display page
- `useSavedQuotes` - Hook for quote management

### Firestore
- Collection: `savedQuotes`
- Security: User can only read/write their own quotes
- Validation: 10-500 character limit, XSS protection

## Visual Design

### Quote Cards
- Vintage bookmark aesthetic with aged paper texture
- Left border colored ribbon (customizable)
- Decorative quotation marks
- Ink-bleed effect on text
- Hover effects with shadow enhancement

### Colors
- Primary: `#ffb6d9` (pink)
- Background: Gradient from amber/pink to black
- Text: Zinc-300 for quotes, zinc-500 for metadata

### Typography
- Font: Serif (matches app aesthetic)
- Quote text: Large, italic, leading-relaxed
- Metadata: Small, regular

## Integration Points

### Reader.tsx
- Text selection detection
- Quote popup positioning
- Chapter tracking for context

### SavedBooksView.tsx
- Quote count display on book cards
- "Saved Quotes" access card
- Navigation to quotes view

### Stories.tsx (Parent)
- Route handling for quotes view
- State management for view switching

## Future Enhancements
- Share quotes publicly
- Quote collections/tags
- Export quotes as images
- Quote of the day feature
- Highlight quotes in reader
- Quote annotations with drawings
