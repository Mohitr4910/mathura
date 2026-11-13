import { useLayoutEffect, useRef } from 'react';
import { gsap } from '../lib/gsap';
import { SIGNATURE, SIGNATURE_SWEETS } from '../data/content';
import { prefersReducedMotion } from '../config';
import { useEnquiry } from '../lib/enquiry';
import { useReveals } from '../lib/reveal';
import Img from './Img';
import TiltCard from './TiltCard';

export default function SignatureScroller() {
  const root = useRef(null);
  const track = useRef(null);
  const { toggle, has } = useEnquiry();
  useReveals(root);

  // GSAP pin + horizontal scrub. Distance is a function so it re-measures on refresh/resize.
  useLayoutEffect(() => {
    if (prefersReducedMotion()) return undefined;
    const ctx = gsap.context(() => {
      const dist = () => Math.max(0, track.current.scrollWidth - window.innerWidth);
      gsap.to(track.current, {
        x: () => -dist(),
        ease: 'none',
        scrollTrigger: {
          trigger: root.current,
          start: 'top top',
          end: () => `+=${dist()}`,
          pin: true,
          scrub: true,
          anticipatePin: 1,
          invalidateOnRefresh: true,
        },
      });
    }, root);
    return () => ctx.revert();
  }, []);

  return (
    <section id="signature" ref={root} className="sig" aria-labelledby="sig-title">
      <div ref={track} className="sig__track">
        <div className="sig__intro">
          <p className="eyebrow" data-reveal>{SIGNATURE.eyebrow}</p>
          <h2 id="sig-title" className="h2" data-lines>{SIGNATURE.title}</h2>
          <p className="lead" data-reveal>{SIGNATURE.lead}</p>
          <span className="sig__hint" aria-hidden="true">Scroll karte rahiye <i>→</i></span>
        </div>
        {SIGNATURE_SWEETS.map((s, i) => (
          <TiltCard className="scard" key={s.id}>
            <div className="scard__img">
              <Img src={s.img} fb={s.fb} alt={`${s.name} — ${s.desc}`} width="900" height="700" />
              <span className="scard__no">0{i + 1}</span>
            </div>
            <div className="scard__body">
              <h3>{s.name}</h3>
              <p>{s.desc}</p>
              <div className="scard__foot">
                <span className="price">₹{s.price.toLocaleString('en-IN')}<small>/{s.unit}</small></span>
                <button type="button" className={`btn btn--outline btn--sm${has(s.id) ? ' is-added' : ''}`} aria-pressed={has(s.id)} onClick={() => toggle(s)}>
                  <span className="btn__label">{has(s.id) ? 'Added ✓' : 'Add to enquiry'}</span>
                </button>
              </div>
            </div>
          </TiltCard>
        ))}
        <div className="sig__end" aria-hidden="true">Aur bhi bahut kuch<br />menu mein ↓</div>
      </div>
    </section>
  );
}
