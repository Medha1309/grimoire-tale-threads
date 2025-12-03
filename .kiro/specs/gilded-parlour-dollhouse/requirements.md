# Requirements Document

## Introduction

This document specifies the requirements for two new pages in the gothic horror literary application: **The Gilded Parlour** (a public forum for story discussions) and **The Dollhouse** (a private diary for personal reflections). Both pages maintain the application's dark, elegant aesthetic while introducing distinct visual themes—Regency-era opulence for the forum and pastel-gothic dollhouse aesthetics for the diary. The features enable community engagement through public posts and private journaling with optional AI-powered emotional reflection.

## Glossary

- **System**: The gothic horror literary web application
- **Gilded Parlour**: The public forum page where users create and discuss story-related posts
- **Dollhouse**: The private diary page where users write personal entries
- **Whisper**: A public forum post in the Gilded Parlour
- **Echo**: A reply or comment on a Whisper
- **Confession**: A private diary entry in the Dollhouse
- **Candle Like**: The upvote/like mechanism represented by a candle icon that brightens
- **Wax Seal**: Visual animation representing post submission or entry locking
- **Ribbon Picker**: Mood selector interface using colored ribbons to represent emotions
- **User**: An authenticated person using the application
- **Gemini API**: Google's AI service used for optional emotional reflection generation

## Requirements

### Requirement 1: Typography System

**User Story:** As a user, I want consistent, elegant typography across both new pages, so that the reading experience feels cohesive with the gothic literary theme.

#### Acceptance Criteria

1. THE System SHALL render all heading elements using Playfair Display or Cormorant Garamond serif fonts
2. THE System SHALL render all body text using Inter or Lora fonts
3. THE System SHALL render decorative labels and diary text using Parisienne or Petit Formal Script fonts
4. THE System SHALL apply font weights and sizes that maintain readability while preserving the historical aesthetic
5. THE System SHALL load all custom fonts with fallback options to prevent layout shifts

### Requirement 2: Color Palette Implementation

**User Story:** As a user, I want a cohesive color scheme that distinguishes between the forum and diary while maintaining visual harmony, so that navigation between pages feels intentional.

#### Acceptance Criteria

1. THE System SHALL use #0b0a0a as the primary background color for the Gilded Parlour
2. THE System SHALL use #b89b3e as the accent gold color for borders, highlights, and interactive elements
3. THE System SHALL use #f5f5f5 as the primary text color for high contrast readability
4. THE System SHALL use #a53e3e as the crimson highlight color for warnings and active states
5. THE System SHALL use #1a1c24 as the forum background depth color
6. THE System SHALL use #f3c9d1 as the primary background color for the Dollhouse
7. THE System SHALL maintain color consistency with existing landing and contact pages

### Requirement 3: Motion and Interaction Design

**User Story:** As a user, I want smooth, atmospheric animations and interactions, so that the interface feels alive and immersive without being distracting.

#### Acceptance Criteria

1. THE System SHALL implement all transitions using fade and slide animations with durations between 200ms and 400ms
2. WHEN a user hovers over interactive elements, THE System SHALL apply a soft glow effect without harsh color changes
3. THE System SHALL implement a subtle shadow cursor effect that follows the pointer position
4. THE System SHALL use Framer Motion library for all animation implementations
5. THE System SHALL NOT include sound effects for any interactions

### Requirement 4: Gilded Parlour Forum Landing

**User Story:** As a user, I want to view a list of forum posts styled as elegant letters, so that I can browse community discussions in an aesthetically pleasing way.

#### Acceptance Criteria

1. THE System SHALL display forum posts in a grid layout with each post styled as a folded letter
2. THE System SHALL render the page title "The Gilded Parlour" using Playfair Display font in gold (#b89b3e)
3. THE System SHALL display the subtitle "Dearest reader, the whispers await." in italic text
4. THE System SHALL apply gold borders with 40% opacity and shadow glow effects to post cards
5. THE System SHALL use parchment background color (#2a2b31) for individual post preview cards
6. WHEN a user hovers over a post card, THE System SHALL increase the shadow glow intensity

### Requirement 5: Forum Post Creation

**User Story:** As an authenticated user, I want to create new forum posts with a wax seal animation, so that I can share my thoughts with the community in an immersive way.

#### Acceptance Criteria

1. WHEN a user clicks the create post button, THE System SHALL display a modal with parchment-styled form fields
2. THE System SHALL label the create button as "Compose a New Whisper"
3. THE System SHALL provide input fields for post title, content, and optional genre tags
4. WHEN a user submits a post, THE System SHALL animate a melting wax seal effect before closing the modal
5. THE System SHALL save the new post to Firestore with timestamp, author ID, and content
6. THE System SHALL display a success message "The candles gossip…" during the submission process

### Requirement 6: Forum Post Viewing and Replies

**User Story:** As a user, I want to read full forum posts and see nested replies, so that I can engage in threaded discussions.

#### Acceptance Criteria

1. WHEN a user clicks on a post preview, THE System SHALL navigate to a full post view page
2. THE System SHALL display the full post content in a letter-style layout with ornate borders
3. THE System SHALL display replies as smaller envelope-styled cards beneath the main post
4. THE System SHALL support nested reply threads up to 3 levels deep
5. THE System SHALL label the reply input as "Leave an Echo"
6. WHEN a user submits a reply, THE System SHALL save it to Firestore linked to the parent post ID

### Requirement 7: Forum Upvote System

**User Story:** As a user, I want to upvote posts and replies using a candle icon, so that I can show appreciation for content I enjoy.

#### Acceptance Criteria

1. THE System SHALL display a candle icon next to each post and reply
2. WHEN a user clicks the candle icon, THE System SHALL brighten the icon and increment the like count
3. THE System SHALL display the numeric like count with glow intensity proportional to the count
4. THE System SHALL prevent users from liking the same post multiple times
5. THE System SHALL persist like data in Firestore with user ID and post ID associations

### Requirement 8: Forum Navigation and Filtering

**User Story:** As a user, I want to navigate through pages of posts and filter by genre tags, so that I can find content relevant to my interests.

#### Acceptance Criteria

1. THE System SHALL display pagination controls labeled "Next Page of Whispers" with quill divider styling
2. THE System SHALL load 12 posts per page
3. THE System SHALL provide genre filter tags styled as gold runic symbols
4. WHEN a user clicks a genre tag, THE System SHALL filter posts to show only matching content
5. THE System SHALL support genre tags including "Romance", "Mystery", "Folklore", "Horror", and "Gothic"

### Requirement 9: Dollhouse Diary Overview

**User Story:** As an authenticated user, I want to view my diary entries in a dollhouse-themed grid, so that I can access my private reflections in a visually cohesive interface.

#### Acceptance Criteria

1. THE System SHALL display diary entries in a grid layout styled as drawers or envelopes
2. THE System SHALL render the page title "The Dollhouse" using Parisienne font in crimson (#a53e3e)
3. THE System SHALL display the subtitle "A secret too sweet to tell." in italic text
4. THE System SHALL use pastel rose background (#f3c9d1) for the page
5. THE System SHALL apply inner shadows to create depth resembling a toybox
6. THE System SHALL display only entries belonging to the authenticated user

### Requirement 10: Diary Entry Creation

**User Story:** As an authenticated user, I want to create new diary entries with mood selection, so that I can record my thoughts and emotional state.

#### Acceptance Criteria

1. WHEN a user clicks the create entry button styled as a porcelain heart, THE System SHALL display a modal form
2. THE System SHALL label the create button as "Add a New Confession"
3. THE System SHALL provide a text area for entry content and a ribbon picker for mood selection
4. THE System SHALL offer mood options: joy, sorrow, calm, and unrest, each with distinct ribbon colors
5. WHEN a user submits an entry, THE System SHALL save it to Firestore or LocalStorage with encryption
6. THE System SHALL display a confirmation message "Your heart is sealed."

### Requirement 11: Diary Entry Viewing and Privacy

**User Story:** As an authenticated user, I want to view and lock/unlock my diary entries, so that I can control the privacy of my personal reflections.

#### Acceptance Criteria

1. WHEN a user clicks on a diary entry, THE System SHALL expand it with a wax seal opening animation
2. THE System SHALL display the full entry content with the selected mood ribbon indicator
3. THE System SHALL provide a lock/unlock toggle styled as a wax seal
4. WHEN a user locks an entry, THE System SHALL encrypt the content and display a sealed wax icon
5. WHEN a user unlocks an entry, THE System SHALL animate the wax melting and decrypt the content

### Requirement 12: AI Emotional Reflection (Optional)

**User Story:** As a user, I want optional AI-generated emotional summaries of my diary entries, so that I can gain insights into my writing patterns.

#### Acceptance Criteria

1. WHERE the AI reflection feature is enabled, THE System SHALL send diary entry text to the Gemini API
2. WHERE the AI reflection feature is enabled, THE System SHALL display the generated summary with the label "The dolls sense…"
3. WHERE the AI reflection feature is enabled, THE System SHALL cache AI responses to avoid redundant API calls
4. THE System SHALL allow users to opt out of AI reflection in settings
5. THE System SHALL handle API errors gracefully with fallback messages

### Requirement 13: Diary Timeline Navigation

**User Story:** As a user, I want to navigate my diary entries by date using a clock-hand interface, so that I can revisit past reflections chronologically.

#### Acceptance Criteria

1. THE System SHALL display a clock-hand UI component for date navigation
2. WHEN a user interacts with the clock hand, THE System SHALL filter entries by the selected date range
3. THE System SHALL highlight dates that contain diary entries
4. THE System SHALL support navigation by day, week, and month views
5. THE System SHALL animate the clock hand movement with smooth transitions

### Requirement 14: Diary Export Functionality

**User Story:** As a user, I want to export my diary entries as a text file, so that I can keep a backup of my personal reflections.

#### Acceptance Criteria

1. THE System SHALL provide an export button labeled "Bundle of Secrets"
2. WHEN a user clicks the export button, THE System SHALL generate a .txt file containing all diary entries
3. THE System SHALL format exported entries with timestamps and mood indicators
4. THE System SHALL trigger a browser download of the generated file
5. THE System SHALL exclude locked entries from export unless explicitly unlocked

### Requirement 15: Cross-Page Navigation and Cohesion

**User Story:** As a user, I want seamless navigation between the forum and diary pages, so that I can easily switch between public and private writing modes.

#### Acceptance Criteria

1. THE System SHALL display a "Keep a Private Reflection" link at the end of forum threads that navigates to the Dollhouse
2. THE System SHALL display a "Share this story to the Parlour" option in diary entries that converts them to forum post drafts
3. WHEN navigating between pages, THE System SHALL apply a soft fade transition
4. THE System SHALL maintain consistent typography and candle animation effects across both pages
5. THE System SHALL use crimson (#a53e3e) as a shared highlight color across both pages

### Requirement 16: Responsive Design for Both Pages

**User Story:** As a user on any device, I want both pages to adapt to my screen size, so that I can access the forum and diary on mobile, tablet, or desktop.

#### Acceptance Criteria

1. THE System SHALL implement responsive grid layouts that adapt from 1 column on mobile to 3 columns on desktop
2. THE System SHALL maintain readability of serif fonts at all screen sizes
3. THE System SHALL adjust modal sizes to fit mobile viewports without horizontal scrolling
4. THE System SHALL preserve animation effects on touch devices with appropriate touch event handlers
5. THE System SHALL ensure all interactive elements meet minimum touch target sizes of 44x44 pixels

### Requirement 17: Background Visual Integration

**User Story:** As a user, I want atmospheric background visuals that enhance the theme of each page, so that the interface feels immersive and cohesive.

#### Acceptance Criteria

1. THE System SHALL display a Regency-era parlour background image on the Gilded Parlour page
2. THE System SHALL display a vintage dollhouse interior background image on the Dollhouse page
3. THE System SHALL apply subtle parallax scrolling effects to background images
4. THE System SHALL ensure background images do not interfere with text readability
5. THE System SHALL optimize background images for web performance with appropriate compression

### Requirement 18: Microcopy and Tone Consistency

**User Story:** As a user, I want interface labels and messages to use consistent gothic literary language, so that the experience feels cohesive and immersive.

#### Acceptance Criteria

1. THE System SHALL use "Compose a New Whisper" for forum post creation
2. THE System SHALL use "Leave an Echo" for forum replies
3. THE System SHALL use "Add a New Confession" for diary entry creation
4. THE System SHALL use "The candles gossip…" as a loading hint
5. THE System SHALL use "This Whisper has dimmed." for archived forum threads
6. THE System SHALL use "You've rekindled this story." for successful upvotes
7. THE System SHALL use "The dolls are listening…" as a diary loading message
8. THE System SHALL use "Lock your secret?" as a confirmation prompt for entry locking
