"use client";

import { useLocale } from "next-intl";
import { Link, usePathname } from "@/i18n/routing";

import { useParams } from "next/navigation";

export default function LanguageSwitcher() {
  const locale = useLocale();
  const pathname = usePathname();
  const params = useParams();

  return (
    <div className="flex gap-4">
      <Link
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        href={{ pathname, params } as any}
        locale="es"
        className={`relative inline-block ${locale === 'es' ? 'cursor-default' : 'group'}`}
      >
        <div className={`absolute inset-0 bg-primary border-2 border-foreground transition-transform duration-300 ${locale === 'es' ? 'translate-x-1.5 translate-y-1.5' : 'translate-x-1.5 translate-y-1.5 group-hover:translate-x-2.5 group-hover:translate-y-2.5'}`}></div>
        <div className={`relative border-2 border-foreground px-2 md:px-3 py-1 font-bold uppercase text-sm md:text-base flex items-center justify-center transition-transform duration-300 ${locale === 'es' ? 'bg-primary text-background translate-x-1.5 translate-y-1.5' : 'bg-foreground text-background hover:-translate-y-1 group-hover:bg-primary group-hover:text-background'}`}>
          ES
        </div>
      </Link>
      <Link
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        href={{ pathname, params } as any}
        locale="en"
        className={`relative inline-block ${locale === 'en' ? 'cursor-default' : 'group'}`}
      >
        <div className={`absolute inset-0 bg-primary border-2 border-foreground transition-transform duration-300 ${locale === 'en' ? 'translate-x-1.5 translate-y-1.5' : 'translate-x-1.5 translate-y-1.5 group-hover:translate-x-2.5 group-hover:translate-y-2.5'}`}></div>
        <div className={`relative border-2 border-foreground px-2 md:px-3 py-1 font-bold uppercase text-sm md:text-base flex items-center justify-center transition-transform duration-300 ${locale === 'en' ? 'bg-primary text-background translate-x-1.5 translate-y-1.5' : 'bg-foreground text-background hover:-translate-y-1 group-hover:bg-primary group-hover:text-background'}`}>
          EN
        </div>
      </Link>
    </div>
  );
}
