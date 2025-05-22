import { createFileRoute } from '@tanstack/react-router';
import { cn } from '@learnway/shared';
import styles from '@learnway/styles/bo/assets/styles/modules/breakpoint.module.css';

export const Route = createFileRoute('/_layout/common/breakpoint')({
  component: RouteComponent,
});

function RouteComponent() {
  return (
    <div className={cn(styles.start, 'breakpoint')}>
      <div className={styles.guide_wrap}>
        <p className={styles.text}>{'효율적인 업무를 위해 창 크기를 늘려주세요.'}</p>
      </div>
    </div>
  );
}
