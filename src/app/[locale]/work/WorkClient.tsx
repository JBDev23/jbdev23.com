"use client";

import { useState, Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import { Link } from '@/i18n/routing';
import ProjectCard from "@/components/ui/ProjectCard";
import { PROJECTS, ProjectCategory } from '@/constants/projects';
import { useTranslations } from 'next-intl';

type FilterCategory = 'all' | ProjectCategory;

function WorkContent() {
  const searchParams = useSearchParams();
  const categoryParam = searchParams.get('category') as FilterCategory | null;
  const initialFilter = categoryParam && ['web', 'mobile', 'others'].includes(categoryParam) ? categoryParam : 'all';
  
  const [filter, setFilter] = useState<FilterCategory>(initialFilter);
  const t = useTranslations('Work');
  const tProjects = useTranslations('ProjectsList');

  const filteredProjects = filter === 'all' 
    ? PROJECTS 
    : PROJECTS.filter(p => p.category.includes(filter as ProjectCategory));

  const categories: { id: FilterCategory; label: string }[] = [
    { id: 'all', label: t('categories.all') },
    { id: 'web', label: t('categories.web') },
    { id: 'mobile', label: t('categories.mobile') },
    { id: 'others', label: t('categories.others') }
  ];

  return (
    <main className="flex-1 flex flex-col font-mono overflow-x-hidden min-h-screen">
      <section className="py-12 px-4 md:px-8 flex-1">
        <div className="mb-8 border-b-4 border-foreground pb-4 flex flex-col md:flex-row md:items-end justify-between gap-6">
          <div>
            <h1 className="text-4xl md:text-6xl font-black uppercase flex items-center gap-4">
              {t('title')}
              <span className="text-2xl md:text-4xl text-primary">[{filteredProjects.length}]</span>
            </h1>
            <p className="mt-4 text-xl font-bold">{t('subtitle')}</p>
          </div>
          <Link href="/" className="font-bold uppercase hover:text-primary underline decoration-4 underline-offset-4 text-xl md:text-2xl whitespace-nowrap mb-2 md:mb-0 md:pb-1 transition-colors">
            {t('back_home')}
          </Link>
        </div>

        {/* Category Selector */}
        <div className="mb-12 flex flex-wrap gap-4 items-center">
          {categories.map(cat => (
            <button
              key={cat.id}
              onClick={() => setFilter(cat.id)}
              className={`
                px-6 py-2 text-xl font-bold uppercase brutalist-border transition-all
                ${filter === cat.id 
                  ? 'bg-foreground text-background shadow-[4px_4px_0px_0px_var(--foreground)] translate-x-[-2px] translate-y-[-2px]' 
                  : 'bg-background text-foreground hover:bg-muted hover:shadow-[4px_4px_0px_0px_var(--foreground)] hover:translate-x-[-2px] hover:translate-y-[-2px]'
                }
              `}
            >
              {cat.label}
            </button>
          ))}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredProjects.map((project, idx) => (
            <ProjectCard
              key={idx}
              title={tProjects(`${project.slug}.title`)}
              technologies={project.technologies}
              description={tProjects(`${project.slug}.description`)}
              link={{ pathname: '/work/[slug]', params: { slug: project.slug } }}
              image={project.image}
              variant={project.variant}
            />
          ))}
          
          {/* Coming Soon Card */}
          <article className="brutalist-border p-6 flex flex-col items-center justify-center gap-4 bg-background border-4 border-dashed border-foreground/40 text-foreground/60 min-h-[400px]">
            <span className="text-5xl md:text-7xl font-black opacity-30">{"[ WIP ]"}</span>
            <h4 className="text-3xl font-black uppercase text-center mt-2">{t('coming_soon')}</h4>
          </article>
        </div>
      </section>
    </main>
  );
}

export default function WorkClient() {
  return (
    <Suspense fallback={<div className="min-h-screen flex items-center justify-center font-black text-2xl uppercase">Loading...</div>}>
      <WorkContent />
    </Suspense>
  );
}
