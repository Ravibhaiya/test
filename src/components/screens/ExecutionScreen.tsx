// src/components/screens/ExecutionScreen.tsx
'use client';
import { useState, useEffect, useRef, useCallback } from 'react';
import React from 'react';
import type { Mode, FractionAnswerType, ExecutionConfig, PowerType } from '@/lib/types';
import {
  generateTablesQuestion,
  generatePracticeQuestion,
  generatePowersQuestion,
  generateFractionsQuestion,
} from '@/lib/question-helpers';
import VirtualKeyboard from '@/components/VirtualKeyboard';
import TimerBar from '@/components/TimerBar';
import WavyFeedbackDecoration from '@/components/WavyFeedbackDecoration';

interface Question {
  question: string;
  answer: string | number;
  hint?: string;
  answerType?: FractionAnswerType;
  unroundedAnswer?: number;
}
interface ExecutionScreenProps {
  mode: Mode;
  config: ExecutionConfig;
}

export default function ExecutionScreen({ mode, config }: ExecutionScreenProps) {
  const [question, setQuestion] = useState('');
  const [currentQuestionObject, setCurrentQuestionObject] = useState<Question | null>(null);
  const [wrongAnswerPool, setWrongAnswerPool] = useState<Question[]>([]);
  const [answerTypeHint, setAnswerTypeHint] = useState('');
  const [currentAnswer, setCurrentAnswer] = useState<string | number>(0);
  const [unroundedAnswer, setUnroundedAnswer] = useState<number | null>(null);

  // States for feedback handling
  const [feedbackStatus, setFeedbackStatus] = useState<'idle' | 'correct' | 'wrong' | 'timeup'>('idle');
  const [feedbackMessage, setFeedbackMessage] = useState('');

  const [inputValue, setInputValue] = useState('');

  const [activeAnswerType, setActiveAnswerType] = useState<FractionAnswerType | null>(null);

  const answerInputRef = useRef<HTMLInputElement>(null);

  // Helper ref to access current answer in the animation loop without stale closures
  const currentQuestionRef = useRef<Question | null>(null);

  useEffect(() => {
    currentQuestionRef.current = currentQuestionObject;
  }, [currentQuestionObject]);

  const timeUp = useCallback(
    (answer: number | string) => {
      setFeedbackStatus('timeup');
      setFeedbackMessage(`Correct answer: ${answer}`);
      const qObj = currentQuestionRef.current;
      if (qObj) {
         setWrongAnswerPool((prev) => [...prev, qObj]);
      }
    },
    []
  );

  const handleTimerFinish = useCallback(() => {
     const q = currentQuestionRef.current;
     if (q) {
         timeUp(q.answer);
     }
  }, [timeUp]);

  const displayQuestion = useCallback(() => {
    setFeedbackStatus('idle');
    setFeedbackMessage('');
    setAnswerTypeHint('');
    setActiveAnswerType(null);
    setUnroundedAnswer(null);
    setInputValue('');
    if (answerInputRef.current) {
      answerInputRef.current.value = '';
    }

    let questionData: Question | null;

    // Weighted question selection logic
    if (wrongAnswerPool.length > 0 && Math.random() < 0.4) {
        questionData = wrongAnswerPool[Math.floor(Math.random() * wrongAnswerPool.length)];
    } else {
        if (mode === 'tables') {
          questionData = generateTablesQuestion(
            config as { selected: number[] }
          );
        } else if (mode === 'practice') {
          questionData = generatePracticeQuestion(
            config as { digits1: number[]; digits2: number[] }
          );
        } else if (mode === 'powers') {
          questionData = generatePowersQuestion(
            config as { selected: PowerType[]; rangeMax: number }
          );
        } else if (mode === 'fractions') {
          questionData = generateFractionsQuestion(
            config as { selected: FractionAnswerType[] }
          );
        } else {
          questionData = null;
        }
    }

    if (!questionData) {
        setQuestion("Invalid Config");
        return;
    }

    // Handle fraction-specific data
    if (mode === 'fractions') {
        setAnswerTypeHint(questionData.hint || '');
        setActiveAnswerType(questionData.answerType || null);
        if (questionData.unroundedAnswer) {
            setUnroundedAnswer(questionData.unroundedAnswer);
        }
    }

    setQuestion(questionData.question);
    setCurrentAnswer(questionData.answer);
    setCurrentQuestionObject(questionData);
    // Sync ref immediately
    currentQuestionRef.current = questionData;
  }, [mode, config, wrongAnswerPool]);

  useEffect(() => {
    displayQuestion();
  }, []);

  // Use callback to prevent VirtualKeyboard re-renders (animation bleed)
  const handleVirtualChar = useCallback((char: string) => {
    if (feedbackStatus !== 'idle') return; // Block input during feedback
    setInputValue(prev => {
      // Security: Prevent DoS/UI overflow by limiting input length
      if (prev.length >= 15) return prev;
      return prev + char;
    });
  }, [feedbackStatus]);

  const handleVirtualDelete = useCallback(() => {
    if (feedbackStatus !== 'idle') return;
    setInputValue(prev => prev.slice(0, -1));
  }, [feedbackStatus]);

  const handleCheck = () => {
    if (feedbackStatus !== 'idle') {
        // If checking while showing result, go to next
        displayQuestion();
        return;
    }

    if (!inputValue) return;

    let isCorrect = false;
    const isFractionPractice =
      mode === 'fractions' && activeAnswerType === 'fraction';

    if (isFractionPractice) {
      isCorrect =
        inputValue.toLowerCase() ===
        currentAnswer.toString().toLowerCase();
    } else {
      const sanitizedUserAnswer = inputValue.replace(/,/g, '');
      const isValidNumber = /^-?\d*\.?\d+$/.test(sanitizedUserAnswer);

      if (isValidNumber) {
        const userAnswerNum = parseFloat(sanitizedUserAnswer);
        if (unroundedAnswer !== null) {
          const tolerance = 0.01;
          isCorrect = Math.abs(userAnswerNum - unroundedAnswer) < tolerance;
        } else {
          const correctAnswerNum =
            typeof currentAnswer === 'string'
              ? parseFloat(currentAnswer.replace(/,/g, ''))
              : currentAnswer;
          isCorrect = userAnswerNum === correctAnswerNum;
        }
      } else {
        isCorrect = false;
      }
    }

    if (isCorrect) {
      setFeedbackStatus('correct');
      setFeedbackMessage('Correct!');
      if (currentQuestionObject) {
         setWrongAnswerPool(prev => prev.filter(q => q.question !== currentQuestionObject.question));
      }
    } else {
      setFeedbackStatus('wrong');
      setFeedbackMessage(`Correct answer: ${currentAnswer}`);
       if (currentQuestionObject) {
         setWrongAnswerPool(prev => [...prev, currentQuestionObject]);
       }
    }
  };

  const activeTimerDuration = config.timer;
  const showPercentAdornment = mode === 'fractions' && activeAnswerType === 'decimal';

  return (
    <div id="execution-screen" className="screen-container">
        {/* Header: Progress Bar */}
        <div className="w-full h-10 px-4 flex items-center justify-center relative">
             {activeTimerDuration && activeTimerDuration > 0 && (
                <TimerBar
                    duration={activeTimerDuration}
                    isRunning={feedbackStatus === 'idle'}
                    onTimeUp={handleTimerFinish}
                    resetKey={currentQuestionObject}
                />
             )}
        </div>

        {/* Content: Question Area */}
        <div className="screen-content !overflow-hidden flex flex-col items-center justify-center text-center relative">

            <div className="flex-1 flex flex-col justify-center w-full relative z-10">
                {/* Question Bubble */}
                <div className="mb-4 animate-bounce-soft">
                     <h2
                        className="text-4xl sm:text-5xl font-bold text-slate-700 mb-2"
                        dangerouslySetInnerHTML={{ __html: question }}
                     />
                     {answerTypeHint && (
                        <p className="text-slate-400 font-bold text-lg">{answerTypeHint}</p>
                     )}
                </div>

                {/* Answer Display */}
                <div className="w-full max-w-xs mx-auto mb-4">
                    <div className={`
                        flex items-center justify-center
                        min-h-[80px] w-full px-6 rounded-3xl
                        border-2 text-3xl font-bold transition-all
                        ${feedbackStatus === 'idle' ? 'bg-white border-slate-200 text-slate-700' : ''}
                        ${feedbackStatus === 'correct' ? 'bg-green-100 border-green-500 text-green-700' : ''}
                        ${feedbackStatus === 'wrong' ? 'bg-red-100 border-red-500 text-red-700' : ''}
                        ${feedbackStatus === 'timeup' ? 'bg-sky-100 border-sky-500 text-sky-700' : ''}
                    `}>
                        {inputValue}
                        {inputValue.length === 0 && <span className="text-slate-300 animate-pulse">_</span>}
                        {showPercentAdornment && <span className="ml-1 text-slate-400">%</span>}
                    </div>
                </div>
            </div>

            {/* Wavy Decoration (visible only during feedback) */}
            {feedbackStatus !== 'idle' && (
                <WavyFeedbackDecoration status={feedbackStatus} />
            )}

        </div>

        {/* Footer: Feedback / Button */}
        <div className={`
            screen-fixed-bottom flex flex-col gap-4 border-t-2 transition-colors duration-300
            ${feedbackStatus === 'idle' ? 'bg-white border-slate-100' : ''}
            ${feedbackStatus === 'correct' ? 'bg-green-100 border-transparent' : ''}
            ${feedbackStatus === 'wrong' ? 'bg-red-100 border-transparent' : ''}
            ${feedbackStatus === 'timeup' ? 'bg-sky-100 border-transparent' : ''}
        `}>
             {feedbackStatus !== 'idle' && (
                 <div className="flex items-start gap-4 mb-2">
                     <div className={`
                        w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0
                        ${feedbackStatus === 'correct' ? 'bg-green-500 text-white' : ''}
                        ${feedbackStatus === 'wrong' ? 'bg-red-500 text-white' : ''}
                        ${feedbackStatus === 'timeup' ? 'bg-sky-500 text-white' : ''}
                     `}>
                        <span className="material-symbols-outlined font-bold">
                            {feedbackStatus === 'correct' ? 'check' : feedbackStatus === 'timeup' ? 'timer' : 'close'}
                        </span>
                     </div>
                     <div className="text-left">
                        <h3 className={`
                            font-bold text-xl
                            ${feedbackStatus === 'correct' ? 'text-green-700' : ''}
                            ${feedbackStatus === 'wrong' ? 'text-red-700' : ''}
                            ${feedbackStatus === 'timeup' ? 'text-sky-700' : ''}
                        `}>
                            {feedbackStatus === 'correct' ? 'Nicely done!' : feedbackStatus === 'timeup' ? "Time's Up!" : 'Incorrect'}
                        </h3>
                         {feedbackStatus === 'wrong' && (
                             <p className="text-red-600 font-semibold">{feedbackMessage}</p>
                         )}
                         {feedbackStatus === 'timeup' && (
                             <p className="text-sky-600 font-semibold">{feedbackMessage}</p>
                         )}
                     </div>
                 </div>
             )}

            {feedbackStatus === 'idle' ? (
                <button
                    onClick={handleCheck}
                    disabled={!inputValue}
                    className={`
                        w-full filled-button transition-all
                        ${!inputValue ? 'opacity-50 grayscale' : ''}
                    `}
                >
                    CHECK
                </button>
            ) : (
                <button
                    onClick={displayQuestion}
                    className={`
                        w-full h-14 btn-juicy
                        ${feedbackStatus === 'correct' ? 'btn-juicy-success' : ''}
                        ${feedbackStatus === 'wrong' ? 'btn-juicy-danger' : ''}
                        ${feedbackStatus === 'timeup' ? 'btn-juicy-sky' : ''}
                    `}
                >
                    CONTINUE
                </button>
            )}
        </div>

        {/* Keyboard (Only visible when idle) */}
        {feedbackStatus === 'idle' && (
            <div className="bg-slate-100 p-2 pb-2 border-t border-slate-200">
                <VirtualKeyboard
                    onChar={handleVirtualChar}
                    onDelete={handleVirtualDelete}
                    visible={true}
                />
            </div>
        )}
    </div>
  );
}
