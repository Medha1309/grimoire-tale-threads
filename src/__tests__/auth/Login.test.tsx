import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { describe, it, expect, beforeEach, vi } from 'vitest';
import '@testing-library/jest-dom';
import { Login } from '../../pages/Login';
import { useAuth } from '../../contexts/AuthContext';

// Mock AuthContext
vi.mock('../../contexts/AuthContext');
const mockUseAuth = useAuth as ReturnType<typeof vi.fn>;

// Mock framer-motion
vi.mock('framer-motion', () => ({
  motion: {
    div: ({ children, ...props }: any) => <div {...props}>{children}</div>,
    button: ({ children, ...props }: any) => <button {...props}>{children}</button>,
    form: ({ children, ...props }: any) => <form {...props}>{children}</form>,
  },
  AnimatePresence: ({ children }: any) => <>{children}</>,
}));

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

describe('Login Component', () => {
  const mockGo = vi.fn();
  const mockLogin = vi.fn();
  const mockResetPassword = vi.fn();

  beforeEach(() => {
    vi.clearAllMocks();
    mockUseAuth.mockReturnValue({
      login: mockLogin,
      resetPassword: mockResetPassword,
      signup: vi.fn(),
      logout: vi.fn(),
      loginWithGoogle: vi.fn(),
      currentUser: null,
      userProfile: null,
      loading: false,
      updateUserProfile: vi.fn(),
    });
  });

  it('renders login form correctly', () => {
    render(<Login go={mockGo} />);
    
    expect(screen.getByTestId('input-email')).toBeInTheDocument();
    expect(screen.getByTestId('input-password')).toBeInTheDocument();
  });

  it('handles email and password input changes', () => {
    render(<Login go={mockGo} />);
    
    const emailInput = screen.getByTestId('input-email');
    const passwordInput = screen.getByTestId('input-password');

    fireEvent.change(emailInput, { target: { name: 'email', value: 'test@example.com' } });
    fireEvent.change(passwordInput, { target: { name: 'password', value: 'password123' } });

    expect(emailInput).toHaveValue('test@example.com');
    expect(passwordInput).toHaveValue('password123');
  });

  it('shows error when submitting empty form', async () => {
    render(<Login go={mockGo} />);
    
    const form = screen.getByTestId('input-email').closest('form');
    if (form) {
      fireEvent.submit(form);
    }

    await waitFor(() => {
      expect(screen.getByText(/Please fill in all fields/i)).toBeInTheDocument();
    });

    expect(mockLogin).not.toHaveBeenCalled();
  });

  it('successfully logs in with valid credentials', async () => {
    mockLogin.mockResolvedValueOnce(undefined);
    render(<Login go={mockGo} />);
    
    const emailInput = screen.getByTestId('input-email');
    const passwordInput = screen.getByTestId('input-password');

    fireEvent.change(emailInput, { target: { name: 'email', value: 'test@example.com' } });
    fireEvent.change(passwordInput, { target: { name: 'password', value: 'password123' } });
    
    const form = emailInput.closest('form');
    if (form) {
      fireEvent.submit(form);
    }

    await waitFor(() => {
      expect(mockLogin).toHaveBeenCalledWith('test@example.com', 'password123');
    });
  });

  it('shows error message on login failure', async () => {
    mockLogin.mockRejectedValueOnce(new Error('Invalid credentials'));
    render(<Login go={mockGo} />);
    
    const emailInput = screen.getByTestId('input-email');
    const passwordInput = screen.getByTestId('input-password');

    fireEvent.change(emailInput, { target: { name: 'email', value: 'test@example.com' } });
    fireEvent.change(passwordInput, { target: { name: 'password', value: 'wrong' } });
    
    const form = emailInput.closest('form');
    if (form) {
      fireEvent.submit(form);
    }

    await waitFor(() => {
      expect(screen.getByText(/Invalid credentials/i)).toBeInTheDocument();
    });
  });

  it('handles password reset', async () => {
    mockResetPassword.mockResolvedValueOnce(undefined);
    render(<Login go={mockGo} />);
    
    const emailInput = screen.getByTestId('input-email');
    fireEvent.change(emailInput, { target: { name: 'email', value: 'test@example.com' } });

    const forgotPasswordButton = screen.getByText(/Forgot password/i);
    fireEvent.click(forgotPasswordButton);

    await waitFor(() => {
      expect(mockResetPassword).toHaveBeenCalledWith('test@example.com');
    });
  });

  it('shows error when trying to reset password without email', async () => {
    render(<Login go={mockGo} />);
    
    const forgotPasswordButton = screen.getByText(/Forgot password/i);
    fireEvent.click(forgotPasswordButton);

    await waitFor(() => {
      expect(screen.getByText(/Please enter your email/i)).toBeInTheDocument();
    });

    expect(mockResetPassword).not.toHaveBeenCalled();
  });

  it('navigates to signup page', () => {
    render(<Login go={mockGo} />);
    
    const signupLink = screen.getByText(/Sign up/i);
    fireEvent.click(signupLink);

    expect(mockGo).toHaveBeenCalledWith('signup');
  });

  it('navigates back to landing page', () => {
    render(<Login go={mockGo} />);
    
    const backButton = screen.getByTestId('back-button');
    fireEvent.click(backButton);

    expect(mockGo).toHaveBeenCalledWith('landing');
  });

  it('disables submit button while loading', async () => {
    mockLogin.mockImplementation(() => new Promise(resolve => setTimeout(resolve, 100)));
    render(<Login go={mockGo} />);
    
    const emailInput = screen.getByTestId('input-email');
    const passwordInput = screen.getByTestId('input-password');

    fireEvent.change(emailInput, { target: { name: 'email', value: 'test@example.com' } });
    fireEvent.change(passwordInput, { target: { name: 'password', value: 'password123' } });
    
    const form = emailInput.closest('form');
    if (form) {
      fireEvent.submit(form);
    }

    // Check that button is disabled during loading
    await waitFor(() => {
      const submitButton = screen.getByRole('button', { name: /sign in/i });
      expect(submitButton).toBeDisabled();
    });
  });
});
