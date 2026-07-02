import React, { useState } from 'react';
import { AnimatePresence } from 'framer-motion';
import type { CaseStudy } from '../../types';
import { MobileCaseStudies } from './MobileCaseStudies';
import { DesktopCaseStudies } from './DesktopCaseStudies';
import { CaseStudyModal } from './CaseStudyModal';

export const CaseStudiesSection: React.FC = () => {
  const [isMobile, setIsMobile] = useState(() => typeof window !== 'undefined' && window.innerWidth < 1024);
  const [modalCs, setModalCs] = useState<CaseStudy | null>(null);

  React.useEffect(() => {
    const check = () => setIsMobile(window.innerWidth < 1024);
    window.addEventListener('resize', check);
    return () => window.removeEventListener('resize', check);
  }, []);

  return (
    <>
      {isMobile
        ? <MobileCaseStudies onOpen={setModalCs} />
        : <DesktopCaseStudies onOpen={setModalCs} />
      }
      <AnimatePresence>
        {modalCs && <CaseStudyModal cs={modalCs} onClose={() => setModalCs(null)} />}
      </AnimatePresence>
    </>
  );
};
