import React from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import { LogoSlider } from '../ui/LogoSlider';

const HEADLINE_LINE_1 = "Students Are Graduating.";
const HEADLINE_LINE_2 = "Nobody's Ready.";

export const HeroSection: React.FC = () => {
  const shouldReduceMotion = useReducedMotion();

  return (
    <div className="w-full min-h-screen flex flex-col justify-between pt-28 md:pt-36 px-6 relative">
      <div className="flex-grow flex flex-col items-center justify-center text-center max-w-7xl mx-auto w-full pointer-events-auto">
        <motion.span
          initial={{ opacity: 0, y: shouldReduceMotion ? 0 : -15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: 'easeOut' }}
          className="text-[#FF5C00] text-[13px] font-extrabold tracking-[0.35em] uppercase mb-8"
        >
          THE PROBLEM WITH EDUCATION
        </motion.span>

        <h1 className="font-[700] tracking-tight leading-[1.15] flex flex-col items-center w-full">
          <motion.span
            className="text-white text-5xl sm:text-6xl md:text-7xl lg:text-8xl xl:text-9xl block w-full pb-2"
            initial="hidden"
            animate="visible"
            variants={{
              hidden: {},
              visible: { transition: { staggerChildren: 0.1 } },
            }}
          >
            {HEADLINE_LINE_1.split(' ').map((word, idx) => (
              <motion.span
                key={idx}
                className="inline-block mr-4 md:mr-6"
                variants={{
                  hidden: { opacity: 0, y: shouldReduceMotion ? 0 : 50 },
                  visible: { opacity: 1, y: 0 },
                }}
                transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
              >
                {word}
              </motion.span>
            ))}
          </motion.span>

          <motion.span
            className="text-[#FF5C00] text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl block mt-3 w-full pb-2"
            initial="hidden"
            animate="visible"
            variants={{
              hidden: {},
              visible: { transition: { staggerChildren: 0.1, delayChildren: 0.35 } },
            }}
          >
            {HEADLINE_LINE_2.split(' ').map((word, idx) => (
              <motion.span
                key={idx}
                className="inline-block mr-4 md:mr-6"
                variants={{
                  hidden: { opacity: 0, y: shouldReduceMotion ? 0 : 50 },
                  visible: { opacity: 1, y: 0 },
                }}
                transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
              >
                {word}
              </motion.span>
            ))}
          </motion.span>
        </h1>

        <motion.p
          initial={{ opacity: 0, y: shouldReduceMotion ? 0 : 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.9, duration: 0.7, ease: 'easeOut' }}
          className="text-white/60 text-base md:text-xl mt-10 max-w-3xl leading-relaxed"
        >
          Colleges are great at handing out degrees, but bad at building actual professionals. What's being taught isn't matching up with what's actually required to do the job.
        </motion.p>
      </div>

      <div className="w-full mt-12 pb-6">
        <LogoSlider />
      </div>
    </div>
  );
};
