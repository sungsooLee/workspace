import { memo, useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';

import { cn } from '@learnway/shared';
import { Button } from '@learnway/ui';
import { IcoArrowDown, IcoArrowBackward } from '@learnway/icons';

import { useActiveMenuDepthState } from '../../../../../features/platform';
import { AccordionMenu } from './accordion-menu/accordion-menu';

import styles from './lnb.module.css';

function LNBComponent() {
  const { t } = useTranslation();

  const [activeMenuDepth] = useActiveMenuDepthState();

  const [toggleLnb, setToggleLnb] = useState<boolean>(true);
  const [menus, setMenus] = useState<any>(activeMenuDepth?.[0]?.children);
  const [openAll, setOpenAll] = useState<boolean | undefined>(undefined);
  const [openAllButtonState, setOpenAllButtonState] = useState<boolean>(false); // LNB 최상단 타이틀 active

  const buttonClass = `${openAllButtonState ? styles.open : styles.close}`;

  useEffect(() => {
    setOpenAll(false);
    setOpenAllButtonState(false);
  }, [activeMenuDepth?.[0]?.menuName]);

  useEffect(() => {
    if (!activeMenuDepth?.[0]?.children) {
      return;
    }
    setMenus(activeMenuDepth?.[0]?.children);
  }, [activeMenuDepth?.[0]?.children]);

  // 25-02-13 Lnb 추가
  useEffect(() => {
    if (toggleLnb) {
      document.body.classList.add('lnb-open');
    } else {
      document.body.classList.remove('lnb-open');
    }

    return () => {
      document.body.classList.remove('lnb-open');
    };
  }, [toggleLnb]);

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

  const handleToggleLnb = () => {
    setToggleLnb((prev) => !prev);
  };

  return (
    <div className={`${styles.start} nlp--lnb ${toggleLnb ? `${styles.open}` : `${styles.close}`}`}>
      <div className={styles.lnb_wrap}>
        <h2 className={styles.lnb_title}>
          <Button
            type="button"
            className={cn(styles.lnb_title_btn, buttonClass)}
            onClick={() => handleOpenAll()}
          >
            <span className={styles.lnb_title_text}>{activeMenuDepth[0].menuName}</span>
            <IcoArrowDown width={16} height={16} stroke="#131C30" />
          </Button>
        </h2>
        {menus && (
          <AccordionMenu
            menus={menus}
            depth={2}
            openAll={openAll}
            onOpenStateAll={(e) => handleOpenStateAll(e as boolean)}
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
  );
}

export const LNB = memo(LNBComponent);
