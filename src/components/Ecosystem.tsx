/* eslint-disable react-refresh/only-export-components */
import React, { useState } from 'react';
import { motion, useReducedMotion } from 'framer-motion';

export interface Platform {
  id: string;
  name: string;
  subtitle: string;
  tagline: string;
  description: string;
  accent: string;
  orbitRadius: number; // Radius in pixels for desktop
  orbitSpeed: number; // Duration in seconds for a full rotation
  initialAngle: number; // Initial position angle in degrees
}

export const platformsData: Platform[] = [
  {
    id: 'cogknit',
    name: 'Cogknit',
    subtitle: 'Knowledge & LMS',
    tagline: 'Pioneering intelligent institutional learning systems.',
    description: 'A knowledge-driven platform offering structured learning management systems, designed with layered, intelligent structures and network-inspired details to optimize cognitive growth and institutional capacity.',
    accent: '#FE6D00',
    orbitRadius: 130,
    orbitSpeed: 35,
    initialAngle: 45
  },
  {
    id: 'sip',
    name: 'SIP',
    subtitle: 'Strategic Integration & Partnerships',
    tagline: 'Bridging ideas, industries, and institutions.',
    description: 'An engagement ecosystem that establishes interconnected paths between industry and academia. Facilitates entrepreneurship initiatives, workshops, and multi-disciplinary local & international collaborations.',
    accent: '#FE6D00',
    orbitRadius: 195,
    orbitSpeed: 50,
    initialAngle: 135
  },
  {
    id: 'academia',
    name: 'Academia',
    subtitle: 'Research & Structured Development',
    tagline: 'Cultivating rigorous intellectual frameworks.',
    description: 'A research-oriented foundation supporting structured academic programs and institutional empowerment. Visualized through concentric, balanced layers representing rigor and structured development.',
    accent: '#FE6D00',
    orbitRadius: 260,
    orbitSpeed: 65,
    initialAngle: 225
  },
  {
    id: 'aic',
    name: 'AIC',
    subtitle: 'Accelerated Innovation Center',
    tagline: 'Igniting entrepreneurship and new initiatives.',
    description: 'A dynamic innovation laboratory fostering experimental energy and rapid prototyping. Empowering startups, skill workshops, and employment pathways through fluid, adaptive forms of development.',
    accent: '#FE6D00',
    orbitRadius: 325,
    orbitSpeed: 80,
    initialAngle: 315
  }
];

interface EcosystemProps {
  onSelectPlatform: (platformId: string) => void;
  isZoomed: boolean;
}

export const Ecosystem: React.FC<EcosystemProps> = ({ onSelectPlatform, isZoomed }) => {
  const [hoveredNode, setHoveredNode] = useState<string | null>(null);
  const [pausedPlatform, setPausedPlatform] = useState<string | null>(null);
  const shouldReduceMotion = useReducedMotion();

  // High-end vector SVG logo representation for each platform
  const renderLogo = (id: string) => {
    switch (id) {
      case 'cogknit':
        return (
          <svg className="w-10 h-10 md:w-12 md:h-12" viewBox="0 0 40 40" fill="none">
            <circle cx="20" cy="20" r="18" stroke="rgb(var(--color-brand-rgb) / 0.2)" strokeWidth="1" />
            <path d="M12 20C12 15.58 15.58 12 20 12C24.42 12 28 15.58 28 20" stroke="var(--color-brand)" strokeWidth="1.5" strokeLinecap="round" />
            <circle cx="20" cy="12" r="2" fill="var(--color-brand)" />
            <circle cx="28" cy="20" r="2" fill="var(--color-brand)" />
            <path d="M16 24C16 21.79 17.79 20 20 20C22.21 20 24 21.79 24 24" stroke="var(--color-brand)" strokeWidth="1" strokeLinecap="round" />
            <circle cx="20" cy="20" r="3" fill="var(--color-brand)" />
          </svg>
        );
      case 'sip':
        return (
          <svg className="w-10 h-10 md:w-12 md:h-12" viewBox="0 0 40 40" fill="none">
            <circle cx="20" cy="20" r="18" stroke="rgb(var(--color-brand-rgb) / 0.2)" strokeWidth="1" />
            <path d="M14 20C14 16.68 16.68 14 20 14C23.32 14 26 16.68 26 20C26 23.32 23.32 26 20 26" stroke="var(--color-brand)" strokeWidth="1.5" strokeDasharray="3 3" />
            <path d="M20 10V30" stroke="var(--color-brand)" strokeWidth="1" />
            <path d="M10 20H30" stroke="var(--color-brand)" strokeWidth="1" />
            <circle cx="20" cy="20" r="4" fill="var(--color-brand)" />
          </svg>
        );
      case 'academia':
        return (
          <svg className="w-10 h-10 md:w-12 md:h-12" viewBox="0 0 40 40" fill="none">
            <circle cx="20" cy="20" r="18" stroke="rgb(var(--color-brand-rgb) / 0.2)" strokeWidth="1" />
            <rect x="14" y="14" width="12" height="12" rx="1" stroke="var(--color-brand)" strokeWidth="1.5" />
            <line x1="20" y1="8" x2="20" y2="32" stroke="var(--color-brand)" strokeWidth="1" />
            <line x1="8" y1="20" x2="32" y2="20" stroke="var(--color-brand)" strokeWidth="1" />
            <circle cx="20" cy="20" r="2.5" fill="var(--color-brand)" />
          </svg>
        );
      case 'aic':
      default:
        return (
          <svg className="w-10 h-10 md:w-12 md:h-12" viewBox="0 0 40 40" fill="none">
            <circle cx="20" cy="20" r="18" stroke="rgb(var(--color-brand-rgb) / 0.2)" strokeWidth="1" />
            <path d="M20 11L28 27H12L20 11Z" stroke="var(--color-brand)" strokeWidth="1.5" strokeLinejoin="round" />
            <circle cx="20" cy="20" r="4" stroke="var(--color-brand)" strokeWidth="1" />
            <circle cx="20" cy="20" r="1.5" fill="var(--color-brand)" />
          </svg>
        );
    }
  };

  return (
    <div 
      className="relative w-full aspect-square max-w-[760px] mx-auto flex items-center justify-center gpu-accelerated select-none"
    >
      {/* SUMS Central Core (The Center of Gravity) */}
      <div className="relative z-10 w-28 h-28 md:w-36 md:h-36 rounded-full flex items-center justify-center bg-bg-dark border-2 border-brand/50 shadow-[0_0_40px_rgb(var(--color-brand-rgb)_/_0.25)]">
        {/* Core Glowing Atmosphere */}
        <div className="absolute w-[220%] h-[220%] bg-brand/5 rounded-full filter blur-3xl animate-pulse-glow" />
        
        <div className="text-center flex flex-col items-center">
          <div className="w-12 h-12 rounded-full border border-brand/40 flex items-center justify-center mb-1">
            <span className="text-white font-serif text-lg font-bold tracking-widest">S</span>
          </div>
          <span className="text-[9px] text-white/60 tracking-[0.2em] font-medium font-sans uppercase">
            SUMS CORE
          </span>
        </div>
      </div>

      {/* Actual Orbiting Systems */}
      {platformsData.map((platform) => {
        const isHovered = hoveredNode === platform.id;
        const isPaused = pausedPlatform === platform.id;

        // Custom style for the continuous orbit rotation
        const orbitAnimationClass = `animate-orbit`;
        
        return (
          <React.Fragment key={platform.id}>
            {/* Dynamic Orbit Line */}
            <div 
              className="absolute rounded-full border border-white/[0.04] pointer-events-none transition-all duration-300"
              style={{
                width: `${platform.orbitRadius * 2}px`,
                height: `${platform.orbitRadius * 2}px`,
                borderColor: isHovered ? 'rgb(var(--color-brand-rgb) / 0.15)' : 'rgba(255, 255, 255, 0.04)',
                borderStyle: isHovered ? 'solid' : 'dashed',
              }}
            />

            {/* Orbit Container that rotates */}
            <div
              className="absolute inset-0 flex items-center justify-center pointer-events-none"
              style={{
                animation: `${orbitAnimationClass} ${platform.orbitSpeed}s linear infinite`,
                animationPlayState: (isPaused || shouldReduceMotion) ? 'paused' : 'running',
              }}
            >
              {/* Planetary node wrapper positioned on the orbit ring */}
              <div
                className="absolute pointer-events-auto cursor-pointer"
                style={{
                  transform: `rotate(${platform.initialAngle}deg) translateY(-${platform.orbitRadius}px) rotate(-${platform.initialAngle}deg)`,
                }}
                onMouseEnter={() => {
                  setHoveredNode(platform.id);
                  setPausedPlatform(platform.id);
                }}
                onMouseLeave={() => {
                  setHoveredNode(null);
                  setPausedPlatform(null);
                }}
                onClick={() => onSelectPlatform(platform.id)}
              >
                {/* Counter-rotating node to keep content upright */}
                <div
                  className="flex flex-col items-center"
                  style={{
                    animation: `${orbitAnimationClass} ${platform.orbitSpeed}s linear infinite reverse`,
                    animationPlayState: (isPaused || shouldReduceMotion) ? 'paused' : 'running',
                  }}
                >
                  {/* Planetary Sphere */}
                  <motion.div
                    layoutId={isZoomed ? undefined : `platform-entity-${platform.id}`}
                    className="w-16 h-16 md:w-20 md:h-20 rounded-full bg-bg-dark border border-white/10 hover:border-brand/70 flex items-center justify-center relative shadow-[0_4px_20px_rgba(0,0,0,0.5)] transition-all duration-300"
                    whileHover={{ scale: 1.15, boxShadow: `0 0 25px rgb(var(--color-brand-rgb) / 0.25)` }}
                  >
                    {/* Glowing effect inside sphere */}
                    <div 
                      className="absolute inset-0 rounded-full bg-gradient-to-tr from-brand/5 to-white/5 opacity-50 pointer-events-none" 
                    />
                    
                    {/* Logo/Icon */}
                    <div className="z-10">
                      {renderLogo(platform.id)}
                    </div>
                  </motion.div>

                  {/* Planetary Label */}
                  <div className="mt-2 text-center pointer-events-none whitespace-nowrap">
                    <span className="font-serif text-xs md:text-sm text-white/80 group-hover:text-brand font-medium tracking-wide">
                      {platform.name}
                    </span>
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ 
                        opacity: isHovered ? 0.8 : 0,
                        height: isHovered ? 'auto' : 0
                      }}
                      className="text-[9px] text-white/40 tracking-wider font-sans overflow-hidden"
                    >
                      {platform.subtitle}
                    </motion.div>
                  </div>
                </div>
              </div>
            </div>
          </React.Fragment>
        );
      })}
    </div>
  );
};
