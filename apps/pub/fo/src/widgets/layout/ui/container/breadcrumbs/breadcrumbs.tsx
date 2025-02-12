import { memo, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Link } from '@tanstack/react-router';
import { IcoArrowDown, IcoArrowForward } from '@learnway/icons';
import { Popover } from '@learnway/ui';
import styles from './breadcrumbs.module.css';

const PopoverContent1 = () => {
  return (
    <div className={`${styles.start} ${styles.hover_menu}`}>
      <ul className={styles.menu_list}>
        <li>
          <Link to={''} className={styles.active}>
            {/* 선택시 active */}
            전기/전차 부품
          </Link>
        </li>
        <li>
          <Link to={''}>서브메뉴1</Link>
        </li>
        <li>
          <Link to={''}>서브메뉴1</Link>
        </li>
        <li>
          <Link to={''}>서브메뉴1</Link>
        </li>
        <li>
          <Link to={''}>서브메뉴1</Link>
        </li>
        <li>
          <Link to={''}>서브메뉴1</Link>
        </li>
        <li>
          <Link to={''}>서브메뉴1</Link>
        </li>
      </ul>
    </div>
  );
};

const PopoverContent2 = () => {
  return (
    <div className={`${styles.start} ${styles.hover_menu}`}>
      <ul className={styles.menu_list}>
        <li>
          <Link to={''}>서브메뉴2</Link>
        </li>
      </ul>
    </div>
  );
};

const PopoverContent3 = () => {
  return (
    <div className={`${styles.start} ${styles.hover_menu}`}>
      <ul className={styles.menu_list}>
        <li>
          <Link to={''}>서브메뉴3</Link>
        </li>
      </ul>
    </div>
  );
};

function BreadcrumbsComponent() {
  const { t } = useTranslation();
  return (
    <div className={styles.start}>
      <ul className={styles.breadcrumbs}>
        <li className={styles.link_item}>
          <Popover
            popoverContent={<PopoverContent1 />}
            className={styles.btn_menu}
            side="bottom"
            align="start"
            sideOffset={10}>
            <span className={styles.select}>{'서비스1'}</span>
            <i className={styles.stats}>
              <IcoArrowDown width={16} height={16} stroke="#6F798B" />
            </i>
            <IcoArrowForward width={12} height={12} stroke="#6F798B" className={styles.arw} />
          </Popover>
        </li>

        <li className={styles.link_item}>
          <Popover
            popoverContent={<PopoverContent2 />}
            className={styles.btn_menu}
            side="bottom"
            align="start"
            sideOffset={10}>
            <span className={styles.select}>{'서비스2'}</span>
            <i className={styles.stats}>
              <IcoArrowDown width={16} height={16} stroke="#6F798B" />
            </i>
            <IcoArrowForward width={12} height={12} stroke="#6F798B" className={styles.arw} />
          </Popover>
        </li>

        <li className={styles.link_item}>
          <Popover
            popoverContent={<PopoverContent3 />}
            className={styles.btn_menu}
            side="bottom"
            align="start"
            sideOffset={10}>
            <span className={styles.select}>{'서비스3'}</span>
            <i className={styles.stats}>
              <IcoArrowDown width={16} height={16} stroke="#6F798B" />
            </i>
          </Popover>
        </li>
      </ul>
    </div>
  );
}

export const Breadcrumbs = memo(BreadcrumbsComponent);
