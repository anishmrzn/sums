import React, { useState } from 'react';

export const MainContactForm: React.FC = () => {
  const [fields, setFields] = useState({ name: '', email: '', phone: '', subject: '', message: '' });
  const [status, setStatus] = useState<'idle' | 'sending' | 'sent' | 'error'>('idle');

  const set = (k: keyof typeof fields) =>
    (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) =>
      setFields(f => ({ ...f, [k]: e.target.value }));

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus('sending');
    try {
      const res = await fetch('https://formsubmit.co/ajax/abemaharjan@gmail.com', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
        body: JSON.stringify({
          name: fields.name,
          email: fields.email,
          phone: fields.phone || 'Not provided',
          subject: fields.subject,
          message: fields.message,
          _subject: `[SUMS] New message: ${fields.subject}`,
        }),
      });
      const data = await res.json();
      if (data.success) {
        setStatus('sent');
        setFields({ name: '', email: '', phone: '', subject: '', message: '' });
      } else {
        setStatus('error');
      }
    } catch {
      setStatus('error');
    }
  };

  if (status === 'sent') {
    return (
      <div className="flex flex-col items-center justify-center py-16 gap-4">
        <div className="w-14 h-14 rounded-full bg-[#FF5C00]/15 border border-[#FF5C00]/40 flex items-center justify-center">
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#FF5C00" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
            <polyline points="20 6 9 17 4 12" />
          </svg>
        </div>
        <h4 className="text-white font-bold text-lg">Message Sent!</h4>
        <p className="text-white/50 text-sm">We'll get back to you shortly.</p>
        <button onClick={() => setStatus('idle')} className="text-[#FF5C00] text-sm underline cursor-pointer mt-2">
          Send another message
        </button>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-5">
      <div className="flex flex-col gap-2">
        <label className="text-white/60 text-sm font-medium">Your Name</label>
        <input type="text" placeholder="John Doe" value={fields.name} onChange={set('name')} required
          className="bg-white/[0.04] border border-white/10 focus:border-[#FF5C00]/50 rounded-xl px-5 py-3.5 text-white text-base outline-none transition-colors duration-200 placeholder:text-white/25" />
      </div>
      <div className="flex flex-col gap-2">
        <label className="text-white/60 text-sm font-medium">Email Address</label>
        <input type="email" placeholder="john@example.com" value={fields.email} onChange={set('email')} required
          className="bg-white/[0.04] border border-white/10 focus:border-[#FF5C00]/50 rounded-xl px-5 py-3.5 text-white text-base outline-none transition-colors duration-200 placeholder:text-white/25" />
      </div>
      <div className="flex flex-col gap-1.5">
        <div className="flex items-baseline gap-2">
          <label className="text-white/60 text-sm font-medium">Phone Number</label>
          <span className="text-white/30 text-xs">(optional)</span>
        </div>
        <input type="tel" placeholder="98XXXXXXXX" value={fields.phone} onChange={set('phone')}
          className="bg-white/[0.04] border border-white/10 focus:border-[#FF5C00]/50 rounded-xl px-5 py-3.5 text-white text-base outline-none transition-colors duration-200 placeholder:text-white/25" />
        <span className="text-white/30 text-xs mt-0.5">Exactly 10 digits if provided.</span>
      </div>
      <div className="flex flex-col gap-2">
        <label className="text-white/60 text-sm font-medium">Subject</label>
        <input type="text" placeholder="General Inquiry" value={fields.subject} onChange={set('subject')} required
          className="bg-white/[0.04] border border-white/10 focus:border-[#FF5C00]/50 rounded-xl px-5 py-3.5 text-white text-base outline-none transition-colors duration-200 placeholder:text-white/25" />
      </div>
      <div className="flex flex-col gap-2">
        <label className="text-white/60 text-sm font-medium">Message</label>
        <textarea rows={6} placeholder="How can we help?" value={fields.message} onChange={set('message')} required
          className="bg-white/[0.04] border border-white/10 focus:border-[#FF5C00]/50 rounded-xl px-5 py-3.5 text-white text-base outline-none transition-colors duration-200 placeholder:text-white/25 resize-none" />
      </div>
      {status === 'error' && (
        <p className="text-red-400 text-sm">Something went wrong. Please try again.</p>
      )}
      <button type="submit" disabled={status === 'sending'}
        className="mt-1 w-full bg-[#FF5C00] hover:bg-[#e04f00] disabled:opacity-60 text-white font-bold text-base py-4 rounded-xl transition-all duration-300 hover:shadow-[0_0_24px_rgba(255,92,0,0.35)] cursor-pointer tracking-wide">
        {status === 'sending' ? 'Sending…' : 'Submit Message'}
      </button>
    </form>
  );
};
