import Hero from "@/components/sections/Hero";
import Marquee from "@/components/sections/Marquee";
import AboutStrip from "@/components/sections/AboutStrip";
import Capabilities from "@/components/sections/Capabilities";
import SelectedProjects from "@/components/sections/SelectedProjects";
import Footer from "@/components/layout/Footer";

// Force dynamic so it always fetches the latest commits if desired, 
// or let Next.js revalidate it periodically (e.g. every 60 seconds)
export const revalidate = 60;

export default async function Home() {
  let githubEvents = [];
  try {
    const res = await fetch('https://api.github.com/users/ROOCKY-dev/events/public', {
      next: { revalidate: 60 } // Revalidate every 60 seconds
    });
    
    if (res.ok) {
      const events = await res.json();
      
      githubEvents = events.slice(0, 5).map((e: any) => {
        let command = `git ${e.type} ${e.repo.name}`;
        
        switch (e.type) {
          case 'PushEvent':
            const branch = e.payload.ref?.split('/').pop() || 'main';
            command = `git push ${e.repo.name} ${branch}`;
            break;
          case 'CreateEvent':
            command = `git init ${e.repo.name}`;
            break;
          case 'WatchEvent':
            command = `gh repo star ${e.repo.name}`;
            break;
          case 'IssuesEvent':
            command = `gh issue ${e.payload.action} ${e.repo.name}`;
            break;
          case 'PullRequestEvent':
            command = `gh pr ${e.payload.action} ${e.repo.name}`;
            break;
          case 'ForkEvent':
            command = `gh repo fork ${e.repo.name}`;
            break;
          case 'DeleteEvent':
            command = `git branch -D ${e.repo.name}/${e.payload.ref}`;
            break;
          default:
            command = `gh api ${e.type} ${e.repo.name}`;
        }
        
        return {
          id: e.id,
          date: e.created_at,
          message: command,
        };
      });
    }
  } catch (err) {
    console.error("Failed to fetch GitHub events:", err);
  }

  return (
    <main className="w-full">
      <Hero />
      <Marquee />
      <AboutStrip githubEvents={githubEvents} />
      <Capabilities />
      <SelectedProjects />
      <Footer />
    </main>
  );
}
