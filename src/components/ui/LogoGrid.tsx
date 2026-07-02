import React from 'react';
import type { LogoEntry } from '../../types';
import { PlaceholderLogo } from './PlaceholderLogo';

export const LogoGrid: React.FC<{ logos: LogoEntry[]; label: string }> = ({ logos, label }) => (
  <div className="w-full border border-white/5 rounded-xl overflow-hidden bg-white/[0.01]">
    <div className="px-4 pt-4 pb-2">
      <span className="text-white/30 text-[10px] font-semibold tracking-[0.25em] uppercase">{label}</span>
    </div>
    <div className="flex flex-wrap items-center justify-center gap-x-8 gap-y-6 p-6">
      {logos.map((item, i) =>
        item.src ? (
          <div key={i} className="flex items-center justify-center h-14 w-[110px] shrink-0">
            <img
              src={item.src}
              alt={item.name}
              title={item.name}
              className="h-12 w-auto max-w-[110px] object-contain opacity-95 hover:opacity-100 hover:scale-105 transition-all duration-300"
              draggable={false}
            />
          </div>
        ) : (
          <PlaceholderLogo key={i} name={item.name} className="h-14 w-[110px] shrink-0 py-2" />
        )
      )}
    </div>
  </div>
);
