import { notFound } from "next/navigation";
import Link from "next/link";
import { SITE } from "@/lib/data";
import Footer from "@/components/layout/Footer";

export function generateStaticParams() {
  return SITE.projects.map((p) => ({ slug: p.id }));
}

export function generateMetadata({ params }: { params: { slug: string } }) {
  const project = SITE.projects.find((p) => p.id === params.slug) as any;
  if (!project) return {};
  return {
    title: project.title,
    description: project.description,
  };
}

export default async function ProjectPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const project = SITE.projects.find((p) => p.id === slug) as any;
  if (!project) notFound();

  const others = SITE.projects.filter((x) => x.id !== project.id) as any[];
  const nextProj = others[0];

  return (
    <main className="w-full bg-[var(--bg-primary)]">
      
      {/* Hero */}
      <section className="relative pt-[140px] md:pt-[200px] pb-24 md:pb-32 border-b border-[var(--border-subtle)] overflow-hidden">
        <div 
          className="absolute inset-0 opacity-[0.03] pointer-events-none"
          style={{ background: `radial-gradient(circle at 50% 0%, ${project.gradient[1]}, transparent)` }}
        />
        
        <div className="w-full max-w-[1440px] mx-auto px-6 md:px-12 lg:px-16 relative z-10">
          <div className="flex flex-col md:flex-row justify-between items-start gap-8 mb-12">
            <Link href="/work" className="btn-ghost !py-2 !px-4">
              ← Back
            </Link>
            <div className="flex gap-2">
              <span className="badge">{project.category}</span>
              <span className="badge">{project.year}</span>
            </div>
          </div>

          <h1 className="font-display text-[clamp(48px,10vw,140px)] font-bold uppercase tracking-tight leading-[0.85] text-[var(--text-primary)]">
            {project.title}
          </h1>
          
          <p className="mt-12 text-xl md:text-3xl text-[var(--text-secondary)] max-w-3xl leading-relaxed font-medium">
            {project.description}
          </p>
        </div>
      </section>

      {/* Content Grid */}
      <section className="w-full max-w-[1440px] mx-auto px-6 md:px-12 lg:px-16 py-24 md:py-40">
        <div className="grid grid-cols-1 lg:grid-cols-[1fr_2fr] gap-20">
          
          {/* Left Meta */}
          <div className="space-y-12 lg:sticky lg:top-[120px] lg:self-start">
            <div>
              <span className="label block mb-4 text-[var(--text-tertiary)]">Role</span>
              <span className="font-display text-2xl text-[var(--text-primary)]">{project.role}</span>
            </div>
            <div>
              <span className="label block mb-4 text-[var(--text-tertiary)]">Status</span>
              <span className="font-display text-2xl text-[var(--text-primary)]">{"status" in project ? project.status : "COMPLETED"}</span>
            </div>
            
            <div className="pt-8 border-t border-[var(--border-subtle)]">
              <span className="label block mb-6 text-[var(--text-tertiary)]">Stack</span>
              <div className="flex flex-wrap gap-2">
                {project.stack.map((s: string) => (
                  <span key={s} className="px-3 py-1.5 rounded-md bg-white/[0.03] font-mono text-[10px] uppercase tracking-wider text-[var(--text-secondary)] border border-[var(--border-subtle)]">
                    {s}
                  </span>
                ))}
              </div>
            </div>

            {project.link && (
              <div className="pt-8">
                <a href={project.link} target="_blank" rel="noreferrer" className="btn-primary w-full">
                  Visit Live Project ↗
                </a>
              </div>
            )}
          </div>

          {/* Right Content */}
          <div className="prose prose-invert prose-lg max-w-none">
            <h2 className="font-display text-4xl uppercase tracking-tight mb-8 text-[var(--text-primary)]">
              The Context.
            </h2>
            <p className="text-[var(--text-secondary)] leading-relaxed text-lg">
              {project.longDescription || project.description}
            </p>

            <div className="mt-20 glass-card-elevated p-12 aspect-video flex items-center justify-center">
              <span className="font-mono text-sm text-[var(--text-tertiary)] uppercase tracking-widest">
                [ Visual Assets Pending ]
              </span>
            </div>
          </div>

        </div>
      </section>

      {/* Next Project */}
      {nextProj && (
        <section className="border-t border-[var(--border-subtle)] bg-[var(--bg-secondary)] overflow-hidden">
          <Link href={`/work/${nextProj.id}`} className="group block w-full max-w-[1440px] mx-auto px-6 md:px-12 lg:px-16 py-32 relative">
            <div className="absolute right-0 top-0 w-1/2 h-full bg-gradient-to-l from-[var(--accent-glow)] to-transparent opacity-0 group-hover:opacity-30 transition-opacity duration-1000 pointer-events-none" />
            
            <span className="label text-[var(--text-tertiary)] block mb-8">Next Project</span>
            <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-8">
              <h3 className="font-display text-[clamp(40px,8vw,100px)] uppercase font-bold tracking-tight text-[var(--text-secondary)] group-hover:text-[var(--text-primary)] transition-colors duration-500">
                {nextProj.title} →
              </h3>
              <span className="badge border-[var(--border-subtle)] text-[var(--text-secondary)]">
                {nextProj.category}
              </span>
            </div>
          </Link>
        </section>
      )}

      <Footer />
    </main>
  );
}
