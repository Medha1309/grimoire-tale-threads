import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';
import { Contact } from '../Contact';

// Mock the navigation hook
const mockGoTo = {
  home: vi.fn(),
  stories: vi.fn(),
  signup: vi.fn(),
};

vi.mock('../../hooks/useNavigation', () => ({
  useNavigation: () => ({
    goTo: mockGoTo,
    navigate: vi.fn(),
  }),
}));

// Mock OuijaBoard component to simplify testing
vi.mock('../../components/OuijaBoard', () => ({
  default: () => <div data-testid="ouija-board">Ouija Board Mock</div>,
}));

describe('Contact Page', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('renders the contact page', () => {
    render(<Contact />);
    expect(screen.getByText(/hi there/i)).toBeInTheDocument();
  });

  it('shows intro animation sequence', () => {
    render(<Contact />);
    expect(screen.getByText(/hi there/i)).toBeInTheDocument();
  });

  it('has a skip button during intro', () => {
    render(<Contact />);
    const skipButton = screen.getByText(/skip to form/i);
    expect(skipButton).toBeInTheDocument();
  });

  it('skips intro when skip button is clicked', async () => {
    render(<Contact />);
    const skipButton = screen.getByText(/skip to form/i);
    
    fireEvent.click(skipButton);
    
    await waitFor(() => {
      expect(screen.queryByText(/skip to form/i)).not.toBeInTheDocument();
      expect(screen.getByText(/contact/i)).toBeInTheDocument();
    });
  });

  it('shows form after intro completes', async () => {
    vi.useFakeTimers();
    render(<Contact />);
    
    // Fast-forward past all intro timers (22 seconds)
    vi.advanceTimersByTime(22000);
    
    await waitFor(() => {
      expect(screen.getByLabelText(/name/i)).toBeInTheDocument();
    });
    
    vi.useRealTimers();
  });

  it('renders OuijaBoard component', async () => {
    render(<Contact />);
    const skipButton = screen.getByText(/skip to form/i);
    fireEvent.click(skipButton);
    
    await waitFor(() => {
      expect(screen.getByTestId('ouija-board')).toBeInTheDocument();
    });
  });

  it('renders contact form fields', async () => {
    render(<Contact />);
    const skipButton = screen.getByText(/skip to form/i);
    fireEvent.click(skipButton);
    
    await waitFor(() => {
      expect(screen.getByLabelText(/name/i)).toBeInTheDocument();
      expect(screen.getByLabelText(/email/i)).toBeInTheDocument();
      expect(screen.getByLabelText(/subject/i)).toBeInTheDocument();
      expect(screen.getByLabelText(/message/i)).toBeInTheDocument();
    });
  });

  it('validates form fields', async () => {
    render(<Contact />);
    const skipButton = screen.getByText(/skip to form/i);
    fireEvent.click(skipButton);
    
    await waitFor(() => {
      const submitButton = screen.getByRole('button', { name: /send message/i });
      expect(submitButton).toBeDisabled();
    });
  });

  it('enables submit button when form is valid', async () => {
    render(<Contact />);
    const skipButton = screen.getByText(/skip to form/i);
    fireEvent.click(skipButton);
    
    await waitFor(() => {
      const nameInput = screen.getByLabelText(/name/i);
      const emailInput = screen.getByLabelText(/email/i);
      const subjectInput = screen.getByLabelText(/subject/i);
      const messageInput = screen.getByLabelText(/message/i);
      
      fireEvent.change(nameInput, { target: { value: 'John Doe' } });
      fireEvent.change(emailInput, { target: { value: 'john@example.com' } });
      fireEvent.change(subjectInput, { target: { value: 'Test Subject' } });
      fireEvent.change(messageInput, { target: { value: 'This is a test message that is long enough' } });
    });
    
    await waitFor(() => {
      const submitButton = screen.getByRole('button', { name: /send message/i });
      expect(submitButton).not.toBeDisabled();
    });
  });

  it('submits form successfully', async () => {
    vi.useFakeTimers();
    render(<Contact />);
    const skipButton = screen.getByText(/skip to form/i);
    fireEvent.click(skipButton);
    
    await waitFor(() => {
      const nameInput = screen.getByLabelText(/name/i);
      const emailInput = screen.getByLabelText(/email/i);
      const subjectInput = screen.getByLabelText(/subject/i);
      const messageInput = screen.getByLabelText(/message/i);
      
      fireEvent.change(nameInput, { target: { value: 'John Doe' } });
      fireEvent.change(emailInput, { target: { value: 'john@example.com' } });
      fireEvent.change(subjectInput, { target: { value: 'Test Subject' } });
      fireEvent.change(messageInput, { target: { value: 'This is a test message that is long enough' } });
    });
    
    const submitButton = screen.getByRole('button', { name: /send message/i });
    fireEvent.click(submitButton);
    
    // Fast-forward through loading state
    vi.advanceTimersByTime(2500);
    
    await waitFor(() => {
      expect(screen.getByText(/message received/i)).toBeInTheDocument();
    });
    
    vi.useRealTimers();
  });

  it('navigates back when back button is clicked', async () => {
    render(<Contact />);
    const skipButton = screen.getByText(/skip to form/i);
    fireEvent.click(skipButton);
    
    await waitFor(() => {
      const backButton = screen.getByText(/back/i);
      fireEvent.click(backButton);
    });
    
    expect(mockGoTo.home).toHaveBeenCalled();
  });

  it('has honeypot field for spam protection', async () => {
    render(<Contact />);
    const skipButton = screen.getByText(/skip to form/i);
    fireEvent.click(skipButton);
    
    await waitFor(() => {
      const honeypot = screen.getByRole('textbox', { name: '', hidden: true });
      expect(honeypot).toHaveAttribute('name', 'ritual_code');
      expect(honeypot).toHaveStyle({ position: 'absolute', left: '-9999px' });
    });
  });
});
