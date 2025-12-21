import type {Config} from 'tailwindcss';

export default {
  darkMode: ['class'],
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    container: {
      center: true,
      padding: '2rem',
      screens: {
        '2xl': '1400px',
      },
    },
    extend: {
      colors: {
        border: 'hsl(var(--border-hsl))',
        input: 'hsl(var(--input))',
        ring: 'hsl(var(--ring))',
        background: 'hsl(var(--background-hsl))',
        foreground: 'hsl(var(--foreground-hsl))',
        primary: {
          DEFAULT: 'hsl(var(--primary-hsl))',
          depth: 'hsl(var(--primary-depth-hsl))',
          foreground: 'hsl(var(--primary-foreground-hsl))',
        },
        secondary: {
          DEFAULT: 'hsl(var(--secondary-hsl))',
          depth: 'hsl(var(--secondary-depth-hsl))',
          foreground: 'hsl(var(--secondary-foreground-hsl))',
        },
        destructive: {
          DEFAULT: 'hsl(var(--destructive-hsl))',
          depth: 'hsl(var(--destructive-depth-hsl))',
          foreground: 'hsl(var(--destructive-foreground-hsl))',
        },
        success: {
          DEFAULT: 'hsl(var(--success-hsl))',
          depth: 'hsl(var(--success-depth-hsl))',
          foreground: 'hsl(var(--success-foreground-hsl))',
        },
        muted: {
          DEFAULT: 'hsl(var(--muted-hsl))',
          foreground: 'hsl(var(--muted-foreground-hsl))',
        },
        accent: {
          DEFAULT: 'hsl(var(--accent-hsl))',
          depth: 'hsl(var(--accent-depth-hsl))',
          foreground: 'hsl(var(--accent-foreground-hsl))',
        },
        popover: {
          DEFAULT: 'hsl(var(--popover-hsl))',
          foreground: 'hsl(var(--popover-foreground-hsl))',
        },
        card: {
          DEFAULT: 'hsl(var(--card-hsl))',
          foreground: 'hsl(var(--card-foreground-hsl))',
        },
      },
      borderRadius: {
        lg: 'var(--radius)',
        md: 'calc(var(--radius) - 2px)',
        sm: 'calc(var(--radius) - 4px)',
        'xl': '1.25rem',
        '2xl': '1.5rem',
        '3xl': '2rem',
      },
      boxShadow: {
        'soft': '0 4px 12px rgba(0,0,0,0.05)',
        'soft-md': '0 6px 16px rgba(0,0,0,0.08)',
      },
      keyframes: {
        'accordion-down': {
          from: {
            height: '0',
          },
          to: {
            height: 'var(--radix-accordion-content-height)',
          },
        },
        'accordion-up': {
          from: {
            height: 'var(--radix-accordion-content-height)',
          },
          to: {
            height: '0',
          },
        },
        'bounce-soft': {
            '0%, 100%': { transform: 'scale(1)' },
            '50%': { transform: 'scale(0.95)' },
        }
      },
      animation: {
        'accordion-down': 'accordion-down 0.2s ease-out',
        'accordion-up': 'accordion-up 0.2s ease-out',
        'bounce-soft': 'bounce-soft 0.2s ease-in-out',
      },
    },
  },
  plugins: [require('tailwindcss-animate')],
} satisfies Config;
