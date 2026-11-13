import { useEffect, useRef, useState } from 'react';
import { gsap } from '../lib/gsap';
import { BRAND, NAV_LINKS, waLink } from '../data/content';
import { getLenis, scrollToTarget } from '../lib/lenis';
import MagneticButton from './MagneticButton';

export default function Navbar({ visible }) {
  const nav = useRef(null);
  const menu = useRef(null);
  const toggleBtn = useRef(null);
  const [open, setOpen] = useState(false);
  const wasOpen = useRef(false);

  // transparent -> glass, hide on scroll down / show on scroll up
  useEffect(() => {
    const lenis = getLenis();
    if (!lenis) return undefined;
    const onScroll = ({ scroll, direction }) => {
      const el = nav.current;
      if (!el) return;
      el.classList.toggle('is-solid', scroll > 60);
      if (direction === 1 && scroll > 240) el.classList.add('is-hidden');
      else if (direction === -1 || scroll <= 240) el.classList.remove('is-hidden');
    };
    return lenis.on('scroll', onScroll); // Lenis returns its own unsubscribe function
  }, []);

  // mobile overlay menu: clip-path reveal + staggered links
  useEffect(() => {
    const m = menu.current;
    if (!m) return undefined;
    const lenis = getLenis();
    const ctx = gsap.context(() => {
      if (open) {
        m.style.visibility = 'visible';
        gsap.fromTo(m, { clipPath: 'inset(0 0 100% 0)' }, { clipPath: 'inset(0 0 0% 0)', duration: 0.9, ease: 'expo.out' });
        gsap.fromTo('.mnav__link, .mnav__cta', { yPercent: 110, opacity: 0 }, { yPercent: 0, opacity: 1, duration: 0.9, ease: 'power4.out', stagger: 0.06, delay: 0.2 });
      } else if (m.style.visibility === 'visible') {
        gsap.to(m, { clipPath: 'inset(0 0 100% 0)', duration: 0.7, ease: 'expo.inOut', onComplete: () => { m.style.visibility = 'hidden'; } });
      }
    }, m);
    if (open) { lenis && lenis.stop(); document.body.classList.add('menu-open'); }
    else if (wasOpen.current) { lenis && lenis.start(); document.body.classList.remove('menu-open'); }
    wasOpen.current = open;
    const onKey = (e) => { if (e.key === 'Escape' && open) { setOpen(false); toggleBtn.current && toggleBtn.current.focus(); } };
    window.addEventListener('keydown', onKey);
    return () => { window.removeEventListener('keydown', onKey); ctx.revert(); };
  }, [open]);

  const go = (e, href) => {
    e.preventDefault();
    setOpen(false);
    setTimeout(() => scrollToTarget(href === '#home' ? 0 : href), open ? 450 : 0);
  };

  return (
    <>
      <header ref={nav} className={`nav${visible ? ' is-in' : ''}`}>
        <a href="#home" className="nav__brand" onClick={(e) => go(e, '#home')} aria-label={`${BRAND.name} — home`}>
          <span className="nav__brand-main">{BRAND.short}</span>
          <span className="nav__brand-sub">{BRAND.sub}</span>
        </a>
        <nav className="nav__links" aria-label="Primary">
          {NAV_LINKS.map((l) => (
            <a key={l.href} href={l.href} className="nav__link" onClick={(e) => go(e, l.href)}>{l.label}</a>
          ))}
        </nav>
        <div className="nav__right">
          <MagneticButton as="a" variant="gold" className="btn--sm nav__order" href={waLink('Namaste! Mujhe mithai order karni hai.')} target="_blank" rel="noopener noreferrer">
            Order Now
          </MagneticButton>
          <button
            ref={toggleBtn}
            type="button"
            className={`burger${open ? ' is-open' : ''}`}
            aria-label={open ? 'Close menu' : 'Open menu'}
            aria-expanded={open}
            aria-controls="mobile-menu"
            onClick={() => setOpen((o) => !o)}
          >
            <span /><span />
          </button>
        </div>
      </header>

      <div id="mobile-menu" ref={menu} className="mnav" role="dialog" aria-modal="true" aria-label="Menu" style={{ visibility: 'hidden' }}>
        <nav aria-label="Mobile">
          {NAV_LINKS.map((l, i) => (
            <span className="mnav__mask" key={l.href}>
              <a href={l.href} className="mnav__link" tabIndex={open ? 0 : -1} onClick={(e) => go(e, l.href)}>
                <small>0{i + 1}</small>{l.label}
              </a>
            </span>
          ))}
        </nav>
        <span className="mnav__mask">
          <a className="mnav__cta btn btn--gold" tabIndex={open ? 0 : -1} href={waLink('Namaste! Mujhe mithai order karni hai.')} target="_blank" rel="noopener noreferrer">
            <span className="btn__label">Order Now</span>
          </a>
        </span>
      </div>
    </>
  );
}
