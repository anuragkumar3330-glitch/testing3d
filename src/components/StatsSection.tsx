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
      { threshold: 0.16 }
    );
    const elements = sectionRef.current?.querySelectorAll('.reveal');
    elements?.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, []);

  return (
    <section ref={sectionRef} className="bg-[#101010] px-5 py-24 text-white md:px-12 lg:px-20">
      <div className="mx-auto max-w-[1400px]">
        <div className="reveal mb-14 grid grid-cols-1 gap-8 opacity-0 md:grid-cols-[0.9fr_1.1fr] md:items-end">
          <div>
            <span className="section-label border-white/18 bg-white/10 text-white">By the numbers</span>
            <h2 className="mt-7 text-[42px] font-normal leading-[1.02] md:text-[66px]">
              Scale that keeps trade moving.
            </h2>
          </div>
          <p className="max-w-[620px] text-[17px] leading-[1.75] text-white/72">
            OSV combines a legacy logistics network with FTWZ infrastructure, helping clients reduce delays, penalties, demurrage and needless tax friction.
          </p>
        </div>

        <div className="reveal grid grid-cols-1 border-l border-t border-white/12 opacity-0 sm:grid-cols-2 lg:grid-cols-3">
          {stats.map((stat) => (
            <div key={stat.label} className="min-h-[220px] border-b border-r border-white/12 p-7 transition-colors duration-200 hover:bg-white/8 md:p-9">
              <p className="text-[56px] font-normal leading-none text-[#ff5348] md:text-[78px]">
                <CountUp target={stat.value} />
              </p>
              <p className="mt-6 max-w-[220px] text-[15px] font-semibold uppercase leading-[1.45] text-white/74">
                {stat.label}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
