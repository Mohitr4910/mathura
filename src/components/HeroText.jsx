import { HERO, BRAND, waLink } from '../data/content';
import MagneticButton from './MagneticButton';
import { scrollToTarget } from '../lib/lenis';

/** Split a string into masked letters: <span.word><span.char><span.char-inner>x</span></span></span> */
function Chars({ text }) {
  return (
    <span className="chars" aria-label={text}>
      {text.split(' ').map((word, wi, arr) => (
        <span key={wi} aria-hidden="true">
          <span className="word">
            {[...word].map((ch, i) => (
              <span className="char" key={i}><span className="char-inner">{ch}</span></span>
            ))}
          </span>
          {wi < arr.length - 1 ? ' ' : ''}
        </span>
      ))}
    </span>
  );
}

const fmt = (n) => n.toLocaleString('en-IN');

export default function HeroText() {
  const go = (e, href) => { e.preventDefault(); scrollToTarget(href); };
  return (
    <div className="hero__chapters">
      {/* Chapter 1 */}
      <div className="ch ch1" data-ch="1">
        <div className="ch__inner ch__inner--center">
          <p className="eyebrow ch1__est">Since {BRAND.established} · {BRAND.city}</p>
          <h1 className="ch1__title"><Chars text={BRAND.name} /></h1>
          <p className="ch1__tag">{HERO.tagline}</p>
        </div>
        <div className="scroll-ind" aria-hidden="true">
          <span className="scroll-ind__mouse"><i /></span>
          <span className="scroll-ind__label">{HERO.scrollLabel}</span>
        </div>
      </div>

      {/* Chapter 2 */}
      <div className="ch ch2" data-ch="2">
        <div className="ch__inner ch__inner--left">
          <p className="eyebrow rv">{HERO.ch2.eyebrow}</p>
          <h2 className="ch__title rv">{HERO.ch2.title}</h2>
          <div className="ch__body">
            {HERO.ch2.lines.map((l, i) => <p className="rv" key={i}>{l}</p>)}
          </div>
        </div>
      </div>

      {/* Interlude A: ingredients (between chapter 2 and 3) */}
      <div className="ch ch--i ci1" data-ch="i1">
        <div className="ch__inner ch__inner--center">
          <p className="eyebrow rv">{HERO.ingredients.eyebrow}</p>
          <h2 className="ch__title rv">{HERO.ingredients.title}</h2>
          <ul className="igrid igrid--3">
            {HERO.ingredients.items.map((it) => (
              <li className="icard rv" key={it.n}>
                <span className="icard__n">{it.n}</span>
                <b>{it.name}</b>
                <span>{it.text}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* Chapter 3 */}
      <div className="ch ch3" data-ch="3">
        <div className="ch__inner ch__inner--right">
          <p className="eyebrow rv">{HERO.ch3.eyebrow}</p>
          <h2 className="ch__title rv">{HERO.ch3.title}</h2>
          <ul className="counters">
            {HERO.ch3.counters.map((c) => (
              <li className="counter rv" key={c.label}>
                <span className="counter__value">
                  <span className="counter__num" data-target={c.value}>{fmt(c.value)}</span>
                  <span className="counter__suffix">{c.suffix}</span>
                </span>
                <span className="counter__label">{c.label}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* Interlude B: process (between chapter 3 and 4) */}
      <div className="ch ch--i ci2" data-ch="i2">
        <div className="ch__inner ch__inner--center">
          <p className="eyebrow rv">{HERO.process.eyebrow}</p>
          <h2 className="ch__title rv">{HERO.process.title}</h2>
          <ol className="igrid igrid--4 steps">
            {HERO.process.steps.map((s) => (
              <li className="icard icard--step rv" key={s.time}>
                <span className="icard__time">{s.time}</span>
                <b>{s.title}</b>
                <span>{s.text}</span>
              </li>
            ))}
          </ol>
        </div>
      </div>

      {/* Chapter 4 */}
      <div className="ch ch4" data-ch="4">
        <div className="ch__inner ch__inner--left">
          <p className="eyebrow rv">{HERO.ch4.eyebrow}</p>
          <h2 className="ch__title rv">{HERO.ch4.title}</h2>
          <p className="ch__body rv">{HERO.ch4.line}</p>
          <ul className="chips rv">
            {HERO.ch4.chips.map((c) => <li key={c}>{c}</li>)}
          </ul>
        </div>
      </div>

      {/* Interlude C: festival planner (between chapter 4 and 5) */}
      <div className="ch ch--i ci3" data-ch="i3">
        <div className="ch__inner ch__inner--center">
          <p className="eyebrow rv">{HERO.planner.eyebrow}</p>
          <h2 className="ch__title rv">{HERO.planner.title}</h2>
          <p className="ch__body rv">{HERO.planner.line}</p>
          <ul className="igrid igrid--5">
            {HERO.planner.items.map((it) => (
              <li className="icard icard--plan rv" key={it.name}>
                <b>{it.name}</b>
                <span>{it.when}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* Chapter 5 */}
      <div className="ch ch5" data-ch="5">
        <div className="ch__inner ch__inner--center">
          <p className="eyebrow rv">{HERO.ch5.eyebrow}</p>
          <h2 className="ch__title ch__title--xl rv">{HERO.ch5.title}</h2>
          <p className="ch__body rv">{HERO.ch5.line}</p>
          <div className="cta-row rv">
            <MagneticButton as="a" href={HERO.ch5.primary.href} variant="gold" onClick={(e) => go(e, HERO.ch5.primary.href)}>
              {HERO.ch5.primary.label}
            </MagneticButton>
            <MagneticButton as="a" href={waLink(HERO.ch5.secondary.text)} target="_blank" rel="noopener noreferrer" variant="ghost">
              {HERO.ch5.secondary.label}
            </MagneticButton>
          </div>
        </div>
      </div>
    </div>
  );
}

/* =====================================================================
   MASTER TIMELINE  (duration = 1, so every position is a scroll-progress point)
   Edit the numbers below to retime the story. 0.12 = 12% of the hero scroll.
   ===================================================================== */
export const STORY_TIMING = {
  ch1: { start: 0, end: 0.09 },
  ch2: { start: 0.115, end: 0.25 },
  i1: { start: 0.27, end: 0.37 },   // interlude: ingredients
  ch3: { start: 0.39, end: 0.53 },
  i2: { start: 0.55, end: 0.65 },   // interlude: kadhai se dibbe tak
  ch4: { start: 0.67, end: 0.79 },
  i3: { start: 0.81, end: 0.89 },   // interlude: festival planner
  ch5: { start: 0.915, end: 1.0 },
};
const FADE_IN = 0.03;
const FADE_OUT = 0.025;

export function buildStory(tl, root) {
  const $ = (s) => root.querySelector(s);
  const $$ = (s, el = root) => [...el.querySelectorAll(s)];
  const T = STORY_TIMING;

  // ---- camera feel: canvas slowly pushes in 1.0 -> 1.08 over the whole scroll ----
  tl.fromTo('.hero__canvas-wrap', { scale: 1 }, { scale: 1.08, ease: 'none', duration: 1 }, 0);
  // ---- final chapter: a bottom gradient fades in so the CTA text is always readable ----
  tl.fromTo('.hero__dim', { opacity: 0 }, { opacity: 1, ease: 'power1.inOut', duration: 0.06 }, T.ch5.start - 0.05);
  // ---- progress rail fill ----
  tl.fromTo('.rail__fill', { scaleY: 0 }, { scaleY: 1, ease: 'none', duration: 1 }, 0);

  // ---- Chapter 1: visible at progress 0, fades out ----
  const c1 = $('.ch1');
  tl.to(c1, { autoAlpha: 0, y: -70, filter: 'blur(10px)', ease: 'power2.in', duration: FADE_OUT, immediateRender: false }, T.ch1.end - FADE_OUT);

  // ---- Chapters 2..5 ----
  [['.ch2', T.ch2], ['.ci1', T.i1], ['.ch3', T.ch3], ['.ci2', T.i2], ['.ch4', T.ch4], ['.ci3', T.i3], ['.ch5', T.ch5]].forEach(([sel, t], i, arr) => {
    const el = $(sel);
    const isLast = i === arr.length - 1;
    // enter: fade + slide + slight blur
    tl.fromTo(el, { autoAlpha: 0, y: 70, filter: 'blur(12px)' },
      { autoAlpha: 1, y: 0, filter: 'blur(0px)', ease: 'power2.out', duration: FADE_IN }, t.start);
    // children stagger in a touch later (line-by-line feel)
    tl.fromTo($$('.rv', el), { y: 36, opacity: 0 },
      { y: 0, opacity: 1, ease: 'power2.out', duration: FADE_IN, stagger: 0.008 }, t.start);
    // tiny parallax: title drifts slower than body while the chapter is on screen
    const title = el.querySelector('.ch__title');
    const body = el.querySelector('.ch__body, .counters, .igrid');
    if (title) tl.fromTo(title, { yPercent: 6 }, { yPercent: -6, ease: 'none', duration: t.end - t.start }, t.start);
    if (body) tl.fromTo(body, { yPercent: 10 }, { yPercent: -10, ease: 'none', duration: t.end - t.start }, t.start);
    // exit (not for the last chapter, it stays to the end)
    if (!isLast) {
      tl.to(el, { autoAlpha: 0, y: -70, filter: 'blur(12px)', ease: 'power2.in', duration: FADE_OUT, immediateRender: false }, t.end - FADE_OUT);
    }
  });

  // ---- Chapter 3: counters count up as the chapter enters (scrubbed, so they also reverse) ----
  $$('.counter__num').forEach((numEl) => {
    const target = Number(numEl.dataset.target);
    const o = { v: 0 };
    numEl.textContent = '0';
    tl.to(o, {
      v: target, ease: 'power1.out', duration: 0.07,
      onUpdate: () => { numEl.textContent = Math.round(o.v).toLocaleString('en-IN'); },
    }, T.ch3.start + 0.005);
  });

  // force total duration to exactly 1
  tl.to({}, { duration: 0 }, 1);
}
