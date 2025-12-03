import React, { useEffect, useRef, useState } from "react";
import { motion, useSpring } from "framer-motion";

const LETTERS = Array.from("ABCDEFGHIJKLMNOPQRSTUVWXYZ");
const NUMBERS = Array.from("1234567890");
// const SPECIAL = [ // Unused"YES", "NO", "GOODBYE"];

type Pt = { x: number; y: number };

function useElementCenters(container: React.RefObject<HTMLDivElement>) {
  const centers = useRef<{ el: HTMLElement; x: number; y: number; label: string }[]>([]);
  
  const register = (el: HTMLElement | null, label: string) => {
    if (!container.current || !el) return;
    const boardRect = container.current.getBoundingClientRect();
    const r = el.getBoundingClientRect();
    centers.current = [
      ...centers.current.filter((c) => c.el !== el),
      {
        el,
        x: r.left - boardRect.left + r.width / 2,
        y: r.top - boardRect.top + r.height / 2,
        label,
      },
    ];
  };

  const nearest = (p: Pt) => {
    if (!centers.current.length) return null;
    let best = centers.current[0];
    let bestD = Infinity;
    for (const c of centers.current) {
      const dx = c.x - p.x;
      const dy = c.y - p.y;
      const d = dx * dx + dy * dy;
      if (d < bestD) {
        bestD = d;
        best = c;
      }
    }
    return best ?? null;
  };

  return { register, nearest };
}

const Planchette: React.FC<{ x: number; y: number; size?: number }> = ({
  x,
  y,
  size = 100,
}) => {
  const sx = useSpring(x, { stiffness: 120, damping: 18, mass: 0.8 });
  const sy = useSpring(y, { stiffness: 120, damping: 18, mass: 0.8 });

  useEffect(() => {
    sx.set(x);
    sy.set(y);
  }, [x, y, sx, sy]);

  return (
    <motion.div
      aria-hidden
      className="absolute -translate-x-1/2 -translate-y-1/2 pointer-events-none"
      style={{ left: sx, top: sy, width: size, height: size }}
    >
      <div className="relative w-full h-full">
        {/* Translucent planchette */}
        <svg
          viewBox="0 0 100 100"
          className="absolute inset-0 w-full h-full"
        >
          <defs>
            <filter id="planchette-glow">
              <feGaussianBlur stdDeviation="4" result="coloredBlur"/>
              <feMerge>
                <feMergeNode in="coloredBlur"/>
                <feMergeNode in="SourceGraphic"/>
              </feMerge>
            </filter>
            <radialGradient id="center-glow" cx="50%" cy="50%">
              <stop offset="0%" stopColor="#00ffff" stopOpacity="1" />
              <stop offset="50%" stopColor="#00d4ff" stopOpacity="0.8" />
              <stop offset="100%" stopColor="#0088ff" stopOpacity="0.4" />
            </radialGradient>
          </defs>
          
          {/* Almost transparent triangle outline */}
          <path
            d="M 50 15 L 85 75 Q 85 85 75 85 L 25 85 Q 15 85 15 75 Z"
            fill="rgba(255, 255, 255, 0.03)"
            stroke="rgba(0, 200, 255, 0.25)"
            strokeWidth="1.5"
            opacity="0.6"
          />
          
          {/* Subtle inner glow */}
          <path
            d="M 50 20 L 80 73 Q 80 82 72 82 L 28 82 Q 20 82 20 73 Z"
            fill="none"
            stroke="rgba(0, 255, 255, 0.15)"
            strokeWidth="1"
            opacity="0.4"
          />
          
          {/* Bright glowing center viewing hole */}
          <circle
            cx="50"
            cy="50"
            r="8"
            fill="url(#center-glow)"
            opacity="0.95"
            filter="url(#planchette-glow)"
          />
          
          {/* Outer glow ring around center */}
          <circle
            cx="50"
            cy="50"
            r="14"
            fill="none"
            stroke="rgba(0, 255, 255, 0.3)"
            strokeWidth="1.5"
            opacity="0.7"
          />
          
          {/* Pulsing outer ring */}
          <circle
            cx="50"
            cy="50"
            r="20"
            fill="none"
            stroke="rgba(0, 255, 255, 0.2)"
            strokeWidth="1"
            opacity="0.5"
          >
            <animate
              attributeName="r"
              values="18;22;18"
              dur="2s"
              repeatCount="indefinite"
            />
            <animate
              attributeName="opacity"
              values="0.5;0.2;0.5"
              dur="2s"
              repeatCount="indefinite"
            />
          </circle>
        </svg>
      </div>
    </motion.div>
  );
};

export interface OuijaBoardBackgroundProps {
  plateUrl?: string;
  onChar?: (ch: string) => void;
  className?: string;
  style?: React.CSSProperties;
}

const OuijaBoardBackground: React.FC<OuijaBoardBackgroundProps> = ({
  plateUrl,
  onChar,
  className = "",
  style,
}) => {
  const ref = useRef<HTMLDivElement | null>(null);
  const { register, nearest } = useElementCenters(ref);
  const [, setHover] = useState<Pt | null>(null);
  const [target, setTarget] = useState<Pt | null>(null);
  const [activeKey, setActiveKey] = useState<string | null>(null);
  const [, setIsIdle] = useState(true);
  const [flickeringKeys, setFlickeringKeys] = useState<Set<string>>(new Set());
  const idleTick = useRef<number>(0);
  const lastMoveTime = useRef<number>(Date.now());

  // Continuous random flickering with varied timing for performance
  useEffect(() => {
    const flashSequence = () => {
      const allKeys = [...LETTERS, ...NUMBERS, "YES", "NO", "GOODBYE"];
      const randomKey = allKeys[Math.floor(Math.random() * allKeys.length)];
      
      // Flash on
      setFlickeringKeys(new Set([randomKey]));
      
      // Flash off after 2+ seconds
      setTimeout(() => {
        setFlickeringKeys(new Set());
      }, 2000 + Math.random() * 500);
      
      // Schedule next flash with varied timing (1-3 seconds gap)
      const nextFlashDelay = 1000 + Math.random() * 2000;
      setTimeout(flashSequence, nextFlashDelay);
    };
    
    // Start first flash after short delay
    const initialTimeout = setTimeout(flashSequence, 500);
    
    return () => {
      clearTimeout(initialTimeout);
    };
  }, []);

  // Idle wandering animation
  useEffect(() => {
    const id = setInterval(() => {
      idleTick.current++;
      
      // Check if mouse hasn't moved in 2 seconds
      const timeSinceMove = Date.now() - lastMoveTime.current;
      const shouldIdle = timeSinceMove > 2000;
      setIsIdle(shouldIdle);
      
      if (shouldIdle && ref.current) {
        const r = ref.current.getBoundingClientRect();
        // Create a more dramatic wandering pattern
        const t: Pt = {
          x: r.width / 2 + Math.sin(idleTick.current / 35) * (r.width * 0.35),
          y: r.height * 0.4 + Math.cos(idleTick.current / 30) * (r.height * 0.25),
        };
        const n = nearest(t);
        if (n) {
          setTarget({ x: n.x, y: n.y });
          setActiveKey(n.label);
        }
      }
    }, 100);
    return () => clearInterval(id);
  }, [nearest]);

  const onMouseMove: React.MouseEventHandler<HTMLDivElement> = (e) => {
    if (!ref.current) return;
    lastMoveTime.current = Date.now();
    setIsIdle(false);
    
    const rect = ref.current.getBoundingClientRect();
    const p = { x: e.clientX - rect.left, y: e.clientY - rect.top };
    setHover(p);
    const n = nearest(p);
    if (n) {
      setTarget({ x: n.x, y: n.y });
      setActiveKey(n.label);
    }
  };

  const handleClick = (label: string) => {
    if (!onChar) return;
    if (label === "YES" || label === "NO" || label === "GOODBYE") {
      onChar(` ${label} `);
    } else {
      onChar(label);
    }
  };

  const rowVariants = {
    hidden: { opacity: 0 },
    show: { opacity: 1, transition: { staggerChildren: 0.03 } },
  };

  const keyVariants = {
    hidden: {
      opacity: 0,
      scale: 0.8,
    },
    show: {
      opacity: 1,
      scale: 1,
      filter: "brightness(2.0)",
      textShadow: "0 0 30px rgba(0,255,255,0.9), 0 0 20px rgba(0,200,255,1), 0 0 10px rgba(255,255,255,0.8)",
    },
    hover: {
      scale: 1.1,
      filter: "brightness(2.5)",
      textShadow: "0 0 40px rgba(0,255,255,1), 0 0 25px rgba(0,200,255,1), 0 0 15px rgba(255,255,255,1)",
    },
    active: {
      opacity: 1,
      scale: 1.4,
      filter: "brightness(3.5) drop-shadow(0 0 12px rgba(0,255,255,1))",
      textShadow: "0 0 60px rgba(0,255,255,1), 0 0 90px rgba(0,200,255,1), 0 0 110px rgba(0,150,255,1), 0 0 20px rgba(255,255,255,1)",
    },
    flicker: {
      opacity: 1,
      scale: 1.6,
      filter: "brightness(5.5) drop-shadow(0 0 20px rgba(255,255,255,1)) drop-shadow(0 0 30px rgba(0,255,255,1))",
      textShadow: "0 0 80px rgba(255,255,255,1), 0 0 100px rgba(0,255,255,1), 0 0 120px rgba(0,200,255,1), 0 0 140px rgba(0,150,255,1), 0 0 160px rgba(255,255,255,0.8)",
      color: "#ffffff",
    },
  };

  const getKeyState = (key: string) => {
    if (activeKey === key) return "active";
    if (flickeringKeys.has(key)) return "flicker";
    return "show";
  };

  return (
    <div
      ref={ref}
      className={`relative overflow-hidden rounded-3xl shadow-[0_30px_80px_rgba(0,0,0,0.6)] ${className}`}
      style={style}
      onMouseMove={onMouseMove}
      onMouseLeave={() => setHover(null)}
    >
      <div className="absolute inset-0 overflow-hidden rounded-3xl">
        {plateUrl ? (
          <div
            className="absolute inset-0 bg-center bg-cover"
            style={{ backgroundImage: `url(${plateUrl})` }}
          />
        ) : (
          <div
            className="absolute inset-0"
            style={{
              background:
                "radial-gradient(140% 90% at 50% 10%, rgba(255,230,190,0.06), transparent 60%)," +
                "linear-gradient(135deg, #2b2119 0%, #1b1511 35%, #0f0c0a 100%)",
            }}
          />
        )}
        <div
          className="absolute inset-0 opacity-[0.22] mix-blend-multiply"
          style={{
            backgroundImage:
              "repeating-linear-gradient(90deg, rgba(0,0,0,0.09) 0 1px, transparent 1px 6px)",
          }}
        />
        <div className="absolute inset-0 rounded-3xl border-4 border-[#5e4a37]/60 shadow-[inset_0_0_0_1px_rgba(255,255,255,0.06),inset_0_0_32px_rgba(0,0,0,0.5)]" />
        <div
          className="absolute inset-0 rounded-3xl pointer-events-none"
          style={{
            background:
              "radial-gradient(1200px 700px at 50% 20%, rgba(0,190,255,0.05), transparent 60%)," +
              "radial-gradient(900px 600px at 70% 80%, rgba(255,150,0,0.04), transparent 60%)," +
              "linear-gradient(180deg, rgba(0,0,0,0.25), rgba(0,0,0,0.65))",
          }}
        />
      </div>

      <div className="absolute inset-0">
        {/* Top arc of letters A-M */}
        <motion.div
          variants={rowVariants}
          initial="hidden"
          animate="show"
          className="absolute left-1/2 -translate-x-1/2 top-[15%] w-[85%] max-w-[900px]"
        >
          <div className="relative h-24 md:h-32">
            {LETTERS.slice(0, 13).map((ch, i) => {
              const angle = (i / 12) * 140 - 70; // Arc from -70° to +70°
              const radius = 85; // Percentage
              const x = 50 + Math.sin((angle * Math.PI) / 180) * radius;
              const y = 100 - Math.cos((angle * Math.PI) / 180) * radius * 0.6;
              
              return (
                <motion.button
                  key={ch}
                  variants={keyVariants}
                  whileHover="hover"
                  onClick={() => handleClick(ch)}
                  ref={(el) => el && register(el, ch)}
                  className="absolute font-serif text-[#efe7d2] drop-shadow-[0_0_12px_rgba(0,200,255,0.35)] text-base md:text-xl tracking-wider"
                  style={{
                    left: `${x}%`,
                    top: `${y}%`,
                    transform: `translate(-50%, -50%) rotate(${angle}deg)`,
                  }}
                >
                  <span style={{ display: 'inline-block', transform: `rotate(-${angle}deg)` }}>
                    {ch}
                  </span>
                </motion.button>
              );
            })}
          </div>
        </motion.div>

        {/* Bottom arc of letters N-Z */}
        <motion.div
          variants={rowVariants}
          initial="hidden"
          animate="show"
          className="absolute left-1/2 -translate-x-1/2 top-[32%] w-[85%] max-w-[900px]"
        >
          <div className="relative h-24 md:h-32">
            {LETTERS.slice(13).map((ch, i) => {
              const angle = (i / 12) * 140 - 70;
              const radius = 85;
              const x = 50 + Math.sin((angle * Math.PI) / 180) * radius;
              const y = 100 - Math.cos((angle * Math.PI) / 180) * radius * 0.6;
              
              return (
                <motion.button
                  key={ch}
                  variants={keyVariants}
                  animate={getKeyState(ch)}
                  whileHover="hover"
                  onClick={() => handleClick(ch)}
                  ref={(el) => el && register(el, ch)}
                  className="absolute font-serif text-[#efe7d2] drop-shadow-[0_0_12px_rgba(0,200,255,0.35)] text-base md:text-xl tracking-wider transition-all duration-200"
                  style={{
                    left: `${x}%`,
                    top: `${y}%`,
                    transform: `translate(-50%, -50%) rotate(${angle}deg)`,
                  }}
                >
                  <span style={{ display: 'inline-block', transform: `rotate(-${angle}deg)` }}>
                    {ch}
                  </span>
                </motion.button>
              );
            })}
          </div>
        </motion.div>

        {/* Numbers split - Left side (1-5) */}
        <motion.div
          variants={rowVariants}
          initial="hidden"
          animate="show"
          className="absolute left-[10%] top-[52%] flex gap-3 md:gap-5"
        >
          {NUMBERS.slice(0, 5).map((n) => (
            <motion.button
              key={n}
              variants={keyVariants}
              animate={getKeyState(n)}
              whileHover="hover"
              onClick={() => handleClick(n)}
              ref={(el) => el && register(el, n)}
              className="font-serif text-[#efe7d2] drop-shadow-[0_0_12px_rgba(0,200,255,0.35)] text-sm md:text-lg transition-all duration-200"
            >
              {n}
            </motion.button>
          ))}
        </motion.div>

        {/* Numbers split - Right side (6-0) */}
        <motion.div
          variants={rowVariants}
          initial="hidden"
          animate="show"
          className="absolute right-[10%] top-[52%] flex gap-3 md:gap-5"
        >
          {NUMBERS.slice(5).map((n) => (
            <motion.button
              key={n}
              variants={keyVariants}
              animate={getKeyState(n)}
              whileHover="hover"
              onClick={() => handleClick(n)}
              ref={(el) => el && register(el, n)}
              className="font-serif text-[#efe7d2] drop-shadow-[0_0_12px_rgba(0,200,255,0.35)] text-sm md:text-lg transition-all duration-200"
            >
              {n}
            </motion.button>
          ))}
        </motion.div>

        {/* YES on left, NO on right */}
        <motion.div
          variants={rowVariants}
          initial="hidden"
          animate="show"
          className="absolute left-[15%] top-[68%]"
        >
          <motion.button
            variants={keyVariants}
            animate={getKeyState("YES")}
            whileHover="hover"
            onClick={() => handleClick("YES")}
            ref={(el) => el && register(el, "YES")}
            className="font-serif text-[#efe7d2] drop-shadow-[0_0_12px_rgba(0,200,255,0.35)] text-xl md:text-2xl tracking-widest transition-all duration-200"
          >
            YES
          </motion.button>
        </motion.div>

        <motion.div
          variants={rowVariants}
          initial="hidden"
          animate="show"
          className="absolute right-[15%] top-[68%]"
        >
          <motion.button
            variants={keyVariants}
            animate={getKeyState("NO")}
            whileHover="hover"
            onClick={() => handleClick("NO")}
            ref={(el) => el && register(el, "NO")}
            className="font-serif text-[#efe7d2] drop-shadow-[0_0_12px_rgba(0,200,255,0.35)] text-xl md:text-2xl tracking-widest transition-all duration-200"
          >
            NO
          </motion.button>
        </motion.div>

        {/* GOODBYE at bottom center */}
        <motion.div
          variants={rowVariants}
          initial="hidden"
          animate="show"
          className="absolute left-1/2 -translate-x-1/2 bottom-[12%]"
        >
          <motion.button
            variants={keyVariants}
            animate={getKeyState("GOODBYE")}
            whileHover="hover"
            onClick={() => handleClick("GOODBYE")}
            ref={(el) => el && register(el, "GOODBYE")}
            className="font-serif text-[#efe7d2] drop-shadow-[0_0_12px_rgba(0,200,255,0.35)] text-lg md:text-xl tracking-[0.3em] transition-all duration-200"
          >
            GOODBYE
          </motion.button>
        </motion.div>
      </div>

      {target && <Planchette x={target.x} y={target.y} size={88} />}

      {/* Eerie fog layers */}
      <div className="absolute inset-0 mix-blend-screen opacity-60 pointer-events-none">
        <div className="absolute -inset-1 animate-[fogA_28s_linear_infinite] bg-[radial-gradient(60%_40%_at_50%_50%,rgba(190,230,255,0.12),transparent)]" />
        <div className="absolute -inset-1 animate-[fogB_36s_linear_infinite] bg-[radial-gradient(80%_60%_at_60%_40%,rgba(0,210,255,0.08),transparent)]" />
      </div>

      {/* Blood drip effect at top */}
      <div className="absolute top-0 left-0 right-0 h-32 pointer-events-none opacity-30">
        <div className="absolute top-0 left-[15%] w-1 h-24 bg-gradient-to-b from-[#6a0000] to-transparent animate-[drip1_8s_ease-in-out_infinite]" />
        <div className="absolute top-0 left-[45%] w-1 h-32 bg-gradient-to-b from-[#6a0000] to-transparent animate-[drip2_10s_ease-in-out_infinite]" />
        <div className="absolute top-0 left-[75%] w-1 h-20 bg-gradient-to-b from-[#6a0000] to-transparent animate-[drip3_12s_ease-in-out_infinite]" />
      </div>

      {/* Scratches/cracks overlay */}
      <div className="absolute inset-0 pointer-events-none opacity-20">
        <svg width="100%" height="100%" className="absolute inset-0">
          <defs>
            <filter id="roughen">
              <feTurbulence type="fractalNoise" baseFrequency="0.05" numOctaves="3" result="noise" />
              <feDisplacementMap in="SourceGraphic" in2="noise" scale="3" />
            </filter>
          </defs>
          <line x1="10%" y1="20%" x2="25%" y2="35%" stroke="#000" strokeWidth="0.5" opacity="0.4" filter="url(#roughen)" />
          <line x1="70%" y1="15%" x2="85%" y2="25%" stroke="#000" strokeWidth="0.5" opacity="0.3" filter="url(#roughen)" />
          <line x1="40%" y1="70%" x2="60%" y2="85%" stroke="#000" strokeWidth="0.5" opacity="0.4" filter="url(#roughen)" />
        </svg>
      </div>

      {/* Pulsing vignette */}
      <div className="absolute inset-0 pointer-events-none animate-[pulse_4s_ease-in-out_infinite]">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_0%,transparent_40%,rgba(0,0,0,0.6)_100%)]" />
      </div>

      {/* Random shadow flickers */}
      <div className="absolute inset-0 pointer-events-none animate-[shadowFlicker_3s_ease-in-out_infinite] opacity-20">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_30%,rgba(0,0,0,0.8),transparent_50%)]" />
      </div>

      <style>{`
        @keyframes fogA { 
          from { transform: translate3d(-3%, -2%, 0); } 
          to { transform: translate3d(3%, 2%, 0); } 
        }
        @keyframes fogB { 
          from { transform: translate3d(2%, 3%, 0); } 
          to { transform: translate3d(-2%, -3%, 0); } 
        }
        @keyframes drip1 {
          0%, 100% { transform: translateY(-100%); opacity: 0; }
          10% { opacity: 0.6; }
          50% { transform: translateY(0); opacity: 0.3; }
          80% { opacity: 0; }
        }
        @keyframes drip2 {
          0%, 100% { transform: translateY(-100%); opacity: 0; }
          15% { opacity: 0.5; }
          60% { transform: translateY(0); opacity: 0.2; }
          85% { opacity: 0; }
        }
        @keyframes drip3 {
          0%, 100% { transform: translateY(-100%); opacity: 0; }
          20% { opacity: 0.7; }
          55% { transform: translateY(0); opacity: 0.4; }
          90% { opacity: 0; }
        }
        @keyframes shadowFlicker {
          0%, 100% { opacity: 0.1; }
          25% { opacity: 0.3; }
          50% { opacity: 0.15; }
          75% { opacity: 0.25; }
        }
      `}</style>
    </div>
  );
};

export default OuijaBoardBackground;
