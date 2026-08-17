import { Suspense } from "react";
import { motion } from "framer-motion";
import { Github, Linkedin, Download, ExternalLink, FileText, Terminal } from "lucide-react";
import { profile } from "../../data/profile";
import Aurora from "../common/Aurora";
import FishScene from "./FishScene";

export default function Hero() {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.3,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.8, ease: "easeOut" },
    },
  };

  return (
    <section id="hero" className="relative w-full min-h-screen overflow-hidden bg-[#05090f] pt-20">

      {/* ── Three.js Fish Canvas Background ── */}
      <div className="absolute inset-0 z-0">
        <Suspense fallback={null}>
          <FishScene />
        </Suspense>
      </div>

      {/* ── Aurora gradient blobs ── */}
      <div className="relative z-[1]">
        <Aurora />
      </div>

      <div className="code-grid absolute inset-0 z-[2] opacity-25" aria-hidden="true" />

      {/* ── Hero Content ── */}
      <div className="relative z-10 h-full flex items-center justify-center">
        <motion.div
          className="text-center max-w-4xl px-6 py-16"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          <motion.div variants={itemVariants} className="mx-auto mb-6 flex w-fit items-center gap-2 rounded-full border border-emerald-300/30 bg-emerald-300/5 px-4 py-2 font-mono text-xs text-emerald-300">
            <Terminal size={15} /> <span>developer@portfolio:~$ whoami</span><span className="terminal-caret" />
          </motion.div>

          {/* Profile Image */}
          <motion.div variants={itemVariants}>
            <img
              src={profile.profileImage}
              alt={profile.name}
              className="w-32 h-32 md:w-36 md:h-36 mx-auto rounded-2xl border border-cyan-300 object-cover shadow-[0_0_40px_rgba(34,211,238,0.45)] mb-8"
            />
          </motion.div>

          {/* Name */}
          <motion.h1
            variants={itemVariants}
            className="text-5xl md:text-8xl font-black tracking-tighter mb-4 text-white"
          >
            {profile.name}
          </motion.h1>

          {/* Roles */}
          <motion.div variants={itemVariants} className="mb-8">
            <div className="flex flex-wrap justify-center gap-3 text-xl md:text-2xl font-semibold">
              {profile.roles.map((role, i) => (
                <span
                  key={i}
                  className="font-mono text-sm md:text-base text-cyan-300 px-3 py-2 rounded-md border border-cyan-400/30 bg-cyan-400/5"
                >
                  {`{ ${role} }`}
                </span>
              ))}
            </div>
          </motion.div>

          {/* Tagline */}
          <motion.p
            variants={itemVariants}
            className="text-lg md:text-xl text-zinc-400 mb-12 max-w-2xl mx-auto leading-relaxed"
          >
            {profile.tagline}
          </motion.p>

          {/* CTA Buttons */}
          <motion.div
            variants={itemVariants}
            className="flex flex-wrap justify-center gap-6 mb-12"
          >
            <a
              href="#projects"
              className="px-7 py-4 rounded-md bg-cyan-300 text-slate-950 font-mono font-bold hover:scale-105 hover:shadow-[0_0_20px_rgba(103,232,249,0.6)] transition duration-300"
            >
              View Projects
            </a>
            <a
              href={profile.resume}
              target="_blank"
              rel="noopener noreferrer"
              className="px-7 py-4 rounded-md border border-white/30 text-white font-mono font-bold hover:border-cyan-400 hover:text-cyan-300 transition duration-300 flex items-center gap-2"
            >
              <FileText size={18} />
              View Resume
            </a>
            <a
              href={profile.resume}
              download="Sanjeevan_Resume_ATS.pdf"
              className="px-7 py-4 rounded-md border border-cyan-400 text-cyan-300 font-mono font-bold hover:bg-cyan-300 hover:text-slate-950 transition duration-300 flex items-center gap-2"
            >
              <Download size={18} />
              Download Resume
            </a>
          </motion.div>

          {/* Social Links */}
          <motion.div variants={itemVariants} className="flex justify-center gap-6">
            <a
              href={profile.github}
              target="_blank"
              rel="noopener noreferrer"
              className="text-zinc-400 hover:text-cyan-400 transition duration-300 hover:scale-110"
              title="GitHub"
            >
              <Github size={32} />
            </a>
            <a
              href={profile.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              className="text-zinc-400 hover:text-cyan-400 transition duration-300 hover:scale-110"
              title="LinkedIn"
            >
              <Linkedin size={32} />
            </a>
            <a
              href={profile.fiverr}
              target="_blank"
              rel="noopener noreferrer"
              className="text-zinc-400 hover:text-cyan-400 transition duration-300 hover:scale-110"
              title="Fiverr"
            >
              <ExternalLink size={32} />
            </a>
          </motion.div>

          {/* Scroll Indicator */}
          <motion.div
            className="absolute bottom-12 left-1/2 -translate-x-1/2"
            animate={{ y: [0, 12, 0] }}
            transition={{ repeat: Infinity, duration: 2 }}
          >
            <div className="text-cyan-400 text-sm">Scroll to explore</div>
            <svg
              className="w-6 h-6 mx-auto mt-2"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M19 14l-7 7m0 0l-7-7m7 7V3"
              />
            </svg>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
