import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';
import { Signup } from '../SignUp';

// Mock AuthContext
const mockSignup = vi.fn();
const mockLoginWithGoogle = vi.fn();

vi.mock('../../contexts/AuthContext', () => ({
  useAuth: () => ({
    signup: mockSignup,
    loginWithGoogle: mockLoginWithGoogle,
    currentUser: null,
  }),
}));

describe('SignUp Page', () => {
  const mockGo = vi.fn();

  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('renders the signup page', () => {
    render(<Signup go={mockGo} />);
    expect(screen.getByText(/join grimoire/i)).toBeInTheDocument();
  });

  it('renders all form fields', () => {
    render(<Signup go={mockGo} />);
    expect(screen.getByLabelText(/display name/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/^email$/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/^password$/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/confirm password/i)).toBeInTheDocument();
  });

  it('shows error when passwords do not match', async () => {
    render(<Signup go={mockGo} />);
    
    fireEvent.change(screen.getByLabelText(/display name/i), { target: { value: 'Test User' } });
    fireEvent.change(screen.getByLabelText(/^email$/i), { target: { value: 'test@example.com' } });
    fireEvent.change(screen.getByLabelText(/^password$/i), { target: { value: 'password123' } });
    fireEvent.change(screen.getByLabelText(/confirm password/i), { target: { value: 'password456' } });
    
    const submitButton = screen.getByRole('button', { name: /sign up/i });
    fireEvent.click(submitButton);
    
    await waitFor(() => {
      expect(screen.getByText(/passwords do not match/i)).toBeInTheDocument();
    });
  });

  it('shows error when password is too short', async () => {
    render(<Signup go={mockGo} />);
    
    fireEvent.change(screen.getByLabelText(/display name/i), { target: { value: 'Test User' } });
    fireEvent.change(screen.getByLabelText(/^email$/i), { target: { value: 'test@example.com' } });
    fireEvent.change(screen.getByLabelText(/^password$/i), { target: { value: '12345' } });
    fireEvent.change(screen.getByLabelText(/confirm password/i), { target: { value: '12345' } });
    
    const submitButton = screen.getByRole('button', { name: /sign up/i });
    fireEvent.click(submitButton);
    
    await waitFor(() => {
      expect(screen.getByText(/password must be at least 6 characters/i)).toBeInTheDocument();
    });
  });

  it('calls signup function with correct data', async () => {
    mockSignup.mockResolvedValueOnce({});
    
    render(<Signup go={mockGo} />);
    
    fireEvent.change(screen.getByLabelText(/display name/i), { target: { value: 'Test User' } });
    fireEvent.change(screen.getByLabelText(/^email$/i), { target: { value: 'test@example.com' } });
    fireEvent.change(screen.getByLabelText(/^password$/i), { target: { value: 'password123' } });
    fireEvent.change(screen.getByLabelText(/confirm password/i), { target: { value: 'password123' } });
    
    const submitButton = screen.getByRole('button', { name: /sign up/i });
    fireEvent.click(submitButton);
    
    await waitFor(() => {
      expect(mockSignup).toHaveBeenCalledWith('test@example.com', 'password123', 'Test User');
    });
  });

  it('navigates to stories page after successful signup', async () => {
    mockSignup.mockResolvedValueOnce({});
    
    render(<Signup go={mockGo} />);
    
    fireEvent.change(screen.getByLabelText(/display name/i), { target: { value: 'Test User' } });
    fireEvent.change(screen.getByLabelText(/^email$/i), { target: { value: 'test@example.com' } });
    fireEvent.change(screen.getByLabelText(/^password$/i), { target: { value: 'password123' } });
    fireEvent.change(screen.getByLabelText(/confirm password/i), { target: { value: 'password123' } });
    
    const submitButton = screen.getByRole('button', { name: /sign up/i });
    fireEvent.click(submitButton);
    
    await waitFor(() => {
      expect(mockGo).toHaveBeenCalledWith('stories');
    });
  });

  it('shows error message on signup failure', async () => {
    mockSignup.mockRejectedValueOnce(new Error('Email already in use'));
    
    render(<Signup go={mockGo} />);
    
    fireEvent.change(screen.getByLabelText(/display name/i), { target: { value: 'Test User' } });
    fireEvent.change(screen.getByLabelText(/^email$/i), { target: { value: 'test@example.com' } });
    fireEvent.change(screen.getByLabelText(/^password$/i), { target: { value: 'password123' } });
    fireEvent.change(screen.getByLabelText(/confirm password/i), { target: { value: 'password123' } });
    
    const submitButton = screen.getByRole('button', { name: /sign up/i });
    fireEvent.click(submitButton);
    
    await waitFor(() => {
      expect(screen.getByText(/email already in use/i)).toBeInTheDocument();
    });
  });

  it('calls Google signup when Google button is clicked', async () => {
    mockLoginWithGoogle.mockResolvedValueOnce({});
    
    render(<Signup go={mockGo} />);
    
    const googleButton = screen.getByRole('button', { name: /continue with google/i });
    fireEvent.click(googleButton);
    
    await waitFor(() => {
      expect(mockLoginWithGoogle).toHaveBeenCalled();
    });
  });

  it('navigates to login page when login link is clicked', () => {
    render(<Signup go={mockGo} />);
    
    const loginLink = screen.getByRole('button', { name: /log in/i });
    fireEvent.click(loginLink);
    
    expect(mockGo).toHaveBeenCalledWith('login');
  });

  it('navigates back when back button is clicked', () => {
    render(<Signup go={mockGo} />);
    
    const backButton = screen.getByText(/back/i);
    fireEvent.click(backButton);
    
    expect(mockGo).toHaveBeenCalledWith('landing');
  });

  it('disables submit button while loading', async () => {
    mockSignup.mockImplementation(() => new Promise(resolve => setTimeout(resolve, 1000)));
    
    render(<Signup go={mockGo} />);
    
    fireEvent.change(screen.getByLabelText(/display name/i), { target: { value: 'Test User' } });
    fireEvent.change(screen.getByLabelText(/^email$/i), { target: { value: 'test@example.com' } });
    fireEvent.change(screen.getByLabelText(/^password$/i), { target: { value: 'password123' } });
    fireEvent.change(screen.getByLabelText(/confirm password/i), { target: { value: 'password123' } });
    
    const submitButton = screen.getByRole('button', { name: /sign up/i });
    fireEvent.click(submitButton);
    
    await waitFor(() => {
      expect(screen.getByRole('button', { name: /creating account/i })).toBeDisabled();
    });
  });

  it('CRITICAL: go function must be provided and functional', () => {
    // This test verifies the critical issue
    const emptyGo = vi.fn();
    render(<Signup go={emptyGo} />);
    
    const backButton = screen.getByText(/back/i);
    fireEvent.click(backButton);
    
    // Verify the go function was actually called
    expect(emptyGo).toHaveBeenCalled();
    expect(emptyGo).toHaveBeenCalledWith('landing');
  });
});
