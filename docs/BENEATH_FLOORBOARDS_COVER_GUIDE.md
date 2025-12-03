# Cover Image Guide: "Beneath the Floorboards"

## Story Summary
A psychological horror tale inspired by Poe's "The Tell-Tale Heart" - a man buries a body beneath the floorboards and is haunted by the relentless sound of the dead man's heartbeat.

## Ideal Cover Concepts

### Option 1: Creaking Floorboards (Recommended)
**Search Terms:**
- "old wooden floorboards dark gif"
- "creaking floor horror gif"
- "wooden planks shadows gif"
- "dark floor cracks gif"

**What to Look For:**
- Dark, aged wooden floorboards
- Shadows moving across the wood
- Cracks or gaps between boards
- Atmospheric lighting from below
- Subtle movement suggesting something underneath

### Option 2: Heartbeat/Pulse Visual
**Search Terms:**
- "heartbeat pulse dark gif"
- "heart monitor horror gif"
- "pulsing red dark gif"
- "beating heart shadow gif"

**What to Look For:**
- Rhythmic pulsing effect
- Dark red or black color scheme
- Subtle, ominous movement
- Medical/anatomical imagery

### Option 3: Hand Reaching Through Floor
**Search Terms:**
- "hand reaching through floor gif"
- "hand breaking through wood gif"
- "fingers through floorboards gif"
- "hand emerging darkness gif"

**What to Look For:**
- Pale hand breaking through wood
- Fingers grasping upward
- Splinters and cracks
- Dark, claustrophobic feeling

## Recommended Free GIF Sources

### 1. Giphy
- URL: https://giphy.com
- Search: "dark floorboards", "creaking floor", "heartbeat horror"
- Filter: Dark, horror aesthetic
- License: Free to use with attribution

### 2. Tenor
- URL: https://tenor.com
- Search: "horror floor", "wooden planks dark", "pulse horror"
- Good for atmospheric loops

### 3. Pixabay
- URL: https://pixabay.com/gifs/
- Search: "dark wood", "horror", "heartbeat"
- License: Free for commercial use

### 4. Pexels
- URL: https://www.pexels.com/search/videos/dark%20floor/
- Convert video to GIF if needed
- High quality, free license

## Specific Recommendations

### Best Match #1: Dark Wooden Floor with Shadows
```
Search: "dark wooden floor shadows gif" on Giphy
Look for: Slow panning across old floorboards with moving shadows
Effect: Suggests something lurking beneath
```

### Best Match #2: Pulsing Red Glow
```
Search: "heartbeat red pulse gif" on Giphy
Look for: Rhythmic red pulsing on black background
Effect: Represents the relentless heartbeat
```

### Best Match #3: Cracked Floor with Light
```
Search: "floor cracks light gif" on Giphy
Look for: Light seeping through cracks in floorboards
Effect: Something trying to escape from below
```

## How to Add to Your Project

Once you find the perfect GIF:

1. **Get the GIF URL:**
   - Right-click on the GIF
   - Copy image address
   - Use the direct .gif URL

2. **Update the story data:**
   ```typescript
   // In src/data/stories.ts
   {
     slug: "beneath-the-floorboards",
     title: "Beneath the Floorboards",
     author: "E. A. Poe",
     cover: "YOUR_GIF_URL_HERE",
     coverType: "gif",
     // ... rest of story
   }
   ```

3. **Test the cover:**
   - Navigate to the Library page
   - Check that the GIF loads and animates
   - Verify it looks good with the shadow effect

## Color Palette Suggestions

For this story, look for GIFs with:
- **Dark browns**: Aged wood
- **Deep blacks**: Shadows and darkness
- **Dark reds**: Blood/heartbeat imagery
- **Muted grays**: Dust and decay

Avoid:
- Bright colors
- Fast, jarring animations
- Modern or clean aesthetics

## Alternative: Create Your Own

If you can't find the perfect GIF, you could:
1. Use a static image of dark floorboards
2. The genre effects (flickering candlelight for horror) will add movement
3. The shadow overlay will create the eerie atmosphere

## Current Story Entry

The story currently exists in `src/data/stories.ts` at line 83. It needs a `cover` property added:

```typescript
{
  slug: "beneath-the-floorboards",
  title: "Beneath the Floorboards",
  author: "E. A. Poe",
  cover: "", // ADD GIF URL HERE
  coverType: "gif", // ADD THIS
  content: [...],
  genre: "horror",
  blurb: "..."
}
```

## Pro Tips

1. **Preview before committing**: Test the GIF URL in your browser first
2. **Check file size**: Smaller GIFs load faster (aim for under 2MB)
3. **Loop quality**: Make sure the GIF loops smoothly
4. **Atmosphere over action**: Subtle, slow movement is creepier than fast action
5. **Test with shadow effect**: Remember the GIF will be darkened and desaturated

The perfect cover will enhance the story's psychological horror - the feeling that something terrible is hidden just beneath the surface, waiting to be discovered.
