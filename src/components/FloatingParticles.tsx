import { motion } from "framer-motion";

const particles = Array.from({ length: 20 }, (_, i) => ({
  id: i,
  x: Math.random() * 100,
  y: Math.random() * 100,
  size: Math.random() * 4 + 2,
  duration: Math.random() * 8 + 6,
  delay: Math.random() * 5,
  type: i % 5,
}));

const snackEmojis = ["🍫", "☕", "🍉", "🌯", "🍟", "🍜", "🌻"];
const snackParticles = Array.from({ length: 7 }, (_, i) => ({
  id: i,
  x: Math.random() * 90 + 5,
  y: Math.random() * 90 + 5,
  duration: Math.random() * 10 + 8,
  delay: Math.random() * 6,
  emoji: snackEmojis[i % snackEmojis.length],
}));

export default function FloatingParticles() {
  return (
    <div className="fixed inset-0 pointer-events-none z-10 overflow-hidden">
      {particles.map((p) => (
        <motion.div
          key={p.id}
          className={`absolute rounded-full ${
            p.type === 0 ? "bg-sunflower/15" :
            p.type === 1 ? "bg-olive-light/15" :
            p.type === 2 ? "bg-sunflower-dark/10" :
            p.type === 3 ? "bg-coffee/10" :
            "bg-coffee-light/10"
          }`}
          style={{ left: `${p.x}%`, top: `${p.y}%`, width: p.size, height: p.size }}
          animate={{
            y: [0, -60, 0],
            x: [0, Math.random() * 30 - 15, 0],
            opacity: [0.15, 0.4, 0.15],
          }}
          transition={{ duration: p.duration, repeat: Infinity, delay: p.delay, ease: "easeInOut" }}
        />
      ))}

      {/* Floating emoji snack particles */}
      {snackParticles.map((p) => (
        <motion.div
          key={`snack-${p.id}`}
          className="absolute text-sm opacity-[0.06] select-none"
          style={{ left: `${p.x}%`, top: `${p.y}%` }}
          animate={{
            y: [0, -40, 0],
            x: [0, 10, 0],
            opacity: [0.04, 0.08, 0.04],
          }}
          transition={{ duration: p.duration, repeat: Infinity, delay: p.delay, ease: "easeInOut" }}
        >
          {p.emoji}
        </motion.div>
      ))}
    </div>
  );
}
