import HeroScrollSequence from '@/components/HeroScrollSequence';
import MarketingSection from '@/components/MarketingSection';

export default function Home() {
  return (
    <main className="relative min-h-screen overflow-x-hidden noise">
      <HeroScrollSequence />
      <div className="site-hero-blur-bridge" aria-hidden />
      <MarketingSection />
    </main>
  );
}
