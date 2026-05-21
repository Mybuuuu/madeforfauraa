import { motion } from 'motion/react';
import { Film, AlertCircle } from 'lucide-react';
import { useState } from 'react';

export default function VideoSection() {
  const [videoError, setVideoError] = useState(false);

  return (
    <motion.section 
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-100px" }}
      transition={{ duration: 1 }}
      className="relative z-10 my-24 flex flex-col items-center"
    >
      <div className="text-center mb-12">
        <div className="text-burgundy text-xs uppercase tracking-[0.2em] mb-4 font-sans font-bold flex items-center justify-center gap-2">
          <Film className="w-4 h-4" />
          Draft V1
        </div>
        <h3 className="font-display text-4xl text-paper italic">A Special Memory</h3>
        <p className="font-serif text-sm text-paper/60 mt-4 max-w-md mx-auto">
          A short video compilation capturing some of those beautiful moments.
        </p>
      </div>
      
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        whileInView={{ opacity: 1, scale: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 1, type: "spring" }}
        className="relative w-full max-w-4xl p-4 md:p-6 bg-[#fdfbf7] shadow-[0_30px_60px_rgba(0,0,0,0.4)] border border-[#e5e5e5]"
      >
        {/* Tapes */}
        <div className="absolute top-[-15px] left-8 w-24 h-10 bg-white/40 backdrop-blur-md border border-white/20 shadow-sm rotate-2 z-20" />
        <div className="absolute bottom-[-15px] right-8 w-24 h-10 bg-white/40 backdrop-blur-md border border-white/20 shadow-sm -rotate-3 z-20" />
        
        <div className="w-full relative aspect-video overflow-hidden bg-black/90 shadow-inner flex items-center justify-center">
          {videoError ? (
            <div className="text-white/50 flex flex-col items-center gap-4 p-8 text-center">
              <AlertCircle className="w-12 h-12 text-white/30" />
              <div>
                <p className="font-sans font-medium text-lg mb-1">Video not yet uploaded</p>
                <p className="text-sm">Please upload your actual <code className="bg-white/10 px-1 py-0.5 rounded">draft_v1.mp4</code> file to the <code className="bg-white/10 px-1 py-0.5 rounded">public/videos</code> folder.</p>
              </div>
            </div>
          ) : (
            <video 
              className="w-full h-full object-contain"
              controls
              playsInline
              preload="none"
              onError={() => setVideoError(true)}
            >
              <source src="/videos/draft_v1.mp4" type="video/mp4" onError={() => setVideoError(true)} />
              Your browser does not support the video tag.
            </video>
          )}
        </div>
      </motion.div>
    </motion.section>
  );
}
