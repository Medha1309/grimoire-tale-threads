# Scrapbook Upload Test Guide

## How to Test File Upload

### 1. Navigate to Scrapbook
- Go to `/diary` (Boudoir)
- Wait 3-4 seconds for terminal to appear (shows current time)
- Click "Scrapbook" room OR navigate to `/scrapbook`

### 2. Create a Collection
- Click "✂ New Collection" button
- Enter a title (e.g., "Test Collection")
- Optional: Add description
- Click "Create Collection"

### 3. Upload an Image
- Click into your new collection
- Click "Add Item" button
- You'll see two tabs:
  - **📎 Upload File** (default)
  - **🔗 Image URL**

#### Option A: Upload File
1. Click the dashed box that says "📷 Click to select image"
2. Choose any image file (JPG, PNG, or GIF)
3. Max size: 5MB
4. You'll see a preview of the image
5. Enter a title (required)
6. Optional: Add caption and notes
7. Click "✂ Add to Scrapbook"
8. Watch the upload progress bar
9. Image will be uploaded to Firebase Storage

#### Option B: Use URL
1. Click "🔗 Image URL" tab
2. Paste an image URL (e.g., from Unsplash, Imgur, etc.)
3. Enter a title (required)
4. Optional: Add caption and notes
5. Click "✂ Add to Scrapbook"

### 4. View Your Item
- Item appears as a polaroid photo
- Random rotation for natural scrapbook look
- Washi tape and pin decorations
- Hover to see glow effect

## What Should Work

✅ **File Upload**
- Select image from device
- Preview before upload
- Progress indicator
- Stored in Firebase Storage

✅ **URL Upload**
- Paste image URL
- Immediate add (no upload needed)

✅ **Visual Design**
- Polaroid frames
- Washi tape
- Decorative pins
- Random rotations
- Scissors cursor

✅ **Terminal**
- Shows current time (HH:MM format)
- Appears after 3.2 second delay
- Type `help` for commands

## Troubleshooting

### Upload Not Working?
1. Check Firebase config in `.env`
2. Make sure you're logged in
3. Check browser console for errors
4. Verify file is under 5MB
5. Ensure file is an image type

### Terminal Not Showing?
- Wait 3-4 seconds after page load
- It has a deliberate delay for animation

### Cursor Not Showing?
- Make sure you're on the scrapbook page
- Cursor is scissors with trail effect
- Only shows on `/scrapbook` route

## Test Images

You can test with:
- Any local image file
- GIFs from Giphy
- Photos from Unsplash: `https://source.unsplash.com/random/800x600`
- Any direct image URL

## Expected Behavior

1. **Upload**: File → Firebase Storage → URL → Firestore
2. **Display**: Polaroid card with image, title, caption
3. **Cursor**: Scissors following mouse
4. **Terminal**: Shows time, accepts commands
