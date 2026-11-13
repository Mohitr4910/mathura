import { useEffect, useRef } from 'react';
import { gsap } from '../lib/gsap';
import { TOTAL_FRAMES, LERP, REDUCED_MOTION_FRAME, getMaxDpr, prefersReducedMotion } from '../config';
import { nearestLoaded } from '../lib/frames';

/* =====================================================================
   FRAME SEQUENCE RENDERER
   ---------------------------------------------------------------------
   scroll (ScrollTrigger/Lenis)  --writes-->  frameState.target
   gsap.ticker (every display frame) --eases-->  currentFrame -> target
   draw() only runs when the rounded frame (or the bitmap resolved for it)
   changes, so we never redraw the same picture twice.
   ===================================================================== */
export default function HeroCanvas({ frameState }) {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d', { alpha: false });
    const reduced = prefersReducedMotion();

    let current = 0;          // eased frame position (float)
    let lastIndex = -1;       // last rounded index we drew
    let lastBitmap = null;    // last bitmap we drew (lets us "upgrade" a placeholder frame once the real one loads)
    let cw = 0;
    let ch = 0;

    /** Size the backing store = CSS size * DPR (capped: 2 desktop, 1.5 mobile). */
    const resize = () => {
      const dpr = Math.min(window.devicePixelRatio || 1, getMaxDpr());
      const w = canvas.clientWidth || window.innerWidth;
      const h = canvas.clientHeight || window.innerHeight;
      cw = Math.round(w * dpr);
      ch = Math.round(h * dpr);
      canvas.width = cw;
      canvas.height = ch;
      ctx.imageSmoothingEnabled = true;
      ctx.imageSmoothingQuality = 'high';
      lastIndex = -1; // force redraw
      lastBitmap = null;
    };

    /** drawImage with "object-fit: cover" math (centered crop). */
    const draw = (bmp) => {
      const iw = bmp.naturalWidth || bmp.width;
      const ih = bmp.naturalHeight || bmp.height;
      const scale = Math.max(cw / iw, ch / ih);
      const w = iw * scale;
      const h = ih * scale;
      ctx.drawImage(bmp, (cw - w) / 2, (ch - h) / 2, w, h);
    };

    const render = (idx) => {
      // Never a blank canvas: if frame idx isn't loaded yet, use the closest one that is.
      const bmp = nearestLoaded(idx);
      if (!bmp) return;
      if (idx === lastIndex && bmp === lastBitmap) return;
      lastIndex = idx;
      lastBitmap = bmp;
      draw(bmp);
    };

    resize();

    // ---- reduced motion: one static frame, no ticker ----
    if (reduced) {
      const iv = setInterval(() => {
        render(REDUCED_MOTION_FRAME - 1);
        if (lastBitmap) clearInterval(iv);
      }, 120);
      let t;
      const onResize = () => { clearTimeout(t); t = setTimeout(() => { resize(); render(REDUCED_MOTION_FRAME - 1); }, 150); };
      window.addEventListener('resize', onResize);
      return () => { clearInterval(iv); clearTimeout(t); window.removeEventListener('resize', onResize); };
    }

    // ---- the damping loop ----
    const tick = (time, deltaTime) => {
      const target = frameState.current.target;
      // Frame-rate independent lerp: LERP is "per 1/60s", so 60Hz and 120Hz feel identical.
      const dt = Math.min(deltaTime / (1000 / 60), 6);
      const k = 1 - Math.pow(1 - LERP, dt);
      current += (target - current) * k;
      if (Math.abs(target - current) < 0.01) current = target; // settle
      render(Math.max(0, Math.min(TOTAL_FRAMES - 1, Math.round(current))));
    };
    gsap.ticker.add(tick);

    // ---- debounced resize ----
    let rt;
    const onResize = () => {
      clearTimeout(rt);
      rt = setTimeout(() => {
        const dpr = Math.min(window.devicePixelRatio || 1, getMaxDpr());
        const w = Math.round((canvas.clientWidth || window.innerWidth) * dpr);
        const h = Math.round((canvas.clientHeight || window.innerHeight) * dpr);
        if (w === cw && h === ch) return;
        resize();
        // ScrollTrigger refreshes itself on resize (ignoreMobileResize is on for URL-bar jitter).
      }, 150);
    };
    window.addEventListener('resize', onResize);

    return () => {
      gsap.ticker.remove(tick);
      clearTimeout(rt);
      window.removeEventListener('resize', onResize);
    };
  }, [frameState]);

  return <canvas ref={canvasRef} className="hero__canvas" aria-hidden="true" />;
}
