/* =========================================================
   FRAME SEQUENCE CONFIG  — change these to match your frames
   ========================================================= */

// Total number of frames inside /public/frames (this zip has 279).
export const TOTAL_FRAMES = 279;

// Path of frame number i (1-based): /frames/frame_0001.webp ...
export const FRAME_PATH = (i) => `/frames/frame_${String(i).padStart(4, '0')}.webp`;

// How long the pinned hero lasts, as a % of viewport height.
export const SCROLL_LENGTH = '+=900%';
export const SCROLL_LENGTH_MOBILE = '+=650%';

// Frames loaded before the site unlocks.
export const FIRST_BATCH = 30;
// Background batch size.
export const BATCH_SIZE = 12;
// Frame shown when prefers-reduced-motion is on.
export const REDUCED_MOTION_FRAME = 150;

// Lerp strength per 1/60s. Lower = floatier / more inertia.
export const LERP = 0.08;

export const MOBILE_QUERY = '(max-width: 767px)';
export const isMobile = () =>
  typeof window !== 'undefined' && window.matchMedia(MOBILE_QUERY).matches;
export const prefersReducedMotion = () =>
  typeof window !== 'undefined' && window.matchMedia('(prefers-reduced-motion: reduce)').matches;

export const getScrollLength = () => (isMobile() ? SCROLL_LENGTH_MOBILE : SCROLL_LENGTH);
export const getFrameStep = () => (isMobile() ? 2 : 1);
export const getMaxDpr = () => (isMobile() ? 1.5 : 2);
