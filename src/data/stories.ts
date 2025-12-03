import { Story } from "../types";

export const HORROR_QUOTES = [
  "Do you like scary movies?",
  "We all float down here.",
  "Whatever you do, don't fall asleep.",
  "I see dead people.",
  "They're here.",
  "Who will survive, and what will be left of them?",
];

// Story content data
export const STORY_CONTENT = {
  "blackwood-manor": [
    { page: 1, text: "The iron gates of Blackwood Manor groaned as they swung open, their hinges weeping rust like dried blood. Eleanor stood at the threshold, her inheritance looming before her—a Gothic monstrosity of blackened stone and shattered windows that seemed to watch her approach." },
    { page: 2, text: "Inside, the air tasted of decay and forgotten memories. Portraits lined the walls, their subjects' eyes following her movement through the entrance hall. Her grandmother's letter had been clear: 'Do not enter the east wing after dark. Some doors are meant to stay closed.'" },
    { page: 3, text: "But curiosity is a cruel mistress. That first night, as the grandfather clock struck midnight, Eleanor found herself drawn to the forbidden corridor. The floorboards whispered warnings beneath her feet, each creak a word in a language she almost understood." },
    { page: 4, text: "The door at the end stood ajar, a sliver of darkness beckoning. From within came the sound of music—a music box playing a lullaby she remembered from childhood. Her grandmother used to sing it, before the accident. Before the screaming stopped." },
    { page: 5, text: "Eleanor pushed the door open. The room was a child's nursery, frozen in time. Toys scattered across the floor, a rocking horse swaying gently though no breeze stirred the air. And there, in the corner, the music box—its ballerina spinning in endless circles." },
    { page: 6, text: "Then she saw the mirror. In its reflection, the room was different. The toys were new, the walls fresh. And standing behind her reflection was a little girl in a white dress, her face pale as moonlight, her smile too wide. 'You came back,' the girl whispered. 'Mother said you would.'" },
    { page: 7, text: "Eleanor spun around. The room was empty. But when she looked back at the mirror, the girl was closer now, her hand reaching through the glass. The temperature plummeted. The music box wound faster, its melody distorting into something hungry." },
    { page: 8, text: "She ran. Through corridors that seemed to stretch and twist, past portraits whose subjects now screamed silently. Behind her, the sound of small feet running, giggling, getting closer. The front door was locked. Every door was locked. Blackwood Manor had been waiting. And now it would never let her leave." }
  ],
  "whispering-shadows": [
    { page: 1, text: "They started as whispers in the walls. Marcus thought it was the old pipes, the settling of the Victorian house he'd bought for a song. Too good to be true, the realtor had said with a nervous smile. He should have listened." },
    { page: 2, text: "The whispers grew louder each night. Not words exactly, but the shape of words—syllables that slithered through the darkness like smoke. He'd wake at 3 AM to find his bedroom door open, though he always locked it. Always." },
    { page: 3, text: "Then came the shadows. They moved wrong, independent of light sources, pooling in corners like spilled ink. Marcus watched one night as his shadow on the wall raised its hand, though his own remained at his side. It waved. He didn't wave back." },
    { page: 4, text: "The whispers became clearer. Names. Dates. Pleas for help that ended in screams. He researched the house's history and found the truth: seven families, seven tragedies. The last family disappeared entirely. No bodies. No trace. Just shadows on the walls." },
    { page: 5, text: "Marcus tried to leave. His car wouldn't start. His phone had no signal. The front door opened to a wall of solid darkness that breathed. The shadows were everywhere now, multiplying, their whispers becoming a chorus of hunger." },
    { page: 6, text: "He barricaded himself in the bathroom, the only room with no shadows. But as dawn approached, he noticed something terrible: the light from under the door was fading. The shadows were eating the sun." },
    { page: 7, text: "When the darkness finally seeped under the door, Marcus understood. The whispers weren't warnings. They were invitations. The shadows weren't hunting him. They were welcoming him home. He'd always belonged here. He just hadn't remembered yet." },
    { page: 8, text: "The next family moved in three months later. They found the house empty, pristine. But sometimes, late at night, they hear whispers in the walls. And their shadows? Their shadows move just a little bit wrong." }
  ]
};

// Enhanced story metadata with genres and scary content
export const STORIES: Story[] = [
  { 
    slug: "blackwood-manor", 
    title: "The Haunting of Ravencrest Manor", 
    author: "Eleanor Nightshade", 
    cover: "https://media.giphy.com/media/l0HlDHQEiIdY3kxlm/giphy.gif",
    content: STORY_CONTENT["blackwood-manor"],
    genre: "thriller" as const,
    blurb: "Eleanor inherits a cursed manor where mirrors show the dead and doors lock from the inside. The house remembers everyone who enters. And it never lets them leave."
  },
  { 
    slug: "the-last-breath", 
    title: "The Last Breath", 
    author: "Victoria Mortensen", 
    cover: "https://media.giphy.com/media/xUPGcC0R9QjyxkPnS8/giphy.gif",
    content: [
      { page: 1, text: "They say you can hear the dying exhale their souls. Nurse Sarah Chen had heard it countless times in her fifteen years at St. Mercy's Hospital. But nothing prepared her for the pattern she discovered in the death logs." },
      { page: 2, text: "Every patient who died at exactly 3:33 AM whispered the same thing in their final moments. Not prayers. Not loved ones' names. They whispered 'Sarah.' Her name. And she'd never met any of them before." },
      { page: 3, text: "The first time she noticed, she thought it was coincidence. The second time, paranoia. By the fifth death, she knew something was hunting her through the dying. Something that knew her name." },
      { page: 4, text: "She started staying awake through the 3 AM hour, watching the monitors. When Mrs. Patterson's heart rate began to drop at 3:32, Sarah rushed to her room. The old woman's eyes snapped open, pupils dilated black. 'Sarah,' she rasped. 'It's waiting for you. In the basement. Where you were born.'" },
      { page: 5, text: "Sarah had never told anyone she was born in this hospital. In the old maternity ward. The one that burned down thirty years ago. The one they built the morgue over." },
      { page: 6, text: "At 3:33 AM the next night, Sarah descended to the basement. The morgue was empty, but she heard breathing. Not from the drawers. From behind them. From the walls themselves. And then she saw it—a door she'd never noticed before, marked 'Maternity Ward - Condemned.'" },
      { page: 7, text: "Inside, the nursery was perfectly preserved. Cribs lined the walls. And in each crib, a doll. Thirty dolls. Each one labeled with a name and date. She found hers: 'Sarah Chen - Born 3:33 AM.' The doll's eyes opened. 'Welcome home,' it whispered." },
      { page: 8, text: "They found Sarah the next morning, standing in the morgue, staring at nothing. She wouldn't speak. Wouldn't move. But every night at 3:33 AM, she whispers a name. A different name each time. And one by one, those patients begin to die." }
    ],
    genre: "horror" as const,
    blurb: "In a hospital where patients flatline at 3:33 AM, a nurse discovers they all whisper the same name before dying. Her name."
  },
  { 
    slug: "the-dollmakers-daughter", 
    title: "The Dollmaker's Daughter", 
    author: "C. Grimm",
    content: [
      { page: 1, text: "Each doll contained a piece of a missing child. Detective Maria Santos knew this the moment she entered the dollmaker's workshop. Seventy-three porcelain children lined the shelves. Seventy-three missing children in the past decade." },
      { page: 2, text: "The dollmaker, Heinrich Vogel, had died three days ago. Natural causes, they said. But his daughter still lived in the house above the workshop. A pale, silent girl of twelve who never left her room." },
      { page: 3, text: "Maria examined the dolls. Each one was perfect—too perfect. The eyes seemed to follow her. The tiny chests appeared to rise and fall. And when she touched one, it was warm. Impossibly warm." },
      { page: 4, text: "She found the daughter in the attic, surrounded by dolls. 'They're my friends,' the girl whispered. 'Papa made them for me. He said I was lonely. He said every child needs friends.' Maria's blood ran cold. 'Where did your father get the materials?' The girl smiled. 'From the children who came to visit.'" },
      { page: 5, text: "Maria called for backup, but when she turned back, the girl was gone. The dolls had moved. They formed a circle around her, their glass eyes gleaming. And then they spoke, in chorus, in children's voices: 'We remember. We remember our names. We remember our homes. We want to go back.'" },
      { page: 6, text: "One doll stepped forward. 'I'm Emma. I've been here for eight years. He took my hair for this doll's hair. My teeth for its smile. My voice for its words. Piece by piece, he made us into toys. And piece by piece, we're still alive inside them.'" },
      { page: 7, text: "Maria tried to run, but the dolls were faster. They climbed her legs, pulled at her clothes, their porcelain fingers surprisingly strong. 'Don't leave us,' they pleaded. 'Help us. Break the dolls. Set us free.' But breaking them would kill what remained of the children inside." },
      { page: 8, text: "They found Maria three days later, sitting in the workshop, surrounded by dolls. She was painting a new one. A perfect replica of herself. 'She's lonely,' Maria whispered, her eyes glassy. 'The daughter is lonely. She needs more friends. We all need more friends.' The dolls nodded in agreement." }
    ],
    genre: "horror" as const,
    blurb: "A dollmaker creates perfect porcelain children. But the dolls blink. They breathe. And they remember who they used to be."
  },
  {
    slug: "death-of-a-youtuber",
    title: "The Death of a YouTuber",
    author: "D. Cipher",
    cover: "https://media.giphy.com/media/3o7TKP9ln2Dr6ze6f6/giphy.gif",
    content: [
      { page: 1, text: "ChloeVlogs had 2.3 million subscribers when she died. The video of her death went viral in six hours. Twenty million views. Fifty million. One hundred million. The algorithm loved it. YouTube's servers couldn't handle the traffic." },
      { page: 2, text: "It was supposed to be a 24-hour challenge. 'Spending the Night in a REAL Haunted Asylum! (GONE WRONG)' The thumbnail showed her wide-eyed face, mouth open in a perfect O of shock. The red arrow pointed to a shadow in the window behind her. 'NOT CLICKBAIT!!!' the title screamed." },
      { page: 3, text: "Her cameraman, Jake, uploaded the footage anyway. The first hour was typical—jump scares, nervous laughter, 'Did you hear that?' But at 3:33 AM, something changed. Chloe stopped mid-sentence, staring at something off-camera. 'There's someone here,' she whispered. 'Someone who wants to be seen.'" },
      { page: 4, text: "The comments section exploded. 'This is fake.' 'Best acting ever!' 'The views are insane!' But then people started noticing. In the background, barely visible, a figure. It moved from frame to frame, getting closer. And it was looking directly at the camera. Directly at the viewers." },
      { page: 5, text: "At 4:17 AM, Chloe screamed. The camera dropped. Static. When the feed returned, she was gone. Just her phone on the ground, still recording. Still streaming. The view count climbed. The figure stood in frame now, clear as day. It smiled. Then it looked down at the phone. At us." },
      { page: 6, text: "Jake tried to delete the video. It wouldn't delete. He tried to delete the channel. It wouldn't delete. The video kept playing, kept streaming, kept accumulating views. And in the comments, people started posting: 'I saw it in my room.' 'It's watching me through my screen.' 'I can't stop watching.'" },
      { page: 7, text: "The police found Chloe's body three days later. Cause of death: cardiac arrest. But her eyes were still open, still wide, frozen in that perfect thumbnail expression. And her phone was still recording. Still streaming. The video had 500 million views." },
      { page: 8, text: "The video is still up. YouTube says they can't remove it—every time they try, it re-uploads itself. The view count never stops climbing. And if you watch it at 3:33 AM, they say you'll see yourself in the background. Standing behind Chloe. Smiling. Because the algorithm doesn't care if you're alive or dead. It only cares about engagement. And death? Death gets views." }
    ],
    genre: "thriller" as const,
    blurb: "A YouTuber dies during a livestream in a haunted asylum. The video goes viral. But the dead don't stop creating content. And the algorithm always wants more."
  },
  {
    slug: "the-midnight-train",
    title: "The Midnight Train",
    author: "Rebecca Thornfield",
    cover: "https://media.giphy.com/media/l0HlNQ03J5JxX6lva/giphy.gif",
    content: [
      { page: 1, text: "Platform 13 doesn't exist on any map. But James found it anyway, following the sound of a train whistle that only he could hear. The platform was old, covered in dust and cobwebs, lit by gas lamps that flickered with ghostly light." },
      { page: 2, text: "The train arrived at exactly midnight. An old steam locomotive, black as coal, pulling carriages with frosted windows. The doors opened with a hiss. Inside, passengers sat in perfect silence, dressed in clothes from different eras. Victorian gowns. 1920s suits. 1950s dresses." },
      { page: 3, text: "James stepped aboard. The doors closed behind him. The passengers turned to look at him, their faces pale, their eyes hollow. 'Welcome,' said a woman in a flapper dress. 'We've been waiting for you.' 'Waiting for me?' James asked. 'Why?' She smiled sadly. 'Because you're one of us now.'" },
      { page: 4, text: "The train began to move, but not forward. It moved through time. Through the windows, James saw the station change. Modern. Then old. Then older still. The passengers began to speak, telling their stories. Each one had died at this station. Accidents. Suicides. Murders. All waiting for the midnight train." },
      { page: 5, text: "James realized with horror that he couldn't remember how he got here. Couldn't remember the last few hours. The last few days. The conductor appeared, a tall figure in a black uniform. 'Ticket, please.' James checked his pockets. Found a ticket. One way. Dated today. Time of death: 11:47 PM." },
      { page: 6, text: "He ran to the doors, but they wouldn't open. The passengers watched him with pity. 'We all tried to escape,' said a man in a Victorian suit. 'But the train only stops for new passengers. And it never goes back.' James pounded on the windows. Outside, he saw himself. Standing on the platform. Waiting for the train." },
      { page: 7, text: "The train stopped. The doors opened. His other self stepped aboard. The doors closed. And James understood. The train runs in a loop. Forever picking up the same passengers. Forever reliving the same journey. He was trapped in his own death, watching it happen again and again." },
      { page: 8, text: "Now James sits in the carriage, dressed in modern clothes, waiting. Every midnight, the train stops at Platform 13. Every midnight, someone new boards. And every midnight, James watches himself die. Again. And again. And again. The midnight train never stops running." }
    ],
    genre: "mystery" as const,
    blurb: "A train arrives at midnight carrying passengers who died decades ago. They're looking for someone. And tonight, it's you."
  },
  {
    slug: "the-bone-orchard",
    title: "The Bone Orchard",
    author: "Thomas Graveson",
    cover: "https://media.giphy.com/media/3o7TKMt1VVNkHV2PaE/giphy.gif",
    content: [
      { page: 1, text: "The trees grew from unmarked graves. Everyone in town knew it, but no one spoke of it. The Bone Orchard had been there for centuries, its twisted trees bearing fruit that glowed faintly in the moonlight. Beautiful. Tempting. Forbidden." },
      { page: 2, text: "Maya's grandmother warned her: 'Never eat the fruit. Each one contains a memory. A life. A death. Those who eat them see how the buried died. And the visions drive them mad.' But Maya was curious. And hungry. And the fruit smelled so sweet." },
      { page: 3, text: "She picked one at midnight. A pale apple, luminescent and perfect. One bite. That's all it took. The vision hit her like a freight train. She was someone else. A woman in a white dress. Running through the orchard. Someone chasing her. Closer. Closer. A knife. A scream. Darkness." },
      { page: 4, text: "Maya woke up at the base of a tree, the apple core in her hand. She knew things now. The woman's name was Elizabeth. She died in 1847. Murdered by her husband. Buried here. The tree grew from her grave, fed by her bones, her blood, her memories." },
      { page: 5, text: "She couldn't stop. The visions were addictive. Each fruit showed her a different death. A hanging. A drowning. A poisoning. Hundreds of deaths. Hundreds of stories. The orchard was a graveyard of secrets, and she was uncovering them all." },
      { page: 6, text: "But the dead don't like their secrets told. The trees began to move at night, their branches reaching for her. The fruit began to whisper her name. 'Maya. Maya. Join us. Become part of the orchard. Let your story feed the trees.'" },
      { page: 7, text: "She tried to leave, but the orchard had grown. It surrounded her house. Her street. Her entire town. Everywhere she looked, trees. And fruit. Glowing. Calling. She was so hungry. So tired. One more fruit. Just one more." },
      { page: 8, text: "They found Maya's body beneath a young sapling. No wounds. No signs of struggle. Just a peaceful smile. And in the spring, the tree bore its first fruit. Beautiful. Glowing. And if you bite into it, you'll see Maya's last moments. Running through the orchard. Eating fruit after fruit. Until she became one herself." }
    ],
    genre: "horror" as const,
    blurb: "An orchard where trees grow from buried bodies. The fruit tastes of memories. And eating it shows you how they died."
  },
  {
    slug: "the-lighthouse-keeper",
    title: "The Lighthouse Keeper",
    author: "Helena Waverly",
    cover: "https://media.giphy.com/media/xT9IgDEI1iZyb2wqo8/giphy.gif",
    content: [
      { page: 1, text: "Alone on the rock, he heard singing from the depths. Thomas had been the lighthouse keeper for three months, and every night the song grew louder. Beautiful. Haunting. A woman's voice, calling from beneath the waves." },
      { page: 2, text: "The previous keeper had drowned. Walked into the sea one night and never came back. They said he went mad from isolation. But Thomas knew better. He'd found the journal. 'The singing won't stop. She wants me to join her. I can see her now, in the waves. She's beautiful. So beautiful.'" },
      { page: 3, text: "Thomas tried to resist. Wore earplugs. Played music. But the singing penetrated everything. It was in his bones, his blood, his dreams. And every night, he found himself standing at the edge of the rocks, staring into the water, searching for the source." },
      { page: 4, text: "On the seventh night, he saw her. A woman in the waves, her skin pale as moonlight, her hair flowing like seaweed. She smiled at him, reached out her hand. 'Come,' she sang. 'Come to me. The water is warm. The depths are peaceful. Come home.'" },
      { page: 5, text: "Thomas researched the lighthouse's history. Seventeen keepers in fifty years. All drowned. All walked into the sea. And then he found the old newspaper clipping. A ship had wrecked on these rocks in 1823. All hands lost. Including the captain's daughter, who was to be married the next day." },
      { page: 6, text: "She was still waiting. Still singing. Still calling for her lost love. And every keeper, she mistook for him. Thomas tried to tell her. Shouted into the waves. 'I'm not him! He's dead! Let me go!' But she only smiled and sang louder." },
      { page: 7, text: "The singing became unbearable. It filled his head, his heart, his soul. He couldn't eat. Couldn't sleep. Could only hear her voice, calling, calling, calling. And the water looked so inviting. So peaceful. So much better than this lonely rock." },
      { page: 8, text: "They found the lighthouse abandoned. The light still burning. Thomas's clothes folded neatly on the rocks. And if you stand there at night, you can hear it. Two voices now. Singing together. Calling for the next keeper. The next love. The next soul to join them in the depths." }
    ],
    genre: "horror" as const,
    blurb: "Isolated on a lighthouse, a keeper hears singing from the ocean. Beautiful. Hypnotic. And getting closer every night."
  },
  {
    slug: "the-forgotten-ward",
    title: "The Forgotten Ward",
    author: "Samuel Kingston",
    content: [
      { page: 1, text: "Room 237 had been sealed for fifty years. But urban explorer Jake Morrison found a way in. The forgotten ward of Hillcrest Asylum. Where they kept the 'hopeless cases.' Where patients were left to die. Where the screams never stopped." },
      { page: 2, text: "The ward was exactly as it had been left. Beds with restraints. Medication carts. Patient files scattered on the floor. Jake picked one up. 'Patient 237 - Violent delusions. Claims to see the dead. Recommends permanent isolation.' The date: 1973. Fifty years ago." },
      { page: 3, text: "He heard footsteps. Shuffling. Coming from the end of the hall. Jake froze. The building was supposed to be empty. But someone was here. Something was here. And it was getting closer." },
      { page: 4, text: "A figure emerged from the shadows. A woman in a hospital gown, her hair long and matted, her eyes hollow. 'Doctor?' she whispered. 'Doctor, is that you? Have you come to let us out?' Jake backed away. 'I'm not a doctor. I'm just—' 'LIAR!' she screamed. 'You're all liars! You said you'd come back! You said you'd help us!'" },
      { page: 5, text: "More figures appeared. Dozens of them. Patients in gowns, their skin pale, their movements jerky. They surrounded Jake, reaching for him with skeletal hands. 'Help us.' 'Save us.' 'Don't leave us again.' 'We've been waiting so long.'" },
      { page: 6, text: "Jake ran. Through corridors that seemed to stretch forever. Past rooms where shadows moved. Past walls covered in scratches and blood. The patients followed, their voices echoing. 'Doctor! Come back! We need our medicine! We need our treatment! We need to get out!'" },
      { page: 7, text: "He found the exit. Locked. The patients closed in. 'You can't leave,' they said in unison. 'No one leaves. The doctor locked us in. And now you're locked in too. Forever. Forever. Forever.' Jake screamed. Pounded on the door. But no one came. No one ever came." },
      { page: 8, text: "They found Jake three days later, sitting in Room 237, staring at nothing. He wouldn't speak. Wouldn't move. Just rocked back and forth, whispering. 'I'm not the doctor. I'm not the doctor. I'm not the doctor.' But the patients don't believe him. They never believe anyone. And they're still waiting. Still hoping. Still trapped in the forgotten ward." }
    ],
    genre: "horror" as const,
    blurb: "An abandoned psychiatric ward where patients were left to die. Their screams still echo. And they're still waiting for the doctor."
  },
  {
    slug: "the-watcher-in-the-walls",
    title: "The Watcher in the Walls",
    author: "Amelia Darkwood",
    cover: "https://media.giphy.com/media/3o7TKqnN349PBUtGFO/giphy.gif",
    content: [
      { page: 1, text: "Something lived between the walls. The Chen family heard it the first night. Scratching. Scuttling. Moving through the spaces between rooms. 'Just mice,' David said. But mice don't watch you through the cracks." },
      { page: 2, text: "Their daughter Emma saw it first. Eyes in the wall. Glowing. Unblinking. Watching her sleep. 'There's someone in the walls, Mommy,' she cried. But when they checked, there was nothing. Just darkness. And the faint smell of decay." },
      { page: 3, text: "The scratching grew louder. More insistent. And then they found the messages. Carved into the drywall behind the furniture. 'GET OUT.' 'MY HOUSE.' 'YOU DON'T BELONG HERE.' The letters were crude, desperate, angry." },
      { page: 4, text: "David opened the walls. Found a space between the studs. Large enough for a person. And inside, evidence of habitation. Blankets. Food wrappers. Photographs. Of their family. Taken from inside the house. Someone had been living in their walls. Watching them. For weeks." },
      { page: 5, text: "They called the police. Searched the entire house. Found nothing. But that night, Emma woke to breathing. Right next to her ear. Coming from inside the wall. And a whisper: 'I'm still here. I'll always be here. This is my home.'" },
      { page: 6, text: "The family tried to leave. But their car wouldn't start. Their phones had no signal. And when they opened the front door, it led to another room. A room that shouldn't exist. A room inside the walls. With photographs covering every surface. Photographs of them. Sleeping. Eating. Living. Watched." },
      { page: 7, text: "David found the previous owner's diary in the hidden room. 'It started as a game. Hide in the walls. Watch the family. But then I couldn't leave. The walls wouldn't let me. They need a watcher. Someone to guard the house. Someone to keep the family safe. Or keep them trapped.'" },
      { page: 8, text: "The Chen family still lives in the house. They stopped trying to leave. Stopped trying to find the watcher. Because now they understand. The house needs a watcher. And if they leave, they'll become the watchers. Forever trapped between the walls. Forever watching the next family. Forever scratching. Forever whispering. 'This is my home.'" }
    ],
    genre: "horror" as const,
    blurb: "Scratching in the walls. Eyes in the cracks. A family moves into their dream home. But something was already living there."
  },
  {
    slug: "house-of-echoes",
    title: "House of Echoes",
    author: "Marcus Holloway",
    cover: "https://media.giphy.com/media/l0HlMSVVw9zqmClLq/giphy.gif",
    content: [
      { page: 1, text: "The house was bigger on the inside than the outside. Mark measured it three times. The exterior: forty feet wide. The interior: sixty feet. Twenty feet of space that shouldn't exist. Twenty feet of impossible geometry. And it was growing." },
      { page: 2, text: "His wife Lisa thought he was obsessed. But then she found the hallway. A corridor that wasn't there yesterday. Leading to rooms they'd never seen. Empty rooms. Dark rooms. Rooms that echoed with sounds that had no source." },
      { page: 3, text: "They tried to map the house. But the layout kept changing. Hallways appeared and disappeared. Doors led to different rooms each time. And the measurements... the measurements made no sense. The house was expanding. Growing inward. Creating space from nothing." },
      { page: 4, text: "Mark ventured deep into the new sections. Found stairs leading down. And down. And down. Miles of stairs. Impossible in a two-story house. But there they were. And at the bottom, darkness. Absolute. Consuming. And something breathing in that darkness." },
      { page: 5, text: "Lisa heard echoes. Her own voice. Mark's voice. Conversations they'd had. Arguments. Whispers. But delayed. Coming from deep within the house. As if the house was recording them. Remembering them. Playing them back. And the echoes were getting closer." },
      { page: 6, text: "They tried to leave. But the front door opened to another hallway. The windows showed rooms instead of outside. The house had closed around them. Sealed them in. And it was still growing. More rooms. More corridors. More darkness. An infinite maze with them at the center." },
      { page: 7, text: "Mark found a journal in one of the rooms. The previous owner's notes. 'The house feeds on space. On geometry. On the people inside. It grows by consuming. First the space. Then the time. Then the souls. We've been here for years. Or days. Or minutes. Time doesn't work right. Nothing works right. The house is alive. And it's hungry.'" },
      { page: 8, text: "Mark and Lisa are still in the house. Or maybe they're not. Maybe they've been consumed. Become part of the walls. Part of the echoes. Sometimes, new owners move in. They measure the house. Notice the impossible dimensions. And then they find the hallway. The one that wasn't there before. Leading deeper. Always deeper. Into the house of echoes. Where space has no meaning. And escape has no exit." }
    ],
    genre: "horror" as const,
    blurb: "A house with impossible geometry. Hallways that shouldn't exist. Rooms that change. And something in the darkness that's always been there."
  },
  {
    slug: "the-tell-tale-heart",
    title: "The Beating Heart",
    author: "Edmund Ashford",
    cover: "https://media.giphy.com/media/3o7TKPATxjC1zfIwj6/giphy.gif",
    content: [
      { page: 1, text: "TRUE! —nervous —very, very dreadfully nervous I had been and am; but why will you say that I am mad? The disease had sharpened my senses —not destroyed —not dulled them. Above all was the sense of hearing acute. I heard all things in the heaven and in the earth. I heard many things in hell. How, then, am I mad?" },
      { page: 2, text: "It is impossible to say how first the idea entered my brain; but once conceived, it haunted me day and night. Object there was none. Passion there was none. I loved the old man. He had never wronged me. He had never given me insult. For his gold I had no desire. I think it was his eye! yes, it was this!" },
      { page: 3, text: "He had the eye of a vulture —a pale blue eye, with a film over it. Whenever it fell upon me, my blood ran cold; and so by degrees —very gradually —I made up my mind to take the life of the old man, and thus rid myself of the eye forever." },
      { page: 4, text: "You should have seen how wisely I proceeded —with what caution —with what foresight —with what dissimulation I went to work! I was never kinder to the old man than during the whole week before I killed him. And every night, about midnight, I turned the latch of his door and opened it —oh so gently!" },
      { page: 5, text: "Upon the eighth night I was more than usually cautious in opening the door. A watch's minute hand moves more quickly than did mine. Never before that night had I felt the extent of my own powers —of my sagacity. I could scarcely contain my feelings of triumph. To think that there I was, opening the door, little by little, and he not even to dream of my secret deeds or thoughts." },
      { page: 6, text: "I made up my mind to take the life of the old man, and thus rid myself of the eye forever. I dismembered the corpse. I cut off the head and the arms and the legs. I then took up three planks from the flooring of the chamber, and deposited all between the scantlings. I then replaced the boards so cleverly, so cunningly, that no human eye —not even his —could have detected any thing wrong." },
      { page: 7, text: "The officers were satisfied. My manner had convinced them. I was singularly at ease. But, ere long, I felt myself getting pale and wished them gone. My head ached, and I fancied a ringing in my ears: but still they sat and still chatted. The ringing became more distinct: —It continued and became more distinct: I talked more freely to get rid of the feeling: but it continued and gained definiteness —until, at length, I found that the noise was not within my ears." },
      { page: 8, text: "No doubt I now grew very pale; —but I talked more fluently, and with a heightened voice. Yet the sound increased —and what could I do? It was a low, dull, quick sound —much such a sound as a watch makes when enveloped in cotton. I gasped for breath —and yet the officers heard it not. I talked more quickly —more vehemently; but the noise steadily increased. 'Villains!' I shrieked, 'dissemble no more! I admit the deed! —tear up the planks! here, here! —It is the beating of his hideous heart!'" }
    ],
    genre: "horror" as const,
    blurb: "A murderer's guilt manifests as the relentless beating of his victim's heart. A classic tale of madness and paranoia."
  },
  {
    slug: "the-yellow-wallpaper",
    title: "The Gilded Wallpaper",
    author: "Charlotte Pemberton",
    cover: "https://media.giphy.com/media/xT9IgN8YKRhByRBzMI/giphy.gif",
    content: [
      { page: 1, text: "It is very seldom that mere ordinary people like John and myself secure ancestral halls for the summer. A colonial mansion, a hereditary estate, I would say a haunted house, and reach the height of romantic felicity—but that would be asking too much of fate!" },
      { page: 2, text: "John is a physician, and perhaps—I would not say it to a living soul, of course, but this is dead paper and a great relief to my mind—perhaps that is one reason I do not get well faster. You see he does not believe I am sick! And what can one do?" },
      { page: 3, text: "There comes John's sister. Such a dear girl as she is, and so careful of me! I must not let her find me writing. She is a perfect and enthusiastic housekeeper, and hopes for no better profession. I verily believe she thinks it is the writing which made me sick!" },
      { page: 4, text: "The color is repellent, almost revolting; a smouldering unclean yellow, strangely faded by the slow-turning sunlight. It is a dull yet lurid orange in some places, a sickly sulphur tint in others. No wonder the children hated it! I should hate it myself if I had to live in this room long." },
      { page: 5, text: "This wallpaper has a kind of sub-pattern in a different shade, a particularly irritating one, for you can only see it in certain lights, and not clearly then. But in the places where it isn't faded and where the sun is just so—I can see a strange, provoking, formless sort of figure, that seems to skulk about behind that silly and conspicuous front design." },
      { page: 6, text: "I'm getting really fond of the room in spite of the wallpaper. Perhaps because of the wallpaper. It dwells in my mind so! I lie here on this great immovable bed—it is nailed down, I believe—and follow that pattern about by the hour. It is as good as gymnastics, I assure you." },
      { page: 7, text: "I think that woman gets out in the daytime! And I'll tell you why—privately—I've seen her! I can see her out of every one of my windows! It is the same woman, I know, for she is always creeping, and most women do not creep by daylight. I see her on that long road under the trees, creeping along, and when a carriage comes she hides under the blackberry vines." },
      { page: 8, text: "I've got out at last, in spite of you and Jane. And I've pulled off most of the paper, so you can't put me back! Now why should that man have fainted? But he did, and right across my path by the wall, so that I had to creep over him every time!" }
    ],
    genre: "horror" as const,
    blurb: "A woman's descent into madness, trapped in a room with sinister yellow wallpaper. A feminist horror classic about confinement and sanity."
  },
  {
    slug: "the-masque-of-red-death",
    title: "The Masque of Crimson Death",
    author: "Edmund Ashford",
    cover: "https://media.giphy.com/media/l0HlHFRbmaZtBRhXG/giphy.gif",
    content: [
      { page: 1, text: "The 'Red Death' had long devastated the country. No pestilence had ever been so fatal, or so hideous. Blood was its Avatar and its seal—the redness and the horror of blood. There were sharp pains, and sudden dizziness, and then profuse bleeding at the pores, with dissolution." },
      { page: 2, text: "But the Prince Prospero was happy and dauntless and sagacious. When his dominions were half depopulated, he summoned to his presence a thousand hale and light-hearted friends from among the knights and dames of his court, and with these retired to the deep seclusion of one of his castellated abbeys." },
      { page: 3, text: "The abbey was an extensive and magnificent structure, the creation of the prince's own eccentric yet august taste. A strong and lofty wall girdled it in. This wall had gates of iron. The courtiers, having entered, brought furnaces and massy hammers and welded the bolts. They resolved to leave means neither of ingress nor egress to the sudden impulses of despair or of frenzy from within." },
      { page: 4, text: "It was toward the close of the fifth or sixth month of his seclusion, and while the pestilence raged most furiously abroad, that the Prince Prospero entertained his thousand friends at a masked ball of the most unusual magnificence. It was a voluptuous scene, that masquerade." },
      { page: 5, text: "There were seven rooms. In many palaces, however, such suites form a long and straight vista, while the folding doors slide back nearly to the walls on either hand, so that the view of the whole extent is scarcely impeded. Here the case was very different. The apartments were so irregularly disposed that the vision embraced but little more than one at a time." },
      { page: 6, text: "The seventh apartment was closely shrouded in black velvet tapestries that hung all over the ceiling and down the walls. But in this chamber only, the color of the windows failed to correspond with the decorations. The panes here were scarlet—a deep blood color. And the effect of the fire-light that streamed upon the dark hangings through the blood-tinted panes, was ghastly in the extreme." },
      { page: 7, text: "And now was acknowledged the presence of the Red Death. He had come like a thief in the night. And one by one dropped the revellers in the blood-bedewed halls of their revel, and died each in the despairing posture of his fall." },
      { page: 8, text: "And Darkness and Decay and the Red Death held illimitable dominion over all." }
    ],
    genre: "horror" as const,
    blurb: "A prince tries to escape a deadly plague by hiding in his abbey with nobles. But death finds a way in. An allegory of mortality."
  },
  {
    slug: "the-monkey-paw",
    title: "The Cursed Talisman",
    author: "William Jacobsen",
    cover: "https://media.giphy.com/media/3o7TKPdUkkbCAVqWk0/giphy.gif",
    content: [
      { page: 1, text: "Without, the night was cold and wet, but in the small parlour of Laburnam Villa the blinds were drawn and the fire burned brightly. Father and son were at chess, the former, who possessed ideas about the game involving radical changes, putting his king into such sharp and unnecessary perils that it even provoked comment from the white-haired old lady knitting placidly by the fire." },
      { page: 2, text: "'I should hardly think that he'd come to-night,' said his father, with his hand poised over the board. 'Mate,' replied the son. 'That's the worst of living so far out,' bawled Mr. White, with sudden and unlooked-for violence; 'of all the beastly, slushy, out-of-the-way places to live in, this is the worst.'" },
      { page: 3, text: "The sergeant-major took from his pocket a little paw, dried to a mummy. 'To look at,' said the sergeant-major, fumbling in his pocket, 'it's just an ordinary little paw, dried to a mummy.' He took something out of his pocket and proffered it. Mrs. White drew back with a grimace, but her son, taking it, examined it curiously. 'And what is there special about it?' inquired Mr. White as he took it from his son, and having examined it, placed it upon the table." },
      { page: 4, text: "'It had a spell put on it by an old fakir,' said the sergeant-major, 'a very holy man. He wanted to show that fate ruled people's lives, and that those who interfered with it did so to their sorrow. He put a spell on it so that three separate men could each have three wishes from it.'" },
      { page: 5, text: "'I wish for two hundred pounds,' said the old man distinctly. A fine crash from the piano greeted the words, interrupted by a shuddering cry from the old man. His wife and son ran toward him. 'It moved,' he cried, with a glance of disgust at the object as it lay on the floor. 'As I wished, it twisted in my hand like a snake.'" },
      { page: 6, text: "The knock came again. The old woman, with a sudden wrench, broke free and ran from the room. Her husband followed to the landing, and called after her appealingly as she hurried downstairs. He heard the chain rattle back and the bottom bolt drawn slowly and stiffly from the socket. Then the old woman's voice, strained and panting. 'The bolt,' she cried, loudly. 'Come down. I can't reach it.'" },
      { page: 7, text: "But her husband was on his hands and knees groping wildly on the floor in search of the paw. If he could only find it before the thing outside got in. A perfect fusillade of knocks reverberated through the house, and he heard the scraping of a chair as his wife put it down in the passage against the door. He heard the creaking of the bolt as it came slowly back, and at the same moment he found the monkey's paw, and frantically breathed his third and last wish." },
      { page: 8, text: "The knocking ceased suddenly, although the echoes of it were still in the house. He heard the chair drawn back, and the door opened. A cold wind rushed up the staircase, and a long loud wail of disappointment and misery from his wife gave him courage to run down to her side, and then to the gate beyond. The street lamp flickering opposite shone on a quiet and deserted road." }
    ],
    genre: "horror" as const,
    blurb: "A cursed monkey's paw grants three wishes. But every wish comes with a terrible price. Classic tale of fate and consequence."
  },
  {
    slug: "the-cask-of-amontillado",
    title: "The Catacombs of Vengeance",
    author: "Edmund Ashford",
    cover: "https://media.giphy.com/media/xT9IgzoKnwFNmISR8I/giphy.gif",
    content: [
      { page: 1, text: "The thousand injuries of Fortunato I had borne as I best could, but when he ventured upon insult I vowed revenge. You, who so well know the nature of my soul, will not suppose, however, that gave utterance to a threat. At length I would be avenged; this was a point definitely, settled—but the very definitiveness with which it was resolved precluded the idea of risk." },
      { page: 2, text: "It was about dusk, one evening during the supreme madness of the carnival season, that I encountered my friend. He accosted me with excessive warmth, for he had been drinking much. The man wore motley. He had on a tight-fitting parti-striped dress, and his head was surmounted by the conical cap and bells. I was so pleased to see him that I thought I should never have done wringing his hand." },
      { page: 3, text: "'My dear Fortunato, you are luckily met. How remarkably well you are looking to-day. But I have received a pipe of what passes for Amontillado, and I have my doubts.' 'How?' said he. 'Amontillado, A pipe? Impossible! And in the middle of the carnival!' 'I have my doubts,' I replied; 'and I was silly enough to pay the full Amontillado price without consulting you in the matter.'" },
      { page: 4, text: "We passed through a range of low arches, descended, passed on, and descending again, arrived at a deep crypt, in which the foulness of the air caused our flambeaux rather to glow than flame. At the most remote end of the crypt there appeared another less spacious. Its walls had been lined with human remains, piled to the vault overhead, in the fashion of the great catacombs of Paris." },
      { page: 5, text: "'The Amontillado!' ejaculated my friend, not yet recovered from his astonishment. 'True,' I replied; 'the Amontillado.' As I said these words I busied myself among the pile of bones of which I have before spoken. Throwing them aside, I soon uncovered a quantity of building stone and mortar. With these materials and with the aid of my trowel, I began vigorously to wall up the entrance of the niche." },
      { page: 6, text: "A succession of loud and shrill screams, bursting suddenly from the throat of the chained form, seemed to thrust me violently back. For a brief moment I hesitated, I trembled. Unsheathing my rapier, I began to grope with it about the recess; but the thought of an instant reassured me. I placed my hand upon the solid fabric of the catacombs, and felt satisfied." },
      { page: 7, text: "I had scarcely laid the first tier of the masonry when I discovered that the intoxication of Fortunato had in a great measure worn off. The earliest indication I had of this was a low moaning cry from the depth of the recess. It was not the cry of a drunken man. There was then a long and obstinate silence. I laid the second tier, and the third, and the fourth; and then I heard the furious vibrations of the chain." },
      { page: 8, text: "For the half of a century no mortal has disturbed them. In pace requiescat!" }
    ],
    genre: "thriller" as const,
    blurb: "A tale of revenge in the catacombs. A man lures his enemy into the depths for the perfect murder. A masterpiece of vengeance."
  },
  {
    slug: "the-pit-and-pendulum",
    title: "The Pendulum's Edge",
    author: "Edmund Ashford",
    cover: "https://media.giphy.com/media/l0HlNaQ6gWfllcjDO/giphy.gif",
    content: [
      { page: 1, text: "I was sick—sick unto death with that long agony; and when they at length unbound me, and I was permitted to sit, I felt that my senses were leaving me. The sentence—the dread sentence of death—was the last of distinct accentuation which reached my ears." },
      { page: 2, text: "I saw the lips of the black-robed judges. They appeared to me white—whiter than the sheet upon which I trace these words—and thin even to grotesqueness; thin with the intensity of their expression of firmness—of immoveable resolution—of stern contempt of human torture. I saw that the decrees of what to me was Fate, were still issuing from those lips." },
      { page: 3, text: "The blackness of eternal night encompassed me. I struggled for breath. The intensity of the darkness seemed to oppress and stifle me. The atmosphere was intolerably close. I still lay quietly, and made effort to exercise my reason. I brought to mind the inquisitorial proceedings, and attempted from that point to deduce my real condition." },
      { page: 4, text: "Shaking in every limb, I groped my way back to the wall; resolving there to perish rather than risk the terrors of the wells, of which my imagination now pictured many in various positions about the dungeon. In other conditions of mind I might have had courage to end my misery at once by a plunge into one of these abysses; but now I was the veriest of cowards." },
      { page: 5, text: "Looking upward, I surveyed the ceiling of my prison. It was some thirty or forty feet overhead, and constructed much as the side walls. In one of its panels a very singular figure riveted my whole attention. It was the painted figure of Time as he is commonly represented, save that, in lieu of a scythe, he held what, at a casual glance, I supposed to be the pictured image of a huge pendulum." },
      { page: 6, text: "Down—steadily down it crept. I took a frenzied pleasure in contrasting its downward with its lateral velocity. To the right—to the left—far and wide—with the shriek of a damned spirit; to my heart with the stealthy pace of the tiger! I alternately laughed and howled as the one or the other idea grew predominant." },
      { page: 7, text: "The vibration of the pendulum was at right angles to my length. I saw that some ten or twelve vibrations would bring the steel in actual contact with my robe, and with this observation there suddenly came over my spirit all the keen, collected calmness of despair. For the first time during many hours—or perhaps days—I thought." },
      { page: 8, text: "There was a discordant hum of human voices! There was a loud blast as of many trumpets! There was a harsh grating as of a thousand thunders! The fiery walls rushed back! An outstretched arm caught my own as I fell, fainting, into the abyss. It was that of General Lasalle. The French army had entered Toledo. The Inquisition was in the hands of its enemies." }
    ],
    genre: "horror" as const,
    blurb: "Trapped in a dungeon of the Spanish Inquisition, a prisoner faces descending blade and bottomless pit. A torture chamber nightmare."
  },
  {
    slug: "the-signal-man",
    title: "The Railway Phantom",
    author: "Charles Dickerson",
    cover: "https://media.giphy.com/media/xT9IgIc0lryrxvqVGM/giphy.gif",
    content: [
      { page: 1, text: "'Halloa! Below there!' When he heard a voice thus calling to him, he was standing at the door of his box, with a flag in his hand, furled round its short pole. One would have thought, considering the nature of the ground, that he could not have doubted from what quarter the voice came; but instead of looking up to where I stood on the top of the steep cutting nearly over his head, he turned himself about, and looked down the Line." },
      { page: 2, text: "There was something remarkable in his manner of doing so, though I could not have said for my life what. But I know it was remarkable enough to attract my notice, even though his figure was foreshortened and shadowed, down in the deep trench, and mine was high above him, so steeped in the glow of an angry sunset, that I had shaded my eyes with my hand before I saw him at all." },
      { page: 3, text: "'I was doubtful,' he returned, 'whether I had seen you before.' 'Where?' He pointed to the red light he had looked at. 'There?' I said. Intently watchful of me, he replied (but without sound), 'Yes.' 'My good fellow, what should I do there? However, be that as it may, I never was there, you may swear.'" },
      { page: 4, text: "'Within six hours after the Appearance, the memorable accident on this Line happened, and within ten hours the dead and wounded were brought along through the tunnel over the spot where the figure had stood.' A disagreeable shudder crept over me, but I did my best against it." },
      { page: 5, text: "'This,' he said, again laying his hand upon my arm, and glancing over his shoulder with hollow eyes, 'was just a year ago. Six or seven months passed, and I had recovered from the surprise and shock, when one morning, as the day was breaking, I, standing at the door, looked towards the red light, and saw the spectre again.'" },
      { page: 6, text: "'Did it cry out?' 'No. It was silent.' 'Did it wave its arm?' 'No. It leaned against the shaft of the light, with both hands before the face. Like this.' Once more I followed his action with my eyes. It was an action of mourning. I have seen such an attitude in stone figures on tombs." },
      { page: 7, text: "'For God's sake, clear the way!' The words were still in my ears when I saw the danger light turned red, and heard the whistle, and saw the train coming on. I caught up my lamp, turned it on red, and ran towards the track, crying, 'For God's sake, clear the way!' But it was too late. The engine struck him." },
      { page: 8, text: "The man who had driven the engine told me that he had seen the signal-man standing on the track, but that he had not moved. 'I called to him, I waved to him, I did everything I could,' he said. 'But he just stood there, looking at something that wasn't there. Looking at the red light. And then...' The signal-man had seen his own death. The spectre had been warning him all along." }
    ],
    genre: "mystery" as const,
    blurb: "A railway signal-man is haunted by a spectral figure that appears before disasters. A chilling ghost story of premonition."
  },
];
