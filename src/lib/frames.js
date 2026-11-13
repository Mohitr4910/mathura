/* =========================================================
   FRAME LOADER
   - Decodes every frame into an ImageBitmap (no decode jank while scrolling)
   - Phase 1: first FIRST_BATCH frames -> unlock the site
   - Phase 2: the rest in batches of BATCH_SIZE, in idle time
   - On mobile only every 2nd frame is fetched (getFrameStep)
   ========================================================= */
import { TOTAL_FRAMES, FRAME_PATH, FIRST_BATCH, BATCH_SIZE, getFrameStep } from '../config';

// Sparse array indexed 0..TOTAL_FRAMES-1. Holds ImageBitmap | HTMLImageElement | undefined.
export const frames = new Array(TOTAL_FRAMES);
let loadedCount = 0;

const hasBitmap = typeof createImageBitmap === 'function';

async function loadOne(index) {
  if (frames[index]) return frames[index];
  const url = FRAME_PATH(index + 1);
  try {
    if (hasBitmap) {
      const res = await fetch(url);
      if (!res.ok) throw new Error('frame ' + url);
      const blob = await res.blob();
      frames[index] = await createImageBitmap(blob);
    } else {
      throw new Error('no createImageBitmap');
    }
  } catch (e) {
    // Fallback: Image + decode()
    try {
      const img = new Image();
      img.decoding = 'async';
      img.src = url;
      await img.decode();
      frames[index] = img;
    } catch (_) {
      /* leave undefined; the renderer will use the nearest loaded frame */
    }
  }
  if (frames[index]) loadedCount++;
  return frames[index];
}

/** Which frame indexes (0-based) we want to load on this device, in order. */
export function getFrameIndexes() {
  const step = getFrameStep();
  const list = [];
  for (let i = 0; i < TOTAL_FRAMES; i += step) list.push(i);
  if (list[list.length - 1] !== TOTAL_FRAMES - 1) list.push(TOTAL_FRAMES - 1); // always have the last frame
  return list;
}

/** Nearest already-loaded frame to index i (never returns undefined unless nothing is loaded). */
export function nearestLoaded(i) {
  if (frames[i]) return frames[i];
  for (let d = 1; d < TOTAL_FRAMES; d++) {
    if (i - d >= 0 && frames[i - d]) return frames[i - d];
    if (i + d < TOTAL_FRAMES && frames[i + d]) return frames[i + d];
  }
  return null;
}

/**
 * Phase 1. Resolves when the first batch is decoded. onProgress(0..1).
 * Phase 2 is started by startBackgroundLoad().
 */
export async function loadFirstBatch(onProgress) {
  const idx = getFrameIndexes();
  const first = idx.slice(0, FIRST_BATCH);
  let done = 0;
  await Promise.all(
    first.map((i) =>
      loadOne(i).then(() => {
        done++;
        onProgress && onProgress(done / first.length);
      })
    )
  );
  return idx.slice(FIRST_BATCH);
}

const idle = (fn) =>
  typeof requestIdleCallback === 'function' ? requestIdleCallback(fn, { timeout: 400 }) : setTimeout(fn, 30);

let cancelled = false;
export function cancelBackgroundLoad() {
  cancelled = true;
}

/** Phase 2: remaining frames, BATCH_SIZE at a time, during idle time. */
export function startBackgroundLoad(remaining, onProgress) {
  cancelled = false;
  const total = remaining.length;
  let pos = 0;
  const next = () => {
    if (cancelled || pos >= total) return;
    const slice = remaining.slice(pos, pos + BATCH_SIZE);
    pos += BATCH_SIZE;
    Promise.all(slice.map(loadOne)).then(() => {
      onProgress && onProgress(Math.min(pos, total) / total);
      idle(next);
    });
  };
  idle(next);
}

/** Load one specific frame (used for prefers-reduced-motion). */
export const loadFrame = loadOne;

export const getLoadedCount = () => loadedCount;
