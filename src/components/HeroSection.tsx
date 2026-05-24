import { ArrowRight, Box, Plane, Ship, Truck, Warehouse, X } from 'lucide-react';
import { useCallback, useEffect, useRef, useState } from 'react';

const services = [
  {
    id: 'road',
    label: 'Customs',
    icon: Truck,
    title: 'Zero red tape',
    description:
      'Swift customs clearance, non-interference and expert support for Indian import and export paperwork.',
    video: '/1.mp4',
  },
  {
    id: 'warehouse',
    label: 'Storage',
    icon: Warehouse,
    title: 'Duty-deferred warehousing',
    description:
      'World-class FTWZ storage across Delhi NCR, Mumbai, Gujarat and Chennai with safe handling for high-value cargo.',
    video: '/2.mp4',
  },
  {
    id: 'sea',
    label: 'Sea',
    icon: Ship,
    title: 'Cost-effective imports',
    description:
      'Sea freight and consolidation routes designed to reduce demurrage, penalties and tax friction.',
    video: '/3.mp4',
  },
  {
    id: 'air',
    label: 'Air',
    icon: Plane,
    title: 'Global movement',
    description:
      'Air freight support for time-sensitive shipments with end-to-end documentation and visibility.',
    video: '/4.mp4',
  },
  {
    id: 'digital',
    label: 'Digital',
    icon: Box,
    title: 'Tracking dashboard',
    description:
      'Real-time shipment tracking and operational updates for clients who need complete supply-chain visibility.',
    video: '/5.mp4',
  },
];

export const HeroSection = () => {
  const [activeIndex, setActiveIndex] = useState(0);
  const [nextIndex, setNextIndex] = useState<number | null>(null);
  const [popupOpen, setPopupOpen] = useState(false);
  const [videoProgress, setVideoProgress] = useState(0);

  const videoRefs = useRef<(HTMLVideoElement | null)[]>([]);
  const sectionRef = useRef<HTMLElement>(null);
  const isTransitioning = useRef(false);

  // Go to a specific slide
  const goTo = useCallback((index: number, startTime: number = 0) => {
    if (index === activeIndex || isTransitioning.current) return;
    
    isTransitioning.current = true;
    setNextIndex(index);
    setVideoProgress(0);
    setPopupOpen(false);

    // Play the next video
    const nextVid = videoRefs.current[index];
    if (nextVid) {
      nextVid.currentTime = startTime;
      nextVid.play().catch(() => {});
    }

    // After crossfade duration, commit the switch
    setTimeout(() => {
      const oldVid = videoRefs.current[activeIndex];
      if (oldVid) {
        oldVid.pause();
        oldVid.currentTime = 0;
      }
      setActiveIndex(index);
      setNextIndex(null);
      isTransitioning.current = false;
    }, 400); // Faster transition for smoother scrubbing
  }, [activeIndex]);

  const goNext = useCallback(() => {
    const next = (activeIndex + 1) % services.length;
    goTo(next);
  }, [activeIndex, goTo]);



  // Autoplay progression when a video ends natively
  const handleVideoEnded = useCallback((index: number) => {
    if (index === activeIndex && !isTransitioning.current) {
      goNext();
    }
  }, [activeIndex, goNext]);

  // Track video playback progress for the active slide
  const handleTimeUpdate = useCallback((index: number) => {
    if (index !== activeIndex) return;
    const vid = videoRefs.current[index];
    if (vid && vid.duration > 0) {
      setVideoProgress(vid.currentTime / vid.duration);
    }
  }, [activeIndex]);

  // Ensure all videos are muted and preloaded
  useEffect(() => {
    videoRefs.current.forEach((vid) => {
      if (vid) {
        vid.muted = true;
        vid.preload = "auto";
      }
    });
  }, []);

  // Ensure the active video plays automatically
  useEffect(() => {
    const vid = videoRefs.current[activeIndex];
    if (vid) {
      vid.play().catch(() => {});
    }
  }, [activeIndex]);

  // Wheel jacking for merged scroll-scrubbing effect
  useEffect(() => {
    const handleWheel = (e: WheelEvent) => {
      if (window.scrollY > 10) return;
      e.preventDefault();

      if (isTransitioning.current) return;

      const currentVid = videoRefs.current[activeIndex];
      if (!currentVid || !currentVid.duration) return;

      // Scrub sensitivity: e.g., 100px scroll = 0.5s of video
      const timeDelta = e.deltaY * 0.005; 
      let newTime = currentVid.currentTime + timeDelta;

      if (newTime >= currentVid.duration) {
        // Scrubbed past the end -> transition to next video
        if (activeIndex < services.length - 1) {
          const remainder = newTime - currentVid.duration;
          goTo(activeIndex + 1, remainder);
        } else {
          // Last video, just cap it
          currentVid.currentTime = currentVid.duration - 0.1;
        }
      } else if (newTime <= 0) {
        // Scrubbed past the beginning -> transition to prev video
        if (activeIndex > 0) {
          const prevVid = videoRefs.current[activeIndex - 1];
          const prevDuration = prevVid?.duration || 5; // fallback
          goTo(activeIndex - 1, prevDuration + newTime); // newTime is negative
        } else {
          currentVid.currentTime = 0;
        }
      } else {
        // Normal scrub within the current video
        currentVid.currentTime = newTime;
        // Ensure it stays playing so it continues automatically when scrolling stops
        currentVid.play().catch(()=>{});
      }
    };

    window.addEventListener('wheel', handleWheel, { passive: false });
    return () => window.removeEventListener('wheel', handleWheel);
  }, [activeIndex, goTo]);

  const current = services[activeIndex];
  const CurrentIcon = current.icon;

  return (
    <section ref={sectionRef} className="relative h-screen w-full overflow-hidden">
      <div className="relative h-full w-full overflow-hidden bg-[#0a0a0a]">
        {/* Video layers */}
        {services.map((service, index) => {
          const isActive = index === activeIndex;
          const isNext = index === nextIndex;
          return (
            <div
              key={service.id}
              className="absolute inset-0 w-full h-full"
              style={{
                opacity: isActive ? (nextIndex !== null ? 0 : 1) : isNext ? 1 : 0,
                transition: 'opacity 400ms ease',
                zIndex: isNext ? 2 : isActive ? 1 : 0,
                pointerEvents: isActive ? 'auto' : 'none',
              }}
            >
              <video
                ref={(el) => {
                  videoRefs.current[index] = el;
                }}
                className="hero-video w-full h-full object-cover"
                muted
                playsInline
                autoPlay
                src={service.video}
                onTimeUpdate={() => handleTimeUpdate(index)}
                onEnded={() => handleVideoEnded(index)}
              />
            </div>
          );
        })}

        {/* Gradient overlays */}
        <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(180deg,rgba(0,0,0,0.45)_0%,rgba(0,0,0,0.02)_40%,rgba(0,0,0,0.55)_100%)]" style={{ zIndex: 3 }} />

        {/* Content overlay */}
        <div className="absolute inset-0" style={{ zIndex: 4 }}>
          {/* Plus markers */}
          <button
            className="plus-marker absolute left-[27%] top-[39%] z-10"
            onClick={() => setPopupOpen(true)}
            aria-label="Open OSV customs highlight"
          >
            +
          </button>
          <button
            className="plus-marker absolute right-[30%] top-[34%] z-10 hidden sm:inline-flex"
            onClick={() => setPopupOpen(true)}
            aria-label="Open OSV warehousing highlight"
          >
            +
          </button>

          {/* Popup */}
          {popupOpen && (
            <div className="emons-glass absolute left-1/2 top-1/2 z-20 w-[min(360px,calc(100vw-32px))] -translate-x-1/2 -translate-y-1/2 rounded-[4px] p-5 md:left-[31%] md:top-[30%] md:translate-x-0 md:translate-y-0 animate-fade-in">
              <div className="mb-4 flex items-start justify-between gap-4">
                <div>
                  <div className="mb-2 flex h-10 w-10 items-center justify-center rounded-[4px] bg-[#ff5348] text-white">
                    <CurrentIcon size={21} />
                  </div>
                  <h3 className="text-2xl font-semibold leading-tight">{current.title}</h3>
                </div>
                <button
                  className="flex h-8 w-8 items-center justify-center rounded-full bg-white text-[#101010] transition-colors hover:bg-[#ff5348] hover:text-white"
                  onClick={() => setPopupOpen(false)}
                  aria-label="Close highlight"
                >
                  <X size={16} />
                </button>
              </div>
              <p className="text-[15px] leading-relaxed text-[#303030]">{current.description}</p>
              <a href="#services" className="pill-btn pill-btn-red mt-5">
                Explore this service
                <span className="pill-arrow">
                  <ArrowRight size={14} />
                </span>
              </a>
            </div>
          )}

          {/* Info card — bottom left */}
          <div className="absolute bottom-[86px] left-5 z-10 w-[min(418px,calc(100vw-40px))] rounded-[5px] md:bottom-[92px]">
            <div key={activeIndex} className="animate-fade-in">
              <div className="emons-glass rounded-[5px] p-4 sm:p-5">
                {activeIndex === 0 ? (
                  <>
                    <h1 className="text-[32px] font-medium leading-[1.05] text-[#101010] sm:text-[38px]">
                      OSV FTWZs — India's Premier Free Trade Zone
                    </h1>
                    <p className="mt-4 text-[14px] font-normal leading-[1.55] text-[#303030] sm:text-[15px]">
                      Welcome to a new era of international trade. Our cutting-edge Free Trade Port eliminates export headaches, delays, demurrage, penalties, and tax number requirements.
                    </p>
                    <div className="mt-6 flex flex-wrap gap-2">
                      <a href="#services" className="pill-btn pill-btn-red">
                        Services overview
                      </a>
                      <a href="#connect-with-us" className="pill-btn pill-btn-red bg-white/70 border-white/20 text-[#101010] hover:bg-[#101010] hover:text-white transition-colors">
                        For the freight request
                      </a>
                    </div>
                  </>
                ) : (
                  <>
                    <div className="flex items-center gap-3 mb-3">
                      <div className="flex h-9 w-9 items-center justify-center rounded-[4px] bg-[#ff5348] text-white">
                        <CurrentIcon size={18} />
                      </div>
                      <span className="text-[11px] font-bold uppercase tracking-widest text-[#ff5348]">
                        Service {activeIndex + 1} of {services.length}
                      </span>
                    </div>
                    <h2 className="text-[28px] font-semibold leading-[1.1] text-[#101010] sm:text-[32px]">
                      {current.title}
                    </h2>
                    <p className="mt-3 text-[14px] font-normal leading-[1.55] text-[#303030] sm:text-[15px]">
                      {current.description}
                    </p>
                    <div className="mt-6 flex flex-wrap gap-2">
                      <a href="#services" className="pill-btn pill-btn-red">
                        Explore this service
                        <span className="pill-arrow">
                          <ArrowRight size={13} />
                        </span>
                      </a>
                      <button
                        onClick={() => setPopupOpen(true)}
                        className="pill-btn bg-white/80 border-white/40 hover:bg-[#ff5348] hover:text-white transition-colors text-[#101010] font-semibold"
                      >
                        Quick facts
                      </button>
                    </div>
                  </>
                )}
              </div>
            </div>
          </div>

          {/* Bottom bar: progress + navigation */}
          <div className="absolute bottom-5 left-5 right-5 z-10">
            {/* Segmented progress bar */}
            <div className="flex gap-1.5 mb-4">
              {services.map((_, index) => (
                <button
                  key={index}
                  className="hero-progress-segment relative h-[3px] flex-1 rounded-full overflow-hidden cursor-pointer group"
                  style={{ background: 'rgba(255,255,255,0.25)' }}
                  onClick={() => goTo(index)}
                  aria-label={`Go to slide ${index + 1}`}
                >
                  <span
                    className="absolute inset-y-0 left-0 rounded-full transition-colors"
                    style={{
                      width:
                        index < activeIndex
                          ? '100%'
                          : index === activeIndex
                            ? `${videoProgress * 100}%`
                            : '0%',
                      background: index <= activeIndex ? '#ff5348' : 'rgba(255,255,255,0.5)',
                      transition:
                        index === activeIndex
                          ? 'width 50ms linear'
                          : 'width 200ms ease, background 200ms ease',
                    }}
                  />
                  {/* Hover expand */}
                  <span className="absolute inset-x-0 -top-1 -bottom-1 rounded-full opacity-0 group-hover:opacity-100 transition-opacity" style={{ background: 'rgba(255,255,255,0.08)' }} />
                </button>
              ))}
            </div>

            <div className="flex items-center justify-between gap-4">
              <div className="hide-scrollbar flex max-w-full gap-2 overflow-x-auto pb-1">
                {services.map((service, index) => {
                  const Icon = service.icon;
                  return (
                    <button
                      key={service.id}
                      className={`bottom-nav-item shrink-0 ${index === activeIndex ? 'active' : ''}`}
                      onClick={() => goTo(index)}
                    >
                      <span>{String(index + 1).padStart(2, '0')}</span>
                      <Icon size={15} />
                      <span className="hidden sm:inline">{service.label}</span>
                    </button>
                  );
                })}
              </div>

              <div className="flex items-center gap-2">
                <a href="#services" className="pill-btn pill-btn-red hidden shrink-0 md:inline-flex">
                  All services
                  <span className="pill-arrow">
                    <ArrowRight size={14} />
                  </span>
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
