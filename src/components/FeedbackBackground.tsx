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

  // Generate sine wave path (Same as before)
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

    // We want icons in the wave area AND the footer area.
    // Wave area is roughly 160px high (top part).
    // Footer area is 100% height of this component's main container.
    // We will distribute them using percentage of the TOTAL combined visual height?
    // Or just scatter them in this component.
    // This component will be absolute inset-0 in the footer.
    // It has a child (Wave) that is absolute bottom-full.

    // Let's generate two sets of icons:
    // 1. For the Wave part (above the footer)
    // 2. For the Footer part (inside the footer)

    // Set 1: Wave Area (above)
    const waveCols = 4;
    const waveRows = 2;
    for (let i = 0; i < waveCols * waveRows; i++) {
        const Icon = IconSet[Math.floor(Math.random() * IconSet.length)];
        const size = Math.floor(Math.random() * 16) + 14;

        // Position relative to the WAVE container (which is h-40 = 160px)
        const left = (i % waveCols) * (100 / waveCols) + Math.random() * 10;
        const top = Math.floor(i / waveCols) * (100 / waveRows) + Math.random() * 20;

        elements.push(
            <div
                key={`wave-${i}`}
                className="absolute animate-float-up z-0"
                style={{
                    left: `${left}%`,
                    top: `${top}%`, // Inside the wave box
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

  return (
    <>
        {/* Wave Part: Anchored to the top of the footer (bottom: 100%) */}
        <div className={`absolute bottom-[100%] left-0 right-0 w-full h-40 pointer-events-none overflow-hidden flex flex-col justify-end ${colors.text}`}>
            {/* SVG Wave */}
            <div className="w-full relative h-12 flex-shrink-0 translate-y-[1px] z-10">
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

            {/* Wave Body (The block below the SVG curve but above the footer line) */}
            {/* Wait, the SVG includes the block down to height 320.
                In the previous code, h-40 was the container.
                We want the wave to seamlessly join the footer.
                The SVG path ends at y=320.
                MidY is 160.
                So the SVG covers 160px of height?
                Actually, let's just stick to the previous SVG logic which seemed to work.
                It was: container h-40 (160px). SVG inside h-12 (48px). Block below it?

                Previous code:
                   <div className="w-full relative h-12 overflow-hidden translate-y-[1px]"> <svg...> </svg> </div>
                   <div className={`w-full flex-1 relative overflow-hidden ${colorClass}`}> {animatedElements} </div>

                The 'flex-1' div filled the rest of the h-40 container.
                So the wave visual was: [SVG Curve 48px] + [Solid Block ~112px]

                Here, we are attaching this to the TOP of the footer.
                So we want: [SVG Curve] + [Solid Block connecting to Footer]

                This entire 'Wave Part' div is sitting ABOVE the footer.
                So it should look like:

                  ~~~ (Curve)
                  | | (Solid)
                ----------- (Footer Top Edge)

                So yes, we need the solid block.
            */}
             <div className={`w-full flex-1 relative overflow-hidden ${colors.bg}`}>
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
