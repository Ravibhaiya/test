// src/components/screens/HomeScreen.tsx
'use client';
import type { Page } from '@/lib/types';
// Ripple is less used in "Duolingo" style (prefer push animation), but we can keep or remove.
// I'll rely on the css active states for the "push" effect.

interface HomeScreenProps {
  navigateTo: (page: Page) => void;
}

export default function HomeScreen({ navigateTo }: HomeScreenProps) {
  return (
    <div id="home-screen" className="screen-container">
        {/* Header */}
        <div className="flex-shrink-0 px-6 py-6 pb-2">
            <h1 className="display-medium text-slate-700">Practice</h1>
            <p className="body-medium mt-1">Choose a skill to improve</p>
        </div>

        {/* Content */}
        <div className="screen-content no-scrollbar pb-8">
            <div className="flex flex-col gap-4">
                {/* Card 1: Tables (Purple) */}
                <button
                    onClick={() => navigateTo('table-selection')}
                    className="w-full relative group transition-all active:scale-[0.98] rounded-3xl focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-purple-200"
                >
                     {/* Card Body */}
                    <div className="w-full bg-white border-2 border-slate-100 rounded-3xl p-4 flex items-center gap-5 shadow-soft hover:shadow-soft-md transition-all">
                        {/* Icon Box */}
                        <div className="flex-shrink-0 w-16 h-16 rounded-2xl bg-purple-100 text-purple-600 flex items-center justify-center">
                            <span className="material-symbols-outlined text-3xl" aria-hidden="true">close</span>
                        </div>

                        {/* Text */}
                        <div className="text-left flex-1">
                            <h3 className="title-medium text-slate-700">Tables</h3>
                            <p className="text-sm font-semibold text-slate-400">Multiplication tables</p>
                        </div>

                        {/* Chevron */}
                        <span className="material-symbols-outlined text-slate-300" aria-hidden="true">chevron_right</span>
                    </div>
                </button>

                {/* Card 2: Practice (Cyan) */}
                <button
                    onClick={() => navigateTo('practice-config')}
                    className="w-full relative group transition-all active:scale-[0.98] rounded-3xl focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-sky-200"
                >
                    <div className="w-full bg-white border-2 border-slate-100 rounded-3xl p-4 flex items-center gap-5 shadow-soft hover:shadow-soft-md transition-all">
                        <div className="flex-shrink-0 w-16 h-16 rounded-2xl bg-sky-100 text-sky-600 flex items-center justify-center">
                             <span className="material-symbols-outlined text-3xl" aria-hidden="true">calculate</span>
                        </div>
                        <div className="text-left flex-1">
                            <h3 className="title-medium text-slate-700">Multiply</h3>
                            <p className="text-sm font-semibold text-slate-400">Multi-digit problems</p>
                        </div>
                        <span className="material-symbols-outlined text-slate-300" aria-hidden="true">chevron_right</span>
                    </div>
                </button>

                {/* Card 3: Powers (Green) */}
                <button
                    onClick={() => navigateTo('powers-config')}
                    className="w-full relative group transition-all active:scale-[0.98] rounded-3xl focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-emerald-200"
                >
                    <div className="w-full bg-white border-2 border-slate-100 rounded-3xl p-4 flex items-center gap-5 shadow-soft hover:shadow-soft-md transition-all">
                         <div className="flex-shrink-0 w-16 h-16 rounded-2xl bg-emerald-100 text-emerald-600 flex items-center justify-center">
                             <span className="material-symbols-outlined text-3xl" aria-hidden="true">superscript</span>
                        </div>
                        <div className="text-left flex-1">
                            <h3 className="title-medium text-slate-700">Powers</h3>
                            <p className="text-sm font-semibold text-slate-400">Squares, cubes & roots</p>
                        </div>
                        <span className="material-symbols-outlined text-slate-300" aria-hidden="true">chevron_right</span>
                    </div>
                </button>

                 {/* Card 4: Fractions (Red) */}
                 <button
                    onClick={() => navigateTo('fractions-config')}
                    className="w-full relative group transition-all active:scale-[0.98] rounded-3xl focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-rose-200"
                >
                    <div className="w-full bg-white border-2 border-slate-100 rounded-3xl p-4 flex items-center gap-5 shadow-soft hover:shadow-soft-md transition-all">
                         <div className="flex-shrink-0 w-16 h-16 rounded-2xl bg-rose-100 text-rose-600 flex items-center justify-center">
                             <span className="material-symbols-outlined text-3xl" aria-hidden="true">percent</span>
                        </div>
                        <div className="text-left flex-1">
                            <h3 className="title-medium text-slate-700">Fractions</h3>
                            <p className="text-sm font-semibold text-slate-400">Decimals & percents</p>
                        </div>
                        <span className="material-symbols-outlined text-slate-300" aria-hidden="true">chevron_right</span>
                    </div>
                </button>
            </div>
        </div>
    </div>
  );
}
