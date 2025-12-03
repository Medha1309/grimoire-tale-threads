import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';
import { Login } from '../../pages/Login';
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

describe('Login Component', () => {
  const mockGo = jest.fn();
  const mockLogin = jest.fn();
  const mockLoginWithGoogle = jest.fn();
  const mockResetPassword = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();
    mockUseAuth.mockReturnValue({
      login: mockLogin,
      loginWithGoogle: mockLoginWithGoogle,
      resetPassword: mockResetPassword,
      signup: jest.fn(),
      logout: jest.fn(),
      currentUser: null,
      loading: false,
    });
  });

  it('renders login form correctly', () => {
    render(<Login go={mockGo} />);
    
    expect(screen.getByText('Welcome Back')).toBeInTheDocument();
    expect(screen.getByText('Sign in to continue')).toBeInTheDocument();
    expect(screen.getByTestId('input-email')).toBeInTheDocument();
    expect(screen.getByTestId('input-password')).toBeInTheDocument();
    expect(screen.getByTestId('submit-button')).toBeInTheDocument();
    expect(screen.getByTestId('google-button')).toBeInTheDocument();
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
    
    const submitButton = screen.getByTestId('submit-button');
    fireEvent.click(submitButton);

    await waitFor(() => {
      expect(screen.getByText('Please fill in all fields')).toBeInTheDocument();
    });

    expect(mockLogin).not.toHaveBeenCalled();
  });

  it('successfully logs in with valid credentials', async () => {
    mockLogin.mockResolvedValueOnce(undefined);
    render(<Login go={mockGo} />);
    
    const emailInput = screen.getByTestId('input-email');
    const passwordInput = screen.getByTestId('input-password');
    const submitButton = screen.getByTestId('submit-button');

    fireEvent.change(emailInput, { target: { name: 'email', value: 'test@example.com' } });
    fireEvent.change(passwordInput, { target: { name: 'password', value: 'password123' } });
    fireEvent.click(submitButton);

    await waitFor(() => {
      expect(mockLogin).toHaveBeenCalledWith('test@example.com', 'password123');
    });

    await waitFor(() => {
      expect(mockGo).toHaveBeenCalledWith('stories');
    }, { timeout: 3000 });
  });

  it('shows error message on login failure', async () => {
    mockLogin.mockRejectedValueOnce(new Error('Invalid credentials'));
    render(<Login go={mockGo} />);
    
    const emailInput = screen.getByTestId('input-email');
    const passwordInput = screen.getByTestId('input-password');
    const submitButton = screen.getByTestId('submit-button');

    fireEvent.change(emailInput, { target: { name: 'email', value: 'test@example.com' } });
    fireEvent.change(passwordInput, { target: { name: 'password', value: 'wrong' } });
    fireEvent.click(submitButton);

    await waitFor(() => {
      expect(screen.getByText('Invalid credentials')).toBeInTheDocument();
    });

    expect(mockGo).not.toHaveBeenCalled();
  });

  it('handles Google login', async () => {
    mockLoginWithGoogle.mockResolvedValueOnce(undefined);
    render(<Login go={mockGo} />);
    
    const googleButton = screen.getByTestId('google-button');
    fireEvent.click(googleButton);

    await waitFor(() => {
      expect(mockLoginWithGoogle).toHaveBeenCalled();
    });

    await waitFor(() => {
      expect(mockGo).toHaveBeenCalledWith('stories');
    }, { timeout: 3000 });
  });

  it('handles password reset', async () => {
    mockResetPassword.mockResolvedValueOnce(undefined);
    render(<Login go={mockGo} />);
    
    const emailInput = screen.getByTestId('input-email');
    fireEvent.change(emailInput, { target: { name: 'email', value: 'test@example.com' } });

    const forgotPasswordButton = screen.getByText('Forgot password?');
    fireEvent.click(forgotPasswordButton);

    await waitFor(() => {
      expect(mockResetPassword).toHaveBeenCalledWith('test@example.com');
    });

    await waitFor(() => {
      expect(screen.getByText('Password reset email sent')).toBeInTheDocument();
    });
  });

  it('shows error when trying to reset password without email', async () => {
    render(<Login go={mockGo} />);
    
    const forgotPasswordButton = screen.getByText('Forgot password?');
    fireEvent.click(forgotPasswordButton);

    await waitFor(() => {
      expect(screen.getByText('Please enter your email address')).toBeInTheDocument();
    });

    expect(mockResetPassword).not.toHaveBeenCalled();
  });

  it('navigates to signup page', () => {
    render(<Login go={mockGo} />);
    
    const signupLink = screen.getByText('Sign up');
    fireEvent.click(signupLink);

    expect(mockGo).toHaveBeenCalledWith('signup');
  });

  it('navigates back to landing page', () => {
    render(<Login go={mockGo} />);
    
    const backButton = screen.getByText('Back');
    fireEvent.click(backButton);

    expect(mockGo).toHaveBeenCalledWith('landing');
  });
});
