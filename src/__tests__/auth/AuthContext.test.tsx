import React from 'react';
import { renderHook, act, waitFor } from '@testing-library/react';
import { AuthProvider, useAuth } from '../../contexts/AuthContext';
import { auth } from '../../lib/firebase';
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signInWithPopup,
  signOut,
  sendPasswordResetEmail,
  updateProfile,
} from 'firebase/auth';
import { expect } from 'vitest';
import { it } from 'vitest';
import { expect } from 'vitest';
import { it } from 'vitest';
import { expect } from 'vitest';
import { it } from 'vitest';
import { expect } from 'vitest';
import { it } from 'vitest';
import { expect } from 'vitest';
import { it } from 'vitest';
import { expect } from 'vitest';
import { it } from 'vitest';
import { expect } from 'vitest';
import { expect } from 'vitest';
import { it } from 'vitest';
import { expect } from 'vitest';
import { expect } from 'vitest';
import { expect } from 'vitest';
import { expect } from 'vitest';
import { expect } from 'vitest';
import { expect } from 'vitest';
import { expect } from 'vitest';
import { it } from 'vitest';
import { beforeEach } from 'vitest';
import { describe } from 'vitest';

// Mock Firebase
jest.mock('../../lib/firebase', () => ({
  auth: {},
  db: {},
}));

jest.mock('firebase/auth');

const mockCreateUser = createUserWithEmailAndPassword as jest.MockedFunction<typeof createUserWithEmailAndPassword>;
const mockSignIn = signInWithEmailAndPassword as jest.MockedFunction<typeof signInWithEmailAndPassword>;
const mockSignInWithPopup = signInWithPopup as jest.MockedFunction<typeof signInWithPopup>;
const mockSignOut = signOut as jest.MockedFunction<typeof signOut>;
const mockSendPasswordReset = sendPasswordResetEmail as jest.MockedFunction<typeof sendPasswordResetEmail>;
const mockUpdateProfile = updateProfile as jest.MockedFunction<typeof updateProfile>;

describe('AuthContext', () => {
  const wrapper = ({ children }: { children: React.ReactNode }) => (
    <AuthProvider>{children}</AuthProvider>
  );

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('provides auth context', () => {
    const { result } = renderHook(() => useAuth(), { wrapper });
    
    expect(result.current).toHaveProperty('currentUser');
    expect(result.current).toHaveProperty('loading');
    expect(result.current).toHaveProperty('signup');
    expect(result.current).toHaveProperty('login');
    expect(result.current).toHaveProperty('loginWithGoogle');
    expect(result.current).toHaveProperty('logout');
    expect(result.current).toHaveProperty('resetPassword');
  });

  it('signs up a new user', async () => {
    const mockUser = { uid: '123', email: 'test@example.com' };
    mockCreateUser.mockResolvedValueOnce({ user: mockUser } as any);
    mockUpdateProfile.mockResolvedValueOnce(undefined);

    const { result } = renderHook(() => useAuth(), { wrapper });

    await act(async () => {
      await result.current.signup('test@example.com', 'password123', 'Test User');
    });

    expect(mockCreateUser).toHaveBeenCalledWith(auth, 'test@example.com', 'password123');
    expect(mockUpdateProfile).toHaveBeenCalledWith(mockUser, { displayName: 'Test User' });
  });

  it('logs in an existing user', async () => {
    const mockUser = { uid: '123', email: 'test@example.com' };
    mockSignIn.mockResolvedValueOnce({ user: mockUser } as any);

    const { result } = renderHook(() => useAuth(), { wrapper });

    await act(async () => {
      await result.current.login('test@example.com', 'password123');
    });

    expect(mockSignIn).toHaveBeenCalledWith(auth, 'test@example.com', 'password123');
  });

  it('logs in with Google', async () => {
    const mockUser = { uid: '123', email: 'test@example.com' };
    mockSignInWithPopup.mockResolvedValueOnce({ user: mockUser } as any);

    const { result } = renderHook(() => useAuth(), { wrapper });

    await act(async () => {
      await result.current.loginWithGoogle();
    });

    expect(mockSignInWithPopup).toHaveBeenCalled();
  });

  it('logs out a user', async () => {
    mockSignOut.mockResolvedValueOnce(undefined);

    const { result } = renderHook(() => useAuth(), { wrapper });

    await act(async () => {
      await result.current.logout();
    });

    expect(mockSignOut).toHaveBeenCalledWith(auth);
  });

  it('sends password reset email', async () => {
    mockSendPasswordReset.mockResolvedValueOnce(undefined);

    const { result } = renderHook(() => useAuth(), { wrapper });

    await act(async () => {
      await result.current.resetPassword('test@example.com');
    });

    expect(mockSendPasswordReset).toHaveBeenCalledWith(auth, 'test@example.com');
  });

  it('handles signup errors', async () => {
    mockCreateUser.mockRejectedValueOnce(new Error('Email already in use'));

    const { result } = renderHook(() => useAuth(), { wrapper });

    await expect(
      act(async () => {
        await result.current.signup('test@example.com', 'password123', 'Test User');
      })
    ).rejects.toThrow('Email already in use');
  });

  it('handles login errors', async () => {
    mockSignIn.mockRejectedValueOnce(new Error('Invalid credentials'));

    const { result } = renderHook(() => useAuth(), { wrapper });

    await expect(
      act(async () => {
        await result.current.login('test@example.com', 'wrongpassword');
      })
    ).rejects.toThrow('Invalid credentials');
  });
});
