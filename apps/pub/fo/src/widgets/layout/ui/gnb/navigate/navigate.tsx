import { memo } from 'react';
import { Link } from '@tanstack/react-router';
import styles from './navigate.module.css';

function NavigateComponent() {
  return (
    <div className={`${styles.start} nlp--navigate`}>
      <nav className={styles.nav}>
        <ul>
          <li>
            <Link to={'/'}>대시보드</Link>
          </li>
          <li>
            <Link to={'/'}>채널관리</Link>
          </li>
          <li>
            <Link to={'/'}>교육운영</Link>
          </li>
          <li>
            <Link to={'/'}>교육자원</Link>
          </li>
          <li>
            <Link to={'/'}>교육제도</Link>
          </li>
          <li>
            <Link to={'/'}>교육통계</Link>
          </li>
          <li>
            <Link to={'/'}>고객사운영</Link>
          </li>
          <li>
            <Link to={'/'}>플랫폼관리</Link>
          </li>
        </ul>
      </nav>
    </div>
  );
}

export const Navigate = memo(NavigateComponent);
