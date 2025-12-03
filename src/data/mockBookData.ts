export interface MockComment {
  userName: string;
  userAvatar?: string;
  text: string;
  likes: number;
  createdAt: Date;
  replies?: MockComment[];
}

export interface MockBookData {
  storyId: string;
  stats: {
    views: number;
    likes: number;
    bookmarks: number;
    avgRating: number;
    totalRatings: number;
  };
  comments: MockComment[];
  ratings: Array<{
    userName: string;
    rating: number;
    review?: string;
  }>;
}

// Mock user avatars
const avatars = [
  'https://i.pravatar.cc/150?img=1',
  'https://i.pravatar.cc/150?img=2',
  'https://i.pravatar.cc/150?img=3',
  'https://i.pravatar.cc/150?img=5',
  'https://i.pravatar.cc/150?img=8',
  'https://i.pravatar.cc/150?img=9',
  'https://i.pravatar.cc/150?img=12',
  'https://i.pravatar.cc/150?img=13',
];

// Helper to generate random date in the past
const randomPastDate = (daysAgo: number) => {
  const date = new Date();
  date.setDate(date.getDate() - Math.floor(Math.random() * daysAgo));
  return date;
};

export const MOCK_BOOK_DATA: MockBookData[] = [
  {
    storyId: 'blackwood-manor',
    stats: {
      views: 2847,
      likes: 342,
      bookmarks: 156,
      avgRating: 4.6,
      totalRatings: 89,
    },
    comments: [
      {
        userName: 'DarkReader92',
        userAvatar: avatars[0],
        text: 'This story gave me chills! The mirror scene was absolutely terrifying. I had to turn on all the lights in my house.',
        likes: 23,
        createdAt: randomPastDate(5),
        replies: [
          {
            userName: 'HorrorFan2000',
            userAvatar: avatars[1],
            text: 'Same! I couldn\'t look at mirrors for a week after reading this.',
            likes: 8,
            createdAt: randomPastDate(4),
          },
        ],
      },
      {
        userName: 'MidnightScribe',
        userAvatar: avatars[2],
        text: 'The atmosphere is incredible. Eleanor Nightshade really knows how to build tension. That ending though... haunting.',
        likes: 45,
        createdAt: randomPastDate(12),
      },
      {
        userName: 'GothicLover',
        userAvatar: avatars[3],
        text: 'The description of the manor itself is so vivid. I could picture every detail. Masterful writing!',
        likes: 31,
        createdAt: randomPastDate(8),
      },
      {
        userName: 'NightReader',
        userAvatar: avatars[4],
        text: 'Eleanor Nightshade has created something truly special here. The way the house itself becomes a character is brilliant!',
        likes: 27,
        createdAt: randomPastDate(15),
        replies: [
          {
            userName: 'ArchitecturalHorror',
            userAvatar: avatars[5],
            text: 'Yes! The locked doors and shifting rooms gave me serious anxiety. Love it.',
            likes: 12,
            createdAt: randomPastDate(14),
          },
        ],
      },
      {
        userName: 'BookwormBeth',
        userAvatar: avatars[6],
        text: 'Read this in one sitting. Couldn\'t put it down even though I was terrified. That\'s the mark of great horror!',
        likes: 19,
        createdAt: randomPastDate(20),
      },
    ],
    ratings: [
      { userName: 'DarkReader92', rating: 5, review: 'Absolutely terrifying and beautifully written!' },
      { userName: 'MidnightScribe', rating: 5, review: 'A masterclass in Gothic horror.' },
      { userName: 'GothicLover', rating: 4, review: 'Loved the atmosphere, ending could be stronger.' },
    ],
  },
  {
    storyId: 'the-last-breath',
    stats: {
      views: 2956,
      likes: 389,
      bookmarks: 178,
      avgRating: 4.7,
      totalRatings: 95,
    },
    comments: [
      {
        userName: 'MedicalMystery',
        userAvatar: avatars[0],
        text: 'As a nurse, this hit different. The hospital setting is so accurate it makes the horror even more real.',
        likes: 89,
        createdAt: randomPastDate(6),
        replies: [
          {
            userName: 'DarkReader92',
            userAvatar: avatars[1],
            text: 'The 3:33 AM detail is brilliant. That\'s the witching hour!',
            likes: 23,
            createdAt: randomPastDate(5),
          },
        ],
      },
      {
        userName: 'ThrillerAddict',
        userAvatar: avatars[2],
        text: 'The twist about the maternity ward gave me goosebumps. Didn\'t see that coming at all!',
        likes: 42,
        createdAt: randomPastDate(10),
      },
      {
        userName: 'HospitalWorker',
        userAvatar: avatars[3],
        text: 'Victoria Mortensen nailed the hospital atmosphere. The empty hallways at night, the flickering lights... I live this every shift.',
        likes: 56,
        createdAt: randomPastDate(14),
        replies: [
          {
            userName: 'NightShiftNurse',
            userAvatar: avatars[4],
            text: 'Same! Now I\'m paranoid during my rounds. Thanks for that 😅',
            likes: 31,
            createdAt: randomPastDate(13),
          },
        ],
      },
      {
        userName: 'SleeplessReader',
        userAvatar: avatars[5],
        text: 'The 3:33 AM detail is genius. Now I wake up at that exact time every night. This story has ruined me.',
        likes: 38,
        createdAt: randomPastDate(18),
      },
    ],
    ratings: [
      { userName: 'MedicalMystery', rating: 5, review: 'Terrifyingly realistic hospital horror!' },
      { userName: 'ThrillerAddict', rating: 4, review: 'Great twist, very creepy atmosphere.' },
    ],
  },
  {
    storyId: 'the-dollmakers-daughter',
    stats: {
      views: 4231,
      likes: 567,
      bookmarks: 289,
      avgRating: 4.9,
      totalRatings: 143,
    },
    comments: [
      {
        userName: 'PorcelainNightmares',
        userAvatar: avatars[3],
        text: 'I will never look at dolls the same way again. This is pure nightmare fuel!',
        likes: 134,
        createdAt: randomPastDate(4),
        replies: [
          {
            userName: 'CollectorsCurse',
            userAvatar: avatars[4],
            text: 'The idea that pieces of the children are IN the dolls... I\'m horrified and fascinated.',
            likes: 45,
            createdAt: randomPastDate(3),
          },
          {
            userName: 'GothicLover',
            userAvatar: avatars[5],
            text: 'Catherine Grimwood is a master of body horror. This story is unforgettable.',
            likes: 28,
            createdAt: randomPastDate(2),
          },
        ],
      },
      {
        userName: 'HorrorConnoisseur',
        userAvatar: avatars[6],
        text: 'The moral dilemma at the end - break the dolls and kill what remains, or leave them trapped forever. Brilliant!',
        likes: 98,
        createdAt: randomPastDate(9),
      },
      {
        userName: 'DollCollector',
        userAvatar: avatars[7],
        text: 'I collect antique dolls and this story made me look at my collection differently. Catherine Grimwood understands the uncanny valley perfectly.',
        likes: 67,
        createdAt: randomPastDate(11),
        replies: [
          {
            userName: 'CreepyCollectibles',
            userAvatar: avatars[0],
            text: 'Right?! The way she describes the porcelain faces... I can\'t unsee it now.',
            likes: 34,
            createdAt: randomPastDate(10),
          },
        ],
      },
      {
        userName: 'ParentReader',
        userAvatar: avatars[1],
        text: 'As a parent, the idea of children being trapped in dolls is my worst nightmare. This hit way too hard.',
        likes: 89,
        createdAt: randomPastDate(16),
      },
    ],
    ratings: [
      { userName: 'PorcelainNightmares', rating: 5, review: 'The most disturbing doll story ever written!' },
      { userName: 'HorrorConnoisseur', rating: 5, review: 'Perfect blend of horror and tragedy.' },
    ],
  },
  {
    storyId: 'death-of-a-youtuber',
    stats: {
      views: 8942,
      likes: 892,
      bookmarks: 456,
      avgRating: 4.9,
      totalRatings: 234,
    },
    comments: [
      {
        userName: 'DigitalGhost',
        userAvatar: avatars[7],
        text: 'This is terrifyingly relevant. The algorithm as a horror entity is genius. I can\'t stop thinking about it.',
        likes: 234,
        createdAt: randomPastDate(4),
      },
      {
        userName: 'StreamScreamer',
        userAvatar: avatars[0],
        text: 'I watched this at 3:33 AM and I swear I saw something move in my webcam reflection. Never again.',
        likes: 189,
        createdAt: randomPastDate(6),
        replies: [
          {
            userName: 'TechHorrorFan',
            userAvatar: avatars[1],
            text: 'The idea that the video can\'t be deleted is the scariest part. It just keeps spreading...',
            likes: 67,
            createdAt: randomPastDate(5),
          },
          {
            userName: 'CreepyPasta_Lover',
            userAvatar: avatars[3],
            text: 'This feels like it could actually happen. Modern horror at its best.',
            likes: 45,
            createdAt: randomPastDate(4),
          },
        ],
      },
      {
        userName: 'AnalogOnly',
        userAvatar: avatars[5],
        text: 'And this is why I deleted all my social media. The algorithm knows what we want, even if it kills us.',
        likes: 156,
        createdAt: randomPastDate(8),
      },
      {
        userName: 'ContentCreator',
        userAvatar: avatars[6],
        text: 'As a YouTuber, this story terrifies me on a personal level. D. Cipher captured the dark side of content creation perfectly.',
        likes: 203,
        createdAt: randomPastDate(10),
        replies: [
          {
            userName: 'ViewsAndScreams',
            userAvatar: avatars[7],
            text: 'The part about the video re-uploading itself... that\'s my actual nightmare.',
            likes: 78,
            createdAt: randomPastDate(9),
          },
        ],
      },
      {
        userName: 'AlgorithmicDread',
        userAvatar: avatars[0],
        text: 'The algorithm as a supernatural entity is the most relevant horror concept I\'ve seen in years. Brilliant.',
        likes: 167,
        createdAt: randomPastDate(12),
      },
      {
        userName: 'DigitalDetox',
        userAvatar: avatars[1],
        text: 'Read this at 3:33 AM (why did I do that?). Now I\'m convinced my webcam is watching me. 10/10 would not recommend.',
        likes: 134,
        createdAt: randomPastDate(7),
      },
    ],
    ratings: [
      { userName: 'DigitalGhost', rating: 5, review: 'The most relevant horror story of our generation!' },
      { userName: 'StreamScreamer', rating: 5, review: 'Genuinely terrifying. Can\'t look at YouTube the same way.' },
      { userName: 'TechHorrorFan', rating: 5, review: 'Perfect blend of technology and terror.' },
    ],
  },
  {
    storyId: 'the-midnight-train',
    stats: {
      views: 2789,
      likes: 356,
      bookmarks: 167,
      avgRating: 4.6,
      totalRatings: 87,
    },
    comments: [
      {
        userName: 'TimeLoopLover',
        userAvatar: avatars[2],
        text: 'The concept of being trapped in your own death, reliving it forever... absolutely haunting.',
        likes: 61,
        createdAt: randomPastDate(5),
      },
      {
        userName: 'MysteryReader',
        userAvatar: avatars[3],
        text: 'Rebecca Thornfield creates such a vivid atmosphere. I could see every detail of that ghostly train.',
        likes: 44,
        createdAt: randomPastDate(14),
        replies: [
          {
            userName: 'GhostStoryFan',
            userAvatar: avatars[4],
            text: 'The passengers from different eras was such a cool detail!',
            likes: 15,
            createdAt: randomPastDate(13),
          },
        ],
      },
      {
        userName: 'TrainEnthusiast',
        userAvatar: avatars[5],
        text: 'The historical accuracy of the train details makes this even creepier. Thornfield did her research!',
        likes: 38,
        createdAt: randomPastDate(17),
      },
      {
        userName: 'ExistentialDread',
        userAvatar: avatars[6],
        text: 'Being trapped in your own death, reliving it forever... this is the kind of horror that stays with you.',
        likes: 52,
        createdAt: randomPastDate(19),
      },
    ],
    ratings: [
      { userName: 'TimeLoopLover', rating: 5, review: 'Existential horror done right!' },
      { userName: 'MysteryReader', rating: 4, review: 'Atmospheric and deeply unsettling.' },
    ],
  },
  {
    storyId: 'the-bone-orchard',
    stats: {
      views: 3891,
      likes: 512,
      bookmarks: 267,
      avgRating: 4.8,
      totalRatings: 134,
    },
    comments: [
      {
        userName: 'NatureHorror',
        userAvatar: avatars[5],
        text: 'Trees growing from graves, fruit containing memories of death... this is beautifully horrific!',
        likes: 102,
        createdAt: randomPastDate(2),
        replies: [
          {
            userName: 'DarkFantasy',
            userAvatar: avatars[6],
            text: 'The imagery is so vivid. T. Graves has an incredible imagination.',
            likes: 34,
            createdAt: randomPastDate(1),
          },
        ],
      },
      {
        userName: 'HorrorPoet',
        userAvatar: avatars[7],
        text: 'The addictive nature of the visions is such a clever metaphor. This story has layers!',
        likes: 78,
        createdAt: randomPastDate(6),
      },
      {
        userName: 'BotanistReader',
        userAvatar: avatars[0],
        text: 'As a botanist, the concept of trees growing from graves and bearing memory-fruit is both beautiful and horrifying. Thomas Graveson is a genius.',
        likes: 91,
        createdAt: randomPastDate(9),
        replies: [
          {
            userName: 'GothicGardener',
            userAvatar: avatars[1],
            text: 'The imagery of bone-white roots and blood-red fruit... I can\'t stop thinking about it.',
            likes: 43,
            createdAt: randomPastDate(8),
          },
        ],
      },
      {
        userName: 'PhilosophyMajor',
        userAvatar: avatars[2],
        text: 'The addiction metaphor is so well done. We consume death and trauma for entertainment. This story knows it.',
        likes: 67,
        createdAt: randomPastDate(11),
      },
    ],
    ratings: [
      { userName: 'NatureHorror', rating: 5, review: 'Unique concept, flawlessly executed!' },
      { userName: 'HorrorPoet', rating: 5, review: 'Poetic and terrifying in equal measure.' },
    ],
  },
  {
    storyId: 'the-lighthouse-keeper',
    stats: {
      views: 2634,
      likes: 334,
      bookmarks: 145,
      avgRating: 4.4,
      totalRatings: 79,
    },
    comments: [
      {
        userName: 'OceanicTerror',
        userAvatar: avatars[0],
        text: 'The siren song concept is classic but executed so well here. The isolation adds to the horror.',
        likes: 48,
        createdAt: randomPastDate(7),
      },
      {
        userName: 'MaritimeMystery',
        userAvatar: avatars[1],
        text: 'Helena Waverly knows how to write the sea. The atmosphere is suffocating and beautiful at once.',
        likes: 39,
        createdAt: randomPastDate(15),
        replies: [
          {
            userName: 'SirenSongs',
            userAvatar: avatars[2],
            text: 'The historical detail about the captain\'s daughter adds so much depth!',
            likes: 12,
            createdAt: randomPastDate(14),
          },
        ],
      },
      {
        userName: 'LighthouseKeeper',
        userAvatar: avatars[3],
        text: 'I actually work at a lighthouse and this story made me paranoid. The isolation is real, and so is the singing in the waves.',
        likes: 87,
        createdAt: randomPastDate(18),
        replies: [
          {
            userName: 'CoastalHorror',
            userAvatar: avatars[4],
            text: 'Wait, you hear singing too?! 😱',
            likes: 56,
            createdAt: randomPastDate(17),
          },
        ],
      },
      {
        userName: 'SirenLore',
        userAvatar: avatars[5],
        text: 'The siren mythology is perfectly woven into this. Waverly respects the old legends while making them fresh.',
        likes: 44,
        createdAt: randomPastDate(20),
      },
    ],
    ratings: [
      { userName: 'OceanicTerror', rating: 4, review: 'Classic maritime horror with a fresh twist.' },
      { userName: 'MaritimeMystery', rating: 5, review: 'Atmospheric and haunting.' },
    ],
  },
  {
    storyId: 'the-forgotten-ward',
    stats: {
      views: 4012,
      likes: 534,
      bookmarks: 278,
      avgRating: 4.9,
      totalRatings: 156,
    },
    comments: [
      {
        userName: 'UrbanExplorer',
        userAvatar: avatars[6],
        text: 'As someone who explores abandoned places, this hit way too close to home. Absolutely terrifying!',
        likes: 145,
        createdAt: randomPastDate(3),
        replies: [
          {
            userName: 'AsylumHorror',
            userAvatar: avatars[7],
            text: 'The patients still waiting for the doctor... that\'s heartbreaking and horrifying.',
            likes: 56,
            createdAt: randomPastDate(2),
          },
          {
            userName: 'KingFan',
            userAvatar: avatars[0],
            text: 'Samuel Kingston never disappoints. This is classic Kingston horror!',
            likes: 41,
            createdAt: randomPastDate(1),
          },
        ],
      },
      {
        userName: 'PsychologicalThrills',
        userAvatar: avatars[1],
        text: 'The ending where Jake just sits there, broken... that\'s more terrifying than any monster.',
        likes: 92,
        createdAt: randomPastDate(8),
      },
      {
        userName: 'AbandonedPlaces',
        userAvatar: avatars[2],
        text: 'I explore abandoned buildings for a hobby. Samuel Kingston captured the feeling perfectly - that sense that you\'re not alone.',
        likes: 118,
        createdAt: randomPastDate(10),
        replies: [
          {
            userName: 'UrbanExplorer2',
            userAvatar: avatars[3],
            text: 'Same! The description of the peeling paint and rusted beds... I\'ve seen those exact things.',
            likes: 67,
            createdAt: randomPastDate(9),
          },
        ],
      },
      {
        userName: 'MentalHealthAdvocate',
        userAvatar: avatars[4],
        text: 'The way this story handles the tragedy of forgotten patients is both horrifying and heartbreaking. Powerful stuff.',
        likes: 103,
        createdAt: randomPastDate(13),
      },
    ],
    ratings: [
      { userName: 'UrbanExplorer', rating: 5, review: 'The most realistic abandoned asylum horror I\'ve read!' },
      { userName: 'PsychologicalThrills', rating: 5, review: 'Psychological horror perfection.' },
    ],
  },
  {
    storyId: 'the-watcher-in-the-walls',
    stats: {
      views: 5234,
      likes: 689,
      bookmarks: 345,
      avgRating: 4.9,
      totalRatings: 178,
    },
    comments: [
      {
        userName: 'HomeInvasion',
        userAvatar: avatars[2],
        text: 'This is my worst nightmare. Someone living in your walls, watching you... I\'m never sleeping again!',
        likes: 203,
        createdAt: randomPastDate(1),
        replies: [
          {
            userName: 'ParanoidNow',
            userAvatar: avatars[3],
            text: 'I\'ve been hearing noises in my walls all week. This story is NOT helping! 😱',
            likes: 67,
            createdAt: randomPastDate(1),
          },
          {
            userName: 'TrueCrimeFan',
            userAvatar: avatars[4],
            text: 'This is based on real cases! People have actually lived in walls. Terrifying.',
            likes: 89,
            createdAt: randomPastDate(1),
          },
        ],
      },
      {
        userName: 'DarkwoodMaster',
        userAvatar: avatars[5],
        text: 'Amelia Darkwood is a master of making the familiar terrifying. Your own home becomes a prison.',
        likes: 134,
        createdAt: randomPastDate(5),
      },
      {
        userName: 'HomeOwner',
        userAvatar: avatars[6],
        text: 'I just bought an old house and now I\'m checking the walls constantly. This story has made me paranoid in the best way.',
        likes: 156,
        createdAt: randomPastDate(7),
        replies: [
          {
            userName: 'Contractor',
            userAvatar: avatars[7],
            text: 'I\'ve renovated old houses. You\'d be surprised what we find in the walls. Not people... usually.',
            likes: 89,
            createdAt: randomPastDate(6),
          },
        ],
      },
      {
        userName: 'TrueCrimeJunkie',
        userAvatar: avatars[0],
        text: 'This is based on real cases! People have actually lived in walls. Darkwood took reality and made it even more terrifying.',
        likes: 178,
        createdAt: randomPastDate(9),
      },
    ],
    ratings: [
      { userName: 'HomeInvasion', rating: 5, review: 'The scariest home invasion story ever!' },
      { userName: 'DarkwoodMaster', rating: 5, review: 'Masterful horror that stays with you.' },
    ],
  },
  {
    storyId: 'the-thirteenth-step',
    stats: {
      views: 2912,
      likes: 387,
      bookmarks: 189,
      avgRating: 4.6,
      totalRatings: 94,
    },
    comments: [
      {
        userName: 'StaircasePhobia',
        userAvatar: avatars[6],
        text: 'I count my stairs every day now. Still twelve. But I\'m terrified of what happens at midnight...',
        likes: 71,
        createdAt: randomPastDate(6),
      },
      {
        userName: 'MysteryLover',
        userAvatar: avatars[7],
        text: 'The idea that everyone has a thirteenth step somewhere is genius. S. Hill is incredible!',
        likes: 58,
        createdAt: randomPastDate(12),
        replies: [
          {
            userName: 'PhilosophicalHorror',
            userAvatar: avatars[0],
            text: 'It\'s a metaphor for fate and free will. Do we choose our deaths or are they predetermined?',
            likes: 24,
            createdAt: randomPastDate(11),
          },
        ],
      },
    ],
    ratings: [
      { userName: 'StaircasePhobia', rating: 5, review: 'Simple concept, terrifying execution!' },
      { userName: 'MysteryLover', rating: 4, review: 'Thought-provoking and scary.' },
    ],
  },
  {
    storyId: 'voices-in-the-static',
    stats: {
      views: 3678,
      likes: 467,
      bookmarks: 223,
      avgRating: 4.7,
      totalRatings: 121,
    },
    comments: [
      {
        userName: 'RadioGhost',
        userAvatar: avatars[1],
        text: 'The concept of a radio picking up the dead is so creepy! And the twist with his mother... wow.',
        likes: 94,
        createdAt: randomPastDate(4),
        replies: [
          {
            userName: 'StaticWhispers',
            userAvatar: avatars[2],
            text: 'I can\'t listen to radio static anymore without thinking of this story!',
            likes: 31,
            createdAt: randomPastDate(3),
          },
        ],
      },
      {
        userName: 'ThrillerJunkie',
        userAvatar: avatars[3],
        text: 'The author combines supernatural and thriller perfectly. The murder mystery adds another layer!',
        likes: 76,
        createdAt: randomPastDate(10),
      },
      {
        userName: 'RadioCollector',
        userAvatar: avatars[4],
        text: 'I collect vintage radios and this story made me unplug all of them. The static will never sound the same.',
        likes: 89,
        createdAt: randomPastDate(12),
        replies: [
          {
            userName: 'WhiteNoise',
            userAvatar: avatars[5],
            text: 'Same! Now I hear voices in every bit of static. This story ruined me.',
            likes: 45,
            createdAt: randomPastDate(11),
          },
        ],
      },
      {
        userName: 'ParanormalInvestigator',
        userAvatar: avatars[6],
        text: 'EVP (Electronic Voice Phenomena) is real. This story takes that concept and makes it absolutely terrifying.',
        likes: 102,
        createdAt: randomPastDate(15),
      },
    ],
    ratings: [
      { userName: 'RadioGhost', rating: 5, review: 'Supernatural thriller done right!' },
      { userName: 'ThrillerJunkie', rating: 4, review: 'Great blend of genres.' },
    ],
  },
  {
    storyId: 'the-portrait',
    stats: {
      views: 4567,
      likes: 612,
      bookmarks: 312,
      avgRating: 4.8,
      totalRatings: 167,
    },
    comments: [
      {
        userName: 'DorianGrayFan',
        userAvatar: avatars[4],
        text: 'A brilliant modern take on The Picture of Dorian Gray! The portrait coming to life is terrifying.',
        likes: 156,
        createdAt: randomPastDate(2),
        replies: [
          {
            userName: 'ClassicLit',
            userAvatar: avatars[5],
            text: 'Classic literature fans would be proud. This captures timeless themes while being fresh.',
            likes: 48,
            createdAt: randomPastDate(1),
          },
        ],
      },
      {
        userName: 'MoralHorror',
        userAvatar: avatars[6],
        text: 'The idea that your sins literally manifest and hunt you... that\'s deep and terrifying.',
        likes: 112,
        createdAt: randomPastDate(7),
      },
      {
        userName: 'ArtHistorian',
        userAvatar: avatars[7],
        text: 'The portrait as a mirror of the soul is a classic concept, but this execution is fresh and horrifying.',
        likes: 87,
        createdAt: randomPastDate(9),
        replies: [
          {
            userName: 'MuseumCurator',
            userAvatar: avatars[0],
            text: 'I work with old portraits daily. Now I swear they\'re watching me. Thanks for that.',
            likes: 54,
            createdAt: randomPastDate(8),
          },
        ],
      },
      {
        userName: 'PhilosophyReader',
        userAvatar: avatars[1],
        text: 'The philosophical questions about identity and morality are woven perfectly into the horror. Masterful.',
        likes: 96,
        createdAt: randomPastDate(11),
      },
    ],
    ratings: [
      { userName: 'DorianGrayFan', rating: 5, review: 'Perfect homage with a horrifying twist!' },
      { userName: 'MoralHorror', rating: 5, review: 'Philosophical horror at its finest.' },
    ],
  },
  {
    storyId: 'the-well-of-whispers',
    stats: {
      views: 3234,
      likes: 423,
      bookmarks: 201,
      avgRating: 4.6,
      totalRatings: 103,
    },
    comments: [
      {
        userName: 'SecretKeeper',
        userAvatar: avatars[7],
        text: 'The concept of a well that collects secrets and then reveals them is brilliant! The author is a genius.',
        likes: 82,
        createdAt: randomPastDate(5),
      },
      {
        userName: 'FolkHorror',
        userAvatar: avatars[0],
        text: 'The witch trial backstory adds so much depth. This is folk horror at its best!',
        likes: 67,
        createdAt: randomPastDate(13),
        replies: [
          {
            userName: 'HistoricalHorror',
            userAvatar: avatars[1],
            text: 'The historical elements make it feel so real. Like this could actually exist somewhere.',
            likes: 22,
            createdAt: randomPastDate(12),
          },
        ],
      },
      {
        userName: 'SecretKeeper2',
        userAvatar: avatars[2],
        text: 'The concept of secrets having physical weight and power is brilliant. This story made me think about what I\'d throw in.',
        likes: 78,
        createdAt: randomPastDate(15),
      },
      {
        userName: 'SmallTownHorror',
        userAvatar: avatars[3],
        text: 'The small town setting where everyone knows everyone\'s secrets... that\'s the real horror. The well just makes it literal.',
        likes: 91,
        createdAt: randomPastDate(17),
      },
    ],
    ratings: [
      { userName: 'SecretKeeper', rating: 5, review: 'Unique concept, masterfully executed!' },
      { userName: 'FolkHorror', rating: 4, review: 'Great folk horror with depth.' },
    ],
  },
  {
    storyId: 'the-collectors-prize',
    stats: {
      views: 2845,
      likes: 367,
      bookmarks: 178,
      avgRating: 4.5,
      totalRatings: 91,
    },
    comments: [
      {
        userName: 'PsychologicalThrills',
        userAvatar: avatars[2],
        text: 'This is disturbing on so many levels. The collector\'s twisted logic is terrifyingly realistic.',
        likes: 73,
        createdAt: randomPastDate(8),
        replies: [
          {
            userName: 'TrueCrimeFan',
            userAvatar: avatars[3],
            text: 'Based on real cases of collectors. The research is thorough. Chilling.',
            likes: 28,
            createdAt: randomPastDate(7),
          },
        ],
      },
      {
        userName: 'ThrillerAddict',
        userAvatar: avatars[4],
        text: 'The ending with the other preserved women... I felt sick. In the best way for horror.',
        likes: 59,
        createdAt: randomPastDate(14),
      },
      {
        userName: 'PsychologyStudent',
        userAvatar: avatars[5],
        text: 'The collector\'s mindset is disturbingly realistic. This reads like a case study in obsession and control.',
        likes: 84,
        createdAt: randomPastDate(16),
        replies: [
          {
            userName: 'CriminalMind',
            userAvatar: avatars[6],
            text: 'The way he justifies everything to himself... that\'s what makes it so terrifying. He thinks he\'s right.',
            likes: 47,
            createdAt: randomPastDate(15),
          },
        ],
      },
      {
        userName: 'ArtCollector',
        userAvatar: avatars[7],
        text: 'As someone who collects art, this story made me examine my own relationship with possession. Deeply unsettling.',
        likes: 62,
        createdAt: randomPastDate(19),
      },
    ],
    ratings: [
      { userName: 'PsychologicalThrills', rating: 5, review: 'Disturbing psychological thriller!' },
      { userName: 'ThrillerAddict', rating: 4, review: 'Hard to read but brilliantly done.' },
    ],
  },
  {
    storyId: 'house-of-echoes',
    stats: {
      views: 4789,
      likes: 634,
      bookmarks: 321,
      avgRating: 4.9,
      totalRatings: 189,
    },
    comments: [
      {
        userName: 'GeometryNightmare',
        userAvatar: avatars[5],
        text: 'The impossible geometry concept is mind-bending! This story messed with my head in the best way.',
        likes: 187,
        createdAt: randomPastDate(3),
        replies: [
          {
            userName: 'HouseOfLeaves',
            userAvatar: avatars[6],
            text: 'Major experimental horror vibes! Marcus Holloway creates something truly unique.',
            likes: 72,
            createdAt: randomPastDate(2),
          },
          {
            userName: 'ArchitecturalHorror',
            userAvatar: avatars[7],
            text: 'As an architect, this story is my nightmare. Space that doesn\'t follow rules!',
            likes: 54,
            createdAt: randomPastDate(1),
          },
        ],
      },
      {
        userName: 'ExistentialDread',
        userAvatar: avatars[0],
        text: 'The house consuming space, time, and souls... this is cosmic horror meets domestic terror.',
        likes: 143,
        createdAt: randomPastDate(6),
      },
      {
        userName: 'MathTeacher',
        userAvatar: avatars[1],
        text: 'The impossible geometry broke my brain. Marcus Holloway understands non-Euclidean space better than most mathematicians.',
        likes: 167,
        createdAt: randomPastDate(8),
        replies: [
          {
            userName: 'PhysicsNerd',
            userAvatar: avatars[2],
            text: 'The way space folds in on itself... I had to draw diagrams and they still don\'t make sense. Perfect horror.',
            likes: 89,
            createdAt: randomPastDate(7),
          },
        ],
      },
      {
        userName: 'HomeInspector',
        userAvatar: avatars[3],
        text: 'I measure houses for a living. This story is my professional nightmare. What if I found a house like this?',
        likes: 134,
        createdAt: randomPastDate(10),
      },
      {
        userName: 'LovecraftFan',
        userAvatar: avatars[4],
        text: 'This has serious cosmic horror vibes but grounded in domestic reality. The best of both worlds.',
        likes: 156,
        createdAt: randomPastDate(12),
      },
    ],
    ratings: [
      { userName: 'GeometryNightmare', rating: 5, review: 'Mind-bending horror masterpiece!' },
      { userName: 'ExistentialDread', rating: 5, review: 'Existential horror perfection.' },
    ],
  },
  {
    storyId: 'about-me',
    stats: {
      views: 1567,
      likes: 234,
      bookmarks: 98,
      avgRating: 4.3,
      totalRatings: 56,
    },
    comments: [
      {
        userName: 'RelatablyLost',
        userAvatar: avatars[1],
        text: 'This isn\'t horror but it\'s the most real thing I\'ve read. The overconsumption commentary hits hard.',
        likes: 89,
        createdAt: randomPastDate(2),
        replies: [
          {
            userName: 'ModernMalaise',
            userAvatar: avatars[2],
            text: 'The part about thinking in memes instead of full thoughts... I felt that in my soul.',
            likes: 34,
            createdAt: randomPastDate(1),
          },
        ],
      },
      {
        userName: 'AuthenticitySeeker',
        userAvatar: avatars[3],
        text: 'We need more honest content like this. No filters, no performance, just real thoughts.',
        likes: 67,
        createdAt: randomPastDate(5),
      },
      {
        userName: 'StonerPhilosopher',
        userAvatar: avatars[4],
        text: 'The mirror metaphor at the end... we blame influencers but we\'re the ones watching. Deep.',
        likes: 52,
        createdAt: randomPastDate(9),
      },
    ],
    ratings: [
      { userName: 'RelatablyLost', rating: 5, review: 'Raw, honest, and deeply relatable!' },
      { userName: 'AuthenticitySeeker', rating: 4, review: 'Refreshingly authentic voice.' },
      { userName: 'StonerPhilosopher', rating: 4, review: 'Philosophical and real.' },
    ],
  },
  {
    storyId: 'the-tell-tale-heart',
    stats: {
      views: 12456,
      likes: 1523,
      bookmarks: 789,
      avgRating: 4.9,
      totalRatings: 456,
    },
    comments: [
      {
        userName: 'GothicEnthusiast',
        userAvatar: avatars[0],
        text: 'The master of psychological horror! The beating heart is such a powerful metaphor for guilt.',
        likes: 342,
        createdAt: randomPastDate(3),
        replies: [
          {
            userName: 'ClassicLitFan',
            userAvatar: avatars[1],
            text: 'The unreliable narrator technique is masterfully done. This story is timeless!',
            likes: 156,
            createdAt: randomPastDate(2),
          },
        ],
      },
      {
        userName: 'MadnessScholar',
        userAvatar: avatars[2],
        text: 'The way he insists he\'s not mad while describing his madness... brilliant irony.',
        likes: 234,
        createdAt: randomPastDate(7),
      },
    ],
    ratings: [
      { userName: 'GothicEnthusiast', rating: 5, review: 'A masterpiece of guilt and madness!' },
      { userName: 'ClassicLitFan', rating: 5, review: 'Timeless psychological horror.' },
    ],
  },
  {
    storyId: 'the-yellow-wallpaper',
    stats: {
      views: 9876,
      likes: 1234,
      bookmarks: 654,
      avgRating: 4.8,
      totalRatings: 389,
    },
    comments: [
      {
        userName: 'FeministReader',
        userAvatar: avatars[3],
        text: 'This story is so much more than horror—it\'s a critique of how women were treated. Powerful.',
        likes: 456,
        createdAt: randomPastDate(4),
        replies: [
          {
            userName: 'LiteraryAnalyst',
            userAvatar: avatars[4],
            text: 'The wallpaper as a symbol of patriarchal oppression is genius. This author was ahead of her time.',
            likes: 189,
            createdAt: randomPastDate(3),
          },
        ],
      },
      {
        userName: 'HorrorHistorian',
        userAvatar: avatars[5],
        text: 'The descent into madness is so gradual and realistic. Terrifying because it feels real.',
        likes: 278,
        createdAt: randomPastDate(9),
      },
    ],
    ratings: [
      { userName: 'FeministReader', rating: 5, review: 'Essential feminist horror literature!' },
      { userName: 'HorrorHistorian', rating: 5, review: 'Realistic psychological breakdown.' },
    ],
  },
  {
    storyId: 'the-masque-of-red-death',
    stats: {
      views: 8234,
      likes: 1045,
      bookmarks: 523,
      avgRating: 4.7,
      totalRatings: 312,
    },
    comments: [
      {
        userName: 'AllegoryLover',
        userAvatar: avatars[6],
        text: 'The seven rooms representing stages of life, the clock symbolizing mortality... Edmund Ashford was a genius.',
        likes: 298,
        createdAt: randomPastDate(5),
      },
      {
        userName: 'PlagueReader',
        userAvatar: avatars[7],
        text: 'Reading this during a pandemic hits different. You can\'t escape death, no matter how rich you are.',
        likes: 412,
        createdAt: randomPastDate(2),
        replies: [
          {
            userName: 'ModernParallels',
            userAvatar: avatars[0],
            text: 'The wealthy trying to isolate from disease while the poor suffer... nothing has changed.',
            likes: 234,
            createdAt: randomPastDate(1),
          },
        ],
      },
    ],
    ratings: [
      { userName: 'AllegoryLover', rating: 5, review: 'Rich symbolism and inevitable doom!' },
      { userName: 'PlagueReader', rating: 4, review: 'Eerily relevant allegory.' },
    ],
  },
  {
    storyId: 'the-monkey-paw',
    stats: {
      views: 11234,
      likes: 1456,
      bookmarks: 712,
      avgRating: 4.9,
      totalRatings: 423,
    },
    comments: [
      {
        userName: 'WishGoneBad',
        userAvatar: avatars[1],
        text: 'The ultimate "be careful what you wish for" story. That ending still gives me chills!',
        likes: 567,
        createdAt: randomPastDate(6),
        replies: [
          {
            userName: 'HorrorClassics',
            userAvatar: avatars[2],
            text: 'The knocking at the door... what came back wasn\'t their son anymore. Terrifying.',
            likes: 289,
            createdAt: randomPastDate(5),
          },
        ],
      },
      {
        userName: 'FateVsFreeWill',
        userAvatar: avatars[3],
        text: 'The fakir was right—interfering with fate only brings sorrow. This story proves it.',
        likes: 345,
        createdAt: randomPastDate(11),
      },
    ],
    ratings: [
      { userName: 'WishGoneBad', rating: 5, review: 'Perfect horror short story!' },
      { userName: 'FateVsFreeWill', rating: 5, review: 'Timeless tale of consequence.' },
    ],
  },
  {
    storyId: 'the-cask-of-amontillado',
    stats: {
      views: 10123,
      likes: 1312,
      bookmarks: 645,
      avgRating: 4.8,
      totalRatings: 378,
    },
    comments: [
      {
        userName: 'RevengeReader',
        userAvatar: avatars[4],
        text: 'The cold, calculated revenge is chilling. Montresor is one of literature\'s greatest villains.',
        likes: 423,
        createdAt: randomPastDate(4),
      },
      {
        userName: 'ItalianGothic',
        userAvatar: avatars[5],
        text: 'The catacombs setting is perfect. Edmund Ashford creates such atmosphere with so few words.',
        likes: 312,
        createdAt: randomPastDate(8),
        replies: [
          {
            userName: 'UnreliableNarrator',
            userAvatar: avatars[6],
            text: 'Is Montresor even telling the truth? Maybe Fortunato never insulted him. Maybe he\'s just mad.',
            likes: 178,
            createdAt: randomPastDate(7),
          },
        ],
      },
    ],
    ratings: [
      { userName: 'RevengeReader', rating: 5, review: 'Perfect revenge thriller!' },
      { userName: 'ItalianGothic', rating: 5, review: 'Atmospheric and chilling.' },
    ],
  },
  {
    storyId: 'the-pit-and-pendulum',
    stats: {
      views: 7891,
      likes: 987,
      bookmarks: 456,
      avgRating: 4.7,
      totalRatings: 289,
    },
    comments: [
      {
        userName: 'InquisitionHorror',
        userAvatar: avatars[7],
        text: 'The torture devices are so vividly described. Edmund Ashford makes you FEEL the terror.',
        likes: 234,
        createdAt: randomPastDate(3),
      },
      {
        userName: 'SurvivalStory',
        userAvatar: avatars[0],
        text: 'The way he uses his reason to escape each trap shows the power of the human mind under pressure.',
        likes: 189,
        createdAt: randomPastDate(10),
        replies: [
          {
            userName: 'HistoricalContext',
            userAvatar: avatars[1],
            text: 'The Spanish Inquisition was real. This story is based on actual torture methods. Horrifying.',
            likes: 145,
            createdAt: randomPastDate(9),
          },
        ],
      },
    ],
    ratings: [
      { userName: 'InquisitionHorror', rating: 5, review: 'Visceral torture chamber horror!' },
      { userName: 'SurvivalStory', rating: 4, review: 'Tense survival thriller.' },
    ],
  },
  {
    storyId: 'the-signal-man',
    stats: {
      views: 6543,
      likes: 834,
      bookmarks: 412,
      avgRating: 4.6,
      totalRatings: 234,
    },
    comments: [
      {
        userName: 'VictorianGhost',
        userAvatar: avatars[2],
        text: 'Charles Dickerson writes amazing ghost stories! This is one of the best Victorian ghost tales.',
        likes: 198,
        createdAt: randomPastDate(7),
        replies: [
          {
            userName: 'VictorianHorror',
            userAvatar: avatars[3],
            text: 'The railway was new and scary in Victorian times. This captures that industrial-age fear.',
            likes: 123,
            createdAt: randomPastDate(6),
          },
        ],
      },
      {
        userName: 'PremonitionFear',
        userAvatar: avatars[4],
        text: 'The idea that he was seeing his own death all along... that twist is devastating.',
        likes: 267,
        createdAt: randomPastDate(12),
      },
    ],
    ratings: [
      { userName: 'VictorianGhost', rating: 5, review: 'A masterpiece of supernatural horror!' },
      { userName: 'PremonitionFear', rating: 4, review: 'Haunting premonition story.' },
    ],
  },
];
