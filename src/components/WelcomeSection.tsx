import { ArrowRight } from 'lucide-react';
import { useEffect, useRef } from 'react';

export const WelcomeSection = () => {
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const anim = entry.target.getAttribute('data-anim') || 'animate-fade-in';
            entry.target.classList.add(anim);
            entry.target.classList.remove('opacity-0');
          }
        });
      },
      { threshold: 0.15 }
    );

    const elements = sectionRef.current?.querySelectorAll('.reveal');
    elements?.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, []);

  return (
    <section id="what-we-do" ref={sectionRef} className="scroll-mt-24 bg-[#f5f2ee] pr-5 pt-16 pb-24 md:pr-12 lg:pr-20 lg:pt-20 relative overflow-visible" style={{ paddingLeft: '48px' }}>
      
      <div className="grid grid-cols-1 gap-12 lg:gap-24 lg:grid-cols-[1fr_1fr] lg:items-center relative z-10">
        
        {/* Left Column: Massive Heading + Buttons */}
        <div className="flex flex-col justify-center h-full gap-12">
          <div className="reveal opacity-0 delay-100" data-anim="animate-slide-up">
            <h2 className="text-[44px] md:text-[54px] lg:text-[64px] font-normal leading-[1.05] tracking-tight text-[#101010] max-w-[650px]">
              50 year old legacy.<br />Nationwide presence.<br />
              <span className="font-medium text-[#b9d522]">Free trade, simplified.</span>
            </h2>
          </div>

          {/* Buttons Row */}
          <div className="reveal opacity-0 flex flex-wrap gap-4 delay-300" data-anim="animate-slide-up">
            <a href="#services" className="pill-btn pill-btn-dark">
              Explore Services
              <span className="pill-arrow bg-white/35">
                <ArrowRight size={14} />
              </span>
            </a>
            <a href="#connect-with-us" className="pill-btn pill-btn-light">
              Contact Experts
              <span className="pill-arrow bg-black/10">
                <ArrowRight size={14} />
              </span>
            </a>
          </div>
        </div>

        {/* Right Column: Truck Image */}
        <div className="flex flex-col justify-center h-full mt-8 lg:mt-0">
          <div className="reveal opacity-0 relative w-full flex justify-end items-center delay-200" data-anim="animate-slide-in-right">
            {/* Subtle Orb Behind Truck */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[80%] h-[80%] bg-[#101010]/5 rounded-full blur-[60px] pointer-events-none mix-blend-multiply" />
            
            <img 
              src="/images/img.png" 
              alt="OSV FTWZ Truck" 
              className="relative w-full max-w-none object-contain drop-shadow-2xl" 
            />
          </div>
        </div>
      </div>
    </section>
  );
};
