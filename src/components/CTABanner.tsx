import { ArrowRight } from 'lucide-react';

export const CTABanner = () => {
  return (
    <section id="connect-with-us" className="bg-[#e30613] px-5 py-24 text-white md:px-12 lg:px-20">
      <div className="mx-auto grid max-w-[1400px] grid-cols-1 gap-10 lg:grid-cols-[1.1fr_0.9fr] lg:items-end">
        <div>
          <span className="section-label border-white/22 bg-white/12 text-white">Connect with us</span>
          <h2 className="mt-7 max-w-[920px] text-[44px] font-normal leading-[1.02] md:text-[76px]">
            Because your trade matters to us.
          </h2>
        </div>
        <div>
          <p className="max-w-[560px] text-[18px] leading-[1.65] text-white/82">
            Partner with a trusted FTWZ operator for duty-deferred storage, customs, transportation, international logistics and complete shipment visibility.
          </p>
          <div className="mt-9 flex flex-wrap gap-3">
            <a href="#facilities" className="pill-btn bg-white text-[#e30613] hover:-translate-y-0.5 hover:bg-[#f5f2ee]">
              Explore Facilities
              <span className="pill-arrow bg-[#e30613]/10">
                <ArrowRight size={14} />
              </span>
            </a>
            <a href="tel:+917070703922" className="pill-btn pill-btn-peach">
              Contact Experts
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};
