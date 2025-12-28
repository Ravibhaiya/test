import React, { useMemo } from 'react';
import { Star, Circle, Triangle, Cloud, Sparkles, Heart } from 'lucide-react';

interface WavyFeedbackDecorationProps {
  status: 'correct' | 'wrong' | 'timeup';
}

const WavyFeedbackDecoration: React.FC<WavyFeedbackDecorationProps> = ({ status }) => {
  // Determine color based on status
  const colorClass = useMemo(() => {
    switch (status) {
      case 'correct': return 'bg-green-100 text-green-300';
      case 'wrong': return 'bg-red-100 text-red-300';
      case 'timeup': return 'bg-sky-100 text-sky-300';
      default: return 'bg-transparent text-transparent';
    }
  }, [status]);

  const fillColor = useMemo(() => {
    switch (status) {
        case 'correct': return '#dcfce7'; // bg-green-100
        case 'wrong': return '#fee2e2';   // bg-red-100
        case 'timeup': return '#e0f2fe';  // bg-sky-100
        default: return 'transparent';
    }
  }, [status]);

  // Generate sine wave path
  const wavePath = useMemo(() => {
    const width = 1440;
    const height = 320;
    const amplitude = 30;
    const frequency = 8; // Number of full waves
    const midY = 160;

    let path = `M 0 ${midY} `;
    const segmentWidth = width / frequency;

    for (let i = 0; i < frequency; i++) {
        // Using cubic bezier for smooth sine approximation
        // M startX startY C cp1x cp1y, cp2x cp2y, endX endY
        // For a sine wave from 0 to 2pi, we can approximate.
        // Or simpler: Q (quadratic).
        // A full sine wave: 0 -> peak -> 0 -> trough -> 0
        // We can do it in two Q segments per cycle.

        // Segment 1: 0 to PI (up and down)
        // Q x+w/4 y-amp, x+w/2 y
        const startX = i * segmentWidth;
        const q1x = startX + segmentWidth / 4;
        const q1y = midY - amplitude;
        const end1x = startX + segmentWidth / 2;
        const end1y = midY;

        // Segment 2: PI to 2PI (down and up)
        const q2x = startX + (segmentWidth * 3) / 4;
        const q2y = midY + amplitude;
        const end2x = startX + segmentWidth;
        const end2y = midY;

        // Using smooth curve command 'S' or just Qs
        // Let's stick to Q for simplicity and control
        path += `Q ${q1x} ${q1y}, ${end1x} ${end1y} `;
        path += `Q ${q2x} ${q2y}, ${end2x} ${end2y} `;
    }

    // Close the path at the bottom
    path += `L ${width} ${height} L 0 ${height} Z`;

    return path;
  }, []);

  // Generate animated elements using a grid system to prevent overlap
  const animatedElements = useMemo(() => {
    const elements = [];
    const iconTypes = [Star, Circle, Triangle, Sparkles, Cloud, Heart];

    // Grid configuration: 4 columns x 3 rows
    const cols = 4;
    const rows = 3;
    const totalCells = cols * rows; // 12 cells

    // We want to fill all cells or most of them? Let's fill all 12.
    // To make it look organic, we can jitter position within the cell.

    for (let i = 0; i < totalCells; i++) {
        const row = Math.floor(i / cols);
        const col = i % cols;

        const Icon = iconTypes[Math.floor(Math.random() * iconTypes.length)];
        const size = Math.floor(Math.random() * 16) + 14; // 14px to 30px

        // Cell dimensions in percentage
        const cellWidth = 100 / cols; // 25%
        const cellHeight = 100 / rows; // 33.33%

        // Jitter: Position within the cell (with some padding)
        // Padding 10% to avoid edge overlap
        const jitterX = Math.random() * (cellWidth - 10) + 5;
        const jitterY = Math.random() * (cellHeight - 10) + 5;

        const left = col * cellWidth + jitterX; // %
        const top = row * cellHeight + jitterY; // %

        const delay = Math.random() * 2; // 0-2s delay
        const duration = Math.random() * 3 + 3; // 3-6s duration
        const rotation = Math.random() * 360;
        const opacity = Math.random() * 0.4 + 0.3; // 0.3 - 0.7

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
                    className="currentColor"
                    fill="currentColor"
                />
            </div>
        );
    }
    return elements;
  }, [status]);

  if (!status) return null;

  // Height set to h-40 to position the wave correctly in the gap
  return (
    <div className={`absolute bottom-0 left-0 right-0 w-full h-40 z-0 pointer-events-none flex flex-col justify-end`}>
       {/* SVG Wave */}
       <div className="w-full relative h-12 overflow-hidden translate-y-[1px]">
            <svg
                viewBox="0 0 1440 320"
                className="w-full h-full preserve-3d"
                preserveAspectRatio="none"
            >
                <path
                    fill={fillColor}
                    fillOpacity="1"
                    d={wavePath}
                ></path>
            </svg>
       </div>

       {/* Main Block - Extends to bottom */}
       <div className={`w-full flex-1 relative overflow-hidden ${colorClass}`}>
           {animatedElements}
       </div>
    </div>
  );
};

export default WavyFeedbackDecoration;
