import type { SectionDef } from '../types';

export { AIC_LOGOS, SIP_LOGOS } from './logos';

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
