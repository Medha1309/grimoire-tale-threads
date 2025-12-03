# Scrapbook Redesign - Complete Implementation

## Overview
Clean, minimal photo collection system with investigation board features. Gothic horror aesthetic matching the library design.

## Design Decisions

### Visual Style
- Dark background (zinc-950)
- Amber/gold accents (#d4af37)
- Clean minimal grid layout
- Subtle animations and hover effects
- No emojis (text only)

### Organization
- Collections/boards system (Pinterest-style)
- Each collection contains multiple items
- Items can be connected with visual lines (investigation board)

### Features
- Masonry grid (default) with toggle to list view
- Drag-and-drop reordering
- Search and filter
- Full CRUD operations
- Image + title + caption + notes + date

## File Structure

```
src/
├── types/
│   └── scrapbook.ts                    # Type definitions
├── hooks/
│   ├── useScrapbookCollections.ts      # Collection management
│   └── useScrapbookItems.ts            # Item management
└── components/
    └── scrapbook/
        ├── ScrapbookView.tsx           # Main collections view
        ├── CollectionGrid.tsx          # Grid of collections
        ├── CollectionCard.tsx          # Individual collection card
        ├── CreateCollectionModal.tsx   # Create new collection
        ├── CollectionDetailView.tsx    # Collection detail page
        ├── ItemMasonryGrid.tsx         # Masonry layout for items
        ├── ItemListView.tsx            # List layout for items
        ├── ItemCard.tsx                # Individual item card
        ├── ItemDetailModal.tsx         # Item detail/edit modal
        ├── AddItemModal.tsx            # Add new item
        └── ConnectionLines.tsx         # Visual connection lines
```

## Firebase Collections

### scrapbookCollections
```typescript
{
  id: string;
  userId: string;
  title: string;
  description?: string;
  coverImage?: string;
  itemCount: number;
  createdAt: Timestamp;
  updatedAt: Timestamp;
  isPrivate: boolean;
}
```

### scrapbookItems
```typescript
{
  id: string;
  collectionId: string;
  userId: string;
  imageUrl: string;
  title: string;
  caption?: string;
  notes?: string;
  position: number;
  connections: string[]; // IDs of connected items
  createdAt: Timestamp;
  updatedAt: Timestamp;
}
```

## Key Features

### 1. Collections View
- Grid of collection cards
- Search collections
- Create new collection
- Delete collection
- Click to view details

### 2. Collection Detail View
- View all items in collection
- Toggle between masonry/list view
- Search items
- Sort by date or title
- Add new items
- Edit/delete items

### 3. Item Management
- Upload image
- Add title, caption, notes
- Drag to reorder
- Connect items with visual lines
- View full details in modal

### 4. Investigation Board
- Visual red string connections between items
- Click items to create connections
- Remove connections
- Helps visualize relationships

## Routing

Add to router:
```typescript
{
  path: '/scrapbook',
  element: <ScrapbookView />
},
{
  path: '/scrapbook/:collectionId',
  element: <CollectionDetailView />
}
```

## Firestore Rules

```
match /scrapbookCollections/{collectionId} {
  allow read: if request.auth != null && resource.data.userId == request.auth.uid;
  allow create: if request.auth != null && request.resource.data.userId == request.auth.uid;
  allow update, delete: if request.auth != null && resource.data.userId == request.auth.uid;
}

match /scrapbookItems/{itemId} {
  allow read: if request.auth != null && resource.data.userId == request.auth.uid;
  allow create: if request.auth != null && request.resource.data.userId == request.auth.uid;
  allow update, delete: if request.auth != null && resource.data.userId == request.auth.uid;
}
```

## Next Steps

1. Create remaining components (ItemMasonryGrid, ItemListView, ItemCard, etc.)
2. Add image upload functionality
3. Implement drag-and-drop reordering
4. Add connection line visualization
5. Test all CRUD operations
6. Add to navigation menu

## Usage

```typescript
// Navigate to scrapbook
goTo.scrapbook(); // or navigate('/scrapbook')

// Create collection
const collectionId = await createCollection('Dark Romance Ideas', 'Inspiration for my novel');

// Add item
await addItem(collectionId, imageUrl, 'Character Inspiration', 'Gothic heroine aesthetic');

// Connect items
await addConnection(itemId1, itemId2);
```

## Design Consistency

Matches library page aesthetic:
- Same color scheme (dark bg, amber accents)
- Same border styles and shadows
- Same button styles
- Same input field styling
- Same font (serif for headers, sans for body)
- Same hover effects and animations
