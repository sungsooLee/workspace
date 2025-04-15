import { Children, FC, isValidElement, ReactNode, useState, useEffect, useRef } from 'react';
import { useCreation } from 'ahooks';
import { last } from 'lodash';

import { cn } from '@learnway/shared';
import { Button } from '@learnway/ui';
import { IcoStar } from '@learnway/icons';
import { useCurrentRoute } from '@learnway/hooks';

import { useActiveMenuDepthState } from '../../../../features/platform';

import { Breadcrumbs } from './breadcrumbs/breadcrumbs';
import { ContentsButtons } from './slot/contents-buttons';
import { PageContents } from './page-contents';

import styles from '@learnway/styles/bo/assets/styles/modules/page-container.module.css';

/**
 * 목록 또는 상세 화면에 대한 디자인 wrapping 컴포넌트
 * @param children
 * @param panel
 * @constructor
 */
const PageContainerComponent: FC<{
  children?: ReactNode; // 자식 요소
  displayContent?: boolean; // 컨텐츠를 출력할지 여부를 결정한다. 기본값은 출력
  showFavoriteButton?: boolean;
  notice?: boolean; // 화면내에 Notice 있는 경우
  tabs?: boolean; // 컨텐츠 상단에 tab 있는 경우
  scrollHidden?: boolean; // 컨텐츠 안에 스크롤인 경우
}> = ({
  children,
  displayContent = true,
  showFavoriteButton = true,
  notice = false,
  tabs = false,
  scrollHidden = false,
}) => {
  const { meta } = useCurrentRoute();
  const [activeMenuDepth] = useActiveMenuDepthState();
  const [isFavorite, setIsFavorite] = useState(true);

  const title = useCreation(() => {
    return last(activeMenuDepth)?.menuName ?? meta?.title;
  }, [activeMenuDepth]);

  const ButtonSlot = Children.toArray(children).find(
    (child) => isValidElement(child) && child.type === ContentsButtons,
  );
  const BodySlot = Children.toArray(children).filter(
    (child) => !(isValidElement(child) && child.type === ContentsButtons),
  );

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
          <h3 className={styles.title}>
            {title}
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
          {ButtonSlot && displayContent && <div className={styles.btn_wrap}>{ButtonSlot}</div>}
        </div>
        {/* contents */}
        {BodySlot.length > 0 && displayContent && (
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
            <div className={styles.content}>
              <PageContents>{BodySlot}</PageContents>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export const PageContainer = PageContainerComponent;
