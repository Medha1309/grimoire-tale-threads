/**
 * Lightweight State Manager
 * Provides global state management without heavy dependencies
 */

type Listener<T> = (state: T) => void;
type Selector<T, R> = (state: T) => R;

export class StateManager<T> {
  private state: T;
  private listeners = new Set<Listener<T>>();

  constructor(initialState: T) {
    this.state = initialState;
  }

  getState(): T {
    return this.state;
  }

  setState(partial: Partial<T> | ((state: T) => Partial<T>)): void {
    const updates = typeof partial === 'function' ? partial(this.state) : partial;
    this.state = { ...this.state, ...updates };
    this.notify();
  }

  subscribe(listener: Listener<T>): () => void {
    this.listeners.add(listener);
    return () => this.listeners.delete(listener);
  }

  private notify(): void {
    this.listeners.forEach(listener => listener(this.state));
  }

  select<R>(selector: Selector<T, R>): R {
    return selector(this.state);
  }
}

// React hook for state manager
import { useEffect, useState, useCallback } from 'react';

export function useStateManager<T, R = T>(
  manager: StateManager<T>,
  selector?: Selector<T, R>
): [R, (partial: Partial<T> | ((state: T) => Partial<T>)) => void] {
  const [state, setState] = useState<R>(() => 
    selector ? manager.select(selector) : manager.getState() as unknown as R
  );

  useEffect(() => {
    const updateState = (newState: T) => {
      const selected = selector ? selector(newState) : newState as unknown as R;
      setState(selected);
    };

    return manager.subscribe(updateState);
  }, [manager, selector]);

  const update = useCallback((partial: Partial<T> | ((state: T) => Partial<T>)) => {
    manager.setState(partial);
  }, [manager]);

  return [state, update];
}

// Global app state
interface AppState {
  isLoading: boolean;
  error: string | null;
  theme: 'dark' | 'light';
  performanceMode: 'low' | 'medium' | 'high';
}

export const appState = new StateManager<AppState>({
  isLoading: false,
  error: null,
  theme: 'dark',
  performanceMode: 'medium',
});
