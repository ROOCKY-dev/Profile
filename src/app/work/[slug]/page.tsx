import { notFound } from "next/navigation";
import Link from "next/link";
import { PROJECTS } from "@/lib/project-data";
import Footer from "@/components/layout/Footer";

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

  const others = PROJECTS.filter((x) => x.id !== project.id);
  const nextProj = others[0];

  return (
    <main className="min-h-screen bg-white pt-[60px]">
      {/* Breadcrumb */}
      <div className="w-full px-6 md:px-12 lg:px-20 py-8 border-b-2 border-black flex justify-between items-center bg-white">
        <div className="font-mono text-[10px] font-bold tracking-[2px] uppercase">
          <Link href="/" className="text-gray-400 hover:text-black transition-colors">INDEX</Link>
          <span className="mx-4 text-gray-200">/</span>
          <Link href="/work" className="text-gray-400 hover:text-black transition-colors">WORK</Link>
          <span className="mx-4 text-gray-200">/</span>
          <span className="text-black">{project.title}</span>
        </div>
        <div className="label-text text-[9px] hidden sm:block text-gray-300 tracking-[4px]">
          FILE {project.n} // WORKSHOP_VOL_04
        </div>
      </div>

      {/* Hero Header */}
      <section className="border-b-2 border-black grid-bg px-6 md:px-12 lg:px-20 py-24 md:py-40">
        <div className="w-full">
          <span className="label-text text-gray-400 tracking-[4px]">{project.category}</span>
          <h1 className="font-serif text-[clamp(56px,12.5vw,180px)] uppercase leading-[0.82] tracking-[-0.04em] mt-10 max-w-7xl breathe-header">
            {project.title}
          </h1>
          <p className="mt-16 text-2xl md:text-3xl font-medium leading-relaxed max-w-4xl text-gray-600">
            {project.description}
          </p>
        </div>
      </section>

      {/* Metadata Strip */}
      <section className="border-b-2 border-black bg-white">
        <div className="w-full grid grid-cols-2 lg:grid-cols-4">
          {[
            { k: 'Role', v: project.role || 'Developer' },
            { k: 'Year', v: project.year },
            { k: 'Discipline', v: project.category },
            { k: 'Status', v: project.status || 'LIVE' },
          ].map((m, i, arr) => (
            <div key={m.k} className={`p-10 border-b-2 lg:border-b-0 border-black ${i % 2 === 0 ? 'border-r-2' : ''} ${i < 3 ? 'lg:border-r-2' : 'lg:border-r-0'}`}>
              <div className="label-text mb-6 text-gray-400">{m.k}</div>
              <div className="font-serif text-3xl tracking-tight">{m.v}</div>
            </div>
          ))}
        </div>
      </section>

      {/* Case Body */}
      <section className="border-b-2 border-black bg-white">
        <div className="w-full grid grid-cols-1 lg:grid-cols-[1fr_2fr] gap-20 p-6 md:p-12 lg:p-24">
          <div className="lg:sticky lg:top-[120px] lg:self-start">
            <span className="label-text text-gray-400">Context</span>
            <h2 className="font-serif text-5xl md:text-6xl uppercase tracking-tighter mt-6 leading-[0.9] text-black">
              The Story<br/>Behind it.
            </h2>
          </div>
          
          <div className="space-y-16">
            <div className="text-xl md:text-2xl leading-relaxed text-gray-600 max-w-3xl font-medium">
              <p>{project.longDescription || project.description}</p>
            </div>

            <div className="pt-16 border-t-2 border-dashed border-gray-100">
              <div className="label-text mb-8 text-gray-400 tracking-[4px]">Stack & Tools</div>
              <div className="flex flex-wrap gap-3">
                {(project.stack || []).map(s => (
                  <span key={s} className="font-mono text-[11px] font-black tracking-widest uppercase px-5 py-2 border-2 border-black bg-gray-50">
                    {s}
                  </span>
                ))}
              </div>
            </div>

            {project.link && (
              <div className="pt-12">
                <a href={project.link} target="_blank" rel="noreferrer" className="btn btn-black group h-[60px] px-12 text-xs">
                  <span>Visit live project</span>
                  <span className="ml-6 transition-transform group-hover:translate-x-1 group-hover:-translate-y-1">↗</span>
                </a>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* Next Project Footer */}
      {nextProj && (
        <section className="bg-black text-white p-6 md:p-12 lg:p-24 overflow-hidden group border-t-2 border-black relative">
          <div className="absolute inset-0 opacity-5 pointer-events-none grid-bg" />
          <Link href={`/work/${nextProj.id}`} className="w-full block relative z-10">
            <span className="label-text text-gray-700 block mb-12 uppercase tracking-[4px]">Access Next File</span>
            <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-12">
              <h3 className="font-serif text-[clamp(44px,11vw,160px)] uppercase leading-[0.82] tracking-[-0.04em] group-hover:translate-x-6 transition-transform duration-1000 ease-[0.16, 1, 0.3, 1]">
                {nextProj.title} →
              </h3>
              <div className="text-right">
                <span className="label-text text-gray-600 block mb-3 uppercase tracking-[4px]">{nextProj.category}</span>
                <span className="font-serif text-3xl font-black text-gray-200">{nextProj.year}</span>
              </div>
            </div>
          </Link>
        </section>
      )}

      <Footer />
    </main>
  );
}
