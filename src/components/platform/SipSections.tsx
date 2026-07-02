import React from 'react';
import { motion } from 'framer-motion';
import { FADE_UP } from '../../utils/animations';
import { SIP_LOGOS } from '../../data/platforms';
import { LogoGrid } from '../ui/LogoGrid';
import { PlatformContactForm } from '../ui/PlatformContactForm';

const PHASES = [
  { num: '01', title: 'Mentorship Sprint', duration: '3 months · 24 hours', desc: 'An intensive program led by founders who have actually built and scaled companies. No theory — only applied playbooks, live case studies, and direct access to people who have done it.' },
  { num: '02', title: 'Validate & Build',  desc: 'Students learn to identify real market problems, test assumptions, prove demand, and build actual solutions — not just polished pitch decks. Market validation is not optional.' },
  { num: '03', title: 'Fund & Network',    desc: 'Direct access to Euro-Nepal VC networks and founder communities. Teams with validated traction get seed funding opportunities and introductions to investors actively looking at Nepal.' },
];

export const SipSections: React.FC = () => (
  <>
    <motion.section id="overview" className="scroll-mt-24" {...FADE_UP}>
      <span className="text-[#FD4400] text-[10px] font-semibold tracking-[0.25em] uppercase block mb-3">01 / Overview</span>
      <h1 className="font-serif text-2xl md:text-4xl font-medium text-white leading-tight mb-4">Student Innovators Program</h1>
      <p className="text-white/60 text-sm md:text-base leading-relaxed mb-4">
        SIP is our innovation ecosystem — a structured 3-phase journey that bridges academia and industry for students who want to build real things.
      </p>
      <p className="text-white/50 text-sm leading-relaxed">
        Scale or fail, every student who goes through SIP gains critical real-world experience in finance, resource management, and business operations. The journey matters as much as the outcome.
      </p>
      <div className="mt-6 p-4 rounded-xl border border-[#FD4400]/15 bg-[#FD4400]/5">
        <p className="text-[#FD4400] text-sm font-semibold">"Scale or fail — every student walks away with real business experience."</p>
      </div>
    </motion.section>

    <motion.section id="journey" className="scroll-mt-24 border-t border-white/5 pt-12" {...FADE_UP}>
      <span className="text-[#FD4400] text-[10px] font-semibold tracking-[0.25em] uppercase block mb-3">02 / The Journey</span>
      <h2 className="font-serif text-xl md:text-3xl font-medium text-white mb-10">Three Phases. One Complete Experience.</h2>
      <div className="space-y-6">
        {PHASES.map((phase, idx) => (
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
            {idx < PHASES.length - 1 && (
              <div className="absolute -bottom-3 left-[2.75rem] w-px h-6 bg-gradient-to-b from-[#FD4400]/30 to-transparent z-10" />
            )}
          </motion.div>
        ))}
      </div>
    </motion.section>

    <motion.section id="track-record" className="scroll-mt-24 border-t border-white/5 pt-12" {...FADE_UP}>
      <span className="text-[#FD4400] text-[10px] font-semibold tracking-[0.25em] uppercase block mb-3">03 / Track Record</span>
      <h2 className="font-serif text-xl md:text-3xl font-medium text-white mb-4">Companies Built Through SIP</h2>
      <p className="text-white/50 text-sm mb-8 leading-relaxed">
        50+ ventures have come out of the SIP pipeline — from local startups to internationally recognized companies.
      </p>
      <LogoGrid logos={SIP_LOGOS} label="Ventures Built Through SIP" />
    </motion.section>

    <PlatformContactForm title="SIP" />
  </>
);
