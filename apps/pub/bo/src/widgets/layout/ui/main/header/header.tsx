import { memo } from 'react';
import { useTranslation } from 'react-i18next';
import { Link, useRouter } from '@tanstack/react-router';

import { cn } from '@learnway/shared';

import { Navigate } from './navigate/navigate';
import { QuickMenu } from './quick-menu/quick-menu';
import { Logo, UserAvatar, Notification } from '../../../../../features/layout';
import { Language } from '../../../../../features/layout/ui/language';

import styles from './header.module.css';

function HeaderComponent() {
  const { t } = useTranslation();

  return (
    <div className={styles.start}>
      <header className={styles.header}>
        <h1>
          <Logo />
          <strong className={styles.title}>
            <Link to={'/menu/$menuId'} params={{ menuId: 'menu2-3-2' }}>
              {'HRD 센터'}
            </Link>
          </strong>
        </h1>
        <div className={cn(styles.nav_area, 'nav_area')}>
          <Navigate />
        </div>

        <div className={cn(styles.util, 'util')}>
          <Language />
          <Notification />
          <UserAvatar />
        </div>

        <div className={cn(styles.quick_menu, 'quick_menu')}>
          <QuickMenu />
        </div>
      </header>
    </div>
  );
}

export const Header = memo(HeaderComponent);
