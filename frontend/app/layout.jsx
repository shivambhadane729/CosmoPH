import './globals.css';
import { Inter } from 'next/font/google';
import TopNav from '../components/TopNav';

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
});

export const metadata = {
  title: 'CosmoPH | Topological Cosmology Story',
  description: 'Cinematic scientific storytelling for CMB topology analysis.',
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className={inter.variable}>
      <body>
        <TopNav />
        <main className="pt-20">{children}</main>
      </body>
    </html>
  );
}
