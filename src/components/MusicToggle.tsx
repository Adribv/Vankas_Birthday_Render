import { useState, useEffect, useCallback } from "react";
import { motion } from "framer-motion";
import { Howl } from "howler";

let soundInstance: Howl | null = null;

declare global {
  interface Window {
    setMusicVolume: (vol: number) => void;
  }
}

export default function MusicToggle() {
  const [playing, setPlaying] = useState(true);

  const createSound = useCallback(() => {
    if (soundInstance) {
      soundInstance.unload();
    }
    soundInstance = new Howl({
      src: ['/a.mp3'],
      loop: true,
      volume: 0.3,
      html5: true,
      preload: true,
      xhrWithCredentials: false
    });
    soundInstance.play();
    setPlaying(true);
    return soundInstance;
  }, []);

  useEffect(() => {
    const timeout = setTimeout(() => {
      createSound();
    }, 200); // Post-password delay

    return () => {
      clearTimeout(timeout);
    };
  }, [createSound]);

  // Pause/resume music when video plays/pauses - Multiple videos support
  useEffect(() => {
    const pauseMusic = () => {
      if (soundInstance) soundInstance.pause();
    };

    const resumeMusic = () => {
      if (soundInstance) soundInstance.play();
    };

    const handleVideoPlay = (e: Event) => {
      const video = e.target as HTMLVideoElement;
      if (video && soundInstance) {
        soundInstance.pause();
      }
    };

    const handleVideoPauseEnd = (e: Event) => {
      const video = e.target as HTMLVideoElement;
      if (video && soundInstance && playing) {
        soundInstance.play();
      }
    };

    document.addEventListener('play', handleVideoPlay, true);
    document.addEventListener('pause', handleVideoPauseEnd, true);
    document.addEventListener('ended', handleVideoPauseEnd, true);

    return () => {
      document.removeEventListener('play', handleVideoPlay, true);
      document.removeEventListener('pause', handleVideoPauseEnd, true);
      document.removeEventListener('ended', handleVideoPauseEnd, true);
    };
  }, [playing]);

const toggle = useCallback(() => {
    if (soundInstance) {
      if (playing) {
        soundInstance.pause();
      } else {
        soundInstance.play();
      }
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
window.setMusicVolume = (vol: number) => {
  if (soundInstance) {
    soundInstance.volume(vol);
  }
};

