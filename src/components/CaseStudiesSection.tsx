import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Download, ExternalLink, ChevronLeft, ChevronRight } from 'lucide-react';

const caseStudies = [
  {
    tag: 'EDUCATION',
    title: 'Cogknit at Tribhuvan University',
    description:
      "Deployed Cogknit's smart learning management system across 3 faculties, digitizing curriculum delivery for 800+ students with structured knowledge pathways, real-time progress tracking, and faculty dashboards.",
    links: [
      { label: 'View Program', href: '#' },
      { label: 'Partner Portal', href: '#' },
      { label: 'LinkedIn', href: '#' },
    ],
    gradient: 'linear-gradient(145deg, #1a0400 0%, #7c2400 45%, #FF5C00 100%)',
    accentColor: '#FF5C00',
    pdfUrl: '#',
    logoText: 'COGKNIT',
    logoSub: 'Knowledge Platform',
    stat: '800+ students enrolled',
  },
  {
    tag: 'INDUSTRY',
    title: 'SIP × Leapfrog Technology',
    description:
      "Structured a 6-month strategic internship pipeline connecting 120 computer science students with Leapfrog's product teams. Resulted in 34 full-time placements, 2 spin-off products, and a formal institutional MOU.",
    links: [
      { label: 'Company Profile', href: '#' },
      { label: 'LinkedIn', href: '#' },
      { label: 'MOU Report', href: '#' },
    ],
    gradient: 'linear-gradient(145deg, #000d1a 0%, #0c4a6e 45%, #0ea5e9 100%)',
    accentColor: '#0ea5e9',
    pdfUrl: '#',
    logoText: 'SIP',
    logoSub: 'Strategic Partnerships',
    stat: '34 full-time placements',
  },
  {
    tag: 'INNOVATION',
    title: 'AIC Startup Cohort — Batch 01',
    description:
      '12 student-led startups incubated across Nepal, India, and Bangladesh over 16 weeks. 7 teams secured seed funding totaling NPR 42L through the AIC accelerator network and mentor ecosystem.',
    links: [
      { label: 'Cohort Report', href: '#' },
      { label: 'Startup Profiles', href: '#' },
      { label: 'LinkedIn', href: '#' },
    ],
    gradient: 'linear-gradient(145deg, #0d0020 0%, #4c1d95 45%, #a855f7 100%)',
    accentColor: '#a855f7',
    pdfUrl: '#',
    logoText: 'AIC',
    logoSub: 'Innovation Center',
    stat: 'NPR 42L seed funding raised',
  },
  {
    tag: 'GLOBAL',
    title: 'EU–Nepal Academic Alliance',
    description:
      'Co-designed a cross-border academic exchange with TU Delft and the University of Groningen, placing 22 Nepali researchers in European institutions for 6-month collaborative research fellowships.',
    links: [
      { label: 'Alliance Overview', href: '#' },
      { label: 'TU Delft', href: '#' },
      { label: 'Research Portal', href: '#' },
    ],
    gradient: 'linear-gradient(145deg, #001a0d 0%, #065f46 45%, #10b981 100%)',
    accentColor: '#10b981',
    pdfUrl: '#',
    logoText: 'EU × SUMS',
    logoSub: 'Academic Alliance',
    stat: '22 researchers placed in Europe',
  },
];

// ── MOBILE CAROUSEL ─────────────────────────────────────────────────────────
const MobileCaseStudies: React.FC = () => {
  const [activeIndex, setActiveIndex] = useState(0);
  const touchStartX = useRef(0);

  const prev = () => setActiveIndex(i => Math.max(0, i - 1));
  const next = () => setActiveIndex(i => Math.min(caseStudies.length - 1, i + 1));

  const onTouchStart = (e: React.TouchEvent) => {
    touchStartX.current = e.touches[0].clientX;
  };
  const onTouchEnd = (e: React.TouchEvent) => {
    const diff = touchStartX.current - e.changedTouches[0].clientX;
    if (diff > 40) next();
    if (diff < -40) prev();
  };

  const cs = caseStudies[activeIndex];

  return (
    <div className="w-full px-4 py-10 bg-[#040507] pointer-events-auto">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <span className="text-white/35 text-[11px] font-bold tracking-[0.35em] uppercase">
          Case Studies
        </span>
        <span className="text-white/30 text-xs font-mono tracking-widest">
          {activeIndex + 1} / {caseStudies.length}
        </span>
      </div>

      {/* Card */}
      <AnimatePresence mode="wait">
        <motion.div
          key={activeIndex}
          initial={{ opacity: 0, x: 30 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -30 }}
          transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
          onTouchStart={onTouchStart}
          onTouchEnd={onTouchEnd}
        >
          {/* Visual card */}
          <div
            className="w-full rounded-2xl overflow-hidden mb-5 relative"
            style={{ height: 220, background: cs.gradient }}
          >
            <div className="absolute inset-0 bg-black/35" />
            <div className="absolute inset-0 flex flex-col items-center justify-center gap-2">
              <div className="absolute rounded-full border border-white/15" style={{ width: '60%', height: '60%' }} />
              <span className="relative text-white font-black text-3xl tracking-wider z-10">{cs.logoText}</span>
              <span className="relative text-white/65 text-xs tracking-[0.2em] uppercase z-10">{cs.logoSub}</span>
            </div>
            <div className="absolute top-3 left-3">
              <span className="text-[10px] font-bold tracking-widest uppercase px-2.5 py-1 rounded-full border" style={{ color: cs.accentColor, borderColor: `${cs.accentColor}40`, background: `${cs.accentColor}15` }}>
                {cs.tag}
              </span>
            </div>
          </div>

          {/* Text */}
          <h2 className="font-black text-xl text-white leading-tight mb-2">{cs.title}</h2>
          <p className="text-xs font-bold tracking-widest uppercase mb-4" style={{ color: cs.accentColor }}>
            {cs.stat}
          </p>
          <p className="text-white/50 text-sm leading-relaxed mb-5">{cs.description}</p>

          {/* Links */}
          <div className="flex flex-wrap gap-3">
            {cs.links.map(link => (
              <a
                key={link.label}
                href={link.href}
                className="flex items-center gap-1.5 text-white/55 text-sm font-medium border border-white/10 rounded-full px-3 py-1.5 active:text-white active:border-white/30 transition-all duration-150"
              >
                {link.label}
                <ExternalLink size={10} />
              </a>
            ))}
          </div>
        </motion.div>
      </AnimatePresence>

      {/* Navigation */}
      <div className="flex items-center justify-between mt-8">
        <button
          onClick={prev}
          disabled={activeIndex === 0}
          className="w-11 h-11 rounded-full border border-white/10 flex items-center justify-center text-white/50 disabled:opacity-25 active:bg-white/5 transition-all"
        >
          <ChevronLeft size={18} />
        </button>

        {/* Dots */}
        <div className="flex gap-2">
          {caseStudies.map((_, i) => (
            <button
              key={i}
              onClick={() => setActiveIndex(i)}
              className="w-2 h-2 rounded-full transition-all duration-300"
              style={{ background: i === activeIndex ? cs.accentColor : 'rgba(255,255,255,0.2)', transform: i === activeIndex ? 'scale(1.4)' : 'scale(1)' }}
            />
          ))}
        </div>

        <button
          onClick={next}
          disabled={activeIndex === caseStudies.length - 1}
          className="w-11 h-11 rounded-full border border-white/10 flex items-center justify-center text-white/50 disabled:opacity-25 active:bg-white/5 transition-all"
        >
          <ChevronRight size={18} />
        </button>
      </div>

      {/* Progress bar */}
      <div className="mt-6 w-full h-px bg-white/8">
        <motion.div
          className="h-full"
          style={{ backgroundColor: cs.accentColor }}
          animate={{ width: `${((activeIndex + 1) / caseStudies.length) * 100}%` }}
          transition={{ duration: 0.4 }}
        />
      </div>
    </div>
  );
};

// ── DESKTOP SCROLL-DRIVEN ────────────────────────────────────────────────────
const DesktopCaseStudies: React.FC = () => {
  const [activeIndex, setActiveIndex] = useState(0);
  const [hovering, setHovering] = useState(false);
  const sectionRef = useRef<HTMLDivElement>(null);
  const cursorPosRef = useRef({ x: 180, y: 240 });
  const downloadBtnRef = useRef<HTMLDivElement>(null);

  const onCardMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    cursorPosRef.current = { x: e.clientX - rect.left, y: e.clientY - rect.top };
    if (downloadBtnRef.current) {
      downloadBtnRef.current.style.left = `${e.clientX - rect.left}px`;
      downloadBtnRef.current.style.top = `${e.clientY - rect.top}px`;
    }
  };

  useEffect(() => {
    const handleScroll = () => {
      if (!sectionRef.current) return;
      const rect = sectionRef.current.getBoundingClientRect();
      const scrolledIn = -rect.top;
      const totalScrollable = sectionRef.current.offsetHeight - window.innerHeight;
      if (totalScrollable <= 0) return;
      const progress = Math.max(0, Math.min(0.9999, scrolledIn / totalScrollable));
      setActiveIndex(Math.min(caseStudies.length - 1, Math.floor(progress * caseStudies.length)));
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const cs = caseStudies[activeIndex];

  return (
    <div ref={sectionRef} style={{ height: `${caseStudies.length * 100}vh` }}>
      <div className="sticky top-0 h-screen w-full flex flex-col px-8 md:px-14 py-10 bg-[#040507] overflow-hidden pointer-events-auto">

        <div className="flex items-center justify-between mb-6 flex-shrink-0">
          <AnimatePresence mode="wait">
            <motion.span
              key={activeIndex + '-tag'}
              initial={{ opacity: 0, y: -8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 8 }}
              transition={{ duration: 0.3 }}
              className="text-white/35 text-[11px] font-bold tracking-[0.35em] uppercase"
            >
              CASE STUDIES / {cs.tag}
            </motion.span>
          </AnimatePresence>
          <span className="text-white/30 text-xs font-mono tracking-widest">
            [{activeIndex + 1} / {caseStudies.length}]
          </span>
        </div>

        <div className="flex-1 flex items-center gap-8 md:gap-14 min-h-0">

          <div className="w-[26%] flex-shrink-0">
            <AnimatePresence mode="wait">
              <motion.div
                key={activeIndex + '-title'}
                initial={{ opacity: 0, y: 40 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -30 }}
                transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
              >
                <h2 className="font-black text-3xl md:text-4xl xl:text-5xl text-white leading-[1.1] tracking-tight">
                  {cs.title}
                </h2>
                <p className="mt-4 text-xs font-bold tracking-widest uppercase" style={{ color: cs.accentColor }}>
                  {cs.stat}
                </p>
              </motion.div>
            </AnimatePresence>
          </div>

          <div className="flex-1 flex items-center justify-center">
            <AnimatePresence mode="wait">
              <motion.div
                key={activeIndex + '-card'}
                initial={{ opacity: 0, scale: 0.93, y: 20 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.93, y: -20 }}
                transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
                className="relative rounded-2xl overflow-hidden select-none cursor-none"
                style={{
                  width: 'min(360px, 34vw)',
                  height: 'min(480px, 62vh)',
                  background: cs.gradient,
                  boxShadow: `0 32px 80px ${cs.accentColor}30`,
                }}
                onMouseEnter={() => setHovering(true)}
                onMouseLeave={() => setHovering(false)}
                onMouseMove={onCardMouseMove}
              >
                <div className="absolute inset-0" style={{ background: 'rgba(0,0,0,0.38)' }} />
                <div
                  className="absolute inset-0 opacity-[0.06]"
                  style={{
                    backgroundImage: 'url("data:image/svg+xml,%3Csvg viewBox=\'0 0 200 200\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Cfilter id=\'n\'%3E%3CfeTurbulence type=\'fractalNoise\' baseFrequency=\'0.9\' numOctaves=\'4\'/%3E%3C/filter%3E%3Crect width=\'100%25\' height=\'100%25\' filter=\'url(%23n)\'/%3E%3C/svg%3E")',
                    backgroundSize: 'cover',
                  }}
                />
                <div className="absolute inset-0 flex flex-col items-center justify-center gap-3">
                  <div className="absolute rounded-full border opacity-20" style={{ width: '70%', height: '70%', borderColor: 'white' }} />
                  <div className="absolute rounded-full border opacity-10" style={{ width: '85%', height: '85%', borderColor: 'white', borderStyle: 'dashed' }} />
                  <span className="relative text-white font-black text-3xl md:text-4xl tracking-wider drop-shadow-lg z-10">{cs.logoText}</span>
                  <span className="relative text-white/70 text-xs tracking-[0.25em] uppercase z-10">{cs.logoSub}</span>
                </div>
                <AnimatePresence>
                  {hovering && (
                    <motion.div
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      transition={{ duration: 0.15 }}
                      className="absolute inset-0 pointer-events-none"
                      style={{ background: 'rgba(0,0,0,0.25)', backdropFilter: 'blur(2px)' }}
                    >
                      <div
                        ref={downloadBtnRef}
                        className="absolute pointer-events-auto"
                        style={{ left: cursorPosRef.current.x, top: cursorPosRef.current.y, transform: 'translate(-50%, -50%)' }}
                      >
                        <a
                          href={cs.pdfUrl}
                          className="flex items-center gap-2.5 px-5 py-2.5 rounded-full text-white font-semibold text-sm tracking-wide whitespace-nowrap"
                          style={{ background: 'rgba(255,255,255,0.12)', border: '1px solid rgba(255,255,255,0.35)', backdropFilter: 'blur(8px)', boxShadow: '0 4px 24px rgba(0,0,0,0.4)' }}
                        >
                          <Download size={14} strokeWidth={2} />
                          Download Report
                        </a>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            </AnimatePresence>
          </div>

          <div className="w-[24%] flex-shrink-0">
            <AnimatePresence mode="wait">
              <motion.div
                key={activeIndex + '-info'}
                initial={{ opacity: 0, x: 24 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 24 }}
                transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
                className="flex flex-col gap-8"
              >
                <div className="flex flex-col gap-3">
                  {cs.links.map(link => (
                    <a
                      key={link.label}
                      href={link.href}
                      className="flex items-center gap-2 text-white/55 hover:text-white text-sm font-medium transition-colors duration-200 group"
                    >
                      {link.label}
                      <ExternalLink size={11} className="opacity-0 group-hover:opacity-60 transition-opacity -translate-y-0.5" />
                    </a>
                  ))}
                </div>
                <div className="h-px w-8 bg-white/10" />
                <p className="text-white/45 text-sm leading-relaxed">{cs.description}</p>
              </motion.div>
            </AnimatePresence>
          </div>
        </div>

        <div className="mt-6 flex-shrink-0">
          <div className="w-full h-px bg-white/8 relative overflow-hidden">
            <motion.div
              className="absolute left-0 top-0 h-full"
              style={{ backgroundColor: cs.accentColor }}
              animate={{ width: `${((activeIndex + 1) / caseStudies.length) * 100}%` }}
              transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

// ── EXPORT ───────────────────────────────────────────────────────────────────
export const CaseStudiesSection: React.FC = () => {
  const [isMobile, setIsMobile] = useState(() => typeof window !== 'undefined' && window.innerWidth < 768);

  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth < 768);
    window.addEventListener('resize', check);
    return () => window.removeEventListener('resize', check);
  }, []);

  return isMobile ? <MobileCaseStudies /> : <DesktopCaseStudies />;
};
