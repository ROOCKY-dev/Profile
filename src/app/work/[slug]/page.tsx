import { notFound } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';
import { PROJECTS } from '@/lib/project-data';
import Footer from '@/components/layout/Footer';

export function generateStaticParams() {
  return PROJECTS.map((p) => ({ slug: p.id }));
}

export function generateMetadata({ params }: { params: { slug: string } }) {
  const project = PROJECTS.find((p) => p.id === params.slug);
  if (!project) return {};
  return {
    title: project.title,
    description: project.description,
  };
}

export default async function ProjectPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const project = PROJECTS.find((p) => p.id === slug);
  if (!project) notFound();

  const currentIndex = PROJECTS.findIndex((p) => p.id === slug);
  const nextProject = PROJECTS[(currentIndex + 1) % PROJECTS.length];

  return (
    <main className="pt-[60px]">
      {/* Breadcrumb */}
      <div className="px-6 md:px-12 py-4 border-b-[3px] border-black">
        <div className="label-text">
          <Link href="/work" className="hover:text-black transition-colors">Work</Link>
          <span className="mx-2">/</span>
          <span className="text-black">{project.title}</span>
        </div>
      </div>

      {/* Hero Image */}
      <div className="relative aspect-[21/9] border-b-[3px] border-black overflow-hidden">
        <Image
          src={project.image}
          alt={project.title}
          fill
          className="object-cover"
          priority
        />
      </div>

      {/* Title */}
      <div className="px-6 md:px-12 py-8 border-b-[3px] border-black">
        <h1 className="text-[clamp(36px,8vw,72px)] font-black uppercase leading-[0.9] tracking-[-3px]">
          {project.title}
        </h1>
      </div>

      {/* Metadata Grid */}
      <div className="grid grid-cols-2 md:grid-cols-4 border-b-[3px] border-black">
        {[
          { label: 'Role', value: project.role ?? 'Developer' },
          { label: 'Year', value: project.year },
          { label: 'Category', value: project.category },
          { label: 'Stack', value: project.stack?.join(', ') ?? '—' },
        ].map((item, i) => (
          <div
            key={item.label}
            className={`p-6 ${i < 3 ? 'border-r-[3px] border-black' : ''} ${i < 2 ? 'border-b-[3px] md:border-b-0 border-black' : ''}`}
          >
            <div className="label-text mb-2">{item.label}</div>
            <div className="text-[13px] font-bold">{item.value}</div>
          </div>
        ))}
      </div>

      {/* Tags */}
      {project.tags && (
        <div className="px-6 md:px-12 py-6 border-b-[3px] border-black flex flex-wrap gap-2">
          {project.tags.map((tag) => (
            <span
              key={tag}
              className="text-[9px] font-bold tracking-[2px] uppercase border-2 border-black px-3 py-1"
            >
              {tag}
            </span>
          ))}
        </div>
      )}

      {/* Content */}
      <div className="grid grid-cols-1 md:grid-cols-[240px_1fr] border-b-[3px] border-black">
        <div className="p-6 md:p-8 md:border-r-[3px] md:border-black md:sticky md:top-[60px] md:self-start">
          <div className="label-text">About</div>
        </div>
        <div className="p-6 md:p-8">
          <p className="text-[14px] leading-[1.8] text-gray max-w-2xl">
            {project.longDescription ?? project.description}
          </p>
        </div>
      </div>

      {/* Gallery */}
      {project.gallery && project.gallery.length > 0 && (
        <div className="grid grid-cols-1 md:grid-cols-3 border-b-[3px] border-black">
          {project.gallery.map((img, i) => (
            <div
              key={i}
              className={`relative aspect-[4/3] overflow-hidden ${
                i < project.gallery!.length - 1 ? 'border-b-[3px] md:border-b-0 md:border-r-[3px] border-black' : ''
              }`}
            >
              <Image
                src={img}
                alt={`${project.title} gallery ${i + 1}`}
                fill
                className="object-cover"
              />
            </div>
          ))}
        </div>
      )}

      {/* External Link */}
      {project.link && (
        <div className="px-6 md:px-12 py-8 border-b-[3px] border-black">
          <a
            href={project.link}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-block text-[10px] font-bold tracking-[3px] uppercase bg-black text-white px-8 py-4 border-2 border-black hover:bg-white hover:text-black transition-colors"
          >
            Visit Project →
          </a>
        </div>
      )}

      {/* Back */}
      <div className="px-6 md:px-12 py-6 border-b-[3px] border-black">
        <Link
          href="/work"
          className="text-[10px] font-bold tracking-[3px] uppercase border-b-2 border-black pb-1 hover:text-gray transition-colors"
        >
          ← All Projects
        </Link>
      </div>

      {/* Next Project */}
      {nextProject && nextProject.id !== project.id && (
        <Link
          href={`/work/${nextProject.id}`}
          className="group block border-b-[3px] border-black hover:bg-gray-bg transition-colors"
        >
          <div className="px-6 md:px-12 py-8 flex items-center justify-between">
            <div>
              <div className="label-text mb-2">Next Project</div>
              <h3 className="text-[24px] font-black uppercase tracking-[-1px]">
                {nextProject.title}
              </h3>
            </div>
            <span className="text-[24px] font-black group-hover:translate-x-2 transition-transform">→</span>
          </div>
        </Link>
      )}

      <Footer />
    </main>
  );
}
