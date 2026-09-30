import { Link } from '@/i18n/routing';
import { useTranslations } from 'next-intl';

interface ProjectCardProps {
  title: string;
  technologies: string[];
  description?: string;
  link: React.ComponentProps<typeof Link>['href'];
  image?: string;
  variant?: 'light' | 'primary' | 'accent' | 'dark' | 'cyan' | 'magenta';
}

export default function ProjectCard({ title, technologies, description, link, image, variant = 'light' }: ProjectCardProps) {
  const t = useTranslations("UI");
  const isPrimary = variant === 'primary';
  const isAccent = variant === 'accent';
  const isDark = variant === 'dark';
  const isCyan = variant === 'cyan';
  const isMagenta = variant === 'magenta';
  
  const containerClasses = `brutalist-border h-full p-6 flex flex-col gap-4 ${
    isPrimary ? 'bg-primary text-white brutalist-shadow' : 
    isAccent ? 'bg-accent text-black brutalist-shadow-dark' :
    isDark ? 'bg-background text-foreground brutalist-shadow' :
    isCyan ? 'bg-cyan text-black brutalist-shadow-dark' :
    isMagenta ? 'bg-magenta text-white brutalist-shadow' :
    'bg-white text-black brutalist-shadow-dark'
  }`;

  const imageContainerClasses = `aspect-video w-full relative overflow-hidden flex items-center justify-center border-4 ${
    isPrimary ? 'bg-red-800 border-white text-red-400' :
    isAccent ? 'bg-yellow-200 border-black text-yellow-600' :
    isDark ? 'bg-black border-white text-gray-400' :
    isCyan ? 'bg-blue-200 border-black text-blue-600' :
    isMagenta ? 'bg-fuchsia-900 border-white text-fuchsia-400' :
    'bg-gray-200 border-black text-gray-400'
  }`;

  const buttonClasses = `mt-4 text-center font-bold uppercase py-4 transition-colors ${
    isPrimary ? 'bg-white text-black hover:bg-accent hover:text-black' :
    isAccent ? 'bg-black text-white hover:bg-primary' :
    isDark ? 'bg-white text-black hover:bg-primary hover:text-white' :
    isCyan ? 'bg-black text-white hover:bg-magenta' :
    isMagenta ? 'bg-black text-white hover:bg-cyan hover:text-black' :
    'bg-black text-white hover:bg-primary'
  }`;

  return (
    <article className={containerClasses}>
      <div className={imageContainerClasses}>
        {image ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img src={image} alt={title} className="w-full h-full object-cover" />
        ) : (
          <span className="font-black text-4xl">{t("project_img")}</span>
        )}
      </div>
      <div className="flex-1 flex flex-col">
        <h4 className="text-3xl font-black uppercase">{title}</h4>
        {description && (
          <p className="text-base font-medium mt-2 mb-4 leading-snug opacity-90">{description}</p>
        )}
        <div className="flex flex-wrap gap-2 mt-auto pt-4">
          {technologies.map((tech, idx) => (
            <span 
              key={idx} 
              className={`text-xs font-bold px-2 py-1 uppercase border-2 ${
                isPrimary || isDark || isMagenta ? 'border-white text-white' : 
                'border-black text-black'
              }`}
            >
              {tech}
            </span>
          ))}
        </div>
      </div>
      <Link 
        href={link} 
        className={buttonClasses} 
        target={typeof link === 'string' && link.startsWith('http') ? '_blank' : undefined} 
        rel={typeof link === 'string' && link.startsWith('http') ? 'noopener noreferrer' : undefined}
      >
        {t("view_project")}
      </Link>
    </article>
  );
}
