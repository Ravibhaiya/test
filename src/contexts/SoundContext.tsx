'use client';

import React, { createContext, useContext, useState, useEffect, useCallback, useRef } from 'react';
import { Howl, Howler } from 'howler';

type SoundType = 'click' | 'type' | 'correct' | 'wrong' | 'timeup';

interface SoundContextType {
  play: (type: SoundType) => void;
  muted: boolean;
  toggleMute: () => void;
}

const SoundContext = createContext<SoundContextType | undefined>(undefined);

export function SoundProvider({ children }: { children: React.ReactNode }) {
  const [muted, setMuted] = useState(false);
  const [loaded, setLoaded] = useState(false);

  // Refs for Howl instances to persist across renders without re-initializing
  const buttonSoundRef = useRef<Howl | null>(null);
  const correctSoundRef = useRef<Howl | null>(null);
  const wrongSoundRef = useRef<Howl | null>(null);

  useEffect(() => {
    // Initialize mute state from local storage
    const savedMuted = localStorage.getItem('math-tools-muted');
    if (savedMuted !== null) {
      setMuted(savedMuted === 'true');
    }

    // Initialize sounds
    buttonSoundRef.current = new Howl({
      src: ['/sounds/button.wav'],
      volume: 0.5,
      preload: true,
    });

    correctSoundRef.current = new Howl({
      src: ['/sounds/correct.wav'],
      volume: 0.5,
      preload: true,
    });

    wrongSoundRef.current = new Howl({
      src: ['/sounds/wrong.wav'],
      volume: 0.5,
      preload: true,
    });

    setLoaded(true);

    return () => {
        buttonSoundRef.current?.unload();
        correctSoundRef.current?.unload();
        wrongSoundRef.current?.unload();
    };
  }, []);

  useEffect(() => {
    // Update global mute state
    Howler.mute(muted);
    localStorage.setItem('math-tools-muted', String(muted));
  }, [muted]);

  const toggleMute = useCallback(() => {
    setMuted((prev) => !prev);
  }, []);

  const play = useCallback((type: SoundType) => {
    if (!loaded) return;

    // We check muted here just in case, though Howler.mute handles it globally.
    // However, for sequences, we might want to skip logic if muted.
    if (muted) return;

    const button = buttonSoundRef.current;
    const correct = correctSoundRef.current;
    const wrong = wrongSoundRef.current;

    switch (type) {
      case 'click':
        button?.rate(1.0);
        button?.play();
        break;
      case 'type':
        // Use button sound with variation
        button?.rate(1.0 + Math.random() * 0.2 - 0.1);
        button?.play();
        break;
      case 'correct':
        correct?.rate(1.0);
        correct?.play();
        break;
      case 'wrong':
        wrong?.rate(1.0);
        wrong?.play();
        break;
      case 'timeup':
        // Fast ticking using button sound
        if (button) {
            for(let i=0; i<3; i++) {
                setTimeout(() => {
                    button.rate(2.0);
                    button.play();
                }, i * 150);
            }
        }
        break;
    }
  }, [loaded, muted]);

  return (
    <SoundContext.Provider value={{ play, muted, toggleMute }}>
      {children}
    </SoundContext.Provider>
  );
}

export function useSound() {
  const context = useContext(SoundContext);
  if (context === undefined) {
    throw new Error('useSound must be used within a SoundProvider');
  }
  return context;
}
