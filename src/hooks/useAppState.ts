import { useState, useEffect, useRef } from 'react';

export function useAppState() {
  const [scrollProgress, setScrollProgress] = useState(0);
  const [hideCanvas, setHideCanvas] = useState(false);
  const [detailScrollY, setDetailScrollY] = useState(0);
  const [activePlatform, setActivePlatform] = useState<string | null>(null);
  const [zoomingPlatform, setZoomingPlatform] = useState<string | null>(null);
  const [pastTour, setPastTour] = useState(false);
  const [ecosystemRevealed, setEcosystemRevealed] = useState(false);
  const [ecosystemPhase, setEcosystemPhase] = useState(0);

  const homeScrollPos = useRef(0);
  const isTransitioning = useRef(false);

  useEffect(() => {
    const handleScroll = () => {
      if (isTransitioning.current || zoomingPlatform) return;

      const currentScrollY = window.scrollY;

      if (activePlatform) {
        setDetailScrollY(currentScrollY);
        return;
      }

      const vh = window.innerHeight;
      const ecosystemSectionEl = document.getElementById('ecosystem-section');
      if (ecosystemSectionEl) {
        const rect = ecosystemSectionEl.getBoundingClientRect();
        const scrolledIntoSection = -rect.top;
        const phase1End = 0.05 * vh;
        const hideThreshold = window.innerWidth < 768 ? 0.8 * vh : 1.2 * vh;
        const isInsideEcosystem = scrolledIntoSection >= 0 && scrolledIntoSection < hideThreshold;

        setEcosystemRevealed(isInsideEcosystem || !!activePlatform);
        setHideCanvas(scrolledIntoSection >= hideThreshold);

        const alignEnd = 0.45 * vh;
        if (scrolledIntoSection < 0) {
          setEcosystemPhase(0);
          setScrollProgress(0);
        } else if (scrolledIntoSection < phase1End) {
          setEcosystemPhase(1);
          setScrollProgress(0);
        } else if (scrolledIntoSection < alignEnd) {
          setEcosystemPhase(2);
          setScrollProgress(Math.min(1.0, (scrolledIntoSection - phase1End) / (alignEnd - phase1End)));
        } else {
          setEcosystemPhase(3);
          setScrollProgress(1.0);
        }
      }

      setPastTour(currentScrollY > vh * 0.8);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [activePlatform, zoomingPlatform]);

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
          setTimeout(() => {
            window.scrollTo({ top: homeScrollPos.current, behavior: 'auto' });
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
    if (target === 'home') {
      if (activePlatform) {
        setActivePlatform(null);
        setDetailScrollY(0);
        window.location.hash = '#/';
        setTimeout(() => window.scrollTo({ top: 0, behavior: 'smooth' }), 100);
      } else {
        window.scrollTo({ top: 0, behavior: 'smooth' });
      }
      return;
    }

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
      document.getElementById(target)?.scrollIntoView({ behavior: 'smooth' });
    };

    if (activePlatform) {
      setActivePlatform(null);
      setDetailScrollY(0);
      window.location.hash = '#/';
      setTimeout(performScroll, 100);
    } else {
      performScroll();
    }
  };

  return {
    scrollProgress,
    hideCanvas,
    ecosystemRevealed,
    ecosystemPhase,
    pastTour,
    activePlatform,
    zoomingPlatform,
    detailScrollY,
    handleSelectPlatform,
    handleBackToEcosystem,
    handleNavigate,
  };
}
