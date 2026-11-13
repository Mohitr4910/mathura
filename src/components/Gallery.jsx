import { useCallback, useEffect, useRef, useState } from 'react';
import { GALLERY } from '../data/content';
import { getLenis } from '../lib/lenis';
import { useReveals } from '../lib/reveal';
import Img from './Img';

export default function Gallery() {
  const root = useRef(null);
  const [open, setOpen] = useState(null); // index | null
  const lastFocus = useRef(null);
  const closeBtn = useRef(null);
  const dialog = useRef(null);
  const items = GALLERY.items;
  useReveals(root);

  const close = useCallback(() => setOpen(null), []);
  const step = useCallback((d) => setOpen((i) => (i === null ? i : (i + d + items.length) % items.length)), [items.length]);

  // Lightbox: scroll lock, focus handling, keyboard (Esc, arrows, Tab trap)
  useEffect(() => {
    if (open === null) return undefined;
    const lenis = getLenis();
    lenis && lenis.stop();
    closeBtn.current && closeBtn.current.focus();
    const onKey = (e) => {
      if (e.key === 'Escape') close();
      else if (e.key === 'ArrowRight') step(1);
      else if (e.key === 'ArrowLeft') step(-1);
      else if (e.key === 'Tab' && dialog.current) {
        const f = dialog.current.querySelectorAll('button');
        const first = f[0];
        const last = f[f.length - 1];
        if (e.shiftKey && document.activeElement === first) { e.preventDefault(); last.focus(); }
        else if (!e.shiftKey && document.activeElement === last) { e.preventDefault(); first.focus(); }
      }
    };
    window.addEventListener('keydown', onKey);
    return () => {
      window.removeEventListener('keydown', onKey);
      lenis && lenis.start();
      lastFocus.current && lastFocus.current.focus();
    };
  }, [open === null, close, step]); // eslint-disable-line react-hooks/exhaustive-deps

  return (
    <section id="gallery" ref={root} className="section gallery" aria-labelledby="gal-title">
      <div className="container">
        <header className="section__head">
          <p className="eyebrow" data-reveal>{GALLERY.eyebrow}</p>
          <h2 id="gal-title" className="h2" data-lines>{GALLERY.title}</h2>
        </header>
        <ul className="masonry">
          {items.map((g, i) => (
            <li className="masonry__item" key={g.src} data-reveal>
              <button type="button" className="gitem" data-cursor="hover" style={{ '--ar': `${g.w} / ${g.h}` }} aria-label={`Open photo: ${g.caption}`}
                onClick={(e) => { lastFocus.current = e.currentTarget; setOpen(i); }}>
                <Img src={g.src} fb={i} alt={g.alt} width={g.w} height={g.h} />
                <span className="gitem__cap">{g.caption}</span>
              </button>
            </li>
          ))}
        </ul>
      </div>

      {open !== null && (
        <div className="lightbox" role="dialog" aria-modal="true" aria-label="Photo viewer" ref={dialog} onClick={(e) => { if (e.target === e.currentTarget) close(); }}>
          <button ref={closeBtn} type="button" className="lb__btn lb__close" onClick={close} aria-label="Close photo viewer">✕</button>
          <button type="button" className="lb__btn lb__prev" onClick={() => step(-1)} aria-label="Previous photo">←</button>
          <figure className="lb__fig">
            <Img key={open} src={items[open].src.replace(/w=\d+&h=\d+/, 'w=1400&h=1400')} fb={open} alt={items[open].alt} eager />
            <figcaption>{items[open].caption} <span>{open + 1} / {items.length}</span></figcaption>
          </figure>
          <button type="button" className="lb__btn lb__next" onClick={() => step(1)} aria-label="Next photo">→</button>
        </div>
      )}
    </section>
  );
}
