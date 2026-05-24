import { Navbar } from './components/Navbar';
import { HeroSection } from './components/HeroSection';
import { WelcomeSection } from './components/WelcomeSection';
import { ServicesGrid } from './components/ServicesGrid';
import { AboutSection } from './components/AboutSection';
import { StatsSection } from './components/StatsSection';
import { NewsSection } from './components/NewsSection';
import { CTABanner } from './components/CTABanner';
import { Footer } from './components/Footer';

function App() {
  return (
    <div className="relative min-h-screen bg-[#f5f2ee] font-sans text-[#101010]">
      <Navbar />
      <HeroSection />
      <div className="relative z-20 bg-[#f5f2ee]">
        <WelcomeSection />
        <ServicesGrid />
        <AboutSection />
        <StatsSection />
        <NewsSection />
        <CTABanner />
        <Footer />
      </div>
    </div>
  );
}

export default App;
