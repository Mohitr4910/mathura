import { useEffect, useRef, useState } from 'react';
import { gsap } from '../lib/gsap';
import { BRAND } from '../data/content';
import { REDUCED_MOTION_FRAME, prefersReducedMotion } from '../config';
import { loadFirstBatch, loadFrame, startBackgroundLoad } from '../lib/frames';

/**
 * Cinematic loader. Progress is tied to REAL frame decoding (first batch).
 * When ready it slides up (clip-path) and tells the app to start the hero intro.
 * The remaining frames keep loading silently in the background.
 */
export default function Loader({ onRevealStart }) {
  const root = useRef(null);
  const bar = useRef(null);
  const pctRef = useRef(null);
  const [gone, setGone] = useState(false);

  useEffect(() => {
    const reduced = prefersReducedMotion();
    const shown = { v: 0 };
    let real = 0;
    let cancelled = false;
    const startTime = performance.now();

    const render = () => {
      const p = Math.round(shown.v * 100);
      if (pctRef.current) pctRef.current.textContent = String(p).padStart(2, '0');
      if (bar.current) gsap.set(bar.current, { scaleX: shown.v });
    };
    // Smoothly chase the real progress so the counter never jumps.
    const chase = (value) => gsap.to(shown, { v: value, duration: 0.6, ease: 'power2.out', overwrite: true, onUpdate: render });

    const ctx = gsap.context(() => {
      gsap.from('.loader__name, .loader__sub', { yPercent: 110, opacity: 0, duration: 1.1, ease: 'power4.out', stagger: 0.12 });
    }, root);

    const run = async () => {
      let rest = [];
      if (reduced) {
        await loadFrame(REDUCED_MOTION_FRAME - 1);
        real = 1;
        chase(1);
      } else {
        rest = await loadFirstBatch((p) => { real = p; if (!cancelled) chase(p); });
      }
      // Keep the loader on screen at least ~1.4s so the brand moment is felt.
      const wait = Math.max(0, 1400 - (performance.now() - startTime));
      await new Promise((r) => setTimeout(r, wait));
      if (cancelled) return;
      await new Promise((res) => { chase(1).eventCallback('onComplete', res); });
      if (cancelled) return;

      const tl = gsap.timeline({ onComplete: () => setGone(true) });
      tl.to('.loader__inner', { yPercent: -30, opacity: 0, duration: 0.8, ease: 'power3.in' })
        .to(root.current, { clipPath: 'inset(0 0 100% 0)', duration: 1.1, ease: 'expo.inOut' }, '-=0.35')
        .add(() => onRevealStart && onRevealStart(), '-=0.55');
      if (!reduced) startBackgroundLoad(rest);
    };
    run();

    return () => { cancelled = true; ctx.revert(); };
  }, [onRevealStart]);

  if (gone) return null;
  return (
    <div ref={root} className="loader" role="status" aria-live="polite" aria-label="Loading">
      <div className="loader__inner">
        <div className="loader__brand">
          <span className="loader__mask"><span className="loader__name">{BRAND.short}</span></span>
          <span className="loader__mask"><span className="loader__sub">{BRAND.sub}</span></span>
        </div>
        <div className="loader__line" aria-hidden="true"><span ref={bar} className="loader__fill" /></div>
        <div className="loader__pct"><span ref={pctRef}>00</span><small>%</small></div>
      </div>
    </div>
  );
}
