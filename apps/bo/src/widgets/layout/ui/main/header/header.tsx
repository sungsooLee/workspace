import { memo } from 'react';
import { useTranslation } from 'react-i18next';

import { cn } from '@learnway/shared';

import { Navigate } from './navigate/navigate';
import { QuickMenu } from './quick-menu/quick-menu';

import styles from './header.module.css';
import { Logo, UserAvatar, NotificationButton } from '@features/layout';
import { Language, GnbTenantSelect, GnbRoleSelect } from '@features/platform/ui';

function HeaderComponent() {
  const { t } = useTranslation();

  return (
    <div className={styles.start}>
      <header className={styles.header}>
        <h1>
          <Logo />
          <strong className={styles.title}>{t('LABEL.common.hrdCenter')}</strong>
        </h1>
        <div className={cn(styles.option_menu, 'option_menu')}>
          {/* <GnbTenantSelect /> */}
          <GnbRoleSelect />
        </div>
        <div className={cn(styles.nav_area, 'nav_area')}>
          <Navigate />
        </div>
        <div className={cn(styles.util, 'util')}>
          <Language />
          <NotificationButton />
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
