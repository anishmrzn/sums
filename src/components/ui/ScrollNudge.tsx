import React from 'react';

export const ScrollNudge: React.FC<{ pastTour: boolean }> = ({ pastTour }) => (
  <div
    className="fixed bottom-8 right-8 z-50 flex flex-col items-center gap-2 pointer-events-auto"
    style={{
      opacity: 1,
      transform: 'translateY(0)',
      transition: 'opacity 0.5s ease, transform 0.5s ease',
    }}
  >
    <button
      onClick={
        pastTour
          ? () => window.scrollTo({ top: 0, behavior: 'smooth' })
          : () => document.getElementById('crisis-section')?.scrollIntoView({ behavior: 'smooth' })
      }
      title={pastTour ? 'Back to Top' : 'Scroll Down to see more'}
      className="group flex flex-col items-center gap-1.5 bg-[#040507]/80 backdrop-blur-md border border-white/10 hover:border-brand/50 rounded-full px-3 py-2.5 transition-all duration-300 hover:shadow-[0_0_16px_rgba(253,68,0,0.25)] cursor-pointer"
    >
      <div className="flex flex-col items-center gap-0.5">
        <div
          className="w-1.5 h-1.5 rounded-full bg-brand group-hover:shadow-[0_0_6px_rgba(253,68,0,0.8)] transition-shadow"
          style={{
            animation: pastTour
              ? 'scrollBounceUp 1.4s ease-in-out infinite'
              : 'scrollBounce 1.4s ease-in-out infinite',
          }}
        />
        <div className="w-[1px] h-5 bg-gradient-to-r from-transparent to-brand/60" />
      </div>
      <span className="text-[9px] font-semibold tracking-[0.2em] uppercase text-white/40 group-hover:text-white/70 transition-colors [writing-mode:vertical-lr]">
        {pastTour ? 'Back to Top' : 'Scroll Down'}
      </span>
    </button>
  </div>
);
