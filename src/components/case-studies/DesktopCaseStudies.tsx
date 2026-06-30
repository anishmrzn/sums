import React, { useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Download, ChevronLeft, ChevronRight } from 'lucide-react';
import { caseStudies } from '../../data/caseStudies';
import type { CaseStudy } from '../../types';

export const DesktopCaseStudies: React.FC<{ onOpen: (cs: CaseStudy) => void }> = ({ onOpen }) => {
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
    <div className="relative h-screen w-full flex flex-col px-8 lg:px-16 xl:px-28 py-10 bg-[#040507] overflow-hidden pointer-events-auto">
      <button onClick={prev} className="absolute left-2 lg:left-4 xl:left-5 top-1/2 -translate-y-1/2 z-20 flex flex-col items-center gap-2 group" aria-label="Previous">
        <div className="w-12 h-12 md:w-14 md:h-14 rounded-full flex items-center justify-center border border-white/20 bg-white/8 group-hover:bg-[#FF5C00]/15 group-hover:border-[#FF5C00]/50 transition-all duration-200 shadow-lg shadow-black/30">
          <ChevronLeft size={24} className="text-white/60 group-hover:text-white transition-colors duration-200" />
        </div>
        <span className="text-[9px] font-bold tracking-[0.2em] uppercase text-white/25 group-hover:text-white/60 transition-colors duration-200">Prev</span>
      </button>

      <button onClick={next} className="absolute right-2 lg:right-4 xl:right-5 top-1/2 -translate-y-1/2 z-20 flex flex-col items-center gap-2 group" aria-label="Next">
        <div className="w-12 h-12 md:w-14 md:h-14 rounded-full flex items-center justify-center border border-white/20 bg-white/8 group-hover:bg-[#FF5C00]/15 group-hover:border-[#FF5C00]/50 transition-all duration-200 shadow-lg shadow-black/30">
          <ChevronRight size={24} className="text-white/60 group-hover:text-white transition-colors duration-200" />
        </div>
        <span className="text-[9px] font-bold tracking-[0.2em] uppercase text-white/25 group-hover:text-white/60 transition-colors duration-200">Next</span>
      </button>

      <div className="flex items-center justify-between mb-6 flex-shrink-0">
        <AnimatePresence mode="wait">
          <motion.span key={activeIndex + '-tag'} initial={{ opacity: 0, y: -8 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: 8 }} transition={{ duration: 0.3 }} className="text-white/35 text-[11px] font-bold tracking-[0.35em] uppercase">
            CASE STUDIES / {cs.tag}
          </motion.span>
        </AnimatePresence>
        <span className="text-white/30 text-xs font-mono tracking-widest">[{activeIndex + 1} / {n}]</span>
      </div>

      <div className="flex-1 flex items-center gap-8 md:gap-14 min-h-0">
        <div className="w-[26%] flex-shrink-0">
          <AnimatePresence mode="wait">
            <motion.div key={activeIndex + '-title'} initial={{ opacity: 0, y: 40 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -30 }} transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}>
              <h2 className="font-black text-3xl md:text-4xl xl:text-5xl text-white leading-[1.1] tracking-tight">{cs.title}</h2>
              <p className="mt-4 text-white/50 text-sm leading-relaxed">{cs.description}</p>
            </motion.div>
          </AnimatePresence>
        </div>

        <div className="flex-1 flex items-center justify-center min-w-0">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeIndex + '-card'}
              initial={{ opacity: 0, scale: 0.93, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.93, y: -20 }}
              transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
              className="relative rounded-2xl overflow-hidden select-none cursor-none"
              style={{ width: 'min(380px, 36vw)', height: 'min(500px, 64vh)', background: cs.gradient, boxShadow: `0 32px 80px ${cs.accentColor}30` }}
              onMouseEnter={() => setHovering(true)}
              onMouseLeave={() => setHovering(false)}
              onMouseMove={onCardMouseMove}
              onClick={() => onOpen(cs)}
            >
              <div className="absolute inset-0" style={{ background: 'rgba(0,0,0,0.38)' }} />
              <div className="absolute inset-0 opacity-[0.06] pointer-events-none" style={{ backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E")`, backgroundSize: 'cover' }} />

              <div className="absolute inset-0 flex items-center justify-center">
                <div className="absolute rounded-full border opacity-20" style={{ width: '70%', height: '70%', borderColor: 'white' }} />
                <div className="absolute rounded-full border opacity-10" style={{ width: '85%', height: '85%', borderColor: 'white', borderStyle: 'dashed' }} />
                <div className={`relative z-10 rounded-xl overflow-hidden shadow-2xl ${hovering ? 'scale-110' : 'scale-100'} transition-all duration-200 ease-in`} style={{ width: '68%', height: '70%' }}>
                  <div className="absolute inset-0 overflow-hidden bg-white" style={{ pointerEvents: 'none' }}>
                    <iframe src={`${cs.pdfUrl}#toolbar=0&navpanes=0&scrollbar=0`} style={{ width: '200%', height: '200%', transform: 'scale(0.5)', transformOrigin: 'top left', border: 'none', pointerEvents: 'none' }} title={cs.title} />
                  </div>
                </div>
              </div>

              <AnimatePresence>
                {hovering && (
                  <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.15 }} className="absolute inset-0 pointer-events-none" style={{ zIndex: 20, background: 'rgba(0,0,0,0.35)' }}>
                    <div ref={hoverBtnRef} className="absolute pointer-events-auto" style={{ zIndex: 21, left: cursorPosRef.current.x, top: cursorPosRef.current.y, transform: 'translate(-50%, -50%)' }}>
                      <span className="flex items-center gap-2.5 px-5 py-2.5 rounded-full text-white font-semibold text-sm tracking-wide whitespace-nowrap" style={{ background: 'rgba(255,255,255,0.12)', border: '1px solid rgba(255,255,255,0.35)', backdropFilter: 'blur(8px)', boxShadow: '0 4px 24px rgba(0,0,0,0.4)' }}>
                        View Report →
                      </span>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          </AnimatePresence>
        </div>

        <div className="w-[22%] flex-shrink-0">
          <AnimatePresence mode="wait">
            <motion.div key={activeIndex + '-right'} initial={{ opacity: 0, x: 24 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: 24 }} transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }} className="flex flex-col gap-6">
              <div className="flex flex-col items-start gap-3">
                <span className="text-white/30 text-[10px] font-bold tracking-[0.3em] uppercase">Scan for details</span>
                <div className="w-28 h-28 rounded-xl overflow-hidden border border-white/10 bg-white p-1.5">
                  <img src={cs.qrUrl} alt="QR" className="w-full h-full object-contain" />
                </div>
                <p className="text-white/30 text-xs leading-relaxed max-w-[160px]">Scan with your camera to access the full report</p>
              </div>

              <div className="h-px w-8 bg-white/10" />

              <a href={cs.pdfUrl} download className="flex items-center gap-2.5 text-white/55 hover:text-white text-sm font-medium border border-white/10 rounded-full px-4 py-2.5 hover:bg-white/5 hover:border-white/25 transition-all duration-200 w-fit">
                <Download size={13} strokeWidth={2} />
                Download PDF
              </a>

              <button onClick={() => onOpen(cs)} className="flex items-center gap-2.5 text-white/55 hover:text-white text-sm font-medium transition-colors duration-200 group">
                <span>View full report</span>
                <span className="opacity-0 group-hover:opacity-60 transition-opacity text-xs">→</span>
              </button>
            </motion.div>
          </AnimatePresence>
        </div>
      </div>

      <div className="mt-6 flex-shrink-0">
        <div className="w-full h-px bg-white/8 relative overflow-hidden">
          <motion.div className="absolute left-0 top-0 h-full" style={{ backgroundColor: cs.accentColor }} animate={{ width: `${((activeIndex + 1) / n) * 100}%` }} transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }} />
        </div>
      </div>
    </div>
  );
};
