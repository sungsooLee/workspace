import { memo } from 'react';
import { Link } from '@tanstack/react-router';
import { useTranslation } from 'react-i18next';
import {
  Logo,
  UserAvatar,
  Notification,
  Language,
  UserName,
  Navigate,
  NavigateHover,
  Category,
  Tenant,
  Search,
} from '../../../../features/layout';
import styles from './m-header.module.css';

function MHeaderComponent() {
  const { t } = useTranslation();

  return (
    <div className={`${styles.start} ${styles.header}`}>
      <header className={styles.header_area}>모바일해더</header>
    </div>
  );
}

export const MHeader = memo(MHeaderComponent);
