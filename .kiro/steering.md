# 🎯 Kiro Steering Document

This document provides persistent context for Kiro AI to maintain consistency across development sessions.

---

## 🎭 Project Overview

**Name:** GRIMOIRE: Tale Threads  
**Type:** Gothic storytelling platform  
**Target Audience:** Writers, readers, creative communities  
**Design Philosophy:** Nostalgia + modern UX + immersive interactions

### Core Goals

1. **Immersive Environment:** Virtual "Dollhouse" with themed rooms
2. **Collaborative Storytelling:** Real-time co-creation with voting systems
3. **Responsive Behaviors:** React to user actions (idle, tab switch, cursor movement)
4. **Performance:** Smooth on low-end devices, accessible, FIPPA-compliant
5. **Gothic Aesthetic:** Early-2000s web nostalgia with modern polish

---

## 🏗️ Architectural Principles

### Component Structure

```
src/
├── components/          # Reusable UI components
│   ├── shared/         # Cross-feature components (Button, Modal, etc.)
│   ├── diary/          # Dollhouse room components
│   ├── collaborative/  # Tale Threads components
│   ├── sessions/       # Chains components
│   ├── forum/          # Gilded Parlour components
│   └── library/        # Library components
├── pages/              # Route-level components
├── hooks/              # Custom React hooks
├── utils/              # Pure utility functions
├── types/              # TypeScript type definitions
├── contexts/           # React Context providers
├── design-system/      # Design tokens and theme
└── __tests__/          # Test files (mirror src structure)
```

### State Management

- **Global State:** React Context for auth, theme, user preferences
- **Local State:** useState for component-specific state
- **Server State:** Custom hooks wrapping Firebase queries
- **Form State:** useForm hook with validation

### Routing

- React Router v6
- Protected routes require authentication
- Lazy loading for code splitting
- Smooth transitions between routes

### Performance Rules

1. **Lazy Load:** Routes, heavy components (Three.js, canvas)
2. **Memoization:** React.memo for list items, useMemo for expensive calculations
3. **Virtualization:** Lists > 50 items use react-window
4. **Debouncing:** User input (300ms), Firestore writes (500ms)
5. **Image Optimization:** WebP format, lazy loading, responsive sizes
6. **Bundle Size:** < 500KB gzipped, code splitting per route

---

## 🎨 Behavioral Rules

### Animation Principles

1. **Context-Aware:**
   - **Writing Areas** (Diary, Novel Editor): Dim animations, focus on content
   - **Exploration Areas** (Dollhouse, Library): Emphasize interactions, environmental effects

2. **Accessibility:**
   - Respect `prefers-reduced-motion`
   - Provide skip animation options
   - Ensure keyboard navigation works

3. **Performance:**
   - GPU acceleration for heavy effects (Three.js, canvas)
   - Conditional rendering based on device capabilities
   - Pause animations when tab inactive

### User Interaction Patterns

#### Idle Detection
- **Trigger:** No mouse movement for 30 seconds
- **Action:** Subtle environmental animations (floating elements, ambient effects)
- **Reset:** Any mouse movement or keyboard input

#### Tab Switching
- **Trigger:** User switches browser tab
- **Action:** Pause animations, show "miss you" message on return
- **Reset:** Tab becomes active again

#### Cursor Inactivity
- **Trigger:** No cursor movement for 10 seconds
- **Action:** Custom cursor effects (glitch, fade, transform)
- **Reset:** Cursor movement

#### Writing Focus
- **Trigger:** User typing in editor
- **Action:** Dim background effects, increase contrast, hide distractions
- **Reset:** Editor loses focus

### Trigger Priority

1. **Writing Focus** (highest priority)
2. **Tab Switching**
3. **Cursor Inactivity**
4. **Idle Detection** (lowest priority)

---

## 🔧 Technical Constraints

### Browser Support

- **Modern Browsers:** Chrome 90+, Firefox 88+, Safari 14+, Edge 90+
- **No IE11 Support:** Use modern JavaScript features freely
- **Mobile:** iOS Safari 14+, Chrome Android 90+

### Device Compatibility

- **Desktop:** Full features, high-quality effects
- **Tablet:** Optimized touch interactions, medium-quality effects
- **Mobile:** Essential features, low-quality effects, simplified UI

### Performance Budgets

- **Initial Load:** < 3s on 3G
- **Time to Interactive:** < 5s
- **Lighthouse Performance:** > 90
- **Lighthouse Accessibility:** > 95
- **Bundle Size:** < 500KB gzipped

### Firebase Constraints

- **Firestore Reads:** Batch queries, use pagination
- **Firestore Writes:** Batch operations, debounce user input
- **Storage Uploads:** Max 5MB per file, compress images
- **Security Rules:** Enforce on server, validate on client

---

## 📝 Code Style

### Naming Conventions

#### Files
- **Components:** PascalCase (e.g., `DollhouseRoom.tsx`)
- **Hooks:** camelCase with `use` prefix (e.g., `useDiaryEntries.ts`)
- **Utils:** camelCase (e.g., `errorHandling.ts`)
- **Types:** PascalCase (e.g., `DiaryEntry.ts`)
- **Tests:** Match source file with `.test.tsx` suffix

#### Variables
- **Components:** PascalCase (e.g., `const StoryCard = () => {}`)
- **Functions:** camelCase (e.g., `const handleSubmit = () => {}`)
- **Constants:** UPPER_SNAKE_CASE (e.g., `const MAX_FILE_SIZE = 5000000`)
- **Types/Interfaces:** PascalCase (e.g., `interface DiaryEntry {}`)

#### CSS Classes
- **TailwindCSS:** Utility-first, no custom CSS unless necessary
- **Custom Classes:** kebab-case (e.g., `.parchment-scroll`)
- **BEM for Complex Components:** `.block__element--modifier`

### File Organization

```typescript
// 1. Imports (grouped and sorted)
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/shared/Button';
import { useDiaryEntries } from '@/hooks/useDiaryEntries';
import type { DiaryEntry } from '@/types/diary';

// 2. Types/Interfaces
interface DiaryViewProps {
  userId: string;
  onEntryClick: (entry: DiaryEntry) => void;
}

// 3. Constants
const MAX_ENTRIES_PER_PAGE = 20;

// 4. Component
export const DiaryView: React.FC<DiaryViewProps> = ({ userId, onEntryClick }) => {
  // 4a. Hooks
  const navigate = useNavigate();
  const { entries, loading, error } = useDiaryEntries(userId);
  const [selectedEntry, setSelectedEntry] = useState<DiaryEntry | null>(null);

  // 4b. Effects
  useEffect(() => {
    // Effect logic
  }, []);

  // 4c. Handlers
  const handleEntryClick = (entry: DiaryEntry) => {
    setSelectedEntry(entry);
    onEntryClick(entry);
  };

  // 4d. Render helpers
  const renderEntry = (entry: DiaryEntry) => {
    return <div key={entry.id}>{entry.title}</div>;
  };

  // 4e. Early returns
  if (loading) return <LoadingState />;
  if (error) return <ErrorState error={error} />;

  // 4f. Main render
  return (
    <div className="diary-view">
      {entries.map(renderEntry)}
    </div>
  );
};
```

### Comment Standards

```typescript
// ✅ Good: Explain WHY, not WHAT
// Debounce to prevent excessive Firestore writes
const debouncedSave = useMemo(() => debounce(saveEntry, 500), []);

// ❌ Bad: Obvious comments
// Set the title
setTitle(newTitle);

// ✅ Good: Document complex logic
/**
 * Calculate integrity index based on:
 * - Number of contributors
 * - Proposal approval rate
 * - Edit frequency
 * - Community engagement
 */
const calculateIntegrityIndex = (project: Project): number => {
  // Implementation
};

// ✅ Good: TODOs with context
// TODO: Implement pagination when entries > 100 (performance optimization)
```

---

## 🎨 Design System

### Color Palette

```typescript
// Gothic Theme
const colors = {
  // Primary
  crimson: '#8B0000',
  deepPurple: '#4A0E4E',
  midnight: '#1a1a2e',
  
  // Accents
  gold: '#D4AF37',
  silver: '#C0C0C0',
  ghostWhite: '#F8F8FF',
  
  // Semantic
  success: '#10b981',
  warning: '#f59e0b',
  error: '#ef4444',
  info: '#3b82f6',
};
```

### Typography

```typescript
// Font Families
const fonts = {
  heading: '"Cinzel", serif',           // Gothic headings
  body: '"Crimson Text", serif',        // Readable body text
  mono: '"Courier Prime", monospace',   // Typewriter effect
  handwriting: '"Shadows Into Light", cursive', // Personal touch
};

// Font Sizes (Tailwind scale)
// text-xs, text-sm, text-base, text-lg, text-xl, text-2xl, text-3xl, text-4xl
```

### Spacing

```typescript
// Use Tailwind spacing scale
// p-2, p-4, p-6, p-8, p-12, p-16, p-24
// m-2, m-4, m-6, m-8, m-12, m-16, m-24
// gap-2, gap-4, gap-6, gap-8
```

### Shadows

```typescript
const shadows = {
  sm: '0 1px 2px 0 rgba(0, 0, 0, 0.05)',
  md: '0 4px 6px -1px rgba(0, 0, 0, 0.1)',
  lg: '0 10px 15px -3px rgba(0, 0, 0, 0.1)',
  xl: '0 20px 25px -5px rgba(0, 0, 0, 0.1)',
  gothic: '0 0 20px rgba(139, 0, 0, 0.5)', // Crimson glow
};
```

---

## 🔒 Security Guidelines

### Authentication

- Use Firebase Auth exclusively
- Store JWT tokens in httpOnly cookies (if using custom backend)
- Implement refresh token rotation
- Logout on token expiration

### Authorization

- Enforce permissions in Firestore security rules
- Validate on client for UX, enforce on server
- Use role-based access control (RBAC)

### Data Validation

```typescript
// Client-side validation
const validateDiaryEntry = (entry: Partial<DiaryEntry>): ValidationResult => {
  if (!entry.title || entry.title.length < 3) {
    return { valid: false, error: 'Title must be at least 3 characters' };
  }
  if (!entry.content || entry.content.length < 10) {
    return { valid: false, error: 'Content must be at least 10 characters' };
  }
  return { valid: true };
};

// Server-side validation (Firestore rules)
// match /diaryEntries/{entryId} {
//   allow create: if request.auth != null
//     && request.resource.data.title is string
//     && request.resource.data.title.size() >= 3
//     && request.resource.data.content is string
//     && request.resource.data.content.size() >= 10;
// }
```

### Sensitive Data

- **Encrypt:** Diary entries (client-side before upload)
- **Hash:** Passwords (Firebase handles this)
- **Sanitize:** User input (prevent XSS)
- **Redact:** PII in logs and error messages

---

## 🧪 Testing Guidelines

### Test Structure

```typescript
describe('DiaryView', () => {
  // Setup
  beforeEach(() => {
    // Reset mocks, clear storage
  });

  // Happy path
  it('should render diary entries', () => {
    // Test
  });

  // Edge cases
  it('should handle empty entries', () => {
    // Test
  });

  it('should handle loading state', () => {
    // Test
  });

  it('should handle error state', () => {
    // Test
  });

  // User interactions
  it('should navigate to entry detail on click', () => {
    // Test
  });

  // Cleanup
  afterEach(() => {
    // Cleanup
  });
});
```

### Test Coverage Goals

- **Unit Tests:** > 80% coverage
- **Integration Tests:** Critical user flows
- **E2E Tests:** Happy path + error scenarios

### Mock Data

- Use factories for consistent test data
- Store in `src/data/` or `src/__tests__/fixtures/`
- Never use production data in tests

---

## 📚 Documentation Standards

### Component Documentation

```typescript
/**
 * DiaryView displays a list of diary entries for a user.
 * 
 * Features:
 * - Pagination (20 entries per page)
 * - Search and filter
 * - Mood-based color coding
 * - Encrypted entry preview
 * 
 * @param userId - The ID of the user whose entries to display
 * @param onEntryClick - Callback when an entry is clicked
 * 
 * @example
 * ```tsx
 * <DiaryView
 *   userId="user123"
 *   onEntryClick={(entry) => navigate(`/diary/${entry.id}`)}
 * />
 * ```
 */
export const DiaryView: React.FC<DiaryViewProps> = ({ userId, onEntryClick }) => {
  // Implementation
};
```

### Hook Documentation

```typescript
/**
 * useDiaryEntries fetches and manages diary entries for a user.
 * 
 * Features:
 * - Real-time updates via Firestore listener
 * - Automatic decryption
 * - Error handling with retry logic
 * - Pagination support
 * 
 * @param userId - The ID of the user whose entries to fetch
 * @param options - Optional configuration (limit, orderBy, etc.)
 * 
 * @returns Object containing entries, loading state, error, and actions
 * 
 * @example
 * ```tsx
 * const { entries, loading, error, refresh } = useDiaryEntries('user123', {
 *   limit: 20,
 *   orderBy: 'createdAt',
 *   order: 'desc'
 * });
 * ```
 */
export const useDiaryEntries = (userId: string, options?: QueryOptions) => {
  // Implementation
};
```

---

## 🚀 Deployment Guidelines

### Environment Variables

```bash
# Development
VITE_FIREBASE_API_KEY=dev_key
VITE_FIREBASE_PROJECT_ID=grimoire-dev

# Production
VITE_FIREBASE_API_KEY=prod_key
VITE_FIREBASE_PROJECT_ID=grimoire-prod
```

### Build Process

1. **Lint:** `pnpm lint`
2. **Type Check:** `pnpm type-check`
3. **Test:** `pnpm test`
4. **Build:** `pnpm build`
5. **Deploy:** `pnpm deploy:vercel`

### Pre-Deployment Checklist

- [ ] All tests passing
- [ ] No console errors or warnings
- [ ] Lighthouse scores > 90
- [ ] Security rules deployed
- [ ] Environment variables set
- [ ] Error tracking configured
- [ ] Analytics configured

---

## 🔄 Continuous Improvement

### Refactoring Triggers

- Component > 300 lines → Split into smaller components
- Hook > 150 lines → Extract logic into utilities
- Duplicate code in 3+ places → Create shared utility
- Performance issues → Profile and optimize

### Code Review Checklist

- [ ] Follows naming conventions
- [ ] Includes tests
- [ ] Documented (if complex)
- [ ] No console.logs
- [ ] No hardcoded values
- [ ] Accessible (keyboard navigation, ARIA labels)
- [ ] Responsive (mobile, tablet, desktop)
- [ ] Performance optimized (memoization, lazy loading)

---

## 📞 Questions to Ask Kiro

### Refactoring
- "Should I extract this logic into a custom hook? Yes or No"
- "Apply React.memo to this component? Yes or No"
- "Batch these Firestore writes? Yes or No"

### Performance
- "Lazy load this component? Yes or No"
- "Use virtualization for this list? Yes or No"
- "Debounce this input handler? Yes or No"

### Testing
- "Generate unit tests for this component? Yes or No"
- "Add integration test for this flow? Yes or No"
- "Mock this Firebase call? Yes or No"

### Architecture
- "Move this to a shared component? Yes or No"
- "Create a custom hook for this logic? Yes or No"
- "Split this component into smaller pieces? Yes or No"

---

**Last Updated:** December 2, 2024  
**Version:** 1.0.0
