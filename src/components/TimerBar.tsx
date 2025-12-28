'use client';
import React, { useEffect, useRef, useState, memo } from 'react';

interface TimerBarProps {
  duration: number; // in seconds
  isRunning: boolean;
  onTimeUp: () => void;
  resetKey: any;
}

const TimerBar = memo(function TimerBar({ duration, isRunning, onTimeUp, resetKey }: TimerBarProps) {
  const [progress, setProgress] = useState(100);
  const requestRef = useRef<number>(0);
  const startTimeRef = useRef<number>(0);
  const totalDurationRef = useRef<number>(duration * 1000);
  const onTimeUpRef = useRef(onTimeUp);

  useEffect(() => {
    onTimeUpRef.current = onTimeUp;
  }, [onTimeUp]);

  const animate = (time: number) => {
    const elapsed = time - startTimeRef.current;
    const durationMs = totalDurationRef.current;

    if (durationMs > 0) {
      const remaining = Math.max(0, durationMs - elapsed);
      const newProgress = (remaining / durationMs) * 100;
      setProgress(newProgress);

      if (remaining <= 0) {
        if (requestRef.current) cancelAnimationFrame(requestRef.current);
        if (onTimeUpRef.current) onTimeUpRef.current();
        return;
      }
    }

    requestRef.current = requestAnimationFrame(animate);
  };

  useEffect(() => {
    if (requestRef.current) cancelAnimationFrame(requestRef.current);

    setProgress(100);
    totalDurationRef.current = duration * 1000;

    if (isRunning) {
        startTimeRef.current = performance.now();
        requestRef.current = requestAnimationFrame(animate);
    }

    return () => {
      if (requestRef.current) cancelAnimationFrame(requestRef.current);
    };
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [resetKey]);

  useEffect(() => {
    if (!isRunning && requestRef.current) {
        cancelAnimationFrame(requestRef.current);
        requestRef.current = 0;
    }
  }, [isRunning]);

  let timerColorClass = 'bg-green-500';
  if (progress < 33.33) {
    timerColorClass = 'bg-red-500';
  } else if (progress <= 66.66) {
    timerColorClass = 'bg-orange-500';
  }

  return (
    <div className="w-full h-5 bg-slate-200 rounded-full overflow-hidden border-2 border-slate-100 shadow-inner">
        <div
            className={`h-full ${timerColorClass} rounded-full relative`}
            style={{ width: `${progress}%` }}
        >
            <div className="absolute top-1 left-2 right-2 h-[30%] bg-white opacity-40 rounded-full blur-[1px]" />
        </div>
    </div>
  );
});

export default TimerBar;
