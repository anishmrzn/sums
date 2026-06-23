import React, { useRef } from 'react';
import { motion, useInView } from 'framer-motion';

export const SolutionsSection: React.FC = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(sectionRef, { once: true, amount: 0.2 });

  return (
    <div
      ref={sectionRef}
      className="w-full bg-transparent flex flex-col justify-center py-12 px-4 md:px-8 relative overflow-hidden pointer-events-auto"
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

        {/* ── Full-Width Bridge Scene ──────────────────────────────── */}
        <div className="relative w-full flex flex-col justify-end" style={{ height: 580 }}>

          {/* ── Tools-pile image — sits on TOP of left cliff edge ── */}
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
            className="absolute z-20"
            style={{ left: '0%', bottom: '255px', width: '26%' }}
          >
            <div className="w-full rounded-xl overflow-hidden border border-white/10 bg-[#0a0b0e]/85 shadow-[0_8px_32px_rgba(0,0,0,0.6)]">
              <img
                src="/tools-pile.png"
                alt="Thousands of tools"
                className="w-full h-auto object-contain opacity-85"
                style={{ maxHeight: 150 }}
              />
            </div>
          </motion.div>

          {/* ── Outcome image — sits on TOP of right cliff edge ── */}
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.4, ease: [0.16, 1, 0.3, 1] }}
            className="absolute z-20"
            style={{ right: '0%', bottom: '255px', width: '26%' }}
          >
            <div className="w-full rounded-xl overflow-hidden border border-white/10 bg-[#0a0b0e]/85 shadow-[0_8px_32px_rgba(0,0,0,0.6)]">
              <img
                src="/target-diagram.png"
                alt="Fundamental Change in Outcomes"
                className="w-full h-auto object-contain opacity-85"
                style={{ maxHeight: 150 }}
              />
            </div>
          </motion.div>

          {/* ── SVG Bridge — cliffs + towers + cables + broken gap ── */}
          <motion.svg
            viewBox="0 0 1200 340"
            className="absolute inset-x-0 bottom-0 w-full select-none"
            style={{ height: 400 }}
            initial={{ opacity: 0 }}
            animate={isInView ? { opacity: 1 } : {}}
            transition={{ duration: 0.6 }}
            preserveAspectRatio="none"
          >
            <defs>
              {/* Orange cable glow filter */}
              <filter id="cable-glow" x="-20%" y="-20%" width="140%" height="140%">
                <feGaussianBlur stdDeviation="4" result="blur" />
                <feMerge>
                  <feMergeNode in="blur" />
                  <feMergeNode in="SourceGraphic" />
                </feMerge>
              </filter>
              {/* Cliff gradient: darker at bottom */}
              <linearGradient id="cliff-grad" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#14161f" />
                <stop offset="100%" stopColor="#0a0b0e" />
              </linearGradient>
            </defs>

            {/* ── LEFT CLIFF body (wider, from edge to ~420) ── */}
            <motion.path
              d="M -10,140 L 400,110 L 360,340 L -10,340 Z"
              fill="url(#cliff-grad)"
              stroke="rgba(255,255,255,0.07)"
              strokeWidth="1.5"
              initial={{ x: -80, opacity: 0 }}
              animate={isInView ? { x: 0, opacity: 1 } : {}}
              transition={{ duration: 0.9, ease: 'easeOut' }}
            />

            {/* ── RIGHT CLIFF body (wider, from ~800 to edge) ── */}
            <motion.path
              d="M 1210,140 L 800,110 L 840,340 L 1210,340 Z"
              fill="url(#cliff-grad)"
              stroke="rgba(255,255,255,0.07)"
              strokeWidth="1.5"
              initial={{ x: 80, opacity: 0 }}
              animate={isInView ? { x: 0, opacity: 1 } : {}}
              transition={{ duration: 0.9, ease: 'easeOut' }}
            />

            {/* ── Left cliff top surface ── */}
            <motion.line
              x1="-10" y1="110" x2="400" y2="110"
              stroke="rgba(255,255,255,0.18)" strokeWidth="3"
              initial={{ pathLength: 0, opacity: 0 }}
              animate={isInView ? { pathLength: 1, opacity: 1 } : {}}
              transition={{ delay: 0.5, duration: 0.6 }}
            />

            {/* ── Right cliff top surface ── */}
            <motion.line
              x1="800" y1="110" x2="1210" y2="110"
              stroke="rgba(255,255,255,0.18)" strokeWidth="3"
              initial={{ pathLength: 0, opacity: 0 }}
              animate={isInView ? { pathLength: 1, opacity: 1 } : {}}
              transition={{ delay: 0.5, duration: 0.6 }}
            />

            {/* ── Left Tower ── */}
            <motion.g
              initial={{ opacity: 0, y: 15 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.3, duration: 0.7 }}
            >
              <rect x="386" y="20" width="20" height="90" fill="#0d0e14" stroke="rgba(255,255,255,0.35)" strokeWidth="2" />
              {/* Cross-beams */}
              <line x1="386" y1="44" x2="406" y2="44" stroke="rgba(255,255,255,0.25)" strokeWidth="2" />
              <line x1="386" y1="64" x2="406" y2="64" stroke="rgba(255,255,255,0.25)" strokeWidth="2" />
              <line x1="386" y1="84" x2="406" y2="84" stroke="rgba(255,255,255,0.25)" strokeWidth="2" />
              {/* Tower cap */}
              <rect x="382" y="16" width="28" height="6" fill="rgba(255,92,0,0.6)" rx="1" />
            </motion.g>

            {/* ── Right Tower ── */}
            <motion.g
              initial={{ opacity: 0, y: 15 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.3, duration: 0.7 }}
            >
              <rect x="794" y="20" width="20" height="90" fill="#0d0e14" stroke="rgba(255,255,255,0.35)" strokeWidth="2" />
              <line x1="794" y1="44" x2="814" y2="44" stroke="rgba(255,255,255,0.25)" strokeWidth="2" />
              <line x1="794" y1="64" x2="814" y2="64" stroke="rgba(255,255,255,0.25)" strokeWidth="2" />
              <line x1="794" y1="84" x2="814" y2="84" stroke="rgba(255,255,255,0.25)" strokeWidth="2" />
              <rect x="790" y="16" width="28" height="6" fill="rgba(255,92,0,0.6)" rx="1" />
            </motion.g>

            {/* ── Left Diagonal Support Pillar (under the deck) ── */}
            <motion.path
              d="M 382,240 L 460,140 L 472,146 L 392,246 Z"
              fill="#161822" stroke="rgba(255,255,255,0.1)" strokeWidth="1"
              initial={{ opacity: 0 }}
              animate={isInView ? { opacity: 1 } : {}}
              transition={{ delay: 0.5, duration: 0.7 }}
            />
            <line x1="460" y1="140" x2="382" y2="240" stroke="#FF5C00" strokeWidth="1.5" opacity="0.4" />

            {/* ── Right Diagonal Support Pillar (under the deck) ── */}
            <motion.path
              d="M 818,240 L 740,140 L 728,146 L 808,246 Z"
              fill="#161822" stroke="rgba(255,255,255,0.1)" strokeWidth="1"
              initial={{ opacity: 0 }}
              animate={isInView ? { opacity: 1 } : {}}
              transition={{ delay: 0.5, duration: 0.7 }}
            />
            <line x1="740" y1="140" x2="818" y2="240" stroke="#FF5C00" strokeWidth="1.5" opacity="0.4" />

            {/* ── Left Thick Tilted Deck (broken concrete) ── */}
            <motion.path
              d="M 400,110 L 550,168 L 546,188 L 400,128 Z"
              fill="#1c1e27" stroke="rgba(255,255,255,0.15)" strokeWidth="1.5"
              initial={{ pathLength: 0 }}
              animate={isInView ? { pathLength: 1 } : {}}
              transition={{ delay: 0.6, duration: 0.8 }}
            />
            {/* Highlight orange top road line */}
            <line x1="400" y1="110" x2="550" y2="168" stroke="#FF5C00" strokeWidth="3.5" />

            {/* ── Right Thick Tilted Deck (broken concrete) ── */}
            <motion.path
              d="M 800,110 L 650,168 L 654,188 L 800,128 Z"
              fill="#1c1e27" stroke="rgba(255,255,255,0.15)" strokeWidth="1.5"
              initial={{ pathLength: 0 }}
              animate={isInView ? { pathLength: 1 } : {}}
              transition={{ delay: 0.6, duration: 0.8 }}
            />
            {/* Highlight orange top road line */}
            <line x1="800" y1="110" x2="650" y2="168" stroke="#FF5C00" strokeWidth="3.5" />

            {/* Falling concrete chunks / cracking elements */}
            <motion.g
              initial={{ opacity: 0, y: -10 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 1.1, duration: 0.6 }}
            >
              {/* Chunk 1 */}
              <polygon points="572,182 582,177 586,187 576,191" fill="#1c1e27" stroke="#FF5C00" strokeWidth="0.8" />
              {/* Chunk 2 */}
              <polygon points="614,192 622,184 626,196 618,201" fill="#1c1e27" stroke="rgba(255,255,255,0.2)" strokeWidth="0.8" />
              {/* Chunk 3 */}
              <polygon points="598,212 607,208 605,218 596,217" fill="#1c1e27" stroke="#FF5C00" strokeWidth="0.8" />
            </motion.g>

            {/* ── Main suspension cables (outer, from edges to tower tops) ── */}
            <motion.path
              d="M -10,70 Q 200,40 396,22"
              fill="none" stroke="#FF5C00" strokeWidth="3"
              filter="url(#cable-glow)"
              initial={{ pathLength: 0 }} animate={isInView ? { pathLength: 1 } : {}}
              transition={{ delay: 0.5, duration: 0.8 }}
            />
            <motion.path
              d="M 1210,70 Q 1010,40 804,22"
              fill="none" stroke="#FF5C00" strokeWidth="3"
              filter="url(#cable-glow)"
              initial={{ pathLength: 0 }} animate={isInView ? { pathLength: 1 } : {}}
              transition={{ delay: 0.5, duration: 0.8 }}
            />

            {/* ── Snapped/Frayed cables dangling in the gap ── */}
            {/* Left snapped piece */}
            <motion.path
              d="M 396,22 Q 490,120 540,168"
              fill="none" stroke="#FF5C00" strokeWidth="2.5" strokeDasharray="5 3"
              filter="url(#cable-glow)"
              initial={{ pathLength: 0 }} animate={isInView ? { pathLength: 1 } : {}}
              transition={{ delay: 0.8, duration: 0.7 }}
            />
            {/* Frayed wire strands at the end of left snapped cable */}
            <motion.path
              d="M 540,168 Q 546,178 550,188 M 540,168 Q 537,180 538,192"
              fill="none" stroke="#FF5C00" strokeWidth="1.2"
              initial={{ opacity: 0 }} animate={isInView ? { opacity: 0.75 } : {}}
              transition={{ delay: 1.1, duration: 0.4 }}
            />

            {/* Right snapped piece */}
            <motion.path
              d="M 804,22 Q 710,120 660,168"
              fill="none" stroke="#FF5C00" strokeWidth="2.5" strokeDasharray="5 3"
              filter="url(#cable-glow)"
              initial={{ pathLength: 0 }} animate={isInView ? { pathLength: 1 } : {}}
              transition={{ delay: 0.8, duration: 0.7 }}
            />
            {/* Frayed wire strands at the end of right snapped cable */}
            <motion.path
              d="M 660,168 Q 654,178 650,188 M 660,168 Q 663,180 662,192"
              fill="none" stroke="#FF5C00" strokeWidth="1.2"
              initial={{ opacity: 0 }} animate={isInView ? { opacity: 0.75 } : {}}
              transition={{ delay: 1.1, duration: 0.4 }}
            />

            {/* ── Left suspenders (vertical hangers from left cable to tilted road) ── */}
            <motion.g
              initial={{ opacity: 0 }} animate={isInView ? { opacity: 1 } : {}}
              transition={{ delay: 0.95 }}
              stroke="rgba(255,255,255,0.13)" strokeWidth="1.2"
            >
              <line x1="410" y1="28" x2="410" y2="114" />
              <line x1="430" y1="42" x2="430" y2="122" />
              <line x1="450" y1="56" x2="450" y2="130" />
              <line x1="470" y1="70" x2="470" y2="138" />
              <line x1="490" y1="84" x2="490" y2="146" />
              <line x1="510" y1="98" x2="510" y2="154" />
            </motion.g>

            {/* ── Right suspenders ── */}
            <motion.g
              initial={{ opacity: 0 }} animate={isInView ? { opacity: 1 } : {}}
              transition={{ delay: 0.95 }}
              stroke="rgba(255,255,255,0.13)" strokeWidth="1.2"
            >
              <line x1="790" y1="28" x2="790" y2="114" />
              <line x1="770" y1="42" x2="770" y2="122" />
              <line x1="750" y1="56" x2="750" y2="130" />
              <line x1="730" y1="70" x2="730" y2="138" />
              <line x1="710" y1="84" x2="710" y2="146" />
              <line x1="690" y1="98" x2="690" y2="154" />
            </motion.g>

            {/* ── Systems are not connected text banner inside the broken gap ── */}
            <motion.g
              initial={{ opacity: 0, scale: 0.9 }}
              animate={isInView ? { opacity: 1, scale: 1 } : {}}
              transition={{ delay: 1.0, duration: 0.6 }}
            >
              {/* Clean dark pill tag overlay with red-orange border warning */}
              <rect
                x="460" y="128" width="280" height="28"
                rx="6"
                fill="#040507"
                stroke="rgba(255,92,0,0.3)"
                strokeWidth="1"
              />
              <text
                x="600" y="147"
                textAnchor="middle"
                fill="#FF5C00"
                fontSize="10"
                fontWeight="900"
                letterSpacing="2"
                fontFamily="Poppins, sans-serif"
                style={{ textShadow: '0 0 10px rgba(255,92,0,0.35)' }}
              >
                SYSTEMS ARE NOT CONNECTED
              </text>
            </motion.g>

            {/* ── KNOWING heading + subtext inside LEFT cliff ── */}
            <motion.g
              initial={{ opacity: 0 }}
              animate={isInView ? { opacity: 1 } : {}}
              transition={{ delay: 0.6, duration: 0.7 }}
            >
              <text
                x="175" y="205"
                textAnchor="middle"
                fill="white"
                fontSize="26"
                fontWeight="900"
                letterSpacing="5"
                fontFamily="Poppins, sans-serif"
              >
                KNOWING
              </text>
              <text
                x="175" y="235"
                textAnchor="middle"
                fill="rgba(255,255,255,0.45)"
                fontSize="11"
                fontFamily="Poppins, sans-serif"
                fontWeight="700"
              >
                Thousands of tools,
              </text>
              <text
                x="175" y="251"
                textAnchor="middle"
                fill="rgba(255,255,255,0.45)"
                fontSize="11"
                fontFamily="Poppins, sans-serif"
                fontWeight="700"
              >
                workshops, and trainings
              </text>
            </motion.g>

            {/* ── APPLYING heading + subtext inside RIGHT cliff ── */}
            <motion.g
              initial={{ opacity: 0 }}
              animate={isInView ? { opacity: 1 } : {}}
              transition={{ delay: 0.6, duration: 0.7 }}
            >
              <text
                x="1025" y="205"
                textAnchor="middle"
                fill="white"
                fontSize="26"
                fontWeight="900"
                letterSpacing="5"
                fontFamily="Poppins, sans-serif"
              >
                APPLYING
              </text>
              <text
                x="1025" y="235"
                textAnchor="middle"
                fill="rgba(255,255,255,0.45)"
                fontSize="11"
                fontFamily="Poppins, sans-serif"
                fontWeight="700"
              >
                Fundamental Change
              </text>
              <text
                x="1025" y="251"
                textAnchor="middle"
                fill="rgba(255,255,255,0.45)"
                fontSize="11"
                fontFamily="Poppins, sans-serif"
                fontWeight="700"
              >
                in Outcomes
              </text>
            </motion.g>
          </motion.svg>
        </div>

        {/* ── Footer: CTA indicator (non-clickable premium scroll indicator) ── */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 1.2, duration: 0.6 }}
          className="flex flex-col items-center justify-center gap-4 pt-12 pointer-events-auto"
        >
          <span className="text-white/70 text-sm md:text-base tracking-wide max-w-2xl text-center leading-relaxed font-sans">
            See how <span className="text-[#FF5C00] font-black">1,500+</span> students across{' '}
            <span className="text-[#FF5C00] font-black">10+</span> colleges are already bridging this gap with SUMs
          </span>

          {/* Premium animated scroll-down chevron indicator */}
          <div className="flex flex-col items-center justify-center mt-1">
            <motion.div
              animate={{ y: [0, 8, 0], opacity: [0.4, 1, 0.4] }}
              transition={{ repeat: Infinity, duration: 1.8, ease: 'easeInOut' }}
              className="text-[#FF5C00] text-3xl font-extralight select-none select-none tracking-widest pointer-events-none"
            >
              ↓
            </motion.div>
          </div>
        </motion.div>

      </div>
    </div>
  );
};
