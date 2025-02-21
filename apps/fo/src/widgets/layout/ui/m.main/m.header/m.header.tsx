import { memo } from 'react';
import { useTranslation } from 'react-i18next';

import { cn } from '@learnway/shared';

import { Language } from '../../../../../features/platform';

import styles from './m.header.module.css';

function HeaderComponent() {
  const { t } = useTranslation();

  return <div className={styles.start}>Mobile Header</div>;
}

export const MobileHeader = memo(HeaderComponent);
