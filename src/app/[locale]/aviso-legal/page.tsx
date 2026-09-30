import { Link } from '@/i18n/routing';
import { useTranslations } from 'next-intl';
import { siteConfig } from '@/config/site';

export default function AvisoLegal() {
  const t = useTranslations('AvisoLegal');

  return (
    <main className="min-h-screen text-foreground font-mono px-4 py-24 md:px-8 max-w-5xl mx-auto flex flex-col gap-12">
      <Link href="/" className="group inline-flex items-center gap-2 font-black uppercase text-xl md:text-2xl hover:text-primary transition-colors w-fit">
        <span className="group-hover:-translate-x-2 transition-transform"></span> {t('back')}
      </Link>

      <div className="border-4 border-foreground p-8 md:p-12 shadow-[8px_8px_0_0_var(--foreground)] bg-background">
        <h1 className="text-4xl md:text-6xl font-black uppercase tracking-tighter mb-8 border-b-4 border-foreground pb-4">
          {t('title')}
        </h1>

        <div className="flex flex-col gap-6 text-base md:text-lg">
          <section>
            <h2 className="text-2xl font-black uppercase mb-2">{t('section_1_title')}</h2>
            <p>{t('section_1_text', { name: siteConfig.name, email: siteConfig.email })}</p>
          </section>

          <section>
            <h2 className="text-2xl font-black uppercase mb-2">{t('section_2_title')}</h2>
            <p>{t('section_2_text')}</p>
          </section>

          <section>
            <h2 className="text-2xl font-black uppercase mb-2">{t('section_3_title')}</h2>
            <p>{t('section_3_text')}</p>
          </section>

          <section>
            <h2 className="text-2xl font-black uppercase mb-2">{t('section_4_title')}</h2>
            <p>{t('section_4_text')}</p>
          </section>

          <section>
            <h2 className="text-2xl font-black uppercase mb-2">{t('section_5_title')}</h2>
            <p>{t('section_5_text')}</p>
          </section>
        </div>
      </div>
    </main>
  );
}
