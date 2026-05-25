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

      <div className="mx-auto grid max-w-[1400px] grid-cols-1 gap-16 lg:grid-cols-2 lg:items-end">
        {/* Left Column: Massive Heading */}
        <div className="reveal opacity-0 relative z-10 pb-0 lg:pb-12">
          <h2 className="text-[48px] md:text-[64px] lg:text-[76px] font-semibold leading-[1.05] tracking-tight text-[#101010]">
            50 year old legacy.<br />Nationwide presence.<br />Free trade, simplified.
          </h2>
        </div>

        {/* Right Column: Truck + Buttons + Text */}
        <div className="reveal opacity-0 flex flex-col gap-10 relative z-10">
          
          {/* Truck Image - Overlapping visually like emons.de */}
          <div className="relative w-full mb-8 lg:mb-0 lg:aspect-[4/3] flex justify-end">
            <img 
              src="/images/img.png" 
              alt="OSV FTWZ Truck" 
              className="relative lg:absolute lg:-right-20 lg:top-0 w-[110%] sm:w-[90%] lg:w-[120%] max-w-none object-contain drop-shadow-2xl translate-x-5 lg:translate-x-0" 
            />
          </div>
          
          <div className="flex flex-col gap-8 pr-0 lg:pr-10">
            {/* Buttons Row (Emons style: Pill + Circular arrow) */}
            <div className="flex flex-wrap gap-4">
              <a href="#services" className="group flex items-center gap-4 rounded-full bg-[#f24c3d] pl-6 pr-1.5 py-1.5 text-[15px] font-medium text-white transition-colors hover:bg-[#d93a2c]">
                Explore Services
                <span className="flex h-8 w-8 items-center justify-center rounded-full bg-white/20 transition-transform group-hover:translate-x-1">
                  <ArrowRight size={16} />
                </span>
              </a>
              <a href="#connect-with-us" className="group flex items-center gap-4 rounded-full bg-[#f24c3d] pl-6 pr-1.5 py-1.5 text-[15px] font-medium text-white transition-colors hover:bg-[#d93a2c]">
                Contact Experts
                <span className="flex h-8 w-8 items-center justify-center rounded-full bg-white/20 transition-transform group-hover:translate-x-1">
                  <ArrowRight size={16} />
                </span>
              </a>
            </div>
            
            {/* Paragraph Description */}
            <p className="text-[15px] md:text-[17px] font-medium leading-[1.65] text-[#303030] max-w-lg">
              OSV FTWZ helps international businesses trade with India through strategically located Free Trade Ports and Zones across Delhi NCR, Mumbai, Gujarat and Chennai. We provide duty-deferred storage, seamless customs clearance, transportation, and international logistics.
            </p>
          </div>

        </div>
      </div>
    </section>
  );
};
