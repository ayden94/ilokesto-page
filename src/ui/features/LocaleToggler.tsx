"use client";

import { usePathname, useRouter } from '@/shared/i18n';
import { useLocale } from 'next-intl';

export function LocaleToggler() {
  const router = useRouter();
  const pathname = usePathname();
  const currentLocale = useLocale();

  const changeLocale = () => {
    router.replace(pathname, { locale: currentLocale === 'en' ? 'ko' : 'en' });
  };

  return (
    <button onClick={changeLocale} className="text-xl/5">
      {currentLocale.toUpperCase()}
    </button>
  );
}