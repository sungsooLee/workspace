import { Link } from '@tanstack/react-router';
import { memo, useMemo } from 'react';
import { useTranslation } from 'react-i18next';

import { useFetchAuthUser, useMenuHierarchy } from '@learnway/auth/entities';

import { Menu } from '@learnway/auth/types';
import { IcoChart, IcoDocument, IcoPoint } from '@learnway/icons';
import styles from '@learnway/styles/fo/features/layout/m.ui/navigate-button/navigate-modal.module.css';
import { Avatar } from '@learnway/ui/avatar';
import { Button } from '@learnway/ui/button';
import { ModalBody, ModalContainer, ModalTitle, useModal } from '@learnway/ui/modal';

const NavigateModalComponent = () => {
  const { t } = useTranslation();
  const { alert } = useModal();

  const { data: authUser } = useFetchAuthUser();
  const { data: menuData } = useMenuHierarchy('FO');

  // 히든메뉴 필터링
  function filterVisibleItems(items: Menu[]) {
    return items
      .filter((item) => !item.isHiddenMenu)
      .map((item) => {
        const children: Menu[] = item.children ? filterVisibleItems(item.children) : [];
        return { ...item, children };
      });
  }

  const mobileMenu: Menu[] = useMemo(() => {
    if (!menuData?.menus) return [];
    const menus = filterVisibleItems(menuData.menus);
    return menus;
  }, [menuData.menus]);

  return (
    <ModalContainer>
      <ModalTitle> </ModalTitle>
      <ModalBody>
        <div className={styles.start}>
          <div className={styles.profile_info}>
            <div className={styles.avatar_img}>
              {/* 이미지일경우 */}
              <Avatar imageUrl="https://github.com/shadcn.png" size="2xl" />
              {/* 텍스트일경우 */}
              {/* <Avatar fallback="AB" size="2xl" /> */}
            </div>
            <div className={styles.profile}>
              <div className={styles.info_box}>
                <span className={styles.name}>{authUser?.name}</span>
                <Button size="sm" underline={true} label={t('개인정보변경')} />
              </div>
              <div className={styles.tenant}>
                <span>{authUser?.company?.name}</span>
                <span>직군/직무</span>
              </div>
            </div>
          </div>

          <div className={styles.point_box}>
            <IcoPoint className={styles.ico} />
            <span className={styles.txt}>{t('나의 포인트')}</span>
            <span className={styles.point}>
              <em>243</em>P
            </span>
          </div>
          {/* 이벤트 메뉴 */}
          <div className={styles.recent_visits}>
            <ul className={styles.list}>
              <li>
                <Button className={styles.btn} onClick={() => alert('준비중 입니다.')}>
                  <span className={styles.ico}>
                    <IcoDocument />
                  </span>
                  <span className={styles.txt}>Hi-Sence</span>
                </Button>
              </li>
              <li>
                <Button className={styles.btn} onClick={() => alert('준비중 입니다.')}>
                  <span className={styles.ico}>
                    <IcoChart />
                  </span>
                  <span className={styles.txt}>법정교육필수</span>
                </Button>
              </li>
            </ul>
          </div>
          {/* 전체 메뉴 */}

          <ul className={styles.gnb}>
            {mobileMenu?.map((menu, index) => (
              <li key={`mo_${menu.menuId}_${index}`}>
                <div className={styles.gnb_title}>
                  <strong>{`LEARNER_MENU.${menu.menuCode}`}</strong>
                </div>

                {menu.children && (
                  <ul className={styles.gnb_list}>
                    {menu.children?.map((child, childIndex) => (
                      <li key={`mo_child_${child.menuId}_${childIndex}`}>
                        <Link to={child.path}>{`LEARNER_MENU.${child.menuCode}`}</Link>
                      </li>
                    ))}
                  </ul>
                )}
              </li>
            ))}
          </ul>
        </div>
        {/* AS-IS */}
        {/* <div className={styles.start}>
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
                      <Link to={'/'}>
                        {t(`MENU.${menu.menuCode}`)}
                      </Link>
                    </li>
                  ),
                )}
              </ul>
            </li>
            {menu.menus.map((menu) => (
              <li>
                <div className={styles.gnb_title}>
                  <strong>{t(`MENU.${menu.menuCode}`)}</strong>
                </div>
                {menu?.children && menu?.children?.length > 0 && (
                  <ul className={styles.gnb_list}>
                    {(menu?.children as Menu[]).map((subMenu) => (
                      <li>
                        <Link to={subMenu.path}>{t(`MENU.${subMenu.menuCode}`)}</Link>
                      </li>
                    ))}
                  </ul>
                )}
              </li>
            ))}
          </ul>
        </div> */}
      </ModalBody>
    </ModalContainer>
  );
};

// TODO 직군/직무, 각종 링크, 포인트, 이벤트 메뉴 확인필요
/**
 * @description MO GNB 전체메뉴 NLP_FO_GNB_M_1002
 */
export const MobileNavigateModal = memo(NavigateModalComponent);
