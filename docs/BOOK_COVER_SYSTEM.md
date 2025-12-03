# Book Cover System

## Overview
The Library now supports animated book covers using images, GIFs, and short videos. This creates a more engaging visual experience while avoiding copyright issues by allowing users to upload their own cover media.

## Supported Formats

### 1. **Static Images**
- **Formats**: JPG, PNG
- **Use case**: Traditional book covers
- **Display**: Static image with subtle overlay effects
- **Opacity**: 25% (heavily filtered for atmospheric effect)

### 2. **Animated GIFs**
- **Format**: GIF
- **Use case**: Subtle animations (flickering candles, moving shadows, etc.)
- **Display**: Animated with grayscale filter
- **Opacity**: 35% (slightly more visible than static images)
- **Best for**: Looping atmospheric effects

### 3. **Short Videos**
- **Formats**: MP4, WebM
- **Max duration**: 10 seconds
- **Use case**: More complex animations (smoke, fire, water, etc.)
- **Display**: Auto-playing, looping, muted video
- **Opacity**: 40% (most visible of all formats)
- **Best for**: Dynamic atmospheric effects

## File Constraints

- **Max file size**: 5MB (for performance)
- **Video max duration**: 10 seconds (keeps files small)
- **Accepted types**: 
  - `image/jpeg`, `image/jpg`, `image/png` (static)
  - `image/gif` (animated)
  - `video/mp4`, `video/webm` (video)

## Copyright Solution

### Problem
Using copyrighted book cover images (even from public sources) can lead to legal issues.

### Solution
1. **User-uploaded content**: Authors upload their own covers
2. **Default fallback**: Books without custom covers use generated designs
3. **Atmospheric overlays**: Heavy filtering makes covers more abstract
4. **Genre-based effects**: Procedural animations add uniqueness

### Benefits
- No copyright concerns
- Unique, personalized covers
- Encourages creativity
- Better performance (optimized uploads)

## Cover Upload Flow

### In Writing Editor
1. Click "Write" button (requires authentication)
2. In sidebar, see "Book Cover" section
3. Click upload area or drag & drop file
4. File is validated (size, type, duration)
5. Preview appears immediately
6. Can change or remove cover anytime
7. Cover is saved with story on publish

### Validation Steps
```typescript
1. Check file size (< 5MB)
2. Check file type (image/gif/video)
3. For videos: Check duration (< 10s)
4. Create preview URL
5. Determine cover type
6. Pass to parent component
```

## Display Behavior

### StoryCard Component
- Detects cover type automatically
- Applies appropriate rendering:
  - **Image**: Background image with CSS
  - **GIF**: Background image (animates automatically)
  - **Video**: `<video>` element with autoplay, loop, muted
- Adds genre-specific overlay effects
- Maintains consistent aesthetic across all types

### Performance Optimizations
- Videos are muted (no audio processing)
- Videos use `playsInline` (mobile compatibility)
- All media is heavily filtered (reduces visual complexity)
- Lazy loading for off-screen cards
- Memoized components prevent re-renders

## Fallback System

### Books Without Covers
For books without custom covers, the system uses:
1. **Genre-based color schemes**
   - Horror: Red glow
   - Mystery: Blue glow
   - Thriller: Purple glow
   - Romance: Orange glow

2. **Procedural animations**
   - Horror: Flickering candle, blinking eye
   - Mystery: Rising fog, shadow figure
   - Thriller: Pulsing energy, lightning
   - Romance: Soft glow, floating particles

3. **Title and author overlay**
   - Elegant serif typography
   - Ornate borders
   - Atmospheric shadows

## Integration with Firebase

### Storage Structure
```
/covers/
  /{userId}/
    /{storyId}/
      cover.{ext}
```

### Metadata Stored
```typescript
{
  coverUrl: string;
  coverType: 'image' | 'gif' | 'video';
  coverSize: number;
  uploadedAt: timestamp;
}
```

### Upload Process
1. User selects file
2. Validate locally
3. Upload to Firebase Storage
4. Get download URL
5. Save URL + type to Firestore
6. Display in UI

## Best Practices

### For Authors
- **Images**: Use high-contrast, simple designs
- **GIFs**: Keep animations subtle and looping
- **Videos**: Focus on atmospheric effects, not complex scenes
- **File size**: Compress before uploading
- **Aspect ratio**: 2:3 (portrait) works best

### For Developers
- Always validate file size and type
- Provide clear error messages
- Show upload progress for large files
- Implement proper error handling
- Clean up preview URLs to prevent memory leaks

## Accessibility

- All covers have text overlays (title/author)
- Videos are muted (no audio dependency)
- Fallback to static image if video fails
- High contrast text for readability
- Keyboard navigation supported

## Future Enhancements

Potential additions:
- **AI-generated covers**: Create covers from story content
- **Cover templates**: Pre-made designs users can customize
- **Cover editor**: Built-in tools for adjustments
- **Multiple covers**: A/B testing different designs
- **Cover gallery**: Browse and use community covers
- **Animation presets**: Pre-made effects to apply

## Technical Details

### CoverUploader Component
- Handles file selection and validation
- Creates preview URLs
- Manages upload state
- Provides error feedback
- Supports drag & drop

### StoryCard Updates
- New `coverType` prop
- Conditional rendering based on type
- Video element with proper attributes
- Maintains existing animations
- Backward compatible

### NovelWritingEditor Integration
- Cover uploader in sidebar
- Real-time preview
- Persists across sessions (localStorage)
- Clears on successful publish
- Optional feature (can be disabled)

## Example Usage

```typescript
// In writing editor
<NovelWritingEditor
  cover={storyCover}
  coverType={storyCoverType}
  onCoverChange={(url, type) => {
    setStoryCover(url);
    setStoryCoverType(type);
  }}
  // ... other props
/>

// In story card
<StoryCard
  cover={story.cover}
  coverType={story.coverType}
  // ... other props
/>
```

## Conclusion

The book cover system provides a flexible, copyright-safe solution for animated book covers. It supports multiple media types, maintains performance, and enhances the visual appeal of the Library while giving authors creative control over their book presentation.
