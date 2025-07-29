import styles from './search-submitted.module.css';
import { cn } from '@learnway/shared';

export const SearchSubmitted: React.FC = () => {
  return (
    <div className={cn(styles.start, styles.search_submitted)}>
      <div>submitted</div>
    </div>
  );
};
