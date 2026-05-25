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
  },
  {
    id: 'warehouse',
    label: 'Storage',
    icon: Warehouse,
    title: 'Duty-deferred warehousing',
    description:
      'World-class FTWZ storage across Delhi NCR, Mumbai, Gujarat and Chennai with safe handling for high-value cargo.',
  },
  {
    id: 'sea',
    label: 'Sea',
    icon: Ship,
    title: 'Cost-effective imports',
    description:
      'Sea freight and consolidation routes designed to reduce demurrage, penalties and tax friction.',
  },
  {
    id: 'air',
    label: 'Air',
    icon: Plane,
    title: 'Global movement',
    description:
      'Air freight support for time-sensitive shipments with end-to-end documentation and visibility.',
  },
  {
    id: 'digital',
    label: 'Digital',
    icon: Box,
    title: 'Tracking dashboard',
    description:
      'Real-time shipment tracking and operational updates for clients who need complete supply-chain visibility.',
  },
];

const TOTAL_FRAMES = 1205;
const FRAMES_PER_SERVICE = TOTAL_FRAMES / services.length;

export const HeroSection = () => {
  const [activeIndex, setActiveIndex] = useState(0);
  const [popupOpen, setPopupOpen] = useState(false);
  const [videoProgress, setVideoProgress] = useState(0);

  const canvasRef = useRef<HTMLCanvasElement>(null);
  const sectionRef = useRef<HTMLElement>(null);
  
  const currentFrameRef = useRef(1);
  const targetFrame = useRef(1);
  const imageCache = useRef<Map<number, HTMLImageElement>>(new Map());
  const requestRef = useRef<number | undefined>(undefined);
  const lastTimeRef = useRef<number | undefined>(undefined);
  const lastInteractionTime = useRef<number>(0);

  const getFramePath = (frame: number) => {
    return `/frames/${String(frame).padStart(5, '0')}.png`;
  };

  const preloadImages = useCallback((startFrame: number, count: number) => {
    for (let i = startFrame; i < startFrame + count && i <= TOTAL_FRAMES; i++) {
      if (!imageCache.current.has(i)) {
        const img = new Image();
        img.src = getFramePath(i);
        imageCache.current.set(i, img);
      }
    }
  }, []);

  const drawFrame = useCallback((frame: number) => {
    const canvas = canvasRef.current;
    const ctx = canvas?.getContext('2d');
    if (!canvas || !ctx) return;

    const img = imageCache.current.get(frame);
    if (img && img.complete) {
      const parent = canvas.parentElement;
      if (parent) {
        const dpr = window.devicePixelRatio || 1;
        const rect = parent.getBoundingClientRect();
        const displayWidth = Math.round(rect.width * dpr);
        const displayHeight = Math.round(rect.height * dpr);

        if (canvas.width !== displayWidth || canvas.height !== displayHeight) {
          canvas.width = displayWidth;
          canvas.height = displayHeight;
          canvas.style.width = `${rect.width}px`;
          canvas.style.height = `${rect.height}px`;
        }
      }

      const { width, height } = canvas;
      const imgRatio = img.width / img.height;
      const canvasRatio = width / height;

      let drawWidth, drawHeight, offsetX, offsetY;
      if (canvasRatio > imgRatio) {
        drawWidth = width;
        drawHeight = width / imgRatio;
        offsetX = 0;
        offsetY = (height - drawHeight) / 2;
      } else {
        drawWidth = height * imgRatio;
        drawHeight = height;
        offsetX = (width - drawWidth) / 2;
        offsetY = 0;
      }
      ctx.clearRect(0, 0, width, height);
      ctx.drawImage(img, offsetX, offsetY, drawWidth, drawHeight);
    } else if (!img) {
      const newImg = new Image();
      newImg.src = getFramePath(frame);
      newImg.onload = () => {
        if (Math.round(currentFrameRef.current) === frame) {
          drawFrame(frame);
        }
      };
      imageCache.current.set(frame, newImg);
    }
  }, []);

  const render = useCallback((time: number) => {
    if (lastTimeRef.current === undefined) {
      lastTimeRef.current = time;
    }
    const dt = Math.min(time - lastTimeRef.current, 50); // Cap at 50ms to prevent jumps
    lastTimeRef.current = time;

    // Autoplay when at top and popup is closed, and user hasn't interacted recently
    const timeSinceInteraction = time - lastInteractionTime.current;
    if (!popupOpen && window.scrollY <= 10 && timeSinceInteraction > 1500) {
       targetFrame.current += (dt * 0.035);
       
       if (targetFrame.current >= TOTAL_FRAMES) {
         targetFrame.current = 1;
         currentFrameRef.current = 1; // Instant snap back to start
       }
       
       const currentInt = Math.round(targetFrame.current);
       if (currentInt % 10 === 0) {
         preloadImages(currentInt, 20);
       }
    }

    const diff = targetFrame.current - currentFrameRef.current;
    
    let newFrame = currentFrameRef.current;
    if (Math.abs(diff) > FRAMES_PER_SERVICE) {
       newFrame += diff * 0.25;
    } else if (Math.abs(diff) > 0.1) {
       newFrame += diff * 0.15;
    } else {
      newFrame = targetFrame.current;
    }

    if (newFrame !== currentFrameRef.current) {
      currentFrameRef.current = newFrame;
      drawFrame(Math.round(newFrame));

      const newActiveIndex = Math.min(
        services.length - 1,
        Math.max(0, Math.floor((Math.round(newFrame) - 1) / FRAMES_PER_SERVICE))
      );

      setActiveIndex(newActiveIndex);

      const frameInService = newFrame - (newActiveIndex * FRAMES_PER_SERVICE);
      setVideoProgress(Math.max(0, Math.min(1, frameInService / FRAMES_PER_SERVICE)));
    }

    requestRef.current = requestAnimationFrame(render);
  }, [drawFrame, popupOpen, preloadImages]);

  useEffect(() => {
    requestRef.current = requestAnimationFrame(render);
    return () => {
      if (requestRef.current) cancelAnimationFrame(requestRef.current);
    };
  }, [render]);

  useEffect(() => {
    preloadImages(1, 40);
    const checkFirstFrame = setInterval(() => {
      const img = imageCache.current.get(1);
      if (img && img.complete) {
        drawFrame(1);
        clearInterval(checkFirstFrame);
      }
    }, 50);
    return () => clearInterval(checkFirstFrame);
  }, [preloadImages, drawFrame]);

  useEffect(() => {
    const handleResize = () => drawFrame(Math.round(currentFrameRef.current));
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, [drawFrame]);

  // Wheel scrubbing
  useEffect(() => {
    const handleWheel = (e: WheelEvent) => {
      if (window.scrollY > 0) return;

      if (e.deltaY < 0 && targetFrame.current <= 1) return;
      if (e.deltaY > 0 && targetFrame.current >= TOTAL_FRAMES) return;

      e.preventDefault();
      lastInteractionTime.current = performance.now();

      const frameDelta = e.deltaY * 0.4;
      let newTarget = targetFrame.current + frameDelta;
      newTarget = Math.max(1, Math.min(TOTAL_FRAMES, newTarget));
      targetFrame.current = newTarget;

      const currentInt = Math.round(newTarget);
      if (frameDelta > 0) {
        preloadImages(currentInt, 25);
      } else {
        preloadImages(Math.max(1, currentInt - 25), 25);
      }
    };

    window.addEventListener('wheel', handleWheel, { passive: false });
    return () => window.removeEventListener('wheel', handleWheel);
  }, [preloadImages]);

  // Touch scrubbing
  useEffect(() => {
    let lastY = 0;
    
    const handleTouchStart = (e: TouchEvent) => {
      if (window.scrollY > 0) return;
      lastY = e.touches[0].clientY;
    };

    const handleTouchMove = (e: TouchEvent) => {
      if (window.scrollY > 0) return;
      
      const currentY = e.touches[0].clientY;
      const deltaY = lastY - currentY;
      
      if (deltaY < 0 && targetFrame.current <= 1) return;
      if (deltaY > 0 && targetFrame.current >= TOTAL_FRAMES) return;

      e.preventDefault();
      lastInteractionTime.current = performance.now();
      
      const frameDelta = deltaY * 1.5; 
      let newTarget = targetFrame.current + frameDelta;
      newTarget = Math.max(1, Math.min(TOTAL_FRAMES, newTarget));
      targetFrame.current = newTarget;
      
      const currentInt = Math.round(newTarget);
      if (frameDelta > 0) {
        preloadImages(currentInt, 25);
      } else {
        preloadImages(Math.max(1, currentInt - 25), 25);
      }
      
      lastY = currentY;
    };

    window.addEventListener('touchstart', handleTouchStart, { passive: false });
    window.addEventListener('touchmove', handleTouchMove, { passive: false });
    
    return () => {
      window.removeEventListener('touchstart', handleTouchStart);
      window.removeEventListener('touchmove', handleTouchMove);
    };
  }, [preloadImages]);

  const goTo = (index: number) => {
    if (index === activeIndex) return;
    lastInteractionTime.current = performance.now();
    const newFrame = index * FRAMES_PER_SERVICE + 1;
    targetFrame.current = newFrame;
    setPopupOpen(false);
    preloadImages(newFrame, 30);
  };

  const current = services[activeIndex] || services[0];
  const CurrentIcon = current.icon;

  return (
    <section ref={sectionRef} className="relative h-screen w-full overflow-hidden">
      <div className="relative h-full w-full overflow-hidden bg-[#0a0a0a]">
        
        {/* Canvas for image sequence */}
        <div className="absolute inset-0 w-full h-full" style={{ zIndex: 1 }}>
          <canvas ref={canvasRef} className="w-full h-full object-cover block" />
        </div>

        {/* Gradient overlays */}
        <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(180deg,rgba(0,0,0,0.45)_0%,rgba(0,0,0,0.02)_40%,rgba(0,0,0,0.55)_100%)]" style={{ zIndex: 3 }} />

        {/* Content overlay */}
        <div className="absolute inset-0" style={{ zIndex: 4 }}>
          {/* Popup */}
          {popupOpen && (
            <div className="emons-glass absolute left-1/2 top-1/2 z-20 w-[min(360px,calc(100vw-32px))] -translate-x-1/2 -translate-y-1/2 rounded-[4px] p-5 md:left-[31%] md:top-[30%] md:translate-x-0 md:translate-y-0 animate-fade-in">
              <div className="mb-4 flex items-start justify-between gap-4">
                <div>
                  <div className="mb-2 flex h-10 w-10 items-center justify-center rounded-[4px] bg-[#b9d522] text-white">
                    <CurrentIcon size={21} />
                  </div>
                  <h3 className="text-2xl font-semibold leading-tight">{current.title}</h3>
                </div>
                <button
                  className="flex h-8 w-8 items-center justify-center rounded-full bg-white text-[#101010] transition-colors hover:bg-[#b9d522] hover:text-white"
                  onClick={() => setPopupOpen(false)}
                  aria-label="Close highlight"
                >
                  <X size={16} />
                </button>
              </div>
              <p className="text-[15px] leading-relaxed text-[#303030]">{current.description}</p>
              <a href="#services" className="pill-btn pill-btn-dark mt-5">
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
                      <a href="#services" className="pill-btn pill-btn-dark">
                        Services overview
                      </a>
                      <a href="#connect-with-us" className="pill-btn pill-btn-dark bg-white/70 border-white/20 text-[#101010] hover:bg-[#101010] hover:text-white transition-colors">
                        For the freight request
                      </a>
                    </div>
                  </>
                ) : (
                  <>
                    <div className="flex items-center gap-3 mb-3">
                      <div className="flex h-9 w-9 items-center justify-center rounded-[4px] bg-[#b9d522] text-white">
                        <CurrentIcon size={18} />
                      </div>
                      <span className="text-[11px] font-bold uppercase tracking-widest text-[#b9d522]">
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
                      <a href="#services" className="pill-btn pill-btn-dark">
                        Explore this service
                        <span className="pill-arrow">
                          <ArrowRight size={13} />
                        </span>
                      </a>
                      <button
                        onClick={() => setPopupOpen(true)}
                        className="pill-btn bg-white/80 border-white/40 hover:bg-[#b9d522] hover:text-white transition-colors text-[#101010] font-semibold"
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
                      background: index <= activeIndex ? '#ffffff' : 'rgba(255,255,255,0.5)',
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
                <a href="#services" className="pill-btn pill-btn-dark hidden shrink-0 md:inline-flex">
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
