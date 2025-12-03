/**
 * Saved Quote Types
 * For saving memorable passages from stories
 */

export interface SavedQuote {
  id: string;
  userId: string;
  storyId: string;
  storyTitle: string;
  storyAuthor: string;
  quote: string;
  context?: string; // Surrounding text for context
  chapterNumber?: number;
  savedAt: any; // Firestore Timestamp
  tags?: string[];
  ribbonColor?: string; // Bookmark ribbon color
  isPrivate: boolean;
  notes?: string; // Personal notes about the quote
}

export interface QuoteWithSelection extends SavedQuote {
  selectionStart?: number;
  selectionEnd?: number;
}
