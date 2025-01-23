import { memo } from 'react';
import { Link } from '@tanstack/react-router';
import { useTranslation } from 'react-i18next';
import { Logo, UserAvatar, Notification, Language, UserName } from '../../../../features/layout';
import { Navigate } from './navigate/navigate';
import { Category } from './category/category';
import { IcoMenu01 } from '@learnway/icons';
import { Button } from '@learnway/ui';
import styles from './header.module.css';

function HeaderComponent() {
  const { t } = useTranslation();

  return (
    <div>
      <header className={`${styles.start} ${styles.header}`}>
        <h1>
          <Logo />
        </h1>

        <div className="util">
          <UserName />
          <Language />
          <Notification />
          <UserAvatar />
        </div>

        <div className="nav_area">
          <Category />
          <Navigate />
        </div>
      </header>
    </div>
  );
}

export const Header = memo(HeaderComponent);
