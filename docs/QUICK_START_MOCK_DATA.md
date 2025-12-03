# Quick Start: Mock Book Data

## 🚀 3-Step Setup

### Step 1: Start Your Server
```bash
npm run dev
```

### Step 2: Visit Admin Page
```
http://localhost:5173/admin/populate
```

### Step 3: Click "Populate Mock Data"
Wait for success message, then click "Verify Data" to confirm.

---

## ✅ What You Get

- **18 stories** with full stats
- **50+ comments** with realistic engagement
- **Views, likes, bookmarks** for each story
- **Star ratings** (4.3 - 4.9 average)
- **Nested comment replies**
- **8 unique user personas**

---

## 📍 Where to See the Data

### Story Detail Pages
Visit any story to see:
- `/story/blackwood-manor`
- `/story/whispering-shadows`
- `/story/the-dollmakers-daughter`

### Library Page
- `/stories` - See all books with stats

### Admin Page
- `/admin/populate` - Populate and verify

---

## 🎯 Quick Commands

### Populate Data
```typescript
import { populateMockData } from './utils/populateMockData';
await populateMockData();
```

### Verify Data
```typescript
import { verifyMockData } from './utils/verifyMockData';
const report = await verifyMockData();
```

---

## 📊 Sample Data Preview

**The Watcher in the Walls**
- 👁 5,234 views
- ❤️ 689 likes
- 🔖 345 bookmarks
- ⭐ 4.9 rating (178 reviews)
- 💬 2 comments (with replies)

**Top Comment** (203 likes):
> "This is my worst nightmare. Someone living in your walls, watching you... I'm never sleeping again!"

---

## ⚠️ Important Notes

1. **Run once**: Don't populate multiple times (creates duplicates)
2. **Firebase required**: Make sure Firebase is configured
3. **Permissions**: Check Firestore rules allow writes
4. **No auth**: Admin page has no authentication (add in production)

---

## 🐛 Troubleshooting

**Data not showing?**
- Check Firebase connection
- Run verification script
- Check browser console

**Population failed?**
- Verify Firebase permissions
- Check internet connection
- Review error message

---

## 📚 Full Documentation

- `MOCK_DATA_SETUP.md` - Complete setup guide
- `MOCK_DATA_PREVIEW.md` - Visual preview
- `MOCK_DATA_SUMMARY.md` - Implementation details

---

**Ready?** Visit `/admin/populate` now! 🎉
