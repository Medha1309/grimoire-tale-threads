# Implementation Plan

- [x] 1. Create GothicLibraryBackground component



  - Create new component file with TypeScript and React
  - Implement base dark background with zinc-950 color
  - Add vignette effect with radial gradient


  - _Requirements: 2.1, 2.7_


- [ ] 1.1 Implement BookSpines sub-component
  - Render vertical rectangles along left and right edges

  - Apply zinc-800 color with 5-15% opacity
  - Add slight rotation between -2 and 2 degrees
  - Position at 10% and 90% of viewport width
  - _Requirements: 2.2_


- [x] 1.2 Implement FloatingDust sub-component

  - Create 20 dust particle elements as circles
  - Set sizes between 1-3px with zinc-400 color
  - Apply opacity between 0.2 and 0.4
  - Animate particles floating upward with horizontal drift
  - Use CSS animations with duration 15-25 seconds

  - _Requirements: 2.3, 2.4_


- [ ] 1.3 Implement CandlelightFlicker sub-component
  - Create radial gradient from center-bottom
  - Use blood red color rgba(106, 0, 0, 0.1)
  - Animate opacity between 0.05 and 0.15
  - Set animation duration to 4 seconds with ease-in-out


  - Apply 60px blur filter
  - _Requirements: 2.5_

- [ ] 1.4 Implement MovingShadows sub-component
  - Create multiple linear gradient shadow layers



  - Use rgba(0, 0, 0, 0.2) with opacity max 0.3
  - Animate translation across viewport



  - Set durations between 40-60 seconds
  - Stagger animation delays for depth effect
  - _Requirements: 2.6_

- [ ] 2. Update GildedParlour page component
  - Remove all imports for legacy background components
  - Import new GothicLibraryBackground component
  - Replace TrypophobiaBackground with GothicLibraryBackground
  - Remove OptimizedChandelier components
  - Remove GildedEffects component
  - Remove WatchingEyesEffect component
  - Remove lavender spider SVG elements
  - Remove cursor sparkles effect and state
  - _Requirements: 1.1, 1.2, 1.3, 1.4, 1.6, 1.7_

- [ ] 3. Update color scheme across Forum components
  - Update page title color from amber-200 to zinc-200
  - Add blood red glow effect to title
  - Change button colors from amber to blood red (#6a0000)
  - Update button hover states to #8B0000
  - Change border colors from amber to zinc-800
  - Update text colors to zinc-100 for primary, zinc-400 for secondary
  - Update background colors to zinc-900/40 for cards
  - _Requirements: 1.8, 3.1, 3.2, 3.3, 3.4, 3.5, 3.6, 3.7_

- [ ] 4. Apply performance optimizations
  - Add will-change property only to actively animating elements
  - Use CSS transforms and opacity for all animations
  - Implement requestAnimationFrame for dust particles
  - Add intersection observer to pause off-screen animations
  - Limit concurrent animations to maximum 30 elements
  - _Requirements: 5.1, 5.2, 5.3, 5.4, 5.5_

- [ ] 5. Update ForumList component styling
  - Change post card backgrounds to zinc-900/40
  - Update text colors to zinc-100 and zinc-400
  - Change borders to zinc-800
  - Update hover states to use blood red accents
  - Ensure responsive layout maintains at 768px breakpoint
  - _Requirements: 3.3, 3.4, 3.5, 3.7, 4.7_

- [ ] 6. Update PostView component styling
  - Update background to zinc-900/40
  - Change text colors to brand scheme
  - Update borders to zinc-800
  - Change action buttons to blood red
  - Update hover states to #8B0000
  - _Requirements: 3.1, 3.2, 3.3, 3.4, 3.5_

- [ ] 7. Update CreateWhisperModal component styling
  - Change modal background to zinc-900/40 with backdrop blur
  - Update input field borders to zinc-800
  - Change submit button to blood red
  - Update text colors to zinc-100 and zinc-400
  - Update hover states to #8B0000
  - _Requirements: 3.1, 3.2, 3.3, 3.4, 3.5_

- [ ] 8. Delete legacy component files
  - Delete TrypophobiaBackground.tsx file
  - Delete OptimizedChandelier.tsx file
  - Delete GildedEffects.tsx file
  - Delete WatchingEyesEffect.tsx file
  - Delete BloodDrippingWallpaperBackground.tsx file
  - Delete WhisperingWallpaperBackground.tsx file
  - Delete HallOfMirrorsBackground.tsx file
  - Delete HauntedForumBackground.tsx file
  - _Requirements: 1.1, 1.2, 1.3, 1.4, 1.5_

- [ ] 9. Verify Forum functionality preservation
  - Test post creation flow works correctly
  - Test post viewing displays properly
  - Test reply functionality works
  - Test search functionality works
  - Test filter functionality works
  - Test like/reaction functionality works
  - Verify responsive layout on mobile devices
  - _Requirements: 4.1, 4.2, 4.3, 4.4, 4.5, 4.6, 4.7_

- [ ]* 10. Performance testing and optimization
  - Measure initial page load time
  - Monitor FPS during scrolling
  - Check memory usage over 5 minutes
  - Verify no memory leaks from animations
  - Reduce particle count if FPS drops below 30
  - _Requirements: 5.3, 5.4, 5.5, 5.6_
