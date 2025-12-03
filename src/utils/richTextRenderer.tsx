/**
 * Rich Text Renderer
 * Converts markdown-style formatting to HTML for display
 */

import React from 'react';

const processInlineFormatting = (text: string): React.ReactNode[] => {
  const result: React.ReactNode[] = [];
  let remaining = text;
  let key = 0;

  while (remaining.length > 0) {
    // Try to match formatting patterns in order of precedence
    // Bold must come before italic to handle ** before *
    const boldMatch = remaining.match(/^\*\*(.+?)\*\*/);
    const strikeMatch = remaining.match(/^~~(.+?)~~/);
    const codeMatch = remaining.match(/^`(.+?)`/);
    const italicMatch = remaining.match(/^\*(.+?)\*/);

    if (boldMatch) {
      result.push(<strong key={`bold-${key++}`}>{boldMatch[1]}</strong>);
      remaining = remaining.slice(boldMatch[0].length);
    } else if (strikeMatch) {
      result.push(<s key={`strike-${key++}`}>{strikeMatch[1]}</s>);
      remaining = remaining.slice(strikeMatch[0].length);
    } else if (codeMatch) {
      result.push(
        <code key={`code-${key++}`} className="px-1 py-0.5 bg-zinc-800/50 rounded text-sm font-mono">
          {codeMatch[1]}
        </code>
      );
      remaining = remaining.slice(codeMatch[0].length);
    } else if (italicMatch) {
      result.push(<em key={`italic-${key++}`}>{italicMatch[1]}</em>);
      remaining = remaining.slice(italicMatch[0].length);
    } else {
      // No match, add characters until we hit a special character
      const nextSpecialChar = remaining.search(/[*~`]/);
      if (nextSpecialChar === -1) {
        // No more special characters, add the rest
        result.push(<React.Fragment key={`text-${key++}`}>{remaining}</React.Fragment>);
        remaining = '';
      } else if (nextSpecialChar === 0) {
        // Special character at start but no match, add it and continue
        result.push(<React.Fragment key={`text-${key++}`}>{remaining[0]}</React.Fragment>);
        remaining = remaining.slice(1);
      } else {
        // Add text up to the special character
        result.push(<React.Fragment key={`text-${key++}`}>{remaining.slice(0, nextSpecialChar)}</React.Fragment>);
        remaining = remaining.slice(nextSpecialChar);
      }
    }
  }

  return result;
};

export const renderRichText = (text: string): React.ReactNode => {
  if (!text) return null;

  // Split by lines to handle line breaks
  const lines = text.split('\n');
  
  return lines.map((line, lineIndex) => {
    // Handle special line types first
    if (line.startsWith('> ')) {
      const content = processInlineFormatting(line.substring(2));
      return (
        <blockquote key={`line-${lineIndex}`} className="border-l-2 border-fog-light/40 pl-4 italic text-zinc-400 mb-2">
          {content}
        </blockquote>
      );
    } else if (line.startsWith('• ')) {
      const content = processInlineFormatting(line.substring(2));
      return (
        <li key={`line-${lineIndex}`} className="ml-4 mb-1">
          {content}
        </li>
      );
    } else if (/^\d+\.\s/.test(line)) {
      const content = processInlineFormatting(line.replace(/^\d+\.\s/, ''));
      return (
        <li key={`line-${lineIndex}`} className="ml-4 mb-1 list-decimal">
          {content}
        </li>
      );
    } else if (line.trim() === '') {
      return <br key={`line-${lineIndex}`} />;
    }

    // Regular paragraph with inline formatting
    const content = processInlineFormatting(line);
    return (
      <p key={`line-${lineIndex}`} className="mb-2">
        {content}
      </p>
    );
  });
};
