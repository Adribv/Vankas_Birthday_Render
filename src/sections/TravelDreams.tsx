import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { travelDreams } from "@/data/memories";

export default function TravelDreams() {
  const [selected, setSelected] = useState<number | null>(null);

  return (
    <section className="py-24 px-6">
      <motion.h2
        className="font-display text-3xl md:text-5xl text-center text-foreground mb-4"
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
      >
        Places We'll Go ✈️
      </motion.h2>
      <p className="font-body text-muted-foreground text-center mb-14">
        Click a destination to reveal our dream
      </p>

      <div className="max-w-4xl mx-auto flex flex-wrap justify-center gap-6">
        {travelDreams.map((dest, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.12 }}
          >
            <motion.button
              className="glass-strong rounded-2xl p-6 md:p-8 text-center w-36 md:w-44 focus:outline-none"
              whileHover={{ scale: 1.08, y: -6 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setSelected(selected === i ? null : i)}
            >
              <span className="text-4xl md:text-5xl block mb-2">{dest.emoji}</span>
              <span className="font-display text-lg text-foreground">{dest.city}</span>
            </motion.button>

            <AnimatePresence>
              {selected === i && (
                <motion.div
                  className="mt-3 glass-strong rounded-xl p-4 text-center glow-sunflower"
                  initial={{ opacity: 0, height: 0, y: -10 }}
                  animate={{ opacity: 1, height: "auto", y: 0 }}
                  exit={{ opacity: 0, height: 0 }}
                  transition={{ duration: 0.3 }}
                >
                  <p className="font-body text-sm text-foreground">{dest.message}</p>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
