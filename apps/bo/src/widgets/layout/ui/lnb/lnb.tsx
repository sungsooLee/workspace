import { memo, useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useCreation, useDeepCompareEffect } from 'ahooks';

import { cn } from '@learnway/shared';
import { SidebarContent, SidebarGroup, SidebarGroupLabel, SidebarGroupContent } from '@learnway/ui';
import { IcoArrowDown } from '@learnway/icons';

import { useActiveMenuDepthState } from '../../../../features/layout';

import { AccordionMenu } from './accordion-menu/accordion-menu';

import styles from './lnb.module.css';

function LNBComponent() {
  const { t } = useTranslation();

  const [activeMenuDepth] = useActiveMenuDepthState();

  const [menus, setMenus] = useState<any>(activeMenuDepth?.[0]?.children);
  const [openAll, setOpenAll] = useState<boolean | undefined>(undefined);
  const [openAllButtonState, setOpenAllButtonState] = useState<boolean>(false); // LNB 최상단 타이틀 active

  const buttonClass = `${openAllButtonState ? styles.active : styles.inactive}`;

  useEffect(() => {
    setOpenAll(false);
    setOpenAllButtonState(false);
  }, [activeMenuDepth?.[0]?.title]);

  useEffect(() => {
    if (!activeMenuDepth?.[0]?.children) {
      return;
    }
    setMenus(activeMenuDepth?.[0]?.children);
  }, [activeMenuDepth?.[0]?.children]);

  if (!activeMenuDepth?.[0]) {
    return <></>;
  }

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

  return (
    <div className={cn(styles.start, 'nlp--lnb')}>
      <div className={styles.lnb_wrap}>
        <h2 className={styles.lnb_title}>
          <button
            type="button"
            className={cn(styles.lnb_title_btn, buttonClass)}
            onClick={() => handleOpenAll()}>
            <span className={styles.lnb_title_text}>{activeMenuDepth[0].title}</span>
            <IcoArrowDown width={16} height={16} stroke="#131C30" />
          </button>
        </h2>
        {menus && (
          <AccordionMenu
            menus={menus}
            depth={2}
            className={styles._depth2}
            openAll={openAll}
            onOpenStateAll={(e) => handleOpenStateAll(e as boolean)}
          />
        )}
      </div>
    </div>
  );
}

export const LNB = memo(LNBComponent);
