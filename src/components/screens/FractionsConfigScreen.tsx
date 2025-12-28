// src/components/screens/FractionsConfigScreen.tsx
'use client';
import { useState, useEffect } from 'react';
import type { Mode, FractionAnswerType } from '@/lib/types';
import PunchedButton from '@/components/PunchedButton';

interface FractionsConfig {
  selected: FractionAnswerType[];
  timer?: number;
}

interface FractionsConfigScreenProps {
  onStart: (mode: Mode, config: FractionsConfig) => void;
}

const TIMER_STORAGE_KEY = 'math-tools-timer-fractions';

export default function FractionsConfigScreen({
  onStart,
}: FractionsConfigScreenProps) {
  const [selected, setSelected] = useState<FractionAnswerType[]>([]);
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

  const handleTypeSelection = (answerType: FractionAnswerType) => {
    const newSelection = selected.includes(answerType)
      ? selected.filter((t) => t !== answerType)
      : [...selected, answerType];
    setSelected(newSelection);
    handleSelectionChange();
  };

  const handleTimerChange = (value: string) => {
    const timerValue =
      value === '' || parseInt(value, 10) === 0
        ? undefined
        : parseInt(value, 10);
    setTimer(timerValue);
    try {
      localStorage.setItem(TIMER_STORAGE_KEY, JSON.stringify(timerValue));
    } catch (error) {
      console.error('Failed to save timer to localStorage', error);
    }
  };

  const handleStartClick = () => {
    if (selected.length > 0) {
      setConfigError('');
      onStart('fractions', { selected, timer });
    } else {
      setConfigError(
        'Please select at least one answer type.'
      );
    }
  };

  return (
    <div id="fractions-config-screen" className="screen-container">
        {/* Header */}
        <div className="flex-shrink-0 px-6 py-6 pb-2">
            <p className="body-medium mt-1">Conversions practice</p>
        </div>

        {/* Content */}
        <div className="screen-content no-scrollbar flex flex-col gap-6">

             {/* Section 1 */}
             <div className="app-card !p-4">
                 <h3 className="text-slate-700 font-bold mb-3">Answer Format</h3>
                 <div className="flex flex-wrap gap-2">
                    {(['fraction', 'decimal'] as FractionAnswerType[]).map((type) => (
                        <button
                            key={type}
                            onClick={() => handleTypeSelection(type)}
                            className={`choice-chip btn-push ${selected.includes(type) ? 'selected' : ''}`}
                        >
                            {selected.includes(type) && <span className="material-symbols-outlined text-lg">check</span>}
                            <span>{type === 'fraction' ? 'Fraction' : 'Decimal'}</span>
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
                    <p className="font-bold text-slate-700 text-sm">Timer (seconds)</p>
                    <p className="text-xs text-slate-400">0 for no timer</p>
                </div>
                <input
                    type="number"
                    value={timer === undefined ? '' : timer}
                    onChange={(e) => handleTimerChange(e.target.value)}
                    className="w-16 h-10 bg-white border-2 border-slate-200 rounded-xl text-center font-bold text-slate-700 outline-none focus:border-primary"
                    placeholder="∞"
                />
             </div>

             {configError && (
                 <div className="text-center text-red-500 font-bold text-sm bg-red-50 py-2 rounded-xl border border-red-100">
                     {configError}
                 </div>
             )}

             <PunchedButton
                onClick={handleStartClick}
                wrapperClassName="w-full h-16"
                className="text-xl"
                variant="primary"
             >
                START PRACTICE
             </PunchedButton>
        </div>
    </div>
  );
}
