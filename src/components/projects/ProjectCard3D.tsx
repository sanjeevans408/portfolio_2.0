/**
 * ProjectCard3D.tsx
 * ─────────────────────────────────────────────────────────────────────────────
 * A single interactive 3D project card rendered via @react-three/fiber.
 *
 * Structure:
 *   RoundedBox (glass frame)
 *   ├─ MeshPhysicalMaterial  – glassy panel with clearcoat
 *   ├─ Glow shell            – slightly larger RoundedBox, BackSide, opacity
 *   │                           animated by useFrame on hover
 *   ├─ Accent bar            – thin coloured stripe at card top
 *   ├─ Corner circuit dots   – decorative accent circles
 *   ├─ Scan-line ring        – animated Torus at bottom of card
 *   └─ Html overlay          – scrollable project details + live/GitHub links
 *
 * Interaction:
 *   • Hover  → card lerps forward (+Z), glow shell fades in
 *   • Cards always face the camera (positioned by parent Carousel)
 * ─────────────────────────────────────────────────────────────────────────────
 */

import { useRef, useState, useMemo } from "react";
import { useFrame }                   from "@react-three/fiber";
import { Html, RoundedBox }           from "@react-three/drei";
import { ExternalLink, Github }       from "lucide-react";
import * as THREE                     from "three";
import type { Project }               from "../../data/projects";

/* ── accent-colour palette – one per card ───────────────────── */
export const CARD_ACCENTS = ["#00f5ff", "#8b5cf6", "#10b981", "#f59e0b"] as const;

/* ═══════════════════════════════════════════════════════════════ */

interface ProjectCard3DProps {
  project:     Project;
  position:    [number, number, number];
  rotation:    [number, number, number];
  accentColor: string;
  index:       number;
}

export default function ProjectCard3D({
  project,
  position,
  rotation,
  accentColor,
  index,
}: ProjectCard3DProps) {
  const groupRef     = useRef<THREE.Group>(null);
  const glowMatRef   = useRef<THREE.MeshPhysicalMaterial>(null);
  const torusRef     = useRef<THREE.Mesh>(null);
  const [hovered, setHovered] = useState(false);

  /* ── target / current Z offset for "lean-forward" on hover ── */
  const targetZ  = useRef(0);
  const currentZ = useRef(0);

  /* ── Card frame material ──────────────────────────────────── */
  const cardMat = useMemo(
    () =>
      new THREE.MeshPhysicalMaterial({
        color: "#06101e",
        metalness: 0.55,
        roughness: 0.12,
        transparent: true,
        opacity: 0.75,
        transmission: 0.12,
        clearcoat: 1,
        clearcoatRoughness: 0.04,
      }),
    []
  );

  /* ── Accent bar material ──────────────────────────────────── */
  const accentMat = useMemo(
    () => new THREE.MeshBasicMaterial({ color: accentColor }),
    [accentColor]
  );

  /* ── Scan ring material ───────────────────────────────────── */
  const torusMat = useMemo(
    () =>
      new THREE.MeshBasicMaterial({
        color: accentColor,
        transparent: true,
        opacity: 0,
      }),
    [accentColor]
  );

  /* ── Animation ────────────────────────────────────────────── */
  useFrame((_, delta) => {
    if (!groupRef.current) return;

    /* Card Z-lurch on hover */
    targetZ.current  = hovered ? 0.60 : 0;
    currentZ.current = THREE.MathUtils.lerp(currentZ.current, targetZ.current, 1 - Math.pow(0.04, delta));
    groupRef.current.position.z = currentZ.current;

    /* Glow shell fade */
    if (glowMatRef.current) {
      glowMatRef.current.opacity = THREE.MathUtils.lerp(
        glowMatRef.current.opacity,
        hovered ? 0.28 : 0,
        1 - Math.pow(0.05, delta)
      );
    }

    /* Scan ring rotate + fade */
    if (torusRef.current) {
      torusRef.current.rotation.z += delta * 1.4;
      (torusRef.current.material as THREE.MeshBasicMaterial).opacity =
        THREE.MathUtils.lerp(
          (torusRef.current.material as THREE.MeshBasicMaterial).opacity,
          hovered ? 0.55 : 0,
          1 - Math.pow(0.05, delta)
        );
    }
  });

  /* ── Hex-grid background pattern string (inline SVG data URI) */
  const hexPattern = useMemo(() => {
    const svg = `<svg xmlns='http://www.w3.org/2000/svg' width='60' height='52'>
      <polygon points='30,2 58,17 58,35 30,50 2,35 2,17' fill='none' stroke='${encodeURIComponent(accentColor)}' stroke-width='0.6' opacity='0.18'/>
    </svg>`;
    return `url("data:image/svg+xml,${svg}")`;
  }, [accentColor]);

  /* ────────────────────────────────────────────────────────── */
  return (
    <group position={position} rotation={rotation}>
      {/* Internal group tracks the Z lurch so Html follows */}
      <group ref={groupRef}>

        {/* ── Card frame */}
        <RoundedBox
          args={[3.20, 4.20, 0.14]}
          radius={0.10}
          smoothness={4}
          material={cardMat}
          onPointerEnter={(e) => { e.stopPropagation(); setHovered(true);  document.body.style.cursor = "pointer"; }}
          onPointerLeave={() => { setHovered(false); document.body.style.cursor = "auto"; }}
        />

        {/* ── Glow shell (BackSide, opacity animated) */}
        <RoundedBox args={[3.42, 4.42, 0.20]} radius={0.12} smoothness={4}>
          <meshPhysicalMaterial
            ref={glowMatRef}
            color={accentColor}
            transparent
            opacity={0}
            side={THREE.BackSide}
            roughness={0.4}
            emissive={accentColor}
            emissiveIntensity={0.6}
          />
        </RoundedBox>

        {/* ── Accent top bar */}
        <mesh material={accentMat} position={[0, 1.97, 0.08]}>
          <planeGeometry args={[2.80, 0.07]} />
        </mesh>

        {/* ── Corner circuit dots */}
        {(
          [
            [-1.35,  1.92] as [number, number],
            [ 1.35,  1.92] as [number, number],
            [-1.35, -1.92] as [number, number],
            [ 1.35, -1.92] as [number, number],
          ] as [number, number][]
        ).map(([cx, cy], ci) => (
          <mesh key={ci} material={accentMat} position={[cx, cy, 0.08]}>
            <circleGeometry args={[0.055, 8]} />
          </mesh>
        ))}

        {/* ── Index number (3D text-like block) */}
        <mesh position={[-1.22, 1.65, 0.09]}>
          <planeGeometry args={[0.22, 0.22]} />
          <meshBasicMaterial color={accentColor} transparent opacity={0.30} />
        </mesh>

        {/* ── Scan ring at bottom */}
        <mesh ref={torusRef} material={torusMat} position={[0, -1.70, 0.09]}>
          <torusGeometry args={[0.38, 0.014, 6, 60]} />
        </mesh>

        {/* ── HTML content overlay ── */}
        <Html
          position={[0, -0.08, 0.10]}
          center
          zIndexRange={[100, 0]}
          style={{
            width: "260px",
            pointerEvents: "none",
            userSelect: "none",
          }}
        >
          <div
            style={{
              background: "rgba(6, 14, 28, 0.82)",
              backdropFilter: "blur(14px)",
              borderRadius: "10px",
              border: `1px solid ${accentColor}26`,
              padding: "18px",
              fontFamily: "'Inter', system-ui, sans-serif",
              color: "#e2e8f0",
              backgroundImage: hexPattern,
              backgroundRepeat: "repeat",
            }}
          >
            {/* Card index badge */}
            <div
              style={{
                fontSize: "9px",
                fontWeight: 700,
                letterSpacing: "0.15em",
                color: accentColor,
                marginBottom: "6px",
                textTransform: "uppercase",
              }}
            >
              PROJECT {String(index + 1).padStart(2, "0")}
            </div>

            {/* Title */}
            <h3
              style={{
                fontSize: "16px",
                fontWeight: 800,
                marginBottom: "6px",
                color: "#ffffff",
                lineHeight: 1.2,
              }}
            >
              {project.title}
            </h3>

            {/* Divider */}
            <div
              style={{
                height: "1px",
                background: `linear-gradient(90deg, ${accentColor}, transparent)`,
                marginBottom: "8px",
              }}
            />

            {/* Description */}
            <p
              style={{
                fontSize: "10.5px",
                color: "#94a3b8",
                marginBottom: "10px",
                lineHeight: 1.55,
              }}
            >
              {project.description}
            </p>

            {/* Tech badges */}
            <div style={{ display: "flex", flexWrap: "wrap", gap: "4px", marginBottom: "10px" }}>
              {project.tech.map((t, ti) => (
                <span
                  key={ti}
                  style={{
                    fontSize: "8.5px",
                    padding: "2px 7px",
                    borderRadius: "20px",
                    background: `${accentColor}18`,
                    border: `1px solid ${accentColor}40`,
                    color: accentColor,
                    fontWeight: 600,
                  }}
                >
                  {t}
                </span>
              ))}
            </div>

            {/* Features */}
            {project.features && (
              <div style={{ marginBottom: "12px" }}>
                {project.features.map((f, fi) => (
                  <div
                    key={fi}
                    style={{
                      fontSize: "9.5px",
                      color: "#64748b",
                      padding: "1px 0",
                      display: "flex",
                      alignItems: "center",
                      gap: "5px",
                    }}
                  >
                    <span style={{ color: accentColor, fontSize: "8px" }}>✦</span> {f}
                  </div>
                ))}
              </div>
            )}

            {/* Action links – pointer events re-enabled */}
            <div style={{ display: "flex", gap: "7px", pointerEvents: "auto" }}>
              <a
                href={project.live}
                target="_blank"
                rel="noopener noreferrer"
                style={{
                  flex: 1,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  gap: "4px",
                  padding: "8px 4px",
                  borderRadius: "7px",
                  background: accentColor,
                  color: "#000",
                  fontSize: "10px",
                  fontWeight: 700,
                  textDecoration: "none",
                  transition: "opacity 0.18s",
                }}
                onMouseEnter={(e) => ((e.currentTarget as HTMLAnchorElement).style.opacity = "0.80")}
                onMouseLeave={(e) => ((e.currentTarget as HTMLAnchorElement).style.opacity = "1")}
              >
                <ExternalLink size={10} /> Live Demo
              </a>

              <a
                href={project.github}
                target="_blank"
                rel="noopener noreferrer"
                style={{
                  flex: 1,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  gap: "4px",
                  padding: "8px 4px",
                  borderRadius: "7px",
                  border: `1.5px solid ${accentColor}`,
                  color: accentColor,
                  fontSize: "10px",
                  fontWeight: 700,
                  textDecoration: "none",
                  transition: "all 0.18s",
                  background: "transparent",
                }}
                onMouseEnter={(e) => {
                  const el = e.currentTarget as HTMLAnchorElement;
                  el.style.background = accentColor;
                  el.style.color      = "#000";
                }}
                onMouseLeave={(e) => {
                  const el = e.currentTarget as HTMLAnchorElement;
                  el.style.background = "transparent";
                  el.style.color      = accentColor;
                }}
              >
                <Github size={10} /> GitHub
              </a>
            </div>
          </div>
        </Html>

      </group>
    </group>
  );
}
