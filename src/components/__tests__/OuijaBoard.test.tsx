import { describe, it, expect, vi } from 'vitest';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';
import OuijaBoard from '../OuijaBoard';

describe('OuijaBoard Component', () => {
  it('renders the ouija board', () => {
    render(<OuijaBoard />);
    // Check for the board heading
    expect(screen.getByText(/spirit board/i)).toBeInTheDocument();
  });

  it('displays all alphabet letters', () => {
    render(<OuijaBoard />);
    const letters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'.split('');
    letters.forEach(letter => {
      expect(screen.getByLabelText(`Key ${letter}`)).toBeInTheDocument();
    });
  });

  it('displays all numbers', () => {
    render(<OuijaBoard />);
    const numbers = '1234567890'.split('');
    numbers.forEach(number => {
      expect(screen.getByLabelText(`Key ${number}`)).toBeInTheDocument();
    });
  });

  it('displays special keys (WRITE, SEND, CLEAR)', () => {
    render(<OuijaBoard />);
    expect(screen.getByLabelText('Key WRITE')).toBeInTheDocument();
    expect(screen.getByLabelText('Key SEND')).toBeInTheDocument();
    expect(screen.getByLabelText('Key CLEAR')).toBeInTheDocument();
  });

  it('calls onMessageChange when a letter is clicked', () => {
    const onMessageChange = vi.fn();
    render(<OuijaBoard message="" onMessageChange={onMessageChange} />);
    
    const letterA = screen.getByLabelText('Key A');
    fireEvent.click(letterA);
    
    expect(onMessageChange).toHaveBeenCalledWith('A');
  });

  it('calls onMessageChange with empty string when CLEAR is clicked', () => {
    const onMessageChange = vi.fn();
    render(<OuijaBoard message="TEST" onMessageChange={onMessageChange} />);
    
    const clearButton = screen.getByLabelText('Key CLEAR');
    fireEvent.click(clearButton);
    
    expect(onMessageChange).toHaveBeenCalledWith('');
  });

  it('calls onWrite when WRITE is clicked', () => {
    const onWrite = vi.fn();
    render(<OuijaBoard message="TEST" onWrite={onWrite} />);
    
    const writeButton = screen.getByLabelText('Key WRITE');
    fireEvent.click(writeButton);
    
    expect(onWrite).toHaveBeenCalled();
  });

  it('handles keyboard navigation with arrow keys', () => {
    render(<OuijaBoard />);
    const board = screen.getByLabelText(/interactive spirit board/i);
    
    // Should not throw errors
    fireEvent.keyDown(board, { key: 'ArrowRight' });
    fireEvent.keyDown(board, { key: 'ArrowLeft' });
    fireEvent.keyDown(board, { key: 'ArrowDown' });
    fireEvent.keyDown(board, { key: 'ArrowUp' });
  });

  it('handles Enter key to select', async () => {
    const onMessageChange = vi.fn();
    render(<OuijaBoard message="" onMessageChange={onMessageChange} />);
    const board = screen.getByLabelText(/interactive spirit board/i);
    const letterA = screen.getByLabelText('Key A');
    
    // Press Enter on a key
    fireEvent.keyDown(letterA, { key: 'Enter' });
    
    expect(onMessageChange).toHaveBeenCalledWith('A');
  });

  it('handles Space key on a letter', () => {
    const onMessageChange = vi.fn();
    render(<OuijaBoard message="" onMessageChange={onMessageChange} />);
    const letterB = screen.getByLabelText('Key B');
    
    // Press Space on a key
    fireEvent.keyDown(letterB, { key: ' ' });
    
    expect(onMessageChange).toHaveBeenCalledWith('B');
  });

  it('appends letters to existing message', () => {
    const onMessageChange = vi.fn();
    render(<OuijaBoard message="HEL" onMessageChange={onMessageChange} />);
    
    const letterL = screen.getByLabelText('Key L');
    fireEvent.click(letterL);
    
    expect(onMessageChange).toHaveBeenCalledWith('HELL');
  });

  it('renders board with all keys', () => {
    render(<OuijaBoard />);
    // Board should have all letters, numbers, and special keys
    expect(screen.getByLabelText('Key A')).toBeInTheDocument();
    expect(screen.getByLabelText('Key Z')).toBeInTheDocument();
    expect(screen.getByLabelText('Key 0')).toBeInTheDocument();
    expect(screen.getByLabelText('Key 9')).toBeInTheDocument();
  });

  it('displays instructions text', () => {
    render(<OuijaBoard />);
    expect(screen.getByText(/click letters to compose your message/i)).toBeInTheDocument();
  });
});
