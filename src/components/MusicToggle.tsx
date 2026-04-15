import { useState, useRef, useEffect } from "react";
import { motion } from "framer-motion";

export default function MusicToggle() {
  const [playing, setPlaying] = useState(true);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  useEffect(() => {
  audioRef.current = new Audio("/a.mp3");
    (window as any).musicAudio = audioRef.current; // Share for volume control
    audioRef.current.loop = true;
    audioRef.current.volume = 0.15;
    audioRef.current.play().catch(e => console.log('Autoplay failed:', e));
    return () => { audioRef.current?.pause(); };
  }, []);

  const toggle = () => {
    if (!audioRef.current) return;
    if (playing) { 
      audioRef.current.pause(); 
    } else { 
      audioRef.current.volume = 0.15; // Low volume
      audioRef.current.play().catch(() => {}); 
    }
    setPlaying(!playing);
  };

  return (
    <motion.button
      onClick={toggle}
className="fixed top-20 right-4 z-50 w-10 h-10 rounded-full glass-strong flex items-center justify-center text-lg shadow-lg"
      whileHover={{ scale: 1.1 }}
      whileTap={{ scale: 0.9 }}
      aria-label="Toggle music"
    >
      {playing ? "🎵" : "🔇"}
    </motion.button>
  );
}
