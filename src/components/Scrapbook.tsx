import { motion, useScroll, useTransform } from 'motion/react';
import React, { useRef } from 'react';
import FavoriteThings from './FavoriteThings';
import MusicBoard from './MusicBoard';
import ScratchCards from './ScratchCards';
import DreamBoard from './DreamBoard';
import MovieCorner from './MovieCorner';
import VideoSection from './VideoSection';
import FinalSection from './FinalSection';
import HiddenMessage from './HiddenMessage';
import PhotoGallery from './PhotoGallery';

const MemoPhotoGallery = React.memo(PhotoGallery);
const MemoFavoriteThings = React.memo(FavoriteThings);
const MemoMusicBoard = React.memo(MusicBoard);
const MemoMovieCorner = React.memo(MovieCorner);
const MemoScratchCards = React.memo(ScratchCards);
const MemoDreamBoard = React.memo(DreamBoard);
const MemoVideoSection = React.memo(VideoSection);
const MemoFinalSection = React.memo(FinalSection);
const MemoHiddenMessage = React.memo(HiddenMessage);

export default function Scrapbook() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: containerRef });
  const y = useTransform(scrollYProgress, [0, 1], ["0%", "30%"]);
  const opacity = useTransform(scrollYProgress, [0, 0.2], [1, 0.3]);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 2, ease: "easeOut" }}
      className="relative min-h-screen text-paper selection:bg-rose/30 font-body overflow-x-hidden"
      ref={containerRef}
    >
      {/* Background Texture & Parallax element */}
      <motion.div 
        style={{ y, opacity }} 
        className="fixed inset-0 z-0 opacity-10 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-brown via-transparent to-transparent pointer-events-none" 
      />

      {/* Content wrapper */}
      <div className="relative z-10 max-w-5xl mx-auto px-6 py-24 md:py-32 flex flex-col gap-32 md:gap-48">
        
        {/* Intro */}
        <motion.section 
          initial={{ y: 80, opacity: 0, filter: 'blur(8px)' }}
          whileInView={{ y: 0, opacity: 1, filter: 'blur(0px)' }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 1.8, ease: [0.16, 1, 0.3, 1] }}
          className="text-center space-y-6"
        >
          <motion.h2 
            initial={{ scale: 0.95 }}
            whileInView={{ scale: 1 }}
            transition={{ duration: 2, ease: "easeOut" }}
            className="font-display text-4xl md:text-5xl lg:text-7xl text-paper font-medium italic drop-shadow-md"
          >
            A little book of you
          </motion.h2>
          <motion.p 
            initial={{ y: 20, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.5, duration: 1.5, ease: "easeOut" }}
            className="font-serif text-lg md:text-xl text-paper/80 leading-relaxed max-w-2xl mx-auto"
          >
            if all the things you love were gathered in one place,<br/>
            maybe it would look like this page.<br/><br/>
            a little messy, a little warm, a little dark like your favorite colors,<br/>
            and somehow beautiful enough to look at for a long time.
          </motion.p>
          <motion.div 
            initial={{ height: 0 }}
            whileInView={{ height: 96 }}
            transition={{ delay: 1, duration: 1.5, ease: "easeInOut" }}
            className="w-px bg-gradient-to-b from-paper/50 to-transparent mx-auto mt-12 relative flex justify-center" 
          >
            <motion.div
              animate={{ y: [0, 15, 0], opacity: [0.3, 1, 0.3] }}
              transition={{ duration: 2, repeat: Infinity }}
              className="absolute pointer-events-none top-full mt-4 text-paper/60 uppercase text-[10px] tracking-widest font-sans font-bold flex flex-col items-center gap-2"
            >
              <span>Scroll gently</span>
              <span className="text-lg">↓</span>
            </motion.div>
          </motion.div>
        </motion.section>

        <MemoPhotoGallery />
        <MemoFavoriteThings />
        <MemoMusicBoard />
        <MemoMovieCorner />
        <MemoScratchCards />
        <MemoDreamBoard />
        <MemoVideoSection />
        <MemoFinalSection />
        <MemoHiddenMessage />
      </div>
    </motion.div>
  );
}
