import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { GraduationCap, Compass, Building2, ArrowUpRight } from 'lucide-react';
import { Seo } from '../components/layout/Seo';

type IconType = typeof GraduationCap;

interface PathCard {
  index: string;
  title: string;
  eyebrow: string;
  description: string;
  cta: string;
  icon: IconType;
  route: string;
  featured?: boolean;
}

const PATHS: PathCard[] = [
  {
    index: '01',
    eyebrow: 'For Students & Institutions',
    title: 'Academia',
    description: "Step into the ecosystem — Cogknit, SIP, and AIC — turning classrooms into launchpads for 1,500+ students.",
    cta: 'Enter the Ecosystem',
    icon: GraduationCap,
    route: '/academia',
  },
  {
    index: '02',
    eyebrow: 'The Thinking Behind It',
    title: 'Our Philosophy',
    description: "Why we believe education is broken, and the principles guiding what we're building to fix it.",
    cta: 'Read Our Thinking',
    icon: Compass,
    route: '/philosophy',
    featured: true,
  },
  {
    index: '03',
    eyebrow: 'For Employers & Partners',
    title: 'Industry',
    description: "Partner with us to shape the talent pipeline your business will actually need tomorrow.",
    cta: 'Partner With Us',
    icon: Building2,
    route: '/industry',
  },
];

const fadeUp = {
  hidden: { opacity: 0, y: 26 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.7, delay: 0.15 + i * 0.12, ease: [0.16, 1, 0.3, 1] as const },
  }),
};

function GatewayPage() {
  return (
    <div className="min-h-screen w-full bg-[#040507] text-white relative overflow-hidden font-sans selection:bg-brand selection:text-white flex flex-col">
      <Seo page="gateway" />

      {/* Ambient background */}
      <div className="pointer-events-none absolute inset-0 z-0">
        <div
          className="absolute -top-[20%] left-1/2 -translate-x-1/2 w-[900px] h-[900px] rounded-full blur-[140px] opacity-40"
          style={{ background: 'radial-gradient(circle, rgba(255,109,0,0.35) 0%, rgba(255,60,0,0.08) 55%, transparent 75%)' }}
        />
        <div
          className="absolute inset-0 opacity-[0.35]"
          style={{
            backgroundImage:
              'radial-gradient(1px 1px at 10% 20%, rgba(255,255,255,0.5) 0%, transparent 60%),' +
              'radial-gradient(1px 1px at 80% 15%, rgba(255,255,255,0.4) 0%, transparent 60%),' +
              'radial-gradient(1.5px 1.5px at 30% 70%, rgba(255,255,255,0.35) 0%, transparent 60%),' +
              'radial-gradient(1px 1px at 65% 55%, rgba(255,255,255,0.3) 0%, transparent 60%),' +
              'radial-gradient(1px 1px at 90% 80%, rgba(255,255,255,0.35) 0%, transparent 60%),' +
              'radial-gradient(1.5px 1.5px at 45% 30%, rgba(255,255,255,0.3) 0%, transparent 60%),' +
              'radial-gradient(1px 1px at 15% 85%, rgba(255,255,255,0.3) 0%, transparent 60%)',
            backgroundSize: '100% 100%',
          }}
        />
        <motion.svg
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[1400px] h-[1400px] max-w-none opacity-[0.07]"
          viewBox="0 0 1400 1400"
          animate={{ rotate: 360 }}
          transition={{ repeat: Infinity, duration: 180, ease: 'linear' }}
        >
          <circle cx="700" cy="700" r="420" fill="none" stroke="#FF5C00" strokeWidth="1" strokeDasharray="10 14" />
          <circle cx="700" cy="700" r="620" fill="none" stroke="#ffffff" strokeWidth="1" strokeDasharray="2 18" />
        </motion.svg>
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-[#040507]" />
      </div>

      <div className="relative z-10 flex flex-col flex-grow px-6 md:px-10 py-14 md:py-16">
        {/* Header / brand mark */}
        <motion.div
          initial={{ opacity: 0, y: -14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
          className="flex flex-col items-center text-center mb-10 md:mb-14"
        >
          <div className="relative flex items-center justify-center mb-6">
            <div
              className="absolute inset-0 rounded-full blur-xl opacity-70"
              style={{
                background: 'radial-gradient(circle, rgba(255,109,0,0.7) 0%, rgba(255,60,0,0.3) 60%, transparent 100%)',
                transform: 'scale(2.1)',
              }}
            />
            <div
              className="absolute inset-0 rounded-full blur-md opacity-60"
              style={{
                background: 'radial-gradient(circle, rgba(255,140,0,0.9) 0%, rgba(255,60,0,0.4) 50%, transparent 100%)',
                transform: 'scale(1.5)',
              }}
            />
            <img
              src="/sums_logo.png"
              alt="SUMS Nepal"
              className="relative z-10 w-16 h-16 md:w-20 md:h-20 object-contain"
              style={{ animation: 'logoFloat 3.5s ease-in-out infinite, logoGlowPulse 2.5s ease-in-out infinite' }}
            />
          </div>

          <div className="flex items-center gap-3 mb-4 px-4">
            <div className="hidden sm:block w-8 h-[2px] bg-brand flex-shrink-0" />
            <span className="text-brand text-[10px] sm:text-[11px] font-extrabold tracking-[0.25em] sm:tracking-[0.35em] uppercase text-center">Bridging Education &amp; Industry</span>
            <div className="hidden sm:block w-8 h-[2px] bg-brand flex-shrink-0" />
          </div>

          <h1 className="font-sans font-black text-4xl sm:text-5xl md:text-6xl xl:text-7xl leading-[0.95] tracking-tight text-white">
            Pick Your <span className="text-brand" style={{ textShadow: '0 0 40px rgba(255,92,0,0.4)' }}>Orbit</span>
          </h1>

          <p className="text-white/55 text-sm md:text-base mt-5 max-w-xl leading-relaxed">
            Three ways in. One mission — closing the gap between what's taught and what's needed.
          </p>
        </motion.div>

        {/* Path cards */}
        <div className="flex-grow flex items-center justify-center">
          <div className="w-full max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-3 gap-5 lg:gap-6 items-center">
            {PATHS.map((path, i) => {
              const Icon = path.icon;
              return (
                <motion.div
                  key={path.route}
                  custom={i}
                  initial="hidden"
                  animate="visible"
                  variants={fadeUp}
                  className={path.featured ? 'lg:-translate-y-6' : ''}
                >
                  <Link
                    to={path.route}
                    className={`group relative flex flex-col justify-between overflow-hidden rounded-2xl border p-7 md:p-8 min-h-[300px] sm:min-h-[340px] lg:min-h-[380px] transition-all duration-500 ${
                      path.featured
                        ? 'border-brand/30 bg-gradient-to-b from-brand/[0.06] to-white/[0.02] hover:border-brand/60 hover:shadow-[0_0_60px_rgba(254,109,0,0.18)]'
                        : 'border-white/8 bg-white/[0.02] hover:border-brand/40 hover:bg-white/[0.035] hover:shadow-[0_0_40px_rgba(254,109,0,0.12)]'
                    } hover:-translate-y-1.5`}
                  >
                    <span
                      className="absolute -top-2 right-3 font-black text-white/[0.04] select-none leading-none pointer-events-none"
                      style={{ fontSize: '9rem' }}
                      aria-hidden="true"
                    >
                      {path.index}
                    </span>

                    <div className="relative z-10">
                      <div className="relative w-14 h-14 mb-6 flex items-center justify-center">
                        <div className="absolute inset-0 rounded-full bg-brand/10 border border-brand/25 group-hover:bg-brand group-hover:border-brand transition-all duration-500" />
                        <div className="absolute inset-0 rounded-full blur-lg bg-brand/0 group-hover:bg-brand/40 transition-all duration-500" />
                        <Icon className="relative z-10 w-6 h-6 text-brand group-hover:text-white transition-colors duration-500" strokeWidth={1.75} />
                      </div>

                      <span className="text-brand text-[10px] font-extrabold tracking-[0.28em] uppercase">
                        {path.eyebrow}
                      </span>
                      <h2 className="mt-2 text-2xl md:text-[28px] font-black text-white tracking-tight">
                        {path.title}
                      </h2>
                      <p className="text-white/50 text-sm md:text-[15px] leading-relaxed mt-3.5">
                        {path.description}
                      </p>
                    </div>

                    <div className="relative z-10 flex items-center justify-between mt-8 pt-5 border-t border-white/5 group-hover:border-brand/20 transition-colors duration-500">
                      <span className="text-white/70 group-hover:text-white text-xs font-semibold uppercase tracking-[0.18em] transition-colors duration-500">
                        {path.cta}
                      </span>
                      <ArrowUpRight className="w-4 h-4 text-brand transition-transform duration-500 group-hover:translate-x-1 group-hover:-translate-y-1" />
                    </div>
                  </Link>
                </motion.div>
              );
            })}
          </div>
        </div>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.9, duration: 0.8 }}
          className="text-white/25 text-[11px] tracking-[0.2em] uppercase text-center mt-12"
        >
          SUMS Nepal &middot; Education, Realigned
        </motion.p>
      </div>
    </div>
  );
}

export default GatewayPage;
