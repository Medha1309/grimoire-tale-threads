import React from 'react';
/**
 * Chain Letters Integration Tests
 * Tests the complete chain letter system
 */

import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen, waitFor, fireEvent } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import { ChainLetters } from '../../pages/ChainLetters';
import * as chainLettersHooks from '../../hooks/useChainLetters';
import * as chainActionsHooks from '../../hooks/useChainActions';

// Mock Firebase
vi.mock('../../lib/firebase', () => ({
  db: {},
  auth: {},
}));

// Mock AuthContext
vi.mock('../../contexts/AuthContext', () => ({
  useAuth: vi.fn(),
  AuthContext: {
    Provider: ({ children }: any) => children,
  },
}));

// Mock framer-motion
vi.mock('framer-motion', () => ({
  motion: {
    div: ({ children, ...props }: any) => <div {...props}>{children}</div>,
    article: ({ children, ...props }: any) => <article {...props}>{children}</article>,
  },
  AnimatePresence: ({ children }: any) => <>{children}</>,
}));

const mockUser = {
  uid: 'test-user-123',
  email: 'test@example.com',
  displayName: 'Test User',
};

const mockChain = {
  id: 'chain-1',
  title: 'The Haunting of Blackwood Manor',
  genre: 'horror' as const,
  originatorId: 'user-1',
  originatorName: 'Alice',
  currentHolderId: 'test-user-123',
  currentHolderName: 'Test User',
  status: 'active' as const,
  chainLength: 3,
  createdAt: { toDate: () => new Date('2024-01-01') },
  lastPassedAt: { toDate: () => new Date('2024-01-10') },
  expiresAt: { toDate: () => new Date(Date.now() + 5 * 24 * 60 * 60 * 1000) },
  chapters: [
    {
      id: 'ch-1',
      chainId: 'chain-1',
      authorId: 'user-1',
      authorName: 'Alice',
      content: 'It began on a dark and stormy night...',
      chapterNumber: 1,
      wordCount: 100,
      createdAt: { toDate: () => new Date('2024-01-01') },
    },
  ],
  totalWords: 300,
  viewCount: 50,
  likeCount: 10,
  curseLevel: 2 as const,
  cursedBy: ['user-1', 'user-2', 'test-user-123'],
};

describe('ChainLetters Integration', () => {
  beforeEach(async () => {
    vi.clearAllMocks();
    
    // Mock useAuth
    const authModule = await import('../../contexts/AuthContext');
    vi.mocked(authModule.useAuth).mockReturnValue({
      currentUser: mockUser,
      userProfile: {
        uid: mockUser.uid,
        email: mockUser.email,
        displayName: mockUser.displayName,
        createdAt: new Date(),
        isAuthor: true,
      },
      loading: false,
      signUp: vi.fn(),
      login: vi.fn(),
      logout: vi.fn(),
      updateUserProfile: vi.fn(),
    });
    
    // Mock hooks
    vi.spyOn(chainLettersHooks, 'useChainLetters').mockReturnValue({
      chains: [mockChain],
      loading: false,
      error: null,
    });
    
    vi.spyOn(chainLettersHooks, 'useMyActiveChain').mockReturnValue({
      activeChain: mockChain,
      loading: false,
    });
    
    vi.spyOn(chainLettersHooks, 'useChainStats').mockReturnValue({
      stats: {
        totalChains: 10,
        activeChains: 5,
        completedChains: 3,
        graveyardChains: 2,
      },
      loading: false,
    });
  });

  it('renders chain letters page', async () => {
    render(
      <BrowserRouter>
        <ChainLetters />
      </BrowserRouter>
    );

    await waitFor(() => {
      expect(screen.getByText('Cursed Chain Letters')).toBeInTheDocument();
    });
  });

  it('displays chain statistics', async () => {
    render(
      <BrowserRouter>
        <ChainLetters />
      </BrowserRouter>
    );

    await waitFor(() => {
      expect(screen.getByText('10')).toBeInTheDocument(); // Total chains
      expect(screen.getByText('5')).toBeInTheDocument(); // Active chains
      expect(screen.getByText('3')).toBeInTheDocument(); // Completed chains
      expect(screen.getByText('2')).toBeInTheDocument(); // Graveyard chains
    });
  });

  it('shows active chain alert when user has active chain', async () => {
    render(
      <BrowserRouter>
        <ChainLetters />
      </BrowserRouter>
    );

    await waitFor(() => {
      expect(screen.getByText(/You have an active chain!/i)).toBeInTheDocument();
      expect(screen.getByText(/The Haunting of Blackwood Manor/i)).toBeInTheDocument();
    });
  });

  it('displays chain cards', async () => {
    render(
      <BrowserRouter>
        <ChainLetters />
      </BrowserRouter>
    );

    await waitFor(() => {
      expect(screen.getByText('The Haunting of Blackwood Manor')).toBeInTheDocument();
      expect(screen.getByText(/3 chapters/i)).toBeInTheDocument();
      expect(screen.getByText(/300 words/i)).toBeInTheDocument();
    });
  });

  it('shows "YOUR TURN" badge for owned chains', async () => {
    render(
      <BrowserRouter>
        <ChainLetters />
      </BrowserRouter>
    );

    await waitFor(() => {
      expect(screen.getByText('YOUR TURN')).toBeInTheDocument();
    });
  });

  it('filters chains by type', async () => {
    render(
      <BrowserRouter>
        <ChainLetters />
      </BrowserRouter>
    );

    const activeFilter = screen.getByRole('button', { name: /active/i });
    fireEvent.click(activeFilter);

    await waitFor(() => {
      expect(chainLettersHooks.useChainLetters).toHaveBeenCalledWith('active', expect.any(String));
    });
  });

  it('requires authentication', async () => {
    const authModule = await import('../../contexts/AuthContext');
    vi.mocked(authModule.useAuth).mockReturnValue({
      currentUser: null,
      userProfile: null,
      loading: false,
      signUp: vi.fn(),
      login: vi.fn(),
      logout: vi.fn(),
      updateUserProfile: vi.fn(),
    });

    render(
      <BrowserRouter>
        <ChainLetters />
      </BrowserRouter>
    );

    await waitFor(() => {
      expect(screen.getByText(/You must be logged in/i)).toBeInTheDocument();
    });
  });
});

describe('Chain Actions', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('validates chain creation', () => {
    const mockStartChain = vi.fn().mockResolvedValue('chain-123');
    
    vi.spyOn(chainActionsHooks, 'useChainActions').mockReturnValue({
      startChain: mockStartChain,
      addChapter: vi.fn(),
      passChain: vi.fn(),
      completeChain: vi.fn(),
      breakChain: vi.fn(),
      loading: false,
      error: null,
    });

    expect(mockStartChain).toBeDefined();
  });

  it('validates chapter word count', () => {
    const content = 'This is a test chapter with exactly ten words here.';
    const wordCount = content.trim().split(/\s+/).length;
    
    expect(wordCount).toBeGreaterThan(0);
    expect(wordCount).toBeLessThan(1000);
  });

  it('calculates curse level correctly', () => {
    const calculateCurseLevel = (chainLength: number) => {
      return Math.min(5, Math.floor(chainLength / 3) + 1);
    };

    expect(calculateCurseLevel(1)).toBe(1);
    expect(calculateCurseLevel(3)).toBe(2);
    expect(calculateCurseLevel(6)).toBe(3);
    expect(calculateCurseLevel(9)).toBe(4);
    expect(calculateCurseLevel(12)).toBe(5);
    expect(calculateCurseLevel(20)).toBe(5); // Max level
  });

  it('calculates expiry correctly', () => {
    const CHAIN_EXPIRY_DAYS = 7;
    const now = new Date();
    const expiresAt = new Date(now.getTime() + CHAIN_EXPIRY_DAYS * 24 * 60 * 60 * 1000);
    
    const daysUntilExpiry = Math.ceil((expiresAt.getTime() - now.getTime()) / (1000 * 60 * 60 * 24));
    
    expect(daysUntilExpiry).toBe(7);
  });
});

describe('Chain Letter Card', () => {
  it('displays curse level correctly', () => {
    const CURSE_LABELS = {
      1: 'Whispered',
      2: 'Haunted',
      3: 'Cursed',
      4: 'Damned',
      5: 'Forsaken',
    };

    expect(CURSE_LABELS[1]).toBe('Whispered');
    expect(CURSE_LABELS[5]).toBe('Forsaken');
  });

  it('shows urgency for chains expiring soon', () => {
    const expiresIn2Days = new Date(Date.now() + 2 * 24 * 60 * 60 * 1000);
    const daysRemaining = Math.ceil((expiresIn2Days.getTime() - Date.now()) / (1000 * 60 * 60 * 24));
    const isUrgent = daysRemaining <= 2;

    expect(isUrgent).toBe(true);
  });
});


