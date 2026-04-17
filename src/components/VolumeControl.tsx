import { AnimatePresence, motion } from 'framer-motion';
import { Volume2, Volume1, VolumeX } from 'lucide-react';
import { useMusicVolume } from '@/hooks/useMusicVolume';

export default function VolumeControl() {
  const { volume, setMusicVolume, isLoaded } = useMusicVolume();

  const [showSlider, setShowSlider] = useState(false);

  return (
    <div className="fixed top-4 right-4 sm:top-6 z-[100] flex flex-col items-end gap-1 bg-card/95 backdrop-blur-md rounded-lg p-2.5 shadow-xl border border-border/50 sm:flex-row">
      <motion.button
        className="p-1.5 rounded-md hover:bg-accent transition-colors"
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        onClick={() => setShowSlider(!showSlider)}
        title="Volume"
      >
        {volume > 0.5 ? <Volume2 className="w-4 h-4" /> : volume > 0 ? <Volume1 className="w-4 h-4" /> : <VolumeX className="w-4 h-4" />}
      </motion.button>

      <AnimatePresence>
        {showSlider && (
          <motion.div
            className="flex items-center gap-1"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.8 }}
          >
            <input
              type="range"
              min="0"
              max="1"
              step="0.01"
              value={volume}
              onChange={(e) => setMusicVolume(Number(e.target.value))}
              className="w-20 h-1.5 bg-muted rounded-full appearance-none cursor-pointer accent-sunflower hover:accent-sunflower/80 [&::-webkit-slider-thumb]:w-4 [&::-webkit-slider-thumb]:h-4 [&::-webkit-slider-thumb]:bg-sunflower [&::-webkit-slider-thumb]:rounded-full"
            />
            <span className="text-xs font-mono text-muted-foreground">{Math.round(volume * 100)}%</span>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

