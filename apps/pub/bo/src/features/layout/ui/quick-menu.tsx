import { memo } from 'react';
import { Link } from '@tanstack/react-router';

import { MyMenu } from './my-menu';

import styles from './quick-menu.module.css';

function QuickMenuComponent() {
  return (
    <div className={`${styles.start} nlp--quick-menu`}>
      <div className={styles.menu_wrap}>
        <ul className={styles.menu_list}>
          <li>
            <Link to={'/'}>마켓플레이스</Link>
          </li>
          <li>
            <Link to={'/'}>업무지원</Link>
          </li>
        </ul>
        <MyMenu />
      </div>
    </div>
  );
}

export const QuickMenu = memo(QuickMenuComponent);
