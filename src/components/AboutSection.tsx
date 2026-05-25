import { ArrowRight } from 'lucide-react';
import { useEffect, useRef } from 'react';

export const AboutSection = () => {
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) entry.target.classList.add('animate-fade-in');
        });
      },
      { threshold: 0.14 }
    );
    const elements = sectionRef.current?.querySelectorAll('.reveal');
    elements?.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, []);

  return (
    <section id="who-we-are" ref={sectionRef} className="bg-[#f5f2ee] px-5 py-24 md:px-12 lg:px-20">
      <div className="mx-auto max-w-[1400px]">
        <div className="reveal mb-12 opacity-0">
          <span className="section-label">About OSV FTWZ</span>
        </div>

        <div className="grid grid-cols-1 gap-5 lg:grid-cols-2">
          <div className="reveal opacity-0">
            <div className="news-thumb h-full min-h-[440px] overflow-hidden bg-[#ddd2ca]">
              <img src="/images/about_collage.png" alt="OSV FTWZ operations" className="h-full w-full object-cover" />
            </div>
          </div>

          <div className="reveal flex flex-col justify-between bg-white p-8 opacity-0 md:p-12">
            <div>
              <h2 className="max-w-[620px] text-[40px] font-normal leading-[1.04] text-[#101010] md:text-[62px]">
                India's trusted FTWZ operator with pan-India coverage.
              </h2>
              <p className="mt-8 max-w-[640px] text-[18px] leading-[1.65] text-[#101010]">
                ONNSYNEX VENTURES PRIVATE LIMITED simplifies trading with India through strategically located Free Trade Ports and Zones equipped with world-class infrastructure.
              </p>
              <p className="mt-5 max-w-[640px] text-[16px] leading-[1.75] text-[#565656]">
                Our ancillary services include custom clearance, transportation and international logistics, giving importers one coordinated partner from cargo arrival to delivery.
              </p>
            </div>
            <a href="#connect-with-us" className="pill-btn pill-btn-dark mt-10 w-fit">
              About us
              <span className="pill-arrow">
                <ArrowRight size={14} />
              </span>
            </a>
          </div>
        </div>

        <div className="reveal mt-5 grid grid-cols-1 gap-5 opacity-0 lg:grid-cols-[0.82fr_1.18fr]">
          <div className="bg-[#000000] p-8 text-white md:p-10">
            <p className="text-[14px] font-semibold uppercase">No importer in India? No problem.</p>
            <p className="mt-5 text-[28px] font-normal leading-[1.15]">
              Trade like an MNC with local compliance, duty deferral and complete operational support.
            </p>
          </div>
          <div className="news-thumb min-h-[280px] overflow-hidden bg-[#ddd2ca]">
            <img src="/images/fleet.png" alt="OSV logistics fleet" className="h-full w-full object-cover" />
          </div>
        </div>
      </div>
    </section>
  );
};
