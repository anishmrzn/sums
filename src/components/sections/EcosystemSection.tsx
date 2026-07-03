import React from 'react';
import { motion } from 'framer-motion';

export const EcosystemSection: React.FC<{ ecosystemPhase: number }> = ({ ecosystemPhase }) => (
  <div
    id="ecosystem-section"
    className="relative pointer-events-none min-h-[100vh] md:min-h-[200vh]"
  >
    <div className="sticky top-0 h-screen w-full flex flex-col pointer-events-none">
      <motion.div
        className="absolute top-32 left-0 right-0 px-6 flex flex-col items-center text-center gap-3 pointer-events-none z-30"
        animate={
          ecosystemPhase >= 1
            ? { opacity: 1, y: 0, scale: 1 }
            : { opacity: 0, y: 30, scale: 0.96 }
        }
        transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
      >
        <span className="text-brand text-xs font-bold tracking-[0.3em] uppercase bg-[#040507]/90 px-3.5 py-1 rounded border border-brand/20 backdrop-blur-md">
          The Integrated Solution
        </span>

        <h2 className="font-serif text-3xl md:text-5xl lg:text-6xl font-black leading-tight text-white drop-shadow-[0_4px_16px_rgba(0,0,0,0.95)] max-w-4xl">
          Our Ecosystem Brings Everything Under One Roof
        </h2>

        <p className="text-white/80 text-sm md:text-base max-w-[620px] leading-relaxed drop-shadow-[0_2px_8px_rgba(0,0,0,0.9)] bg-[#040507]/50 px-4 py-2 rounded-lg backdrop-blur-sm">
          SUMS helps your students land jobs, build a culture of innovation, and give your team the platform and tech to truly thrive.
        </p>
      </motion.div>
    </div>
  </div>
);
