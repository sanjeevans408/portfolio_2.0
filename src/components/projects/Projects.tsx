/**
 * Projects.tsx
 * ─────────────────────────────────────────────────────────────────────────────
 * The portfolio's Projects section, rebuilt with an interactive 3D carousel.
 *
 *  ┌──────────────────────────────────────────┐
 *  │ Section header  (Framer Motion fade-in)  │
 *  │                                          │
 *  │ ┌──────────────────────────────────────┐ │
 *  │ │  3-D Carousel Canvas (720 px tall)   │ │
 *  │ │  ← drag to rotate →                  │ │
 *  │ └──────────────────────────────────────┘ │
 *  │                                          │
 *  │  Interaction hint  (fade-in, icon row)   │
 *  └──────────────────────────────────────────┘
 * ─────────────────────────────────────────────────────────────────────────────
 */

import { Suspense }        from "react";
import { motion }          from "framer-motion";
import ProjectsScene       from "./ProjectsScene";
import { CARD_ACCENTS }    from "./ProjectCard3D";

/* ── Skeleton shown while the R3F canvas loads ── */
function CanvasSkeleton() {
  return (
    <div className="w-full h-full flex items-center justify-center">
      <div className="flex flex-col items-center gap-4 text-zinc-600 animate-pulse">
        <svg
          className="w-12 h-12"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={1}
            d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4"
          />
        </svg>
        <span className="text-sm font-mono tracking-widest uppercase">
          Loading 3-D scene…
        </span>
      </div>
    </div>
  );
}

export default function Projects() {
  return (
    <section
      id="projects"
      className="relative py-20 bg-black border-b border-white/10 overflow-hidden"
    >
      {/* ── Section header ── */}
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          <h2 className="text-5xl md:text-6xl font-black mb-4 text-cyan-400">
            Featured Projects
          </h2>
          <p className="text-zinc-400 text-lg mb-2 max-w-xl">
            Each card is an interactive 3-D division. Hover to illuminate —
            drag to explore the full carousel.
          </p>
        </motion.div>

        {/* ── Accent colour legend ── */}
        <motion.div
          className="flex flex-wrap gap-3 mt-4 mb-6"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ delay: 0.4, duration: 0.6 }}
          viewport={{ once: true }}
        >
          {[
            "AssetFlow",
            "Nemo — AI Chatbot",
            "Pingback — Real-Time Chat",
            "IPL Win Predictor",
            "Web Scraper EXTRACT/01",
            "Gym Management System",
          ].map((label, i) => (
            <span
              key={i}
              className="flex items-center gap-2 text-xs font-semibold text-zinc-400"
            >
              <span
                className="w-2 h-2 rounded-full"
                style={{ background: CARD_ACCENTS[i] }}
              />
              {label}
            </span>
          ))}
        </motion.div>
      </div>

      {/* ── 3-D Canvas ── */}
      <motion.div
        className="relative mx-auto"
        style={{ height: "720px", maxWidth: "1400px" }}
        initial={{ opacity: 0, scale: 0.96 }}
        whileInView={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.9, ease: "easeOut" }}
        viewport={{ once: true }}
      >
        {/* Vignette overlay (left & right fade edges) */}
        <div
          className="absolute inset-y-0 left-0 w-24 z-10 pointer-events-none"
          style={{
            background:
              "linear-gradient(to right, #050505 0%, transparent 100%)",
          }}
        />
        <div
          className="absolute inset-y-0 right-0 w-24 z-10 pointer-events-none"
          style={{
            background:
              "linear-gradient(to left, #050505 0%, transparent 100%)",
          }}
        />

        <Suspense fallback={<CanvasSkeleton />}>
          <ProjectsScene />
        </Suspense>
      </motion.div>

      {/* ── Interaction hint ── */}
      <motion.div
        className="flex justify-center items-center gap-3 mt-4 text-zinc-600 text-sm select-none"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ delay: 0.8, duration: 0.6 }}
        viewport={{ once: true }}
      >
        {/* mouse-drag icon */}
        <svg
          className="w-5 h-5 animate-bounce"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={1.5}
            d="M8 9l4-4 4 4m0 6l-4 4-4-4"
          />
        </svg>
        <span className="font-mono tracking-widest uppercase text-xs">
          Drag to rotate · Hover to activate
        </span>
        {/* mouse-cursor icon */}
        <svg
          className="w-5 h-5"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={1.5}
            d="M15 15l-2 5L9 9l11 4-5 2zm0 0l5 5M7.188 2.239l.777 2.897M5.136 7.965l-2.898-.777M13.95 4.05l-2.122 2.122m-5.657 5.656l-2.12 2.122"
          />
        </svg>
      </motion.div>
    </section>
  );
}
