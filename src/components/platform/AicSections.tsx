import React from 'react';
import { motion } from 'framer-motion';
import { FADE_UP } from '../../utils/animations';
import { AIC_LOGOS } from '../../data/platforms';
import { LogoGrid } from '../ui/LogoGrid';
import { PlatformContactForm } from '../ui/PlatformContactForm';

const STEPS = [
  { num: '01', title: 'Sourcing',    desc: 'We pull real R&D challenges directly from our corporate network — problems companies actually need solved, not textbook exercises.' },
  { num: '02', title: 'Design',      desc: 'Complex industry problems are broken into focused, bite-sized projects tailored for teams of 3–5 students to tackle within a semester.' },
  { num: '03', title: 'Mentorship',  desc: 'Each team receives expert guidance from both industry professionals and academic mentors throughout the entire project lifecycle.' },
  { num: '04', title: 'Vetting',     desc: 'Top-performing students are directly referred to partner companies for paid internship roles — real jobs, not certificates.' },
];

export const AicSections: React.FC = () => (
  <>
    <motion.section id="overview" className="scroll-mt-24" {...FADE_UP}>
      <span className="text-brand text-[10px] font-semibold tracking-[0.25em] uppercase block mb-3">01 / Overview</span>
      <h1 className="font-serif text-2xl md:text-4xl font-medium text-white leading-tight mb-4">Academia Industry Collaboration</h1>
      <p className="text-white/60 text-sm md:text-base leading-relaxed mb-4">
        AIC is our decentralized R&D ecosystem where students work on real-world research, business, and technical projects — while still in college.
      </p>
      <p className="text-white/50 text-sm leading-relaxed">
        Companies bring genuine challenges from their operations. Students break them down into executable projects, work in small focused teams, and get guided by mentors from both the industry and academia. The best performers earn direct pathways into paid roles.
      </p>
    </motion.section>

    <motion.section id="process" className="scroll-mt-24 border-t border-white/5 pt-12" {...FADE_UP}>
      <span className="text-brand text-[10px] font-semibold tracking-[0.25em] uppercase block mb-3">02 / The Process</span>
      <h2 className="font-serif text-xl md:text-3xl font-medium text-white mb-10">From Corporate Challenge to Career Opportunity</h2>
      <div className="relative space-y-0">
        {STEPS.map((step, idx) => (
          <div key={step.num} className="relative flex gap-6">
            <div className="flex flex-col items-center">
              <div className="w-10 h-10 rounded-full border border-brand/60 bg-brand/10 flex items-center justify-center shrink-0 z-10">
                <span className="text-brand text-xs font-black">{step.num}</span>
              </div>
              {idx < STEPS.length - 1 && (
                <div className="w-px flex-1 bg-gradient-to-b from-brand/30 to-transparent my-1" style={{ minHeight: '40px' }} />
              )}
            </div>
            <div className="pb-10">
              <h3 className="text-white font-bold text-base mb-1">{step.title}</h3>
              <p className="text-white/55 text-sm leading-relaxed">{step.desc}</p>
            </div>
          </div>
        ))}
      </div>
    </motion.section>

    <motion.section id="impact" className="scroll-mt-24 border-t border-white/5 pt-12" {...FADE_UP}>
      <span className="text-brand text-[10px] font-semibold tracking-[0.25em] uppercase block mb-3">03 / Impact</span>
      <h2 className="font-serif text-xl md:text-3xl font-medium text-white mb-8">Proven at Scale</h2>
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-8">
        {[
          { num: '100+',   label: 'Projects Completed' },
          { num: '50+',    label: 'National & International Partners' },
          { num: '1,500+', label: 'Capable Students Trained' },
        ].map(stat => (
          <div key={stat.label} className="border border-white/5 rounded-xl p-4 sm:p-5 bg-white/[0.02] text-center">
            <div className="text-3xl sm:text-3xl md:text-4xl font-black text-brand mb-1">{stat.num}</div>
            <div className="text-white/45 text-[10px] font-semibold tracking-wider uppercase leading-tight">{stat.label}</div>
          </div>
        ))}
      </div>
    </motion.section>

    <motion.section id="partners" className="scroll-mt-24 border-t border-white/5 pt-12" {...FADE_UP}>
      <span className="text-brand text-[10px] font-semibold tracking-[0.25em] uppercase block mb-3">04 / Partners</span>
      <h2 className="font-serif text-xl md:text-3xl font-medium text-white mb-4">Our Corporate Network</h2>
      <p className="text-white/50 text-sm mb-8 leading-relaxed">
        AIC's sourcing pipeline is backed by 50+ national and international companies that contribute real R&D challenges and absorb top-performing students into their teams.
      </p>
      <LogoGrid logos={AIC_LOGOS} label="National & International Partners" />
    </motion.section>

    <PlatformContactForm title="AIC" />
  </>
);
