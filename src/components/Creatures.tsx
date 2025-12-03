import { useMemo, memo } from "react";
import { motion } from "framer-motion";

// Memoized Spider SVG Component - Optimized and smaller
interface SpiderSVGProps {
  bodyFill: string;
  accent: string;
  species: "house" | "widow";
  gid: number;
  size?: number;
}

export const SpiderSVG = memo<SpiderSVGProps>(({ bodyFill, accent, species, gid, size = 32 }) => (
  <svg width={size} height={size} viewBox="0 0 48 48" fill="none" className="opacity-100 [filter:drop-shadow(0_2px_4px_rgba(0,0,0,0.8))_drop-shadow(0_0_1px_rgba(255,255,255,0.2))]">
    <defs>
      <radialGradient id={`abd${gid}`} cx="0" cy="0" r="1" gradientUnits="userSpaceOnUse" gradientTransform="translate(24 28) rotate(90) scale(12 9)">
        <stop offset="0" stopColor="#3a3a3a"/>
        <stop offset="1" stopColor={bodyFill}/>
      </radialGradient>
    </defs>
    <ellipse cx="24" cy="28" rx="10" ry="12" fill={`url(#abd${gid})`} stroke="#000" strokeWidth="1" />
    <ellipse cx="24" cy="25" rx="9" ry="2" fill="#000" opacity="0.3" />
    <ellipse cx="24" cy="29" rx="9" ry="2" fill="#000" opacity="0.3" />
    <ellipse cx="24" cy="33" rx="8" ry="2" fill="#000" opacity="0.3" />
    
    {species === "widow" && (
      <g>
        <path d="M20 27 L28 27 L24 31 Z" fill={accent} opacity=".7" />
        <path d="M20 31 L28 31 L24 27 Z" fill={accent} opacity=".7" />
      </g>
    )}
    
    <ellipse cx="24" cy="16" rx="7" ry="7" fill="#2a2a2a" stroke="#000" strokeWidth="1" />
    <circle cx="22" cy="14" r="2" fill="#0a0a0a" />
    <circle cx="26" cy="14" r="2" fill="#0a0a0a" />
    <circle cx="20" cy="16" r="1.2" fill="#0a0a0a" />
    <circle cx="28" cy="16" r="1.2" fill="#0a0a0a" />
    <circle cx="22.5" cy="13.5" r="0.5" fill="#4a4a4a" />
    <circle cx="26.5" cy="13.5" r="0.5" fill="#4a4a4a" />
    
    <g fill="none" stroke="#2a2a2a" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5">
      {[
        [16,18,8,16,5,10],
        [16,22,8,24,7,30],
        [18,26,11,32,10,38],
        [20,30,14,36,14,42],
        [32,18,40,16,43,10],
        [32,22,40,24,41,30],
        [30,26,37,32,38,38],
        [28,30,34,36,34,42]
      ].map((pts,idx)=>{ 
        const [x1,y1,x2,y2,x3,y3]=pts; 
        return(
          <g key={idx}>
            <path d={`M${x1} ${y1} Q ${x2} ${y2} ${x3} ${y3}`} />
            <circle cx={x2} cy={y2} r="1.5" fill="#0a0a0a" />
          </g>
        ); 
      })}
    </g>
    
    <g stroke="#4a4a4a" strokeWidth="0.7" opacity="0.6">
      {Array.from({length: 16}).map((_,i)=>{
        const angle = (i/16) * Math.PI * 2;
        const x1 = 24 + Math.cos(angle) * 8;
        const y1 = 28 + Math.sin(angle) * 10;
        const x2 = 24 + Math.cos(angle) * 11;
        const y2 = 28 + Math.sin(angle) * 13;
        return <line key={i} x1={x1} y1={y1} x2={x2} y2={y2} />;
      })}
    </g>
    
    <ellipse cx="24" cy="24" rx="14" ry="16" fill="none" stroke="#3a3a3a" strokeWidth="0.5" opacity="0.2" />
  </svg>
));

SpiderSVG.displayName = 'SpiderSVG';

// Optimized Spider component with memoized path calculation - Smaller size
const Spider = memo<{ color?: 'default' | 'pink' | 'lavender'; size?: number; seed?: number }>(({ color = 'default', size = 32, seed = 0 }) => {
  const config = useMemo(() => {
    // Use seed for deterministic randomness
    const seededRandom = (offset: number) => ((seed + offset) * 9301 + 49297) % 233280 / 233280;
    
    const delay = seededRandom(1) * 8 + 1;
    const dur = 35 + seededRandom(2) * 25;
    const edge = ["top", "right", "bottom", "left"][Math.floor(seededRandom(3) * 4)] as "top" | "right" | "bottom" | "left";
    const species = ["house", "widow"][Math.floor(seededRandom(4) * 2)] as "house" | "widow";
    const scale = species === "widow" ? 0.6 + seededRandom(5) * 0.25 : 0.5 + seededRandom(6) * 0.25;
    const gid = Math.floor(seededRandom(7) * 100000);
    
    let bodyFill, accent;
    if (color === 'pink') {
      bodyFill = "#ff1493";
      accent = "#ff69b4";
    } else if (color === 'lavender') {
      bodyFill = "#c9a0dc";
      accent = "#e5d4ed";
    } else {
      bodyFill = species === "widow" ? "#2a1515" : "#3a3a3a";
      accent = species === "widow" ? "#aa0000" : "#4a4a4a";
    }
    
    const startPos = seededRandom(8) * 80 + 10;
    let path;
    
    switch(edge) {
      case "top":
        path = {
          start: { x: startPos, y: 0 },
          points: [
            { x: startPos + 15 + seededRandom(9) * 10, y: 0 + seededRandom(10) * 3 },
            { x: startPos + 30 + seededRandom(11) * 15, y: 0 + seededRandom(12) * 2 },
            { x: startPos + 45 + seededRandom(13) * 10, y: 0 + seededRandom(14) * 3 },
            { x: (startPos + 60) % 100, y: 0 + seededRandom(15) * 2 }
          ],
          rotation: 90
        };
        break;
      case "right":
        path = {
          start: { x: 100, y: startPos },
          points: [
            { x: 100 - seededRandom(9) * 3, y: startPos + 15 + seededRandom(10) * 10 },
            { x: 100 - seededRandom(11) * 2, y: startPos + 30 + seededRandom(12) * 15 },
            { x: 100 - seededRandom(13) * 3, y: startPos + 45 + seededRandom(14) * 10 },
            { x: 100 - seededRandom(15) * 2, y: (startPos + 60) % 100 }
          ],
          rotation: 180
        };
        break;
      case "bottom":
        path = {
          start: { x: startPos, y: 100 },
          points: [
            { x: startPos - 15 - seededRandom(9) * 10, y: 100 - seededRandom(10) * 3 },
            { x: startPos - 30 - seededRandom(11) * 15, y: 100 - seededRandom(12) * 2 },
            { x: startPos - 45 - seededRandom(13) * 10, y: 100 - seededRandom(14) * 3 },
            { x: Math.max(0, startPos - 60), y: 100 - seededRandom(15) * 2 }
          ],
          rotation: -90
        };
        break;
      case "left":
      default:
        path = {
          start: { x: 0, y: startPos },
          points: [
            { x: 0 + seededRandom(9) * 3, y: startPos - 15 - seededRandom(10) * 10 },
            { x: 0 + seededRandom(11) * 2, y: startPos - 30 - seededRandom(12) * 15 },
            { x: 0 + seededRandom(13) * 3, y: startPos - 45 - seededRandom(14) * 10 },
            { x: 0 + seededRandom(15) * 2, y: Math.max(0, startPos - 60) }
          ],
          rotation: 0
        };
    }
    
    return { delay, dur, species, scale, bodyFill, accent, gid, path };
  }, [color, size, seed]);

  return (
    <motion.div
      initial={{ 
        x: `${config.path.start.x}vw`, 
        y: `${config.path.start.y}vh`, 
        opacity: 0,
        rotate: config.path.rotation
      }}
      animate={{
        x: [
          `${config.path.start.x}vw`,
          `${config.path.points[0].x}vw`,
          `${config.path.points[1].x}vw`,
          `${config.path.points[2].x}vw`,
          `${config.path.points[3].x}vw`,
          `${config.path.start.x}vw`
        ],
        y: [
          `${config.path.start.y}vh`,
          `${config.path.points[0].y}vh`,
          `${config.path.points[1].y}vh`,
          `${config.path.points[2].y}vh`,
          `${config.path.points[3].y}vh`,
          `${config.path.start.y}vh`
        ],
        opacity: [0.7, 0.8, 0.9, 0.8, 0.7, 0.6],
        rotate: [
          config.path.rotation,
          config.path.rotation + (config.scale - 0.5) * 5,
          config.path.rotation + (config.scale - 0.6) * 5,
          config.path.rotation + (config.scale - 0.55) * 5,
          config.path.rotation + (config.scale - 0.65) * 5,
          config.path.rotation
        ]
      }}
      transition={{ 
        duration: config.dur, 
        repeat: Infinity, 
        ease: "linear", 
        delay: config.delay,
        times: [0, 0.2, 0.4, 0.6, 0.8, 1]
      }}
      className="pointer-events-none fixed z-50"
      style={{ transform: `scale(${config.scale})` }}
    >
      <SpiderSVG 
        bodyFill={config.bodyFill} 
        accent={config.accent} 
        species={config.species} 
        gid={config.gid}
        size={size}
      />
    </motion.div>
  );
});

Spider.displayName = 'Spider';

// Optimized SpiderField with reduced count and configurable size
export const SpiderField = memo<{ count?: number; color?: 'default' | 'pink' | 'lavender'; size?: number }>(({ count = 6, color = 'default', size = 32 }) => {
  const spiders = useMemo(() => 
    Array.from({ length: count }, (_, i) => ({ id: i, color, size, seed: i * 12345 })),
    [count, color, size]
  );
  
  return (
    <div className="pointer-events-none fixed inset-0 z-[45]">
      {spiders.map((spider) => (
        <Spider key={spider.id} color={spider.color} size={spider.size} seed={spider.seed} />
      ))}
    </div>
  );
});

SpiderField.displayName = 'SpiderField';

// Optimized Flies with reduced count
export const DirtyFlies = memo<{ count?: number }>(({ count = 6 }) => {
  const flies = useMemo(() => 
    Array.from({ length: count }).map((_, i) => {
      // Use deterministic seeded random
      const seededRandom = (offset: number) => ((i * 9301 + offset * 49297) % 233280) / 233280;
      return {
        id: i,
        x: seededRandom(1) * 90 + 5,
        y: seededRandom(2) * 70 + 10,
        r: 1.5 + seededRandom(3) * 1.5,
        s: 6 + seededRandom(4) * 8,
      };
    }), 
    [count]
  );

  const keyframes = useMemo(() => 
    flies.map((f) => {
      const seededRandom = (offset: number) => ((f.id * 9301 + offset * 49297) % 233280) / 233280;
      return `@keyframes fly${f.id}{0%{transform:translate3d(0,0,0) scale(1)}35%{transform:translate3d(${(seededRandom(5)*60-30).toFixed(0)}px, ${(seededRandom(6)*40-20).toFixed(0)}px,0) scale(1.1)}70%{transform:translate3d(${(seededRandom(7)*70-35).toFixed(0)}px, ${(seededRandom(8)*50-25).toFixed(0)}px,0) scale(.95)}100%{transform:translate3d(${(seededRandom(9)*50-25).toFixed(0)}px, ${(seededRandom(10)*30-15).toFixed(0)}px,0) scale(1)}}`;
    }).join("\n"),
    [flies]
  );

  return (
    <div className="pointer-events-none absolute inset-0 z-20" aria-hidden>
      {flies.map((f) => (
        <span
          key={f.id}
          className="absolute rounded-full bg-zinc-400"
          style={{
            width: f.r,
            height: f.r,
            left: `${f.x}%`,
            top: `${f.y}%`,
            filter: "grayscale(1) brightness(0.6)",
            animation: `fly${f.id} ${f.s}s ease-in-out ${(f.id * 0.17).toFixed(2)}s infinite alternate`,
            willChange: 'transform',
          }}
        />
      ))}
      <style>{keyframes}</style>
    </div>
  );
});

DirtyFlies.displayName = 'DirtyFlies';
