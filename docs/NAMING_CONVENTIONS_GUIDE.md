# GRIMOIRE - Naming Conventions Guide

## Overview
This document establishes consistent naming conventions across the entire GRIMOIRE application to ensure cohesion and clarity.

---

## 🏛️ Main Sections

### 1. **The Library** (Stories)
- **Route**: `/stories`
- **Component**: `Stories.tsx`
- **Purpose**: Browse and read horror stories
- **User-facing name**: "Library"
- **Navbar**: "Library"

### 2. **The Parlour** (Forum)
- **Route**: `/forum`
- **Component**: `Forum.tsx` (alias: `GildedParlour`)
- **Purpose**: Discuss stories and connect with readers
- **User-facing name**: "The Parlour" or "Parlour"
- **Navbar**: "Parlour"
- **Page Title**: "THE PARLOUR"
- **NOT**: "The Gilded Parlour" (too long, outdated)

### 3. **The Dollhouse** (Diary)
- **Route**: `/diary`
- **Component**: `Dollhouse.tsx`
- **Purpose**: Private encrypted diary entries
- **User-facing name**: "The Dollhouse" or "Dollhouse"
- **Navbar**: "Dollhouse"
- **Page Title**: "THE DOLLHOUSE"

### 4. **About**
- **Route**: `/about`
- **Component**: `About.tsx`
- **Purpose**: Learn about GRIMOIRE
- **User-facing name**: "About"
- **Navbar**: "About"

---

## 📝 Content Types

### Forum/Parlour Content
- **Primary**: "Post" (not "Thread", "Whisper", or "Discussion")
  - Button: "NEW POST"
  - Modal: "New Post"
  - Action: "Post" (not "Submit", "Publish")
- **Secondary**: "Reply" or "Comment"
- **Collection**: "Posts" or "Discussions"

### Library Content
- **Primary**: "Story"
  - Button: "NEW STORY"
  - Modal: "New Story"
  - Action: "Publish"
- **Secondary**: "Chapter"
- **Collection**: "Stories"

### Dollhouse Content
- **Primary**: "Entry" or "Confession"
  - Button: "NEW ENTRY"
  - Modal: "New Entry"
  - Action: "Save"
- **Secondary**: "Memory" or "Scrapbook"
- **Collection**: "Entries"

---

## 🎨 UI Components

### Buttons
**Format**: `[ACTION] [OBJECT]`

Examples:
- ✅ "NEW POST" (Parlour)
- ✅ "NEW STORY" (Library)
- ✅ "NEW ENTRY" (Dollhouse)
- ✅ "SAVE DRAFT"
- ✅ "PUBLISH"
- ❌ "Submit" (too generic)
- ❌ "Create Discussion" (too wordy)

### Modals
**Format**: `[Action] [Object]`

Examples:
- ✅ "New Post" (matches button)
- ✅ "Edit Post"
- ✅ "New Story"
- ✅ "New Entry"
- ❌ "Compose a New Discussion" (too wordy)
- ❌ "Create Thread" (inconsistent)

### Actions
**Primary Actions**:
- Parlour: "Post" (not "Submit", "Send")
- Library: "Publish" (not "Post", "Submit")
- Dollhouse: "Save" (not "Submit", "Post")

**Secondary Actions**:
- "Cancel" (universal)
- "Delete" (not "Remove")
- "Edit" (not "Modify")
- "Reply" (not "Respond")

---

## 🔤 Typography & Casing

### Page Titles
- **Format**: ALL CAPS, spaced letters
- **Examples**:
  - "THE PARLOUR"
  - "THE LIBRARY"
  - "THE DOLLHOUSE"

### Section Headers
- **Format**: Title Case
- **Examples**:
  - "Recent Posts"
  - "Popular Stories"
  - "Your Entries"

### Buttons
- **Format**: ALL CAPS
- **Examples**:
  - "NEW POST"
  - "SAVE DRAFT"
  - "PUBLISH"

### Body Text
- **Format**: Sentence case
- **Examples**:
  - "Share your thoughts..."
  - "Write your story..."

---

## 🏷️ Tags & Categories

### Forum Tags
Use existing `FORUM_TAGS`:
- General Discussion
- Story Analysis
- Character Discussion
- Plot Theories
- Writing Feedback
- Romance, Mystery, Horror, Gothic, Thriller, Fantasy, Historical, Folklore

### Story Genres
- Horror
- Mystery
- Gothic
- Thriller
- Romance
- Fantasy
- Historical
- Folklore

---

## 🎯 User Actions

### Creating Content
| Location | Button Text | Modal Title | Submit Button |
|----------|-------------|-------------|---------------|
| Parlour  | NEW POST    | New Post    | Post          |
| Library  | NEW STORY   | New Story   | Publish       |
| Dollhouse| NEW ENTRY   | New Entry   | Save          |

### Editing Content
| Location | Button Text | Modal Title | Submit Button |
|----------|-------------|-------------|---------------|
| Parlour  | Edit        | Edit Post   | Update        |
| Library  | Edit        | Edit Story  | Update        |
| Dollhouse| Edit        | Edit Entry  | Save          |

### Deleting Content
| Location | Button Text | Modal Title | Confirm Button |
|----------|-------------|-------------|----------------|
| All      | Delete      | Delete [Type]? | Delete      |

---

## 🔗 Routes & Navigation

### Route Naming
```typescript
ROUTES = {
  HOME: '/',
  STORIES: '/stories',        // Library
  STORY_DETAIL: '/story/:slug',
  READER: '/read/:slug',
  FORUM: '/forum',            // Parlour
  FORUM_POST: '/forum/:id',
  DIARY: '/diary',            // Dollhouse
  DIARY_ENTRY: '/diary/:id',
  ABOUT: '/about',
  CONTACT: '/contact',
}
```

### Navigation Labels
```typescript
navItems = [
  { name: "Home", path: "/" },
  { name: "Library", path: "/stories" },
  { name: "Parlour", path: "/forum" },
  { name: "Dollhouse", path: "/diary" },
  { name: "About", path: "/about" },
]
```

---

## 📦 Component Naming

### File Names
- **Format**: PascalCase
- **Examples**:
  - `Forum.tsx` (not `GildedParlour.tsx`)
  - `ForumList.tsx`
  - `UnifiedWritingModal.tsx`

### Component Names
- **Format**: PascalCase, descriptive
- **Examples**:
  - `export const Forum`
  - `export const ForumList`
  - `export const UnifiedWritingModal`

### Aliases (for backward compatibility)
```typescript
// Keep old name as alias
export const GildedParlour = Forum;
```

---

## 🎨 Design Tokens

### Color Names
```typescript
colors = {
  // Parlour
  parlourRed: '#6a0000',
  parlourRedHover: '#8B0000',
  
  // Dollhouse
  dollhousePink: '#ffb6d9',
  dollhousePinkDark: '#ff8dc7',
  
  // Library
  libraryAmber: '#d4af37',
  
  // Universal
  zinc950: '#0a0a0a',
  zinc900: '#171717',
  zinc800: '#262626',
  zinc100: '#f5f5f5',
}
```

---

## ✅ Consistency Checklist

When adding new features, ensure:

- [ ] Button text matches modal title (e.g., "NEW POST" → "New Post")
- [ ] Submit button uses appropriate action verb (Post/Publish/Save)
- [ ] Page title uses THE + NAME format in all caps
- [ ] Navigation uses short, clear names
- [ ] Routes use lowercase, plural where appropriate
- [ ] Components use PascalCase
- [ ] No emojis in production UI (use SVG icons instead)
- [ ] Consistent terminology (Post, not Thread/Whisper/Discussion)

---

## 🚫 Deprecated Terms

### Don't Use:
- ❌ "The Gilded Parlour" → Use "The Parlour"
- ❌ "Whisper" → Use "Post"
- ❌ "Echo" → Use "Reply"
- ❌ "Thread" → Use "Post"
- ❌ "Discussion" → Use "Post"
- ❌ "Compose" → Use "New Post"
- ❌ "Submit" → Use specific action (Post/Publish/Save)

### Use Instead:
- ✅ "The Parlour"
- ✅ "Post"
- ✅ "Reply"
- ✅ "New Post"
- ✅ "Post" (action)

---

## 📝 Examples

### Good ✅
```typescript
// Button
<button>NEW POST</button>

// Modal
<UnifiedWritingModal title="New Post" submitButtonText="Post" />

// Page Title
<h1>THE PARLOUR</h1>

// Navigation
<Link to="/forum">Parlour</Link>
```

### Bad ❌
```typescript
// Button
<button>✒️ NEW POST</button>  // No emojis

// Modal
<UnifiedWritingModal title="Compose a New Discussion" submitButtonText="Submit" />  // Too wordy, wrong action

// Page Title
<h1>THE GILDED PARLOUR</h1>  // Too long

// Navigation
<Link to="/forum">Forum</Link>  // Use "Parlour" for consistency
```

---

## 🔄 Migration Path

### Phase 1: User-Facing (Complete)
- ✅ Update page titles
- ✅ Update button text
- ✅ Update modal titles
- ✅ Update navigation labels
- ✅ Update reply section terminology (Echo → Reply)
- ✅ Update post creation modal (Whisper → Post)
- ✅ Update all error messages and placeholders

### Phase 2: Code (Ongoing)
- ✅ Update component terminology in ReplySection
- ✅ Update CreateWhisperModal text
- ✅ Update PostView styling
- [ ] Update file names (low priority)
- [ ] Update comments
- [ ] Update documentation

### Phase 3: Data (Future)
- [ ] Update database field names
- [ ] Update API endpoints
- [ ] Update type definitions

---

## 📚 Summary

**Core Principle**: Keep it simple, consistent, and clear.

**The Three Rooms**:
1. **The Library** - Read stories
2. **The Parlour** - Discuss stories
3. **The Dollhouse** - Write privately

**The Three Actions**:
1. **Publish** - Make public (Library)
2. **Post** - Share with community (Parlour)
3. **Save** - Keep private (Dollhouse)

This guide ensures GRIMOIRE maintains a cohesive, professional experience throughout the application.
