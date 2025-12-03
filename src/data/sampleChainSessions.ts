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
    ownerId: 'demo-user',
    ownerName: 'Dr. Moreau',
    segments: [
      {
        id: 's1',
        author: 'Dr. Moreau',
        authorId: 'demo-user',
        content:
          'The first link in the chain hummed softly on the hard drive, pretending it wasn\'t alive.',
        createdAt: Timestamp.fromDate(new Date('2024-01-15T23:12:00')),
        hash: '7a3f9c2e',
      },
      {
        id: 's2',
        author: 'Guest',
        authorId: 'guest-1',
        content:
          'Someone new touched the file, and the timestamp slipped, like a heartbeat skipping a beat.',
        createdAt: Timestamp.fromDate(new Date('2024-01-15T23:19:00')),
        hash: '8b4e1d3f',
      },
      {
        id: 's3',
        author: 'CodeWhisperer',
        authorId: 'user-2',
        content:
          'The cursor blinked in the terminal, but no one was typing. The code was writing itself now.',
        createdAt: Timestamp.fromDate(new Date('2024-01-15T23:27:00')),
        hash: '9c5f2e4a',
      },
      {
        id: 's4',
        author: 'Dr. Moreau',
        authorId: 'demo-user',
        content:
          'I tried to close the file, but the save dialog appeared with text I never wrote: "You cannot leave yet."',
        createdAt: Timestamp.fromDate(new Date('2024-01-15T23:34:00')),
        hash: 'ad6g3f5b',
      },
    ],
    participants: [
      // Participants are added dynamically when users join
    ],
    isPublic: true,
    maxParticipants: 10,
    createdAt: Timestamp.fromDate(new Date('2024-01-15T23:00:00')),
    updatedAt: Timestamp.fromDate(new Date('2024-01-15T23:34:00')),
    lastSegmentAt: Timestamp.fromDate(new Date('2024-01-15T23:34:00')),
  },
  {
    title: 'Midnight Algorithm',
    description: 'What happens when AI dreams?',
    ownerId: 'demo-user',
    ownerName: 'Dr. Moreau',
    segments: [
      {
        id: 's1',
        author: 'Dr. Moreau',
        authorId: 'demo-user',
        content:
          'At 3:47 AM, the neural network began generating outputs no one had trained it for.',
        createdAt: Timestamp.fromDate(new Date('2024-01-16T03:47:00')),
        hash: 'be7h4g6c',
      },
      {
        id: 's2',
        author: 'NightCoder',
        authorId: 'user-3',
        content:
          'The loss function was decreasing, but the model was learning something we couldn\'t understand.',
        createdAt: Timestamp.fromDate(new Date('2024-01-16T03:52:00')),
        hash: 'cf8i5h7d',
      },
    ],
    participants: [
      // Participants are added dynamically when users join
    ],
    isPublic: true,
    maxParticipants: 5,
    createdAt: Timestamp.fromDate(new Date('2024-01-16T03:45:00')),
    updatedAt: Timestamp.fromDate(new Date('2024-01-16T03:52:00')),
    lastSegmentAt: Timestamp.fromDate(new Date('2024-01-16T03:52:00')),
  },
];
