# Button Migration Guide - GRIMOIRE

## 🎯 Goal
Migrate all buttons in GRIMOIRE to use the new consistent button system.

---

## 📦 What's New

### 1. Design System
- `src/design-system/button-system.ts` - Button styles, positions, labels

### 2. Button Component
- `src/components/shared/Button.tsx` - Reusable button component with presets

### 3. Documentation
- `APP_COHESION_BUTTON_SYSTEM.md` - Complete design system guide

---

## 🚀 Quick Start

### Import the Components
```tsx
import {
  Button,
  WriteButton,
  CreateButton,
  BackButton,
  SkipButton,
  CloseButton,
  SaveButton,
  CancelButton,
  DeleteButton,
  ButtonGroup,
} from '@/components/shared/Button';
```

---

## 📝 Migration Examples

### Example 1: Write Button

#### Before:
```tsx
<button
  onClick={handleWrite}
  className="absolute top-4 right-4 px-6 py-3 bg-red-900 text-zinc-100 rounded-lg hover:bg-red-800"
>
  Write Entry
</button>
```

#### After:
```tsx
<WriteButton onClick={handleWrite} />
```

**Savings:** 1 line vs 5 lines, consistent styling

---

### Example 2: Back Button

#### Before:
```tsx
<button
  onClick={handleBack}
  className="absolute top-4 left-4 text-zinc-500 hover:text-zinc-300"
>
  ← Back
</button>
```

#### After:
```tsx
<BackButton onClick={handleBack} />
```

**Savings:** Consistent position and styling

---

### Example 3: Skip Button

#### Before:
```tsx
<button
  onClick={handleSkip}
  className="absolute bottom-8 left-1/2 -translate-x-1/2 text-zinc-500 hover:text-zinc-300"
>
  Skip Animation
</button>
```

#### After:
```tsx
<SkipButton onClick={handleSkip} />
```

**Savings:** Consistent label "Skip" instead of "Skip Animation"

---

### Example 4: Form Actions

#### Before:
```tsx
<div className="flex justify-end gap-3 mt-6">
  <button
    onClick={handleCancel}
    className="px-6 py-3 border border-zinc-800 text-zinc-400 rounded-lg hover:border-zinc-700"
  >
    Cancel
  </button>
  <button
    onClick={handleSave}
    disabled={isSaving}
    className="px-6 py-3 bg-red-900 text-zinc-100 rounded-lg hover:bg-red-800"
  >
    {isSaving ? 'Saving...' : 'Save'}
  </button>
</div>
```

#### After:
```tsx
<ButtonGroup position="formActions" className="mt-6">
  <CancelButton onClick={handleCancel} />
  <SaveButton onClick={handleSave} loading={isSaving} />
</ButtonGroup>
```

**Savings:** Cleaner code, automatic loading state

---

### Example 5: Modal Actions

#### Before:
```tsx
<div className="flex justify-between items-center w-full mt-6">
  <button
    onClick={handleDelete}
    className="px-6 py-3 bg-red-950/20 border border-red-900/40 text-red-400 rounded-lg"
  >
    Delete
  </button>
  <div className="flex gap-3">
    <button onClick={handleCancel} className="px-6 py-3 border border-zinc-800 text-zinc-400 rounded-lg">
      Cancel
    </button>
    <button onClick={handleSave} className="px-6 py-3 bg-red-900 text-zinc-100 rounded-lg">
      Save
    </button>
  </div>
</div>
```

#### After:
```tsx
<ButtonGroup position="modalActions" className="mt-6">
  <DeleteButton onClick={handleDelete} />
  <div className="flex gap-3">
    <CancelButton onClick={handleCancel} />
    <SaveButton onClick={handleSave} />
  </div>
</ButtonGroup>
```

**Savings:** Consistent layout, less code

---

## 🗂️ File-by-File Migration

### Priority 1: Dollhouse (Diary)

#### File: `src/pages/Dollhouse.tsx`

**Changes needed:**
1. Import button components
2. Replace Write button with `<WriteButton />`
3. Replace Back button with `<BackButton />`
4. Replace Skip button with `<SkipButton />`

**Before:**
```tsx
<button className="absolute top-4 right-4 px-6 py-3 bg-red-900 text-zinc-100 rounded-lg">
  Write
</button>
```

**After:**
```tsx
<WriteButton onClick={() => setCurrentView('write')} />
```

---

#### File: `src/components/diary/WriteView.tsx`

**Changes needed:**
1. Replace Save/Cancel buttons with ButtonGroup
2. Use SaveButton and CancelButton

**Before:**
```tsx
<div className="flex justify-end gap-3">
  <button onClick={onCancel} className="px-6 py-3 border border-zinc-800 text-zinc-400 rounded-lg">
    Cancel
  </button>
  <button onClick={onSave} className="px-6 py-3 bg-red-900 text-zinc-100 rounded-lg">
    Save
  </button>
</div>
```

**After:**
```tsx
<ButtonGroup position="formActions">
  <CancelButton onClick={onCancel} />
  <SaveButton onClick={onSave} loading={isSaving} />
</ButtonGroup>
```

---

#### File: `src/components/diary/CreateConfessionModal.tsx`

**Changes needed:**
1. Replace Close button with `<CloseButton />`
2. Replace form actions with ButtonGroup

**Before:**
```tsx
<button onClick={onClose} className="absolute top-4 right-4 text-zinc-500 hover:text-zinc-300">
  ✕
</button>
```

**After:**
```tsx
<CloseButton onClick={onClose} className="absolute top-4 right-4" />
```

---

### Priority 2: Forum (Parlour)

#### File: `src/pages/Forum.tsx`

**Changes needed:**
1. Replace Create Thread button with `<CreateButton />`
2. Replace Back button with `<BackButton />`

**Before:**
```tsx
<button className="absolute top-4 right-4 px-6 py-3 bg-red-900 text-zinc-100 rounded-lg">
  Create Thread
</button>
```

**After:**
```tsx
<CreateButton onClick={() => setShowCreateModal(true)} />
```

---

#### File: `src/components/forum/CreateThreadModal.tsx`

**Changes needed:**
1. Replace Close button
2. Replace Submit/Cancel buttons

**After:**
```tsx
<CloseButton onClick={onClose} className="absolute top-4 right-4" />

<ButtonGroup position="modalActions">
  <CancelButton onClick={onClose} />
  <SaveButton onClick={handleSubmit} loading={isSubmitting}>
    Post Thread
  </SaveButton>
</ButtonGroup>
```

---

### Priority 3: Library (Stories)

#### File: `src/pages/Stories.tsx`

**Changes needed:**
1. Replace Write Story button with `<WriteButton />`

**After:**
```tsx
<WriteButton onClick={() => navigate('/compose')} />
```

---

#### File: `src/components/library/NovelWritingEditor.tsx`

**Changes needed:**
1. Replace Save/Cancel buttons with ButtonGroup

**After:**
```tsx
<ButtonGroup position="formActions">
  <CancelButton onClick={handleCancel} />
  <SaveButton onClick={handleSave} loading={isSaving} />
</ButtonGroup>
```

---

### Priority 4: Scrapbook

#### File: `src/components/diary/MemoryScrapbook.tsx`

**Changes needed:**
1. Replace Add Memory button with custom Button
2. Replace Back button with `<BackButton />`

**After:**
```tsx
<Button variant="primary" position="primaryAction" action="add" onClick={handleAddMemory} />
<BackButton onClick={onBack} />
```

---

#### File: `src/components/diary/AddScrapbookModal.tsx`

**Changes needed:**
1. Replace Close button
2. Replace Save/Cancel buttons

**After:**
```tsx
<CloseButton onClick={onClose} className="absolute top-4 right-4" />

<ButtonGroup position="modalActions">
  <CancelButton onClick={onClose} />
  <SaveButton onClick={handleSave} loading={isSaving} />
</ButtonGroup>
```

---

### Priority 5: Auth Pages

#### File: `src/pages/SignUp.tsx`

**Changes needed:**
1. Replace Back button with `<BackButton />`
2. Replace Sign Up button with `<Button variant="primary" />`

**After:**
```tsx
<BackButton onClick={() => go('landing')} />

<Button variant="primary" type="submit" fullWidth loading={isLoading}>
  Create Account
</Button>
```

---

#### File: `src/pages/Login.tsx`

**Changes needed:**
1. Replace Back button with `<BackButton />`
2. Replace Sign In button with `<Button variant="primary" />`

**After:**
```tsx
<BackButton onClick={() => go('landing')} />

<Button variant="primary" type="submit" fullWidth loading={isLoading}>
  Sign In
</Button>
```

---

#### File: `src/pages/Contact.tsx`

**Changes needed:**
1. Replace Skip button with `<SkipButton />`
2. Replace Submit button

**After:**
```tsx
<SkipButton onClick={handleSkip} />

<Button variant="primary" type="submit" fullWidth loading={isSubmitting}>
  Send Message
</Button>
```

---

## 🔧 Custom Buttons

If you need a custom button that doesn't fit the presets:

```tsx
<Button
  variant="primary"        // or secondary, ghost, danger, icon, link
  position="primaryAction" // optional: position preset
  action="write"          // optional: label preset
  loading={isLoading}     // optional: loading state
  fullWidth={true}        // optional: full width
  animated={true}         // optional: animation (default true)
  className="custom-class" // optional: additional classes
  onClick={handleClick}
>
  Custom Label
</Button>
```

---

## ✅ Migration Checklist

### Phase 1: Core Features
- [ ] `src/pages/Dollhouse.tsx`
- [ ] `src/components/diary/DollhouseHomeView.tsx`
- [ ] `src/components/diary/WriteView.tsx`
- [ ] `src/components/diary/CreateConfessionModal.tsx`
- [ ] `src/pages/Forum.tsx`
- [ ] `src/pages/GildedParlour.tsx`
- [ ] `src/components/forum/CreateThreadModal.tsx`
- [ ] `src/components/forum/CreateWhisperModal.tsx`
- [ ] `src/pages/Stories.tsx`
- [ ] `src/components/library/NovelWritingEditor.tsx`
- [ ] `src/components/diary/MemoryScrapbook.tsx`
- [ ] `src/components/diary/AddScrapbookModal.tsx`

### Phase 2: Auth & Navigation
- [ ] `src/pages/SignUp.tsx`
- [ ] `src/pages/Login.tsx`
- [ ] `src/pages/Contact.tsx`

### Phase 3: Admin & Modals
- [ ] `src/pages/AdminDashboard.tsx`
- [ ] `src/pages/admin/*.tsx`
- [ ] `src/components/shared/Modal.tsx`
- [ ] `src/components/shared/UnifiedWritingModal.tsx`

### Phase 4: Testing
- [ ] Visual regression testing
- [ ] Mobile responsiveness
- [ ] Accessibility audit
- [ ] User testing

---

## 🎯 Testing After Migration

### Visual Testing
1. Check all pages for button consistency
2. Verify positions match design system
3. Test hover states
4. Test disabled states
5. Test loading states

### Functional Testing
1. Click all buttons to verify functionality
2. Test keyboard navigation
3. Test screen reader compatibility
4. Test on mobile devices

### Regression Testing
1. Ensure no functionality broken
2. Verify all onClick handlers work
3. Check form submissions
4. Test modal interactions

---

## 📊 Progress Tracking

Create a spreadsheet or use this template:

| File | Status | Notes | Tested |
|------|--------|-------|--------|
| Dollhouse.tsx | ⏳ In Progress | | ❌ |
| WriteView.tsx | ✅ Complete | | ✅ |
| Forum.tsx | ❌ Not Started | | ❌ |

---

## 🐛 Common Issues

### Issue 1: TypeScript Errors
**Problem:** Type errors with motion props

**Solution:** Use `animated={false}` for non-animated buttons

### Issue 2: Positioning Conflicts
**Problem:** Button position conflicts with existing layout

**Solution:** Use `className` to override position or use custom positioning

### Issue 3: Custom Labels
**Problem:** Need custom label not in preset

**Solution:** Use children instead of action prop:
```tsx
<Button variant="primary">Custom Label</Button>
```

---

## 💡 Tips

1. **Start small** - Migrate one page at a time
2. **Test immediately** - Test after each migration
3. **Use presets** - Use preset components when possible
4. **Document changes** - Note any custom implementations
5. **Ask for help** - Consult design system docs

---

## 📚 Resources

- `APP_COHESION_BUTTON_SYSTEM.md` - Complete design system
- `src/design-system/button-system.ts` - Button styles and positions
- `src/components/shared/Button.tsx` - Button component source

---

**Made with 🕯️ for GRIMOIRE consistency**
