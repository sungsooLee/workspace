// toast-icons.tsx
import { IcoCheck, IcoClose02 } from '@learnway/icons';
import styles from './toast.module.css';

export const toastIcons = {
  success: <IcoCheck className={styles.icon_check} />,
  error: <IcoClose02 className={styles.icon_error} />,
} as const;
