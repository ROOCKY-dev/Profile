import { PORTFOLIO_DATA } from '@/lib/portfolio-data';

export default function Capabilities() {
  const { capabilities } = PORTFOLIO_DATA;

  return (
    <section className="grid grid-cols-1 lg:grid-cols-12 border-b border-border-dark" id="capabilities">
      {/* Sticky Title */}
      <div className="lg:col-span-3 p-8 lg:p-12 border-b lg:border-b-0 lg:border-r border-border-dark lg:sticky lg:top-0 lg:h-screen flex flex-col justify-between bg-background-dark z-20">
        <div>
          <span className="font-mono text-primary text-xs mb-4 block">02 // SERVICES</span>
          <h2 className="text-5xl font-bold tracking-tighter uppercase leading-none">Capa-<br/>bili-<br/>ties</h2>
        </div>
        <div className="hidden lg:block w-12 h-12 rounded-full border border-border-dark flex items-center justify-center animate-spin-slow">
          <span className="material-symbols-outlined text-text-muted">asterisk</span>
        </div>
      </div>

      {/* Grid Content */}
      <div className="lg:col-span-9 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
        {capabilities.map((capability, i) => (
          <div
            key={i}
            className="group border-b lg:border-r border-border-dark p-8 md:p-12 hover:bg-surface transition-colors duration-300 cursor-hover min-h-[400px] flex flex-col justify-between"
          >
            <div className="w-12 h-12 border border-border-dark group-hover:border-primary rounded-full flex items-center justify-center transition-all duration-300 group-hover:rotate-[15deg] group-hover:bg-primary group-hover:text-background-dark">
              <span className="material-symbols-outlined">{capability.icon}</span>
            </div>
            <div>
              <h3 className="text-2xl font-bold mb-4 group-hover:translate-x-2 transition-transform">{capability.title}</h3>
              <p className="font-mono text-text-muted text-sm leading-relaxed">{capability.description}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
