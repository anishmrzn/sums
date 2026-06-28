import React, { useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Download, X, ChevronLeft, ChevronRight } from 'lucide-react';

const caseStudies = [
  {
    tag: 'PRE-INCUBATION',
    title: 'Saransa Catalyst Program',
    description:
      'A structured pre-incubation catalyst program designed to accelerate early-stage student ventures through mentorship, market validation, and institutional support.',
    gradient: 'linear-gradient(145deg, #1a0400 0%, #7c2400 45%, #FF5C00 100%)',
    accentColor: '#FF5C00',
    pdfUrl: '/logos/docs/saransa%20catalyst%20program/saransa_catalyst.pdf',
    qrUrl: '/logos/docs/saransa%20catalyst%20program/sarangsa.png',
  },
  {
    tag: 'INCUBATION',
    title: 'St. Xavier Pre-Incubation Program',
    description:
      'An institutional pre-incubation initiative bridging academic learning with entrepreneurial practice, enabling students to prototype and validate ideas within a structured framework.',
    gradient: 'linear-gradient(145deg, #000d1a 0%, #0c4a6e 45%, #0ea5e9 100%)',
    accentColor: '#0ea5e9',
    pdfUrl: '/logos/docs/st.xavier%20pre-incubation%20program/st.%20xavier_incubation.pdf',
    qrUrl: '/logos/docs/st.xavier%20pre-incubation%20program/st.xavier.png',
  },
  {
    tag: 'GLOBAL',
    title: 'Texas Incubation Program',
    description:
      'A collaborative incubation partnership supporting student-led innovation with access to global networks, industry mentors, and structured growth pathways.',
    gradient: 'linear-gradient(145deg, #0d0020 0%, #4c1d95 45%, #a855f7 100%)',
    accentColor: '#a855f7',
    pdfUrl: '/logos/docs/texas%20incubation%20program/texas_incubation.pdf',
    qrUrl: '/logos/docs/texas%20incubation%20program/texas_incubation.png',
  },
];

// ── MODAL ────────────────────────────────────────────────────────────────────
const Modal: React.FC<{ cs: typeof caseStudies[0]; onClose: () => void }> = ({ cs, onClose }) => (
  <motion.div
    className="fixed inset-0 z-[100] flex items-center justify-center p-4 md:p-8"
    initial={{ opacity: 0 }}
    animate={{ opacity: 1 }}
    exit={{ opacity: 0 }}
    transition={{ duration: 0.2 }}
    onClick={onClose}
  >
    <div className="absolute inset-0 bg-black/80 backdrop-blur-md" />
    <motion.div
      className="relative z-10 w-full bg-[#0d0e14] border border-white/10 rounded-2xl overflow-hidden flex flex-col"
      style={{ width: '95vw', maxWidth: 1400, height: '92vh' }}
      initial={{ scale: 0.94, y: 20 }}
      animate={{ scale: 1, y: 0 }}
      exit={{ scale: 0.94, y: 20 }}
      transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
      onClick={e => e.stopPropagation()}
    >
      {/* header */}
      <div className="flex items-center justify-between px-6 py-4 border-b border-white/8 flex-shrink-0">
        <div className="flex items-center gap-3">
          <span
            className="text-[10px] font-bold tracking-widest uppercase px-2.5 py-1 rounded-full border"
            style={{ color: cs.accentColor, borderColor: `${cs.accentColor}40`, background: `${cs.accentColor}15` }}
          >
            {cs.tag}
          </span>
          <h3 className="text-white font-bold text-base tracking-tight">{cs.title}</h3>
        </div>
        <div className="flex items-center gap-3">
          <a
            href={cs.pdfUrl}
            download
            className="flex items-center gap-1.5 text-white/60 hover:text-white text-xs font-semibold border border-white/10 rounded-full px-3 py-1.5 hover:bg-white/5 transition-all"
          >
            <Download size={12} />
            Download
          </a>
          <button
            onClick={onClose}
            className="w-8 h-8 rounded-full bg-white/5 hover:bg-white/10 flex items-center justify-center transition-colors"
          >
            <X size={16} className="text-white/70" />
          </button>
        </div>
      </div>

      {/* body: PDF main, QR sidebar */}
      <div className="flex flex-row flex-1 min-h-0">
        <div className="flex-1 min-h-0 bg-gray-100">
          <iframe
            src={cs.pdfUrl}
            className="w-full h-full"
            style={{ border: 'none', display: 'block' }}
            title={cs.title}
          />
        </div>
        <div className="flex-shrink-0 w-44 flex flex-col items-center justify-center gap-4 px-4 py-6 border-l border-white/8">
          <p className="text-white/35 text-[9px] font-bold tracking-[0.3em] uppercase text-center">Scan for more info</p>
          <div className="w-32 h-32 rounded-xl overflow-hidden border border-white/10 bg-white p-2">
            <img src={cs.qrUrl} alt="QR code" className="w-full h-full object-contain" />
          </div>
          <p className="text-white/25 text-[9px] text-center leading-relaxed">
            Scan to access the full report and additional resources
          </p>
        </div>
      </div>
    </motion.div>
  </motion.div>
);

// ── MOBILE ───────────────────────────────────────────────────────────────────
const MobileCaseStudies: React.FC<{ onOpen: (cs: typeof caseStudies[0]) => void }> = ({ onOpen }) => {
  const [activeIndex, setActiveIndex] = useState(0);
  const touchStartX = useRef(0);

  const prev = () => setActiveIndex(i => Math.max(0, i - 1));
  const next = () => setActiveIndex(i => Math.min(caseStudies.length - 1, i + 1));

  const cs = caseStudies[activeIndex];

  return (
    <div className="w-full px-4 py-10 bg-[#040507] pointer-events-auto">
      <div className="flex items-center justify-between mb-6">
        <span className="text-white/35 text-[11px] font-bold tracking-[0.35em] uppercase">Case Studies</span>
        <span className="text-white/30 text-xs font-mono tracking-widest">{activeIndex + 1} / {caseStudies.length}</span>
      </div>

      <AnimatePresence mode="wait">
        <motion.div
          key={activeIndex}
          initial={{ opacity: 0, x: 30 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -30 }}
          transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
          onTouchStart={e => { touchStartX.current = e.touches[0].clientX; }}
          onTouchEnd={e => {
            const diff = touchStartX.current - e.changedTouches[0].clientX;
            if (diff > 40) next();
            if (diff < -40) prev();
          }}
        >
          {/* card */}
          <div
            className="w-full rounded-2xl overflow-hidden mb-5 relative cursor-pointer"
            style={{ height: 240, background: cs.gradient }}
            onClick={() => onOpen(cs)}
          >
            {/* PDF fills full card */}
            <div className="absolute inset-0 overflow-hidden bg-white" style={{ zIndex: 1, pointerEvents: 'none' }}>
              <iframe
                src={`${cs.pdfUrl}#toolbar=0&navpanes=0&scrollbar=0`}
                style={{ width: '200%', height: '200%', transform: 'scale(0.5)', transformOrigin: 'top left', border: 'none', pointerEvents: 'none' }}
                title={cs.title}
              />
            </div>
            {/* colour tint */}
            <div className="absolute inset-0 pointer-events-none" style={{ zIndex: 2, background: cs.gradient, opacity: 0.2 }} />
            {/* tag badge above everything */}
            <div className="absolute top-3 left-3" style={{ zIndex: 5 }}>
              <span
                className="text-[10px] font-bold tracking-widest uppercase px-2.5 py-1 rounded-full border"
                style={{ color: cs.accentColor, borderColor: `${cs.accentColor}40`, background: `${cs.accentColor}15` }}
              >
                {cs.tag}
              </span>
            </div>
          </div>

          <h2 className="font-black text-xl text-white leading-tight mb-3">{cs.title}</h2>
          <p className="text-white/50 text-sm leading-relaxed">{cs.description}</p>
        </motion.div>
      </AnimatePresence>

      <div className="flex items-center justify-between mt-8">
        <button
          onClick={prev}
          disabled={activeIndex === 0}
          className="w-11 h-11 rounded-full border border-white/10 flex items-center justify-center text-white/50 disabled:opacity-25 active:bg-white/5 transition-all"
        >
          <ChevronLeft size={18} />
        </button>
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

// ── DESKTOP ───────────────────────────────────────────────────────────────────
const DesktopCaseStudies: React.FC<{ onOpen: (cs: typeof caseStudies[0]) => void }> = ({ onOpen }) => {
  const [activeIndex, setActiveIndex] = useState(0);
  const [hovering, setHovering] = useState(false);
  const cursorPosRef = useRef({ x: 180, y: 240 });
  const hoverBtnRef = useRef<HTMLDivElement>(null);

  const n = caseStudies.length;
  const prev = () => setActiveIndex(i => (i - 1 + n) % n);
  const next = () => setActiveIndex(i => (i + 1) % n);

  const cs = caseStudies[activeIndex];

  const onCardMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    cursorPosRef.current = { x: e.clientX - rect.left, y: e.clientY - rect.top };
    if (hoverBtnRef.current) {
      hoverBtnRef.current.style.left = `${e.clientX - rect.left}px`;
      hoverBtnRef.current.style.top = `${e.clientY - rect.top}px`;
    }
  };

  return (
    <div className="relative h-screen w-full flex flex-col px-20 md:px-28 py-10 bg-[#040507] overflow-hidden pointer-events-auto">

      {/* ── Side nav arrows ─────────────────────────────────────────── */}
      <button
        onClick={prev}
        className="absolute left-4 md:left-5 top-1/2 -translate-y-1/2 z-20 flex flex-col items-center gap-2 group"
        aria-label="Previous"
      >
        <div className="w-12 h-12 md:w-14 md:h-14 rounded-full flex items-center justify-center border border-white/20 bg-white/8 group-hover:bg-[#FF5C00]/15 group-hover:border-[#FF5C00]/50 transition-all duration-200 shadow-lg shadow-black/30">
          <ChevronLeft size={24} className="text-white/60 group-hover:text-white transition-colors duration-200" />
        </div>
        <span className="text-[9px] font-bold tracking-[0.2em] uppercase text-white/25 group-hover:text-white/60 transition-colors duration-200">Prev</span>
      </button>

      <button
        onClick={next}
        className="absolute right-4 md:right-5 top-1/2 -translate-y-1/2 z-20 flex flex-col items-center gap-2 group"
        aria-label="Next"
      >
        <div className="w-12 h-12 md:w-14 md:h-14 rounded-full flex items-center justify-center border border-white/20 bg-white/8 group-hover:bg-[#FF5C00]/15 group-hover:border-[#FF5C00]/50 transition-all duration-200 shadow-lg shadow-black/30">
          <ChevronRight size={24} className="text-white/60 group-hover:text-white transition-colors duration-200" />
        </div>
        <span className="text-[9px] font-bold tracking-[0.2em] uppercase text-white/25 group-hover:text-white/60 transition-colors duration-200">Next</span>
      </button>

      {/* top bar */}
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
          [{activeIndex + 1} / {n}]
        </span>
      </div>

      {/* main row — same 3-column layout as before */}
      <div className="flex-1 flex items-center gap-8 md:gap-14 min-h-0">

        {/* left: title + description */}
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
              <p className="mt-4 text-white/50 text-sm leading-relaxed">
                {cs.description}
              </p>
            </motion.div>
          </AnimatePresence>
        </div>

        {/* center: gradient card with PDF preview */}
        <div className="flex-1 flex items-center justify-center min-w-0">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeIndex + '-card'}
              initial={{ opacity: 0, scale: 0.93, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.93, y: -20 }}
              transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
              className="relative rounded-2xl overflow-hidden select-none cursor-none"
              style={{
                width: 'min(380px, 36vw)',
                height: 'min(500px, 64vh)',
                background: cs.gradient,
                boxShadow: `0 32px 80px ${cs.accentColor}30`,
              }}
              onMouseEnter={() => setHovering(true)}
              onMouseLeave={() => setHovering(false)}
              onMouseMove={onCardMouseMove}
              onClick={() => onOpen(cs)}
            >
              {/* gradient background */}
              <div className="absolute inset-0" style={{ background: 'rgba(0,0,0,0.38)' }} />
              {/* noise */}
              <div
                className="absolute inset-0 opacity-[0.06] pointer-events-none"
                style={{
                  backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E")`,
                  backgroundSize: 'cover',
                }}
              />

              {/* rings + PDF preview centred */}
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="absolute rounded-full border opacity-20" style={{ width: '70%', height: '70%', borderColor: 'white' }} />
                <div className="absolute rounded-full border opacity-10" style={{ width: '85%', height: '85%', borderColor: 'white', borderStyle: 'dashed' }} />
                {/* PDF preview — bigger than before */}
                <div className="relative z-10 rounded-xl overflow-hidden shadow-2xl" style={{ width: '68%', height: '70%' }}>
                  <div className="absolute inset-0 overflow-hidden bg-white" style={{ pointerEvents: 'none' }}>
                    <iframe
                      src={`${cs.pdfUrl}#toolbar=0&navpanes=0&scrollbar=0`}
                      style={{
                        width: '200%',
                        height: '200%',
                        transform: 'scale(0.5)',
                        transformOrigin: 'top left',
                        border: 'none',
                        pointerEvents: 'none',
                      }}
                      title={cs.title}
                    />
                  </div>
                </div>
              </div>

              {/* cursor-following hover button — z-index above everything including iframe */}
              <AnimatePresence>
                {hovering && (
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.15 }}
                    className="absolute inset-0 pointer-events-none"
                    style={{ zIndex: 20, background: 'rgba(0,0,0,0.35)', backdropFilter: 'blur(2px)' }}
                  >
                    <div
                      ref={hoverBtnRef}
                      className="absolute pointer-events-auto"
                      style={{ zIndex: 21, left: cursorPosRef.current.x, top: cursorPosRef.current.y, transform: 'translate(-50%, -50%)' }}
                    >
                      <span
                        className="flex items-center gap-2.5 px-5 py-2.5 rounded-full text-white font-semibold text-sm tracking-wide whitespace-nowrap"
                        style={{ background: 'rgba(255,255,255,0.12)', border: '1px solid rgba(255,255,255,0.35)', backdropFilter: 'blur(8px)', boxShadow: '0 4px 24px rgba(0,0,0,0.4)' }}
                      >
                        View Report →
                      </span>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          </AnimatePresence>
        </div>

        {/* right: QR + download */}
        <div className="w-[22%] flex-shrink-0">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeIndex + '-right'}
              initial={{ opacity: 0, x: 24 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 24 }}
              transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
              className="flex flex-col gap-6"
            >
              {/* QR */}
              <div className="flex flex-col items-start gap-3">
                <span className="text-white/30 text-[10px] font-bold tracking-[0.3em] uppercase">Scan for details</span>
                <div className="w-28 h-28 rounded-xl overflow-hidden border border-white/10 bg-white p-1.5">
                  <img src={cs.qrUrl} alt="QR" className="w-full h-full object-contain" />
                </div>
                <p className="text-white/30 text-xs leading-relaxed max-w-[160px]">
                  Scan with your camera to access the full report
                </p>
              </div>

              <div className="h-px w-8 bg-white/10" />

              {/* Download button */}
              <a
                href={cs.pdfUrl}
                download
                className="flex items-center gap-2.5 text-white/55 hover:text-white text-sm font-medium border border-white/10 rounded-full px-4 py-2.5 hover:bg-white/5 hover:border-white/25 transition-all duration-200 w-fit"
              >
                <Download size={13} strokeWidth={2} />
                Download PDF
              </a>

              {/* View in modal */}
              <button
                onClick={() => onOpen(cs)}
                className="flex items-center gap-2.5 text-white/55 hover:text-white text-sm font-medium transition-colors duration-200 group"
              >
                <span>View full report</span>
                <span className="opacity-0 group-hover:opacity-60 transition-opacity text-xs">→</span>
              </button>
            </motion.div>
          </AnimatePresence>
        </div>

      </div>

      {/* bottom: progress bar only */}
      <div className="mt-6 flex-shrink-0">
        <div className="w-full h-px bg-white/8 relative overflow-hidden">
          <motion.div
            className="absolute left-0 top-0 h-full"
            style={{ backgroundColor: cs.accentColor }}
            animate={{ width: `${((activeIndex + 1) / n) * 100}%` }}
            transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
          />
        </div>
      </div>
    </div>
  );
};

// ── EXPORT ───────────────────────────────────────────────────────────────────
export const CaseStudiesSection: React.FC = () => {
  const [isMobile, setIsMobile] = useState(() => typeof window !== 'undefined' && window.innerWidth < 768);
  const [modalCs, setModalCs] = useState<typeof caseStudies[0] | null>(null);

  React.useEffect(() => {
    const check = () => setIsMobile(window.innerWidth < 768);
    window.addEventListener('resize', check);
    return () => window.removeEventListener('resize', check);
  }, []);

  return (
    <>
      {isMobile
        ? <MobileCaseStudies onOpen={setModalCs} />
        : <DesktopCaseStudies onOpen={setModalCs} />
      }
      <AnimatePresence>
        {modalCs && <Modal cs={modalCs} onClose={() => setModalCs(null)} />}
      </AnimatePresence>
    </>
  );
};
