import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import { PROJECTS } from '@/lib/project-data';
import Footer from '@/components/layout/Footer';

interface PageProps {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  return PROJECTS.map((project) => ({
    slug: project.id,
  }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const project = PROJECTS.find((p) => p.id === slug);
  if (!project) return {};

  return {
    title: `${project.title} | Case Study`,
    description: project.description,
  };
}

export default async function ProjectPage({ params }: PageProps) {
  const { slug } = await params;
  const project = PROJECTS.find((p) => p.id === slug);
  if (!project) notFound();

  const nextProject = PROJECTS[(PROJECTS.indexOf(project) + 1) % PROJECTS.length];

  return (
    <div className="bg-paper min-h-screen">
      {/* Back Link & Ticker */}
      <section className="border-b-2 border-ink">
        <div className="flex justify-between items-center px-10 py-5 bg-paper-2">
          <Link href="/work" className="font-mono text-[11px] tracking-[0.2em] uppercase hover:text-accent transition-colors">
            ← Back to Index
          </Link>
          <span className="label">Project / {project.n}</span>
        </div>
      </section>

      {/* Hero Image */}
      <section className="border-b-2 border-ink relative aspect-[21/9] overflow-hidden">
        <img 
          src={project.image} 
          alt={project.title}
          className="w-full h-full object-cover grayscale transition-all duration-700 hover:grayscale-0"
        />
        <div className="absolute inset-0 bg-ink/10 mix-blend-multiply pointer-events-none" />
      </section>

      {/* Title Section */}
      <section className="border-b-2 border-ink">
        <div className="p-10 pt-20 pb-14 grid grid-cols-1 lg:grid-cols-[1fr_400px] gap-11 items-end">
          <div>
            <span className="label mb-4 block">Case Study / {project.year}</span>
            <h1 className="font-serif text-[clamp(60px,12vw,180px)] tracking-[-0.04em] uppercase leading-[0.82]">
              {project.title}
            </h1>
          </div>
          <div className="text-left lg:text-right pb-4">
            <p className="font-serif text-2xl tracking-[-0.01em] uppercase mb-4">
              {project.tagline}
            </p>
            <div className="flex gap-2 justify-start lg:justify-end flex-wrap">
              {project.tags?.map(t => (
                <span key={t} className="badge px-2 py-1 border-[1.5px] border-ink font-mono text-[9px] tracking-[0.18em] uppercase bg-paper">
                  {t}
                </span>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Metadata & Content */}
      <section className="border-b-2 border-ink">
        <div className="grid grid-cols-1 lg:grid-cols-[400px_1fr] border-r-2 border-ink last:border-r-0">
          {/* Metadata Sidebar */}
          <div className="border-r-2 border-ink">
            <div className="p-10 border-b-2 border-ink">
              <span className="label mb-4 block">Role</span>
              <div className="font-serif text-2xl tracking-[-0.01em] uppercase">{project.role}</div>
            </div>
            <div className="p-10 border-b-2 border-ink">
              <span className="label mb-4 block">Discipline</span>
              <div className="font-serif text-2xl tracking-[-0.01em] uppercase">{project.category}</div>
            </div>
            <div className="p-10">
              <span className="label mb-4 block">Stack</span>
              <div className="flex flex-col gap-2">
                {project.stack?.map(s => (
                  <div key={s} className="font-mono text-xs tracking-wider uppercase flex justify-between">
                    <span>{s}</span>
                    <span className="text-muted">●</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Main Narrative */}
          <div className="p-10 lg:p-20 bg-paper-2">
            <div className="max-w-[800px]">
              <div className="label mb-9">$ cat /overview</div>
              <p className="text-xl leading-[1.6] text-ink mb-11 font-medium">
                {project.description}
              </p>
              <div className="rule-h mb-11 opacity-20" />
              <p className="text-lg leading-[1.8] text-ink/80 whitespace-pre-wrap">
                {project.longDescription || project.description}
              </p>
              
              {project.link && (
                <div className="mt-14">
                  <a 
                    href={project.link} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="btn solid group"
                  >
                    <span>Visit Project</span>
                    <span className="group-hover:translate-x-1 transition-transform">→</span>
                  </a>
                </div>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* Gallery (if any) */}
      {project.gallery && project.gallery.length > 0 && (
        <section className="border-b-2 border-ink p-10 grid grid-cols-1 md:grid-cols-2 gap-10">
          {project.gallery.map((img, idx) => (
            <div key={idx} className="border-2 border-ink overflow-hidden aspect-video">
              <img src={img} alt={`${project.title} Gallery ${idx}`} className="w-full h-full object-cover grayscale hover:grayscale-0 transition-all duration-500" />
            </div>
          ))}
        </section>
      )}

      {/* Next Project Teaser */}
      <section className="section-dark p-10 pt-24 pb-24 text-center border-b-2 border-ink relative overflow-hidden">
        <div className="watermark absolute inset-0 flex items-center justify-center opacity-5 pointer-events-none">
          NEXT
        </div>
        <div className="relative z-10">
          <span className="label text-muted-2 mb-6 block">Up Next</span>
          <Link 
            href={`/work/${nextProject.id}`}
            className="group inline-block"
          >
            <h2 className="font-serif text-[clamp(40px,8vw,120px)] tracking-[-0.04em] uppercase leading-none group-hover:text-accent transition-colors">
              {nextProject.title}
            </h2>
            <div className="font-mono text-sm tracking-[0.2em] uppercase mt-6 opacity-60 group-hover:opacity-100 transition-opacity">
              View Project →
            </div>
          </Link>
        </div>
      </section>

      <Footer />
    </div>
  );
}
