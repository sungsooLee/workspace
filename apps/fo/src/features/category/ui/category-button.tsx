import { useRouter } from '@tanstack/react-router';
import { useEffect, useState } from 'react';

import { IcoArray, IcoArrowForward } from '@learnway/icons';

import { useCategoryTree, useCreateRecentCategory } from '@entities/category';
import { RecentVisits } from '@features/layout';
import { cn, SelectOption } from '@learnway/shared';
import styles from '@learnway/styles/fo/features/category/category-button.module.css';
import { Button } from '@learnway/ui/button';
import { ModalBody, ModalContainer, ModalTitle, useModal } from '@learnway/ui/modal';
import { t } from 'i18next';

interface CategoryPopupProps {
  id: number;
  onNavigate: (categoryId: number) => void;
}

type MainItem = { id: number; label: string; isChild: boolean };
type SubItem = { id: number; label: string; parentId: number; isChild: boolean };
type ChildItem = { id: number; label: string };

const PopupContent: React.FC<CategoryPopupProps> = ({ id, onNavigate }) => {
  const [mainData, setMainData] = useState<MainItem[]>([]);
  const [subData, setSubData] = useState<SubItem[]>([]);
  const [childData, setChildData] = useState<ChildItem[]>([]);
  const [recentCategory, setRecentCategory] = useState<SelectOption[]>([]);

  const [activeId, setActiveId] = useState<number>();
  const [activeSubId, setActiveSubId] = useState<number>();
  const [activeChildId, setActiveChildId] = useState<number>();
  const [tenantId, setTenantId] = useState<number>(id);

  const { data: categoryTree, refetch: categoryRefetch } = useCategoryTree(tenantId);

  const menuHandleHover = (id: number, isChild: boolean) => {
    setActiveId(id);
    setChildData([]);
    if (isChild) {
      // 2 Depth
      const subTreeData = categoryTree?.tree.children.filter((item: any) => item.id === id)[0];
      const twoDepthData = subTreeData.children.map((item: any) => {
        return {
          id: item.id,
          label: item.name,
          parentId: subTreeData.id,
          isChild: item.children.length > 0 ? true : false,
        };
      });
      setSubData(twoDepthData);
    } else {
      setSubData([]);
    }
  };

  const subMenuHandleHover = (id: number, parentId: number, isChild: boolean) => {
    setActiveSubId(id);
    if (isChild) {
      // 3 Depth
      const subTreeData = categoryTree?.tree.children.filter((item: any) => item.id === parentId)[0];
      const twoDepthData = subTreeData.children.filter((item: any) => item.id === id)[0];
      const threeDepthData = twoDepthData.children.map((item: any) => {
        return {
          id: item.id,
          label: item.name,
        };
      });
      setChildData(threeDepthData);
    } else {
      setChildData([]);
    }
  };

  const childMenuHandleClick = (id: number) => {
    setActiveChildId(id);
    onNavigate(id);
  };

  useEffect(() => {
    if (categoryTree) {
      const mainTreeData: any[] = categoryTree?.tree.children;
      const recentCategory = categoryTree?.recent;
      // 1 Depth
      const oneDepthData = mainTreeData.map((item) => {
        return {
          id: item.id,
          label: item.name,
          isChild: item.children.length > 0 ? true : false,
        };
      });
      const recent = recentCategory.map((item: any) => {
        return {label: item.categoryName, value: item.categoryId}
      });

      setMainData(oneDepthData);
      setRecentCategory(recent);
    }
  }, [categoryTree]);

  return (
    <ModalContainer className={styles.modal_container}>
      <ModalTitle>{t('학습테마')}</ModalTitle>
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
                        icon={item.isChild && <IcoArrowForward className={styles.ico_arrow} />}
                        onClick={() => onNavigate(item.id)}
                        onMouseOver={() => menuHandleHover(item.id, item.isChild)}
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
                        icon={item.isChild && <IcoArrowForward className={styles.ico_arrow} />}
                        onClick={() => onNavigate(item.id)}
                        onMouseOver={() => subMenuHandleHover(item.id, item.parentId, item.isChild)}
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
          <RecentVisits items={recentCategory}/>
        </div>
      </ModalBody>
    </ModalContainer>
  );
};

export const CategoryButton = ({ tenantId }: { tenantId?: number }) => {
  const router = useRouter();
  const { openModal } = useModal();

  // useEffect(() => {
  //   return router.history.subscribe((navigation) => {
  //     onOpenChange(false);
  //   });
  // }, [router.history, onOpenChange]);

  const { create } = useCreateRecentCategory({
    onSuccess: async (data: any) => {
      router.navigate({
        to: '/category',
        replace: true,
        state: {
          ...router.state.location.state,
          tenantId,
          categoryId: data,
        },
      });
    }
  })

  const handlerSelectedCategoryClick = (categoryId: number) => {
    create({categoryId});
  };

  return (
    <div className={styles.start}>
      {tenantId && (
        <Button
          className={styles.btn_category}
          onlyIcon={true}
          icon={<IcoArray width={24} height={24} fill="#fff" stroke="#131416" />}
          onClick={() =>
            openModal({
              width: 'xl', // sm(600px), md(800px), lg(1024px), xl(1400px)
              content: <PopupContent id={tenantId} onNavigate={handlerSelectedCategoryClick} />,
            })
          }
        />
      )}
    </div>
  );
};
