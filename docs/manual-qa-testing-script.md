# Manual QA Testing Script

## Prerequisites
- Development server running (`npm run dev`)
- Browser open to `http://localhost:5173`
- Firebase configured with test data
- Test user credentials ready

---

## Test Session 1: Authentication & User Management

### 1.1 Registration Flow
**Steps:**
1. Navigate to `/signup`
2. Fill in email: `test@example.com`
3. Fill in password: `Test123!@#`
4. Fill in display name: `Test User`
5. Click "Sign Up"

**Expected Results:**
- ✅ Form validation works (email format, password strength)
- ✅ User is created in Firebase
- ✅ User is redirected to home/library page
- ✅ User profile is created in Firestore
- ✅ Success notification appears

**Actual Results:**
- [ ] Pass / [ ] Fail
- Notes: _______________

### 1.2 Login Flow
**Steps:**
1. Navigate to `/login`
2. Enter email: `test@example.com`
3. Enter password: `Test123!@#`
4. Click "Login"

**Expected Results:**
- ✅ User is authenticated
- ✅ Redirected to appropriate page
- ✅ User profile loads
- ✅ Navbar shows user info

**Actual Results:**
- [ ] Pass / [ ] Fail
- Notes: _______________

### 1.3 Google OAuth
**Steps:**
1. Click "Sign in with Google"
2. Complete Google auth flow

**Expected Results:**
- ✅ Google popup opens
- ✅ User can select account
- ✅ User is authenticated
- ✅ Profile created if new user

**Actual Results:**
- [ ] Pass / [ ] Fail
- Notes: _______________

### 1.4 Logout
**Steps:**
1. Click user menu
2. Click "Logout"

**Expected Results:**
- ✅ User is logged out
- ✅ Redirected to landing page
- ✅ Protected routes inaccessible

**Actual Results:**
- [ ] Pass / [ ] Fail
- Notes: _______________

---

## Test Session 2: Navigation & Routing

### 2.1 Main Navigation
**Steps:**
1. Test each navbar link:
   - Home
   - Stories/Library
   - Forum
   - Diary/Dollhouse
   - Profile
   - About
   - Contact

**Expected Results:**
- ✅ All links navigate correctly
- ✅ Active page highlighted
- ✅ No broken links
- ✅ Smooth transitions

**Actual Results:**
- [ ] Pass / [ ] Fail
- Notes: _______________

### 2.2 Keyboard Navigation
**Steps:**
1. Press `Alt + H` (Home)
2. Press `Alt + L` (Library)
3. Press `Alt + F` (Forum)
4. Press `Alt + D` (Diary)
5. Press `Alt + B` (Back)

**Expected Results:**
- ✅ All shortcuts work
- ✅ Navigation is instant
- ✅ Focus management correct

**Actual Results:**
- [ ] Pass / [ ] Fail
- Notes: _______________

### 2.3 Back Button
**Steps:**
1. Navigate through several pages
2. Click back button on each page
3. Test browser back button

**Expected Results:**
- ✅ Back button appears on all pages
- ✅ Returns to previous page
- ✅ Browser back works correctly

**Actual Results:**
- [ ] Pass / [ ] Fail
- Notes: _______________

---

## Test Session 3: Library/Stories Feature

### 3.1 Browse Stories
**Steps:**
1. Navigate to `/stories`
2. Scroll through story list
3. Test filters (genre, sort)
4. Test search

**Expected Results:**
- ✅ Stories load correctly
- ✅ Covers display
- ✅ Filters work
- ✅ Search works
- ✅ Pagination/infinite scroll works

**Actual Results:**
- [ ] Pass / [ ] Fail
- Notes: _______________

### 3.2 Story Detail
**Steps:**
1. Click on a story card
2. View story details
3. Test like button
4. Test bookmark button
5. Test comments

**Expected Results:**
- ✅ Story details load
- ✅ Cover displays
- ✅ Metadata correct
- ✅ Like button works
- ✅ Bookmark button works
- ✅ Comments load

**Actual Results:**
- [ ] Pass / [ ] Fail
- Notes: _______________

### 3.3 Reading Experience
**Steps:**
1. Click "Read" button
2. Read through story
3. Test font size controls
4. Test theme toggle
5. Select and save a quote

**Expected Results:**
- ✅ Reader loads correctly
- ✅ Text is readable
- ✅ Font controls work
- ✅ Theme toggle works
- ✅ Quote selection works
- ✅ Progress tracked

**Actual Results:**
- [ ] Pass / [ ] Fail
- Notes: _______________

---

## Test Session 4: Writing/Compose Feature

### 4.1 Create New Story
**Steps:**
1. Navigate to `/compose`
2. Fill in title
3. Fill in description
4. Select genre
5. Upload cover image
6. Write content in editor
7. Save draft

**Expected Results:**
- ✅ Form loads correctly
- ✅ All fields work
- ✅ Image upload works
- ✅ Editor works (formatting)
- ✅ Autosave works
- ✅ Draft saved

**Actual Results:**
- [ ] Pass / [ ] Fail
- Notes: _______________

### 4.2 Rich Text Editor
**Steps:**
1. Test bold, italic, underline
2. Test headings
3. Test lists
4. Test links
5. Test image insertion

**Expected Results:**
- ✅ All formatting works
- ✅ Toolbar responsive
- ✅ Preview accurate
- ✅ No formatting bugs

**Actual Results:**
- [ ] Pass / [ ] Fail
- Notes: _______________

### 4.3 Publish Story
**Steps:**
1. Complete story form
2. Click "Publish"
3. Verify story appears in library

**Expected Results:**
- ✅ Story published
- ✅ Appears in library
- ✅ Accessible to others
- ✅ Metadata correct

**Actual Results:**
- [ ] Pass / [ ] Fail
- Notes: _______________

---

## Test Session 5: Diary/Dollhouse Feature

### 5.1 Create Diary Entry
**Steps:**
1. Navigate to `/diary`
2. Click "New Entry"
3. Write entry content
4. Select mood
5. Set privacy level
6. Save entry

**Expected Results:**
- ✅ Entry form loads
- ✅ Editor works
- ✅ Mood selector works
- ✅ Privacy options work
- ✅ Entry saved
- ✅ Autosave works

**Actual Results:**
- [ ] Pass / [ ] Fail
- Notes: _______________

### 5.2 View Diary Entries
**Steps:**
1. View entry list
2. Filter by mood
3. Filter by date
4. Search entries
5. Click to view detail

**Expected Results:**
- ✅ Entries display correctly
- ✅ Filters work
- ✅ Search works
- ✅ Detail view loads
- ✅ Locked entries require password

**Actual Results:**
- [ ] Pass / [ ] Fail
- Notes: _______________

### 5.3 Scrapbook Feature
**Steps:**
1. Navigate to scrapbook
2. Click "+ Add Memory"
3. Upload image
4. Add caption
5. Add tags
6. Save memory

**Expected Results:**
- ✅ Scrapbook loads
- ✅ Add modal opens
- ✅ Image upload works
- ✅ Form fields work
- ✅ Memory saved
- ✅ Displays in grid

**Actual Results:**
- [ ] Pass / [ ] Fail
- Notes: _______________

### 5.4 Archive Feature
**Steps:**
1. Navigate to archive
2. View reading history
3. Archive a completed story
4. Search archive
5. Delete from archive

**Expected Results:**
- ✅ Archive loads
- ✅ History displays
- ✅ Archive action works
- ✅ Search works
- ✅ Delete works

**Actual Results:**
- [ ] Pass / [ ] Fail
- Notes: _______________

---

## Test Session 6: Forum Feature

### 6.1 Create Forum Post
**Steps:**
1. Navigate to `/forum`
2. Click "New Post"
3. Fill in title
4. Write content
5. Add tags
6. Upload image (optional)
7. Publish post

**Expected Results:**
- ✅ Form loads
- ✅ Editor works
- ✅ Tags work
- ✅ Image upload works
- ✅ Post published
- ✅ Appears in forum list

**Actual Results:**
- [ ] Pass / [ ] Fail
- Notes: _______________

### 6.2 Interact with Posts
**Steps:**
1. View post detail
2. Like post
3. Comment on post
4. Reply to comment
5. Share post

**Expected Results:**
- ✅ Post detail loads
- ✅ Like button works
- ✅ Comment form works
- ✅ Reply works
- ✅ Share works

**Actual Results:**
- [ ] Pass / [ ] Fail
- Notes: _______________

### 6.3 Forum Filters
**Steps:**
1. Filter by category
2. Sort by newest
3. Sort by popular
4. Search posts

**Expected Results:**
- ✅ All filters work
- ✅ Sort options work
- ✅ Search works
- ✅ Results accurate

**Actual Results:**
- [ ] Pass / [ ] Fail
- Notes: _______________

---

## Test Session 7: Collaborative Stories (Tale Threads)

### 7.1 Create Project
**Steps:**
1. Navigate to `/chains`
2. Click "New Project"
3. Fill in project details
4. Set permissions
5. Create project

**Expected Results:**
- ✅ Form loads
- ✅ All fields work
- ✅ Project created
- ✅ Appears in project list

**Actual Results:**
- [ ] Pass / [ ] Fail
- Notes: _______________

### 7.2 Submit Proposal
**Steps:**
1. Open project
2. Click "Submit Proposal"
3. Write proposal content
4. Submit

**Expected Results:**
- ✅ Proposal form loads
- ✅ Editor works
- ✅ Proposal submitted
- ✅ Appears in proposal list

**Actual Results:**
- [ ] Pass / [ ] Fail
- Notes: _______________

### 7.3 Vote on Proposals
**Steps:**
1. View proposals
2. Vote on proposal
3. View voting results

**Expected Results:**
- ✅ Proposals display
- ✅ Vote button works
- ✅ Vote recorded
- ✅ Results update

**Actual Results:**
- [ ] Pass / [ ] Fail
- Notes: _______________

---

## Test Session 8: Art Studio

### 8.1 Drawing Tools
**Steps:**
1. Navigate to `/art-studio`
2. Test brush tool
3. Test eraser
4. Test color picker
5. Test shape tools
6. Test text tool

**Expected Results:**
- ✅ Canvas loads
- ✅ All tools work
- ✅ Colors apply correctly
- ✅ Shapes draw correctly
- ✅ Text tool works

**Actual Results:**
- [ ] Pass / [ ] Fail
- Notes: _______________

### 8.2 Layers
**Steps:**
1. Create new layer
2. Switch between layers
3. Reorder layers
4. Delete layer

**Expected Results:**
- ✅ Layer panel works
- ✅ Layers independent
- ✅ Reordering works
- ✅ Delete works

**Actual Results:**
- [ ] Pass / [ ] Fail
- Notes: _______________

### 8.3 Save & Export
**Steps:**
1. Create artwork
2. Save artwork
3. Export as PNG
4. Export as JPG
5. View in gallery

**Expected Results:**
- ✅ Save works
- ✅ Export works
- ✅ Files download correctly
- ✅ Gallery displays artwork

**Actual Results:**
- [ ] Pass / [ ] Fail
- Notes: _______________

---

## Test Session 9: Social Features

### 9.1 User Profiles
**Steps:**
1. View own profile
2. Edit profile info
3. Upload profile picture
4. View another user's profile

**Expected Results:**
- ✅ Profile loads
- ✅ Edit works
- ✅ Image upload works
- ✅ Other profiles viewable

**Actual Results:**
- [ ] Pass / [ ] Fail
- Notes: _______________

### 9.2 Follow System
**Steps:**
1. Follow a user
2. View followers list
3. View following list
4. Unfollow user

**Expected Results:**
- ✅ Follow button works
- ✅ Lists update
- ✅ Notifications sent
- ✅ Unfollow works

**Actual Results:**
- [ ] Pass / [ ] Fail
- Notes: _______________

### 9.3 Notifications
**Steps:**
1. Trigger notification (like, comment, follow)
2. Click notification bell
3. View notifications
4. Mark as read
5. Click notification to navigate

**Expected Results:**
- ✅ Notifications appear
- ✅ Bell icon updates
- ✅ List displays correctly
- ✅ Mark as read works
- ✅ Navigation works

**Actual Results:**
- [ ] Pass / [ ] Fail
- Notes: _______________

---

## Test Session 10: Performance & UX

### 10.1 Page Load Times
**Steps:**
1. Open DevTools Network tab
2. Navigate to each major page
3. Record load times

**Expected Results:**
- ✅ Landing < 2s
- ✅ Stories < 2s
- ✅ Story Detail < 1.5s
- ✅ Reader < 1s
- ✅ Forum < 2s
- ✅ Diary < 2s

**Actual Results:**
- Landing: _____ ms
- Stories: _____ ms
- Story Detail: _____ ms
- Reader: _____ ms
- Forum: _____ ms
- Diary: _____ ms

### 10.2 Animation Performance
**Steps:**
1. Open DevTools Performance tab
2. Record while navigating
3. Check for jank/dropped frames

**Expected Results:**
- ✅ Smooth 60fps animations
- ✅ No layout shifts
- ✅ No jank during scroll

**Actual Results:**
- [ ] Pass / [ ] Fail
- Notes: _______________

### 10.3 Responsiveness
**Steps:**
1. Test on mobile (320px)
2. Test on tablet (768px)
3. Test on desktop (1024px)
4. Test on large desktop (1920px)

**Expected Results:**
- ✅ All layouts work
- ✅ No horizontal scroll
- ✅ Touch targets adequate
- ✅ Text readable

**Actual Results:**
- [ ] Pass / [ ] Fail
- Notes: _______________

---

## Test Session 11: Error Handling

### 11.1 Network Errors
**Steps:**
1. Open DevTools Network tab
2. Set to "Offline"
3. Try to load data
4. Try to submit form

**Expected Results:**
- ✅ Error message displays
- ✅ Retry option available
- ✅ Cached data shows
- ✅ No crashes

**Actual Results:**
- [ ] Pass / [ ] Fail
- Notes: _______________

### 11.2 Invalid Inputs
**Steps:**
1. Submit forms with invalid data
2. Test edge cases (empty, too long, special chars)

**Expected Results:**
- ✅ Validation messages clear
- ✅ Form doesn't submit
- ✅ Errors highlighted
- ✅ No crashes

**Actual Results:**
- [ ] Pass / [ ] Fail
- Notes: _______________

### 11.3 Permission Errors
**Steps:**
1. Try to access admin page as non-admin
2. Try to edit other user's content
3. Try to access protected routes while logged out

**Expected Results:**
- ✅ Access denied message
- ✅ Redirect to appropriate page
- ✅ No data exposed

**Actual Results:**
- [ ] Pass / [ ] Fail
- Notes: _______________

---

## Test Session 12: Accessibility

### 12.1 Keyboard Navigation
**Steps:**
1. Navigate entire app using only keyboard
2. Test Tab, Shift+Tab, Enter, Escape
3. Check focus indicators

**Expected Results:**
- ✅ All interactive elements reachable
- ✅ Focus order logical
- ✅ Focus indicators visible
- ✅ No keyboard traps

**Actual Results:**
- [ ] Pass / [ ] Fail
- Notes: _______________

### 12.2 Screen Reader
**Steps:**
1. Enable screen reader (NVDA/JAWS/VoiceOver)
2. Navigate through app
3. Test forms and buttons

**Expected Results:**
- ✅ All content announced
- ✅ ARIA labels present
- ✅ Form labels correct
- ✅ Error messages announced

**Actual Results:**
- [ ] Pass / [ ] Fail
- Notes: _______________

### 12.3 Color Contrast
**Steps:**
1. Use browser extension to check contrast
2. Test all text/background combinations

**Expected Results:**
- ✅ All text meets WCAG AA (4.5:1)
- ✅ Large text meets WCAG AA (3:1)
- ✅ Interactive elements distinguishable

**Actual Results:**
- [ ] Pass / [ ] Fail
- Notes: _______________

---

## Summary

**Total Tests:** _____ / _____
**Pass Rate:** _____%

**Critical Issues:**
1. _______________
2. _______________
3. _______________

**Medium Issues:**
1. _______________
2. _______________
3. _______________

**Low Priority Issues:**
1. _______________
2. _______________
3. _______________

**Recommendations:**
1. _______________
2. _______________
3. _______________

---

*Testing completed on: _____________*
*Tester: _____________*
