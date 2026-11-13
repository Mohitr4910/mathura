import { useLayoutEffect, useRef } from 'react';
import { gsap } from '../lib/gsap';
import { WHY } from '../data/content';
import { prefersReducedMotion } from '../config';
import { useReveals } from '../lib/reveal';

// Simple stroke icons on a 48x48 grid, described as data: [tag, attributes].
// pathLength=1 is added when rendering so one dash animation fits every shape.
const ICONS = {
  ghee: [['path', { d: 'M16 12h16M18 12v-3h12v3' }], ['path', { d: 'M14 16c-2 3-2 6-2 10v10c0 2 2 3 4 3h16c2 0 4-1 4-3V26c0-4 0-7-2-10z' }], ['path', { d: 'M24 22c3 3 4 5 4 7a4 4 0 0 1-8 0c0-2 1-4 4-7z' }]],
  fresh: [['circle', { cx: 24, cy: 24, r: 14 }], ['path', { d: 'M24 15v9l6 4' }], ['path', { d: 'M8 8l4 4M40 8l-4 4' }]],
  leaf: [['path', { d: 'M10 38C8 22 18 10 38 10c0 20-12 30-26 28z' }], ['path', { d: 'M10 38C18 28 24 22 32 16' }]],
  clean: [['path', { d: 'M24 6c6 8 11 13 11 20a11 11 0 0 1-22 0c0-7 5-12 11-20z' }], ['path', { d: 'M19 28a5 5 0 0 0 5 5' }]],
  custom: [['rect', { x: 8, y: 20, width: 32, height: 20, rx: 2 }], ['path', { d: 'M6 14h36v6H6zM24 14v26' }], ['path', { d: 'M24 14c-4-8-12-6-10-2s10 2 10 2zM24 14c4-8 12-6 10-2s-10 2-10 2z' }]],
  truck: [['path', { d: 'M4 12h24v22H4zM28 20h9l7 7v7H28z' }], ['circle', { cx: 14, cy: 36, r: 4 }], ['circle', { cx: 36, cy: 36, r: 4 }]],
};

export default function WhyUs() {
  const root = useRef(null);
  useReveals(root);

  useLayoutEffect(() => {
    if (prefersReducedMotion()) return undefined;
    const ctx = gsap.context(() => {
      gsap.utils.toArray('.why__card').forEach((card) => {
        const paths = card.querySelectorAll('.why__icon path, .why__icon circle, .why__icon rect');
        gsap.set(paths, { strokeDasharray: 1, strokeDashoffset: 1 });
        gsap.to(paths, {
          strokeDashoffset: 0, duration: 1.6, ease: 'power2.inOut', stagger: 0.12,
          scrollTrigger: { trigger: card, start: 'top 85%', once: true },
        });
      });
    }, root);
    return () => ctx.revert();
  }, []);

  return (
    <section id="why" ref={root} className="section why" aria-labelledby="why-title">
      <div className="container">
        <header className="section__head section__head--center">
          <p className="eyebrow" data-reveal>{WHY.eyebrow}</p>
          <h2 id="why-title" className="h2" data-lines>{WHY.title}</h2>
        </header>
        <ul className="why__grid">
          {WHY.items.map((it) => (
            <li className="why__card" key={it.title} data-reveal data-cursor="hover">
              <svg className="why__icon" viewBox="0 0 48 48" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                {ICONS[it.icon].map(([Tag, attrs], i) => <Tag key={i} pathLength={1} {...attrs} />)}
              </svg>
              <h3>{it.title}</h3>
              <p>{it.text}</p>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
