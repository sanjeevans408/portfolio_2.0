/**
 * FishScene.tsx
 * ─────────────────────────────────────────────────────────────────────────────
 * Procedural underwater scene rendered via @react-three/fiber.
 * No external model files – every shape is built from Three.js primitives.
 *
 * Anatomy:
 *   Fish        – body (scaled sphere) + head bump + tail lobe pair + dorsal,
 *                 pectoral & ventral fins (cones, DoubleSide transparent) + eyes
 *   Animations  – sinusoidal swim path, tail wiggle, fin flapping, banking tilt,
 *                 smooth direction look-ahead via frame-delta lerp
 *   BubbleSystem – InstancedMesh for 55 rising translucent spheres
 *   Plankton     – THREE.Points (300) with vertex colours: cyan/teal palette
 *   CausticLights – two animated PointLights that pulse and orbit
 * ─────────────────────────────────────────────────────────────────────────────
 */

import { useRef, useMemo } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import * as THREE from "three";

/* ═══════════════════════════════════════════════════════════════
   FISH MODEL
   ═══════════════════════════════════════════════════════════════ */

interface FishProps {
  pathRadius?: number;
  depth?: number;
  speed?: number;
  scale?: number;
  phaseOffset?: number;
  bodyColor?: string;
  finColor?: string;
}

function Fish({
  pathRadius = 5,
  depth = 0,
  speed = 1,
  scale = 1,
  phaseOffset = 0,
  bodyColor = "#1a8fff",
  finColor = "#00cfff",
}: FishProps) {
  const groupRef    = useRef<THREE.Group>(null);
  const tailRef     = useRef<THREE.Group>(null);
  const leftFinRef  = useRef<THREE.Mesh>(null);
  const rightFinRef = useRef<THREE.Mesh>(null);
  const prevPos     = useRef(new THREE.Vector3());

  /* ── Materials ──────────────────────────────────────────────── */
  const bodyMat = useMemo(
    () =>
      new THREE.MeshPhysicalMaterial({
        color: bodyColor,
        metalness: 0.30,
        roughness: 0.18,
        iridescence: 0.85,
        iridescenceIOR: 1.45,
        clearcoat: 1,
        clearcoatRoughness: 0.08,
      }),
    [bodyColor]
  );

  const finMat = useMemo(
    () =>
      new THREE.MeshPhysicalMaterial({
        color: finColor,
        transparent: true,
        opacity: 0.62,
        side: THREE.DoubleSide,
        metalness: 0.1,
        roughness: 0.45,
      }),
    [finColor]
  );

  const eyeMat = useMemo(
    () => new THREE.MeshStandardMaterial({ color: "#050505" }),
    []
  );

  const eyeGlowMat = useMemo(
    () =>
      new THREE.MeshStandardMaterial({
        color: "#ffffff",
        emissive: "#ffffff",
        emissiveIntensity: 1.2,
      }),
    []
  );

  /* ── Animation ──────────────────────────────────────────────── */
  useFrame((state) => {
    if (!groupRef.current) return;
    const t = state.clock.elapsedTime * speed + phaseOffset;

    /* Oval swimming path: XZ plane + gentle Y oscillation */
    const x = Math.sin(t * 0.25) * pathRadius;
    const y = Math.sin(t * 0.50) * pathRadius * 0.18 + depth;
    const z = Math.cos(t * 0.25) * pathRadius * 0.60;

    /* Direction of travel via frame delta */
    const dx = x - prevPos.current.x;
    const dz = z - prevPos.current.z;

    groupRef.current.position.set(x, y, z);
    prevPos.current.set(x, y, z);

    /* Smooth look-at (rotate to face direction of travel) */
    if (Math.abs(dx) + Math.abs(dz) > 0.0005) {
      const target = Math.atan2(dx, dz);
      groupRef.current.rotation.y = THREE.MathUtils.lerp(
        groupRef.current.rotation.y,
        target,
        0.09
      );
    }

    /* Gentle banking roll */
    groupRef.current.rotation.z = Math.sin(t * 0.5) * 0.07;

    /* Tail wiggle */
    if (tailRef.current) {
      tailRef.current.rotation.y = Math.sin(t * 3.6) * 0.46;
    }

    /* Pectoral fin flapping */
    const fw = Math.sin(t * 3.6) * 0.18;
    if (leftFinRef.current)  leftFinRef.current.rotation.z  = -0.40 + fw;
    if (rightFinRef.current) rightFinRef.current.rotation.z =  0.40 - fw;
  });

  /* ── Geometry ───────────────────────────────────────────────── */
  return (
    <group ref={groupRef} scale={scale}>

      {/* ── Main body (elongated sphere) */}
      <mesh material={bodyMat} scale={[1.60, 0.85, 0.65]}>
        <sphereGeometry args={[0.5, 24, 18]} />
      </mesh>

      {/* ── Head / snout */}
      <mesh material={bodyMat} position={[0.62, 0.04, 0]} scale={[0.58, 0.50, 0.48]}>
        <sphereGeometry args={[0.5, 16, 12]} />
      </mesh>

      {/* ── Tail group – wiggles on Y axis */}
      <group ref={tailRef} position={[-0.84, 0, 0]}>
        {/* upper lobe */}
        <mesh material={finMat} position={[0, 0.23, 0]} rotation={[0, 0, Math.PI * 0.15]}>
          <coneGeometry args={[0.21, 0.46, 4]} />
        </mesh>
        {/* lower lobe */}
        <mesh material={finMat} position={[0, -0.19, 0]} rotation={[0, 0, -Math.PI * 0.15]}>
          <coneGeometry args={[0.18, 0.39, 4]} />
        </mesh>
      </group>

      {/* ── Dorsal fin (top) */}
      <mesh material={finMat} position={[0.05, 0.51, 0]}>
        <coneGeometry args={[0.19, 0.41, 3]} />
      </mesh>

      {/* ── Left pectoral fin */}
      <mesh ref={leftFinRef} material={finMat} position={[0.10, -0.06, 0.36]} rotation={[0.45, 0, -0.40]}>
        <coneGeometry args={[0.15, 0.36, 3]} />
      </mesh>

      {/* ── Right pectoral fin */}
      <mesh ref={rightFinRef} material={finMat} position={[0.10, -0.06, -0.36]} rotation={[-0.45, 0, 0.40]}>
        <coneGeometry args={[0.15, 0.36, 3]} />
      </mesh>

      {/* ── Ventral fin (bottom) */}
      <mesh material={finMat} position={[-0.10, -0.48, 0]} rotation={[0, 0, Math.PI]}>
        <coneGeometry args={[0.10, 0.26, 3]} />
      </mesh>

      {/* ── Left eye */}
      <group position={[0.68, 0.13, 0.21]}>
        <mesh material={eyeMat}>
          <sphereGeometry args={[0.080, 10, 10]} />
        </mesh>
        <mesh material={eyeGlowMat} position={[0.02, 0.02, 0.06]}>
          <sphereGeometry args={[0.028, 6, 6]} />
        </mesh>
      </group>

      {/* ── Right eye */}
      <group position={[0.68, 0.13, -0.21]}>
        <mesh material={eyeMat}>
          <sphereGeometry args={[0.080, 10, 10]} />
        </mesh>
        <mesh material={eyeGlowMat} position={[0.02, 0.02, -0.06]}>
          <sphereGeometry args={[0.028, 6, 6]} />
        </mesh>
      </group>

    </group>
  );
}

/* ═══════════════════════════════════════════════════════════════
   BUBBLE SYSTEM  (instanced mesh for GPU efficiency)
   ═══════════════════════════════════════════════════════════════ */

function BubbleSystem({ count = 55 }: { count?: number }) {
  const meshRef = useRef<THREE.InstancedMesh>(null);

  const data = useMemo(
    () =>
      Array.from({ length: count }, () => ({
        x:      (Math.random() - 0.5) * 16,
        baseY:  (Math.random() - 0.5) * 9,
        z:      (Math.random() - 0.5) * 10,
        speed:  0.28 + Math.random() * 0.55,
        size:   0.03 + Math.random() * 0.065,
        offset: Math.random() * Math.PI * 2,
        wobble: 0.08 + Math.random() * 0.18,
      })),
    [count]
  );

  const geo = useMemo(() => new THREE.SphereGeometry(1, 6, 6), []);
  const mat = useMemo(
    () =>
      new THREE.MeshPhysicalMaterial({
        color: "#80e5ff",
        transparent: true,
        opacity: 0.20,
        roughness: 0,
        metalness: 0,
        transmission: 0.5,
      }),
    []
  );

  const dummy = useMemo(() => new THREE.Object3D(), []);

  useFrame(({ clock }) => {
    if (!meshRef.current) return;
    const t = clock.elapsedTime;

    data.forEach((b, i) => {
      const e = t * b.speed + b.offset;
      dummy.position.set(
        b.x + Math.sin(e * 1.6 + b.offset) * b.wobble,
        b.baseY + ((e % 10) - 5),   // loop y over 10-unit range
        b.z
      );
      dummy.scale.setScalar(b.size);
      dummy.updateMatrix();
      meshRef.current!.setMatrixAt(i, dummy.matrix);
    });

    meshRef.current.instanceMatrix.needsUpdate = true;
  });

  return <instancedMesh ref={meshRef} args={[geo, mat, count]} />;
}

/* ═══════════════════════════════════════════════════════════════
   PLANKTON  (THREE.Points – cheap & plentiful)
   ═══════════════════════════════════════════════════════════════ */

function Plankton({ count = 320 }: { count?: number }) {
  const pointsRef = useRef<THREE.Points>(null);

  const { positions, colors } = useMemo(() => {
    const positions = new Float32Array(count * 3);
    const colors    = new Float32Array(count * 3);
    const c = new THREE.Color();

    for (let i = 0; i < count; i++) {
      positions[i * 3 + 0] = (Math.random() - 0.5) * 22;
      positions[i * 3 + 1] = (Math.random() - 0.5) * 14;
      positions[i * 3 + 2] = (Math.random() - 0.5) * 14;

      c.setHSL(0.48 + Math.random() * 0.22, 0.80, 0.58); // cyan → teal palette
      colors[i * 3 + 0] = c.r;
      colors[i * 3 + 1] = c.g;
      colors[i * 3 + 2] = c.b;
    }
    return { positions, colors };
  }, [count]);

  useFrame(() => {
    if (!pointsRef.current) return;
    pointsRef.current.rotation.y += 0.00010;
    pointsRef.current.rotation.x += 0.00004;
  });

  return (
    <points ref={pointsRef}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" array={positions} count={count} itemSize={3} />
        <bufferAttribute attach="attributes-color"    array={colors}    count={count} itemSize={3} />
      </bufferGeometry>
      <pointsMaterial size={0.035} vertexColors transparent opacity={0.60} sizeAttenuation />
    </points>
  );
}

/* ═══════════════════════════════════════════════════════════════
   CAUSTIC LIGHTS  (two pulsing PointLights that orbit slowly)
   ═══════════════════════════════════════════════════════════════ */

function CausticLights() {
  const l1 = useRef<THREE.PointLight>(null);
  const l2 = useRef<THREE.PointLight>(null);

  useFrame(({ clock }) => {
    const t = clock.elapsedTime;

    if (l1.current) {
      l1.current.position.set(
        Math.sin(t * 0.60) * 4.5,
        3.2 + Math.sin(t * 1.20) * 0.8,
        Math.cos(t * 0.40) * 3.5
      );
      l1.current.intensity = 1.6 + Math.sin(t * 2.40) * 0.55;
    }

    if (l2.current) {
      l2.current.position.set(
        Math.sin(t * 0.35 + Math.PI) * 5.5,
        2.8 + Math.cos(t * 0.90) * 0.65,
        Math.cos(t * 0.55 + Math.PI) * 4.0
      );
      l2.current.intensity = 1.2 + Math.sin(t * 1.70 + 1.0) * 0.40;
    }
  });

  return (
    <>
      <pointLight ref={l1} color="#00d4ff" distance={16} decay={1.5} />
      <pointLight ref={l2} color="#6040ff" distance={13} decay={1.5} />
    </>
  );
}

/* ═══════════════════════════════════════════════════════════════
   EXPORTED SCENE COMPONENT
   ═══════════════════════════════════════════════════════════════ */

export default function FishScene() {
  return (
    <Canvas
      camera={{ position: [0, 0, 8], fov: 60 }}
      style={{ position: "absolute", inset: 0, pointerEvents: "none" }}
      gl={{ antialias: true, alpha: true }}
      dpr={[1, 2]}
    >
      {/* Deep-ocean atmosphere */}
      <fog attach="fog" args={["#030f1c", 10, 30]} />
      <ambientLight color="#0a2050" intensity={0.85} />
      <directionalLight position={[2, 8, 4]} color="#60b8ff" intensity={0.70} />
      <CausticLights />

      {/* ── Main fish (large, foreground) */}
      <Fish
        pathRadius={4.5}
        depth={0.3}
        speed={0.65}
        scale={1.5}
        phaseOffset={0}
        bodyColor="#006de6"
        finColor="#00aaff"
      />

      {/* ── Companion 1 – teal, mid depth */}
      <Fish
        pathRadius={3.2}
        depth={-1.2}
        speed={1.10}
        scale={0.78}
        phaseOffset={Math.PI * 0.80}
        bodyColor="#0099bb"
        finColor="#00ffdd"
      />

      {/* ── Companion 2 – purple/pink, shallow */}
      <Fish
        pathRadius={5.5}
        depth={1.50}
        speed={0.85}
        scale={0.60}
        phaseOffset={Math.PI * 1.50}
        bodyColor="#9933ff"
        finColor="#ff66cc"
      />

      {/* ── Companion 3 – green, far background */}
      <Fish
        pathRadius={6.8}
        depth={-2.5}
        speed={0.50}
        scale={0.40}
        phaseOffset={Math.PI * 0.40}
        bodyColor="#00bb66"
        finColor="#00ffaa"
      />

      <BubbleSystem count={55} />
      <Plankton count={320} />
    </Canvas>
  );
}
