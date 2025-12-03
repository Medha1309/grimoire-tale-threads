# Contact Form Redesign - Gothic Horror Aesthetic

## Changes Made

### Input & Textarea Components Enhanced

**Visual Improvements:**
- Dark translucent background (`bg-black/40`) with backdrop blur
- Gothic serif font with wider tracking
- Deeper, more atmospheric borders (`border-zinc-800/60`)
- Subtle inner shadow for depth
- Red glow effect on focus with shadow (`shadow-[0_0_20px_rgba(127,29,29,0.15)]`)
- Increased padding for better presence (`px-4 py-3`)
- Rounded corners (`rounded-lg`) for softer feel

**Label Styling:**
- Uppercase serif font with letter-spacing
- Muted zinc-400 color
- Increased margin for breathing room

**Error & Helper Text:**
- Serif font for consistency
- Softer red for errors (`text-red-400/90`)
- Italic helper text in zinc-600

### Color Palette

**Borders:**
- Default: `border-zinc-800/60` (dark, subtle)
- Hover: `border-zinc-700/60` (slightly lighter)
- Focus: `border-red-900/40` → `border-red-800/60` (crimson glow)
- Error: `border-red-900/60` (deep red)

**Backgrounds:**
- Input/Textarea: `bg-black/40` with `backdrop-blur-sm`
- Creates depth while maintaining readability

**Focus Effects:**
- Ring: `focus:ring-red-950/20` (subtle outer glow)
- Shadow: `shadow-[0_0_20px_rgba(127,29,29,0.15)]` (crimson aura)

## Visual Vibe

The redesigned form now matches the gothic horror aesthetic:
- **Dark & Mysterious**: Deep blacks with translucent layers
- **Elegant**: Serif typography with careful spacing
- **Atmospheric**: Subtle glows and shadows
- **Immersive**: Backdrop blur creates depth
- **Consistent**: Matches the Ouija board and overall app theme

## Technical Details

**File Modified:** `src/components/shared/Input.tsx`

**Components Updated:**
- `Input` - Text inputs with gothic styling
- `Textarea` - Multi-line inputs with same aesthetic

**Transition Duration:** 300ms for smooth, eerie feel

## Usage

The components automatically apply the gothic styling:

```tsx
<Input 
  label="Name"
  placeholder="Your name"
  // Automatically styled with gothic theme
/>

<Textarea
  label="Message"
  rows={6}
  placeholder="Tell us everything"
  // Automatically styled with gothic theme
/>
```

## Result

The contact form now feels like you're communicating through an ancient, mystical interface - perfectly matching the Ouija board background and the overall GRIMOIRE aesthetic.
