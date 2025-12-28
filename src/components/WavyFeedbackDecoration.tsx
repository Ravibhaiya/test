import React, { useMemo } from 'react';
import { Star, Circle, Triangle, Cloud, Sparkles, Heart } from 'lucide-react';

interface WavyFeedbackDecorationProps {
  status: 'correct' | 'wrong' | 'timeup';
}

const WavyFeedbackDecoration: React.FC<WavyFeedbackDecorationProps> = ({ status }) => {
  // Determine color based on status
  // Using Tailwind classes for fills
  const colorClass = useMemo(() => {
    switch (status) {
      case 'correct': return 'bg-green-100 text-green-200';
      case 'wrong': return 'bg-red-100 text-red-200';
      case 'timeup': return 'bg-sky-100 text-sky-200';
      default: return 'bg-transparent text-transparent';
    }
  }, [status]);

  const fillColor = useMemo(() => {
    switch (status) {
        // HSL values or exact colors from globals or tailwind palette would be better,
        // but for SVG fill we can use current color or specific hex codes if known.
        // Assuming the background classes map to:
        // bg-green-100 -> #dcfce7
        // bg-red-100 -> #fee2e2
        // bg-sky-100 -> #e0f2fe
        case 'correct': return '#dcfce7';
        case 'wrong': return '#fee2e2';
        case 'timeup': return '#e0f2fe';
        default: return 'transparent';
    }
  }, [status]);

  // Generate random animated elements
  // We use useMemo to keep them stable across re-renders unless status changes (though arguably they should re-gen on new status)
  const animatedElements = useMemo(() => {
    const elements = [];
    const iconTypes = [Star, Circle, Triangle, Sparkles, Cloud, Heart];
    const count = 12; // Number of floating items

    for (let i = 0; i < count; i++) {
        const Icon = iconTypes[Math.floor(Math.random() * iconTypes.length)];
        const size = Math.floor(Math.random() * 20) + 10; // 10px to 30px
        const left = Math.floor(Math.random() * 90) + 5; // 5% to 95%
        const top = Math.floor(Math.random() * 60) + 20; // 20% to 80% down the container
        const delay = Math.random() * 2; // 0-2s delay
        const duration = Math.random() * 3 + 2; // 2-5s duration
        const rotation = Math.random() * 360;

        // Randomly pick a darker shade or white for the icon
        const isWhite = Math.random() > 0.7;
        const opacity = Math.random() * 0.5 + 0.3;

        elements.push(
            <div
                key={i}
                className="absolute animate-float-up"
                style={{
                    left: `${left}%`,
                    top: `${top}%`,
                    animationDelay: `${delay}s`,
                    animationDuration: `${duration}s`,
                    transform: `rotate(${rotation}deg)`,
                    opacity: opacity,
                }}
            >
                <Icon
                    size={size}
                    className={isWhite ? 'text-white' : 'currentColor'}
                    fill={isWhite ? 'white' : 'currentColor'}
                />
            </div>
        );
    }
    return elements;
  }, [status]);

  if (!status) return null;

  return (
    <div className={`absolute bottom-0 left-0 right-0 w-full h-48 z-0 pointer-events-none flex flex-col justify-end`}>
       {/* SVG Wave */}
       <div className="w-full relative h-12 overflow-hidden translate-y-[1px]"> {/* Translate Y to fix sub-pixel gap */}
            <svg
                viewBox="0 0 1440 320"
                className="w-full h-full preserve-3d"
                preserveAspectRatio="none"
            >
                <path
                    fill={fillColor}
                    fillOpacity="1"
                    d="M0,160L48,170.7C96,181,192,203,288,197.3C384,192,480,160,576,138.7C672,117,768,107,864,122.7C960,139,1056,181,1152,197.3C1248,213,1344,203,1392,197.3L1440,192L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z"
                ></path>
            </svg>
       </div>

       {/* Main Block */}
       <div className={`w-full h-full max-h-[140px] relative overflow-hidden ${colorClass}`}>
           {animatedElements}
       </div>
    </div>
  );
};

export default WavyFeedbackDecoration;
