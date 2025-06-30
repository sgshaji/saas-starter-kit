import { createSharedPathnamesNavigation } from 'next-intl/navigation';

import { AllLocales, AppConfig } from '@/core/AppConfig';

export const { usePathname, useRouter } = createSharedPathnamesNavigation({
  locales: AllLocales,
  localePrefix: AppConfig.localePrefix,
});
