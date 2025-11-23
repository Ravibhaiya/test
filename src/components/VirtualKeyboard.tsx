import React from 'react';
import { useRipple } from '@/hooks/useRipple';

interface VirtualKeyboardProps {
  onChar: (char: string) => void;
  onDelete: () => void;
  visible: boolean;
}

export default function VirtualKeyboard({ onChar, onDelete, visible }: VirtualKeyboardProps) {
  const createRipple = useRipple();

  if (!visible) return null;

  const keys = [
    { label: '1', value: '1' },
    { label: '2', value: '2' },
    { label: '3', value: '3' },
    { label: '⌫', value: 'backspace', isAction: true },
    { label: '4', value: '4' },
    { label: '5', value: '5' },
    { label: '6', value: '6' },
    { label: '/', value: '/' },
    { label: '7', value: '7' },
    { label: '8', value: '8' },
    { label: '9', value: '9' },
    { label: '.', value: '.' },
    { label: '0', value: '0', span: 4 },
  ];

  return (
    <div className="w-full bg-[var(--background-hsl)] border-t-[3px] border-black p-2 pb-4 animate-slide-up shadow-[0_-4px_0_0_rgba(0,0,0,0.1)] flex-none">
      <div className="grid grid-cols-4 gap-2 max-w-md mx-auto">
        {keys.map((key) => (
          <button
            key={key.label}
            className={`
              ${key.span === 4 ? 'col-span-4' : ''}
              ${key.isAction ? 'bg-red-100' : 'bg-white'}
              h-10 rounded-xl border-[2px] border-black
              shadow-[2px_2px_0_0_black] active:shadow-none active:translate-x-[1px] active:translate-y-[1px]
              flex items-center justify-center
              title-medium ripple-surface
              transition-all duration-100
            `}
            onMouseDown={createRipple}
            onClick={(e) => {
              e.preventDefault();
              if (key.value === 'backspace') {
                onDelete();
              } else {
                onChar(key.value);
              }
            }}
          >
            {key.value === 'backspace' ? (
              <span className="material-symbols-outlined">backspace</span>
            ) : (
              key.label
            )}
          </button>
        ))}
      </div>
    </div>
  );
}
