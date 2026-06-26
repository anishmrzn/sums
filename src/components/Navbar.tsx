import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X } from 'lucide-react';

interface NavbarProps {
  activePlatform: string | null;
  onBackToEcosystem: () => void;
  onNavigate: (target: string) => void;
}

const NAV_LINKS = [
  { label: 'Ecosystem', target: 'ecosystem' },
  { label: 'Impact', target: 'about' },
  { label: 'Connect', target: 'contact' },
];

export const Navbar: React.FC<NavbarProps> = ({ activePlatform, onBackToEcosystem, onNavigate }) => {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [visible, setVisible] = useState(true);
  const [prevScrollY, setPrevScrollY] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;

      // Reveal navbar at the very top of the page, otherwise hide on scroll down and show on scroll up
      if (currentScrollY <= 50) {
        setVisible(true);
      } else if (currentScrollY > prevScrollY) {
        setVisible(false); // scrolling down
      } else {
        setVisible(true); // scrolling up
      }

      setPrevScrollY(currentScrollY);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [prevScrollY]);

  const handleNav = (target: string) => {
    setMobileOpen(false);
    onNavigate(target);
  };

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-50 px-5 py-4 md:px-12 md:py-6 flex items-center justify-between border-b border-white/[0.03] bg-[#040507]/40 backdrop-blur-md transition-all duration-300 ${visible ? 'translate-y-0 opacity-100' : '-translate-y-full opacity-0 pointer-events-none'
          }`}
      >

        {/* Logo — 3D glowing sums_logo.png */}
        <div
          onClick={() => handleNav('ecosystem')}
          className="cursor-pointer group flex items-center gap-2.5"
        >
          <div className="relative flex items-center justify-center">
            {/* Outer ambient glow layer */}
            <div
              className="absolute inset-0 rounded-full blur-xl opacity-60 group-hover:opacity-90 transition-opacity duration-500"
              style={{
                background: 'radial-gradient(circle, rgba(255,109,0,0.7) 0%, rgba(255,60,0,0.3) 60%, transparent 100%)',
                transform: 'scale(1.8)',
              }}
            />
            {/* Inner sharper glow */}
            <div
              className="absolute inset-0 rounded-full blur-md opacity-50 group-hover:opacity-80 transition-opacity duration-300"
              style={{
                background: 'radial-gradient(circle, rgba(255,140,0,0.9) 0%, rgba(255,60,0,0.4) 50%, transparent 100%)',
                transform: 'scale(1.3)',
              }}
            />
            {/* Logo image */}
            <img
              src="/sums_logo.png"
              alt="SUMS Nepal"
              className="relative z-10 w-15 h-15 object-contain transition-transform duration-500 group-hover:scale-110"
              style={{
                animation: 'logoFloat 3.5s ease-in-out infinite, logoGlowPulse 2.5s ease-in-out infinite',
              }}
            />
          </div>
          {/* <span className="font-serif font-semibold tracking-wider text-base text-white/90 group-hover:text-white transition-colors duration-300 hidden sm:block">
            SUMS<span className="text-brand font-sans text-[10px] align-super ml-0.5 font-bold">NEPAL</span>
          </span> */}
        </div>

        {/* Desktop nav links */}
        <nav className="hidden md:flex items-center space-x-8 text-sm font-medium tracking-wide">
          {NAV_LINKS.map(link => (
            <a
              key={link.target}
              href={`#${link.target}`}
              onClick={e => { e.preventDefault(); handleNav(link.target); }}
              className="text-white/60 hover:text-brand transition-colors duration-300"
            >
              {link.label}
            </a>
          ))}
        </nav>

        {/* Right side: CTA + hamburger */}
        <div className="flex items-center gap-3">
          <AnimatePresence mode="wait">
            {activePlatform ? (
              <motion.button
                key="back-btn"
                initial={{ opacity: 0, x: 10 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -10 }}
                onClick={onBackToEcosystem}
                className="flex items-center bg-brand/10 hover:bg-brand/20 border border-brand/30 hover:border-brand/60 px-4 py-2 rounded-full text-brand text-xs font-semibold uppercase tracking-wider transition-all duration-300 cursor-pointer"
              >
                <span className="hidden sm:inline">Back to Ecosystem</span>
                <span className="sm:hidden">← Back</span>
              </motion.button>
            ) : (
              <motion.button
                key="cta-btn"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                onClick={() => handleNav('contact')}
                className="hidden sm:block bg-brand hover:bg-brand/90 text-white px-5 py-2 rounded-full text-xs font-semibold uppercase tracking-wider transition-all duration-300 border border-brand cursor-pointer"
              >
                Partner With Us
              </motion.button>
            )}
          </AnimatePresence>

          {/* Hamburger — mobile only */}
          <button
            onClick={() => setMobileOpen(o => !o)}
            aria-label={mobileOpen ? 'Close menu' : 'Open menu'}
            className="md:hidden w-9 h-9 flex items-center justify-center rounded-lg border border-white/10 hover:border-brand/40 text-white/60 hover:text-brand transition-all duration-300"
          >
            {mobileOpen ? <X size={18} /> : <Menu size={18} />}
          </button>
        </div>
      </header>

      {/* Mobile slide-down menu */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            key="mobile-nav"
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.18, ease: 'easeOut' }}
            className="fixed top-[65px] left-0 right-0 z-40 bg-[#040507]/97 backdrop-blur-xl border-b border-white/5 flex flex-col px-4 py-3 gap-1 md:hidden"
          >
            {NAV_LINKS.map(link => (
              <button
                key={link.target}
                onClick={() => handleNav(link.target)}
                className="text-left py-3 px-4 rounded-xl text-white/70 hover:text-brand hover:bg-white/[0.03] transition-all duration-200 text-sm font-medium tracking-wide"
              >
                {link.label}
              </button>
            ))}
            <div className="pt-2 mt-1 border-t border-white/5">
              <button
                onClick={() => handleNav('contact')}
                className="w-full bg-brand hover:bg-brand/90 text-white py-3 rounded-xl text-xs font-semibold uppercase tracking-wider transition-all duration-300 cursor-pointer"
              >
                Partner With Us
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};
