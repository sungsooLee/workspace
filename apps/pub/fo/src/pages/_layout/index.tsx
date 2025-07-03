import { useEffect } from 'react';
import { createFileRoute } from '@tanstack/react-router';
import { useTranslation } from 'react-i18next';

import { Button } from '@learnway/ui';
import styles from './index.module.css';

export const Route = createFileRoute('/_layout/')({
  component: HomeComponent,
});

function HomeComponent() {
  const { t, i18n } = useTranslation();

  return <div className={`${styles.start} ${styles.main}`}>컨텐츠 영역(첫페이지)</div>;
}
