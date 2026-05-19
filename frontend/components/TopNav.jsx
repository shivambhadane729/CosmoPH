import Link from 'next/link';
import { Atom, Sparkles } from 'lucide-react';

const links = [
  { href: '/', label: 'Home' },
  { href: '/timeline', label: 'Timeline' },
];

export default function TopNav() {
  return (
    <header className="fixed inset-x-0 top-0 z-50 border-b border-white/10 bg-black/65 backdrop-blur-2xl">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-5 py-4 md:px-8">
        <Link href="/" className="flex items-center gap-2 text-lg font-semibold tracking-tight text-white transition-opacity hover:opacity-80">
          <Atom className="text-white" size={22} />
          CosmoPH
        </Link>

        <nav className="flex items-center gap-2 md:gap-6 text-sm text-white/70">
          <div className="hidden items-center gap-6 md:flex">
            {links.map((link) => (
              <Link key={link.href} href={link.href} className="transition-colors hover:text-white">
                {link.label}
              </Link>
            ))}
          </div>

          <Link
            href="/timeline"
            className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white px-4 py-2 text-sm font-semibold text-black shadow-[0_0_24px_rgba(255,255,255,0.22)] transition-transform hover:scale-[1.02]"
          >
            <Sparkles size={16} />
            Launch Experience
          </Link>
        </nav>
      </div>
    </header>
  );
}
