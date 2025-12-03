/**
 * Chapter Parser Utility
 * Converts markdown-style chapter breaks into structured chapter data
 */

export interface Chapter {
  page: number;
  text: string;
}

/**
 * Parse content with chapter breaks into structured chapters
 * Supports formats:
 * - "---" as chapter separator
 * - "# Chapter X" as chapter header
 */
export const parseChapters = (content: string): Chapter[] => {
  if (!content || !content.trim()) {
    return [];
  }

  // Split by chapter breaks (---)
  const sections = content.split(/\n---\n/);
  
  const chapters: Chapter[] = [];
  
  sections.forEach((section, index) => {
    const trimmed = section.trim();
    if (!trimmed) return;
    
    // Remove chapter header if present (# Chapter X)
    const withoutHeader = trimmed.replace(/^#\s*Chapter\s*\d*\s*\n+/i, '');
    
    chapters.push({
      page: index + 1,
      text: withoutHeader.trim(),
    });
  });
  
  // If no chapter breaks found, treat entire content as single chapter
  if (chapters.length === 0 && content.trim()) {
    chapters.push({
      page: 1,
      text: content.trim(),
    });
  }
  
  return chapters;
};

/**
 * Convert chapters back to markdown format with chapter breaks
 */
export const chaptersToMarkdown = (chapters: Chapter[]): string => {
  return chapters
    .map((chapter, index) => {
      const header = `# Chapter ${chapter.page}\n\n`;
      const separator = index < chapters.length - 1 ? '\n\n---\n\n' : '';
      return `${header}${chapter.text}${separator}`;
    })
    .join('');
};

/**
 * Get chapter count from content
 */
export const getChapterCount = (content: string): number => {
  return parseChapters(content).length;
};

/**
 * Get preview text from first chapter
 */
export const getPreviewText = (content: string, maxLength: number = 150): string => {
  const chapters = parseChapters(content);
  if (chapters.length === 0) return '';
  
  const firstChapterText = chapters[0].text;
  if (firstChapterText.length <= maxLength) {
    return firstChapterText;
  }
  
  return firstChapterText.substring(0, maxLength) + '...';
};
