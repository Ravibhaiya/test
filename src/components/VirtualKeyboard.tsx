import React, { memo } from 'react';
import { useSound } from '@/contexts/SoundContext';

interface VirtualKeyboardProps {
  onChar: (char: string) => void;
  onDelete: () => void;
  visible: boolean;
  layout?: 'numeric' | 'qwerty';
}

const QWERTY_ROW_1 = ['Q', 'W', 'E', 'R', 'T', 'Y', 'U', 'I', 'O', 'P'];
const QWERTY_ROW_2 = ['A', 'S', 'D', 'F', 'G', 'H', 'J', 'K', 'L'];
const QWERTY_ROW_3 = ['Z', 'X', 'C', 'V', 'B', 'N', 'M'];

// Memoized to prevent re-renders when parent timer updates or other unrelated state changes
const VirtualKeyboard = memo(function VirtualKeyboard({ onChar, onDelete, visible, layout = 'numeric' }: VirtualKeyboardProps) {
  if (!visible) return null;

  if (layout === 'qwerty') {
      return (
        <div className="w-full max-w-2xl mx-auto select-none" role="region" aria-label="Virtual Keyboard">
             <div className="flex gap-1 mb-2">
                {QWERTY_ROW_1.map(char => (
                    <KeyButton key={char} label={char} value={char} onChar={onChar} className="flex-1 min-w-0 px-0 text-lg sm:text-xl" />
                ))}
             </div>
             <div className="flex gap-1 mb-2 px-2 sm:px-6">
                {QWERTY_ROW_2.map(char => (
                    <KeyButton key={char} label={char} value={char} onChar={onChar} className="flex-1 min-w-0 px-0 text-lg sm:text-xl" />
                ))}
             </div>
             <div className="flex gap-1 px-2 sm:px-12">
                 {QWERTY_ROW_3.map(char => (
                    <KeyButton key={char} label={char} value={char} onChar={onChar} className="flex-1 min-w-0 px-0 text-lg sm:text-xl" />
                 ))}
                 <KeyButton label="⌫" value="backspace" onDelete={onDelete} isAction className="flex-[1.5] min-w-0 px-0 text-lg sm:text-xl" />
             </div>
        </div>
      );
  }

  return (
    <div className="w-full max-w-md mx-auto" role="region" aria-label="Virtual Keyboard">
      <div className="grid grid-cols-4 gap-2">
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
});

export default VirtualKeyboard;

const KeyButton = memo(function KeyButton({
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
    const isBackspace = value === 'backspace';
    const { play } = useSound();

    return (
        <button
            aria-label={isBackspace ? 'Backspace' : undefined}
            className={`
              h-12 rounded-xl text-2xl font-bold flex items-center justify-center transition-all btn-push
              focus-visible:ring-4 focus-visible:ring-purple-200 focus-visible:outline-none z-10
              ${isAction
                ? 'bg-slate-200 text-slate-600 border-slate-300'
                : 'bg-white text-slate-700 border-slate-200'
              }
              ${className}
            `}
            onClick={(e) => {
              e.preventDefault();
              play('type');
              if (isBackspace && onDelete) {
                onDelete();
              } else if (onChar) {
                onChar(value);
              }
            }}
          >
            {isBackspace ? (
              <span className="material-symbols-outlined font-bold text-2xl" aria-hidden="true">backspace</span>
            ) : (
              label
            )}
          </button>
    )
});
