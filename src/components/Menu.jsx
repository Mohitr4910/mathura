import { useLayoutEffect, useRef, useState } from 'react';
import { gsap, Flip } from '../lib/gsap';
import { CATEGORIES, SWEETS, MENU_COPY } from '../data/content';
import { prefersReducedMotion } from '../config';
import { useEnquiry } from '../lib/enquiry';
import { useReveals } from '../lib/reveal';
import Img from './Img';

export default function Menu() {
  const root = useRef(null);
  const grid = useRef(null);
  const state = useRef(null);
  const first = useRef(true);
  const [active, setActive] = useState(CATEGORIES[0]);
  const { toggle, has } = useEnquiry();
  useReveals(root);

  const select = (cat) => {
    if (cat === active) return;
    // 1) capture positions BEFORE the DOM changes
    if (!prefersReducedMotion()) state.current = Flip.getState(grid.current.querySelectorAll('.mcard'));
    setActive(cat);
  };

  // 2) after React toggled the .is-hidden classes, animate from the captured state
  useLayoutEffect(() => {
    if (first.current) { first.current = false; return undefined; }
    if (!state.current) return undefined;
    const ctx = gsap.context(() => {
      Flip.from(state.current, {
        duration: 0.8, ease: 'power3.out', absolute: true, stagger: 0.035, simple: true,
        onEnter: (els) => gsap.fromTo(els, { opacity: 0, y: 30, scale: 0.94 }, { opacity: 1, y: 0, scale: 1, duration: 0.7, ease: 'power3.out', stagger: 0.05 }),
        onLeave: (els) => gsap.to(els, { opacity: 0, scale: 0.94, duration: 0.3, ease: 'power2.in' }),
      });
    }, grid);
    state.current = null;
    return () => ctx.revert();
  }, [active]);

  const onKey = (e) => {
    const i = CATEGORIES.indexOf(active);
    let n = null;
    if (e.key === 'ArrowRight') n = (i + 1) % CATEGORIES.length;
    if (e.key === 'ArrowLeft') n = (i - 1 + CATEGORIES.length) % CATEGORIES.length;
    if (e.key === 'Home') n = 0;
    if (e.key === 'End') n = CATEGORIES.length - 1;
    if (n === null) return;
    e.preventDefault();
    select(CATEGORIES[n]);
    root.current.querySelectorAll('[role="tab"]')[n].focus();
  };

  return (
    <section id="menu" ref={root} className="section menu" aria-labelledby="menu-title">
      <div className="container">
        <header className="section__head">
          <p className="eyebrow" data-reveal>{MENU_COPY.eyebrow}</p>
          <h2 id="menu-title" className="h2" data-lines>{MENU_COPY.title}</h2>
          <p className="lead" data-reveal>{MENU_COPY.lead}</p>
        </header>

        <div className="tabs" role="tablist" aria-label="Menu categories" onKeyDown={onKey} data-reveal>
          {CATEGORIES.map((c) => (
            <button
              key={c}
              role="tab"
              type="button"
              id={`tab-${c}`}
              aria-selected={active === c}
              aria-controls="menu-panel"
              tabIndex={active === c ? 0 : -1}
              className={`tab${active === c ? ' is-active' : ''}`}
              onClick={() => select(c)}
            >
              {c}
            </button>
          ))}
        </div>

        <div ref={grid} id="menu-panel" role="tabpanel" aria-labelledby={`tab-${active}`} className="mgrid">
          {SWEETS.map((s) => (
            <article key={s.id} className={`mcard${s.cat === active ? '' : ' is-hidden'}`} data-flip-id={s.id} aria-hidden={s.cat !== active}>
              <div className="mcard__img">
                <Img src={s.img} fb={s.fb} alt={s.name} width="900" height="700" />
              </div>
              <div className="mcard__body">
                <div className="mcard__row">
                  <h3>{s.name}</h3>
                  <span className="price">₹{s.price.toLocaleString('en-IN')}<small>/{s.unit}</small></span>
                </div>
                <p>{s.desc}</p>
                <button
                  type="button"
                  className={`link-btn${has(s.id) ? ' is-added' : ''}`}
                  aria-pressed={has(s.id)}
                  tabIndex={s.cat === active ? 0 : -1}
                  onClick={() => toggle(s)}
                >
                  {has(s.id) ? 'Added to enquiry ✓' : '+ Add to enquiry'}
                </button>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
