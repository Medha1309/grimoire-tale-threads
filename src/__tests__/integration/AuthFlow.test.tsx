import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';
import { Login } from '../../pages/Login';
import { Signup } from '../../pages/SignUp';
import { useAuth } from '../../contexts/AuthContext';

// Mock AuthContext
jest.mock('../../contexts/AuthContext');
const mockUseAuth = useAuth as jest.MockedFunction<typeof useAuth>;

// Mock framer-motion
jest.mock('framer-motion', () => ({
  motion: {
    div: ({ children, ...props }: any) => <div {...props}>{children}</div>,
    button: ({ children, ...props }: any) => <button {...props}>{children}</button>,
  },
}));

// Mock auth components
jest.mock('../../components/auth/AuthBackground', () => ({
  AuthBackground: () => <div data-testid="auth-background" />,
}));

jest.mock('../../components/auth/AuthFormContainer', () => ({
  AuthFormContainer: ({ children }: any) => <div data-testid="auth-form-container">{children}</div>,
}));

jest.mock('../../components/auth/AuthInput', () => ({
  AuthInput: ({ label, name, value, onChange, type, placeholder }: any) => (
    <input
      data-testid={`input-${name}`}
      name={name}
      value={value}
      onChange={onChange}
      type={type}
      placeholder={placeholder}
      aria-label={label}
    />
  ),
}));

jest.mock('../../components/auth/AuthButton', () => ({
  AuthButton: ({ children, onClick, type, disabled, variant }: any) => (
    <button
      data-testid={variant === 'google' ? 'google-button' : 'submit-button'}
      onClick={onClick}
      type={type}
      disabled={disabled}
    >
      {children}
    </button>
  ),
}));

jest.mock('../../hooks/useAuthEffects', () => ({
  useAuthEffects: () => ({
    cursorPos: { x: 0, y: 0 },
    delayedCursor: { x: 0, y: 0 },
    glitch: false,
  }),
}));

describe('Authentication Flow Integration', () => {
  const mockGo = jest.fn();
  const mockSignup = jest.fn();
  const mockLogin = jest.fn();
  const mockLoginWithGoogle = jest.fn();
  const mockResetPassword = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();
    mockUseAuth.mockReturnValue({
      signup: mockSignup,
      login: mockLogin,
      loginWithGoogle: mockLoginWithGoogle,
      resetPassword: mockResetPassword,
      logout: jest.fn(),
      currentUser: null,
      loading: false,
    });
  });

  describe('Complete Signup to Login Flow', () => {
    it('allows user to sign up and then navigate to login', async () => {
      mockSignup.mockResolvedValueOnce(undefined);
      
      // Render signup page
      const { rerender } = render(<Signup go={mockGo} />);
      
      // Fill in signup form
      fireEvent.change(screen.getByTestId('input-displayName'), {
        target: { name: 'displayName', value: 'John Doe' },
      });
      fireEvent.change(screen.getByTestId('input-email'), {
        target: { name: 'email', value: 'john@example.com' },
      });
      fireEvent.change(screen.getByTestId('input-password'), {
        target: { name: 'password', value: 'password123' },
      });
      fireEvent.change(screen.getByTestId('input-confirmPassword'), {
        target: { name: 'confirmPassword', value: 'password123' },
      });

      // Submit signup
      fireEvent.click(screen.getByTestId('submit-button'));

      await waitFor(() => {
        expect(mockSignup).toHaveBeenCalledWith('john@example.com', 'password123', 'John Doe');
      });

      // Verify navigation to stories
      await waitFor(() => {
        expect(mockGo).toHaveBeenCalledWith('stories');
      }, { timeout: 3000 });
    });

    it('allows navigation from signup to login', () => {
      render(<Signup go={mockGo} />);
      
      const loginLink = screen.getByText('Sign in');
      fireEvent.click(loginLink);

      expect(mockGo).toHaveBeenCalledWith('login');
    });
  });

  describe('Complete Login Flow', () => {
    it('allows user to login with email and password', async () => {
      mockLogin.mockResolvedValueOnce(undefined);
      
      render(<Login go={mockGo} />);
      
      // Fill in login form
      fireEvent.change(screen.getByTestId('input-email'), {
        target: { name: 'email', value: 'john@example.com' },
      });
      fireEvent.change(screen.getByTestId('input-password'), {
        target: { name: 'password', value: 'password123' },
      });

      // Submit login
      fireEvent.click(screen.getByTestId('submit-button'));

      await waitFor(() => {
        expect(mockLogin).toHaveBeenCalledWith('john@example.com', 'password123');
      });

      // Verify navigation to stories
      await waitFor(() => {
        expect(mockGo).toHaveBeenCalledWith('stories');
      }, { timeout: 3000 });
    });

    it('allows navigation from login to signup', () => {
      render(<Login go={mockGo} />);
      
      const signupLink = screen.getByText('Sign up');
      fireEvent.click(signupLink);

      expect(mockGo).toHaveBeenCalledWith('signup');
    });
  });

  describe('Password Reset Flow', () => {
    it('completes password reset flow', async () => {
      mockResetPassword.mockResolvedValueOnce(undefined);
      
      render(<Login go={mockGo} />);
      
      // Enter email
      fireEvent.change(screen.getByTestId('input-email'), {
        target: { name: 'email', value: 'john@example.com' },
      });

      // Click forgot password
      fireEvent.click(screen.getByText('Forgot password?'));

      await waitFor(() => {
        expect(mockResetPassword).toHaveBeenCalledWith('john@example.com');
      });

      // Verify success message
      await waitFor(() => {
        expect(screen.getByText('Password reset email sent')).toBeInTheDocument();
      });
    });
  });

  describe('Google Authentication Flow', () => {
    it('allows signup with Google', async () => {
      mockLoginWithGoogle.mockResolvedValueOnce(undefined);
      
      render(<Signup go={mockGo} />);
      
      fireEvent.click(screen.getByTestId('google-button'));

      await waitFor(() => {
        expect(mockLoginWithGoogle).toHaveBeenCalled();
      });

      await waitFor(() => {
        expect(mockGo).toHaveBeenCalledWith('stories');
      }, { timeout: 3000 });
    });

    it('allows login with Google', async () => {
      mockLoginWithGoogle.mockResolvedValueOnce(undefined);
      
      render(<Login go={mockGo} />);
      
      fireEvent.click(screen.getByTestId('google-button'));

      await waitFor(() => {
        expect(mockLoginWithGoogle).toHaveBeenCalled();
      });

      await waitFor(() => {
        expect(mockGo).toHaveBeenCalledWith('stories');
      }, { timeout: 3000 });
    });
  });

  describe('Error Handling', () => {
    it('handles signup errors gracefully', async () => {
      mockSignup.mockRejectedValueOnce(new Error('Email already exists'));
      
      render(<Signup go={mockGo} />);
      
      fireEvent.change(screen.getByTestId('input-displayName'), {
        target: { name: 'displayName', value: 'John Doe' },
      });
      fireEvent.change(screen.getByTestId('input-email'), {
        target: { name: 'email', value: 'existing@example.com' },
      });
      fireEvent.change(screen.getByTestId('input-password'), {
        target: { name: 'password', value: 'password123' },
      });
      fireEvent.change(screen.getByTestId('input-confirmPassword'), {
        target: { name: 'confirmPassword', value: 'password123' },
      });

      fireEvent.click(screen.getByTestId('submit-button'));

      await waitFor(() => {
        expect(screen.getByText('Email already exists')).toBeInTheDocument();
      });

      expect(mockGo).not.toHaveBeenCalled();
    });

    it('handles login errors gracefully', async () => {
      mockLogin.mockRejectedValueOnce(new Error('Invalid credentials'));
      
      render(<Login go={mockGo} />);
      
      fireEvent.change(screen.getByTestId('input-email'), {
        target: { name: 'email', value: 'wrong@example.com' },
      });
      fireEvent.change(screen.getByTestId('input-password'), {
        target: { name: 'password', value: 'wrongpassword' },
      });

      fireEvent.click(screen.getByTestId('submit-button'));

      await waitFor(() => {
        expect(screen.getByText('Invalid credentials')).toBeInTheDocument();
      });

      expect(mockGo).not.toHaveBeenCalled();
    });
  });
});
