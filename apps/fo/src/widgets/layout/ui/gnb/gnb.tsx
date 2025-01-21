import { memo } from 'react';
import { useTranslation } from 'react-i18next';

import { Category, GnbInput, Logo, Notification, Tenants } from '../../../../features/layout';
import { Navigate } from './navigate/navigate';
import { Language } from '../../../../features/layout/ui/language';
import { UserAvatar } from '../../../../features/layout/ui/user-avatar';

function GNBComponent() {
  return (
    <div className="bg-secondary-1 flex flex-col">
      <div className="flex items-center gap-10">
        <Logo />
        <Tenants />
        <GnbInput />
        <Language />
        <Notification />
        <UserAvatar />
      </div>
      <div className="flex items-center gap-10">
        <Category />
        <Navigate />
      </div>
    </div>
  );
}

export const GNB = memo(GNBComponent);
