import { motion } from "framer-motion";
import { skills } from "../../data/skills";

export default function Skills() {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const skillItemVariants = {
    hidden: { opacity: 0, scale: 0.8 },
    visible: {
      opacity: 1,
      scale: 1,
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
          className="text-5xl md:text-6xl font-black mb-16 text-cyan-400"
        >
          Skills & Expertise
        </motion.h2>

        <motion.div
          className="space-y-12"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          {skills.map((skillCategory, idx) => (
            <motion.div
              key={idx}
              variants={skillItemVariants}
              className="space-y-4"
            >
              <h3 className="text-2xl font-bold text-white mb-6">
                {skillCategory.category}
              </h3>
              <motion.div
                className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4"
                variants={containerVariants}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
              >
                {skillCategory.skills.map((skill, i) => (
                  <motion.div
                    key={i}
                    variants={skillItemVariants}
                    className="group relative"
                  >
                    <div
                      className="absolute -inset-1 rounded-lg blur-md opacity-0 group-hover:opacity-100 transition duration-300"
                      style={{
                        background: skillCategory.color || "#00F5FF",
                      }}
                    />
                    <div className="relative px-4 py-3 rounded-lg bg-black border border-white/20 group-hover:border-white/40 transition duration-300 text-center">
                      <p className="font-semibold text-sm md:text-base">{skill}</p>
                    </div>
                  </motion.div>
                ))}
              </motion.div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
