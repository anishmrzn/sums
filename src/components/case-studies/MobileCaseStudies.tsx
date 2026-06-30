import React, { useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { caseStudies } from '../../data/caseStudies';
import type { CaseStudy } from '../../types';

export const MobileCaseStudies: React.FC<{ onOpen: (cs: CaseStudy) => void }> = ({ onOpen }) => {
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
          <div
            className="w-full rounded-2xl overflow-hidden mb-5 relative cursor-pointer"
            style={{ height: 240, background: cs.gradient }}
            onClick={() => onOpen(cs)}
          >
            <div className="absolute inset-0 overflow-hidden bg-white" style={{ zIndex: 1, pointerEvents: 'none' }}>
              <iframe
                src={`${cs.pdfUrl}#toolbar=0&navpanes=0&scrollbar=0`}
                style={{ width: '200%', height: '200%', transform: 'scale(0.5)', transformOrigin: 'top left', border: 'none', pointerEvents: 'none' }}
                title={cs.title}
              />
            </div>
            <div className="absolute inset-0 pointer-events-none" style={{ zIndex: 2, background: cs.gradient, opacity: 0.2 }} />
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
