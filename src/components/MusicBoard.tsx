import { motion } from 'motion/react';
import { Play, SkipForward, SkipBack, Circle } from 'lucide-react';

const songs = [
  { title: "Glass in the Park", artist: "Alex Turner", duration: "3:59" },
  { title: "Fluorescent Adolescent", artist: "Arctic Monkeys", duration: "2:57" },
  { title: "No One Noticed", artist: "The Marías", duration: "3:40" },
  { title: "Mereguk Anti Depresan Lagi", artist: "Fiersa Besari", duration: "4:15" },
];

export default function MusicBoard() {
  return (
    <motion.section 
      initial={{ y: 50, opacity: 0, filter: 'blur(5px)' }}
      whileInView={{ y: 0, opacity: 1, filter: 'blur(0px)' }}
      viewport={{ once: true, margin: "-10%" }}
      transition={{ duration: 1.5, ease: [0.16, 1, 0.3, 1] }}
      className="relative flex flex-col md:flex-row gap-12 items-center"
    >
      <div className="w-full md:w-1/2 relative">
         <motion.div 
           initial={{ rotate: -5, scale: 0.95 }}
           whileInView={{ rotate: -1, scale: 1 }}
           whileHover={{ rotate: 0, scale: 1.02 }}
           transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
           className="relative bg-ink p-8 text-paper shadow-[0_20px_50px_rgba(0,0,0,0.5)] overflow-hidden flex flex-col border-l-4 border-burgundy cursor-pointer group"
         >
            <div className="absolute inset-0 bg-gradient-to-tr from-burgundy/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
            <div className="flex justify-between items-end border-b border-paper/20 pb-4 mb-4 relative z-10">
              <h4 className="font-sans text-[10px] uppercase tracking-[0.3em] text-burgundy font-bold">The Soundtrack</h4>
              <span className="font-mono text-xs opacity-50 bg-white/5 px-2 py-1 rounded">SIDE A</span>
            </div>
            
            <div className="space-y-4 mb-8 relative z-10">
              {songs.map((song, i) => (
                <div key={i} className="flex justify-between items-center group/song cursor-pointer">
                   <div className="flex items-center gap-4 transition-transform duration-300 group-hover/song:translate-x-2">
                      <div className="w-8 h-8 border border-burgundy/50 rounded-full flex items-center justify-center text-xs opacity-80 group-hover/song:border-burgundy group-hover/song:bg-burgundy/20 transition-all">
                        <Play size={10} fill="currentColor" className="ml-0.5 text-paper group-hover/song:text-rose" />
                      </div>
                      <div>
                        <p className="font-sans font-bold text-sm md:text-base group-hover/song:text-rose transition-colors text-paper tracking-tight">{song.title}</p>
                        <p className="font-sans text-[10px] uppercase opacity-60 group-hover/song:opacity-100 transition-opacity">{song.artist}</p>
                      </div>
                   </div>
                   <span className="font-mono text-xs opacity-30 group-hover/song:opacity-70 group-hover/song:text-rose transition-all">{song.duration}</span>
                </div>
              ))}
            </div>

            <div className="mt-4 h-[1px] bg-burgundy/30 w-full relative z-10 overflow-hidden">
              <motion.div 
                animate={{ x: ["0%", "300%"] }}
                transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
                className="absolute top-[-1px] left-0 w-8 h-1 bg-burgundy rounded-full shadow-[0_0_10px_#8c1722]"
              ></motion.div>
            </div>
         </motion.div>
         {/* Vintage tape note */}
         <motion.div 
            initial={{ opacity: 0, scale: 0.8, rotate: 0 }}
            whileInView={{ opacity: 1, scale: 1, rotate: 4 }}
            animate={{ rotate: [4, 1, 6, 4] }}
            whileHover={{ scale: 1.1, rotate: -2 }}
            transition={{ 
              delay: 0.6, 
              duration: 0.8,
              rotate: { duration: 5, repeat: Infinity, ease: "easeInOut", delay: 1.4 }
            }}
            className="absolute -bottom-4 -right-4 bg-paper px-3 py-1 font-hand text-sm border-2 border-paper-dark shadow-xl text-ink z-20 font-bold cursor-pointer"
         >
            Play on a rainy day
         </motion.div>
      </div>

      <div className="w-full md:w-1/2 space-y-6 md:pl-12">
        <motion.h3 
          initial={{ opacity: 0, x: 30 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 1.2, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
          className="font-display text-4xl md:text-5xl text-paper italic drop-shadow-md"
        >
          Songs that sound like you
        </motion.h3>
        <motion.p 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.2, delay: 0.4, ease: [0.16, 1, 0.3, 1] }}
          className="font-serif text-lg leading-relaxed text-paper/70"
        >
          Some songs feel like they were written with you somewhere between the lines.<br/><br/>
          Glass in the Park when the night feels still.<br/>
          Fluorescent Adolescent when nostalgia arrives unexpectedly.<br/>
          No One Noticed when everything feels too quiet.<br/><br/>
          and every song by Alex Turner always seems to leave room for feelings that are hard to explain.
        </motion.p>
      </div>
    </motion.section>
  );
}
