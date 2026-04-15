import { motion } from "framer-motion";
import Windmill from "@/components/Windmill";

export default function LoaderScreen({ onDone }: { onDone: () => void }) {
  return (
    <motion.div
      className="fixed inset-0 z-[60] flex flex-col items-center justify-center"
      style={{ background: "linear-gradient(135deg, hsl(82 35% 10%), hsl(82 30% 14%), hsl(82 25% 12%))" }}
      animate={{ opacity: 0 }}
      transition={{ duration: 0.8, delay: 2.5 }}
      onAnimationComplete={onDone}
    >
      {/* Windmill */}
      <div className="absolute top-10 right-10 opacity-15">
        <Windmill size={90} duration={12} />
      </div>

      {/* Floating snacks */}
      {["🍫", "🍉", "🌯", "🍟", "🍜"].map((emoji, i) => (
        <motion.div
          key={i}
          className="absolute text-2xl opacity-10 select-none"
          style={{ left: `${10 + i * 18}%`, top: `${20 + (i % 2) * 50}%` }}
          animate={{ y: [0, -10, 0] }}
          transition={{ duration: 2 + i * 0.3, repeat: Infinity, delay: i * 0.2 }}
        >
          {emoji}
        </motion.div>
      ))}

      <motion.div
        className="text-7xl md:text-9xl"
        animate={{ rotate: [0, -10, 10, 0], y: [0, -10, 0] }}
        transition={{ duration: 1.5, repeat: 1 }}
      >
        ☕
      </motion.div>

      {/* Steam lines */}
      {[0, 1, 2].map((i) => (
        <motion.div
          key={i}
          className="absolute w-1 h-8 bg-sunflower/20 rounded-full"
          style={{ top: "30%", left: `${46 + i * 4}%` }}
          animate={{ y: [-20, -60], opacity: [0.6, 0], scaleX: [1, 1.5] }}
          transition={{ duration: 1.5, repeat: Infinity, delay: i * 0.3 }}
        />
      ))}

      <motion.p
        className="mt-8 font-display text-2xl text-foreground"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.5 }}
      >
        Brewing something special...
      </motion.p>
    </motion.div>
  );
}
