import React, { useRef } from 'react';
import { motion, useInView } from 'framer-motion';

interface SolutionsSectionProps {
  onRevealEcosystem: () => void;
}

export const SolutionsSection: React.FC<SolutionsSectionProps> = ({ onRevealEcosystem }) => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(sectionRef, { once: true, amount: 0.3 });



  return (
    <div 
      ref={sectionRef}
      className="min-h-[85vh] w-full bg-transparent flex flex-col justify-between py-8 px-6 relative overflow-hidden pointer-events-auto"
    >
      {/* Title / Intro */}
      <div className="max-w-4xl mx-auto text-center mt-2">
        <motion.h2
          initial={{ opacity: 0, y: -20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="font-serif text-3xl md:text-5xl font-semibold tracking-tight leading-tight text-white"
        >
          Contemporary Solutions Miss the Mark
        </motion.h2>
      </div>

      {/* Top Comparison Area */}
      <div className="w-full max-w-4xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-12 items-center justify-center my-4">
        {/* Left: Tools pile */}
        <div className="flex flex-col items-center text-center space-y-3">
          <div className="w-full max-w-[280px] h-[160px] relative border border-white/5 rounded-xl flex items-center justify-center bg-white/[0.01] bg-[linear-gradient(to_right,rgba(255,255,255,0.03)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.03)_1px,transparent_1px)] bg-[size:16px_16px] overflow-hidden shadow-inner">
            <img 
              src="/tools-pile.png" 
              alt="Thousands of tools" 
              className="w-[85%] h-auto object-contain invert hue-rotate-180 brightness-110 opacity-80" 
            />
          </div>
          <span className="text-white/60 text-xs md:text-sm font-medium tracking-wide">
            Thousands of tools, workshops, and trainings
          </span>
        </div>

        {/* Right: Target Outcomes */}
        <div className="flex flex-col items-center text-center space-y-3">
          <div className="w-full max-w-[280px] h-[160px] relative border border-white/5 rounded-xl flex items-center justify-center bg-white/[0.01] bg-[linear-gradient(to_right,rgba(255,255,255,0.03)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.03)_1px,transparent_1px)] bg-[size:16px_16px] overflow-hidden shadow-inner">
            <svg viewBox="0 0 200 200" className="w-[110px] h-[110px]">
              <defs>
                <marker id="target-arrow" viewBox="0 0 10 10" refX="6" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse">
                  <path d="M 0 1.5 L 8 5 L 0 8.5 z" fill="#FD4400" />
                </marker>
              </defs>
              {/* Target Rings */}
              <circle cx="100" cy="100" r="75" fill="none" stroke="rgba(255,255,255,0.12)" strokeWidth="1.5" />
              <circle cx="100" cy="100" r="55" fill="none" stroke="rgba(255,255,255,0.2)" strokeWidth="1.5" />
              <circle cx="100" cy="100" r="35" fill="none" stroke="rgba(255,255,255,0.3)" strokeWidth="1.5" />
              <circle cx="100" cy="100" r="15" fill="none" stroke="#FD4400" strokeWidth="2.5" />
              <circle cx="100" cy="100" r="4" fill="#FD4400" />
              
              {/* Inward pointing arrows */}
              <path d="M 100,10 L 100,45" stroke="#ffffff" strokeWidth="2" markerEnd="url(#target-arrow)" strokeLinecap="round" />
              <path d="M 25,145 L 55,125" stroke="#ffffff" strokeWidth="2" markerEnd="url(#target-arrow)" strokeLinecap="round" />
              <path d="M 175,145 L 145,125" stroke="#ffffff" strokeWidth="2" markerEnd="url(#target-arrow)" strokeLinecap="round" />
            </svg>
          </div>
          <span className="text-white/60 text-xs md:text-sm font-medium tracking-wide">
            Fundamental Change in Outcomes
          </span>
        </div>
      </div>

      {/* Main Bridge Graphic Area */}
      <div className="w-full max-w-5xl mx-auto my-2 relative flex items-center justify-center h-[340px]">
        
        {/* SVG Drawing Bridge */}
        <svg 
          viewBox="0 0 800 420" 
          className="w-full h-full select-none"
        >
          {/* Left Cliff — dark trapezoid */}
          <motion.path
            d="M -50,250 L 270,250 L 210,420 L -50,420 Z"
            fill="#12141a"
            stroke="rgba(255,255,255,0.08)"
            strokeWidth="1.5"
            initial={{ x: -200, opacity: 0 }}
            animate={isInView ? { x: 0, opacity: 1 } : {}}
            transition={{ duration: 0.8, ease: 'easeOut' }}
          />

          {/* Right Cliff — dark trapezoid */}
          <motion.path
            d="M 850,250 L 530,250 L 590,420 L 850,420 Z"
            fill="#12141a"
            stroke="rgba(255,255,255,0.08)"
            strokeWidth="1.5"
            initial={{ x: 200, opacity: 0 }}
            animate={isInView ? { x: 0, opacity: 1 } : {}}
            transition={{ duration: 0.8, ease: 'easeOut' }}
          />

          {/* REAL ARCH BRIDGE — stone arch connecting the two cliffs */}
          {/* Bridge road surface (flat deck on top of arch) */}
          <motion.path
            d="M 270,250 L 530,250"
            fill="none"
            stroke="rgba(255,255,255,0.3)"
            strokeWidth="5"
            strokeLinecap="round"
            initial={{ pathLength: 0, opacity: 0 }}
            animate={isInView ? { pathLength: 1, opacity: 1 } : {}}
            transition={{ delay: 0.5, duration: 0.8 }}
          />
          {/* Bridge arch underneath the deck — beautiful stone arch */}
          <motion.path
            d="M 270,250 Q 400,310 530,250"
            fill="none"
            stroke="#FD4400"
            strokeWidth="3"
            strokeLinecap="round"
            initial={{ pathLength: 0 }}
            animate={isInView ? { pathLength: 1 } : {}}
            transition={{ delay: 0.6, duration: 0.9 }}
          />
          {/* Second arch line (fill effect) */}
          <motion.path
            d="M 270,250 Q 400,320 530,250"
            fill="none"
            stroke="rgba(253,68,0,0.25)"
            strokeWidth="8"
            strokeLinecap="round"
            initial={{ pathLength: 0 }}
            animate={isInView ? { pathLength: 1 } : {}}
            transition={{ delay: 0.65, duration: 0.9 }}
          />

          {/* Arch support pillars */}
          <motion.line x1="340" y1="250" x2="355" y2="290" stroke="rgba(255,255,255,0.15)" strokeWidth="1.5"
            initial={{ opacity: 0 }} animate={isInView ? { opacity: 1 } : {}} transition={{ delay: 0.9 }} />
          <motion.line x1="400" y1="250" x2="400" y2="305" stroke="rgba(255,255,255,0.15)" strokeWidth="1.5"
            initial={{ opacity: 0 }} animate={isInView ? { opacity: 1 } : {}} transition={{ delay: 0.9 }} />
          <motion.line x1="460" y1="250" x2="445" y2="290" stroke="rgba(255,255,255,0.15)" strokeWidth="1.5"
            initial={{ opacity: 0 }} animate={isInView ? { opacity: 1 } : {}} transition={{ delay: 0.9 }} />

          {/* Left Tower on cliff edge */}
          <motion.path
            d="M 262,250 L 268,140 L 278,140 L 284,250"
            fill="rgba(18,20,26,0.9)"
            stroke="rgba(255,255,255,0.3)"
            strokeWidth="2"
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.3, duration: 0.6 }}
          />
          <line x1="263" y1="175" x2="283" y2="175" stroke="rgba(255,255,255,0.2)" strokeWidth="2" />
          <line x1="263" y1="210" x2="283" y2="210" stroke="rgba(255,255,255,0.2)" strokeWidth="2" />

          {/* Right Tower on cliff edge */}
          <motion.path
            d="M 516,250 L 522,140 L 532,140 L 538,250"
            fill="rgba(18,20,26,0.9)"
            stroke="rgba(255,255,255,0.3)"
            strokeWidth="2"
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.3, duration: 0.6 }}
          />
          <line x1="517" y1="175" x2="537" y2="175" stroke="rgba(255,255,255,0.2)" strokeWidth="2" />
          <line x1="517" y1="210" x2="537" y2="210" stroke="rgba(255,255,255,0.2)" strokeWidth="2" />

          {/* Main suspension cables left */}
          <motion.path
            d="M 0,220 Q 130,160 273,140"
            fill="none" stroke="#FD4400" strokeWidth="2"
            initial={{ pathLength: 0 }} animate={isInView ? { pathLength: 1 } : {}}
            transition={{ delay: 0.4, duration: 0.7 }}
          />
          <motion.path
            d="M 800,220 Q 670,160 527,140"
            fill="none" stroke="#FD4400" strokeWidth="2"
            initial={{ pathLength: 0 }} animate={isInView ? { pathLength: 1 } : {}}
            transition={{ delay: 0.4, duration: 0.7 }}
          />
          {/* Cable from tower top to mid */}
          <motion.path
            d="M 273,140 Q 337,160 400,250"
            fill="none" stroke="#FD4400" strokeWidth="1.5" strokeDasharray="4 4"
            initial={{ pathLength: 0 }} animate={isInView ? { pathLength: 1 } : {}}
            transition={{ delay: 0.7, duration: 0.6 }}
          />
          <motion.path
            d="M 527,140 Q 463,160 400,250"
            fill="none" stroke="#FD4400" strokeWidth="1.5" strokeDasharray="4 4"
            initial={{ pathLength: 0 }} animate={isInView ? { pathLength: 1 } : {}}
            transition={{ delay: 0.7, duration: 0.6 }}
          />

          {/* Vertical suspender lines on left side */}
          <motion.g initial={{ opacity: 0 }} animate={isInView ? { opacity: 1 } : {}} transition={{ delay: 0.85 }}>
            <line x1="295" y1="163" x2="295" y2="251" stroke="rgba(255,255,255,0.12)" strokeWidth="1" />
            <line x1="318" y1="184" x2="318" y2="251" stroke="rgba(255,255,255,0.12)" strokeWidth="1" />
            <line x1="342" y1="206" x2="342" y2="251" stroke="rgba(255,255,255,0.12)" strokeWidth="1" />
            <line x1="368" y1="222" x2="368" y2="251" stroke="rgba(255,255,255,0.12)" strokeWidth="1" />
          </motion.g>
          {/* Vertical suspender lines on right side */}
          <motion.g initial={{ opacity: 0 }} animate={isInView ? { opacity: 1 } : {}} transition={{ delay: 0.85 }}>
            <line x1="505" y1="163" x2="505" y2="251" stroke="rgba(255,255,255,0.12)" strokeWidth="1" />
            <line x1="482" y1="184" x2="482" y2="251" stroke="rgba(255,255,255,0.12)" strokeWidth="1" />
            <line x1="458" y1="206" x2="458" y2="251" stroke="rgba(255,255,255,0.12)" strokeWidth="1" />
            <line x1="432" y1="222" x2="432" y2="251" stroke="rgba(255,255,255,0.12)" strokeWidth="1" />
          </motion.g>

          {/* ——— LEFT CLIFF CONTENT: text label "KNOWING" + icon sketches above it ——— */}
          {/* Icon drawings (book, network) above the label on left cliff */}
          <motion.g
            initial={{ opacity: 0, y: 10 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.7, duration: 0.6 }}
            stroke="#ffffff" strokeWidth="1.5" fill="none"
            strokeLinecap="round" strokeLinejoin="round"
          >
            {/* Book */}
            <path d="M 60,250 L 60,222 Q 75,226 90,222 L 90,250 Q 75,254 60,250" />
            <path d="M 90,222 Q 105,226 120,222 L 120,250 Q 105,254 90,250" />
            <line x1="90" y1="222" x2="90" y2="250" />
            {/* Node network */}
            <line x1="148" y1="238" x2="162" y2="224" />
            <line x1="162" y1="224" x2="176" y2="238" />
            <line x1="162" y1="224" x2="162" y2="208" />
            <circle cx="148" cy="238" r="4" fill="#ffffff" />
            <circle cx="162" cy="224" r="4" fill="#FD4400" stroke="#FD4400" />
            <circle cx="176" cy="238" r="4" fill="#ffffff" />
            <circle cx="162" cy="208" r="4" fill="#ffffff" />
            {/* Document */}
            <path d="M 200,250 L 200,214 L 214,214 L 220,220 L 220,250 Z" />
            <line x1="206" y1="226" x2="216" y2="226" />
            <line x1="206" y1="234" x2="216" y2="234" />
            <line x1="206" y1="242" x2="216" y2="242" />
          </motion.g>
          {/* KNOWING label inside left cliff */}
          <motion.text
            x="110" y="330"
            textAnchor="middle"
            fill="white"
            fontSize="22"
            fontWeight="700"
            letterSpacing="4"
            fontFamily="serif"
            initial={{ opacity: 0 }}
            animate={isInView ? { opacity: 1 } : {}}
            transition={{ delay: 0.5, duration: 0.6 }}
          >
            KNOWING
          </motion.text>

          {/* ——— RIGHT CLIFF CONTENT: text label "APPLYING" + icon sketches above it ——— */}
          {/* Icon drawings (gear, wrench, robotic arm) above the label on right cliff */}
          <motion.g
            initial={{ opacity: 0, y: 10 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.7, duration: 0.6 }}
            stroke="#ffffff" strokeWidth="1.5" fill="none"
            strokeLinecap="round" strokeLinejoin="round"
          >
            {/* Gear */}
            <circle cx="590" cy="226" r="14" />
            <circle cx="590" cy="226" r="5" />
            <path d="M 590,209 L 590,212 M 590,240 L 590,243 M 573,226 L 576,226 M 604,226 L 607,226 M 578,214 L 580,216 M 600,236 L 602,238 M 578,238 L 580,236 M 600,216 L 602,214" />
            {/* Wrench */}
            <path d="M 630,248 L 650,228" strokeWidth="2.5" />
            <path d="M 646,224 C 650,220 656,220 660,224 C 664,228 664,234 660,238 L 656,234" strokeWidth="2" />
            <circle cx="628" cy="250" r="3" fill="#ffffff" />
            {/* Robotic arm */}
            <path d="M 710,250 L 710,220 L 690,200 L 670,220" />
            <rect x="704" y="245" width="12" height="5" />
            <circle cx="710" cy="220" r="3.5" fill="#FD4400" stroke="#FD4400" />
            <circle cx="690" cy="200" r="3.5" fill="#ffffff" />
            <path d="M 666,216 L 670,220 L 674,216" />
          </motion.g>
          {/* APPLYING label inside right cliff */}
          <motion.text
            x="680" y="330"
            textAnchor="middle"
            fill="white"
            fontSize="22"
            fontWeight="700"
            letterSpacing="4"
            fontFamily="serif"
            initial={{ opacity: 0 }}
            animate={isInView ? { opacity: 1 } : {}}
            transition={{ delay: 0.5, duration: 0.6 }}
          >
            APPLYING
          </motion.text>

        </svg>

        {/* Center broken bridge label — floats in the gap */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={isInView ? { opacity: 1, scale: 1 } : {}}
          transition={{ delay: 1.0, duration: 0.5 }}
          className="absolute text-center bg-[#040507]/90 px-4 py-2 border border-white/5 rounded-full backdrop-blur-md"
          style={{ top: '62%' }}
        >
          <span className="text-white/50 text-xs md:text-sm italic">
            Systems are not connected
          </span>
        </motion.div>

      </div>

      {/* Footer Area */}
      <div className="w-full flex flex-col items-center justify-end space-y-8 max-w-4xl mx-auto text-center">
        
        {/* Full-width dark bar */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.8, duration: 0.6 }}
          className="w-full bg-[#12141a]/60 border border-white/5 py-4 px-6 rounded-xl backdrop-blur-sm"
        >
          <span className="text-white/80 text-sm md:text-base font-medium tracking-wide">
            Isolated tools and services cannot bridge a structural gap
          </span>
        </motion.div>

        {/* STAT Line and Orange Arrow (restructured to place arrow below text in the middle) */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 1.2, duration: 0.6 }}
          className="flex flex-col items-center justify-center gap-6 pt-4 pointer-events-auto w-full"
        >
          <span className="text-white/80 text-sm md:text-base tracking-wide max-w-2xl text-center leading-relaxed">
            See how <span className="text-[#FD4400] font-bold">1,500+</span> students across <span className="text-[#FD4400] font-bold">10+</span> colleges are already bridging this gap with SUMs
          </span>

          {/* Large pulsing arrow pointing below */}
          <button
            onClick={onRevealEcosystem}
            className="w-12 h-12 rounded-full border border-[#FD4400]/40 hover:border-[#FD4400] bg-[#FD4400]/10 hover:bg-[#FD4400]/20 flex items-center justify-center text-[#FD4400] transition-all duration-300 shadow-[0_0_15px_rgba(253,68,0,0.1)] hover:shadow-[0_0_25px_rgba(253,68,0,0.35)] cursor-pointer group"
          >
            <motion.span
              animate={{ y: [0, 5, 0] }}
              transition={{ repeat: Infinity, duration: 1.4, ease: 'easeInOut' }}
              className="text-2xl font-bold leading-none select-none group-hover:scale-110 transition-transform"
            >
              ↓
            </motion.span>
          </button>
        </motion.div>

      </div>
    </div>
  );
};
