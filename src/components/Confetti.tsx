import confetti from 'canvas-confetti';
import { useEffect } from 'react';

interface Props {
  trigger: boolean;
}

export default function Confetti({ trigger }: Props) {
  useEffect(() => {
    if (!trigger) return;

    const times = 15; // More bursts
    const defaults = { startVelocity: 35, ticks: 60 };

    const createBurst = (angle: number, originX: number, colors: string[]) => {
      confetti({
        ...defaults,
        particleCount: Math.random() * 8 + 4,
        angle,
        spread: 70,
        origin: { x: originX, y: Math.random() * 0.3 + 0.1 },
        colors,
        scalar: 1.1
      });
    };

    // Multiple left bursts
    for (let i = 0; i < times; i++) {
      setTimeout(() => createBurst(45 + Math.random() * 30, 0.1 + Math.random() * 0.2, ['#FFD700', '#FFA500', '#98FB98']), i * 50);
    }

    // Multiple right bursts
    for (let i = 0; i < times; i++) {
      setTimeout(() => createBurst(135 + Math.random() * -30, 0.8 + Math.random() * 0.2, ['#FF69B4', '#FFFF00', '#FF1493']), i * 50);
    }

    // Center fireworks
    for (let i = 0; i < 8; i++) {
      setTimeout(() => confetti({
        particleCount: 12,
        spread: 90,
        origin: { x: 0.5, y: 0.05 },
        colors: ['#FFD700', '#98FB98', '#FFA500']
      }), i * 100);
    }

    // Party poppers top-down
    for (let i = 0; i < 6; i++) {
      setTimeout(() => confetti({
        particleCount: 8,
        angle: 90,
        spread: 25,
        startVelocity: 55,
        origin: { x: 0.5, y: 0 },
        scalar: 1.4,
        colors: ['#FF69B4', '#FFFF00', '#FF4500']
      }), i * 150);
    }

    // Heart confetti
    for (let i = 0; i < 12; i++) {
      setTimeout(() => confetti({
        particleCount: 1,
        angle: Math.random() * 360,
        spread: 0,
        origin: { x: Math.random(), y: 0.2 },
        colors: ['#FF69B4']
      }), i * 80);
    }
  }, [trigger]);

  return null;
}
