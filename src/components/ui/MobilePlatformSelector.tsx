import React from 'react';

const PLATFORMS = [
  { id: 'cogknit', name: 'Cogknit', tagline: 'Smart Learning Platform', logo: '/cogknitlogo.png' },
  { id: 'sip',     name: 'SIP',     tagline: 'Student Innovators Program', logo: '/logos/sip_logo.png' },
  { id: 'aic',     name: 'AIC',     tagline: 'Academia Industry Collaboration', logo: '/logos/aic_logo.png' },
];

export const MobilePlatformSelector: React.FC<{ onSelectPlatform: (id: string) => void }> = ({ onSelectPlatform }) => (
  <div className="lg:hidden relative z-10 pointer-events-auto bg-[#040507] px-4 pt-10 pb-6 border-t border-white/5">
    <p className="text-center text-white/40 text-[10px] font-bold tracking-[0.3em] uppercase mb-5">
      Explore Platforms
    </p>
    <div className="space-y-3">
      {PLATFORMS.map(platform => (
        <button
          key={platform.id}
          onClick={() => onSelectPlatform(platform.id)}
          className="w-full flex items-center gap-4 p-4 rounded-xl border border-white/5 bg-white/[0.02] active:bg-brand/10 active:border-brand/30 transition-all duration-150 cursor-pointer"
        >
          <div className="w-12 h-12 rounded-full border border-brand/25 bg-brand/5 flex items-center justify-center shrink-0">
            <img src={platform.logo} alt={platform.name} className="w-8 h-8 object-contain" style={{ filter: 'drop-shadow(0 0 4px rgba(253,68,0,0.5))' }} />
          </div>
          <div className="text-left flex-1">
            <h3 className="text-white font-bold text-base">{platform.name}</h3>
            <p className="text-white/40 text-xs mt-0.5">{platform.tagline}</p>
          </div>
          <span className="text-brand text-base font-light">→</span>
        </button>
      ))}
    </div>
  </div>
);
