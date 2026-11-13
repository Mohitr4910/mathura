import { useRef, useState } from 'react';
import { BRAND, CONTACT, waLink } from '../data/content';
import { useEnquiry } from '../lib/enquiry';
import { useReveals } from '../lib/reveal';
import MagneticButton from './MagneticButton';

export default function Contact() {
  const root = useRef(null);
  const { items, clear } = useEnquiry();
  const [sent, setSent] = useState(false);
  useReveals(root);

  const submit = (e) => {
    e.preventDefault();
    const f = new FormData(e.currentTarget);
    const lines = [
      `Hello ${BRAND.name}!`,
      `Name: ${f.get('name')}`,
      `Phone: ${f.get('phone')}`,
      `Occasion: ${f.get('occasion')}`,
    ];
    if (items.length) lines.push(`Enquiry list: ${items.map((s) => s.name).join(', ')}`);
    if (f.get('message')) lines.push(`Message: ${f.get('message')}`);
    window.open(waLink(lines.join('\n')), '_blank', 'noopener');
    setSent(true);
    setTimeout(() => setSent(false), 6000);
  };

  return (
    <section id="contact" ref={root} className="section contact" aria-labelledby="contact-title">
      <div className="container contact__grid">
        <div className="contact__form-wrap">
          <p className="eyebrow" data-reveal>{CONTACT.eyebrow}</p>
          <h2 id="contact-title" className="h2" data-lines>{CONTACT.title}</h2>

          <form className="form" onSubmit={submit} data-reveal>
            <div className="field">
              <label htmlFor="c-name">Your name</label>
              <input id="c-name" name="name" type="text" autoComplete="name" required placeholder="e.g. Anjali Sharma" />
            </div>
            <div className="field">
              <label htmlFor="c-phone">Phone / WhatsApp</label>
              <input id="c-phone" name="phone" type="tel" autoComplete="tel" inputMode="tel" required pattern="[0-9+\s\-]{8,16}" placeholder="+91 98765 43210" />
            </div>
            <div className="field">
              <label htmlFor="c-occ">Occasion</label>
              <select id="c-occ" name="occasion" required defaultValue="">
                <option value="" disabled>Select…</option>
                {CONTACT.occasions.map((o) => <option key={o}>{o}</option>)}
              </select>
            </div>
            <div className="field">
              <label htmlFor="c-msg">Message</label>
              <textarea id="c-msg" name="message" rows="4" placeholder="Which sweets, how much, and by when…" />
            </div>
            {items.length > 0 && (
              <p className="form__enq">
                <b>Enquiry list ({items.length}):</b> {items.map((s) => s.name).join(', ')}{' '}
                <button type="button" className="link-btn" onClick={clear}>Clear</button>
              </p>
            )}
            <MagneticButton type="submit" variant="gold">Send on WhatsApp</MagneticButton>
            <p className="form__ok" role="status">{sent ? 'WhatsApp is open — please send the message. Thank you!' : ''}</p>
          </form>
        </div>

        <div className="contact__info">
          <div className="map" data-reveal>
            <iframe
              title={`${BRAND.name} location map`}
              src={BRAND.mapEmbed}
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              allowFullScreen
            />
          </div>
          <dl className="info" data-reveal>
            <div><dt>Address</dt><dd>{BRAND.address}</dd></div>
            <div><dt>Phone</dt><dd><a href={`tel:+${BRAND.whatsapp}`}>{BRAND.phoneDisplay}</a></dd></div>
            <div><dt>Email</dt><dd><a href={`mailto:${BRAND.email}`}>{BRAND.email}</a></dd></div>
            <div>
              <dt>Timings</dt>
              <dd>
                <ul>{BRAND.timings.map((t) => <li key={t.days}><span>{t.days}</span><b>{t.hours}</b></li>)}</ul>
              </dd>
            </div>
          </dl>
        </div>
      </div>
    </section>
  );
}
