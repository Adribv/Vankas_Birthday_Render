import { useState, useEffect, useCallback } from "react";
import { motion } from "framer-motion";
import { Howl } from "howler";

let soundInstance: Howl | null = null;

export default function MusicToggle() {
  const [playing, setPlaying] = useState(true);

  const createSound = useCallback(() => {
    if (soundInstance) {
      soundInstance.unload();
    }
    soundInstance = new Howl({
      src: ['/a.mp3'],
      loop: true,
      volume: 0.15,
      html5: true,
      preload: true
    });
    soundInstance.play();
    setPlaying(true);
    return soundInstance;
  }, []);

  useEffect(() => {
    const timeout = setTimeout(() => {
      createSound();
    }, 300); // Post-password delay

    return () => {
      clearTimeout(timeout);
    };
  }, [createSound]);

  const toggle = useCallback(() => {
    if (soundInstance) {
      soundInstance.play();
      setPlaying(!playing);
    }
  }, [playing]);

  return (
    <motion.button
      onClick={toggle}
      className="fixed top-4 right-4 z-[100] w-10 h-10 rounded-full glass-strong flex items-center justify-center text-lg shadow-lg hover:scale-110 active:scale-90 transition-all"
      whileHover={{ scale: 1.1 }}
      whileTap={{ scale: 0.9 }}
      aria-label="Toggle music"
    >
🎵
    </motion.button>
  );
}

// Global volume setter for other components
(window as any).setMusicVolume = (vol: number) => {
  if (soundInstance) {
    soundInstance.volume(vol);
  }
};

