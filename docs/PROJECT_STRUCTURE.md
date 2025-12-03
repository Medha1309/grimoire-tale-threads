# GRIMR Project Structure (After Refactoring)

## 📁 Directory Tree

```
grimr-starter/
├── src/
│   ├── components/
│   │   ├── backgrounds/          ⭐ NEW
│   │   │   ├── ForestBackground.tsx    (172 lines)
│   │   │   └── PaperTexture.tsx        (104 lines)
│   │   ├── library/               ⭐ NEW
│   │   │   └── TorchEffect.tsx         (86 lines)
│   │   ├── ui/
│   │   │   ├── Avatar.tsx
│   │   │   ├── Badge.tsx
│   │   │   ├── Button.tsx
│   │   │   ├── Card.tsx
│   │   │   ├── Input.tsx
│   │   │   ├── Loader.tsx
│   │   │   ├── Modal.tsx
│   │   │   ├── Toast.tsx
│   │   │   └── index.ts
│   │   ├── AtmosphericEffects.tsx
│   │   ├── Creatures.tsx
│   │   ├── Effects.tsx
│   │   ├── Footer.tsx
│   │   ├── Navbar.tsx
│   │   ├── UIComponents.tsx
│   │   └── index.ts
│   ├── constants/
│   │   └── index.ts               ✨ REFACTORED (2 lines)
│   ├── data/                      ⭐ NEW
│   │   └── stories.ts             (238 lines)
│   ├── pages/
│   │   ├── About.tsx
│   │   ├── Compose.tsx            ✨ REFACTORED (375 lines, was 477)
│   │   ├── Contact.tsx            ✨ REFACTORED (163 lines, was 570)
│   │   ├── Landing.tsx
│   │   ├── Login.tsx
│   │   ├── Reader.tsx
│   │   ├── SignUp.tsx
│   │   ├── Stories.tsx            ✨ REFACTORED (254 lines, was 324)
│   │   ├── StoryDetail.tsx
│   │   └── index.ts
│   ├── types/
│   │   └── index.ts
│   ├── App.tsx
│   ├── index.css
│   ├── main.tsx
│   └── SkullSceneAbout.tsx
├── public/
│   └── models/
├── Documentation/
│   ├── REFACTORING_COMPLETE_2.md
│   ├── REFACTORING_SUMMARY_FINAL.md
│   └── PROJECT_STRUCTURE.md       (this file)
├── index.html
├── package.json
├── tailwind.config.js
├── tsconfig.json
└── vite.config.ts
```

## 📊 Component Relationships

### Page → Component Dependencies

```
Contact.tsx
  └── ForestBackground
      ├── HardwoodTree (internal)
      ├── PineTree (internal)
      └── SmallTrees (internal)

Compose.tsx
  └── PaperTexture
      ├── ScissorCursor
      ├── ScissorCuts
      ├── TornPaperEdge
      ├── InkStains
      └── PaperTextureOverlay

Stories.tsx
  └── TorchEffect
      ├── TorchEffect (component)
      ├── DarkOverlay (component)
      └── useTorchPosition (hook)
```

## 🎯 Component Categories

### 1. Background Effects
**Location:** `src/components/backgrounds/`

- **ForestBackground.tsx**
  - Atmospheric forest scene
  - Weather effects (rain, lightning)
  - Animated trees and fog
  - Used in: Contact page

- **PaperTexture.tsx**
  - Writing/paper effects
  - Scissor animations
  - Torn edges and ink stains
  - Used in: Compose page

### 2. Library Components
**Location:** `src/components/library/`

- **TorchEffect.tsx**
  - Interactive torch light
  - Dark overlay with masking
  - Mouse tracking hook
  - Used in: Stories page

### 3. UI Components
**Location:** `src/components/ui/`

- Form elements (Input, Button)
- Display components (Card, Badge, Avatar)
- Feedback (Toast, Modal, Loader)
- Used across: All pages

### 4. Atmospheric Effects
**Location:** `src/components/`

- **AtmosphericEffects.tsx** - Noise, vignette
- **Creatures.tsx** - Spiders, flies
- **Effects.tsx** - Blood cursor, candles
- Used across: Multiple pages

### 5. Layout Components
**Location:** `src/components/`

- **Navbar.tsx** - Navigation
- **Footer.tsx** - Footer
- **UIComponents.tsx** - Shared UI patterns
- Used across: All pages

## 📦 Data Layer

### Story Data
**Location:** `src/data/stories.ts`

```typescript
export const HORROR_QUOTES: string[]
export const STORY_CONTENT: Record<string, StoryPage[]>
export const STORIES: Story[]
```

**Consumed by:**
- `src/constants/index.ts` (re-exports)
- `src/pages/Stories.tsx`
- `src/pages/StoryDetail.tsx`
- `src/pages/Reader.tsx`

## 🔄 Import Flow

```
Pages
  ↓
Components (backgrounds, library, ui)
  ↓
Effects & Utilities
  ↓
Data & Constants
  ↓
Types
```

## 📈 File Size Distribution

### Pages (Presentation Layer)
```
Compose.tsx     ████████████████████████████████████ 375 lines
Stories.tsx     ████████████████████████ 254 lines
Contact.tsx     ████████████████ 163 lines
```

### Components (Reusable Layer)
```
ForestBackground.tsx  ████████████████ 172 lines
PaperTexture.tsx      ██████████ 104 lines
TorchEffect.tsx       ████████ 86 lines
```

### Data Layer
```
stories.ts      ██████████████████████ 238 lines
constants.ts    █ 2 lines
```

## 🎨 Styling Approach

- **Tailwind CSS** for utility classes
- **Framer Motion** for animations
- **Inline styles** for dynamic/complex effects
- **CSS gradients** for atmospheric effects

## 🚀 Build Configuration

- **Vite** - Build tool
- **TypeScript** - Type safety
- **React** - UI framework
- **PostCSS** - CSS processing
- **Tailwind** - Utility CSS

## 📝 Notes

### Refactoring Benefits
1. **Modularity:** Clear separation of concerns
2. **Reusability:** Components can be used across pages
3. **Maintainability:** Easier to find and update code
4. **Performance:** Smaller bundle sizes per page
5. **Scalability:** Easy to add new pages/features

### Future Improvements
- [ ] Add unit tests for components
- [ ] Create Storybook documentation
- [ ] Implement lazy loading for heavy components
- [ ] Extract more shared patterns
- [ ] Add component prop documentation
