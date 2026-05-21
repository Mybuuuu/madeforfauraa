import { motion } from 'motion/react';
import { Coffee, Grape, CakeSlice, Utensils, Glasses, Flower2, Flame } from 'lucide-react';

const things = [
  { icon: CakeSlice, title: "Blueberry Cheesecake", desc: "The sweetness of", rotate: -4 },
  { icon: Utensils, title: "Sate Taichan", desc: "Spicy", rotate: 2 },
  { icon: Coffee, title: "Matcha Latte", desc: "Calmer than coffee", rotate: -2 },
  { icon: Grape, title: "Grapes", desc: "Simple but sweet", rotate: 6 },
];

export default function FavoriteThings() {
  return (
    <motion.section 
      initial={{ y: 50, opacity: 0 }}
      whileInView={{ y: 0, opacity: 1 }}
      viewport={{ once: true, margin: "-10%" }}
      transition={{ duration: 1.5, ease: [0.16, 1, 0.3, 1] }}
      className="relative"
    >
      <motion.p 
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 1.2, delay: 0.2 }}
        className="font-serif text-paper/80 text-center max-w-2xl mx-auto mb-16 leading-relaxed italic"
      >
        I realized that sometimes, a person can be understood through the little things they love.
      </motion.p>

      {/* Main Centerpiece Photo 3 */}
      <motion.div
        initial={{ opacity: 0, scale: 0.95, rotate: 1, y: 60 }}
        whileInView={{ opacity: 1, scale: 1, rotate: -1, y: 0 }}
        animate={{ y: [0, -6, 0], rotate: [-1, 2, 0, -1] }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ 
          duration: 1.5, 
          ease: [0.16, 1, 0.3, 1],
          y: { duration: 4.5, repeat: Infinity, ease: "easeInOut" },
          rotate: { duration: 6.5, repeat: Infinity, ease: "easeInOut" }
        }}
        className="relative max-w-3xl mx-auto mb-20 p-4 md:p-8 pb-16 md:pb-24 bg-[#fdfbf7] shadow-[0_30px_60px_rgba(0,0,0,0.4)] hover:shadow-[0_40px_80px_rgba(0,0,0,0.5)] transition-shadow duration-700 border border-[#e5e5e5] flex flex-col items-center"
      >
        <div className="absolute top-[-20px] left-8 w-32 h-10 bg-white/40 backdrop-blur-md border border-white/20 shadow-sm rotate-2 z-20" />
        <div className="absolute bottom-[-15px] right-8 w-24 h-10 bg-white/40 backdrop-blur-md border border-white/20 shadow-sm -rotate-3 z-20" />
        
        <div className="w-full relative aspect-[4/5] md:aspect-video overflow-hidden bg-gray-200 shadow-inner group">
          <img 
            src="/images/dehan3.jpg" 
            alt="Cafe Memory"
            loading="lazy"
            decoding="async"
            className="w-full h-full object-cover object-center transition-transform duration-[2s] group-hover:scale-105"
            referrerPolicy="no-referrer"
          />
          {/* Overlay highlights for matcha and dessert */}
          <motion.div 
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ delay: 1, duration: 0.8 }}
            className="absolute bottom-8 left-8 bg-paper/90 backdrop-blur-md p-4 shadow-xl border border-burgundy/10 rotate-3 flex items-center gap-3"
          >
             <Coffee className="text-burgundy w-5 h-5" />
             <span className="font-sans text-xs uppercase tracking-widest text-ink font-bold">Matcha Latte</span>
          </motion.div>
          <motion.div 
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ delay: 1.2, duration: 0.8 }}
            className="absolute top-8 right-8 bg-paper/90 backdrop-blur-md p-4 shadow-xl border border-burgundy/10 -rotate-2 flex items-center gap-3"
          >
             <CakeSlice className="text-burgundy w-5 h-5" />
             <span className="font-sans text-xs uppercase tracking-widest text-ink font-bold">Sweet Desserts</span>
          </motion.div>
        </div>
        
        <div className="mt-8 text-center px-4 w-full">
           <p className="font-hand text-2xl md:text-3xl text-ink/80 leading-relaxed -rotate-1">
             soft warm café atmospheres and the quiet joy of favorite treats.
           </p>
        </div>
      </motion.div>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-8">
        {things.map((item, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: i * 0.1, ease: "easeOut" }}
            whileHover={{ y: -15, rotate: 0, scale: 1.05 }}
            style={{ rotate: item.rotate }}
            className="bg-paper text-ink p-4 pb-12 shadow-xl border-t-8 border-burgundy flex flex-col items-center justify-center relative group transition-all duration-300 hover:shadow-2xl hover:z-10 cursor-pointer"
          >
            {/* Tape */}
            <div className="absolute -top-3 left-1/2 -translate-x-1/2 w-12 h-6 bg-white/40 backdrop-blur-sm border border-neutral-200/30 transform rotate-2 shadow-sm" />
            
            <div className="w-full aspect-square bg-beige mb-3 relative flex items-center justify-center overflow-hidden">
              <item.icon strokeWidth={1.5} size={32} className="text-ink/80 group-hover:text-burgundy transition-all duration-500 transform group-hover:scale-110" />
            </div>
            <p className="font-sans font-bold text-xs uppercase tracking-tighter text-ink/80 mt-2">{item.title}</p>
            <p className="font-serif flex absolute bottom-4 text-[10px] uppercase text-ink/50 tracking-widest text-center px-2">{item.desc}</p>
          </motion.div>
        ))}
      </div>

      <motion.p 
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 1.2, delay: 0.4 }}
        className="font-serif text-paper/80 text-center max-w-2xl mx-auto mt-16 leading-relaxed"
      >
        and dark red, a color that somehow feels made for you.<br/>
        they are small things, but somehow they make you unforgettable.
      </motion.p>

      <div className="mt-20 flex flex-col md:flex-row items-center gap-12 justify-center">
        <motion.div 
          initial={{ opacity: 0, x: -50, rotate: -5 }}
          whileInView={{ opacity: 1, x: 0, rotate: -2 }}
          transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
          className="relative max-w-xs p-6 bg-paper shadow-xl hover:shadow-2xl border-t-8 border-burgundy flex flex-col transition-shadow duration-500"
          whileHover={{ rotate: 1, y: -5 }}
        >
          <div className="absolute -top-4 -right-4 w-12 h-12 bg-burgundy rounded-full flex items-center justify-center text-paper font-bold text-xl shadow-lg border-2 border-paper">
             <Flower2 className="w-5 h-5" />
          </div>
          <h2 className="text-xs uppercase tracking-widest text-burgundy font-sans mb-2 font-bold">Memory No. 01</h2>
          <p className="font-serif italic text-lg leading-snug text-ink">
            A Thumbelina flower bouquet on the table, a gentle breeze, and the warmth of words of affirmation and physical touch.
          </p>
        </motion.div>

        <motion.div 
          initial={{ opacity: 0, x: 50, rotate: 5 }}
          whileInView={{ opacity: 1, x: 0, rotate: 2 }}
          transition={{ duration: 1.2, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
          className="relative max-w-xs p-6 bg-ink text-paper shadow-2xl hover:shadow-[0_20px_40px_rgba(0,0,0,0.6)] border-l-4 border-burgundy transition-shadow duration-500"
          whileHover={{ rotate: -1, y: -5 }}
        >
          <h3 className="font-sans text-[10px] uppercase tracking-[0.3em] mb-4 text-burgundy">Vision Details</h3>
          <div className="flex items-center gap-4 border-b border-paper/10 pb-4">
            <Glasses className="w-8 h-8 opacity-50" />
            <p className="font-mono text-sm">L: -1.00 <span className="opacity-50">|</span> R: -1.25</p>
          </div>
          <div className="mt-4 flex items-start gap-3">
            <Flame className="w-4 h-4 text-burgundy mt-1 flex-shrink-0" />
            <p className="text-xs font-serif italic opacity-70">
              When the spicy food cravings hit... we know what time of the month it is. Stay strong.
            </p>
          </div>
        </motion.div>
      </div>
    </motion.section>
  );
}
