import { memo } from 'react';
import { Link } from '@tanstack/react-router';
import styles from './navigate.module.css';

function NavigateComponent() {
  return (
    <div className={`${styles.start} ${styles.navigate}`}>
      <nav className={styles.nav}>
        <ul>
          <li>
            <Link to={'/'}>교육제도</Link>
          </li>
          <li>
            <Link to={'/'}>학습계획</Link>
          </li>
          <li>
            <Link to={'/'}>채널</Link>
          </li>
          <li>
            <Link to={'/'}>HMCP</Link>
          </li>
          <li>
            <Link to={'/'}>나의학습</Link>
          </li>
          <li>
            <Link to={'/'}>커뮤니티</Link>
          </li>
          <li>
            <Link to={'/'}>교육지원</Link>
          </li>
          <li>
            <Link to={'/'}>팀학습현황</Link>
          </li>
        </ul>
      </nav>
    </div>
  );
}

export const Navigate = memo(NavigateComponent);
