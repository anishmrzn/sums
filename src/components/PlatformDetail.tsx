import React, { useEffect, useState, useRef } from 'react';
import { motion, useScroll, useTransform, useMotionValueEvent } from 'framer-motion';
import { Mail, Phone, MapPin } from 'lucide-react';

interface PlatformDetailProps {
  platformId: string;
  activeSection: string;
  onActiveSectionChange: (section: string) => void;
}

interface Section {
  id: string;
  label: string;
}

const sections: Section[] = [
  { id: 'overview', label: 'Overview' },
  { id: 'features', label: 'Features' },
  { id: 'solutions', label: 'Solutions' },
  { id: 'impact', label: 'Impact' },
  { id: 'partners', label: 'Partners' },
  { id: 'testimonials', label: 'Testimonials' },
  { id: 'contact', label: 'Contact' },
];

const sectionLayout = [
  { id: 'impact', label: 'Impact', angle: 0 },
  { id: 'testimonials', label: 'Testimonials', angle: 45 },
  { id: 'partners', label: 'Partners', angle: 135 },
  { id: 'overview', label: 'Overview', angle: 180 },
  { id: 'features', label: 'Features', angle: 225 },
  { id: 'contact', label: 'Contact', angle: 270 },
  { id: 'solutions', label: 'Solutions', angle: 315 }
];

interface OrbitMenuWrapperProps {
  platformScale: any;
  platformOpacity: any;
  platformBlur: any;
  activeSection: string;
  scrollToSection: (id: string) => void;
}

const OrbitMenuWrapper: React.FC<OrbitMenuWrapperProps> = ({
  platformScale,
  platformOpacity,
  platformBlur,
  activeSection,
  scrollToSection
}) => {
  const pointerEvents = useTransform(platformOpacity, (val: any) => Number(val) > 0.05 ? "auto" : "none");

  return (
    <motion.div
      style={{
        scale: platformScale,
        opacity: platformOpacity,
        filter: platformBlur,
        pointerEvents: pointerEvents as any
      }}
      className="absolute w-[320px] h-[320px] md:w-[420px] md:h-[420px]"
    >
      {/* Circular Orbit ring path */}
      <div className="absolute inset-0 rounded-full border border-dashed border-white/5" />

      {sectionLayout.map((sec) => {
        const radians = (sec.angle * Math.PI) / 180;
        const radius = window.innerWidth < 768 ? 145 : 195;
        const x = Math.cos(radians) * radius;
        const y = Math.sin(radians) * radius;

        const isActive = activeSection === sec.id;

        return (
          <button
            key={sec.id}
            onClick={() => scrollToSection(sec.id)}
            style={{
              left: `calc(50% + ${x}px)`,
              top: `calc(50% + ${y}px)`,
              transform: 'translate(-50%, -50%)',
            }}
            className={`absolute pointer-events-auto z-40 px-3.5 py-1.5 rounded-full text-[10px] md:text-xs font-semibold uppercase tracking-wider transition-all duration-300 cursor-pointer ${
              isActive
                ? 'bg-[#FD4400] text-white border border-[#FD4400] scale-110 shadow-[0_0_12px_rgba(253,68,0,0.5)] font-bold'
                : 'bg-[#040507]/90 text-white/50 border border-white/10 hover:border-[#FD4400]/40 hover:text-white'
            }`}
          >
            {sec.label}
          </button>
        );
      })}
    </motion.div>
  );
};

export const PlatformDetail: React.FC<PlatformDetailProps> = ({ 
  platformId, 
  activeSection, 
  onActiveSectionChange 
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [showOrbitMenu, setShowOrbitMenu] = useState(true);
  
  // Custom scroll linking for the circular navigation
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"]
  });

  // Scale down, fade out, and blur the platform node quickly once user starts reading
  const platformScale = useTransform(scrollYProgress, [0, 0.12], [1, 0.8]);
  const platformOpacity = useTransform(scrollYProgress, [0, 0.08, 0.12], [1, 0.5, 0]);
  const platformBlur = useTransform(scrollYProgress, [0, 0.1], ["blur(0px)", "blur(20px)"]);
  const platformY = useTransform(scrollYProgress, [0, 0.12], [0, -40]);
  const sideNavOpacity = useTransform(scrollYProgress, [0, 0.15], [0, 1]);

  // Fully unmount the orbit menu once past threshold — prevents sticky snap-back visibility
  useMotionValueEvent(scrollYProgress, 'change', (latest) => {
    setShowOrbitMenu(latest < 0.13);
  });

  // Handle active section on scroll
  useEffect(() => {
    const handleScroll = () => {
      const scrollPos = window.scrollY + window.innerHeight * 0.45;
      
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

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [onActiveSectionChange]);

  const scrollToSection = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  // Get metadata details for the selected platform
  const getPlatformDetails = () => {
    switch (platformId) {
      case 'cogknit':
        return {
          title: 'Cogknit',
          tagline: 'Empowering institutions with next-generation smart learning frameworks.',
          overviewText: 'Cogknit is a high-fidelity learning management ecosystem customized for Nepali academic institutions, vocational centers, and corporate structures. By leveraging structured modular systems, Cogknit structures complex learning pathways, tracks progress, and ensures educational outcomes meet modern institutional benchmarks.',
          features: [
            { title: 'Intelligent Knowledge Management', desc: 'Centralize institutional resources in a highly structured knowledge repository.' },
            { title: 'Adaptive Learning Pathways', desc: 'Custom curricula designed to adapt dynamically based on learner pace and metrics.' },
            { title: 'Offline-First Capabilities', desc: 'Optimized for high-performance usage across various network densities in Nepal.' },
            { title: 'Advanced Institutional Analytics', desc: 'Empowering leaders with deep reports on learner outcomes and teaching indices.' }
          ],
          solutions: [
            { name: 'Higher Education Suite', audience: 'Universities & colleges seeking to digitize syllabi and class interactions.' },
            { name: 'Technical & Vocational Training', desc: 'Empowering specialized skills development through step-by-step progress tracking.' }
          ],
          impact: 'Empowered over 150+ institutions with 85% higher retention compared to traditional learning systems.'
        };
      case 'sip':
        return {
          title: 'SIP',
          tagline: 'Connecting industries, institutions, and community networks.',
          overviewText: 'SIP (Strategic Integration & Partnerships) is the collaborative bridge of SUMS Nepal. It aligns academia with industrial demands, ensuring students build direct networks with potential employers while universities receive curriculum recommendations based on current market trends.',
          features: [
            { title: 'Industry-Academia Board', desc: 'A workspace facilitating joint development boards, internships, and curriculum audits.' },
            { title: 'Multidisciplinary Collaboration', desc: 'Host international and domestic partnerships across educational sectors.' },
            { title: 'Strategic Engagement Tracking', desc: 'Organize workshops, corporate bootcamps, and certification tracking.' },
            { title: 'Resource Sharing Pipeline', desc: 'Allow institutional stakeholders to share research papers and industrial tools.' }
          ],
          solutions: [
            { name: 'Joint Research Incubator', audience: 'Bringing international researchers and local faculties together.' },
            { name: 'Employer Engagement Pipeline', desc: 'Direct pathway linking graduating talent with active job boards.' }
          ],
          impact: 'Facilitated over 45+ active corporate partnerships and successfully launched 1,200+ direct student placements.'
        };
      case 'academia':
        return {
          title: 'Academia',
          tagline: 'Fostering research integrity and systematic knowledge growth.',
          overviewText: 'Academia by SUMS Nepal provides robust, structured frameworks to drive research and rigorous training. It empowers local faculties, research labs, and academic publishers with global integration standards, promoting peer review frameworks and academic excellence.',
          features: [
            { title: 'Peer Review Infrastructure', desc: 'An intuitive workflow managing journal submissions and academic reviews.' },
            { title: 'Research Grant Tracking', desc: 'Track funding resources, fellowship guidelines, and international research grants.' },
            { title: 'Faculty Training Modules', desc: 'Equip educators with interactive workshop templates and pedagogy resources.' },
            { title: 'Structured Concentric Archives', desc: 'A concentric file and indexing network designed for rapid data retrieval.' }
          ],
          solutions: [
            { name: 'Research Journal Publisher', audience: 'For institutions seeking local journal creation under global indexing.' },
            { name: 'Pedagogy Enhancement Portal', desc: 'Resources focusing on upgrading traditional teaching mechanisms.' }
          ],
          impact: 'Published 320+ academic papers and updated teaching curricula for 12 major colleges in Nepal.'
        };
      case 'aic':
      default:
        return {
          title: 'AIC',
          tagline: 'Accelerating entrepreneurship and local skill incubation.',
          overviewText: 'The Accelerated Innovation Center (AIC) is the dynamic engine of SUMS. It hosts young entrepreneurs, coordinates creative workspaces, provides access to startup capital networks, and runs localized intensive design workshops to boost youth employment.',
          features: [
            { title: 'Startup Incubator Workspace', desc: 'Mentorship pipelines for early-stage social and technological startups.' },
            { title: 'Employment Support Hub', desc: 'A portal analyzing market gaps and preparing trainees for digital employment.' },
            { title: 'Creative Innovation Labs', desc: 'Intensive courses covering UI/UX, product development, and green energy.' },
            { title: 'Investor Pitch Network', desc: 'Link outstanding local initiatives directly to global capital and impact funds.' }
          ],
          solutions: [
            { name: 'Incubation Program', audience: 'For post-graduates and local innovators seeking venture development support.' },
            { name: 'Vocational Up-skilling Camp', desc: 'Fast-paced courses addressing current employment requirements.' }
          ],
          impact: 'Incubated 28 local startups, raising over 50M NPR in seed investments and generating 200+ local jobs.'
        };
    }
  };

  const details = getPlatformDetails();

  return (
    <div ref={containerRef} className="relative w-full min-h-screen pb-20 bg-transparent text-white">
      
      {/* 1. Focused Platform Visualization & Floating Orbit Navigation */}
      <div className="sticky top-0 left-0 right-0 z-30 h-screen flex flex-col items-center justify-center pointer-events-none select-none">
        
        {/* Static 2D Circular Menu — unmounted entirely when not at top */}
        {showOrbitMenu && (
          <OrbitMenuWrapper 
            platformScale={platformScale}
            platformOpacity={platformOpacity}
            platformBlur={platformBlur}
            activeSection={activeSection}
            scrollToSection={scrollToSection}
          />
        )}
      </div>

      {/* 2. Platform Story Content */}
      <div className="relative z-10 max-w-3xl mx-auto px-6 mt-[80vh] space-y-32">
        
        {/* OVERVIEW SECTION */}
        <section id="overview" className="scroll-mt-48">
          <div className="space-y-4">
            <span className="text-brand text-xs font-semibold tracking-[0.25em] uppercase font-sans">
              01 / Platform Overview
            </span>
            <h1 className="font-serif text-3xl md:text-5xl font-medium text-white leading-tight">
              {details.tagline}
            </h1>
            <p className="text-white/60 font-sans text-base md:text-lg leading-relaxed pt-2">
              {details.overviewText}
            </p>
          </div>
        </section>

        {/* FEATURES SECTION */}
        <section id="features" className="scroll-mt-48 border-t border-white/5 pt-16">
          <div className="space-y-6">
            <span className="text-brand text-xs font-semibold tracking-[0.25em] uppercase font-sans">
              02 / Platform Capabilities
            </span>
            <h2 className="font-serif text-2xl md:text-3xl font-medium text-white mb-8">
              Key Features & Architectural Highlights
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 pt-4">
              {details.features.map((feat, idx) => (
                <div key={idx} className="space-y-2 border-l border-brand/30 pl-4 hover:border-brand transition-colors duration-300">
                  <h3 className="font-serif text-lg font-semibold text-white">{feat.title}</h3>
                  <p className="text-white/50 text-sm font-sans">{feat.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* SOLUTIONS SECTION */}
        <section id="solutions" className="scroll-mt-48 border-t border-white/5 pt-16">
          <div className="space-y-6">
            <span className="text-brand text-xs font-semibold tracking-[0.25em] uppercase font-sans">
              03 / Institutional Solutions
            </span>
            <h2 className="font-serif text-2xl md:text-3xl font-medium text-white mb-8">
              Tailored Ecosystem Workflows
            </h2>
            <div className="space-y-6">
              {details.solutions.map((sol, idx) => (
                <div key={idx} className="border border-white/5 hover:border-white/10 p-6 rounded-lg bg-white/[0.01] transition-all duration-300">
                  <h3 className="text-brand text-sm font-bold uppercase tracking-wider mb-2">{sol.name}</h3>
                  <p className="text-white/70 text-base font-sans">
                    {'audience' in sol ? `Focus: ${sol.audience}` : sol.desc}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* IMPACT SECTION */}
        <section id="impact" className="scroll-mt-48 border-t border-white/5 pt-16">
          <div className="space-y-6">
            <span className="text-brand text-xs font-semibold tracking-[0.25em] uppercase font-sans">
              04 / Measured Impact
            </span>
            <h2 className="font-serif text-2xl md:text-3xl font-medium text-white">
              Institutional Growth & Numbers
            </h2>
            <div className="py-8 px-6 border-y border-white/5 flex flex-col md:flex-row md:items-center justify-between gap-6">
              <div className="space-y-2">
                <span className="text-4xl md:text-5xl font-serif font-bold text-white tracking-tight">
                  {platformId === 'cogknit' ? '150+' : platformId === 'sip' ? '45+' : platformId === 'academia' ? '320+' : '28'}
                </span>
                <p className="text-white/40 text-xs font-semibold uppercase tracking-wider">
                  {platformId === 'cogknit' ? 'Institutions Integrated' : platformId === 'sip' ? 'Corporate Partners' : platformId === 'academia' ? 'Research Papers Published' : 'Startups Incubated'}
                </p>
              </div>
              <div className="max-w-md">
                <p className="text-white/80 font-serif text-lg leading-relaxed italic">
                  "{details.impact}"
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* PARTNERS SECTION */}
        <section id="partners" className="scroll-mt-48 border-t border-white/5 pt-16">
          <div className="space-y-6">
            <span className="text-brand text-xs font-semibold tracking-[0.25em] uppercase font-sans">
              05 / Collaborators
            </span>
            <h2 className="font-serif text-2xl md:text-3xl font-medium text-white mb-6">
              Empowering local & global institutions
            </h2>
            <p className="text-white/50 text-sm font-sans mb-8">
              SUMS Nepal is actively deployed and partnered with premier research organizations, government ministries, vocational training groups, and national universities.
            </p>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
              {['Tribhuvan University', 'Kathmandu University', 'Ministry of Education, Nepal', 'CTEVT', 'Nepal Research Network', 'AIC Global Partners'].map((partner, idx) => (
                <div key={idx} className="border border-white/5 p-4 text-center rounded bg-white/[0.01] flex items-center justify-center min-h-[64px]">
                  <span className="text-white/70 text-xs uppercase tracking-wider font-semibold">{partner}</span>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* TESTIMONIALS SECTION */}
        <section id="testimonials" className="scroll-mt-48 border-t border-white/5 pt-16">
          <div className="space-y-6">
            <span className="text-brand text-xs font-semibold tracking-[0.25em] uppercase font-sans">
              06 / Testimonials
            </span>
            <h2 className="font-serif text-2xl md:text-3xl font-medium text-white">
              Feedback from the Field
            </h2>
            <div className="border border-white/5 p-8 rounded-xl bg-white/[0.01] space-y-4">
              <p className="text-white/85 text-lg font-serif italic leading-relaxed">
                "Integrating this ecosystem upgraded our academic workflow significantly. We now easily sync class syllabus pathways directly with active local industry internship modules, facilitating direct employment for our seniors."
              </p>
              <div>
                <span className="block text-white font-semibold text-sm">Dr. Ramesh Adhikari</span>
                <span className="block text-white/40 text-xs uppercase tracking-wider">Dean of Information Systems, TU</span>
              </div>
            </div>
          </div>
        </section>

        {/* CONTACT SECTION */}
        <section id="contact" className="scroll-mt-48 border-t border-white/5 pt-16 pb-20">
          <div className="space-y-6">
            <span className="text-brand text-xs font-semibold tracking-[0.25em] uppercase font-sans">
              07 / Connect
            </span>
            <h2 className="font-serif text-2xl md:text-3xl font-medium text-white mb-6">
              Integrate {details.title} into your Institution
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="space-y-4 text-white/75 text-sm">
                <p>
                  Explore how the {details.title} platform can be adapted to fulfill your specific curriculum, workspace, or training requirements.
                </p>
                <div className="flex items-center space-x-3 text-white/60">
                  <MapPin size={16} className="text-brand" />
                  <span>Kathmandu, Nepal</span>
                </div>
                <div className="flex items-center space-x-3 text-white/60">
                  <Phone size={16} className="text-brand" />
                  <span>+977 1-4400000</span>
                </div>
                <div className="flex items-center space-x-3 text-white/60">
                  <Mail size={16} className="text-brand" />
                  <span>info@sums.org.np</span>
                </div>
              </div>

              {/* Minimalist Contact form */}
              <form onSubmit={(e) => e.preventDefault()} className="space-y-4">
                <input 
                  type="text" 
                  placeholder="Institution Name" 
                  className="w-full bg-white/[0.03] border border-white/10 focus:border-brand/70 px-4 py-3 rounded text-sm outline-none transition-all duration-300"
                />
                <input 
                  type="email" 
                  placeholder="Official Email Address" 
                  className="w-full bg-white/[0.03] border border-white/10 focus:border-brand/70 px-4 py-3 rounded text-sm outline-none transition-all duration-300"
                />
                <textarea 
                  rows={3}
                  placeholder="Briefly state your requirements" 
                  className="w-full bg-white/[0.03] border border-white/10 focus:border-brand/70 px-4 py-3 rounded text-sm outline-none transition-all duration-300"
                />
                <button 
                  type="submit" 
                  className="w-full bg-brand hover:bg-brand/90 text-white font-semibold text-xs uppercase tracking-wider py-3 rounded transition-all duration-300 cursor-pointer"
                >
                  Submit Inquiry
                </button>
              </form>
            </div>
          </div>
        </section>

      </div>

      {/* Sticky Vertical Dot Navigation (Fades in on scroll) */}
      <motion.div 
        style={{ opacity: sideNavOpacity }}
        className="fixed right-6 md:right-8 top-1/2 -translate-y-1/2 z-40 flex flex-col space-y-4 pointer-events-auto"
      >
        {sections.map((sec) => {
          const isActive = activeSection === sec.id;
          return (
            <button
              key={sec.id}
              onClick={() => scrollToSection(sec.id)}
              className="group flex items-center justify-end space-x-3 text-left focus:outline-none cursor-pointer"
            >
              {/* Tooltip Label (fades in on hover) */}
              <span className={`text-[10px] uppercase tracking-widest font-bold font-sans opacity-0 group-hover:opacity-100 transition-opacity duration-200 select-none whitespace-nowrap ${
                isActive ? 'text-[#FD4400]' : 'text-white/60'
              }`}>
                {sec.label}
              </span>
              
              {/* Indicator Dot */}
              <div className={`w-2 h-2 rounded-full transition-all duration-300 ${
                isActive 
                  ? 'bg-[#FD4400] scale-125 shadow-[0_0_8px_rgba(253,68,0,0.7)]' 
                  : 'bg-white/20 group-hover:bg-white/50'
              }`} />
            </button>
          );
        })}
      </motion.div>
    </div>
  );
};
