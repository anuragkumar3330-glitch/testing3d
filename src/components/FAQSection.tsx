import { ChevronDown } from 'lucide-react';
import { useEffect, useRef, useState } from 'react';

const faqs = [
  {
    question: 'What makes OSV Free Trade FTWZ stand out from others in the industry?',
    answer:
      'Our FTWZ is a true game-changer, offering you a dedicated space where your goods can be efficiently handled and controlled. Unlike traditional customs processes, there is no interference from customs authorities, ensuring a seamless flow of imports, exports, and re-exports. As a specialized category of SEZ, our FTWZ comes with a host of benefits, including customs clearance capability and integrated solutions for packing management, sorting, and inspection, to name a few.',
  },
  {
    question: 'What advantages can we expect from using your FTWZ services?',
    answer:
      'The advantages of using our FTWZ are manifold. With us, you gain access to convenient and efficient solutions for meeting complete and semi-knocked down kits. Moreover, you can enjoy taxation benefits, enhancing your cost-effectiveness. Our specialization in sensitive cargos, such as tilt-sensitive, shock-sensitive, and temperature-sensitive shipments, allows you to trust us with even the most delicate items. Additionally, our expertise in handling everything from small pins to aircraft engines ensures that your shipments are in capable hands.',
  },
  {
    question: 'How does OSV ensure a smooth and reliable logistics experience?',
    answer:
      'At ONNSYNEX VENTURES PRIVATE LIMITED, we take pride in our presence at maximum locations, allowing us to offer you comprehensive and integrated logistics solutions. From special divisions for handling temperature-controlled shipments to end-to-end cold chain solutions, we cater to diverse needs with efficiency. Our on-time delivery record reflects our commitment to punctuality and professionalism.',
  },
  {
    question: 'What sets OSV apart in international trade policies and customs practices?',
    answer:
      'OSV has a team of experts with deep experience in international trade policies and customs practices. Our understanding of regulatory frameworks helps ensure imports and exports comply with relevant laws and regulations, while our advisory network brings practical guidance to every shipment.',
  },
];

export const FAQSection = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const [activeFaq, setActiveFaq] = useState<number | null>(null);
  const [openedFaqs, setOpenedFaqs] = useState<Record<number, boolean>>({});

  const toggleFaq = (idx: number) => {
    const nextActive = activeFaq === idx ? null : idx;
    setActiveFaq(nextActive);
    if (nextActive !== null) {
      setOpenedFaqs((prev) => ({ ...prev, [idx]: true }));
    }
  };

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
    <section
      ref={sectionRef}
      className="relative overflow-hidden bg-[#101010] text-white border-b border-white/[0.06]"
      style={{ padding: 'clamp(56px, 7vw, 80px) clamp(20px, 5vw, 48px)' }}
    >
      <div
        className="pointer-events-none absolute inset-0"
        style={{ background: 'radial-gradient(circle 600px at 20% 50%, rgba(185,213,34,0.02) 0%, transparent 80%)' }}
      />

      <div className="relative w-full">
        <div className="reveal opacity-0 text-left" style={{ marginBottom: '32px' }}>
          <span className="text-[11px] font-bold uppercase tracking-[0.25em] text-[#b9d522]">
            FREQUENTLY ASKED QUESTIONS
          </span>
          <h2 className="mt-4 text-[36px] font-normal leading-[1.08] tracking-tight sm:text-[44px] md:text-[54px] text-white">
            Most Popular Questions
          </h2>
        </div>

        <div className="reveal opacity-0 flex flex-col gap-6 max-w-[860px] w-full">
          {faqs.map((faq, idx) => {
            const isOpen = activeFaq === idx;
            return (
              <div key={faq.question} className="w-full">
                <button
                  onClick={() => toggleFaq(idx)}
                  className="w-full flex items-center justify-between text-left py-2 transition-colors duration-300 focus:outline-none group"
                >
                  <span
                    className="text-[16px] sm:text-[18px] font-semibold tracking-tight pr-8 transition-colors duration-300 leading-snug"
                    style={{ color: isOpen ? '#b9d522' : '#ffffff' }}
                  >
                    {faq.question}
                  </span>
                  <ChevronDown
                    size={20}
                    className="text-[#b9d522] shrink-0 transition-transform duration-300"
                    style={{ transform: isOpen ? 'rotate(180deg)' : 'rotate(0deg)' }}
                  />
                </button>

                <div
                  className="grid transition-all duration-300 ease-in-out"
                  style={{
                    gridTemplateRows: isOpen ? '1fr' : '0fr',
                    opacity: isOpen ? 1 : 0,
                  }}
                >
                  <div className="overflow-hidden">
                    <div className="pb-4 text-[14.5px] leading-[1.7] text-white/70 pt-2">
                      {openedFaqs[idx] && faq.answer}
                    </div>
                  </div>
                </div>
              </div>
            );
          })}

          <div className="text-left pt-2">
            <p className="text-[15px] font-semibold text-[#b9d522]">
              Looking for answers to particular questions?{' '}
              <a href="#connect-with-us" className="underline transition-colors hover:text-[#d4f02a]">
                Contact
              </a>{' '}
              our experts now.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};
