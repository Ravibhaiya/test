import type { Metadata, Viewport } from 'next';
import { Nunito, Fredoka, Source_Code_Pro } from 'next/font/google';
import './globals.css';

const fredoka = Fredoka({
  subsets: ['latin'],
  variable: '--font-fredoka',
  display: 'swap',
});

const nunito = Nunito({
  subsets: ['latin'],
  variable: '--font-nunito',
  display: 'swap',
});

const sourceCodePro = Source_Code_Pro({
  subsets: ['latin'],
  variable: '--font-source-code-pro',
  display: 'swap',
});

export const metadata: Metadata = {
  title: 'Math Tools',
  description: 'Practice multiplication, powers, and roots.',
};

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 1,
  userScalable: false, // Prevents zooming to maintain app-like feel
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <link
          rel="stylesheet"
          href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@24,400,0,0&display=swap"
        />
      </head>
      <body
        className={`${fredoka.variable} ${nunito.variable} ${sourceCodePro.variable} antialiased selection:bg-primary/20`}
      >
        <div id="app-root" className="h-full w-full overflow-hidden bg-background text-foreground">
            {children}
        </div>
      </body>
    </html>
  );
}
