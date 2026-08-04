/**
 * ProjectsScene.tsx
 * ─────────────────────────────────────────────────────────────────────────────
 * R3F Canvas that houses the interactive 3D project carousel.
 *
 * Layout:
 *   4 cards arranged in a FULL CIRCLE of radius 6.
 *   Cards face inward (rotation.y mirrors the arc angle).
 *   The entire group auto-rotates when idle; pointer-drag overrides rotation.
 *   Touch events are also supported.
 *
 * Interaction:
 *   • Pointer-down on the canvas → start drag (capture pointer)
 *   • Pointer-move              → update rotation in real time
 *   • Pointer-up / leave        → end drag; momentum decays to auto-rotate
 *
 * Atmosphere:
 *   • Deep-space gradient fog
 *   • Animated coloured point lights
 *   • Holographic grid floor (wireframe PlaneGeometry)
 *   • Floating particle field (THREE.Points)
 * ─────────────────────────────────────────────────────────────────────────────
 */

import { useRef, useMemo, useEffect, useState } from "react";
import { Canvas, useFrame, useThree }     from "@react-three/fiber";
import { Stars }                          from "@react-three/drei";
import * as THREE                         from "three";
import { projects as fallbackProjects, type Project } from "../../data/projects";
import { apiUrl } from "../../lib/api";
import ProjectCard3D, { CARD_ACCENTS }    from "./ProjectCard3D";

/* ═══════════════════════════════════════════════════════════════
   CONSTANTS
   ═══════════════════════════════════════════════════════════════ */

const RADIUS       = 6.0;    // carousel arc radius (world units)
const AUTO_SPEED   = 0.10;   // radians per second (idle auto-rotate)
const DRAG_SCALE   = 0.006;  // pointer-pixel → radian conversion factor
const MOMENTUM     = 0.94;   // velocity decay per frame (0 = instant stop)

/* ═══════════════════════════════════════════════════════════════
   CAROUSEL  (inner component so we can call useThree / useFrame)
   ═══════════════════════════════════════════════════════════════ */

function Carousel({ projects }: { projects: Project[] }) {
  const { gl } = useThree();

  const groupRef       = useRef<THREE.Group>(null);
  const isDragging     = useRef(false);
  const prevX          = useRef(0);
  const rotationY      = useRef(0);   // accumulated target rotation (radians)
  const velocity       = useRef(0);   // current angular velocity (rad/frame)

  /* Pre-compute card positions / rotations ─────────────────── */
  const cards = useMemo(() => {
    const n = projects.length;
    return projects.map((proj, i) => {
      const angle = (i / n) * Math.PI * 2;
      return {
        project:     proj,
        accentColor: CARD_ACCENTS[i % CARD_ACCENTS.length],
        position:    [
          Math.sin(angle) * RADIUS,
          0,
          Math.cos(angle) * RADIUS,
        ] as [number, number, number],
        rotation:    [0, -angle, 0] as [number, number, number],
        index:       i,
      };
    });
  }, [projects]);

  /* Pointer / touch event listeners on the WebGL canvas ─────── */
  useEffect(() => {
    const canvas = gl.domElement;

    const onPointerDown = (e: PointerEvent) => {
      isDragging.current = true;
      prevX.current      = e.clientX;
      velocity.current   = 0;
      canvas.setPointerCapture(e.pointerId);
    };

    const onPointerMove = (e: PointerEvent) => {
      if (!isDragging.current) return;
      const delta        = e.clientX - prevX.current;
      velocity.current   = delta * DRAG_SCALE;
      rotationY.current += velocity.current;
      prevX.current      = e.clientX;
    };

    const onPointerUp = (e: PointerEvent) => {
      isDragging.current = false;
      try { canvas.releasePointerCapture(e.pointerId); } catch (_) { /* noop */ }
    };

    canvas.addEventListener("pointerdown", onPointerDown);
    canvas.addEventListener("pointermove", onPointerMove);
    canvas.addEventListener("pointerup",   onPointerUp);
    canvas.addEventListener("pointerleave",onPointerUp);

    return () => {
      canvas.removeEventListener("pointerdown", onPointerDown);
      canvas.removeEventListener("pointermove", onPointerMove);
      canvas.removeEventListener("pointerup",   onPointerUp);
      canvas.removeEventListener("pointerleave",onPointerUp);
    };
  }, [gl]);

  /* Animation loop ─────────────────────────────────────────── */
  useFrame((_, delta) => {
    if (!groupRef.current) return;

    if (!isDragging.current) {
      /* Momentum decay + auto-rotate */
      velocity.current  *= MOMENTUM;
      rotationY.current += velocity.current + AUTO_SPEED * delta;
    }

    /* Smooth lerp toward target rotation */
    groupRef.current.rotation.y = THREE.MathUtils.lerp(
      groupRef.current.rotation.y,
      rotationY.current,
      1 - Math.pow(0.04, delta)
    );
  });

  return (
    <group ref={groupRef}>
      {cards.map((c) => (
        <ProjectCard3D
          key={c.project.id}
          project={c.project}
          position={c.position}
          rotation={c.rotation}
          accentColor={c.accentColor}
          index={c.index}
        />
      ))}
    </group>
  );
}

/* ═══════════════════════════════════════════════════════════════
   SCENE LIGHTS
   ═══════════════════════════════════════════════════════════════ */

function SceneLights() {
  const l0 = useRef<THREE.PointLight>(null);
  const l1 = useRef<THREE.PointLight>(null);
  const l2 = useRef<THREE.PointLight>(null);

  useFrame(({ clock }) => {
    const t = clock.elapsedTime;
    if (l0.current) l0.current.intensity = 1.2 + Math.sin(t * 1.3) * 0.35;
    if (l1.current) {
      l1.current.position.x = Math.sin(t * 0.5) * 7;
      l1.current.position.z = Math.cos(t * 0.4) * 7;
    }
    if (l2.current) {
      l2.current.position.x = Math.sin(t * 0.4 + Math.PI) * 8;
      l2.current.position.z = Math.cos(t * 0.3 + Math.PI) * 8;
    }
  });

  return (
    <>
      <ambientLight intensity={0.25} color="#080818" />
      <directionalLight position={[0, 10, 5]} intensity={0.50} color="#c0d8ff" />
      {/* Top pulse (cyan) */}
      <pointLight ref={l0} position={[0, 6, 0]} color="#00f5ff" intensity={1.2} distance={22} decay={1.5} />
      {/* Orbit 1 – purple */}
      <pointLight ref={l1} position={[-7, 1, 0]} color="#8b5cf6" intensity={1.0} distance={18} decay={1.5} />
      {/* Orbit 2 – emerald */}
      <pointLight ref={l2} position={[ 8, 1, 0]} color="#10b981" intensity={0.9} distance={18} decay={1.5} />
    </>
  );
}

/* ═══════════════════════════════════════════════════════════════
   HOLOGRAPHIC GRID FLOOR
   ═══════════════════════════════════════════════════════════════ */

function HoloGrid() {
  const meshRef = useRef<THREE.Mesh>(null);

  useFrame(({ clock }) => {
    if (!meshRef.current) return;
    // Slow Y-axis rotation of the grid for subtle movement
    meshRef.current.rotation.y = clock.elapsedTime * 0.04;
  });

  return (
    <mesh ref={meshRef} position={[0, -3.2, 0]} rotation={[-Math.PI / 2, 0, 0]}>
      <planeGeometry args={[40, 40, 28, 28]} />
      <meshBasicMaterial
        color="#00f5ff"
        wireframe
        transparent
        opacity={0.045}
      />
    </mesh>
  );
}

/* ═══════════════════════════════════════════════════════════════
   FLOATING PARTICLES
   ═══════════════════════════════════════════════════════════════ */

function Particles({ count = 260 }: { count?: number }) {
  const ref = useRef<THREE.Points>(null);

  const { positions, colors } = useMemo(() => {
    const positions = new Float32Array(count * 3);
    const colors    = new Float32Array(count * 3);
    const c = new THREE.Color();

    for (let i = 0; i < count; i++) {
      positions[i * 3 + 0] = (Math.random() - 0.5) * 30;
      positions[i * 3 + 1] = (Math.random() - 0.5) * 14;
      positions[i * 3 + 2] = (Math.random() - 0.5) * 30;

      /* Cycle through accent colours for variety */
      const acc = CARD_ACCENTS[Math.floor(Math.random() * CARD_ACCENTS.length)];
      c.set(acc);
      colors[i * 3 + 0] = c.r;
      colors[i * 3 + 1] = c.g;
      colors[i * 3 + 2] = c.b;
    }

    return { positions, colors };
  }, [count]);

  useFrame(({ clock }) => {
    if (!ref.current) return;
    ref.current.rotation.y  = clock.elapsedTime * 0.008;
    ref.current.rotation.x  = clock.elapsedTime * 0.003;
  });

  return (
    <points ref={ref}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" array={positions} count={count} itemSize={3} />
        <bufferAttribute attach="attributes-color"    array={colors}    count={count} itemSize={3} />
      </bufferGeometry>
      <pointsMaterial size={0.045} vertexColors transparent opacity={0.55} sizeAttenuation />
    </points>
  );
}

/* ═══════════════════════════════════════════════════════════════
   EXPORTED SCENE  (the full Canvas)
   ═══════════════════════════════════════════════════════════════ */

export default function ProjectsScene() {
  const [projects, setProjects] = useState<Project[]>(fallbackProjects);

  useEffect(() => {
    async function loadProjects() {
      try {
        const response = await fetch(apiUrl("/api/projects"));
        const body = await response.text();
        const data = body ? JSON.parse(body) : null;

        if (!response.ok || !Array.isArray(data)) {
          throw new Error(`Projects API is unavailable (${response.status}).`);
        }

        setProjects(data);
      } catch (error) {
        console.warn("Using local project data because the projects API is unavailable:", error);
      }
    }

    void loadProjects();
  }, []);

  return (
    <Canvas
      id="projects-canvas"
      camera={{ position: [0, 1.5, 9.5], fov: 62 }}
      style={{ width: "100%", height: "100%" }}
      gl={{ antialias: true, alpha: true }}
      dpr={[1, 2]}
    >
      <fog attach="fog" args={["#020812", 14, 32]} />

      <SceneLights />
      <Carousel projects={projects} />
      <HoloGrid />
      <Particles count={260} />

      <Stars radius={28} depth={8} count={280} factor={2} fade speed={0.4} />
    </Canvas>
  );
}
