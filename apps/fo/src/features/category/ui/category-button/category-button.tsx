import { useEffect, useState } from 'react';
import { useRouter, useRouterState } from '@tanstack/react-router';

import { Button, ModalBody, ModalContainer, ModalTitle, Popover, useModal } from '@learnway/ui';
import { IcoArray, IcoArrowForward, IcoMenu02 } from '@learnway/icons';

import { CategoryNavigationPopover } from '../category-navigation-popover/category-navigation-popover';

import styles from '@learnway/styles/fo/features/category/category-button.module.css';
import { RecentVisits } from '@features/layout';
import { cn } from '@learnway/shared';
import { useFetchAuthUser } from '@learnway/auth/entities';
import { useCategoryTree } from '@entities/category';

interface CategoryPopupProps {
  isOpen: boolean;
}

type MainItem = { id: number; label: string };
type SubItem = { id: number; label: string };
type ChildItem = { id: number; label: string };

const mainData: MainItem[] = [
  { id: 1, label: '기업경영' },
  { id: 2, label: '리더십/비즈스킬' },
  { id: 3, label: '어학' },
  { id: 4, label: 'HR/총무' },
  { id: 5, label: '경영/기획' },
  { id: 6, label: '고객서비스' },
  { id: 7, label: '마케팅 및 세일즈' },
  { id: 8, label: '법무/보안' },
  { id: 9, label: '생산' },
  { id: 10, label: '서비스' },
  { id: 11, label: '연구개발' },
  { id: 12, label: '품질' },
  { id: 13, label: '안전' },
  { id: 14, label: '기타' },
];

const subData: SubItem[] = [
  { id: 1, label: '기업경영' },
  { id: 2, label: '리더십/비즈스킬' },
  { id: 3, label: '어학' },
  { id: 4, label: 'HR/총무' },
  { id: 5, label: '경영/기획' },
  { id: 6, label: '고객서비스' },
  { id: 7, label: '마케팅 및 세일즈' },
  { id: 8, label: '법무/보안' },
  { id: 9, label: '생산' },
  { id: 10, label: '서비스' },
  { id: 11, label: '연구개발' },
  { id: 12, label: '품질' },
  { id: 13, label: '안전' },
  { id: 14, label: '기타' },
];

const childData: ChildItem[] = [
  { id: 1, label: '기업경영' },
  { id: 2, label: '리더십/비즈스킬' },
  { id: 3, label: '어학' },
  { id: 4, label: 'HR/총무' },
  { id: 5, label: '경영/기획' },
  { id: 6, label: '고객서비스' },
  { id: 7, label: '마케팅 및 세일즈' },
  { id: 8, label: '법무/보안' },
  { id: 9, label: '생산' },
  { id: 10, label: '서비스' },
  { id: 11, label: '연구개발' },
  { id: 12, label: '품질' },
  { id: 13, label: '안전' },
  { id: 14, label: '기타' },
];

const PopupContent = () => {
  const [activeId, setActiveId] = useState<number>(mainData[0].id);
  const [activeSubId, setActiveSubId] = useState<number>();
  const [activeChildId, setActiveChildId] = useState<number>();
  const [tenantId, setTenantId] = useState<number>(0);

  const { data: loginUser } = useFetchAuthUser();
  // const { data: categoryTree} = useCategoryTree(tenantId);

  const menuHandleClick = (id: number) => {
    setActiveId(id);
  };

  const subMenuHandleClick = (id: number) => {
    setActiveSubId(id);
  };

  const childMenuHandleClick = (id: number) => {
    setActiveChildId(id);
  };

  useEffect(() => {
    if (!loginUser) return;

    if (loginUser.activeTenant) {
      setTenantId(loginUser.activeTenant.tenantId);
    }
  }, [loginUser]);

  return (
    <ModalContainer className={styles.modal_container}>
      <ModalTitle>{'학습테마'}</ModalTitle>
      <ModalBody>
        <div className={styles.start}>
          {/* 카테고리 영역 */}
          <div className={styles.category_wrap}>
            {/* 카테고리 영역 - 1depth */}
            <div className={styles.menu_list_wrap}>
              <div className={styles.scroll_wrap}>
                <ul className={styles.menu_list}>
                  {mainData.map((item) => (
                    <li key={item.id}>
                      <Button
                        className={activeId === item.id ? styles.active : ''}
                        label={item.label}
                        icon={
                          activeId === item.id && <IcoArrowForward className={styles.ico_arrow} />
                        }
                        onClick={() => menuHandleClick(item.id)}
                      />
                    </li>
                  ))}
                </ul>
              </div>
            </div>
            {/* 카테고리 영역 - 2depth */}
            <div className={styles.menu_list_wrap}>
              <div className={styles.scroll_wrap}>
                <ul className={cn(styles.menu_list, styles.depth2)}>
                  {subData.map((item) => (
                    <li key={item.id}>
                      <Button
                        className={activeSubId === item.id ? styles.active : ''}
                        label={item.label}
                        icon={
                          activeSubId === item.id && (
                            <IcoArrowForward className={styles.ico_arrow} />
                          )
                        }
                        onClick={() => subMenuHandleClick(item.id)}
                      />
                    </li>
                  ))}
                </ul>
              </div>
            </div>
            {/* 카테고리 영역 - 3depth */}
            <div className={styles.menu_list_wrap}>
              <div className={styles.scroll_wrap}>
                <ul className={cn(styles.menu_list, styles.depth3)}>
                  {childData.map((item) => (
                    <li key={item.id}>
                      <Button
                        className={activeChildId === item.id ? styles.active : ''}
                        label={item.label}
                        onClick={() => childMenuHandleClick(item.id)}
                      />
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
          {/* 최근방문 */}
          <RecentVisits />
        </div>
      </ModalBody>
    </ModalContainer>
  );
};

export const CategoryButton = () => {
  const router = useRouter();
  const { open: openModal } = useModal();

  // useEffect(() => {
  //   return router.history.subscribe((navigation) => {
  //     onOpenChange(false);
  //   });
  // }, [router.history, onOpenChange]);

  return (
    <div className={styles.start}>
      <Button
        className={styles.btn_category}
        onlyIcon={true}
        icon={<IcoArray width={24} height={24} fill="#fff" stroke="#131416" />}
        onClick={() =>
          openModal({
            width: 'xl', // sm(600px), md(800px), lg(1024px), xl(1400px)
            content: <PopupContent />,
          })
        }
      />
    </div>
  );
};
