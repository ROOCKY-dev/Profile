'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { PORTFOLIO_DATA } from '@/lib/portfolio-data';
import StatusPill from '@/components/ui/StatusPill';

export default function Navbar() {
  const pathname = usePathname();
  const D = PORTFOLIO_DATA;
  
  const items = [
    { id: 'home', label: 'Index', path: '/' },
    { id: 'work', label: 'Work', path: '/work' },
  ];

  return (
    <nav className="sticky top-0 z-40 bg-paper/90 backdrop-blur-md border-b-2 border-ink">
      <div className="max-w-[1440px] mx-auto px-7 py-3.5 grid grid-cols-[1fr_auto_1fr] items-center gap-4">
        {/* Left: Logo and Status */}
        <div className="flex items-center gap-3.5">
          <Link href="/" className="font-serif text-lg tracking-[-0.02em] uppercase">
            AG / ROOCKY.DEV
          </Link>
          <StatusPill status="WORKING" />
        </div>

        {/* Center: Nav Items */}
        <div className="flex gap-1">
          {items.map(it => (
            <Link
              key={it.id}
              href={it.path}
              className={`px-3.5 py-2 font-mono text-[11px] tracking-[0.2em] uppercase border-[1.5px] border-transparent transition-colors ${
                pathname === it.path ? 'bg-ink text-paper' : 'bg-transparent text-ink hover:bg-ink/5'
              }`}
            >
              {it.label}
            </Link>
          ))}
        </div>

        {/* Right: Portfolio Info and Contact */}
        <div className="flex justify-end gap-2.5 items-center">
          <span className="label hidden sm:inline">{D.portfolio.issue} / {D.portfolio.version}</span>
          <Link href="/#contact" className="btn solid px-4 py-2.5">
            Contact
          </Link>
        </div>
      </div>
    </nav>
  );
}
