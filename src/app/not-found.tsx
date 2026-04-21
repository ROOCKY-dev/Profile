import Link from 'next/link';

export default function NotFound() {
  return (
    <main className="min-h-screen flex flex-col items-center justify-center px-6">
      <span className="text-[clamp(120px,25vw,240px)] font-black leading-none tracking-[-8px]">
        404
      </span>
      <div className="label-text mt-4">Page Not Found</div>
      <Link
        href="/"
        className="mt-8 text-[10px] font-bold tracking-[3px] uppercase bg-black text-white px-6 py-3 border-2 border-black hover:bg-white hover:text-black transition-colors"
      >
        Back to Home →
      </Link>
    </main>
  );
}
