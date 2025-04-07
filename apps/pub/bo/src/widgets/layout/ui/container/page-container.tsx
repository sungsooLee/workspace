import React, { memo, ReactNode, useState, useEffect, useRef } from 'react';
import { Link } from '@tanstack/react-router';
// import { useTranslation } from 'react-i18next';
import { Breadcrumbs } from './breadcrumbs/breadcrumbs';
import { Button } from '@learnway/ui';
import styles from '@learnway/styles/bo/assets/styles/modules/page-container.module.css';
import fabStyles from '@learnway/styles/bo/assets/styles/modules/fab.module.css'; /* fab */
import { IcoStar, IcoArrowLineTop } from '@learnway/icons'; // 2025-02-14 버튼 케이스 추가
import { cn } from '@learnway/shared';

interface PageContainerComponentProps {
  children: ReactNode;
  showFavoriteButton?: boolean;
  notice?: boolean; // 화면내에 Notice 있는 경우
  tabs?: boolean; // 컨텐츠 상단에 tab 있는 경우
  scrollHidden?: boolean; // 컨텐츠 안에 스크롤인 경우
}

function PageContainerComponent({
  children,
  showFavoriteButton = true,
  notice = false,
  tabs = false,
  scrollHidden = false,
}: PageContainerComponentProps) {
  // const { t } = useTranslation();
  const [isFavorite, setIsFavorite] = useState(true);

  // scroll event
  const scrollContainerRef = useRef<HTMLDivElement | null>(null);
  const [hasScroll, setHasScroll] = useState(false);
  const [scrollPosition, setScrollPosition] = useState(0);

  const handleScroll = () => {
    if (scrollContainerRef.current) {
      const scrollTop = scrollContainerRef.current.scrollTop;
      setScrollPosition(scrollTop);
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
  }, []);

  useEffect(() => {
    const checkScroll = () => {
      if (scrollContainerRef.current) {
        const isScrollable =
          scrollContainerRef.current.scrollHeight > scrollContainerRef.current.clientHeight;
        setHasScroll(isScrollable);
        console.log(hasScroll ? '스크롤 있음' : '스크롤 없음');
      }
    };

    // 컴포넌트가 처음 렌더링 될 때 체크
    checkScroll();

    // 창 크기 조정 시에도 체크할 수 있도록 이벤트 리스너 추가
    window.addEventListener('resize', checkScroll);

    // 클린업
    return () => {
      window.removeEventListener('resize', checkScroll);
    };
  }, [hasScroll]);

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
                onClick={() => setIsFavorite(!isFavorite)}
              >
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
            <Button variant="primary" size="sm">
              신규등록
            </Button>
          </div>
        </div>
        {/* content_wrap */}
        <div
          className={cn(
            styles.content_wrap,
            tabs && 'case_tabs',
            notice && 'case_notice',
            scrollHidden && 'scroll_hidden',
            'content_wrap',
          )}
        >
          {/* contents */}
          <div className={styles.content}>{children}</div>
        </div>
      </div>
      {/* fab */}
      {hasScroll && (
        <div className={cn(fabStyles.start, fabStyles.fab_wrap, 'fab_wrap')}>
          <div className={fabStyles.inner}>
            <Button onlyIcon className={fabStyles.btn_top}>
              <IcoArrowLineTop
                width={16}
                height={16}
                stroke="#6F798B"
                className={styles.icon_top}
              />
            </Button>
            <Button onlyIcon className={fabStyles.btn_bottom}>
              <IcoArrowLineTop
                width={16}
                height={16}
                stroke="#6F798B"
                className={styles.icon_bottom}
              />
            </Button>
          </div>
        </div>
      )}
    </div>
  );
}

export const PageContainer = memo(PageContainerComponent);
