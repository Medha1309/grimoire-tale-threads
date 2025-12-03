/**
 * Generate placeholder book covers
 * Creates data URIs for SVG-based covers to avoid copyright issues
 */

import { Genre, getGenreAtmosphere } from './genreAtmospheres';

interface CoverOptions {
  title: string;
  genre: Genre;
}

export const generatePlaceholderCover = ({ title, genre }: CoverOptions): string => {
  const atmosphere = getGenreAtmosphere(genre);
  const colors = {
    primary: atmosphere.colors.primary,
    secondary: atmosphere.colors.secondary,
    accent: atmosphere.colors.accent,
  };
  const initials = title
    .split(' ')
    .map(word => word[0])
    .join('')
    .substring(0, 3)
    .toUpperCase();

  const svg = `
    <svg xmlns="http://www.w3.org/2000/svg" width="400" height="600" viewBox="0 0 400 600">
      <defs>
        <linearGradient id="grad" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" style="stop-color:${colors.primary};stop-opacity:1" />
          <stop offset="100%" style="stop-color:${colors.secondary};stop-opacity:1" />
        </linearGradient>
        <filter id="noise">
          <feTurbulence type="fractalNoise" baseFrequency="0.9" numOctaves="4" />
          <feColorMatrix type="saturate" values="0" />
          <feBlend mode="multiply" in="SourceGraphic" />
        </filter>
      </defs>
      
      <!-- Background -->
      <rect width="400" height="600" fill="url(#grad)" />
      
      <!-- Texture overlay -->
      <rect width="400" height="600" fill="black" opacity="0.3" filter="url(#noise)" />
      
      <!-- Ornate border -->
      <rect x="30" y="30" width="340" height="540" fill="none" stroke="${colors.accent}" stroke-width="2" opacity="0.4" />
      <rect x="40" y="40" width="320" height="520" fill="none" stroke="${colors.accent}" stroke-width="1" opacity="0.3" />
      
      <!-- Title initials -->
      <text x="200" y="320" font-family="serif" font-size="120" font-weight="bold" 
            fill="${colors.accent}" text-anchor="middle" opacity="0.6">
        ${initials}
      </text>
      
      <!-- Decorative elements -->
      <circle cx="200" cy="100" r="40" fill="none" stroke="${colors.accent}" stroke-width="2" opacity="0.3" />
      <circle cx="200" cy="500" r="40" fill="none" stroke="${colors.accent}" stroke-width="2" opacity="0.3" />
      
      <!-- Vignette -->
      <rect width="400" height="600" fill="url(#vignette)" />
      <defs>
        <radialGradient id="vignette">
          <stop offset="50%" style="stop-color:black;stop-opacity:0" />
          <stop offset="100%" style="stop-color:black;stop-opacity:0.6" />
        </radialGradient>
      </defs>
    </svg>
  `;

  return `data:image/svg+xml;base64,${btoa(svg)}`;
};

// Demo GIFs for select books (7 out of 12 books = ~58%)
// NOTE: These Giphy GIFs are for demonstration only - replace with your own covers in production
const STORY_DEMO_COVERS: Record<string, string> = {
  'blackwood-manor': 'https://media.giphy.com/media/l0HlDHQEiIdY3kxlm/giphy.gif',         // Candle/haunted
  'whispering-shadows': 'https://media.giphy.com/media/3o7TKqm1mNujcBPSpy/giphy.gif',     // Dark/mysterious
  'the-last-breath': 'https://media.giphy.com/media/xUPGcC0R9QjyxkPnS8/giphy.gif',       // Eerie
  'the-midnight-train': 'https://media.giphy.com/media/l0HlNQ03J5JxX6lva/giphy.gif',     // Dark train
  'the-bone-orchard': 'https://media.giphy.com/media/3o7TKMt1VVNkHV2PaE/giphy.gif',      // Spooky trees
  'the-lighthouse-keeper': 'https://media.giphy.com/media/xT9IgDEI1iZyb2wqo8/giphy.gif', // Ocean/lighthouse
  'the-crimson-room': 'https://media.giphy.com/media/l0HlBO7eyXzSZkJri/giphy.gif',       // Red/blood
  // Remaining 5 books use generated SVG placeholders
};

// For existing stories without covers, generate placeholders or use demo GIFs
export const getStoryCover = (story: { slug?: string; title: string; genre?: string; cover?: string }): string | undefined => {
  // If cover exists, use it
  if (story.cover) {
    return story.cover;
  }
  
  // For demonstration: Use demo GIF if available for this story
  if (story.slug && STORY_DEMO_COVERS[story.slug]) {
    return STORY_DEMO_COVERS[story.slug];
  }
  
  // If no cover and not in demo covers, return undefined (no cover)
  return undefined;
};
