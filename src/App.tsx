import { useState, useEffect, useRef } from 'react';
import { Navbar } from './components/Navbar';
import { SolarSystemScene } from './components/SolarSystemScene';
import { PlatformDetail } from './components/PlatformDetail';
import { LogoSlider } from './components/LogoSlider';
import { CrisisSection } from './components/CrisisSection';
import { SolutionsSection } from './components/SolutionsSection';
import { Mail, MapPin } from 'lucide-react';
import { motion, useReducedMotion } from 'framer-motion';

function App() {
  // scrollProgress 0→1 drives planet line-up transition in phase 2
  const [scrollProgress, setScrollProgress] = useState(0);
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
        const phase1End = 0.2 * vh;

        const isInsideEcosystem = scrolledIntoSection >= 0 && scrolledIntoSection < 3.0 * vh;
        if (isInsideEcosystem || activePlatform) {
          setEcosystemRevealed(true);
        } else {
          setEcosystemRevealed(false);
        }

        // Phase 1 ends at 0.2*vh — planets orbit normally while user reads the text
        // Phase 2 ends at 0.8*vh — planets align horizontally; completes early so user
        //   sees them in the horizontal line for a good while before the next section
        const alignEnd = 0.8 * vh;

        if (scrolledIntoSection < 0) {
          setEcosystemPhase(0);
          setScrollProgress(0);
        } else if (scrolledIntoSection < phase1End) {
          // Phase 1: Keep orbiting normally (progress = 0)
          setEcosystemPhase(1);
          setScrollProgress(0);
        } else if (scrolledIntoSection < alignEnd) {
          // Phase 2: Smoothly align to horizontal line (earlier window)
          setEcosystemPhase(2);
          const progress = Math.min(1.0, (scrolledIntoSection - phase1End) / (alignEnd - phase1End));
          setScrollProgress(progress);
        } else {
          // Phase 3: Hold aligned positions until user scrolls past 3*vh
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

  // Sync URL hash routing
  useEffect(() => {
    const handleHashChange = () => {
      const hash = window.location.hash;
      const cleanHash = hash.startsWith('#/') ? hash.substring(2) : hash.substring(1);
      const validPlatforms = ['cogknit', 'sip', 'academia', 'aic'];

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
      } else {
        window.scrollTo({ top: 0, behavior: 'smooth' });
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
            
            {/* CHANGE 1: STORY-DRIVEN HERO SECTION */}
            <div className="w-full min-h-screen flex flex-col justify-between pt-24 px-6 relative">
              <div className="flex-grow flex flex-col items-center justify-center text-center max-w-7xl mx-auto w-full pointer-events-auto">
                {/* Eyebrow Label */}
                <motion.span 
                  initial={{ opacity: 0, y: shouldReduceMotion ? 0 : -15 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, ease: "easeOut" }}
                  className="text-[#FF5C00] text-[13px] font-extrabold tracking-[0.35em] uppercase mb-8"
                >
                  THE PROBLEM WITH HIGHER EDUCATION
                </motion.span>
                
                {/* Large Bold Headline with word-by-word stagger */}
                <h1 className="font-[900] tracking-tight leading-[1.0] flex flex-col items-center w-full">
                  <motion.span 
                    className="text-white text-6xl sm:text-7xl md:text-9xl block overflow-hidden w-full"
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
                    className="text-[#FF5C00] text-4xl sm:text-5xl md:text-7xl block overflow-hidden mt-3 w-full"
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

              {/* CHANGE 2: LOGO SLIDER - nested inside the hero fold so it is visible on the first page load */}
              <div className="w-full mt-12 pb-6">
                <LogoSlider />
              </div>
            </div>

            {/* CHANGE 3: HIGHER EDUCATION CRISIS SECTION */}
            <div id="crisis-section">
              <CrisisSection />
            </div>

            {/* CHANGE 4: SOLUTIONS MISS THE MARK SECTION */}
            <SolutionsSection />

            {/* CHANGE 5: ECOSYSTEM SECTION — 2.2×vh tall for 3-phase scroll */}
            <div 
              id="ecosystem-section"
              className="relative pointer-events-none"
              style={{ minHeight: '300vh' }}
            >
              {/* Sticky container for viewport elements */}
               <div className="sticky top-0 h-screen w-full flex flex-col pointer-events-none">

                {/* Top text overlay — visible and fixed during active phases */}
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

                {/* Bottom hint — visible and stuck through ecosystem section */}
                <motion.div
                  className="absolute bottom-8 left-0 right-0 flex justify-center pointer-events-none"
                  animate={ecosystemPhase >= 1 ? { opacity: 1, y: 0 } : { opacity: 0, y: 10 }}
                  transition={{ duration: 0.5 }}
                >
                  <p className="text-[10px] md:text-xs text-white/40 uppercase tracking-[0.2em] font-semibold bg-[#040507]/60 px-4 py-1.5 rounded-full border border-white/5 backdrop-blur-sm">
                    Hover the planets or click them to learn more
                  </p>
                </motion.div>
              </div>
            </div>



            {/* PRE-EXISTING HTML WEB SECTIONS (Mission, Hubs, Footer) */}
            <div className="w-full relative pointer-events-auto bg-gradient-to-t from-[#040507] via-[#040507]/90 to-transparent pt-12 pb-24 border-t border-white/5">
              
              {/* Mission Section */}
              <div id="about" className="max-w-4xl mx-auto px-6 py-20">
                <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-center bg-[#040507]/80 p-8 rounded-2xl border border-white/5 backdrop-blur-sm">
                  <div className="md:col-span-5">
                    <span className="text-[#FF5C00] text-xs font-semibold tracking-widest uppercase block mb-2">
                      01 / The Mission
                    </span>
                    <h2 className="font-serif text-3xl font-medium leading-tight">
                      Bridging Knowledge & Institutional Impact
                    </h2>
                  </div>
                  <div className="md:col-span-7 text-white/60 space-y-4 text-sm leading-relaxed">
                    <p>
                      SUMS Nepal empowers academic, vocational, and corporate organizations through custom digital solutions, entrepreneurship incubation, and multidisciplinary alliances.
                    </p>
                    <p>
                      Click on any platform planet above to explore specialized hubs focusing on smart learning, industry collaborations, peer reviews, and startup programs.
                    </p>
                  </div>
                </div>
              </div>

              {/* Interactive List section */}
              <div id="partners" className="max-w-4xl mx-auto px-6 py-12">
                <div className="bg-[#040507]/80 p-8 rounded-2xl border border-white/5 backdrop-blur-sm space-y-6">
                  <div>
                    <span className="text-[#FF5C00] text-xs font-semibold tracking-widest uppercase block mb-1">
                      02 / The Hubs
                    </span>
                    <h3 className="font-serif text-2xl font-medium text-white">Ecosystem Navigation Hub</h3>
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {[
                      { id: 'cogknit', name: 'Cogknit', desc: 'Knowledge & Learning Management' },
                      { id: 'sip', name: 'SIP', desc: 'Strategic Partnerships' },
                      { id: 'academia', name: 'Academia', desc: 'Academic Peer Review & Research' },
                      { id: 'aic', name: 'AIC', desc: 'Youth Skill Incubation' }
                    ].map((plat) => (
                      <button
                        key={plat.id}
                        onClick={() => handleSelectPlatform(plat.id)}
                        className="text-left p-5 rounded-xl border border-white/5 hover:border-[#FF5C00]/40 bg-white/[0.01] hover:bg-white/[0.02] hover:-translate-y-1 hover:shadow-[0_0_20px_rgba(253,68,0,0.12)] transition-all duration-300 group cursor-pointer relative overflow-hidden"
                      >
                        <div className="absolute inset-0 bg-gradient-to-r from-[#FF5C00]/0 via-[#FF5C00]/5 to-[#FF5C00]/0 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                        <span className="text-sm font-serif font-bold text-white group-hover:text-[#FF5C00] block transition-colors duration-300 relative z-10">
                          {plat.name}
                        </span>
                        <span className="text-xs text-white/40 block mt-1 relative z-10">{plat.desc}</span>
                      </button>
                    ))}
                  </div>
                </div>
              </div>

              {/* Footer / Contact */}
              <div id="contact" className="max-w-4xl mx-auto px-6 py-20">
                <div className="text-center space-y-6 bg-[#040507]/80 p-8 rounded-2xl border border-white/5 backdrop-blur-sm">
                  <span className="text-[#FF5C00] text-xs font-semibold tracking-widest uppercase block">
                    03 / Joint Growth
                  </span>
                  <h2 className="font-serif text-3xl font-medium">
                    Integrate SUMS into your Organization
                  </h2>
                  <p className="text-white/50 text-sm max-w-md mx-auto">
                    Empower students, faculties, and business partners through structured workflows.
                  </p>
                  
                  <div className="flex flex-col md:flex-row justify-center items-center gap-6 text-white/70 text-xs tracking-wider uppercase font-semibold pt-4">
                    <div className="flex items-center space-x-2">
                      <MapPin size={14} className="text-[#FF5C00]" />
                      <span>Kathmandu, Nepal</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Mail size={14} className="text-[#FF5C00]" />
                      <span>info@sums.org.np</span>
                    </div>
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
