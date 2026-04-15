import { motion } from "framer-motion";
import { coffeePersonality } from "@/data/memories";

export default function CoffeePersonality() {
  return (
    <section className="py-24 px-6">
      <motion.h2
        className="font-display text-3xl md:text-5xl text-center text-foreground mb-4"
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
      >
        You in Coffee Terms ☕
      </motion.h2>
      <p className="font-body text-muted-foreground text-center mb-14">
        Because every side of you is worth savoring
      </p>

      <div className="max-w-4xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-6">
        {coffeePersonality.map((item, i) => (
          <motion.div
            key={i}
            className="glass-strong rounded-2xl p-6 md:p-8 group"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.15, duration: 0.5 }}
            whileHover={{ y: -4 }}
            style={{ boxShadow: "var(--shadow-warm)" }}
          >
            <div className="flex items-center gap-4 mb-3">
              <span className="text-3xl group-hover:animate-float">{item.icon}</span>
              <h3 className="font-display text-xl text-foreground">{item.type}</h3>
            </div>
            <p className="font-body text-muted-foreground">{item.trait}</p>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
