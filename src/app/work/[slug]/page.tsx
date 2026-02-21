import { PORTFOLIO_DATA } from '@/lib/portfolio-data';
import SimpleFooter from '@/components/layout/SimpleFooter';
import Link from 'next/link';
import { notFound } from 'next/navigation';

export async function generateStaticParams() {
  return PORTFOLIO_DATA.projects.map((project) => ({
    slug: project.id,
  }));
}

export default async function ProjectDetail({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const project = PORTFOLIO_DATA.projects.find((p) => p.id === slug);

  if (!project) {
    notFound();
  }

  // Find next project
  const currentIndex = PORTFOLIO_DATA.projects.findIndex((p) => p.id === slug);
  const nextProject = PORTFOLIO_DATA.projects[(currentIndex + 1) % PORTFOLIO_DATA.projects.length];

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
            <div className="text-xl font-bold group-hover:text-primary transition-colors">Lead Developer</div>
          </div>
          <div className="p-8 hover:bg-surface transition-colors duration-300 group">
            <span className="block text-text-muted font-mono text-xs mb-2 tracking-widest">TIMELINE</span>
            <div className="text-xl font-bold group-hover:text-primary transition-colors">{project.year}</div>
          </div>
          <div className="p-8 hover:bg-surface transition-colors duration-300 group">
            <span className="block text-text-muted font-mono text-xs mb-2 tracking-widest">CLIENT</span>
            <div className="text-xl font-bold group-hover:text-primary transition-colors">{project.category}</div>
          </div>
          <div className="p-8 hover:bg-surface transition-colors duration-300 group">
            <span className="block text-text-muted font-mono text-xs mb-2 tracking-widest">STACK</span>
            <div className="text-xl font-bold group-hover:text-primary transition-colors">Full Stack</div>
          </div>
        </div>
      </section>

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
                {project.description}
              </p>
              <p className="text-text-muted mb-6">
                This project required a unique approach to problem-solving, leveraging advanced algorithms and creative design thinking. We focused on delivering a seamless user experience while maintaining high performance.
              </p>
              <p className="text-text-muted">
                The technical implementation involved custom shaders, real-time data processing, and a scalable backend architecture.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Masonry Gallery Placeholder */}
      <section className="py-12 px-6 md:px-12 border-y border-border-dark bg-surface/30">
        <div className="max-w-[1920px] mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
             <div className="bg-surface border border-border-dark h-[400px] flex items-center justify-center text-text-muted font-mono">GALLERY_ITEM_01</div>
             <div className="bg-surface border border-border-dark h-[400px] flex items-center justify-center text-text-muted font-mono">GALLERY_ITEM_02</div>
             <div className="bg-surface border border-border-dark h-[400px] flex items-center justify-center text-text-muted font-mono">GALLERY_ITEM_03</div>
          </div>
        </div>
      </section>

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
