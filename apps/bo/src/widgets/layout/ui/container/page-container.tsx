import { Children, FC, isValidElement, ReactNode, useState, useEffect, useRef } from 'react';
import { useCreation } from 'ahooks';
import { last } from 'lodash';

import { cn } from '@learnway/shared';
import { Button } from '@learnway/ui';
import { IcoStar, IcoArrowLineTop } from '@learnway/icons';
import { useCurrentRoute } from '@learnway/hooks';
import { useActiveMenuDepthState } from '@learnway/auth';

import { Breadcrumbs } from './breadcrumbs/breadcrumbs';
import { ContentsButtons } from './slot/contents-buttons';
import { PageContents } from './page-contents';

import styles from '@learnway/styles/bo/assets/styles/modules/page-container.module.css';
import fabStyles from '@learnway/styles/bo/assets/styles/modules/fab.module.css'; /* fab */

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
    const currentMenuCode = last(activeMenuDepth)?.menuCode;
    return currentMenuCode ? `MENU.${currentMenuCode}` : meta?.title;
  }, [activeMenuDepth]);

  const ButtonSlot = Children.toArray(children).find(
    (child) => isValidElement(child) && child.type === ContentsButtons,
  );
  const BodySlot = Children.toArray(children).filter(
    (child) => !(isValidElement(child) && child.type === ContentsButtons),
  );

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
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    const checkScroll = () => {
      if (scrollContainerRef.current) {
        const isScrollable =
          scrollContainerRef.current.scrollHeight > scrollContainerRef.current.clientHeight;
        setHasScroll(isScrollable);
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

  const scrollToTop = () => {
    if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollTo({
        top: 0,
        behavior: 'smooth',
      });
    }
  };

  const scrollToBottom = () => {
    if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollTo({
        top: scrollContainerRef.current.scrollHeight,
        behavior: 'smooth',
      });
    }
  };

  return (
    <div className={cn(styles.start, styles.contents)}>
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
              tabs && 'tab_visible',
              notice && 'notice_visible',
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
      {/* fab */}
      {hasScroll && (
        <div className={cn(fabStyles.start, fabStyles.fab_wrap, 'fab_wrap')}>
          <div className={fabStyles.inner}>
            <Button onlyIcon className={fabStyles.btn_top} onClick={scrollToTop}>
              <IcoArrowLineTop
                width={16}
                height={16}
                stroke="#6F798B"
                className={styles.icon_top}
              />
            </Button>
            <Button onlyIcon className={fabStyles.btn_bottom} onClick={scrollToBottom}>
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
};

export const PageContainer = PageContainerComponent;
