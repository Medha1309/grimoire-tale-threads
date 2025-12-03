# 🎬 Demo Script for Judges

Step-by-step checklist to validate GRIMOIRE: Tale Threads functionality.

**Estimated Time:** 15-20 minutes  
**Repository:** [github.com/Medha1309/grimoire-tale-threads](https://github.com/Medha1309/grimoire-tale-threads)

---

## 🔐 Step 1: Authentication (2 minutes)

### Login

- [ ] Navigate to the deployed application (or run locally with `pnpm dev`)
- [ ] Click **Login** button
- [ ] Enter credentials:
  - **Email:** `judge@grimoire.test`
  - **Password:** `JudgeDemo2025!`
- [ ] Click **Sign In**
- [ ] **Verify:** You're redirected to the Dollhouse

### Expected Behavior

- Smooth transition with curtain animation
- Welcome message appears
- Navigation bar shows user profile icon

---

## 🏚️ Step 2: Dollhouse Environment (3 minutes)

### Explore Rooms

- [ ] **Observe:** Dollhouse layout with multiple rooms
- [ ] **Hover:** Over each room to see hover effects
- [ ] Click **Diary Room**
- [ ] **Verify:** Smooth transition with room-specific atmosphere
- [ ] Click **Back** button
- [ ] **Verify:** Return to Dollhouse home

### Test Behavioral Triggers

- [ ] **Idle Test:** Don't move mouse for 30 seconds
- [ ] **Verify:** Subtle environmental animations appear
- [ ] **Move mouse:** Animations reset
- [ ] **Tab Switch Test:** Switch to another browser tab for 10 seconds
- [ ] **Return:** Switch back to GRIMOIRE tab
- [ ] **Verify:** "Welcome back" message or subtle effect

### Expected Behavior

- Responsive room transitions
- Atmospheric effects (fog, shadows, vintage filters)
- Behavioral triggers work without breaking UX

---

## 📔 Step 3: Diary System (3 minutes)

### Create Diary Entry

- [ ] Navigate to **Dollhouse** → **Diary Room**
- [ ] Click **New Entry** button
- [ ] Fill in form:
  - **Title:** "Judge Test Entry"
  - **Content:** "Testing the diary system for hackathon evaluation."
  - **Mood:** Select any mood (e.g., "Mysterious")
- [ ] Click **Save**
- [ ] **Verify:** Entry appears in diary list with mood indicator

### Test Encryption

- [ ] Click on the entry you just created
- [ ] **Observe:** Entry opens with typewriter effect
- [ ] **Note:** Entry is encrypted in Firestore (check browser DevTools → Network → Firestore requests)

### Expected Behavior

- Auto-save indicator appears while typing
- Mood-based color coding
- Smooth animations (typewriter, fade-in)
- Entry persists after page refresh

---

## 🧵 Step 4: Tale Threads (Collaborative Stories) (4 minutes)

### Create Project

- [ ] Navigate to **Tale Threads** (Chains menu)
- [ ] Click **Create Project**
- [ ] Fill in form:
  - **Title:** "Judge Test Story"
  - **Description:** "A collaborative horror story for testing."
  - **Permissions:** Select "Open"
- [ ] Click **Create**
- [ ] **Verify:** Project appears in project list

### Submit Proposal

- [ ] Click on the project you just created
- [ ] Click **New Proposal**
- [ ] Fill in proposal:
  - **Content:** "The old house creaked as midnight approached..."
- [ ] Click **Submit Proposal**
- [ ] **Verify:** Proposal appears in proposal list with "Pending" status

### Vote on Proposal

- [ ] Click **Vote** on your proposal
- [ ] Select **Approve**
- [ ] **Verify:** Vote count updates
- [ ] **Verify:** Integrity index updates

### Merge Proposal

- [ ] Click **Merge** on the approved proposal
- [ ] **Verify:** Proposal status changes to "Merged"
- [ ] **Verify:** Project content updates with merged text
- [ ] **Verify:** Diff engine shows changes (green highlights)

### Expected Behavior

- Real-time updates (if multiple users)
- Integrity index calculation
- Diff visualization
- Smooth voting animations

---

## ⛓️ Step 5: Chains (Reflection Sessions) (3 minutes)

### Create Session

- [ ] Navigate to **Chains** → **Reflection Sessions**
- [ ] Click **Create Session**
- [ ] Fill in form:
  - **Title:** "Judge Test Session"
  - **Description:** "Testing real-time collaboration."
- [ ] Click **Create**
- [ ] **Verify:** Session appears in session list

### Join Session

- [ ] Click on the session you just created
- [ ] **Verify:** You enter the session room
- [ ] **Observe:** Your cursor appears as a colored dot
- [ ] **Observe:** Participant bar shows your name

### Test Shared Editor

- [ ] Type in the shared editor: "Testing collaborative editing..."
- [ ] **Verify:** Text appears in real-time
- [ ] **Note:** With multiple users, you'd see their cursors and edits

### Expected Behavior

- Live cursor tracking
- Real-time text synchronization
- Participant presence indicators
- Smooth animations

---

## 🕯️ Step 6: Gilded Parlour (Forum) (2 minutes)

### Browse Threads

- [ ] Navigate to **Gilded Parlour**
- [ ] **Observe:** Gothic library aesthetic
- [ ] **Observe:** List of forum threads
- [ ] Click on any thread

### Post Comment

- [ ] Scroll to comment section
- [ ] Type a comment: "Great discussion! Testing the forum system."
- [ ] Click **Post**
- [ ] **Verify:** Comment appears in thread

### Like Post

- [ ] Click the **candle icon** to like a post
- [ ] **Verify:** Candle lights up (animation)
- [ ] **Verify:** Like count increases

### Expected Behavior

- Smooth scrolling and transitions
- Candle-based like system with animation
- Threaded replies
- Gothic aesthetic maintained

---

## 📚 Step 7: Library System (3 minutes)

### Browse Stories

- [ ] Navigate to **Library**
- [ ] **Observe:** Torch lighting effects
- [ ] **Observe:** Grid of story cards
- [ ] **Hover:** Over a story card
- [ ] **Verify:** Card lifts with shadow effect

### Read Story

- [ ] Click on any story
- [ ] **Verify:** Reader opens with atmospheric background
- [ ] **Scroll:** Through the story
- [ ] **Observe:** Genre-based atmospheric effects (e.g., fog for horror)

### Save Quote

- [ ] **Select:** Any text in the story
- [ ] **Verify:** Quote selection popup appears
- [ ] Click **Save Quote**
- [ ] **Verify:** Quote saved confirmation

### Bookmark Story

- [ ] Click **Bookmark** icon
- [ ] **Verify:** Bookmark animation
- [ ] Navigate to **Saved Books**
- [ ] **Verify:** Story appears in saved list

### Expected Behavior

- Atmospheric effects match genre
- Smooth reading experience
- Quote saving works
- Bookmark persistence

---

## 📸 Step 8: Scrapbook (2 minutes)

### Create Collection

- [ ] Navigate to **Dollhouse** → **Scrapbook**
- [ ] Click **New Collection**
- [ ] Fill in form:
  - **Title:** "Judge Test Collection"
  - **Description:** "Testing scrapbook features."
- [ ] Click **Create**
- [ ] **Verify:** Collection appears

### Add Item

- [ ] Click on the collection
- [ ] Click **Add Item**
- [ ] Fill in form:
  - **Title:** "Test Memory"
  - **Description:** "A test memory for evaluation."
  - **Type:** Select "Note"
- [ ] Click **Save**
- [ ] **Verify:** Item appears with vintage polaroid effect

### Expected Behavior

- Vintage polaroid aesthetic
- Drag-and-drop upload (if testing with images)
- Sticker picker
- Vintage filters

---

## 🎨 Step 9: Art Studio (2 minutes)

### Create Artwork

- [ ] Navigate to **Dollhouse** → **Art Studio**
- [ ] **Observe:** MS Paint-inspired interface
- [ ] Select **Brush** tool
- [ ] Draw something simple
- [ ] **Verify:** Brush strokes appear smoothly

### Test Tools

- [ ] Try different brushes (pencil, marker, spray)
- [ ] Try color picker
- [ ] Try eraser
- [ ] **Verify:** All tools work as expected

### Save Artwork

- [ ] Click **Save**
- [ ] Enter title: "Judge Test Art"
- [ ] Click **Save**
- [ ] **Verify:** Artwork appears in gallery

### Expected Behavior

- Smooth drawing experience
- MS Paint aesthetic
- Haunted effects (optional glitches)
- Gallery persistence

---

## 🔍 Step 10: Performance & Accessibility (2 minutes)

### Performance Check

- [ ] Open browser DevTools (F12)
- [ ] Go to **Lighthouse** tab
- [ ] Run audit
- [ ] **Verify:** Performance score > 90
- [ ] **Verify:** Accessibility score > 95

### Responsive Design

- [ ] Open DevTools responsive mode (Ctrl+Shift+M)
- [ ] Test mobile view (375px width)
- [ ] **Verify:** Layout adapts properly
- [ ] Test tablet view (768px width)
- [ ] **Verify:** Layout adapts properly

### Keyboard Navigation

- [ ] Close DevTools
- [ ] Press **Tab** key repeatedly
- [ ] **Verify:** Focus indicators visible
- [ ] **Verify:** Can navigate entire app with keyboard

### Expected Behavior

- High Lighthouse scores
- Responsive on all screen sizes
- Full keyboard accessibility
- No console errors

---

## ✅ Final Verification Checklist

### Core Features

- [ ] Authentication works (login/logout)
- [ ] Dollhouse environment loads
- [ ] Diary entries can be created and viewed
- [ ] Tale Threads: create project, submit proposal, vote, merge
- [ ] Chains: create session, join, collaborate
- [ ] Forum: browse threads, post comments, like posts
- [ ] Library: browse stories, read, bookmark, save quotes
- [ ] Scrapbook: create collections, add items
- [ ] Art Studio: draw, save artwork

### Kiro Usage Evidence

- [ ] `.kiro/` directory exists in repository
- [ ] `.kiro/README.md` documents Kiro usage
- [ ] `.kiro/specs/` contains feature specifications
- [ ] `.kiro/hooks/` contains agent hook configurations
- [ ] `.kiro/steering.md` contains steering document

### Technical Requirements

- [ ] Repository is public
- [ ] LICENSE file exists (MIT or Apache-2.0)
- [ ] README.md includes architecture diagram
- [ ] No secrets committed (check `.env` is gitignored)
- [ ] CI passes (check GitHub Actions)
- [ ] Tests pass (`pnpm test`)

### Design & Polish

- [ ] Gothic aesthetic consistent throughout
- [ ] Smooth animations and transitions
- [ ] Responsive design (mobile, tablet, desktop)
- [ ] Accessibility features (keyboard nav, ARIA labels)
- [ ] Performance optimized (lazy loading, memoization)

---

## 🐛 Known Issues (Optional)

Document any known issues or limitations:

1. **Issue:** [Description]
   - **Workaround:** [How to work around it]
   - **Status:** [In progress / Will fix / Won't fix]

---

## 📞 Support

**Questions during evaluation?**

- **GitHub Issues:** [github.com/Medha1309/grimoire-tale-threads/issues](https://github.com/Medha1309/grimoire-tale-threads/issues)
- **Documentation:** [README.md](./README.md)

---

## 🎉 Thank You!

Thank you for taking the time to evaluate GRIMOIRE: Tale Threads. We hope you enjoy exploring the gothic storytelling platform and appreciate the Kiro-assisted development process.

**Built with:** Kiro AI, React, TypeScript, Firebase, TailwindCSS, and lots of ☕

---

**Last Updated:** December 3, 2025  
**Demo Version:** 1.0.0
