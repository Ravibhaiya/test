'use client';

import React from 'react';
import { useSound } from '@/contexts/SoundContext';

export default function SoundToggle() {
  const { muted, toggleMute } = useSound();

  return (
    <button
      onClick={toggleMute}
      className={`
        w-10 h-10 flex items-center justify-center rounded-2xl transition-all duration-200
        focus:outline-none focus:ring-2 focus:ring-purple-300
        ${muted
            ? 'bg-slate-100 text-slate-400 hover:bg-slate-200'
            : 'bg-purple-100 text-purple-600 hover:bg-purple-200 hover:scale-105 active:scale-95 shadow-sm'
        }
      `}
      aria-label={muted ? "Unmute sounds" : "Mute sounds"}
      title={muted ? "Unmute sounds" : "Mute sounds"}
    >
      <span className="material-symbols-outlined" aria-hidden="true">
        {muted ? 'volume_off' : 'volume_up'}
      </span>
    </button>
  );
}
