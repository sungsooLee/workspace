import { memo } from 'react';
import { Link } from '@tanstack/react-router';

import { IcoLinkblank } from '@learnway/icons';

import styles from './admin-link.module.css';

const AdminLinkComponent = () => {
  return (
    <div className={`${styles.start} ${styles.user_name}`}>
      <Link to={'/'}>
        <div className={styles.user}>
          <span className={styles.name}>Admin</span>
          <IcoLinkblank width={16} height={16} stroke="#131C30" />
        </div>
      </Link>
    </div>
  );
};

export const AdminLink = memo(AdminLinkComponent);
