import Lenis from 'lenis';
import { gsap, ScrollTrigger } from './gsap';

let lenis = null;
let tickerFn = null;

/** Create the single Lenis instance and wire it to GSAP's ticker + ScrollTrigger. */
export function initLenis() {
  if (lenis) return lenis;
  lenis = new Lenis({ lerp: 0.1, smoothWheel: true, syncTouch: false });
  lenis.on('scroll', ScrollTrigger.update);
  tickerFn = (t) => lenis.raf(t * 1000);
  gsap.ticker.add(tickerFn);
  gsap.ticker.lagSmoothing(0);
  return lenis;
}

export function destroyLenis() {
  if (!lenis) return;
  gsap.ticker.remove(tickerFn);
  lenis.destroy();
  lenis = null;
  tickerFn = null;
}

export const getLenis = () => lenis;

export function scrollToTarget(target, opts = {}) {
  if (lenis) lenis.scrollTo(target, { duration: 1.4, easing: (t) => 1 - Math.pow(1 - t, 4), ...opts });
  else document.querySelector(target)?.scrollIntoView({ behavior: 'smooth' });
}
