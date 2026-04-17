import { useState, useEffect, useCallback } from 'react';
import { Howl } from 'howler';

let soundInstance: Howl | null = null;

export const useMusicVolume = (defaultVolume: number = 0.3) => {
  const [volume, setVolume] = useState(defaultVolume);
  const [isLoaded, setIsLoaded] = useState(false);

  const setMusicVolume = useCallback((vol: number) => {
    setVolume(vol);
    if (soundInstance) {
      soundInstance.volume(vol);
    }
  }, []);

  const loadMusic = useCallback((src: string) => {
    if (soundInstance) {
      soundInstance.unload();
    }
    soundInstance = new Howl({
      src: [src],
      loop: true,
      volume,
      html5: true,
      preload: true,
      xhrWithCredentials: false,
      onload: () => setIsLoaded(true),
      onplayerror: () => console.log('Music play error'),
      onpauseerror: () => console.log('Music pause error')
    });
  }, [volume]);

  const playMusic = useCallback(() => {
    if (soundInstance) {
      soundInstance.play();
    }
  }, []);

  const pauseMusic = useCallback(() => {
    if (soundInstance) {
      soundInstance.pause();
    }
  }, []);

  const toggleMusic = useCallback(() => {
    if (soundInstance) {
      if (soundInstance.playing()) {
        pauseMusic();
      } else {
        playMusic();
      }
    }
  }, [playMusic, pauseMusic]);

  useEffect(() => {
    if (isLoaded && soundInstance) {
      soundInstance.volume(volume);
    }
  }, [volume, isLoaded]);

  return {
    volume,
    setMusicVolume,
    loadMusic,
    playMusic,
    pauseMusic,
    toggleMusic,
    isLoaded
  };
};
