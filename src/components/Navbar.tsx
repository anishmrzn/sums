import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface NavbarProps {
  activePlatform: string | null;
  onBackToEcosystem: () => void;
  onNavigate: (target: string) => void;
}

export const Navbar: React.FC<NavbarProps> = ({ activePlatform, onBackToEcosystem, onNavigate }) => {
  return (
    <header className="fixed top-0 left-0 right-0 z-50 px-6 py-4 md:px-12 md:py-6 flex items-center justify-between border-b border-white/[0.03] bg-bg-dark/40 backdrop-blur-md transition-all duration-300">
      <div className="flex items-center space-x-3">
        <div 
          onClick={() => onNavigate('ecosystem')}
          className="cursor-pointer group flex items-center space-x-2"
        >
          {/* Logo representation */}
          <div className="w-8 h-8 rounded-full border border-brand/50 flex items-center justify-center relative overflow-hidden group-hover:border-brand transition-colors duration-300">
            <div className="absolute inset-0 bg-brand/10 opacity-50 group-hover:scale-110 transition-transform duration-300"></div>
            <span className="text-brand font-bold text-xs tracking-wider z-10">S</span>
          </div>
          <span className="font-serif font-semibold tracking-wider text-xl text-white group-hover:text-brand transition-colors duration-300">
            SUMS<span className="text-brand font-sans text-xs align-super ml-0.5">NEPAL</span>
          </span>
        </div>
      </div>

      <nav className="hidden md:flex items-center space-x-8 text-sm font-medium tracking-wide">
        <a 
          href="#ecosystem" 
          onClick={(e) => { e.preventDefault(); onNavigate('ecosystem'); }} 
          className="text-white/60 hover:text-brand transition-colors duration-300"
        >
          Ecosystem
        </a>
        <a 
          href="#about" 
          onClick={(e) => { e.preventDefault(); onNavigate('about'); }} 
          className="text-white/60 hover:text-brand transition-colors duration-300"
        >
          About
        </a>
        <a 
          href="#partners" 
          onClick={(e) => { e.preventDefault(); onNavigate('partners'); }} 
          className="text-white/60 hover:text-brand transition-colors duration-300"
        >
          Partnerships
        </a>
        <a 
          href="#contact" 
          onClick={(e) => { e.preventDefault(); onNavigate('contact'); }} 
          className="text-white/60 hover:text-brand transition-colors duration-300"
        >
          Connect
        </a>
      </nav>

      <div className="flex items-center">
        <AnimatePresence mode="wait">
          {activePlatform ? (
            <motion.button
              key="back-btn"
              initial={{ opacity: 0, x: 10 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -10 }}
              onClick={onBackToEcosystem}
              className="flex items-center space-x-2 bg-brand/10 hover:bg-brand/20 border border-brand/30 hover:border-brand/60 px-4 py-2 rounded-full text-brand text-xs font-semibold uppercase tracking-wider transition-all duration-300 cursor-pointer"
            >
              <span>Back to Ecosystem</span>
            </motion.button>
          ) : (
            <motion.button
              key="cta-btn"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => onNavigate('contact')}
              className="bg-brand hover:bg-brand/90 text-white px-5 py-2 rounded-full text-xs font-semibold uppercase tracking-wider transition-all duration-300 border border-brand cursor-pointer"
            >
              Partner With Us
            </motion.button>
          )}
        </AnimatePresence>
      </div>
    </header>
  );
};
