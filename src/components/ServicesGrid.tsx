import { useEffect, useRef } from 'react';

const serviceCards = [
  { title: 'Customs Clearance', image: '/images/customs.png', text: 'Swift documentation and clearance without red tape.' },
  { title: 'FTWZ Storage', image: '/images/warehouse.png', text: 'Duty-deferred warehousing in major Indian trade hubs.' },
  { title: 'Air Freight', image: '/images/plane.png', text: 'Fast international movement for critical shipments.' },
  { title: 'Sea Freight', image: '/images/ship.png', text: 'Cost-effective import and export cargo solutions.' },
  { title: 'Transportation', image: '/images/truck.png', text: 'Reliable first-mile and last-mile cargo movement.' },
  { title: 'Rail Network', image: '/images/train.png', text: 'Pan-India movement through connected logistics corridors.' },
  { title: 'Digital Tracking', image: '/images/digital.png', text: 'Real-time shipment status through OSV dashboards.' },
  { title: 'Other Benefits', image: '/images/others.png', text: 'Tax, compliance and operational advantages for global trade.' },
];

export const ServicesGrid = () => {
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('animate-slide-up');
            entry.target.classList.remove('opacity-0');
          }
        });
      },
      { threshold: 0.08 }
    );
    const elements = sectionRef.current?.querySelectorAll('.reveal');
    elements?.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, []);

  return (
    <section
      id="services"
      ref={sectionRef}
      className="scroll-mt-24 bg-[#f5f2ee] pb-20 transition-colors duration-300 md:pb-28"
      style={{ paddingLeft: 'clamp(20px, 5vw, 48px)', paddingRight: 'clamp(20px, 5vw, 48px)', paddingTop: '54px', marginTop: '-1px' }}
    >
      
      {/* Header — aligned with WelcomeSection */}
      <div className="reveal mb-20 opacity-0">
        <h2 className="text-[44px] md:text-[54px] lg:text-[64px] font-normal leading-[1.05] tracking-tight text-[#101010] max-w-[650px]">
          Our comprehensive solutions
        </h2>
      </div>

      {/* Service Cards — No Background, Transparent */}
      <div className="grid grid-cols-1 gap-x-0 gap-y-0 sm:grid-cols-2 lg:grid-cols-4">
        {serviceCards.map((card, idx) => (
          <a
            key={card.title}
            href="#connect-with-us"
            className="reveal opacity-0 group relative flex flex-col justify-between px-0 py-10 transition-all duration-500 sm:px-6 lg:px-7"
            style={{
              transitionDelay: `${idx * 60}ms`,
            }}
          >
            {/* Vertical divider on the left (except first column) */}
            {idx % 4 !== 0 && (
              <div className="absolute left-0 top-[10%] bottom-[10%] hidden w-px bg-[#101010]/8 lg:block" />
            )}

            {/* Horizontal divider on top for second row */}
            {idx >= 4 && (
              <div className="absolute top-0 left-[5%] right-[5%] hidden h-px bg-[#101010]/8 lg:block" />
            )}

            {/* Image — Large, No Background, Float Effect */}
            <div className="mb-8 flex items-center justify-center relative" style={{ minHeight: '160px' }}>
              <img 
                src={card.image} 
                alt={card.title} 
                className="relative h-36 w-full object-contain transition-all duration-700 group-hover:scale-110 group-hover:-translate-y-2 drop-shadow-lg group-hover:drop-shadow-2xl" 
                loading="lazy" 
              />
            </div>
            
            {/* Text */}
            <div>
              <h3 className="text-[20px] font-semibold tracking-tight text-[#101010] group-hover:text-[#101010] transition-colors">
                {card.title}
              </h3>
              <p className="mt-2 text-[13.5px] leading-[1.65] text-[#888] group-hover:text-[#555] transition-colors duration-300">
                {card.text}
              </p>
            </div>


          </a>
        ))}
      </div>
    </section>
  );
};
