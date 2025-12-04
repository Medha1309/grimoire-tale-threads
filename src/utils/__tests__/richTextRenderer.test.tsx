import React from 'react';
import { describe, it, expect, beforeEach, afterEach, vi } from 'vitest';
import { render } from '@testing-library/react';
import { renderRichText } from '../richTextRenderer';

describe('richTextRenderer', () => {
  describe('Bold formatting', () => {
    it('should render bold text', () => {
      const { container } = render(<>{renderRichText('**bold text**')}</>);
      const strong = container.querySelector('strong');
      expect(strong).toBeInTheDocument();
      expect(strong?.textContent).toBe('bold text');
    });

    it('should handle multiple bold sections', () => {
      const { container } = render(<>{renderRichText('**first** and **second**')}</>);
      const strongs = container.querySelectorAll('strong');
      expect(strongs).toHaveLength(2);
      expect(strongs[0].textContent).toBe('first');
      expect(strongs[1].textContent).toBe('second');
    });

    it('should not confuse bold with italic', () => {
      const { container } = render(<>{renderRichText('**bold** *italic*')}</>);
      expect(container.querySelector('strong')?.textContent).toBe('bold');
      expect(container.querySelector('em')?.textContent).toBe('italic');
    });
  });

  describe('Italic formatting', () => {
    it('should render italic text', () => {
      const { container } = render(<>{renderRichText('*italic text*')}</>);
      const em = container.querySelector('em');
      expect(em).toBeInTheDocument();
      expect(em?.textContent).toBe('italic text');
    });

    it('should handle italic after bold', () => {
      const { container } = render(<>{renderRichText('**bold** then *italic*')}</>);
      expect(container.querySelector('strong')?.textContent).toBe('bold');
      expect(container.querySelector('em')?.textContent).toBe('italic');
    });
  });

  describe('Strikethrough formatting', () => {
    it('should render strikethrough text', () => {
      const { container } = render(<>{renderRichText('~~strikethrough~~')}</>);
      const s = container.querySelector('s');
      expect(s).toBeInTheDocument();
      expect(s?.textContent).toBe('strikethrough');
    });
  });

  describe('Code formatting', () => {
    it('should render inline code', () => {
      const { container } = render(<>{renderRichText('`code here`')}</>);
      const code = container.querySelector('code');
      expect(code).toBeInTheDocument();
      expect(code?.textContent).toBe('code here');
      expect(code?.className).toContain('font-mono');
    });
  });

  describe('Mixed formatting', () => {
    it('should handle bold and italic together', () => {
      const { container } = render(<>{renderRichText('**bold** and *italic* text')}</>);
      expect(container.querySelector('strong')).toBeInTheDocument();
      expect(container.querySelector('em')).toBeInTheDocument();
    });

    it('should handle all formats in one line', () => {
      const { container } = render(<>{renderRichText('**bold** *italic* ~~strike~~ `code`')}</>);
      expect(container.querySelector('strong')).toBeInTheDocument();
      expect(container.querySelector('em')).toBeInTheDocument();
      expect(container.querySelector('s')).toBeInTheDocument();
      expect(container.querySelector('code')).toBeInTheDocument();
    });

    it('should not double-render markdown syntax', () => {
      const { container } = render(<>{renderRichText('**sss**')}</>);
      const text = container.textContent;
      // Should only show "sss", not "**sss**" or both
      expect(text).toBe('sss');
      expect(text).not.toContain('**');
    });
  });

  describe('Lists', () => {
    it('should render bullet lists', () => {
      const { container } = render(<>{renderRichText('• Item one')}</>);
      const li = container.querySelector('li');
      expect(li).toBeInTheDocument();
      expect(li?.textContent).toBe('Item one');
    });

    it('should render numbered lists', () => {
      const { container } = render(<>{renderRichText('1. First item')}</>);
      const li = container.querySelector('li');
      expect(li).toBeInTheDocument();
      expect(li?.textContent).toBe('First item');
    });

    it('should handle formatting in lists', () => {
      const { container } = render(<>{renderRichText('• **bold** item')}</>);
      const li = container.querySelector('li');
      const strong = li?.querySelector('strong');
      expect(strong?.textContent).toBe('bold');
    });
  });

  describe('Quotes', () => {
    it('should render blockquotes', () => {
      const { container } = render(<>{renderRichText('> This is a quote')}</>);
      const blockquote = container.querySelector('blockquote');
      expect(blockquote).toBeInTheDocument();
      expect(blockquote?.textContent).toBe('This is a quote');
    });

    it('should handle formatting in quotes', () => {
      const { container } = render(<>{renderRichText('> **bold** quote')}</>);
      const blockquote = container.querySelector('blockquote');
      const strong = blockquote?.querySelector('strong');
      expect(strong?.textContent).toBe('bold');
    });
  });

  describe('Multi-line text', () => {
    it('should handle multiple paragraphs', () => {
      const { container } = render(<>{renderRichText('First line\nSecond line')}</>);
      const paragraphs = container.querySelectorAll('p');
      expect(paragraphs).toHaveLength(2);
    });

    it('should handle empty lines', () => {
      const { container } = render(<>{renderRichText('Line one\n\nLine two')}</>);
      const br = container.querySelector('br');
      expect(br).toBeInTheDocument();
    });
  });

  describe('Edge cases', () => {
    it('should handle empty string', () => {
      const result = renderRichText('');
      expect(result).toBeNull();
    });

    it('should handle plain text without formatting', () => {
      const { container } = render(<>{renderRichText('Just plain text')}</>);
      expect(container.textContent).toBe('Just plain text');
    });

    it('should handle incomplete markdown syntax', () => {
      const { container } = render(<>{renderRichText('**incomplete')}</>);
      // Should render as plain text if not properly closed
      expect(container.textContent).toContain('**incomplete');
    });

    it('should handle nested asterisks correctly', () => {
      const { container } = render(<>{renderRichText('***three asterisks***')}</>);
      // Should handle as bold with extra asterisk
      const text = container.textContent;
      expect(text).not.toContain('***');
    });

    it('should not double-render italic markdown', () => {
      const { container } = render(<>{renderRichText('*italic*')}</>);
      const text = container.textContent;
      expect(text).toBe('italic');
      expect(text).not.toContain('*');
    });

    it('should not show markdown for strikethrough', () => {
      const { container } = render(<>{renderRichText('~~strike~~')}</>);
      const text = container.textContent;
      expect(text).toBe('strike');
      expect(text).not.toContain('~~');
    });

    it('should not show markdown for code', () => {
      const { container } = render(<>{renderRichText('`code`')}</>);
      const text = container.textContent;
      expect(text).toBe('code');
      expect(text).not.toContain('`');
    });
  });

  describe('Real-world scenarios', () => {
    it('should handle a diary entry with mixed formatting', () => {
      const entry = 'Today was **amazing**! I felt *so happy* and ~~not sad at all~~.';
      const { container } = render(<>{renderRichText(entry)}</>);
      
      expect(container.querySelector('strong')?.textContent).toBe('amazing');
      expect(container.querySelector('em')?.textContent).toBe('so happy');
      expect(container.querySelector('s')?.textContent).toBe('not sad at all');
      
      // Should not show any markdown syntax
      const text = container.textContent || '';
      expect(text).not.toContain('**');
      expect(text).not.toContain('~~');
      expect(text).toContain('Today was');
      expect(text).toContain('amazing');
    });

    it('should handle multiple lines with different formatting', () => {
      const entry = '**Bold line**\n*Italic line*\n~~Strike line~~';
      const { container } = render(<>{renderRichText(entry)}</>);
      
      const paragraphs = container.querySelectorAll('p');
      expect(paragraphs).toHaveLength(3);
      
      expect(paragraphs[0].querySelector('strong')?.textContent).toBe('Bold line');
      expect(paragraphs[1].querySelector('em')?.textContent).toBe('Italic line');
      expect(paragraphs[2].querySelector('s')?.textContent).toBe('Strike line');
    });

    it('should handle text with spaces around formatting', () => {
      const entry = 'Some **bold text** and *italic text* here';
      const { container } = render(<>{renderRichText(entry)}</>);
      
      const text = container.textContent || '';
      expect(text).toContain('Some');
      expect(text).toContain('bold text');
      expect(text).toContain('and');
      expect(text).toContain('italic text');
      expect(text).toContain('here');
      expect(text).not.toContain('**');
      expect(text).not.toContain('*italic*');
    });
  });
});



