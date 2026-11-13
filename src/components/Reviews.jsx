import { useCallback, useEffect, useRef, useState } from 'react';
import { gsap } from '../lib/gsap';
import { REVIEWS, REVIEWS_COPY } from '../data/content';
import { prefersReducedMotion } from '../config';
import { useReveals } from '../lib/reveal';

const perViewNow = () => (window.innerWidth >= 1024 ? 3 : window.innerWidth >= 700 ? 2 : 1);

export default function Reviews() {
  const root = useRef(null);
  const track = useRef(null);
  const [perView, setPerView] = useState(3);
  const [index, setIndex] = useState(0);
  const [paused, setPaused] = useState(false);
  const max = Math.max(0, REVIEWS.length - perView);
  useReveals(root);

  useEffect(() => {
    const on = () => setPerView(perViewNow());
    on();
    window.addEventListener('resize', on);
    return () => window.removeEventListener('resize', on);
  }, []);

  // slide (transform only)
  useEffect(() => {
    const i = Math.min(index, max);
    gsap.to(track.current, { xPercent: -(100 / perView) * i, duration: prefersReducedMotion() ? 0 : 1, ease: 'power3.inOut' });
  }, [index, perView, max]);

  const next = useCallback(() => setIndex((i) => (i >= max ? 0 : i + 1)), [max]);
  const prev = () => setIndex((i) => (i <= 0 ? max : i - 1));

  // auto-slide, paused on hover / focus
  useEffect(() => {
    if (paused || prefersReducedMotion()) return undefined;
    const t = setInterval(next, 4500);
    return () => clearInterval(t);
  }, [paused, next]);

  return (
    <section id="reviews" ref={root} className="section reviews" aria-labelledby="rev-title">
      <div className="container">
        <header className="section__head section__head--row">
          <div>
            <p className="eyebrow" data-reveal>{REVIEWS_COPY.eyebrow}</p>
            <h2 id="rev-title" className="h2" data-lines>{REVIEWS_COPY.title}</h2>
          </div>
          <div className="rev__ctrl" data-reveal>
            <button type="button" className="round-btn" onClick={prev} aria-label="Previous review">←</button>
            <button type="button" className="round-btn" onClick={next} aria-label="Next review">→</button>
          </div>
        </header>
        <div
          className="rev"
          role="region"
          aria-roledescription="carousel"
          aria-label="Customer reviews"
          onMouseEnter={() => setPaused(true)}
          onMouseLeave={() => setPaused(false)}
          onFocus={() => setPaused(true)}
          onBlur={() => setPaused(false)}
          data-reveal
        >
          <div ref={track} className="rev__track" aria-live={paused ? 'polite' : 'off'}>
            {REVIEWS.map((r, i) => (
              <figure className="rev__slide" key={r.name} aria-roledescription="slide" aria-label={`${i + 1} of ${REVIEWS.length}`}>
                <div className="rcard">
                  <div className="stars" role="img" aria-label={`${r.stars} out of 5 stars`}>
                    {'★★★★★'.split('').map((s, k) => <span key={k} className={k < r.stars ? 'on' : ''}>★</span>)}
                  </div>
                  <blockquote>“{r.text}”</blockquote>
                  <figcaption><b>{r.name}</b><span>{r.city}</span></figcaption>
                </div>
              </figure>
            ))}
          </div>
        </div>
        <div className="dots" role="tablist" aria-label="Choose review position">
          {Array.from({ length: max + 1 }).map((_, i) => (
            <button key={i} type="button" role="tab" aria-selected={Math.min(index, max) === i} aria-label={`Show reviews from ${i + 1}`} className={Math.min(index, max) === i ? 'is-on' : ''} onClick={() => setIndex(i)} />
          ))}
        </div>
      </div>
    </section>
  );
}
