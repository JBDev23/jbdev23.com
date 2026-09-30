import { Link } from '@/i18n/routing';

import { PROJECTS } from "@/constants/projects";
import { notFound } from "next/navigation";
import { getTranslations } from "next-intl/server";

export default async function ProjectDetail({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;

  const project = PROJECTS.find((p) => p.slug === slug);

  if (!project) {
    notFound();
  }

  const tSlug = await getTranslations('WorkSlug');
  const tProjects = await getTranslations('ProjectsList');

  const title = tProjects(`${project.slug}.title`);
  const description = tProjects(`${project.slug}.description`);

  const currentIndex = PROJECTS.findIndex(p => p.slug === slug);
  const nextProject = PROJECTS[(currentIndex + 1) % PROJECTS.length];

  return (
    <main className="flex-1 flex flex-col font-mono overflow-x-hidden min-h-screen bg-background text-foreground">
      <section className="py-12 px-4 md:px-8 flex-1 max-w-5xl mx-auto w-full">
        <Link href={{ pathname: '/', hash: 'work' }} className="font-bold uppercase hover:text-primary underline decoration-4 underline-offset-4 mb-8 inline-block">
          {tSlug('back')}
        </Link>

        <div className="brutalist-border bg-white text-black p-6 sm:p-8 md:p-12 brutalist-shadow-dark mb-12">
          <h1 className="text-4xl sm:text-5xl md:text-7xl font-black uppercase mb-6 break-words">{title}</h1>
          <div className="w-full aspect-video bg-gray-200 border-4 border-black mb-8 flex items-center justify-center overflow-hidden">
            {project.videoUrl ? (
              <iframe
                src={project.videoUrl}
                title={project.title}
                className="w-full h-full"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              />
            ) : project.image ? (
              // eslint-disable-next-line @next/next/no-img-element
              <img src={project.image} alt={project.title} className="w-full h-full object-cover" />
            ) : (
              <span className="font-black text-2xl sm:text-4xl text-gray-400">PROJECT_IMG</span>
            )}
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-12">
            <div className="md:col-span-2 space-y-6">
              <h3 className="text-3xl font-black uppercase border-b-4 border-black pb-2">{tSlug('overview')}</h3>
              <p className="text-lg font-medium leading-relaxed">
                {description}
              </p>
            </div>

            <div className="space-y-8">
              <div>
                <h3 className="text-2xl font-black uppercase border-b-4 border-black pb-2 mb-4">{tSlug('tech_stack')}</h3>
                <div className="flex flex-wrap gap-2">
                  {project.technologies.map((tech, idx) => (
                    <span key={idx} className="border-2 border-black px-3 py-1 font-bold text-sm uppercase">
                      {tech}
                    </span>
                  ))}
                </div>
              </div>

              {(project.githubUrl || project.liveUrl || (project.repositories && project.repositories.length > 0)) && (
                <div>
                  <h3 className="text-2xl font-black uppercase border-b-4 border-black pb-2 mb-4">{tSlug('links')}</h3>
                  <div className="flex flex-col gap-3">
                    {project.liveUrl && (
                      <a href={project.liveUrl} target="_blank" rel="noopener noreferrer" className="block w-full bg-primary text-black text-center font-bold uppercase py-3 hover:bg-black hover:text-white transition-colors border-2 border-black">
                        {tSlug('view_website')}
                      </a>
                    )}
                    {project.githubUrl && (
                      <a href={project.githubUrl} target="_blank" rel="noopener noreferrer" className="block w-full bg-black text-white text-center font-bold uppercase py-3 hover:bg-primary hover:text-black transition-colors border-2 border-black hover:border-black">
                        {tSlug('view_source')}
                      </a>
                    )}
                    {project.repositories?.map((repo, idx) => (
                      <a key={idx} href={repo.url} target="_blank" rel="noopener noreferrer" className="block w-full bg-transparent text-black text-center font-bold uppercase py-2 hover:bg-black hover:text-white transition-colors border-2 border-black">
                        {repo.name}
                      </a>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </section>

      <footer className="mt-auto py-12 px-4 md:px-8 border-t-4 border-foreground text-center flex flex-col items-center">
        <h2 className="text-xl md:text-3xl font-black uppercase mb-4 text-foreground/50">{tSlug('next_project')}</h2>
        <Link href={{ pathname: '/work/[slug]', params: { slug: nextProject.slug } }} className="text-4xl md:text-7xl font-black uppercase hover:text-primary transition-colors mb-8">
          {tProjects(`${nextProject.slug}.title`)}
        </Link>
        <Link href="/work" className="font-bold uppercase hover:text-primary underline decoration-4 underline-offset-4 text-xl md:text-2xl mt-4">
          {tSlug('view_all')}
        </Link>
      </footer>
    </main>
  );
}
