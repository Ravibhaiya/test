import React from 'react';

interface PunchedButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'success' | 'danger' | 'sky' | 'neutral' | 'neutral-dark' | 'white';
  shape?: 'rounded-2xl' | 'rounded-xl' | 'rounded-full';
  wrapperClassName?: string;
  children: React.ReactNode;
}

export default function PunchedButton({
  variant = 'primary',
  shape = 'rounded-2xl',
  className = '',
  wrapperClassName = '',
  children,
  disabled,
  ...props
}: PunchedButtonProps) {

  // Base socket styles (the hole)
  const socketBase = `relative flex items-center justify-center bg-slate-100 transition-all ${shape}`;
  // Deep inset shadow for the socket to look like a hole
  const socketShadow = "shadow-[inset_0px_1px_3px_rgba(0,0,0,0.15),_0px_1px_1px_rgba(255,255,255,1)]";

  // Define variant styles for the button surface
  // We use gradients and specific inset shadows to create the 3D volume
  const variants = {
    primary: {
      gradient: "bg-gradient-to-b from-[hsl(var(--primary-hsl))] to-[hsl(var(--primary-depth-hsl))]",
      text: "text-white",
      highlight: "shadow-[inset_0px_4px_2px_rgba(255,255,255,0.3),inset_0px_-4px_0px_rgba(0,0,0,0.2),0px_2px_4px_rgba(0,0,0,0.25)]",
      active: "active:shadow-[inset_0px_4px_2px_rgba(0,0,0,0.1),inset_0px_-2px_0px_rgba(0,0,0,0.1),0px_1px_1px_rgba(0,0,0,0.1)] active:translate-y-[2px]"
    },
    success: {
      gradient: "bg-gradient-to-b from-[hsl(var(--success-hsl))] to-[hsl(var(--success-depth-hsl))]",
      text: "text-white",
      highlight: "shadow-[inset_0px_4px_2px_rgba(255,255,255,0.3),inset_0px_-4px_0px_rgba(0,0,0,0.2),0px_2px_4px_rgba(0,0,0,0.25)]",
      active: "active:shadow-[inset_0px_4px_2px_rgba(0,0,0,0.1),inset_0px_-2px_0px_rgba(0,0,0,0.1),0px_1px_1px_rgba(0,0,0,0.1)] active:translate-y-[2px]"
    },
    danger: {
      gradient: "bg-gradient-to-b from-[hsl(var(--destructive-hsl))] to-[hsl(var(--destructive-depth-hsl))]",
      text: "text-white",
      highlight: "shadow-[inset_0px_4px_2px_rgba(255,255,255,0.3),inset_0px_-4px_0px_rgba(0,0,0,0.2),0px_2px_4px_rgba(0,0,0,0.25)]",
      active: "active:shadow-[inset_0px_4px_2px_rgba(0,0,0,0.1),inset_0px_-2px_0px_rgba(0,0,0,0.1),0px_1px_1px_rgba(0,0,0,0.1)] active:translate-y-[2px]"
    },
    sky: {
      gradient: "bg-gradient-to-b from-[hsl(var(--secondary-hsl))] to-[hsl(var(--secondary-depth-hsl))]",
      text: "text-white",
      highlight: "shadow-[inset_0px_4px_2px_rgba(255,255,255,0.3),inset_0px_-4px_0px_rgba(0,0,0,0.2),0px_2px_4px_rgba(0,0,0,0.25)]",
      active: "active:shadow-[inset_0px_4px_2px_rgba(0,0,0,0.1),inset_0px_-2px_0px_rgba(0,0,0,0.1),0px_1px_1px_rgba(0,0,0,0.1)] active:translate-y-[2px]"
    },
    neutral: {
      // For keyboard keys
      gradient: "bg-white",
      text: "text-slate-700",
      highlight: "shadow-[inset_0px_2px_1px_rgba(255,255,255,1),inset_0px_-3px_0px_rgba(0,0,0,0.1),0px_1px_2px_rgba(0,0,0,0.1)]",
      active: "active:shadow-[inset_0px_2px_1px_rgba(0,0,0,0.05),inset_0px_-1px_0px_rgba(0,0,0,0.05)] active:translate-y-[2px]"
    },
    'neutral-dark': {
        // For action keys (backspace, etc.)
        gradient: "bg-slate-200",
        text: "text-slate-600",
        highlight: "shadow-[inset_0px_2px_1px_rgba(255,255,255,0.5),inset_0px_-3px_0px_rgba(0,0,0,0.1),0px_1px_2px_rgba(0,0,0,0.1)]",
        active: "active:shadow-[inset_0px_2px_1px_rgba(0,0,0,0.05),inset_0px_-1px_0px_rgba(0,0,0,0.05)] active:translate-y-[2px]"
    },
    white: {
      // For number chips
      gradient: "bg-white",
      text: "text-slate-700",
      highlight: "shadow-[inset_0px_2px_1px_rgba(255,255,255,1),inset_0px_-3px_0px_rgba(0,0,0,0.1),0px_1px_2px_rgba(0,0,0,0.1)]",
      active: "active:shadow-[inset_0px_2px_1px_rgba(0,0,0,0.05),inset_0px_-1px_0px_rgba(0,0,0,0.05)] active:translate-y-[2px]"
    }
  };

  const currentVariant = variants[variant];

  // If disabled, override styles
  const disabledStyles = disabled ? "opacity-50 cursor-not-allowed grayscale pointer-events-none" : "cursor-pointer active:scale-[0.98]";

  return (
    // Outer Socket Wrapper
    <div className={`${socketBase} ${socketShadow} ${wrapperClassName}`}>

      {/* Inner Depth Shadow (The blur under the button) */}
      {!disabled && (
          <div className={`absolute top-[6px] left-1/2 -translate-x-1/2 w-[92%] h-[85%] bg-black/20 blur-[3px] rounded-[inherit] z-0 pointer-events-none`} />
      )}

      {/* Actual Button Surface */}
      <button
        className={`
          relative z-10 w-[calc(100%-8px)] h-[calc(100%-8px)]
          flex items-center justify-center font-bold tracking-wide uppercase
          transition-all duration-100 ease-out
          ${shape}
          ${currentVariant.gradient}
          ${currentVariant.text}
          ${currentVariant.highlight}
          ${currentVariant.active}
          ${disabledStyles}
          ${className}
        `}
        disabled={disabled}
        {...props}
      >
        {children}
      </button>
    </div>
  );
}
