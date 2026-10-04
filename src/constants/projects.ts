export type ProjectVariant = 'light' | 'primary' | 'accent' | 'dark' | 'cyan' | 'magenta';
export type ProjectCategory = 'web' | 'mobile' | 'others';

export interface Project {
  slug: string;
  title: string;
  technologies: string[];
  description: string;
  image?: string;
  variant: ProjectVariant;
  category: ProjectCategory[];
  githubUrl?: string;
  liveUrl?: string;
  videoUrl?: string;
  repositories?: { name: string; url: string }[];
}

export const PROJECTS: Project[] = [
  {
    slug: "quorum",
    title: "quorum",
    technologies: ["React Native", "TypeScript", "Supabase", "Nativewind", "Expo", "RevenueCat"],
    description: "Aplicación móvil diseñada para modernizar la gobernanza comunitaria y facilitar la toma de decisiones asíncrona. Construida con React Native y Supabase, integra un sistema completo de votaciones, gestión de usuarios en tiempo real y monetización a través de RevenueCat, ofreciendo una experiencia fluida y escalable. Proyecto desarrollado como participación para la Shipathon 2026.",
    image: "/images/quorum.webp",
    videoUrl: "https://www.youtube.com/embed/9T70437vxhc?cc_load_policy=0&vq=hd1080",
    variant: "light",
    category: ["mobile"],
    githubUrl: "https://github.com/JBDev23/quorum",
    liveUrl: "https://devpost.com/software/quorum-u1zkid"
  },
  {
    slug: "inazuma-endavant",
    title: "Inazuma Endavant",
    technologies: ["React Native", "Nest.js", "Next.js", "Python", "TailwindCSS", "PostgreSQL", "Prisma", "NDEF"],
    description: "Comprehensive platform featuring mobile app, web dashboard, and backend services.",
    image: "/images/inazuma.webp",
    variant: "primary",
    category: ["web", "mobile", "others"],
    liveUrl: "https://inazuma-docs.vercel.app",
    repositories: [
      { name: "Documentation Web", url: "https://github.com/JBDev23/inazuma-docs" },
      { name: "Monorepo (Backend & PWAs)", url: "https://github.com/JBDev23/inazuma-eleven-endavant" },
      { name: "Mobile App (Offline NFC)", url: "https://github.com/JBDev23/jdd-nfc" },
      { name: "Python Scripts", url: "https://github.com/JBDev23/inazuma-scripts" }
    ]
  },
  {
    slug: "hydraflow",
    title: "Hydraflow",
    technologies: ["React Native", "Nest.js", "TypeScript", "Supabase", "Expo", "PostgreSQL"],
    description: "Aplicación móvil full-stack orientada al registro y seguimiento del consumo diario de agua. Diseñada con una arquitectura backend robusta en Nest.js y PostgreSQL, combinada con un frontend ágil en React Native, garantizando un rendimiento óptimo y una gestión eficiente de los datos del usuario. Actualmente en fase beta.",
    image: "/images/hydraflow.webp",
    variant: "light",
    category: ["mobile"],
    githubUrl: "https://github.com/JBDev23/hydraflow"
  },
  {
    slug: "portfolio",
    title: "Portfolio Personal",
    technologies: ["Next.js", "TypeScript", "TailwindCSS", "Framer Motion"],
    description: "Mi portafolio personal, diseñado y desarrollado para mostrar mis proyectos, habilidades y experiencia profesional. Construido con Next.js y animaciones fluidas con Framer Motion, priorizando el rendimiento y una experiencia de usuario moderna.",
    image: "/images/portfolio.webp",
    variant: "primary",
    category: ["web"],
    githubUrl: "https://github.com/JBDev23/jbdev23.com",
    liveUrl: "https://www.jbdev23.com"
  },
  {
    slug: "jcp-construcciones",
    title: "JCP Construcciones",
    technologies: ["Next.js", "React", "TypeScript", "TailwindCSS"],
    description: "Desarrollo y despliegue íntegro de la web corporativa para JCP Obras y Construcciones, empresa de reformas integrales y piscinas. Plataforma construida con Next.js, React y TailwindCSS, optimizada para SEO y rendimiento, con un diseño moderno enfocado en la conversión y la presentación de proyectos.",
    image: "/images/jcpconstrucciones.webp",
    variant: "dark",
    category: ["web"],
    liveUrl: "https://www.jcpconstrucciones.com"
  },
  {
    slug: "sociograma-ia",
    title: "WeavyAI",
    technologies: ["Next.js", "TypeScript", "TailwindCSS", "Prisma", "PostgreSQL", "Nest.js", "Groq LLM"],
    description: "Proyecto desarrollado para el hackathon TechForEquality 2026, organizado por ACM UPV, para dar solución al reto propuesto por NTT Data.",
    image: "/images/weavyAI.webp",
    variant: "light",
    category: ["web"],
    githubUrl: "https://github.com/JBDev23/sociograma-ia",
    liveUrl: "https://sociograma-ia-frontend.vercel.app"
  },
  {
    slug: "jesucristo-superstar",
    title: "Jesucristo Superstar",
    technologies: ["React", "TypeScript", "Vite", "TailwindCSS"],
    description: "Aplicación web interactiva diseñada para presentar las escenas, canciones y lecturas bíblicas del \"Hilo Conductor\" de la campaña 2026 del centro Juniors M.D. Endavant.",
    image: "/images/jesucristo-superstar.webp",
    variant: "accent",
    category: ["web"],
    githubUrl: "https://github.com/JBDev23/jesucristo-superstar",
    liveUrl: "https://jesucristo-superstar.vercel.app"
  },
  {
    slug: "schoolyard-wheel",
    title: "Schoolyard Wheel",
    technologies: ["Python"],
    description: "Script automatizado en Python para la asignación dinámica y equitativa de zonas de patio en centros escolares. Genera disposiciones mensuales optimizadas, facilitando la organización del curso lectivo de manera eficiente y ahorrando horas de planificación manual.",
    image: "/images/schoolyard-wheel.jpg",
    variant: "dark",
    category: ["others"],
    githubUrl: "https://github.com/JBDev23/schoolyard-wheel",
    liveUrl: "https://github.com/JBDev23/schoolyard-wheel/releases/tag/v1.0.0"
  },
  {
    slug: "sorteo-medieval",
    title: "Sorteo Medieval",
    technologies: ["HTML", "CSS", "JavaScript"],
    description: "Página web para el sorteo de la rifa de la II Cena Medieval Solidaria en beneficio de la asociación Novaterra.",
    image: "/images/sorteo-medieval.webp",
    variant: "dark",
    category: ["web"],
    githubUrl: "https://github.com/JBDev23/SorteoMedieval",
    liveUrl: "https://jbdev23.github.io/SorteoMedieval/"
  }
];
