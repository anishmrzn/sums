import React from 'react';

export const ImpactSection: React.FC<{ headingRef?: React.RefObject<HTMLHeadingElement | null> }> = ({ headingRef }) => (
  <div id="about" className="max-w-6xl mx-auto px-6 py-20">
    <div className="text-center mb-16">
      <h2
        ref={headingRef}
        className="font-sans font-black text-5xl md:text-6xl lg:text-8xl xl:text-9xl tracking-tight text-white leading-none"
      >
        OUR <span className="text-[#FF5C00]">IMPACT</span>
      </h2>
    </div>

    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-16">
      {[
        { number: '1,500+', label: 'Students' },
        { number: '15+',    label: 'Institutions' },
        { number: '7',      label: 'Countries' },
      ].map((stat) => (
        <div key={stat.label} className="text-center p-5 md:p-6 lg:p-8 rounded-2xl border border-white/5 bg-white/[0.02] backdrop-blur-sm">
          <div className="text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-black text-[#FF5C00] mb-2">{stat.number}</div>
          <div className="text-white/60 text-base font-semibold tracking-widest uppercase">{stat.label}</div>
        </div>
      ))}
    </div>

    <div className="border-t border-white/5 pt-10 mb-10">
      <p className="text-center text-white/30 text-[10px] font-bold tracking-[0.35em] uppercase mb-8">Countries We've Reached</p>
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
            <div className="w-14 h-10 rounded-md overflow-hidden border border-white/10 group-hover:border-[#FF5C00]/40 transition-colors duration-200 shadow-md">
              <img src={img} alt={name} className="w-full h-full object-cover" />
            </div>
            <span className="text-white/40 text-[9px] font-semibold tracking-widest uppercase group-hover:text-white/70 transition-colors duration-200">{name}</span>
          </div>
        ))}
      </div>
    </div>

    <div className="border-t border-white/5 pt-10 grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-0 md:divide-x md:divide-white/5">
      <div className="flex flex-col items-center gap-6 md:pr-10">
        <p className="text-white/30 text-[10px] font-bold tracking-[0.35em] uppercase">National Partners</p>
        <div className="flex flex-wrap items-center justify-center gap-x-6 gap-y-4">
          {[6, 7, 8, 9, 11, 13, 14, 15, 16, 17, 18].map(n => (
            <img key={n} src={`/logos/${n}.png`} alt="" className="h-9 w-auto max-w-[90px] object-contain opacity-50 hover:opacity-90 transition-opacity duration-200" />
          ))}
        </div>
      </div>

      <div className="flex flex-col items-center gap-6 md:pl-10">
        <p className="text-white/30 text-[10px] font-bold tracking-[0.35em] uppercase">International Partners</p>
        <div className="flex flex-wrap items-center justify-center gap-x-8 gap-y-4">
          <img src="/int'l/cogknitlogo.png"  alt="Cogknit"        className="h-9 w-auto max-w-[100px] object-contain opacity-50 hover:opacity-90 transition-opacity duration-200" />
          <img src="/int'l/10.png"           alt="Rihimaki"       className="h-9 w-auto max-w-[100px] object-contain opacity-50 hover:opacity-90 transition-opacity duration-200" />
          <img src="/int'l/12.png"           alt="Xvector"        className="h-9 w-auto max-w-[100px] object-contain opacity-50 hover:opacity-90 transition-opacity duration-200" />
          <img src="/logos/unesco.png"       alt="UNESCO"         className="h-9 w-auto max-w-[100px] object-contain opacity-50 hover:opacity-90 transition-opacity duration-200" />
          <img src="/logos/aalto.png"        alt="Aalto University" className="h-9 w-auto max-w-[100px] object-contain opacity-50 hover:opacity-90 transition-opacity duration-200" />
          <img src="/logos/lukla.png"        alt="Lukla"          className="h-9 w-auto max-w-[100px] object-contain opacity-50 hover:opacity-90 transition-opacity duration-200" />
        </div>
      </div>
    </div>
  </div>
);
