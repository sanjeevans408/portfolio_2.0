import { motion } from "framer-motion";
import { Trophy } from "lucide-react";
import { achievements } from "../../data/achievements";

export default function Achievements() {
  return (
    <section id="achievements" className="relative overflow-hidden border-b border-cyan-300/10 bg-[#05090f] px-6 py-20 md:px-12">
      <div className="code-grid absolute inset-0 opacity-30" aria-hidden="true" />
      <div className="relative mx-auto max-w-7xl">
        <motion.div
          initial={{ opacity: 0, y: 18 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="mb-12 flex flex-col gap-5 md:flex-row md:items-end md:justify-between"
        >
          <div>
            <p className="mb-3 font-mono text-xs uppercase tracking-[0.22em] text-emerald-300">// proof_of_work</p>
            <h2 className="text-4xl font-black tracking-tight text-white md:text-6xl">Achievements<span className="text-cyan-400">.</span></h2>
          </div>
          <p className="max-w-md font-mono text-sm leading-6 text-zinc-400">A compact readout of the work, learning, and tools behind the portfolio.</p>
        </motion.div>

        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {achievements.map((achievement, index) => (
            <motion.article
              key={achievement.label}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.45, delay: index * 0.08 }}
              className="terminal-card group relative overflow-hidden rounded-xl p-6"
            >
              <div className="mb-8 flex items-center justify-between">
                <span className="font-mono text-xs text-zinc-500">0{index + 1} / 04</span>
                <Trophy size={18} className="text-cyan-400 transition group-hover:scale-110 group-hover:text-emerald-300" />
              </div>
              <p className="font-mono text-xs text-emerald-300">$ {achievement.command}</p>
              <p className="mt-4 text-5xl font-black tracking-tighter text-white">{achievement.value}</p>
              <h3 className="mt-3 text-lg font-bold text-cyan-100">{achievement.label}</h3>
              <p className="mt-2 text-sm leading-6 text-zinc-400">{achievement.description}</p>
              <div className="mt-6 h-px bg-gradient-to-r from-cyan-400/60 to-transparent" />
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
}
