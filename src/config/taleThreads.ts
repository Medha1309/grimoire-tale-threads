/**
 * Tale Threads Configuration
 * Settings for the collaborative story system
 */

import { ProjectStatus } from '../types/collaborativeStory';

export const UI_CONFIG = {
  tabs: [
    {
      value: 'sessions',
      label: 'Story Chains',
      icon: null,
    },
    {
      value: 'projects',
      label: 'Story Projects',
      icon: null,
    },
  ],
  list: {
    defaultPageSize: 12,
  },
};

export const PROJECT_CONFIG = {
  defaults: {
    maxCoAuthors: 10,
    maxOpenProposals: 10,
    votingDuration: 48, // hours
    requireApproval: true,
    status: 'recruiting' as ProjectStatus,
    visibility: 'private' as const,
  },
  statuses: [
    { value: 'recruiting', label: 'Recruiting', color: 'blue' },
    { value: 'active', label: 'Active', color: 'green' },
    { value: 'archived', label: 'Archived', color: 'gray' },
  ] as const,
};

export const PROPOSAL_CONFIG = {
  voting: {
    durationHours: 48,
  },
};

export const GENRE_CONFIG = {
  genres: [
    'Fantasy',
    'Science Fiction',
    'Mystery',
    'Romance',
    'Horror',
    'Thriller',
    'Historical Fiction',
    'Contemporary',
    'Young Adult',
    'Literary Fiction',
    'Other',
  ],
};

// Helper function to get status configuration
export function getStatusConfig(status: ProjectStatus) {
  const config = PROJECT_CONFIG.statuses.find(s => s.value === status);
  return config || { value: status, label: status, color: 'gray' };
}
