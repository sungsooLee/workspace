import { Link } from '@tanstack/react-router';
import { memo } from 'react';
import { useTranslation } from 'react-i18next';
import { GnbPopupM } from '../../../../../features/layout';

import styles from '@learnway/styles/fo/widgets/layout/m.ui/main/footer/footer.module.css';

import { IcoDotpoints, IcoEye, IcoHome03, IcoMybook, IcoSearch } from '@learnway/icons';
import { Button } from '@learnway/ui/button';
import { useModal } from '@learnway/ui/modal';

function FooterComponent() {
  const { t } = useTranslation();
  const { openModal } = useModal();

  return (
    <div className={`${styles.start} ${styles.footer_fixed}`}>
      <div className={styles.fixed_menu}>
        <ul className={styles.menu_list}>
          <li>
            <Link to={'/'}>
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
          <li>
            <Button
              onClick={() =>
                openModal({
                  width: 'm_bottom_sheet',
                  content: <GnbPopupM />,
                })
              }
            >
              <IcoEye width={24} height={24} stroke="#131C30" />
              <span>더보기</span>
            </Button>
          </li>
        </ul>
      </div>
    </div>
  );
}

export const MobileFooter = memo(FooterComponent);
