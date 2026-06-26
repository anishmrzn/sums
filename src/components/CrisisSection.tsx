import React, { useEffect, useState, useRef } from 'react';
import { motion, useInView, useReducedMotion } from 'framer-motion';

export const CrisisSection: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  // Use a lower amount threshold so animation triggers earlier while scrolling
  const isInView = useInView(containerRef, { once: true, amount: 0.45 });
  const reduced = useReducedMotion() ?? false;

  const [activeStep, setActiveStep] = useState(-1);
  const [isSpinning, setIsSpinning] = useState(false);

  useEffect(() => {
    if (isInView) {
      // Faster paced sequence — heading appears quickly
      const delays = [200, 900, 1600, 2300];
      delays.forEach((delay, idx) => {
        setTimeout(() => setActiveStep(idx), delay);
      });
      // Spinning starts after 3 seconds
      setTimeout(() => setIsSpinning(true), 3000);
    }
  }, [isInView]);

  const cards = [
    {
      title: 'Skill Gap',
      desc: "Colleges aren't producing employable graduates. Theoretical curricula mismatch employer needs.",
      label: 'SKILL GAP',
      color: '#FF5C00'
    },
    {
      title: 'Degree Mills',
      desc: 'Rote-learning has replaced actual innovation. Degrees prioritize attendance over actual building.',
      label: 'DEGREE MILLS',
      color: '#CC3D00'
    },
    {
      title: 'Price Wars',
      desc: 'Commoditized degrees trigger a race to the bottom, making premium tuition impossible to justify.',
      label: 'PRICE WARS',
      color: '#FF5C00'
    },
    {
      title: 'The Blindfold',
      desc: 'Zero visibility into learning quality forces leadership to make critical decisions on pure guesswork.',
      label: 'THE BLINDFOLD',
      color: '#CC3D00'
    }
  ];

  return (
    <div
      ref={containerRef}
      className="min-h-screen w-full bg-transparent flex flex-col justify-center py-20 px-4 md:px-8 relative overflow-hidden pointer-events-auto"
    >
      <div className="max-w-[1400px] mx-auto w-full z-10">

        {/* Full-width 2-column grid: big wheel left, cards right */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 xl:gap-16 items-center">

          {/* LEFT COLUMN: Premium Rotating Cycle Wheel — hidden on mobile */}
          <div className="hidden lg:flex lg:col-span-7 flex-col items-center justify-center relative">
            {/* Wheel wrapper — much larger */}
            <div className="relative w-[400px] h-[400px] sm:w-[500px] sm:h-[500px] md:w-[560px] md:h-[560px] xl:w-[620px] xl:h-[620px] flex items-center justify-center">

              {/* Outer decorative orbit rings */}
              <div className="absolute inset-0 border border-white/[0.04] rounded-full scale-[1.06] pointer-events-none" />
              <div className="absolute inset-0 border border-dashed border-[#FF5C00]/8 rounded-full scale-[1.12] pointer-events-none" />

              {/* Rotating SVG + label tags container */}
              <motion.div
                animate={isSpinning && !reduced ? { rotate: 360 } : { rotate: 0 }}
                transition={
                  isSpinning && !reduced
                    ? { repeat: Infinity, duration: 30, ease: 'linear' }
                    : { duration: 0 }
                }
                className="w-full h-full relative"
              >
                <svg viewBox="0 0 400 400" className="w-full h-full transform -rotate-45" aria-hidden="true">
                  <defs>
                    <linearGradient id="segment-orange" x1="0" y1="0" x2="1" y2="1">
                      <stop offset="0%" stopColor="#FF5C00" stopOpacity="0.9" />
                      <stop offset="100%" stopColor="#CC3D00" stopOpacity="0.5" />
                    </linearGradient>
                    <linearGradient id="segment-dark" x1="0" y1="0" x2="1" y2="1">
                      <stop offset="0%" stopColor="#CC3D00" stopOpacity="0.9" />
                      <stop offset="100%" stopColor="#801A00" stopOpacity="0.4" />
                    </linearGradient>
                    <filter id="glow-light" x="-25%" y="-25%" width="150%" height="150%">
                      <feGaussianBlur stdDeviation="7" result="blur" />
                      <feComposite in="SourceGraphic" in2="blur" operator="over" />
                    </filter>
                    {/* Sharp chevron arrowhead — orange */}
                    <marker
                      id="arrow-orange"
                      viewBox="0 0 14 14"
                      refX="7" refY="7"
                      markerWidth="9" markerHeight="9"
                      orient="auto"
                    >
                      <path d="M 1,2 L 12,7 L 1,12 L 4,7 Z" fill="#FF5C00" opacity="0.95" />
                    </marker>
                    {/* Sharp chevron arrowhead — dark orange */}
                    <marker
                      id="arrow-dark"
                      viewBox="0 0 14 14"
                      refX="7" refY="7"
                      markerWidth="9" markerHeight="9"
                      orient="auto"
                    >
                      <path d="M 1,2 L 12,7 L 1,12 L 4,7 Z" fill="#E04500" opacity="0.95" />
                    </marker>
                  </defs>

                  {/* Segment 1: Skill Gap — arc goes CW from bottom-left to top-right */}
                  <motion.path
                    d="M 90,200 A 110,110 0 0,1 190,92"
                    fill="none"
                    stroke="url(#segment-orange)"
                    strokeWidth="14"
                    strokeLinecap="round"
                    filter="url(#glow-light)"
                    initial={{ pathLength: 0 }}
                    animate={activeStep >= 0 ? { pathLength: 1 } : {}}
                    transition={{ duration: 0.9, ease: 'easeInOut' }}
                  />
                  {activeStep >= 0 && (
                    <motion.g
                      transform="translate(190, 92) rotate(354.7)"
                      initial={{ opacity: 0, scale: 0 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ duration: 0.45, delay: 0.7, ease: [0.34, 1.56, 0.64, 1] }}
                    >
                      <path
                        d="M -14,-8 L 6,0 L -14,8 L -8,0 Z"
                        fill="#FF5C00"
                        filter="url(#glow-light)"
                      />
                    </motion.g>
                  )}

                  {/* Segment 2: Degree Mills — arc goes CW from top to right */}
                  <motion.path
                    d="M 200,90 A 110,110 0 0,1 308,190"
                    fill="none"
                    stroke="url(#segment-dark)"
                    strokeWidth="14"
                    strokeLinecap="round"
                    filter="url(#glow-light)"
                    initial={{ pathLength: 0 }}
                    animate={activeStep >= 1 ? { pathLength: 1 } : {}}
                    transition={{ duration: 0.9, ease: 'easeInOut' }}
                  />
                  {activeStep >= 1 && (
                    <motion.g
                      transform="translate(308, 190) rotate(84.7)"
                      initial={{ opacity: 0, scale: 0 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ duration: 0.45, delay: 0.7, ease: [0.34, 1.56, 0.64, 1] }}
                    >
                      <path
                        d="M -14,-8 L 6,0 L -14,8 L -8,0 Z"
                        fill="#CC3D00"
                        filter="url(#glow-light)"
                      />
                    </motion.g>
                  )}

                  {/* Segment 3: Price Wars — arc goes CW from right to bottom-left */}
                  <motion.path
                    d="M 310,200 A 110,110 0 0,1 210,308"
                    fill="none"
                    stroke="url(#segment-orange)"
                    strokeWidth="14"
                    strokeLinecap="round"
                    filter="url(#glow-light)"
                    initial={{ pathLength: 0 }}
                    animate={activeStep >= 2 ? { pathLength: 1 } : {}}
                    transition={{ duration: 0.9, ease: 'easeInOut' }}
                  />
                  {activeStep >= 2 && (
                    <motion.g
                      transform="translate(210, 308) rotate(174.7)"
                      initial={{ opacity: 0, scale: 0 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ duration: 0.45, delay: 0.7, ease: [0.34, 1.56, 0.64, 1] }}
                    >
                      <path
                        d="M -14,-8 L 6,0 L -14,8 L -8,0 Z"
                        fill="#FF5C00"
                        filter="url(#glow-light)"
                      />
                    </motion.g>
                  )}

                  {/* Segment 4: The Blindfold — arc goes CW from bottom to left */}
                  <motion.path
                    d="M 200,310 A 110,110 0 0,1 92,210"
                    fill="none"
                    stroke="url(#segment-dark)"
                    strokeWidth="14"
                    strokeLinecap="round"
                    filter="url(#glow-light)"
                    initial={{ pathLength: 0 }}
                    animate={activeStep >= 3 ? { pathLength: 1 } : {}}
                    transition={{ duration: 0.9, ease: 'easeInOut' }}
                  />
                  {activeStep >= 3 && (
                    <motion.g
                      transform="translate(92, 210) rotate(264.7)"
                      initial={{ opacity: 0, scale: 0 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ duration: 0.45, delay: 0.7, ease: [0.34, 1.56, 0.64, 1] }}
                    >
                      <path
                        d="M -14,-8 L 6,0 L -14,8 L -8,0 Z"
                        fill="#CC3D00"
                        filter="url(#glow-light)"
                      />
                    </motion.g>
                  )}
                </svg>


                {/* Label tags — counter-rotate to stay upright while wheel spins */}
                <div className="absolute inset-0 pointer-events-none">
                  {[
                    { style: { top: '10%', left: '4%' },  text: 'SKILL GAP',     border: 'border-[#FF5C00]/40', dot: 'bg-[#FF5C00]', step: 0 },
                    { style: { top: '10%', right: '4%' }, text: 'DEGREE MILLS',  border: 'border-[#CC3D00]/40', dot: 'bg-[#CC3D00]', step: 1 },
                    { style: { bottom: '10%', right: '4%' }, text: 'PRICE WARS', border: 'border-[#FF5C00]/40', dot: 'bg-[#FF5C00]', step: 2 },
                    { style: { bottom: '10%', left: '4%' }, text: 'THE BLINDFOLD', border: 'border-[#CC3D00]/40', dot: 'bg-[#CC3D00]', step: 3 }
                  ].map((label, i) => (
                    <motion.div
                      key={i}
                      className="absolute"
                      style={label.style}
                      initial={{ opacity: 0, scale: 0.85 }}
                      animate={activeStep >= label.step ? { opacity: 1, scale: 1 } : {}}
                      transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
                    >
                      {/* Counter-rotate to stay upright */}
                      <motion.div
                        animate={isSpinning && !reduced ? { rotate: -360 } : { rotate: 0 }}
                        transition={
                          isSpinning && !reduced
                            ? { repeat: Infinity, duration: 30, ease: 'linear' }
                            : { duration: 0 }
                        }
                      >
                        <span className={`text-[11px] md:text-[13px] font-mono font-bold tracking-wider bg-[#040507]/95 border ${label.border} px-4 py-2 rounded-lg shadow-[0_4px_20px_rgba(0,0,0,0.6)] backdrop-blur-md text-white flex items-center gap-2 whitespace-nowrap`}>
                          <span className={`w-2 h-2 rounded-full ${label.dot} animate-pulse`} />
                          {label.text}
                        </span>
                      </motion.div>
                    </motion.div>
                  ))}
                </div>
              </motion.div>

              {/* Central Hub — real sums_logo.png with glow */}
              <div className="absolute inset-0 m-auto w-32 h-32 md:w-36 md:h-36 flex items-center justify-center pointer-events-none z-20">
                {/* Outer ambient glow ring */}
                <div
                  className="absolute inset-0 rounded-full blur-xl"
                  style={{ background: 'radial-gradient(circle, rgba(255,109,0,0.55) 0%, rgba(255,60,0,0.2) 60%, transparent 100%)', transform: 'scale(1.6)' }}
                />
                {/* Inner sharp glow ring */}
                <div
                  className="absolute inset-0 rounded-full blur-md"
                  style={{ background: 'radial-gradient(circle, rgba(255,140,0,0.7) 0%, rgba(255,60,0,0.3) 50%, transparent 100%)', transform: 'scale(1.2)' }}
                />
                {/* Logo image */}
                <img
                  src="/sums_logo.png"
                  alt="SUMS"
                  className="relative z-10 w-full h-full object-contain"
                  style={{ animation: 'logoFloat 3.5s ease-in-out infinite, logoGlowPulse 2.5s ease-in-out infinite' }}
                />
              </div>
            </div>
          </div>

          {/* RIGHT COLUMN: Problem Description Cards */}
          <div className="lg:col-span-5 flex flex-col space-y-4 justify-center col-span-1">

            {/* Section heading — big, left-aligned, styled like hero headline */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              animate={isInView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
              className="mb-4"
            >
              {/* Accent line + label row */}
              <div className="flex items-center gap-3 mb-4">
                <div className="w-8 h-[2px] bg-[#FF5C00]" />
                <span className="text-[#FF5C00] text-[11px] font-extrabold tracking-[0.35em] uppercase">
                  01 / The Crisis
                </span>
              </div>
              {/* Big headline matching hero font weight/style */}
              <h2 className="font-sans font-black text-4xl md:text-5xl xl:text-6xl leading-[0.95] tracking-tight text-white">
                Higher Education<br />
                <span
                  className="text-[#FF5C00]"
                  style={{ WebkitTextStroke: '0px', textShadow: '0 0 40px rgba(255,92,0,0.4)' }}
                >
                  Is In Crisis
                </span>
              </h2>
              {/* Decorative bottom rule */}
              <div className="mt-5 flex items-center gap-3">
                <div className="h-[1px] w-12 bg-[#FF5C00]/60" />
                <div className="h-[1px] flex-1 bg-white/5" />
              </div>
            </motion.div>

            {cards.map((card, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, x: 50 }}
                animate={activeStep >= idx ? { opacity: 1, x: 0 } : {}}
                transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
                className={`p-5 md:p-6 rounded-xl border transition-all duration-500 flex items-start gap-4 relative overflow-hidden bg-white/[0.01] ${
                  activeStep === idx ? 'border-[#FF5C00]/40 bg-white/[0.025]' : 'border-white/5'
                }`}
              >
                {/* Active accent bar */}
                <div
                  className="absolute left-0 top-0 h-full w-[3px] transition-all duration-500"
                  style={{
                    backgroundColor: card.color,
                    opacity: activeStep === idx ? 1 : 0.25
                  }}
                />
                {/* Subtle active glow */}
                {activeStep === idx && (
                  <div
                    className="absolute inset-0 pointer-events-none"
                    style={{
                      background: `radial-gradient(ellipse at left center, ${card.color}10 0%, transparent 70%)`
                    }}
                  />
                )}

                <span className="text-sm md:text-base font-bold font-mono tracking-wider text-white/25 pt-0.5 relative z-10">
                  {String(idx + 1).padStart(2, '0')}
                </span>

                <div className="relative z-10">
                  <h4 className="text-base md:text-lg font-bold text-white tracking-wide">{card.title}</h4>
                  <p className="text-white/50 text-sm md:text-[15px] mt-1.5 leading-relaxed">{card.desc}</p>
                </div>
              </motion.div>
            ))}
          </div>

        </div>
      </div>
    </div>
  );
};
