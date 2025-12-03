# GRIMR - Horror Writing Platform

A dark, eerie, possessed horror writing platform built with React, TypeScript, and Framer Motion.

## 🎃 Features

- **Blood Cursor**: Every click creates realistic blood splatter with dripping animation
- **Eerie Atmosphere**: Flickering candles, slow-crawling spiders, ambient flies
- **Possessed Effects**: Text glitches, possession twitches, unpredictable timing
- **Realistic Horror**: Very dark aesthetic, subtle movements, authentic textures
- **3D Skull** (optional): Scroll-driven possessed skull on About page

## 🚀 Quick Start

```bash
# Install dependencies
npm install

# Run development server
npm run dev

# Open browser to:
http://localhost:5173/
```

## 📁 Project Structure

```
grimr-starter/
├── src/
│   ├── App.tsx              # Main application with all pages
│   ├── SkullSceneAbout.tsx  # 3D skull scene (optional)
│   ├── main.tsx             # Entry point
│   └── index.css            # Tailwind styles
├── public/
│   └── models/
│       └── README.md        # Instructions for skull model
└── package.json
```

## 🎨 Pages

### Landing
- Flickering GRIMR logo
- 4 slow-moving spiders
- Blood splatter on click
- Very dark, eerie atmosphere

### Stories (Library)
- Book spines on shelf
- Flickering candle (bottom-right)
- 6 ambient flies
- Hover to see book details

### Reader
- Open book layout
- Flanking candles with flicker
- Wax drip progress timer
- Occasional text glitches

### Contact
- Dark form interface
- CRT screen with girl silhouette
- Static effect on submit
- Pendulum cross animation

### About
- Content cards about the project
- 5 slow spiders
- 12 ambient flies
- Optional 3D skull (requires model)

## 🎭 Horror Elements

### Blood Cursor
- Appears on every click
- Dark red (#4a0000) with drips
- Fades after 900ms
- Active on all pages

### Spiders
- Only 4-6 total (very few)
- 35-60 second movement cycles (very slow)
- Opacity 0.4-0.5 (very subtle)
- Realistic crawl patterns
- Only on Landing and About pages

### Candles
- Eerie flicker patterns
- Unpredictable timing
- Wax drip effects
- Ambient glow

### Flies
- 6-12 per page
- Slow, erratic movement
- Grayscale appearance
- Background layer

## 🦴 3D Skull (Optional)

The About page can display a 3D possessed skull with:
- Scroll-driven twitches
- Idle drift animation
- Wet glint effects
- Possession spikes
- Post-processing (Glitch, Noise, Vignette)

### To Enable:

1. Download a skull GLB model from:
   - [Sketchfab](https://sketchfab.com/search?q=skull&type=models)
   - [TurboSquid](https://www.turbosquid.com/Search/3D-Models/free/skull)
   - [CGTrader](https://www.cgtrader.com/free-3d-models/skull)

2. Save as: `public/models/tarred_skull.glb`

3. In `src/App.tsx`, uncomment:
   ```typescript
   // Line 3:
   import SkullSceneAbout from "./SkullSceneAbout";
   
   // Line ~1009:
   <SkullSceneAbout />
   ```

4. Refresh browser

## 🛠️ Tech Stack

- **React 18** - UI framework
- **TypeScript** - Type safety
- **Vite** - Build tool
- **Tailwind CSS** - Styling
- **Framer Motion** - Animations
- **Three.js** - 3D graphics (optional)
- **React Three Fiber** - React renderer for Three.js
- **@react-three/drei** - Three.js helpers
- **@react-three/postprocessing** - Post-processing effects

## 🎨 Design Philosophy

### Darkness
- Almost black backgrounds (#020202, #030303, #050505)
- Very subtle effects
- Minimal lighting

### Realism
- Authentic textures (aged paper, wax, bone)
- Realistic physics (drips, crawls, flickers)
- Natural timing (unpredictable, varied)

### Possession
- Glitches and twitches
- Unpredictable behavior
- Eerie atmosphere
- Subtle horror (no jump scares)

## 📝 Customization

### Adjust Spider Count
```typescript
// In Landing component:
<SpiderField count={4} /> // Change number

// In About component:
<SpiderField count={5} /> // Change number
```

### Adjust Fly Count
```typescript
// In Stories component:
<DirtyFlies count={6} /> // Change number

// In About component:
<DirtyFlies count={12} /> // Change number
```

### Adjust Darkness
```typescript
// In each page component, change bg color:
bg-[#020202] // Darker
bg-[#0a0a0a] // Lighter
```

### Adjust Flicker Intensity
```typescript
// In Landing component, change flicker timing:
const next = 6000 + Math.random() * 12000; // More frequent
const next = 10000 + Math.random() * 20000; // Less frequent
```

## 🐛 Troubleshooting

See [TROUBLESHOOTING.md](./TROUBLESHOOTING.md) for common issues and solutions.

See [TEST_INSTRUCTIONS.md](./TEST_INSTRUCTIONS.md) for testing guide.

## 📄 License

MIT

## 🎃 Built for Kiroween 2024

A demonstration of spec-driven development with Kiro AI.
