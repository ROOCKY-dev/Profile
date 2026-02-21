import { PORTFOLIO_DATA } from '@/lib/portfolio-data';

export default function TechStack() {
  const { techStack } = PORTFOLIO_DATA;

  return (
    <section className="grid grid-cols-1 lg:grid-cols-2 border-b border-border-dark min-h-[60vh]" id="about">
      {/* Tech List */}
      <div className="p-8 md:p-16 border-b lg:border-b-0 lg:border-r border-border-dark bg-surface/30">
        <span className="font-mono text-primary text-xs mb-8 block">03 // THE ENGINE</span>
        <div className="grid grid-cols-2 gap-12">
          {/* Core */}
          <div>
            <h4 className="font-bold text-xl mb-6 border-b border-border-dark pb-2">CORE</h4>
            <ul className="font-mono text-text-muted space-y-3">
              {techStack.core.map((tech, i) => (
                <li key={i} className="hover:text-primary transition-colors cursor-hover flex items-center gap-2">
                  <span className="w-1 h-1 bg-primary rounded-full" />
                  {tech.name}
                </li>
              ))}
            </ul>
          </div>
          {/* Tools */}
          <div>
            <h4 className="font-bold text-xl mb-6 border-b border-border-dark pb-2">TOOLS</h4>
            <ul className="font-mono text-text-muted space-y-3">
              {techStack.tools.map((tech, i) => (
                <li key={i} className="hover:text-primary transition-colors cursor-hover flex items-center gap-2">
                  <span className="w-1 h-1 bg-primary rounded-full" />
                  {tech.name}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>

      {/* ASCII Art Area */}
      <div className="p-8 md:p-16 flex items-center justify-center bg-background-dark overflow-hidden relative">
        <div className="absolute top-4 right-4 text-xs font-mono text-border-dark animate-pulse">SYSTEM_MONITOR_ACTIVE</div>
        <pre className="font-mono text-[10px] md:text-xs leading-[10px] md:leading-3 text-primary/50 whitespace-pre text-center select-none cursor-hover hover:text-primary transition-colors duration-300">
{`   ._________________.
   | ._____________. |
   | |  _       _  | |
   | | |_| |_| |_| | |
   | |             | |
   | |  PROCESSING | |
   | |             | |
   | |_____________| |
   |_________________|
      _[_______]_
  ___[___________]___
 |                   |
 |___________________|`}
        </pre>
      </div>
    </section>
  );
}
