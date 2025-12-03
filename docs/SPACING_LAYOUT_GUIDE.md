# Spacing & Layout Guide

## Overview

GRIMOIRE uses a unified spacing and layout system to ensure consistent padding, margins, and responsive behavior across all screen sizes.

## Spacing Scale

### Base Scale (4px increments)

```typescript
0:  0px
1:  4px
2:  8px
3:  12px
4:  16px
5:  20px
6:  24px
8:  32px
10: 40px
12: 48px
16: 64px
20: 80px
24: 96px
32: 128px
```

### Semantic Spacing

```typescript
// Page-level
page: {
  mobile: 16px,
  tablet: 24px,
  desktop: 32px,
}

// Section spacing
section: {
  mobile: 32px,
  tablet: 48px,
  desktop: 64px,
}

// Component spacing
component: {
  xs: 8px,
  sm: 12px,
  md: 16px,
  lg: 24px,
  xl: 32px,
}

// Gap spacing
gap: {
  xs: 8px,
  sm: 16px,
  md: 24px,
  lg: 32px,
  xl: 48px,
}
```

## Container Widths

```typescript
sm:  640px   // Forms, narrow content
md:  768px   // Modals, cards
lg:  1024px  // Standard pages
xl:  1280px  // Wide pages (default)
2xl: 1536px  // Full width pages

// Semantic
article: 65ch  // Optimal reading width
form: 640px    // Form layouts
modal: 768px   // Modal dialogs
page: 1280px   // Standard page width
```

## Breakpoints

```typescript
sm:  640px   // Mobile landscape
md:  768px   // Tablet
lg:  1024px  // Desktop
xl:  1280px  // Large desktop
2xl: 1536px  // Extra large
```

## Layout Components

### PageContainer

Wraps entire page with consistent padding and max-width.

```tsx
import { PageContainer } from '@/components/layouts/LayoutComponents';

<PageContainer size="xl">
  <YourContent />
</PageContainer>

// Props
size?: 'sm' | 'md' | 'lg' | 'xl' | '2xl' | 'full'  // Default: 'xl'
noPadding?: boolean  // Remove padding
```

### Section

Content sections with vertical spacing.

```tsx
import { Section } from '@/components/layouts/LayoutComponents';

<Section spacing="md">
  <SectionContent />
</Section>

// Props
spacing?: 'xs' | 'sm' | 'md' | 'lg' | 'xl'  // Default: 'md'
```

### Stack

Vertical or horizontal spacing between children.

```tsx
import { Stack } from '@/components/layouts/LayoutComponents';

<Stack spacing="md" direction="vertical">
  <Item1 />
  <Item2 />
  <Item3 />
</Stack>

// Props
spacing?: 'xs' | 'sm' | 'md' | 'lg' | 'xl'  // Default: 'md'
direction?: 'vertical' | 'horizontal'  // Default: 'vertical'
```

### Grid

Responsive grid layout.

```tsx
import { Grid } from '@/components/layouts/LayoutComponents';

<Grid cols={{ sm: 1, md: 2, lg: 3 }} gap="md">
  <GridItem />
  <GridItem />
  <GridItem />
</Grid>

// Props
cols?: { sm?: number; md?: number; lg?: number }
gap?: 'xs' | 'sm' | 'md' | 'lg' | 'xl'  // Default: 'md'
```

### Card

Content card with consistent padding.

```tsx
import { Card } from '@/components/layouts/LayoutComponents';

<Card padding="md">
  <CardContent />
</Card>

// Props
padding?: 'xs' | 'sm' | 'md' | 'lg' | 'xl'  // Default: 'md'
variant?: 'default' | 'large'  // Default: 'default'
```

### Flex

Flexible box layout.

```tsx
import { Flex } from '@/components/layouts/LayoutComponents';

<Flex align="center" justify="between" gap="md">
  <FlexItem />
  <FlexItem />
</Flex>

// Props
align?: 'start' | 'center' | 'end' | 'stretch'
justify?: 'start' | 'center' | 'end' | 'between' | 'around'
gap?: 'xs' | 'sm' | 'md' | 'lg' | 'xl'
wrap?: boolean
```

### Center

Center content horizontally and vertically.

```tsx
import { Center } from '@/components/layouts/LayoutComponents';

<Center>
  <CenteredContent />
</Center>
```

### Spacer

Add space between elements.

```tsx
import { Spacer } from '@/components/layouts/LayoutComponents';

<Component1 />
<Spacer size="md" direction="vertical" />
<Component2 />

// Props
size?: 'xs' | 'sm' | 'md' | 'lg' | 'xl'
direction?: 'vertical' | 'horizontal'
```

### Divider

Visual separator with spacing.

```tsx
import { Divider } from '@/components/layouts/LayoutComponents';

<Section1 />
<Divider spacing="md" />
<Section2 />

// Props
spacing?: 'xs' | 'sm' | 'md' | 'lg' | 'xl'
```

## Responsive Spacing Utilities

### Page Padding

```tsx
// Mobile: 16px, Tablet: 24px, Desktop: 32px
className="px-4 sm:px-6 lg:px-8"
```

### Section Spacing

```tsx
// Mobile: 32px, Tablet: 48px, Desktop: 64px
className="py-8 sm:py-12 lg:py-16"
```

### Component Padding

```tsx
// Mobile: 16px, Tablet: 24px
className="p-4 sm:p-6"

// Large variant
className="p-6 sm:p-8"
```

### Gap Utilities

```tsx
// Extra small
className="gap-2 sm:gap-3"

// Small
className="gap-4 sm:gap-6"

// Medium
className="gap-6 sm:gap-8"

// Large
className="gap-8 sm:gap-12"

// Extra large
className="gap-12 sm:gap-16"
```

### Stack Spacing

```tsx
// Vertical spacing
className="space-y-4 sm:space-y-6"  // Small
className="space-y-6 sm:space-y-8"  // Medium
className="space-y-8 sm:space-y-12" // Large

// Horizontal spacing
className="space-x-4 sm:space-x-6"  // Small
className="space-x-6 sm:space-x-8"  // Medium
className="space-x-8 sm:space-x-12" // Large
```

## Common Patterns

### Page Layout

```tsx
<PageContainer size="xl">
  {/* Header */}
  <header className="mb-8 sm:mb-12 pb-6 border-b border-zinc-800/30">
    <Flex align="center" justify="between">
      <BackButton />
      <PageTitle />
      <ActionButton />
    </Flex>
  </header>
  
  {/* Content */}
  <Stack spacing="lg">
    <Section1 />
    <Section2 />
    <Section3 />
  </Stack>
</PageContainer>
```

### Card Grid

```tsx
<Grid cols={{ sm: 1, md: 2, lg: 3 }} gap="md">
  <Card padding="md">
    <CardContent />
  </Card>
  <Card padding="md">
    <CardContent />
  </Card>
  <Card padding="md">
    <CardContent />
  </Card>
</Grid>
```

### Form Layout

```tsx
<form className="max-w-2xl mx-auto">
  <Stack spacing="md">
    {/* Form field */}
    <div className="space-y-2">
      <label className="block text-sm font-medium">
        Label
      </label>
      <input className="w-full px-4 py-3 rounded-lg" />
      <p className="text-xs text-zinc-500">Helper text</p>
    </div>
    
    {/* Form actions */}
    <Flex gap="md" className="pt-6">
      <button className="flex-1 px-6 py-3">Submit</button>
      <button className="px-6 py-3">Cancel</button>
    </Flex>
  </Stack>
</form>
```

### Two-Column Layout

```tsx
<Grid cols={{ sm: 1, lg: 2 }} gap="lg">
  {/* Main content */}
  <div>
    <Stack spacing="md">
      <Content1 />
      <Content2 />
    </Stack>
  </div>
  
  {/* Sidebar */}
  <aside>
    <Stack spacing="md">
      <Sidebar1 />
      <Sidebar2 />
    </Stack>
  </aside>
</Grid>
```

## Touch Targets

### Minimum Sizes

```typescript
minimum: 44px      // WCAG 2.1 Level AAA
comfortable: 48px  // Recommended
large: 56px        // Large buttons
```

### Usage

```tsx
// Minimum touch target
<button className="min-h-[44px] min-w-[44px] px-6 py-3">
  Click Me
</button>

// Comfortable touch target
<button className="min-h-[48px] px-6 py-3">
  Click Me
</button>

// Large touch target
<button className="min-h-[56px] px-8 py-4">
  Click Me
</button>
```

## Responsive Design

### Mobile-First Approach

Always start with mobile, then add larger screens:

```tsx
// ✅ Good
<div className="px-4 sm:px-6 lg:px-8">

// ❌ Bad
<div className="lg:px-8 sm:px-6 px-4">
```

### Responsive Typography

```tsx
// Scale text with viewport
<h1 className="text-3xl sm:text-4xl lg:text-5xl">
  Responsive Heading
</h1>

<p className="text-sm sm:text-base lg:text-lg">
  Responsive body text
</p>
```

### Responsive Grids

```tsx
// 1 col mobile, 2 col tablet, 3 col desktop
<div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 lg:gap-8">
  <Item />
  <Item />
  <Item />
</div>
```

### Responsive Visibility

```tsx
// Hide on mobile, show on desktop
<div className="hidden lg:block">
  Desktop only
</div>

// Show on mobile, hide on desktop
<div className="block lg:hidden">
  Mobile only
</div>
```

## Accessibility

### Reading Width

```tsx
// Optimal reading width (45-75 characters)
<article className="max-w-[65ch]">
  <p>Long-form content...</p>
</article>
```

### Focus Indicators

```tsx
// Visible focus ring
<button className="focus:ring-2 focus:ring-offset-2 focus:ring-blue-500">
  Accessible Button
</button>
```

### Spacing for Readability

```tsx
// Paragraph spacing
<div className="space-y-6">
  <p>Paragraph 1</p>
  <p>Paragraph 2</p>
  <p>Paragraph 3</p>
</div>

// Line height for readability
<p className="leading-relaxed">
  Body text with optimal line height
</p>
```

## Testing Checklist

### Desktop (1920x1080)
- [ ] Content centered with max-width
- [ ] Adequate whitespace
- [ ] Proper section spacing
- [ ] Grid layouts use space well

### Tablet (768x1024)
- [ ] Two-column layouts work
- [ ] Touch targets 44px minimum
- [ ] Adequate spacing for fingers

### Mobile (375x667)
- [ ] Single column layout
- [ ] No horizontal scrolling
- [ ] Touch targets 48px minimum
- [ ] Adequate tap spacing

### Mobile Small (320x568)
- [ ] Content fits without overflow
- [ ] Text remains readable
- [ ] Buttons accessible

## Migration Guide

### Before

```tsx
// Inconsistent spacing
<div className="px-6 py-16">
  <div className="max-w-7xl mx-auto">
    <div className="mb-12">
      <h1>Title</h1>
    </div>
    <div className="space-y-8">
      <Section />
    </div>
  </div>
</div>
```

### After

```tsx
// Consistent spacing with layout components
<PageContainer size="xl">
  <header className="mb-8 sm:mb-12">
    <h1>Title</h1>
  </header>
  <Stack spacing="lg">
    <Section />
  </Stack>
</PageContainer>
```

## Best Practices

### ✅ Do
- Use layout components for consistency
- Follow mobile-first approach
- Use semantic spacing values
- Test on multiple screen sizes
- Ensure touch targets are 44px minimum
- Use responsive spacing utilities

### ❌ Don't
- Use arbitrary spacing values
- Mix spacing systems
- Ignore mobile layouts
- Create custom spacing without reason
- Use fixed widths without max-width
- Forget to test responsiveness
