import { motion } from "framer-motion";
import { profile } from "../../data/profile";

export default function About() {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.8 },
    },
  };

  return (
    <section
      id="about"
      className="relative py-20 px-6 md:px-12 bg-black border-b border-white/10"
    >
      <div className="max-w-7xl mx-auto">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-5xl md:text-6xl font-black mb-12 text-cyan-400"
        >
          About Me
        </motion.h2>

        <motion.div
          className="grid md:grid-cols-2 gap-12 items-center"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          {/* Image */}
          <motion.div variants={itemVariants}>
            <div className="relative">
              <div className="absolute -inset-4 bg-gradient-to-r from-cyan-400 to-purple-600 rounded-lg blur-lg opacity-20" />
              <img
                src={profile.profileImage}
                alt={profile.name}
                className="relative w-full rounded-lg object-cover border border-cyan-400/30"
              />
            </div>
          </motion.div>

          {/* Content */}
          <motion.div variants={itemVariants} className="space-y-6">
            <p className="text-lg text-zinc-300 leading-relaxed">
              {profile.bio}
            </p>

            {/* Quick Facts */}
            <div className="grid grid-cols-2 gap-4">
              <div className="p-4 rounded-lg bg-white/5 border border-white/10">
                <div className="text-cyan-400 font-bold">🎓</div>
                <p className="text-sm text-zinc-400">Education</p>
                <p className="font-semibold">{profile.education}</p>
              </div>
              <div className="p-4 rounded-lg bg-white/5 border border-white/10">
                <div className="text-cyan-400 font-bold">📍</div>
                <p className="text-sm text-zinc-400">Location</p>
                <p className="font-semibold">{profile.location}</p>
              </div>
              <div className="p-4 rounded-lg bg-white/5 border border-white/10">
                <div className="text-cyan-400 font-bold">🎯</div>
                <p className="text-sm text-zinc-400">CGPA</p>
                <p className="font-semibold">{profile.cgpa}</p>
              </div>
              <div className="p-4 rounded-lg bg-white/5 border border-white/10">
                <div className="text-cyan-400 font-bold">💼</div>
                <p className="text-sm text-zinc-400">Status</p>
                <p className="font-semibold">Open for Work</p>
              </div>
            </div>

            {/* Contact Info */}
            <div className="space-y-3 pt-4 border-t border-white/10">
              <a
                href={`mailto:${profile.email}`}
                className="flex items-center gap-3 text-zinc-400 hover:text-cyan-400 transition"
              >
                <span>✉️</span> {profile.email}
              </a>
              <a
                href={`tel:${profile.phone}`}
                className="flex items-center gap-3 text-zinc-400 hover:text-cyan-400 transition"
              >
                <span>📱</span> {profile.phone}
              </a>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
