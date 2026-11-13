import { useState } from 'react';
import { BRAND, FOOTER, NAV_LINKS } from '../data/content';
import { scrollToTarget } from '../lib/lenis';

const ICON = {
  Instagram: <path d="M7 3h10a4 4 0 0 1 4 4v10a4 4 0 0 1-4 4H7a4 4 0 0 1-4-4V7a4 4 0 0 1 4-4zm5 5a4 4 0 1 0 0 8 4 4 0 0 0 0-8zm5.5-2.2a1 1 0 1 0 0 2 1 1 0 0 0 0-2z" />,
  Facebook: <path d="M14 8h3V4h-3a4 4 0 0 0-4 4v2H7v4h3v7h4v-7h3l1-4h-4V8z" />,
  YouTube: <path d="M21.6 7.2a2.5 2.5 0 0 0-1.8-1.8C18.2 5 12 5 12 5s-6.2 0-7.8.4a2.5 2.5 0 0 0-1.8 1.8C2 8.8 2 12 2 12s0 3.2.4 4.8a2.5 2.5 0 0 0 1.8 1.8C5.8 19 12 19 12 19s6.2 0 7.8-.4a2.5 2.5 0 0 0 1.8-1.8c.4-1.6.4-4.8.4-4.8s0-3.2-.4-4.8zM10 15V9l5 3-5 3z" />,
};

export default function Footer() {
  const [ok, setOk] = useState(false);
  const go = (e, href) => { e.preventDefault(); scrollToTarget(href === '#home' ? 0 : href); };
  return (
    <footer className="footer">
      <div className="container footer__grid">
        <div className="footer__brand">
          <a href="#home" className="nav__brand" onClick={(e) => go(e, '#home')} aria-label={`${BRAND.name} — back to top`}>
            <span className="nav__brand-main">{BRAND.short}</span>
            <span className="nav__brand-sub">{BRAND.sub}</span>
          </a>
          <p>{FOOTER.blurb}</p>
          <ul className="social">
            {BRAND.social.map((s) => (
              <li key={s.label}>
                <a href={s.href} target="_blank" rel="noopener noreferrer" aria-label={s.label} data-cursor="hover">
                  <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">{ICON[s.label]}</svg>
                </a>
              </li>
            ))}
          </ul>
        </div>
        <nav className="footer__links" aria-label="Footer">
          <h4>Quick links</h4>
          <ul>{NAV_LINKS.map((l) => <li key={l.href}><a href={l.href} onClick={(e) => go(e, l.href)}>{l.label}</a></li>)}</ul>
        </nav>
        <div className="footer__news">
          <h4>Newsletter</h4>
          <p>{FOOTER.newsletter}</p>
          {/* Demo only: connect to Mailchimp / your backend in onSubmit */}
          <form onSubmit={(e) => { e.preventDefault(); setOk(true); e.currentTarget.reset(); }}>
            <label htmlFor="nl" className="sr-only">Email address</label>
            <input id="nl" type="email" required placeholder="aapka@email.com" autoComplete="email" />
            <button type="submit" className="btn btn--gold btn--sm"><span className="btn__label">Join</span></button>
          </form>
          <p className="form__ok" role="status">{ok ? 'Dhanyavaad! Jald hi offers bhejenge.' : ''}</p>
        </div>
      </div>
      <div className="container footer__bar">
        <span>{FOOTER.copyright}</span>
        <button type="button" className="totop" onClick={() => scrollToTarget(0)} data-cursor="hover">Back to top <i aria-hidden="true">↑</i></button>
      </div>
    </footer>
  );
}
