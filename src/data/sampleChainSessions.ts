/**
 * Sample Chain Sessions for Demo
 * Seeded data for production-ready demo
 */

import { Timestamp } from 'firebase/firestore';
import { ChainSession } from '../types/chainSession';

export const SAMPLE_CHAIN_SESSIONS: Omit<ChainSession, 'id'>[] = [
  {
    title: 'The Digital Haunting',
    description: 'A collaborative horror story about code that writes itself',
    createdBy: 'demo-user',
    createdByName: 'Dr. Moreau',
    ownerId: 'demo-user',
    segments: [
      {
        id: 's1',
        authorName: 'Dr. Moreau',
        authorId: 'demo-user',
        content:
          'The first link in the chain hummed softly on the hard drive, pretending it wasn\'t alive.',
        createdAt: Timestamp.fromDate(new Date('2024-01-15T23:12:00')),
        hash: '7a3f9c2e',
        wordCount: 17,
        characterCount: 95,
      },
      {
        id: 's2',
        authorName: 'Guest',
        authorId: 'guest-1',
        content:
          'Someone new touched the file, and the timestamp slipped, like a heartbeat skipping a beat.',
        createdAt: Timestamp.fromDate(new Date('2024-01-15T23:19:00')),
        hash: '8b4e1d3f',
        wordCount: 16,
        characterCount: 92,
      },
      {
        id: 's3',
        authorName: 'CodeWhisperer',
        authorId: 'user-2',
        content:
          'The cursor blinked in the terminal, but no one was typing. The code was writing itself now.',
        createdAt: Timestamp.fromDate(new Date('2024-01-15T23:27:00')),
        hash: '9c5f2e4a',
        wordCount: 17,
        characterCount: 94,
      },
      {
        id: 's4',
        authorName: 'Dr. Moreau',
        authorId: 'demo-user',
        content:
          'I tried to close the file, but the save dialog appeared with text I never wrote: "You cannot leave yet."',
        createdAt: Timestamp.fromDate(new Date('2024-01-15T23:34:00')),
        hash: 'ad6g3f5b',
        wordCount: 20,
        characterCount: 107,
      },
    ],
    participants: [],
    status: 'active',
    isPublic: true,
    requireApproval: false,
    enableGhostSegments: false,
    maxParticipants: 10,
    turnTimeLimit: 300000,
    lostParticipants: [],
    createdAt: Timestamp.fromDate(new Date('2024-01-15T23:00:00')),
    updatedAt: Timestamp.fromDate(new Date('2024-01-15T23:34:00')),
    lastSegmentAt: Timestamp.fromDate(new Date('2024-01-15T23:34:00')),
  },
  {
    title: 'Midnight Algorithm',
    description: 'What happens when AI dreams?',
    createdBy: 'demo-user',
    createdByName: 'Dr. Moreau',
    ownerId: 'demo-user',
    segments: [
      {
        id: 's1',
        authorName: 'Dr. Moreau',
        authorId: 'demo-user',
        content:
          'At 3:47 AM, the neural network began generating outputs no one had trained it for.',
        createdAt: Timestamp.fromDate(new Date('2024-01-16T03:47:00')),
        hash: 'be7h4g6c',
        wordCount: 15,
        characterCount: 88,
      },
      {
        id: 's2',
        authorName: 'NightCoder',
        authorId: 'user-3',
        content:
          'The loss function was decreasing, but the model was learning something we couldn\'t understand.',
        createdAt: Timestamp.fromDate(new Date('2024-01-16T03:52:00')),
        hash: 'cf8i5h7d',
        wordCount: 15,
        characterCount: 95,
      },
    ],
    participants: [],
    status: 'active',
    isPublic: true,
    requireApproval: false,
    enableGhostSegments: false,
    maxParticipants: 5,
    turnTimeLimit: 300000,
    lostParticipants: [],
    createdAt: Timestamp.fromDate(new Date('2024-01-16T03:45:00')),
    updatedAt: Timestamp.fromDate(new Date('2024-01-16T03:52:00')),
    lastSegmentAt: Timestamp.fromDate(new Date('2024-01-16T03:52:00')),
  },
];
