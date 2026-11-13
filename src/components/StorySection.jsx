import { useLayoutEffect, useRef } from 'react';
import { gsap } from '../lib/gsap';
import { STORY, BRAND } from '../data/content';
import { prefersReducedMotion } from '../config';
import { useReveals } from '../lib/reveal';
import Img from './Img';

export default function StorySection() {
  const root = useRef(null);
  useReveals(root);

  useLayoutEffect(() => {
    if (prefersReducedMotion()) return undefined;
    const ctx = gsap.context(() => {
      // image parallax inside its clip-path frame (transform only)
      gsap.fromTo('.story__img img', { yPercent: -8, scale: 1.18 }, {
        yPercent: 8, scale: 1.18, ease: 'none',
        scrollTrigger: { trigger: '.story__img', start: 'top bottom', end: 'bottom top', scrub: true },
      });
      // timeline spine fills as you scroll
      gsap.fromTo('.tl__fill', { scaleY: 0 }, {
        scaleY: 1, ease: 'none',
        scrollTrigger: { trigger: '.tl', start: 'top 70%', end: 'bottom 60%', scrub: true },
      });
      gsap.utils.toArray('.tl__item').forEach((el) => {
        gsap.from(el, { opacity: 0, x: 30, duration: 1, ease: 'power3.out', scrollTrigger: { trigger: el, start: 'top 85%', once: true } });
        dotFill(el);
      });
      function dotFill(el) {
        gsap.fromTo(el.querySelector('.tl__dot'), { scale: 0.4, backgroundColor: 'rgba(212,162,76,0.2)' }, {
          scale: 1, backgroundColor: '#d4a24c', ease: 'power2.out',
          scrollTrigger: { trigger: el, start: 'top 72%', end: 'top 60%', scrub: true },
        });
      }
    }, root);
    return () => ctx.revert();
  }, []);

  return (
    <section id="story" ref={root} className="section story" aria-labelledby="story-title">
      <div className="container story__grid">
        <div className="story__media">
          <div className="story__img" data-clip>
            <Img src={STORY.image} fb={1} alt="Halwai stirring a big kadhai of fresh mithai" width="1000" height="1250" />
          </div>
          <span className="story__badge" data-reveal>Since<b>{BRAND.established}</b></span>
        </div>
        <div className="story__text">
          <p className="eyebrow" data-reveal>{STORY.eyebrow}</p>
          <h2 id="story-title" className="h2" data-lines>{STORY.title}</h2>
          {STORY.paragraphs.map((p, i) => <p className="lead" data-reveal key={i}>{p}</p>)}
          <h3 className="h3" data-reveal>{STORY.timelineTitle}</h3>
          <ol className="tl">
            <span className="tl__spine" aria-hidden="true"><span className="tl__fill" /></span>
            {STORY.timeline.map((m) => (
              <li className="tl__item" key={m.year + m.title}>
                <span className="tl__dot" aria-hidden="true" />
                <span className="tl__year">{m.year}</span>
                <div>
                  <h4>{m.title}</h4>
                  <p>{m.text}</p>
                </div>
              </li>
            ))}
          </ol>
        </div>
      </div>
    </section>
  );
}
