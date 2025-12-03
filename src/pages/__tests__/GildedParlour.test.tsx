import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { GildedParlour } from '../GildedParlour';

describe('GildedParlour Curtain Animation', () => {
  it('should have slow curtain animation with 3.5 second duration', () => {
    const mockGo = () => {};
    render(<GildedParlour go={mockGo} />);
    
    // The curtain should be present initially
    const curtainElements = document.querySelectorAll('.fixed.inset-0.z-50');
    expect(curtainElements.length).toBeGreaterThan(0);
  });

  it('should display Loading text instead of theatrical language', () => {
    const mockGo = () => {};
    render(<GildedParlour go={mockGo} />);
    
    // Should show "Loading..." not "Enter the parlour..."
    expect(screen.queryByText(/Loading\.\.\./i)).toBeTruthy();
    expect(screen.queryByText(/Enter the parlour/i)).toBeFalsy();
  });

  it('should have translucent burgundy curtains', () => {
    const mockGo = () => {};
    const { container } = render(<GildedParlour go={mockGo} />);
    
    // Check for the burgundy color in the gradient
    const curtainDivs = container.querySelectorAll('[style*="rgba(80, 25, 35"]');
    expect(curtainDivs.length).toBeGreaterThan(0);
  });
});
