# Arithmetic Practice App

A modern, high-performance web application designed to help users practice various arithmetic operations, including multiplication tables, powers, fractions, alphabet position, and general practice. Built with a focus on speed, responsiveness, and a "juicy", gamified user interface.

## Features

- **Multiple Practice Modes**:
  - **Tables**: Practice multiplication tables with customizable number selection.
  - **Powers**: Squares and cubes practice.
  - **Fractions**: Convert fractions to decimals or decimals to percentages.
  - **Alphabet Position**: Practice converting letters to their numerical position (A=1, B=2, etc).
  - **Practice**: General arithmetic with configurable digit ranges.
- **Gamified Experience**:
  - "Juicy" UI design with 3D button effects and vibrant colors.
  - Smooth, accurate visual timers for speed drills.
  - Immediate feedback with sound and visual cues (Correct/Incorrect/Time Up).
- **Mobile-First Design**:
  - Optimized for mobile devices with a fixed viewport layout.
  - Custom virtual keyboard for numeric input to bypass native keyboard limitations.
  - "Immersive Sticky" full-screen mode on Android.

## Tech Stack

- **Framework**: [Next.js 16](https://nextjs.org/) (App Router)
- **Language**: [TypeScript](https://www.typescriptlang.org/)
- **Styling**: [Tailwind CSS](https://tailwindcss.com/)
- **Mobile Runtime**: [Capacitor](https://capacitorjs.com/) (Android)
- **State Management**: React Hooks

## Getting Started

### Prerequisites

- Node.js 20+
- pnpm

### Installation

1. **Clone the repository:**
   ```bash
   git clone <repository-url>
   cd <project-directory>
   ```

2. **Install dependencies:**
   ```bash
   pnpm install
   ```

3. **Run the development server:**
   ```bash
   pnpm run dev
   ```
   Open [http://localhost:9002](http://localhost:9002) in your browser.

### Building for Production

To create a static build suitable for Capacitor export:

```bash
pnpm run static
```

This runs `next build` followed by `cap sync`.

## Project Structure

- **`src/app`**: Next.js App Router pages and layouts.
- **`src/components`**: Reusable React components.
  - **`screens`**: Full-screen page components (e.g., `ExecutionScreen`, `HomeScreen`).
  - **`VirtualKeyboard.tsx`**: Custom numeric keypad.
- **`src/lib`**: Helper functions and type definitions.
  - **`question-helpers.ts`**: Logic for generating arithmetic questions.
  - **`security.ts`**: Security utilities (secure RNG, input validation).
- **`android`**: Capacitor Android project files.

## Mobile Deployment (Android)

The project is configured to use Capacitor for Android deployment.

1. Ensure Android Studio is installed.
2. Build the web assets:
   ```bash
   pnpm run static
   ```
3. Open the Android project:
   ```bash
   npx cap open android
   ```
4. Run/Debug directly from Android Studio or build the APK.

## License

This project is private and proprietary.
