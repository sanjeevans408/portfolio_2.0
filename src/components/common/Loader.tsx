import { motion } from "framer-motion";

export default function Loader() {
  return (
    <div className="fixed inset-0 bg-black flex items-center justify-center z-[9999]">
      <motion.div
        animate={{
          opacity: [0, 1, 0],
          scale: [0.8, 1.1, 1],
        }}
        transition={{
          repeat: Infinity,
          duration: 2,
        }}
        className="text-center"
      >
        <h1 className="text-6xl font-black text-cyan-400 tracking-tighter">
          SANJEEVAN
        </h1>
        <div className="flex gap-2 justify-center mt-6">
          {[0, 1, 2].map((i) => (
            <motion.div
              key={i}
              className="w-2 h-2 rounded-full bg-cyan-400"
              animate={{ y: [0, -10, 0] }}
              transition={{ delay: i * 0.2, repeat: Infinity, duration: 0.8 }}
            />
          ))}
        </div>
      </motion.div>
    </div>
  );
}
