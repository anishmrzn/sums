import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Download, ExternalLink } from 'lucide-react';

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

export const CaseStudiesSection: React.FC = () => {
  const [activeIndex, setActiveIndex] = useState(0);
  const [hovering, setHovering] = useState(false);
  const sectionRef = useRef<HTMLDivElement>(null);
  const cursorPosRef = useRef({ x: 180, y: 240 });
  const downloadBtnRef = useRef<HTMLDivElement>(null);

  const onCardMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    cursorPosRef.current = { x, y };
    if (downloadBtnRef.current) {
      downloadBtnRef.current.style.left = `${x}px`;
      downloadBtnRef.current.style.top = `${y}px`;
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
      const index = Math.min(caseStudies.length - 1, Math.floor(progress * caseStudies.length));
      setActiveIndex(index);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const cs = caseStudies[activeIndex];

  return (
    <div ref={sectionRef} style={{ height: `${caseStudies.length * 100}vh` }}>
      <div className="sticky top-0 h-screen w-full flex flex-col px-8 md:px-14 py-10 bg-[#040507] overflow-hidden pointer-events-auto">

        {/* Top row: section label + counter */}
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

        {/* Main content row */}
        <div className="flex-1 flex items-center gap-8 md:gap-14 min-h-0">

          {/* Left: Big title */}
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
                <p
                  className="mt-4 text-xs font-bold tracking-widest uppercase"
                  style={{ color: cs.accentColor }}
                >
                  {cs.stat}
                </p>
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Center: Image card */}
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
                {/* Dark overlay to ensure text readability */}
                <div className="absolute inset-0" style={{ background: 'rgba(0,0,0,0.38)' }} />

                {/* Noise texture overlay */}
                <div
                  className="absolute inset-0 opacity-[0.06]"
                  style={{
                    backgroundImage:
                      'url("data:image/svg+xml,%3Csvg viewBox=\'0 0 200 200\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Cfilter id=\'n\'%3E%3CfeTurbulence type=\'fractalNoise\' baseFrequency=\'0.9\' numOctaves=\'4\'/%3E%3C/filter%3E%3Crect width=\'100%25\' height=\'100%25\' filter=\'url(%23n)\'/%3E%3C/svg%3E")',
                    backgroundSize: 'cover',
                  }}
                />

                {/* Centered logo content */}
                <div className="absolute inset-0 flex flex-col items-center justify-center gap-3">
                  {/* Orbit decoration rings */}
                  <div
                    className="absolute rounded-full border opacity-20"
                    style={{ width: '70%', height: '70%', borderColor: 'white' }}
                  />
                  <div
                    className="absolute rounded-full border opacity-10"
                    style={{ width: '85%', height: '85%', borderColor: 'white', borderStyle: 'dashed' }}
                  />

                  <span className="relative text-white font-black text-3xl md:text-4xl tracking-wider drop-shadow-lg z-10">
                    {cs.logoText}
                  </span>
                  <span className="relative text-white/70 text-xs tracking-[0.25em] uppercase z-10">
                    {cs.logoSub}
                  </span>
                </div>

                {/* Hover: cursor-following download button */}
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
                      {/* Button anchored to cursor position */}
                      <div
                        ref={downloadBtnRef}
                        className="absolute pointer-events-auto"
                        style={{
                          left: cursorPosRef.current.x,
                          top: cursorPosRef.current.y,
                          transform: 'translate(-50%, -50%)',
                        }}
                      >
                        <a
                          href={cs.pdfUrl}
                          className="flex items-center gap-2.5 px-5 py-2.5 rounded-full text-white font-semibold text-sm tracking-wide whitespace-nowrap transition-all duration-150"
                          style={{
                            background: 'rgba(255,255,255,0.12)',
                            border: '1px solid rgba(255,255,255,0.35)',
                            backdropFilter: 'blur(8px)',
                            boxShadow: '0 4px 24px rgba(0,0,0,0.4)',
                          }}
                          onMouseEnter={e => {
                            (e.currentTarget as HTMLAnchorElement).style.background = 'rgba(255,255,255,0.22)';
                            (e.currentTarget as HTMLAnchorElement).style.borderColor = 'rgba(255,255,255,0.7)';
                          }}
                          onMouseLeave={e => {
                            (e.currentTarget as HTMLAnchorElement).style.background = 'rgba(255,255,255,0.12)';
                            (e.currentTarget as HTMLAnchorElement).style.borderColor = 'rgba(255,255,255,0.35)';
                          }}
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

          {/* Right: Links + description */}
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
                {/* Links */}
                <div className="flex flex-col gap-3">
                  {cs.links.map((link) => (
                    <a
                      key={link.label}
                      href={link.href}
                      className="flex items-center gap-2 text-white/55 hover:text-white text-sm font-medium transition-colors duration-200 group"
                    >
                      {link.label}
                      <ExternalLink
                        size={11}
                        className="opacity-0 group-hover:opacity-60 transition-opacity -translate-y-0.5"
                      />
                    </a>
                  ))}
                </div>

                {/* Divider */}
                <div className="h-px w-8 bg-white/10" />

                {/* Description */}
                <p className="text-white/45 text-sm leading-relaxed">{cs.description}</p>
              </motion.div>
            </AnimatePresence>
          </div>
        </div>

        {/* Bottom: progress bar */}
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
