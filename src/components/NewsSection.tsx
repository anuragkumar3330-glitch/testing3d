import { Handshake, CheckCircle, ShieldCheck, Warehouse, ArrowRight, ChevronDown } from 'lucide-react';
import { useEffect, useRef, useState } from 'react';

const faqs = [
  {
    question: "What makes OSV Free Trade FTWZ stand out from others in the industry?",
    answer: "Our FTWZ is a true game-changer, offering you a dedicated space where your goods can be efficiently handled and controlled. Unlike traditional customs processes, there is no interference from customs authorities, ensuring a seamless flow of imports, exports, and re-exports. As a specialized category of SEZ, our FTWZ comes with a host of benefits, including customs clearance capability and integrated solutions for packing management, sorting, and inspection, to name a few."
  },
  {
    question: "What advantages can we expect from using your FTWZ services?",
    answer: "The advantages of using our FTWZ are manifold. With us, you gain access to convenient and efficient solutions for meeting complete and semi-knocked down kits. Moreover, you can enjoy taxation benefits, enhancing your cost-effectiveness. Our specialization in sensitive cargos, such as tilt-sensitive, shock-sensitive, and temperature-sensitive shipments, allows you to trust us with even the most delicate items. Additionally, our expertise in handling everything from small pins to aircraft engines ensures that your shipments are in capable hands."
  },
  {
    question: "How does OSV ensure a smooth and reliable logistics experience?",
    answer: "At ONNSYNEX VENTURES PRIVATE LIMITED, we take pride in our presence at maximum locations, allowing us to offer you comprehensive and integrated logistics solutions. From special divisions for handling temperature-controlled shipments (16º to 24º) and cold storage shipments (up to -65º) to providing end-to-end cold chain solutions, we cater to diverse needs with utmost efficiency. Our 99% on-time delivery record speaks volumes about our commitment to punctuality and professionalism. You can even track your shipments through our delivery dashboard for added peace of mind."
  },
  {
    question: "What sets OSV apart in terms of expertise and support for international trade policies and customs practices?",
    answer: "OSV boasts a team of experts with vast experience in international trade policies and customs practices. Our deep understanding of regulatory frameworks ensures that your imports and exports comply with all relevant laws and regulations. Moreover, our strong advisory board, comprising industrial veterans and eminent personalities, brings unparalleled insights and guidance to our operations. When you choose OSV, you can rest assured that your international trade ventures are in the hands of seasoned professionals dedicated to your success."
  }
];

const pillars = [
  {
    num: '01',
    title: '50 year old legacy',
    text: 'Experience the perfect fusion of timeless legacy and innovation as we redefine the boundaries of Trade through our unrivalled expertise in Free Trade Warehousing honed over 50 years.',
  },
  {
    num: '02',
    title: 'Nationwide Presence',
    text: "As a one-stop, pan-India solution for all International businesses, explore the OSV FTZ's Free Trade Warehousing Zones in major cities like New Delhi, Mumbai, Chennai and Gujarat.",
  },
  {
    num: '03',
    title: 'End-to-End Services',
    text: 'At OSV, we offer customized solutions tailored to your unique business requirements. With a Strong focus on compliance, we optimize your supply chain with utmost efficiency.',
  },
];

const timelineItems = [
  {
    icon: Handshake,
    title: 'Eliminate Trade Hurdles',
    text: "Trade like an MNC with OSV's proficient support. For foreign companies, exporting to India becomes a breeze, while Indian companies enjoy smooth imports. Say goodbye to complexities and enjoy hassle-free trade with OSV.",
  },
  {
    icon: CheckCircle,
    title: 'Seamless Imports, Exports, and Re-exports',
    text: 'Experience unparalleled tax and compliance advantages with ONNSYNEX VENTURES PRIVATE LIMITED for your imports and exports. Our specialized FTWZs enable you to tap into significant tax benefits, streamlining your business operations.',
  },
  {
    icon: ShieldCheck,
    title: 'Unparalleled Quality & Reliability',
    text: 'With numerous global certifications and accreditations like ISO, IAF, OHSAS, experience seamless & hassle-free Trade, Exports, Imports, Free trade Zone and custom clearance always.',
  },
  {
    icon: Warehouse,
    title: 'Advanced infrastructure and new world solutions',
    text: 'Equipped with Superior and Safe Storage Areas, Advanced Material Handling Equipment, trade experts, smoother custom clearances, compliance support and much more.',
  },
];

const benefits = [
  {
    title: 'Complete Non Interference from Custom Authorities',
    text: 'At the heart of our success lies our in-depth understanding of complex custom regulations. This wealth of knowledge empowers us to swiftly handle your shipments through customs and complex and ever changing import processes customs authorities with confidence, guaranteeing that your shipments move swiftly and without any interference.',
  },
  {
    title: 'No Red-tapes or Roadblocks',
    text: 'Experience the ease of Compliance Free Export to India with our robust solutions. With our services, you gain unparalleled flexibility in clearing cargo, allowing part consignments and enabling smooth distribution.',
  },
  {
    title: 'Save big on Shipping Line Costs and unplanned expenses',
    text: "Say goodbye to unnecessary shipping line fees with our direct port pickup facility and eliminating any chances of uncertain delays and expenses/costs like detention, demurrage, interests and penalties. We handle it all, ensuring your cargo moves smoothly without any surprises on your bill!",
  },
];

export const NewsSection = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const [activeFaq, setActiveFaq] = useState<number | null>(null);

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

  return (
    <div ref={sectionRef} className="bg-[#101010] text-white">

      {/* ─── SECTION 1: About Us ─── */}
      <section className="border-b border-white/[0.06] px-6 py-20 sm:px-12 md:py-24 lg:px-[48px]">
        <div className="mx-auto max-w-[1200px]">
          <div className="grid grid-cols-1 gap-12 lg:grid-cols-2 lg:gap-20">

            {/* Left: Text content */}
            <div className="reveal opacity-0 flex flex-col justify-center">
              <span className="text-[11px] font-bold uppercase tracking-[0.2em] text-[#b9d522]">
                About Us
              </span>
              <h2 className="mt-4 text-[32px] font-normal leading-[1.1] tracking-tight sm:text-[40px] md:text-[48px]">
                India's Trusted FTWZ Operator — Pan&#8209;India Coverage
              </h2>
              <p className="mt-6 text-[15px] leading-[1.75] text-white/65">
                Welcome to ONNSYNEX VENTURES PRIVATE LIMITED, where we excel at simplifying your trading experience with India. Our secret lies in our strategically located Free Trade Ports/Zones across major destinations like Delhi NCR, Mumbai, Gujarat, and Chennai, all equipped with world-class infrastructure. But that's not all — to elevate your journey even further, we provide exceptional ancillary services, including seamless custom clearance, efficient transportation, and top-notch international logistics. Experience trading at its finest with OSV — your gateway to success in India!
              </p>
              <a
                href="#connect-with-us"
                className="mt-8 inline-flex w-fit items-center gap-2 text-[14px] font-semibold text-[#b9d522] transition-colors duration-300 hover:text-[#d4f02a]"
              >
                Read More
                <ArrowRight size={15} />
              </a>
            </div>

            {/* Right: Single image */}
            <div className="reveal opacity-0 flex items-center justify-center lg:justify-end">
              <div
                className="w-full max-w-[480px] overflow-hidden rounded-2xl"
                style={{
                  aspectRatio: '4/3',
                  border: '1px solid rgba(255,255,255,0.1)',
                  boxShadow: '0 8px 32px rgba(0,0,0,0.4)',
                }}
              >
                <img 
                  src="/images/3.jpg" 
                  alt="About OSV" 
                  className="w-full h-full object-cover transition-transform duration-700 hover:scale-105"
                  loading="lazy"
                />
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* ─── SECTION 2: Three Pillars (50 year old legacy) ─── */}
      <section className="relative overflow-hidden border-b border-white/[0.06] px-6 py-20 sm:px-12 md:py-24 lg:px-[48px]">
        <div className="pointer-events-none absolute inset-0" style={{ background: 'radial-gradient(ellipse 800px 600px at 85% 80%, rgba(185,213,34,0.04) 0%, transparent 70%)' }} />

        <div className="relative mx-auto max-w-[1200px]">
          <div className="grid grid-cols-1 gap-12 md:grid-cols-3 md:gap-8 lg:gap-12">
            {pillars.map((p) => (
              <div key={p.num} className="reveal opacity-0 flex flex-col">
                <span
                  className="font-normal leading-none"
                  style={{
                    fontSize: 'clamp(64px, 8vw, 100px)',
                    color: 'transparent',
                    WebkitTextStroke: '1.5px rgba(185,213,34,0.5)',
                    marginBottom: '20px',
                  }}
                >
                  {p.num}
                </span>
                <h3 className="text-[22px] font-bold tracking-tight text-white sm:text-[24px]" style={{ marginBottom: '16px' }}>
                  {p.title}
                </h3>
                <p className="text-[14.5px] leading-[1.75] text-white/60" style={{ marginBottom: '24px' }}>
                  {p.text}
                </p>
                <a href="#connect-with-us" className="mt-auto inline-flex items-center gap-2 text-[13px] font-semibold text-[#b9d522] transition-colors hover:text-[#d4f02a]">
                  <span className="flex h-5 w-5 items-center justify-center rounded-full bg-[#b9d522] text-[#101010]">
                    <ArrowRight size={12} />
                  </span>
                  Read More
                </a>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── SECTION 3: Timeline ─── */}
      <section className="border-b border-white/[0.06] px-6 py-20 sm:px-12 md:py-24 lg:px-[48px]">
        <div className="mx-auto max-w-[1200px]">
          <div className="reveal opacity-0" style={{ marginBottom: '64px' }}>
            <span className="text-[11px] font-bold uppercase tracking-[0.2em] text-[#b9d522]">
              Operational Excellence
            </span>
            <h2 className="mt-4 text-[36px] font-normal leading-[1.08] tracking-tight sm:text-[44px] md:text-[54px]">
              Streamlining Global Trade
            </h2>
          </div>

          <div className="relative">
            {/* Vertical line running behind the triangles */}
            <div 
              className="absolute top-0 bottom-0" 
              style={{ 
                left: '16px', 
                width: '2px', 
                background: '#b9d522' 
              }} 
            />

            <div className="flex flex-col" style={{ gap: '48px' }}>
              {timelineItems.map((item) => {
                const Icon = item.icon;
                return (
                  <div key={item.title} className="reveal opacity-0 relative grid grid-cols-1 md:grid-cols-[380px_1fr] gap-3 md:gap-12 items-start min-h-[56px]">
                    {/* Green triangle marker centered on the vertical line and circle */}
                    <div
                      className="absolute"
                      style={{
                        left: '13px',
                        top: '20px',
                        transform: 'translateY(-50%)',
                        width: '0',
                        height: '0',
                        borderTop: '5px solid transparent',
                        borderBottom: '5px solid transparent',
                        borderLeft: '7px solid #b9d522',
                      }}
                    />

                    {/* Column 1: Blue Icon Circle & Title */}
                    <div className="flex items-center gap-4" style={{ paddingLeft: '40px' }}>
                      {/* Icon circle */}
                      <div
                        className="flex items-center justify-center rounded-full flex-shrink-0"
                        style={{
                          width: '40px',
                          height: '40px',
                          background: 'linear-gradient(135deg, #163c6d 0%, #1e5194 100%)',
                          border: '1.5px solid rgba(255,255,255,0.1)',
                          boxShadow: '0 0 15px rgba(22,60,109,0.6)',
                        }}
                      >
                        <Icon size={16} className="text-white" />
                      </div>
                      <h3 className="text-[18px] font-bold leading-[1.25] tracking-tight text-white sm:text-[20px]">
                        {item.title}
                      </h3>
                    </div>

                    {/* Column 2: Description Text (Perfect alignment under title on mobile) */}
                    <div className="pl-[96px] md:pl-0" style={{ paddingTop: '8px' }}>
                      <p className="text-[14px] leading-[1.65] text-white/70 max-w-[720px]">
                        {item.text}
                      </p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </section>

      {/* ─── SECTION 4: What We Can Offer for You ─── */}
      <section className="border-b border-white/[0.06] px-6 py-20 sm:px-12 md:py-24 lg:px-[48px]">
        <div className="mx-auto max-w-[1200px]">
          <div className="reveal opacity-0" style={{ marginBottom: '56px' }}>
            <span className="text-[11px] font-bold uppercase tracking-[0.2em] text-[#b9d522]">
              Benefits
            </span>
            <h2 className="mt-4 text-[36px] font-normal leading-[1.08] tracking-tight sm:text-[44px] md:text-[54px]">
              What We Can Offer for You
            </h2>
          </div>

          <div className="reveal opacity-0 grid grid-cols-1 gap-12 lg:grid-cols-12 lg:items-center">
            {/* What We Can Offer for You Image */}
            <div className="lg:col-span-5 flex justify-center lg:justify-start">
              <div
                className="relative rounded-full overflow-hidden flex items-center justify-center border-4 border-[#1c4a80]/30 shadow-[0_8px_32px_rgba(0,0,0,0.5)]"
                style={{
                  width: 'min(380px, 80vw)',
                  height: 'min(380px, 80vw)',
                  aspectRatio: '1/1',
                }}
              >
                <img 
                  src="/images/2.webp" 
                  alt="What We Offer" 
                  className="w-full h-full object-cover transition-transform duration-700 hover:scale-105"
                  loading="lazy"
                />
              </div>
            </div>

            {/* Benefits list */}
            <div className="lg:col-span-7 flex flex-col" style={{ gap: '36px' }}>
              {benefits.map((b) => (
                <div key={b.title} className="flex gap-4">
                  <div className="mt-2 h-[8px] w-[8px] shrink-0 rounded-full bg-[#b9d522]" />
                  <div>
                    <h3 className="text-[18px] font-bold leading-[1.3] tracking-tight text-white sm:text-[20px]">
                      {b.title}
                    </h3>
                    <p className="mt-2.5 text-[14.5px] leading-[1.7] text-white/65">
                      {b.text}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ─── SECTION 5: Frequently Asked Questions ─── */}
      <section className="relative overflow-hidden px-6 py-20 sm:px-12 md:py-24 lg:px-[48px]">
        {/* Subtle glow background */}
        <div className="pointer-events-none absolute inset-0" style={{ background: 'radial-gradient(circle 600px at 20% 50%, rgba(185,213,34,0.02) 0%, transparent 80%)' }} />

        <div className="relative mx-auto max-w-[1200px]">
          {/* Header left-aligned exactly like screenshot */}
          <div className="reveal opacity-0 text-left" style={{ marginBottom: '52px' }}>
            <span className="text-[11px] font-bold uppercase tracking-[0.25em] text-[#b9d522]">
              FREQUENTLY ASKED QUESTIONS
            </span>
            <h2 className="mt-4 text-[36px] font-normal leading-[1.08] tracking-tight sm:text-[44px] md:text-[54px] text-white">
              Most Popular Questions
            </h2>
          </div>

          {/* Accordion container - left-aligned, maximum 860px width */}
          <div className="reveal opacity-0 flex flex-col border-t border-white/[0.08] max-w-[860px]">
            {faqs.map((faq, idx) => {
              const isOpen = activeFaq === idx;
              return (
                <div 
                  key={idx} 
                  className="border-b border-white/[0.08]"
                >
                  <button
                    onClick={() => setActiveFaq(isOpen ? null : idx)}
                    className="w-full flex items-center justify-between text-left py-7 transition-colors duration-300 focus:outline-none group"
                  >
                    <span 
                      className="text-[16px] sm:text-[18px] font-semibold tracking-tight pr-8 transition-colors duration-300 leading-snug"
                      style={{ color: isOpen ? '#b9d522' : '#ffffff' }}
                    >
                      {faq.question}
                    </span>
                    {/* Clean down arrow in green directly, no border/circle background */}
                    <ChevronDown 
                      size={20} 
                      className="text-[#b9d522] shrink-0 transition-transform duration-300"
                      style={{ 
                        transform: isOpen ? 'rotate(180deg)' : 'rotate(0deg)'
                      }}
                    />
                  </button>

                  {/* Collapsible Answer */}
                  <div
                    className="overflow-hidden transition-all duration-300 ease-in-out"
                    style={{
                      maxHeight: isOpen ? '400px' : '0',
                      opacity: isOpen ? 1 : 0,
                    }}
                  >
                    <div className="pb-6">
                      <p className="text-[14.5px] leading-[1.7] text-white/70">
                        {faq.answer}
                      </p>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Contact Expert CTA - Left Aligned in green to match screenshot exactly */}
          <div className="reveal opacity-0 mt-12 text-left pt-6 max-w-[860px]">
            <p className="text-[15px] font-semibold text-[#b9d522]">
              Looking for answers to particular questions?{' '}
              <a 
                href="#connect-with-us" 
                className="underline transition-colors hover:text-[#d4f02a]"
              >
                Contact
              </a>{' '}
              our experts now.
            </p>
          </div>

        </div>
      </section>

    </div>
  );
};
