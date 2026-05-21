import { useState, useEffect, lazy, Suspense } from 'react';
import { AnimatePresence, motion } from 'motion/react';
import Lenis from 'lenis';
import Landing from './components/Landing';
import AudioPlayer from './components/AudioPlayer';
import FloatingParticles from './components/FloatingParticles';

const Envelope = lazy(() => import('./components/Envelope'));
const Scrapbook = lazy(() => import('./components/Scrapbook'));

export type Stage = 'landing' | 'envelope' | 'scrapbook';

export default function App() {
  const [stage, setStage] = useState<Stage>('envelope');
  const [userInteracted, setUserInteracted] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);

  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.5,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      orientation: 'vertical',
      gestureOrientation: 'vertical',
      smoothWheel: true,
      touchMultiplier: 2,
    });

    function raf(time: number) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }
    
    requestAnimationFrame(raf);

    return () => {
      lenis.destroy();
    };
  }, []);

  return (
    <div className="relative min-h-screen bg-burgundy-dark font-serif text-ink selection:bg-rose/30 overflow-x-hidden">
      <div className="fixed inset-0 bg-texture mix-blend-normal pointer-events-none z-0" />
      <FloatingParticles />
      <AudioPlayer 
        stage={stage} 
        userInteracted={userInteracted} 
        setUserInteracted={setUserInteracted}
        isPlaying={isPlaying}
        setIsPlaying={setIsPlaying}
      />
      <AnimatePresence mode="wait">
        {stage === 'envelope' && (
          <motion.div 
            key="envelope"
            initial={{ opacity: 0, scale: 1.05 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 1.1, filter: 'blur(10px)' }}
            transition={{ duration: 1.5, ease: [0.16, 1, 0.3, 1] }}
            className="w-full h-full"
          >
            <Suspense fallback={null}>
              <Envelope 
                onNext={() => setStage('landing')} 
                onFirstTap={() => {
                  setUserInteracted(true);
                  setIsPlaying(true);
                }}
              />
            </Suspense>
          </motion.div>
        )}
        {stage === 'landing' && (
          <motion.div 
            key="landing"
            initial={{ opacity: 0, scale: 0.9, filter: 'blur(12px)' }}
            animate={{ opacity: 1, scale: 1, filter: 'blur(0px)' }}
            exit={{ opacity: 0, scale: 1.05, filter: 'blur(15px)' }}
            transition={{ duration: 1.8, ease: [0.16, 1, 0.3, 1] }}
            className="w-full h-full"
          >
            <Landing onNext={() => setStage('scrapbook')} />
          </motion.div>
        )}
        {stage === 'scrapbook' && (
          <motion.div 
            key="scrapbook"
            initial={{ opacity: 0, y: 100 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
            className="w-full h-full"
          >
            <Suspense fallback={null}>
              <Scrapbook />
            </Suspense>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

