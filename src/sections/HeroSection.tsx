import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import Windmill from "@/components/Windmill";

const fullMessage = "Happy Birthday to the Sweetest One 💛🌻";

export default function HeroSection() {
  const [text, setText] = useState("");
  const [showVideo, setShowVideo] = useState(false);

  useEffect(() => {
    let i = 0;
    const interval = setInterval(() => {
      setText(fullMessage.slice(0, i + 1));
      i++;
      if (i >= fullMessage.length) {
        clearInterval(interval);
        setTimeout(() => setShowVideo(true), 800);
      }
    }, 60);
    return () => clearInterval(interval);
  }, []);

  return (
    <section className="relative min-h-screen flex flex-col items-center justify-center px-6 overflow-hidden">
      {/* Background ambient elements */}
      <div className="absolute inset-0 pointer-events-none">
        {/* Floating sunflowers */}
        {[...Array(5)].map((_, i) => (
          <motion.div
            key={`sf-${i}`}
            className="absolute text-2xl md:text-3xl opacity-15 select-none"
            style={{ left: `${10 + i * 20}%`, top: `${15 + (i % 3) * 25}%` }}
            animate={{ y: [0, -20, 0], rotate: [-5, 5, -5], scale: [1, 1.1, 1] }}
            transition={{ duration: 5 + i, repeat: Infinity, delay: i * 0.8, ease: "easeInOut" }}
          >
            🌻
          </motion.div>
        ))}

        {/* Windmill top-right */}
        <div className="absolute top-12 right-6 md:right-14 opacity-20">
          <Windmill size={100} duration={15} />
        </div>

        {/* Working girl briefcase */}
        <motion.div
          className="absolute bottom-32 left-8 md:left-16 text-3xl md:text-4xl opacity-15 select-none"
          animate={{ rotate: [-3, 3, -3] }}
          transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
        >
          💼
        </motion.div>

        {/* Floating snack/food elements */}
        {["🍫", "☕", "🍉", "🌯", "🍟", "🍜"].map((emoji, i) => (
          <motion.div
            key={`food-${i}`}
            className="absolute text-lg md:text-xl opacity-10 select-none"
            style={{ right: `${5 + i * 12}%`, top: `${55 + (i % 3) * 12}%` }}
            animate={{ y: [0, -15, 0], x: [0, 5, 0] }}
            transition={{ duration: 4 + i * 0.5, repeat: Infinity, delay: i * 0.6, ease: "easeInOut" }}
          >
            {emoji}
          </motion.div>
        ))}

        {/* Steam particles */}
        {[...Array(6)].map((_, i) => (
          <div
            key={`steam-${i}`}
            className="absolute w-2 h-2 rounded-full bg-sunflower/10 animate-steam"
            style={{ left: `${25 + i * 10}%`, top: `${65 + (i % 3) * 8}%`, animationDelay: `${i * 0.5}s` }}
          />
        ))}
      </div>

      <motion.div
        className="relative z-10 text-center max-w-3xl"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1 }}
      >
        <motion.div
          className="text-6xl md:text-8xl mb-6"
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ type: "spring", duration: 1, delay: 0.2 }}
        >
          🎂
        </motion.div>

        <h1 className="font-display-mobile md:font-display text-xl sm:text-2xl md:text-5xl lg:text-6xl text-foreground leading-tight mb-8 min-h-[4rem]">
          {text}
          <motion.span
            className="inline-block w-0.5 h-8 bg-sunflower ml-1 align-middle"
            animate={{ opacity: [1, 0] }}
            transition={{ duration: 0.6, repeat: Infinity }}
          />
        </h1>

        <motion.p
          className="font-body text-muted-foreground text-lg md:text-xl"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 3 }}
        >
          Scroll down nu maaa 🌻
        </motion.p>
      </motion.div>

      {showVideo && (
        <motion.div
className="relative z-10 mt-12 w-80 md:w-96 lg:w-[28rem] h-60 md:h-72 lg:h-80 mx-auto rounded-2xl overflow-hidden glass shadow-xl flex-shrink-0"
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1, ease: "easeOut" }}
        >
          <video className="w-full h-full object-contain" controls muted poster="/favicon.ico">
            <source src="/v1.mp4" type="video/mp4" />
          </video>
        </motion.div>
      )}

      {/* Scroll indicator */}
      <motion.div
        className="absolute bottom-8 z-10"
        animate={{ y: [0, 12, 0] }}
        transition={{ duration: 2, repeat: Infinity }}
      >
        <div className="w-6 h-10 border-2 border-sunflower/40 rounded-full flex justify-center pt-2">
          <div className="w-1.5 h-3 bg-sunflower/60 rounded-full" />
        </div>
      </motion.div>
    </section>
  );
}
