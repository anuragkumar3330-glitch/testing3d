import { useState, useEffect, useRef } from 'react';
import { ChevronLeft, ChevronRight, Quote } from 'lucide-react';

const reviews = [
  {
    text: "OSV FTZ has seamlessly become a core part of our Indian market strategy. They have a top-notch compliance team to handle various customs issues. Moreover, they offer various value adds like repackaging and kitting which have helped cut costs, giving a leg up to emerging businesses like ours.",
    role: "Senior Partner",
    company: "Solar Energy OEM",
  },
  {
    text: "We have been associated with OSV since the last 12 years, when our annual turnover was just 8% of what it is today. Since then our both business and our relationship with OSV has grown. We chose them because we wanted a company which was reliable, had a perfect track record in safety and would provide us with exceptional support. They've played a vital role in fueling our growth.",
    role: "Director of Operations",
    company: "Pharmaceutical firm",
  },
  {
    text: "Partnering with OSV for our FTWZ needs has significantly optimized our supply chain operations. Their absolute compliance expertise and duty-deferment benefits have enhanced our working capital efficiency. The level of dedication and promptness they display is unmatched.",
    role: "Head of Supply Chain",
    company: "Global Technology Corp",
  }
];

export const ReviewsSection = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [visibleCount, setVisibleCount] = useState(2);

  // Update visible cards based on screen size
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 768) {
        setVisibleCount(1);
      } else {
        setVisibleCount(2);
      }
    };
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Make sure currentIndex is valid when visibleCount changes
  useEffect(() => {
    const maxIndex = reviews.length - visibleCount;
    if (currentIndex > maxIndex) {
      setCurrentIndex(Math.max(0, maxIndex));
    }
  }, [visibleCount, currentIndex]);

  const nextSlide = () => {
    const maxIndex = reviews.length - visibleCount;
    if (maxIndex <= 0) return;
    setCurrentIndex((prev) => (prev >= maxIndex ? 0 : prev + 1));
  };

  const prevSlide = () => {
    const maxIndex = reviews.length - visibleCount;
    if (maxIndex <= 0) return;
    setCurrentIndex((prev) => (prev <= 0 ? maxIndex : prev - 1));
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

  const translatePercent = currentIndex * (100 / visibleCount);

  return (
    <section 
      ref={sectionRef} 
      className="bg-[#101010] text-white border-b border-white/[0.06] px-6 py-20 md:px-12 lg:px-[48px]"
    >
      <div className="w-full">
        
        {/* Header - Aligned exactly with other section headers */}
        <div className="reveal opacity-0 flex flex-col gap-6 md:flex-row md:items-end md:justify-between" style={{ marginBottom: '56px' }}>
          <div>
            <span className="text-[11px] font-bold uppercase tracking-[0.2em] text-[#b9d522]">
              CLIENTS REVIEWS
            </span>
            <h2 className="mt-4 text-[36px] font-normal leading-[1.08] tracking-tight text-white sm:text-[44px] md:text-[54px]">
              Over 100 Worldwide Clients
            </h2>
          </div>

          {/* Navigation Arrows */}
          <div className="flex gap-3 mt-4 md:mt-0">
            <button
              onClick={prevSlide}
              className="flex h-12 w-12 items-center justify-center rounded-full border border-white/10 text-white transition-all duration-300 hover:border-[#b9d522] hover:text-[#b9d522] focus:outline-none cursor-pointer"
              aria-label="Previous review"
            >
              <ChevronLeft size={20} />
            </button>
            <button
              onClick={nextSlide}
              className="flex h-12 w-12 items-center justify-center rounded-full border border-white/10 text-white transition-all duration-300 hover:border-[#b9d522] hover:text-[#b9d522] focus:outline-none cursor-pointer"
              aria-label="Next review"
            >
              <ChevronRight size={20} />
            </button>
          </div>
        </div>

        {/* Carousel Window */}
        <div className="reveal opacity-0 overflow-hidden" style={{ margin: '0 -12px' }}>
          <div 
            className="flex"
            style={{
              transform: `translateX(-${translatePercent}%)`,
              transition: 'transform 0.6s cubic-bezier(0.25, 1, 0.5, 1)',
            }}
          >
            {reviews.map((rev, idx) => (
              <div 
                key={idx}
                className="flex-shrink-0"
                style={{
                  width: `${100 / visibleCount}%`,
                  padding: '0 12px',
                }}
              >
                {/* Review Card */}
                <div 
                  className="bg-[#131313] border border-white/[0.04] rounded-2xl p-6 sm:p-10 flex flex-col items-center justify-center text-center h-full"
                  style={{ minHeight: '360px' }}
                >
                  <div className="flex flex-col items-center justify-center flex-grow w-full">
                    {/* Blue Quote Icon */}
                    <Quote 
                      size={36} 
                      className="text-[#1e5194] transform rotate-180 mb-6 mx-auto"
                      style={{ fill: 'currentColor' }}
                    />
                    
                    {/* Review text */}
                    <p className="text-[15px] sm:text-[16px] leading-[1.75] text-white/80 font-normal max-w-2xl mx-auto">
                      {rev.text}
                    </p>
                  </div>

                  {/* Author Area with Image Placeholder */}
                  <div className="mt-8 flex flex-col items-center gap-3">
                    {/* Styled Empty Circular Placeholder for user image */}
                    <div 
                      className="h-14 w-14 rounded-full border border-dashed border-white/20 bg-white/[0.02] flex-shrink-0 flex items-center justify-center text-[10px] text-white/30 uppercase tracking-widest"
                      title="Client avatar placeholder - image to be provided"
                    >
                      Empty
                    </div>
                    
                    <div className="text-center">
                      <h4 className="text-[15px] font-semibold text-white leading-snug">
                        {rev.role}
                      </h4>
                      <p className="text-[13px] font-medium text-[#b9d522] mt-0.5">
                        {rev.company}
                      </p>
                    </div>
                  </div>

                </div>
              </div>
            ))}
          </div>
        </div>

      </div>
    </section>
  );
};
