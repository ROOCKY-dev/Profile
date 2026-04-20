import Link from 'next/link';

export default function NotFound() {
  return (
    <main className="grid-bg min-h-screen flex flex-col items-center justify-center p-10 text-center">
      <div className="label mb-6">Error / 404</div>
      <h1 className="font-serif text-[clamp(80px,20vw,320px)] leading-none tracking-[-0.05em] uppercase mb-8">
        Lost.
      </h1>
      <p className="text-lg max-w-[480px] mb-12">
        The page you are looking for does not exist or has been moved to a different coordinate.
      </p>
      <Link href="/" className="btn solid">
        <span>Back to Home</span><span>→</span>
      </Link>
    </main>
  );
}
