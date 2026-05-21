import { motion } from 'motion/react';
import { Sparkles } from 'lucide-react';

export default function Landing({ onNext }: { onNext: () => void }) {
  return (
    <motion.div 
      initial={{ opacity: 0 }} 
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 1.5 }}
      className="relative flex flex-col items-center justify-center min-h-screen bg-transparent overflow-hidden"
    >
      {/* Background texture / overlay */}
      <div className="absolute inset-0 z-0 opacity-10 mix-blend-overlay pointer-events-none bg-[url('https://images.unsplash.com/photo-1579546929518-9e396f3cc809?auto=format&fit=crop&w=2000&q=80')] bg-cover bg-center" />

      {/* Floating petals placeholder - using simple CSS animations or framer motion */}
      {Array.from({ length: 15 }).map((_, i) => (
        <motion.div
          key={i}
          className="absolute w-3 h-4 rounded-full bg-rose/40 blur-[1px]"
          initial={{
            y: "110vh",
            x: Math.random() * window.innerWidth,
            rotate: Math.random() * 360,
          }}
          animate={{
            y: "-10vh",
            x: Math.random() * window.innerWidth,
            rotate: Math.random() * 360 + 180,
          }}
          transition={{
            duration: Math.random() * 10 + 15,
            repeat: Infinity,
            ease: "linear",
            delay: Math.random() * 5,
          }}
        />
      ))}

      <motion.div 
        className="relative z-10 flex flex-col items-center text-center text-paper px-6 mt-12"
        initial={{ y: 30, opacity: 0, filter: 'blur(5px)' }}
        animate={{ y: 0, opacity: 1, filter: 'blur(0px)' }}
        transition={{ delay: 0.3, duration: 1.5, ease: [0.16, 1, 0.3, 1] }}
      >
        <motion.div
           initial={{ opacity: 0, scale: 0.9, rotate: -3 }}
           animate={{ opacity: 1, scale: 1, rotate: 2 }}
           whileHover={{ scale: 1.05, rotate: 0, y: -5 }}
           transition={{ delay: 0.8, duration: 1.2, type: "spring", stiffness: 100, damping: 20 }}
           className="relative p-2 md:p-3 pb-8 md:pb-12 bg-[#fcfaf8] shadow-[0_15px_35px_rgba(0,0,0,0.2)] hover:shadow-[0_25px_50px_rgba(0,0,0,0.3)] transition-shadow duration-500 border border-[#e5e5e5] mb-12 flex-shrink-0 origin-bottom"
           style={{ width: "240px", maxWidth: "80vw" }}
        >
          <div className="absolute top-[-12px] left-1/2 -translate-x-1/2 w-20 h-8 bg-white/40 backdrop-blur-sm border border-white/20 shadow-sm rotate-1 z-10" />
          <div className="w-full relative aspect-[3/4] overflow-hidden bg-gray-200">
            <img 
              src="/images/dehan1.jpg" 
              alt="Close-up Portrait"
              decoding="async"
              fetchPriority="high"
              className="w-full h-full object-cover object-center"
              referrerPolicy="no-referrer"
            />
          </div>
          <div className="mt-6 mb-2">
            <motion.span 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1.5, duration: 1 }}
              className="font-hand text-xl md:text-2xl text-ink/80 opacity-90 leading-relaxed -rotate-2 inline-block"
            >
              "to the person who makes quiet moments feel beautiful."
            </motion.span>
          </div>
        </motion.div>

        <motion.span 
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.2, duration: 1.5, ease: [0.16, 1, 0.3, 1] }}
          className="block font-hand text-xl md:text-2xl text-rose mb-4 opacity-80 tracking-widest"
        >
          For someone who has a quiet way of making the world feel softer.
        </motion.span>
        <motion.h1 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.4, duration: 1.5, ease: [0.16, 1, 0.3, 1] }}
          className="font-display text-5xl md:text-7xl lg:text-8xl mb-12 tracking-tight drop-shadow-2xl font-medium"
        >
          Happy Birthday, <span className="italic font-serif">Dehan</span> ✨
        </motion.h1>
        
        <motion.button
          onClick={onNext}
          initial={{ opacity: 0, y: 20 }}
          animate={{ 
            opacity: 1, 
            y: 0,
            boxShadow: ['0 0 0px rgba(229,201,184,0)', '0 0 20px rgba(229,201,184,0.4)', '0 0 0px rgba(229,201,184,0)']
          }}
          transition={{ 
            delay: 1.8, 
            duration: 1.2, 
            ease: [0.16, 1, 0.3, 1],
            boxShadow: { duration: 2, repeat: Infinity, delay: 3 }
          }}
          whileHover={{ scale: 1.05, backgroundColor: 'rgba(252, 250, 248, 0.1)', boxShadow: '0 0 30px rgba(252, 250, 248, 0.4)' }}
          whileTap={{ scale: 0.95 }}
          className="group flex border border-rose/30 px-8 py-4 rounded-full items-center justify-center gap-3 backdrop-blur-sm transition-all duration-300 text-paper mx-auto uppercase text-xs tracking-[0.2em]"
        >
          <Sparkles className="w-4 h-4 opacity-70 group-hover:opacity-100 transition-opacity" />
          <span>Explore Memories 📖</span>
        </motion.button>
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 0.6 }}
          transition={{ delay: 2.2, duration: 1 }}
          className="mt-6 text-[10px] uppercase tracking-[0.25em] font-sans text-rose/80 flex items-center justify-center gap-2"
        >
          <span>swipe or click to continue the memories</span>
          <span className="animate-bounce">→</span>
        </motion.div>
      </motion.div>
    </motion.div>
  );
}
