'use client';

import React from 'react';
import { useSound } from '@/contexts/SoundContext';

export default function SoundToggle() {
  const { muted, toggleMute } = useSound();

  return (
    <button
      onClick={toggleMute}
      className="w-10 h-10 flex items-center justify-center rounded-full bg-slate-100 hover:bg-slate-200 text-slate-600 transition-colors focus:outline-none focus:ring-2 focus:ring-slate-300"
      aria-label={muted ? "Unmute sounds" : "Mute sounds"}
      title={muted ? "Unmute sounds" : "Mute sounds"}
    >
      <span className="material-symbols-outlined" aria-hidden="true">
        {muted ? 'volume_off' : 'volume_up'}
      </span>
    </button>
  );
}
