/**
 * Gothic Background - Animated fog and particle effects
 */

import { useEffect, useRef } from 'react';

interface GothicBackgroundProps {
  enabled?: boolean;
}

interface Particle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  size: number;
  life: number;
  hue: number;
}

export function GothicBackground({ enabled = true }: GothicBackgroundProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const rafRef = useRef<number | null>(null);
  const particlesRef = useRef<Particle[]>([]);

  useEffect(() => {
    if (!enabled) return;

    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Set canvas size
    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    resize();
    window.addEventListener('resize', resize);

    // Initialize particles
    const initParticles = () => {
      particlesRef.current = [];
      for (let i = 0; i < 50; i++) {
        particlesRef.current.push({
          x: Math.random() * canvas.width,
          y: Math.random() * canvas.height,
          vx: (Math.random() - 0.5) * 0.3,
          vy: -0.1 - Math.random() * 0.5,
          size: 20 + Math.random() * 80,
          life: Math.random(),
          hue: 340 + Math.random() * 30
        });
      }
    };
    initParticles();

    // Animation loop
    const animate = (time: number) => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      // Vignette
      const gradient = ctx.createRadialGradient(
        canvas.width / 2,
        canvas.height / 2,
        Math.min(canvas.width, canvas.height) * 0.2,
        canvas.width / 2,
        canvas.height / 2,
        Math.max(canvas.width, canvas.height)
      );
      gradient.addColorStop(0, 'rgba(0,0,0,0)');
      gradient.addColorStop(1, 'rgba(0,0,0,0.7)');
      ctx.fillStyle = gradient;
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      // Fog layers
      for (let i = 0; i < 5; i++) {
        ctx.globalAlpha = 0.02 + 0.01 * Math.sin(time / 1000 + i);
        ctx.fillStyle = 'rgba(220, 220, 230, 0.04)';
        const x = (Math.sin(time / 2000 + i) * 0.5 + 0.5) * canvas.width - canvas.width * 0.5;
        const y = canvas.height * 0.2 + i * 50;
        ctx.fillRect(x, y, canvas.width * 1.2, 80);
      }

      // Particles (embers/ghosts)
      particlesRef.current.forEach((p) => {
        p.x += p.vx;
        p.y += p.vy;
        p.life -= 0.002;

        // Reset particle if dead or out of bounds
        if (p.life <= 0 || p.y < -100) {
          p.x = Math.random() * canvas.width;
          p.y = canvas.height + Math.random() * 100;
          p.vx = (Math.random() - 0.5) * 0.4;
          p.vy = -0.1 - Math.random() * 0.6;
          p.life = 1;
          p.size = 20 + Math.random() * 80;
        }

        // Draw particle with glow
        const grad = ctx.createRadialGradient(p.x, p.y, 0, p.x, p.y, p.size);
        grad.addColorStop(0, `hsla(${p.hue}, 70%, 50%, ${0.15 * p.life})`);
        grad.addColorStop(1, 'rgba(100, 0, 0, 0)');

        ctx.globalCompositeOperation = 'lighter';
        ctx.fillStyle = grad;
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size * 0.6, 0, Math.PI * 2);
        ctx.fill();
        ctx.globalCompositeOperation = 'source-over';
      });

      ctx.globalAlpha = 1;
      rafRef.current = requestAnimationFrame(animate);
    };

    rafRef.current = requestAnimationFrame(animate);

    return () => {
      window.removeEventListener('resize', resize);
      if (rafRef.current) {
        cancelAnimationFrame(rafRef.current);
      }
    };
  }, [enabled]);

  if (!enabled) return null;

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 pointer-events-none -z-10 opacity-60"
      style={{ mixBlendMode: 'screen' }}
    />
  );
}
