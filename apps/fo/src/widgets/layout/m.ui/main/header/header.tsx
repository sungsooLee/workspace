import { memo } from 'react';
import { useTranslation } from 'react-i18next';
import { Link } from '@tanstack/react-router';

import { cn } from '@learnway/shared';

import { Language } from '../../../../../features/platform';

import styles from './header.module.css';

function HeaderComponent() {
  const { t } = useTranslation();

  return (
    <div className={styles.start}>
      Mobile Header
      <p>
        <Link to={'/menu4/menu5'}>Menu5</Link>
      </p>
      <p>
        <Link to="/menu3">Menu3</Link>
      </p>
    </div>
  );
}

export const MobileHeader = memo(HeaderComponent);
