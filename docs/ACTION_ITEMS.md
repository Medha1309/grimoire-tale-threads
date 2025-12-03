# Action Items - What Needs to Be Done

## ✅ COMPLETED

### Navigation Improvements
- [x] Smart back button implemented
- [x] 404 page created
- [x] Keyboard navigation added
- [x] Accessibility features added
- [x] 4 pages updated to use smart back
- [x] Documentation complete

**Status:** DONE - No further action needed

## ⚠️ NEEDS ATTENTION

### Design System Adoption

The design system exists and is fully documented, but **it's not being used** in the components. Here's what needs to happen:

#### 1. Verify Design System Works
**Priority:** HIGH  
**Effort:** 1 hour

Test that the design system can be imported and used:

```tsx
// Test in any component
import { PageContainer, Stack } from '@/components/layouts/LayoutComponents';
import { getThemeColors } from '@/design-system';

// If this works, proceed to step 2
```

#### 2. Migrate Core Pages
**Priority:** HIGH  
**Effort:** 1-2 days per page

Migrate these pages to use the design system:

**Landing Page** (`src/pages/Landing.tsx`)
- Replace inline spacing with PageContainer
- Replace hardcoded colors with theme colors
- Use Stack for vertical spacing

**Forum Page** (`src/pages/Forum.tsx`)
- Replace inline spacing with PageContainer
- Use Grid for post layout
- Use Parlour theme colors

**Stories Page** (`src/pages/Stories.tsx`)
- Replace inline spacing with PageContainer
- Use Grid for story cards
- Use neutral theme colors

**Dollhouse Page** (`src/pages/Dollhouse.tsx`)
- Replace inline spacing with PageContainer
- Use Stack for room layout
- Use Dollhouse theme colors

#### 3. Migrate Shared Components
**Priority:** MEDIUM  
**Effort:** 2-3 hours per component

Update these components:

**Button** (`src/components/shared/Button.tsx`)
- Use spacing system for padding
- Use theme colors
- Use touch targets

**Card** (`src/components/shared/Card.tsx`)
- Replace with layout Card component
- Use theme colors

**Modal** (`src/components/shared/Modal.tsx`)
- Use PageContainer
- Use Stack
- Use theme colors

#### 4. Update Component Documentation
**Priority:** LOW  
**Effort:** 1-2 hours

Update component docs to show design system usage:
- Add import examples
- Add usage examples
- Add migration notes

## 📋 DETAILED MIGRATION STEPS

### Step 1: Test Import (5 minutes)

Create a test file to verify imports work:

```tsx
// src/test-design-system.tsx
import { PageContainer, Stack, Grid, Card } from '@/components/layouts/LayoutComponents';
import { getThemeColors, semanticColors } from '@/design-system';

export const TestDesignSystem = () => {
  const dollhouse = getThemeColors('dollhouse');
  
  return (
    <PageContainer size="xl">
      <Stack spacing="md">
        <h1 style={{ color: dollhouse.primary }}>Design System Test</h1>
        <Grid cols={{ sm: 1, md: 2, lg: 3 }} gap="md">
          <Card padding="md">Card 1</Card>
          <Card padding="md">Card 2</Card>
          <Card padding="md">Card 3</Card>
        </Grid>
      </Stack>
    </PageContainer>
  );
};
```

If this compiles and runs, proceed to Step 2.

### Step 2: Migrate One Page (1-2 hours)

Pick the simplest page (probably Stories) and migrate it:

**Before:**
```tsx
<div className="relative min-h-screen px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
  <div className="max-w-7xl mx-auto">
    <div className="space-y-6">
      {/* Content */}
    </div>
  </div>
</div>
```

**After:**
```tsx
import { PageContainer, Stack } from '@/components/layouts/LayoutComponents';

<PageContainer size="xl">
  <Stack spacing="md">
    {/* Content */}
  </Stack>
</PageContainer>
```

### Step 3: Test Migrated Page (30 minutes)

Test on:
- [ ] Desktop (1920px)
- [ ] Tablet (768px)
- [ ] Mobile (375px)

Verify:
- [ ] Looks identical to before
- [ ] Spacing is correct
- [ ] Colors are correct
- [ ] Responsive behavior works

### Step 4: Repeat for Other Pages (1-2 days)

Once one page works, repeat for:
1. Landing page
2. Forum page
3. Dollhouse page

### Step 5: Update Shared Components (1 day)

Migrate Button, Card, Modal to use design system.

### Step 6: Clean Up (2 hours)

- Remove unused Tailwind classes
- Update documentation
- Create PR for review

## 🎯 SUCCESS CRITERIA

### Navigation (Already Met ✅)
- [x] Smart back button works
- [x] 404 page displays
- [x] Keyboard shortcuts work
- [x] Skip links work
- [x] No TypeScript errors

### Design System (To Be Met)
- [ ] At least 3 pages use design system
- [ ] At least 3 components use design system
- [ ] No visual regressions
- [ ] No TypeScript errors
- [ ] Documentation updated

## 📊 EFFORT ESTIMATE

| Task | Priority | Effort | Status |
|------|----------|--------|--------|
| Navigation improvements | HIGH | 4 hours | ✅ DONE |
| Test design system imports | HIGH | 1 hour | ⚠️ TODO |
| Migrate Landing page | HIGH | 2 hours | ⚠️ TODO |
| Migrate Forum page | HIGH | 2 hours | ⚠️ TODO |
| Migrate Stories page | HIGH | 2 hours | ⚠️ TODO |
| Migrate Dollhouse page | HIGH | 2 hours | ⚠️ TODO |
| Migrate Button component | MEDIUM | 1 hour | ⚠️ TODO |
| Migrate Card component | MEDIUM | 1 hour | ⚠️ TODO |
| Migrate Modal component | MEDIUM | 1 hour | ⚠️ TODO |
| Update documentation | LOW | 2 hours | ⚠️ TODO |

**Total Remaining:** ~15 hours (2 days)

## 🚀 QUICK START

If you want to start using the design system right now:

1. **Import the components:**
```tsx
import { PageContainer, Stack, Grid, Card } from '@/components/layouts/LayoutComponents';
```

2. **Import the colors:**
```tsx
import { getThemeColors, semanticColors } from '@/design-system';
```

3. **Use them:**
```tsx
const theme = getThemeColors('dollhouse');

<PageContainer size="xl">
  <Stack spacing="md">
    <h1 style={{ color: theme.primary }}>Hello World</h1>
  </Stack>
</PageContainer>
```

## 📚 DOCUMENTATION

All documentation is ready:
- `docs/SPACING_LAYOUT_GUIDE.md` - How to use spacing
- `docs/COLOR_SYSTEM_GUIDE.md` - How to use colors
- `docs/TYPOGRAPHY_GUIDE.md` - How to use typography
- `DESIGN_SYSTEM_READY_TO_USE.md` - Quick start guide
- `DESIGN_SYSTEM_IMPLEMENTATION_STATUS.md` - Detailed status

## ❓ QUESTIONS?

If you're unsure about anything:
1. Check the documentation in `docs/`
2. Look at `DESIGN_SYSTEM_READY_TO_USE.md`
3. Check the examples in the guide files

## 🎉 CONCLUSION

**Navigation:** ✅ Complete and working  
**Design System:** ⚠️ Ready but needs adoption

The hard work is done - the design system is built and documented. Now it just needs to be used in the components. Start with one page, verify it works, then migrate the rest.

