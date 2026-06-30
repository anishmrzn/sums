export interface SectionDef {
  id: string;
  label: string;
  angle: number;
}

export interface CaseStudy {
  tag: string;
  title: string;
  description: string;
  gradient: string;
  accentColor: string;
  pdfUrl: string;
  qrUrl: string;
}

export type PlatformId = 'cogknit' | 'sip' | 'aic';
