import { useEffect, useRef, useState } from 'react';

const stats = [
  { value: '$500M+', label: 'Worth of goods handled' },
  { value: '$12M+', label: 'Saved in logistics' },
  { value: '30+', label: 'Sectors served' },
  { value: '50', label: 'Years legacy' },
  { value: '4', label: 'Major Indian zones' },
  { value: '24/7', label: 'Operations support' },
];

const CountUp = ({ target }: { target: string }) => {
  const [display, setDisplay] = useState('0');
  const ref = useRef<HTMLSpanElement>(null);
  const hasAnimated = useRef(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting || hasAnimated.current) return;
          hasAnimated.current = true;

          const numMatch = target.match(/[\d,]+/);
          if (!numMatch) {
            setDisplay(target);
            return;
          }

          const numStr = numMatch[0].replace(/,/g, '');
          const num = Number.parseInt(numStr, 10);
          const prefix = target.slice(0, target.indexOf(numMatch[0]));
          const suffix = target.slice(target.indexOf(numMatch[0]) + numMatch[0].length);
          const steps = 54;
          let step = 0;

          const timer = window.setInterval(() => {
            step += 1;
            const current = Math.min(Math.round((num / steps) * step), num);
            setDisplay(`${prefix}${current.toLocaleString()}${suffix}`);
            if (step >= steps) window.clearInterval(timer);
          }, 24);
        });
      },
      { threshold: 0.45 }
    );

    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, [target]);

  return <span ref={ref}>{display}</span>;
};

export const StatsSection = () => {
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) entry.target.classList.add('animate-fade-in');
        });
      },
      { threshold: 0.1 }
    );
    const elements = sectionRef.current?.querySelectorAll('.reveal');
    elements?.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="bg-[#101010] text-white"
      style={{ marginTop: 'clamp(48px, 7vw, 80px)', padding: 'clamp(56px, 7vw, 80px) clamp(20px, 5vw, 48px)' }}
    >
      
      {/* Header */}
      <div className="reveal mb-16 flex flex-col gap-6 opacity-0 lg:flex-row lg:items-end lg:justify-between">
        <div className="max-w-[600px]">
          <span className="text-[11px] font-bold uppercase tracking-[0.2em] text-[#b9d522]">
            By the numbers
          </span>
          <h2 className="mt-4 text-[36px] font-normal leading-[1.08] tracking-tight text-white sm:text-[44px] md:text-[54px]">
            Scale that keeps<br />trade moving.
          </h2>
        </div>
        <p className="max-w-[440px] text-[15px] leading-[1.75] text-white/60 lg:text-right">
          OSV combines a legacy logistics network with FTWZ infrastructure, helping clients reduce delays, penalties, demurrage and needless tax friction.
        </p>
      </div>

      {/* Stats Grid */}
      <div className="reveal grid grid-cols-2 gap-px opacity-0 md:grid-cols-3" style={{ background: 'rgba(255,255,255,0.08)', borderRadius: '16px', overflow: 'hidden' }}>
        {stats.map((stat) => (
          <div
            key={stat.label}
            className="flex flex-col justify-between bg-[#101010] p-6 transition-colors duration-300 hover:bg-white/[0.04] sm:p-8"
            style={{ minHeight: '180px' }}
          >
            <p className="text-[28px] font-normal leading-none text-[#b9d522] xs:text-[32px] sm:text-[40px] md:text-[48px]">
              <CountUp target={stat.value} />
            </p>
            <p className="mt-4 text-[11px] font-bold uppercase tracking-[0.15em] leading-[1.5] text-white/50 sm:text-[12px]">
              {stat.label}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
};
