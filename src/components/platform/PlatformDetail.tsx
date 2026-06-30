import React, { useEffect, useRef, useState } from 'react';
import { PLATFORM_SECTIONS, PLATFORM_LOGOS } from '../../data/platforms';
import { AicSections } from './AicSections';
import { SipSections } from './SipSections';
import { CogknitSections } from './CogknitSections';

interface PlatformDetailProps {
  platformId: string;
  detailScrollY?: number;
}

export const PlatformDetail: React.FC<PlatformDetailProps> = ({ platformId, detailScrollY = 0 }) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [isMobile, setIsMobile] = useState<boolean>(
    () => typeof window !== 'undefined' && window.innerWidth < 1024
  );

  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth < 1024);
    window.addEventListener('resize', check);
    return () => window.removeEventListener('resize', check);
  }, []);

  const sectionLayout = PLATFORM_SECTIONS[platformId] ?? PLATFORM_SECTIONS.cogknit;
  const sections = sectionLayout.map(({ id, label }) => ({ id, label }));
  const logoPath = PLATFORM_LOGOS[platformId] ?? '/cogknitlogo.png';

  const platformTitle =
    platformId === 'aic' ? 'AIC' :
    platformId === 'sip' ? 'SIP' :
    'Cogknit';

  const [validActiveSection, setValidActiveSection] = useState<string>(sections[0]?.id ?? 'overview');

  useEffect(() => {
    setValidActiveSection(sections[0]?.id ?? 'overview');
  }, [platformId]); // eslint-disable-line react-hooks/exhaustive-deps

  useEffect(() => {
    const threshold = window.innerHeight * 0.4;
    const ids = sectionLayout.map(s => s.id);
    let current = ids[0];
    for (const id of ids) {
      const el = document.getElementById(id);
      if (!el) continue;
      if (el.getBoundingClientRect().top <= threshold) current = id;
    }
    setValidActiveSection(current);
  }, [detailScrollY, platformId, sectionLayout]);

  const scrollToSection = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };

  const renderSections = () => {
    if (platformId === 'aic') return <AicSections />;
    if (platformId === 'sip') return <SipSections />;
    return <CogknitSections />;
  };

  const layoutProgress = Math.min(1.0, detailScrollY / 300);
  const leftOffsetVal = `calc(50vw - ${layoutProgress * 27.5}vw)`;

  if (isMobile) {
    return (
      <div className="relative w-full text-white">
        <div className="flex items-center gap-4 px-5 pt-6 pb-4 border-b border-white/5">
          <div className="w-12 h-12 rounded-full border border-[#FD4400]/30 bg-[#FD4400]/5 flex items-center justify-center shrink-0">
            <img src={logoPath} alt={platformTitle} className="w-8 h-8 object-contain" style={{ filter: 'drop-shadow(0 0 6px rgba(253,68,0,0.5))' }} />
          </div>
          <h2 className="text-white font-black text-lg tracking-tight">{platformTitle}</h2>
        </div>

        <nav
          className="sticky top-[65px] z-30 bg-[#040507]/97 backdrop-blur-md border-b border-white/5 flex gap-2 px-4 py-3 overflow-x-auto"
          style={{ scrollbarWidth: 'none', WebkitOverflowScrolling: 'touch' }}
        >
          {sections.map(sec => {
            const isActive = validActiveSection === sec.id;
            return (
              <button
                key={sec.id}
                onClick={() => scrollToSection(sec.id)}
                className={`relative shrink-0 px-4 py-2.5 rounded-full text-[11px] font-semibold uppercase tracking-wider transition-all duration-300 cursor-pointer min-h-[40px] ${
                  isActive
                    ? 'bg-[#FD4400] text-white shadow-[0_0_12px_rgba(253,68,0,0.4)]'
                    : 'bg-white/[0.04] text-white/50 border border-white/10 active:text-white active:bg-white/[0.08]'
                }`}
              >
                {isActive && (
                  <span className="absolute inset-0 rounded-full bg-[#FD4400]/30 animate-ping pointer-events-none" style={{ animationDuration: '2s' }} />
                )}
                {sec.label}
              </button>
            );
          })}
        </nav>

        <div className="px-5 pt-8 pb-32 space-y-14">
          {renderSections()}
        </div>
      </div>
    );
  }

  return (
    <div ref={containerRef} className="relative w-full text-white">
      <div
        style={{ left: leftOffsetVal }}
        className="sticky top-0 h-screen w-0 flex items-center justify-center pointer-events-none z-20 transition-all duration-75 ease-out"
      >
        <div
          className="absolute w-28 h-28 md:w-32 md:h-32 rounded-full border border-[#FD4400]/20 bg-[#040507]/90 flex items-center justify-center z-10"
          style={{ boxShadow: '0 0 32px rgba(253,68,0,0.12), inset 0 0 20px rgba(253,68,0,0.05)' }}
        >
          <img src={logoPath} alt={platformTitle} className="w-20 h-20 md:w-24 md:h-24 object-contain" style={{ filter: 'drop-shadow(0 0 10px rgba(253,68,0,0.6))' }} />
        </div>

        <svg
          className="absolute w-[300px] h-[300px] md:w-[380px] md:h-[380px]"
          viewBox="-190 -190 380 380"
          style={{ pointerEvents: 'none', overflow: 'visible' }}
        >
          {sectionLayout.map(sec => {
            const isActive = validActiveSection === sec.id;
            const rad = (sec.angle * Math.PI) / 180;
            const r = 175;
            const dotX = r * Math.cos(rad);
            const dotY = r * Math.sin(rad);
            const ux = Math.cos(rad);
            const uy = Math.sin(rad);
            const centerEdge = 66;
            const dotR = 4;
            const x1 = ux * centerEdge, y1 = uy * centerEdge;
            const x2 = dotX - ux * (dotR + 2), y2 = dotY - uy * (dotR + 2);
            const labelR = r + 18;
            const lx = Math.cos(rad) * labelR, ly = Math.sin(rad) * labelR;
            const ta = sec.angle >= 315 || sec.angle <= 45 ? 'start' : sec.angle > 135 && sec.angle < 225 ? 'end' : 'middle';
            const db = sec.angle > 225 && sec.angle < 315 ? 'auto' : sec.angle > 45 && sec.angle < 135 ? 'hanging' : 'central';
            const glow = 'drop-shadow(0 0 4px #FE6D00) drop-shadow(0 0 8px rgba(254,109,0,0.6))';

            return (
              <g key={sec.id} onClick={() => scrollToSection(sec.id)} style={{ cursor: 'pointer', pointerEvents: 'all' }}>
                <line x1={x1} y1={y1} x2={x2} y2={y2} stroke={isActive ? '#FE6D00' : 'rgba(255,255,255,0.12)'} strokeWidth={isActive ? 2 : 1} style={{ transition: 'stroke 0.5s ease, stroke-width 0.5s ease, filter 0.5s ease', filter: isActive ? glow : 'none' }} />
                <circle cx={dotX} cy={dotY} r={dotR} fill={isActive ? '#FE6D00' : 'rgba(255,120,0,0.45)'} style={{ transition: 'fill 0.5s ease, filter 0.5s ease', filter: isActive ? glow : 'none' }} />
                <text x={lx} y={ly} textAnchor={ta} dominantBaseline={db} fontSize="9.5" fontFamily="'Space Grotesk', sans-serif" fontWeight="600" fill={isActive ? '#FE6D00' : 'rgba(255,255,255,0.35)'} style={{ letterSpacing: '0.14em', textTransform: 'uppercase', transition: 'fill 0.5s ease' }}>
                  {sec.label}
                </text>
                <circle cx={dotX} cy={dotY} r={24} fill="transparent" style={{ pointerEvents: 'all' }} />
              </g>
            );
          })}
        </svg>
      </div>

      <div className="relative w-full z-10 -mt-[100vh] flex justify-end">
        <div className="w-[45vw] shrink-0 pointer-events-none" />
        <div
          style={{
            backgroundColor: `rgba(4, 5, 7, ${layoutProgress * 0.88})`,
            backdropFilter: `blur(${layoutProgress * 12}px)`,
            WebkitBackdropFilter: `blur(${layoutProgress * 12}px)`,
            borderColor: `rgba(255, 255, 255, ${layoutProgress * 0.04})`,
          }}
          className="w-[55vw] min-h-screen border-l shrink-0 transition-all duration-75 ease-out"
        >
          <div className="h-[90vh] pointer-events-none" />
          <div className="pb-32 px-8 md:px-12 space-y-28 pt-20">
            {renderSections()}
          </div>
        </div>
      </div>
    </div>
  );
};
