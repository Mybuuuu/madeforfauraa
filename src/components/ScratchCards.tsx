import { useEffect, useRef, useState } from 'react';
import { motion, useInView } from 'motion/react';
import React from 'react';

class ScratchSoundManager {
  ctx: AudioContext | null = null;
  scratchOsc: OscillatorNode | null = null;
  scratchGain: GainNode | null = null;
  hasInit = false;

  init() {
    if (this.hasInit) return;
    try {
      const AudioCtx = window.AudioContext || (window as any).webkitAudioContext;
      if (AudioCtx) {
         this.ctx = new AudioCtx();
         this.hasInit = true;
      }
    } catch(e) {
      console.warn("Audio Context not supported");
    }
  }

  playPop() {
    if (!this.ctx) return;
    if (this.ctx.state === 'suspended') this.ctx.resume();
    
    const osc = this.ctx.createOscillator();
    const gain = this.ctx.createGain();
    
    osc.connect(gain);
    gain.connect(this.ctx.destination);
    
    osc.type = 'sine';
    const now = this.ctx.currentTime;
    
    osc.frequency.setValueAtTime(600, now);
    osc.frequency.exponentialRampToValueAtTime(1200, now + 0.05);
    
    gain.gain.setValueAtTime(0, now);
    gain.gain.linearRampToValueAtTime(0.2, now + 0.01);
    gain.gain.exponentialRampToValueAtTime(0.001, now + 0.15);
    
    osc.start(now);
    osc.stop(now + 0.2);
  }

  startScratch() {
    if (!this.ctx) return;
    if (this.ctx.state === 'suspended') this.ctx.resume();
    if (this.scratchOsc) return; 

    const bufferSize = this.ctx.sampleRate * 2; 
    const buffer = this.ctx.createBuffer(1, bufferSize, this.ctx.sampleRate);
    const data = buffer.getChannelData(0);
    for (let i = 0; i < bufferSize; i++) {
        data[i] = Math.random() * 2 - 1;
    }

    const noise = this.ctx.createBufferSource();
    noise.buffer = buffer;
    noise.loop = true;

    const filter = this.ctx.createBiquadFilter();
    filter.type = 'highpass';
    filter.frequency.value = 2000;

    const filter2 = this.ctx.createBiquadFilter();
    filter2.type = 'lowpass';
    filter2.frequency.value = 5000;

    this.scratchGain = this.ctx.createGain();
    this.scratchGain.gain.value = 0.05;

    noise.connect(filter);
    filter.connect(filter2);
    filter2.connect(this.scratchGain);
    this.scratchGain.connect(this.ctx.destination);

    noise.start();
    this.scratchOsc = noise as any;
  }

  stopScratch() {
    if (!this.ctx || !this.scratchOsc) return;
    
    if (this.scratchGain) {
        this.scratchGain.gain.setTargetAtTime(0, this.ctx.currentTime, 0.05);
    }
    
    const currentOsc = this.scratchOsc;
    this.scratchOsc = null;
    
    setTimeout(() => {
        try {
            (currentOsc as unknown as AudioBufferSourceNode).stop();
        } catch (e) {}
    }, 100);
  }
}

const soundManager = new ScratchSoundManager();

interface ScratchCardProps {
  content: string;
  imgSrc?: string;
  width?: number;
  height?: number;
  key?: React.Key;
  delay?: number;
}

function ScratchCardItem({ content, imgSrc, delay = 0 }: ScratchCardProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const [isScratched, setIsScratched] = useState(false);
  const isScratchedRef = useRef(false);
  const isInView = useInView(containerRef, { once: true, margin: "-50px" });

  useEffect(() => {
    isScratchedRef.current = isScratched;
  }, [isScratched]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Fill cover
    ctx.fillStyle = '#8b0000'; // Burgundy color cover
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    
    // Add some noise/texture to cover
    for (let i = 0; i < 500; i++) {
        ctx.fillStyle = i % 2 === 0 ? 'rgba(255,255,255,0.1)' : 'rgba(0,0,0,0.05)';
        ctx.fillRect(Math.random() * canvas.width, Math.random() * canvas.height, 2, 2);
    }
    
    // Add text on cover
    ctx.font = "bold 12px 'Inter'";
    ctx.fillStyle = "rgba(255,255,255,0.8)";
    ctx.textAlign = "center";
    ctx.fillText("SCRATCH TO REVEAL", canvas.width / 2, canvas.height / 2);

    let isDrawing = false;

    const scratch = (x: number, y: number) => {
      ctx.globalCompositeOperation = 'destination-out';
      ctx.beginPath();
      ctx.arc(x, y, 25, 0, Math.PI * 2);
      ctx.fill();
      checkScratched();
    };

    const checkScratched = () => {
      if (isScratchedRef.current) return;
      const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
      const pixels = imageData.data;
      let clearPixels = 0;
      for (let i = 3; i < pixels.length; i += 4) {
        if (pixels[i] === 0) clearPixels++;
      }
      if (clearPixels / (pixels.length / 4) > 0.6) {
        setIsScratched(true);
        isScratchedRef.current = true;
        soundManager.stopScratch();
        soundManager.playPop();
        // Clear rest of canvas automatically for better UX
        ctx.clearRect(0,0,canvas.width, canvas.height);
      }
    };

    const getMousePos = (e: MouseEvent | TouchEvent) => {
      const rect = canvas.getBoundingClientRect();
      const clientX = 'touches' in e ? e.touches[0].clientX : (e as MouseEvent).clientX;
      const clientY = 'touches' in e ? e.touches[0].clientY : (e as MouseEvent).clientY;
      return {
        x: clientX - rect.left,
        y: clientY - rect.top
      };
    };

    const handleStart = (e: MouseEvent | TouchEvent) => {
      if (isScratchedRef.current) return;
      soundManager.init();
      isDrawing = true;
      soundManager.startScratch();
      const { x, y } = getMousePos(e);
      scratch(x, y);
    };

    const handleMove = (e: MouseEvent | TouchEvent) => {
      if (!isDrawing) return;
      e.preventDefault(); // prevent scrolling while scratching
      const { x, y } = getMousePos(e);
      scratch(x, y);
    };

    const handleEnd = () => { 
      isDrawing = false; 
      soundManager.stopScratch();
    };

    canvas.addEventListener('mousedown', handleStart);
    canvas.addEventListener('mousemove', handleMove);
    canvas.addEventListener('mouseup', handleEnd);
    canvas.addEventListener('mouseleave', handleEnd);
    
    canvas.addEventListener('touchstart', handleStart, { passive: false });
    canvas.addEventListener('touchmove', handleMove, { passive: false });
    canvas.addEventListener('touchend', handleEnd);

    return () => {
      canvas.removeEventListener('mousedown', handleStart);
      canvas.removeEventListener('mousemove', handleMove);
      canvas.removeEventListener('mouseup', handleEnd);
      canvas.removeEventListener('mouseleave', handleEnd);
      
      canvas.removeEventListener('touchstart', handleStart);
      canvas.removeEventListener('touchmove', handleMove);
      canvas.removeEventListener('touchend', handleEnd);
    };
  }, [isScratched]);

  return (
    <motion.div 
      ref={containerRef}
      initial={{ opacity: 0, y: 30, scale: 0.95 }}
      animate={isInView ? { opacity: 1, y: 0, scale: 1 } : { opacity: 0 }}
      transition={{ duration: 1, delay, ease: [0.16, 1, 0.3, 1] }}
      whileHover={{ y: -5, scale: 1.02 }}
      className="relative inline-block m-2 transition-transform duration-300 group"
    >
      <div className="absolute inset-0 bg-paper border border-ink/20 flex flex-col items-center justify-center p-2 rounded-sm shadow-xl overflow-hidden group-hover:shadow-2xl transition-shadow duration-500">
         {imgSrc && (
           <div className="w-full h-[60px] md:h-[80px] mb-2 overflow-hidden rounded-sm relative">
             <img src={imgSrc} alt="Reveal" loading="lazy" decoding="async" className={`w-full h-full object-cover mix-blend-multiply transition-all duration-1000 ${isScratched ? 'opacity-90 scale-110' : 'opacity-40 scale-100'}`} referrerPolicy="no-referrer" />
           </div>
         )}
         <p className="font-serif italic text-xs md:text-sm text-ink text-center leading-tight">"{content}"</p>
      </div>
      <canvas 
        ref={canvasRef}
        width={300}
        height={150}
        className={`relative z-10 rounded-sm cursor-crosshair transition-all duration-1000 ${isScratched ? 'opacity-0 scale-105 pointer-events-none' : 'opacity-100 scale-100 shadow-[2px_2px_15px_rgba(0,0,0,0.6)] hover:shadow-[4px_4px_20px_rgba(0,0,0,0.8)]'}`}
      />
    </motion.div>
  );
}

const messages = [
  { text: "May every good thing find its way to you without needing to be asked.", img: "/hidden/hidden_bg1.jpg" },
  { text: "May your favorite matcha always taste just right — never too bitter, never too sweet.", img: "/hidden/hidden_bg2.jpg" },
  { text: "May every history book you read take you to worlds you have never seen.", img: "/hidden/hidden_bg3.jpg" },
  { text: "May every language you want to learn become a doorway to a bigger dream.", img: "/hidden/hidden_bg4.jpg" },
  { text: "May this new year of your life surround you with things that make you feel loved.", img: "/hidden/hidden_bg5.jpg" },
  { text: "And when life feels heavy, may there always be someone reminding you how precious you are.", img: "/hidden/hidden_bg6.jpg" }
];

export default function ScratchCards() {
  return (
    <motion.section 
      initial={{ y: 80, opacity: 0, filter: 'blur(5px)' }}
      whileInView={{ y: 0, opacity: 1, filter: 'blur(0px)' }}
      viewport={{ once: true, margin: "-10%" }}
      transition={{ duration: 1.5, ease: [0.16, 1, 0.3, 1] }}
      className="text-center my-32 relative"
    >
      <motion.div 
        initial={{ y: 20, opacity: 0 }}
        whileInView={{ y: 0, opacity: 1 }}
        transition={{ duration: 1, delay: 0.2 }}
        className="text-burgundy text-xs uppercase tracking-[0.2em] mb-4 font-sans font-bold"
      >
        Hidden Thoughts
      </motion.div>
      <motion.h3 
        initial={{ y: 20, opacity: 0 }}
        whileInView={{ y: 0, opacity: 1 }}
        transition={{ duration: 1, delay: 0.3 }}
        className="font-display text-4xl text-paper italic mb-4"
      >
        Underneath the Surface
      </motion.h3>
      <motion.p 
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 1.5, delay: 0.5 }}
        className="font-serif text-sm text-paper/60 mb-12 flex items-center justify-center gap-3"
      >
        <motion.span 
          animate={{ x: [-5, 5, -5] }}
          transition={{ duration: 2, repeat: Infinity }}
          className="inline-block"
        >
          👆
        </motion.span>
        Use your finger or mouse to uncover the messages beneath
      </motion.p>
      
      <div className="flex flex-wrap justify-center gap-6 max-w-5xl mx-auto px-4">
        {messages.map((msg, i) => (
           <ScratchCardItem key={i} content={msg.text} imgSrc={msg.img} delay={0.6 + i * 0.15} />
        ))}
      </div>
    </motion.section>
  );
}
