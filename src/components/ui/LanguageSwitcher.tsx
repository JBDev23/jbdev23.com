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
        className={`font-bold uppercase px-2 md:px-3 py-1 text-sm md:text-base brutalist-border transition-all flex items-center justify-center ${
          locale === 'es' 
            ? 'bg-primary text-white translate-y-1 translate-x-1 shadow-none cursor-default'
            : 'bg-white text-black brutalist-shadow-dark hover:translate-y-1 hover:translate-x-1 hover:shadow-none'
        }`}
      >
        ES
      </Link>
      <Link
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        href={{ pathname, params } as any}
        locale="en"
        className={`font-bold uppercase px-2 md:px-3 py-1 text-sm md:text-base brutalist-border transition-all flex items-center justify-center ${
          locale === 'en' 
            ? 'bg-primary text-white translate-y-1 translate-x-1 shadow-none cursor-default'
            : 'bg-white text-black brutalist-shadow-dark hover:translate-y-1 hover:translate-x-1 hover:shadow-none'
        }`}
      >
        EN
      </Link>
    </div>
  );
}
