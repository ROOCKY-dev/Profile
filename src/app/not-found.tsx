import Link from "next/link";
import Footer from "@/components/layout/Footer";

export default function NotFound() {
  return (
    <main className="min-h-screen flex flex-col bg-white pt-[60px]">
      <div className="flex-1 flex flex-col items-center justify-center p-6 md:p-12 text-center">
        <span className="text-[clamp(100px,25vw,300px)] font-black leading-none tracking-[-0.05em] uppercase text-gray-50">
          404
        </span>
        <div className="label-text mt-4">File Not Found / Access Denied</div>
        <h2 className="text-2xl md:text-4xl font-black uppercase mt-8 max-w-md">
          The requested asset does not exist in the workshop.
        </h2>
        <Link
          href="/"
          className="btn btn-black mt-12"
        >
          <span>Back to Index</span><span>→</span>
        </Link>
      </div>
      <Footer />
    </main>
  );
}
