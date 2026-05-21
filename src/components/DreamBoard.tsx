import { motion } from 'motion/react';
import { BookOpen, Globe2, Plane, Sparkles, Flower2 } from 'lucide-react';

export default function DreamBoard() {
  return (
    <motion.section 
      initial={{ y: 50, opacity: 0, filter: 'blur(5px)' }}
      whileInView={{ y: 0, opacity: 1, filter: 'blur(0px)' }}
      viewport={{ once: true, margin: "-10%" }}
      transition={{ duration: 1.5, ease: [0.16, 1, 0.3, 1] }}
      className="relative my-24 bg-paper shadow-2xl overflow-hidden bg-ruled border-t border-burgundy/20"
    >
      <motion.div 
        animate={{ rotate: [0, 2, -2, 0] }}
        transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
        className="absolute top-0 right-0 p-8 text-burgundy/5 text-[180px] font-bold leading-none select-none pointer-events-none origin-top-right"
      >
        23
      </motion.div>
      
      <div className="p-8 md:p-16 relative z-10">
        <motion.div 
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.2 }}
          className="flex items-center gap-4 font-sans text-[10px] uppercase tracking-widest text-burgundy mb-8 justify-center"
        >
          <span>Future Blueprints</span>
          <span className="h-px w-12 bg-burgundy"></span>
          <span>Draft V1</span>
        </motion.div>
        
        <motion.h3 
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1.2, delay: 0.4, ease: "easeOut" }}
          className="font-display text-4xl md:text-5xl text-ink font-bold mb-8 text-center tracking-tighter"
        >
          Things you want to become
        </motion.h3>
        
        <motion.p 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.2, delay: 0.6 }}
          className="font-serif text-ink/70 text-center max-w-2xl mx-auto mb-16 leading-relaxed italic"
        >
          There are still so many things you want to learn.<br/>
          to read more. to understand history. to discover new languages. to open windows to the world through different words.
        </motion.p>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12 items-center">
          {/* Photo 4 - The dreamer */}
          <motion.div
            initial={{ opacity: 0, x: -50, rotate: -5 }}
            whileInView={{ opacity: 1, x: 0, rotate: 3 }}
            animate={{ y: [0, -5, 0], rotate: [3, 2, 4, 3] }}
            whileHover={{ scale: 1.02, rotate: 1, boxShadow: "0 30px 60px rgba(0,0,0,0.3)" }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ 
              duration: 1.5, 
              ease: [0.16, 1, 0.3, 1],
              y: { duration: 4, repeat: Infinity, ease: "easeInOut" },
              rotate: { duration: 6, repeat: Infinity, ease: "easeInOut" }
            }}
            className="lg:col-span-1 relative p-3 md:p-4 pb-12 md:pb-16 bg-paper shadow-xl border border-black/5 transition-all duration-500"
          >
            {/* Decorations */}
            <div className="absolute -top-6 -right-6 w-16 h-16 bg-burgundy/10 rounded-full blur-xl" />
            <div className="absolute top-[-10px] left-1/2 -translate-x-1/2 w-16 h-6 bg-[#e8e4d9] shadow-sm rotate-2 z-10 mix-blend-multiply opacity-80" />
            
            <div className="absolute -left-4 top-10 flex flex-col gap-2 z-20">
               <motion.div whileHover={{ scale: 1.2, rotate: 90 }} className="w-10 h-10 rounded-full border border-burgundy/20 bg-paper/50 backdrop-blur shadow shadow-red-900/10 flex items-center justify-center -rotate-12 cursor-pointer transition-transform duration-300">
                  <Flower2 className="w-5 h-5 text-burgundy opacity-80" />
               </motion.div>
               <motion.div whileHover={{ scale: 1.2, rotate: -90 }} className="w-10 h-10 rounded-full border border-burgundy/20 bg-paper/50 backdrop-blur shadow shadow-red-900/10 flex items-center justify-center rotate-45 cursor-pointer transition-transform duration-300">
                  <BookOpen className="w-4 h-4 text-ink opacity-80" />
               </motion.div>
            </div>

            <div className="absolute -bottom-6 -right-4 w-24 h-8 bg-paper/90 border border-burgundy/10 shadow-md rotate-[-6deg] z-20 flex items-center justify-center">
               <span className="font-mono text-[10px] tracking-widest uppercase opacity-60">Archive / 2026</span>
            </div>

            <div className="w-full relative aspect-[3/4] overflow-hidden bg-gray-200 group">
              <img 
                src="/images/dehan4.jpg" 
                alt="Glasses portrait"
                loading="lazy"
                decoding="async"
                className="w-full h-full object-cover object-center transition-transform duration-[2s] group-hover:scale-105"
                referrerPolicy="no-referrer"
              />
            </div>
            
            <div className="absolute bottom-4 left-0 w-full text-center px-4">
                <span className="font-hand text-lg text-ink/80 opacity-90 inline-block -rotate-1">
                  "someone who still has many worlds to discover."
                </span>
            </div>
          </motion.div>

          <div className="lg:col-span-2 grid grid-cols-1 md:grid-cols-2 gap-12 pl-0 lg:pl-12">
            {/* Reading/History */}
            <motion.div 
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, delay: 0.8 }}
              className="flex flex-col items-center lg:items-start text-center lg:text-left space-y-4 group"
            >
              <div className="w-16 h-16 bg-burgundy text-paper rounded-sm shadow-sm flex items-center justify-center mb-2 transform transition-transform duration-500 group-hover:-translate-y-2 group-hover:shadow-lg">
                 <BookOpen size={24} strokeWidth={2} />
              </div>
              <h4 className="font-display text-2xl text-ink font-bold tracking-tight group-hover:text-burgundy transition-colors">History & Pages</h4>
              <p className="font-serif text-sm text-ink/70 leading-relaxed">
                Building a new hobby in reading. Digging through history books, finding old souls in printed words. 
              </p>
            </motion.div>

            {/* Languages */}
            <motion.div 
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, delay: 1.0 }}
              className="flex flex-col items-center lg:items-start text-center lg:text-left space-y-4 group"
            >
              <div className="w-16 h-16 bg-ink text-paper rounded-sm shadow-sm flex items-center justify-center mb-2 transform transition-transform duration-500 group-hover:-translate-y-2 group-hover:shadow-lg">
                 <Globe2 size={24} strokeWidth={2} />
              </div>
              <h4 className="font-display text-2xl text-ink font-bold tracking-tight">New Voices</h4>
              <div className="font-sans text-[10px] flex flex-wrap justify-center lg:justify-start gap-2 max-w-[200px]">
                {['English', '日本語', 'Deutsch', 'Nederlands', 'Русский'].map((lang, i) => (
                  <motion.span 
                    key={lang}
                    initial={{ opacity: 0, scale: 0.8 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 1.2 + (i * 0.1), duration: 0.5 }}
                    whileHover={{ scale: 1.1, backgroundColor: '#4A0E17', color: '#fcfaf8', borderColor: '#4A0E17' }}
                    className="px-3 py-1 border border-ink rounded-full uppercase font-bold text-ink cursor-default transition-colors duration-300"
                  >
                    {lang}
                  </motion.span>
                ))}
              </div>
              <p className="font-serif text-sm text-ink/70 leading-relaxed mt-2">
                maybe one day, all those languages will take you to places that now only live in your imagination.<br/>
                and I believe you will get there.
              </p>
            </motion.div>

            {/* Travel */}
            <motion.div 
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, delay: 1.2 }}
              className="flex flex-col items-center lg:items-start text-center lg:text-left space-y-4 group md:col-span-2"
            >
              <div className="w-16 h-16 bg-transparent border border-ink/10 text-ink rounded-sm shadow-sm flex items-center justify-center mb-2 lg:mx-0 mx-auto transform transition-transform duration-500 group-hover:-translate-y-2 group-hover:bg-burgundy/5 group-hover:border-burgundy/30">
                 <Plane size={24} strokeWidth={2} className="group-hover:text-burgundy transition-colors" />
              </div>
              <h4 className="font-display text-2xl text-ink font-bold tracking-tight">Coordinates</h4>
              <p className="font-serif text-sm text-ink/70 leading-relaxed max-w-md lg:mx-0 mx-auto">
                Japan, Germany, Netherlands, Russia. Collecting memories and postcards from the places you will one day touch.
              </p>
            </motion.div>
          </div>
        </div>

        <motion.div 
          animate={{ rotate: 360 }}
          transition={{ duration: 60, repeat: Infinity, ease: "linear" }}
          className="absolute -bottom-10 -left-10 w-40 h-40 border-[20px] border-burgundy/5 border-dashed rounded-full pointer-events-none"
        ></motion.div>
      </div>
    </motion.section>
  );
}
