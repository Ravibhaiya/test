// src/components/screens/PowersConfigScreen.tsx
'use client';
import { useState, useEffect, useRef } from 'react';
import type { Mode, PowerType } from '@/lib/types';
import PunchedButton from '@/components/PunchedButton';

interface PowersConfig {
  selected: PowerType[];
  rangeMax: number;
  timer?: number;
}

interface PowersConfigScreenProps {
  onStart: (mode: Mode, config: PowersConfig) => void;
}

const TIMER_STORAGE_KEY = 'math-tools-timer-powers';

export default function PowersConfigScreen({ onStart }: PowersConfigScreenProps) {
  const [selected, setSelected] = useState<PowerType[]>([]);
  const [rangeMax, setRangeMax] = useState(30);
  const [timer, setTimer] = useState<number | undefined>(10);
  const [configError, setConfigError] = useState('');

  const sliderRef = useRef<HTMLInputElement>(null);

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

  const handlePowerSelection = (powerType: PowerType) => {
    const newSelection = selected.includes(powerType)
      ? selected.filter((p) => p !== powerType)
      : [...selected, powerType];
    setSelected(newSelection);
    handleSelectionChange();
  };

  const handleSliderChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = parseInt(e.target.value);
    setRangeMax(value);
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
      onStart('powers', { selected, rangeMax, timer });
    } else {
      setConfigError(
        'Please select at least one practice type.'
      );
    }
  };

  const hasCubeSelection =
    selected.includes('cubes') || selected.includes('cube_roots');
  const isPowerRangeAbove20 = rangeMax > 20;

  return (
    <div id="powers-config-screen" className="screen-container">
        {/* Header */}
        <div className="flex-shrink-0 px-6 py-6 pb-2">
            <p className="body-medium mt-1">Squares, cubes, and more</p>
        </div>

        {/* Content */}
        <div className="screen-content no-scrollbar flex flex-col gap-6">

             {/* Section 1: Types */}
             <div className="app-card !p-4">
                 <h3 className="text-slate-700 font-bold mb-3">Practice Types</h3>
                 <div className="flex flex-wrap gap-2">
                    {(['squares', 'cubes', 'square_roots', 'cube_roots'] as PowerType[]).map((type) => (
                        <button
                            key={type}
                            onClick={() => handlePowerSelection(type)}
                            className={`choice-chip btn-push ${selected.includes(type) ? 'selected' : ''}`}
                        >
                            {selected.includes(type) && <span className="material-symbols-outlined text-lg">check</span>}
                            <span>
                              {
                                {
                                  squares: 'Squares (x²)',
                                  cubes: 'Cubes (x³)',
                                  square_roots: 'Square Roots (√x)',
                                  cube_roots: 'Cube Roots (³√x)',
                                }[type]
                              }
                            </span>
                        </button>
                    ))}
                 </div>
             </div>

             {/* Section 2: Range */}
             <div className="app-card !p-4">
                 <div className="flex justify-between items-center mb-4">
                     <h3 className="text-slate-700 font-bold">Max Number</h3>
                     <span className="bg-primary text-white font-bold px-3 py-1 rounded-lg">
                        {rangeMax}
                     </span>
                 </div>

                 <input
                    type="range"
                    min="2"
                    max="30"
                    value={rangeMax}
                    onChange={handleSliderChange}
                    className="w-full h-2 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-primary"
                 />
                 <div className="flex justify-between mt-2 text-xs font-bold text-slate-400">
                    <span>2</span>
                    <span>30</span>
                 </div>

                 {(hasCubeSelection && isPowerRangeAbove20) && (
                     <div className="mt-4 p-3 bg-yellow-50 rounded-xl border border-yellow-100 flex gap-2">
                         <span className="material-symbols-outlined text-yellow-600">info</span>
                         <p className="text-xs text-yellow-800 font-semibold">
                            Cube/Root questions limited to 20 max to avoid huge numbers.
                         </p>
                     </div>
                 )}
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
