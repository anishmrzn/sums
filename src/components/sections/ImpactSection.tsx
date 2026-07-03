import React from 'react';
import { NATIONAL_PARTNER_LOGOS, INTERNATIONAL_PARTNER_LOGOS } from '../../data/logos';
import { PlaceholderLogo } from '../ui/PlaceholderLogo';

export const ImpactSection: React.FC<{ headingRef?: React.RefObject<HTMLHeadingElement | null> }> = ({ headingRef }) => (
  <div id="about" className="max-w-6xl mx-auto px-6 py-20">
    <div className="text-center mb-16">
      <h2
        ref={headingRef}
        className="font-sans font-black text-5xl md:text-6xl lg:text-8xl xl:text-9xl tracking-tight text-white leading-none"
      >
        OUR <span className="text-brand">IMPACT</span>
      </h2>
    </div>

    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-16">
      {[
        { number: '1,500+', label: 'Students' },
        { number: '15+',    label: 'Institutions' },
        { number: '10',     label: 'Countries' },
      ].map((stat) => (
        <div key={stat.label} className="text-center p-5 md:p-6 lg:p-8 rounded-2xl border border-white/5 bg-white/[0.02] backdrop-blur-sm">
          <div className="text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-black text-brand mb-2">{stat.number}</div>
          <div className="text-white/60 text-base font-semibold tracking-widest uppercase">{stat.label}</div>
        </div>
      ))}
    </div>

    <div className="border-t border-white/5 pt-10 mb-10">
      <p className="text-center text-white/50 text-lg md:text-xl font-black tracking-[0.15em] uppercase mb-8">Countries We've Reached</p>
      <div className="flex flex-wrap items-center justify-center gap-x-8 gap-y-7">
        {[
          { img: '/pictures/countries/Nepal.jpg',            name: 'Nepal' },
          { img: '/pictures/countries/India.svg.png',        name: 'India' },
          { img: '/pictures/countries/Bhutan.svg.png',       name: 'Bhutan' },
          { img: '/pictures/countries/Finland.svg',          name: 'Finland' },
          { img: '/pictures/countries/Sweden.svg.png',       name: 'Sweden' },
          { img: '/pictures/countries/Netherlands.svg.png',  name: 'Netherlands' },
          { img: '/pictures/countries/France.svg.webp',      name: 'France' },
          { img: '/pictures/countries/Portugal.svg.webp',    name: 'Portugal' },
          { img: '/pictures/countries/United_Kingdom.svg.webp', name: 'UK' },
          { img: '/pictures/countries/Lithuania.svg.png',    name: 'Lithuania' },
        ].map(({ img, name }) => (
          <div key={name} className="flex flex-col items-center gap-2 group">
            <div className="w-14 h-10 rounded-md overflow-hidden border border-white/10 group-hover:border-brand/40 transition-colors duration-200 shadow-md">
              <img src={img} alt={name} className="w-full h-full object-cover" />
            </div>
            <span className="text-white/40 text-[9px] font-semibold tracking-widest uppercase group-hover:text-white/70 transition-colors duration-200">{name}</span>
          </div>
        ))}
      </div>
    </div>

    <div className="border-t border-white/5 pt-10 grid grid-cols-1 md:grid-cols-2 gap-10 md:gap-0 md:divide-x md:divide-white/5">
      <div className="flex flex-col items-center gap-6 md:pr-10">
        <p className="text-white/50 text-lg md:text-xl font-black tracking-[0.15em] uppercase">National Partners</p>
        <div className="flex flex-wrap items-center justify-center gap-x-6 gap-y-4">
          {NATIONAL_PARTNER_LOGOS.map((item, i) =>
            item.src ? (
              <img key={i} src={item.src} alt={item.name} title={item.name} className="h-9 w-auto max-w-[90px] object-contain opacity-80 hover:opacity-100 transition-opacity duration-200" />
            ) : (
              <PlaceholderLogo key={i} name={item.name} className="h-9 py-1 w-[90px]" />
            )
          )}
        </div>
      </div>

      <div className="flex flex-col items-center gap-6 md:pl-10">
        <p className="text-white/50 text-lg md:text-xl font-black tracking-[0.15em] uppercase">International Partners</p>
        <div className="flex flex-wrap items-center justify-center gap-x-8 gap-y-4">
          {INTERNATIONAL_PARTNER_LOGOS.map((item, i) =>
            item.src ? (
              <img key={i} src={item.src} alt={item.name} title={item.name} className="h-9 w-auto max-w-[100px] object-contain opacity-80 hover:opacity-100 transition-opacity duration-200" />
            ) : (
              <PlaceholderLogo key={i} name={item.name} className="h-9 py-1 w-[100px]" />
            )
          )}
        </div>
      </div>
    </div>
  </div>
);
