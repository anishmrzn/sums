import React, { useRef } from 'react';
import { motion, useInView } from 'framer-motion';

const scrollToEcosystem = () => {
  document.getElementById('ecosystem-section')?.scrollIntoView({ behavior: 'smooth' });
};

export const SolutionsSection: React.FC = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(sectionRef, { once: true, amount: 0.45 });

  return (
    <div
      ref={sectionRef}
      className="w-full bg-transparent flex flex-col justify-center py-4 px-4 md:px-8 relative overflow-hidden pointer-events-auto"
    >
      <div className="max-w-[1400px] mx-auto w-full z-10 space-y-12">

        {/* ── Centered Heading (Top Middle) ─────────────────────────── */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
          className="flex flex-col items-center text-center max-w-3xl mx-auto"
        >
          <div className="flex items-center gap-3 mb-4 justify-center">
            <div className="w-8 h-[2px] bg-[#FF5C00]" />
            <span className="text-[#FF5C00] text-[11px] font-extrabold tracking-[0.35em] uppercase font-sans">
              02 / The Disconnect
            </span>
            <div className="w-8 h-[2px] bg-[#FF5C00]" />
          </div>
          <h2 className="font-sans font-black text-4xl md:text-5xl xl:text-6xl leading-[0.95] tracking-tight text-white">
            Contemporary Solutions<br />
            <span className="text-[#FF5C00]" style={{ textShadow: '0 0 40px rgba(255,92,0,0.4)' }}>
              Miss the Mark
            </span>
          </h2>
          <div className="mt-5 flex items-center gap-3 justify-center w-full">
            <div className="h-[1px] w-12 bg-[#FF5C00]/60" />
            <div className="h-[1px] w-24 bg-white/5" />
            <div className="h-[1px] w-12 bg-[#FF5C00]/60" />
          </div>
        </motion.div>

        {/* ── Mobile: simple Knowing vs Applying visual ─────────── */}
        <motion.div
          className="md:hidden flex flex-col items-center gap-6 py-4"
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, delay: 0.2 }}
        >
          <div className="w-full grid grid-cols-2 gap-3">
            <div className="border border-white/5 rounded-xl p-5 bg-white/[0.02] text-center">
              <p className="text-[#FF5C00] font-black text-lg mb-1">KNOWING</p>
              <p className="text-white/45 text-xs leading-relaxed">Thousands of tools, workshops, and trainings</p>
            </div>
            <div className="border border-white/5 rounded-xl p-5 bg-white/[0.02] text-center">
              <p className="text-[#FF5C00] font-black text-lg mb-1">APPLYING</p>
              <p className="text-white/45 text-xs leading-relaxed">Fundamental change in outcomes</p>
            </div>
          </div>
          <div className="border border-[#FF5C00]/20 bg-[#FF5C00]/5 rounded-xl px-5 py-4 w-full text-center">
            <p className="text-[#FF5C00] text-xs font-bold tracking-widest uppercase mb-1">The Gap</p>
            <p className="text-white/60 text-sm">Isolated tools and services cannot bridge a structural gap</p>
          </div>
        </motion.div>

        {/* ── Full-Width Bridge Scene — desktop only ───────────────── */}
        <div className="hidden md:block -mt-28 relative w-full flex flex-col justify-end" style={{ height: 480 }}>

          {/* ── Tools-pile image — sits flush on LEFT cliff surface ── */}
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
            className="absolute z-20 rounded-xl overflow-hidden"
            style={{ left: '0%', bottom: '223px', width: '26%', background: 'rgba(10,11,14,0.6)' }}
          >
            <img
              src="/tools-pile-orange-2.png"
              alt="Thousands of tools"
              className="w-full h-auto object-contain"
              style={{ maxHeight: 145 }}
            />
          </motion.div>

          {/* ── Outcome image — sits flush on RIGHT cliff surface ── */}
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.4, ease: [0.16, 1, 0.3, 1] }}
            className="absolute z-20 rounded-xl overflow-hidden"
            style={{ right: '0%', bottom: '223px', width: '22%', background: 'rgba(10,11,14,0.6)' }}
          >
            <img
              src="/target-diagram-orange.png"
              alt="Fundamental Change in Outcomes"
              className="w-full h-auto object-contain"
              style={{ maxHeight: 145 }}
            />
          </motion.div>

          {/* ── SVG Bridge — flat cliffs + towers + cables + broken gap ── */}
          <motion.svg
            viewBox="0 0 1200 340"
            className="absolute inset-x-0 bottom-0 w-full select-none"
            style={{ height: 330 }}
            initial={{ opacity: 0 }}
            animate={isInView ? { opacity: 1 } : {}}
            transition={{ duration: 0.6 }}
            preserveAspectRatio="none"
          >
            <defs>
              <filter id="cable-glow" x="-20%" y="-20%" width="140%" height="140%">
                <feGaussianBlur stdDeviation="3.5" result="blur" />
                <feMerge>
                  <feMergeNode in="blur" />
                  <feMergeNode in="SourceGraphic" />
                </feMerge>
              </filter>
              <linearGradient id="cliff-grad" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#16182480" />
                <stop offset="30%" stopColor="#13151e" />
                <stop offset="100%" stopColor="#0a0b0e" />
              </linearGradient>
              <linearGradient id="abyss-grad" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#000000" stopOpacity="0" />
                <stop offset="100%" stopColor="#040507" stopOpacity="1" />
              </linearGradient>
              <radialGradient id="gap-glow" cx="50%" cy="5%" r="65%">
                <stop offset="0%" stopColor="rgba(255,92,0,0.10)" />
                <stop offset="100%" stopColor="rgba(0,0,0,0)" />
              </radialGradient>
            </defs>

            {/* ── LEFT CLIFF — flat top at y=110 ── */}
            <motion.path
              d="M -10,110 L 422,110 L 380,340 L -10,340 Z"
              fill="url(#cliff-grad)"
              stroke="none"
              initial={{ x: -80, opacity: 0 }}
              animate={isInView ? { x: 0, opacity: 1 } : {}}
              transition={{ duration: 0.9, ease: 'easeOut' }}
            />

            {/* ── RIGHT CLIFF — flat top at y=110 ── */}
            <motion.path
              d="M 1210,110 L 778,110 L 820,340 L 1210,340 Z"
              fill="url(#cliff-grad)"
              stroke="none"
              initial={{ x: 80, opacity: 0 }}
              animate={isInView ? { x: 0, opacity: 1 } : {}}
              transition={{ duration: 0.9, ease: 'easeOut' }}
            />

            {/* ── Left cliff top edge line ── */}
            <motion.line
              x1="-10" y1="110" x2="422" y2="110"
              stroke="rgba(255,255,255,0.22)" strokeWidth="2"
              initial={{ pathLength: 0, opacity: 0 }}
              animate={isInView ? { pathLength: 1, opacity: 1 } : {}}
              transition={{ delay: 0.5, duration: 0.6 }}
            />

            {/* ── Right cliff top edge line ── */}
            <motion.line
              x1="778" y1="110" x2="1210" y2="110"
              stroke="rgba(255,255,255,0.22)" strokeWidth="2"
              initial={{ pathLength: 0, opacity: 0 }}
              animate={isInView ? { pathLength: 1, opacity: 1 } : {}}
              transition={{ delay: 0.5, duration: 0.6 }}
            />

            {/* ── Abyss / gap darkness ── */}
            <rect x="422" y="90" width="356" height="250" fill="url(#abyss-grad)" />
            <rect x="422" y="100" width="356" height="200" fill="url(#gap-glow)" />

            {/* ── Left Tower ── */}
            <motion.g
              initial={{ opacity: 0, y: 15 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.3, duration: 0.7 }}
            >
              <rect x="400" y="12" width="22" height="98" fill="#0d0f18" stroke="rgba(255,255,255,0.32)" strokeWidth="1.5" />
              <line x1="400" y1="36" x2="422" y2="36" stroke="rgba(255,255,255,0.22)" strokeWidth="1.5" />
              <line x1="400" y1="56" x2="422" y2="56" stroke="rgba(255,255,255,0.22)" strokeWidth="1.5" />
              <line x1="400" y1="76" x2="422" y2="76" stroke="rgba(255,255,255,0.22)" strokeWidth="1.5" />
              <rect x="395" y="7" width="32" height="7" fill="rgba(255,92,0,0.65)" rx="1" />
              <rect x="402" y="3" width="18" height="6" fill="rgba(255,92,0,0.40)" rx="1" />
            </motion.g>

            {/* ── Right Tower ── */}
            <motion.g
              initial={{ opacity: 0, y: 15 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.3, duration: 0.7 }}
            >
              <rect x="778" y="12" width="22" height="98" fill="#0d0f18" stroke="rgba(255,255,255,0.32)" strokeWidth="1.5" />
              <line x1="778" y1="36" x2="800" y2="36" stroke="rgba(255,255,255,0.22)" strokeWidth="1.5" />
              <line x1="778" y1="56" x2="800" y2="56" stroke="rgba(255,255,255,0.22)" strokeWidth="1.5" />
              <line x1="778" y1="76" x2="800" y2="76" stroke="rgba(255,255,255,0.22)" strokeWidth="1.5" />
              <rect x="773" y="7" width="32" height="7" fill="rgba(255,92,0,0.65)" rx="1" />
              <rect x="780" y="3" width="18" height="6" fill="rgba(255,92,0,0.40)" rx="1" />
            </motion.g>

            {/* ── Left Diagonal Support Pillar ── */}
            <motion.path
              d="M 393,242 L 468,132 L 480,138 L 403,248 Z"
              fill="#161822" stroke="rgba(255,255,255,0.08)" strokeWidth="1"
              initial={{ opacity: 0 }}
              animate={isInView ? { opacity: 1 } : {}}
              transition={{ delay: 0.5, duration: 0.7 }}
            />
            <line x1="468" y1="132" x2="393" y2="242" stroke="#FF5C00" strokeWidth="1.2" opacity="0.30" />

            {/* ── Right Diagonal Support Pillar ── */}
            <motion.path
              d="M 807,242 L 732,132 L 720,138 L 797,248 Z"
              fill="#161822" stroke="rgba(255,255,255,0.08)" strokeWidth="1"
              initial={{ opacity: 0 }}
              animate={isInView ? { opacity: 1 } : {}}
              transition={{ delay: 0.5, duration: 0.7 }}
            />
            <line x1="732" y1="132" x2="807" y2="242" stroke="#FF5C00" strokeWidth="1.2" opacity="0.30" />

            {/* ── Left Deck — from cliff edge into gap ── */}
            <motion.path
              d="M 422,110 L 572,166 L 568,188 L 422,130 Z"
              fill="#1c1e27" stroke="rgba(255,255,255,0.13)" strokeWidth="1.2"
              initial={{ pathLength: 0 }}
              animate={isInView ? { pathLength: 1 } : {}}
              transition={{ delay: 0.6, duration: 0.8 }}
            />
            <line x1="422" y1="110" x2="572" y2="166" stroke="#FF5C00" strokeWidth="3.5" />

            {/* ── Right Deck — from cliff edge into gap ── */}
            <motion.path
              d="M 778,110 L 628,166 L 632,188 L 778,130 Z"
              fill="#1c1e27" stroke="rgba(255,255,255,0.13)" strokeWidth="1.2"
              initial={{ pathLength: 0 }}
              animate={isInView ? { pathLength: 1 } : {}}
              transition={{ delay: 0.6, duration: 0.8 }}
            />
            <line x1="778" y1="110" x2="628" y2="166" stroke="#FF5C00" strokeWidth="3.5" />

            {/* ── Falling concrete debris at broken ends ── */}
            <motion.g
              initial={{ opacity: 0, y: -10 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 1.1, duration: 0.6 }}
            >
              <polygon points="574,178 586,172 590,184 578,190" fill="#1c1e27" stroke="#FF5C00" strokeWidth="0.8" />
              <polygon points="618,190 628,182 632,196 622,200" fill="#1c1e27" stroke="rgba(255,255,255,0.2)" strokeWidth="0.8" />
              <polygon points="600,212 610,206 608,218 598,218" fill="#1c1e27" stroke="#FF5C00" strokeWidth="0.8" />
              <polygon points="588,204 595,198 598,208 591,212" fill="#1a1c26" stroke="rgba(255,92,0,0.35)" strokeWidth="0.6" />
            </motion.g>

            {/* ── Left snapped cable (tower top → broken end) ── */}
            <motion.path
              d="M 411,14 Q 506,116 564,166"
              fill="none" stroke="#FF5C00" strokeWidth="2.5" strokeDasharray="5 3"
              filter="url(#cable-glow)"
              initial={{ pathLength: 0 }} animate={isInView ? { pathLength: 1 } : {}}
              transition={{ delay: 0.8, duration: 0.7 }}
            />
            <motion.path
              d="M 564,166 Q 570,178 574,190 M 564,166 Q 560,180 558,192"
              fill="none" stroke="#FF5C00" strokeWidth="1.2"
              initial={{ opacity: 0 }} animate={isInView ? { opacity: 0.75 } : {}}
              transition={{ delay: 1.1, duration: 0.4 }}
            />

            {/* ── Right snapped cable (tower top → broken end) ── */}
            <motion.path
              d="M 789,14 Q 694,116 636,166"
              fill="none" stroke="#FF5C00" strokeWidth="2.5" strokeDasharray="5 3"
              filter="url(#cable-glow)"
              initial={{ pathLength: 0 }} animate={isInView ? { pathLength: 1 } : {}}
              transition={{ delay: 0.8, duration: 0.7 }}
            />
            <motion.path
              d="M 636,166 Q 630,178 626,190 M 636,166 Q 640,180 642,192"
              fill="none" stroke="#FF5C00" strokeWidth="1.2"
              initial={{ opacity: 0 }} animate={isInView ? { opacity: 0.75 } : {}}
              transition={{ delay: 1.1, duration: 0.4 }}
            />

            {/* ── Left suspenders ── */}
            <motion.g
              initial={{ opacity: 0 }} animate={isInView ? { opacity: 1 } : {}}
              transition={{ delay: 0.95 }}
              stroke="rgba(255,255,255,0.12)" strokeWidth="1.1"
            >
              <line x1="420" y1="18" x2="420" y2="112" />
              <line x1="440" y1="32" x2="440" y2="120" />
              <line x1="460" y1="48" x2="460" y2="128" />
              <line x1="480" y1="64" x2="480" y2="136" />
              <line x1="500" y1="82" x2="500" y2="144" />
              <line x1="520" y1="100" x2="520" y2="152" />
            </motion.g>

            {/* ── Right suspenders ── */}
            <motion.g
              initial={{ opacity: 0 }} animate={isInView ? { opacity: 1 } : {}}
              transition={{ delay: 0.95 }}
              stroke="rgba(255,255,255,0.12)" strokeWidth="1.1"
            >
              <line x1="780" y1="18" x2="780" y2="112" />
              <line x1="760" y1="32" x2="760" y2="120" />
              <line x1="740" y1="48" x2="740" y2="128" />
              <line x1="720" y1="64" x2="720" y2="136" />
              <line x1="700" y1="82" x2="700" y2="144" />
              <line x1="680" y1="100" x2="680" y2="152" />
            </motion.g>

            {/* ── KNOWING — inside LEFT cliff ── */}
            <motion.g
              initial={{ opacity: 0 }}
              animate={isInView ? { opacity: 1 } : {}}
              transition={{ delay: 0.6, duration: 0.7 }}
            >
              <text
                x="185" y="200"
                textAnchor="middle"
                fill="#FF5C00"
                fontSize="26"
                fontWeight="900"
                letterSpacing="5"
                fontFamily="Poppins, sans-serif"
              >
                KNOWING
              </text>
              <text
                x="185" y="226"
                textAnchor="middle"
                fill="rgba(255,255,255,0.82)"
                fontSize="13"
                fontFamily="Poppins, sans-serif"
                fontWeight="600"
              >
                Thousands of tools,
              </text>
              <text
                x="185" y="245"
                textAnchor="middle"
                fill="rgba(255,255,255,0.82)"
                fontSize="13"
                fontFamily="Poppins, sans-serif"
                fontWeight="600"
              >
                workshops, and trainings
              </text>
            </motion.g>

            {/* ── APPLYING — inside RIGHT cliff ── */}
            <motion.g
              initial={{ opacity: 0 }}
              animate={isInView ? { opacity: 1 } : {}}
              transition={{ delay: 0.6, duration: 0.7 }}
            >
              <text
                x="1015" y="200"
                textAnchor="middle"
                fill="#FF5C00"
                fontSize="26"
                fontWeight="900"
                letterSpacing="5"
                fontFamily="Poppins, sans-serif"
              >
                APPLYING
              </text>
              <text
                x="1015" y="226"
                textAnchor="middle"
                fill="rgba(255,255,255,0.82)"
                fontSize="13"
                fontFamily="Poppins, sans-serif"
                fontWeight="600"
              >
                Fundamental Change
              </text>
              <text
                x="1015" y="245"
                textAnchor="middle"
                fill="rgba(255,255,255,0.82)"
                fontSize="13"
                fontFamily="Poppins, sans-serif"
                fontWeight="600"
              >
                in Outcomes
              </text>
            </motion.g>
          </motion.svg>
        </div>

        {/* ── Footer: CTA indicator ── */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 1.2, duration: 0.6 }}
          className="flex flex-col items-center justify-center gap-3 pt-8 pointer-events-auto"
        >
          <p className="text-white/35 text-sm md:text-base italic font-light text-center max-w-xl leading-relaxed">
            "The problem isn't a lack of tools, it is the complete absence of structure"
          </p>

          <span className="text-white/70 text-sm md:text-base tracking-wide max-w-2xl text-center leading-relaxed font-sans mt-2">
            See how <span className="text-[#FF5C00] font-black">1,500+</span> students across{' '}
            <span className="text-[#FF5C00] font-black">10+</span> colleges are bridging this gap
          </span>

          {/* Large clickable scroll-down arrow */}
          <button
            onClick={scrollToEcosystem}
            className="flex flex-col items-center justify-center mt-1 cursor-pointer group focus:outline-none"
            aria-label="See the ecosystem"
          >
            <motion.div
              animate={{ y: [0, 12, 0], opacity: [0.5, 1, 0.5] }}
              transition={{ repeat: Infinity, duration: 1.8, ease: 'easeInOut' }}
              className="text-[#FF5C00] text-6xl font-bold select-none tracking-widest group-hover:text-white transition-colors duration-300"
            >
              ↓
            </motion.div>
          </button>
        </motion.div>

      </div>
    </div>
  );
};
