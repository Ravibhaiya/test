import React from 'react';

interface VirtualKeyboardProps {
  onChar: (char: string) => void;
  onDelete: () => void;
  visible: boolean;
}

export default function VirtualKeyboard({ onChar, onDelete, visible }: VirtualKeyboardProps) {
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
    { label: '0', value: '0', span: 4 }, // 0 spans the full width or just center?
  ];

  // Better Layout for thumb typing:
  // 1 2 3
  // 4 5 6
  // 7 8 9
  // . 0 / ⌫ (Row 4 has 4 items?)

  // Let's stick to the previous 4-col grid but cleaner.
  // 1 2 3 ⌫
  // 4 5 6 /
  // 7 8 9 .
  // 0 (span)

  return (
    <div className="w-full max-w-md mx-auto">
      <div className="grid grid-cols-4 gap-3">
        {/* Row 1 */}
        <KeyButton label="1" value="1" onChar={onChar} />
        <KeyButton label="2" value="2" onChar={onChar} />
        <KeyButton label="3" value="3" onChar={onChar} />
        <KeyButton label="⌫" value="backspace" onDelete={onDelete} isAction />

        {/* Row 2 */}
        <KeyButton label="4" value="4" onChar={onChar} />
        <KeyButton label="5" value="5" onChar={onChar} />
        <KeyButton label="6" value="6" onChar={onChar} />
        <KeyButton label="/" value="/" onChar={onChar} />

        {/* Row 3 */}
        <KeyButton label="7" value="7" onChar={onChar} />
        <KeyButton label="8" value="8" onChar={onChar} />
        <KeyButton label="9" value="9" onChar={onChar} />
        <KeyButton label="." value="." onChar={onChar} />

        {/* Row 4 */}
        <div className="col-span-4">
             <KeyButton label="0" value="0" onChar={onChar} className="w-full" />
        </div>
      </div>
    </div>
  );
}

function KeyButton({
    label,
    value,
    onChar,
    onDelete,
    isAction,
    className = ""
}: {
    label: string,
    value: string,
    onChar?: (c: string) => void,
    onDelete?: () => void,
    isAction?: boolean,
    className?: string
}) {
    return (
        <button
            className={`
              h-14 rounded-xl text-2xl font-bold flex items-center justify-center transition-all btn-push
              ${isAction
                ? 'bg-slate-200 text-slate-600 border-slate-300'
                : 'bg-white text-slate-700 border-slate-200'
              }
              ${className}
            `}
            onClick={(e) => {
              e.preventDefault();
              if (value === 'backspace' && onDelete) {
                onDelete();
              } else if (onChar) {
                onChar(value);
              }
            }}
          >
            {value === 'backspace' ? (
              <span className="material-symbols-outlined font-bold text-2xl">backspace</span>
            ) : (
              label
            )}
          </button>
    )
}
