# Terminal Testing Guide

## How to Test the Terminal

### 1. Navigate to Dollhouse
1. Open the app in your browser
2. Go to the Dollhouse page
3. You should see the terminal at the top

### 2. Test Visibility
- [ ] Terminal is visible (not too dark)
- [ ] Has subtle border
- [ ] Hover makes border lighter
- [ ] Click/focus makes it light up pink

### 3. Test Focus States
When you click the input:
- [ ] Background lightens (black/80 → zinc-900/95)
- [ ] Border glows pink (#ffb6d9/40)
- [ ] Pink shadow appears
- [ ] Prompt $ turns pink
- [ ] Time display turns pink
- [ ] Cursor turns pink and pulses faster
- [ ] Input text becomes brighter

### 4. Test Commands

Try these commands:

#### Help Command
```
help
```
Should show list of available commands

#### Navigation Commands
```
open room diary
open room write
open room scrapbook
open room art
open room bookmarks
```
Each should navigate to the respective room

#### Other Commands
```
clear
stats
ls
```

### 5. Test Suggestions

1. Start typing: `open`
2. Suggestions dropdown should appear
3. Shows matching commands with descriptions
4. Click a suggestion to auto-fill
5. Press Enter to execute

### 6. Test Quick Commands

When terminal is empty:
- [ ] Shows hint text
- [ ] Shows clickable command buttons
- [ ] Click button auto-fills command
- [ ] Focus moves to input

### 7. Test Tooltips

Hover over these elements:
- [ ] Time display → "Current time"
- [ ] Prompt $ → "Command prompt"
- [ ] Input field → "Type commands here..."
- [ ] Expand button → "Show/Hide command output"
- [ ] Cursor → "Terminal cursor"
- [ ] Quick commands → "Click to use: [command]"

### 8. Test Keyboard Navigation

- [ ] Press ↑ to see previous command
- [ ] Press ↓ to see next command
- [ ] Press Enter to submit
- [ ] Tab to focus terminal
- [ ] Esc to blur (unfocus)

### 9. Test Command History

1. Type and submit: `help`
2. Type and submit: `open room diary`
3. Press ↑ twice
4. Should show `open room diary`
5. Press ↑ again
6. Should show `help`

### 10. Test Output Display

1. Type: `help`
2. Press Enter
3. Output should appear above input
4. Click expand/collapse button (▲/▼)
5. Output should show/hide

## Expected Behavior

### Successful Command
```
$ open room diary
  Opening diary room...
```
- Green text
- Navigates to diary

### Failed Command
```
$ invalid command
  Unknown command: invalid command
  Type 'help' for available commands
```
- Red text
- Stays on same page

### Empty Command
```
$ 
```
- Nothing happens
- No error

## Common Issues

### Terminal Not Visible
- Check if you're on Dollhouse page
- Scroll to top of page
- Check browser zoom (should be 100%)

### Commands Not Working
- Check browser console for errors
- Make sure you press Enter after typing
- Try typing `help` to verify terminal works

### Suggestions Not Appearing
- Make sure you're typing (not just clicking)
- Check if input is focused (should have pink border)
- Try typing `open` to trigger suggestions

### Tooltips Not Showing
- Hover for at least 500ms
- Make sure element is not disabled
- Check if mouse is actually over element

## Browser Console

Open console (F12) and check for:
- No errors related to terminal
- Commands execute without errors
- Navigation works

## Mobile Testing

On mobile/tablet:
- [ ] Terminal is responsive
- [ ] Touch to focus works
- [ ] Suggestions are touch-friendly
- [ ] Quick commands are tappable
- [ ] Keyboard appears on focus

## Accessibility Testing

### Keyboard Only
- [ ] Tab to focus terminal
- [ ] Type commands
- [ ] ↑↓ for history
- [ ] Enter to submit
- [ ] Esc to blur

### Screen Reader
- [ ] Input has placeholder
- [ ] Buttons have labels
- [ ] Tooltips are readable
- [ ] Output is announced

## Performance

- [ ] Terminal loads quickly
- [ ] Animations are smooth
- [ ] No lag when typing
- [ ] Suggestions appear instantly
- [ ] Navigation is immediate

## Visual Regression

Compare before/after:
- [ ] Terminal is more visible
- [ ] Focus state is clear
- [ ] Colors are consistent
- [ ] Animations are smooth

## Files to Check

If something doesn't work, check these files:

1. **src/components/terminal/DollhouseTerminal.tsx**
   - Main terminal component
   - Focus states
   - Suggestions
   - Tooltips

2. **src/utils/terminal/executor.ts**
   - Command execution
   - Navigation logic
   - Help text

3. **src/utils/terminal/parser.ts**
   - Command parsing
   - Argument extraction

4. **src/types/terminal.ts**
   - Type definitions
   - Interfaces

5. **src/components/diary/DollhouseHomeView.tsx**
   - Where terminal is used
   - Navigation handler

## Success Criteria

Terminal is working if:
- ✅ Visible and easy to find
- ✅ Lights up on focus
- ✅ Commands execute correctly
- ✅ Navigation works
- ✅ Suggestions appear
- ✅ Tooltips show
- ✅ History works
- ✅ No console errors

## Quick Test Sequence

1. Open Dollhouse
2. Click terminal → lights up pink ✓
3. Type `help` → shows commands ✓
4. Type `open room diary` → navigates ✓
5. Press ↑ → shows previous command ✓
6. Hover time → tooltip appears ✓

If all 6 steps work, terminal is functioning correctly! ✓
