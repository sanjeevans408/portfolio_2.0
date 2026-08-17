import { motion } from "framer-motion";
import { skillCategories } from "../../data/skills";

const levelColors: Record<string, string> = {
  beginner: "#6b7280",
  intermediate: "#f59e0b",
  advanced: "#10b981",
  expert: "#00f5ff",
};

const levelLabels: Record<string, string> = {
  beginner: "Beginner",
  intermediate: "Intermediate",
  advanced: "Advanced",
  expert: "Expert",
};

export default function Skills() {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.08 },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 16 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5 },
    },
  };

  return (
    <section
      id="skills"
      className="relative py-20 px-6 md:px-12 bg-black border-b border-white/10"
    >
      <div className="max-w-7xl mx-auto">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-5xl md:text-6xl font-black mb-4 text-cyan-400"
        >
          Skills & Expertise
        </motion.h2>
        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ delay: 0.2, duration: 0.6 }}
          viewport={{ once: true }}
          className="text-zinc-400 text-lg mb-16 max-w-xl"
        >
          A practical toolkit built through internships, freelance work, and shipped products.
        </motion.p>

        <motion.div
          className="grid md:grid-cols-2 xl:grid-cols-3 gap-8"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          {skillCategories.map((cat, catIdx) => (
            <motion.div
              key={catIdx}
              variants={itemVariants}
              className="terminal-card rounded-xl p-6 space-y-5"
            >
              {/* Category header */}
              <div className="flex items-center gap-3 mb-2">
                <span className="text-2xl" aria-hidden="true">{cat.icon}</span>
                <h3
                  className="text-lg font-bold tracking-wide"
                  style={{ color: cat.color }}
                >
                  {cat.category}
                </h3>
              </div>

              {/* Skills with proficiency bars */}
              <div className="space-y-3">
                {cat.skills.map((skill, i) => (
                  <div key={i} className="space-y-1">
                    <div className="flex items-center justify-between">
                      <span className="text-sm font-medium text-zinc-200">
                        {skill.name}
                      </span>
                      <div className="flex items-center gap-2">
                        <span
                          className="text-[10px] font-bold px-2 py-0.5 rounded-full border"
                          style={{
                            color: levelColors[skill.level],
                            borderColor: `${levelColors[skill.level]}40`,
                            background: `${levelColors[skill.level]}10`,
                          }}
                        >
                          {levelLabels[skill.level]}
                        </span>
                        <span className="text-xs text-zinc-500 font-mono">
                          {skill.proficiency}%
                        </span>
                      </div>
                    </div>

                    {/* Animated proficiency bar */}
                    <div className="h-1 rounded-full bg-white/10 overflow-hidden">
                      <motion.div
                        className="h-full rounded-full"
                        style={{ background: cat.color }}
                        initial={{ width: 0 }}
                        whileInView={{ width: `${skill.proficiency}%` }}
                        transition={{ duration: 0.9, delay: i * 0.05, ease: "easeOut" }}
                        viewport={{ once: true }}
                      />
                    </div>

                    <p className="text-[10px] text-zinc-600 font-mono">
                      {skill.yearsOfExperience}yr{skill.yearsOfExperience !== 1 ? "s" : ""} experience
                    </p>
                  </div>
                ))}
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
