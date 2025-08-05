import { useRouter } from '@tanstack/react-router';
import { FunctionComponent, memo, SVGProps, useMemo } from 'react';
import { useTranslation } from 'react-i18next';

import { useFetchAuthUser } from '@learnway/auth/entities';
import {
  IcoFooter01,
  IcoFooter02,
  IcoFooter03,
  IcoFooter04,
  IcoFooter05,
  IcoFooterOn01,
  IcoFooterOn02,
  IcoFooterOn03,
  IcoFooterOn04,
  IcoFooterOn05,
} from '@learnway/icons';
import { cn } from '@learnway/shared';
import styles from '@learnway/styles/fo/widgets/layout/m.ui/main/footer/footer.module.css';
import { Button } from '@learnway/ui/button';
import { useModal } from '@learnway/ui/modal';
import { useSearchStore } from '@learnway/ui/stores';

import { CategoryPopup } from '@features/layout';
import { MoreButtonModal } from '@widgets/layout/m.ui/main/more-button-modal';

interface MobileFooterBtn {
  title: string;
  link: string;
  action: () => void;
  active: boolean;
  iconOn: FunctionComponent<SVGProps<SVGSVGElement>>;
  iconOff: FunctionComponent<SVGProps<SVGSVGElement>>;
}

function FooterComponent() {
  const router = useRouter();

  const { t } = useTranslation();
  const { openModal, alert } = useModal();

  const { data: authUser } = useFetchAuthUser();
  const openSearch = useSearchStore((state) => state.openSearch);

  const handleSearchClick = () => {
    openSearch();
  };

  const handleCategoryPopup = () => {
    openModal({
      width: 'm_bottom_sheet',
      content: <CategoryPopup activeTenantId={authUser!.activeTenant!.tenantId} />,
    });
  };

  const mobileFooterBtns: MobileFooterBtn[] = [
    {
      title: t('홈'),
      link: '/',
      action: () => router.navigate({ to: '/' }),
      active: false,
      iconOn: IcoFooterOn01,
      iconOff: IcoFooter01,
    },
    {
      title: t('학습테마'),
      link: '/category',
      action: () => handleCategoryPopup(),
      active: false,
      iconOn: IcoFooterOn02,
      iconOff: IcoFooter02,
    },
    {
      title: t('학습현황'),
      link: '/user',
      action: () => {
        alert('준비중 입니다.');
      },
      active: false,
      iconOn: IcoFooterOn03,
      iconOff: IcoFooter03,
    },
    {
      title: t('검색'),
      link: '/search',
      action: () => handleSearchClick(),
      active: false,
      iconOn: IcoFooterOn04,
      iconOff: IcoFooter04,
    },
    {
      title: t('더보기'),
      link: '/more',
      action: () =>
        openModal({
          width: 'm_bottom_sheet',
          content: <MoreButtonModal />,
        }),
      active: false,
      iconOn: IcoFooterOn05,
      iconOff: IcoFooter05,
    },
  ];

  const bottomBtns = useMemo(() => {
    return mobileFooterBtns.map((btn) => ({
      ...btn,
      active: router.state.location.pathname === btn.link,
    }));
  }, [router.state.location.pathname]);

  return (
    <div className={`${styles.start} ${styles.footer_fixed}`}>
      <div className={styles.fixed_menu}>
        <ul className={styles.menu_list}>
          {bottomBtns.map((btn, i) => {
            const Icon = btn.active ? btn.iconOn : btn.iconOff;
            return (
              <li key={`mo_footer_${i}`} className={cn(btn.active && styles.active)}>
                <Button onClick={btn.action}>
                  <Icon width={24} height={24} />
                  <span>{btn.title}</span>
                </Button>
              </li>
            );
          })}
        </ul>
      </div>
    </div>
  );
}

/**
 * @description MO M_TOP/Bottom 프래임 Bottom NLP_FO_GNB_MA_1000
 */
export const MobileFooter = memo(FooterComponent);
