import { useCallback, useEffect, useState } from 'react';
import { ScrollTrigger } from './lib/gsap';
import { getLenis } from './lib/lenis';
import { EnquiryProvider } from './lib/enquiry';
import Loader from './components/Loader';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import StorySection from './components/StorySection';
import SignatureScroller from './components/SignatureScroller';
import Menu from './components/Menu';
import Specials from './components/Specials';
import WhyUs from './components/WhyUs';
import Gallery from './components/Gallery';
import Reviews from './components/Reviews';
import FAQ from './components/FAQ';
import Contact from './components/Contact';
import Footer from './components/Footer';
import CustomCursor from './components/CustomCursor';
import Grain from './components/Grain';
import FloatingActions from './components/FloatingActions';

export default function App() {
  const [introPlay, setIntroPlay] = useState(false);
  const [ready, setReady] = useState(false);

  // scroll stays locked until the intro finishes
  useEffect(() => {
    document.documentElement.classList.add('is-locked');
    const lenis = getLenis();
    lenis && lenis.stop();
    window.scrollTo(0, 0);
    if ('scrollRestoration' in history) history.scrollRestoration = 'manual';
  }, []);

  // once fonts + all assets are in, re-measure every trigger
  useEffect(() => {
    const refresh = () => ScrollTrigger.refresh();
    if (document.fonts && document.fonts.ready) document.fonts.ready.then(refresh);
    window.addEventListener('load', refresh);
    const t = setTimeout(refresh, 800);
    return () => { window.removeEventListener('load', refresh); clearTimeout(t); };
  }, []);

  const onRevealStart = useCallback(() => setIntroPlay(true), []);
  const onIntroDone = useCallback(() => {
    document.documentElement.classList.remove('is-locked');
    const lenis = getLenis();
    lenis && lenis.start();
    setReady(true);
    ScrollTrigger.refresh();
  }, []);

  return (
    <EnquiryProvider>
      <Loader onRevealStart={onRevealStart} />
      <a className="skip" href="#story">Skip to content</a>
      <Navbar visible={ready} />
      <main>
        <Hero introPlay={introPlay} onIntroDone={onIntroDone} />
        <StorySection />
        <SignatureScroller />
        <Menu />
        <Specials />
        <WhyUs />
        <Gallery />
        <Reviews />
        <FAQ />
        <Contact />
      </main>
      <Footer />
      <FloatingActions visible={ready} />
      <CustomCursor />
      <Grain />
    </EnquiryProvider>
  );
}
