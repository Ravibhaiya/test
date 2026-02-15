// src/app/page.tsx
'use client';
import { useState } from 'react';
import type {
  Page,
  Mode,
  ExecutionConfig,
} from '@/lib/types';

import { useSound } from '@/contexts/SoundContext';
import SoundToggle from '@/components/SoundToggle';
import HomeScreen from '@/components/screens/HomeScreen';
import TableSelectionScreen from '@/components/screens/TableSelectionScreen';
import PracticeConfigScreen from '@/components/screens/PracticeConfigScreen';
import PowersConfigScreen from '@/components/screens/PowersConfigScreen';
import FractionsConfigScreen from '@/components/screens/FractionsConfigScreen';
import AlphabetConfigScreen from '@/components/screens/AlphabetConfigScreen';
import ExecutionScreen from '@/components/screens/ExecutionScreen';

const PAGE_TITLES: Record<Page, string> = {
  home: 'Math Tools',
  'table-selection': 'Multiplication Tables',
  'practice-config': 'Multiplication Practice',
  'powers-config': 'Powers & Roots',
  'fractions-config': 'Fractions & Decimals',
  'alphabet-config': 'Alphabet Position',
  execution: 'Practice',
};

const PREVIOUS_PAGES: Partial<Record<Mode, Page>> = {
  tables: 'table-selection',
  practice: 'practice-config',
  powers: 'powers-config',
  fractions: 'fractions-config',
  alphabet: 'alphabet-config',
};

export default function Home() {
  const { play } = useSound();
  const [page, setPage] = useState<Page>('home');
  const [mode, setMode] = useState<Mode>('');
  const [activeConfig, setActiveConfig] = useState<ExecutionConfig | null>(
    null
  );

  const handleBack = () => {
    if (page === 'execution') {
      const prevPage = PREVIOUS_PAGES[mode];
      setPage(prevPage || 'home');
    } else if (page !== 'home') {
      setPage('home');
    }
  };

  const navigateTo = (targetPage: Page) => {
    setPage(targetPage);
  };

  const startPractice = (execMode: Mode, execConfig: ExecutionConfig) => {
    setMode(execMode);
    setActiveConfig(execConfig);
    setPage('execution');
  };

  return (
    <div id="app-container" className="h-full flex flex-col overflow-hidden bg-background">
      <header
        id="top-app-bar"
        className="flex flex-row items-center px-4 bg-background/95 backdrop-blur-sm sticky top-0 z-50 h-14 flex-shrink-0"
        role="banner"
      >
         <button
          type="button"
          id="back-btn"
          aria-label="Go back"
          className="rounded-full bg-slate-200 hover:bg-slate-300 active:bg-slate-400 transition-colors flex items-center justify-center w-11 h-11 text-slate-600 relative z-10 focus-visible:ring-2 focus-visible:ring-slate-400 focus-visible:outline-none focus:outline-none"
          onClick={() => { play('click'); handleBack(); }}
          style={{ display: page === 'home' ? 'none' : 'inline-flex' }}
        >
          <span className="material-symbols-outlined" aria-hidden="true">
            arrow_back
          </span>
        </button>
        <h1
          id="app-title"
          className={`title-large text-gray-800 flex-1 pointer-events-none ${
            page !== 'home'
              ? 'text-center absolute left-0 right-0 mx-0 px-16'
              : 'mx-12 relative flex-auto text-left pointer-events-auto'
          }`}
        >
          {PAGE_TITLES[page]}
        </h1>

        <div className="relative z-10 flex items-center justify-center w-11 h-11">
             {page === 'home' && <SoundToggle />}
        </div>
      </header>

      <main className="flex-1 w-full overflow-hidden relative flex flex-col" role="main">
        {page === 'home' && <HomeScreen navigateTo={navigateTo} />}
        {page === 'table-selection' && (
          <TableSelectionScreen onStart={startPractice} />
        )}
        {page === 'practice-config' && (
          <PracticeConfigScreen onStart={startPractice} />
        )}
        {page === 'powers-config' && (
          <PowersConfigScreen onStart={startPractice} />
        )}
        {page === 'fractions-config' && (
          <FractionsConfigScreen onStart={startPractice} />
        )}
        {page === 'alphabet-config' && (
          <AlphabetConfigScreen onStart={startPractice} />
        )}
        {page === 'execution' && mode && activeConfig && (
          <ExecutionScreen mode={mode} config={activeConfig} />
        )}
      </main>
    </div>
  );
}
