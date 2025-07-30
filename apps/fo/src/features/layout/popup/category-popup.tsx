import React, { memo, useEffect, useState } from 'react';
import { Link } from '@tanstack/react-router';
import { Carousel } from '@learnway/ui';
import { cn } from '@learnway/shared';
import { Button, Chip, ModalBody, ModalContainer, ModalTitle } from '@learnway/ui';
import { Navigation } from 'swiper/modules';

import { IcoArrowBackward, IcoArrowForward, IcoArrowUp } from '@learnway/icons';

import { t } from 'i18next';

import styles from '@learnway/styles/fo/features/layout/popup/category-popup.module.css';
import { useCategoryTree } from '@entities/category';

interface CategoryPopupProps {
  activeTenantId: number;
}

type MainItem = { id: number; label: string; isChild: boolean };
type SubItem = { id: number; label: string; parentId: number; link: string; };
type MenuItem = { id: number; label: string; parentId: number; link: string; subItems?: SubItem[]; };

const CategoryPopupComponent = ({ activeTenantId }: CategoryPopupProps) => {
  // 하단 카테고리 이동 내역
  const items = [
    <Chip option={{ label: '기업경영', value: 'a' }} />,
    <Chip option={{ label: 'Ai교육', value: 'b' }} />,
    <Chip option={{ label: 'IT', value: 'c' }} />,
    <Chip option={{ label: '마케팅', value: 'd' }} />,
    <Chip option={{ label: '경영/기획', value: 'e' }} />,
  ];

  const [mainData, setMainData] = useState<MainItem[]>([]);
  const [menuData, setMenuData] = useState<MenuItem[]>([]);

  const [activeId, setActiveId] = useState<number>();
  const [tenantId, setTenantId] = useState<number>(activeTenantId);

  const [firstMenuWithSub, setFirstMenuWithSub] = useState(
    menuData.find((item) => item.subItems)?.id ?? null
  );
  const [openId, setOpenId] = useState<number | null>(firstMenuWithSub);

  const { data: categoryTree, refetch: categoryRefetch} = useCategoryTree(tenantId);

  const menuHandleClick = (id: number, isChild: boolean) => {
    setActiveId(id);
    if( isChild ) {
      // 2 Depth
      const subTreeData = categoryTree.children.filter( (item: any) => item.id === id)[0];
      const menuData = subTreeData.children.map( (item: any) => {
        const children: SubItem[] = [];
        if( item.children && item.children.length > 0 ) {
          item.children.forEach( (child: any) => {
            children.push(
              {
                id: child.id,
                label: child.name,
                parentId: item.id,
                link: ''
              }
            )
          })
        }
        return {
          id: item.id,
          label: item.name,
          parentId: subTreeData.id,
          link: item.children.length > 0 ? null : '',
          subItems: children
        }
      });
      setMenuData(menuData);
    } else {
      setMenuData([]);
    }
  };

  const handleClick = (id: number, hasSub: boolean) => {
    if (!hasSub) return;
    setOpenId((prev) => (prev === id ? null : id));
  };

  useEffect(() => {
    if( categoryTree ) {
      console.log('### categoryTreeData => ', categoryTree);
      const mainTreeData: any[] = categoryTree.children;
      // 1 Depth
      const oneDepthData = mainTreeData.map(item => {
        return {
          id: item.id,
          label: item.name,
          isChild: item.children.length > 0 ? true : false,
        }
      })
      setMainData(oneDepthData);
    }
  }, [categoryTree]);

  useEffect(() => {
    if( menuData ) {
      setFirstMenuWithSub(menuData.find((item) => item.subItems)?.id ?? null)
    }
  }, [menuData])

  return (
    <ModalContainer>
      <ModalTitle>{t('학습테마')}</ModalTitle>
      <ModalBody>
        <div className={styles.start}>
          {/* 카테고리 영역 */}
          <div className={styles.category_wrap}>
            {/* 카테고리 영역 - 좌측메뉴 */}
            <div className={styles.menu_list_wrap}>
              <div className={styles.scroll_box}>
                <ul className={styles.menu_list}>
                  {mainData.map((item) => (
                    <li key={item.id}>
                      <Button
                        className={activeId === item.id ? styles.active : ''}
                        label={item.label}
                        icon={
                          (activeId === item.id && item.isChild) && (
                            <IcoArrowForward
                              className={styles.ico_arrow}
                              width={16}
                              height={16}
                              stroke="#07287E"
                            />
                          )
                        }
                        onClick={() => menuHandleClick(item.id, item.isChild)}
                      />
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            {/* 카테고리 영역 - 뎁스영역 */}
            <div className={styles.category_inner}>
              <div className={styles.scroll_box}>
                <div className={styles.depth_area}>
                  {menuData.map(({ id, label, subItems, link }) => (
                    <div key={id} className={styles.menu_item}>
                      <div
                        className={cn(
                          styles.menu_title,
                          subItems && openId === id ? styles.active : '',
                        )}
                      >
                        <Link to={link}>{label}</Link>
                        {(subItems && subItems.length > 0) && (
                          <Button
                            className={styles.btn_cate}
                            onClick={() => handleClick(id, !!subItems)}
                            icon={<IcoArrowUp />}
                          />
                        )}
                      </div>

                      {subItems && openId === id && (
                        <div className={styles.sub_menu}>
                          {subItems.map((sub) => (
                            <div key={sub.id} className={styles.sub_menu_item}>
                              <Link to={sub.link}>{sub.label}</Link>
                            </div>
                          ))}
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
          {items.length > 0 && (
            <div className={styles.swiper}>
              <Carousel
                items={items}
                slidesPerView={'auto'}
                className={styles.category_carousel}
                spaceBetween={8}
                modules={[Navigation]}
                showNavigation={true}
                prevIcon={<IcoArrowBackward />}
                nextIcon={<IcoArrowForward />}
              />
            </div>
          )}
        </div>
      </ModalBody>
    </ModalContainer>
  );
};

export const CategoryPopup = memo(CategoryPopupComponent);
