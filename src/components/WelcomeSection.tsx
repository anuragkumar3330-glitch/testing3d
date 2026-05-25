import { ArrowRight } from 'lucide-react';
import { useEffect, useRef } from 'react';

export const WelcomeSection = () => {
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) entry.target.classList.add('animate-fade-in');
        });
      },
      { threshold: 0.18 }
    );

    const elements = sectionRef.current?.querySelectorAll('.reveal');
    elements?.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, []);

  return (
    <section id="what-we-do" ref={sectionRef} className="scroll-mt-24 bg-[#f5f2ee] px-5 py-24 md:px-12 lg:px-20 relative overflow-hidden">
      
      {/* Decorative Crosshairs (matching emons.de background) */}
      <div className="absolute top-[15%] left-[45%] text-[#101010]/20 pointer-events-none">+</div>
      <div className="absolute top-[35%] left-[25%] text-[#101010]/20 pointer-events-none">+</div>
      <div className="absolute bottom-[20%] left-[10%] text-[#101010]/20 pointer-events-none">+</div>
      <div className="absolute top-[10%] right-[30%] text-[#101010]/20 pointer-events-none">+</div>
      <div className="absolute bottom-[40%] right-[15%] text-[#101010]/20 pointer-events-none">+</div>

      <div className="mx-auto grid max-w-[1400px] grid-cols-1 gap-12 lg:gap-24 lg:grid-cols-[1.1fr_0.9fr] lg:items-center relative z-10">
        {/* Left Column: Massive Heading */}
        <div className="reveal opacity-0">
          <h2 className="text-[44px] md:text-[54px] lg:text-[64px] font-normal leading-[1.05] tracking-tight text-[#101010] max-w-[650px]">
            50 year old legacy.<br />Nationwide presence.<br />Free trade, simplified.
          </h2>
        </div>

        {/* Right Column: Truck + Buttons + Text */}
        <div className="reveal opacity-0 flex flex-col gap-6 mt-8 lg:mt-0">
          
          {/* Truck Image - In document flow but breaking out on the right */}
          <div className="relative w-full flex justify-end mb-4 lg:mb-8">
            <img 
              src="/images/img.png" 
              alt="OSV FTWZ Truck" 
              className="w-[110%] sm:w-[90%] lg:w-[130%] max-w-none object-contain drop-shadow-2xl -mr-[5%] sm:mr-0 lg:-mr-[15%]" 
            />
          </div>
          
          <div className="flex flex-col gap-8 pr-0 lg:pr-10">
            {/* Buttons Row (Emons style: Sleek Pill) */}
            <div className="flex flex-wrap gap-3">
              <a href="#services" className="group flex items-center gap-2 rounded-full bg-[#f24c3d] px-6 py-2.5 text-[14px] font-medium text-white transition-all hover:bg-[#d93a2c]">
                Explore Services
                <ArrowRight size={16} className="transition-transform group-hover:translate-x-1" />
              </a>
              <a href="#connect-with-us" className="group flex items-center gap-2 rounded-full bg-[#f24c3d] px-6 py-2.5 text-[14px] font-medium text-white transition-all hover:bg-[#d93a2c]">
                Contact Experts
                <ArrowRight size={16} className="transition-transform group-hover:translate-x-1" />
              </a>
            </div>
            
            {/* Paragraph Description */}
            <p className="text-[14px] md:text-[15px] font-normal leading-[1.7] text-[#404040] max-w-[480px]">
              OSV FTWZ helps international businesses trade with India through strategically located Free Trade Ports and Zones across Delhi NCR, Mumbai, Gujarat and Chennai. We provide duty-deferred storage, seamless customs clearance, transportation, and international logistics.
            </p>
          </div>

        </div>
      </div>
    </section>
  );
};
