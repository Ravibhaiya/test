'use client';
import React, { useEffect, useRef, memo } from 'react';

interface TimerBarProps {
  duration: number; // in seconds
  isRunning: boolean;
  onTimeUp: () => void;
  resetKey: any;
}

const TimerBar = memo(function TimerBar({ duration, isRunning, onTimeUp, resetKey }: TimerBarProps) {
  const barRef = useRef<HTMLDivElement>(null);
  const requestRef = useRef<number>(0);
  const startTimeRef = useRef<number>(0);
  const totalDurationRef = useRef<number>(duration * 1000);
  const onTimeUpRef = useRef(onTimeUp);
  const activeColorClassRef = useRef<string>('bg-green-500');

  useEffect(() => {
    onTimeUpRef.current = onTimeUp;
  }, [onTimeUp]);

  useEffect(() => {
    const updateColor = (progress: number) => {
      if (!barRef.current) return;

      let newColor = 'bg-green-500';
      if (progress < 33.33) {
        newColor = 'bg-red-500';
      } else if (progress <= 66.66) {
        newColor = 'bg-orange-500';
      }

      if (newColor !== activeColorClassRef.current) {
        barRef.current.classList.remove(activeColorClassRef.current);
        barRef.current.classList.add(newColor);
        activeColorClassRef.current = newColor;
      }
    };

    const animate = (time: number) => {
      const elapsed = time - startTimeRef.current;
      const durationMs = totalDurationRef.current;

      if (durationMs > 0) {
        const remaining = Math.max(0, durationMs - elapsed);
        const newProgress = (remaining / durationMs) * 100;

        if (barRef.current) {
          barRef.current.style.width = `${newProgress}%`;
          updateColor(newProgress);
        }

        if (remaining <= 0) {
          if (requestRef.current) cancelAnimationFrame(requestRef.current);
          if (onTimeUpRef.current) onTimeUpRef.current();
          return;
        }
      }

      requestRef.current = requestAnimationFrame(animate);
    };

    if (requestRef.current) cancelAnimationFrame(requestRef.current);

    // Reset visual state
    totalDurationRef.current = duration * 1000;
    if (barRef.current) {
      barRef.current.style.width = '100%';
      // Reset color to green
      barRef.current.classList.remove(activeColorClassRef.current);
      barRef.current.classList.add('bg-green-500');
      activeColorClassRef.current = 'bg-green-500';
    }

    if (isRunning) {
      startTimeRef.current = performance.now();
      requestRef.current = requestAnimationFrame(animate);
    }

    return () => {
      if (requestRef.current) cancelAnimationFrame(requestRef.current);
    };
  }, [resetKey, duration, isRunning]);

  return (
    <div className="w-full h-5 bg-slate-200 rounded-full overflow-hidden border-2 border-slate-100 shadow-inner">
        <div
            ref={barRef}
            className="h-full bg-green-500 rounded-full relative"
            style={{ width: '100%' }}
        >
            <div className="absolute top-1 left-2 right-2 h-[30%] bg-white opacity-40 rounded-full blur-[1px]" />
        </div>
    </div>
  );
});

export default TimerBar;
