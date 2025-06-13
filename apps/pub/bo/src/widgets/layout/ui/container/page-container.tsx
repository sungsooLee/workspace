/* eslint-disable @nx/enforce-module-boundaries */
import React, { memo, ReactNode, useState, useEffect, useRef } from 'react';
import { Link } from '@tanstack/react-router';
// import { useTranslation } from 'react-i18next';
import { Breadcrumbs } from './breadcrumbs/breadcrumbs';
import { Button, Popover } from '@learnway/ui';
import styles from '@learnway/styles/bo/assets/styles/modules/page-container.module.css';
import fabStyles from '@learnway/styles/bo/assets/styles/modules/fab.module.css'; /* fab */
import tooltipPopoverStyles from '@learnway/styles/bo/assets/styles/modules/tootip-popover.module.css';
import { NoticeBox } from '../../../../../../../bo/src/shared/ui';
import { IcoStar, IcoArrowLineTop, IcoAlertCircle, IcoClose02 } from '@learnway/icons'; // 2025-02-14 버튼 케이스 추가
import { cn } from '@learnway/shared';

interface PageContainerComponentProps {
  children: ReactNode;
  showFavoriteButton?: boolean;
  notice?: boolean; // 화면내에 Notice 있는 경우
  tabs?: boolean; // 컨텐츠 상단에 tab 있는 경우
  scrollHidden?: boolean; // 컨텐츠 안에 스크롤인 경우
  hideOutLine?: boolean; // 공통 > 나의 정보 화면(외곽라인,bg 없는 경우)
  showGuidePopup?: boolean; // 가이드 팝업
}

function PageContainerComponent({
  children,
  showFavoriteButton = true,
  notice = false,
  tabs = false,
  scrollHidden = false,
  hideOutLine = false,
  showGuidePopup = true,
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
      if (scrollTop === 0) {
        document.body.classList.remove('scrolled');
      } else if (scrollTop > scrollPosition + 50) {
        document.body.classList.add('scrolled');
      }
    }
  };

  // 도움말
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const PopoverContent = () => {
    return (
      <div className={tooltipPopoverStyles.start}>
        <strong className={tooltipPopoverStyles.title}>{'도움말'}</strong>
        <div className={tooltipPopoverStyles.contents_wrap}>
          <NoticeBox
            iconVisible={false}
            type={'bullet'}
            description={
              '가이드 팝업은 텍스트 길이에 따라 가변적으로 노출됩니다. 가로 너비는 최대 640px으로 제한됩니다. 가이드 팝업은 텍스트 길이에 따라 가변적으로 노출됩니다. 가로 너비는 최대 640px으로 제한됩니다.'
            }
            descriptions={[
              '도움말 클릭시 도움말 영역이 가변적으로 노출됩니다. 영역을 클릭하거나 우측 닫기 버튼을 클릭하면 해당 영역이 사라집니다.',
              '도움말 클릭시 도움말 영역이 가변적으로 노출됩니다. 영역을 클릭하거나 우측 닫기 버튼을 클릭하면 해당 영역이 사라집니다.',
              '도움말 클릭시 도움말 영역이 가변적으로 노출됩니다. 영역을 클릭하거나 우측 닫기 버튼을 클릭하면 해당 영역이 사라집니다.',
              '도움말 클릭시 도움말 영역이 가변적으로 노출됩니다. 영역을 클릭하거나 우측 닫기 버튼을 클릭하면 해당 영역이 사라집니다.',
              '도움말 클릭시 도움말 영역이 가변적으로 노출됩니다. 영역을 클릭하거나 우측 닫기 버튼을 클릭하면 해당 영역이 사라집니다.',
              '도움말 클릭시 도움말 영역이 가변적으로 노출됩니다. 영역을 클릭하거나 우측 닫기 버튼을 클릭하면 해당 영역이 사라집니다.',
              '도움말 클릭시 도움말 영역이 가변적으로 노출됩니다. 영역을 클릭하거나 우측 닫기 버튼을 클릭하면 해당 영역이 사라집니다.',
              '도움말 클릭시 도움말 영역이 가변적으로 노출됩니다. 영역을 클릭하거나 우측 닫기 버튼을 클릭하면 해당 영역이 사라집니다.',
              '도움말 클릭시 도움말 영역이 가변적으로 노출됩니다. 영역을 클릭하거나 우측 닫기 버튼을 클릭하면 해당 영역이 사라집니다.',
              '도움말 클릭시 도움말 영역이 가변적으로 노출됩니다. 영역을 클릭하거나 우측 닫기 버튼을 클릭하면 해당 영역이 사라집니다.',
              '도움말 클릭시 도움말 영역이 가변적으로 노출됩니다. 영역을 클릭하거나 우측 닫기 버튼을 클릭하면 해당 영역이 사라집니다.',
            ]}
          />
        </div>
        <Button
          className={tooltipPopoverStyles.btn_close}
          icon={<IcoClose02 />}
          onlyIcon
          onClick={() => setIsOpen(!isOpen)}
        />
      </div>
    );
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
  }, [hasScroll]);

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

    const observer = new MutationObserver(checkScroll);
    if (scrollContainerRef.current) {
      observer.observe(scrollContainerRef.current, {
        childList: true,
        subtree: true,
        attributes: true, // 크기 변화와 같은 속성 변경을 감지
      });
    }

    // 클린업
    return () => {
      window.removeEventListener('resize', checkScroll);
      if (scrollContainerRef.current) {
        observer.disconnect();
      }
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
            {/* 가이드 팝업 추가 */}
            {showGuidePopup && (
              <Popover
                popoverContent={<PopoverContent />}
                className={styles.guide_popup}
                side="bottom"
                align="start"
                sideOffset={10}
                open={isOpen}
                onOpenChange={setIsOpen}
                // onPointerDownOutside={(e) => e.preventDefault()}
                // onInteractOutside={(e) => e.preventDefault()}
              >
                <IcoAlertCircle width={20} height={20} fill="#A9AFB8" stroke="#ffffff" />
              </Popover>
            )}
          </h3>
          <div className={styles.btn_wrap}>
            <div className={styles.link_box}>
              <div className={styles.link}>
                <Link to={'/'}>상시 학습 개설</Link>
                <Link to={'/'}>이러닝 개설</Link>
                <Link to={'/'}>라이브개설</Link>
              </div>
              <Button variant="point" size="sm" label={'목록'} />
              <Button variant="point" size="sm" label={'매핑과정 보기'} />
            </div>
            <Button variant="point" size="sm" disabled label={'배포'} />
            <Button variant="primary" size="sm" disabled label={'저장'} />
            {/* <Button
              className={styles.btn_close}
              onlyIcon
              icon={<IcoClose02 width={24} height={24} stroke={'#4C515E'} />}
            /> */}
          </div>
        </div>
        {/* content_wrap */}
        <div
          className={cn(
            styles.content_wrap,
            tabs && 'tab_visible',
            notice && 'notice_visible',
            scrollHidden && 'scroll_hidden',
            hideOutLine && styles.hide_outline,
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
}

export const PageContainer = memo(PageContainerComponent);
