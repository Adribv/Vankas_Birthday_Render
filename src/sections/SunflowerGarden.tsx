import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { sunflowerMessages } from "@/data/memories";
import Windmill from "@/components/Windmill";

export default function SunflowerGarden() {
  const [revealed, setRevealed] = useState<number | null>(null);

  return (
    <section className="py-24 px-6 relative overflow-hidden">
      <div className="absolute inset-0 opacity-5" style={{ background: "var(--gradient-sunflower)" }} />

      {/* Windmill decoration */}
      <div className="absolute top-4 right-6 md:right-14 opacity-15">
        <Windmill size={100} duration={16} />
      </div>

      {/* Floating sunflower decorations */}
      {[...Array(4)].map((_, i) => (
        <motion.div
          key={i}
          className="absolute text-xl md:text-3xl opacity-10 select-none pointer-events-none"
          style={{ left: `${5 + i * 28}%`, top: `${20 + (i % 2) * 55}%` }}
          animate={{ y: [0, -15, 0], rotate: [-5, 5, -5] }}
          transition={{ duration: 4 + i, repeat: Infinity, delay: i * 0.6, ease: "easeInOut" }}
        >
          🌻
        </motion.div>
      ))}

      {/* Floating snack accents */}
      {["🍫", "🍉", "☕", "🌯"].map((emoji, i) => (
        <motion.div
          key={`snack-${i}`}
          className="absolute text-lg opacity-8 select-none pointer-events-none"
          style={{ right: `${5 + i * 20}%`, bottom: `${15 + (i % 2) * 40}%` }}
          animate={{ y: [0, -10, 0] }}
          transition={{ duration: 3 + i * 0.5, repeat: Infinity, delay: i * 0.4 }}
        >
          {emoji}
        </motion.div>
      ))}

      <motion.h2
        className="font-display text-3xl md:text-5xl text-center text-foreground mb-4 relative z-10"
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
      >
        Sunflower Garden 🌻
      </motion.h2>
      <p className="font-body text-muted-foreground text-center mb-14 relative z-10">
        Click each sunflower for a surprise message
      </p>

      <div className="max-w-3xl mx-auto grid grid-cols-3 gap-6 md:gap-10 relative z-10">
        {sunflowerMessages.map((msg, i) => (
          <motion.div
            key={i}
            className="flex flex-col items-center"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.08 }}
          >
            <motion.button
              className="text-5xl md:text-7xl select-none focus:outline-none"
              whileHover={{ scale: 1.2, rotate: 10 }}
              whileTap={{ scale: 0.9 }}
              onClick={() => setRevealed(revealed === i ? null : i)}
              aria-label={`Sunflower ${i + 1}`}
            >
              🌻
            </motion.button>

            <AnimatePresence>
              {revealed === i && (
                <motion.div
                  className="mt-3 glass-strong rounded-xl px-4 py-3 text-center max-w-[200px] glow-sunflower"
                  initial={{ opacity: 0, scale: 0.5, y: -10 }}
                  animate={{ opacity: 1, scale: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.5 }}
                  transition={{ type: "spring", stiffness: 300 }}
                >
                  <p className="font-body text-sm text-foreground">{msg}</p>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
