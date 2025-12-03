# GRIMR Architecture

## Component Hierarchy

```
App.tsx (Root)
├── TitleBarScare (Global effect)
├── Header (Navigation)
└── Main (Page Router)
    ├── Landing
    │   ├── BloodCursor
    │   └── SpiderField
    ├── Stories (Library)
    │   ├── DirtyFlies
    │   ├── EerieCandle
    │   ├── BloodCursor
    │   └── PageTearOverlay (transition)
    ├── Reader
    │   ├── NoiseVignette
    │   ├── EerieCandle (x2)
    │   └── BloodCursor
    ├── Contact
    │   ├── SwingingLamp
    │   ├── FliesAroundLamp
    │   ├── ContactFadeIn (transition)
    │   └── BloodCursor
    └── About
        ├── DirtyFlies
        └── SpiderField
```

## Data Flow

```
App.tsx
  ↓ (page state, navigation function)
Pages (Landing, Stories, Reader, Contact, About)
  ↓ (props, event handlers)
Components (Effects, Creatures, UI)
  ↓ (render)
DOM
```

## Component Categories

### 1. Pages (`src/pages/`)
Top-level route components that compose smaller components.

**Responsibilities:**
- Page layout and structure
- State management for page-specific features
- Composition of effects and UI components
- Navigation handling

### 2. Effects (`src/components/Effects.tsx`)
Interactive visual effects triggered by user actions or events.

**Characteristics:**
- Event-driven
- Temporary/transient
- User interaction focused

### 3. Creatures (`src/components/Creatures.tsx`)
Animated entities that move around the screen.

**Characteristics:**
- Continuous animation
- Path-based movement
- Randomized behavior

### 4. Atmospheric Effects (`src/components/AtmosphericEffects.tsx`)
Ambient visual effects that create mood and atmosphere.

**Characteristics:**
- Always present (when used)
- Subtle and background
- Mood-setting

### 5. UI Components (`src/components/UIComponents.tsx`)
Reusable interface elements with specific visual purposes.

**Characteristics:**
- Stateful (internal state)
- Reusable across pages
- Self-contained

## State Management

### Global State
- Current page (`App.tsx`)
- Current story slug (`App.tsx`)

### Local State
Each page manages its own:
- Animation states
- Form data (Contact)
- Progress tracking (Reader)
- Flicker effects (Stories, Reader)

### Component State
Components manage their own:
- Animation timings
- Random variations
- Visibility toggles

## Styling Strategy

### Tailwind CSS
- Utility-first approach
- Responsive design with breakpoints
- Dark theme (zinc palette)
- Custom animations via inline styles

### Color Palette
- Background: `black`, `zinc-950`
- Text: `zinc-100` to `zinc-700`
- Accents: `red-950`, `amber-900`
- Borders: `zinc-900/40` to `zinc-800`

### Typography
- Primary: `font-serif` (ui-serif)
- Tracking: Wide letter spacing for horror aesthetic
- Sizes: Responsive with `text-*` utilities

## Animation Strategy

### Framer Motion
- Page transitions: `AnimatePresence` with fade
- Hover effects: `whileHover` on interactive elements
- Continuous: `animate` with `repeat: Infinity`

### CSS Animations
- Keyframe animations for complex paths
- Transform-based for performance
- Opacity transitions for subtlety

## Performance Considerations

### Optimizations
1. **useMemo**: Random values calculated once
2. **useEffect cleanup**: Proper interval/timeout cleanup
3. **Pointer events**: `pointer-events-none` on decorative elements
4. **Z-index layers**: Organized stacking context
5. **Transform animations**: GPU-accelerated

### Bundle Size
- Production build: ~291KB (92KB gzipped)
- Code splitting: Pages could be lazy-loaded
- Tree shaking: Unused exports eliminated

## Accessibility

### Current Implementation
- Semantic HTML structure
- `aria-hidden` on decorative elements
- Keyboard navigation on interactive elements
- Focus states on buttons/links

### Future Improvements
- ARIA labels for screen readers
- Skip navigation links
- Reduced motion preferences
- High contrast mode support

## Browser Compatibility

### Target Browsers
- Modern evergreen browsers
- ES2020+ features
- CSS Grid and Flexbox
- CSS custom properties

### Fallbacks
- Graceful degradation for older browsers
- Progressive enhancement approach
- Feature detection where needed

## Development Workflow

### Local Development
```bash
npm run dev    # Start dev server
npm run build  # Production build
npm run preview # Preview production build
```

### File Organization
```
src/
├── App.tsx              # Entry component
├── main.tsx             # React mount point
├── index.css            # Global styles
├── types/               # TypeScript definitions
├── constants/           # Static data
├── components/          # Reusable components
│   ├── index.ts        # Barrel export
│   ├── Effects.tsx
│   ├── Creatures.tsx
│   ├── AtmosphericEffects.tsx
│   └── UIComponents.tsx
└── pages/               # Route components
    ├── index.ts        # Barrel export
    ├── Landing.tsx
    ├── Stories.tsx
    ├── Reader.tsx
    ├── Contact.tsx
    └── About.tsx
```

## Testing Strategy (Future)

### Unit Tests
- Component rendering
- State management
- Event handlers
- Utility functions

### Integration Tests
- Page navigation
- Form submission
- Animation sequences
- User interactions

### E2E Tests
- Full user flows
- Cross-browser testing
- Performance benchmarks
- Accessibility audits

## Deployment

### Build Output
```
dist/
├── index.html
├── assets/
│   ├── index-[hash].js
│   ├── index-[hash].css
│   └── favicon-[hash].ico
```

### Hosting Options
- Static hosting (Vercel, Netlify, GitHub Pages)
- CDN distribution
- Edge deployment
- Container deployment

## Future Enhancements

### Code Quality
- [ ] Add ESLint configuration
- [ ] Add Prettier formatting
- [ ] Add Husky pre-commit hooks
- [ ] Add unit tests with Vitest
- [ ] Add Storybook for component development

### Features
- [ ] Story content management
- [ ] User authentication
- [ ] Reading progress persistence
- [ ] Dark/light theme toggle
- [ ] Sound effects
- [ ] More horror effects

### Performance
- [ ] Lazy load pages
- [ ] Image optimization
- [ ] Code splitting
- [ ] Service worker caching
- [ ] Performance monitoring

### Accessibility
- [ ] WCAG 2.1 AA compliance
- [ ] Screen reader testing
- [ ] Keyboard navigation improvements
- [ ] Focus management
- [ ] Reduced motion support
