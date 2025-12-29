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
  const isDev = process.env.NODE_ENV === 'development';
  // Security: strict CSP, only allow unsafe-eval in development.
  // We use 'unsafe-inline' for scripts as Next.js requires it for hydration in static exports (unless using nonces, which are hard with static export).
  const csp = `default-src 'self'; script-src 'self' 'unsafe-inline' ${isDev ? "'unsafe-eval'" : ""}; style-src 'self' 'unsafe-inline' https://fonts.googleapis.com; font-src 'self' https://fonts.gstatic.com; img-src 'self' data: https://placehold.co https://images.unsplash.com https://picsum.photos; object-src 'none'; base-uri 'self'; form-action 'self';`;

  return (
    <html lang="en">
      <head>
        <meta
          httpEquiv="Content-Security-Policy"
          content={csp}
        />
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
