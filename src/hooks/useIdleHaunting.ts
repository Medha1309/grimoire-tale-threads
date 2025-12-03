import { useState, useEffect, useCallback } from 'react';

export type HauntingPhase = 'none' | 'instability' | 'fracture' | 'collapse' | 'void';

export const useIdleHaunting = () => {
  const [phase, setPhase] = useState<HauntingPhase>('none');
  const [idleTime, setIdleTime] = useState(0);

  const resetHaunting = useCallback(() => {
    setPhase('none');
    setIdleTime(0);
  }, []);

  useEffect(() => {
    let idleTimer: NodeJS.Timeout;

    const startIdleTimer = () => {
      idleTimer = setInterval(() => {
        setIdleTime(prev => {
          const newTime = prev + 1;
          
          // Phase transitions based on idle time
          if (newTime >= 90) {
            setPhase('void');
          } else if (newTime >= 60) {
            setPhase('collapse');
          } else if (newTime >= 30) {
            setPhase('fracture');
          } else if (newTime >= 15) {
            setPhase('instability');
          }
          
          return newTime;
        });
      }, 1000);
    };

    const handleActivity = () => {
      resetHaunting();
      clearInterval(idleTimer);
      startIdleTimer();
    };

    // Track user activity
    const events = ['mousedown', 'mousemove', 'keypress', 'scroll', 'touchstart', 'click'];
    events.forEach(event => {
      window.addEventListener(event, handleActivity, { passive: true });
    });

    startIdleTimer();

    return () => {
      clearInterval(idleTimer);
      events.forEach(event => {
        window.removeEventListener(event, handleActivity);
      });
    };
  }, [resetHaunting]);

  return { phase, idleTime, resetHaunting };
};
