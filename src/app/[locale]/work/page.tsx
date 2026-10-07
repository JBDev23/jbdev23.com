import { Metadata } from 'next';
import WorkClient from './WorkClient';

type Props = {
  params: Promise<{ locale: string }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  
  const pathEn = '/en/work';
  const pathEs = '/es/proyectos';
  const currentPath = locale === 'en' ? pathEn : pathEs;

  return {
    alternates: {
      canonical: currentPath,
      languages: {
        'es': pathEs,
        'en': pathEn,
      },
    },
    openGraph: {
      url: currentPath,
    }
  };
}

export default function WorkPage() {
  return <WorkClient />;
}
