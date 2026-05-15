import { useRef, useEffect, useMemo } from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { Stars, MeshDistortMaterial, Sparkles, Line } from '@react-three/drei';
import * as THREE from 'three';

// ─── Scroll tracker ───────────────────────────────────────────────────────────
function useScrollRef() {
  const ref = useRef(0);
  useEffect(() => {
    const onScroll = () => {
      const max = document.documentElement.scrollHeight - window.innerHeight;
      ref.current = max > 0 ? window.scrollY / max : 0;
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);
  return ref;
}

// ─── Smooth lerp ─────────────────────────────────────────────────────────────
const lp = (a: number, b: number, t: number) => a + (b - a) * t;

// ─── Camera rig: flies through scene on scroll ────────────────────────────────
function CameraRig({ scrollRef }: { scrollRef: React.MutableRefObject<number> }) {
  const { camera } = useThree();
  const tx = useRef(0), ty = useRef(0), tz = useRef(9);

  useFrame(() => {
    const t = scrollRef.current;
    let nx = 0, ny = 0, nz = 9;

    if (t < 0.25) {
      const p = t / 0.25;
      nx = lp(0, -1, p); ny = lp(0, 0.3, p); nz = lp(9, 9.5, p);
    } else if (t < 0.5) {
      const p = (t - 0.25) / 0.25;
      nx = lp(-1, 2.5, p); ny = lp(0.3, -0.5, p); nz = lp(9.5, 10, p);
    } else if (t < 0.75) {
      const p = (t - 0.5) / 0.25;
      nx = lp(2.5, -2, p); ny = lp(-0.5, 1, p); nz = lp(10, 9, p);
    } else {
      const p = (t - 0.75) / 0.25;
      nx = lp(-2, 0, p); ny = lp(1, 0, p); nz = lp(9, 11, p);
    }

    tx.current += (nx - tx.current) * 0.04;
    ty.current += (ny - ty.current) * 0.04;
    tz.current += (nz - tz.current) * 0.04;

    camera.position.set(tx.current, ty.current, tz.current);
    camera.lookAt(0, 0, 0);
  });

  return null;
}

// ─── EduVault core: central pulsing icosahedron ───────────────────────────────
function EduVaultCore({ scrollRef }: { scrollRef: React.MutableRefObject<number> }) {
  const groupRef = useRef<THREE.Group>(null!);
  const outerRef = useRef<THREE.Mesh>(null!);
  const ring1Ref = useRef<THREE.Mesh>(null!);
  const ring2Ref = useRef<THREE.Mesh>(null!);

  useFrame((state, delta) => {
    const t = scrollRef.current;
    const time = state.clock.elapsedTime;

    if (!groupRef.current) return;
    groupRef.current.rotation.y += delta * 0.22;
    groupRef.current.rotation.x = Math.sin(time * 0.35) * 0.08;

    const pulse = 1 + Math.sin(time * 2.2) * 0.04;
    const targetScale = (1 - t * 0.22) * pulse;
    const s = groupRef.current.scale;
    s.x += (targetScale - s.x) * 0.05;
    s.y += (targetScale - s.y) * 0.05;
    s.z += (targetScale - s.z) * 0.05;

    const pos = groupRef.current.position;
    pos.x += (t * -2.2 - pos.x) * 0.04;
    pos.y += (t * -0.4 - pos.y) * 0.04;

    if (outerRef.current) {
      outerRef.current.rotation.y -= delta * 0.14;
      outerRef.current.rotation.z += delta * 0.07;
    }
    if (ring1Ref.current) ring1Ref.current.rotation.z += delta * 0.55;
    if (ring2Ref.current) ring2Ref.current.rotation.x += delta * 0.38;
  });

  return (
    <group ref={groupRef}>
      {/* Inner glowing core */}
      <mesh>
        <icosahedronGeometry args={[1.5, 4]} />
        <MeshDistortMaterial
          color="#6366f1"
          emissive="#4338ca"
          emissiveIntensity={0.9}
          distort={0.22}
          speed={2.2}
          transparent
          opacity={0.72}
          roughness={0.2}
          metalness={0.7}
        />
      </mesh>

      {/* Outer wireframe shell */}
      <mesh ref={outerRef}>
        <icosahedronGeometry args={[1.7, 2]} />
        <meshBasicMaterial color="#818cf8" wireframe transparent opacity={0.2} />
      </mesh>

      {/* Interior point light */}
      <pointLight color="#6366f1" intensity={5} distance={9} />
      <pointLight color="#22d3ee" intensity={2.5} distance={7} position={[2, 1.5, 0]} />

      {/* Ring 1 — indigo, flat */}
      <mesh ref={ring1Ref} rotation={[Math.PI / 2, 0, 0]}>
        <torusGeometry args={[2.3, 0.016, 6, 120]} />
        <meshBasicMaterial color="#6366f1" transparent opacity={0.45} />
      </mesh>

      {/* Ring 2 — cyan, tilted */}
      <mesh ref={ring2Ref} rotation={[Math.PI / 3.2, Math.PI / 5, 0]}>
        <torusGeometry args={[2.75, 0.012, 6, 120]} />
        <meshBasicMaterial color="#22d3ee" transparent opacity={0.3} />
      </mesh>

      {/* Ring 3 — purple */}
      <mesh rotation={[-Math.PI / 4, Math.PI / 3.5, 0]}>
        <torusGeometry args={[3.05, 0.01, 6, 120]} />
        <meshBasicMaterial color="#a855f7" transparent opacity={0.18} />
      </mesh>

      {/* Core sparkle aura */}
      <Sparkles count={55} size={1.4} scale={4.2} speed={0.35} color="#818cf8" opacity={0.55} />
    </group>
  );
}

// ─── Orbiting feature node ────────────────────────────────────────────────────
interface OrbCfg {
  color: string;
  angle: number;
  radius: number;
  speed: number;
  size: number;
  elev: number;
}

function OrbitingOrb({ cfg, scrollRef, idx }: {
  cfg: OrbCfg;
  scrollRef: React.MutableRefObject<number>;
  idx: number;
}) {
  const meshRef = useRef<THREE.Mesh>(null!);
  const target = useRef(new THREE.Vector3());

  useFrame((state) => {
    const t = scrollRef.current;
    const time = state.clock.elapsedTime;
    const angle = cfg.angle + time * cfg.speed;
    const rm = 1 + t * 0.55;
    const floatY = Math.sin(time * 0.75 + idx * 1.1) * 0.55 + cfg.elev;

    target.current.set(
      Math.cos(angle) * cfg.radius * rm,
      floatY + Math.sin(angle * 0.45) * 0.75,
      Math.sin(angle) * cfg.radius * rm * 0.5,
    );

    if (!meshRef.current) return;
    meshRef.current.position.lerp(target.current, 0.07);
    meshRef.current.rotation.x += 0.014;
    meshRef.current.rotation.y += 0.019;

    const mat = meshRef.current.material as THREE.MeshStandardMaterial;
    mat.emissiveIntensity = 1.1 + Math.sin(time * 2.8 + idx) * 0.35;
  });

  return (
    <mesh ref={meshRef}>
      <sphereGeometry args={[cfg.size, 20, 20]} />
      <meshStandardMaterial
        color={cfg.color}
        emissive={cfg.color}
        emissiveIntensity={1.1}
        transparent
        opacity={0.95}
        roughness={0.1}
        metalness={0.5}
      />
    </mesh>
  );
}

const ORB_CFGS: OrbCfg[] = [
  { color: '#f59e0b', angle: 0,                    radius: 3.6, speed: 0.37, size: 0.22, elev:  0.3  },
  { color: '#06b6d4', angle: Math.PI / 3,          radius: 4.0, speed: 0.31, size: 0.18, elev: -0.4  },
  { color: '#a855f7', angle: (2 * Math.PI) / 3,   radius: 3.8, speed: 0.43, size: 0.20, elev:  0.6  },
  { color: '#22c55e', angle: Math.PI,              radius: 3.5, speed: 0.35, size: 0.19, elev: -0.2  },
  { color: '#ec4899', angle: (4 * Math.PI) / 3,   radius: 4.2, speed: 0.40, size: 0.21, elev:  0.4  },
  { color: '#3b82f6', angle: (5 * Math.PI) / 3,   radius: 3.7, speed: 0.34, size: 0.17, elev: -0.5  },
];

// ─── Connection lines from center to each orb ────────────────────────────────
const LINE_ENDS: Array<{ end: [number, number, number]; color: string }> = [
  { end: [ 3.6,  0.3,  0 ], color: '#f59e0b' },
  { end: [-2.0,  3.5,  0 ], color: '#06b6d4' },
  { end: [-3.3, -1.9,  0 ], color: '#a855f7' },
  { end: [-3.6, -0.3,  0 ], color: '#22c55e' },
  { end: [ 2.1, -3.5,  0 ], color: '#ec4899' },
  { end: [ 3.2,  1.8,  0 ], color: '#3b82f6' },
];

function NetworkLines() {
  return (
    <>
      {LINE_ENDS.map(({ end, color }, i) => (
        <Line
          key={i}
          points={[[0, 0, 0], end]}
          color={color}
          lineWidth={0.5}
          transparent
          opacity={0.18}
          dashed
          dashSize={0.25}
          gapSize={0.12}
        />
      ))}
    </>
  );
}

// ─── Floating invoice / token card ───────────────────────────────────────────
function FloatingCard({ position, color, delay }: {
  position: [number, number, number];
  color: string;
  delay: number;
}) {
  const groupRef = useRef<THREE.Group>(null!);
  const baseY = position[1];

  const cardGeo = useMemo(() => new THREE.PlaneGeometry(1.2, 0.78), []);
  const edgesGeo = useMemo(() => new THREE.EdgesGeometry(new THREE.PlaneGeometry(1.2, 0.78)), []);

  useFrame((state) => {
    const time = state.clock.elapsedTime + delay;
    if (!groupRef.current) return;
    groupRef.current.rotation.y = Math.sin(time * 0.45) * 0.28;
    groupRef.current.rotation.x = Math.sin(time * 0.28) * 0.09;
    groupRef.current.position.y = baseY + Math.sin(time * 0.55) * 0.38;
  });

  return (
    <group ref={groupRef} position={position}>
      {/* Card face */}
      <mesh geometry={cardGeo}>
        <meshStandardMaterial
          color={color}
          emissive={color}
          emissiveIntensity={0.28}
          transparent
          opacity={0.16}
          side={THREE.DoubleSide}
          roughness={0.1}
          metalness={0.8}
        />
      </mesh>

      {/* Card edge outline */}
      <lineSegments geometry={edgesGeo}>
        <lineBasicMaterial color={color} transparent opacity={0.45} />
      </lineSegments>

      {/* Inner stripe details */}
      <mesh position={[0,  0.16, 0.002]}>
        <planeGeometry args={[0.78, 0.04]} />
        <meshBasicMaterial color={color} transparent opacity={0.55} />
      </mesh>
      <mesh position={[0,  0.02, 0.002]}>
        <planeGeometry args={[0.88, 0.028]} />
        <meshBasicMaterial color={color} transparent opacity={0.38} />
      </mesh>
      <mesh position={[0, -0.14, 0.002]}>
        <planeGeometry args={[0.5, 0.028]} />
        <meshBasicMaterial color={color} transparent opacity={0.28} />
      </mesh>
    </group>
  );
}

// ─── Background dust cloud ────────────────────────────────────────────────────
function DustCloud() {
  const pointsRef = useRef<THREE.Points>(null!);
  const count = 1400;

  const [positions, colors] = useMemo(() => {
    const pos = new Float32Array(count * 3);
    const col = new Float32Array(count * 3);
    const palette = [
      new THREE.Color('#6366f1'),
      new THREE.Color('#22d3ee'),
      new THREE.Color('#a855f7'),
      new THREE.Color('#818cf8'),
    ];

    for (let i = 0; i < count; i++) {
      pos[i * 3]     = (Math.random() - 0.5) * 35;
      pos[i * 3 + 1] = (Math.random() - 0.5) * 25;
      pos[i * 3 + 2] = (Math.random() - 0.5) * 25;

      const c = palette[Math.floor(Math.random() * palette.length)];
      col[i * 3]     = c.r;
      col[i * 3 + 1] = c.g;
      col[i * 3 + 2] = c.b;
    }
    return [pos, col];
  }, []);

  useFrame((state, delta) => {
    if (pointsRef.current) {
      pointsRef.current.rotation.y += delta * 0.018;
      pointsRef.current.rotation.x += delta * 0.009;
    }
  });

  return (
    <points ref={pointsRef}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" array={positions} itemSize={3} count={count} />
        <bufferAttribute attach="attributes-color" array={colors} itemSize={3} count={count} />
      </bufferGeometry>
      <pointsMaterial
        size={0.022}
        vertexColors
        transparent
        opacity={0.55}
        sizeAttenuation
      />
    </points>
  );
}

// ─── Full scene contents ──────────────────────────────────────────────────────
function SceneContent({ scrollRef }: { scrollRef: React.MutableRefObject<number> }) {
  return (
    <>
      {/* Global lights */}
      <ambientLight intensity={0.08} />
      <pointLight position={[12, 12, 12]} color="#6366f1" intensity={1.2} />
      <pointLight position={[-12, -6, -12]} color="#22d3ee" intensity={0.9} />
      <pointLight position={[0, 14, -6]} color="#a855f7" intensity={0.7} />

      {/* Stars */}
      <Stars radius={90} depth={70} count={5500} factor={4.5} saturation={0.2} fade speed={0.4} />

      {/* Dust */}
      <DustCloud />

      {/* EduVault central structure */}
      <EduVaultCore scrollRef={scrollRef} />

      {/* Network connection lines */}
      <NetworkLines />

      {/* Orbiting feature orbs */}
      {ORB_CFGS.map((cfg, i) => (
        <OrbitingOrb key={i} cfg={cfg} scrollRef={scrollRef} idx={i} />
      ))}

      {/* Floating token/invoice cards */}
      <FloatingCard position={[ 5.2,  1.5, -2.5]} color="#f59e0b" delay={0}   />
      <FloatingCard position={[-5.0, -1.0, -3.0]} color="#22d3ee" delay={1.8} />
      <FloatingCard position={[ 3.0, -2.8, -4.0]} color="#a855f7" delay={3.6} />

      {/* Wide sparkle fields */}
      <Sparkles count={45} size={2.2} scale={14} speed={0.18} color="#6366f1" opacity={0.28} />
      <Sparkles count={35} size={1.6} scale={12} speed={0.26} color="#22d3ee" opacity={0.2} position={[4, 0, 0] as any} />

      {/* Scroll-reactive camera */}
      <CameraRig scrollRef={scrollRef} />
    </>
  );
}

// ─── Scene3D: the fixed canvas that underlies everything ──────────────────────
export default function Scene3D() {
  const scrollRef = useScrollRef();

  return (
    <div
      style={{
        position: 'fixed',
        inset: 0,
        zIndex: 0,
        pointerEvents: 'none',
      }}
    >
      <Canvas
        camera={{ position: [0, 0, 9], fov: 55, near: 0.1, far: 220 }}
        gl={{
          antialias: true,
          alpha: true,
          powerPreference: 'high-performance',
          toneMapping: THREE.ACESFilmicToneMapping,
          toneMappingExposure: 1.25,
        }}
        dpr={[1, 1.5]}
        style={{ background: 'transparent' }}
      >
        <SceneContent scrollRef={scrollRef} />
      </Canvas>
    </div>
  );
}
