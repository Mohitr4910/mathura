import { useRef } from 'react';
import { useMagnetic } from '../lib/useMagnetic';

/** <MagneticButton as="a" href="#x" variant="gold">Label</MagneticButton> */
export default function MagneticButton({ as: Tag = 'button', variant = 'gold', className = '', children, strength = 0.3, ...rest }) {
  const ref = useRef(null);
  useMagnetic(ref, strength);
  return (
    <Tag ref={ref} className={`btn btn--${variant} ${className}`} data-cursor="hover" {...rest}>
      <span className="btn__label">{children}</span>
    </Tag>
  );
}
