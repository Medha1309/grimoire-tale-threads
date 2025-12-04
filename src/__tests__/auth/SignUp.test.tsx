import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { describe, it, expect, beforeEach, vi } from 'vitest';
import '@testing-library/jest-dom';
import { Signup } from '../../pages/SignUp';
import { useAuth } from '../../contexts/AuthContext';
import { mockFramerMotion } from '../../test/mocks';

// Mock AuthContext
vi.mock('../../contexts/AuthContext');
const mockUseAuth = useAuth as ReturnType<typeof vi.fn>;

// Mock framer-motion
vi.mock('framer-motion', () => mockFramerMotion);

// Mock auth components
vi.mock('../../components/auth/AuthBackground', () => ({
  AuthBackground: () => <div data-testid="auth-background" />,
}));

// Mock UI components
vi.mock('../../components/ui', () => ({
  Button: ({ children, onClick, type, disabled, ...props }: any) => (
    <button onClick={onClick} type={type} disabled={disabled} {...props}>
      {children}
    </button>
  ),
  Input: ({ label, name, value, onChange, type, placeholder, ...props }: any) => (
    <input
      data-testid={`input-${name}`}
      name={name}
      value={value}
      onChange={onChange}
      type={type}
      placeholder={placeholder}
      aria-label={label}
      {...props}
    />
  ),
  Alert: ({ children }: any) => <div role="alert">{children}</div>,
}));

// Mock Button component
vi.mock('../../components/shared/Button', () => ({
  BackButton: ({ onClick, children }: any) => (
    <button onClick={onClick} data-testid="back-button">{children || 'Back'}</button>
  ),
}));

vi.mock('../../hooks/useAuthEffects', () => ({
  useAuthEffects: () => ({
    cursorPos: { x: 0, y: 0 },
    delayedCursor: { x: 0, y: 0 },
    glitch: false,
  }),
}));

describe('Signup Component', () => {
  const mockGo = vi.fn();
  const mockSignup = vi.fn();
  const mockLoginWithGoogle = vi.fn();

  beforeEach(() => {
    vi.clearAllMocks();
    mockUseAuth.mockReturnValue({
      signup: mockSignup,
      loginWithGoogle: mockLoginWithGoogle,
      login: vi.fn(),
      resetPassword: vi.fn(),
      logout: vi.fn(),
      currentUser: null,
      userProfile: null,
      loading: false,
      updateUserProfile: vi.fn(),
    });
  });

  it('renders signup form correctly', () => {
    render(<Signup go={mockGo} />);
    
    expect(screen.getByTestId('input-displayName')).toBeInTheDocument();
    expect(screen.getByTestId('input-email')).toBeInTheDocument();
    expect(screen.getByTestId('input-password')).toBeInTheDocument();
    expect(screen.getByTestId('input-confirmPassword')).toBeInTheDocument();
  });

  it('handles form input changes', () => {
    render(<Signup go={mockGo} />);
    
    const nameInput = screen.getByTestId('input-displayName');
    const emailInput = screen.getByTestId('input-email');
    const passwordInput = screen.getByTestId('input-password');
    const confirmPasswordInput = screen.getByTestId('input-confirmPassword');

    fireEvent.change(nameInput, { target: { name: 'displayName', value: 'John Doe' } });
    fireEvent.change(emailInput, { target: { name: 'email', value: 'john@example.com' } });
    fireEvent.change(passwordInput, { target: { name: 'password', value: 'password123' } });
    fireEvent.change(confirmPasswordInput, { target: { name: 'confirmPassword', value: 'password123' } });

    expect(nameInput).toHaveValue('John Doe');
    expect(emailInput).toHaveValue('john@example.com');
    expect(passwordInput).toHaveValue('password123');
    expect(confirmPasswordInput).toHaveValue('password123');
  });

  it('shows error when submitting empty form', async () => {
    render(<Signup go={mockGo} />);
    
    const form = screen.getByTestId('input-email').closest('form');
    if (form) {
      fireEvent.submit(form);
    }

    await waitFor(() => {
      expect(screen.getByText(/Please fill in all fields/i)).toBeInTheDocument();
    });

    expect(mockSignup).not.toHaveBeenCalled();
  });

  it('shows error when passwords do not match', async () => {
    render(<Signup go={mockGo} />);
    
    const nameInput = screen.getByTestId('input-displayName');
    const emailInput = screen.getByTestId('input-email');
    const passwordInput = screen.getByTestId('input-password');
    const confirmPasswordInput = screen.getByTestId('input-confirmPassword');

    fireEvent.change(nameInput, { target: { name: 'displayName', value: 'John Doe' } });
    fireEvent.change(emailInput, { target: { name: 'email', value: 'john@example.com' } });
    fireEvent.change(passwordInput, { target: { name: 'password', value: 'password123' } });
    fireEvent.change(confirmPasswordInput, { target: { name: 'confirmPassword', value: 'different' } });
    
    const form = emailInput.closest('form');
    if (form) {
      fireEvent.submit(form);
    }

    await waitFor(() => {
      expect(screen.getByText(/Passwords do not match/i)).toBeInTheDocument();
    });

    expect(mockSignup).not.toHaveBeenCalled();
  });

  it('shows error when password is too short', async () => {
    render(<Signup go={mockGo} />);
    
    const nameInput = screen.getByTestId('input-displayName');
    const emailInput = screen.getByTestId('input-email');
    const passwordInput = screen.getByTestId('input-password');
    const confirmPasswordInput = screen.getByTestId('input-confirmPassword');

    fireEvent.change(nameInput, { target: { name: 'displayName', value: 'John Doe' } });
    fireEvent.change(emailInput, { target: { name: 'email', value: 'john@example.com' } });
    fireEvent.change(passwordInput, { target: { name: 'password', value: '12345' } });
    fireEvent.change(confirmPasswordInput, { target: { name: 'confirmPassword', value: '12345' } });
    
    const form = emailInput.closest('form');
    if (form) {
      fireEvent.submit(form);
    }

    await waitFor(() => {
      expect(screen.getByText(/Password must be at least 6 characters/i)).toBeInTheDocument();
    });

    expect(mockSignup).not.toHaveBeenCalled();
  });

  it('successfully signs up with valid data', async () => {
    mockSignup.mockResolvedValueOnce(undefined);
    render(<Signup go={mockGo} />);
    
    const nameInput = screen.getByTestId('input-displayName');
    const emailInput = screen.getByTestId('input-email');
    const passwordInput = screen.getByTestId('input-password');
    const confirmPasswordInput = screen.getByTestId('input-confirmPassword');

    fireEvent.change(nameInput, { target: { name: 'displayName', value: 'John Doe' } });
    fireEvent.change(emailInput, { target: { name: 'email', value: 'john@example.com' } });
    fireEvent.change(passwordInput, { target: { name: 'password', value: 'password123' } });
    fireEvent.change(confirmPasswordInput, { target: { name: 'confirmPassword', value: 'password123' } });
    
    const form = emailInput.closest('form');
    if (form) {
      fireEvent.submit(form);
    }

    await waitFor(() => {
      expect(mockSignup).toHaveBeenCalledWith('john@example.com', 'password123', 'John Doe');
    });
  });

  it('shows error message on signup failure', async () => {
    mockSignup.mockRejectedValueOnce(new Error('Email already in use'));
    render(<Signup go={mockGo} />);
    
    const nameInput = screen.getByTestId('input-displayName');
    const emailInput = screen.getByTestId('input-email');
    const passwordInput = screen.getByTestId('input-password');
    const confirmPasswordInput = screen.getByTestId('input-confirmPassword');

    fireEvent.change(nameInput, { target: { name: 'displayName', value: 'John Doe' } });
    fireEvent.change(emailInput, { target: { name: 'email', value: 'existing@example.com' } });
    fireEvent.change(passwordInput, { target: { name: 'password', value: 'password123' } });
    fireEvent.change(confirmPasswordInput, { target: { name: 'confirmPassword', value: 'password123' } });
    
    const form = emailInput.closest('form');
    if (form) {
      fireEvent.submit(form);
    }

    await waitFor(() => {
      expect(screen.getByText(/Email already in use/i)).toBeInTheDocument();
    });
  });

  it('handles Google signup', async () => {
    mockLoginWithGoogle.mockResolvedValueOnce(undefined);
    render(<Signup go={mockGo} />);
    
    const googleButton = screen.getByText(/Continue with Google/i);
    fireEvent.click(googleButton);

    await waitFor(() => {
      expect(mockLoginWithGoogle).toHaveBeenCalled();
    });
  });

  it('navigates to login page', () => {
    render(<Signup go={mockGo} />);
    
    const loginLink = screen.getByText(/Sign in/i);
    fireEvent.click(loginLink);

    expect(mockGo).toHaveBeenCalledWith('login');
  });

  it('navigates back to landing page', () => {
    render(<Signup go={mockGo} />);
    
    const backButton = screen.getByTestId('back-button');
    fireEvent.click(backButton);

    expect(mockGo).toHaveBeenCalledWith('landing');
  });
});
