/**
 * Testing utilities for consistent test setup
 * Provides helpers for rendering components with providers and mocking
 */

import { ReactElement } from 'react';
import { render, RenderOptions } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import { AuthProvider } from '../contexts/AuthContext';

// Mock user for testing
export const mockUser = {
  uid: 'test-user-id',
  email: 'test@example.com',
  displayName: 'Test User',
  photoURL: null,
  emailVerified: true,
};

// Mock auth context value
export const mockAuthContext = {
  user: mockUser,
  loading: false,
  signIn: vi.fn(),
  signUp: vi.fn(),
  signOut: vi.fn(),
  updateUserProfile: vi.fn(),
};

// Custom render function with all providers
interface CustomRenderOptions extends Omit<RenderOptions, 'wrapper'> {
  initialRoute?: string;
  authValue?: typeof mockAuthContext;
}

export function renderWithProviders(
  ui: ReactElement,
  options: CustomRenderOptions = {}
) {
  const { initialRoute = '/', authValue = mockAuthContext, ...renderOptions } = options;

  // Set initial route if provided
  if (initialRoute !== '/') {
    window.history.pushState({}, 'Test page', initialRoute);
  }

  function Wrapper({ children }: { children: React.ReactNode }) {
    return (
      <BrowserRouter>
        <AuthProvider value={authValue as never}>
          {children}
        </AuthProvider>
      </BrowserRouter>
    );
  }

  return render(ui, { wrapper: Wrapper, ...renderOptions });
}

// Mock Firebase functions
export const mockFirebase = {
  auth: {
    signInWithEmailAndPassword: vi.fn(),
    createUserWithEmailAndPassword: vi.fn(),
    signOut: vi.fn(),
    onAuthStateChanged: vi.fn(),
    updateProfile: vi.fn(),
  },
  firestore: {
    collection: vi.fn(),
    doc: vi.fn(),
    getDoc: vi.fn(),
    getDocs: vi.fn(),
    setDoc: vi.fn(),
    updateDoc: vi.fn(),
    deleteDoc: vi.fn(),
    query: vi.fn(),
    where: vi.fn(),
    orderBy: vi.fn(),
    limit: vi.fn(),
    onSnapshot: vi.fn(),
  },
  storage: {
    ref: vi.fn(),
    uploadBytes: vi.fn(),
    getDownloadURL: vi.fn(),
    deleteObject: vi.fn(),
  },
};

// Wait for async operations
export const waitFor = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

// Mock intersection observer
export function mockIntersectionObserver() {
  global.IntersectionObserver = class IntersectionObserver {
    constructor() {}
    disconnect() {}
    observe() {}
    takeRecords() {
      return [];
    }
    unobserve() {}
  } as never;
}

// Mock resize observer
export function mockResizeObserver() {
  global.ResizeObserver = class ResizeObserver {
    constructor() {}
    disconnect() {}
    observe() {}
    unobserve() {}
  } as never;
}

// Mock matchMedia
export function mockMatchMedia(matches = false) {
  Object.defineProperty(window, 'matchMedia', {
    writable: true,
    value: vi.fn().mockImplementation(query => ({
      matches,
      media: query,
      onchange: null,
      addListener: vi.fn(),
      removeListener: vi.fn(),
      addEventListener: vi.fn(),
      removeEventListener: vi.fn(),
      dispatchEvent: vi.fn(),
    })),
  });
}

// Mock localStorage
export function mockLocalStorage() {
  const store: Record<string, string> = {};

  const mockStorage = {
    getItem: vi.fn((key: string) => store[key] || null),
    setItem: vi.fn((key: string, value: string) => {
      store[key] = value;
    }),
    removeItem: vi.fn((key: string) => {
      delete store[key];
    }),
    clear: vi.fn(() => {
      Object.keys(store).forEach(key => delete store[key]);
    }),
    get length() {
      return Object.keys(store).length;
    },
    key: vi.fn((index: number) => Object.keys(store)[index] || null),
  };

  Object.defineProperty(window, 'localStorage', {
    value: mockStorage,
    writable: true,
  });

  return mockStorage;
}

// Mock sessionStorage
export function mockSessionStorage() {
  const store: Record<string, string> = {};

  const mockStorage = {
    getItem: vi.fn((key: string) => store[key] || null),
    setItem: vi.fn((key: string, value: string) => {
      store[key] = value;
    }),
    removeItem: vi.fn((key: string) => {
      delete store[key];
    }),
    clear: vi.fn(() => {
      Object.keys(store).forEach(key => delete store[key]);
    }),
    get length() {
      return Object.keys(store).length;
    },
    key: vi.fn((index: number) => Object.keys(store)[index] || null),
  };

  Object.defineProperty(window, 'sessionStorage', {
    value: mockStorage,
    writable: true,
  });

  return mockStorage;
}

// Mock fetch
export function mockFetch(response: unknown, ok = true) {
  global.fetch = vi.fn(() =>
    Promise.resolve({
      ok,
      json: () => Promise.resolve(response),
      text: () => Promise.resolve(JSON.stringify(response)),
      blob: () => Promise.resolve(new Blob()),
      arrayBuffer: () => Promise.resolve(new ArrayBuffer(0)),
      formData: () => Promise.resolve(new FormData()),
    } as Response)
  );
}

// Create mock file
export function createMockFile(
  name = 'test.jpg',
  size = 1024,
  type = 'image/jpeg'
): File {
  const blob = new Blob(['x'.repeat(size)], { type });
  return new File([blob], name, { type });
}

// Create mock image
export function createMockImage(width = 100, height = 100): HTMLImageElement {
  const img = new Image(width, height);
  img.src = 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mNk+M9QDwADhgGAWjR9awAAAABJRU5ErkJggg==';
  return img;
}

// Suppress console errors in tests
export function suppressConsoleError() {
  const originalError = console.error;
  beforeAll(() => {
    console.error = vi.fn();
  });
  afterAll(() => {
    console.error = originalError;
  });
}

// Suppress console warnings in tests
export function suppressConsoleWarning() {
  const originalWarn = console.warn;
  beforeAll(() => {
    console.warn = vi.fn();
  });
  afterAll(() => {
    console.warn = originalWarn;
  });
}

// Create mock story
export function createMockStory(overrides = {}) {
  return {
    id: 'story-1',
    title: 'Test Story',
    content: 'Test content',
    authorId: 'user-1',
    authorName: 'Test Author',
    genre: 'Horror',
    status: 'published',
    createdAt: new Date(),
    updatedAt: new Date(),
    likes: 0,
    views: 0,
    ...overrides,
  };
}

// Create mock comment
export function createMockComment(overrides = {}) {
  return {
    id: 'comment-1',
    content: 'Test comment',
    authorId: 'user-1',
    authorName: 'Test User',
    storyId: 'story-1',
    createdAt: new Date(),
    likes: 0,
    ...overrides,
  };
}

// Create mock forum post
export function createMockForumPost(overrides = {}) {
  return {
    id: 'post-1',
    title: 'Test Post',
    content: 'Test content',
    authorId: 'user-1',
    authorName: 'Test User',
    category: 'general',
    createdAt: new Date(),
    updatedAt: new Date(),
    likes: 0,
    replies: 0,
    ...overrides,
  };
}

// Create mock diary entry
export function createMockDiaryEntry(overrides = {}) {
  return {
    id: 'entry-1',
    title: 'Test Entry',
    content: 'Test content',
    userId: 'user-1',
    mood: 'neutral',
    isLocked: false,
    createdAt: new Date(),
    updatedAt: new Date(),
    ...overrides,
  };
}

// Assert element has class
export function assertHasClass(element: HTMLElement, className: string) {
  expect(element.classList.contains(className)).toBe(true);
}

// Assert element does not have class
export function assertDoesNotHaveClass(element: HTMLElement, className: string) {
  expect(element.classList.contains(className)).toBe(false);
}

// Assert element is visible
export function assertIsVisible(element: HTMLElement) {
  expect(element).toBeVisible();
}

// Assert element is hidden
export function assertIsHidden(element: HTMLElement) {
  expect(element).not.toBeVisible();
}

// Re-export everything from testing library
export * from '@testing-library/react';
export { default as userEvent } from '@testing-library/user-event';
