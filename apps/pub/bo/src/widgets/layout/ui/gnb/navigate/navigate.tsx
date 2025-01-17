import { memo } from 'react';

import styles from './navigate.module.css';

function NavigateComponent() {
  return <div className={styles._start}></div>;
}

export const Navigate = memo(NavigateComponent);
