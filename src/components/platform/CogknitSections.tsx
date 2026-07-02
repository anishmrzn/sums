import React from 'react';
import { motion } from 'framer-motion';
import { FADE_UP } from '../../utils/animations';
import { PlatformContactForm } from '../ui/PlatformContactForm';

const FEATURES = [
  { title: 'Intelligent Knowledge Management', desc: 'Centralize institutional resources in a highly structured knowledge repository accessible from anywhere.' },
  { title: 'Adaptive Learning Pathways',       desc: 'Custom curricula that adapt dynamically based on learner pace, progress, and performance metrics.' },
  { title: 'Offline-First Capabilities',       desc: 'Optimized for high-performance usage across varying network conditions across Nepal.' },
  { title: 'Advanced Institutional Analytics', desc: 'Empower leaders with deep reports on learner outcomes, teaching indices, and institutional benchmarks.' },
];

const SOLUTIONS = [
  { name: 'Higher Education Suite',          audience: 'Universities & colleges seeking to digitize syllabi, class interactions, and outcome tracking.' },
  { name: 'Technical & Vocational Training', audience: 'Specialized skills development through step-by-step progress tracking and competency mapping.' },
];

export const CogknitSections: React.FC = () => (
  <>
    <motion.section id="overview" className="scroll-mt-24" {...FADE_UP}>
      <span className="text-[#FD4400] text-[10px] font-semibold tracking-[0.25em] uppercase block mb-3">01 / Overview</span>
      <h1 className="font-serif text-2xl md:text-4xl font-medium text-white leading-tight mb-4">
        Empowering institutions with next-generation smart learning frameworks.
      </h1>
      <p className="text-white/60 text-sm md:text-base leading-relaxed">
        Cogknit is a high-fidelity learning management ecosystem customized for Nepali academic institutions, vocational centers, and corporate training structures. It structures complex learning pathways, tracks progress, and ensures educational outcomes meet modern benchmarks.
      </p>
    </motion.section>

    <motion.section id="features" className="scroll-mt-24 border-t border-white/5 pt-12" {...FADE_UP}>
      <span className="text-[#FD4400] text-[10px] font-semibold tracking-[0.25em] uppercase block mb-3">02 / Features</span>
      <h2 className="font-serif text-xl md:text-3xl font-medium text-white mb-8">Key Capabilities</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
        {FEATURES.map((feat, idx) => (
          <div key={idx} className="border-l border-[#FD4400]/30 pl-4 hover:border-[#FD4400] transition-colors duration-300">
            <h3 className="font-semibold text-white text-sm mb-1">{feat.title}</h3>
            <p className="text-white/50 text-sm">{feat.desc}</p>
          </div>
        ))}
      </div>
    </motion.section>

    <motion.section id="solutions" className="scroll-mt-24 border-t border-white/5 pt-12" {...FADE_UP}>
      <span className="text-[#FD4400] text-[10px] font-semibold tracking-[0.25em] uppercase block mb-3">03 / Solutions</span>
      <h2 className="font-serif text-xl md:text-3xl font-medium text-white mb-8">Tailored for Every Institution</h2>
      <div className="space-y-4">
        {SOLUTIONS.map((sol, idx) => (
          <div key={idx} className="border border-white/5 p-5 rounded-xl bg-white/[0.01] hover:border-[#FD4400]/20 transition-all duration-300">
            <h3 className="text-white font-semibold text-base mb-1">{sol.name}</h3>
            <p className="text-white/50 text-sm">{sol.audience}</p>
          </div>
        ))}
      </div>
    </motion.section>

    <motion.section id="impact" className="scroll-mt-24 border-t border-white/5 pt-12" {...FADE_UP}>
      <span className="text-[#FD4400] text-[10px] font-semibold tracking-[0.25em] uppercase block mb-3">04 / Impact</span>
      <h2 className="font-serif text-xl md:text-3xl font-medium text-white mb-6">Proven Outcomes</h2>
      <p className="text-white/70 text-base md:text-lg font-serif italic leading-relaxed">
        "Empowered over 150+ institutions with 85% higher learner retention compared to traditional learning systems."
      </p>
    </motion.section>

    <PlatformContactForm title="Cogknit" />
  </>
);
