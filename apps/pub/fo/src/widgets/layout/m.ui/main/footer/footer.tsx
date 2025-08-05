import { IcoFooter01, IcoFooter02, IcoFooter03, IcoFooter04, IcoFooterOn05 } from '@learnway/icons';
import { memo } from 'react';
import { useTranslation } from 'react-i18next';
import { CategoryPopup, GnbPopupM } from '../../../../../features/layout';

import styles from '@learnway/styles/fo/widgets/layout/m.ui/main/footer/footer.module.css';

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
            <Button>
              <IcoFooter01 width={24} height={24} />
              {/* <IcoFooterOn01 width={24} height={24} /> */}
              <span>홈</span>
            </Button>
          </li>
          <li>
            <Button
              onClick={() =>
                openModal({
                  width: 'm_full',
                  content: <CategoryPopup />,
                })
              }
            >
              <IcoFooter02 width={24} height={24} />
              {/* <IcoFooterOn02 width={24} height={24} /> */}
              <span>학습테마</span>
            </Button>
          </li>
          <li>
            <Button>
              <IcoFooter03 width={24} height={24} />
              {/* <IcoFooterOn03 width={24} height={24} /> */}
              <span>학습현황</span>
            </Button>
          </li>
          <li>
            <Button>
              <IcoFooter04 width={24} height={24} />
              {/* <IcoFooterOn04 width={24} height={24} /> */}
              <span>검색</span>
            </Button>
          </li>
          <li className={styles.active}>
            <Button
              onClick={() =>
                openModal({
                  width: 'm_bottom_sheet',
                  content: <GnbPopupM />,
                })
              }
            >
              {/* <IcoFooter05 width={24} height={24} /> */}
              <IcoFooterOn05 width={24} height={24} />
              <span>더보기</span>
            </Button>
          </li>
        </ul>
      </div>
    </div>
  );
}

export const MobileFooter = memo(FooterComponent);
