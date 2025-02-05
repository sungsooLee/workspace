import { memo } from 'react';

import { Menu } from '../../../../../types';
import { useActiveMenuDepthState } from '../../../../../features/layout';

import styles from './breadcrumbs.module.css';
import { Link } from '@tanstack/react-router';
import { IcoHome03, IcoArrowForward } from '@learnway/icons';

function BreadcrumbsComponent() {
  const [activeMenuDepth] = useActiveMenuDepthState();
  if (!activeMenuDepth?.[0]) {
    return <></>;
  }

  return (
    <div className={styles.start}>
      <ul className={styles.breadcrumbs}>
        {activeMenuDepth &&
          activeMenuDepth.map((menu: Menu, idx) => (
            <li key={menu.key} className={styles.link_item}>
              {/* {menu.title} */}
              <Link to={'/'}>
                {idx === 0 && <IcoHome03 width={16} height={16} stroke="#6F798B" />}

                {idx !== activeMenuDepth.length - 1 && (
                  <>
                    <IcoArrowForward width={12} height={12} stroke="#131C30" />
                    {menu.title}
                  </>
                )}
              </Link>
            </li>
          ))}
      </ul>
    </div>
    // <div className={styles.start}>
    //   <ul className={styles.breadcrumbs}>
    //     {activeMenuDepth &&
    //       activeMenuDepth.map((item, idx) => (
    //         <li key={item.key} className={styles.link_item}>
    //           <Link
    //             to={'/'}
    //             // onClick={() => setActiveMenu(item)}
    //             className={`${activeMenu === item ? styles.active : ''}`}>
    //             {idx === 0 && <IcoHome03 width={16} height={16} stroke="#6F798B" />}

    //             {idx !== activeMenuDepth.length - 1 && (
    //               <IcoArrowForward width={12} height={12} stroke="#131C30" />
    //             )}
    //           </Link>
    //         </li>
    //       ))}
    //   </ul>
    // </div>
  );
}

export const Breadcrumbs = memo(BreadcrumbsComponent);
