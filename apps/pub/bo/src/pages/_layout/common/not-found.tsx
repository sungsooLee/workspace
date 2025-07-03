import { createFileRoute } from '@tanstack/react-router';
import { cn } from '@learnway/shared';
import { Button } from '@learnway/ui';
import styles from '@learnway/styles/bo/assets/styles/modules/not-found.module.css';

export const Route = createFileRoute('/_layout/common/not-found')({
  component: RouteComponent,
});

function RouteComponent() {
  return (
    <div className={cn(styles.start, 'not_found')}>
      <div className={styles.guide_wrap}>
        <div className={styles.empty_message}>
          <strong>{'404'}</strong>
          <p>{'NOT FOUND'}</p>
        </div>
        <p className={styles.text}>{'요청하신 페이지를 찾을 수 없습니다.'}</p>
        <div className={styles.btn_wrap}>
          <Button variant={'primary'} size={'lg'}>
            {'홈'}
          </Button>
        </div>
      </div>
    </div>
  );
}
