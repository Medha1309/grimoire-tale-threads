import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';
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

describe('Signup Component', () => {
  const mockGo = jest.fn();
  const mockSignup = jest.fn();
  const mockLoginWithGoogle = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();
    mockUseAuth.mockReturnValue({
      signup: mockSignup,
      loginWithGoogle: mockLoginWithGoogle,
      login: jest.fn(),
      resetPassword: jest.fn(),
      logout: jest.fn(),
      currentUser: null,
      loading: false,
    });
  });

  it('renders signup form correctly', () => {
    render(<Signup go={mockGo} />);
    
    expect(screen.getByText('Create Account')).toBeInTheDocument();
    expect(screen.getByText('Join the collection')).toBeInTheDocument();
    expect(screen.getByTestId('input-displayName')).toBeInTheDocument();
    expect(screen.getByTestId('input-email')).toBeInTheDocument();
    expect(screen.getByTestId('input-password')).toBeInTheDocument();
    expect(screen.getByTestId('input-confirmPassword')).toBeInTheDocument();
    expect(screen.getByTestId('submit-button')).toBeInTheDocument();
    expect(screen.getByTestId('google-button')).toBeInTheDocument();
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
    
    const submitButton = screen.getByTestId('submit-button');
    fireEvent.click(submitButton);

    await waitFor(() => {
      expect(screen.getByText('Please fill in all fields')).toBeInTheDocument();
    });

    expect(mockSignup).not.toHaveBeenCalled();
  });

  it('shows error when passwords do not match', async () => {
    render(<Signup go={mockGo} />);
    
    const nameInput = screen.getByTestId('input-displayName');
    const emailInput = screen.getByTestId('input-email');
    const passwordInput = screen.getByTestId('input-password');
    const confirmPasswordInput = screen.getByTestId('input-confirmPassword');
    const submitButton = screen.getByTestId('submit-button');

    fireEvent.change(nameInput, { target: { name: 'displayName', value: 'John Doe' } });
    fireEvent.change(emailInput, { target: { name: 'email', value: 'john@example.com' } });
    fireEvent.change(passwordInput, { target: { name: 'password', value: 'password123' } });
    fireEvent.change(confirmPasswordInput, { target: { name: 'confirmPassword', value: 'different' } });
    fireEvent.click(submitButton);

    await waitFor(() => {
      expect(screen.getByText('Passwords do not match')).toBeInTheDocument();
    });

    expect(mockSignup).not.toHaveBeenCalled();
  });

  it('shows error when password is too short', async () => {
    render(<Signup go={mockGo} />);
    
    const nameInput = screen.getByTestId('input-displayName');
    const emailInput = screen.getByTestId('input-email');
    const passwordInput = screen.getByTestId('input-password');
    const confirmPasswordInput = screen.getByTestId('input-confirmPassword');
    const submitButton = screen.getByTestId('submit-button');

    fireEvent.change(nameInput, { target: { name: 'displayName', value: 'John Doe' } });
    fireEvent.change(emailInput, { target: { name: 'email', value: 'john@example.com' } });
    fireEvent.change(passwordInput, { target: { name: 'password', value: '12345' } });
    fireEvent.change(confirmPasswordInput, { target: { name: 'confirmPassword', value: '12345' } });
    fireEvent.click(submitButton);

    await waitFor(() => {
      expect(screen.getByText('Password must be at least 6 characters')).toBeInTheDocument();
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
    const submitButton = screen.getByTestId('submit-button');

    fireEvent.change(nameInput, { target: { name: 'displayName', value: 'John Doe' } });
    fireEvent.change(emailInput, { target: { name: 'email', value: 'john@example.com' } });
    fireEvent.change(passwordInput, { target: { name: 'password', value: 'password123' } });
    fireEvent.change(confirmPasswordInput, { target: { name: 'confirmPassword', value: 'password123' } });
    fireEvent.click(submitButton);

    await waitFor(() => {
      expect(mockSignup).toHaveBeenCalledWith('john@example.com', 'password123', 'John Doe');
    });

    await waitFor(() => {
      expect(mockGo).toHaveBeenCalledWith('stories');
    }, { timeout: 3000 });
  });

  it('shows error message on signup failure', async () => {
    mockSignup.mockRejectedValueOnce(new Error('Email already in use'));
    render(<Signup go={mockGo} />);
    
    const nameInput = screen.getByTestId('input-displayName');
    const emailInput = screen.getByTestId('input-email');
    const passwordInput = screen.getByTestId('input-password');
    const confirmPasswordInput = screen.getByTestId('input-confirmPassword');
    const submitButton = screen.getByTestId('submit-button');

    fireEvent.change(nameInput, { target: { name: 'displayName', value: 'John Doe' } });
    fireEvent.change(emailInput, { target: { name: 'email', value: 'existing@example.com' } });
    fireEvent.change(passwordInput, { target: { name: 'password', value: 'password123' } });
    fireEvent.change(confirmPasswordInput, { target: { name: 'confirmPassword', value: 'password123' } });
    fireEvent.click(submitButton);

    await waitFor(() => {
      expect(screen.getByText('Email already in use')).toBeInTheDocument();
    });

    expect(mockGo).not.toHaveBeenCalled();
  });

  it('handles Google signup', async () => {
    mockLoginWithGoogle.mockResolvedValueOnce(undefined);
    render(<Signup go={mockGo} />);
    
    const googleButton = screen.getByTestId('google-button');
    fireEvent.click(googleButton);

    await waitFor(() => {
      expect(mockLoginWithGoogle).toHaveBeenCalled();
    });

    await waitFor(() => {
      expect(mockGo).toHaveBeenCalledWith('stories');
    }, { timeout: 3000 });
  });

  it('navigates to login page', () => {
    render(<Signup go={mockGo} />);
    
    const loginLink = screen.getByText('Sign in');
    fireEvent.click(loginLink);

    expect(mockGo).toHaveBeenCalledWith('login');
  });

  it('navigates back to landing page', () => {
    render(<Signup go={mockGo} />);
    
    const backButton = screen.getByText('Back');
    fireEvent.click(backButton);

    expect(mockGo).toHaveBeenCalledWith('landing');
  });
});
