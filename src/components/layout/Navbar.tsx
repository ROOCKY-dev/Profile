"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { PORTFOLIO_DATA } from "@/lib/portfolio-data";
import { StatusPill } from "../ui/WorkshopStatus";

export default function Navbar() {
  const pathname = usePathname();
  const D = PORTFOLIO_DATA;
  
  const navItems = [
    { label: "Index", href: "/" },
    { label: "Work", href: "/work" },
  ];

  return (
    <nav className="fixed top-0 left-0 w-full z-50 bg-white/90 backdrop-blur-md border-b-2 border-black">
      <div className="w-full px-6 md:px-12 lg:px-20 h-[64px] flex items-center justify-between">
        <div className="flex items-center gap-6">
          <Link href="/" className="text-xl font-serif leading-none tracking-tighter uppercase">
            ROOCKY<span className="text-gray-300">.DEV</span>
          </Link>
          
          <div className="hidden sm:block">
            <StatusPill status={D.stat.status} />
          </div>
        </div>

        <div className="flex items-center gap-10">
          <div className="hidden md:flex items-center gap-8">
            {navItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className={`font-mono text-[10px] font-black tracking-[0.2em] uppercase transition-colors hover:text-black ${
                  pathname === item.href ? "text-black underline underline-offset-4" : "text-gray-400"
                }`}
              >
                {item.label}
              </Link>
            ))}
          </div>

          <Link
            href="/#contact"
            className="btn btn-black h-[40px] px-6 text-[10px] font-black"
          >
            Contact
          </Link>
        </div>
      </div>
    </nav>
  );
}
