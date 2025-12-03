# Dollhouse No-Emoji Button Update

## Summary
All buttons throughout the Dollhouse (and app) have been updated to remove emojis, using only text and symbols (like ← for back arrows).

## Changes Made

### 1. DollhouseButton Component
Updated pre-configured buttons to remove emoji icons:
- **Back Button**: Now uses `← Back` (arrow symbol, not emoji)
- **Save/Cancel/Delete**: Text only, no emojis

### 2. DiaryListHeader
- **Write Button**: Changed from `✒️ Write` to `Write`
- **Back Button**: Uses `← Back to Dollhouse`

### 3. DiaryEntryCard
Action buttons updated from emojis to text:
- `👁️/🙈` → `Show/Hide`
- `✏️` → `Edit`
- `🗑️` → `Delete`

### 4. DiaryFilterBar
- **Hidden Toggle**: Changed from `👁️/🙈 Show Hidden` to `Show/Hide Hidden`

### 5. InvestigationToolbar
All tool buttons updated from emojis to text labels:
- `🔍` → `Select`
- `✋` → `Pan`
- `📷` → `Photo`
- `🎬` → `GIF`
- `📝` → `Note`
- `🔴` → `Connect`
- `✏️` → `Draw`
- `📋` → `Layers`
- `⚙️` → `Props`

### 6. InvestigationLayersPanel
- **Delete Button**: Changed from `🗑️` to `Del`

### 7. DollhouseRoom
- Removed unused `icon` property from room styles (was storing emojis)

## Typography Standards

All buttons now use consistent typography:
- **Font**: Grimoire (serif)
- **Transform**: UPPERCASE
- **Tracking**: `tracking-wider` (0.05em)
- **Size**: Varies by button size (xs, sm, md, lg)

## Allowed Symbols

The only non-letter characters allowed in buttons are:
- **← (Left Arrow)**: For back/navigation buttons
- **↶ ↷ (Undo/Redo)**: For history actions
- **− + (Minus/Plus)**: For zoom controls

These are Unicode symbols, not emojis.

## Files Modified

1. `src/components/diary/shared/DollhouseButton.tsx`
2. `src/components/diary/DiaryListHeader.tsx`
3. `src/components/diary/DiaryEntryCard.tsx`
4. `src/components/diary/DiaryFilterBar.tsx`
5. `src/components/diary/InvestigationToolbar.tsx`
6. `src/components/diary/InvestigationLayersPanel.tsx`
7. `src/components/diary/DollhouseRoom.tsx`

## Documentation Updated

1. `docs/DOLLHOUSE_BUTTON_CONSISTENCY.md`
2. `docs/DOLLHOUSE_VISUAL_REFERENCE.md`
3. `DOLLHOUSE_CONSISTENCY_UPDATE.md`

## Visual Impact

### Before
```
✒️ WRITE
🗑️ DELETE
📷 Add Photo
```

### After
```
WRITE
DELETE
Photo
```

## Benefits

1. **Cleaner Aesthetic**: Text-only buttons are more professional
2. **Better Accessibility**: Screen readers handle text better than emojis
3. **Consistent Typography**: All buttons use the same Grimoire serif font
4. **Cross-Platform**: No emoji rendering differences across devices
5. **Faster Loading**: No emoji font dependencies

## Testing

✅ All components compile without errors
✅ No TypeScript diagnostics
✅ Buttons display correctly with text labels
✅ Hover effects working
✅ Typography consistent across all buttons

## Note on Decorative Emojis

Emojis are still used in:
- **Content areas** (diary entries, descriptions)
- **Decorative elements** (ribbons 🎀 in titles)
- **Status indicators** (in non-button contexts)

This update only affects **interactive buttons** - no emojis in any clickable button elements.
