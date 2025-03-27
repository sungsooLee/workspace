import React, { memo, ReactNode, useState, useEffect, useRef } from 'react';
import { Link } from '@tanstack/react-router';
// import { useTranslation } from 'react-i18next';
import { Breadcrumbs } from './breadcrumbs/breadcrumbs';
import { Button } from '@learnway/ui';
import styles from '@learnway/styles/bo/assets/styles/modules/page-container.module.css';
import { IcoStar } from '@learnway/icons'; // 2025-02-14 버튼 케이스 추가
import { cn } from '@learnway/shared';
import { IcoAnnouncement03 } from '@learnway/icons';

interface PageContainerComponentProps {
  children: ReactNode;
  showFavoriteButton?: boolean;
  notice?: boolean;
  tabs?: boolean;
}

function PageContainerComponent({
  children,
  showFavoriteButton = true,
  notice = false,
  tabs = false,
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
        {/* 2025-03-11 : notice 추가 S */}
        {notice && (
          <div className={cn(styles.notice_wrap)}>
            <div className={styles.icons_wrap}>
              <IcoAnnouncement03 width={32} height={32} stroke={'#07287e'} />
            </div>
            <ul>
              <li>교육대상자로 지정된 교육생만 수강신청을 할 수 있도록 하는 기능입니다.</li>
              <li>
                FO 메뉴를 추가 등록하려면 각 그룹(예 : 이벤트 메뉴)의 메뉴추가 버튼을 클릭해 주세요.
              </li>
              <li>이벤트 메뉴는 1depth 등록만 가능하며, FO에는 최대 2개까지 노출이 됩니다.</li>
              <li>GNB 메뉴는 마우스 오버하면 수정하거나, 하위 메뉴를 등록할 수 있습니다.</li>
              <li>
                메뉴 순서 변경은 드래그앤드랍으로 변경하며, 사용 여부는 스위치 버튼으로 설정할 수
                있습니다.
              </li>
              <li>메뉴 순서 변경, 사용여부 변경 후에 저장 버튼을 클릭해야 저장됩니다.</li>
            </ul>
          </div>
        )}

        {/* 2025-03-11 : notice 추가 E */}
        {/* content_wrap */}
        <div className={cn(styles.content_wrap, tabs && 'case_tabs', 'content_wrap')}>
          {/* contents */}
          <div className={styles.content}>{children}</div>
        </div>
      </div>
    </div>
  );
}

export const PageContainer = memo(PageContainerComponent);
