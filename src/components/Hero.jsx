import { useEffect, useLayoutEffect, useRef, useState } from 'react';
import { gsap } from '../lib/gsap';
import { TOTAL_FRAMES, getScrollLength, prefersReducedMotion } from '../config';
import { HERO } from '../data/content';
import HeroCanvas from './HeroCanvas';
import HeroText, { buildStory, STORY_TIMING as T } from './HeroText';
import Sparkles from './Sparkles';

/**
 * The pinned, scroll-driven hero.
 * ONE ScrollTrigger (owned by the master timeline) does: pin + scrub:true.
 * It only writes `frameState.target`; HeroCanvas eases toward it on gsap.ticker.
 */
export default function Hero({ introPlay, onIntroDone }) {
  const root = useRef(null);
  const frameState = useRef({ target: 0 });
  const sparkActive = useRef(false);
  const railNum = useRef(null);
  const railLabel = useRef(null);
  const chapter = useRef(0);
  const [reduced] = useState(() => prefersReducedMotion());

  // ---------- master timeline + pin ----------
  useLayoutEffect(() => {
    if (reduced) return undefined; // static frame, normal scrolling, no scrub
    const ctx = gsap.context(() => {
      // initial (pre-intro) states
      gsap.set('.char-inner', { yPercent: 110 });
      gsap.set('.ch1__est, .ch1__tag, .scroll-ind, .rail', { opacity: 0 });

      const tl = gsap.timeline({
        defaults: { ease: 'none' },
        scrollTrigger: {
          trigger: root.current,
          start: 'top top',
          end: () => getScrollLength(),     // "+=700%" (desktop) / "+=500%" (mobile)
          pin: true,
          anticipatePin: 1,
          scrub: true,                      // Lenis already smooths the scroll -> no double smoothing
          invalidateOnRefresh: true,
          refreshPriority: 10,              // hero is measured first, everything below depends on its pin spacing
          onUpdate: (self) => {
            const p = self.progress;
            frameState.current.target = p * (TOTAL_FRAMES - 1);
            sparkActive.current = p > T.ch5.start - 0.04;
            // main chapter index for the side rail (interludes keep the previous number)
            const idx = p < T.ch2.start - 0.02 ? 0 : p < T.ch3.start - 0.02 ? 1 : p < T.ch4.start - 0.02 ? 2 : p < T.ch5.start - 0.02 ? 3 : 4;
            if (idx !== chapter.current) {
              chapter.current = idx;
              if (railNum.current) railNum.current.textContent = `0${idx + 1}`;
              if (railLabel.current) railLabel.current.textContent = HERO.chapters[idx].label;
            }
          },
        },
      });
      buildStory(tl, root.current);
    }, root);
    return () => ctx.revert();
  }, [reduced]);

  // ---------- intro (after the loader leaves) ----------
  useEffect(() => {
    if (!introPlay) return undefined;
    if (reduced) { onIntroDone && onIntroDone(); return undefined; }
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ onComplete: () => onIntroDone && onIntroDone() });
      tl.to('.char-inner', { yPercent: 0, duration: 1.5, ease: 'power4.out', stagger: 0.05 })
        .fromTo('.ch1__est', { opacity: 0, y: 18 }, { opacity: 1, y: 0, duration: 1, ease: 'power3.out' }, 0.25)
        .fromTo('.ch1__tag', { opacity: 0, y: 24 }, { opacity: 1, y: 0, duration: 1.1, ease: 'power3.out' }, 0.9)
        .fromTo('.scroll-ind', { opacity: 0, y: 16 }, { opacity: 1, y: 0, duration: 1, ease: 'power3.out' }, 1.3)
        .fromTo('.rail', { opacity: 0 }, { opacity: 1, duration: 1, ease: 'power2.out' }, 1.4);
    }, root);
    return () => ctx.revert();
  }, [introPlay, reduced, onIntroDone]);

  return (
    <section id="home" ref={root} className={`hero${reduced ? ' is-reduced' : ''}`} aria-label="Introduction">
      <div className="hero__stage">
        <div className="hero__canvas-wrap">
          <HeroCanvas frameState={frameState} />
        </div>
        <div className="hero__shade" aria-hidden="true" />
        <div className="hero__dim" aria-hidden="true" />
        <Sparkles activeRef={sparkActive} />
        <HeroText />
        <div className="rail" aria-hidden="true">
          <span className="rail__num"><b ref={railNum}>01</b><i> / 0{HERO.chapters.length}</i></span>
          <span className="rail__line"><span className="rail__fill" /></span>
          <span className="rail__label" ref={railLabel}>{HERO.chapters[0].label}</span>
        </div>
      </div>
    </section>
  );
}
