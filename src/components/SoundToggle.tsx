'use client';

import React from 'react';
import { useSound } from '@/contexts/SoundContext';

export default function SoundToggle() {
  const { muted, toggleMute } = useSound();

  return (
    <button
      onClick={toggleMute}
      className="w-11 h-11 flex items-center justify-center rounded-2xl transition-transform active:scale-95 focus:outline-none hover:bg-slate-50"
      aria-label={muted ? "Unmute sounds" : "Mute sounds"}
      title={muted ? "Unmute sounds" : "Mute sounds"}
    >
      <svg
        width="36"
        height="36"
        viewBox="0 0 36 36"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="transition-all duration-300"
      >
        {/* Speaker Body - Juicy Orange/Yellow Gradient */}
        <defs>
          <linearGradient id="speakerGradient" x1="0" y1="0" x2="36" y2="36" gradientUnits="userSpaceOnUse">
            <stop stopColor="#FFC107" /> {/* Amber/Gold */}
            <stop offset="1" stopColor="#FF9800" /> {/* Orange */}
          </linearGradient>
           <linearGradient id="speakerFaceGradient" x1="0" y1="0" x2="14" y2="0" gradientUnits="userSpaceOnUse">
            <stop stopColor="#FFD54F" /> {/* Lighter Gold */}
            <stop offset="1" stopColor="#FFB300" /> {/* Gold */}
          </linearGradient>
        </defs>

        {/* Back Box of Speaker */}
        <rect x="4" y="12" width="10" height="12" rx="3" fill="url(#speakerFaceGradient)" stroke="#F57F17" strokeWidth="1" />

        {/* Cone of Speaker */}
        <path
            d="M13 13.5L22.5 7.5C23.6 6.8 25 7.6 25 8.9V27.1C25 28.4 23.6 29.2 22.5 28.5L13 22.5"
            fill="url(#speakerGradient)"
            stroke="#E65100"
            strokeWidth="1"
            strokeLinejoin="round"
        />

        {/* Sound Waves - Juicy Green (Only visible when not muted) */}
        {!muted && (
            <>
                {/* Small Wave */}
                <path
                    d="M28 14C29.1 15.1 29.8 16.5 29.8 18C29.8 19.5 29.1 20.9 28 22"
                    stroke="#4ADE80"
                    strokeWidth="3"
                    strokeLinecap="round"
                />

                {/* Medium Wave */}
                <path
                    d="M31.5 10.5C33.7 12.5 35 15.1 35 18C35 20.9 33.7 23.5 31.5 25.5"
                    stroke="#22C55E"
                    strokeWidth="3"
                    strokeLinecap="round"
                />
            </>
        )}

        {/* Muted Cross (Only visible when muted) */}
        {muted && (
             <path
                d="M28 12L34 24M34 12L28 24"
                stroke="#EF4444"
                strokeWidth="3"
                strokeLinecap="round"
            />
        )}
      </svg>
    </button>
  );
}
