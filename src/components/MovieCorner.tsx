import { motion } from 'motion/react';
import { Film, Ticket } from 'lucide-react';

const shows = [
  { title: "Eternal Sunshine of the Spotless Mind", director: "Michel Gondry", type: "Film", quote: "Meet me in Montauk." },
  { title: "Dark", director: "Netflix", type: "Series", quote: "Sic mundus creatus est." },
  { title: "Game of Thrones", director: "HBO", type: "Series", quote: "Winter is coming." },
  { title: "Mouse", director: "tvN", type: "K-Drama", quote: "The psychopath gene." }
];

export default function MovieCorner() {
  return (
    <motion.section 
      initial={{ y: 80, opacity: 0, filter: 'blur(5px)' }}
      whileInView={{ y: 0, opacity: 1, filter: 'blur(0px)' }}
      viewport={{ once: true, margin: "-10%" }}
      transition={{ duration: 1.5, ease: [0.16, 1, 0.3, 1] }}
      className="relative my-24 py-16 border-y border-burgundy/30 bg-ink shadow-2xl px-6"
    >
      <div className="flex flex-col items-center mb-16 text-center">
        <motion.div 
          initial={{ y: 20, opacity: 0 }}
          whileInView={{ y: 0, opacity: 1 }}
          transition={{ duration: 1, delay: 0.2 }}
          className="text-burgundy text-xs uppercase tracking-[0.2em] mb-4 font-sans font-bold"
        >
          Cinema Corner
        </motion.div>
        <motion.h3 
          initial={{ y: 20, opacity: 0 }}
          whileInView={{ y: 0, opacity: 1 }}
          transition={{ duration: 1, delay: 0.3 }}
          className="font-display text-4xl text-paper italic"
        >
          Stories you love
        </motion.h3>
        <motion.p 
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 1.5, delay: 0.5 }}
          className="font-serif text-paper/60 mt-4 max-w-lg"
        >
          Maybe there is a reason you love stories like Eternal Sunshine of the Spotless Mind, Dark, Game of Thrones, and Mouse.
          <br/><br/>
          they are complex, deep, sometimes dark, but always filled with meaning.
          <br/>
          a little like your mind — holding more than most people ever get to see.
        </motion.p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12 relative z-10 max-w-4xl mx-auto">
        {shows.map((show, i) => (
          <motion.div 
            key={i}
            initial={{ opacity: 0, x: i % 2 === 0 ? -30 : 30, scale: 0.95 }}
            whileInView={{ opacity: 1, x: 0, scale: 1 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 1, delay: i * 0.15, ease: [0.16, 1, 0.3, 1] }}
            whileHover={{ y: -8, scale: 1.02, boxShadow: '0 20px 40px rgba(0,0,0,0.5)' }}
            className={`flex bg-paper text-ink shadow-lg relative overflow-hidden group transition-all duration-500 cursor-pointer ${i % 2 === 0 ? 'md:rotate-[-1deg]' : 'md:rotate-[1deg]'}`}
          >
            {/* Ticket Edge Aesthetic */}
            <div className="w-12 border-r border-dashed border-ink/20 bg-beige flex flex-col items-center justify-center py-4 text-ink/50 group-hover:bg-burgundy/5 transition-colors duration-500">
              <Ticket className="w-5 h-5 mb-8 rotate-90 text-burgundy/50 group-hover:text-burgundy transition-colors duration-500" />
              <span className="writing-vertical-rl font-sans font-bold text-[10px] uppercase tracking-widest">{show.type}</span>
            </div>
            
            <div className="p-6 flex-1 flex flex-col justify-center transform group-hover:translate-x-2 transition-transform duration-500">
              <h4 className="font-display text-xl text-ink leading-tight mb-1 font-bold group-hover:text-burgundy transition-colors duration-300">{show.title}</h4>
              <p className="font-sans text-[10px] font-bold text-ink/40 uppercase tracking-widest mb-4 group-hover:text-ink/60 transition-colors">{show.director}</p>
              <p className="font-serif text-sm text-burgundy italic leading-snug">"{show.quote}"</p>
            </div>

            {/* Hole punches */}
            <div className="absolute top-1/2 -left-3 w-6 h-6 rounded-full bg-ink -translate-y-1/2" />
            <div className="absolute top-1/2 -right-3 w-6 h-6 rounded-full bg-ink -translate-y-1/2" />
          </motion.div>
        ))}
      </div>
      
      <motion.div 
        initial={{ scaleX: 0 }}
        whileInView={{ scaleX: 1 }}
        transition={{ duration: 1.5, delay: 0.5, ease: "easeInOut" }}
        className="max-w-4xl mx-auto h-1 bg-burgundy/50 w-full mt-16 origin-left"
      ></motion.div>
    </motion.section>
  );
}
