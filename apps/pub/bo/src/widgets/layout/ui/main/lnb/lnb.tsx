import { memo, useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';

import { cn } from '@learnway/shared';
import { Button } from '@learnway/ui';
import { IcoArrowDown, IcoArrowBackward } from '@learnway/icons';

import { useActiveMenuDepthState } from '../../../../../features/platform';
import { AccordionMenu } from './accordion-menu/accordion-menu';

import styles from './lnb.module.css';

const MOCK_MENU_DATA = {
  title: '플랫폼 관리',
  children: [
    {
      id: 'user-management',
      key: 'user-management',
      title: '사용자 관리',
      children: [
        { id: 'user-list', key: 'user-list', title: '사용자 목록', path: '/users' },
        { id: 'user-roles', key: 'user-roles', title: '권한 관리', path: '/users/roles' },
        { id: 'user-groups', key: 'user-groups', title: '그룹 관리', path: '/users/groups' },
      ],
    },
    {
      id: 'content-management',
      key: 'content-management',
      title: '콘텐츠 관리',
      children: [
        { id: 'course-list', key: 'course-list', title: '강의 목록', path: '/courses' },
        { id: 'course-create', key: 'course-create', title: '강의 생성', path: '/courses/create' },
        {
          id: 'course-category',
          key: 'course-category',
          title: '카테고리 관리',
          path: '/courses/categories',
        },
      ],
    },
    {
      id: 'system-settings',
      key: 'system-settings',
      title: '시스템 설정',
      children: [
        {
          id: 'general-settings',
          key: 'general-settings',
          title: '일반 설정',
          path: '/settings/general',
        },
        {
          id: 'notification-settings',
          key: 'notification-settings',
          title: '알림 설정',
          path: '/settings/notifications',
        },
        {
          id: 'security-settings',
          key: 'security-settings',
          title: '보안 설정',
          path: '/settings/security',
        },
      ],
    },
    {
      id: 'analytics',
      key: 'analytics',
      title: '분석 및 리포트',
      children: [
        {
          id: 'user-analytics',
          key: 'user-analytics',
          title: '사용자 분석',
          path: '/analytics/users',
        },
        {
          id: 'course-analytics',
          key: 'course-analytics',
          title: '강의 분석',
          path: '/analytics/courses',
        },
        {
          id: 'performance-report',
          key: 'performance-report',
          title: '성과 리포트',
          path: '/analytics/performance',
        },
      ],
    },
  ],
};

function LNBComponent() {
  const { t } = useTranslation();

  // const [activeMenuDepth] = useActiveMenuDepthState();

  const [toggleLnb, setToggleLnb] = useState<boolean>(false);
  const [openAll, setOpenAll] = useState<boolean | undefined>(undefined);
  const [openAllButtonState, setOpenAllButtonState] = useState<boolean>(false);

  // 목데이터 전용 설정
  const currentMenuData = MOCK_MENU_DATA;
  const [menus, setMenus] = useState<any>(currentMenuData.children);

  const buttonClass = `${openAllButtonState ? styles.open : styles.close}`;

  // 목데이터 초기화
  useEffect(() => {
    setOpenAll(false);
    setOpenAllButtonState(false);
  }, [currentMenuData?.title]);

  useEffect(() => {
    if (!currentMenuData?.children) {
      return;
    }
    setToggleLnb(true);
    setMenus(currentMenuData.children);
  }, [currentMenuData?.children]);

  // useEffect(() => {
  //   setOpenAll(false);
  //   setOpenAllButtonState(false);
  // }, [activeMenuDepth?.[0]?.title]);

  // useEffect(() => {
  //   if (!activeMenuDepth?.[0]?.children) {
  //     return;
  //   }
  //   setToggleLnb(true);
  //   setMenus(activeMenuDepth?.[0]?.children);
  // }, [activeMenuDepth?.[0]?.children]);

  // LNB 토글 시 body 클래스 제어
  useEffect(() => {
    console.log('toggleLnb ===================================', toggleLnb);

    if (toggleLnb) {
      document.body.classList.add('lnb-open');
    } else {
      document.body.classList.remove('lnb-open');
    }

    return () => {
      document.body.classList.remove('lnb-open');
    };
  }, [toggleLnb]);

  // if (!activeMenuDepth?.[0]) {
  //   return <></>;
  // }

  const handleOpenAll = () => {
    setOpenAllButtonState(!openAllButtonState);
    setOpenAll(!openAllButtonState);
  };

  const handleOpenStateAll = (openAll: boolean) => {
    // 버튼 상태가 닫혀 있는 상태에서 모든 메뉴가 열린 경우 버튼 상태를 열린 상태로 변경(모두 닫기 활성화)
    if (openAllButtonState === false && openAll) {
      setOpenAllButtonState(true);
      setOpenAll(undefined);
    }
    // 버튼 상태가 열려 있는 상태에서 모든 메뉴가 닫힌 경우 버튼 상태를 닫힌 상태로 변경(모두 열기 활성화)
    if (openAllButtonState === true && !openAll) {
      setOpenAllButtonState(false);
      setOpenAll(undefined);
    }
  };

  const handleToggleLnb = () => {
    setToggleLnb((prev) => !prev);
  };

  return (
    <>
      <div
        style={{
          position: 'fixed',
          top: '20px',
          left: '50%',
          transform: 'translateX(-50%)',
          zIndex: 9999,
          display: 'flex',
          gap: '8px',
        }}
      >
        <Button
          onClick={handleToggleLnb}
          style={{
            backgroundColor: toggleLnb ? '#51cf66' : '#868e96',
            color: 'white',
            fontSize: '12px',
            padding: '8px 12px',
          }}
        >
          {toggleLnb ? 'LNB ON' : 'LNB OFF'}
        </Button>
      </div>

      <div
        className={`${styles.start} nlp--lnb ${toggleLnb ? `${styles.open}` : `${styles.close}`}`}
      >
        <div className={styles.lnb_wrap}>
          <h2 className={styles.lnb_title}>
            <Button
              type="button"
              className={cn(styles.lnb_title_btn, buttonClass)}
              onClick={() => handleOpenAll()}
            >
              <span className={styles.lnb_title_text}>{currentMenuData.title} (Mock)</span>
              {/* 기존: <span className={styles.lnb_title_text}>{activeMenuDepth[0].title}</span> */}
              <IcoArrowDown width={16} height={16} stroke="#131C30" />
            </Button>
          </h2>
          {menus && (
            <AccordionMenu
              menus={menus}
              depth={2}
              openAll={openAll}
              onOpenStateAll={(e) => handleOpenStateAll(e as boolean)}
              isMockData={true} // 목데이터 사용 여부 전달
            />
          )}
        </div>
        {/* lnb toggle button */}
        <Button
          className={styles.btn_toggle}
          onlyIcon
          aria-expanded={toggleLnb}
          onClick={handleToggleLnb}
        >
          <IcoArrowBackward width={20} height={20} stroke="#131C30" />
        </Button>
      </div>
    </>
  );
}

export const LNB = memo(LNBComponent);
