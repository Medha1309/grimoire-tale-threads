/**
 * Sample Diary Entries
 * Pre-populated entries for demonstration
 */

import { DiaryEntry } from '../types/diary';

export const SAMPLE_DIARY_ENTRIES: Omit<DiaryEntry, 'userId'>[] = [
  {
    id: 'sample-1',
    content: `Dear Diary,

Today I found an old music box in grandmother's attic. When I wound it up, the most haunting melody played - something I've never heard before. The ballerina inside spins and spins, her painted smile never fading.

I can't stop thinking about it. Even now, hours later, I swear I can still hear that melody echoing in my mind. Mother says I'm being dramatic, but there's something about that music box that feels... alive.

I've hidden it under my bed. I know I shouldn't have taken it, but I couldn't leave her there all alone in the dark.`,
    mood: 'unrest',
    isLocked: false,
    isHidden: false,
    isFavorite: false,
    tags: ['attic', 'music-box', 'mystery'],
    createdAt: new Date('2024-01-15'),
    updatedAt: new Date('2024-01-15'),
  },
  {
    id: 'sample-2',
    content: `My dearest secret keeper,

The garden party was absolutely divine! Wore my new pink dress with the lace trim, and everyone said I looked like a porcelain doll. Charlotte was so jealous, I could tell by the way she kept adjusting her own dress.

We had strawberry cake and played croquet until sunset. The roses were in full bloom, and I picked the prettiest one to press in this very diary. 

Sometimes I wish every day could be like this - sweet and perfect, like living inside a music box where nothing ever changes.`,
    mood: 'joy',
    isLocked: false,
    isHidden: false,
    isFavorite: true,
    tags: ['party', 'garden', 'happiness'],
    createdAt: new Date('2024-02-03'),
    updatedAt: new Date('2024-02-03'),
  },
  {
    id: 'sample-3',
    content: `I don't know who to tell, so I'm telling you.

The dolls in my room have been moving. I know how that sounds - I'm not a child anymore. But I arrange them a certain way before bed, and in the morning, they're different. Facing different directions. Closer to my bed.

Last night I woke up and swear I saw one of them blink. Just once. Her glass eyes caught the moonlight and for a moment, I thought she was looking right at me.

Father says I need more sleep. Mother wants to call the doctor. But I know what I saw.`,
    mood: 'unrest',
    isLocked: true,
    isHidden: false,
    isFavorite: false,
    tags: ['dolls', 'scary', 'night'],
    encryptedContent: 'encrypted_content_here',
    createdAt: new Date('2024-02-14'),
    updatedAt: new Date('2024-02-14'),
  },
  {
    id: 'sample-4',
    content: `Rainy Sunday thoughts...

There's something peaceful about rain on the windows. I spent all afternoon reading by the fireplace, wrapped in grandmother's quilt. The house was so quiet, just me and my books and the sound of rain.

Made hot chocolate with extra marshmallows. Drew pictures of imaginary friends. Pretended I was a princess in a tower, waiting for... I don't know what. Something magical.

These are the days I want to remember forever. The simple, quiet ones where nothing happens but everything feels perfect.`,
    mood: 'calm',
    isLocked: false,
    isHidden: false,
    isFavorite: true,
    tags: ['rainy-day', 'cozy', 'reading'],
    createdAt: new Date('2024-02-20'),
    updatedAt: new Date('2024-02-20'),
  },
  {
    id: 'sample-5',
    content: `He doesn't love me anymore.

I saw him with her today. They were laughing together, and he looked at her the way he used to look at me. Like she was the only person in the world.

I wanted to scream. I wanted to cry. Instead, I smiled and waved and pretended my heart wasn't breaking into a thousand pieces.

Why am I never enough? Why does everyone always leave?

I hate him. I hate her. I hate myself for still caring.`,
    mood: 'sorrow',
    isLocked: true,
    isHidden: true,
    isFavorite: false,
    tags: ['heartbreak', 'private'],
    encryptedContent: 'encrypted_content_here',
    createdAt: new Date('2024-03-01'),
    updatedAt: new Date('2024-03-01'),
  },
  {
    id: 'sample-6',
    content: `Something wonderful happened today!

I got accepted! The letter came this morning and I screamed so loud that mother dropped her teacup. I'm going to study art in Paris! PARIS!

I can't believe this is real. Me, little me from this tiny town, going to one of the most beautiful cities in the world. I'm going to paint the Eiffel Tower and eat croissants and wear berets and be so incredibly, wonderfully happy.

This is just the beginning. I can feel it. Everything is about to change, and for once, I'm not scared. I'm ready.`,
    mood: 'joy',
    isLocked: false,
    isHidden: false,
    isFavorite: true,
    tags: ['paris', 'dreams', 'art', 'celebration'],
    createdAt: new Date('2024-03-10'),
    updatedAt: new Date('2024-03-10'),
  },
];
