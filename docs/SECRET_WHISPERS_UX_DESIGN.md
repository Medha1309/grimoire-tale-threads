# Secret Whispers - Anonymous Sharing UX Design

## 🎯 Core Concept
Allow users to anonymously share diary entries to the Forum as "Secret Whispers" - creating a safe space for vulnerability and connection without revealing identity.

## 📍 Current App Structure
- **Diary (Dollhouse)**: Private entries
- **Forum**: Public discussions about stories
- **Library**: Story browsing

## 🎨 UX Design - Three Touch Points

---

## 1️⃣ **WRITING PHASE** - When Creating Entry

### Location: Enhanced Writing Editor
**When**: User is writing a new diary entry

### UI Element: Toggle Switch (Subtle, Non-Intrusive)
```
┌─────────────────────────────────────────────────────┐
│ Mood: [Joy] [Sorrow] [Calm] [Unrest]  ☐ Lock Entry │
│                                                      │
│ ☐ Share anonymously to Forum                        │
│   Your identity will never be revealed              │
└─────────────────────────────────────────────────────┘
```

**Behavior**:
- Checkbox below mood selector
- Unchecked by default
- Tooltip on hover: "Share this entry anonymously with the community. No one will know it's you."
- If checked, shows small info: "This will appear as 'A Secret Whisper' in the Forum"

**Why This Works**:
- ✅ Opt-in, not forced
- ✅ Clear about anonymity
- ✅ Doesn't interrupt writing flow
- ✅ Decision made at creation time

---

## 2️⃣ **REVIEW PHASE** - After Saving Entry

### Location: Entry Detail View (when viewing saved entry)
**When**: User clicks on a diary entry to read it

### UI Element: Action Button
```
┌─────────────────────────────────────────────────────┐
│                    [Your Entry]                      │
│                                                      │
│  [Content of entry...]                              │
│                                                      │
│  Actions:                                           │
│  [🤫 Share as Secret Whisper]  [🔒 Lock]  [🗑️ Delete] │
└─────────────────────────────────────────────────────┘
```

**Button States**:
- **Not shared**: "🤫 Share as Secret Whisper"
- **Already shared**: "✓ Shared Anonymously" (with option to "Remove from Forum")

**Confirmation Modal** (when clicked):
```
┌─────────────────────────────────────────────────────┐
│              Share as Secret Whisper?                │
│                                                      │
│  This entry will be shared anonymously to the Forum. │
│                                                      │
│  ✓ Your name will never appear                      │
│  ✓ You can remove it anytime                        │
│  ✓ You'll see reactions (but stay anonymous)        │
│                                                      │
│  [Cancel]                    [Share Anonymously]    │
└─────────────────────────────────────────────────────┘
```

**Why This Works**:
- ✅ Second chance to share after reflection
- ✅ Clear confirmation prevents accidents
- ✅ Reassures about anonymity
- ✅ Shows it's reversible

---

## 3️⃣ **FORUM DISPLAY** - How Whispers Appear

### Location: Forum Page
**When**: Users browse the Forum

### Visual Treatment: Special Post Type

**In Forum List**:
```
┌─────────────────────────────────────────────────────┐
│ 🤫 A Secret Whisper                                 │
│ Posted 2 hours ago • Mood: Sorrow                   │
│                                                      │
│ Sometimes I feel like I'm not enough for anyone...  │
│                                                      │
│ 💬 12 supportive replies                            │
└─────────────────────────────────────────────────────┘
```

**Visual Differences from Regular Posts**:
- 🤫 Whisper emoji instead of user avatar
- "A Secret Whisper" instead of username
- Slightly darker/softer background
- Mood indicator (Joy/Sorrow/Calm/Unrest)
- No author attribution anywhere

**For the Author (Only They See)**:
```
┌─────────────────────────────────────────────────────┐
│ 🤫 A Secret Whisper (Your whisper)                  │
│ Posted 2 hours ago • Mood: Sorrow                   │
│                                                      │
│ Sometimes I feel like I'm not enough for anyone...  │
│                                                      │
│ 💬 12 supportive replies                            │
│ [Remove from Forum]                                 │
└─────────────────────────────────────────────────────┘
```

**Why This Works**:
- ✅ Clearly distinct from regular posts
- ✅ Author can identify their own whispers
- ✅ Others never know who wrote it
- ✅ Mood adds context without identity

---

## 🔄 User Flow - Complete Journey

### Scenario 1: Share During Writing
```
1. User writes diary entry
2. Checks "Share anonymously to Forum"
3. Clicks "Save Entry"
4. Entry saved to diary + posted to Forum
5. Success message: "Entry saved and shared anonymously"
```

### Scenario 2: Share After Writing
```
1. User writes and saves diary entry
2. Later, clicks on entry to read it
3. Clicks "🤫 Share as Secret Whisper"
4. Confirmation modal appears
5. Clicks "Share Anonymously"
6. Posted to Forum
7. Button changes to "✓ Shared Anonymously"
```

### Scenario 3: Remove Whisper
```
1. User views their shared entry in diary
2. Clicks "Remove from Forum"
3. Confirmation: "Remove this whisper from the Forum?"
4. Confirms
5. Removed from Forum (stays in diary)
6. Button returns to "🤫 Share as Secret Whisper"
```

### Scenario 4: View in Forum
```
1. User browses Forum
2. Sees their whisper (marked "Your whisper")
3. Sees others' whispers (anonymous)
4. Can reply to any whisper
5. Replies are also anonymous for whispers
```

---

## 🎭 Anonymity Rules

### What's Hidden:
- ❌ Username
- ❌ Profile picture
- ❌ Any identifying information
- ❌ Writing patterns (no "you also wrote...")

### What's Shown:
- ✅ Entry content
- ✅ Mood (Joy/Sorrow/Calm/Unrest)
- ✅ Timestamp (relative: "2 hours ago")
- ✅ Reply count

### Special Considerations:
- Whispers can't be edited (prevents tracking changes)
- Can only be deleted (removes from Forum entirely)
- Replies to whispers are also anonymous
- No "OP" indicator in replies

---

## 🎨 Visual Design Specs

### Colors:
- Background: Slightly darker than regular posts (`bg-zinc-900/60`)
- Border: Subtle purple glow (`border-purple-900/30`)
- Text: Softer white (`text-zinc-300`)
- Accent: Purple for whisper elements (`#9333ea`)

### Typography:
- Title: "A Secret Whisper" in italic serif
- Content: Same as regular posts
- Mood badge: Small, rounded, color-coded

### Animations:
- Gentle fade-in when appearing
- Subtle pulse on hover
- Whisper icon has slight breathing animation

---

## 📱 Mobile Considerations

### Writing Phase:
- Checkbox appears below mood selector
- Tappable area is large (48px minimum)
- Clear label even on small screens

### Entry View:
- "Share as Secret Whisper" button is prominent
- Confirmation modal is full-screen on mobile
- Easy to tap "Cancel" if accidental

### Forum View:
- Whispers are clearly marked with emoji
- "Your whisper" badge is visible but subtle
- Remove button is in overflow menu (⋮)

---

## 🔒 Privacy & Safety

### Technical Implementation:
- Whispers stored with `isAnonymous: true` flag
- Author ID stored but never exposed in API
- Only author can see connection to their diary
- Firestore rules prevent author lookup

### User Safety:
- Warning before sharing: "Once shared, content is public"
- Can remove anytime
- Report button available on all whispers
- Moderators can remove harmful content

### Community Guidelines:
- Whispers are for vulnerability, not harm
- No identifying information in content
- Supportive replies only
- Report abuse immediately

---

## 💡 Additional Features (Future)

### Phase 2:
- Filter Forum by "Secret Whispers" only
- "Whisper of the Day" feature
- Anonymous reply threads
- Mood-based whisper browsing

### Phase 3:
- Whisper analytics (for author only)
- "This helped me" reactions
- Whisper collections/themes
- Guided whisper prompts

---

## 🎯 Success Metrics

### User Engagement:
- % of diary entries shared as whispers
- Time between writing and sharing
- Whisper retention rate (not deleted)

### Community Health:
- Reply rate on whispers
- Positive sentiment in replies
- Report rate (should be low)

### User Satisfaction:
- Survey: "Do you feel safe sharing whispers?"
- Survey: "Have whispers helped you feel less alone?"
- NPS for whisper feature

---

## 🚀 Implementation Priority

### MVP (Phase 1):
1. ✅ Checkbox in writing editor
2. ✅ Share button in entry detail view
3. ✅ Whisper display in Forum
4. ✅ Remove whisper functionality
5. ✅ "Your whisper" indicator

### Nice-to-Have (Phase 2):
- Whisper filter in Forum
- Enhanced confirmation modal
- Whisper statistics
- Mood-based browsing

---

## 📝 Copy & Microcopy

### Buttons:
- "Share anonymously to Forum"
- "Share as Secret Whisper"
- "Remove from Forum"
- "✓ Shared Anonymously"

### Tooltips:
- "Share this entry anonymously. No one will know it's you."
- "This is your whisper. Only you can see this label."
- "Remove this whisper from the Forum. It will stay in your diary."

### Confirmations:
- "Share as Secret Whisper?"
- "Remove this whisper from the Forum?"
- "Entry saved and shared anonymously"

### Forum Display:
- "A Secret Whisper"
- "Your whisper"
- "Posted [time] ago • Mood: [mood]"

---

## ✨ Why This UX Works

1. **Progressive Disclosure**: Option appears when relevant, not overwhelming
2. **Clear Affordances**: Buttons and checkboxes are obvious
3. **Safety First**: Multiple confirmations, clear anonymity promises
4. **Reversible**: Can always remove whispers
5. **Contextual**: Mood adds meaning without identity
6. **Discoverable**: Natural placement in existing flows
7. **Consistent**: Matches app's gothic horror aesthetic
8. **Empowering**: User controls when/if to share

This design creates a safe, intuitive way for users to share vulnerable moments while maintaining complete anonymity and control.
