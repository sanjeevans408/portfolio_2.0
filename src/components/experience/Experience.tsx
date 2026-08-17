import { motion } from "framer-motion";
import { experiences, education } from "../../data/experience";
import { Briefcase, GraduationCap, MapPin } from "lucide-react";

const typeColors: Record<string, string> = {
  internship: "#00f5ff",
  freelance: "#f59e0b",
  project: "#10b981",
};

const typeLabels: Record<string, string> = {
  internship: "Internship",
  freelance: "Freelance",
  project: "Projects",
};

export default function Experience() {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.15 },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, x: -20 },
    visible: {
      opacity: 1,
      x: 0,
      transition: { duration: 0.6 },
    },
  };

  return (
    <section
      id="experience"
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
          Experience
        </motion.h2>
        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ delay: 0.2, duration: 0.6 }}
          viewport={{ once: true }}
          className="text-zinc-400 text-lg mb-16 max-w-xl"
        >
          Internships, freelance deliveries, and shipped open-source projects.
        </motion.p>

        <div className="grid md:grid-cols-2 gap-16">
          {/* Experience Timeline */}
          <div>
            <h3 className="text-2xl font-bold mb-8 text-white flex items-center gap-2">
              <Briefcase size={20} className="text-cyan-400" />
              Professional
            </h3>
            <motion.div
              className="space-y-8"
              variants={containerVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
            >
              {experiences.map((exp, idx) => (
                <motion.div
                  key={idx}
                  variants={itemVariants}
                  className="relative pl-8 border-l-2 border-cyan-400/30"
                >
                  {/* Timeline dot */}
                  <div
                    className="absolute -left-[9px] top-1 w-4 h-4 rounded-full border-2 border-black"
                    style={{ background: typeColors[exp.type] }}
                  />

                  {/* Type badge */}
                  <span
                    className="inline-block text-[10px] font-bold px-2 py-0.5 rounded-full mb-2 border font-mono"
                    style={{
                      color: typeColors[exp.type],
                      borderColor: `${typeColors[exp.type]}40`,
                      background: `${typeColors[exp.type]}10`,
                    }}
                  >
                    {typeLabels[exp.type]}
                  </span>

                  <h4 className="text-lg font-bold text-white">{exp.title}</h4>
                  <p className="text-cyan-400 font-semibold text-sm">{exp.company}</p>

                  <div className="flex flex-wrap items-center gap-3 mt-1 mb-3">
                    <span className="text-xs text-zinc-500 font-mono">{exp.period}</span>
                    {exp.location && (
                      <span className="flex items-center gap-1 text-xs text-zinc-600">
                        <MapPin size={10} />
                        {exp.location}
                      </span>
                    )}
                  </div>

                  {/* Bullet points from resume */}
                  <ul className="space-y-1.5">
                    {exp.bullets.map((bullet, bi) => (
                      <li key={bi} className="flex gap-2 text-sm text-zinc-400 leading-relaxed">
                        <span className="text-cyan-400 mt-0.5 shrink-0">›</span>
                        {bullet}
                      </li>
                    ))}
                  </ul>
                </motion.div>
              ))}
            </motion.div>
          </div>

          {/* Education Timeline */}
          <div>
            <h3 className="text-2xl font-bold mb-8 text-white flex items-center gap-2">
              <GraduationCap size={20} className="text-purple-400" />
              Education
            </h3>
            <motion.div
              className="space-y-8"
              variants={containerVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
            >
              {education.map((edu, idx) => (
                <motion.div
                  key={idx}
                  variants={itemVariants}
                  className="relative pl-8 border-l-2 border-purple-400/30"
                >
                  <div className="absolute -left-[9px] top-1 w-4 h-4 rounded-full bg-purple-400 border-2 border-black" />

                  <p className="text-xs text-zinc-500 font-mono mb-1">{edu.year}</p>
                  <h4 className="text-lg font-bold text-white">{edu.level}</h4>
                  <p className="text-purple-400 text-sm font-semibold">{edu.school}</p>

                  {"stream" in edu && (
                    <p className="text-xs text-zinc-500 mt-1">Stream: {edu.stream}</p>
                  )}
                  {"cgpa" in edu && edu.cgpa && (
                    <p className="text-xs text-emerald-400 font-mono mt-1">
                      CGPA: {edu.cgpa} / 10
                    </p>
                  )}
                  {"coursework" in edu && edu.coursework && (
                    <div className="mt-2 flex flex-wrap gap-1.5">
                      {edu.coursework.map((c, ci) => (
                        <span
                          key={ci}
                          className="text-[10px] px-2 py-0.5 rounded bg-white/5 border border-white/10 text-zinc-400 font-mono"
                        >
                          {c}
                        </span>
                      ))}
                    </div>
                  )}
                </motion.div>
              ))}
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}
