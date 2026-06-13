import { SITE } from "@/lib/data";
import Footer from "@/components/layout/Footer";

import { createClient } from "@/lib/supabase/server";

export default async function LogPage() {
  const supabase = await createClient();
  const { data: logs } = await supabase
    .from("logs")
    .select("*")
    .order("created_at", { ascending: false });

  // Fallback to static data if table isn't created or empty
  const displayLogs = logs && logs.length > 0 ? logs : SITE.log;

  return (
    <main className="w-full bg-[var(--bg-primary)]">
      {/* Header */}
      <section className="relative pt-[120px] md:pt-[180px] pb-16 md:pb-24 border-b border-[var(--border-subtle)] overflow-hidden">
        <div className="absolute inset-0 line-grid opacity-10 pointer-events-none" />
        <div className="absolute top-0 right-0 w-1/2 h-full bg-gradient-to-l from-[var(--accent-glow)] to-transparent opacity-30 pointer-events-none" />
        
        <div className="w-full max-w-[1440px] mx-auto px-6 md:px-12 lg:px-16 relative z-10">
          <div className="mb-8">
            <span className="badge">Syslog // Dev Log</span>
          </div>
          <h1 className="font-display text-[clamp(48px,10vw,120px)] font-bold uppercase tracking-tight leading-none text-[var(--text-primary)]">
            Workshop <br />
            <span className="text-[var(--text-secondary)]">Logs.</span>
          </h1>
          <p className="mt-8 text-xl text-[var(--text-secondary)] max-w-2xl leading-relaxed">
            Live updates, scattered thoughts, and dev logs from the workbench. A place to share what I'm currently building or breaking.
          </p>
        </div>
      </section>

      {/* Main Content */}
      <section className="w-full max-w-[1440px] mx-auto px-6 md:px-12 lg:px-16 py-24">
        <div className="grid grid-cols-1 lg:grid-cols-[1fr_400px] gap-20">
          
          {/* Left: Feed */}
          <div className="space-y-12">
            <div className="flex items-center gap-4 border-b border-[var(--border-subtle)] pb-6 mb-12">
              <div className="status-dot bg-amber-400" />
              <span className="font-mono text-sm tracking-wider uppercase text-[var(--text-secondary)]">
                Live Feed Active
              </span>
            </div>

            {displayLogs.map((entry, i) => (
              <article 
                key={entry.id || i}
                className="group relative glass-card p-8 rounded-2xl"
              >
                <div className="flex flex-col md:flex-row md:items-center gap-4 md:gap-8 mb-6">
                  <span className="font-mono text-sm text-[var(--accent-primary)] bg-[var(--accent-glow)] px-3 py-1 rounded-md">
                    {entry.time}
                  </span>
                  <div className="h-px bg-[var(--border-subtle)] flex-1 hidden md:block" />
                </div>
                
                <p className="font-mono text-lg text-[var(--text-primary)]">
                  {entry.event}
                </p>
              </article>
            ))}

            <div className="pt-12 text-center">
              <span className="font-mono text-sm text-[var(--text-tertiary)] opacity-60">
                End of recent logs. System standing by <span className="animate-pulse">_</span>
              </span>
            </div>
          </div>

          {/* Right: Sidebar / Community */}
          <div
            className="relative"
          >
            <div className="glass-card-elevated p-8 rounded-3xl sticky top-[120px]">
              <span className="badge mb-8">Community</span>
              
              <h3 className="font-display text-2xl uppercase tracking-tight text-[var(--text-primary)] mb-4">
                Connect & Collaborate
              </h3>
              
              <p className="text-[var(--text-secondary)] leading-relaxed mb-8">
                Want to discuss a recent log, share feedback, or collaborate on a mod? Drop me a message directly.
              </p>

              <div className="flex flex-col gap-4">
                <a href={SITE.personal.socials.wa} target="_blank" rel="noreferrer" className="btn-primary justify-center text-center">
                  Chat on WhatsApp
                </a>
                <a href={`mailto:${SITE.personal.email}`} className="btn-ghost justify-center text-center">
                  Email Me
                </a>
              </div>
            </div>
          </div>

        </div>
      </section>

      <Footer />
    </main>
  );
}
