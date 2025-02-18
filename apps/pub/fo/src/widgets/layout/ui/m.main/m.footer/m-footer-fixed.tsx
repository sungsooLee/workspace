import { memo } from 'react';
import { Link } from '@tanstack/react-router';
import { useTranslation } from 'react-i18next';
import { Button } from '@learnway/ui';
import styles from './m-footer-fixed.module.css';
import { IcoHome03, IcoDotpoints, IcoSearch, IcoMybook, IcoEye } from '@learnway/icons';

function MFooterFixedComponent() {
  return (
    <div className={`${styles.start} ${styles.m_footer_fixed}`}>
      <div className={styles.fixed_menu}>
        <ul className={styles.menu_list}>
          <li>
            <Link to={''}>
              <IcoHome03 width={24} height={24} stroke="#131C30" />
              <span>홈</span>
            </Link>
          </li>
          <li>
            <Button>
              <IcoDotpoints width={24} height={24} stroke="#131C30" />
              <span>카테고리</span>
            </Button>
          </li>
          <li>
            <Button>
              <IcoSearch width={24} height={24} stroke="#131C30" />
              <span>검색</span>
            </Button>
          </li>
          <li>
            <Button>
              <IcoMybook width={24} height={24} stroke="#131C30" />
              <span>학습현황</span>
            </Button>
          </li>
          <li>
            <Button>
              <IcoEye width={24} height={24} stroke="#131C30" />
              <span>채널</span>
            </Button>
          </li>
        </ul>
      </div>
    </div>
  );
}

export const MFooterFixed = memo(MFooterFixedComponent);
