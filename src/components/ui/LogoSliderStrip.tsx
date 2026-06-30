import React from 'react';

export const LogoSliderStrip: React.FC<{ logos: string[]; label: string }> = ({ logos, label }) => {
  const looped = [...logos, ...logos, ...logos];
  return (
    <div className="w-full border border-white/5 rounded-xl overflow-hidden bg-white/[0.01]">
      <div className="px-4 pt-4 pb-2">
        <span className="text-white/30 text-[10px] font-semibold tracking-[0.25em] uppercase">{label}</span>
      </div>
      <div className="relative py-4 overflow-hidden">
        <div className="absolute inset-y-0 left-0 w-10 bg-gradient-to-r from-[#040507] to-transparent z-10 pointer-events-none" />
        <div className="absolute inset-y-0 right-0 w-10 bg-gradient-to-l from-[#040507] to-transparent z-10 pointer-events-none" />
        <div className="logo-scroll-track flex gap-8 w-max">
          {looped.map((src, i) => (
            <div key={i} className="flex items-center justify-center h-10 w-[90px] shrink-0">
              <img
                src={src}
                alt={`Logo ${(i % logos.length) + 1}`}
                className="h-8 w-auto max-w-[80px] object-contain opacity-60 grayscale hover:opacity-100 hover:grayscale-0 transition-all duration-300"
                draggable={false}
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
