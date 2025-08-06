import { Button } from '@learnway/ui/button';
import { useModal } from '@learnway/ui/modal';
/* eslint-disable react-hooks/exhaustive-deps */
import {
  useActiveMenuDepthState,
  useAsyncFetchMenusForceRefetch,
  useFetchAuthUser,
  useUpdateUser,
} from '@learnway/auth/entities';
import { useCurrentRoute } from '@learnway/hooks';
import {
  IcoAlertCircle,
  IcoArrowLineTop,
  IcoClose02,
  IcoImport,
  IcoStar,
  IcoTranslation,
} from '@learnway/icons';
import { cn } from '@learnway/shared';
import { Popover } from '@learnway/ui/popover';
import { Tooltip } from '@learnway/ui/tooltip';
import { t } from 'i18next';
import { isEmpty } from 'lodash-es';
import {
  Children,
  FC,
  isValidElement,
  ReactNode,
  useEffect,
  useMemo,
  useRef,
  useState,
} from 'react';

import { Breadcrumbs } from './breadcrumbs/breadcrumbs';
import { PageContents } from './page-contents';
import { ContentsButtons } from './slot/contents-buttons';

import { useCreateMenuFavorites, useDeleteMenuFavorites } from '@entities/menu';
import fabStyles from '@learnway/styles/bo/assets/styles/modules/fab.module.css'; /* fab */
import styles from '@learnway/styles/bo/assets/styles/modules/page-container.module.css';
import tooltipPopoverStyles from '@learnway/styles/bo/assets/styles/modules/tootip-popover.module.css';
import { ContentCreateType } from '@shared/types/enums';
import { NoticeBox } from '@shared/ui';

export type GuidePopupProps = {
  title?: string;
  description?: string;
  descriptions?: string[];
  type?: 'bullet' | 'count';
};

export type TooltipProps = {
  show: boolean;
  content: ReactNode | string;
  type?: ContentCreateType | string | undefined; // 툴팁 아이콘 타입 (추후 새로운 아이콘 필요 시 추가 or 수정 필요)
};

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
  showTooltip?: boolean; // 메뉴 타이틀 우측 툴팁 노출 여부
  notice?: boolean; // 화면내에 Notice 있는 경우
  tabs?: boolean; // 컨텐츠 상단에 tab 있는 경우
  scrollHidden?: boolean; // 컨텐츠 안에 스크롤인 경우
  hideOutLine?: boolean; // 공통 > 나의 정보 화면(외곽라인,bg 없는 경우)
  title?: string; // 별도 타이틀로 설정해야 하는 경우
  guidePopupProps?: GuidePopupProps; // 가이드 팝업 props, props가 존재하면 노출
  tooltipProps?: TooltipProps; // 툴팁 props
}> = ({
  children,
  displayContent = true,
  showFavoriteButton = true,
  showTooltip = false,
  notice = false,
  tabs = false,
  scrollHidden = false,
  hideOutLine = false,
  title,
  guidePopupProps,
  tooltipProps,
}) => {
  const { meta } = useCurrentRoute();
  const {
    activeMenuDepthMenu: activeMenuDepth,
    setActiveMenuDepthMenu,
    currentMenu,
  } = useActiveMenuDepthState((state) => state);

  const { data: authUser } = useFetchAuthUser();

  const { updateMenu } = useUpdateUser();
  const { asyncMenus } = useAsyncFetchMenusForceRefetch();

  const { createMenuFavorites } = useCreateMenuFavorites();
  const { deleteMenuFavorites } = useDeleteMenuFavorites();
  const { alert: openAlert } = useModal();

  // 페이지 타이틀
  const pageTitle = useMemo(() => {
    return title || meta?.title || t(`HRD_CENTER_MENU.${currentMenu?.menuCode}`);
  }, [currentMenu, meta]);

  // 페이지 즐겨찾기 여부
  const isFavorite = useMemo(() => {
    return currentMenu?.isFavorite;
  }, [currentMenu]);

  const ButtonSlot = Children.toArray(children).find(
    (child) => isValidElement(child) && child.type === ContentsButtons,
  );
  const BodySlot = Children.toArray(children).filter(
    (child) => !(isValidElement(child) && child.type === ContentsButtons),
  );

  const tooltip = useMemo(
    () => [
      {
        key: 'TRANSLATE',
        Component: <IcoTranslation width={18} height={18} fill="#f6f8fd" stroke="#4c515e" />,
      },
      {
        key: 'SHARED',
        Component: <IcoImport width={18} height={18} fill="#f6f8fd" stroke="#4c515e" />,
      },
    ],
    [],
  );

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

  useEffect(() => {
    const container = scrollContainerRef.current;
    if (container) {
      container.addEventListener('scroll', handleScroll);
    }

    // 컴포넌트 언마운트 시 이벤트 제거
    return () => {
      if (container) {
        container.removeEventListener('scroll', handleScroll);
        document.body.classList.remove('scrolled');
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

  const handleFavorites = async () => {
    if (!currentMenu) return;

    console.log('currentMenu', currentMenu);
    if (!isFavorite) {
      createMenuFavorites(
        {
          menuId: currentMenu?.menuId,
          // TODO tenantId 는 있어야하지 않나?
          // tenantId: currentMenu?.tenantId,
          // userId: authUser?.userId
          //
        },
        {
          onSuccess: async (data: any) => {
            console.log('data', data);
            if (authUser?.activeTenant?.tenantId) {
              const menus = await asyncMenus(
                authUser?.activeTenant?.tenantId as number,
                authUser?.activeRole?.roleId as number,
              );
              updateMenu(menus);
              const update = activeMenuDepth?.map((menu) =>
                menu.menuId === currentMenu.menuId ? { ...menu, isFavorite: true } : menu,
              );
              if (update) {
                setActiveMenuDepthMenu([...update]);
              }
            }
          },
          onError: (data: any) => {
            if (data?.code === 'B001') {
              openAlert({
                title: t('LABEL.alert.notFavoritesAdd.title'),
                content: t('LABEL.alert.notFavoritesAdd.message'),
              });
            }
          },
        },
      );
    } else {
      deleteMenuFavorites(currentMenu?.menuId, {
        onSuccess: async (data: any) => {
          console.log('data', data);
          if (authUser?.activeTenant?.tenantId) {
            const menus = await asyncMenus(
              authUser?.activeTenant?.tenantId as number,
              authUser?.activeRole?.roleId as number,
            );
            updateMenu(menus);
            const update = activeMenuDepth?.map((menu) =>
              menu.menuId === currentMenu.menuId ? { ...menu, isFavorite: false } : menu,
            );
            if (update) {
              setActiveMenuDepthMenu([...update]);
            }
          }
        },
      });
    }
  };

  // GuidePopup
  const PopoverContent = () => {
    return (
      <div className={tooltipPopoverStyles.start}>
        <strong className={tooltipPopoverStyles.title}>{guidePopupProps?.title}</strong>
        <div className={tooltipPopoverStyles.contents_wrap}>
          <NoticeBox
            iconVisible={false}
            type={guidePopupProps?.type || 'bullet'}
            description={guidePopupProps?.description}
            descriptions={guidePopupProps?.descriptions}
          />
        </div>
        <Popover.Close asChild>
          <Button className={tooltipPopoverStyles.btn_close} icon={<IcoClose02 />} onlyIcon />
        </Popover.Close>
      </div>
    );
  };

  return (
    <div className={cn(styles.start, styles.contents)}>
      <Breadcrumbs />
      <div ref={scrollContainerRef} className={cn(styles.inner, 'scroll_inner')}>
        {/* title_wrap */}
        <div className={cn(styles.title_wrap, 'title_wrap')}>
          <h3 className={cn(styles.title, 'title_bo_1_b')}>
            {/* 페이지 타이틀 */}
            {pageTitle}
            {/* 즐겨찾기 기능 */}
            {showFavoriteButton && (
              <Button
                className={cn(styles.btn_favorites, isFavorite ? styles.active : '')}
                onlyIcon
                onClick={() => {
                  handleFavorites();
                }}
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
            {/* GuidePopup */}
            {guidePopupProps && (
              <Popover
                popoverContent={<PopoverContent />}
                className={styles.guide_popup}
                side="bottom"
                align="start"
                sideOffset={10}
                // onPointerDownOutside={(e) => e.preventDefault()}
                // onInteractOutside={(e) => e.preventDefault()}
              >
                <IcoAlertCircle width={20} height={20} fill="#A9AFB8" stroke="#ffffff" />
              </Popover>
            )}
            {tooltipProps?.show && (
              <Tooltip
                className="ml-[2px] align-middle"
                side="right"
                align="start"
                content={tooltipProps.content}
              >
                {isEmpty(tooltip.find((item) => item.key === tooltipProps.type)) && (
                  <IcoAlertCircle width={16} height={16} fill="#A9AFB8" stroke="#ffffff" />
                )}
                {tooltip.map(
                  ({ key, Component }) =>
                    key === tooltipProps.type && (
                      <Button onlyIcon key={key}>
                        {Component}
                      </Button>
                    ),
                )}
              </Tooltip>
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
              hideOutLine && styles.hide_outline,
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
