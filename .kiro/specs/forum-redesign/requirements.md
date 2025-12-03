# Requirements Document

## Introduction

This specification defines the complete redesign of the Forum (currently "Gilded Parlour") to create a cohesive dark gothic library atmosphere that aligns with the GRIMOIRE brand identity. The redesign will remove all existing ornate effects and replace them with a sophisticated, mysterious aesthetic using the brand's blood red color paired with zinc grays.

## Glossary

- **Forum System**: The public discussion area where users share and discuss stories
- **Gothic Library Theme**: A dark, mysterious aesthetic inspired by old libraries with candlelight and shadows
- **Brand Colors**: Blood red (#6a0000) as primary, zinc grays as secondary
- **Background Effects**: Subtle atmospheric elements (dust, books, candlelight, shadows)
- **Legacy Components**: Existing Gilded Parlour components to be removed

## Requirements

### Requirement 1: Remove Legacy Gilded Parlour Code

**User Story:** As a developer, I want all old Gilded Parlour visual components removed, so that the codebase is clean and maintainable.

#### Acceptance Criteria

1. WHEN the Forum System is refactored, THE Forum System SHALL remove all references to TrypophobiaBackground component
2. WHEN the Forum System is refactored, THE Forum System SHALL remove all references to OptimizedChandelier component
3. WHEN the Forum System is refactored, THE Forum System SHALL remove all references to GildedEffects component
4. WHEN the Forum System is refactored, THE Forum System SHALL remove all references to WatchingEyesEffect component
5. WHEN the Forum System is refactored, THE Forum System SHALL remove all references to BloodDrippingWallpaperBackground component
6. WHEN the Forum System is refactored, THE Forum System SHALL remove all lavender spider SVG elements from the page
7. WHEN the Forum System is refactored, THE Forum System SHALL remove all gold/amber cursor sparkle effects
8. WHEN the Forum System is refactored, THE Forum System SHALL remove all amber-colored (#ffd700) styling from UI elements

### Requirement 2: Implement Gothic Library Background

**User Story:** As a user, I want a dark gothic library atmosphere in the Forum, so that it feels mysterious and cohesive with the GRIMOIRE brand.

#### Acceptance Criteria

1. THE Forum System SHALL display a dark background with base color of zinc-950 (#0a0a0a)
2. THE Forum System SHALL render subtle book spine silhouettes along the edges with opacity between 0.05 and 0.15
3. THE Forum System SHALL animate floating dust particles with count between 15 and 25 particles
4. WHEN dust particles are rendered, THE Forum System SHALL apply opacity between 0.2 and 0.4 to each particle
5. THE Forum System SHALL implement flickering candlelight effect with animation duration between 3 and 6 seconds
6. THE Forum System SHALL render moving shadow gradients with opacity not exceeding 0.3
7. THE Forum System SHALL apply a vignette effect with radial gradient from transparent center to rgba(0,0,0,0.6) at edges

### Requirement 3: Apply Brand Color Scheme

**User Story:** As a user, I want the Forum to use blood red and zinc gray colors, so that it matches the overall GRIMOIRE brand identity.

#### Acceptance Criteria

1. THE Forum System SHALL use blood red (#6a0000) for all primary action buttons
2. THE Forum System SHALL use blood red (#8B0000) for hover states on interactive elements
3. THE Forum System SHALL use zinc-100 (#f5f5f5) for primary text content
4. THE Forum System SHALL use zinc-400 (#a1a1a1) for secondary text and labels
5. THE Forum System SHALL use zinc-800 (#262626) for borders and dividers
6. WHEN displaying the page title, THE Forum System SHALL render text in zinc-200 (#e5e5e5) with blood red glow effect
7. THE Forum System SHALL use zinc-900 (#171717) with 40% opacity for card backgrounds

### Requirement 4: Maintain Forum Functionality

**User Story:** As a user, I want all existing Forum features to continue working, so that I can still create posts, reply, and interact with content.

#### Acceptance Criteria

1. THE Forum System SHALL preserve all post creation functionality from the existing implementation
2. THE Forum System SHALL preserve all post viewing functionality from the existing implementation
3. THE Forum System SHALL preserve all reply functionality from the existing implementation
4. THE Forum System SHALL preserve all search functionality from the existing implementation
5. THE Forum System SHALL preserve all filter functionality from the existing implementation
6. THE Forum System SHALL preserve all like/reaction functionality from the existing implementation
7. THE Forum System SHALL maintain responsive layout for mobile devices with breakpoint at 768px

### Requirement 5: Optimize Performance

**User Story:** As a user, I want the Forum to load quickly and run smoothly, so that my browsing experience is not degraded by visual effects.

#### Acceptance Criteria

1. THE Forum System SHALL limit background animations to use CSS transforms and opacity only
2. THE Forum System SHALL apply will-change CSS property only to actively animating elements
3. THE Forum System SHALL render dust particles using requestAnimationFrame with maximum 60fps
4. THE Forum System SHALL lazy-load background effects after initial page render completes
5. THE Forum System SHALL limit total number of animated elements to maximum 30 concurrent animations
6. WHEN user scrolls, THE Forum System SHALL throttle scroll event handlers to maximum 1 execution per 16ms
