import { motion, AnimatePresence } from 'motion/react';
import { useState } from 'react';
import confetti from 'canvas-confetti';
import { Heart, Sparkles } from 'lucide-react';

interface FlowerParticle {
  id: number;
  char: string;
  color: string;
  size: number;
  angle: number;
  distance: number;
  delay: number;
  duration: number;
  rotateEnd: number;
}

export default function Envelope({ onNext, onFirstTap }: { onNext: () => void; onFirstTap: () => void }) {
  const [isOpen, setIsOpen] = useState(false);
  const [isRevealed, setIsRevealed] = useState(false);
  const [bloomingFlowers, setBloomingFlowers] = useState<FlowerParticle[]>([]);

  const handleOpen = () => {
    if (isOpen) return;
    
    // Unlock and trigger music softly
    onFirstTap();
    
    setIsOpen(true);
    
    // 1. Magical canvas confetti with deep red/green/creamy colors
    confetti({
      particleCount: 120,
      spread: 140,
      origin: { y: 0.65 },
      colors: ['#4a0e17', '#8c1722', '#fdfaf6', '#2d4a22', '#3a5f2b', '#ebd1c1'], 
      ticks: 250,
      gravity: 0.45,
      scalar: 1.3,
      shapes: ['circle']
    });

    // 2. State-based radial flower & foliage burst (extremely detailed, with custom float physics)
    const floralChoices = ['✿', '❁', '❀', '🌿', '🍃', '🌹', '✨', '❤️'];
    const generated = Array.from({ length: 40 }).map((_, idx) => {
      const angle = (idx / 40) * Math.PI * 2 + (Math.random() * 0.4 - 0.2); // Uniform circular distribution with noise
      const distance = 140 + Math.random() * 260; // Spread distance
      
      let char = '✿';
      let color = '#8c1722'; // burgundy-dark
      if (idx % 6 === 0) {
        char = '🌿';
        color = '#2d4a22'; // Soft dark green leaf
      } else if (idx % 6 === 1) {
        char = '🍃';
        color = '#4a7c36'; // Bright olive leaf
      } else if (idx % 6 === 2) {
        char = '🌹';
        color = '#3D0A11'; // Black rose / deep dark velvet red
      } else if (idx % 6 === 3) {
        char = '❁';
        color = '#c98686'; // Vintage soft pink-cream
      } else if (idx % 6 === 4) {
        char = '✨';
        color = '#e2b07d'; // Warm amber sparkle
      } else if (idx % 6 === 5) {
        char = '❤️';
        color = '#bf3b43'; // Rose red heartbeat
      }

      return {
        id: idx,
        char,
        color,
        size: Math.random() * 22 + 16, // Size range 16px to 38px
        angle,
        distance,
        delay: Math.random() * 0.3, // Slight cascading delay
        duration: 2.5 + Math.random() * 1.5, // Slow romantic easing
        rotateEnd: (Math.random() * 360 - 180) * 2,
      };
    });
    setBloomingFlowers(generated);

    // Secondary sub-explosion of soft petals a bit later
    setTimeout(() => {
      confetti({
        particleCount: 50,
        spread: 100,
        origin: { y: 0.55 },
        colors: ['#fdfaf6', '#ebd1c1', '#2d4a22'],
        gravity: 0.25,
        scalar: 0.9,
      });
    }, 500);

    // Sequence timing
    setTimeout(() => setIsRevealed(true), 1400);
    setTimeout(() => onNext(), 4800); // 4.8 seconds to fully register letter text and start fade
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0, scale: 1.05, filter: 'blur(15px)' }}
      transition={{ duration: 1.6 }}
      className="relative flex items-center justify-center min-h-screen bg-[#FAF5EF] overflow-hidden perspective-[2000px]"
    >
      {/* -------------------------------------------------- */}
      {/* LAYERED SOFT ANIMATED BACKGROUND */}
      {/* -------------------------------------------------- */}
      
      {/* Subtle organic paper texture */}
      <div 
        className="absolute inset-0 opacity-[0.04] mix-blend-multiply pointer-events-none z-0 bg-cover bg-center"
        style={{ backgroundImage: 'url("https://www.transparenttextures.com/patterns/rice-paper-2.png")' }}
      />
      
      {/* Soft Vignette Overlay */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_transparent_35%,_rgba(74,14,23,0.06)_100%)] pointer-events-none z-0" />

      {/* Dreamy light rays (animated sunlight streak) */}
      <motion.div 
        animate={{ opacity: [0.15, 0.28, 0.15], x: [-10, 10, -10] }}
        transition={{ duration: 12, repeat: Infinity, ease: "easeInOut" }}
        className="absolute inset-0 bg-[linear-gradient(135deg,_rgba(255,246,224,0.45)_0%,_transparent_55%)] pointer-events-none z-0 mix-blend-screen" 
      />

      {/* Blurred Flower Silhouettes in Back Corners */}
      <motion.div 
        animate={{ rotate: 360 }}
        transition={{ duration: 90, repeat: Infinity, ease: "linear" }}
        className="absolute -top-16 -left-16 text-[22rem] text-[#8b1e2b] opacity-[0.03] select-none pointer-events-none blur-[6px] z-0 font-serif"
      >
        ✿
      </motion.div>
      <motion.div 
        animate={{ rotate: -360 }}
        transition={{ duration: 100, repeat: Infinity, ease: "linear" }}
        className="absolute -bottom-24 -right-24 text-[26rem] text-[#2d4a22] opacity-[0.025] select-none pointer-events-none blur-[8px] z-0 font-serif"
      >
        ❁
      </motion.div>
      <motion.div 
        animate={{ y: [0, 20, 0], rotate: [0, 8, 0] }}
        transition={{ duration: 25, repeat: Infinity, ease: "easeInOut" }}
        className="absolute top-[25%] right-[-8%] text-[14rem] text-[#4a5f3d] opacity-[0.02] select-none pointer-events-none blur-[4px] z-0"
      >
        🌿
      </motion.div>

      {/* Slow Floating Bokeh Lights */}
      {[...Array(4)].map((_, idx) => (
        <motion.div
          key={idx}
          className="absolute rounded-full bg-[#ebd1c1]/20 pointer-events-none blur-3xl z-0"
          style={{
            width: 140 + idx * 60,
            height: 140 + idx * 60,
            top: `${15 + idx * 20}%`,
            left: `${10 + idx * 22}%`,
          }}
          animate={{
            x: [0, 25, -20, 0],
            y: [0, -30, 25, 0],
          }}
          transition={{
            duration: 18 + idx * 6,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
      ))}

      {/* Continuous soft paper petals drifting in background */}
      {[...Array(6)].map((_, idx) => (
        <motion.div
          key={`drift-${idx}`}
          className="absolute text-burgundy/10 text-xl pointer-events-none select-none z-0 font-serif"
          initial={{
            x: -50,
            y: Math.random() * window.innerHeight * 0.8,
            rotate: Math.random() * 360,
            scale: 0.6 + Math.random() * 0.6
          }}
          animate={{
            x: window.innerWidth + 50,
            y: `+=150`,
            rotate: Math.random() * 360 + 180,
          }}
          transition={{
            duration: 25 + Math.random() * 15,
            repeat: Infinity,
            ease: "linear",
            delay: idx * 3,
          }}
        >
          ✿
        </motion.div>
      ))}

      {/* Handwritten-vibe text watermark outlines */}
      <div className="absolute top-[8%] left-[10%] text-[#8b1e2b]/10 select-none pointer-events-none font-hand text-xl rotate-[-6deg] hidden md:block">
        today is for you...
      </div>
      <div className="absolute bottom-[10%] right-[10%] text-[#8b1e2b]/10 select-none pointer-events-none font-hand text-lg rotate-[8deg] hidden md:block">
        happy birthday dehan
      </div>

      <div className="absolute top-[35%] right-[25%] text-burgundy/[0.04] pointer-events-none hidden md:block">
        <Heart size={32} strokeWidth={1} />
      </div>
      <div className="absolute bottom-[35%] left-[25%] text-burgundy/[0.04] pointer-events-none hidden md:block">
        <Sparkles size={28} strokeWidth={1} className="animate-spin" style={{ animationDuration: '8s' }} />
      </div>

      {/* -------------------------------------------------- */}
      {/* EXQUISITE INTERACTIVE ENVELOPE */}
      {/* -------------------------------------------------- */}
      <motion.div
        animate={
          isRevealed
            ? { scale: 1.4, y: -240, opacity: 0, filter: 'blur(12px)' }
            : isOpen 
              ? { scale: 1.1, y: 120, rotateX: 6 } 
              : { y: [0, -12, 0], rotateZ: [-1.2, 1.2, -1.2] }
        }
        transition={
          isRevealed
            ? { duration: 1.8, ease: [0.16, 1, 0.3, 1] }
            : isOpen
              ? { duration: 1.8, ease: [0.16, 1, 0.3, 1] }
              : { duration: 8, repeat: Infinity, ease: "easeInOut" }
        }
        style={{ transformOrigin: 'center center' }}
        className="relative z-10 cursor-pointer w-[310px] md:w-[460px] h-[210px] md:h-[290px] hover:scale-[1.03] transition-transform duration-700"
        onClick={handleOpen}
      >
        {/* Letter inside */}
        <motion.div 
          className="absolute inset-x-3 bottom-0 top-10 bg-[#fdfcf9] rounded-t-lg shadow-[0_5px_45px_rgba(0,0,0,0.35)] flex flex-col items-center justify-start pt-8 pb-4 px-6 md:px-8 origin-bottom border border-white/40 overflow-hidden"
          initial={{ y: "20%", opacity: 0, rotateX: -12 }}
          animate={
            isRevealed 
              ? { y: "-65%", opacity: 0, scale: 1.15, filter: 'blur(8px)' } 
              : isOpen 
                ? { y: "-42%", opacity: 1, rotateX: 0 } 
                : { y: "20%", opacity: 0, rotateX: -12 }
          }
          transition={{ duration: 1.6, delay: isOpen ? 0.4 : 0, ease: [0.16, 1, 0.3, 1] }}
        >
          {/* Deckled border/vintage accent line inside letter */}
          <div className="absolute inset-3 border border-[#ebd1c1]/40 rounded pointer-events-none z-0" />
          
          <div className="relative z-10 w-full flex flex-col items-center">
            <div className="font-hand text-3xl md:text-4xl mb-3 opacity-95 text-burgundy" style={{ fontFamily: 'var(--font-hand)' }}>Hi Dehan,</div>
            <p className="font-serif text-ink/80 italic text-[11px] md:text-[13px] text-center leading-[1.8] space-y-1">
              today is not only about growing older.<br/>
              today is about every little thing that makes you who you are.<br/>
              <span className="block mt-1">the way you find joy in quiet spaces,</span>
              <span>the songs that keep you company late at night,</span>
              <span className="block">matcha afternoons & soft warm lights,</span>
              <span>and the many dreams you are so quietly holding.</span>
              <span className="block mt-1 text-burgundy font-medium font-serif">today, something special blooms just for you.</span>
            </p>
          </div>
        </motion.div>

        {/* Back Cover / Envelope Cavity Wall */}
        <div className="absolute inset-0 bg-[#3D0A11] shadow-2xl rounded-sm border border-black/10 overflow-hidden">
          <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/rice-paper-2.png')] opacity-25 mix-blend-overlay pointer-events-none" />
          {/* Velvet shadows */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-black/20 pointer-events-none" />
        </div>

        {/* -------------------------------------------------- */}
        {/* DECORATIVE CORNER PRINTS */}
        {/* -------------------------------------------------- */}
        {!isOpen && (
          <>
            <div className="absolute top-2 left-2 text-[#ebd1c1]/20 text-xs font-serif pointer-events-none z-10 select-none">✿</div>
            <div className="absolute top-2 right-2 text-[#ebd1c1]/20 text-xs font-serif pointer-events-none z-10 select-none">✿</div>
          </>
        )}

        {/* -------------------------------------------------- */}
        {/* RIBBON WRAPPING (Cross silk lines) */}
        {/* -------------------------------------------------- */}
        <AnimatePresence>
          {!isOpen && (
            <>
              {/* Horizontal Ribbon */}
              <motion.div 
                exit={{ opacity: 0, scaleY: 0, transition: { duration: 0.5 } }}
                className="absolute left-0 right-0 top-1/2 -translate-y-1/2 h-6 bg-[#E5D4C9] shadow-inner z-20 flex items-center justify-center border-y border-[#bfab9f]"
              >
                <div className="w-full border-t border-dashed border-[#ab9588]/30" />
              </motion.div>
              {/* Vertical Ribbon */}
              <motion.div 
                exit={{ opacity: 0, scaleX: 0, transition: { duration: 0.5 } }}
                className="absolute top-0 bottom-0 left-[60%] -translate-x-1/2 w-6 bg-[#E5D4C9] shadow-inner z-20 border-x border-[#bfab9f]"
              >
                <div className="h-full border-l border-dashed border-[#ab9588]/30" />
              </motion.div>
            </>
          )}
        </AnimatePresence>

        {/* Bottom Flap */}
        <div 
          className="absolute bottom-0 w-full h-[62%] bg-[#7E1A23] shadow-[0_-8px_16px_rgba(0,0,0,0.3)] drop-shadow-lg [clip-path:polygon(0_100%,50%_0,100%_100%)] rounded-sm overflow-hidden z-10"
        >
          <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/rice-paper-2.png')] opacity-25 mix-blend-overlay pointer-events-none" />
          <div className="absolute inset-0 bg-gradient-to-t from-[#4a0810]/50 to-transparent pin-bottom pointer-events-none" />
          {/* Soft foliage corner accent */}
          <div className="absolute bottom-2 left-3 text-rose/10 text-3xl rotate-45 pointer-events-none z-0">✿</div>
          <div className="absolute bottom-2 right-3 text-rose/10 text-3xl -rotate-45 pointer-events-none z-0">❁</div>
        </div>

        {/* Top Flap */}
        <motion.div
          className="absolute top-0 w-full h-[62%] bg-[#5c131d] shadow-[0_8px_16px_rgba(0,0,0,0.35)] drop-shadow-2xl z-20 flex items-end justify-center pb-2 [clip-path:polygon(0_0,50%_100%,100%_0)] overflow-hidden"
          initial={{ rotateX: 0 }}
          animate={isOpen ? { rotateX: 180, zIndex: 0, filter: 'brightness(0.7)' } : { rotateX: 0 }}
          transition={{ duration: 1.4, ease: [0.16, 1, 0.3, 1] }}
          style={{ transformOrigin: 'top' }}
        >
          <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/rice-paper-2.png')] opacity-25 mix-blend-overlay pointer-events-none" />
          <div className="absolute inset-0 bg-gradient-to-b from-black/30 via-transparent to-transparent pointer-events-none" />
          
          <AnimatePresence>
            {!isOpen && (
              <motion.div 
                exit={{ opacity: 0, scale: 0.5 }}
                className="absolute text-rose font-hand text-sm mb-4 flex flex-col items-center pointer-events-none select-none z-30"
              >
                <motion.span 
                  animate={{ opacity: [0.6, 1, 0.6], scale: [0.97, 1.03, 0.97] }}
                  transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
                  className="bg-black/40 backdrop-blur-md px-4 py-1.5 rounded-full border border-rose/30 shadow-[0_0_15px_rgba(255,255,255,0.1)] text-[11px] uppercase tracking-widest font-sans"
                >
                  ✉️ tap to open
                </motion.span>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>

        {/* -------------------------------------------------- */}
        {/* LUXURIOUS PAPER CALLIGRAPHY GIFT TAG */}
        {/* -------------------------------------------------- */}
        <AnimatePresence>
          {!isOpen && (
            <motion.div
              initial={{ opacity: 0, scale: 0.8, rotate: -20 }}
              animate={{ opacity: 1, scale: 1, rotate: -8 }}
              exit={{ 
                opacity: 0, 
                rotate: -35, 
                scale: 0.85, 
                y: 60, 
                transition: { duration: 0.9, ease: "easeInOut" } 
              }}
              whileHover={{ rotate: -2, scale: 1.05 }}
              className="absolute z-30 top-[52%] left-[12%] py-3 px-5 bg-[#FAF7F2] border border-[#d2bfb2] shadow-xl rounded-sm font-hand text-[#5c131d] flex flex-col items-center justify-center max-w-[155px] md:max-w-[180px] origin-top-left"
              style={{ 
                backgroundImage: "radial-gradient(circle at top, transparent 4px, #FAF7F2 5px)",
                backgroundSize: '100% 100%'
              }}
            >
              <div className="absolute top-1.5 left-1/2 -translate-x-1/2 w-2 h-2 rounded-full bg-stone-300 shadow-inner" />
              <div className="absolute top-1 left-1.5 text-[6px] text-stone-300 pointer-events-none italic font-serif">✂</div>
              <span className="text-[10px] tracking-[0.15em] font-sans uppercase text-[#5c131d]/50 mb-1" style={{ fontSize: '9px' }}>for you</span>
              <span className="text-xs md:text-sm font-bold text-center leading-normal tracking-wide italic font-serif select-none" style={{ fontFamily: 'Georgia, serif' }}>
                Dehan Faura Az Zahra
              </span>
            </motion.div>
          )}
        </AnimatePresence>

        {/* -------------------------------------------------- */}
        {/* WAX SEAL STICKER (Stamps Top/Bottom flaps) */}
        {/* -------------------------------------------------- */}
        <AnimatePresence>
          {!isOpen && (
            <motion.div 
              exit={{ opacity: 0, scale: 0, rotate: -45 }}
              transition={{ duration: 0.6 }}
              animate={{ 
                boxShadow: [
                  'inset 0 -4px 8px rgba(0,0,0,0.5), 0 5px 10px rgba(0,0,0,0.4)', 
                  'inset 0 -4px 8px rgba(0,0,0,0.5), 0 0 15px 4px rgba(140,23,34,0.45)', 
                  'inset 0 -4px 8px rgba(0,0,0,0.5), 0 5px 10px rgba(0,0,0,0.4)'
                ] 
              }}
              style={{ animationDuration: '2s', animationIterationCount: 'infinite' }}
              className="absolute top-[50%] left-[60%] -translate-x-[50%] -translate-y-[45%] w-13 h-13 rounded-full bg-[#8c1722] shadow-[inset_0_-4px_8px_rgba(0,0,0,0.55),0_5px_10px_rgba(0,0,0,0.4)] z-30 flex items-center justify-center border border-[#4a0810] origin-center cursor-pointer select-none"
            >
              <span className="font-serif italic text-[#f7e8dd] text-xl font-bold drop-shadow-[0_2px_4px_rgba(0,0,0,0.5)]">D</span>
              {/* Seal concentric border lines */}
              <div className="absolute inset-1 rounded-full border border-[#f7e8dd]/10 pointer-events-none" />
              <div className="absolute inset-1.5 rounded-full border border-dashed border-[#5c131d]/20 pointer-events-none" />
            </motion.div>
          )}
        </AnimatePresence>

        {/* -------------------------------------------------- */}
        {/* MAGICAL FLOWER PHYSICS RADIAL BURST CHOREOGRAPHY */}
        {/* -------------------------------------------------- */}
        {bloomingFlowers.map((flower) => {
          const targetX = Math.cos(flower.angle) * flower.distance;
          const targetY = Math.sin(flower.angle) * flower.distance - 200; // Radial shoot with rising offset

          return (
            <motion.div
              key={flower.id}
              initial={{ x: 0, y: 0, opacity: 0, scale: 0, rotate: 0 }}
              animate={{
                x: [0, targetX],
                y: [0, targetY, targetY + 160], // Arc trajectory
                opacity: [0, 1, 1, 0],
                scale: [0, 1.25, 0.95, 0],
                rotate: [0, flower.rotateEnd],
              }}
              transition={{
                duration: flower.duration,
                delay: flower.delay,
                ease: [0.16, 1, 0.3, 1], // premium physics flow
              }}
              className="absolute pointer-events-none select-none z-40 text-center font-serif"
              style={{
                left: '60%', // Matches seal center horizontal placement
                top: '50%',
                color: flower.color,
                fontSize: `${flower.size}px`,
                textShadow: flower.char === '✨' ? '0 0 8px rgba(255,220,100,0.5)' : 'none',
              }}
            >
              {flower.char}
            </motion.div>
          );
        })}

        {/* -------------------------------------------------- */}
        {/* USER GUIDE PULSING HINT (Always clear on mobile) */}
        {/* -------------------------------------------------- */}
        {!isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            className="absolute -bottom-24 left-1/2 -translate-x-1/2 text-center pointer-events-none w-[280px] md:w-[360px]"
          >
            <motion.div 
              animate={{ y: [0, -4, 0] }}
              transition={{ duration: 2.2, repeat: Infinity, ease: "easeInOut" }}
              className="flex flex-col items-center gap-1.5"
            >
              <span className="text-xs font-hand text-[#8b1e2b] tracking-wider bg-white/70 backdrop-blur-sm px-4.5 py-1.5 rounded-full border border-[#8b1e2b]/15 shadow-sm">
                tap the envelope first ✉️
              </span>
              <span className="text-[9px] uppercase font-sans tracking-[0.22em] text-[#8b1e2b]/60">
                tap to open your letter
              </span>
            </motion.div>
          </motion.div>
        )}

      </motion.div>
    </motion.div>
  );
}
