import { motion } from 'motion/react';
import { Flower2 } from 'lucide-react';
import React from 'react';

export default function PhotoGallery() {
  return (
    <motion.section 
      initial={{ opacity: 0, filter: 'blur(5px)' }}
      whileInView={{ opacity: 1, filter: 'blur(0px)' }}
      viewport={{ once: true, margin: "-10%" }}
      transition={{ duration: 1.5, ease: [0.16, 1, 0.3, 1] }}
      className="max-w-4xl mx-auto w-full relative z-10 my-24 flex flex-col items-center"
    >
      <div className="text-center mb-16">
        <motion.div 
          initial={{ y: 20, opacity: 0 }}
          whileInView={{ y: 0, opacity: 1 }}
          transition={{ duration: 1, delay: 0.2, ease: "easeOut" }}
          className="text-burgundy text-xs uppercase tracking-[0.2em] mb-4 font-sans font-bold"
        >
          Memory Timeline
        </motion.div>
        <motion.h3 
          initial={{ y: 20, opacity: 0 }}
          whileInView={{ y: 0, opacity: 1 }}
          transition={{ duration: 1, delay: 0.4, ease: "easeOut" }}
          className="font-display text-4xl text-paper italic"
        >
          Where it all began
        </motion.h3>
      </div>
      
      <motion.div
        initial={{ opacity: 0, y: 50, rotate: -5, scale: 0.9 }}
        whileInView={{ opacity: 1, y: 0, rotate: 2, scale: 1 }}
        animate={{ y: [0, -5, 0], rotate: [2, 1, 3, 2] }}
        whileHover={{ scale: 1.05, rotate: 0, y: -10, boxShadow: "0 30px 60px rgba(0,0,0,0.4)" }}
        viewport={{ once: true, margin: "-50px" }}
        transition={{ 
          duration: 1.2, 
          ease: [0.16, 1, 0.3, 1],
          y: { duration: 4, repeat: Infinity, ease: "easeInOut" },
          rotate: { duration: 6, repeat: Infinity, ease: "easeInOut" }
        }}
        className="relative p-4 md:p-6 pb-16 md:pb-20 bg-paper shadow-[0_20px_40px_rgba(0,0,0,0.2)] border border-[#e5e5e5] flex-shrink-0 transition-shadow duration-500"
        style={{ width: "320px", maxWidth: "85vw" }}
      >
        {/* Paper tape */}
        <div className="absolute top-[-15px] right-8 w-24 h-8 bg-[#e8e4d9] mix-blend-multiply opacity-80 shadow-sm -rotate-3 z-20 border border-black/5" />
        
        {/* Flower stickers */}
        <motion.div 
          whileHover={{ scale: 1.2, rotate: 180 }}
          transition={{ duration: 0.5 }}
          className="absolute -top-4 -left-4 w-12 h-12 rounded-full border border-burgundy/20 bg-paper/50 backdrop-blur flex items-center justify-center -rotate-12 z-20 shadow-md cursor-pointer"
        >
           <Flower2 className="w-6 h-6 text-burgundy opacity-80" />
        </motion.div>
        <motion.div 
          whileHover={{ scale: 1.2, rotate: 180 }}
          transition={{ duration: 0.5 }}
          className="absolute top-1/2 -right-6 w-10 h-10 rounded-full border border-burgundy/20 bg-paper/50 backdrop-blur flex items-center justify-center rotate-45 z-20 shadow-md cursor-pointer"
        >
           <Flower2 className="w-5 h-5 text-rose opacity-80" />
        </motion.div>

        <div className="w-full relative aspect-[3/4] overflow-hidden bg-gray-200 border border-black/5">
          <img 
            src="/images/dehan2.jpg" 
            alt="Childhood Memory"
            loading="lazy"
            decoding="async"
            className="w-full h-full object-cover object-center grayscale-[20%] sepia-[10%] contrast-110 transition-transform duration-1000 hover:scale-105 hover:grayscale-0"
            referrerPolicy="no-referrer"
          />
        </div>
        
        <div className="absolute bottom-6 left-0 w-full px-6 text-center">
            <span className="font-hand text-xl md:text-2xl text-ink/90 inline-block -rotate-2">
              "the little girl who carried dreams long before she knew their names."
            </span>
        </div>
      </motion.div>
    </motion.section>
  );
}
