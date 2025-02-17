import { memo } from 'react';
import { Link } from '@tanstack/react-router';
import { useTranslation } from 'react-i18next';
import { Button } from '@learnway/ui';
import styles from './m-footer-fixed.module.css';

function MFooterFixedComponent() {
  return (
    <div className={`${styles.start} ${styles.m_footer_fixed}`}>
      <div className={styles.fixed_menu}>
        <ul>
          <li>
            <Link to={''}>홈</Link>
          </li>
          <li>
            <Button>카테고리</Button>
          </li>
          <li>
            <Button>검색</Button>
          </li>
          <li>
            <Button>학습현황</Button>
          </li>
          <li>
            <Button>채널</Button>
          </li>
        </ul>
      </div>
    </div>
  );
}

export const MFooterFixed = memo(MFooterFixedComponent);
