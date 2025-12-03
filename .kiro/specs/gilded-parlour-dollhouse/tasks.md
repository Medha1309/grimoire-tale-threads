# Implementation Plan

## Overview

This implementation plan breaks down the Gilded Parlour (forum) and Dollhouse (diary) features into discrete, actionable coding tasks. Each task builds incrementally on previous work, with all code integrated into the existing GRIMOIRE application.

---

## Tasks

- [x] 1. Set up project foundation and type definitions



  - Create TypeScript interfaces for forum posts, replies, likes, and diary entries
  - Extend the existing `Page` type to include new routes: "forum", "forumPost", "diary", "diaryEntry"
  - Create new type files: `src/types/forum.ts` and `src/types/diary.ts`


  - _Requirements: 1.1, 1.2, 1.3, 1.4, 1.5, 2.1, 2.2, 2.3, 2.4, 2.5, 2.6, 2.7_

- [ ] 2. Configure typography and color system
  - Update `src/index.css` to import Google Fonts (Playfair Display, Cormorant Garamond, Inter, Lora, Parisienne, Petit Formal Script)


  - Extend `tailwind.config.js` with custom font families and color palette (velvet-black, candle-gold, bone-white, crimson, navy-depth, pastel-rose, charcoal-shadow, parchment, ivory)
  - Create utility classes for consistent typography across forum and diary pages
  - _Requirements: 1.1, 1.2, 1.3, 1.4, 1.5, 2.1, 2.2, 2.3, 2.4, 2.5, 2.6, 2.7_



- [ ] 3. Implement shared animation utilities
  - Create `src/utils/animations.ts` with Framer Motion variants for page transitions, modals, wax seal, candle glow, and stagger animations
  - Implement cursor shadow effect component in `src/components/shared/CursorShadow.tsx`
  - Add parallax background utility in `src/components/shared/BackgroundImage.tsx`
  - _Requirements: 3.1, 3.2, 3.3, 3.4, 3.5, 17.1, 17.2, 17.3, 17.4, 17.5_




- [ ] 4. Create Firestore data layer and custom hooks for forum
  - Implement `src/hooks/useForumPosts.ts` for fetching, creating, and paginating forum posts
  - Implement `src/hooks/useForumPost.ts` for fetching a single post with replies
  - Implement `src/hooks/useForumLikes.ts` for like/unlike actions with optimistic updates


  - Add error handling utility in `src/utils/errorHandler.ts`
  - _Requirements: 4.1, 4.2, 4.3, 4.4, 4.5, 4.6, 5.1, 5.2, 5.3, 5.4, 5.5, 5.6, 6.1, 6.2, 6.3, 6.4, 6.5, 6.6, 7.1, 7.2, 7.3, 7.4, 7.5_

- [x] 5. Build forum UI components


- [ ] 5.1 Create ForumList component
  - Build `src/components/forum/ForumList.tsx` to display grid of post preview cards
  - Implement post card styling with gold borders, parchment background, and hover effects
  - Add loading state with "The candles gossip..." message


  - _Requirements: 4.1, 4.2, 4.3, 4.4, 4.5, 4.6_

- [ ] 5.2 Create CandleLike component
  - Build `src/components/forum/CandleLike.tsx` with candle icon and like count
  - Implement brightness animation on like/unlike


  - Add glow effect proportional to like count
  - _Requirements: 7.1, 7.2, 7.3, 7.4, 7.5_

- [ ] 5.3 Create UserCameo component
  - Build `src/components/shared/UserCameo.tsx` for circular avatar display


  - Implement silhouette fallback for users without avatars
  - Add click handler for profile navigation
  - _Requirements: 4.1, 4.2, 4.3, 4.4, 4.5, 4.6, 6.1, 6.2, 6.3, 6.4, 6.5, 6.6_

- [x] 5.4 Create PostView component


  - Build `src/components/forum/PostView.tsx` for full post display
  - Implement letter-style layout with ornate borders and wax seal decoration
  - Integrate CandleLike and UserCameo components


  - Add author signature styling at bottom
  - _Requirements: 6.1, 6.2, 6.3, 6.4, 6.5, 6.6_

- [ ] 5.5 Create ReplySection component
  - Build `src/components/forum/ReplySection.tsx` for nested reply threads
  - Implement recursive rendering with max 3 levels of depth


  - Add reply creation form with "Leave an Echo" label
  - Style replies as envelope cards with indentation
  - _Requirements: 6.1, 6.2, 6.3, 6.4, 6.5, 6.6_


- [x] 5.6 Create CreateWhisperModal component


  - Build `src/components/forum/CreateWhisperModal.tsx` with parchment-styled form
  - Add title, content, and genre tag selection fields
  - Implement wax seal melting animation on submit
  - Add form validation and success message


  - _Requirements: 5.1, 5.2, 5.3, 5.4, 5.5, 5.6_

- [ ] 5.7 Create ForumFilters component
  - Build `src/components/forum/ForumFilters.tsx` with genre tag buttons
  - Style tags as gold runic symbols


  - Implement filter state management and active state styling
  - _Requirements: 8.1, 8.2, 8.3, 8.4, 8.5_

- [ ] 6. Build Gilded Parlour page
  - Create `src/pages/GildedParlour.tsx` with Regency parlour background


  - Implement page title "The Gilded Parlour" with subtitle "Dearest reader, the whispers await."
  - Integrate ForumList, ForumFilters, and pagination controls
  - Add navigation to PostView on card click
  - Implement "Compose a New Whisper" button that opens CreateWhisperModal
  - _Requirements: 4.1, 4.2, 4.3, 4.4, 4.5, 4.6, 8.1, 8.2, 8.3, 8.4, 8.5_



- [ ] 7. Create Firestore data layer and custom hooks for diary
  - Implement `src/hooks/useDiaryEntries.ts` for fetching and creating diary entries
  - Implement `src/hooks/useDiaryEntry.ts` for fetching and updating a single entry
  - Add client-side encryption utilities in `src/utils/encryption.ts` using Web Crypto API
  - _Requirements: 9.1, 9.2, 9.3, 9.4, 9.5, 9.6, 10.1, 10.2, 10.3, 10.4, 10.5, 10.6, 11.1, 11.2, 11.3, 11.4, 11.5_



- [ ] 8. Build diary UI components
- [ ] 8.1 Create RibbonPicker component
  - Build `src/components/diary/RibbonPicker.tsx` with 4 mood options (joy, sorrow, calm, unrest)


  - Implement colored ribbon buttons with selection animation
  - Add mood labels in Parisienne font
  - _Requirements: 10.1, 10.2, 10.3, 10.4, 10.5, 10.6_

- [ ] 8.2 Create DiaryGrid component
  - Build `src/components/diary/DiaryGrid.tsx` to display entry cards as drawers/envelopes
  - Implement mood ribbon indicators and locked/unlocked icons
  - Add hover scale animation and excerpt preview
  - Style with pastel colors and inner shadows
  - _Requirements: 9.1, 9.2, 9.3, 9.4, 9.5, 9.6_

- [ ] 8.3 Create LockSeal component
  - Build `src/components/diary/LockSeal.tsx` for lock/unlock toggle
  - Implement wax melting animation on unlock
  - Add wax sealing animation on lock
  - Handle encryption/decryption calls
  - _Requirements: 11.1, 11.2, 11.3, 11.4, 11.5_

- [ ] 8.4 Create DiaryEntryView component
  - Build `src/components/diary/DiaryEntryView.tsx` for full entry display
  - Implement wax seal opening animation on mount
  - Add mood ribbon display and LockSeal integration
  - Include entry editing functionality
  - _Requirements: 11.1, 11.2, 11.3, 11.4, 11.5_

- [ ] 8.5 Create CreateConfessionModal component
  - Build `src/components/diary/CreateConfessionModal.tsx` with porcelain heart button trigger
  - Add content textarea with character count
  - Integrate RibbonPicker for mood selection
  - Add privacy toggle (locked by default) and optional AI reflection checkbox
  - Implement form validation and "Your heart is sealed." success message
  - _Requirements: 10.1, 10.2, 10.3, 10.4, 10.5, 10.6_

- [ ] 8.6 Create DiaryTimeline component
  - Build `src/components/diary/DiaryTimeline.tsx` with clock-hand UI
  - Implement SVG clock face with interactive hand rotation
  - Add date markers and highlight dates with entries
  - Implement touch/drag support for mobile
  - _Requirements: 13.1, 13.2, 13.3, 13.4, 13.5_

- [ ] 9. Build Dollhouse page
  - Create `src/pages/Dollhouse.tsx` with dollhouse interior background
  - Implement page title "The Dollhouse" with subtitle "A secret too sweet to tell."
  - Integrate DiaryGrid and DiaryTimeline components


  - Add navigation to DiaryEntryView on card click
  - Implement porcelain heart button that opens CreateConfessionModal
  - _Requirements: 9.1, 9.2, 9.3, 9.4, 9.5, 9.6, 13.1, 13.2, 13.3, 13.4, 13.5_

- [ ] 10. Implement cross-page navigation
  - Create `src/components/shared/CrossNavigation.tsx` for forum-to-diary and diary-to-forum links
  - Add "Keep a Private Reflection" link at end of forum posts
  - Add "Share this story to the Parlour" button in diary entries
  - Implement draft management in `src/utils/draftManager.ts` for diary-to-forum conversion
  - Add fade transition animations between pages
  - _Requirements: 15.1, 15.2, 15.3, 15.4, 15.5_

- [ ] 11. Implement diary export functionality
  - Create `src/utils/exportDiary.ts` with .txt file generation
  - Add "Bundle of Secrets" export button to Dollhouse page
  - Format exported entries with timestamps and mood indicators
  - Implement browser download trigger using Blob API
  - Exclude locked entries from export unless explicitly unlocked
  - _Requirements: 14.1, 14.2, 14.3, 14.4, 14.5_

- [ ] 12. Integrate AI reflection feature (optional)
- [x] 12.1 Create Cloud Function for Gemini API



  - Set up Firebase Cloud Functions project structure
  - Implement `functions/src/generateReflection.ts` with Gemini API integration
  - Add rate limiting (10 requests per day per user) using Firestore counters
  - Implement error handling and response validation
  - _Requirements: 12.1, 12.2, 12.3, 12.4, 12.5_

- [ ] 12.2 Create client-side AI reflection hook
  - Implement `src/hooks/useAIReflection.ts` to call Cloud Function
  - Add loading and error states
  - Implement caching strategy in Firestore
  - Add opt-out setting in user preferences
  - _Requirements: 12.1, 12.2, 12.3, 12.4, 12.5_

- [ ] 12.3 Integrate AI reflection in diary UI
  - Add AI reflection display in DiaryEntryView with "The dolls sense..." label
  - Add manual retry button for failed reflections
  - Implement loading skeleton during generation
  - Add toggle in CreateConfessionModal to enable/disable AI reflection
  - _Requirements: 12.1, 12.2, 12.3, 12.4, 12.5_

- [ ] 13. Update routing and navigation
  - Update `src/types/index.ts` to extend Page type with new routes
  - Update `src/App.tsx` to add route handlers for "forum", "forumPost", "diary", "diaryEntry"
  - Update `src/components/Navbar.tsx` to include links to Gilded Parlour and Dollhouse
  - Implement page transition animations using AnimatePresence
  - _Requirements: 15.1, 15.2, 15.3, 15.4, 15.5_

- [ ] 14. Implement responsive design
  - Add responsive grid layouts for ForumList (1/2/3 columns) and DiaryGrid (1/2/4 columns)
  - Implement mobile-specific modal styling (full-screen on mobile, centered on desktop)
  - Add touch gesture support for swipe navigation using Framer Motion drag
  - Adjust typography scale for mobile (14px base) and desktop (16px base)
  - Ensure all touch targets meet 44x44px minimum size
  - _Requirements: 16.1, 16.2, 16.3, 16.4, 16.5_

- [ ] 15. Add accessibility features
  - Add ARIA labels to all interactive elements (buttons, links, form fields)
  - Implement keyboard navigation for modals (Tab, Escape, Enter)
  - Add focus indicators with gold outline to all focusable elements
  - Implement focus trap in modals and return focus on close
  - Add screen reader announcements for dynamic content (aria-live regions)
  - Test with keyboard-only navigation and screen readers
  - _Requirements: 3.1, 3.2, 3.3, 3.4, 3.5, 16.1, 16.2, 16.3, 16.4, 16.5_

- [ ] 16. Configure Firestore security rules and indexes
  - Update `firestore.rules` with security rules for forum_posts, forum_replies, forum_likes, and diary_entries collections
  - Create `firestore.indexes.json` with composite indexes for efficient queries
  - Test security rules with Firebase Emulator Suite
  - Deploy rules and indexes to Firebase project
  - _Requirements: 4.1, 4.2, 4.3, 4.4, 4.5, 4.6, 5.1, 5.2, 5.3, 5.4, 5.5, 5.6, 6.1, 6.2, 6.3, 6.4, 6.5, 6.6, 7.1, 7.2, 7.3, 7.4, 7.5, 9.1, 9.2, 9.3, 9.4, 9.5, 9.6, 10.1, 10.2, 10.3, 10.4, 10.5, 10.6, 11.1, 11.2, 11.3, 11.4, 11.5_

- [ ] 17. Add background images
  - Generate or source Regency parlour background image (1920x1080, WebP + JPEG fallback)
  - Generate or source dollhouse interior background image (1920x1080, WebP + JPEG fallback)
  - Optimize images for web (< 500KB each) and place in `public/images/`
  - Implement BackgroundImage component with parallax effect
  - Add gradient overlays for text readability
  - _Requirements: 17.1, 17.2, 17.3, 17.4, 17.5_

- [ ] 18. Implement error handling and loading states
  - Add error boundaries for forum and diary pages
  - Implement toast notifications for errors using existing Toast component
  - Add skeleton loaders for post cards and diary entries
  - Implement retry logic for failed Firestore operations
  - Add fallback UI for empty states ("The parlour is silent", "The dollhouse is empty")
  - _Requirements: 4.1, 4.2, 4.3, 4.4, 4.5, 4.6, 5.1, 5.2, 5.3, 5.4, 5.5, 5.6, 6.1, 6.2, 6.3, 6.4, 6.5, 6.6, 7.1, 7.2, 7.3, 7.4, 7.5, 9.1, 9.2, 9.3, 9.4, 9.5, 9.6, 10.1, 10.2, 10.3, 10.4, 10.5, 10.6, 11.1, 11.2, 11.3, 11.4, 11.5_

- [ ] 19. Implement microcopy and tone consistency
  - Update all UI labels to use gothic literary language as specified in requirements
  - Add loading messages: "The candles gossip...", "The dolls are listening..."
  - Add success messages: "You've rekindled this story.", "Your heart is sealed."
  - Add error messages: "This Whisper has dimmed.", "The seal won't budge."
  - Ensure consistent tone across all tooltips, placeholders, and button labels
  - _Requirements: 18.1, 18.2, 18.3, 18.4, 18.5, 18.6, 18.7, 18.8_

- [ ] 20. Performance optimization
  - Implement code splitting for forum and diary pages using React.lazy()
  - Add pagination with cursor-based queries (12 posts per page, 20 diary entries per batch)
  - Implement lazy loading for reply threads and nested comments
  - Add image optimization for user avatars (64x64 thumbnails)
  - Optimize font loading with font-display: swap
  - Implement caching strategy for frequently accessed data
  - _Requirements: 4.1, 4.2, 4.3, 4.4, 4.5, 4.6, 6.1, 6.2, 6.3, 6.4, 6.5, 6.6, 8.1, 8.2, 8.3, 8.4, 8.5, 9.1, 9.2, 9.3, 9.4, 9.5, 9.6, 13.1, 13.2, 13.3, 13.4, 13.5_

- [ ]* 21. Write unit tests for core functionality
  - Write tests for useForumPosts, useForumPost, useForumLikes hooks
  - Write tests for useDiaryEntries, useDiaryEntry hooks
  - Write tests for encryption/decryption utilities
  - Write tests for CandleLike, ReplySection, RibbonPicker, LockSeal components
  - Write tests for error handling and draft management utilities
  - _Requirements: All requirements_

- [ ]* 22. Write integration tests
  - Test complete forum flow: create post → view post → reply → like
  - Test complete diary flow: create entry → lock entry → unlock entry → edit entry
  - Test cross-navigation: forum to diary and diary to forum with draft conversion
  - Test AI reflection generation and caching
  - Test export functionality with various entry states
  - _Requirements: All requirements_

- [ ] 23. Final polish and deployment preparation
  - Update `.env.example` with new environment variables (GEMINI_API_KEY, feature flags)
  - Update `README.md` with documentation for new features
  - Create user guide for forum and diary features
  - Test on multiple browsers (Chrome, Firefox, Safari, Edge)
  - Test on multiple devices (mobile, tablet, desktop)
  - Verify all animations respect prefers-reduced-motion
  - Deploy to staging environment for final QA
  - _Requirements: All requirements_

---

## Notes

- Tasks are designed to be completed sequentially, with each building on previous work
- Optional tasks (marked with *) focus on testing and can be skipped for faster MVP delivery
- All tasks reference specific requirements from the requirements document
- Each task is scoped to be completable by a coding agent without additional clarification
- Cross-references between tasks are implicit through shared components and utilities
