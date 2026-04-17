import { useEffect, useState, useRef } from "react";
import { motion, useInView } from "framer-motion";
import { finalMessage } from "@/data/memories";
import Windmill from "@/components/Windmill";

export default function FinalMessage() {
  const [text, setText] = useState("");
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });

  useEffect(() => {
    if (!inView) return;
    let i = 0;
    const interval = setInterval(() => {
      setText(finalMessage.slice(0, i + 1));
      i++;
      if (i >= finalMessage.length) clearInterval(interval);
    }, 50);
    return () => clearInterval(interval);
  }, [inView]);

  return (
    <section
      ref={ref}
      className="relative min-h-screen flex flex-col items-center justify-center px-6 overflow-hidden"
      style={{ background: "linear-gradient(180deg, hsl(82 30% 10%), hsl(82 25% 14%), hsl(82 30% 10%))" }}
    >
      {/* Windmills */}
      <div className="absolute top-8 right-8 opacity-15">
        <Windmill size={110} duration={20} />
      </div>
      <div className="absolute bottom-16 left-8 opacity-10">
        <Windmill size={80} duration={25} />
      </div>

      {/* Sunflowers */}
      {[...Array(5)].map((_, i) => (
        <motion.div
          key={i}
          className="absolute text-3xl md:text-5xl opacity-10 select-none"
          style={{ left: `${8 + i * 20}%`, bottom: `${5 + (i % 3) * 8}%` }}
          animate={{ rotate: [-8, 4, -4, -8], scale: [1, 1.05, 0.98, 1] }}
          transition={{ duration: 4, repeat: Infinity, delay: i * 0.4, ease: "easeInOut" }}
        >
          🌻
        </motion.div>
      ))}

      {/* Working girl accent */}
      <motion.div
        className="absolute top-16 left-10 text-3xl md:text-5xl opacity-10 select-none"
        animate={{ y: [0, -8, 0], rotate: [-2, 2, -2] }}
        transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
      >
        💼
      </motion.div>

      {/* Floating food elements */}
      {["🍫", "☕", "🍉", "🌯", "🍟", "🍜"].map((emoji, i) => (
        <motion.div
          key={`food-${i}`}
          className="absolute text-xl opacity-8 select-none"
          style={{ left: `${3 + i * 16}%`, top: `${10 + (i % 3) * 30}%` }}
          animate={{ y: [0, -12, 0] }}
          transition={{ duration: 4 + i * 0.5, repeat: Infinity, delay: i * 0.5 }}
        >
          {emoji}
        </motion.div>
      ))}

      <motion.div
        className="relative z-10 text-center max-w-3xl"
        initial={{ opacity: 0 }}
        animate={inView ? { opacity: 1 } : {}}
        transition={{ duration: 1 }}
      >
        <motion.div
          className="text-6xl md:text-8xl mb-8"
          initial={{ scale: 0 }}
          animate={inView ? { scale: 1 } : {}}
          transition={{ type: "spring", delay: 0.3 }}
        >
          💛
        </motion.div>

        <p className="font-display-mobile md:font-display text-lg sm:text-xl md:text-4xl lg:text-5xl leading-relaxed text-foreground min-h-[8rem]">
          {text}
          {text.length < finalMessage.length && (
            <motion.span
              className="inline-block w-0.5 h-8 bg-sunflower ml-1 align-middle"
              animate={{ opacity: [1, 0] }}
              transition={{ duration: 0.6, repeat: Infinity }}
            />
          )}
        </p>

        <motion.p
          className="mt-12 font-body text-muted-foreground text-lg"
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          transition={{ delay: 8 }}
        >
          With all our love 🌻☕✈️🍫🍉
        </motion.p>
      </motion.div>
    </section>
  );
}
