# GRIMOIRE App Cohesion - Button System

## 🎯 Goal
Create consistent button styling, positioning, and naming conventions across the entire GRIMOIRE application.

---

## 📋 Design System Created

### File: `src/design-system/button-system.ts`

This file contains:
- **Button Variants** - 6 consistent button styles
- **Button Positions** - 8 standard positions
- **Button Labels** - Standardized naming
- **Button Opacity** - Consistent opacity values
- **Button Groups** - Layout patterns
- **Helper Functions** - Easy implementation

---

## 🎨 Button Variants

### 1. Primary (Write, Create, Submit)
```tsx
bg-red-900 text-zinc-100
hover:bg-red-800
```
**Use for:** Main actions, Write buttons, Create buttons, Submit

### 2. Secondary (Cancel, Back)
```tsx
border border-zinc-800 text-zinc-400
hover:border-zinc-700 hover:text-zinc-300
```
**Use for:** Cancel, alternative actions

### 3. Ghost (Skip, Close)
```tsx
text-zinc-500
hover:text-zinc-300
```
**Use for:** Skip, Close, subtle actions

### 4. Danger (Delete, Remove)
```tsx
bg-red-950/20 border border-red-900/40 text-red-400
hover:bg-red-950/30
```
**Use for:** Delete, Remove, destructive actions

### 5. Icon (Icon-only buttons)
```tsx
p-2 text-zinc-500
hover:text-zinc-300 hover:bg-zinc-900/50
```
**Use for:** Icon buttons, toolbar actions

### 6. Link (Text links)
```tsx
text-zinc-500
hover:text-zinc-300 hover:underline
```
**Use for:** Inline links, subtle navigation

---

## 📍 Button Positions

### Standard Positions (ALWAYS use these):

| Action Type | Position | CSS Class |
|------------|----------|-----------|
| **Write/Create** | Top-right | `absolute top-4 right-4` |
| **Back/Close** | Top-left | `absolute top-4 left-4` |
| **Skip** | Bottom-center | `absolute bottom-8 left-1/2 -translate-x-1/2` |
| **Form Actions** | Bottom-right | `flex justify-end gap-3` |
| **Modal Actions** | Bottom full-width | `flex justify-between items-center w-full` |
| **FAB** | Bottom-right fixed | `fixed bottom-8 right-8 z-40` |

---

## 🏷️ Button Naming Conventions

### Creation Actions
- ✅ **Write** - For diary entries, stories
- ✅ **Create** - For new threads, posts
- ✅ **Add** - For adding items to collections
- ✅ **Compose** - For composing messages

### Navigation Actions
- ✅ **Back** - Return to previous page
- ✅ **Close** - Close modal/dialog
- ✅ **Skip** - Skip intro/animation
- ✅ **Next** - Proceed to next step

### Confirmation Actions
- ✅ **Save** - Save changes
- ✅ **Submit** - Submit form
- ✅ **Confirm** - Confirm action

### Cancellation Actions
- ✅ **Cancel** - Cancel operation
- ✅ **Discard** - Discard changes

### Deletion Actions
- ✅ **Delete** - Permanent deletion
- ✅ **Remove** - Remove from collection

---

## 🎭 Opacity Standards

| State | Opacity | Usage |
|-------|---------|-------|
| Default | `opacity-100` | Normal state |
| Hover | `hover:opacity-90` | Hover effect |
| Disabled | `opacity-50` | Disabled state |
| Loading | `opacity-70` | Loading state |
| Subtle | `opacity-60 hover:opacity-100` | Ghost buttons |

---

## 📦 Implementation Guide

### Step 1: Import the System
```tsx
import {
  getButtonClasses,
  getButtonPosition,
  getButtonLabel,
  buttonGroups
} from '@/design-system/button-system';
```

### Step 2: Use Helper Functions

#### Primary Write Button (Top-Right)
```tsx
<button 
  className={`${getButtonClasses('primary')} ${getButtonPosition('primaryAction')}`}
  onClick={handleWrite}
>
  {getButtonLabel('write')}
</button>
```

#### Back Button (Top-Left)
```tsx
<button 
  className={`${getButtonClasses('ghost')} ${getButtonPosition('back')}`}
  onClick={handleBack}
>
  {getButtonLabel('back')}
</button>
```

#### Skip Button (Bottom-Center)
```tsx
<button 
  className={`${getButtonClasses('ghost')} ${getButtonPosition('skip')}`}
  onClick={handleSkip}
>
  {getButtonLabel('skip')}
</button>
```

#### Form Actions (Bottom-Right)
```tsx
<div className={`${buttonGroups.horizontal} ${getButtonPosition('formActions')}`}>
  <button className={getButtonClasses('secondary')} onClick={handleCancel}>
    {getButtonLabel('cancel')}
  </button>
  <button className={getButtonClasses('primary')} onClick={handleSave}>
    {getButtonLabel('save')}
  </button>
</div>
```

---

## 🔍 Pages to Update

### Priority 1: Main Features

#### 1. **Dollhouse (Diary)**
- ✅ Write button → Top-right, primary variant
- ✅ Back button → Top-left, ghost variant
- ✅ Skip animation → Bottom-center, ghost variant
- ✅ Save/Cancel → Bottom-right, horizontal group

**Files:**
- `src/pages/Dollhouse.tsx`
- `src/components/diary/DollhouseHomeView.tsx`
- `src/components/diary/WriteView.tsx`
- `src/components/diary/CreateConfessionModal.tsx`

#### 2. **Parlour (Forum)**
- ✅ Create Thread → Top-right, primary variant
- ✅ Back button → Top-left, ghost variant
- ✅ Reply button → Inline, secondary variant
- ✅ Submit/Cancel → Bottom-right, horizontal group

**Files:**
- `src/pages/Forum.tsx`
- `src/pages/GildedParlour.tsx`
- `src/components/forum/CreateThreadModal.tsx`
- `src/components/forum/CreateWhisperModal.tsx`
- `src/components/forum/ThreadView.tsx`

#### 3. **Library (Stories)**
- ✅ Write Story → Top-right, primary variant
- ✅ Back button → Top-left, ghost variant
- ✅ Bookmark → Icon variant
- ✅ Read → Secondary variant

**Files:**
- `src/pages/Stories.tsx`
- `src/pages/StoryDetail.tsx`
- `src/components/library/StoryCard.tsx`
- `src/components/library/NovelWritingEditor.tsx`

#### 4. **Scrapbook**
- ✅ Add Memory → Top-right, primary variant
- ✅ Back button → Top-left, ghost variant
- ✅ Save/Cancel → Bottom-right, horizontal group

**Files:**
- `src/components/diary/MemoryScrapbook.tsx`
- `src/components/diary/AddScrapbookModal.tsx`
- `src/components/diary/EnhancedScrapbookDetail.tsx`

### Priority 2: Auth & Navigation

#### 5. **Authentication**
- ✅ Sign Up → Primary variant
- ✅ Sign In → Primary variant
- ✅ Back → Top-left, ghost variant
- ✅ Forgot Password → Link variant

**Files:**
- `src/pages/SignUp.tsx`
- `src/pages/Login.tsx`

#### 6. **Contact Page**
- ✅ Submit → Primary variant
- ✅ Skip Intro → Bottom-center, ghost variant
- ✅ Back → Top-left, ghost variant

**Files:**
- `src/pages/Contact.tsx`

### Priority 3: Admin & Modals

#### 7. **Admin Dashboard**
- ✅ Action buttons → Consistent variants
- ✅ Delete → Danger variant
- ✅ Save → Primary variant

**Files:**
- `src/pages/AdminDashboard.tsx`
- `src/pages/admin/*.tsx`

#### 8. **Modals**
- ✅ Close → Top-right, icon variant
- ✅ Actions → Bottom full-width, split group

**Files:**
- `src/components/shared/Modal.tsx`
- `src/components/shared/UnifiedWritingModal.tsx`

---

## 🎯 Consistency Rules

### Rule 1: Position Consistency
**If a button has the same function, it MUST be in the same position**

✅ **Correct:**
- All "Write" buttons → Top-right
- All "Back" buttons → Top-left
- All "Skip" buttons → Bottom-center

❌ **Incorrect:**
- "Write" button sometimes top-right, sometimes bottom-left
- "Back" button in different positions

### Rule 2: Variant Consistency
**If a button has the same function, it MUST use the same variant**

✅ **Correct:**
- All "Write" buttons → Primary variant
- All "Cancel" buttons → Secondary variant
- All "Delete" buttons → Danger variant

❌ **Incorrect:**
- "Write" button sometimes primary, sometimes secondary
- "Cancel" button with different styles

### Rule 3: Label Consistency
**Use standardized labels from the button system**

✅ **Correct:**
- "Write" (not "Write Entry", "Start Writing", "New Entry")
- "Back" (not "Go Back", "Return", "← Back")
- "Skip" (not "Skip Intro", "Skip Animation", "Continue")

❌ **Incorrect:**
- Inconsistent labels for the same action

### Rule 4: Opacity Consistency
**All buttons maintain the same opacity standards**

✅ **Correct:**
- Default: `opacity-100`
- Disabled: `opacity-50`
- Hover: `hover:opacity-90`

❌ **Incorrect:**
- Random opacity values
- Inconsistent hover effects

---

## 📊 Before & After Examples

### Before (Inconsistent):
```tsx
// Dollhouse Write button - bottom-left
<button className="absolute bottom-4 left-4 px-4 py-2 bg-red-800 text-white">
  Start Writing
</button>

// Forum Create button - top-center
<button className="absolute top-4 left-1/2 px-6 py-3 bg-red-900 text-zinc-100">
  Create New Thread
</button>

// Library Write button - floating right
<button className="fixed right-8 bottom-8 px-5 py-2.5 bg-red-950 text-white">
  Write Story
</button>
```

### After (Consistent):
```tsx
// Dollhouse Write button - top-right, primary
<button className={`${getButtonClasses('primary')} ${getButtonPosition('primaryAction')}`}>
  {getButtonLabel('write')}
</button>

// Forum Create button - top-right, primary
<button className={`${getButtonClasses('primary')} ${getButtonPosition('primaryAction')}`}>
  {getButtonLabel('create')}
</button>

// Library Write button - top-right, primary
<button className={`${getButtonClasses('primary')} ${getButtonPosition('primaryAction')}`}>
  {getButtonLabel('write')}
</button>
```

---

## 🚀 Implementation Checklist

### Phase 1: Core Features (Priority)
- [ ] Update Dollhouse buttons
- [ ] Update Forum buttons
- [ ] Update Library buttons
- [ ] Update Scrapbook buttons

### Phase 2: Auth & Navigation
- [ ] Update SignUp/Login buttons
- [ ] Update Contact page buttons
- [ ] Update navigation buttons

### Phase 3: Admin & Modals
- [ ] Update Admin dashboard buttons
- [ ] Update Modal buttons
- [ ] Update shared components

### Phase 4: Testing
- [ ] Visual regression testing
- [ ] Mobile responsiveness check
- [ ] Accessibility audit
- [ ] User testing

---

## 🎨 Visual Reference

```
┌─────────────────────────────────────────┐
│ [Back]                        [Write]   │ ← Top bar
│                                          │
│                                          │
│          MAIN CONTENT AREA               │
│                                          │
│                                          │
│                                          │
│                  [Skip]                  │ ← Bottom center
└─────────────────────────────────────────┘

Modal Layout:
┌─────────────────────────────────────────┐
│ Title                            [×]     │ ← Close top-right
│                                          │
│          MODAL CONTENT                   │
│                                          │
│ [Cancel]                        [Save]   │ ← Actions bottom
└─────────────────────────────────────────┘
```

---

## ✅ Success Criteria

1. **Position Consistency**: All buttons with same function in same position
2. **Variant Consistency**: All buttons with same function use same variant
3. **Label Consistency**: All buttons use standardized labels
4. **Opacity Consistency**: All buttons follow opacity standards
5. **Mobile Responsive**: All button positions work on mobile
6. **Accessible**: All buttons have proper ARIA labels
7. **Documented**: All changes documented in code comments

---

## 📝 Next Steps

1. **Review** this document with team
2. **Import** button system in components
3. **Update** components one by one
4. **Test** each update
5. **Document** any edge cases
6. **Deploy** with confidence

---

**Made with 🕯️ for GRIMOIRE consistency**
