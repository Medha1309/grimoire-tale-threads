# Manual Testing Guide for Rich Text Renderer

## Test Cases to Verify in Browser

### 1. Italic Formatting
**Input:** `*italic text*`
**Expected Output:** Text should appear in italics, no asterisks visible
**How to test:**
1. Go to Dollhouse → My Diary → Write
2. Type: `*italic text*`
3. Check preview pane - should show italic text
4. Save and view entry - should show italic text

### 2. Bold Formatting
**Input:** `**bold text**`
**Expected Output:** Text should appear bold, no asterisks visible
**How to test:**
1. Type: `**bold text**`
2. Check preview - should show bold text
3. Save and view - should show bold text

### 3. Mixed Formatting
**Input:** `**bold** and *italic* text`
**Expected Output:** "bold" in bold, "italic" in italics, no markdown syntax visible
**How to test:**
1. Type: `**bold** and *italic* text`
2. Preview should show: **bold** and *italic* text
3. No `**` or `*` should be visible

### 4. Strikethrough
**Input:** `~~strikethrough~~`
**Expected Output:** Text with line through it, no tildes visible

### 5. Code
**Input:** `` `code here` ``
**Expected Output:** Monospace text with gray background, no backticks visible

### 6. Lists
**Input:** 
```
• First item
• Second item
```
**Expected Output:** Bulleted list, no bullet character visible in raw form

### 7. Quotes
**Input:** `> This is a quote`
**Expected Output:** Indented text with left border, no `>` visible

## Quick Verification Checklist

- [ ] Italic button works and shows italic in preview
- [ ] Bold button works and shows bold in preview
- [ ] No markdown syntax (`*`, `**`, `~~`, `` ` ``) visible in preview
- [ ] No markdown syntax visible in saved entry view
- [ ] Multiple formats on same line work correctly
- [ ] Keyboard shortcuts (Ctrl+B, Ctrl+I) work
- [ ] Text with spaces around formatting works
- [ ] Empty lines create line breaks

## Common Issues to Watch For

❌ **Double rendering** - Seeing both `*italic*` AND italic text
✅ **Should only see:** italic text

❌ **Markdown visible** - Seeing `**bold**` instead of **bold**
✅ **Should only see:** bold text

❌ **Overlapping formats** - `**bold** *italic*` not working
✅ **Should see:** **bold** *italic* (both formatted correctly)

## Test Results

Date: ___________
Tester: ___________

| Test Case | Pass/Fail | Notes |
|-----------|-----------|-------|
| Italic | ⬜ | |
| Bold | ⬜ | |
| Mixed | ⬜ | |
| Strikethrough | ⬜ | |
| Code | ⬜ | |
| Lists | ⬜ | |
| Quotes | ⬜ | |
