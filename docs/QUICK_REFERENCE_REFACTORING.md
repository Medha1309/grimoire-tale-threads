# Quick Reference - Refactored Components

## 🎨 Design Tokens

```typescript
import { colors, spacing, typography } from '@/design-system';

colors.primary[300]           // #ffb6d9 (pink)
colors.secondary[500]         // #eab308 (gold)
colors.neutral[900]           // #171717 (dark)
spacing[4]                    // 1rem (16px)
typography.fontFamily.serif   // Crimson Text
```

## 🎬 Animations

```typescript
import { fadeInUp, transitions, hoverLift } from '@/utils/animation-system';

<motion.div
  variants={fadeInUp}
  initial="initial"
  animate="animate"
  transition={transitions.smooth}
  {...hoverLift}
/>
```

## 📐 Layouts

```typescript
import { PageLayout, PageHeader, Container } from '@/components/layouts';

<PageLayout>
  <Container size="lg">
    <PageHeader title="Title" onBack={goBack} />
    {/* content */}
  </Container>
</PageLayout>
```

## 📊 States

```typescript
import { EmptyState, LoadingState, ErrorState } from '@/components/shared';

{isLoading && <LoadingState />}
{error && <ErrorState message={error.message} onRetry={refetch} />}
{isEmpty && <EmptyState title="No items" action={{...}} />}
```

## 🪟 Modal

```typescript
import { Modal, ModalBody, ModalFooter } from '@/components/shared';

<Modal isOpen={isOpen} onClose={onClose} title="Title">
  <ModalBody>{/* content */}</ModalBody>
  <ModalFooter>
    <Button onClick={onClose}>Cancel</Button>
    <Button onClick={onSave}>Save</Button>
  </ModalFooter>
</Modal>
```

## 🃏 Cards

```typescript
import { Card, BookCard } from '@/components/shared';

<Card variant="elevated" hoverable>
  {/* content */}
</Card>

<BookCard glowColor="#ffb6d9" onClick={handleClick}>
  {/* content */}
</BookCard>
```

## 📝 Forms

```typescript
import { useForm, validators } from '@/hooks/useForm';

const form = useForm({
  fields: {
    email: {
      initialValue: '',
      rules: [validators.required(), validators.email()],
    },
  },
  onSubmit: async (values) => { /* submit */ },
});

<Input {...form.getFieldProps('email')} />
<Button type="submit" loading={form.isSubmitting} disabled={!form.isValid}>
  Submit
</Button>
```

## 🎯 Common Patterns

### Page Structure
```typescript
<PageLayout>
  <Container>
    <PageHeader title="Page" onBack={goBack} />
    {isLoading && <LoadingState />}
    {!isLoading && isEmpty && <EmptyState {...} />}
    {!isLoading && !isEmpty && <Content />}
  </Container>
</PageLayout>
```

### Modal Form
```typescript
<Modal isOpen={isOpen} onClose={onClose} title="Form">
  <form onSubmit={form.handleSubmit}>
    <ModalBody>
      <Input {...form.getFieldProps('field')} />
    </ModalBody>
    <ModalFooter>
      <Button variant="ghost" onClick={onClose}>Cancel</Button>
      <Button type="submit" loading={form.isSubmitting}>Save</Button>
    </ModalFooter>
  </form>
</Modal>
```

### Card Grid
```typescript
<motion.div variants={staggerContainer} initial="initial" animate="animate">
  {items.map(item => (
    <motion.div key={item.id} variants={staggerItem}>
      <Card hoverable onClick={() => handleClick(item)}>
        {/* content */}
      </Card>
    </motion.div>
  ))}
</motion.div>
```

## 📦 Imports Cheat Sheet

```typescript
// Design System
import { colors, spacing, typography } from '@/design-system';

// Animations
import { fadeInUp, transitions, hoverLift } from '@/utils/animation-system';

// Layouts
import { PageLayout, PageHeader, Container } from '@/components/layouts';

// States
import { EmptyState, LoadingState, ErrorState } from '@/components/shared';

// Modal
import { Modal, ModalBody, ModalFooter } from '@/components/shared';

// Cards
import { Card, BookCard } from '@/components/shared';

// Forms
import { useForm, validators } from '@/hooks/useForm';

// UI
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
```

## 🔧 Validators

```typescript
validators.required('Message')
validators.minLength(6)
validators.maxLength(100)
validators.email()
validators.pattern(/regex/, 'Message')
validators.min(0)
validators.max(100)
validators.custom((value) => test(value), 'Message')
```

## 🎨 Component Variants

### Button
`primary` | `secondary` | `ghost` | `danger` | `auth` | `google`

### Card
`default` | `elevated` | `outlined` | `ghost` | `book`

### Container
`sm` | `md` | `lg` | `xl` | `full`

### Modal
`sm` | `md` | `lg` | `xl` | `full`

### LoadingState
`sm` | `md` | `lg`

## 💡 Pro Tips

1. **Always use design tokens** instead of hardcoded values
2. **Compose components** instead of creating monoliths
3. **Use state components** for consistent UX
4. **Leverage animation system** for smooth transitions
5. **Type everything** for better DX

## 📖 Full Documentation

- `REFACTORING_README.md` - Complete guide
- `REFACTORING_EXAMPLES.md` - Real examples
- `REFACTORING_COMPLETE.md` - Detailed docs
