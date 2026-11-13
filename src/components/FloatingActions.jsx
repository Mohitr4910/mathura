import { BRAND, waLink } from '../data/content';
import { useEnquiry } from '../lib/enquiry';

/** Floating WhatsApp button (gentle pulse) + the live enquiry-list pill. */
export default function FloatingActions({ visible }) {
  const { items } = useEnquiry();
  const text = items.length
    ? `Namaste ${BRAND.name}! Mujhe in mithaiyon ke baare mein jaankari chahiye:\n${items.map((s, i) => `${i + 1}. ${s.name}`).join('\n')}`
    : 'Namaste! Mujhe mithai order karni hai.';
  return (
    <div className={`fab${visible ? ' is-in' : ''}`}>
      {items.length > 0 && (
        <a className="fab__pill" href={waLink(text)} target="_blank" rel="noopener noreferrer">
          Enquiry list <b>{items.length}</b> →
        </a>
      )}
      <a className="fab__wa" href={waLink(text)} target="_blank" rel="noopener noreferrer" aria-label="Chat on WhatsApp" data-cursor="hover">
        <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
          <path d="M20.5 3.5A11 11 0 0 0 3.2 17L2 22l5.1-1.3A11 11 0 1 0 20.5 3.5zM12 20.2a9 9 0 0 1-4.6-1.3l-.3-.2-3 .8.8-2.9-.2-.3a9 9 0 1 1 7.3 3.9zm5-6.7c-.3-.1-1.6-.8-1.9-.9s-.5-.1-.6.1-.7.9-.9 1.1-.3.2-.6.1a7.4 7.4 0 0 1-3.7-3.2c-.3-.5.3-.5.8-1.5.1-.2 0-.4 0-.5l-.9-2.1c-.2-.5-.4-.5-.6-.5h-.5a1 1 0 0 0-.8.4 3.1 3.1 0 0 0-1 2.3 5.4 5.4 0 0 0 1.1 2.9 12.4 12.4 0 0 0 4.7 4.1c1.7.7 2.4.8 3.2.7a2.7 2.7 0 0 0 1.8-1.3 2.2 2.2 0 0 0 .2-1.3c-.1-.1-.3-.2-.6-.3z" />
        </svg>
      </a>
    </div>
  );
}
