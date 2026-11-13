import { useState } from 'react';
import { FALLBACK_COUNT } from '../data/content';

/** Lazy image with automatic fallback to a local /public/images/fb-N.webp if the remote URL fails. */
export default function Img({ src, alt, fb = 0, width, height, className = '', eager = false, ...rest }) {
  const [failed, setFailed] = useState(false);
  const local = `/images/fb-${(fb % FALLBACK_COUNT) + 1}.webp`;
  return (
    <img
      className={className}
      src={failed ? local : src}
      alt={alt}
      width={width}
      height={height}
      loading={eager ? 'eager' : 'lazy'}
      decoding="async"
      onError={() => !failed && setFailed(true)}
      draggable="false"
      {...rest}
    />
  );
}
