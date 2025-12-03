import { useState, useEffect } from "react";

export const useAuthEffects = () => {
  const [cursorPos, setCursorPos] = useState({ x: 0, y: 0 });
  const [delayedCursor, setDelayedCursor] = useState({ x: 0, y: 0 });
  const [glitch, setGlitch] = useState(false);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => setCursorPos({ x: e.clientX, y: e.clientY });
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  useEffect(() => {
    const timer = setTimeout(() => setDelayedCursor(cursorPos), 150);
    return () => clearTimeout(timer);
  }, [cursorPos]);

  useEffect(() => {
    const interval = setInterval(() => {
      if (Math.random() > 0.95) {
        setGlitch(true);
        setTimeout(() => setGlitch(false), 100);
      }
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  return { cursorPos, delayedCursor, glitch };
};
