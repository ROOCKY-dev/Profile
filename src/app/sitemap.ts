import { MetadataRoute } from 'next';
import { PROJECTS } from '@/lib/project-data';

export default function sitemap(): MetadataRoute.Sitemap {
    const baseUrl = 'https://roocky.dev'; // Replace with your actual domain

    // Static pages
    const staticPages: MetadataRoute.Sitemap = [
        {
            url: baseUrl,
            lastModified: new Date(),
            changeFrequency: 'monthly',
            priority: 1,
        },
        {
            url: `${baseUrl}/work`,
            lastModified: new Date(),
            changeFrequency: 'weekly',
            priority: 0.8,
        },
    ];

    // Dynamic project pages
    const projectPages: MetadataRoute.Sitemap = PROJECTS.map((project) => ({
        url: `${baseUrl}/work/${project.id}`,
        lastModified: new Date(),
        changeFrequency: 'monthly' as const,
        priority: 0.6,
    }));

    return [...staticPages, ...projectPages];
}