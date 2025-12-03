# Font System Audit Report

## Executive Summary

After auditing the typography system across GRIMOIRE, I've identified several inconsistencies and areas for improvement in font usage, hierarchy, and readability.

## Current State

### Font Configuration (Tailwind)
- **Playfair Display** - serif, display
- **Cormorant Garamond** - serif, elegant
- **Inter** - sans-serif, UI
- **Lora** - serif
- **Parisienne** - cursive, decorative
- **Petit Formal Script** - cursive

### Design System Tokens
Multiple typography systems exist:
1. `tokens.ts` - Base system
2. `unified-tokens.ts` - Cross-room consistency
3. `regency-typography.ts` - Period-accurate fonts
4. `costume-themes.ts` - Theme-specific fonts

## Issues Identified

### 1. **Inconsistent Font Application**
- Components use inline `font-serif` classes without standardization
- No clear hierarchy between heading levels
- Mix of serif and sans-serif without clear purpose

### 2. **Missing Font Hierarchy**
- H1, H2, H3, H4, H5, H6 not clearly defined
- Body text sizes vary across components
- Label and UI text inconsistent

### 3. **Readability Concerns**
- Some decorative fonts used for body text
- Insufficient contrast in font weights
- Line heights not optimized for reading

### 4. **Performance Issues**
- Loading 6 font families (unnecessary)
- No font-display strategy
- Missing font subsetting

## Recommendations

### 1. Establish Clear Hierarchy

```typescript
// Typography Scale
H1: 3rem (48px) - Page titles
H2: 2.25rem (36px) - Section headers
H3: 1.875rem (30px) - Subsection headers
H4: 1.5rem (24px) - Card titles
H5: 1.25rem (20px) - Small headers
H6: 1.125rem (18px) - Labels
Body: 1rem (16px) - Main content
Small: 0.875rem (14px) - Captions
XSmall: 0.75rem (12px) - Footnotes
```

### 2. Font Family Usage Rules

**Display (Playfair Display)**
- Page titles (H1)
- Hero sections
- Dramatic headers

**Body (Cormorant Garamond)**
- All body text
- Paragraphs
- Long-form content

**UI (Inter)**
- Buttons
- Form labels
- Navigation
- System messages

**Decorative (Parisienne) - Use Sparingly**
- Special accents only
- Not for readability

### 3. Remove Unused Fonts
- **Lora** - Redundant with Cormorant
- **Petit Formal Script** - Rarely used

### 4. Implement Font Loading Strategy

```typescript
// Add to index.html
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link href="https://fonts.googleapis.com/css2?family=Playfair+Display:wght@400;600;700&family=Cormorant+Garamond:wght@300;400;500;600&family=Inter:wght@400;500;600&display=swap" rel="stylesheet">
```

## Implementation Plan

### Phase 1: Create Typography Utility Classes
- Define reusable text styles
- Create component variants

### Phase 2: Update Components
- Apply consistent heading hierarchy
- Standardize body text
- Fix button/label fonts

### Phase 3: Optimize Performance
- Remove unused fonts
- Add font-display: swap
- Implement font subsetting

### Phase 4: Documentation
- Create typography guide
- Add usage examples
- Document accessibility considerations

## Accessibility Notes

- Minimum font size: 14px for body text
- Line height: 1.5-1.75 for readability
- Sufficient color contrast (WCAG AA)
- Avoid all-caps for long text
- Use proper semantic HTML (h1-h6)

## Next Steps

1. Create unified typography utility file
2. Update tailwind.config.js
3. Audit and update all components
4. Test across different themes
5. Validate accessibility
