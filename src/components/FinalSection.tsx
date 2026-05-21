import { motion, useInView } from 'motion/react';
import { useEffect, useRef } from 'react';
import confetti from 'canvas-confetti';
import { CakeSlice, Flower2 } from 'lucide-react';

export default function FinalSection() {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  useEffect(() => {
    if (isInView) {
      const end = Date.now() + 5 * 1000;
      const colors = ['#4A0E17', '#C98686', '#8B6D5A', '#fcfaf8'];

      (function frame() {
        confetti({
          particleCount: 5,
          angle: 60,
          spread: 80,
          origin: { x: 0, y: 0.8 },
          colors: colors,
          shapes: ['circle']
        });
        confetti({
          particleCount: 5,
          angle: 120,
          spread: 80,
          origin: { x: 1, y: 0.8 },
          colors: colors,
          shapes: ['circle']
        });

        if (Date.now() < end) {
          requestAnimationFrame(frame);
        }
      }());
    }
  }, [isInView]);

  return (
    <motion.section 
      ref={ref}
      initial={{ opacity: 0, y: 50, filter: 'blur(10px)' }}
      animate={isInView ? { opacity: 1, y: 0, filter: 'blur(0px)' } : { opacity: 0 }}
      transition={{ duration: 2, ease: [0.16, 1, 0.3, 1] }}
      className="relative min-h-[60vh] flex flex-col items-center justify-center text-center mt-32 mb-20 bg-burgundy text-paper overflow-hidden shadow-2xl p-8"
    >
      <motion.div 
        animate={{ y: [0, -10, 0], rotate: [-2, 2, -2] }}
        transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
        className="absolute top-8 left-8 opacity-10 text-6xl select-none pointer-events-none"
      >
        🕊️
      </motion.div>
      <motion.div 
        animate={{ y: [0, 10, 0], scale: [1, 1.1, 1] }}
        transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
        className="absolute bottom-8 right-8 opacity-10 text-6xl select-none pointer-events-none"
      >
        ✨
      </motion.div>

      <motion.p 
        initial={{ opacity: 0, letterSpacing: '0.1em' }}
        animate={isInView ? { opacity: 0.8, letterSpacing: '0.3em' } : { opacity: 0 }}
        transition={{ duration: 1.5, delay: 0.2 }}
        className="font-sans text-[10px] uppercase mb-6 z-10 relative"
      >
        Words of Affirmation
      </motion.p>

      <motion.div
         initial={{ opacity: 0, scale: 0.9, rotate: 2, y: 30 }}
         whileInView={{ opacity: 1, scale: 1, rotate: -2, y: 0 }}
         whileHover={{ scale: 1.02, rotate: 0 }}
         viewport={{ once: true }}
         transition={{ delay: 0.5, duration: 1.5, ease: [0.16, 1, 0.3, 1] }}
         className="relative p-3 md:p-4 pb-12 md:pb-16 bg-[#fcfaf8] shadow-[0_30px_60px_rgba(0,0,0,0.4)] border border-[#e5e5e5] mb-12 flex-shrink-0 z-10 transition-all duration-700"
         style={{ width: "320px", maxWidth: "90vw" }}
      >
        <div className="absolute top-[-15px] left-1/2 -translate-x-1/2 w-24 h-10 bg-white/30 backdrop-blur-sm border border-white/20 shadow-sm -rotate-2 z-10" />
        <div className="w-full relative aspect-[4/5] overflow-hidden bg-gray-200">
          <img 
            src="/images/dehan4.jpg" 
            alt="Final Memory"
            loading="lazy"
            decoding="async"
            className="w-full h-full object-cover object-center transition-transform duration-[3s] hover:scale-110"
             referrerPolicy="no-referrer"
          />
        </div>
      </motion.div>

      <motion.p 
        initial={{ y: 30, opacity: 0, scale: 0.95 }}
        animate={isInView ? { y: 0, opacity: 1, scale: 1 } : { opacity: 0 }}
        transition={{ delay: 1, duration: 1.5, ease: "easeOut" }}
        className="relative z-10 font-display text-4xl md:text-5xl lg:text-7xl mb-6 leading-tight font-bold italic drop-shadow-sm text-[#fdfbf7]"
      >
        Happy Birthday, Dehan.
      </motion.p>
      
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0 }}
        transition={{ delay: 1.2, duration: 1.5 }}
        className="flex items-center justify-center gap-4 mb-16 text-rose text-opacity-80"
      >
        <motion.div animate={{ rotate: 360 }} transition={{ duration: 10, repeat: Infinity, ease: "linear" }}>
          <Flower2 className="w-8 h-8" />
        </motion.div>
        <div className="relative">
          <CakeSlice className="w-12 h-12" />
          <motion.div 
            animate={{ opacity: [0.5, 1, 0.5] }}
            transition={{ duration: 2, repeat: Infinity }}
            className="absolute -top-6 left-1/2 -translate-x-1/2 font-display text-2xl text-[#fcfaf8] font-bold drop-shadow-[0_0_10px_#fff]"
          >
            23
          </motion.div>
        </div>
        <motion.div animate={{ rotate: -360 }} transition={{ duration: 10, repeat: Infinity, ease: "linear" }}>
          <Flower2 className="w-8 h-8" />
        </motion.div>
      </motion.div>

      <div className="font-serif text-lg md:text-xl text-paper/80 max-w-2xl leading-relaxed space-y-4">
        <motion.span 
          initial={{ opacity: 0, x: -20 }}
          animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0 }}
          transition={{ delay: 1.5, duration: 1 }}
          className="block"
        >
          may this year bring you many beautiful things:
        </motion.span>
        <motion.span 
          initial={{ opacity: 0, scaleX: 0 }}
          animate={isInView ? { opacity: 0.8, scaleX: 1 } : { opacity: 0 }}
          transition={{ delay: 2, duration: 1.5, ease: "easeInOut" }}
          className="block font-sans text-sm italic py-4 border-y border-paper/10 mx-auto w-max px-8 origin-center"
        >
          <motion.span initial={{ opacity: 0 }} animate={isInView ? { opacity: 1 } : { opacity: 0 }} transition={{ delay: 2.5 }}>new books</motion.span> • <motion.span initial={{ opacity: 0 }} animate={isInView ? { opacity: 1 } : { opacity: 0 }} transition={{ delay: 2.7 }}>new languages</motion.span> • <motion.span initial={{ opacity: 0 }} animate={isInView ? { opacity: 1 } : { opacity: 0 }} transition={{ delay: 2.9 }}>new songs</motion.span> • <motion.span initial={{ opacity: 0 }} animate={isInView ? { opacity: 1 } : { opacity: 0 }} transition={{ delay: 3.1 }}>new places</motion.span> • <motion.span initial={{ opacity: 0 }} animate={isInView ? { opacity: 1 } : { opacity: 0 }} transition={{ delay: 3.3 }}>and new reasons to smile</motion.span>
        </motion.span>
        <motion.span 
          initial={{ opacity: 0, x: 20 }}
          animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0 }}
          transition={{ delay: 3.8, duration: 1 }}
          className="block"
        >
          may all the little things you love continue finding ways to make you happy.
        </motion.span>
        <motion.span 
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0 }}
          transition={{ delay: 4.5, duration: 1.5 }}
          className="block"
        >
          and among all the days still waiting for you, may there always be some that feel as warm as home.
        </motion.span>
      </div>

      <motion.div 
        initial={{ opacity: 0, scale: 0.8 }}
        animate={isInView ? { opacity: 1, scale: 1 } : { opacity: 0 }}
        transition={{ delay: 5.5, duration: 2, type: "spring" }}
        className="mt-16 flex items-center justify-center gap-4"
      >
        <motion.div whileHover={{ y: -5, rotate: -10 }} className="w-12 h-12 bg-paper text-ink rounded-sm shadow-sm flex items-center justify-center text-2xl cursor-pointer transition-shadow hover:shadow-lg">📖</motion.div>
        <motion.div whileHover={{ y: -5, scale: 1.1 }} className="w-12 h-12 bg-ink text-paper rounded-sm shadow-sm flex items-center justify-center text-2xl cursor-pointer transition-shadow hover:shadow-lg">🎬</motion.div>
        <motion.div whileHover={{ y: -5, rotate: 10 }} className="w-12 h-12 bg-transparent border border-paper/30 rounded-sm shadow-sm flex items-center justify-center text-2xl cursor-pointer transition-shadow hover:shadow-lg hover:border-paper/60">🍵</motion.div>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0 }}
        transition={{ delay: 7, duration: 2 }}
        className="mt-24 text-paper/40 font-serif text-sm italic space-y-1"
      >
        <p>Made with love,</p>
        <p>for the girl who looks beautiful in dark red,</p>
        <p>who chooses matcha over coffee,</p>
        <p>and who deserves all the gentle things in this world.</p>
      </motion.div>
    </motion.section>
  );
}
