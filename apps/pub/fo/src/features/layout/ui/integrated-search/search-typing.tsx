import styles from './search-typing.module.css';
import { cn } from '@learnway/shared';

export const SearchTyping: React.FC = () => {
  return (
    <div className={cn(styles.start, styles.search_typing)}>
      <div>typing</div>
    </div>
  );
};
