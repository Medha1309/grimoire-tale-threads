# Scrapbook Systems - Important Clarification

## Two Separate Systems

Your app now has TWO different scrapbook systems that serve different purposes:

### 1. OLD System - Diary Scrapbook (Still Active)
**Location:** `src/components/diary/`
**Purpose:** Part of the Dollhouse diary feature
**Features:**
- Photo collages with stickers
- Scratch-off secrets
- Polaroid effects
- Integrated into diary rooms

**Components:**
- `MemoryScrapbook.tsx`
- `AddScrapbookModal.tsx`
- `EnhancedScrapbookCard.tsx`
- `EnhancedScrapbookDetail.tsx`
- `StickerPicker.tsx`
- `PhotoFilterSelector.tsx`

**Types:** `ScrapbookEntry`, `ScrapbookPhoto`, `ScrapbookSticker`

**Route:** Accessed through `/diary` → Scrapbook room

### 2. NEW System - Collections (Just Built)
**Location:** `src/components/scrapbook/`
**Purpose:** Standalone photo collection and investigation board
**Features:**
- Collections/boards organization
- Clean minimal design
- Masonry grid layout
- Search and filter
- Investigation board connections

**Components:**
- `ScrapbookView.tsx`
- `CollectionGrid.tsx`
- `CollectionCard.tsx`
- `CollectionDetailView.tsx`
- `ItemMasonryGrid.tsx`
- `ItemListView.tsx`
- `ItemCard.tsx`

**Types:** `ScrapbookCollection`, `ScrapbookItem`, `ItemConnection`

**Route:** `/scrapbook` (standalone page)

## Why Two Systems?

The OLD system is part of your diary/dollhouse feature with a specific aesthetic (pink, polaroids, stickers).

The NEW system is a standalone feature for organizing inspiration and ideas with a clean, minimal design.

Both are valid and serve different purposes. They don't conflict because:
1. Different routes (`/diary` vs `/scrapbook`)
2. Different components (diary folder vs scrapbook folder)
3. Different types (though in same file, clearly separated)
4. Different Firebase collections

## Which One to Use?

- **Use OLD system** if you want the diary/polaroid aesthetic integrated with diary entries
- **Use NEW system** if you want clean photo collections for organizing inspiration

## Types File

The `src/types/scrapbook.ts` file now contains BOTH sets of types:
- NEW system types at the top
- OLD system types at the bottom
- Clearly labeled sections

This allows both systems to coexist without conflicts.

## No Cleanup Needed

Both systems are intentional and functional. No code needs to be removed.
