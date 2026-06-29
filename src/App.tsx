import { useState, useEffect, useRef } from 'react';
import { Navbar } from './components/Navbar';
import { SolarSystemScene } from './components/SolarSystemScene';
import { PlatformDetail } from './components/PlatformDetail';
import { LogoSlider } from './components/LogoSlider';
import { CrisisSection } from './components/CrisisSection';
import { SolutionsSection } from './components/SolutionsSection';
import { Mail, MapPin, Phone } from 'lucide-react';
import { motion, useReducedMotion } from 'framer-motion';
import { CaseStudiesSection } from './components/CaseStudiesSection';

const MainContactForm: React.FC = () => {
  const [fields, setFields] = useState({ name: '', email: '', phone: '', subject: '', message: '' });
  const [status, setStatus] = useState<'idle' | 'sending' | 'sent' | 'error'>('idle');

  const set = (k: keyof typeof fields) =>
    (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) =>
      setFields(f => ({ ...f, [k]: e.target.value }));

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus('sending');
    try {
      const res = await fetch('https://formsubmit.co/ajax/abemaharjan@gmail.com', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
        body: JSON.stringify({
          name: fields.name,
          email: fields.email,
          phone: fields.phone || 'Not provided',
          subject: fields.subject,
          message: fields.message,
          _subject: `[SUMS] New message: ${fields.subject}`,
        }),
      });
      const data = await res.json();
      if (data.success) {
        setStatus('sent');
        setFields({ name: '', email: '', phone: '', subject: '', message: '' });
      } else {
        setStatus('error');
      }
    } catch {
      setStatus('error');
    }
  };

  if (status === 'sent') {
    return (
      <div className="flex flex-col items-center justify-center py-16 gap-4">
        <div className="w-14 h-14 rounded-full bg-[#FF5C00]/15 border border-[#FF5C00]/40 flex items-center justify-center">
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#FF5C00" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
            <polyline points="20 6 9 17 4 12" />
          </svg>
        </div>
        <h4 className="text-white font-bold text-lg">Message Sent!</h4>
        <p className="text-white/50 text-sm">We'll get back to you shortly.</p>
        <button onClick={() => setStatus('idle')} className="text-[#FF5C00] text-sm underline cursor-pointer mt-2">
          Send another message
        </button>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-5">
      <div className="flex flex-col gap-2">
        <label className="text-white/60 text-sm font-medium">Your Name</label>
        <input type="text" placeholder="John Doe" value={fields.name} onChange={set('name')} required
          className="bg-white/[0.04] border border-white/10 focus:border-[#FF5C00]/50 rounded-xl px-5 py-3.5 text-white text-base outline-none transition-colors duration-200 placeholder:text-white/25" />
      </div>
      <div className="flex flex-col gap-2">
        <label className="text-white/60 text-sm font-medium">Email Address</label>
        <input type="email" placeholder="john@example.com" value={fields.email} onChange={set('email')} required
          className="bg-white/[0.04] border border-white/10 focus:border-[#FF5C00]/50 rounded-xl px-5 py-3.5 text-white text-base outline-none transition-colors duration-200 placeholder:text-white/25" />
      </div>
      <div className="flex flex-col gap-1.5">
        <div className="flex items-baseline gap-2">
          <label className="text-white/60 text-sm font-medium">Phone Number</label>
          <span className="text-white/30 text-xs">(optional)</span>
        </div>
        <input type="tel" placeholder="98XXXXXXXX" value={fields.phone} onChange={set('phone')}
          className="bg-white/[0.04] border border-white/10 focus:border-[#FF5C00]/50 rounded-xl px-5 py-3.5 text-white text-base outline-none transition-colors duration-200 placeholder:text-white/25" />
        <span className="text-white/30 text-xs mt-0.5">Exactly 10 digits if provided.</span>
      </div>
      <div className="flex flex-col gap-2">
        <label className="text-white/60 text-sm font-medium">Subject</label>
        <input type="text" placeholder="General Inquiry" value={fields.subject} onChange={set('subject')} required
          className="bg-white/[0.04] border border-white/10 focus:border-[#FF5C00]/50 rounded-xl px-5 py-3.5 text-white text-base outline-none transition-colors duration-200 placeholder:text-white/25" />
      </div>
      <div className="flex flex-col gap-2">
        <label className="text-white/60 text-sm font-medium">Message</label>
        <textarea rows={6} placeholder="How can we help?" value={fields.message} onChange={set('message')} required
          className="bg-white/[0.04] border border-white/10 focus:border-[#FF5C00]/50 rounded-xl px-5 py-3.5 text-white text-base outline-none transition-colors duration-200 placeholder:text-white/25 resize-none" />
      </div>
      {status === 'error' && (
        <p className="text-red-400 text-sm">Something went wrong. Please try again.</p>
      )}
      <button type="submit" disabled={status === 'sending'}
        className="mt-1 w-full bg-[#FF5C00] hover:bg-[#e04f00] disabled:opacity-60 text-white font-bold text-base py-4 rounded-xl transition-all duration-300 hover:shadow-[0_0_24px_rgba(255,92,0,0.35)] cursor-pointer tracking-wide">
        {status === 'sending' ? 'Sending…' : 'Submit Message'}
      </button>
    </form>
  );
};

function App() {
  // scrollProgress 0→1 drives planet line-up transition in phase 2
  const [scrollProgress, setScrollProgress] = useState(0);
  const [hideCanvas, setHideCanvas] = useState(false);
  const impactHeadingRef = useRef<HTMLHeadingElement>(null);
  const [detailScrollY, setDetailScrollY] = useState(0);
  const [activePlatform, setActivePlatform] = useState<string | null>(null);
  const [zoomingPlatform, setZoomingPlatform] = useState<string | null>(null);
  const [activeSection, setActiveSection] = useState('overview');
  const [pastTour, setPastTour] = useState(false);
  const [ecosystemRevealed, setEcosystemRevealed] = useState(false);
  // ecosystemPhase: 0=not reached, 1=solar system visible+orbiting+text shown, 2=planets aligning+text hidden
  const [ecosystemPhase, setEcosystemPhase] = useState(0);

  const homeScrollPos = useRef(0);
  const isTransitioning = useRef(false);
  const shouldReduceMotion = useReducedMotion();

  useEffect(() => {
    const handleScroll = () => {
      if (isTransitioning.current || zoomingPlatform) return;

      const currentScrollY = window.scrollY;

      if (activePlatform) {
        setDetailScrollY(currentScrollY);
        return;
      }

      const vh = window.innerHeight;

      // Track if we scrolled to ecosystem section
      const ecosystemSectionEl = document.getElementById('ecosystem-section');
      if (ecosystemSectionEl) {
        const rect = ecosystemSectionEl.getBoundingClientRect();
        const scrolledIntoSection = -rect.top;
        // Phase 1: planet orbiting ends very early, alignment starts almost immediately
        const phase1End = 0.05 * vh;

        const hideThreshold = window.innerWidth < 768 ? 0.8 * vh : 1.2 * vh;
        const isInsideEcosystem = scrolledIntoSection >= 0 && scrolledIntoSection < hideThreshold;
        if (isInsideEcosystem || activePlatform) {
          setEcosystemRevealed(true);
        } else {
          setEcosystemRevealed(false);
        }

        // Hide canvas permanently once user scrolls past the ecosystem section
        setHideCanvas(scrolledIntoSection >= hideThreshold);

        // Phase 1 ends at 0.05*vh — planets orbit briefly while user reads the text
        // Phase 2 ends at 0.45*vh — planets align horizontally (snappier)
        const alignEnd = 0.45 * vh;

        if (scrolledIntoSection < 0) {
          setEcosystemPhase(0);
          setScrollProgress(0);
        } else if (scrolledIntoSection < phase1End) {
          setEcosystemPhase(1);
          setScrollProgress(0);
        } else if (scrolledIntoSection < alignEnd) {
          setEcosystemPhase(2);
          const progress = Math.min(1.0, (scrolledIntoSection - phase1End) / (alignEnd - phase1End));
          setScrollProgress(progress);
        } else {
          setEcosystemPhase(3);
          setScrollProgress(1.0);
        }
      }

      // Track whether user has scrolled past initial screen
      setPastTour(currentScrollY > vh * 0.8);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [activePlatform, zoomingPlatform]);

  // Fade canvas when OUR IMPACT heading enters the viewport
  useEffect(() => {
    const el = impactHeadingRef.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => setHideCanvas(entry.isIntersecting),
      { threshold: 0.1 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  // Sync URL hash routing
  useEffect(() => {
    const handleHashChange = () => {
      const hash = window.location.hash;
      const cleanHash = hash.startsWith('#/') ? hash.substring(2) : hash.substring(1);
      const validPlatforms = ['cogknit', 'sip', 'aic'];

      if (validPlatforms.includes(cleanHash)) {
        if (!activePlatform) {
          homeScrollPos.current = window.scrollY;
        }
        setActivePlatform(cleanHash);
        window.scrollTo(0, 0);
        setDetailScrollY(0);
      } else {
        if (activePlatform) {
          setActivePlatform(null);
          setDetailScrollY(0);
          // Restore scroll position
          setTimeout(() => {
            window.scrollTo({
              top: homeScrollPos.current,
              behavior: 'auto'
            });
          }, 50);
        }
      }
    };

    window.addEventListener('hashchange', handleHashChange);
    handleHashChange();

    return () => window.removeEventListener('hashchange', handleHashChange);
  }, [activePlatform]);

  const handleSelectPlatform = (platformId: string) => {
    if (zoomingPlatform || isTransitioning.current) return;

    setZoomingPlatform(platformId);
    isTransitioning.current = true;

    // Wait for cinematic zoom before changing route
    setTimeout(() => {
      window.location.hash = `#/${platformId}`;
      setZoomingPlatform(null);
      isTransitioning.current = false;
    }, 850);
  };

  const handleBackToEcosystem = () => {
    window.location.hash = '#/';
  };

  const handleNavigate = (target: string) => {
    if (target === 'ecosystem') {
      if (activePlatform) {
        handleBackToEcosystem();
        setTimeout(() => {
          document.getElementById('ecosystem-section')?.scrollIntoView({ behavior: 'smooth' });
        }, 150);
      } else {
        document.getElementById('ecosystem-section')?.scrollIntoView({ behavior: 'smooth' });
      }
      return;
    }

    const performScroll = () => {
      if (target === 'about') {
        document.getElementById('about')?.scrollIntoView({ behavior: 'smooth' });
      } else if (target === 'partners') {
        document.getElementById('partners')?.scrollIntoView({ behavior: 'smooth' });
      } else if (target === 'contact') {
        document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' });
      }
    };

    if (activePlatform) {
      setActivePlatform(null);
      setDetailScrollY(0);
      window.location.hash = '#/';

      setTimeout(() => {
        performScroll();
      }, 100);
    } else {
      performScroll();
    }
  };


  // Headline word splitting for stagger animation
  const headlineLine1 = "Students Are Graduating.";
  const headlineLine2 = "Nobody's Ready.";

  return (
    <div className={`bg-[#040507] text-white relative font-sans selection:bg-brand selection:text-white min-h-screen`}>

      <SolarSystemScene
        scrollProgress={scrollProgress}
        activePlatform={activePlatform}
        zoomingPlatform={zoomingPlatform}
        detailScrollY={detailScrollY}
        onSelectPlatform={handleSelectPlatform}
        ecosystemRevealed={ecosystemRevealed}
        hideCanvas={hideCanvas}
      />

      {/* Global Navbar */}
      <Navbar
        activePlatform={activePlatform}
        onBackToEcosystem={handleBackToEcosystem}
        onNavigate={handleNavigate}
      />

      {/* MAIN CONTENT LAYERS */}
      <div className="relative z-10 w-full pointer-events-none">

        {/* HOMEPAGE TWO-PHASE CONTAINER */}
        {!activePlatform && (
          <div>

            <div className="w-full min-h-screen flex flex-col justify-between pt-24 px-6 relative">
              <div className="flex-grow flex flex-col items-center justify-center text-center max-w-7xl mx-auto w-full pointer-events-auto">
                {/* Eyebrow Label */}
                <motion.span
                  initial={{ opacity: 0, y: shouldReduceMotion ? 0 : -15 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, ease: "easeOut" }}
                  className="text-[#FF5C00] text-[13px] font-extrabold tracking-[0.35em] uppercase mb-8"
                >
                  THE PROBLEM WITH EDUCATION
                </motion.span>

                {/* Large Bold Headline with word-by-word stagger */}
                <h1 className="font-[700] tracking-tight leading-[1.15] flex flex-col items-center w-full">
                  <motion.span
                    className="text-white text-6xl sm:text-7xl md:text-9xl block w-full pb-2"
                    initial="hidden"
                    animate="visible"
                    variants={{
                      hidden: {},
                      visible: { transition: { staggerChildren: 0.1 } }
                    }}
                  >
                    {headlineLine1.split(" ").map((word, idx) => (
                      <motion.span
                        key={idx}
                        className="inline-block mr-4 md:mr-6"
                        variants={{
                          hidden: { opacity: 0, y: shouldReduceMotion ? 0 : 50 },
                          visible: { opacity: 1, y: 0 }
                        }}
                        transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
                      >
                        {word}
                      </motion.span>
                    ))}
                  </motion.span>

                  <motion.span
                    className="text-[#FF5C00] text-4xl sm:text-5xl md:text-7xl block mt-3 w-full pb-2"
                    initial="hidden"
                    animate="visible"
                    variants={{
                      hidden: {},
                      visible: { transition: { staggerChildren: 0.1, delayChildren: 0.35 } }
                    }}
                  >
                    {headlineLine2.split(" ").map((word, idx) => (
                      <motion.span
                        key={idx}
                        className="inline-block mr-4 md:mr-6"
                        variants={{
                          hidden: { opacity: 0, y: shouldReduceMotion ? 0 : 50 },
                          visible: { opacity: 1, y: 0 }
                        }}
                        transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
                      >
                        {word}
                      </motion.span>
                    ))}
                  </motion.span>
                </h1>

                {/* Subheading — wider, bigger */}
                <motion.p
                  initial={{ opacity: 0, y: shouldReduceMotion ? 0 : 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.9, duration: 0.7, ease: "easeOut" }}
                  className="text-white/60 text-base md:text-xl mt-10 max-w-3xl leading-relaxed"
                >
                  Colleges are producing degrees, not professionals. The gap between what's taught and what's needed has never been wider — and the system keeps rewarding the wrong things.
                </motion.p>
              </div>

              <div className="w-full mt-12 pb-6">
                <LogoSlider />
              </div>
            </div>

            <div id="crisis-section">
              <CrisisSection />
            </div>

            <SolutionsSection />

            <div
              id="ecosystem-section"
              className="relative pointer-events-none min-h-[100vh] md:min-h-[200vh]"
            >
              {/* Sticky container for viewport elements */}
              <div className="sticky top-0 h-screen w-full flex flex-col pointer-events-none">

                {/* Top text overlay — fixed to viewport so it appears the moment phase fires */}
                <motion.div
                  className="absolute top-32 left-0 right-0 px-6 flex flex-col items-center text-center gap-3 pointer-events-none z-30"
                  animate={
                    ecosystemPhase >= 1
                      ? { opacity: 1, y: 0, scale: 1 }
                      : { opacity: 0, y: 30, scale: 0.96 }
                  }
                  transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
                >
                  <span className="text-[#FF5C00] text-xs font-bold tracking-[0.3em] uppercase bg-[#040507]/90 px-3.5 py-1 rounded border border-[#FF5C00]/20 backdrop-blur-md">
                    The Integrated Solution
                  </span>

                  <h2 className="font-serif text-3xl md:text-5xl lg:text-6xl font-black leading-tight text-white drop-shadow-[0_4px_16px_rgba(0,0,0,0.95)] max-w-4xl">
                    We Built the Ecosystem to Solve These Problems
                  </h2>

                  <p className="text-white/80 text-sm md:text-base max-w-[620px] leading-relaxed drop-shadow-[0_2px_8px_rgba(0,0,0,0.9)] bg-[#040507]/50 px-4 py-2 rounded-lg backdrop-blur-sm">
                    SUMs connects every isolated tool, workshop, and training into a single unified gravitational center.
                  </p>
                </motion.div>

                {/* Bottom hint removed per feedback */}
              </div>
            </div>



            {/* MOBILE PLATFORM SELECTOR — shown after ecosystem section, mobile only */}
            <div className="md:hidden relative z-10 pointer-events-auto bg-[#040507] px-4 pt-10 pb-6 border-t border-white/5">
              <p className="text-center text-white/40 text-[10px] font-bold tracking-[0.3em] uppercase mb-5">
                Explore Platforms
              </p>
              <div className="space-y-3">
                {[
                  { id: 'cogknit', name: 'Cogknit', tagline: 'Smart Learning Platform', logo: '/cogknitlogo.png' },
                  { id: 'sip', name: 'SIP', tagline: 'Student Innovators Program', logo: '/logos/sip_logo.png' },
                  { id: 'aic', name: 'AIC', tagline: 'Academia Industry Collaboration', logo: '/logos/aic_logo.png' },
                ].map(platform => (
                  <button
                    key={platform.id}
                    onClick={() => handleSelectPlatform(platform.id)}
                    className="w-full flex items-center gap-4 p-4 rounded-xl border border-white/5 bg-white/[0.02] active:bg-[#FD4400]/10 active:border-[#FD4400]/30 transition-all duration-150 cursor-pointer"
                  >
                    <div className="w-12 h-12 rounded-full border border-[#FD4400]/25 bg-[#FD4400]/5 flex items-center justify-center shrink-0">
                      <img src={platform.logo} alt={platform.name} className="w-8 h-8 object-contain" style={{ filter: 'drop-shadow(0 0 4px rgba(253,68,0,0.5))' }} />
                    </div>
                    <div className="text-left flex-1">
                      <h3 className="text-white font-bold text-base">{platform.name}</h3>
                      <p className="text-white/40 text-xs mt-0.5">{platform.tagline}</p>
                    </div>
                    <span className="text-[#FD4400] text-base font-light">→</span>
                  </button>
                ))}
              </div>
            </div>

            {/* OUR IMPACT + CONTACT SECTIONS */}
            <div className="w-full relative pointer-events-auto pt-12 pb-24 border-t border-white/5 bg-[#040507]">

              {/* OUR IMPACT Section */}
              <div id="about" className="max-w-6xl mx-auto px-6 py-20">
                {/* Big heading */}
                <div className="text-center mb-16">
                  <h2 className="font-sans font-black text-6xl md:text-8xl xl:text-9xl tracking-tight text-white leading-none">
                    OUR <span className="text-[#FF5C00]">IMPACT</span>
                  </h2>
                </div>

                {/* Stats Row */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-16">
                  {[
                    { number: '1,500+', label: 'Students' },
                    { number: '15+', label: 'Institutions' },
                    { number: '7', label: 'Countries' },
                  ].map((stat) => (
                    <div key={stat.label} className="text-center p-8 rounded-2xl border border-white/5 bg-white/[0.02] backdrop-blur-sm">
                      <div className="text-6xl md:text-7xl font-black text-[#FF5C00] mb-2">{stat.number}</div>
                      <div className="text-white/60 text-base font-semibold tracking-widest uppercase">{stat.label}</div>
                    </div>
                  ))}
                </div>

                {/* Flags strip — spans full width above both columns */}
                <div className="border-t border-white/5 pt-10 mb-10">
                  <p className="text-center text-white/30 text-[10px] font-bold tracking-[0.35em] uppercase mb-8">Countries We've Reached</p>
                  <div className="flex flex-wrap items-center justify-center gap-x-8 gap-y-7">
                    {[
                      { img: '/pictures/countries/Nepal.jpg', name: 'Nepal' },
                      { img: '/pictures/countries/India.svg.png', name: 'India' },
                      { img: '/pictures/countries/Bhutan.svg.png', name: 'Bhutan' },
                      { img: '/pictures/countries/Finland.svg', name: 'Finland' },
                      { img: '/pictures/countries/Sweden.svg.png', name: 'Sweden' },
                      { img: '/pictures/countries/Netherlands.svg.png', name: 'Netherlands' },
                      { img: '/pictures/countries/France.svg.webp', name: 'France' },
                      { img: '/pictures/countries/Portugal.svg.webp', name: 'Portugal' },
                      { img: '/pictures/countries/United_Kingdom.svg.webp', name: 'UK' },
                      { img: '/pictures/countries/Lithuania.svg.png', name: 'Lithuania' },
                    ].map(({ img, name }) => (
                      <div key={name} className="flex flex-col items-center gap-2 group">
                        <div className="w-14 h-10 rounded-md overflow-hidden border border-white/10 group-hover:border-[#FF5C00]/40 transition-colors duration-200 shadow-md">
                          <img src={img} alt={name} className="w-full h-full object-cover" />
                        </div>
                        <span className="text-white/40 text-[9px] font-semibold tracking-widest uppercase group-hover:text-white/70 transition-colors duration-200">{name}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* National | International — side by side */}
                <div className="border-t border-white/5 pt-10 grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-0 md:divide-x md:divide-white/5">

                  {/* Left — National Partners */}
                  <div className="flex flex-col items-center gap-6 md:pr-10">
                    <p className="text-white/30 text-[10px] font-bold tracking-[0.35em] uppercase">National Partners</p>
                    <div className="flex flex-wrap items-center justify-center gap-x-6 gap-y-4">
                      {[6, 7, 8, 9, 11, 13, 14, 15, 16, 17, 18].map(n => (
                        <img key={n} src={`/logos/${n}.png`} alt="" className="h-9 w-auto max-w-[90px] object-contain opacity-50 hover:opacity-90 transition-opacity duration-200" />
                      ))}
                    </div>
                  </div>

                  {/* Right — International Partners */}
                  <div className="flex flex-col items-center gap-6 md:pl-10">
                    <p className="text-white/30 text-[10px] font-bold tracking-[0.35em] uppercase">International Partners</p>
                    <div className="flex flex-wrap items-center justify-center gap-x-8 gap-y-4">
                      <img src="/int'l/cogknitlogo.png" alt="Cogknit" className="h-9 w-auto max-w-[100px] object-contain opacity-50 hover:opacity-90 transition-opacity duration-200" />
                      <img src="/int'l/10.png" alt="Rihimaki" className="h-9 w-auto max-w-[100px] object-contain opacity-50 hover:opacity-90 transition-opacity duration-200" />
                      <img src="/int'l/12.png" alt="Xvector" className="h-9 w-auto max-w-[100px] object-contain opacity-50 hover:opacity-90 transition-opacity duration-200" />
                      <img src="/logos/unesco.png" alt="UNESCO" className="h-9 w-auto max-w-[100px] object-contain opacity-50 hover:opacity-90 transition-opacity duration-200" />
                      <img src="/logos/aalto.png" alt="Aalto University" className="h-9 w-auto max-w-[100px] object-contain opacity-50 hover:opacity-90 transition-opacity duration-200" />
                      <img src="/logos/lukla.png" alt="Lukla" className="h-9 w-auto max-w-[100px] object-contain opacity-50 hover:opacity-90 transition-opacity duration-200" />
                    </div>
                  </div>

                </div>

              </div>

              {/* Case Studies — full-screen scroll section */}
              <CaseStudiesSection />

              {/* Contact Section */}
              <div id="contact" className="mmx-auto px-20 md:px-28 py-20">
                <div className="grid grid-cols-1 md:grid-cols-[1fr_1.3fr_2.7fr] gap-6 items-start">

                  {/* Card 1 — Organizing Committee */}
                  <div className="rounded-2xl border border-white/8 bg-white/[0.03] p-9 flex flex-col gap-8">
                    <h3 className="font-bold text-white text-2xl tracking-tight">Organizing Committee</h3>
                    <div className="flex flex-col gap-6">
                      <div className="flex items-start gap-4 text-white/70">
                        <MapPin size={20} className="text-[#FF5C00] flex-shrink-0 mt-0.5" />
                        <span className="text-base">Kathmandu, Nepal</span>
                      </div>
                      <div className="flex items-start gap-4 text-white/70">
                        <Mail size={20} className="text-[#FF5C00] flex-shrink-0 mt-0.5" />
                        <a href="mailto:ujwal@sums.org.np" className="text-base hover:text-white transition-colors break-all">ujwal@sums.org.np</a>
                      </div>
                      <div className="flex items-start gap-4 text-white/70">
                        <Phone size={20} className="text-[#FF5C00] flex-shrink-0 mt-0.5" />
                        <a href="tel:+977980XXXXXXX" className="text-base hover:text-white transition-colors">+977 980-XXXXXXX</a>
                      </div>
                    </div>
                  </div>

                  {/* Card 2 — Follow the Journey */}
                  <div className="rounded-2xl border border-white/8 bg-white/[0.03] p-9 flex flex-col gap-8">
                    <div>
                      <h3 className="font-bold text-white text-2xl tracking-tight mb-3">Follow the Journey</h3>
                      <p className="text-white/50 text-base leading-relaxed">
                        Stay updated with real-time announcements on our social handles.
                      </p>
                    </div>
                    <div className="flex items-center gap-5 flex-wrap">
                      {[
                        { label: 'Instagram', href: '#', path: 'M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z' },
                        { label: 'Facebook', href: '#', path: 'M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z' },
                        { label: 'YouTube', href: '#', path: 'M23.495 6.205a3.007 3.007 0 0 0-2.088-2.088c-1.87-.501-9.396-.501-9.396-.501s-7.507-.01-9.396.501A3.007 3.007 0 0 0 .527 6.205a31.247 31.247 0 0 0-.522 5.805 31.247 31.247 0 0 0 .522 5.783 3.007 3.007 0 0 0 2.088 2.088c1.868.502 9.396.502 9.396.502s7.506 0 9.396-.502a3.007 3.007 0 0 0 2.088-2.088 31.247 31.247 0 0 0 .5-5.783 31.247 31.247 0 0 0-.5-5.805zM9.609 15.601V8.408l6.264 3.602z' },
                        { label: 'LinkedIn', href: '#', path: 'M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z' },
                      ].map((s) => (
                        <a
                          key={s.label}
                          href={s.href}
                          aria-label={s.label}
                          className="w-16 h-16 rounded-full border border-white/15 hover:border-[#FF5C00]/60 flex items-center justify-center text-white/50 hover:text-[#FF5C00] transition-all duration-300"
                        >
                          <svg viewBox="0 0 24 24" width="24" height="24" fill="currentColor">
                            <path d={s.path} />
                          </svg>
                        </a>
                      ))}
                    </div>
                  </div>

                  {/* Card 3 — Send a Message */}
                  <div className="rounded-2xl border border-white/8 bg-white/[0.03] p-9">
                    <h3 className="font-bold text-white text-2xl tracking-tight mb-7">Send a Message</h3>
                    <MainContactForm />
                  </div>

                </div>
              </div>
            </div>

            {/* Dual-state Scroll Nudge / Back to Top Button */}
            <div
              className="fixed bottom-8 right-8 z-50 flex flex-col items-center gap-2 pointer-events-auto"
              style={{
                opacity: 1,
                transform: 'translateY(0)',
                transition: 'opacity 0.5s ease, transform 0.5s ease',
              }}
            >
              <button
                onClick={
                  pastTour
                    ? () => window.scrollTo({ top: 0, behavior: 'smooth' })
                    : () => document.getElementById('crisis-section')?.scrollIntoView({ behavior: 'smooth' })
                }
                title={pastTour ? "Back to Top" : "Scroll Down to see more"}
                className="group flex flex-col items-center gap-1.5 bg-[#040507]/80 backdrop-blur-md border border-white/10 hover:border-[#FF5C00]/50 rounded-full px-3 py-2.5 transition-all duration-300 hover:shadow-[0_0_16px_rgba(253,68,0,0.25)] cursor-pointer"
              >
                <div className="flex flex-col items-center gap-0.5">
                  <div
                    className="w-1.5 h-1.5 rounded-full bg-[#FF5C00] group-hover:shadow-[0_0_6px_rgba(253,68,0,0.8)] transition-shadow"
                    style={{
                      animation: pastTour
                        ? 'scrollBounceUp 1.4s ease-in-out infinite'
                        : 'scrollBounce 1.4s ease-in-out infinite'
                    }}
                  />
                  <div className={`w-[1px] h-5 bg-gradient-to-r from-transparent to-[#FF5C00]/60`} />
                </div>
                <span className="text-[9px] font-semibold tracking-[0.2em] uppercase text-white/40 group-hover:text-white/70 transition-colors [writing-mode:vertical-lr]">
                  {pastTour ? "Back to Top" : "Scroll Down"}
                </span>
              </button>
            </div>
          </div>
        )}

        {/* FOCUSED PLATFORM DETAIL VIEW */}
        {activePlatform && (
          <div className="w-full relative pointer-events-auto">
            <div className="relative z-20">
              <PlatformDetail
                platformId={activePlatform}
                activeSection={activeSection}
                onActiveSectionChange={setActiveSection}
                detailScrollY={detailScrollY}
              />
            </div>
          </div>
        )}

      </div>
    </div>
  );
}

export default App;
