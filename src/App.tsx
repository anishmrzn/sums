import { useState, useEffect, useRef } from 'react';
import { Navbar } from './components/Navbar';
import { SolarSystemScene } from './components/SolarSystemScene';
import { PlatformDetail } from './components/PlatformDetail';
import { Mail, MapPin } from 'lucide-react';

function App() {
  const [scrollProgress, setScrollProgress] = useState(0);
  const [scrollY, setScrollY] = useState(0);
  const [heroFadeProgress, setHeroFadeProgress] = useState(0);
  const [detailScrollY, setDetailScrollY] = useState(0);
  const [activePlatform, setActivePlatform] = useState<string | null>(null);
  const [zoomingPlatform, setZoomingPlatform] = useState<string | null>(null);
  const [activeSection, setActiveSection] = useState('overview');
  const [pastTour, setPastTour] = useState(false);
  
  const homeScrollPos = useRef(0);
  const isTransitioning = useRef(false);

  // 4-phase scroll architecture:
  // Phase 1 (0→1vh):  Hero text fades up (in then out)
  // Phase 2 (1→2vh):  Camera flies to 50% of the spline (zoom)
  // Phase 3 (2→3vh):  Planets align on straight line
  // Phase 4 (3.5vh+): HTML content sections
  const getSpacerHeight = () => window.innerHeight * 3.5;

  useEffect(() => {
    const handleScroll = () => {
      if (isTransitioning.current || zoomingPlatform) return;

      const currentScrollY = window.scrollY;
      setScrollY(currentScrollY);

      if (activePlatform) {
        setDetailScrollY(currentScrollY);
        return;
      }

      const vh = window.innerHeight;

      // Phase 1 (0→1vh): hero text fade-up progress
      setHeroFadeProgress(Math.min(1, currentScrollY / vh));

      // Phases 2+3 (1vh→3vh): solar tour, scrollProgress 0→1
      const solarProgress = currentScrollY <= vh
        ? 0
        : Math.min(1.0, (currentScrollY - vh) / (vh * 2));
      setScrollProgress(solarProgress);

      // Track whether user has scrolled past the 3D tour spacer into HTML sections
      const spacerHeight = vh * 3.5;
      setPastTour(currentScrollY > spacerHeight + 100);
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

    // Start zoom-in camera transition first
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
      const spacerHeight = getSpacerHeight();
      const docHeight = document.documentElement.scrollHeight - window.innerHeight;
      let targetScroll = 0;

      if (target === 'about') {
        // Mission is right after the tour spacer
        targetScroll = spacerHeight + 50;
      } else if (target === 'partners') {
        // Hubs list is further down
        targetScroll = spacerHeight + 650;
      } else if (target === 'contact') {
        // Contact/Footer is at the end
        targetScroll = docHeight;
      }

      window.scrollTo({
        top: targetScroll,
        behavior: 'smooth'
      });
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

  return (
    <div className={`bg-[#040507] text-white relative font-sans selection:bg-brand selection:text-white ${activePlatform ? 'min-h-screen' : 'min-h-[550vh]'}`}>
      
      {/* PERSISTENT 3D BACKGROUND SCENE */}
      <SolarSystemScene 
        scrollProgress={scrollProgress} 
        scrollY={scrollY}
        heroFadeProgress={heroFadeProgress}
        activePlatform={activePlatform}
        zoomingPlatform={zoomingPlatform}
        detailScrollY={detailScrollY}
        onSelectPlatform={handleSelectPlatform}
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
            {/* PHASE 1-3: SOLAR TOUR SPACER (3.5 screens) */}
            <div 
              className="relative w-full flex flex-col items-center justify-between py-12 px-6"
              style={{ height: '350vh' }}
            >
              
              {/* Hero Header — scroll-scrubbed fade-up effect */}
              {/* Phase 1: fades IN (up from below) then OUT (up and away) over the first viewport of scroll */}
              <div 
                className="mt-24 text-center max-w-3xl mx-auto flex flex-col items-center"
                style={{
                  opacity: Math.max(0, 1 - heroFadeProgress * 1.6),
                  transform: `translateY(${-heroFadeProgress * 70}px)`,
                  willChange: 'transform, opacity',
                  pointerEvents: heroFadeProgress > 0.85 ? 'none' : 'auto',
                }}
              >
                <span className="text-[#FD4400] text-xs font-semibold tracking-[0.3em] uppercase mb-3">
                  SUMS NEPAL
                </span>
                <h1 className="font-serif text-5xl md:text-7xl font-medium tracking-tight leading-tight">
                  A Living Learning Ecosystem
                </h1>
                <p className="text-white/50 text-sm md:text-base mt-4 max-w-md">
                  Scroll down to traverse our connected network of educational, collaborative, and innovation platforms.
                </p>
              </div>

              {/* Progress Indicator overlay — only shows during phases 2 & 3 */}
              <div 
                className="fixed bottom-20 left-1/2 -translate-x-1/2 bg-[#040507]/80 backdrop-blur-md px-4 py-2 rounded-full border border-white/5 text-[10px] tracking-widest uppercase font-semibold text-white/50 flex items-center space-x-3 pointer-events-auto"
                style={{ 
                  opacity: heroFadeProgress > 0.8 && scrollProgress < 0.98
                    ? Math.min(1, (heroFadeProgress - 0.8) * 5)
                    : heroFadeProgress <= 0.8 ? 0 : Math.max(0, (1 - scrollProgress) / 0.02),
                  transition: 'opacity 0.3s ease'
                }}
              >
                <span>Ecosystem Progress</span>
                <div className="w-24 h-1 bg-white/10 rounded-full overflow-hidden">
                  <div 
                    className="h-full bg-[#FD4400] transition-all duration-100" 
                    style={{ width: `${scrollProgress * 100}%` }}
                  />
                </div>
                <span>{Math.round(scrollProgress * 100)}%</span>
              </div>

              {/* ── Persistent scroll indicator: hero → solar tour → disappears at 100% ── */}
              <div
                className="fixed bottom-4 left-1/2 -translate-x-1/2 z-50 flex flex-col items-center gap-1.5 pointer-events-none select-none"
                style={{
                  opacity: !pastTour && scrollProgress < 0.98 ? 1 : 0,
                  transform: !pastTour && scrollProgress < 0.98 ? 'translateY(0)' : 'translateY(8px)',
                  transition: 'opacity 0.5s ease, transform 0.5s ease',
                }}
              >
                <span className="text-[9px] font-semibold tracking-[0.22em] uppercase text-white/30">
                  Scroll
                </span>
                <div className="flex flex-col items-center gap-0">
                  {/* Double chevron — cascading animation for depth */}
                  <svg width="10" height="7" viewBox="0 0 10 7" fill="none" className="text-white/20" style={{ animation: 'scrollBounce 1.4s ease-in-out infinite 0s' }}>
                    <path d="M1 1l4 4 4-4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                  <svg width="10" height="7" viewBox="0 0 10 7" fill="none" className="text-[#FD4400]/70" style={{ animation: 'scrollBounce 1.4s ease-in-out infinite 0.2s' }}>
                    <path d="M1 1l4 4 4-4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </div>
              </div>

              {/* ── Scroll-down nudge: appears when ecosystem tour hits 100% ── */}
              <div
                className="fixed bottom-20 left-1/2 -translate-x-1/2 z-50 flex flex-col items-center gap-1.5 pointer-events-none select-none"
                style={{
                  opacity: scrollProgress >= 0.98 && !pastTour
                    ? Math.min(1, (scrollProgress - 0.98) / 0.02)
                    : 0,
                  transition: 'opacity 0.6s ease',
                }}
              >
                <span className="text-[10px] font-semibold tracking-[0.25em] uppercase text-white/40">
                  More below
                </span>
                <div className="flex flex-col items-center gap-0.5">
                  <div className="w-[1px] h-5 bg-gradient-to-b from-transparent to-[#FD4400]/60" />
                  <div
                    className="w-1.5 h-1.5 rounded-full bg-[#FD4400]"
                    style={{ animation: 'scrollBounce 1.4s ease-in-out infinite' }}
                  />
                </div>
              </div>
            </div>

            {/* PHASE 2: HTML WEB SECTIONS (Unlocked after 100% progress and spacer padding) */}
            <div className="w-full relative pointer-events-auto bg-gradient-to-t from-[#040507] via-[#040507]/90 to-transparent pt-12 pb-24">
              
              {/* Mission Section */}
              <div id="about" className="max-w-4xl mx-auto px-6 py-20">
                <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-center bg-[#040507]/80 p-8 rounded-2xl border border-white/5 backdrop-blur-sm">
                  <div className="md:col-span-5">
                    <span className="text-[#FD4400] text-xs font-semibold tracking-widest uppercase block mb-2">
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
                    <span className="text-[#FD4400] text-xs font-semibold tracking-widest uppercase block mb-1">
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
                        className="text-left p-5 rounded-xl border border-white/5 hover:border-[#FD4400]/40 bg-white/[0.01] hover:bg-white/[0.02] hover:-translate-y-1 hover:shadow-[0_0_20px_rgba(253,68,0,0.12)] transition-all duration-300 group cursor-pointer relative overflow-hidden"
                      >
                        <div className="absolute inset-0 bg-gradient-to-r from-[#FD4400]/0 via-[#FD4400]/5 to-[#FD4400]/0 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                        <span className="text-sm font-serif font-bold text-white group-hover:text-[#FD4400] block transition-colors duration-300 relative z-10">
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
                  <span className="text-[#FD4400] text-xs font-semibold tracking-widest uppercase block">
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
                      <MapPin size={14} className="text-[#FD4400]" />
                      <span>Kathmandu, Nepal</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Mail size={14} className="text-[#FD4400]" />
                      <span>info@sums.org.np</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* ── Scroll-up nudge: appears when user is deep in the HTML sections ── */}
            <div
              className="fixed bottom-8 right-8 z-50 flex flex-col items-center gap-2 pointer-events-auto"
              style={{
                opacity: pastTour ? 1 : 0,
                transform: pastTour ? 'translateY(0)' : 'translateY(12px)',
                transition: 'opacity 0.5s ease, transform 0.5s ease',
              }}
            >
              <button
                onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
                title="Back to Ecosystem Tour"
                className="group flex flex-col items-center gap-1.5 bg-[#040507]/80 backdrop-blur-md border border-white/10 hover:border-[#FD4400]/50 rounded-full px-3 py-2.5 transition-all duration-300 hover:shadow-[0_0_16px_rgba(253,68,0,0.25)] cursor-pointer"
              >
                <div className="flex flex-col items-center gap-0.5">
                  <div
                    className="w-1.5 h-1.5 rounded-full bg-[#FD4400] group-hover:shadow-[0_0_6px_rgba(253,68,0,0.8)] transition-shadow"
                    style={{ animation: 'scrollBounceUp 1.4s ease-in-out infinite' }}
                  />
                  <div className="w-[1px] h-5 bg-gradient-to-t from-transparent to-[#FD4400]/60" />
                </div>
                <span className="text-[9px] font-semibold tracking-[0.2em] uppercase text-white/40 group-hover:text-white/70 transition-colors [writing-mode:vertical-lr]">
                  Ecosystem
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
