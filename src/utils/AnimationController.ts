/**
 * Centralized Animation Controller
 * Single RAF loop for all animations to reduce overhead
 */

type AnimationCallback = (deltaTime: number, timestamp: number) => void;

class AnimationController {
  private callbacks: Map<string, AnimationCallback> = new Map();
  private rafId: number | null = null;
  private lastTimestamp: number = 0;
  private isRunning: boolean = false;

  /**
   * Register an animation callback
   */
  register(id: string, callback: AnimationCallback): void {
    this.callbacks.set(id, callback);
    if (!this.isRunning) {
      this.start();
    }
  }

  /**
   * Unregister an animation callback
   */
  unregister(id: string): void {
    this.callbacks.delete(id);
    if (this.callbacks.size === 0) {
      this.stop();
    }
  }

  /**
   * Start the animation loop
   */
  private start(): void {
    if (this.isRunning) return;
    this.isRunning = true;
    this.lastTimestamp = performance.now();
    this.loop();
  }

  /**
   * Stop the animation loop
   */
  private stop(): void {
    if (this.rafId !== null) {
      cancelAnimationFrame(this.rafId);
      this.rafId = null;
    }
    this.isRunning = false;
  }

  /**
   * Main animation loop
   */
  private loop = (): void => {
    const timestamp = performance.now();
    const deltaTime = timestamp - this.lastTimestamp;
    this.lastTimestamp = timestamp;

    // Execute all registered callbacks
    this.callbacks.forEach((callback) => {
      try {
        callback(deltaTime, timestamp);
      } catch (error) {
        console.error('Animation callback error:', error);
      }
    });

    if (this.isRunning) {
      this.rafId = requestAnimationFrame(this.loop);
    }
  };

  /**
   * Get current number of registered animations
   */
  getActiveCount(): number {
    return this.callbacks.size;
  }
}

// Singleton instance
export const animationController = new AnimationController();

/**
 * React hook for using the animation controller
 */
import { useEffect, useRef, DependencyList } from 'react';

export const useAnimationFrame = (
  callback: AnimationCallback,
  deps: DependencyList = []
): void => {
  const callbackRef = useRef(callback);
  const idRef = useRef<string>();

  // Update callback ref when deps change
  useEffect(() => {
    callbackRef.current = callback;
  }, [callback, ...deps]);

  useEffect(() => {
    const id = `anim-${Math.random().toString(36).substr(2, 9)}`;
    idRef.current = id;

    animationController.register(id, (deltaTime, timestamp) => {
      callbackRef.current(deltaTime, timestamp);
    });

    return () => {
      if (idRef.current) {
        animationController.unregister(idRef.current);
      }
    };
  }, []);
};
