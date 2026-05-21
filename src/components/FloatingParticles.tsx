import { motion } from 'motion/react';
import { useEffect, useState } from 'react';
import { Flower2, Heart, Sparkles } from 'lucide-react';

export default function FloatingParticles() {
  const [particles, setParticles] = useState<Array<{ id: number; type: string; x: number; delay: number; duration: number; size: number }>>([]);

  useEffect(() => {
    const types = ['petal', 'sparkle', 'dust', 'heart'];
    const newParticles = Array.from({ length: 30 }).map((_, i) => ({
      id: i,
      type: types[Math.floor(Math.random() * types.length)],
      x: Math.random() * 100, // percentage
      delay: Math.random() * 10,
      duration: Math.random() * 10 + 15, // long duration for slow fall
      size: Math.random() * 10 + 10,
    }));
    setParticles(newParticles);
  }, []);

  return (
    <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
      {particles.map((p) => (
        <motion.div
          key={p.id}
          initial={{ y: -50, x: `${p.x}vw`, opacity: 0, rotate: 0 }}
          animate={{
            y: ['-10vh', '110vh'],
            opacity: [0, 0.8, 0.8, 0],
            rotate: p.type === 'petal' ? [0, 360] : [0, 180],
            x: [`${p.x}vw`, `${p.x + (Math.random() * 10 - 5)}vw`], // slight sway
          }}
          transition={{
            duration: p.duration,
            repeat: Infinity,
            delay: p.delay,
            ease: 'linear',
          }}
          className="absolute"
        >
          {p.type === 'petal' && (
            <div className={`w-3 h-4 rounded-full ${Math.random() > 0.5 ? 'bg-burgundy/40' : 'bg-red-900/30'} blur-[1px] transform rotate-45`} />
          )}
          {p.type === 'heart' && (
            <Heart size={p.size} className="text-burgundy/20" fill="currentColor" />
          )}
          {p.type === 'sparkle' && (
            <Sparkles size={p.size} className="text-yellow-100/30" />
          )}
          {p.type === 'dust' && (
            <div className="w-1 h-1 rounded-full bg-white/40 blur-[1px]" />
          )}
        </motion.div>
      ))}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-yellow-100/5 via-transparent to-transparent pointer-events-none mix-blend-overlay" />
    </div>
  );
}
