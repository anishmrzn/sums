import React, { useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { Mail, Phone, MapPin } from 'lucide-react';

interface PlatformDetailProps {
  platformId: string;
  activeSection: string;
  onActiveSectionChange: (section: string) => void;
  detailScrollY?: number;
}

interface Section {
  id: string;
  label: string;
}

const sections: Section[] = [
  { id: 'overview',     label: 'Overview' },
  { id: 'features',     label: 'Features' },
  { id: 'solutions',    label: 'Solutions' },
  { id: 'impact',       label: 'Impact' },
  { id: 'partners',     label: 'Partners' },
  { id: 'testimonials', label: 'Testimonials' },
  { id: 'contact',      label: 'Contact' },
];

const sectionLayout = [
  { id: 'overview',     label: 'Overview',     angle: 270 },
  { id: 'features',     label: 'Features',     angle: 321 },
  { id: 'solutions',    label: 'Solutions',    angle: 13  },
  { id: 'impact',       label: 'Impact',       angle: 64  },
  { id: 'partners',     label: 'Partners',     angle: 116 },
  { id: 'testimonials', label: 'Testimonials', angle: 167 },
  { id: 'contact',      label: 'Contact',      angle: 218 },
];

export const PlatformDetail: React.FC<PlatformDetailProps> = ({
  platformId,
  activeSection,
  onActiveSectionChange,
  detailScrollY = 0,
}) => {
  const containerRef = useRef<HTMLDivElement>(null);

  // Detect active section on scroll
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
  }, [onActiveSectionChange]);

  const scrollToSection = (id: string) => {
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };

  const getPlatformDetails = () => {
    switch (platformId) {
      case 'cogknit':
        return {
          title: 'Cogknit',
          tagline: 'Empowering institutions with next-generation smart learning frameworks.',
          overviewText: 'Cogknit is a high-fidelity learning management ecosystem customized for Nepali academic institutions, vocational centers, and corporate structures. By leveraging structured modular systems, Cogknit structures complex learning pathways, tracks progress, and ensures educational outcomes meet modern institutional benchmarks.',
          features: [
            { title: 'Intelligent Knowledge Management', desc: 'Centralize institutional resources in a highly structured knowledge repository.' },
            { title: 'Adaptive Learning Pathways',       desc: 'Custom curricula designed to adapt dynamically based on learner pace and metrics.' },
            { title: 'Offline-First Capabilities',       desc: 'Optimized for high-performance usage across various network densities in Nepal.' },
            { title: 'Advanced Institutional Analytics', desc: 'Empowering leaders with deep reports on learner outcomes and teaching indices.' },
          ],
          solutions: [
            { name: 'Higher Education Suite',        audience: 'Universities & colleges seeking to digitize syllabi and class interactions.' },
            { name: 'Technical & Vocational Training', desc: 'Empowering specialized skills development through step-by-step progress tracking.' },
          ],
          impact: 'Empowered over 150+ institutions with 85% higher retention compared to traditional learning systems.',
        };
      case 'sip':
        return {
          title: 'SIP',
          tagline: 'Connecting industries, institutions, and community networks.',
          overviewText: 'SIP (Strategic Integration & Partnerships) is the collaborative bridge of SUMS Nepal. It aligns academia with industrial demands, ensuring students build direct networks with potential employers while universities receive curriculum recommendations based on current market trends.',
          features: [
            { title: 'Industry-Academia Board',         desc: 'A workspace facilitating joint development boards, internships, and curriculum audits.' },
            { title: 'Multidisciplinary Collaboration', desc: 'Host international and domestic partnerships across educational sectors.' },
            { title: 'Strategic Engagement Tracking',   desc: 'Organize workshops, corporate bootcamps, and certification tracking.' },
            { title: 'Resource Sharing Pipeline',       desc: 'Allow institutional stakeholders to share research papers and industrial tools.' },
          ],
          solutions: [
            { name: 'Joint Research Incubator',      audience: 'Bringing international researchers and local faculties together.' },
            { name: 'Industrial Placement Program',  desc: 'Active pipelines aligning local coding talents directly to global remote tech teams.' },
          ],
          impact: 'Coordinated 45+ international institutional programs and secured over 600+ industrial apprenticeships.',
        };
      case 'academia':
        return {
          title: 'Academia',
          tagline: 'Modernizing student information, grading, and syllabus planning.',
          overviewText: 'Academia handles the operational core of educational spaces. It tracks registrar statistics, automates complex grading systems, designs and delivers academic syllabus standards, and structures communication channels for parents, professors, and administration.',
          features: [
            { title: 'Registrar & Student Life Record',  desc: 'High-availability storage for attendance, student registry, and alumni stats.' },
            { title: 'Flexible Grading Architecture',   desc: 'Custom grading rules supporting diverse university standards in Nepal.' },
            { title: 'Syllabus & Course Coordinator',   desc: 'Digitized class scheduling, assignment tracking, and course progress maps.' },
            { title: 'Parent-Institution Portal',        desc: 'Direct channels conveying child progress, reports, and attendance.' },
          ],
          solutions: [
            { name: 'K-12 Modernization Portal',     audience: 'Schools transitioning from manual grading register systems.' },
            { name: 'University Registrar Engine',    desc: 'Scalable student lifecycles tracking transcripts, courses, and fees.' },
          ],
          impact: 'Published 320+ academic papers and updated teaching curricula for 12 major colleges in Nepal.',
        };
      case 'aic':
      default:
        return {
          title: 'AIC',
          tagline: 'Accelerating entrepreneurship and local skill incubation.',
          overviewText: 'The Accelerated Innovation Center (AIC) is the dynamic engine of SUMS. It hosts young entrepreneurs, coordinates creative workspaces, provides access to startup capital networks, and runs localized intensive design workshops to boost youth employment.',
          features: [
            { title: 'Startup Incubator Workspace', desc: 'Mentorship pipelines for early-stage social and technological startups.' },
            { title: 'Employment Support Hub',       desc: 'A portal analyzing market gaps and preparing trainees for digital employment.' },
            { title: 'Creative Innovation Labs',     desc: 'Intensive courses covering UI/UX, product development, and green energy.' },
            { title: 'Investor Pitch Network',       desc: 'Link outstanding local initiatives directly to global capital and impact funds.' },
          ],
          solutions: [
            { name: 'Incubation Program',          audience: 'For post-graduates and local innovators seeking venture development support.' },
            { name: 'Vocational Up-skilling Camp', desc: 'Fast-paced courses addressing current employment requirements.' },
          ],
          impact: 'Incubated 28 local startups, raising over 50M NPR in seed investments and generating 200+ local jobs.',
        };
    }
  };

  const details = getPlatformDetails();

  // Scroll transition progress: 0.0 (fully centered) to 1.0 (fully left-aligned) over 300px
  const layoutProgress = Math.min(1.0, detailScrollY / 300);

  // Left offset transitions from 50vw (centered) to 22.5vw (centered on the left column)
  const leftOffsetVal = `calc(50vw - ${layoutProgress * 27.5}vw)`;

  return (
    <div ref={containerRef} className="relative w-full text-white">
      {/* ─── STICKY HEADER AREA WITH CENTERED ORBIT (SLIDES LEFT ON SCROLL) ─────────────────── */}
      <div 
        style={{ left: leftOffsetVal }}
        className="sticky top-0 h-screen w-0 flex items-center justify-center pointer-events-none z-20 transition-all duration-75 ease-out"
      >
        {/* Orbit ring */}
        <div className="absolute w-[300px] h-[300px] md:w-[380px] md:h-[380px] rounded-full border border-dashed border-white/8" />

        {/* Dynamic Connector SVG Line */}
        <svg viewBox="0 0 100 100" className="absolute w-[300px] h-[300px] md:w-[380px] md:h-[380px] pointer-events-none overflow-visible z-30">
          {(() => {
            const activeSec = sectionLayout.find(s => s.id === activeSection);
            if (!activeSec) return null;
            const radians = (activeSec.angle * Math.PI) / 180;
            const r = 45.5; // proportional radius
            const x2 = 50 + Math.cos(radians) * r;
            const y2 = 50 + Math.sin(radians) * r;
            
            return (
              <g>
                <line 
                  x1="50" 
                  y1="50" 
                  x2={x2} 
                  y2={y2} 
                  stroke="rgba(253, 68, 0, 0.2)" 
                  strokeWidth="0.5" 
                  strokeDasharray="1.5 1.5"
                  style={{ transition: 'all 0.5s cubic-bezier(0.25, 1, 0.5, 1)' }}
                />
                <line 
                  x1="50" 
                  y1="50" 
                  x2={x2} 
                  y2={y2} 
                  stroke="#FD4400" 
                  strokeWidth="0.75" 
                  strokeLinecap="round"
                  opacity="0.8"
                  style={{ 
                    transition: 'all 0.5s cubic-bezier(0.25, 1, 0.5, 1)',
                    filter: 'drop-shadow(0 0 2px rgba(253, 68, 0, 0.8))'
                  }}
                />
              </g>
            );
          })()}
        </svg>

        {/* Circular orbit buttons */}
        <div className="absolute w-[300px] h-[300px] md:w-[380px] md:h-[380px]">
          {sectionLayout.map((sec) => {
            const radians = (sec.angle * Math.PI) / 180;
            const radius = typeof window !== 'undefined' && window.innerWidth < 768 ? 135 : 175;
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
                className={`absolute pointer-events-auto z-40 px-3 py-1.5 rounded-full text-[9px] md:text-[10px] font-semibold uppercase tracking-wider transition-all duration-300 cursor-pointer whitespace-nowrap ${
                  isActive
                    ? 'bg-[#FD4400] text-white border border-[#FD4400] scale-110 shadow-[0_0_12px_rgba(253,68,0,0.5)]'
                    : 'bg-[#040507]/90 text-white/50 border border-white/10 hover:border-[#FD4400]/40 hover:text-white'
                }`}
              >
                {isActive && (
                  <span className="absolute inset-0 rounded-full bg-[#FD4400]/45 animate-ping pointer-events-none" style={{ animationDuration: '2s' }} />
                )}
                {sec.label}
              </button>
            );
          })}
        </div>
      </div>

      {/* ─── SCROLLABLE CONTENT AREA overlaying the centered scene ───── */}
      <div className="relative w-full z-10 -mt-[100vh] flex justify-end">
        {/* Spacer so the first section starts below the viewport */}
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
            
            {/* OVERVIEW */}
            <motion.section
              id="overview"
              className="scroll-mt-32"
              initial={{ opacity: 0, y: 32 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-12%" }}
              transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            >
              <span className="text-[#FD4400] text-[10px] font-semibold tracking-[0.25em] uppercase block mb-3">
                01 / Platform Overview
              </span>
              <h1 className="font-serif text-2xl md:text-4xl font-medium text-white leading-tight mb-4">
                {details.tagline}
              </h1>
              <p className="text-white/60 text-sm md:text-base leading-relaxed">
                {details.overviewText}
              </p>
            </motion.section>

            {/* FEATURES */}
            <motion.section 
              id="features" 
              className="scroll-mt-32 border-t border-white/5 pt-12"
              initial={{ opacity: 0, y: 32 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-12%" }}
              transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            >
              <span className="text-[#FD4400] text-[10px] font-semibold tracking-[0.25em] uppercase block mb-3">
                02 / Platform Capabilities
              </span>
              <h2 className="font-serif text-xl md:text-3xl font-medium text-white mb-8">
                Key Features & Architectural Highlights
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {details.features.map((feat, idx) => (
                  <div key={idx} className="border-l border-[#FD4400]/30 pl-4 hover:border-[#FD4400] transition-colors duration-300">
                    <h3 className="font-serif text-base font-semibold text-white mb-1">{feat.title}</h3>
                    <p className="text-white/50 text-sm">{feat.desc}</p>
                  </div>
                ))}
              </div>
            </motion.section>

            {/* SOLUTIONS */}
            <motion.section 
              id="solutions" 
              className="scroll-mt-32 border-t border-white/5 pt-12"
              initial={{ opacity: 0, y: 32 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-12%" }}
              transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            >
              <span className="text-[#FD4400] text-[10px] font-semibold tracking-[0.25em] uppercase block mb-3">
                03 / Institutional Solutions
              </span>
              <h2 className="font-serif text-xl md:text-3xl font-medium text-white mb-8">
                Tailored Ecosystem Workflows
              </h2>
              <div className="space-y-4">
                {details.solutions.map((sol, idx) => (
                  <div key={idx} className="border border-white/5 p-5 rounded-xl bg-white/[0.01]">
                    <h3 className="text-white font-semibold text-base mb-1">{sol.name}</h3>
                    <p className="text-white/50 text-sm">{sol.audience || (sol as any).desc}</p>
                  </div>
                ))}
              </div>
            </motion.section>

            {/* IMPACT */}
            <motion.section 
              id="impact" 
              className="scroll-mt-32 border-t border-white/5 pt-12"
              initial={{ opacity: 0, y: 32 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-12%" }}
              transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            >
              <span className="text-[#FD4400] text-[10px] font-semibold tracking-[0.25em] uppercase block mb-3">
                04 / Ecosystem Impact
              </span>
              <h2 className="font-serif text-xl md:text-3xl font-medium text-white mb-6">
                Proven Outcomes & Statistics
              </h2>
              <p className="text-white/70 text-base md:text-lg font-serif italic leading-relaxed">
                {details.impact}
              </p>
            </motion.section>

            {/* PARTNERS */}
            <motion.section 
              id="partners" 
              className="scroll-mt-32 border-t border-white/5 pt-12"
              initial={{ opacity: 0, y: 32 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-12%" }}
              transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            >
              <span className="text-[#FD4400] text-[10px] font-semibold tracking-[0.25em] uppercase block mb-3">
                05 / Network Partners
              </span>
              <h2 className="font-serif text-xl md:text-3xl font-medium text-white mb-6">
                Collaborating Institutions
              </h2>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-center">
                {['Tribhuvan University', 'Kathmandu University', 'Pokhara University', 'Purbanchal University'].map((univ, idx) => (
                  <div key={idx} className="border border-white/5 p-4 rounded-lg bg-white/[0.01] text-xs font-semibold uppercase tracking-wider text-white/50">
                    {univ}
                  </div>
                ))}
              </div>
            </motion.section>

            {/* TESTIMONIALS */}
            <motion.section 
              id="testimonials" 
              className="scroll-mt-32 border-t border-white/5 pt-12"
              initial={{ opacity: 0, y: 32 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-12%" }}
              transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            >
              <span className="text-[#FD4400] text-[10px] font-semibold tracking-[0.25em] uppercase block mb-3">
                06 / Testimonials
              </span>
              <h2 className="font-serif text-xl md:text-3xl font-medium text-white mb-6">
                Feedback from the Field
              </h2>
              <div className="border border-white/5 p-6 rounded-xl bg-white/[0.01] space-y-4">
                <p className="text-white/85 text-base font-serif italic leading-relaxed">
                  "Integrating this ecosystem upgraded our academic workflow significantly. We now easily sync class syllabus pathways directly with active local industry internship modules, facilitating direct employment for our seniors."
                </p>
                <div>
                  <span className="block text-white font-semibold text-sm">Dr. Ramesh Adhikari</span>
                  <span className="block text-white/40 text-[10px] uppercase tracking-wider">Dean of Information Systems, TU</span>
                </div>
              </div>
            </motion.section>

            {/* CONTACT */}
            <motion.section 
              id="contact" 
              className="scroll-mt-32 border-t border-white/5 pt-12 pb-12"
              initial={{ opacity: 0, y: 32 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-12%" }}
              transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            >
              <span className="text-[#FD4400] text-[10px] font-semibold tracking-[0.25em] uppercase block mb-3">
                07 / Connect
              </span>
              <h2 className="font-serif text-xl md:text-3xl font-medium text-white mb-6">
                Integrate {details.title} into your Institution
              </h2>
              <div className="space-y-6">
                <div className="space-y-3 text-white/75 text-sm">
                  <p>Explore how the {details.title} platform can be adapted to fulfill your specific curriculum, workspace, or training requirements.</p>
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

                <form onSubmit={(e) => e.preventDefault()} className="space-y-3">
                  <input
                    type="text"
                    placeholder="Institution Name"
                    className="w-full bg-white/[0.03] border border-white/10 focus:border-[#FD4400]/70 px-4 py-3 rounded text-sm outline-none transition-all duration-300"
                  />
                  <input
                    type="email"
                    placeholder="Official Email Address"
                    className="w-full bg-white/[0.03] border border-white/10 focus:border-[#FD4400]/70 px-4 py-3 rounded text-sm outline-none transition-all duration-300"
                  />
                  <textarea
                    rows={3}
                    placeholder="Briefly state your requirements"
                    className="w-full bg-white/[0.03] border border-white/10 focus:border-[#FD4400]/70 px-4 py-3 rounded text-sm outline-none transition-all duration-300"
                  />
                  <button
                    type="submit"
                    className="w-full bg-[#FD4400] hover:bg-[#FD4400]/90 text-white font-semibold text-xs uppercase tracking-wider py-3 rounded transition-all duration-300 cursor-pointer"
                  >
                    Submit Inquiry
                  </button>
                </form>
              </div>
            </motion.section>

          </div>
        </div>
      </div>
    </div>
  );
};
