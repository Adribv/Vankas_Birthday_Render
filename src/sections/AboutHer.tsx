import { motion } from "framer-motion";
import { aboutHerTraits } from "@/data/memories";
import Windmill from "@/components/Windmill";

export default function AboutHer() {
  return (
    <section className="py-24 px-6 relative overflow-hidden">
      <div className="absolute inset-0 pointer-events-none">
        {/* Working girl elements */}
        <motion.div
          className="absolute top-10 right-10 text-4xl md:text-6xl opacity-10 select-none"
          animate={{ rotate: [-3, 3, -3] }}
          transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
        >
          💼
        </motion.div>
        <motion.div
          className="absolute bottom-16 left-8 text-3xl md:text-5xl opacity-10 select-none"
          animate={{ y: [0, -10, 0] }}
          transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
        >
          👩‍💻
        </motion.div>

        {/* Windmill */}
        <div className="absolute top-1/3 left-4 opacity-10">
          <Windmill size={60} duration={18} />
        </div>

        {/* Scattered sunflowers */}
        {[...Array(3)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute text-xl md:text-2xl opacity-10 select-none"
            style={{ left: `${25 + i * 25}%`, bottom: `${10 + i * 15}%` }}
            animate={{ rotate: [-8, 4, -4, -8], scale: [1, 1.05, 0.98, 1] }}
            transition={{ duration: 4, repeat: Infinity, delay: i * 0.5, ease: "easeInOut" }}
          >
            🌻
          </motion.div>
        ))}

        {/* Floating food/snack elements */}
        {["🍫", "🍜", "🍟", "☕", "🌯", "🍉"].map((emoji, i) => (
          <motion.div
            key={`food-${i}`}
            className="absolute text-lg md:text-xl opacity-8 select-none"
            style={{ left: `${8 + i * 15}%`, top: `${10 + (i % 3) * 30}%` }}
            animate={{ y: [0, -8, 0], rotate: [0, 5, -5, 0] }}
            transition={{ duration: 3.5 + i * 0.4, repeat: Infinity, delay: i * 0.4, ease: "easeInOut" }}
          >
            {emoji}
          </motion.div>
        ))}
      </div>

      <motion.h2
        className="font-display-mobile md:font-display text-2xl sm:text-3xl md:text-5xl text-center text-foreground mb-4 relative z-10"
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
      >
        Things That Define You
      </motion.h2>
      <motion.p
        className="font-body text-muted-foreground text-center mb-14 text-lg relative z-10"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ delay: 0.2 }}
      >
        A fun little guide to the birthday girl
      </motion.p>

      <div className="max-w-4xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6 relative z-10">
        {aboutHerTraits.map((trait, i) => (
          <motion.div
            key={i}
            className="glass-strong rounded-2xl p-5 text-center group"
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4, delay: i * 0.1 }}
            whileHover={{ scale: 1.08, y: -4 }}
          >
            <span className="text-4xl block mb-3 group-hover:animate-float">{trait.emoji}</span>
            <p className="font-body text-sm font-medium text-foreground">{trait.text}</p>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
