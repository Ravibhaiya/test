// src/components/screens/TableSelectionScreen.tsx
'use client';
import { useState, useEffect } from 'react';
import type { Mode } from '@/lib/types';
import { validateTimerInput } from '@/lib/security';
import { useSound } from '@/contexts/SoundContext';

interface TableConfig {
  selected: number[];
  timer?: number;
}
interface TableSelectionScreenProps {
  onStart: (mode: Mode, config: TableConfig) => void;
}

const TIMER_STORAGE_KEY = 'math-tools-timer-tables';

export default function TableSelectionScreen({
  onStart,
}: TableSelectionScreenProps) {
  const { play } = useSound();
  const [selected, setSelected] = useState<number[]>([]);
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

  const handleTableSelection = (table: number) => {
    const newSelection = selected.includes(table)
      ? selected.filter((n) => n !== table)
      : [...selected, table];
    setSelected(newSelection);
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
    if (selected.length > 0) {
      setConfigError('');
      onStart('tables', { selected, timer });
    } else {
      setConfigError(
        'Please select at least one table'
      );
    }
  };

  return (
    <div id="table-selection-screen" className="screen-container">
        {/* Header */}
        <div className="flex-shrink-0 px-6 py-6 pb-2">
            <p className="body-medium mt-1">Select numbers to practice</p>
        </div>

        {/* Content */}
        <div className="screen-content no-scrollbar pb-8">
             {/* Batch Actions */}
             <div className="flex justify-end mb-4">
                 <button
                    onClick={() => {
                        play('click');
                        if (selected.length === 29) {
                            setSelected([]);
                        } else {
                            setSelected(Array.from({ length: 29 }, (_, i) => i + 2));
                        }
                        handleSelectionChange();
                    }}
                    className={`choice-chip btn-push ${selected.length === 29 ? 'selected' : ''}`}
                 >
                    {selected.length === 29 ? (
                        <>
                            <span className="material-symbols-outlined text-lg">close</span>
                            Clear
                        </>
                    ) : (
                        <>
                            <span className="material-symbols-outlined text-lg">done_all</span>
                            Select All
                        </>
                    )}
                 </button>
             </div>

             <div className="grid grid-cols-4 sm:grid-cols-5 gap-3">
                {Array.from({ length: 29 }, (_, i) => i + 2).map((num) => (
                    <button
                        key={num}
                        aria-pressed={selected.includes(num)}
                        onClick={() => { play('click'); handleTableSelection(num); }}
                        className={`number-chip btn-push ${selected.includes(num) ? 'selected' : ''}`}
                    >
                        {num}
                    </button>
                ))}
             </div>
        </div>

        {/* Footer */}
        <div className="screen-fixed-bottom border-t border-slate-100 flex flex-col gap-4">
             {/* Timer Input - styled as a card item or simple input */}
             <div className="flex items-center gap-4 bg-slate-50 p-3 rounded-2xl border border-slate-100">
                <div className="w-10 h-10 rounded-full bg-slate-200 flex items-center justify-center text-slate-600">
                     <span className="material-symbols-outlined">timer</span>
                </div>
                <div className="flex-1">
                    <p id="timer-label-tables" className="font-bold text-slate-700 text-sm">Timer (seconds)</p>
                    <p className="text-xs text-slate-400">0 for no timer</p>
                </div>
                <input
                    aria-labelledby="timer-label-tables"
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
                className={`w-full filled-button ${selected.length > 0 ? '' : 'opacity-50 grayscale'}`}
             >
                START PRACTICE
             </button>
        </div>
    </div>
  );
}
