// src/components/screens/HomeScreen.tsx
'use client';
import type { Page } from '@/lib/types';
import { useRipple } from '@/hooks/useRipple';

interface HomeScreenProps {
  navigateTo: (page: Page) => void;
}

export default function HomeScreen({ navigateTo }: HomeScreenProps) {
  const createRipple = useRipple();
  return (
    <div id="home-screen" className="screen active">
      <div className="grid grid-cols-1 gap-6">
        <button
          onClick={() => navigateTo('table-selection')}
          className="app-card ripple-surface group"
          onMouseDown={createRipple}
        >
          <div className="flex items-center gap-6">
            <div className="flex-shrink-0 flex items-center justify-center w-16 h-16 rounded-2xl bg-purple-100 border-2 border-black shadow-[2px_2px_0_0_black]">
              <span className="material-symbols-outlined text-purple-600 text-3xl">
                close
              </span>
            </div>
            <div className="text-left">
              <p className="title-medium text-xl mb-1">Multiplication Tables</p>
              <p className="body-medium text-gray-600">
                Practice your times tables
              </p>
            </div>
          </div>
        </button>
        <button
          onClick={() => navigateTo('practice-config')}
          className="app-card ripple-surface group"
          onMouseDown={createRipple}
        >
          <div className="flex items-center gap-6">
            <div className="flex-shrink-0 flex items-center justify-center w-16 h-16 rounded-2xl bg-cyan-100 border-2 border-black shadow-[2px_2px_0_0_black]">
              <span className="material-symbols-outlined text-cyan-700 text-3xl">
                calculate
              </span>
            </div>
            <div className="text-left">
              <p className="title-medium text-xl mb-1">Multiplication Practice</p>
              <p className="body-medium text-gray-600">
                Solve multi-digit problems
              </p>
            </div>
          </div>
        </button>
        <button
          onClick={() => navigateTo('powers-config')}
          className="app-card ripple-surface group"
          onMouseDown={createRipple}
        >
          <div className="flex items-center gap-6">
            <div className="flex-shrink-0 flex items-center justify-center w-16 h-16 rounded-2xl bg-green-100 border-2 border-black shadow-[2px_2px_0_0_black]">
              <span className="material-symbols-outlined text-green-700 text-3xl">
                superscript
              </span>
            </div>
            <div className="text-left">
              <p className="title-medium text-xl mb-1">Powers &amp; Roots</p>
              <p className="body-medium text-gray-600">
                Practice squares, cubes, and roots
              </p>
            </div>
          </div>
        </button>
        <button
          onClick={() => navigateTo('fractions-config')}
          className="app-card ripple-surface group"
          onMouseDown={createRipple}
        >
          <div className="flex items-center gap-6">
            <div className="flex-shrink-0 flex items-center justify-center w-16 h-16 rounded-2xl bg-red-100 border-2 border-black shadow-[2px_2px_0_0_black]">
              <span className="material-symbols-outlined text-red-600 text-3xl">
                percent
              </span>
            </div>
            <div className="text-left">
              <p className="title-medium text-xl mb-1">Fractions &amp; Decimals</p>
              <p className="body-medium text-gray-600">
                Convert between fractions and percentages
              </p>
            </div>
          </div>
        </button>
      </div>
    </div>
  );
}
