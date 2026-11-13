import { useEffect, useRef } from 'react';
import { gsap } from '../lib/gsap';

/** Gold dot + trailing ring. Desktop / fine pointers only. Ring grows over interactive elements. */
export default function CustomCursor() {
  const dot = useRef(null);
  const ring = useRef(null);

  useEffect(() => {
    if (!window.matchMedia('(hover: hover) and (pointer: fine)').matches) return undefined;
    document.body.classList.add('has-cursor');
    const d = dot.current;
    const r = ring.current;
    gsap.set([d, r], { xPercent: -50, yPercent: -50, opacity: 0 });
    const dx = gsap.quickTo(d, 'x', { duration: 0.08, ease: 'none' });
    const dy = gsap.quickTo(d, 'y', { duration: 0.08, ease: 'none' });
    const rx = gsap.quickTo(r, 'x', { duration: 0.5, ease: 'power3.out' });
    const ry = gsap.quickTo(r, 'y', { duration: 0.5, ease: 'power3.out' });
    let shown = false;
    const move = (e) => {
      if (e.pointerType && e.pointerType !== 'mouse') return;
      if (!shown) { shown = true; gsap.to([d, r], { opacity: 1, duration: 0.3 }); }
      dx(e.clientX); dy(e.clientY); rx(e.clientX); ry(e.clientY);
    };
    const SEL = 'a, button, [role="button"], [data-cursor], input, select, textarea, summary';
    const over = (e) => { if (e.target.closest && e.target.closest(SEL)) r.classList.add('is-hover'); };
    const out = (e) => { if (e.target.closest && e.target.closest(SEL)) r.classList.remove('is-hover'); };
    const down = () => r.classList.add('is-down');
    const up = () => r.classList.remove('is-down');
    const leave = () => gsap.to([d, r], { opacity: 0, duration: 0.2 }) && (shown = false);
    window.addEventListener('pointermove', move, { passive: true });
    document.addEventListener('pointerover', over);
    document.addEventListener('pointerout', out);
    window.addEventListener('pointerdown', down);
    window.addEventListener('pointerup', up);
    document.documentElement.addEventListener('mouseleave', leave);
    return () => {
      document.body.classList.remove('has-cursor');
      window.removeEventListener('pointermove', move);
      document.removeEventListener('pointerover', over);
      document.removeEventListener('pointerout', out);
      window.removeEventListener('pointerdown', down);
      window.removeEventListener('pointerup', up);
      document.documentElement.removeEventListener('mouseleave', leave);
    };
  }, []);

  return (
    <>
      <div ref={ring} className="cursor-ring" aria-hidden="true" />
      <div ref={dot} className="cursor-dot" aria-hidden="true" />
    </>
  );
}
