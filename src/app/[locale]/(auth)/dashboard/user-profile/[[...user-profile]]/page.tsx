import { UserProfile } from '@clerk/nextjs';
import { useTranslations } from 'next-intl';

import { getI18nPath } from '@/helpers';
import { TitleBar } from '@/modules/dashboard/TitleBar';


const UserProfilePage = (props: { params: { locale: string } }) => {
  const t = useTranslations('UserProfile');

  return (
    <>
      <TitleBar
        title={t('title_bar')}
        description={t('title_bar_description')}
      />

      <UserProfile
        routing="path"
        path={getI18nPath('/dashboard/user-profile', props.params.locale)}
        appearance={{
          elements: {
            rootBox: 'w-full',
            cardBox: 'w-full flex',
          },
        }}
      />
    </>
  );
};

export default UserProfilePage;
