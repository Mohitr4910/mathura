import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './lib/gsap';            // registers GSAP plugins once
import { initLenis } from './lib/lenis';
import App from './App';
import './styles/global.css';

initLenis();                    // single Lenis instance, wired to gsap.ticker + ScrollTrigger

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App />
  </StrictMode>
);
