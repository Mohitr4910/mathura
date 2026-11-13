import { useRef } from 'react';
import { FESTIVALS, FESTIVAL_COPY, waLink } from '../data/content';
import { useReveals } from '../lib/reveal';
import Img from './Img';
import TiltCard from './TiltCard';
import GiftBox from './GiftBox';

export default function Specials() {
  const root = useRef(null);
  useReveals(root);
  return (
    <section id="specials" ref={root} className="section specials" aria-labelledby="sp-title">
      <div className="container">
        <header className="section__head">
          <p className="eyebrow" data-reveal>{FESTIVAL_COPY.eyebrow}</p>
          <h2 id="sp-title" className="h2" data-lines>{FESTIVAL_COPY.title}</h2>
          <p className="lead" data-reveal>{FESTIVAL_COPY.lead}</p>
        </header>
        <div className="fgrid">
          {FESTIVALS.map((f, i) => (
            <TiltCard className={`fcard fcard--${i + 1}`} key={f.id} data-reveal>
              <Img src={f.img} fb={i + 3} alt={`${f.name} special mithai box`} width="700" height="900" />
              <div className="fcard__shade" aria-hidden="true" />
              <div className="fcard__body">
                <span className="fcard__tag">{f.tag}</span>
                <h3>{f.name}</h3>
                <p>{f.text}</p>
                <span className="fcard__offer">{f.offer}</span>
                <a className="link-btn" href={waLink(`Namaste! Mujhe ${f.name} special order ke baare mein jaankari chahiye.`)} target="_blank" rel="noopener noreferrer">
                  Enquire on WhatsApp →
                </a>
              </div>
            </TiltCard>
          ))}
        </div>
        <GiftBox />
      </div>
    </section>
  );
}
