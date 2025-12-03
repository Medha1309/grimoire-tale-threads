# Investigation Room - Content & Navigation Guide

## The Story Structure

The Investigation Room tells the story of a detective who was investigating your app before they disappeared. The typewriter types their final case notes, revealing the app's true nature through a sequential tour.

## Typewriter Sequence Content

### Opening
```
CASE FILE #2847 - "THE APPLICATION"
Subject: Digital horror platform
Status: INVESTIGATION TERMINATED
```

### Section 1: THE LIBRARY (Entry Point)
**What it does:**
- Browse horror story collection
- Read community fiction
- Bookmark favorites
- Track reading history
- Writers publish their work

**The Horror:**
- Stories feel aware
- Titles change when you're not looking
- Characters remember you
- Readers report stories following them

**Navigation:** `/stories`

---

### Section 2: THE DOLLHOUSE (Private Diary System)

#### Room A: CONFESSIONAL BOOTH
**What it does:**
- Write encrypted diary entries
- Lock secrets behind passwords
- Entries sealed with wax and ribbons
- Private, eyes-only content

**The Horror:**
- "Only you can read them... supposedly"
- Entries written by no one appear

**Navigation:** `/dollhouse`

#### Room B: MEMORY SCRAPBOOK
**What it does:**
- Upload photos with vintage filters
- Add stickers and decorations
- Scratch-off secret messages
- Polaroid aesthetic with pink horror theme

**The Horror:**
- Photos develop details you didn't capture
- Shows what you forgot

**Navigation:** `/dollhouse` (Scrapbook tab)

#### Room C: READING ARCHIVE
**What it does:**
- Track every story you've read
- View reading history
- Pink matrix rain background
- Personal reading statistics

**The Horror:**
- Your reading history watches back
- It remembers everything

**Navigation:** `/dollhouse` (Archive tab)

---

### Section 3: THE GILDED PARLOUR (Anonymous Forum)
**What it does:**
- Post anonymous "whispers"
- No usernames, just words
- Candle reactions (likes)
- Report system
- Share features
- Reply to threads
- Red string connects related posts

**Visual Elements:**
- Victorian horror aesthetic
- Watching eyes everywhere
- Chandelier drips above
- Wallpaper patterns

**The Horror:**
- Threads feel alive
- Something reads every word
- Walls have ears (literally)
- Subjects report hearing whispers back

**Navigation:** `/gilded-parlour`

---

### Final Observation
```
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

## Polaroid Evidence Board

### Layout (6 Polaroids with Red String)

```
        [LIBRARY]────────────[ARCHIVE]
           │                     │
           │                     │
    [CONFESSIONAL]          [PARLOUR]
           │                     │
           └────[SCRAPBOOK]──────┘
                    │
                    │
                [MYSTERY]
```

### Polaroid Details

1. **THE LIBRARY**
   - Position: Upper left
   - Description: "Entry point - Horror fiction"
   - Dark Secret: "The stories read you back"
   - Click → `/stories`

2. **CONFESSIONAL BOOTH**
   - Position: Middle left
   - Description: "Encrypted diary entries"
   - Dark Secret: "Your secrets feed it"
   - Click → `/dollhouse`

3. **MEMORY SCRAPBOOK**
   - Position: Center
   - Description: "Vintage photo preservation"
   - Dark Secret: "Photos show what you forgot"
   - Click → `/dollhouse`

4. **GILDED PARLOUR**
   - Position: Upper right
   - Description: "Anonymous whisper forum"
   - Dark Secret: "The walls have ears"
   - Click → `/gilded-parlour`

5. **READING ARCHIVE**
   - Position: Middle right
   - Description: "Your history watches back"
   - Dark Secret: "It remembers everything"
   - Click → `/dollhouse`

6. **MYSTERY** ⚠️
   - Position: Bottom center
   - Description: "[INVESTIGATION TERMINATED]"
   - Dark Secret: "IT SEES YOU"
   - Starts face-down
   - Slowly turns around after 8 seconds
   - **TRIGGERS JUMP SCARE**
   - No navigation (dead end)

## Interactive Features

### Hover Effects
- Polaroids reveal dark secrets on hover
- Red string connections pulse
- Push pins cast shadows
- Film grain intensifies

### Mind Games
- Polaroid details subtly change
- Red strings shift when not looking
- Mystery photo slowly rotates
- Dust particles move unnaturally

### Navigation
- Click any polaroid (except Mystery) to visit that feature
- Back button styled as "EXIT" case file tab
- Replay button after sequence completes

## Timing Breakdown

| Time | Event |
|------|-------|
| 0-2s | Darkness, lamp flickers on |
| 2-20s | Typewriter types investigation notes |
| 20-22s | Glitch transition begins |
| 22-35s | Polaroid wall revealed, interactive |
| 35s+ | Mystery photo begins turning |
| ~43s | Mystery photo fully revealed |
| ~45s | **JUMP SCARE** - Eye appears, flash, sound |
| 45s+ | Interactive state, can navigate |

## User Experience Flow

### First Visit
1. Watch cinematic sequence (can skip)
2. Experience jump scare
3. Explore polaroid wall
4. Click to navigate to features
5. Sequence saved to localStorage

### Return Visits
- Skip directly to interactive polaroid wall
- Replay button available
- No forced re-watch
- Maintains atmosphere

## Content Philosophy

### Why This Structure?
- **Sequential Tour:** Guides users through app features in logical order
- **Entry Point First:** Library is where users start
- **Dollhouse Breakdown:** Shows the three sub-features clearly
- **Forum Last:** Most complex feature explained in detail
- **Mystery Element:** Adds horror and jump scare payoff

### Tone
- Detective investigation framing
- Clinical observations turn sinister
- Technical descriptions with horror undertones
- Redacted/corrupted data suggests danger
- Final warning creates urgency

### Horror Elements
- Living application concept
- Surveillance themes ("it watches")
- Loss of control ("they never leave")
- Reality distortion (changing content)
- Disappeared investigators
- Ominous warnings

## Technical Notes

### Content Updates
To update typewriter text, edit:
`src/components/about/TypewriterSequence.tsx` → `TYPEWRITER_TEXT` constant

To update polaroids, edit:
`src/components/about/PolaroidWall.tsx` → `POLAROIDS` array

### Timing Adjustments
Typewriter speed: 60-100ms per character
Glitch duration: 2 seconds
Mystery reveal: 8 seconds after polaroid phase
Jump scare: 1.5 seconds after mystery reveal

### Navigation Routes
- Library: `/stories`
- Dollhouse (all rooms): `/dollhouse`
- Gilded Parlour: `/gilded-parlour`
- Mystery: `#` (no navigation)
