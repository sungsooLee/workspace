import { memo } from 'react';
import { useTranslation } from 'react-i18next';
import { useRouter } from '@tanstack/react-router';
import { map } from 'lodash';
import { useCreation } from 'ahooks';

import { Avatar, Popover } from '@learnway/ui';
import { useFetchAuthUser, useLogoutUser, useReissue } from '@learnway/config';

import type { Tenant } from '../../../types';

interface ProfileMenu {
  title: string;
  action: () => void;
}

export const PopoverContent = () => {
  const { t } = useTranslation();
  const router = useRouter();

  const { data } = useFetchAuthUser();
  const { logout } = useLogoutUser();
  const { reissue } = useReissue();

  const PROFILE_MENU: ProfileMenu[] = useCreation(
    () => [
      {
        title: 'MY INFOMATION',
        action: () => router.navigate({ to: '/' }),
      },
      {
        title: 'MY AUTH',
        action: () => router.navigate({ to: '/' }),
      },
      {
        title: 'LOGOUT',
        action: () => logout(),
      },
      {
        title: 'REISSUE',
        action: () => reissue(), //logout(),
      },
    ],
    [],
  );
  return (
    <div>
      <li key={`MY-PROFILE-TITLE`}>{t('PROFILE')}</li>
      {map(PROFILE_MENU, (menu: ProfileMenu, index: number) => {
        return (
          <li key={`MY-PROFILE${index}`} onClick={menu.action}>
            {t(menu.title)}
          </li>
        );
      })}
      {map(data?.tenantIds, (tenantId: number, index: number) => {
        return <li key={`MY-PROFILE-TENAT${index}`}>{tenantId}</li>;
      })}
    </div>
  );
};

const AvatarComponent = () => {
  const { data } = useFetchAuthUser();

  return (
    <Popover popoverContent={<PopoverContent />}>
      <Avatar imageUrl="https://github.com/shadcn.png" fallback={data?.emailAddress} />
    </Popover>
  );
};

export const UserAvatar = memo(AvatarComponent);
