import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Compass, Building2, ArrowLeft, GraduationCap, Hammer, Sparkles, Wrench } from 'lucide-react';
import { Seo } from '../components/layout/Seo';

type IconType = typeof Compass;
type Variant = 'philosophy' | 'industry';

interface VariantConfig {
  icon: IconType;
  eyebrow: string;
  title: string;
  description: string;
  steps: string[];
  path: string;
}

const CONFIG: Record<Variant, VariantConfig> = {
  philosophy: {
    icon: Compass,
    eyebrow: 'The Thinking Behind It',
    title: 'Our Philosophy',
    description:
      "We're distilling everything we've learned watching the gap between classrooms and careers into something worth reading — not just another mission statement.",
    steps: ['Foundation', 'Principles', 'Narrative', 'Publish'],
    path: '/philosophy',
  },
  industry: {
    icon: Building2,
    eyebrow: 'For Employers & Partners',
    title: 'For Industry',
    description:
      "The partner portal for co-designed curricula, hiring pipelines, and direct access to job-ready talent is being assembled right now.",
    steps: ['Foundation', 'Partnerships', 'Portal', 'Launch'],
    path: '/industry',
  },
};

const TOOL_ICONS = [Hammer, Wrench, Sparkles];

export function ComingSoonPage({ variant }: { variant: Variant }) {
  const cfg = CONFIG[variant];
  const Icon = cfg.icon;
  const [activeStep, setActiveStep] = useState(0);

  useEffect(() => {
    const id = setInterval(() => {
      setActiveStep(s => (s + 1) % (cfg.steps.length + 1));
    }, 1500);
    return () => clearInterval(id);
  }, [cfg.steps.length]);

  return (
    <div className="min-h-screen w-full bg-[#040507] text-white relative overflow-hidden font-sans selection:bg-brand selection:text-white flex flex-col">
      <Seo page={variant} />

      {/* Ambient background */}
      <div className="pointer-events-none absolute inset-0 z-0">
        <div
          className="absolute -top-[15%] left-1/2 -translate-x-1/2 w-[800px] h-[800px] rounded-full blur-[130px] opacity-30"
          style={{ background: 'radial-gradient(circle, rgba(255,109,0,0.32) 0%, rgba(255,60,0,0.06) 55%, transparent 75%)' }}
        />
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-[#040507]" />
      </div>

      {/* Top bar */}
      <header className="relative z-10 flex items-center justify-between px-6 md:px-10 py-6 md:py-8">
        <Link to="/" className="group flex items-center gap-2.5">
          <img src="/sums_logo.png" alt="SUMS Nepal" className="w-9 h-9 object-contain" style={{ animation: 'logoFloat 3.5s ease-in-out infinite' }} />
          <span className="text-white/50 group-hover:text-white text-xs font-semibold tracking-[0.2em] uppercase transition-colors">SUMS</span>
        </Link>
        <Link
          to="/"
          className="flex items-center gap-2 text-white/50 hover:text-brand text-xs font-semibold uppercase tracking-wider transition-colors duration-300"
        >
          <ArrowLeft className="w-3.5 h-3.5" />
          Back to Gateway
        </Link>
      </header>

      <div className="relative z-10 flex-grow flex flex-col items-center justify-center px-6 md:px-10 py-10 gap-10 max-w-5xl mx-auto w-full">
        {/* Heading */}
        <motion.div
          initial={{ opacity: 0, y: -14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
          className="flex flex-col items-center text-center"
        >
          <div className="relative w-16 h-16 mb-6 flex items-center justify-center">
            <div className="absolute inset-0 rounded-full bg-brand/10 border border-brand/25" />
            <div className="absolute inset-0 rounded-full blur-lg bg-brand/30" />
            <Icon className="relative z-10 w-7 h-7 text-brand" strokeWidth={1.75} />
          </div>

          <div className="flex items-center gap-3 mb-4">
            <div className="w-8 h-[2px] bg-brand" />
            <span className="text-brand text-[11px] font-extrabold tracking-[0.35em] uppercase">{cfg.eyebrow}</span>
            <div className="w-8 h-[2px] bg-brand" />
          </div>

          <h1 className="font-sans font-black text-4xl sm:text-5xl md:text-6xl leading-[0.95] tracking-tight text-white">
            {cfg.title}
          </h1>
          <p className="text-white/55 text-sm md:text-base mt-5 max-w-xl leading-relaxed">
            {cfg.description}
          </p>
        </motion.div>

        {/* Blueprint / under-construction browser mockup */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
          className="w-full max-w-2xl rounded-2xl border border-white/10 bg-white/[0.02] overflow-hidden shadow-[0_20px_60px_rgba(0,0,0,0.5)]"
        >
          {/* Chrome */}
          <div className="flex items-center gap-2 px-4 py-3 border-b border-white/8 bg-white/[0.02]">
            <div className="flex items-center gap-1.5">
              <span className="w-2.5 h-2.5 rounded-full bg-white/15" />
              <span className="w-2.5 h-2.5 rounded-full bg-white/15" />
              <span className="w-2.5 h-2.5 rounded-full bg-white/15" />
            </div>
            <div className="flex-grow mx-3 flex items-center gap-2 bg-black/30 border border-white/5 rounded-md px-3 py-1.5">
              <span className="w-1.5 h-1.5 rounded-full bg-brand animate-pulse flex-shrink-0" />
              <span className="text-white/35 text-[11px] font-mono truncate">sums.org.np{cfg.path}</span>
            </div>
            <span className="hidden sm:inline text-[10px] font-bold uppercase tracking-widest text-brand/80 whitespace-nowrap">Building</span>
          </div>

          {/* Wireframe canvas */}
          <div className="relative p-6 md:p-8" style={{ background: 'repeating-linear-gradient(0deg, rgba(255,255,255,0.015) 0px, rgba(255,255,255,0.015) 1px, transparent 1px, transparent 24px), repeating-linear-gradient(90deg, rgba(255,255,255,0.015) 0px, rgba(255,255,255,0.015) 1px, transparent 1px, transparent 24px)' }}>
            {/* Scan sweep */}
            <motion.div
              className="absolute inset-x-0 h-24 pointer-events-none"
              style={{ background: 'linear-gradient(180deg, transparent 0%, rgb(var(--color-brand-rgb) / 0.08) 50%, transparent 100%)' }}
              animate={{ top: ['-10%', '110%'] }}
              transition={{ repeat: Infinity, duration: 3.2, ease: 'linear' }}
            />

            <svg viewBox="0 0 400 220" className="w-full h-auto relative z-10" fill="none">
              {/* nav line */}
              <motion.rect x="8" y="8" width="90" height="10" rx="3" stroke="var(--color-brand)" strokeOpacity="0.5" strokeWidth="1.2" strokeDasharray="4 3" initial={{ pathLength: 0 }} animate={{ pathLength: 1 }} transition={{ duration: 1.4, repeat: Infinity, repeatType: 'reverse', ease: 'easeInOut' }} />
              <motion.circle cx="380" cy="13" r="6" stroke="rgba(255,255,255,0.25)" strokeWidth="1.2" initial={{ pathLength: 0 }} animate={{ pathLength: 1 }} transition={{ duration: 1.2, delay: 0.2, repeat: Infinity, repeatType: 'reverse', ease: 'easeInOut' }} />

              {/* hero block */}
              <motion.rect x="8" y="34" width="384" height="70" rx="8" stroke="rgba(255,255,255,0.18)" strokeWidth="1.3" strokeDasharray="6 4" initial={{ pathLength: 0, opacity: 0 }} animate={{ pathLength: 1, opacity: 1 }} transition={{ duration: 1.8, delay: 0.1, repeat: Infinity, repeatType: 'reverse', ease: 'easeInOut' }} />
              <motion.line x1="24" y1="56" x2="180" y2="56" stroke="var(--color-brand)" strokeWidth="2" strokeLinecap="round" initial={{ pathLength: 0 }} animate={{ pathLength: 1 }} transition={{ duration: 1, delay: 0.4, repeat: Infinity, repeatType: 'reverse', ease: 'easeInOut' }} />
              <motion.line x1="24" y1="72" x2="240" y2="72" stroke="rgba(255,255,255,0.2)" strokeWidth="2" strokeLinecap="round" initial={{ pathLength: 0 }} animate={{ pathLength: 1 }} transition={{ duration: 1, delay: 0.55, repeat: Infinity, repeatType: 'reverse', ease: 'easeInOut' }} />
              <motion.line x1="24" y1="88" x2="130" y2="88" stroke="rgba(255,255,255,0.14)" strokeWidth="2" strokeLinecap="round" initial={{ pathLength: 0 }} animate={{ pathLength: 1 }} transition={{ duration: 1, delay: 0.7, repeat: Infinity, repeatType: 'reverse', ease: 'easeInOut' }} />

              {/* three cards */}
              {[8, 140, 272].map((x, i) => (
                <motion.rect
                  key={x}
                  x={x} y="118" width="120" height="94" rx="8"
                  stroke={i === 1 ? 'var(--color-brand)' : 'rgba(255,255,255,0.18)'}
                  strokeOpacity={i === 1 ? 0.7 : 1}
                  strokeWidth="1.3" strokeDasharray="6 4"
                  initial={{ pathLength: 0, opacity: 0 }}
                  animate={{ pathLength: 1, opacity: 1 }}
                  transition={{ duration: 1.6, delay: 0.3 + i * 0.25, repeat: Infinity, repeatType: 'reverse', ease: 'easeInOut' }}
                />
              ))}
            </svg>
          </div>

          {/* Progress steps */}
          <div className="flex items-center border-t border-white/8 bg-black/20">
            {cfg.steps.map((step, i) => (
              <div key={step} className={`flex-1 min-w-0 flex items-center gap-2 px-2.5 md:px-4 py-3.5 ${i !== 0 ? 'border-l border-white/5' : ''}`}>
                <span className={`w-1.5 h-1.5 rounded-full flex-shrink-0 transition-colors duration-500 ${i <= activeStep ? 'bg-brand' : 'bg-white/15'}`} />
                <span className={`text-[10px] md:text-[11px] font-semibold uppercase tracking-wider truncate transition-colors duration-500 ${i <= activeStep ? 'text-white/80' : 'text-white/25'}`}>
                  {step}
                </span>
              </div>
            ))}
          </div>
        </motion.div>

        {/* Floating tool icons */}
        <div className="hidden sm:flex items-center gap-6 -mt-2">
          {TOOL_ICONS.map((ToolIcon, i) => (
            <motion.div
              key={i}
              animate={{ y: [0, -6, 0] }}
              transition={{ repeat: Infinity, duration: 2.4, delay: i * 0.3, ease: 'easeInOut' }}
              className="w-9 h-9 rounded-full border border-white/8 bg-white/[0.02] flex items-center justify-center text-white/30"
            >
              <ToolIcon className="w-4 h-4" strokeWidth={1.75} />
            </motion.div>
          ))}
        </div>

        {/* CTAs */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.5 }}
          className="flex flex-col sm:flex-row items-center gap-3 sm:gap-4 pointer-events-auto"
        >
          <Link
            to="/academia"
            className="flex items-center gap-2 bg-brand hover:bg-brand/90 text-white px-6 py-3 rounded-full text-xs font-semibold uppercase tracking-wider transition-all duration-300 border border-brand"
          >
            <GraduationCap className="w-4 h-4" />
            Explore Academia — Live Now
          </Link>
          <Link
            to={variant === 'philosophy' ? '/industry' : '/philosophy'}
            className="flex items-center gap-2 text-white/50 hover:text-brand px-6 py-3 rounded-full text-xs font-semibold uppercase tracking-wider transition-colors duration-300 border border-white/10 hover:border-brand/40"
          >
            {variant === 'philosophy' ? 'See Industry Instead' : 'See Our Philosophy Instead'}
          </Link>
        </motion.div>
      </div>
    </div>
  );
}

export default ComingSoonPage;
