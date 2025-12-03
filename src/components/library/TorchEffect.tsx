import React, { useEffect, useState, useRef } from "react";

interface TorchEffectProps {
  active: boolean;
  position: { x: number; y: number };
}

export const TorchEffect: React.FC<TorchEffectProps> = ({ active, position }) => {
  if (!active) return null;

  return (
    <>
      {/* Single torch glow */}
      <div
        className="pointer-events-none fixed z-40"
        style={{
          left: position.x,
          top: position.y,
          transform: "translate(-50%, -50%)",
          width: "500px",
          height: "500px",
          background: "radial-gradient(circle, rgba(255,220,150,0.7) 0%, rgba(255,180,80,0.4) 30%, transparent 70%)",
        }}
      />
      {/* Dark overlay with hole */}
      <div
        className="pointer-events-none fixed inset-0 z-10"
        style={{
          background: `radial-gradient(circle 350px at ${position.x}px ${position.y}px, transparent 0%, rgba(0,0,0,0.85) 100%)`,
        }}
      />
    </>
  );
};

export const useTorchPosition = () => {
  const [torchPos, setTorchPos] = useState({ x: window.innerWidth / 2, y: window.innerHeight / 2 });
  const [torchActive, setTorchActive] = useState(false);
  const lastUpdateRef = useRef<number>(0);

  useEffect(() => {
    let animationFrameId: number;

    const handleMouseMove = (e: MouseEvent) => {
      const now = performance.now();
      
      // Throttle to 30fps (33ms)
      if (now - lastUpdateRef.current < 33) {
        return;
      }

      // Cancel any pending animation frame
      if (animationFrameId) {
        cancelAnimationFrame(animationFrameId);
      }

      // Schedule update
      animationFrameId = requestAnimationFrame(() => {
        setTorchPos({ x: e.clientX, y: e.clientY });
        if (!torchActive) setTorchActive(true);
        lastUpdateRef.current = now;
      });
    };

    window.addEventListener("mousemove", handleMouseMove, { passive: true });
    
    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      if (animationFrameId) {
        cancelAnimationFrame(animationFrameId);
      }
    };
  }, [torchActive]);

  return { torchPos, torchActive };
};
