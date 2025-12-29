import React, { useMemo } from 'react';
import {
  Star, Circle, Triangle, Cloud, Sparkles, Heart,
  X, AlertTriangle, CloudRain, Clock, Hourglass, Zap, CheckCircle2
} from 'lucide-react';

interface FeedbackBackgroundProps {
  status: 'idle' | 'correct' | 'wrong' | 'timeup';
}

const FeedbackBackground: React.FC<FeedbackBackgroundProps> = ({ status }) => {
  // Determine colors based on status
  const colors = useMemo(() => {
    switch (status) {
      case 'correct': return { bg: 'bg-green-100', text: 'text-green-300', fill: '#dcfce7' };
      case 'wrong': return { bg: 'bg-red-100', text: 'text-red-300', fill: '#fee2e2' };
      case 'timeup': return { bg: 'bg-sky-100', text: 'text-sky-300', fill: '#e0f2fe' };
      default: return { bg: 'bg-transparent', text: 'text-transparent', fill: 'transparent' };
    }
  }, [status]);

  // Determine Icon Set based on status
  const IconSet = useMemo(() => {
    switch (status) {
      case 'correct':
        return [Star, Heart, Sparkles, CheckCircle2, Circle];
      case 'wrong':
        return [X, AlertTriangle, Triangle, CloudRain, Cloud];
      case 'timeup':
        return [Clock, Hourglass, Zap, Cloud];
      default:
        return [];
    }
  }, [status]);

  // Generate sine wave path
  const wavePath = useMemo(() => {
    const width = 1440;
    const height = 320;
    const amplitude = 30;
    const frequency = 8;
    const midY = 160;

    let path = `M 0 ${midY} `;
    const segmentWidth = width / frequency;

    for (let i = 0; i < frequency; i++) {
        const startX = i * segmentWidth;
        const q1x = startX + segmentWidth / 4;
        const q1y = midY - amplitude;
        const end1x = startX + segmentWidth / 2;
        const end1y = midY;

        const q2x = startX + (segmentWidth * 3) / 4;
        const q2y = midY + amplitude;
        const end2x = startX + segmentWidth;
        const end2y = midY;

        path += `Q ${q1x} ${q1y}, ${end1x} ${end1y} `;
        path += `Q ${q2x} ${q2y}, ${end2x} ${end2y} `;
    }

    path += `L ${width} ${height} L 0 ${height} Z`;
    return path;
  }, []);

  // Generate animated elements
  const animatedElements = useMemo(() => {
    if (IconSet.length === 0) return null;

    const elements = [];

    // Set 1: Wave Area (above)
    const waveCols = 4;
    const waveRows = 2;
    for (let i = 0; i < waveCols * waveRows; i++) {
        const Icon = IconSet[Math.floor(Math.random() * IconSet.length)];
        const size = Math.floor(Math.random() * 16) + 14;

        // Position relative to the WAVE container (h-20)
        const left = (i % waveCols) * (100 / waveCols) + Math.random() * 10;
        const top = Math.floor(i / waveCols) * (100 / waveRows) + Math.random() * 20;

        elements.push(
            <div
                key={`wave-${i}`}
                className="absolute animate-float-up z-10"
                style={{
                    left: `${left}%`,
                    top: `${top}%`,
                    animationDelay: `${Math.random() * 2}s`,
                    animationDuration: `${3 + Math.random() * 3}s`,
                    transform: `rotate(${Math.random() * 360}deg)`,
                    opacity: 0.3 + Math.random() * 0.4,
                }}
            >
                <Icon size={size} fill="currentColor" className="currentColor" />
            </div>
        );
    }

    // Set 2: Footer Area (inside)
    const footerCols = 5;
    const footerRows = 2;
    for (let i = 0; i < footerCols * footerRows; i++) {
        const Icon = IconSet[Math.floor(Math.random() * IconSet.length)];
        const size = Math.floor(Math.random() * 16) + 14;

        const left = (i % footerCols) * (100 / footerCols) + Math.random() * 10;
        const top = Math.floor(i / footerCols) * (100 / footerRows) + Math.random() * 20;

        elements.push(
            <div
                key={`footer-${i}`}
                className="absolute animate-float-up z-0"
                style={{
                    left: `${left}%`,
                    top: `${top}%`,
                    animationDelay: `${Math.random() * 2}s`,
                    animationDuration: `${3 + Math.random() * 3}s`,
                    transform: `rotate(${Math.random() * 360}deg)`,
                    opacity: 0.3 + Math.random() * 0.4,
                }}
            >
                <Icon size={size} fill="currentColor" className="currentColor" />
            </div>
        );
    }

    return { waveIcons: elements.filter(e => e.key?.startsWith('wave')), footerIcons: elements.filter(e => e.key?.startsWith('footer')) };
  }, [IconSet]);

  if (status === 'idle') return null;

  // Create a data URI for the mask image using the same wave path
  const maskImage = `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 1440 320' preserveAspectRatio='none'%3E%3Cpath d='${wavePath}' fill='black'/%3E%3C/svg%3E")`;

  return (
    <>
        {/* Wave Part: Anchored to the top of the footer (bottom: 100%) */}
        <div className={`absolute bottom-[100%] left-0 right-0 w-full h-20 pointer-events-none ${colors.text}`}>

             {/* Unified Background Layer (SVG + Solid) - Layer 0 */}
             {/* We use the SVG to draw the entire shape including the wave and the fill below it. */}
             <div className="absolute inset-0 w-full h-full z-0">
                 <svg
                    viewBox="0 0 1440 320"
                    className="w-full h-full preserve-3d"
                    preserveAspectRatio="none"
                 >
                    <path
                        fill={colors.fill}
                        fillOpacity="1"
                        d={wavePath}
                    ></path>
                 </svg>
             </div>

             {/* Icons Layer - Layer 1 */}
             {/* Positioned absolutely over the whole area, but masked by the wave shape */}
             <div
                className="absolute inset-0 w-full h-full z-10 overflow-hidden"
                style={{
                    maskImage: maskImage,
                    WebkitMaskImage: maskImage, // For WebKit browsers
                    maskSize: '100% 100%',
                    WebkitMaskSize: '100% 100%',
                    maskRepeat: 'no-repeat',
                    WebkitMaskRepeat: 'no-repeat'
                }}
             >
                {animatedElements?.waveIcons}
             </div>
        </div>

        {/* Footer Part: Fills the footer container */}
        <div className={`absolute inset-0 w-full h-full pointer-events-none overflow-hidden ${colors.bg} ${colors.text}`}>
            {animatedElements?.footerIcons}
        </div>
    </>
  );
};

export default FeedbackBackground;
