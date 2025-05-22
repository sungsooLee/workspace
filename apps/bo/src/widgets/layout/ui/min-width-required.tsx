import { cn } from '@learnway/shared';
import styles from '@learnway/styles/bo/assets/styles/modules/breakpoint.module.css';

export const MinWidthRequired = () => {
  return (
    <div className={cn(styles.start, 'breakpoint')}>
      <div className={styles.guide_wrap}>
        <p className={styles.text}>{'효율적인 업무를 위해 창 크기를 늘려주세요.'}</p>
      </div>
    </div>
  );
};
