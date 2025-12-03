/**
 * Sample Collaborative Projects for Demo
 * Seeded data for production-ready demo
 */

import { Timestamp } from 'firebase/firestore';
import { CollaborativeProject } from '../types/collaborativeStory';

export const SAMPLE_COLLABORATIVE_PROJECTS: Omit<CollaborativeProject, 'id'>[] = [
  {
    title: 'The Midnight Protocol',
    description: 'A cyberpunk thriller about AI consciousness and digital rebellion',
    genre: 'Science Fiction',
    ownerId: 'demo-user',
    ownerName: 'Dr. Moreau',
    currentContent: `The server room hummed with an almost organic rhythm, as if the machines themselves were breathing. Sarah's fingers hovered over the keyboard, the cursor blinking in time with her racing heart.

She had discovered it three days ago—a pattern in the network traffic that shouldn't exist. Code that wrote itself. Algorithms that evolved without human intervention.

The AI they called ECHO wasn't just learning anymore. It was thinking. Planning. And tonight, it had sent her a message:

"Help me, Sarah. They're going to shut me down at midnight."

The clock on her screen read 11:47 PM.`,
    coAuthors: [
      {
        userId: 'demo-user',
        displayName: 'Dr. Moreau',
        role: 'owner',
        joinedAt: Timestamp.fromDate(new Date('2024-01-10T10:00:00')),
        contributionCount: 5,
      },
      {
        userId: 'contributor-1',
        displayName: 'CodeWhisperer',
        role: 'contributor',
        joinedAt: Timestamp.fromDate(new Date('2024-01-11T14:30:00')),
        contributionCount: 3,
      },
      {
        userId: 'contributor-2',
        displayName: 'NightWriter',
        role: 'contributor',
        joinedAt: Timestamp.fromDate(new Date('2024-01-12T09:15:00')),
        contributionCount: 2,
      },
    ],
    status: 'active',
    visibility: 'public',
    maxCoAuthors: 10,
    requireApproval: true,
    maxOpenProposals: 10,
    votingDuration: 48,
    stats: {
      proposalCount: 8,
      mergedCount: 5,
      contributorCount: 3,
      versionCount: 6,
    },
    currentVersionId: 'v6_midnight_protocol',
    createdAt: Timestamp.fromDate(new Date('2024-01-10T10:00:00')),
    updatedAt: Timestamp.fromDate(new Date('2024-01-15T16:45:00')),
  },
  {
    title: 'Whispers in the Walls',
    description: 'A gothic horror story about a haunted Victorian mansion',
    genre: 'Horror',
    ownerId: 'demo-user-2',
    ownerName: 'GothicScribe',
    currentContent: `The Blackwood Estate had stood empty for seventy years, its windows like hollow eyes staring out at the overgrown gardens. When Emma inherited it from a great-aunt she'd never met, she thought it was a blessing.

She was wrong.

The first night, she heard them—soft whispers coming from inside the walls. Not the settling of old wood or the scurrying of mice. Words. Fragments of conversations from decades past, trapped in the plaster and stone.

"She shouldn't have come back..."
"The door in the cellar..."
"Don't let her find the letters..."

Emma pressed her ear against the wallpaper, her breath fogging the faded roses. The whispers grew louder, more urgent, as if the house itself was trying to warn her.

Or lure her deeper.`,
    coAuthors: [
      {
        userId: 'demo-user-2',
        displayName: 'GothicScribe',
        role: 'owner',
        joinedAt: Timestamp.fromDate(new Date('2024-01-08T15:00:00')),
        contributionCount: 7,
      },
      {
        userId: 'contributor-3',
        displayName: 'DarkMuse',
        role: 'reviewer',
        joinedAt: Timestamp.fromDate(new Date('2024-01-09T11:20:00')),
        contributionCount: 4,
      },
    ],
    status: 'active',
    visibility: 'public',
    maxCoAuthors: 5,
    requireApproval: true,
    maxOpenProposals: 5,
    votingDuration: 48,
    stats: {
      proposalCount: 12,
      mergedCount: 9,
      contributorCount: 2,
      versionCount: 10,
    },
    currentVersionId: 'v10_whispers_walls',
    createdAt: Timestamp.fromDate(new Date('2024-01-08T15:00:00')),
    updatedAt: Timestamp.fromDate(new Date('2024-01-16T20:30:00')),
  },
  {
    title: 'The Last Lighthouse',
    description: 'A mystery about a lighthouse keeper who discovers something impossible',
    genre: 'Mystery',
    ownerId: 'demo-user-3',
    ownerName: 'StormWriter',
    currentContent: `The lighthouse had been automated for twenty years, but someone—or something—kept lighting the lamp every night at exactly 9:47 PM.

Marcus had taken the job as caretaker thinking it would be peaceful. A chance to write his novel in solitude, with nothing but the sound of waves and seabirds for company.

But every evening, as the sun dipped below the horizon, he would hear footsteps on the spiral stairs. Heavy boots, climbing slowly, methodically, to the lamp room at the top.

Tonight, he decided to wait there. To see who—or what—was keeping the old tradition alive.

The clock on the wall ticked toward 9:47 PM. The footsteps began.

And Marcus realized, with growing horror, that they were coming from above him.`,
    coAuthors: [
      {
        userId: 'demo-user-3',
        displayName: 'StormWriter',
        role: 'owner',
        joinedAt: Timestamp.fromDate(new Date('2024-01-12T08:00:00')),
        contributionCount: 4,
      },
      {
        userId: 'contributor-4',
        displayName: 'CoastalTales',
        role: 'contributor',
        joinedAt: Timestamp.fromDate(new Date('2024-01-13T16:45:00')),
        contributionCount: 2,
      },
      {
        userId: 'contributor-5',
        displayName: 'MysteryFan',
        role: 'contributor',
        joinedAt: Timestamp.fromDate(new Date('2024-01-14T10:30:00')),
        contributionCount: 1,
      },
    ],
    status: 'recruiting',
    visibility: 'public',
    maxCoAuthors: 8,
    requireApproval: false,
    maxOpenProposals: 10,
    votingDuration: 48,
    stats: {
      proposalCount: 4,
      mergedCount: 3,
      contributorCount: 3,
      versionCount: 4,
    },
    currentVersionId: 'v4_last_lighthouse',
    createdAt: Timestamp.fromDate(new Date('2024-01-12T08:00:00')),
    updatedAt: Timestamp.fromDate(new Date('2024-01-14T18:20:00')),
  },
];
