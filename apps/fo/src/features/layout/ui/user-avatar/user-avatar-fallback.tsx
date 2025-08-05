import { useCreation } from 'ahooks';

import { cn } from '@learnway/shared';
import styles from '@learnway/styles/fo/features/layout/ui/user-avatar/user-avatar.module.css';

export const AvataFallbackComponent = ({ name }: { name?: string }) => {
  const firstUnit = useCreation(() => {
    if (!name) {
      return '';
    }
    return name.substring(0, 1);
  }, [name]);
  return (
    <span className={cn(styles.fallback, styles.name)}>
      <em className={styles.text}>{firstUnit}</em>
    </span>
  );
};

export const AvataFallback = AvataFallbackComponent;
