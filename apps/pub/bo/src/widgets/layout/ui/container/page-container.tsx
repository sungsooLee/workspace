import { memo, ReactNode } from 'react';
// import { useTranslation } from 'react-i18next';
import { Breadcrumbs } from './breadcrumbs/breadcrumbs';
import { Button } from '@learnway/ui';
import styles from './page-container.module.css';

interface PageContainerComponentProps {
  children: ReactNode;
}

function PageContainerComponent({ children }: PageContainerComponentProps) {
  // const { t } = useTranslation();

  return (
    <div className={`${styles.start} ${styles.contents}`}>
      <Breadcrumbs />
      <div className={styles.inner}>
        {/* title_wrap */}
        <div className={styles.title_wrap}>
          <h3 className={styles.title}>동영상 상세</h3>
          <div className={styles.btn_wrap}>
            <Button variant="point" size="sm">
              매핑과정 보기
            </Button>
            <Button variant="point" size="sm">
              공유이력 보기
            </Button>
            <Button variant="point" size="sm">
              삭제
            </Button>
            <Button variant="point" size="sm">
              수정
            </Button>
            <Button variant="primary" size="sm">
              목록
            </Button>
          </div>
        </div>
        {/* contents_wrap */}
        <div className={styles.contents_wrap}>
          {/* contents */}
          <div className={styles.contents}>{children}</div>
        </div>
      </div>
    </div>
  );
}

export const PageContainer = memo(PageContainerComponent);
