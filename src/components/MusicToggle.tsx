import { motion } from "framer-motion";
import { useMusicVolume } from "@/hooks/useMusicVolume";

export default function MusicToggle() {
  const { toggleMusic } = useMusicVolume();

  return (
    <motion.button
      onClick={toggleMusic}
      className="fixed top-4 right-4 z-[100] w-10 h-10 rounded-full glass-strong flex items-center justify-center text-lg shadow-lg hover:scale-110 active:scale-90 transition-all"
      whileHover={{ scale: 1.1 }}
      whileTap={{ scale: 0.9 }}
      aria-label="Toggle music"
    >
      🎵
    </motion.button>
  );
}

// Keep global for backward compatibility
declare global {
  interface Window {
    setMusicVolume: (vol: number) => void;
  }
}

