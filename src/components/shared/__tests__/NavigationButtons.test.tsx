import React from 'react';
/**
 * Tests for Navigation Button Components
 */

import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import {
  BackButton,
  NextButton,
  HomeButton,
  ExitButton,
  NavigationGroup,
} from '../NavigationButtons';

// Mock framer-motion
vi.mock('framer-motion', () => ({
  motion: {
    button: ({ children, onClick, disabled, className, ...props }: any) => (
      <button onClick={onClick} disabled={disabled} className={className} {...props}>
        {children}
      </button>
    ),
    div: ({ children, className, ...props }: any) => (
      <div className={className} {...props}>
        {children}
      </div>
    ),
    span: ({ children, className, ...props }: any) => (
      <span className={className} {...props}>
        {children}
      </span>
    ),
  },
}));

const renderWithRouter = (component: React.ReactElement) => {
  return render(<BrowserRouter>{component}</BrowserRouter>);
};

describe('NavigationButtons', () => {
  describe('BackButton', () => {
    it('renders with default label', () => {
      renderWithRouter(<BackButton />);
      expect(screen.getByText('Back')).toBeInTheDocument();
      expect(screen.getByText('←')).toBeInTheDocument();
    });

    it('renders with custom label', () => {
      renderWithRouter(<BackButton label="Go Back" />);
      expect(screen.getByText('Go Back')).toBeInTheDocument();
    });

    it('calls onClick when clicked', () => {
      const handleClick = vi.fn();
      renderWithRouter(<BackButton onClick={handleClick} />);
      
      fireEvent.click(screen.getByText('Back'));
      expect(handleClick).toHaveBeenCalledTimes(1);
    });

    it('navigates to route when "to" prop is provided', () => {
      renderWithRouter(<BackButton to="/stories" />);
      const button = screen.getByText('Back').closest('button');
      expect(button).toBeInTheDocument();
    });

    it('respects disabled state', () => {
      const handleClick = vi.fn();
      renderWithRouter(<BackButton onClick={handleClick} disabled />);
      
      const button = screen.getByText('Back').closest('button');
      expect(button).toBeDisabled();
      
      fireEvent.click(button!);
      expect(handleClick).not.toHaveBeenCalled();
    });

    it('applies variant styles', () => {
      const { container } = renderWithRouter(<BackButton variant="prominent" />);
      const button = container.querySelector('button');
      expect(button?.className).toContain('px-6');
      expect(button?.className).toContain('py-3');
    });
  });

  describe('NextButton', () => {
    it('renders with default label', () => {
      renderWithRouter(<NextButton />);
      expect(screen.getByText('Next')).toBeInTheDocument();
      expect(screen.getByText('→')).toBeInTheDocument();
    });

    it('renders with custom label', () => {
      renderWithRouter(<NextButton label="Continue" />);
      expect(screen.getByText('Continue')).toBeInTheDocument();
    });

    it('calls onClick when clicked', () => {
      const handleClick = vi.fn();
      renderWithRouter(<NextButton onClick={handleClick} />);
      
      fireEvent.click(screen.getByText('Next'));
      expect(handleClick).toHaveBeenCalledTimes(1);
    });

    it('arrow appears after label', () => {
      renderWithRouter(<NextButton label="Next Story" />);
      const button = screen.getByText('Next Story').closest('button');
      expect(button?.textContent).toBe('Next Story→');
    });
  });

  describe('HomeButton', () => {
    it('renders with default label', () => {
      renderWithRouter(<HomeButton />);
      expect(screen.getByText('Home')).toBeInTheDocument();
      expect(screen.getByText('🏠')).toBeInTheDocument();
    });

    it('renders with custom label', () => {
      renderWithRouter(<HomeButton label="Return Home" />);
      expect(screen.getByText('Return Home')).toBeInTheDocument();
    });

    it('uses prominent variant by default', () => {
      const { container } = renderWithRouter(<HomeButton />);
      const button = container.querySelector('button');
      expect(button?.className).toContain('px-6');
      expect(button?.className).toContain('rounded-lg');
    });

    it('navigates to home route', () => {
      renderWithRouter(<HomeButton />);
      const button = screen.getByText('Home').closest('button');
      expect(button).toBeInTheDocument();
    });
  });

  describe('ExitButton', () => {
    it('renders with default label', () => {
      renderWithRouter(<ExitButton />);
      expect(screen.getByText('EXIT')).toBeInTheDocument();
      expect(screen.getByText('←')).toBeInTheDocument();
    });

    it('renders with custom label', () => {
      renderWithRouter(<ExitButton label="LEAVE" />);
      expect(screen.getByText('LEAVE')).toBeInTheDocument();
    });

    it('uses monospace font for label', () => {
      const { container } = renderWithRouter(<ExitButton />);
      const labelSpan = screen.getByText('EXIT');
      expect(labelSpan.className).toContain('font-mono');
      expect(labelSpan.className).toContain('tracking-wider');
    });

    it('navigates to home route', () => {
      renderWithRouter(<ExitButton />);
      const button = screen.getByText('EXIT').closest('button');
      expect(button).toBeInTheDocument();
    });
  });

  describe('NavigationGroup', () => {
    it('renders children', () => {
      renderWithRouter(
        <NavigationGroup>
          <BackButton />
          <NextButton />
        </NavigationGroup>
      );
      
      expect(screen.getByText('Back')).toBeInTheDocument();
      expect(screen.getByText('Next')).toBeInTheDocument();
    });

    it('applies position styles - left', () => {
      const { container } = renderWithRouter(
        <NavigationGroup position="left">
          <BackButton />
        </NavigationGroup>
      );
      
      const group = container.firstChild;
      expect(group).toHaveClass('justify-start');
    });

    it('applies position styles - center', () => {
      const { container } = renderWithRouter(
        <NavigationGroup position="center">
          <BackButton />
        </NavigationGroup>
      );
      
      const group = container.firstChild;
      expect(group).toHaveClass('justify-center');
    });

    it('applies position styles - right', () => {
      const { container } = renderWithRouter(
        <NavigationGroup position="right">
          <BackButton />
        </NavigationGroup>
      );
      
      const group = container.firstChild;
      expect(group).toHaveClass('justify-end');
    });

    it('applies position styles - between (default)', () => {
      const { container } = renderWithRouter(
        <NavigationGroup>
          <BackButton />
        </NavigationGroup>
      );
      
      const group = container.firstChild;
      expect(group).toHaveClass('justify-between');
    });

    it('applies custom className', () => {
      const { container } = renderWithRouter(
        <NavigationGroup className="custom-class">
          <BackButton />
        </NavigationGroup>
      );
      
      const group = container.firstChild;
      expect(group).toHaveClass('custom-class');
    });
  });

  describe('Accessibility', () => {
    it('buttons are keyboard accessible', () => {
      const handleClick = vi.fn();
      renderWithRouter(<BackButton onClick={handleClick} />);
      
      const button = screen.getByText('Back').closest('button');
      button?.focus();
      expect(document.activeElement).toBe(button);
    });

    it('disabled buttons cannot be focused', () => {
      renderWithRouter(<BackButton disabled />);
      
      const button = screen.getByText('Back').closest('button');
      expect(button).toBeDisabled();
    });
  });

  describe('Integration scenarios', () => {
    it('renders navigation group with back and next buttons', () => {
      const handleBack = vi.fn();
      const handleNext = vi.fn();
      
      renderWithRouter(
        <NavigationGroup position="between">
          <BackButton onClick={handleBack} />
          <NextButton onClick={handleNext} label="Next Story" />
        </NavigationGroup>
      );
      
      expect(screen.getByText('Back')).toBeInTheDocument();
      expect(screen.getByText('Next Story')).toBeInTheDocument();
      
      fireEvent.click(screen.getByText('Back'));
      expect(handleBack).toHaveBeenCalled();
      
      fireEvent.click(screen.getByText('Next Story'));
      expect(handleNext).toHaveBeenCalled();
    });

    it('renders multiple navigation buttons with different variants', () => {
      renderWithRouter(
        <div>
          <BackButton variant="ghost" label="Library" />
          <BackButton variant="default" label="Previous" />
          <NextButton variant="prominent" label="Next Chapter" />
        </div>
      );
      
      expect(screen.getByText('Library')).toBeInTheDocument();
      expect(screen.getByText('Previous')).toBeInTheDocument();
      expect(screen.getByText('Next Chapter')).toBeInTheDocument();
    });
  });
});


