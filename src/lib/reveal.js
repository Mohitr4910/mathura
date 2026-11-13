import { useLayoutEffect } from 'react';
import { gsap, ScrollTrigger } from './gsap';
import { prefersReducedMotion } from '../config';

/** Split an element's text into masked lines (measured from the real layout). */
export function splitLines(el) {
  if (el._orig === undefined) el._orig = el.textContent;
  const words = el._orig.trim().split(/\s+/);
  el.innerHTML = words.map((w) => `<span class="w">${w}</span>`).join(' ');
  const lines = [];
  let top = null;
  let cur = null;
  el.querySelectorAll('.w').forEach((sp) => {
    const t = sp.offsetTop;
    if (top === null || Math.abs(t - top) > 4) {
      top = t;
      cur = [];
      lines.push(cur);
    }
    cur.push(sp.textContent);
  });
  el.innerHTML = lines
    .map((l) => `<span class="line"><span class="line-in">${l.join(' ')}</span></span>`)
    .join('');
  return [...el.querySelectorAll('.line-in')];
}

/**
 * Standard section entrance animations. Mark up your JSX with:
 *   data-lines  -> line-by-line masked text reveal
 *   data-reveal -> fade-up (batched + staggered)
 *   data-clip   -> clip-path image reveal
 * Everything is created inside gsap.context and reverted on unmount (StrictMode safe).
 */
export function useReveals(scope) {
  useLayoutEffect(() => {
    const root = scope.current;
    if (!root || prefersReducedMotion()) return undefined;
    let ctx;
    let dead = false;
    let lastW = window.innerWidth;
    let t;

    const setup = () => {
      if (dead) return;
      ctx = gsap.context(() => {
        root.querySelectorAll('[data-lines]').forEach((el) => {
          const lines = splitLines(el);
          gsap.set(lines, { yPercent: 110 });
          ScrollTrigger.create({
            trigger: el,
            start: 'top 90%',
            once: true,
            onEnter: () => {
              el._done = true;
              gsap.to(el.querySelectorAll('.line-in'), {
                yPercent: 0, duration: 1, ease: 'power3.out', stagger: 0.09,
              });
            },
          });
        });

        const items = root.querySelectorAll('[data-reveal]');
        if (items.length) {
          gsap.set(items, { y: 40, opacity: 0 });
          ScrollTrigger.batch(items, {
            start: 'top 92%',
            once: true,
            onEnter: (els) =>
              gsap.to(els, { y: 0, opacity: 1, duration: 1, ease: 'power3.out', stagger: 0.1, overwrite: true }),
          });
        }

        root.querySelectorAll('[data-clip]').forEach((el) => {
          gsap.fromTo(
            el,
            { clipPath: 'inset(100% 0% 0% 0%)' },
            {
              clipPath: 'inset(0% 0% 0% 0%)', duration: 1.3, ease: 'expo.out',
              scrollTrigger: { trigger: el, start: 'top 88%', once: true },
            }
          );
        });
      }, root);
    };

    (document.fonts && document.fonts.ready ? document.fonts.ready : Promise.resolve()).then(setup);

    // Re-measure the line splits when the width changes.
    const onResize = () => {
      clearTimeout(t);
      t = setTimeout(() => {
        if (window.innerWidth === lastW) return;
        lastW = window.innerWidth;
        root.querySelectorAll('[data-lines]').forEach((el) => {
          if (el._orig === undefined) return;
          const lines = splitLines(el);
          gsap.set(lines, { yPercent: el._done ? 0 : 110 });
        });
      }, 250);
    };
    window.addEventListener('resize', onResize);

    return () => {
      dead = true;
      clearTimeout(t);
      window.removeEventListener('resize', onResize);
      if (ctx) ctx.revert();
      root.querySelectorAll('[data-lines]').forEach((el) => {
        if (el._orig !== undefined) {
          el.textContent = el._orig;
          el._orig = undefined;
          el._done = false;
        }
      });
    };
  }, [scope]);
}
