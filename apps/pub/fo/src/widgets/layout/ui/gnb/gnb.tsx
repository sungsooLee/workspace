import { memo } from 'react';
import { Link } from '@tanstack/react-router';
import { useTranslation } from 'react-i18next';
import { Logo, UserAvatar, Notification, Language } from '../../../../features/layout';
import { Navigate } from './navigate/navigate';

function GNBComponent() {
  const { t } = useTranslation();

  return (
    <div>
      <header className="_header">
        <h1>
          <Logo />
        </h1>
        <div className="_nav">
          <Navigate />
        </div>

        <div className="util">
          <Language />
          <Notification />
          <UserAvatar />
        </div>
      </header>
    </div>
  );
}

export const GNB = memo(GNBComponent);
