import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { PASSWORD } from "@/data/memories";
import Windmill from "@/components/Windmill";
import Confetti from "@/components/Confetti";

interface Props {
  onUnlock: () => void;
}

export default function PasswordScreen({ onUnlock }: Props) {
  const [value, setValue] = useState("");
  const [error, setError] = useState("");
  const [exiting, setExiting] = useState(false);
  const [confettiTrigger, setConfettiTrigger] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (value === PASSWORD) {
      setConfettiTrigger(true);
      setExiting(true);
      setTimeout(onUnlock, 1200);
    } else {
      setError("Oops! That's not quite right 🌻 Try again!");
      setTimeout(() => setError(""), 2500);
    }
  };

  return (
    <div>
      <Confetti trigger={confettiTrigger} />
      <AnimatePresence>
      {!exiting ? (
        <motion.div
          className="fixed inset-0 z-50 flex items-center justify-center overflow-hidden"
          style={{ background: "linear-gradient(135deg, hsl(82 40% 10%), hsl(82 35% 15%), hsl(82 30% 12%))" }}
          exit={{ opacity: 0, scale: 1.2, filter: "blur(20px)" }}
          transition={{ duration: 1.2, ease: "easeInOut" }}
        >
          {/* Animated sunflowers */}
          {[...Array(6)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute text-5xl md:text-7xl select-none"
              style={{ left: `${10 + i * 16}%`, bottom: `${5 + (i % 3) * 8}%` }}
              animate={{ rotate: [-8, 4, -4, -8], scale: [1, 1.05, 0.98, 1] }}
              transition={{ duration: 4, repeat: Infinity, delay: i * 0.4, ease: "easeInOut" }}
            >
              🌻
            </motion.div>
          ))}

          {/* Windmill */}
          <div className="absolute top-6 right-6 md:top-12 md:right-16 opacity-25">
            <Windmill size={120} duration={15} />
          </div>

          {/* Second windmill */}
          <div className="absolute bottom-16 left-6 opacity-15">
            <Windmill size={80} duration={20} />
          </div>

          {/* Floating snack elements */}
          {["🍫", "☕", "🍉", "🌯", "🍟", "🍜"].map((emoji, i) => (
            <motion.div
              key={`snack-${i}`}
              className="absolute text-2xl md:text-3xl opacity-10 select-none"
              style={{ left: `${5 + i * 16}%`, top: `${15 + (i % 3) * 25}%` }}
              animate={{ y: [0, -12, 0], rotate: [-5, 5, -5] }}
              transition={{ duration: 3 + i * 0.5, repeat: Infinity, delay: i * 0.3, ease: "easeInOut" }}
            >
              {emoji}
            </motion.div>
          ))}

          {/* Working girl element */}
          <motion.div
            className="absolute top-10 left-10 text-4xl md:text-5xl opacity-15 select-none"
            animate={{ rotate: [-3, 3, -3] }}
            transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
          >
            💼
          </motion.div>

          {/* Login card */}
          <motion.form
            onSubmit={handleSubmit}
            className="relative z-10 glass-strong rounded-2xl p-8 md:p-12 max-w-md w-[90%] text-center"
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
          >
            <motion.div
              className="text-5xl mb-4"
              animate={{ scale: [1, 1.1, 1] }}
              transition={{ duration: 2, repeat: Infinity }}
            >
              💌
            </motion.div>
            <h1 className="font-display text-2xl md:text-3xl text-foreground mb-2 drop-shadow">
              Enter your secret key
            </h1>
            <p className="text-muted-foreground font-body text-sm mb-6">
              A little password to unlock something special...
            </p>

            <input
              type="password"
              value={value}
              onChange={(e) => setValue(e.target.value)}
              placeholder="Type the magic word..."
              className="w-full px-5 py-3 rounded-xl bg-muted text-foreground placeholder:text-muted-foreground font-body text-center text-lg focus:outline-none focus:ring-2 focus:ring-sunflower transition-all"
            />

            <motion.button
              type="submit"
              className="mt-4 w-full py-3 rounded-xl font-body font-semibold text-secondary-foreground transition-all"
              style={{ background: "var(--gradient-sunflower)" }}
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
            >
              Unlock 🌻
            </motion.button>

            <AnimatePresence>
              {error && (
                <motion.p
                  className="mt-3 text-sunflower-light font-body text-sm"
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0 }}
                >
                  {error}
                </motion.p>
              )}
            </AnimatePresence>
          </motion.form>
        </motion.div>
      ) : (
        <motion.div
          className="fixed inset-0 z-50"
          style={{ background: "linear-gradient(135deg, hsl(82 40% 10%), hsl(82 35% 15%), hsl(82 30% 12%))" }}
          animate={{ opacity: 0, scale: 1.3, filter: "blur(30px)" }}
          transition={{ duration: 1.2, ease: "easeInOut" }}
        />
      )}
        </AnimatePresence>
    </div>
  );
}
