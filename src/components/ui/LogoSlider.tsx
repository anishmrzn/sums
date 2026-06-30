import React from 'react';

const LOGOS = [
  '/logos/6.png',
  '/logos/7.png',
  '/logos/8.png',
  '/logos/9.png',
  '/logos/10.png',
  '/logos/11.png',
  '/logos/12.png',
  '/logos/13.png',
  '/logos/14.png',
  '/logos/15.png',
  '/logos/16.png',
  '/logos/17.png',
  '/logos/9.png',
  '/logos/6.png',
  '/logos/11.png',
  '/logos/13.png',
  '/logos/7.png',
  '/logos/15.png',
  '/logos/10.png',
  '/logos/17.png',
  '/logos/8.png',
  '/logos/12.png',
  '/logos/14.png',
  '/logos/16.png',
  '/logos/18.png',
];

export const LogoSlider: React.FC = () => {
  const loopedLogos = [...LOGOS, ...LOGOS, ...LOGOS];

  return (
    <div className="w-full bg-[#040507] border-y border-white/5 py-5 overflow-hidden relative pointer-events-none">
      <div className="flex items-center gap-6">
        <div className="flex-shrink-0 pl-6 md:pl-10 z-20 bg-[#040507]">
          <span className="text-[10px] font-semibold tracking-[0.2em] text-white/35 uppercase whitespace-nowrap">
            TRUSTED BY INDUSTRIES & ACADEMIA
          </span>
        </div>

        <div className="relative flex-grow overflow-hidden select-none">
          <div className="absolute inset-y-0 left-0 w-12 bg-gradient-to-r from-[#040507] to-transparent z-10 pointer-events-none" />
          <div className="absolute inset-y-0 right-0 w-12 bg-gradient-to-l from-[#040507] to-transparent z-10 pointer-events-none" />

          <div className="logo-scroll-track flex gap-10 w-max py-2">
            {loopedLogos.map((logo, i) => (
              <div
                key={i}
                className="flex items-center justify-center h-12 min-w-[100px] pointer-events-none"
              >
                <img
                  src={logo}
                  alt={`Partner logo ${(i % LOGOS.length) + 1}`}
                  className="h-[48px] w-auto max-w-[120px] object-contain opacity-100"
                  draggable={false}
                />
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
