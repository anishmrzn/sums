import type { SectionDef } from '../types';

export const AIC_LOGOS: string[] = [
  '/logos/6.png', '/logos/7.png', '/logos/8.png', '/logos/9.png',
  '/logos/10.png', '/logos/11.png', '/logos/12.png', '/logos/13.png',
];

export const SIP_LOGOS: string[] = [
  '/logos/14.png', '/logos/15.png', '/logos/16.png', '/logos/17.png',
  '/logos/18.png', '/logos/10.png', '/logos/11.png', '/logos/12.png',
];

export const PLATFORM_SECTIONS: Record<string, SectionDef[]> = {
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

export const PLATFORM_LOGOS: Record<string, string> = {
  aic:     '/logos/aic_logo.png',
  sip:     '/logos/sip_logo.png',
  cogknit: '/cogknitlogo.png',
};
