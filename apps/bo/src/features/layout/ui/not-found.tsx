import { Link } from '@tanstack/react-router';

import { Button } from '@learnway/ui';
import { cn } from '@learnway/shared';
import styles from '@learnway/styles/bo/assets/styles/modules/not-found.module.css';
import pageStyles from '@learnway/styles/bo/assets/styles/modules/page-container.module.css';

const NotFoundComponent = () => {
  return (
    <div className={cn(pageStyles.start, pageStyles.contents)}>
      <div className={pageStyles.inner}>
        <div className={cn(styles.start, 'not_found')}>
          <div className={styles.guide_wrap}>
            <div className={styles.empty_message}>
              <strong>{'404'}</strong>
              <p>{'NOT FOUND'}</p>
            </div>
            <p className={styles.text}>{'요청하신 페이지를 찾을 수 없습니다.'}</p>
            <div className={styles.btn_wrap}>
              <Link to={'/'}>
                <Button variant={'primary'} size={'lg'}>
                  {'홈'}
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export const NotFound = NotFoundComponent;
