import { memo } from 'react';
import { useTranslation } from 'react-i18next';

import { cn } from '@learnway/shared';

import { Language } from '../../../../../features/platform';

import styles from './footer.module.css';

function FooterComponent() {
  const { t } = useTranslation();

  return <div className={styles.start}>Mobile Footer</div>;
}

export const MobileFooter = memo(FooterComponent);
