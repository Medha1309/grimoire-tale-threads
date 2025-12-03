/**
 * Seed Stories - Demo content with subtle animated GIFs
 * These appear as regular user stories but are hardcoded for demo purposes
 */

export interface SeedStory {
  id: string;
  slug: string;
  title: string;
  author: string;
  authorId: string; // Special ID to identify as seed data
  content: string;
  genre: 'horror' | 'thriller' | 'mystery' | 'romance';
  cover: string; // GIF URL
  coverType: 'gif';
  blurb: string;
  published: boolean;
  createdAt: Date;
}

export const SEED_STORIES: SeedStory[] = [
  {
    id: 'seed-1',
    slug: 'the-westbridge-archives',
    title: 'The Westbridge Archives',
    author: 'Demo Author',
    authorId: '__SEED__',
    content: `The archives beneath the Westbridge Municipal Hall were supposed to be nothing more than climate-controlled rooms filled with forgotten paperwork. That was the official story, anyway. Anyone who ever worked there overnight knew something was slightly off. The ventilation hummed with a rhythm that felt too measured, like it was trying to imitate breathing but hadn't quite mastered the cadence. Some nights, the fluorescent lights flickered in perfect intervals, as though signalling to someone who wasn't there — or someone who was, but knew how to stay unseen.

Clara, the junior archivist, kept a journal about these oddities. The journal wasn't for publication or investigation; it was more like self-preservation. She would write about the cabinets that rearranged themselves, subtly but undeniably, or the temperature drops that always happened near Section 19B. She even recorded the day she found a folder dated three years into the future, filled with maintenance reports for repairs that hadn't happened yet. No one else seemed bothered. Most treated the anomalies like background noise: curious, but not worth the trouble of understanding.

Upstairs, the Hall operated normally. Council meetings. Permit approvals. Mild bickering over budgets. Yet even there, people whispered about the strange courier who showed up every Thursday at 10:17 a.m., never early, never late, delivering parcels with no return address. The boxes were always small, always sealed with dark green tape, and always handed over to the same locked door marked "Storage — Authorized Staff Only." No one admitted to opening them. No one admitted to knowing who did.

Just past the archives, a long, thin corridor led to a room that wasn't on any official floor plan. The janitors called it the "Leftover Room" because it held the sort of items nobody could classify: a wooden clock that never ticked but changed its hands every hour; a narrow, dust-coated mirror that reflected the room correctly but never the person standing in front of it; and a stack of envelopes addressed to people who didn't exist in any public record. Clara only went inside once. She didn't go back — not because anything dramatic happened, but because something in her gut told her that the room was waiting for her to return, and she wasn't ready to know why.

Outside, life in Westbridge went on with perfect normalcy. Morning traffic. Afternoon errands. Evening dog walkers. The bakery on Elm Street sold out of brioche by 3 p.m. every single day, which nobody questioned despite no one ever being seen buying the last dozen. The local radio station played a 12-second jingle between songs that listeners swore changed subtly each week, even though the station insisted it hadn't touched its playlist in years.

Nothing in Westbridge was dangerous, exactly. Everything simply carried the faint signature of something else simmering behind it — a quiet suggestion that the town was bigger on the inside, that its routines were stitched together by threads no one had intentionally placed there. Most people lived comfortably without noticing. A few, like Clara, noticed everything and said nothing. It felt safer that way.

They all agreed on one thing, though: the streetlamps on Alder Road occasionally turned themselves off when someone walked beneath them. Folklore said the lights were recognizing something in the passerby — guilt, perhaps, or potential, or the kind of loneliness that changes a person. Nobody confirmed the theory, but sometimes people slowed down under those lamps, just in case.`,
    genre: 'horror',
    cover: 'https://media.giphy.com/media/26BRuo6sLetdllPAQ/giphy.gif',
    coverType: 'gif',
    blurb: 'The archives beneath Westbridge Municipal Hall hold more than forgotten paperwork. Clara, the junior archivist, keeps a journal of the oddities: cabinets that rearrange themselves, folders dated years in the future, and a room that waits for her return.',
    published: true,
    createdAt: new Date('2024-01-15'),
  },
  {
    id: 'seed-2',
    slug: 'the-passenger',
    title: 'The Passenger',
    author: 'Demo Author',
    authorId: '__SEED__',
    content: `Marcus drove the same route every night. Highway 9, exit 47, home by midnight.

Tonight, something was different. In his rearview mirror, he saw a figure in the backseat. He slammed the brakes, heart pounding. The backseat was empty.

He kept driving, eyes flicking to the mirror every few seconds. Nothing. Just his imagination.

Then he heard breathing. Slow, steady, right behind his ear.

"Don't look back," a voice whispered. "I've been riding with you for weeks. Every night. Every drive. I just wanted you to know... I'm always here."

Marcus's hands trembled on the wheel. In the mirror, he saw it again—a pale face, inches from his own, smiling.

He never made it to exit 47.`,
    genre: 'thriller',
    cover: 'https://media.giphy.com/media/xTiTnqUxyWbsAXq7Ju/giphy.gif',
    coverType: 'gif',
    blurb: 'Every night, the same route home. But tonight, there\'s someone in the backseat. Someone who\'s been there all along.',
    published: true,
    createdAt: new Date('2024-01-20'),
  },
  {
    id: 'seed-3',
    slug: 'the-last-photograph',
    title: 'The Last Photograph',
    author: 'Demo Author',
    authorId: '__SEED__',
    content: `Emma found the old Polaroid camera at an estate sale. The seller warned her: "Don't take pictures of yourself."

She laughed it off. That night, curious, she snapped a selfie. The photo developed slowly, the image emerging from the white square.

But it wasn't her in the photo. It was someone else—someone with her face, but wrong. The eyes were too wide, the smile too sharp.

She tried to throw the photo away, but it kept appearing. On her desk. In her bag. Under her pillow.

Each time she found it, the figure in the photo was closer. First, it was across the room. Then at the doorway. Then right behind her shoulder.

This morning, she found the photo on her nightstand. The figure was gone from the frame. The background showed her bedroom, her bed, but empty.

Emma looked up at her mirror. Someone with her face smiled back, but Emma wasn't smiling.`,
    genre: 'mystery',
    cover: 'https://media.giphy.com/media/l0HlBO7eyXzSZkJri/giphy.gif',
    coverType: 'gif',
    blurb: 'An old Polaroid camera with one rule: never photograph yourself. But curiosity has consequences.',
    published: true,
    createdAt: new Date('2024-01-25'),
  },
  {
    id: 'seed-4',
    slug: 'the-tell-tale-heart',
    title: 'The Beating Heart',
    author: 'Edmund Ashford',
    authorId: '__SEED__',
    content: `TRUE! —nervous —very, very dreadfully nervous I had been and am; but why will you say that I am mad? The disease had sharpened my senses —not destroyed —not dulled them. Above all was the sense of hearing acute. I heard all things in the heaven and in the earth. I heard many things in hell. How, then, am I mad?

It is impossible to say how first the idea entered my brain; but once conceived, it haunted me day and night. Object there was none. Passion there was none. I loved the old man. He had never wronged me. He had never given me insult. For his gold I had no desire. I think it was his eye! yes, it was this!

He had the eye of a vulture —a pale blue eye, with a film over it. Whenever it fell upon me, my blood ran cold; and so by degrees —very gradually —I made up my mind to take the life of the old man, and thus rid myself of the eye forever.

Upon the eighth night I was more than usually cautious in opening the door. A watch's minute hand moves more quickly than did mine. Never before that night had I felt the extent of my own powers —of my sagacity.

I dismembered the corpse. I cut off the head and the arms and the legs. I then took up three planks from the flooring of the chamber, and deposited all between the scantlings. I then replaced the boards so cleverly, so cunningly, that no human eye —not even his —could have detected any thing wrong.

The officers were satisfied. My manner had convinced them. But, ere long, I felt myself getting pale and wished them gone. My head ached, and I fancied a ringing in my ears: but still they sat and still chatted. The ringing became more distinct.

No doubt I now grew very pale; —but I talked more fluently, and with a heightened voice. Yet the sound increased —and what could I do? It was a low, dull, quick sound —much such a sound as a watch makes when enveloped in cotton.

'Villains!' I shrieked, 'dissemble no more! I admit the deed! —tear up the planks! here, here! —It is the beating of his hideous heart!'`,
    genre: 'horror',
    cover: 'https://media.giphy.com/media/l0HlBO7eyXzSZkJri/giphy.gif',
    coverType: 'gif',
    blurb: 'A murderer\'s guilt manifests as the relentless beating of his victim\'s heart. A classic tale of madness and paranoia.',
    published: true,
    createdAt: new Date('1843-01-01'),
  },
  {
    id: 'seed-5',
    slug: 'the-yellow-wallpaper',
    title: 'The Gilded Wallpaper',
    author: 'Charlotte Pemberton',
    authorId: '__SEED__',
    content: `It is very seldom that mere ordinary people like John and myself secure ancestral halls for the summer. A colonial mansion, a hereditary estate, I would say a haunted house, and reach the height of romantic felicity—but that would be asking too much of fate!

John is a physician, and perhaps—I would not say it to a living soul, of course, but this is dead paper and a great relief to my mind—perhaps that is one reason I do not get well faster. You see he does not believe I am sick!

The color is repellent, almost revolting; a smouldering unclean yellow, strangely faded by the slow-turning sunlight. It is a dull yet lurid orange in some places, a sickly sulphur tint in others. No wonder the children hated it!

This wallpaper has a kind of sub-pattern in a different shade, a particularly irritating one, for you can only see it in certain lights, and not clearly then. But in the places where it isn't faded and where the sun is just so—I can see a strange, provoking, formless sort of figure, that seems to skulk about behind that silly and conspicuous front design.

I'm getting really fond of the room in spite of the wallpaper. Perhaps because of the wallpaper. It dwells in my mind so! I lie here on this great immovable bed—it is nailed down, I believe—and follow that pattern about by the hour.

I think that woman gets out in the daytime! And I'll tell you why—privately—I've seen her! I can see her out of every one of my windows! It is the same woman, I know, for she is always creeping, and most women do not creep by daylight.

I've got out at last, in spite of you and Jane. And I've pulled off most of the paper, so you can't put me back! Now why should that man have fainted? But he did, and right across my path by the wall, so that I had to creep over him every time!`,
    genre: 'horror',
    cover: 'https://media.giphy.com/media/26BRuo6sLetdllPAQ/giphy.gif',
    coverType: 'gif',
    blurb: 'A woman\'s descent into madness, trapped in a room with sinister yellow wallpaper. A feminist horror classic.',
    published: true,
    createdAt: new Date('1892-01-01'),
  },
  {
    id: 'seed-6',
    slug: 'the-monkey-paw',
    title: 'The Cursed Talisman',
    author: 'William Jacobsen',
    authorId: '__SEED__',
    content: `Without, the night was cold and wet, but in the small parlour of Laburnam Villa the blinds were drawn and the fire burned brightly. Father and son were at chess.

The sergeant-major took from his pocket a little paw, dried to a mummy. 'To look at,' said the sergeant-major, 'it's just an ordinary little paw, dried to a mummy.' He took something out of his pocket and proffered it.

'It had a spell put on it by an old fakir,' said the sergeant-major, 'a very holy man. He wanted to show that fate ruled people's lives, and that those who interfered with it did so to their sorrow. He put a spell on it so that three separate men could each have three wishes from it.'

'I wish for two hundred pounds,' said the old man distinctly. A fine crash from the piano greeted the words, interrupted by a shuddering cry from the old man. His wife and son ran toward him. 'It moved,' he cried, with a glance of disgust at the object as it lay on the floor. 'As I wished, it twisted in my hand like a snake.'

The knock came again. The old woman, with a sudden wrench, broke free and ran from the room. Her husband followed to the landing, and called after her appealingly as she hurried downstairs. He heard the chain rattle back and the bottom bolt drawn slowly and stiffly from the socket.

But her husband was on his hands and knees groping wildly on the floor in search of the paw. If he could only find it before the thing outside got in. A perfect fusillade of knocks reverberated through the house, and he heard the scraping of a chair as his wife put it down in the passage against the door.

The knocking ceased suddenly, although the echoes of it were still in the house. He heard the chair drawn back, and the door opened. A cold wind rushed up the staircase, and a long loud wail of disappointment and misery from his wife gave him courage to run down to her side, and then to the gate beyond. The street lamp flickering opposite shone on a quiet and deserted road.`,
    genre: 'horror',
    cover: 'https://media.giphy.com/media/xTiTnqUxyWbsAXq7Ju/giphy.gif',
    coverType: 'gif',
    blurb: 'A cursed monkey\'s paw grants three wishes. But every wish comes with a terrible price.',
    published: true,
    createdAt: new Date('1902-01-01'),
  },
  {
    id: 'seed-7',
    slug: 'the-masque-of-red-death',
    title: 'The Masque of Crimson Death',
    author: 'Edmund Ashford',
    authorId: '__SEED__',
    content: `The "Red Death" had long devastated the country. No pestilence had ever been so fatal, or so hideous. Blood was its Avatar and its seal—the redness and the horror of blood.

But the Prince Prospero was happy and dauntless and sagacious. When his dominions were half depopulated, he summoned to his presence a thousand hale and light-hearted friends from among the knights and dames of his court, and with these retired to the deep seclusion of one of his castellated abbeys.

The abbey was an extensive and magnificent structure, the creation of the prince's own eccentric yet august taste. A strong and lofty wall girdled it in. This wall had gates of iron. The courtiers, having entered, brought furnaces and massy hammers and welded the bolts.

It was toward the close of the fifth or sixth month of his seclusion, and while the pestilence raged most furiously abroad, that the Prince Prospero entertained his thousand friends at a masked ball of the most unusual magnificence.

There were seven rooms. The seventh apartment was closely shrouded in black velvet tapestries that hung all over the ceiling and down the walls. But in this chamber only, the color of the windows failed to correspond with the decorations. The panes here were scarlet—a deep blood color.

And now was acknowledged the presence of the Red Death. He had come like a thief in the night. And one by one dropped the revellers in the blood-bedewed halls of their revel, and died each in the despairing posture of his fall.

And Darkness and Decay and the Red Death held illimitable dominion over all.`,
    genre: 'horror',
    cover: 'https://media.giphy.com/media/3o7TKqnN349PBUtGFO/giphy.gif',
    coverType: 'gif',
    blurb: 'A prince tries to escape a deadly plague by hiding in his abbey. But death finds a way in.',
    published: true,
    createdAt: new Date('1842-01-01'),
  },
  {
    id: 'seed-8',
    slug: 'the-signal-man',
    title: 'The Railway Phantom',
    author: 'Charles Dickerson',
    authorId: '__SEED__',
    content: `'Halloa! Below there!' When he heard a voice thus calling to him, he was standing at the door of his box, with a flag in his hand, furled round its short pole. One would have thought, considering the nature of the ground, that he could not have doubted from what quarter the voice came; but instead of looking up to where I stood on the top of the steep cutting nearly over his head, he turned himself about, and looked down the Line.

There was something remarkable in his manner of doing so, though I could not have said for my life what. But I know it was remarkable enough to attract my notice.

'I was doubtful,' he returned, 'whether I had seen you before.' 'Where?' He pointed to the red light he had looked at. 'There?' I said. Intently watchful of me, he replied (but without sound), 'Yes.'

'Within six hours after the Appearance, the memorable accident on this Line happened, and within ten hours the dead and wounded were brought along through the tunnel over the spot where the figure had stood.'

'This,' he said, again laying his hand upon my arm, and glancing over his shoulder with hollow eyes, 'was just a year ago. Six or seven months passed, and I had recovered from the surprise and shock, when one morning, as the day was breaking, I, standing at the door, looked towards the red light, and saw the spectre again.'

'For God's sake, clear the way!' The words were still in my ears when I saw the danger light turned red, and heard the whistle, and saw the train coming on. I caught up my lamp, turned it on red, and ran towards the track, crying, 'For God's sake, clear the way!' But it was too late. The engine struck him.

The man who had driven the engine told me that he had seen the signal-man standing on the track, but that he had not moved. The signal-man had seen his own death. The spectre had been warning him all along.`,
    genre: 'mystery',
    cover: 'https://media.giphy.com/media/l0HlNQ03J5JxX6lva/giphy.gif',
    coverType: 'gif',
    blurb: 'A railway signal-man is haunted by a spectral figure that appears before disasters. A chilling ghost story.',
    published: true,
    createdAt: new Date('1866-01-01'),
  },
];
