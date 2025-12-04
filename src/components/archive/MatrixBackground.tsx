import { useEffect, useRef } from "react";

type Props = { enabled?: boolean; className?: string };

export default function MatrixBackground({ enabled = true, className = "" }: Props) {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const rafRef = useRef<number | null>(null);

  useEffect(() => {
    if (!enabled) return;

    const canvas = canvasRef.current!;
    const ctx = canvas.getContext("2d")!;
    let width = (canvas.width = canvas.clientWidth);
    let height = (canvas.height = canvas.clientHeight);

    const fontSize = 14;
    const columns = Math.floor(width / fontSize);
    const drops = Array(columns)
      .fill(0)
      .map(() => Math.random() * height);
    const chars = "01アイウエオカキクケコ".split("");

    function resize() {
      width = canvas.width = canvas.clientWidth;
      height = canvas.height = canvas.clientHeight;
    }

    let last = performance.now();
    function draw(now: number) {
      const dt = now - last;
      last = now;

      ctx.fillStyle = "rgba(0,0,0,0.06)";
      ctx.fillRect(0, 0, width, height);
      ctx.fillStyle = "rgba(0, 255, 150, 0.09)";
      ctx.font = `${fontSize}px monospace`;

      for (let i = 0; i < drops.length; i++) {
        const text = chars[(Math.random() * chars.length) | 0];
        const x = i * fontSize;
        const y = drops[i] * fontSize;
        ctx.fillText(text, x, y);
        drops[i] =
          drops[i] > height / fontSize
            ? 0
            : drops[i] + (dt / 70) * (1 + Math.random() * 0.9);
      }
      rafRef.current = requestAnimationFrame(draw);
    }

    window.addEventListener("resize", resize);
    rafRef.current = requestAnimationFrame(draw);

    return () => {
      window.removeEventListener("resize", resize);
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
    };
  }, [enabled]);

  return (
    <canvas
      aria-hidden
      ref={canvasRef}
      className={`pointer-events-none fixed inset-0 -z-10 opacity-60 ${className}`}
      style={{ width: "100%", height: "100%" }}
    />
  );
}
