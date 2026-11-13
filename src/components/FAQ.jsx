import { useRef, useState } from 'react';
import { FAQS, FAQ_COPY } from '../data/content';
import { useReveals } from '../lib/reveal';

/** Accessible accordion: real <button>s, aria-expanded/controls, region panels. Panel open/close is a CSS grid-rows transition. */
export default function FAQ() {
  const root = useRef(null);
  const [open, setOpen] = useState(0);
  useReveals(root);

  const onKey = (e, i) => {
    const btns = root.current.querySelectorAll('.faq__q');
    let n = null;
    if (e.key === 'ArrowDown') n = (i + 1) % btns.length;
    if (e.key === 'ArrowUp') n = (i - 1 + btns.length) % btns.length;
    if (e.key === 'Home') n = 0;
    if (e.key === 'End') n = btns.length - 1;
    if (n !== null) { e.preventDefault(); btns[n].focus(); }
  };

  return (
    <section id="faq" ref={root} className="section faq" aria-labelledby="faq-title">
      <div className="container container--narrow">
        <header className="section__head section__head--center">
          <p className="eyebrow" data-reveal>{FAQ_COPY.eyebrow}</p>
          <h2 id="faq-title" className="h2" data-lines>{FAQ_COPY.title}</h2>
        </header>
        <div className="faq__list" data-reveal>
          {FAQS.map((f, i) => {
            const on = open === i;
            return (
              <div className={`faq__item${on ? ' is-open' : ''}`} key={f.q}>
                <h3>
                  <button
                    type="button"
                    id={`faq-q-${i}`}
                    className="faq__q"
                    aria-expanded={on}
                    aria-controls={`faq-a-${i}`}
                    onClick={() => setOpen(on ? -1 : i)}
                    onKeyDown={(e) => onKey(e, i)}
                  >
                    <span>{f.q}</span>
                    <i className="faq__icon" aria-hidden="true" />
                  </button>
                </h3>
                <div id={`faq-a-${i}`} role="region" aria-labelledby={`faq-q-${i}`} className="faq__a">
                  <div><p>{f.a}</p></div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
