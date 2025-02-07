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
          {/*<Link
              to={''}
              onClick={() => setActiveMenu(item)}
              className={`${activeMenu === item ? styles.active : ''}`}>
              {idx === 0 && <IcoHome03 width={16} height={16} stroke="#6F798B" />}

              {idx !== menuItems.length - 1 && (
                <>
                  <IcoArrowForward width={12} height={12} stroke="#131C30" />
                  {item}
                </>
              )}
            </Link>*/}
          <Popover
            popoverContent={<PopoverContent1 />}
            className={styles.btn_menu}
            side="bottom"
            align="start"
            sideOffset={10}>
            <span className={styles.select}>{'서비스1'}</span>
            <IcoArrowDown width={16} height={16} stroke="#131C30" />
            <IcoArrowForward width={12} height={12} stroke="#131C30" />
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
            <IcoArrowDown width={16} height={16} stroke="#131C30" />
            <IcoArrowForward width={12} height={12} stroke="#131C30" />
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
            <IcoArrowDown width={16} height={16} stroke="#131C30" />
          </Popover>
        </li>
      </ul>
    </div>
  );
}

export const Breadcrumbs = memo(BreadcrumbsComponent);
