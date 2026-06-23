import React, { useEffect, useState } from 'react';
import { motion, useInView } from 'framer-motion';

export const CrisisSection: React.FC = () => {
  const containerRef = React.useRef<HTMLDivElement>(null);
  const isInView = useInView(containerRef, { once: true, amount: 0.3 });
  
  const [activeStep, setActiveStep] = useState(-1);
  const [isSpinning, setIsSpinning] = useState(false);

  useEffect(() => {
    if (isInView) {
      // Step-by-step triggers
      const delays = [300, 1300, 2300, 3300]; // sequential steps with 400ms pause after drawing
      
      delays.forEach((delay, idx) => {
        setTimeout(() => {
          setActiveStep(idx);
        }, delay);
      });

      // Start continuous spinning after all segments are drawn
      setTimeout(() => {
        setIsSpinning(true);
      }, 4300);
    }
  }, [isInView]);

  const cards = [
    {
      title: 'Skill Gap',
      desc: "Colleges aren't producing employable graduates.",
      align: 'top-left'
    },
    {
      title: 'Degree Mills',
      desc: 'Rote-learning has replaced actual innovation.',
      align: 'top-right'
    },
    {
      title: 'Price Wars',
      desc: 'Commoditized degrees trigger a race to the bottom, making premium tuition impossible to justify.',
      align: 'bottom-right'
    },
    {
      title: 'The Blindfold',
      desc: 'Zero visibility into learning quality forces leadership to make decisions on guesswork.',
      align: 'bottom-left'
    }
  ];

  return (
    <div 
      ref={containerRef}
      className="min-h-screen w-full bg-transparent flex items-center justify-center py-20 px-6 relative overflow-hidden pointer-events-auto"
    >
      <div className="max-w-6xl w-full grid grid-cols-1 lg:grid-cols-12 gap-12 items-center z-10">
        
        {/* LEFT COLUMN: Animated Cycle Wheel */}
        <div className="lg:col-span-6 flex flex-col items-center justify-center relative min-h-[400px]">
          {/* Section Title above or before wheel */}
          <motion.h2 
            initial={{ opacity: 0, y: -20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6 }}
            className="font-serif text-3xl md:text-4xl font-semibold mb-12 text-center"
          >
            Higher Education is in a <span className="text-[#FF5C00] font-bold">CRISIS</span>
          </motion.h2>

          {/* SVG Diagram Wrapper */}
          <div className="relative w-[320px] h-[320px] md:w-[360px] md:h-[360px] flex items-center justify-center">
            
            {/* Rotating container - spins after animation finishes */}
            <motion.div
              animate={isSpinning ? { rotate: 360 } : { rotate: 0 }}
              transition={
                isSpinning 
                  ? { repeat: Infinity, duration: 12, ease: 'linear' }
                  : { duration: 0 }
              }
              className="w-full h-full relative"
            >
              <svg 
                viewBox="0 0 400 400" 
                className="w-full h-full transform -rotate-45"
              >
                <defs>
                  {/* Arrowhead definition */}
                  <marker 
                    id="arrow-orange" 
                    viewBox="0 0 10 10" 
                    refX="5" 
                    refY="5" 
                    markerWidth="6" 
                    markerHeight="6" 
                    orient="auto"
                  >
                    <path d="M 0 2 L 8 5 L 0 8 z" fill="#FF5C00" />
                  </marker>
                  <marker 
                    id="arrow-dark-orange" 
                    viewBox="0 0 10 10" 
                    refX="5" 
                    refY="5" 
                    markerWidth="6" 
                    markerHeight="6" 
                    orient="auto"
                  >
                    <path d="M 0 2 L 8 5 L 0 8 z" fill="#CC3D00" />
                  </marker>
                </defs>

                {/* Segment 1: Top-Left (Skill Gap) - from 180 to 270 deg */}
                <motion.path
                  d="M 90,200 A 110,110 0 0,1 190,92"
                  fill="none"
                  stroke="#FF5C00"
                  strokeWidth="12"
                  strokeLinecap="round"
                  markerEnd="url(#arrow-orange)"
                  initial={{ pathLength: 0 }}
                  animate={activeStep >= 0 ? { pathLength: 1 } : {}}
                  transition={{ duration: 0.6, ease: 'easeInOut' }}
                />

                {/* Segment 2: Top-Right (Degree Mills) - from 270 to 360 deg */}
                <motion.path
                  d="M 200,90 A 110,110 0 0,1 308,190"
                  fill="none"
                  stroke="#CC3D00"
                  strokeWidth="12"
                  strokeLinecap="round"
                  markerEnd="url(#arrow-dark-orange)"
                  initial={{ pathLength: 0 }}
                  animate={activeStep >= 1 ? { pathLength: 1 } : {}}
                  transition={{ duration: 0.6, ease: 'easeInOut' }}
                />

                {/* Segment 3: Bottom-Right (Price Wars) - from 0 to 90 deg */}
                <motion.path
                  d="M 310,200 A 110,110 0 0,1 210,308"
                  fill="none"
                  stroke="#FF5C00"
                  strokeWidth="12"
                  strokeLinecap="round"
                  markerEnd="url(#arrow-orange)"
                  initial={{ pathLength: 0 }}
                  animate={activeStep >= 2 ? { pathLength: 1 } : {}}
                  transition={{ duration: 0.6, ease: 'easeInOut' }}
                />

                {/* Segment 4: Bottom-Left (The Blindfold) - from 90 to 180 deg */}
                <motion.path
                  d="M 200,310 A 110,110 0 0,1 92,210"
                  fill="none"
                  stroke="#CC3D00"
                  strokeWidth="12"
                  strokeLinecap="round"
                  markerEnd="url(#arrow-dark-orange)"
                  initial={{ pathLength: 0 }}
                  animate={activeStep >= 3 ? { pathLength: 1 } : {}}
                  transition={{ duration: 0.6, ease: 'easeInOut' }}
                />
              </svg>

              {/* Labels overlay inside the spinning wheel */}
              {/* Note: Labels rotate in opposite direction to stay upright, or spin with the wheel. 
                  The prompt says: '4 segments labeled: Skill Gap (top-left), Degree Mills (top-right)...' */}
              <div className="absolute inset-0 pointer-events-none flex items-center justify-center">
                {/* Skill Gap Label */}
                <motion.div 
                  className={`absolute transition-opacity duration-500 top-[18%] left-[10%] text-center ${activeStep >= 0 ? 'opacity-100' : 'opacity-0'}`}
                  animate={isSpinning ? { rotate: -360 } : { rotate: 0 }}
                  transition={
                    isSpinning 
                      ? { repeat: Infinity, duration: 12, ease: 'linear' }
                      : { duration: 0 }
                  }
                >
                  <span className="text-[10px] md:text-xs font-semibold tracking-wider bg-[#040507] px-2 py-1 border border-white/5 rounded text-[#FF5C00]">
                    SKILL GAP
                  </span>
                </motion.div>
                {/* Degree Mills Label */}
                <motion.div 
                  className={`absolute transition-opacity duration-500 top-[18%] right-[10%] text-center ${activeStep >= 1 ? 'opacity-100' : 'opacity-0'}`}
                  animate={isSpinning ? { rotate: -360 } : { rotate: 0 }}
                  transition={
                    isSpinning 
                      ? { repeat: Infinity, duration: 12, ease: 'linear' }
                      : { duration: 0 }
                  }
                >
                  <span className="text-[10px] md:text-xs font-semibold tracking-wider bg-[#040507] px-2 py-1 border border-white/5 rounded text-[#CC3D00]">
                    DEGREE MILLS
                  </span>
                </motion.div>
                {/* Price Wars Label */}
                <motion.div 
                  className={`absolute transition-opacity duration-500 bottom-[18%] right-[10%] text-center ${activeStep >= 2 ? 'opacity-100' : 'opacity-0'}`}
                  animate={isSpinning ? { rotate: -360 } : { rotate: 0 }}
                  transition={
                    isSpinning 
                      ? { repeat: Infinity, duration: 12, ease: 'linear' }
                      : { duration: 0 }
                  }
                >
                  <span className="text-[10px] md:text-xs font-semibold tracking-wider bg-[#040507] px-2 py-1 border border-white/5 rounded text-[#FF5C00]">
                    PRICE WARS
                  </span>
                </motion.div>
                {/* The Blindfold Label */}
                <motion.div 
                  className={`absolute transition-opacity duration-500 bottom-[18%] left-[10%] text-center ${activeStep >= 3 ? 'opacity-100' : 'opacity-0'}`}
                  animate={isSpinning ? { rotate: -360 } : { rotate: 0 }}
                  transition={
                    isSpinning 
                      ? { repeat: Infinity, duration: 12, ease: 'linear' }
                      : { duration: 0 }
                  }
                >
                  <span className="text-[10px] md:text-xs font-semibold tracking-wider bg-[#040507] px-2 py-1 border border-white/5 rounded text-[#CC3D00]">
                    THE BLINDFOLD
                  </span>
                </motion.div>
              </div>
            </motion.div>

            {/* Central Core Circle (moved outside the rotating div so it's always upright and static) */}
            <div className="absolute inset-0 m-auto w-16 h-16 bg-[#040507] border-2 border-white/5 rounded-full flex items-center justify-center shadow-lg pointer-events-none z-20">
              <span className="text-[11px] font-bold text-white/30 tracking-widest">SUMS</span>
            </div>
          </div>
        </div>

        {/* RIGHT COLUMN: Problem Cards */}
        <div className="lg:col-span-6 flex flex-col space-y-6 justify-center">
          {cards.map((card, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, x: 60 }}
              animate={activeStep >= idx ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
              className={`p-6 rounded-xl border border-white/5 bg-white/[0.01] flex items-start gap-4 relative overflow-hidden transition-all duration-300 ${
                activeStep === idx ? 'border-[#FF5C00]/30 bg-white/[0.02]' : ''
              }`}
            >
              {/* Highlight gradient */}
              <div className={`absolute inset-0 bg-gradient-to-r from-[#FF5C00]/0 to-[#FF5C00]/5 transition-opacity duration-300 ${activeStep === idx ? 'opacity-100' : 'opacity-0'}`} />

              {/* Bullet Point */}
              <span className="text-xl leading-none text-[#FF5C00] select-none pt-0.5">■</span>

              {/* Card content */}
              <div>
                <h4 className="text-lg font-semibold text-white tracking-wide">
                  {card.title}
                </h4>
                <p className="text-white/60 text-sm mt-1.5 leading-relaxed">
                  {card.desc}
                </p>
              </div>
            </motion.div>
          ))}
        </div>

      </div>
    </div>
  );
};
