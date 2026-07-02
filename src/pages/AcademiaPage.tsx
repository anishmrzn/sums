import { useAppState } from '../hooks/useAppState';
import { Seo } from '../components/layout/Seo';
import { Navbar } from '../components/layout/Navbar';
import { SolarSystemScene } from '../components/solar/SolarSystemScene';
import { HeroSection } from '../components/sections/HeroSection';
import { CrisisSection } from '../components/sections/CrisisSection';
import { SolutionsSection } from '../components/sections/SolutionsSection';
import { EcosystemSection } from '../components/sections/EcosystemSection';
import { ImpactSection } from '../components/sections/ImpactSection';
import { ContactSection } from '../components/sections/ContactSection';
import { CaseStudiesSection } from '../components/case-studies/CaseStudiesSection';
import { PlatformDetail } from '../components/platform/PlatformDetail';
import { MobilePlatformSelector } from '../components/ui/MobilePlatformSelector';
import { ScrollNudge } from '../components/ui/ScrollNudge';

function AcademiaPage() {
  const {
    scrollProgress, hideCanvas, ecosystemRevealed, ecosystemPhase,
    pastTour, activePlatform, zoomingPlatform, detailScrollY,
    handleSelectPlatform, handleBackToEcosystem, handleNavigate,
  } = useAppState();

  type PageKey = 'academia' | 'cogknit' | 'sip' | 'aic';
  const seoPage: PageKey =
    activePlatform === 'cogknit' || activePlatform === 'sip' || activePlatform === 'aic'
      ? activePlatform
      : 'academia';

  return (
    <div className="bg-[#040507] text-white relative font-sans selection:bg-brand selection:text-white min-h-screen">
      <Seo page={seoPage} />

      <SolarSystemScene
        scrollProgress={scrollProgress}
        activePlatform={activePlatform}
        zoomingPlatform={zoomingPlatform}
        detailScrollY={detailScrollY}
        onSelectPlatform={handleSelectPlatform}
        ecosystemRevealed={ecosystemRevealed}
        hideCanvas={hideCanvas}
      />

      <Navbar
        activePlatform={activePlatform}
        onBackToEcosystem={handleBackToEcosystem}
        onNavigate={handleNavigate}
      />

      <div className="relative z-10 w-full pointer-events-none">
        {!activePlatform && (
          <div>
            <HeroSection />
            <div id="crisis-section"><CrisisSection /></div>
            <SolutionsSection />
            <EcosystemSection ecosystemPhase={ecosystemPhase} />
            <MobilePlatformSelector onSelectPlatform={handleSelectPlatform} />
            <div className="w-full relative pointer-events-auto pt-12 pb-24 border-t border-white/5 bg-[#040507]">
              <ImpactSection />
              <CaseStudiesSection />
              <ContactSection />
            </div>
            <ScrollNudge pastTour={pastTour} />
          </div>
        )}

        {activePlatform && (
          <div className="w-full relative pointer-events-auto">
            <div className="relative z-20">
              <PlatformDetail platformId={activePlatform} detailScrollY={detailScrollY} />
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default AcademiaPage;
