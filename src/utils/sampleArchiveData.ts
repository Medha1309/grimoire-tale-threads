/**
 * Sample Archive Data
 * Utility to populate archive with sample data for testing
 */

import { ArchiveItem } from '../types/archive';

export const sampleArchiveData: ArchiveItem[] = [
  // Diary entries
  {
    id: 'diary-1',
    type: 'diary',
    content: 'Today I discovered something unsettling in the attic. Old photographs that seem to move when I look away...',
    mood: 'unrest',
    isLocked: false,
    archivedAt: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000), // 5 days ago
    originalCreatedAt: new Date(Date.now() - 15 * 24 * 60 * 60 * 1000),
  },
  {
    id: 'diary-2',
    type: 'diary',
    content: '****** locked content ******',
    mood: 'sorrow',
    isLocked: true,
    archivedAt: new Date(Date.now() - 12 * 24 * 60 * 60 * 1000), // 12 days ago
    originalCreatedAt: new Date(Date.now() - 20 * 24 * 60 * 60 * 1000),
  },
  {
    id: 'diary-3',
    type: 'diary',
    content: 'The dollhouse in my room whispers at night. I can hear tiny footsteps on the miniature stairs.',
    mood: 'unrest',
    isLocked: false,
    archivedAt: new Date(Date.now() - 28 * 24 * 60 * 60 * 1000), // 28 days ago - urgent!
    originalCreatedAt: new Date(Date.now() - 35 * 24 * 60 * 60 * 1000),
  },

  // Reading entries
  {
    id: 'reading-1',
    type: 'reading',
    storySlug: 'beneath-the-floorboards',
    storyTitle: 'Beneath the Floorboards',
    storyAuthor: 'Edgar Allan Poe',
    storyGenre: 'horror',
    rating: 5,
    readingTime: 45,
    personalNotes: 'Absolutely chilling. The atmosphere was perfect.',
    archivedAt: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000),
    originalCreatedAt: new Date(Date.now() - 10 * 24 * 60 * 60 * 1000),
  },
  {
    id: 'reading-2',
    type: 'reading',
    storySlug: 'death-of-a-youtuber',
    storyTitle: 'Death of a YouTuber',
    storyAuthor: 'Modern Horror',
    storyGenre: 'thriller',
    rating: 4,
    readingTime: 30,
    archivedAt: new Date(Date.now() - 15 * 24 * 60 * 60 * 1000),
    originalCreatedAt: new Date(Date.now() - 18 * 24 * 60 * 60 * 1000),
  },

  // Scrapbook entries
  {
    id: 'scrapbook-1',
    type: 'scrapbook',
    date: new Date(Date.now() - 20 * 24 * 60 * 60 * 1000),
    thought: 'Found these old polaroids in grandmother\'s attic. They feel... wrong.',
    photos: [
      {
        id: 'photo-1',
        image: 'https://images.unsplash.com/photo-1518709268805-4e9042af9f23?w=400',
        filter: 'vintage',
      },
      {
        id: 'photo-2',
        image: 'https://images.unsplash.com/photo-1509248961158-e54f6934749c?w=400',
        filter: 'sepia',
      },
    ],
    stickers: [],
    scratchOffs: [],
    layout: 'double',
    mood: 'unrest',
    archivedAt: new Date(Date.now() - 10 * 24 * 60 * 60 * 1000),
    originalCreatedAt: new Date(Date.now() - 20 * 24 * 60 * 60 * 1000),
  },
];

/**
 * Populate archive with sample data
 */
export const populateSampleArchive = () => {
  sampleArchiveData.forEach(item => {
    const storageKey = `grimr_archive_${item.type}`;
    const existing = localStorage.getItem(storageKey);
    const items = existing ? JSON.parse(existing) : [];
    
    // Only add if not already present
    if (!items.find((i: ArchiveItem) => i.id === item.id)) {
      items.push(item);
      localStorage.setItem(storageKey, JSON.stringify(items));
    }
  });
  
  console.log('✅ Sample archive data populated');
};

/**
 * Clear all archive data
 */
export const clearArchiveData = () => {
  ['diary', 'reading', 'scrapbook'].forEach(type => {
    localStorage.removeItem(`grimr_archive_${type}`);
  });
  console.log('🗑️ Archive data cleared');
};
