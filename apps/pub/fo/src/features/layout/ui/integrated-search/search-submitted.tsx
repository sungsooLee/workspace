import { IcoClose02 } from '@learnway/icons';
import { cn } from '@learnway/shared';
import { Button, Popover } from '@learnway/ui';
import styles from './search-submitted.module.css';

export const SearchSubmitted: React.FC = () => {
  return (
    <div className={cn(styles.start, styles.search_submitted)}>
      <Popover.Close>
        <Button onlyIcon={true} icon={<IcoClose02 />} className={styles.btn_close} />
      </Popover.Close>
    </div>
  );
};
