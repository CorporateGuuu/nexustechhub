import { AuthProvider } from '../providers/AuthProvider';
import { Inter } from 'next/font/google';
import './globals.css';
import MobileHeader from '../components/mobile/MobileHeader';
import { MobileBottomNav } from '../components/mobile/MobileBottomNav';
import { Toaster } from 'sonner';

const inter = Inter({ subsets: ['latin'] });

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={`${inter.className} bg-white`}>
        <AuthProvider>
          <div className="min-h-screen flex flex-col">
            {/* Mobile Header with Hamburger */}
            <MobileHeader />

            {/* Main Content */}
            <main className="flex-1 pb-20 md:pb-0">
              {children}
            </main>

            {/* Bottom Navigation (only on mobile) */}
            <MobileBottomNav />
          </div>
          <Toaster position="top-center" />
        </AuthProvider>
      </body>
    </html>
  );
}
