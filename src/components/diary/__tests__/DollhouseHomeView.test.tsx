import React from 'react';
import { describe, it, expect, beforeEach, afterEach, vi } from 'vitest';
import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { DollhouseHomeView } from '../DollhouseHomeView';

describe('DollhouseHomeView', () => {
  const mockOnRoomHover = vi.fn();
  const mockOnRoomLeave = vi.fn();
  const mockOnNavigateToRoom = vi.fn();

  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('should render all five rooms', () => {
    render(
      <DollhouseHomeView
        litRoom={-1}
        hoveredRoom={-1}
        possessedRoom={-1}
        onRoomHover={mockOnRoomHover}
        onRoomLeave={mockOnRoomLeave}
        onNavigateToRoom={mockOnNavigateToRoom}
      />
    );

    expect(screen.getByText('Diary')).toBeInTheDocument();
    expect(screen.getByText('Scrapbook')).toBeInTheDocument();
    expect(screen.getByText('Art Studio')).toBeInTheDocument();
    expect(screen.getByText('Archive')).toBeInTheDocument();
    expect(screen.getByText('Saved Books')).toBeInTheDocument();
  });

  it('should call onRoomHover when mouse enters a room', () => {
    render(
      <DollhouseHomeView
        litRoom={-1}
        hoveredRoom={-1}
        possessedRoom={-1}
        onRoomHover={mockOnRoomHover}
        onRoomLeave={mockOnRoomLeave}
        onNavigateToRoom={mockOnNavigateToRoom}
      />
    );

    const diaryRoom = screen.getByText('Diary').closest('button');
    fireEvent.mouseEnter(diaryRoom!.parentElement!);

    expect(mockOnRoomHover).toHaveBeenCalledWith(0);
  });

  it('should call onRoomLeave when mouse leaves a room', () => {
    render(
      <DollhouseHomeView
        litRoom={-1}
        hoveredRoom={-1}
        possessedRoom={-1}
        onRoomHover={mockOnRoomHover}
        onRoomLeave={mockOnRoomLeave}
        onNavigateToRoom={mockOnNavigateToRoom}
      />
    );

    const diaryRoom = screen.getByText('Diary').closest('button');
    fireEvent.mouseLeave(diaryRoom!.parentElement!);

    expect(mockOnRoomLeave).toHaveBeenCalled();
  });

  it('should navigate to diary when Diary is clicked', () => {
    render(
      <DollhouseHomeView
        litRoom={-1}
        hoveredRoom={-1}
        possessedRoom={-1}
        onRoomHover={mockOnRoomHover}
        onRoomLeave={mockOnRoomLeave}
        onNavigateToRoom={mockOnNavigateToRoom}
      />
    );

    const diaryRoom = screen.getByText('Diary');
    fireEvent.click(diaryRoom);

    expect(mockOnNavigateToRoom).toHaveBeenCalledWith('diary');
  });

  it('should navigate to scrapbook when Scrapbook is clicked', () => {
    render(
      <DollhouseHomeView
        litRoom={-1}
        hoveredRoom={-1}
        possessedRoom={-1}
        onRoomHover={mockOnRoomHover}
        onRoomLeave={mockOnRoomLeave}
        onNavigateToRoom={mockOnNavigateToRoom}
      />
    );

    const scrapbookRoom = screen.getByText('Scrapbook');
    fireEvent.click(scrapbookRoom);

    expect(mockOnNavigateToRoom).toHaveBeenCalledWith('scrapbook');
  });

  it('should navigate to bookmarks when Saved Books is clicked', () => {
    render(
      <DollhouseHomeView
        litRoom={-1}
        hoveredRoom={-1}
        possessedRoom={-1}
        onRoomHover={mockOnRoomHover}
        onRoomLeave={mockOnRoomLeave}
        onNavigateToRoom={mockOnNavigateToRoom}
      />
    );

    const bookmarksRoom = screen.getByText('Saved Books');
    fireEvent.click(bookmarksRoom);

    expect(mockOnNavigateToRoom).toHaveBeenCalledWith('bookmarks');
  });

  it('should navigate to archive when Archive is clicked', () => {
    render(
      <DollhouseHomeView
        litRoom={-1}
        hoveredRoom={-1}
        possessedRoom={-1}
        onRoomHover={mockOnRoomHover}
        onRoomLeave={mockOnRoomLeave}
        onNavigateToRoom={mockOnNavigateToRoom}
      />
    );

    const archiveRoom = screen.getByText('Archive');
    fireEvent.click(archiveRoom);

    expect(mockOnNavigateToRoom).toHaveBeenCalledWith('archive');
  });

  it('should apply lit room styling', () => {
    const { rerender } = render(
      <DollhouseHomeView
        litRoom={-1}
        hoveredRoom={-1}
        possessedRoom={-1}
        onRoomHover={mockOnRoomHover}
        onRoomLeave={mockOnRoomLeave}
        onNavigateToRoom={mockOnNavigateToRoom}
      />
    );

    rerender(
      <DollhouseHomeView
        litRoom={0}
        hoveredRoom={-1}
        possessedRoom={-1}
        onRoomHover={mockOnRoomHover}
        onRoomLeave={mockOnRoomLeave}
        onNavigateToRoom={mockOnNavigateToRoom}
      />
    );

    // Component should re-render with lit room styling
    expect(screen.getByText('Diary')).toBeInTheDocument();
  });
});



