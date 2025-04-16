import { memo, useState } from 'react';
import { isMobile } from 'react-device-detect';
import { useTranslation } from 'react-i18next';
import { Link } from '@tanstack/react-router';

import { Button, ModalBody, ModalContainer, ModalTitle, useModal } from '@learnway/ui';

import { useFetchAuthUser } from '@learnway/auth';

import { useMenuHierarchy } from '../../../../entities/menu';

import { UserAvatar } from '../../ui/user-avatar/user-avatar';
import styles from '@learnway/styles/fo/features/layout/m.ui/navigate-button/navigate-modal.module.css';

const NavigateModalComponent = () => {
  const { t } = useTranslation();

  const { data: menu } = useMenuHierarchy();
  const { data: authUser } = useFetchAuthUser();

  const [tip, setTip] = useState<number | null>(null);

  const { open: openModal, confirm } = useModal();

  return (
    <ModalContainer>
      <ModalTitle> </ModalTitle>
      <ModalBody>
        <div className={styles.start}>
          <div className={styles.profile_info}>
            <div className={styles.profile}>
              <span className={styles.name}>{authUser?.name}</span>
              <span className={styles.tenant}>{authUser?.activeTenant?.tenantName}</span>
              <span className={styles.team}>팀명</span>
              <Button
                className={styles.link}
                onClick={() =>
                  openModal({
                    width: 'm_full',
                    content: <div />, //PasswordVerifyPopup
                  })
                }
              >
                개인정보변경
              </Button>
            </div>
            <div className={styles.avata_img}>
              <span className={styles.info_avata}>
                <em className={styles.text}>{'김'}</em>
              </span>
              <UserAvatar className={styles.info_avata} />
            </div>
          </div>
          <ul className={styles.gnb}>
            <li>
              <ul className={styles.gnb_list}>
                {menu.eventMenus.map(
                  (
                    menu,
                    index, //event menu
                  ) => (
                    <li>
                      <Link to={''}>
                        {/*<IcoReview width={20} height={20} stroke="#131c30"></IcoReview>*/}
                        {menu.menuName}
                      </Link>
                    </li>
                  ),
                )}
              </ul>
            </li>
            {menu.menus.map((menu) => (
              <li>
                <div className={styles.gnb_title}>
                  <strong>{menu.menuName}</strong>
                </div>
                {menu?.children && menu?.children?.length > 0 && (
                  <ul className={styles.gnb_list}>
                    {menu?.children.map((subMenu) => (
                      <li>
                        <Link to={subMenu.path}>{subMenu.menuName}</Link>
                      </li>
                    ))}
                  </ul>
                )}
              </li>
            ))}
          </ul>
        </div>
      </ModalBody>
    </ModalContainer>
  );
};

export const MobileNavigateModal = memo(NavigateModalComponent);
