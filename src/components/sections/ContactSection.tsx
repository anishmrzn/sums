import React from 'react';
import { motion } from 'framer-motion';
import { Mail, MapPin, Phone } from 'lucide-react';
import { MainContactForm } from '../ui/MainContactForm';

export const ContactSection: React.FC = () => (
  <div id="contact" className="mx-auto px-4 sm:px-6 md:px-8 lg:px-16 xl:px-28 py-10 md:py-16 xl:py-20">
    <motion.div
      initial={{ opacity: 0, y: -20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.5 }}
      transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
      className="flex flex-col items-center text-center max-w-2xl mx-auto mb-12 md:mb-16"
    >
      <div className="flex items-center gap-3 mb-4 justify-center px-4">
        <div className="hidden sm:block w-8 h-[2px] bg-brand flex-shrink-0" />
        <span className="text-brand text-xs sm:text-sm md:text-base font-extrabold tracking-[0.2em] sm:tracking-[0.35em] uppercase font-sans text-center">We Would Love To Hear From You</span>
        <div className="hidden sm:block w-8 h-[2px] bg-brand flex-shrink-0" />
      </div>
      <h2 className="font-sans font-black text-4xl md:text-5xl xl:text-6xl leading-[0.95] tracking-tight text-white">
        Connect <span className="text-brand" style={{ textShadow: '0 0 40px rgba(255,92,0,0.4)' }}>With Us</span>
      </h2>
      <p className="text-white/55 text-base md:text-lg mt-6 leading-relaxed">
        Whether you're a student, partner, or collaborator, we're always open to conversations. Reach out to learn more about the program or explore how you can be part of the journey.
      </p>
      <div className="mt-8 flex items-center gap-3 justify-center w-full">
        <div className="h-[1px] w-12 bg-brand/60" />
        <div className="h-[1px] w-24 bg-white/5" />
        <div className="h-[1px] w-12 bg-brand/60" />
      </div>
    </motion.div>

    <div className="grid grid-cols-1 lg:grid-cols-[max-content_1.4fr_1.9fr] gap-6 items-start">

      <div className="rounded-2xl border border-white/8 bg-white/[0.03] p-5 sm:p-9 flex flex-col gap-8 min-w-0 lg:w-max">
        <h3 className="font-bold text-white text-2xl tracking-tight">Organizing Committee</h3>
        <div className="flex flex-col gap-6 min-w-0">
          <div className="flex items-start gap-2.5 sm:gap-3 lg:gap-2.5 xl:gap-4 text-white/70">
            <MapPin size={20} className="text-brand flex-shrink-0 mt-0.5" />
            <span className="text-xs sm:text-base whitespace-nowrap">Lalitpur, Nepal</span>
          </div>
          <div className="flex items-start gap-2.5 sm:gap-3 lg:gap-2.5 xl:gap-4 text-white/70 min-w-0">
            <Mail size={20} className="text-brand flex-shrink-0 mt-0.5" />
            <div className="flex flex-col gap-1 min-w-0">
              <a href="mailto:abemaharjan@gmail.com" className="text-xs sm:text-base lg:text-sm xl:text-base hover:text-white transition-colors whitespace-nowrap">abemaharjan@gmail.com</a>
              <a href="mailto:abinesh.maharjan@sumsnepal.com" className="text-xs sm:text-base lg:text-sm xl:text-base hover:text-white transition-colors whitespace-nowrap">abinesh.maharjan@sumsnepal.com</a>
            </div>
          </div>
          <div className="flex items-start gap-2.5 sm:gap-3 lg:gap-2.5 xl:gap-4 text-white/70">
            <Phone size={20} className="text-brand flex-shrink-0 mt-0.5" />
            <a href="tel:+9779823299362" className="text-xs sm:text-base lg:text-sm xl:text-base hover:text-white transition-colors whitespace-nowrap">+977 982-3299362</a>
          </div>
        </div>
      </div>

      <div className="rounded-2xl border border-white/8 bg-white/[0.03] p-6 flex flex-col gap-6">
        <div>
          <h3 className="font-bold text-white text-2xl tracking-tight mb-3">Follow the Journey</h3>
          <p className="text-white/50 text-base leading-relaxed">
            Stay updated with real-time announcements on our social handles.
          </p>
        </div>
        <div className="flex items-center gap-2.5 flex-wrap">
          {[
            { label: 'Instagram', href: 'https://www.instagram.com/sumsnepal/?hl=en', path: 'M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z' },
            { label: 'Facebook', href: 'https://www.facebook.com/sumsnepal', path: 'M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z' },
            { label: 'YouTube', href: '#', path: 'M23.495 6.205a3.007 3.007 0 0 0-2.088-2.088c-1.87-.501-9.396-.501-9.396-.501s-7.507-.01-9.396.501A3.007 3.007 0 0 0 .527 6.205a31.247 31.247 0 0 0-.522 5.805 31.247 31.247 0 0 0 .522 5.783 3.007 3.007 0 0 0 2.088 2.088c1.868.502 9.396.502 9.396.502s7.506 0 9.396-.502a3.007 3.007 0 0 0 2.088-2.088 31.247 31.247 0 0 0 .5-5.783 31.247 31.247 0 0 0-.5-5.805zM9.609 15.601V8.408l6.264 3.602z' },
            { label: 'LinkedIn', href: 'https://www.linkedin.com/company/sumsnepal/', path: 'M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z' },
          ].map((s) => (
            <a
              key={s.label}
              href={s.href}
              target={s.href.startsWith('http') ? '_blank' : undefined}
              rel={s.href.startsWith('http') ? 'noopener noreferrer' : undefined}
              aria-label={s.label}
              className="w-11 h-11 rounded-full border border-white/15 hover:border-brand/60 flex items-center justify-center text-white/50 hover:text-brand transition-all duration-300 flex-shrink-0"
            >
              <svg viewBox="0 0 24 24" width="20" height="20" fill="currentColor">
                <path d={s.path} />
              </svg>
            </a>
          ))}
        </div>
      </div>

      <div className="rounded-2xl border border-white/8 bg-white/[0.03] p-9">
        <h3 className="font-bold text-white text-2xl tracking-tight mb-7">Send a Message</h3>
        <MainContactForm />
      </div>

    </div>
  </div>
);
