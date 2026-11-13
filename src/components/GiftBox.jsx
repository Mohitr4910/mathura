import { useRef, useState, useEffect } from 'react';
import { gsap } from '../lib/gsap';
import { GIFTBOX, SWEETS, BRAND, waLink } from '../data/content';
import Img from './Img';
import MagneticButton from './MagneticButton';

const OPTIONS = GIFTBOX.optionIds.map((id) => SWEETS.find((s) => s.id === id));

export default function GiftBox() {
  const [picked, setPicked] = useState([]);
  const slots = useRef(null);
  const full = picked.length >= GIFTBOX.slots;

  const toggle = (id) =>
    setPicked((p) => (p.includes(id) ? p.filter((x) => x !== id) : p.length >= GIFTBOX.slots ? p : [...p, id]));

  // pop animation for the newest filled slot
  useEffect(() => {
    if (!picked.length || !slots.current) return;
    const el = slots.current.querySelectorAll('.gslot')[picked.length - 1];
    if (el) gsap.fromTo(el, { scale: 0.7, opacity: 0.2 }, { scale: 1, opacity: 1, duration: 0.6, ease: 'back.out(2)' });
  }, [picked.length]);

  const names = picked.map((id) => OPTIONS.find((o) => o.id === id).name);
  const msg = picked.length
    ? `Namaste ${BRAND.name}! Mujhe "Build your own gift box" order karna hai.\nMeri chuni hui mithaiyan:\n${names.map((n, i) => `${i + 1}. ${n}`).join('\n')}\nPlease price aur delivery ki jaankari dein.`
    : '';

  return (
    <div className="gift" data-reveal aria-labelledby="gift-title">
      <div className="gift__intro">
        <p className="eyebrow">{GIFTBOX.eyebrow}</p>
        <h3 id="gift-title" className="h2 h2--sm">{GIFTBOX.title}</h3>
        <p className="lead">{GIFTBOX.lead}</p>

        <ul className="gift__options" aria-label="Choose sweets for your box">
          {OPTIONS.map((o) => {
            const on = picked.includes(o.id);
            const disabled = full && !on;
            return (
              <li key={o.id}>
                <button
                  type="button"
                  className={`gopt${on ? ' is-on' : ''}`}
                  aria-pressed={on}
                  aria-disabled={disabled}
                  disabled={disabled}
                  onClick={() => toggle(o.id)}
                >
                  <Img className="gopt__thumb" src={o.img} fb={o.fb} alt="" width="64" height="64" />
                  {o.name}
                  <span className="gopt__tick" aria-hidden="true">{on ? '✓' : '+'}</span>
                </button>
              </li>
            );
          })}
        </ul>
      </div>

      <div className="gift__box">
        <div className="gbox" aria-hidden="true">
          <div ref={slots} className="gbox__grid">
            {Array.from({ length: GIFTBOX.slots }).map((_, i) => {
              const o = picked[i] && OPTIONS.find((x) => x.id === picked[i]);
              return (
                <div className={`gslot${o ? ' is-filled' : ''}`} key={i}>
                  {o ? (<><Img src={o.img} fb={o.fb} alt="" width="300" height="225" /><em className="gslot__name">{o.name}</em></>) : <span>{i + 1}</span>}
                </div>
              );
            })}
          </div>
        </div>
        <div className="gift__summary" aria-live="polite">
          <p className="gift__count"><b>{picked.length}</b> / {GIFTBOX.slots} chuni gayi</p>
          {picked.length ? (
            <ul className="gift__list">{names.map((n) => <li key={n}>{n}</li>)}</ul>
          ) : (
            <p className="gift__empty">Upar se {GIFTBOX.slots} mithaiyan chuniye.</p>
          )}
          <div className="gift__actions">
            <MagneticButton
              as="a"
              variant="gold"
              href={picked.length ? waLink(msg) : undefined}
              target="_blank"
              rel="noopener noreferrer"
              aria-disabled={!picked.length}
              className={picked.length ? '' : 'is-disabled'}
              onClick={(e) => { if (!picked.length) e.preventDefault(); }}
            >
              Send on WhatsApp
            </MagneticButton>
            {picked.length > 0 && <button type="button" className="link-btn" onClick={() => setPicked([])}>Reset</button>}
          </div>
        </div>
      </div>
    </div>
  );
}
