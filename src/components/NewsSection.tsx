import { ArrowRight, ChevronLeft, ChevronRight } from 'lucide-react';
import { useEffect, useRef, useState } from 'react';

const newsItems = [
  {
    title: 'Duty-deferred warehousing for importers entering India',
    category: 'FTWZ Advantage',
    image: '/images/news_featured.png',
  },
  {
    title: 'Custom clearance without red tape, delay or penalties',
    category: 'Compliance',
    image: '/images/warehouse.png',
  },
  {
    title: 'Pan-India facilities across Delhi NCR, Mumbai, Gujarat and Chennai',
    category: 'Network',
    image: '/images/about_collage.png',
  },
];

export const NewsSection = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const sectionRef = useRef<HTMLDivElement>(null);

  const nextSlide = () => setCurrentSlide((prev) => (prev + 1) % newsItems.length);
  const prevSlide = () => setCurrentSlide((prev) => (prev - 1 + newsItems.length) % newsItems.length);

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

  const current = newsItems[currentSlide];

  return (
    <section id="industries" ref={sectionRef} className="bg-white px-5 py-24 md:px-12 lg:px-20">
      <div className="mx-auto max-w-[1400px]">
        <div className="reveal mb-12 flex flex-col justify-between gap-8 opacity-0 md:flex-row md:items-end">
          <div>
            <span className="section-label">Industries and insights</span>
            <h2 className="mt-7 text-[42px] font-normal leading-[1.02] md:text-[64px]">
              Built for importers who need certainty.
            </h2>
          </div>
          <div className="flex items-center gap-2">
            <button onClick={prevSlide} className="flex h-10 w-10 items-center justify-center rounded-full bg-[#f5f2ee] text-[#101010] transition-colors hover:bg-[#b9d522] hover:text-white" aria-label="Previous insight">
              <ChevronLeft size={19} />
            </button>
            <button onClick={nextSlide} className="flex h-10 w-10 items-center justify-center rounded-full bg-[#f5f2ee] text-[#101010] transition-colors hover:bg-[#b9d522] hover:text-white" aria-label="Next insight">
              <ChevronRight size={19} />
            </button>
          </div>
        </div>

        <div className="reveal group grid grid-cols-1 opacity-0 lg:grid-cols-[1.15fr_0.85fr]">
          <div className="news-thumb min-h-[360px] bg-[#ddd2ca] lg:min-h-[560px]">
            <img src={current.image} alt={current.title} className="h-full w-full object-cover" />
          </div>
          <div className="flex flex-col justify-between bg-[#f5f2ee] p-8 md:p-12">
            <div>
              <span className="section-label">{current.category}</span>
              <h3 className="mt-8 text-[36px] font-normal leading-[1.08] md:text-[58px]">
                {current.title}
              </h3>
              <p className="mt-7 max-w-[520px] text-[16px] leading-[1.75] text-[#565656]">
                OSV FTWZ is designed for companies handling sensitive cargo, high-value goods and complex import cycles where compliance and timing cannot slip.
              </p>
            </div>
            <a href="#connect-with-us" className="pill-btn pill-btn-dark mt-10 w-fit">
              Read more
              <span className="pill-arrow">
                <ArrowRight size={14} />
              </span>
            </a>
          </div>
        </div>

        <div className="reveal mt-8 flex justify-center gap-2 opacity-0">
          {newsItems.map((item, index) => (
            <button
              key={item.title}
              onClick={() => setCurrentSlide(index)}
              className={`h-2.5 rounded-full transition-all duration-200 ${
                index === currentSlide ? 'w-10 bg-[#b9d522]' : 'w-2.5 bg-[#e3d8cf] hover:bg-[#cccccc]'
              }`}
              aria-label={`Show ${item.category}`}
            />
          ))}
        </div>
      </div>
    </section>
  );
};
