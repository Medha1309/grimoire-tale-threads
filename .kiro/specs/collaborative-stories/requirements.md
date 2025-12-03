# Collaborative Stories - Requirements

## Overview
Chain Lab enables collaborative story writing with a GitHub-style workflow merged with group voting. Writers can create collaborative projects, draft chapters using the rich text editor, submit proposals for review, and vote on contributions before they're merged into the main story.

## Glossary
- **Chain Project**: A collaborative story workspace where multiple authors work together
- **Proposal**: A submitted chapter or edit that awaits review and voting
- **Main Story**: The accepted, canonical version of the collaborative story
- **Co-Author**: A writer who has been accepted to contribute to a project
- **Voting Period**: Time window during which co-authors can vote on a proposal

## User Stories

### Requirement 1: Create Collaborative Project
**As a** writer  
**I want to** create a new collaborative story project  
**So that** others can join and help write it

#### Acceptance Criteria
1. WHEN a user clicks "New Collaborative Story" THEN the system SHALL display a creation modal with title, description, genre, and max co-authors fields
2. WHEN a user submits the creation form THEN the system SHALL create a new Chain project with the user as owner
3. WHEN a project is created THEN the system SHALL initialize an empty main story document
4. WHEN a project is created THEN the system SHALL set the status to "recruiting"
5. WHEN a project is created THEN the system SHALL generate a unique project ID and shareable link

### Requirement 2: Browse and Discover Projects
**As a** writer  
**I want to** browse available collaborative projects  
**So that** I can find stories to contribute to

#### Acceptance Criteria
1. WHEN a user visits the Chains page THEN the system SHALL display a list of collaborative projects
2. WHEN displaying projects THEN the system SHALL show title, genre, owner, co-author count, status, and description
3. WHEN a user applies filters THEN the system SHALL filter projects by genre, status (recruiting/active/finalizing/completed), and co-author availability
4. WHEN a user searches THEN the system SHALL return projects matching the search query in title or description
5. WHEN a user clicks a project card THEN the system SHALL navigate to the project detail view

### Requirement 3: Join Collaborative Project
**As a** writer  
**I want to** request to join a collaborative story  
**So that** I can contribute as a co-author

#### Acceptance Criteria
1. WHEN a user clicks "Request to Join" THEN the system SHALL create a join request with optional message
2. WHEN a join request is created THEN the system SHALL notify the project owner
3. WHEN an owner approves a request THEN the system SHALL add the user as a co-author with "contributor" role
4. WHEN an owner rejects a request THEN the system SHALL notify the requester with optional feedback
5. WHEN a project reaches max co-authors THEN the system SHALL hide the "Request to Join" button

### Requirement 4: Write Proposals with Rich Editor
**As a** co-author  
**I want to** write new chapters or edits using a full-featured editor  
**So that** I can create quality content with formatting

#### Acceptance Criteria
1. WHEN a co-author clicks "New Proposal" THEN the system SHALL open the rich text editor (same as Library/Diary)
2. WHEN writing a proposal THEN the system SHALL provide formatting tools (bold, italic, headings, lists, quotes)
3. WHEN writing a proposal THEN the system SHALL auto-save drafts every 30 seconds
4. WHEN a co-author adds a title and description THEN the system SHALL enable the "Submit for Review" button
5. WHEN a proposal is submitted THEN the system SHALL lock it from further editing and start the voting period

### Requirement 5: Review Proposals with Diff View
**As a** co-author  
**I want to** see exactly what changes a proposal makes  
**So that** I can make informed voting decisions

#### Acceptance Criteria
1. WHEN viewing a proposal THEN the system SHALL display a side-by-side diff showing additions and deletions
2. WHEN a proposal adds new content THEN the system SHALL highlight additions in green
3. WHEN a proposal modifies existing content THEN the system SHALL show deletions in red and additions in green
4. WHEN viewing a proposal THEN the system SHALL display the author, submission time, and description
5. WHEN viewing a proposal THEN the system SHALL show current vote counts (approve/request changes/reject)

### Requirement 6: Vote on Proposals
**As a** co-author  
**I want to** vote on submitted proposals  
**So that** the group can decide what gets merged

#### Acceptance Criteria
1. WHEN a proposal is submitted THEN the system SHALL notify all co-authors
2. WHEN voting on a proposal THEN the system SHALL offer three options: Approve, Request Changes, Reject
3. WHEN a co-author votes THEN the system SHALL allow adding an optional comment explaining their vote
4. WHEN a voting period ends (48 hours) THEN the system SHALL automatically tally votes
5. WHEN a proposal receives majority approval (>50%) THEN the system SHALL mark it as "approved for merge"
6. WHEN a proposal receives majority rejection THEN the system SHALL mark it as "rejected"
7. WHEN votes are tied or inconclusive THEN the system SHALL extend voting by 24 hours and notify co-authors

### Requirement 7: Merge Approved Proposals
**As a** project owner  
**I want to** merge approved proposals into the main story  
**So that** the story progresses with group consensus

#### Acceptance Criteria
1. WHEN a proposal is approved by vote THEN the system SHALL enable the "Merge" button for owner/reviewers
2. WHEN merging a proposal THEN the system SHALL apply changes to the main story document
3. WHEN a merge completes THEN the system SHALL update the version history
4. WHEN a merge completes THEN the system SHALL notify all co-authors
5. WHEN a merge conflict occurs THEN the system SHALL alert the merger and provide conflict resolution tools

### Requirement 8: Manage Project Roles
**As a** project owner  
**I want to** assign roles to co-authors  
**So that** I can delegate review responsibilities

#### Acceptance Criteria
1. WHEN viewing co-authors THEN the system SHALL display each author's role (Owner, Reviewer, Contributor)
2. WHEN an owner changes a role THEN the system SHALL update permissions immediately
3. WHEN a user has "Reviewer" role THEN the system SHALL allow them to merge approved proposals
4. WHEN a user has "Contributor" role THEN the system SHALL only allow them to create proposals and vote
5. WHEN an owner removes a co-author THEN the system SHALL revoke their access and notify them

### Requirement 9: Finalize and Publish Story
**As a** project owner  
**I want to** mark the story as complete and publish it  
**So that** it becomes a finished work in the Library

#### Acceptance Criteria
1. WHEN an owner clicks "Finalize Story" THEN the system SHALL require all co-authors to digitally sign off
2. WHEN a co-author signs off THEN the system SHALL record their agreement and timestamp
3. WHEN all co-authors have signed THEN the system SHALL enable the "Publish" button
4. WHEN publishing THEN the system SHALL create a new story in the Library with all co-authors credited
5. WHEN published THEN the system SHALL archive the Chain project as read-only
6. WHEN published THEN the system SHALL display the Library story link to all co-authors

### Requirement 10: Real-Time Collaboration Features
**As a** co-author  
**I want to** see who else is working on the project  
**So that** we can coordinate our efforts

#### Acceptance Criteria
1. WHEN co-authors are online THEN the system SHALL display presence indicators showing who's active
2. WHEN editing a proposal THEN the system SHALL show live cursors of other editors
3. WHEN a proposal is submitted or merged THEN the system SHALL update all co-authors' views in real-time
4. WHEN activity occurs THEN the system SHALL add entries to the project activity feed
5. WHEN a co-author is mentioned (@username) THEN the system SHALL send them a notification

### Requirement 11: Project Communication
**As a** co-author  
**I want to** discuss the story with other authors  
**So that** we can align on vision and direction

#### Acceptance Criteria
1. WHEN viewing a project THEN the system SHALL provide a discussion thread
2. WHEN posting in discussion THEN the system SHALL support @mentions and rich text
3. WHEN commenting on a proposal THEN the system SHALL attach comments to specific proposals
4. WHEN mentioned or replied to THEN the system SHALL notify the user
5. WHEN a discussion is active THEN the system SHALL show unread message counts

### Requirement 12: Version History and Rollback
**As a** co-author  
**I want to** see the story's evolution over time  
**So that** I can understand what changed and potentially revert mistakes

#### Acceptance Criteria
1. WHEN viewing version history THEN the system SHALL display a timeline of all merged proposals
2. WHEN selecting a version THEN the system SHALL show the story content at that point in time
3. WHEN viewing a version THEN the system SHALL show who merged it and when
4. WHEN an owner selects "Revert to this version" THEN the system SHALL create a new proposal with the rollback
5. WHEN reverting THEN the system SHALL require the same voting process as any other proposal

## Non-Functional Requirements

### NFR-1: Performance
- Proposal diffs render in <500ms
- Real-time updates propagate in <1s
- Support up to 10 concurrent co-authors

### NFR-2: Data Integrity
- No data loss during concurrent edits
- Atomic proposal merges (all or nothing)
- Conflict detection and resolution

### NFR-3: Security
- Only co-authors can view/edit project
- Role-based access control enforced
- Audit log of all changes

### NFR-4: UX Consistency
- Matches Chains graveyard aesthetic
- Uses parlour design tokens
- Smooth transitions between Library and Chains

## Out of Scope (Future Phases)
- Real-time collaborative editing (Google Docs style)
- Branching proposals (proposals from proposals)
- Merge conflict resolution UI
- Export to external formats
- Integration with version control systems
