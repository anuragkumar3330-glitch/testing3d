import { Suspense, useEffect, useRef, useState } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls, useTexture } from '@react-three/drei';
import * as THREE from 'three';
import { Globe as GlobeIcon, ArrowRight } from 'lucide-react';

// Inner Globe Component
const Globe = ({ texturePath }: { texturePath: string }) => {
  const globeRef = useRef<THREE.Mesh>(null);
  const texture = useTexture(texturePath);

  // Auto-rotate the globe slowly
  useFrame(() => {
    if (globeRef.current) {
      globeRef.current.rotation.y += 0.0025;
    }
  });

  return (
    <group>
      {/* Central Rotating Globe with 1.webp Map Texture */}
      <mesh ref={globeRef}>
        <sphereGeometry args={[2.2, 64, 64]} />
        <meshStandardMaterial
          map={texture}
          roughness={0.4}
          metalness={0.1}
          bumpScale={0.05}
        />
      </mesh>

      {/* Atmospheric Glow Layer (matching lime green theme) */}
      <mesh>
        <sphereGeometry args={[2.23, 64, 64]} />
        <meshBasicMaterial
          color="#b9d522"
          transparent
          opacity={0.05}
          blending={THREE.AdditiveBlending}
          side={THREE.BackSide}
        />
      </mesh>
    </group>
  );
};

// Canvas-based 3D Globe Wrapper
const ThreeGlobe = () => {
  return (
    <div className="w-full h-[350px] sm:h-[450px] md:h-[500px] relative">
      <Suspense fallback={
        <div className="absolute inset-0 flex flex-col items-center justify-center bg-[#131313]/50 rounded-2xl border border-white/[0.04]">
          <div className="h-10 w-10 animate-spin rounded-full border-2 border-t-transparent border-[#b9d522]" />
          <p className="mt-4 text-xs text-white/50 uppercase tracking-widest">Loading World Map...</p>
        </div>
      }>
        <Canvas 
          camera={{ position: [0, 0, 5], fov: 60 }}
          gl={{ antialias: true, alpha: true }}
          style={{ background: 'transparent', width: '100%', height: '100%' }}
        >
          {/* Studio Lights */}
          <ambientLight intensity={1.5} />
          <directionalLight position={[5, 3, 5]} intensity={2.5} />
          <directionalLight position={[-5, -3, -5]} intensity={1.0} color="#b9d522" />
          <pointLight position={[10, 10, 10]} intensity={1.5} />

          <Globe texturePath="/images/1.webp" />

          {/* User Interactivity (Click and drag to spin globe) */}
          <OrbitControls 
            enableZoom={false} 
            enablePan={false}
            autoRotate={false}
            rotateSpeed={0.8}
            dampingFactor={0.05}
            enableDamping={true}
          />
        </Canvas>
      </Suspense>

      {/* Interactive Helper Hint Overlay */}
      <div className="absolute bottom-4 left-1/2 -translate-x-1/2 bg-black/60 border border-white/10 rounded-full px-4 py-1.5 flex items-center gap-2 pointer-events-none backdrop-blur-md">
        <GlobeIcon size={14} className="text-[#b9d522] animate-pulse" />
        <span className="text-[11px] text-white/70 uppercase tracking-widest font-semibold">
          Drag to spin the globe
        </span>
      </div>
    </div>
  );
};

export const GlobeSection = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const [webGlSupported, setWebGlSupported] = useState(true);

  // Check WebGL support dynamically
  useEffect(() => {
    try {
      const canvas = document.createElement('canvas');
      const support = !!(window.WebGLRenderingContext && (canvas.getContext('webgl') || canvas.getContext('experimental-webgl')));
      setWebGlSupported(support);
    } catch (e) {
      setWebGlSupported(false);
    }
  }, []);

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
      className="bg-[#101010] text-white border-b border-white/[0.06] overflow-hidden"
      style={{ padding: '80px 48px' }}
    >
      <div className="w-full">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          
          {/* Left Column: Content */}
          <div className="reveal opacity-0 flex flex-col justify-center text-left">
            <span className="text-[11px] font-bold uppercase tracking-[0.2em] text-[#b9d522]">
              GLOBAL LOGISTICS NETWORK
            </span>
            <h2 className="mt-4 text-[36px] font-normal leading-[1.08] tracking-tight sm:text-[44px] md:text-[54px] text-white">
              Connecting You to <br className="hidden sm:inline" />
              the Global Trade Network
            </h2>
            <p className="mt-6 text-[15px] leading-[1.75] text-white/65">
              With strategically positioned Free Trade Zones, comprehensive custom clearance, and unmatched global trade expertise, OSV simplifies your international supply chain. We empower businesses to seamlessly manage, repackage, kit, and store imports, exports, and re-exports with complete duty-deferment and compliance efficiency.
            </p>

            {/* Structured Points */}
            <div className="mt-8 flex flex-col gap-5">
              <div className="flex gap-4">
                <div className="mt-1 h-[8px] w-[8px] shrink-0 rounded-full bg-[#b9d522]" />
                <div>
                  <h4 className="text-[15px] font-semibold text-white">100+ Countries Connected</h4>
                  <p className="text-[13px] text-white/50 mt-0.5">Established international shipping lanes and worldwide freight network support.</p>
                </div>
              </div>
              <div className="flex gap-4">
                <div className="mt-1 h-[8px] w-[8px] shrink-0 rounded-full bg-[#b9d522]" />
                <div>
                  <h4 className="text-[15px] font-semibold text-white">Duty-Deferred Warehousing</h4>
                  <p className="text-[13px] text-white/50 mt-0.5">Optimize working capital with taxation and duty-deferred advantages in major trade zones.</p>
                </div>
              </div>
              <div className="flex gap-4">
                <div className="mt-1 h-[8px] w-[8px] shrink-0 rounded-full bg-[#b9d522]" />
                <div>
                  <h4 className="text-[15px] font-semibold text-white">Total Compliance Control</h4>
                  <p className="text-[13px] text-white/50 mt-0.5">Complete non-interference from customs authorities, ensuring fluid and fast distribution.</p>
                </div>
              </div>
            </div>

            {/* Call to Action Button */}
            <a 
              href="#connect-with-us" 
              className="mt-10 inline-flex w-fit items-center gap-2 text-[14px] font-semibold text-[#b9d522] transition-colors duration-300 hover:text-[#d4f02a]"
            >
              Explore Our Global Services
              <ArrowRight size={15} />
            </a>
          </div>

          {/* Right Column: 3D Interactive Globe Animation or 1.webp Fallback */}
          <div className="reveal opacity-0 flex items-center justify-center">
            {webGlSupported ? (
              <ThreeGlobe />
            ) : (
              // Fallback Flat Map using the 1.webp image
              <div className="w-full max-w-[550px] relative aspect-[2/1] rounded-2xl overflow-hidden border border-white/[0.06] bg-[#131313] p-4 flex items-center justify-center">
                <img 
                  src="/images/1.webp" 
                  alt="OSV World Trade Map" 
                  className="w-full h-full object-cover filter opacity-70"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent flex flex-col justify-end p-6">
                  <h3 className="text-sm font-semibold text-white">Global Distribution Coverage</h3>
                  <p className="text-xs text-white/50 mt-1">Connecting trade routes across Delhi NCR, Mumbai, Chennai, and Gujarat.</p>
                </div>
              </div>
            )}
          </div>

        </div>
      </div>
    </section>
  );
};
