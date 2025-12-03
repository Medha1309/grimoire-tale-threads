# 🌟 MySpace Profiles - Quick Start Guide

## What is it?

A nostalgic MySpace-style profile system with customizable profiles and the iconic "Top 8 Friends" feature!

## How to Use

### 1. Access Your MySpace Profile

From your regular profile page (`/profile`), click the sparkly button:

```
✨ View MySpace Profile ✨
```

Or navigate directly to: `/myspace/[your-user-id]`

### 2. Customize Your Profile

Click the **⚙️ Customize** button (top right) to open the customization modal.

**Four tabs available:**

#### 🎨 Theme
- Choose from 6 preset themes:
  - Classic MySpace (white & blue)
  - Gothic Horror (dark & red)
  - Neon Nights (black & neon)
  - Vintage Sepia (warm browns)
  - Matrix Green (hacker style)
  - Vaporwave (pink & cyan)
- Or customize your own colors:
  - Background color
  - Text color
  - Link color

#### 📝 About Me
- Write your bio
- List your interests
- Add your favorite quote

#### 🎵 Profile Song
- Song title
- Artist name
- Song URL (optional)
- Displays as "Now Playing" widget

#### 🖼️ Background
- Add a custom background image URL
- Preview before saving

### 3. Manage Your Top 8 Friends

**Add Friends:**
1. Click **👤+ Add Friend** button
2. Search for users by name
3. Click **Add** next to the user
4. They appear in your Top 8 grid

**Remove Friends:**
1. Hover over a friend's card
2. Click the red **×** button
3. Confirm removal

**Limits:**
- Maximum 8 friends
- Must remove someone before adding new friend when full

### 4. View Others' Profiles

Navigate to `/myspace/[their-user-id]` to see:
- Their customization
- Their Top 8 friends
- Their profile info
- Your view will be counted!

## Features

✅ Customizable colors and themes
✅ Background images
✅ Profile song display
✅ Top 8 Friends grid
✅ Profile view counter
✅ About Me sections
✅ Glitter effects
✅ Comic Sans MS headers (authentic!)
✅ Responsive design

## Tips

- Use dark, subtle background images for best readability
- Keep your bio concise and interesting
- Choose friends strategically - only 8 slots!
- Try different themes to match your vibe
- Profile views only count when others visit

## Routes

- `/profile` - Your regular profile (has link to MySpace)
- `/myspace/[userId]` - MySpace-style profile
- Works for both your own profile and viewing others

## Database

All customization is saved automatically to Firestore:
- Profile customization
- Top 8 friends list
- Profile view count

## Status

✅ **Fully Functional**

All features are working and ready to use!

---

**Have fun customizing your profile! 🌟**
