// src/components/screens/PracticeConfigScreen.tsx
'use client';
import { useState, useEffect } from 'react';
import type { Mode } from '@/lib/types';
import { validateTimerInput } from '@/lib/security';
import { useSound } from '@/contexts/SoundContext';

interface PracticeConfig {
  digits1: number[];
  digits2: number[];
  timer?: number;
}

interface PracticeConfigScreenProps {
  onStart: (mode: Mode, config: PracticeConfig) => void;
}

const TIMER_STORAGE_KEY = 'math-tools-timer-practice';

export default function PracticeConfigScreen({
  onStart,
}: PracticeConfigScreenProps) {
  const { play } = useSound();
  const [digits1, setDigits1] = useState<number[]>([]);
  const [digits2, setDigits2] = useState<number[]>([]);
  const [timer, setTimer] = useState<number | undefined>(10);
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

  const handleSelectionChange = () => {
    if (configError) setConfigError('');
  };

  const handleDigitSelection = (
    group: 'digits1' | 'digits2',
    digit: number
  ) => {
    const currentSelection = group === 'digits1' ? digits1 : digits2;
    const setter = group === 'digits1' ? setDigits1 : setDigits2;
    
    const newSelection = currentSelection.includes(digit)
      ? currentSelection.filter((d) => d !== digit)
      : [...currentSelection, digit];
    setter(newSelection);
    handleSelectionChange();
  };

  const handleTimerChange = (value: string) => {
    const timerValue = validateTimerInput(value);
    setTimer(timerValue);
    try {
      localStorage.setItem(TIMER_STORAGE_KEY, JSON.stringify(timerValue));
    } catch (error) {
      console.error('Failed to save timer to localStorage', error);
    }
  };

  const handleStartClick = () => {
    if (digits1.length > 0 && digits2.length > 0) {
      setConfigError('');
      onStart('practice', { digits1, digits2, timer });
    } else {
      setConfigError('Please select digit count for both numbers.');
    }
  };

  return (
    <div id="practice-config-screen" className="screen-container">
        {/* Header */}
        <div className="flex-shrink-0 px-6 py-6 pb-2">
            <p className="body-medium mt-1">Configure your challenge</p>
        </div>

        {/* Content */}
        <div className="screen-content overflow-y-auto no-scrollbar flex flex-col gap-6">

             {/* Section 1 */}
             <div className="app-card !p-4">
                 <h3 className="text-slate-700 font-bold mb-3">Digits in 1st Number</h3>
                 <div className="flex flex-wrap gap-2">
                    {[2, 3, 4, 5].map((digit) => (
                        <button
                            key={`d1-${digit}`}
                            aria-pressed={digits1.includes(digit)}
                            onClick={() => { play('click'); handleDigitSelection('digits1', digit); }}
                            className={`choice-chip btn-push ${digits1.includes(digit) ? 'selected' : ''}`}
                        >
                            {digits1.includes(digit) && <span className="material-symbols-outlined text-lg" aria-hidden="true">check</span>}
                            <span>{digit} Digits</span>
                        </button>
                    ))}
                 </div>
             </div>

             {/* Section 2 */}
             <div className="app-card !p-4">
                 <h3 className="text-slate-700 font-bold mb-3">Digits in 2nd Number</h3>
                 <div className="flex flex-wrap gap-2">
                    {[2, 3, 4, 5].map((digit) => (
                        <button
                            key={`d2-${digit}`}
                            aria-pressed={digits2.includes(digit)}
                            onClick={() => { play('click'); handleDigitSelection('digits2', digit); }}
                            className={`choice-chip btn-push ${digits2.includes(digit) ? 'selected' : ''}`}
                        >
                            {digits2.includes(digit) && <span className="material-symbols-outlined text-lg" aria-hidden="true">check</span>}
                            <span>{digit} Digits</span>
                        </button>
                    ))}
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
                    <p id="timer-label-practice" className="font-bold text-slate-700 text-sm">Timer (seconds)</p>
                    <p className="text-xs text-slate-400">0 for no timer</p>
                </div>
                <input
                    aria-labelledby="timer-label-practice"
                    title="Timer duration in seconds"
                    type="number"
                    value={timer === undefined ? '' : timer}
                    onChange={(e) => handleTimerChange(e.target.value)}
                    className="w-16 h-10 bg-white border-2 border-slate-200 rounded-xl text-center font-bold text-slate-700 outline-none focus:border-primary"
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
                className={`w-full filled-button ${digits1.length > 0 && digits2.length > 0 ? '' : 'opacity-50 grayscale'}`}
             >
                START
             </button>
        </div>
    </div>
  );
}
