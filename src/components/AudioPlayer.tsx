import { useEffect, useRef } from 'react';
import { Volume2, VolumeX } from 'lucide-react';
import { Stage } from '../App';

interface AudioPlayerProps {
  stage: Stage;
  userInteracted: boolean;
  setUserInteracted: (val: boolean) => void;
  isPlaying: boolean;
  setIsPlaying: (val: boolean) => void;
}

export default function AudioPlayer({ stage, userInteracted, setUserInteracted, isPlaying, setIsPlaying }: AudioPlayerProps) {
  const introAudioRef = useRef<HTMLAudioElement | null>(null);
  const mainAudioRef = useRef<HTMLAudioElement | null>(null);

  useEffect(() => {
    introAudioRef.current = new Audio('/audio/intro.mp3');
    introAudioRef.current.loop = true;
    introAudioRef.current.preload = 'auto';
    
    mainAudioRef.current = new Audio('/audio/main.mp3');
    mainAudioRef.current.loop = true;
    mainAudioRef.current.preload = 'none';

    return () => {
      introAudioRef.current?.pause();
      mainAudioRef.current?.pause();
    };
  }, []);

  const fadeOut = (audio: HTMLAudioElement, callback?: () => void) => {
    let vol = audio.volume;
    const interval = setInterval(() => {
      if (vol > 0.05) {
        vol -= 0.05;
        audio.volume = vol;
      } else {
        audio.pause();
        audio.volume = 1;
        clearInterval(interval);
        callback?.();
      }
    }, 100);
  };

  const fadeIn = (audio: HTMLAudioElement) => {
    audio.volume = 0;
    const playPromise = audio.play();
    if (playPromise !== undefined) {
      playPromise.catch(e => console.log('Audio playback blocked or file empty:', e));
    }
    let vol = 0;
    const interval = setInterval(() => {
      if (vol < 0.95) {
        vol += 0.05;
        audio.volume = vol;
      } else {
        audio.volume = 1;
        clearInterval(interval);
      }
    }, 100);
  };

  useEffect(() => {
    if (!userInteracted || !isPlaying) return;

    if (stage === 'envelope' || stage === 'landing') {
      if (introAudioRef.current && introAudioRef.current.paused) {
        fadeIn(introAudioRef.current);
      }
      if (mainAudioRef.current && !mainAudioRef.current.paused) {
        fadeOut(mainAudioRef.current);
      }
    } else if (stage === 'scrapbook') {
        if (introAudioRef.current && !introAudioRef.current.paused) {
          fadeOut(introAudioRef.current);
        }
        if (mainAudioRef.current && mainAudioRef.current.paused) {
          fadeIn(mainAudioRef.current);
        }
    }
  }, [stage, userInteracted, isPlaying]);

  if (!userInteracted) {
    return null; // Let the envelope handle initial gesture without blocking screen overlay
  }

  return (
    <button
      onClick={() => {
        const nextPlaying = !isPlaying;
        setIsPlaying(nextPlaying);
        if (!nextPlaying) {
           introAudioRef.current?.pause();
           mainAudioRef.current?.pause();
        } else {
            if (stage === 'envelope' || stage === 'landing') {
                introAudioRef.current!.volume = 1;
                const p = introAudioRef.current?.play();
                if (p !== undefined) p.catch(e => console.log('Playback error:', e));
            }
            if (stage === 'scrapbook') {
                mainAudioRef.current!.volume = 1;
                const p = mainAudioRef.current?.play();
                if (p !== undefined) p.catch(e => console.log('Playback error:', e));
            }
        }
      }}
      className="fixed bottom-6 right-6 z-50 p-4 bg-burgundy/80 backdrop-blur-sm border border-paper/10 text-paper rounded-full shadow-lg hover:scale-105 transition-all text-xs flex items-center justify-center"
      aria-label="Toggle Music"
    >
      {isPlaying ? <Volume2 size={20} /> : <VolumeX size={20} />}
    </button>
  );
}
