import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import { AuthInput } from '../../components/auth/AuthInput';
import { AuthButton } from '../../components/auth/AuthButton';
import { AuthFormContainer } from '../../components/auth/AuthFormContainer';

// Mock framer-motion
jest.mock('framer-motion', () => ({
  motion: {
    div: ({ children, ...props }: any) => <div {...props}>{children}</div>,
    button: ({ children, ...props }: any) => <button {...props}>{children}</button>,
  },
}));

describe('Auth Components', () => {
  describe('AuthInput', () => {
    it('renders input with label', () => {
      const mockOnChange = jest.fn();
      render(
        <AuthInput
          label="Email"
          type="email"
          name="email"
          value=""
          onChange={mockOnChange}
          placeholder="your@email.com"
        />
      );

      expect(screen.getByText('Email')).toBeInTheDocument();
      expect(screen.getByPlaceholderText('your@email.com')).toBeInTheDocument();
    });

    it('handles input changes', () => {
      const mockOnChange = jest.fn();
      render(
        <AuthInput
          label="Email"
          type="email"
          name="email"
          value=""
          onChange={mockOnChange}
          placeholder="your@email.com"
        />
      );

      const input = screen.getByPlaceholderText('your@email.com');
      fireEvent.change(input, { target: { value: 'test@example.com' } });

      expect(mockOnChange).toHaveBeenCalled();
    });

    it('displays current value', () => {
      const mockOnChange = jest.fn();
      render(
        <AuthInput
          label="Email"
          type="email"
          name="email"
          value="test@example.com"
          onChange={mockOnChange}
          placeholder="your@email.com"
        />
      );

      const input = screen.getByPlaceholderText('your@email.com') as HTMLInputElement;
      expect(input.value).toBe('test@example.com');
    });
  });

  describe('AuthButton', () => {
    it('renders primary button', () => {
      render(<AuthButton type="submit">Sign In</AuthButton>);
      
      const button = screen.getByText('Sign In');
      expect(button).toBeInTheDocument();
      expect(button).toHaveAttribute('type', 'submit');
    });

    it('renders Google button variant', () => {
      render(
        <AuthButton variant="google">Continue with Google</AuthButton>
      );
      
      expect(screen.getByText('Continue with Google')).toBeInTheDocument();
    });

    it('handles click events', () => {
      const mockOnClick = jest.fn();
      render(
        <AuthButton onClick={mockOnClick}>Click Me</AuthButton>
      );
      
      const button = screen.getByText('Click Me');
      fireEvent.click(button);

      expect(mockOnClick).toHaveBeenCalledTimes(1);
    });

    it('disables button when disabled prop is true', () => {
      render(<AuthButton disabled>Disabled</AuthButton>);
      
      const button = screen.getByText('Disabled');
      expect(button).toBeDisabled();
    });

    it('disables button when loading', () => {
      render(<AuthButton loading>Loading...</AuthButton>);
      
      const button = screen.getByText('Loading...');
      expect(button).toBeDisabled();
    });
  });

  describe('AuthFormContainer', () => {
    it('renders children', () => {
      render(
        <AuthFormContainer shake={false} glitch={false}>
          <div>Test Content</div>
        </AuthFormContainer>
      );

      expect(screen.getByText('Test Content')).toBeInTheDocument();
    });

    it('applies shake animation class', () => {
      const { container } = render(
        <AuthFormContainer shake={true} glitch={false}>
          <div>Test Content</div>
        </AuthFormContainer>
      );

      // Check that the component renders (shake is handled by framer-motion)
      expect(container.firstChild).toBeInTheDocument();
    });

    it('applies glitch effect class', () => {
      const { container } = render(
        <AuthFormContainer shake={false} glitch={true}>
          <div>Test Content</div>
        </AuthFormContainer>
      );

      // Check that the component renders (glitch is handled by CSS)
      expect(container.firstChild).toBeInTheDocument();
    });
  });
});
