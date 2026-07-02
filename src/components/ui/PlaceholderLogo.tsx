import React from 'react';

const initials = (name: string) =>
  name
    .split(/\s+/)
    .filter(Boolean)
    .slice(0, 2)
    .map(word => word[0])
    .join('')
    .toUpperCase();

export const PlaceholderLogo: React.FC<{ name: string; className?: string }> = ({ name, className = '' }) => (
  <div
    title={name}
    className={`flex flex-col items-center justify-center gap-1 rounded-lg border border-[#FD4400]/25 bg-[#FD4400]/[0.06] px-3 ${className}`}
  >
    <span className="text-[#FD4400] text-sm font-black tracking-wide">{initials(name)}</span>
    <span className="text-white/45 text-[8px] font-semibold tracking-wide uppercase text-center leading-tight line-clamp-1 max-w-[90px]">
      {name}
    </span>
  </div>
);
