// src/components/screens/AlphabetConfigScreen.tsx
'use client';
import { useState, useEffect } from 'react';
import type { Mode } from '@/lib/types';
import { validateTimerInput } from '@/lib/security';
import { useSound } from '@/contexts/SoundContext';

interface AlphabetConfig {
  start: string;
  end: string;
  timer?: number;
}

interface AlphabetConfigScreenProps {
  onStart: (mode: Mode, config: AlphabetConfig) => void;
}

const TIMER_STORAGE_KEY = 'math-tools-timer-alphabet';

export default function AlphabetConfigScreen({
  onStart,
}: AlphabetConfigScreenProps) {
  const { play } = useSound();
  const [startLetter, setStartLetter] = useState('A');
  const [endLetter, setEndLetter] = useState('Z');
  const [timer, setTimer] = useState<number | undefined>(undefined);
  const [configError, setConfigError] = useState('');

  useEffect(() => {
    try {
      const storedTimer = localStorage.getItem(TIMER_STORAGE_KEY);
      if (storedTimer !== null) {
        setTimer(JSON.parse(storedTimer));
      }
    } catch (error) {
      console.error('Failed to read timer from localStorage', error);
    }
  }, []);

  const handleTimerChange = (value: string) => {
    const timerValue = validateTimerInput(value);
    setTimer(timerValue);
    try {
      localStorage.setItem(TIMER_STORAGE_KEY, JSON.stringify(timerValue));
    } catch (error) {
      console.error('Failed to save timer to localStorage', error);
    }
  };

  const handleLetterChange = (
    value: string,
    setter: (val: string) => void
  ) => {
    // Only allow letters
    const filtered = value.toUpperCase().replace(/[^A-Z]/g, '');
    // Take the last character typed to allow easy replacement
    const char = filtered.slice(-1);
    setter(char);
    setConfigError('');
  };

  const handleStartClick = () => {
    if (!startLetter || !endLetter) {
        setConfigError('Please enter both start and end letters.');
        return;
    }

    if (startLetter > endLetter) {
        setConfigError('Start letter must be before or same as End letter.');
        return;
    }

    onStart('alphabet', { start: startLetter, end: endLetter, timer });
  };

  return (
    <div id="alphabet-config-screen" className="screen-container">
        {/* Header */}
        <div className="flex-shrink-0 px-6 py-6 pb-2">
            <p className="body-medium mt-1">Configure your challenge</p>
        </div>

        {/* Content */}
        <div className="screen-content overflow-y-auto no-scrollbar flex flex-col gap-6">

             {/* Configuration Card */}
             <div className="app-card !p-6 flex flex-col gap-6">
                 <div>
                    <h3 className="text-slate-700 font-bold mb-3">Letter Range</h3>
                    <div className="flex items-center gap-4">
                        <div className="flex-1">
                            <label htmlFor="start-letter" className="block text-sm font-semibold text-slate-500 mb-1">From</label>
                            <input
                                id="start-letter"
                                type="text"
                                value={startLetter}
                                onChange={(e) => handleLetterChange(e.target.value, setStartLetter)}
                                className="w-full h-14 bg-slate-50 border-2 border-slate-200 rounded-2xl text-center text-2xl font-bold text-slate-700 focus:border-black focus:outline-none transition-colors"
                                maxLength={2} // Allow 2 to capture the second keystroke for replacement logic
                            />
                        </div>
                        <span className="material-symbols-outlined text-slate-300">arrow_forward</span>
                        <div className="flex-1">
                            <label htmlFor="end-letter" className="block text-sm font-semibold text-slate-500 mb-1">To</label>
                            <input
                                id="end-letter"
                                type="text"
                                value={endLetter}
                                onChange={(e) => handleLetterChange(e.target.value, setEndLetter)}
                                className="w-full h-14 bg-slate-50 border-2 border-slate-200 rounded-2xl text-center text-2xl font-bold text-slate-700 focus:border-black focus:outline-none transition-colors"
                                maxLength={2}
                            />
                        </div>
                    </div>
                 </div>

                 <div className="bg-amber-50 p-4 rounded-xl text-amber-800 text-sm font-medium flex gap-3">
                    <span className="material-symbols-outlined icon-filled text-amber-600">info</span>
                    <p>Identify the position of letters (e.g. A=1, Z=26).</p>
                 </div>
             </div>
        </div>

        {/* Footer */}
        <div className="screen-fixed-bottom border-t border-slate-100 flex flex-col gap-4">
             {/* Timer Input */}
             <div className="flex items-center gap-4 bg-slate-50 p-3 rounded-2xl border border-slate-100">
                <div className="w-10 h-10 rounded-full bg-slate-200 flex items-center justify-center text-slate-600">
                     <span className="material-symbols-outlined">timer</span>
                </div>
                <div className="flex-1">
                    <p id="timer-label-alphabet" className="font-bold text-slate-700 text-sm">Timer (seconds)</p>
                    <p className="text-xs text-slate-400">0 for no timer</p>
                </div>
                <input
                    aria-labelledby="timer-label-alphabet"
                    title="Timer duration in seconds"
                    type="number"
                    value={timer === undefined ? '' : timer}
                    onChange={(e) => handleTimerChange(e.target.value)}
                    className="w-16 h-10 bg-white border-2 border-slate-200 rounded-xl text-center font-bold text-slate-700 outline-none focus:border-black"
                    placeholder="∞"
                />
             </div>

             {configError && (
                 <div
                   role="alert"
                   aria-live="polite"
                   className="text-center text-red-500 font-bold text-sm bg-red-50 py-2 rounded-xl border border-red-100"
                 >
                     {configError}
                 </div>
             )}

             <button
                onClick={() => { play('click'); handleStartClick(); }}
                className={`w-full filled-button ${startLetter && endLetter ? '' : 'opacity-50 grayscale'}`}
             >
                START
             </button>
        </div>
    </div>
  );
}
