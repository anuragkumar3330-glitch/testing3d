import { useState, useEffect, useRef } from 'react';
import { ChevronLeft, ChevronRight, Quote } from 'lucide-react';

const reviews = [
  {
    text: "OSV FTZ has seamlessly become a core part of our Indian market strategy. They have a top-notch compliance team to handle various customs issues. Moreover, they offer various value adds like repackaging and kitting which have helped cut costs, giving a leg up to emerging businesses like ours.",
    role: "Senior Partner",
    company: "Solar Energy OEM",
    image: "/images/Senior.webp"
  },
  {
    text: "We have been associated with OSV since the last 12 years, when our annual turnover was just 8% of what it is today. Since then our both business and our relationship with OSV has grown. We chose them because we wanted a company which was reliable, had a perfect track record in safety and would provide us with exceptional support. They've played a vital role in fueling our growth.",
    role: "Director of Operations",
    company: "Pharmaceutical firm",
    image: "/images/Director.webp"
  },
  {
    text: "Partnering with OSV for our FTWZ needs has significantly optimized our supply chain operations. Their absolute compliance expertise and duty-deferment benefits have enhanced our working capital efficiency. The level of dedication and promptness they display is unmatched.",
    role: "Head of Supply Chain",
    company: "Global Technology Corp",
    image: "/images/VP.webp"
  }
];

export const ReviewsSection = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [visibleCount, setVisibleCount] = useState(2);
  const [isPaused, setIsPaused] = useState(false);

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

  // Auto-play / auto-move functionality
  useEffect(() => {
    if (isPaused) return;
    const timer = setInterval(() => {
      nextSlide();
    }, 4500); // Automatically move every 4.5 seconds

    return () => clearInterval(timer);
  }, [visibleCount, isPaused, currentIndex]);

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
      className="bg-[#101010] text-white border-b border-white/[0.06]"
      style={{ padding: '80px 48px' }}
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
        <div 
          className="reveal opacity-0 overflow-hidden" 
          style={{ margin: '0 -12px' }}
          onMouseEnter={() => setIsPaused(true)}
          onMouseLeave={() => setIsPaused(false)}
        >
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
                  className="relative overflow-hidden bg-[#131313] border border-white/[0.04] rounded-2xl p-6 sm:p-10 flex flex-col justify-between h-full text-left"
                  style={{ minHeight: '340px' }}
                >
                  {/* Subtle watermarked large Quote icon in the bottom-right corner */}
                  <Quote 
                    size={140} 
                    className="absolute right-4 bottom-4 text-white/[0.015] transform rotate-180 pointer-events-none"
                    style={{ fill: 'currentColor' }}
                  />

                  <div className="flex flex-col flex-grow w-full relative z-10">
                    {/* Review text - left aligned as requested */}
                    <p className="text-[15px] sm:text-[16px] leading-[1.75] text-white/80 font-normal text-left">
                      "{rev.text}"
                    </p>
                  </div>

                  {/* Author Area with client image - left aligned as requested */}
                  <div className="mt-8 flex items-center gap-4 relative z-10">
                    <img 
                      src={rev.image} 
                      alt={rev.role} 
                      className="h-12 w-12 rounded-full object-cover border border-white/10 flex-shrink-0 bg-white/5"
                      onError={(e) => {
                        // Fallback in case of image load failure
                        (e.target as HTMLImageElement).src = 'data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="%23ffffff" stroke-width="1" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="8" r="4"/><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/></svg>';
                      }}
                    />
                    <div className="text-left">
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
