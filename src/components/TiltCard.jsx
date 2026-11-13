import { useRef, useEffect } from 'react';
import { gsap } from '../lib/gsap';

/** Wrapper that adds 3D hover tilt + a cursor-following gold glow. */
export default function TiltCard({ as: Tag = 'article', className = '', children, max = 8, ...rest }) {
  const ref = useRef(null);
  useEffect(() => {
    const el = ref.current;
    if (!el || !window.matchMedia('(hover: hover) and (pointer: fine)').matches) return undefined;
    const rx = gsap.quickTo(el, 'rotationX', { duration: 0.6, ease: 'power3.out' });
    const ry = gsap.quickTo(el, 'rotationY', { duration: 0.6, ease: 'power3.out' });
    gsap.set(el, { transformPerspective: 900 });
    const move = (e) => {
      const r = el.getBoundingClientRect();
      const px = (e.clientX - r.left) / r.width;
      const py = (e.clientY - r.top) / r.height;
      ry((px - 0.5) * max * 2);
      rx(-(py - 0.5) * max * 2);
      el.style.setProperty('--mx', `${px * 100}%`);
      el.style.setProperty('--my', `${py * 100}%`);
    };
    const leave = () => { rx(0); ry(0); };
    el.addEventListener('pointermove', move);
    el.addEventListener('pointerleave', leave);
    return () => {
      el.removeEventListener('pointermove', move);
      el.removeEventListener('pointerleave', leave);
      gsap.set(el, { rotationX: 0, rotationY: 0, clearProps: 'transform' });
    };
  }, [max]);
  return (
    <Tag ref={ref} className={`tilt ${className}`} data-cursor="hover" {...rest}>
      <span className="tilt__glow" aria-hidden="true" />
      {children}
    </Tag>
  );
}
