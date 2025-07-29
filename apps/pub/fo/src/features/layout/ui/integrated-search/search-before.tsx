import styles from './search-before.module.css';
import { cn } from '@learnway/shared';

export const SearchBefore: React.FC = () => {
  return (
    <div className={cn(styles.start, styles.search_before)}>
      <div>Before</div>
    </div>
  );
};
