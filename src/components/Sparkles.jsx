import { useEffect, useRef } from 'react';
import { gsap } from '../lib/gsap';
import { prefersReducedMotion } from '../config';

/** Lightweight golden sparkle layer. Only spawns/draws while `activeRef.current` is true. */
export default function Sparkles({ activeRef }) {
  const ref = useRef(null);
  useEffect(() => {
    if (prefersReducedMotion()) return undefined;
    const c = ref.current;
    const ctx = c.getContext('2d');
    let w = 0, h = 0;
    const size = () => { w = c.width = c.clientWidth; h = c.height = c.clientHeight; };
    size();
    window.addEventListener('resize', size);
    const parts = [];
    const MAX = window.innerWidth < 768 ? 28 : 55;
    let last = 0;
    const spawn = () => parts.push({
      x: Math.random() * w, y: h * (0.55 + Math.random() * 0.5),
      vx: (Math.random() - 0.5) * 0.25, vy: -(0.25 + Math.random() * 0.6),
      r: 0.8 + Math.random() * 2.2, life: 0, max: 140 + Math.random() * 120,
      tw: Math.random() * 6.28,
    });
    const tick = (time, dt) => {
      const active = activeRef.current;
      if (!active && parts.length === 0) return;
      const k = Math.min(dt / 16.67, 3);
      if (active && parts.length < MAX && time - last > 0.06) { spawn(); last = time; }
      ctx.clearRect(0, 0, w, h);
      ctx.globalCompositeOperation = 'lighter';
      for (let i = parts.length - 1; i >= 0; i--) {
        const p = parts[i];
        p.life += k; p.x += p.vx * k; p.y += p.vy * k; p.tw += 0.08 * k;
        const t = p.life / p.max;
        if (t >= 1) { parts.splice(i, 1); continue; }
        const a = Math.sin(Math.PI * t) * (0.55 + 0.45 * Math.sin(p.tw));
        const g = ctx.createRadialGradient(p.x, p.y, 0, p.x, p.y, p.r * 4);
        g.addColorStop(0, `rgba(255,214,140,${a})`);
        g.addColorStop(1, 'rgba(212,162,76,0)');
        ctx.fillStyle = g;
        ctx.beginPath(); ctx.arc(p.x, p.y, p.r * 4, 0, 6.2832); ctx.fill();
      }
    };
    gsap.ticker.add(tick);
    return () => { gsap.ticker.remove(tick); window.removeEventListener('resize', size); };
  }, [activeRef]);
  return <canvas ref={ref} className="hero__sparkles" aria-hidden="true" />;
}
