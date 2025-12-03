/**
 * Tests for PhotoFilterSelector Component
 */

import { describe, it, expect, vi } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import { PhotoFilterSelector, getFilterStyle, PhotoFilter } from '../PhotoFilterSelector';

describe('PhotoFilterSelector', () => {
  it('renders all filter options', () => {
    const onFilterChange = vi.fn();
    
    render(
      <PhotoFilterSelector
        currentFilter="none"
        onFilterChange={onFilterChange}
      />
    );
    
    expect(screen.getByText('Original')).toBeInTheDocument();
    expect(screen.getByText('Joy')).toBeInTheDocument();
    expect(screen.getByText('Sorrow')).toBeInTheDocument();
    expect(screen.getByText('Calm')).toBeInTheDocument();
    expect(screen.getByText('Unrest')).toBeInTheDocument();
  });

  it('highlights current filter', () => {
    const onFilterChange = vi.fn();
    
    render(
      <PhotoFilterSelector
        currentFilter="sepia"
        onFilterChange={onFilterChange}
      />
    );
    
    const joyButton = screen.getByText('Joy').closest('button');
    expect(joyButton).toHaveClass('border-[#ffb6d9]');
  });

  it('calls onFilterChange when filter is clicked', () => {
    const onFilterChange = vi.fn();
    
    render(
      <PhotoFilterSelector
        currentFilter="none"
        onFilterChange={onFilterChange}
      />
    );
    
    const joyButton = screen.getByText('Joy').closest('button');
    fireEvent.click(joyButton!);
    
    expect(onFilterChange).toHaveBeenCalledWith('sepia');
  });

  it('displays filter description', () => {
    const onFilterChange = vi.fn();
    
    render(
      <PhotoFilterSelector
        currentFilter="sepia"
        onFilterChange={onFilterChange}
      />
    );
    
    expect(screen.getByText('Warm sepia glow')).toBeInTheDocument();
  });

  it('shows preview image with filter applied', () => {
    const onFilterChange = vi.fn();
    const previewImage = 'data:image/png;base64,test';
    
    render(
      <PhotoFilterSelector
        currentFilter="none"
        onFilterChange={onFilterChange}
        previewImage={previewImage}
      />
    );
    
    const images = screen.getAllByRole('img');
    expect(images.length).toBeGreaterThan(0);
    images.forEach(img => {
      expect(img).toHaveAttribute('src', previewImage);
    });
  });

  it('shows checkmark on selected filter', () => {
    const onFilterChange = vi.fn();
    
    render(
      <PhotoFilterSelector
        currentFilter="vintage"
        onFilterChange={onFilterChange}
      />
    );
    
    expect(screen.getByText('✓')).toBeInTheDocument();
  });
});

describe('getFilterStyle', () => {
  it('returns empty object for none filter', () => {
    const style = getFilterStyle('none');
    expect(style).toEqual({});
  });

  it('returns sepia filter style', () => {
    const style = getFilterStyle('sepia');
    expect(style.filter).toContain('sepia');
  });

  it('returns desaturated filter style', () => {
    const style = getFilterStyle('desaturated');
    expect(style.filter).toContain('saturate');
  });

  it('returns vintage filter style', () => {
    const style = getFilterStyle('vintage');
    expect(style.filter).toContain('contrast');
  });

  it('returns horror filter style', () => {
    const style = getFilterStyle('horror');
    expect(style.filter).toContain('contrast');
    expect(style.filter).toContain('brightness');
  });

  it('handles all filter types', () => {
    const filters: PhotoFilter[] = ['none', 'sepia', 'desaturated', 'vintage', 'horror'];
    
    filters.forEach(filter => {
      expect(() => getFilterStyle(filter)).not.toThrow();
    });
  });
});
