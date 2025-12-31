import React, { useMemo } from 'react';
import {
  Star, Circle, Triangle, Cloud, Sparkles, Heart,
  X, AlertTriangle, CloudRain, Clock, Hourglass, Zap, CheckCircle2
} from 'lucide-react';

interface FeedbackBackgroundProps {
  status: 'idle' | 'correct' | 'wrong' | 'timeup';
}

const FeedbackBackground: React.FC<FeedbackBackgroundProps> = ({ status }) => {
  // Determine gradient colors based on status
  // We ensure the Wave gradient ends where the Footer background begins for a seamless look.
  const theme = useMemo(() => {
    switch (status) {
      case 'correct':
        return {
          footerBg: 'bg-green-200', // Matches end of wave gradient
          fillFront: 'url(#grad-correct)',
          fillBack: '#dcfce7', // green-100 (Lighter, matches top)
          text: 'text-green-400', // Slightly darker for icons to be visible on 200
          gradId: 'grad-correct',
          stops: [
            { offset: '0%', color: '#dcfce7' }, // green-100
            { offset: '100%', color: '#bbf7d0' } // green-200
          ]
        };
      case 'wrong':
        return {
          footerBg: 'bg-red-200',
          fillFront: 'url(#grad-wrong)',
          fillBack: '#fee2e2', // red-100
          text: 'text-red-400',
          gradId: 'grad-wrong',
          stops: [
            { offset: '0%', color: '#fee2e2' }, // red-100
            { offset: '100%', color: '#fecaca' } // red-200
          ]
        };
      case 'timeup':
        return {
          footerBg: 'bg-sky-200',
          fillFront: 'url(#grad-timeup)',
          fillBack: '#e0f2fe', // sky-100
          text: 'text-sky-400',
          gradId: 'grad-timeup',
          stops: [
            { offset: '0%', color: '#e0f2fe' }, // sky-100
            { offset: '100%', color: '#bae6fd' } // sky-200
          ]
        };
      default:
        return {
          footerBg: 'bg-transparent',
          fillFront: 'transparent',
          fillBack: 'transparent',
          text: 'text-transparent',
          gradId: '',
          stops: []
        };
    }
  }, [status]);

  // Determine Icon Set based on status
  const IconSet = useMemo(() => {
    switch (status) {
      case 'correct': return [Star, Heart, Sparkles, CheckCircle2, Circle];
      case 'wrong': return [X, AlertTriangle, Triangle, CloudRain, Cloud];
      case 'timeup': return [Clock, Hourglass, Zap, Cloud];
      default: return [];
    }
  }, [status]);

  // Generate sine wave paths (Front and Back)
  const waves = useMemo(() => {
    const width = 1440;
    const height = 320;
    const amplitude = 30;
    const frequency = 8;
    const midY = 160;

    // Standard smooth Quadratic Bezier Wave
    const generateQuadPath = (invert: boolean) => {
        let path = `M 0 ${midY} `;
        const segmentWidth = width / frequency;

        for (let i = 0; i < frequency; i++) {
            const startX = i * segmentWidth;
            const dir = invert ? -1 : 1;

            const q1x = startX + segmentWidth / 4;
            const q1y = midY - amplitude * dir;
            const end1x = startX + segmentWidth / 2;
            const end1y = midY;

            const q2x = startX + (segmentWidth * 3) / 4;
            const q2y = midY + amplitude * dir;
            const end2x = startX + segmentWidth;
            const end2y = midY;

            path += `Q ${q1x} ${q1y}, ${end1x} ${end1y} `;
            path += `Q ${q2x} ${q2y}, ${end2x} ${end2y} `;
        }
        path += `L ${width} ${height} L 0 ${height} Z`;
        return path;
    }

    return {
        front: generateQuadPath(false),
        back: generateQuadPath(true) // Inverted phase for depth
    };
  }, []);

  // Generate STATIC elements
  const staticElements = useMemo(() => {
    if (IconSet.length === 0) return null;

    const elements = [];

    // Set 1: Wave Area (above)
    // Constraint: Must be safely below the trough (Y=190 in 320 viewbox -> ~60%)
    // We place them from 65% to 90% to be safe.
    const waveCols = 5;
    const waveRows = 1;
    for (let i = 0; i < waveCols * waveRows; i++) {
        const Icon = IconSet[Math.floor(Math.random() * IconSet.length)];
        const size = Math.floor(Math.random() * 12) + 10;

        const left = (i % waveCols) * (100 / waveCols) + Math.random() * 10;
        const top = 65 + Math.random() * 20; // 65% to 85%

        elements.push(
            <div
                key={`wave-${i}`}
                className="absolute z-10 opacity-20"
                style={{
                    left: `${left}%`,
                    top: `${top}%`,
                    transform: `rotate(${Math.random() * 360}deg)`,
                }}
            >
                <Icon size={size} fill="currentColor" className="currentColor" />
            </div>
        );
    }

    // Set 2: Footer Area (inside)
    const footerCols = 6;
    const footerRows = 2;
    for (let i = 0; i < footerCols * footerRows; i++) {
        const Icon = IconSet[Math.floor(Math.random() * IconSet.length)];
        const size = Math.floor(Math.random() * 16) + 12;

        const left = (i % footerCols) * (100 / footerCols) + Math.random() * 10;
        const top = Math.floor(i / footerCols) * (100 / footerRows) + Math.random() * 30;

        elements.push(
            <div
                key={`footer-${i}`}
                className="absolute z-0 opacity-20"
                style={{
                    left: `${left}%`,
                    top: `${top}%`,
                    transform: `rotate(${Math.random() * 360}deg)`,
                }}
            >
                <Icon size={size} fill="currentColor" className="currentColor" />
            </div>
        );
    }

    return { waveIcons: elements.filter(e => e.key?.startsWith('wave')), footerIcons: elements.filter(e => e.key?.startsWith('footer')) };
  }, [IconSet]);

  if (status === 'idle') return null;

  return (
    <>
        {/* Wave Part: Anchored to the top of the footer (bottom: 100%) */}
        <div className={`absolute bottom-[100%] left-0 right-0 w-full h-20 pointer-events-none ${theme.text}`}>

             <div className="absolute inset-0 w-full h-full z-0">
                 <svg
                    viewBox="0 0 1440 320"
                    className="w-full h-full preserve-3d"
                    preserveAspectRatio="none"
                 >
                    <defs>
                        <linearGradient id={theme.gradId} x1="0%" y1="0%" x2="0%" y2="100%">
                            {theme.stops.map((stop, i) => (
                                <stop key={i} offset={stop.offset} stopColor={stop.color} />
                            ))}
                        </linearGradient>
                    </defs>

                    {/* Back Wave (Depth) - Slightly lighter/transparent */}
                    <path
                        fill={theme.fillBack}
                        fillOpacity="0.4"
                        d={waves.back}
                    ></path>

                    {/* Front Wave (Main) - Gradient */}
                    <path
                        fill={theme.fillFront}
                        fillOpacity="1"
                        d={waves.front}
                    ></path>
                 </svg>
             </div>

             {/* Icons Layer - Safely positioned deep in the liquid */}
             <div className="absolute inset-0 w-full h-full z-10 overflow-hidden">
                {staticElements?.waveIcons}
             </div>
        </div>

        {/* Footer Part: Fills the footer container */}
        <div className={`absolute inset-0 w-full h-full pointer-events-none overflow-hidden ${theme.footerBg} ${theme.text}`}>
            {staticElements?.footerIcons}
        </div>
    </>
  );
};

export default FeedbackBackground;
