import { PROJECTS } from '@/lib/project-data';
import SimpleFooter from '@/components/layout/SimpleFooter';
import Link from 'next/link';
import { notFound } from 'next/navigation';

export async function generateStaticParams() {
  return PROJECTS.map((project) => ({
    slug: project.id,
  }));
}

export default async function ProjectDetail({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const project = PROJECTS.find((p) => p.id === slug);

  if (!project) {
    notFound();
  }

  // Find next project
  const currentIndex = PROJECTS.findIndex((p) => p.id === slug);
  const nextProject = PROJECTS[(currentIndex + 1) % PROJECTS.length];

  const displayDescription = project.longDescription || project.description;

  return (
    <main>
      {/* Hero Section */}
      <section className="relative h-screen w-full flex flex-col justify-end overflow-hidden border-b border-border-dark">
        <div className="absolute inset-0 z-0">
          <div className="absolute inset-0 bg-gradient-to-t from-[#0A0A0A] via-[#0A0A0A]/50 to-transparent z-10" />
          <div
            className="w-full h-full bg-cover bg-center transition-transform duration-[2s] hover:scale-105"
            style={{ backgroundImage: `url('${project.image}')` }}
          />
        </div>

        <div className="relative z-20 px-6 pb-12 md:px-12 md:pb-16 w-full max-w-[1920px] mx-auto">
          {/* Breadcrumb */}
          <div className="flex items-center gap-2 mb-6 font-mono text-sm">
            <Link href="/" className="text-text-muted hover:text-primary transition-colors cursor-hover">HOME</Link>
            <span className="text-border-dark">/</span>
            <Link href="/work" className="text-text-muted hover:text-primary transition-colors cursor-hover">WORK</Link>
            <span className="text-border-dark">/</span>
            <span className="text-primary">{project.id.toUpperCase()}</span>
          </div>

          <div className="flex flex-col gap-2 mb-4">
            <div className="flex items-center gap-3">
              <span className="h-[1px] w-12 bg-primary" />
              <span className="text-primary font-mono text-sm tracking-widest uppercase">Case Study {String(currentIndex + 1).padStart(2, '0')}</span>
            </div>
          </div>
          <h1 className="text-6xl md:text-8xl lg:text-[10rem] font-bold leading-[0.9] tracking-tighter text-white mix-blend-screen uppercase">
            {project.title.split(' ')[0]} <br/>
            <span className="text-stroke-primary text-transparent bg-clip-text bg-gradient-to-r from-white to-gray-500">
              {project.title.split(' ').slice(1).join(' ')}
            </span>
          </h1>
        </div>

        <div className="absolute bottom-8 right-8 z-20 animate-bounce hidden md:block">
          <span className="material-symbols-outlined text-primary text-4xl">arrow_downward</span>
        </div>
      </section>

      {/* Metadata Grid */}
      <section className="w-full border-b border-border-dark bg-background-dark">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 divide-y md:divide-y-0 md:divide-x divide-border-dark">
          <div className="p-8 hover:bg-surface transition-colors duration-300 group">
            <span className="block text-text-muted font-mono text-xs mb-2 tracking-widest">ROLE</span>
            <div className="text-xl font-bold group-hover:text-primary transition-colors">{project.role || 'Developer'}</div>
          </div>
          <div className="p-8 hover:bg-surface transition-colors duration-300 group">
            <span className="block text-text-muted font-mono text-xs mb-2 tracking-widest">TIMELINE</span>
            <div className="text-xl font-bold group-hover:text-primary transition-colors">{project.year}</div>
          </div>
          <div className="p-8 hover:bg-surface transition-colors duration-300 group">
            <span className="block text-text-muted font-mono text-xs mb-2 tracking-widest">CATEGORY</span>
            <div className="text-xl font-bold group-hover:text-primary transition-colors">{project.category}</div>
          </div>
          <div className="p-8 hover:bg-surface transition-colors duration-300 group">
            <span className="block text-text-muted font-mono text-xs mb-2 tracking-widest">STACK</span>
            <div className="text-xl font-bold group-hover:text-primary transition-colors">
              {project.stack ? project.stack.slice(0, 3).join(', ') : 'Full Stack'}
            </div>
          </div>
        </div>
      </section>

      {/* Tags Bar */}
      {project.tags && project.tags.length > 0 && (
        <section className="w-full border-b border-border-dark bg-surface/30">
          <div className="px-8 py-4 flex flex-wrap gap-3">
            {project.tags.map((tag) => (
              <span key={tag} className="font-mono text-xs text-primary/80 border border-primary/30 px-3 py-1.5 bg-black/50">
                {tag}
              </span>
            ))}
          </div>
        </section>
      )}

      {/* Narrative Content */}
      <section className="py-24 px-6 md:px-12 bg-background-dark relative overflow-hidden">
        <div className="absolute top-20 right-0 w-[500px] h-[500px] bg-primary/5 rounded-full blur-[120px] pointer-events-none" />
        <div className="max-w-4xl mx-auto grid grid-cols-1 md:grid-cols-12 gap-12">
          <div className="md:col-span-4">
            <div className="sticky top-24">
              <h2 className="text-3xl font-bold mb-6 tracking-tight">THE <br/> CHALLENGE</h2>
              <div className="h-1 w-20 bg-primary mb-6" />
              <p className="font-mono text-sm text-text-muted leading-relaxed">
                {"// SYSTEM_OVERVIEW"}<br/>
                {"// STATUS: DEPLOYED"}<br/>
                {"// PRIORITY: HIGH"}
              </p>
            </div>
          </div>
          <div className="md:col-span-8">
            <div className="prose prose-invert prose-lg max-w-none font-light">
              <p className="text-2xl leading-relaxed text-white mb-8">
                {displayDescription}
              </p>
              {project.stack && project.stack.length > 0 && (
                <div className="mt-8 border-t border-border-dark pt-8">
                  <h4 className="font-mono text-xs text-text-muted tracking-widest mb-4">TECHNOLOGIES USED</h4>
                  <div className="flex flex-wrap gap-3">
                    {project.stack.map((tech) => (
                      <span key={tech} className="px-4 py-2 border border-border-dark text-text-main font-mono text-sm hover:border-primary hover:text-primary transition-colors">
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* Gallery Section */}
      <section className="py-12 px-6 md:px-12 border-y border-border-dark bg-surface/30">
        <div className="max-w-[1920px] mx-auto">
          {project.gallery && project.gallery.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {project.gallery.map((img, i) => (
                <div key={i} className="relative h-[400px] overflow-hidden border border-border-dark group">
                  <div
                    className="absolute inset-0 bg-cover bg-center group-hover:scale-105 transition-transform duration-700"
                    style={{ backgroundImage: `url('${img}')` }}
                  />
                </div>
              ))}
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              <div className="bg-surface border border-border-dark h-[400px] flex items-center justify-center text-text-muted font-mono">GALLERY_ITEM_01</div>
              <div className="bg-surface border border-border-dark h-[400px] flex items-center justify-center text-text-muted font-mono">GALLERY_ITEM_02</div>
              <div className="bg-surface border border-border-dark h-[400px] flex items-center justify-center text-text-muted font-mono">GALLERY_ITEM_03</div>
            </div>
          )}
        </div>
      </section>

      {/* External Link CTA */}
      {project.link && (
        <section className="border-b border-border-dark bg-background-dark">
          <a
            href={project.link}
            target="_blank"
            rel="noopener noreferrer"
            className="group flex items-center justify-center gap-4 px-8 py-8 hover:bg-surface transition-colors duration-300 cursor-hover"
          >
            <span className="font-mono text-sm text-text-muted group-hover:text-primary transition-colors tracking-widest uppercase">
              VIEW LIVE PROJECT
            </span>
            <span className="material-symbols-outlined text-primary group-hover:rotate-[-45deg] transition-transform duration-300">
              arrow_forward
            </span>
          </a>
        </section>
      )}

      {/* Back to all projects */}
      <Link
        href="/work"
        className="group block w-full border-b border-border-dark bg-surface/20 hover:bg-surface transition-colors duration-300 cursor-hover"
      >
        <div className="px-8 py-6 flex items-center justify-center gap-3">
          <span className="material-symbols-outlined text-text-muted group-hover:text-primary transition-colors group-hover:-translate-x-2 transition-transform duration-300">
            arrow_back
          </span>
          <span className="font-mono text-sm text-text-muted group-hover:text-primary transition-colors tracking-widest uppercase">
            ALL PROJECTS
          </span>
        </div>
      </Link>

      {/* Next Project Footer */}
      <Link href={`/work/${nextProject.id}`} className="group relative block h-[60vh] w-full overflow-hidden border-t border-border-dark cursor-hover">
        <div
          className="absolute inset-0 bg-cover bg-center transition-all duration-700 ease-in-out group-hover:scale-110 group-hover:blur-sm opacity-40 group-hover:opacity-60"
          style={{ backgroundImage: `url('${nextProject.image}')` }}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-background-dark via-transparent to-transparent" />

        <div className="relative z-10 h-full flex flex-col items-center justify-center px-6">
          <span className="font-mono text-text-muted text-sm tracking-[0.2em] mb-4 group-hover:text-white transition-colors">NEXT CASE STUDY</span>
          <h2 className="text-5xl md:text-8xl font-bold text-white text-center tracking-tighter group-hover:text-primary transition-colors duration-300 uppercase">
             {nextProject.title}
          </h2>
          <div className="mt-8 flex items-center justify-center h-16 w-16 rounded-full border border-white/20 group-hover:border-primary group-hover:bg-primary transition-all duration-300">
            <span className="material-symbols-outlined text-white text-2xl group-hover:text-black group-hover:rotate-[-45deg] transition-transform duration-300">arrow_forward</span>
          </div>
        </div>
      </Link>

      <SimpleFooter />
    </main>
  );
}
