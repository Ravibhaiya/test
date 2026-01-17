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
  const clickSoundRef = useRef<Howl | null>(null);
  const typeSoundRef = useRef<Howl | null>(null);

  useEffect(() => {
    // Initialize mute state from local storage
    const savedMuted = localStorage.getItem('math-tools-muted');
    if (savedMuted !== null) {
      setMuted(savedMuted === 'true');
    }

    // Initialize sounds
    clickSoundRef.current = new Howl({
      src: ['/sounds/click.wav'],
      volume: 0.5,
      preload: true,
    });

    typeSoundRef.current = new Howl({
      src: ['/sounds/type.wav'],
      volume: 0.4,
      preload: true,
    });

    setLoaded(true);

    return () => {
        clickSoundRef.current?.unload();
        typeSoundRef.current?.unload();
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

    const click = clickSoundRef.current;
    const typeSnd = typeSoundRef.current;

    switch (type) {
      case 'click':
        click?.rate(1.0);
        click?.play();
        break;
      case 'type':
        typeSnd?.rate(1.0 + Math.random() * 0.2 - 0.1); // Slight variation
        typeSnd?.play();
        break;
      case 'correct':
        // Ascending triad sequence
        if (click) {
            click.rate(1.0);
            const id1 = click.play();

            setTimeout(() => {
                click.rate(1.25); // Major third
                click.play();
            }, 100);

            setTimeout(() => {
                click.rate(1.5); // Fifth
                click.play();
            }, 200);
        }
        break;
      case 'wrong':
        // Low pitched thud sequence
        if (typeSnd) {
             typeSnd.rate(0.5);
             typeSnd.play();
             setTimeout(() => {
                 typeSnd.rate(0.4);
                 typeSnd.play();
             }, 150);
        }
        break;
      case 'timeup':
        // Fast ticking alarm
        if (click) {
            for(let i=0; i<3; i++) {
                setTimeout(() => {
                    click.rate(2.0);
                    click.play();
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
