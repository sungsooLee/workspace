import React, { memo, ReactNode, useState, useEffect, useRef } from 'react';
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

  // scroll event
  const scrollContainerRef = useRef<HTMLDivElement | null>(null);
  const [scrollPosition, setScrollPosition] = useState(0);

  const handleScroll = () => {
    if (scrollContainerRef.current) {
      const scrollTop = scrollContainerRef.current.scrollTop;
      setScrollPosition(scrollTop);
      console.log('스크롤 위치:', scrollTop, scrollPosition);
      scrollTop > 0
        ? document.body.classList.add('scrolled')
        : document.body.classList.remove('scrolled');
    }
  };

  useEffect(() => {
    const container = scrollContainerRef.current;
    if (container) {
      container.addEventListener('scroll', handleScroll);
    }

    // 컴포넌트 언마운트 시 이벤트 제거
    return () => {
      if (container) {
        container.removeEventListener('scroll', handleScroll);
      }
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className={`${styles.start} ${styles.contents}`}>
      <Breadcrumbs />
      <div ref={scrollContainerRef} className={cn(styles.inner, 'scroll_inner')}>
        {/* title_wrap */}
        <div className={cn(styles.title_wrap, 'title_wrap')}>
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
        <div className={cn(styles.content_wrap, 'content_wrap')}>
          {/* contents */}
          <div className={styles.content}>{children}</div>
        </div>
      </div>
    </div>
  );
}

export const PageContainer = memo(PageContainerComponent);
