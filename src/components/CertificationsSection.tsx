import { useEffect, useRef } from 'react';

const certificateLogos = [
  { src: '/images/ISO-9001-2015-logo-1-1000x1000-1.png.webp', alt: 'ISO 9001:2015 Certification' },
  { src: '/images/iso-ems.png.webp', alt: 'ISO 14001 Environmental Management System' },
  { src: '/images/iso-45001-certification-services.png.webp', alt: 'ISO 45001 Health & Safety' },
  { src: '/images/Toward-Zero-Carbon-ISO-50001-2018.png.webp', alt: 'ISO 50001 Energy Management (Zero Carbon)' },
  { src: '/images/FICCI.png.webp', alt: 'FICCI Member Logo' },
  { src: '/images/FICCI-1.png.webp', alt: 'FICCI Allied Member' },
  { src: '/images/FIEO-1.png.webp', alt: 'FIEO Register Logo' },
  { src: '/images/FIEO-2.png.webp', alt: 'FIEO Certificate Logo' },
];

export const CertificationsSection = () => {
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('animate-fade-in');
          }
        });
      },
      { threshold: 0.05 }
    );
    const els = sectionRef.current?.querySelectorAll('.reveal');
    els?.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, []);

  // Double the list for seamless looping marquee
  const marqueeLogos = [...certificateLogos, ...certificateLogos];

  return (
    <section 
      id="certifications"
      ref={sectionRef}
      className="scroll-mt-24 bg-[#101010] text-white border-b border-white/[0.06]"
      style={{ padding: 'clamp(56px, 7vw, 80px) clamp(20px, 5vw, 48px)' }}
    >
      <div className="w-full">
        {/* Header - Aligned exactly like the other headers */}
        <div className="reveal opacity-0 text-left" style={{ marginBottom: '48px' }}>
          <span className="text-[11px] font-bold uppercase tracking-[0.2em] text-[#b9d522]">
            CREDENTIALS & COMPLIANCE
          </span>
          <h2 className="mt-4 text-[36px] font-normal leading-[1.08] tracking-tight text-white sm:text-[44px] md:text-[54px]">
            Our Certifications & Accreditations
          </h2>
        </div>

        {/* Marquee Window Container */}
        <div className="reveal opacity-0 overflow-hidden relative py-6" style={{ margin: '0 calc(clamp(20px, 5vw, 48px) * -1)' }}>
          {/* Subtle side fading overlays for premium depth */}
          <div className="absolute inset-y-0 left-0 w-24 bg-gradient-to-r from-[#101010] to-transparent z-10 pointer-events-none" />
          <div className="absolute inset-y-0 right-0 w-24 bg-gradient-to-l from-[#101010] to-transparent z-10 pointer-events-none" />

          {/* Scrolling Wrapper */}
          <div className="animate-marquee gap-16 items-center">
            {marqueeLogos.map((logo, idx) => (
              <div 
                key={idx}
                className="flex-shrink-0 flex items-center justify-center bg-white/[0.02] border border-white/[0.04] rounded-xl p-4 sm:p-6 transition-all duration-300 hover:bg-white/[0.06] hover:border-white/[0.1] hover:scale-105"
                style={{ 
                  height: '110px', 
                  width: '180px',
                }}
              >
                <img 
                  src={logo.src} 
                  alt={logo.alt} 
                  className="max-h-full max-w-full object-contain filter brightness-90 contrast-125 transition-all duration-300"
                  loading="lazy"
                />
              </div>
            ))}
          </div>
        </div>

      </div>
    </section>
  );
};
