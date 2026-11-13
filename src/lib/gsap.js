// Register GSAP plugins ONCE. Import { gsap, ScrollTrigger, Flip } from here everywhere.
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Flip } from 'gsap/Flip';

if (!gsap.core.globals().ScrollTrigger) {
  gsap.registerPlugin(ScrollTrigger, Flip);
  // Mobile URL-bar show/hide fires resize; ignore it so the pinned hero doesn't jump.
  ScrollTrigger.config({ ignoreMobileResize: true });
}

export { gsap, ScrollTrigger, Flip };
