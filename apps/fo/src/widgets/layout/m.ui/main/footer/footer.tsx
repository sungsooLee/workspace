import { memo } from 'react';
import { useTranslation } from 'react-i18next';
import { Link } from '@tanstack/react-router';

import { cn } from '@learnway/shared';

import { Language } from '../../../../../features/platform';
import { Button, useModal, useSearchStore } from '@learnway/ui';
import { IcoHome03, IcoDotpoints, IcoSearch, IcoMybook, IcoEye, IcoArray } from '@learnway/icons';

import styles from '@learnway/styles/fo/widgets/layout/m.ui/main/footer/footer.module.css';
import { CategoryPopup } from '@features/layout';

function FooterComponent() {
  const { t } = useTranslation();
  const { openModal } = useModal();
  const openSearch = useSearchStore((state) => state.openSearch);

  const handleSearchClick = () => {
    openSearch();
  };

  const handleCategoryPopup = () => {
    openModal({
      width: 'm_full',
      content: <CategoryPopup />,
    })
  }

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
            <Button onClick={handleCategoryPopup}>
              <IcoArray width={24} height={24} stroke="#131C30"  fill="none"/>
              <span>학습테마</span>
            </Button>
          </li>
          <li>
            <Button onClick={handleSearchClick}>
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

export const MobileFooter = memo(FooterComponent);
