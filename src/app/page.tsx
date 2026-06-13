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
  let githubCommits = [];
  try {
    const res = await fetch('https://api.github.com/repos/ROOCKY-dev/Profile/commits?per_page=5', {
      next: { revalidate: 60 } // Revalidate every 60 seconds
    });
    if (res.ok) {
      const data = await res.json();
      githubCommits = data.map((c: any) => ({
        sha: c.sha.substring(0, 7),
        message: c.commit.message,
        date: c.commit.committer.date,
      }));
    }
  } catch (err) {
    console.error("Failed to fetch GitHub commits:", err);
  }

  return (
    <main className="w-full">
      <Hero />
      <Marquee />
      <AboutStrip githubCommits={githubCommits} />
      <Capabilities />
      <SelectedProjects />
      <Footer />
    </main>
  );
}
