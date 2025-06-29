import { useTranslations } from 'next-intl';

import { PricingInformation } from '@/modules/billing/PricingInformation';
import { Section } from '@/modules/landing/Section';

export const Pricing = () => {
  const t = useTranslations('Pricing');

  return (
    <Section
      subtitle={t('section_subtitle')}
      title={t('section_title')}
      description={t('section_description')}
    >
      <PricingInformation />
    </Section>
  );
};
