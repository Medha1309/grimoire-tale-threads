# Investigation Room - About Page Redesign

## Concept
An abandoned detective's office where someone was investigating the app before they disappeared. The room tells the story through a cinematic sequence featuring a self-typing typewriter and polaroid evidence wall with jump scares.

## Cinematic Sequence (45-60 seconds)

### Phase 1: Opening (0-5s)
- Fade in to dark room
- Single desk lamp flickers on
- Dust particles visible in light cone
- Atmospheric tension builds

### Phase 2: Typewriter (5-20s)
- Old typewriter on desk starts typing by itself
- Realistic mechanical sounds (synthesized audio)
- Types investigation notes about the app
- Paper has vintage texture and realistic shadows
- Each keystroke has slight timing variation

### Phase 3: Camera Pan to Polaroids (20-35s)
- View transitions to wall covered in polaroids
- Photos connected by red string (evidence board style)
- Each polaroid represents an app feature (sequential tour):
  - THE LIBRARY - Entry point, horror fiction collection
  - CONFESSIONAL BOOTH - Private encrypted diary in Dollhouse
  - MEMORY SCRAPBOOK - Photo preservation in Dollhouse
  - GILDED PARLOUR - Anonymous whisper forum
  - READING ARCHIVE - Reading history tracker in Dollhouse
  - MYSTERY - Face down, slowly turning (triggers scare)

### Phase 4: The Glitch (35-40s)
- Reality starts breaking
- RGB split effects
- Scan lines and digital noise
- Polaroids begin bleeding
- Typewriter types faster, text corrupts
- Red color bleeds into scene

### Phase 5: Jump Scare (40-42s)
- Mystery polaroid fully reveals
- Giant eye staring directly at viewer
- White flash with harsh audio
- Screen shake effect
- Red overlay pulse

### Phase 6: Resolution (42-60s)
- Everything settles into interactive state
- Typewriter stops on final message: "DO NOT"
- Polaroids become clickable navigation
- Subtle parallax follows mouse
- Room remains unsettling but explorable

## Interactive Features (Post-Sequence)

### Polaroid Wall
- Click polaroids to navigate to features
- Hover reveals dark secrets
- Subtle "watching" effect with mouse tracking
- Photos show disturbing details on close inspection

### Mind Games
- Polaroid details change if you look away
- Red string connections shift slightly
- Dust particles move unnaturally
- Shadows don't quite match light source

### Skip/Replay
- First-time visitors can skip sequence
- Replay button available after completion
- Sequence state saved in localStorage

## Technical Implementation

### Components Created
1. **InvestigationRoom.tsx** - Main container with lighting and atmosphere
2. **CinematicSequenceController.tsx** - Orchestrates timing and phase transitions
3. **TypewriterSequence.tsx** - Self-typing investigation notes with audio
4. **PolaroidWall.tsx** - Interactive evidence board with navigation
5. **GlitchEffect.tsx** - Reality-breaking visual corruption
6. **JumpScareFlash.tsx** - Sudden visual and audio shock
7. **ParallaxMouseEffect.tsx** - Subtle mouse tracking for unease

### Audio System
- Web Audio API for synthesized sounds
- Typewriter clicks (randomized pitch/timing)
- Jump scare dissonant tones (200Hz + 666Hz)
- No external audio files needed

### Visual Effects
- Radial gradient lighting (desk lamp cone)
- Dust particle animation in light
- Film grain texture on polaroids
- RGB chromatic aberration
- Scan line distortion
- Digital noise overlay
- Screen shake transforms

### Performance
- Minimal DOM elements
- CSS transforms for animations
- RequestAnimationFrame for smooth motion
- Lazy loading of effects
- Cleanup on unmount

## Content

### Typewriter Text (Sequential App Tour)
```
CASE FILE #2847 - "THE APPLICATION"

Subject: Digital horror platform
Status: INVESTIGATION TERMINATED

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

ENTRY POINT: THE LIBRARY
User enters through collection of horror stories.
Browse curated tales, read community fiction.
Bookmark favorites, track reading history.
Writers publish their darkest works here.
Stories feel... aware. Titles change when 
you're not looking. Characters remember you.
[WARNING: READERS REPORT STORIES FOLLOWING THEM]

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

ROOM 1: THE DOLLHOUSE
Private diary system, multiple "rooms" inside:

→ CONFESSIONAL BOOTH
  Write encrypted diary entries
  Lock secrets behind passwords
  Entries sealed with wax, ribbons
  Only you can read them... supposedly

→ MEMORY SCRAPBOOK  
  Upload photos with vintage filters
  Add stickers, scratch-off secrets
  Polaroid aesthetic, pink horror theme
  Photos develop details you didn't capture

→ READING ARCHIVE
  Track every story you've read
  Pink matrix rain background
  Your reading history watches back
  [DATA SHOWS ENTRIES WRITTEN BY NO ONE]

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

ROOM 2: THE GILDED PARLOUR
Anonymous forum, Victorian horror aesthetic.
Users post "whispers" - no names, just words.
Candles for likes, watching eyes everywhere.
Red string connects related posts.
Chandelier drips above conversations.
Report system, share features, replies.
Threads feel alive. Something reads every
word. Walls have ears. Literally.
[SUBJECTS REPORT HEARING WHISPERS BACK]

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

FINAL OBSERVATION:
The application presents as creative platform.
Reality: It's a living thing. It learns you.
Your confessions feed it. Your stories 
become part of it. Your whispers echo in
halls that shouldn't exist.

Three test subjects entered.
Two stopped responding.
The third keeps writing but claims
they never leave the site anymore.

RECOMMENDATION: DO NOT
```

### Polaroid Evidence Board (6 Photos)
1. **THE LIBRARY** - "The stories read you back"
2. **CONFESSIONAL BOOTH** - "Your secrets feed it"
3. **MEMORY SCRAPBOOK** - "Photos show what you forgot"
4. **GILDED PARLOUR** - "The walls have ears"
5. **READING ARCHIVE** - "It remembers everything"
6. **MYSTERY** - "IT SEES YOU" (triggers jump scare)

## Design Philosophy

### Scary Elements
- Abandoned investigation implies danger
- Self-typing suggests supernatural presence
- Evidence board creates paranoia
- Jump scare provides visceral shock
- Watching eyes create ongoing unease

### Intelligent Design
- Detective/investigation framing
- Evidence-based storytelling
- Psychological horror over gore
- Reality-bending effects
- Meta-narrative about the app itself

### Realistic Aesthetics
- Authentic typewriter mechanics
- Realistic lighting and shadows
- Physical paper texture
- Vintage polaroid appearance
- Film grain and imperfections

## User Experience

### First Visit
1. Brief darkness (2s)
2. Lamp flickers on
3. Typewriter sequence plays
4. Glitch transition
5. Polaroid wall revealed
6. Jump scare triggers
7. Interactive state unlocked

### Return Visits
- Sequence skipped automatically
- Direct to interactive polaroid wall
- Replay button available
- Maintains atmosphere without repetition

### Navigation
- Polaroids link to app features
- Back button styled as case file tab
- Minimal UI to maintain immersion
- Spiders crawl in background

## Future Enhancements

### Potential Additions
- Whispered audio narration
- More polaroid details that change
- Hidden messages in typewriter text
- Multiple jump scare variations
- Easter eggs in evidence board
- Desk drawer that can be opened
- Coffee cup with steam animation
- Window with shadow passing by

### Advanced Effects
- WebGL shader for better glitches
- 3D perspective on polaroids
- Real-time shadow mapping
- Procedural dust generation
- Dynamic lighting based on time

## Testing Notes
- Test on various screen sizes
- Verify audio works in all browsers
- Check localStorage persistence
- Ensure skip button is accessible
- Validate navigation links
- Test performance on mobile
- Verify jump scare timing

## Accessibility Considerations
- Skip button for photosensitive users
- Audio can be muted
- Keyboard navigation support
- Reduced motion option (future)
- Screen reader descriptions (future)
