import React, { useEffect, useRef, useState } from 'react';
import { motion } from 'framer-motion';
import { Mail, Phone, MapPin } from 'lucide-react';

// Placeholder logo paths — replace src values with real logos when ready
const AIC_LOGOS = [
  '/logos/6.png', '/logos/7.png', '/logos/8.png', '/logos/9.png',
  '/logos/10.png', '/logos/11.png', '/logos/12.png', '/logos/13.png',
];
const SIP_LOGOS = [
  '/logos/14.png', '/logos/15.png', '/logos/16.png', '/logos/17.png',
  '/logos/18.png', '/logos/10.png', '/logos/11.png', '/logos/12.png',
];

const LogoSliderStrip: React.FC<{ logos: string[]; label: string }> = ({ logos, label }) => {
  const looped = [...logos, ...logos, ...logos];
  return (
    <div className="w-full border border-white/5 rounded-xl overflow-hidden bg-white/[0.01]">
      <div className="px-4 pt-4 pb-2">
        <span className="text-white/30 text-[10px] font-semibold tracking-[0.25em] uppercase">{label}</span>
      </div>
      <div className="relative py-4 overflow-hidden">
        {/* Edge fades */}
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

interface PlatformDetailProps {
  platformId: string;
  activeSection: string;
  onActiveSectionChange: (section: string) => void;
  detailScrollY?: number;
}

interface SectionDef {
  id: string;
  label: string;
  angle: number;
}

const PLATFORM_SECTIONS: Record<string, SectionDef[]> = {
  aic: [
    { id: 'overview', label: 'Overview', angle: 270 },
    { id: 'process',  label: 'Process',  angle: 342 },
    { id: 'impact',   label: 'Impact',   angle:  54 },
    { id: 'partners', label: 'Partners', angle: 126 },
    { id: 'connect',  label: 'Connect',  angle: 198 },
  ],
  sip: [
    { id: 'overview',     label: 'Overview',     angle: 270 },
    { id: 'journey',      label: 'Journey',      angle:   0 },
    { id: 'track-record', label: 'Track Record', angle:  90 },
    { id: 'connect',      label: 'Connect',      angle: 180 },
  ],
  cogknit: [
    { id: 'overview',  label: 'Overview',  angle: 270 },
    { id: 'features',  label: 'Features',  angle: 342 },
    { id: 'solutions', label: 'Solutions', angle:  54 },
    { id: 'impact',    label: 'Impact',    angle: 126 },
    { id: 'connect',   label: 'Connect',   angle: 198 },
  ],
};

const PLATFORM_LOGOS: Record<string, string> = {
  aic:     '/aiclogo.png',
  sip:     '/siplogo.png',
  cogknit: '/cogknitlogo.png',
};

const FADE_UP = {
  initial:     { opacity: 0, y: 32 },
  whileInView: { opacity: 1, y: 0 },
  viewport:    { once: true, margin: '-12%' } as const,
  transition:  { duration: 0.8, ease: [0.16, 1, 0.3, 1] as const },
};

const ContactForm: React.FC<{ title: string }> = ({ title }) => (
  <motion.section id="connect" className="scroll-mt-24 border-t border-white/5 pt-12 pb-12" {...FADE_UP}>
    <span className="text-[#FD4400] text-[10px] font-semibold tracking-[0.25em] uppercase block mb-3">
      Connect
    </span>
    <h2 className="font-serif text-xl md:text-3xl font-medium text-white mb-6">
      Get Involved with {title}
    </h2>
    <div className="space-y-6">
      <div className="space-y-3 text-white/75 text-sm">
        <div className="flex items-center space-x-3 text-white/60">
          <MapPin size={14} className="text-[#FD4400] shrink-0" />
          <span>Kathmandu, Nepal</span>
        </div>
        <div className="flex items-center space-x-3 text-white/60">
          <Phone size={14} className="text-[#FD4400] shrink-0" />
          <span>+977 1-4400000</span>
        </div>
        <div className="flex items-center space-x-3 text-white/60">
          <Mail size={14} className="text-[#FD4400] shrink-0" />
          <span>info@sums.org.np</span>
        </div>
      </div>
      <form onSubmit={e => e.preventDefault()} className="space-y-3">
        <input
          type="text"
          placeholder="Your Name / Institution"
          className="w-full bg-white/[0.03] border border-white/10 focus:border-[#FD4400]/70 px-4 py-3 rounded text-sm outline-none transition-all duration-300 text-white placeholder:text-white/30"
        />
        <input
          type="email"
          placeholder="Official Email Address"
          className="w-full bg-white/[0.03] border border-white/10 focus:border-[#FD4400]/70 px-4 py-3 rounded text-sm outline-none transition-all duration-300 text-white placeholder:text-white/30"
        />
        <textarea
          rows={3}
          placeholder="How can we help you?"
          className="w-full bg-white/[0.03] border border-white/10 focus:border-[#FD4400]/70 px-4 py-3 rounded text-sm outline-none transition-all duration-300 text-white placeholder:text-white/30"
        />
        <button
          type="submit"
          className="w-full bg-[#FD4400] hover:bg-[#FD4400]/90 text-white font-semibold text-xs uppercase tracking-wider py-3 rounded transition-all duration-300 cursor-pointer"
        >
          Send Message
        </button>
      </form>
    </div>
  </motion.section>
);

// ── AIC SECTIONS ──────────────────────────────────────────────────────────────
const AicSections: React.FC = () => {
  const steps = [
    {
      num: '01',
      title: 'Sourcing',
      desc: 'We pull real R&D challenges directly from our corporate network — problems companies actually need solved, not textbook exercises.',
    },
    {
      num: '02',
      title: 'Design',
      desc: 'Complex industry problems are broken into focused, bite-sized projects tailored for teams of 3–5 students to tackle within a semester.',
    },
    {
      num: '03',
      title: 'Mentorship',
      desc: 'Each team receives expert guidance from both industry professionals and academic mentors throughout the entire project lifecycle.',
    },
    {
      num: '04',
      title: 'Vetting',
      desc: 'Top-performing students are directly referred to partner companies for paid internship roles — real jobs, not certificates.',
    },
  ];


  return (
    <>
      {/* OVERVIEW */}
      <motion.section id="overview" className="scroll-mt-24" {...FADE_UP}>
        <span className="text-[#FD4400] text-[10px] font-semibold tracking-[0.25em] uppercase block mb-3">
          01 / Overview
        </span>
        <h1 className="font-serif text-2xl md:text-4xl font-medium text-white leading-tight mb-4">
          Academia Industry Collaboration
        </h1>
        <p className="text-white/60 text-sm md:text-base leading-relaxed mb-4">
          AIC is our decentralized R&D ecosystem where students work on real-world research, business, and technical projects — while still in college.
        </p>
        <p className="text-white/50 text-sm leading-relaxed">
          Companies bring genuine challenges from their operations. Students break them down into executable projects, work in small focused teams, and get guided by mentors from both the industry and academia. The best performers earn direct pathways into paid roles.
        </p>
      </motion.section>

      {/* PROCESS */}
      <motion.section id="process" className="scroll-mt-24 border-t border-white/5 pt-12" {...FADE_UP}>
        <span className="text-[#FD4400] text-[10px] font-semibold tracking-[0.25em] uppercase block mb-3">
          02 / The Process
        </span>
        <h2 className="font-serif text-xl md:text-3xl font-medium text-white mb-10">
          From Corporate Challenge to Career Opportunity
        </h2>
        <div className="relative space-y-0">
          {steps.map((step, idx) => (
            <div key={step.num} className="relative flex gap-6">
              {/* Vertical connector line */}
              <div className="flex flex-col items-center">
                <div className="w-10 h-10 rounded-full border border-[#FD4400]/60 bg-[#FD4400]/10 flex items-center justify-center shrink-0 z-10">
                  <span className="text-[#FD4400] text-xs font-black">{step.num}</span>
                </div>
                {idx < steps.length - 1 && (
                  <div className="w-px flex-1 bg-gradient-to-b from-[#FD4400]/30 to-transparent my-1" style={{ minHeight: '40px' }} />
                )}
              </div>
              {/* Content */}
              <div className="pb-10">
                <h3 className="text-white font-bold text-base mb-1">{step.title}</h3>
                <p className="text-white/55 text-sm leading-relaxed">{step.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </motion.section>

      {/* IMPACT */}
      <motion.section id="impact" className="scroll-mt-24 border-t border-white/5 pt-12" {...FADE_UP}>
        <span className="text-[#FD4400] text-[10px] font-semibold tracking-[0.25em] uppercase block mb-3">
          03 / Impact
        </span>
        <h2 className="font-serif text-xl md:text-3xl font-medium text-white mb-8">
          Proven at Scale
        </h2>
        <div className="grid grid-cols-3 gap-4 mb-8">
          {[
            { num: '100+',   label: 'Projects Completed' },
            { num: '50+',    label: 'National & International Partners' },
            { num: '1,500+', label: 'Capable Students Trained' },
          ].map(stat => (
            <div key={stat.label} className="border border-white/5 rounded-xl p-5 bg-white/[0.02] text-center">
              <div className="text-3xl md:text-4xl font-black text-[#FD4400] mb-1">{stat.num}</div>
              <div className="text-white/45 text-[10px] font-semibold tracking-wider uppercase leading-tight">{stat.label}</div>
            </div>
          ))}
        </div>
      </motion.section>

      {/* PARTNERS */}
      <motion.section id="partners" className="scroll-mt-24 border-t border-white/5 pt-12" {...FADE_UP}>
        <span className="text-[#FD4400] text-[10px] font-semibold tracking-[0.25em] uppercase block mb-3">
          04 / Partners
        </span>
        <h2 className="font-serif text-xl md:text-3xl font-medium text-white mb-4">
          Our Corporate Network
        </h2>
        <p className="text-white/50 text-sm mb-8 leading-relaxed">
          AIC's sourcing pipeline is backed by 50+ national and international companies that contribute real R&D challenges and absorb top-performing students into their teams.
        </p>
        <LogoSliderStrip logos={AIC_LOGOS} label="National & International Partners" />
      </motion.section>

      <ContactForm title="AIC" />
    </>
  );
};

// ── SIP SECTIONS ──────────────────────────────────────────────────────────────
const SipSections: React.FC = () => {
  const phases = [
    {
      num: '01',
      title: 'Mentorship Sprint',
      duration: '3 months · 24 hours',
      desc: 'An intensive program led by founders who have actually built and scaled companies. No theory — only applied playbooks, live case studies, and direct access to people who have done it.',
    },
    {
      num: '02',
      title: 'Validate & Build',
      desc: 'Students learn to identify real market problems, test assumptions, prove demand, and build actual solutions — not just polished pitch decks. Market validation is not optional.',
    },
    {
      num: '03',
      title: 'Fund & Network',
      desc: 'Direct access to Euro-Nepal VC networks and founder communities. Teams with validated traction get seed funding opportunities and introductions to investors actively looking at Nepal.',
    },
  ];


  return (
    <>
      {/* OVERVIEW */}
      <motion.section id="overview" className="scroll-mt-24" {...FADE_UP}>
        <span className="text-[#FD4400] text-[10px] font-semibold tracking-[0.25em] uppercase block mb-3">
          01 / Overview
        </span>
        <h1 className="font-serif text-2xl md:text-4xl font-medium text-white leading-tight mb-4">
          Student Innovators Program
        </h1>
        <p className="text-white/60 text-sm md:text-base leading-relaxed mb-4">
          SIP is our innovation ecosystem — a structured 3-phase journey that bridges academia and industry for students who want to build real things.
        </p>
        <p className="text-white/50 text-sm leading-relaxed">
          Scale or fail, every student who goes through SIP gains critical real-world experience in finance, resource management, and business operations. The journey matters as much as the outcome.
        </p>
        <div className="mt-6 p-4 rounded-xl border border-[#FD4400]/15 bg-[#FD4400]/5">
          <p className="text-[#FD4400] text-sm font-semibold">
            "Scale or fail — every student walks away with real business experience."
          </p>
        </div>
      </motion.section>

      {/* JOURNEY */}
      <motion.section id="journey" className="scroll-mt-24 border-t border-white/5 pt-12" {...FADE_UP}>
        <span className="text-[#FD4400] text-[10px] font-semibold tracking-[0.25em] uppercase block mb-3">
          02 / The Journey
        </span>
        <h2 className="font-serif text-xl md:text-3xl font-medium text-white mb-10">
          Three Phases. One Complete Experience.
        </h2>
        <div className="space-y-6">
          {phases.map((phase, idx) => (
            <motion.div
              key={phase.num}
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: idx * 0.15, ease: [0.16, 1, 0.3, 1] }}
              className="relative border border-white/5 rounded-xl p-6 bg-white/[0.02] hover:border-[#FD4400]/20 hover:bg-[#FD4400]/[0.03] transition-all duration-300 group"
            >
              <div className="flex items-start gap-5">
                <div className="w-12 h-12 rounded-full border border-[#FD4400]/50 bg-[#FD4400]/10 flex items-center justify-center shrink-0 group-hover:border-[#FD4400] group-hover:bg-[#FD4400]/20 transition-all duration-300">
                  <span className="text-[#FD4400] text-sm font-black">{phase.num}</span>
                </div>
                <div className="flex-1">
                  <div className="flex items-baseline gap-3 mb-2">
                    <h3 className="text-white font-bold text-base">{phase.title}</h3>
                    {'duration' in phase && (
                      <span className="text-[#FD4400]/70 text-[10px] font-semibold tracking-wider uppercase">{phase.duration}</span>
                    )}
                  </div>
                  <p className="text-white/55 text-sm leading-relaxed">{phase.desc}</p>
                </div>
              </div>
              {idx < phases.length - 1 && (
                <div className="absolute -bottom-3 left-[2.75rem] w-px h-6 bg-gradient-to-b from-[#FD4400]/30 to-transparent z-10" />
              )}
            </motion.div>
          ))}
        </div>
      </motion.section>

      {/* TRACK RECORD */}
      <motion.section id="track-record" className="scroll-mt-24 border-t border-white/5 pt-12" {...FADE_UP}>
        <span className="text-[#FD4400] text-[10px] font-semibold tracking-[0.25em] uppercase block mb-3">
          03 / Track Record
        </span>
        <h2 className="font-serif text-xl md:text-3xl font-medium text-white mb-4">
          Companies Built Through SIP
        </h2>
        <p className="text-white/50 text-sm mb-8 leading-relaxed">
          50+ ventures have come out of the SIP pipeline — from local startups to internationally recognized companies.
        </p>
        <LogoSliderStrip logos={SIP_LOGOS} label="Ventures Built Through SIP" />
        <p className="text-[#FD4400]/70 text-xs font-semibold tracking-widest uppercase mt-4">+50 More ventures</p>
      </motion.section>

      <ContactForm title="SIP" />
    </>
  );
};

// ── COGKNIT SECTIONS ──────────────────────────────────────────────────────────
const CogknitSections: React.FC = () => {
  const features = [
    { title: 'Intelligent Knowledge Management', desc: 'Centralize institutional resources in a highly structured knowledge repository accessible from anywhere.' },
    { title: 'Adaptive Learning Pathways',       desc: 'Custom curricula that adapt dynamically based on learner pace, progress, and performance metrics.' },
    { title: 'Offline-First Capabilities',       desc: 'Optimized for high-performance usage across varying network conditions across Nepal.' },
    { title: 'Advanced Institutional Analytics', desc: 'Empower leaders with deep reports on learner outcomes, teaching indices, and institutional benchmarks.' },
  ];

  const solutions = [
    { name: 'Higher Education Suite',          audience: 'Universities & colleges seeking to digitize syllabi, class interactions, and outcome tracking.' },
    { name: 'Technical & Vocational Training', audience: 'Specialized skills development through step-by-step progress tracking and competency mapping.' },
  ];

  return (
    <>
      {/* OVERVIEW */}
      <motion.section id="overview" className="scroll-mt-24" {...FADE_UP}>
        <span className="text-[#FD4400] text-[10px] font-semibold tracking-[0.25em] uppercase block mb-3">
          01 / Overview
        </span>
        <h1 className="font-serif text-2xl md:text-4xl font-medium text-white leading-tight mb-4">
          Empowering institutions with next-generation smart learning frameworks.
        </h1>
        <p className="text-white/60 text-sm md:text-base leading-relaxed">
          Cogknit is a high-fidelity learning management ecosystem customized for Nepali academic institutions, vocational centers, and corporate training structures. It structures complex learning pathways, tracks progress, and ensures educational outcomes meet modern benchmarks.
        </p>
      </motion.section>

      {/* FEATURES */}
      <motion.section id="features" className="scroll-mt-24 border-t border-white/5 pt-12" {...FADE_UP}>
        <span className="text-[#FD4400] text-[10px] font-semibold tracking-[0.25em] uppercase block mb-3">
          02 / Features
        </span>
        <h2 className="font-serif text-xl md:text-3xl font-medium text-white mb-8">
          Key Capabilities
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          {features.map((feat, idx) => (
            <div key={idx} className="border-l border-[#FD4400]/30 pl-4 hover:border-[#FD4400] transition-colors duration-300">
              <h3 className="font-semibold text-white text-sm mb-1">{feat.title}</h3>
              <p className="text-white/50 text-sm">{feat.desc}</p>
            </div>
          ))}
        </div>
      </motion.section>

      {/* SOLUTIONS */}
      <motion.section id="solutions" className="scroll-mt-24 border-t border-white/5 pt-12" {...FADE_UP}>
        <span className="text-[#FD4400] text-[10px] font-semibold tracking-[0.25em] uppercase block mb-3">
          03 / Solutions
        </span>
        <h2 className="font-serif text-xl md:text-3xl font-medium text-white mb-8">
          Tailored for Every Institution
        </h2>
        <div className="space-y-4">
          {solutions.map((sol, idx) => (
            <div key={idx} className="border border-white/5 p-5 rounded-xl bg-white/[0.01] hover:border-[#FD4400]/20 transition-all duration-300">
              <h3 className="text-white font-semibold text-base mb-1">{sol.name}</h3>
              <p className="text-white/50 text-sm">{sol.audience}</p>
            </div>
          ))}
        </div>
      </motion.section>

      {/* IMPACT */}
      <motion.section id="impact" className="scroll-mt-24 border-t border-white/5 pt-12" {...FADE_UP}>
        <span className="text-[#FD4400] text-[10px] font-semibold tracking-[0.25em] uppercase block mb-3">
          04 / Impact
        </span>
        <h2 className="font-serif text-xl md:text-3xl font-medium text-white mb-6">
          Proven Outcomes
        </h2>
        <p className="text-white/70 text-base md:text-lg font-serif italic leading-relaxed">
          "Empowered over 150+ institutions with 85% higher learner retention compared to traditional learning systems."
        </p>
      </motion.section>

      <ContactForm title="Cogknit" />
    </>
  );
};

// ── MAIN COMPONENT ────────────────────────────────────────────────────────────
export const PlatformDetail: React.FC<PlatformDetailProps> = ({
  platformId,
  activeSection,
  onActiveSectionChange,
  detailScrollY = 0,
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [isMobile, setIsMobile] = useState<boolean>(
    () => typeof window !== 'undefined' && window.innerWidth < 768
  );

  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth < 768);
    window.addEventListener('resize', check);
    return () => window.removeEventListener('resize', check);
  }, []);

  const sectionLayout = PLATFORM_SECTIONS[platformId] ?? PLATFORM_SECTIONS.cogknit;
  const sections = sectionLayout.map(({ id, label }) => ({ id, label }));
  const logoPath = PLATFORM_LOGOS[platformId] ?? '/cogknitlogo.png';

  const platformTitle =
    platformId === 'aic'     ? 'AIC' :
    platformId === 'sip'     ? 'SIP' :
    'Cogknit';

  useEffect(() => {
    const handleScroll = () => {
      const scrollPos = window.scrollY + window.innerHeight * 0.4;
      for (const section of sections) {
        const el = document.getElementById(section.id);
        if (el) {
          const top = el.offsetTop;
          const height = el.offsetHeight;
          if (scrollPos >= top && scrollPos < top + height) {
            onActiveSectionChange(section.id);
            break;
          }
        }
      }
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [onActiveSectionChange, sections]);

  const scrollToSection = (id: string) => {
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };

  const renderSections = () => {
    if (platformId === 'aic') return <AicSections />;
    if (platformId === 'sip') return <SipSections />;
    return <CogknitSections />;
  };

  const layoutProgress = Math.min(1.0, detailScrollY / 300);
  const leftOffsetVal = `calc(50vw - ${layoutProgress * 27.5}vw)`;

  // ── MOBILE ─────────────────────────────────────────────────────────────────
  if (isMobile) {
    return (
      <div className="relative w-full text-white">
        {/* Mobile: logo header */}
        <div className="flex items-center gap-4 px-5 pt-6 pb-4 border-b border-white/5">
          <div className="w-12 h-12 rounded-full border border-[#FD4400]/30 bg-[#FD4400]/5 flex items-center justify-center shrink-0">
            <img src={logoPath} alt={platformTitle} className="w-8 h-8 object-contain" style={{ filter: 'drop-shadow(0 0 6px rgba(253,68,0,0.5))' }} />
          </div>
          <h2 className="text-white font-black text-lg tracking-tight">{platformTitle}</h2>
        </div>

        {/* Sticky section tabs — large touch targets */}
        <nav
          className="sticky top-[65px] z-30 bg-[#040507]/97 backdrop-blur-md border-b border-white/5 flex gap-2 px-4 py-3 overflow-x-auto"
          style={{ scrollbarWidth: 'none', WebkitOverflowScrolling: 'touch' }}
        >
          {sections.map(sec => {
            const isActive = activeSection === sec.id;
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
                  <span
                    className="absolute inset-0 rounded-full bg-[#FD4400]/30 animate-ping pointer-events-none"
                    style={{ animationDuration: '2s' }}
                  />
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

  // ── DESKTOP ────────────────────────────────────────────────────────────────
  return (
    <div ref={containerRef} className="relative w-full text-white">
      {/* Sticky orbit header */}
      <div
        style={{ left: leftOffsetVal }}
        className="sticky top-0 h-screen w-0 flex items-center justify-center pointer-events-none z-20 transition-all duration-75 ease-out"
      >
        {/* Dashed orbit ring */}
        <div className="absolute w-[300px] h-[300px] md:w-[380px] md:h-[380px] rounded-full border border-dashed border-white/8" />

        {/* Center logo */}
        <div className="absolute w-28 h-28 md:w-32 md:h-32 rounded-full border border-[#FD4400]/20 bg-[#040507]/90 flex items-center justify-center"
          style={{ boxShadow: '0 0 32px rgba(253,68,0,0.12), inset 0 0 20px rgba(253,68,0,0.05)' }}>
          <img
            src={logoPath}
            alt={platformTitle}
            className="w-20 h-20 md:w-24 md:h-24 object-contain"
            style={{ filter: 'drop-shadow(0 0 10px rgba(253,68,0,0.6))' }}
          />
        </div>

        {/* Circular orbit nav buttons */}
        <div className="absolute w-[300px] h-[300px] md:w-[380px] md:h-[380px]">
          {sectionLayout.map(sec => {
            const radians = (sec.angle * Math.PI) / 180;
            const radius = 175;
            const x = Math.cos(radians) * radius;
            const y = Math.sin(radians) * radius;
            const isActive = activeSection === sec.id;

            return (
              <button
                key={sec.id}
                onClick={() => scrollToSection(sec.id)}
                style={{
                  left: `calc(50% + ${x}px)`,
                  top:  `calc(50% + ${y}px)`,
                  transform: 'translate(-50%, -50%)',
                }}
                className={`absolute pointer-events-auto z-40 px-3 py-1.5 rounded-full text-[10px] font-semibold uppercase tracking-wider transition-all duration-300 cursor-pointer whitespace-nowrap ${
                  isActive
                    ? 'bg-[#FD4400] text-white border border-[#FD4400] scale-110 shadow-[0_0_12px_rgba(253,68,0,0.5)]'
                    : 'bg-[#040507]/90 text-white/50 border border-white/10 hover:border-[#FD4400]/40 hover:text-white'
                }`}
              >
                {isActive && (
                  <span
                    className="absolute inset-0 rounded-full bg-[#FD4400]/45 animate-ping pointer-events-none"
                    style={{ animationDuration: '2s' }}
                  />
                )}
                {sec.label}
              </button>
            );
          })}
        </div>
      </div>

      {/* Scrollable content panel */}
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
