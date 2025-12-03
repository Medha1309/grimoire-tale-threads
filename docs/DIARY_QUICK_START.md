# Diary Module - Quick Start Guide

## 🚀 Get Running in 2 Minutes

### Step 1: Add to Router (30 seconds)

Open `src/router/index.tsx` and add these lines:

```typescript
// At the top with other imports
import { DiaryPage } from '../modules/diary';

// In your routes array (around line 50-100)
{
  path: '/diary',
  element: (
    <ProtectedRoute>
      <AnimatedPage>
        <DiaryPage />
      </AnimatedPage>
    </ProtectedRoute>
  ),
},
```

### Step 2: Add Navigation (30 seconds)

Open `src/components/Navbar.tsx` and add a link:

```typescript
<Link to="/diary" className="text-gray-300 hover:text-white">
  📔 Diary
</Link>
```

### Step 3: Test (1 minute)

```bash
# Start dev server
npm run dev

# Open browser to http://localhost:5173/diary
# Click "New Entry"
# Type something
# Wait 3 seconds (auto-save)
# Click "Save Entry"
# Done! ✅
```

---

## 🎮 Try These Features

1. **Create Entry**: Click "+ New Entry" button
2. **Add Stickers**: Click "+ Add Stickers" in editor
3. **Change Mood**: Click mood buttons (Happy, Sad, Calm, etc.)
4. **Auto-save**: Type and wait 3 seconds - see "Saved" timestamp
5. **Keyboard Shortcuts**: 
   - Press `Ctrl+S` to save
   - Press `Esc` to cancel
6. **Noise Mode**: Click "📺 Noise Mode" button for CRT effect
7. **Timeline**: See recent entries in horizontal scroll at top
8. **Search**: Type in search box to filter entries
9. **Filter by Mood**: Click mood buttons in sidebar
10. **Favorites**: Click ⭐ on any entry
11. **Easter Egg**: Don't move mouse for 30 seconds 💖

---

## 📱 Mobile Testing

```bash
# Get your local IP
ipconfig  # Windows
ifconfig  # Mac/Linux

# Open on phone
http://YOUR_IP:5173/diary
```

---

## 🎨 Customize (Optional)

### Change Colors

Edit `src/modules/diary/constants.ts`:

```typescript
export const MOOD_CONFIG = {
  happy: { 
    color: '#YOUR_COLOR',    // Text color
    bg: '#YOUR_BG_COLOR',    // Background
    label: 'Happy',
    icon: '😊'
  },
  // ... other moods
};
```

### Add More Stickers

Edit `src/modules/diary/constants.ts`:

```typescript
export const STICKER_LIBRARY: MoodSticker[] = [
  // Add your own
  { id: 'party', emoji: '🎉', label: 'Party', category: 'emotion' },
  // ... existing stickers
];
```

### Change Auto-save Timing

Edit `src/modules/diary/constants.ts`:

```typescript
export const AUTO_SAVE_INTERVAL = 5000; // 5 seconds instead of 3
```

---

## 🐛 Troubleshooting

### "Cannot find module '../modules/diary'"
- Make sure all files in `src/modules/diary/` exist
- Restart your dev server

### Entries not saving
- Check browser console (F12)
- Verify IndexedDB is enabled
- Try incognito mode

### Styles look broken
- Ensure Tailwind is configured
- Check `tailwind.config.js` includes `src/modules/**/*.tsx`
- Restart dev server

### TypeScript errors
```bash
npm run build
# Fix any errors shown
```

---

## 📚 Full Documentation

- **Feature List**: See `DIARY_FEATURE_COMPLETE.md`
- **Integration Guide**: See `DIARY_MODULE_INTEGRATION.md`
- **API Reference**: See `src/modules/diary/README.md`

---

## ✅ Verification Checklist

After integration, verify these work:

- [ ] Can navigate to `/diary`
- [ ] Can create new entry
- [ ] Can see entry in list
- [ ] Can click entry to view details
- [ ] Can edit entry
- [ ] Can delete entry
- [ ] Can toggle favorite (⭐)
- [ ] Auto-save works (wait 3 seconds while typing)
- [ ] Search filters entries
- [ ] Mood filter works
- [ ] Stickers can be added
- [ ] Keyboard shortcuts work (Ctrl+S, Esc)
- [ ] Noise mode toggles
- [ ] Timeline shows recent entries
- [ ] Responsive on mobile

---

## 🎉 You're Done!

The diary module is now fully integrated and ready to use. It's:
- ✅ Production-ready
- ✅ Self-contained
- ✅ Won't break other features
- ✅ Fully responsive
- ✅ Auto-saves
- ✅ Has 6 innovative features

Enjoy your new diary system! 📔✨
