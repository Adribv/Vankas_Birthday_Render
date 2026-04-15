import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { memories } from "@/data/memories";
import Windmill from "@/components/Windmill";

function MemoryCard({ memory, index }: { memory: typeof memories[0]; index: number }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });
  const isLeft = index % 2 === 0;

  return (
    <div ref={ref} className={`flex items-center mb-16 ${isLeft ? "md:flex-row" : "md:flex-row-reverse"} flex-col`}>
      <motion.div
        className="w-full md:w-5/12"
        initial={{ opacity: 0, x: isLeft ? -80 : 80 }}
        animate={inView ? { opacity: 1, x: 0 } : {}}
        transition={{ duration: 0.7, ease: "easeOut" }}
      >
        <div className="glass-strong rounded-2xl overflow-hidden group">
          <div className="overflow-hidden">
            <img
src={memory.image}
              alt={memory.title}
              className="w-full aspect-[3/4] h-72 md:h-96 object-cover transition-transform duration-500 group-hover:scale-110"
            />
          </div>
          <div className="p-5">
            <h3 className="font-display text-xl text-foreground mb-1">{memory.title}</h3>
            <p className="font-body text-muted-foreground text-sm">{memory.description}</p>
          </div>
        </div>
      </motion.div>

      <div className="hidden md:flex w-2/12 justify-center">
        <motion.div
          className="w-4 h-4 rounded-full bg-sunflower animate-pulse-glow"
          initial={{ scale: 0 }}
          animate={inView ? { scale: 1 } : {}}
          transition={{ duration: 0.4, delay: 0.3 }}
        />
      </div>

      <div className="w-full md:w-5/12" />
    </div>
  );
}

export default function MemoryTimeline() {
  return (
    <section className="py-24 px-6 relative">
      {/* Windmill decoration */}
      <div className="absolute top-4 left-4 opacity-10">
        <Windmill size={70} duration={20} />
      </div>

      {/* Decorative sunflower */}
      <motion.div
        className="absolute top-12 right-8 text-2xl md:text-4xl opacity-15 select-none"
        animate={{ rotate: [-8, 4, -4, -8], scale: [1, 1.05, 0.98, 1] }}
        transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
      >
        🌻
      </motion.div>

      {/* Floating food accents */}
      {["🍫", "🍉", "☕"].map((emoji, i) => (
        <motion.div
          key={i}
          className="absolute text-lg opacity-8 select-none"
          style={{ right: `${8 + i * 15}%`, bottom: `${10 + i * 12}%` }}
          animate={{ y: [0, -10, 0] }}
          transition={{ duration: 3 + i, repeat: Infinity, delay: i * 0.5 }}
        >
          {emoji}
        </motion.div>
      ))}

      <motion.h2
        className="font-display text-3xl md:text-5xl text-center text-foreground mb-16"
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
      >
        Last Year Highlights 🌻
      </motion.h2>

      <div className="hidden md:block absolute left-1/2 top-40 bottom-20 w-0.5 bg-sunflower/20" />

      <div className="max-w-5xl mx-auto relative">
        {memories.map((memory, i) => (
          <MemoryCard key={i} memory={memory} index={i} />
        ))}
      </div>
    </section>
  );
}
