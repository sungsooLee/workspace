import { memo } from 'react';
import { useTranslation } from 'react-i18next';

import { cn } from '@learnway/shared';
import styles from './breadcrumbs.module.css';

function BreadcrumbsComponent() {
  const { t } = useTranslation();

  return <div className={`${styles.start} ${styles.breadcrumbs}`}>Home</div>;
}

export const Breadcrumbs = memo(BreadcrumbsComponent);
