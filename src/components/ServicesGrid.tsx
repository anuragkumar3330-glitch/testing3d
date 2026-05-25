import { ArrowRight } from 'lucide-react';
import { useEffect, useRef } from 'react';

const serviceCards = [
  { title: 'Customs Clearance', image: '/images/customs.png', text: 'Swift documentation and clearance without red tape.' },
  { title: 'FTWZ Storage', image: '/images/warehouse.png', text: 'Duty-deferred warehousing in major Indian trade hubs.' },
  { title: 'Air Freight', image: '/images/airplane.png', text: 'Fast international movement for critical shipments.' },
  { title: 'Sea Freight', image: '/images/ship.png', text: 'Cost-effective import and export cargo solutions.' },
  { title: 'Transportation', image: '/images/truck.png', text: 'Reliable first-mile and last-mile cargo movement.' },
  { title: 'Rail Network', image: '/images/train.png', text: 'Pan-India movement through connected logistics corridors.' },
  { title: 'Digital Tracking', image: '/images/digital.png', text: 'Real-time shipment status through OSV dashboards.' },
  { title: 'Other Benefits', image: '/images/benefits.png', text: 'Tax, compliance and operational advantages for global trade.', isRed: true },
];

export const ServicesGrid = () => {
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) entry.target.classList.add('animate-fade-in');
        });
      },
      { threshold: 0.12 }
    );
    const elements = sectionRef.current?.querySelectorAll('.reveal');
    elements?.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, []);

  return (
    <section id="services" ref={sectionRef} className="scroll-mt-24 bg-white px-5 py-24 md:px-12 lg:px-20">
      <div className="mx-auto max-w-[1400px]">
        <div className="reveal mb-12 flex flex-col justify-between gap-8 opacity-0 md:flex-row md:items-end">
          <div>
            <span className="section-label">End-to-end services</span>
            <h2 className="mt-7 text-[42px] font-normal leading-[1.02] text-[#101010] md:text-[64px]">
              What we can offer for you
            </h2>
          </div>
          <p className="max-w-[420px] text-[16px] leading-[1.7] text-[#565656]">
            A single operating partner for FTWZ storage, freight, compliance, customs and client visibility.
          </p>
        </div>

        <div className="reveal grid grid-cols-1 border-l border-t border-[#eee0d9] opacity-0 sm:grid-cols-2 lg:grid-cols-4">
          {serviceCards.map((card) => (
            <a
              key={card.title}
              href="#connect-with-us"
              className={`service-card group flex flex-col justify-between border-b border-r p-6 ${
                card.isRed ? 'bg-[#b9d522] text-white' : ''
              }`}
            >
              <div>
                <div className="mb-8 flex min-h-[128px] items-center justify-center">
                  <img src={card.image} alt={card.title} className={`h-28 w-full object-contain ${card.isRed ? 'brightness-0 invert' : ''}`} loading="lazy" />
                </div>
                <h3 className="text-[24px] font-normal leading-tight">{card.title}</h3>
                <p className={`mt-4 text-[14px] leading-[1.6] ${card.isRed ? 'text-white/84' : 'text-[#565656] group-hover:text-white/84'}`}>
                  {card.text}
                </p>
              </div>
              <div className="mt-10 flex items-center justify-between border-t border-current/14 pt-5">
                <span className="text-[13px] font-semibold">More info</span>
                <span className="card-arrow flex h-9 w-9 items-center justify-center rounded-full bg-white text-[#b9d522]">
                  <ArrowRight size={17} />
                </span>
              </div>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
};
