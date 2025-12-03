import React, { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { SpiderField } from "../components/Creatures";
import { SwingingLamp, FliesAroundLamp } from "../components/UIComponents";
import { useNavigation } from "../hooks/useNavigation";

const FlickerOverlay = React.memo(({ flicker }: { flicker: boolean }) => (
  <AnimatePresence>
    {flicker && (
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: [0, 0.9, 0, 0.8, 0.5, 0] }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.3 }}
        className="absolute inset-0 bg-black" 
        style={{ 
          willChange: 'opacity',
          mixBlendMode: 'multiply',
          filter: 'brightness(0.3)'
        }}
      />
    )}
  </AnimatePresence>
));
FlickerOverlay.displayName = 'FlickerOverlay';

const LandingComponent: React.FC = () => {
  const { goTo } = useNavigation();
  const [flicker, setFlicker] = useState(false);

  useEffect(() => {
    let kill = false;
    let timeoutId: number;
    let intervalId: number;
    
    const runBurst = () => {
      if (kill) return;
      setFlicker(true);
      const toggles = 5 + Math.floor(Math.random() * 4);
      let n = 0;
      intervalId = window.setInterval(() => {
        setFlicker((v) => !v);
        if (++n > toggles) {
          clearInterval(intervalId);
          setFlicker(false);
          const next = 6000 + Math.random() * 12000;
          timeoutId = window.setTimeout(runBurst, next);
        }
      }, 120 + Math.random() * 140);
    };
    timeoutId = window.setTimeout(runBurst, 1800);
    return () => { 
      kill = true; 
      clearTimeout(timeoutId);
      clearInterval(intervalId);
    };
  }, []);

  const handleEnter = React.useCallback(() => {
    goTo.stories();
  }, [goTo]);

  return (
    <section className="relative min-h-[90vh] overflow-hidden bg-black text-zinc-100">
      <SwingingLamp />
      <FliesAroundLamp count={12} />

      {/* Film grain texture */}
      <div 
        className="fixed inset-0 pointer-events-none"
        style={{
          backgroundImage: `url('data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="100" height="100"><filter id="noise"><feTurbulence type="fractalNoise" baseFrequency="0.9" /></filter><rect width="100%" height="100%" filter="url(%23noise)"/></svg>')`,
          opacity: 0.02,
          zIndex: 1,
        }}
      />

      <div className="relative z-10 mx-auto flex min-h-[85vh] max-w-5xl flex-col items-center justify-center gap-12 sm:gap-16 px-4 sm:px-6 text-center">
        <motion.div
          initial={{ opacity: 0, filter: "blur(12px)" }}
          animate={{ opacity: 1, filter: "blur(0px)" }}
          transition={{ duration: 2, delay: 0.6 }}
          className="relative flex flex-col items-center gap-4"
        >
          <div className="relative">
            <h1 
              className="font-serif text-8xl tracking-[0.5em] md:text-9xl select-none"
              style={{
                color: '#8B0000',
              }}
            >
              GRIMOIRE
            </h1>
            <FlickerOverlay flicker={flicker} />
          </div>
          <div className="relative flex flex-col items-center gap-3">
            <p className="font-serif text-sm tracking-wide text-zinc-600">
              The stories I crave, the secrets I keep, the darkness I write when I cannot sleep.
            </p>
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ 
                opacity: [0, 1, 1, 0]
              }}
              transition={{ 
                duration: 6,
                times: [0, 0.25, 0.75, 1],
                delay: 1.5
              }}
              className="font-serif text-xs italic tracking-wider"
              style={{ 
                fontFamily: 'Georgia, serif',
                color: '#8B0000',
                opacity: 0.4
              }}
            >
              — GRIMOIRE
            </motion.p>
            <FlickerOverlay flicker={flicker} />
          </div>
        </motion.div>

        <motion.button
          onClick={handleEnter}
          initial={{ opacity: 0 }}
          animate={{ 
            opacity: 1,
            scale: [1, 1.015, 1]
          }}
          transition={{ 
            opacity: { duration: 1, delay: 2.2 },
            scale: { duration: 2, repeat: Infinity, ease: "easeInOut" }
          }}
          className="rounded border border-zinc-800/80 bg-black/60 px-10 py-3 font-serif text-sm tracking-[0.3em] text-zinc-400 backdrop-blur transition hover:border-zinc-700 hover:bg-zinc-950/80 hover:text-zinc-200"
          style={{ willChange: 'transform, opacity' }}
        >
          ENTER
        </motion.button>
      </div>

      <SpiderField count={8} />
    </section>
  );
};

export const Landing = React.memo(LandingComponent);
Landing.displayName = 'Landing';
