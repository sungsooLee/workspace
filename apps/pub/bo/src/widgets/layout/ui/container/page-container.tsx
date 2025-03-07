import React, { memo, ReactNode, useState } from 'react';
import { Link } from '@tanstack/react-router';
// import { useTranslation } from 'react-i18next';
import { Breadcrumbs } from './breadcrumbs/breadcrumbs';
import { Button } from '@learnway/ui';
import styles from './page-container.module.css';
import { IcoStar } from '@learnway/icons'; // 2025-02-14 버튼 케이스 추가
import { cn } from '@learnway/shared';

interface PageContainerComponentProps {
  children: ReactNode;
  showFavoriteButton?: boolean;
}

function PageContainerComponent({
  children,
  showFavoriteButton = true,
}: PageContainerComponentProps) {
  // const { t } = useTranslation();
  const [isFavorite, setIsFavorite] = useState(true);

  return (
    <div className={`${styles.start} ${styles.contents}`}>
      <Breadcrumbs />
      <div className={styles.inner}>
        {/* title_wrap */}
        <div className={styles.title_wrap}>
          {/* 2025-02-14 버튼 케이스 추가 */}
          <h3 className={cn(styles.title, 'title_bo_1_b')}>
            타이틀
            {showFavoriteButton && (
              <Button
                className={cn(styles.btn_favorites, isFavorite ? styles.active : '')}
                onlyIcon
                onClick={() => setIsFavorite(!isFavorite)}>
                <IcoStar
                  width={16}
                  height={16}
                  stroke="#FFB902"
                  fill="#FFB902"
                  className={styles.icon_star}
                />
              </Button>
            )}
          </h3>
          <div className={styles.btn_wrap}>
            <div className={styles.link_box}>
              <div className={styles.link}>
                <Link to={'/'}>상시 학습 개설</Link>
                <Link to={'/'}>이러닝 개설</Link>
                <Link to={'/'}>라이브개설</Link>
              </div>
              <Button variant="point" size="sm">
                목록
              </Button>
            </div>
            <Button variant="point" size="sm">
              매핑과정 보기
            </Button>
            <Button variant="point" size="sm">
              공유이력 보기
            </Button>
            <Button variant="point" size="sm">
              삭제
            </Button>
            <Button variant="primary" size="sm">
              수정
            </Button>
          </div>
        </div>
        {/* content_wrap */}
        <div className={styles.content_wrap}>
          {/* contents */}
          <div className={styles.content}>{children}</div>
        </div>
      </div>
    </div>
  );
}

export const PageContainer = memo(PageContainerComponent);
