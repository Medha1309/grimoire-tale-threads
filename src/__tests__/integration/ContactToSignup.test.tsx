import React from 'react';
import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { BrowserRouter, Routes, Route, useNavigate } from 'react-router-dom';
import '@testing-library/jest-dom';
import { Contact } from '../../pages/Contact';
import { Signup } from '../../pages/SignUp';

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

// Mock OuijaBoard to simplify testing
vi.mock('../../components/OuijaBoard', () => ({
  default: () => <div data-testid="ouija-board">Ouija Board</div>,
}));

// Test app with routing
const TestApp = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Contact />} />
        <Route path="/signup" element={<SignupWrapper />} />
      </Routes>
    </BrowserRouter>
  );
};

// Wrapper to provide navigation to Signup
const SignupWrapper = () => {
  const navigate = useNavigate();
  const go = (page: string) => {
    if (page === 'landing') navigate('/');
    if (page === 'login') navigate('/login');
    if (page === 'stories') navigate('/stories');
  };
  return <Signup go={go} />;
};

describe('Contact to SignUp Navigation Integration', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('successfully navigates from Contact page to SignUp page', async () => {
    render(<TestApp />);
    
    // Skip the intro animation
    const skipButton = screen.getByText(/skip to form/i);
    fireEvent.click(skipButton);
    
    // Verify we're on the Contact page
    await waitFor(() => {
      expect(screen.getByText(/contact/i)).toBeInTheDocument();
      expect(screen.getByTestId('ouija-board')).toBeInTheDocument();
    });
    
    // Navigate to signup (simulating a link click)
    // Note: In the actual app, this would be triggered by a button/link
    // For now, we'll manually navigate
    window.history.pushState({}, '', '/signup');
    
    // Re-render with new route
    const { rerender } = render(<TestApp />);
    
    await waitFor(() => {
      expect(screen.getByText(/join grimoire/i)).toBeInTheDocument();
    });
  });

  it('SignUp page renders correctly after navigation', async () => {
    // Start directly on signup page
    const { container } = render(
      <BrowserRouter>
        <Routes>
          <Route path="/signup" element={<SignupWrapper />} />
        </Routes>
      </BrowserRouter>
    );
    
    window.history.pushState({}, '', '/signup');
    
    await waitFor(() => {
      expect(screen.getByText(/join grimoire/i)).toBeInTheDocument();
      expect(screen.getByLabelText(/display name/i)).toBeInTheDocument();
    });
  });

  it('SignUp page has functional back button', async () => {
    const { container } = render(
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<div>Landing Page</div>} />
          <Route path="/signup" element={<SignupWrapper />} />
        </Routes>
      </BrowserRouter>
    );
    
    window.history.pushState({}, '', '/signup');
    
    await waitFor(() => {
      const backButton = screen.getByLabelText(/back to landing page/i);
      expect(backButton).toBeInTheDocument();
      fireEvent.click(backButton);
    });
    
    // Should navigate back
    await waitFor(() => {
      expect(window.location.pathname).toBe('/');
    });
  });

  it('OuijaBoard component renders without errors on Contact page', async () => {
    render(<TestApp />);
    
    const skipButton = screen.getByText(/skip to form/i);
    fireEvent.click(skipButton);
    
    await waitFor(() => {
      const ouijaBoard = screen.getByTestId('ouija-board');
      expect(ouijaBoard).toBeInTheDocument();
      expect(ouijaBoard).toBeVisible();
    });
  });

  it('Contact page form is functional', async () => {
    render(<TestApp />);
    
    const skipButton = screen.getByText(/skip to form/i);
    fireEvent.click(skipButton);
    
    await waitFor(() => {
      const nameInput = screen.getByLabelText(/name/i);
      const emailInput = screen.getByLabelText(/email/i);
      
      expect(nameInput).toBeInTheDocument();
      expect(emailInput).toBeInTheDocument();
      
      // Form should be interactive
      fireEvent.change(nameInput, { target: { value: 'Test User' } });
      expect(nameInput).toHaveValue('Test User');
    });
  });
});


