import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Mail, Phone, MapPin } from 'lucide-react';
import { FADE_UP } from '../../utils/animations';

export const PlatformContactForm: React.FC<{ title: string }> = ({ title }) => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [status, setStatus] = useState<'idle' | 'sending' | 'sent' | 'error'>('idle');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus('sending');
    try {
      const res = await fetch('https://formsubmit.co/ajax/abemaharjan@gmail.com', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
        body: JSON.stringify({
          name,
          email,
          message,
          _subject: `[SUMS ${title}] New contact message`,
        }),
      });
      const data = await res.json();
      if (data.success) {
        setStatus('sent');
        setName(''); setEmail(''); setMessage('');
      } else {
        setStatus('error');
      }
    } catch {
      setStatus('error');
    }
  };

  return (
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
            <span>Lalitpur, Nepal</span>
          </div>
          <div className="flex items-center space-x-3 text-white/60">
            <Phone size={14} className="text-[#FD4400] shrink-0" />
            <a href="tel:+9779823299362" className="hover:text-white transition-colors">+977 982-3299362</a>
          </div>
          <div className="flex items-center space-x-3 text-white/60">
            <Mail size={14} className="text-[#FD4400] shrink-0" />
            <a href="mailto:abinesh.maharjan@sumsnepal.com" className="hover:text-white transition-colors break-all">abinesh.maharjan@sumsnepal.com</a>
          </div>
        </div>
        {status === 'sent' ? (
          <div className="p-4 rounded border border-[#FD4400]/30 bg-[#FD4400]/10 text-[#FD4400] text-sm text-center">
            Message sent! We'll be in touch soon.
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-3">
            <input
              type="text"
              placeholder="Your Name / Institution"
              value={name}
              onChange={e => setName(e.target.value)}
              required
              className="w-full bg-white/[0.03] border border-white/10 focus:border-[#FD4400]/70 px-4 py-3 rounded text-sm outline-none transition-all duration-300 text-white placeholder:text-white/30"
            />
            <input
              type="email"
              placeholder="Official Email Address"
              value={email}
              onChange={e => setEmail(e.target.value)}
              required
              className="w-full bg-white/[0.03] border border-white/10 focus:border-[#FD4400]/70 px-4 py-3 rounded text-sm outline-none transition-all duration-300 text-white placeholder:text-white/30"
            />
            <textarea
              rows={3}
              placeholder="How can we help you?"
              value={message}
              onChange={e => setMessage(e.target.value)}
              required
              className="w-full bg-white/[0.03] border border-white/10 focus:border-[#FD4400]/70 px-4 py-3 rounded text-sm outline-none transition-all duration-300 text-white placeholder:text-white/30"
            />
            {status === 'error' && (
              <p className="text-red-400 text-xs">Something went wrong. Please try again.</p>
            )}
            <button
              type="submit"
              disabled={status === 'sending'}
              className="w-full bg-[#FD4400] hover:bg-[#FD4400]/90 disabled:opacity-60 text-white font-semibold text-xs uppercase tracking-wider py-3 rounded transition-all duration-300 cursor-pointer"
            >
              {status === 'sending' ? 'Sending…' : 'Send Message'}
            </button>
          </form>
        )}
      </div>
    </motion.section>
  );
};
