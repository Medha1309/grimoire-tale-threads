# 🎮 Boudoir Games - Quick Start

## What's Been Created

### ✅ Components
- **OuroborosGame** - Spectral snake game with pink aesthetic
- **HauntedPacmanGame** - Ghost maze game with purple aesthetic  
- **BoudoirTerminal** - Retro terminal interface for launching games
- **useGameArchive** - Hook for tracking game sessions

### ✅ Features
- Two fully playable retro games
- Terminal command interface
- Automatic session logging to Archive
- Comprehensive statistics tracking
- Cryptic messages for wins/losses
- Keyboard controls (WASD + Arrows)
- Smooth animations with Framer Motion

## Quick Integration

### 1. Import the Terminal
```typescript
import { BoudoirTerminal } from '../components/diary/BoudoirTerminal';
```

### 2. Add to Your Component
```typescript
const [showTerminal, setShowTerminal] = useState(false);

return (
  <div>
    <button onClick={() => setShowTerminal(true)}>
      Open Terminal
    </button>
    
    {showTerminal && (
      <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-sm">
        <BoudoirTerminal onClose={() => setShowTerminal(false)} />
      </div>
    )}
  </div>
);
```

### 3. Test It
1. Click "Open Terminal"
2. Type `help` to see commands
3. Type `EXECUTE SNAKE` to play Ouroboros
4. Type `EXECUTE PACMAN` to play Haunted Pac-Man
5. Type `STATS` to see your game statistics
6. Type `HISTORY` to see recent sessions

## Terminal Commands

| Command | Description |
|---------|-------------|
| `help` | Show all commands |
| `EXECUTE SNAKE` | Launch Ouroboros |
| `LAUNCH OUROBOROS` | Launch Ouroboros |
| `EXECUTE PACMAN` | Launch Haunted Pac-Man |
| `LAUNCH SPIRITS` | Launch Haunted Pac-Man |
| `STATS` | View game statistics |
| `HISTORY` | View recent sessions |
| `CLEAR` | Clear terminal |
| `EXIT` | Close terminal |

## Game Controls

### Both Games
- **WASD** or **Arrow Keys** - Move
- **ESC** - Exit game

## Archive Integration

All game sessions are automatically saved with:
- Game name (Ouroboros or Haunted Pac-Man)
- Result (won or lost)
- Final score
- Duration in seconds
- Cryptic message displayed
- Timestamp

Access via the Archive Room to see:
- Total games played
- Win/loss records
- High scores
- Average scores
- Best completion times

## Files Created

```
src/
├── components/
│   ├── games/
│   │   ├── OuroborosGame.tsx          # Snake game
│   │   └── HauntedPacmanGame.tsx      # Pac-Man game
│   └── diary/
│       └── BoudoirTerminal.tsx        # Terminal interface
├── hooks/
│   └── useGameArchive.ts              # Game session management
└── types/
    └── archive.ts                     # Extended with game types

docs/
├── BOUDOIR_GAMES_COMPLETE.md          # Full documentation
├── BOUDOIR_GAMES_INTEGRATION_GUIDE.md # Integration guide
└── BOUDOIR_GAMES_QUICK_START.md       # This file

public/
└── test-boudoir-games.html            # Visual preview
```

## Preview

Open `public/test-boudoir-games.html` in your browser to see:
- Visual design preview
- Command reference
- Statistics examples
- Integration code snippets

## Customization

### Change Colors
Edit the color values in the game components:
- Ouroboros: `#ec4899` (pink)
- Haunted Pac-Man: `#a855f7` (purple)

### Adjust Difficulty
In the game components:
- `INITIAL_SPEED` - Starting speed
- `SPEED_INCREMENT` - Speed increase per food
- `GRID_SIZE` - Game board size
- `GHOST_COUNT` - Number of ghosts (Pac-Man)

### Add More Messages
Add to the `crypticMessages` arrays in each game component.

## Next Steps

1. **Integrate into Boudoir** - Add terminal trigger to your Boudoir page
2. **Test Games** - Play both games and verify they work
3. **Check Archive** - Verify sessions are being logged
4. **Customize** - Adjust colors, speeds, messages to your liking
5. **Add More Games** - Use the same pattern to add more games

## Troubleshooting

**Terminal won't open?**
- Check z-index is high enough (50+)
- Verify state management

**Games not launching?**
- Check console for errors
- Verify imports are correct

**Archive not saving?**
- Check localStorage is enabled
- Verify useGameArchive hook is called

## Support

See full documentation:
- `docs/BOUDOIR_GAMES_COMPLETE.md` - Complete feature list
- `docs/BOUDOIR_GAMES_INTEGRATION_GUIDE.md` - Detailed integration

---

**Status:** ✅ Ready to Use
**Version:** 1.0.0
**Last Updated:** December 2, 2025

Enjoy your haunted retro games! 🎮👻
