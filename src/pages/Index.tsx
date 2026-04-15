import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import LoaderScreen from "@/sections/LoaderScreen";
import PasswordScreen from "@/sections/PasswordScreen";
import HeroSection from "@/sections/HeroSection";
import MemoryTimeline from "@/sections/MemoryTimeline";
import AboutHer from "@/sections/AboutHer";
import SunflowerGarden from "@/sections/SunflowerGarden";
import FinalMessage from "@/sections/FinalMessage";
import FloatingParticles from "@/components/FloatingParticles";
import ScrollProgress from "@/components/ScrollProgress";
import MusicToggle from "@/components/MusicToggle";

const Index = () => {
  const [loading, setLoading] = useState(true);
  const [locked, setLocked] = useState(true);

  return (
    <div className="min-h-screen bg-background">
      <AnimatePresence>
        {loading && <LoaderScreen onDone={() => setLoading(false)} />}
      </AnimatePresence>

      <AnimatePresence>
        {!loading && locked && <PasswordScreen onUnlock={() => setLocked(false)} />}
      </AnimatePresence>

      {!locked && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1 }}
        >
          <ScrollProgress />
          <FloatingParticles />
          <MusicToggle />

          <HeroSection />

          <div className="relative">
            <div className="absolute inset-0 bg-gradient-to-b from-background via-card/30 to-background pointer-events-none" />
            <MemoryTimeline />
          </div>

          <AboutHer />

          <SunflowerGarden />

          <FinalMessage />
        </motion.div>
      )}
    </div>
  );
};

export default Index;
