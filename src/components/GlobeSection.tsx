import { Suspense, useEffect, useRef, useState, useMemo } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls, useTexture } from '@react-three/drei';
import * as THREE from 'three';
import { ArrowRight } from 'lucide-react';

/* ── Lat/Lng → 3‑D position on a sphere ── */
function latLngToVec3(lat: number, lng: number, radius: number): THREE.Vector3 {
  const phi = (90 - lat) * (Math.PI / 180);
  const theta = (lng + 180) * (Math.PI / 180);
  return new THREE.Vector3(
    -(radius * Math.sin(phi) * Math.cos(theta)),
    radius * Math.cos(phi),
    radius * Math.sin(phi) * Math.sin(theta),
  );
}

/* Indian FTWZ hub locations */
const INDIA_HUBS = [
  { name: 'Delhi NCR',  lat: 28.6139, lng: 77.2090 },
  { name: 'Mumbai',     lat: 19.0760, lng: 72.8777 },
  { name: 'Chennai',    lat: 13.0827, lng: 80.2707 },
  { name: 'Gujarat',    lat: 23.0225, lng: 72.5714 },
];

/* International trade partner locations (for arc lines) */
const TRADE_PARTNERS = [
  { name: 'Dubai',      lat: 25.2048, lng: 55.2708 },
  { name: 'Singapore',  lat: 1.3521,  lng: 103.8198 },
  { name: 'Shanghai',   lat: 31.2304, lng: 121.4737 },
  { name: 'Rotterdam',  lat: 51.9244, lng: 4.4777 },
  { name: 'New York',   lat: 40.7128, lng: -74.0060 },
];

/* ── Pulsing location pin on the globe ── */
const LocationPin = ({ lat, lng, radius, color }: { lat: number; lng: number; radius: number; color: string }) => {
  const meshRef = useRef<THREE.Mesh>(null);
  const pulseRef = useRef<THREE.Mesh>(null);
  const pos = useMemo(() => latLngToVec3(lat, lng, radius), [lat, lng, radius]);

  useFrame(({ clock }) => {
    if (pulseRef.current) {
      const s = 1 + 0.4 * Math.sin(clock.getElapsedTime() * 2.5);
      pulseRef.current.scale.set(s, s, s);
      (pulseRef.current.material as THREE.MeshBasicMaterial).opacity = 0.6 - 0.3 * Math.sin(clock.getElapsedTime() * 2.5);
    }
  });

  return (
    <group position={pos}>
      {/* Core dot */}
      <mesh ref={meshRef}>
        <sphereGeometry args={[0.04, 16, 16]} />
        <meshBasicMaterial color={color} />
      </mesh>
      {/* Outer pulse ring */}
      <mesh ref={pulseRef}>
        <sphereGeometry args={[0.08, 16, 16]} />
        <meshBasicMaterial color={color} transparent opacity={0.4} />
      </mesh>
    </group>
  );
};

/* ── Curved arc line between two geo‑points ── */
const TradeArc = ({ from, to, radius, color }: { from: { lat: number; lng: number }; to: { lat: number; lng: number }; radius: number; color: string }) => {
  const lineObj = useMemo(() => {
    const start = latLngToVec3(from.lat, from.lng, radius);
    const end = latLngToVec3(to.lat, to.lng, radius);
    const mid = new THREE.Vector3().addVectors(start, end).multiplyScalar(0.5);
    const dist = start.distanceTo(end);
    mid.normalize().multiplyScalar(radius + dist * 0.35);

    const curve = new THREE.QuadraticBezierCurve3(start, mid, end);
    const points = curve.getPoints(48);
    const geometry = new THREE.BufferGeometry().setFromPoints(points);
    const material = new THREE.LineBasicMaterial({ color, transparent: true, opacity: 0.3 });
    return new THREE.Line(geometry, material);
  }, [from, to, radius, color]);

  return <primitive object={lineObj} />;
};

/* ── Main Globe mesh ── */
const Globe = ({ texturePath }: { texturePath: string }) => {
  const groupRef = useRef<THREE.Group>(null);
  const texture = useTexture(texturePath);
  const R = 2.2;

  // Set proper texture wrapping
  texture.wrapS = THREE.RepeatWrapping;
  texture.wrapT = THREE.ClampToEdgeWrapping;

  // Auto-rotate the globe slowly — India starts facing the camera
  useFrame(() => {
    if (groupRef.current) {
      groupRef.current.rotation.y += 0.002;
    }
  });

  // Rotate the globe so that India (≈77°E) faces the camera on load
  const initialRotation = useMemo(() => {
    // Camera looks at -Z. To place India facing camera we rotate Y
    return -(77 + 180) * (Math.PI / 180) + Math.PI;
  }, []);

  return (
    <group ref={groupRef} rotation={[0, initialRotation, 0]}>
      {/* Earth sphere */}
      <mesh>
        <sphereGeometry args={[R, 64, 64]} />
        <meshPhongMaterial
          map={texture}
          bumpScale={0.02}
          specular={new THREE.Color('#222222')}
          shininess={15}
        />
      </mesh>

      {/* India highlight glow — a transparent, slightly‑larger shell tinted green */}
      <mesh>
        <sphereGeometry args={[R + 0.005, 64, 64]} />
        <meshBasicMaterial
          color="#b9d522"
          transparent
          opacity={0.06}
          blending={THREE.AdditiveBlending}
          side={THREE.FrontSide}
        />
      </mesh>

      {/* Atmosphere outer glow */}
      <mesh>
        <sphereGeometry args={[R * 1.03, 64, 64]} />
        <meshBasicMaterial
          color="#4da6ff"
          transparent
          opacity={0.045}
          blending={THREE.AdditiveBlending}
          side={THREE.BackSide}
        />
      </mesh>

      {/* India FTWZ location pins — bright lime green */}
      {INDIA_HUBS.map((hub) => (
        <LocationPin key={hub.name} lat={hub.lat} lng={hub.lng} radius={R + 0.01} color="#b9d522" />
      ))}

      {/* Trade partner pins — subtle cyan */}
      {TRADE_PARTNERS.map((p) => (
        <LocationPin key={p.name} lat={p.lat} lng={p.lng} radius={R + 0.01} color="#4da6ff" />
      ))}

      {/* Trade route arcs from Delhi to partners */}
      {TRADE_PARTNERS.map((p) => (
        <TradeArc
          key={p.name}
          from={{ lat: 28.6139, lng: 77.2090 }}
          to={{ lat: p.lat, lng: p.lng }}
          radius={R}
          color="#b9d522"
        />
      ))}
    </group>
  );
};

/* ── ThreeJS Canvas wrapper ── */
const ThreeGlobe = () => {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 800);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="w-full h-[380px] sm:h-[460px] md:h-[520px] relative">
      {loading && (
        <div className="absolute inset-0 flex flex-col items-center justify-center bg-[#0a0a0a]/80 rounded-2xl z-20 backdrop-blur-sm transition-opacity duration-500">
          <div className="h-10 w-10 animate-spin rounded-full border-2 border-t-transparent border-[#b9d522]" />
          <p className="mt-4 text-xs text-white/50 uppercase tracking-widest">Loading Globe...</p>
        </div>
      )}

      <Canvas
        camera={{ position: [0, 0.4, 5.2], fov: 55 }}
        gl={{ antialias: true, alpha: true }}
        style={{ background: 'transparent', width: '100%', height: '100%' }}
      >
        <ambientLight intensity={2.0} />
        <directionalLight position={[5, 3, 5]} intensity={3} />
        <directionalLight position={[-3, -2, -4]} intensity={1.2} color="#b9d522" />
        <pointLight position={[0, 8, 8]} intensity={1.5} color="#ffffff" />

        <Suspense fallback={null}>
          <Globe texturePath="/images/1.webp" />
        </Suspense>

        <OrbitControls
          enableZoom={false}
          enablePan={false}
          autoRotate={false}
          rotateSpeed={0.6}
          dampingFactor={0.08}
          enableDamping
          minPolarAngle={Math.PI * 0.25}
          maxPolarAngle={Math.PI * 0.75}
        />
      </Canvas>

      {/* Legend overlay */}
      <div className="absolute bottom-4 left-4 right-4 flex flex-wrap items-center justify-center gap-5 pointer-events-none z-10">
        <div className="flex items-center gap-2 bg-black/60 border border-white/10 rounded-full px-3 py-1.5 backdrop-blur-md">
          <span className="h-2 w-2 rounded-full bg-[#b9d522] inline-block" />
          <span className="text-[10px] text-white/70 uppercase tracking-widest font-semibold">FTWZ Hubs</span>
        </div>
        <div className="flex items-center gap-2 bg-black/60 border border-white/10 rounded-full px-3 py-1.5 backdrop-blur-md">
          <span className="h-2 w-2 rounded-full bg-[#4da6ff] inline-block" />
          <span className="text-[10px] text-white/70 uppercase tracking-widest font-semibold">Trade Partners</span>
        </div>
        <div className="flex items-center gap-2 bg-black/60 border border-white/10 rounded-full px-3 py-1.5 backdrop-blur-md">
          <span className="text-[10px] text-white/70 uppercase tracking-widest font-semibold">🖱 Drag to explore</span>
        </div>
      </div>
    </div>
  );
};

/* ── Exported Section ── */
export const GlobeSection = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const [webGlSupported, setWebGlSupported] = useState(true);

  useEffect(() => {
    try {
      const c = document.createElement('canvas');
      setWebGlSupported(!!(window.WebGLRenderingContext && (c.getContext('webgl') || c.getContext('experimental-webgl'))));
    } catch { setWebGlSupported(false); }
  }, []);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => entries.forEach((e) => {
        if (e.isIntersecting) { e.target.classList.add('animate-fade-in'); e.target.classList.remove('opacity-0'); }
      }),
      { threshold: 0.05 }
    );
    sectionRef.current?.querySelectorAll('.reveal').forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="bg-[#101010] text-white border-b border-white/[0.06] overflow-hidden"
      style={{ padding: '80px 48px' }}
    >
      <div className="w-full">
        {/* Section heading — full width above the two columns */}
        <div className="reveal opacity-0 text-left" style={{ marginBottom: '48px' }}>
          <span className="text-[11px] font-bold uppercase tracking-[0.2em] text-[#b9d522]">
            GLOBAL LOGISTICS NETWORK
          </span>
          <h2 className="mt-4 text-[36px] font-normal leading-[1.08] tracking-tight sm:text-[44px] md:text-[54px] text-white">
            Connecting India to<br className="hidden sm:inline" /> the World
          </h2>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-start">

          {/* Left Column — 3D Globe */}
          <div className="flex items-center justify-center w-full">
            {webGlSupported ? (
              <ThreeGlobe />
            ) : (
              <div className="w-full relative aspect-[2/1] rounded-2xl overflow-hidden border border-white/[0.06] bg-[#131313]">
                <img src="/images/1.webp" alt="OSV World Trade Map" className="w-full h-full object-cover opacity-80" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent flex flex-col justify-end p-6">
                  <h3 className="text-sm font-semibold text-white">Pan‑India FTWZ Coverage</h3>
                  <p className="text-xs text-white/50 mt-1">Delhi NCR · Mumbai · Chennai · Gujarat</p>
                </div>
              </div>
            )}
          </div>

          {/* Right Column — Content + flat 1.webp map image */}
          <div className="flex flex-col justify-center text-left">
            <p className="text-[15px] leading-[1.75] text-white/65">
              With strategically positioned Free Trade Zones, comprehensive custom clearance, and unmatched global trade expertise, OSV simplifies your international supply chain. We empower businesses to seamlessly manage, repackage, kit, and store imports, exports, and re‑exports with complete duty‑deferment and compliance efficiency.
            </p>

            {/* Key Stats Row */}
            <div className="mt-8 grid grid-cols-2 sm:grid-cols-4 gap-5">
              {[
                { num: '4', label: 'FTWZ Hubs' },
                { num: '50+', label: 'Years Legacy' },
                { num: '100+', label: 'Global Partners' },
                { num: '99%', label: 'On‑Time Delivery' },
              ].map((s) => (
                <div key={s.label} className="text-center border border-white/[0.06] rounded-xl py-4 px-2 bg-white/[0.015]">
                  <p className="text-[28px] font-semibold text-[#b9d522] leading-none">{s.num}</p>
                  <p className="mt-1.5 text-[11px] text-white/50 uppercase tracking-widest">{s.label}</p>
                </div>
              ))}
            </div>

            {/* India hub highlights */}
            <div className="mt-8 flex flex-col gap-4">
              {INDIA_HUBS.map((hub) => (
                <div key={hub.name} className="flex gap-3 items-center">
                  <span className="h-2.5 w-2.5 rounded-full bg-[#b9d522] shrink-0 shadow-[0_0_8px_rgba(185,213,34,0.6)]" />
                  <span className="text-[15px] font-semibold text-white">{hub.name}</span>
                  <span className="flex-1 border-b border-dashed border-white/10" />
                  <span className="text-[12px] text-white/40 uppercase tracking-wider">FTWZ Active</span>
                </div>
              ))}
            </div>

            {/* Flat map image of 1.webp as a visual reference */}
            <div className="mt-8 w-full rounded-xl overflow-hidden border border-white/[0.06] bg-[#0d0d0d]">
              <img src="/images/1.webp" alt="OSV Global Trade Map" className="w-full h-auto object-contain opacity-75" loading="lazy" />
            </div>

            <a
              href="#connect-with-us"
              className="mt-8 inline-flex w-fit items-center gap-2 text-[14px] font-semibold text-[#b9d522] transition-colors duration-300 hover:text-[#d4f02a]"
            >
              Explore Our Global Services
              <ArrowRight size={15} />
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};
