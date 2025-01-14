import { memo } from 'react';
import { useTranslation } from 'react-i18next';

import { cn } from '@learnway/shared';

import { Navigate } from './navigate/navigate';
import { QuickMenu } from './quick-menu/quick-menu';
import { Logo, UserAvatar, Notification, Language } from '../../../../features/layout';

function GNBComponent() {
  const { t } = useTranslation();

  return (
    <div className="bg-secondary-1 flex flex-col">
      <div className="flex items-center gap-10">
        <Logo />
        <div className="flex grow"></div> <Navigate />
        <Language />
        <Notification />
        <UserAvatar />
      </div>
      <div className="flex items-center">
        <div className="flex grow"></div>
        <QuickMenu />
      </div>
    </div>
  );
}

export const GNB = memo(GNBComponent);
