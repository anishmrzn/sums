export const FADE_UP = {
  initial:     { opacity: 0, y: 32 },
  whileInView: { opacity: 1, y: 0 },
  viewport:    { once: true, margin: '-12%' } as const,
  transition:  { duration: 0.8, ease: [0.16, 1, 0.3, 1] as const },
};
