import React from 'react';
import { motion } from 'framer-motion';
import { Download, X } from 'lucide-react';
import type { CaseStudy } from '../../types';

interface CaseStudyModalProps {
  cs: CaseStudy;
  onClose: () => void;
}

export const CaseStudyModal: React.FC<CaseStudyModalProps> = ({ cs, onClose }) => (
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
            href={cs.downloadUrl}
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

      <div className="flex flex-col flex-1 min-h-0">
        <div className="flex-1 min-h-0 bg-gray-100">
          <iframe
            src={cs.pdfUrl}
            className="w-full h-full"
            style={{ border: 'none', display: 'block' }}
            title={cs.title}
          />
        </div>
        <div className="flex-shrink-0 flex items-center gap-4 px-6 py-3 border-t border-white/8 bg-[#0d0e14]">
          <div className="w-12 h-12 rounded-lg overflow-hidden border border-white/10 bg-white p-1 shrink-0">
            <img src={cs.qrUrl} alt="QR code" className="w-full h-full object-contain" />
          </div>
          <div>
            <p className="text-white/40 text-[9px] font-bold tracking-[0.3em] uppercase">Scan for more info</p>
            <p className="text-white/25 text-[9px] mt-0.5">Scan with your camera to access the full report and additional resources</p>
          </div>
        </div>
      </div>
    </motion.div>
  </motion.div>
);
