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
    <section id="what-we-do" ref={sectionRef} className="scroll-mt-24 bg-[#f5f2ee] px-5 py-24 md:px-12 lg:px-20">
      <div className="mx-auto grid max-w-[1400px] grid-cols-1 gap-12 lg:grid-cols-[0.95fr_1.05fr] lg:items-end">
        <div className="reveal opacity-0">
          <span className="section-label">Welcome to OSV FTWZ</span>
          <h2 className="mt-7 max-w-[740px] text-[42px] font-normal leading-[1.02] text-[#101010] md:text-[64px] lg:text-[82px]">
            50 year old legacy. Nationwide presence. Free trade, simplified.
          </h2>
        </div>

        <div className="reveal opacity-0 border-l border-[#dccfc6] pl-0 lg:pl-10">
          <p className="max-w-[680px] text-[22px] font-normal leading-[1.35] text-[#101010] md:text-[30px]">
            OSV FTWZ helps international businesses trade with India through strategically located Free Trade Ports and Zones across Delhi NCR, Mumbai, Gujarat and Chennai.
          </p>
          <p className="mt-7 max-w-[640px] text-[16px] leading-[1.8] text-[#565656]">
            We provide duty-deferred storage, seamless customs clearance, transportation, international logistics, real-time shipment visibility and compliance support for importers who need speed without paperwork friction.
          </p>
          <div className="mt-9 flex flex-wrap gap-3">
            <a href="#facilities" className="pill-btn pill-btn-red">
              Explore Facilities
              <span className="pill-arrow">
                <ArrowRight size={14} />
              </span>
            </a>
            <a href="#connect-with-us" className="pill-btn pill-btn-peach">
              Contact Experts
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};
