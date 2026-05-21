import { motion, AnimatePresence } from 'motion/react';
import { useState, useEffect } from 'react';
import { X, Heart } from 'lucide-react';

export default function HiddenMessage() {
  const [isOpen, setIsOpen] = useState(false);
  const [currentBg, setCurrentBg] = useState(1);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsOpen(true);
    }, 12000); // Popup after 12 seconds
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    if (!isOpen) return;
    
    const interval = setInterval(() => {
      setCurrentBg(prev => prev === 6 ? 1 : prev + 1);
    }, 4000); // Change image every 4 seconds
    
    return () => clearInterval(interval);
  }, [isOpen]);

  return (
    <>
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 20, duration: 2 }} // Fade in trigger hint way later
        className="fixed bottom-4 left-4 z-50 transition-transform hover:scale-110"
      >
        <div 
          className="w-12 h-12 rounded-full cursor-pointer bg-white/10 backdrop-blur-md shadow-lg border border-white/20 flex items-center justify-center animate-pulse"
          onClick={() => setIsOpen(true)}
        >
          <Heart className="w-5 h-5 text-burgundy" fill="currentColor" />
        </div>
      </motion.div>

      <AnimatePresence>
        {isOpen && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center px-4">
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.5 }}
              className="absolute inset-0 bg-ink/70 backdrop-blur-md"
              onClick={() => setIsOpen(false)}
            />
            <motion.div 
              initial={{ scale: 0.95, opacity: 0, y: 30, rotateX: 10 }}
              animate={{ scale: 1, opacity: 1, y: 0, rotateX: 0 }}
              exit={{ scale: 0.95, opacity: 0, y: 30, rotateX: 10 }}
              transition={{ duration: 0.8, type: "spring", bounce: 0.3 }}
              className="relative w-full max-w-lg bg-paper p-8 md:p-12 shadow-2xl overflow-hidden border-t-8 border-burgundy z-10 rounded-sm"
              style={{ perspective: "1000px" }}
            >
              {/* Background image for hidden message */}
              <div className="absolute inset-0 z-0 bg-paper">
                <AnimatePresence mode="popLayout">
                  <motion.img 
                    key={currentBg}
                    initial={{ opacity: 0, scale: 1.1 }}
                    animate={{ opacity: 0.15, scale: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 1.5, ease: "easeInOut" }}
                    src={`/hidden/hidden_bg${currentBg}.jpg`} 
                    alt="Hidden Background" 
                    loading="lazy"
                    decoding="async"
                    className="w-full h-full object-cover absolute inset-0" 
                  />
                </AnimatePresence>
              </div>

              <motion.button 
                whileHover={{ scale: 1.1, rotate: 90 }}
                whileTap={{ scale: 0.9 }}
                onClick={() => setIsOpen(false)}
                className="absolute top-4 right-4 text-ink/60 hover:text-burgundy transition-colors z-20 bg-white/80 backdrop-blur-md rounded-full p-2 shadow-sm border border-black/5"
              >
                <X size={20} />
              </motion.button>

              <motion.div 
                animate={{ rotate: [0, 5, -5, 0], scale: [1, 1.05, 1] }}
                transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                className="absolute top-0 right-0 p-8 text-burgundy/5 text-[120px] font-bold leading-none select-none pointer-events-none -mt-4 z-10"
              >
                💌
              </motion.div>

              <div className="relative z-10 space-y-8 text-ink/80 font-serif leading-relaxed italic text-lg text-center mt-4">
                <motion.p 
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3, duration: 1 }}
                  className="font-sans text-xs uppercase tracking-[0.3em] font-bold text-burgundy not-italic mb-8"
                >
                  If there is one thing worth saying today:
                </motion.p>

                <motion.p
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 1, duration: 1 }}
                  className="text-xl md:text-2xl font-bold italic text-ink"
                >
                  you do not need to become anyone other than yourself to be someone truly important.
                </motion.p>
                
                <div className="space-y-2 mt-8 opacity-90 text-base md:text-lg">
                  <motion.p 
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 2, duration: 1 }}
                  >
                    thank you for existing.
                  </motion.p>
                  <motion.p 
                    initial={{ opacity: 0, x: 10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 2.8, duration: 1 }}
                  >
                    thank you for growing this far.
                  </motion.p>
                  <motion.p 
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 3.6, duration: 1.5 }}
                  >
                    thank you for making the world a little gentler just by being in it.
                  </motion.p>
                </div>
              </div>
              
              {/* Small decorative corner tape */}
              <div className="absolute -top-3 -left-3 w-16 h-6 bg-white/40 backdrop-blur-md border border-white/20 shadow-sm -rotate-45 z-20" />
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </>
  );
}
