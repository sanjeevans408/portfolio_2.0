import { motion } from "framer-motion";
import { experiences, education } from "../../data/experience";

export default function Experience() {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
      },
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
          className="text-5xl md:text-6xl font-black mb-16 text-cyan-400"
        >
          Experience
        </motion.h2>

        <div className="grid md:grid-cols-2 gap-16">
          {/* Experience Timeline */}
          <div>
            <h3 className="text-2xl font-bold mb-8 text-white">Professional</h3>
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
                  className="relative pl-8 border-l-2 border-cyan-400/50"
                >
                  <div className="absolute -left-4 top-0 w-6 h-6 rounded-full bg-cyan-400 border-4 border-black" />
                  <h4 className="text-xl font-bold text-cyan-400">
                    {exp.title}
                  </h4>
                  <p className="text-sm text-zinc-400">{exp.company}</p>
                  <p className="text-xs text-zinc-500 mt-1">{exp.period}</p>
                  <p className="text-zinc-300 mt-2">{exp.description}</p>
                </motion.div>
              ))}
            </motion.div>
          </div>

          {/* Education Timeline */}
          <div>
            <h3 className="text-2xl font-bold mb-8 text-white">Education</h3>
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
                  className="relative pl-8 border-l-2 border-purple-400/50"
                >
                  <div className="absolute -left-4 top-0 w-6 h-6 rounded-full bg-purple-400 border-4 border-black" />
                  <p className="text-2xl font-bold text-purple-400">
                    {edu.year}
                  </p>
                  <h4 className="text-lg font-bold text-white mt-1">
                    {edu.level}
                  </h4>
                  <p className="text-zinc-400">{edu.school}</p>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}
