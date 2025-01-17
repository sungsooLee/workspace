import { memo } from 'react';
import { Link } from '@tanstack/react-router';

import { MyMenu } from '../../../../../features/layout';

import styles from './quick-menu.module.css';

function QuickMenuComponent() {
  return <div className={styles._start}></div>;
}

export const QuickMenu = memo(QuickMenuComponent);
