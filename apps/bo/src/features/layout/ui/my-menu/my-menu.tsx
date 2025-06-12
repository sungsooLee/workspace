import { memo, useMemo, useState } from 'react';
import { useTranslation } from 'react-i18next';

import { ChipList, Popover, List, Button } from '@learnway/ui';
import { IcoStar, IcoStar02, IcoClock01 } from '@learnway/icons';
import {
  useActiveMenuDepthState,
  useAsycFetchMenus,
  useAsycFetchMenusForceRefatch,
  useFetchAuthUser,
  useLayoutStore,
  useUpdateUser,
} from '@learnway/auth';
import { cn } from '@learnway/shared';

import styles from './my-menu.module.css';
import {
  useDeleteMenuFavorites,
  useFetchMenuFavorites,
  useMoveMenuFavorites,
} from '@entities/menu';
import { useRouter } from '@tanstack/react-router';

const PopoverContent = () => {
  const { t } = useTranslation();
  const router = useRouter();

  const [_, setActiveMenuDepth] = useActiveMenuDepthState();
  const { data: authUser } = useFetchAuthUser();
  const { data: menuFavorites, refetch } = useFetchMenuFavorites({
    tenantId: authUser?.activeTenant?.tenantId,
    userNo: authUser?.userId,
  });

  const { updateMenu } = useUpdateUser();
  const { asyncMenus } = useAsycFetchMenusForceRefatch();
  const { deleteMenuFavorites } = useDeleteMenuFavorites();
  const { moveMenuFavorites } = useMoveMenuFavorites();

  const { menus, deleteMenus } = useLayoutStore((state) => state); // 최근본 메뉴

  // 최근본 메뉴
  const recentMenu = useMemo(() => {
    if (!menus) return [];
    return menus.map((menu, i) => ({
      index: i,
      label:
        import.meta.env.VITE_LANGUAGE_DEV === 'true'
          ? t(`${menu.menuName}`)
          : t(`MENU.${menu.menuCode}`),
      value: menu.menuId,
      path: menu.path,
    }));
  }, [menus]);

  // 즐겨찾기 메뉴
  const menuFavoritesOptions = useMemo(() => {
    if (!menuFavorites) return [];
    return menuFavorites?.map((menu: any) => ({
      ...menu,
      id: menu.menuId,
      name:
        import.meta.env.VITE_LANGUAGE_DEV === 'true'
          ? t(`${menu.menuName}`)
          : t(`HRD_CENTER_MENU.${menu.menuCode}`),
    }));
  }, [menuFavorites]);

  // 즐겨찾기 별표시 상태 ( 별표시 누르면 메뉴 삭제라서 제거 )
  // const [isFavorites, setIsFavorites] = useState<boolean[]>([true, true, true, true, true]);

  // 즐겨찾기 삭제
  const handleToggle = (index: number) => {
    // 즐겨찾기 별표시 상태 ( 별표시 누르면 메뉴 삭제라서 제거 )
    // 버튼의 상태 배열 복사 후 해당 인덱스만 반전시킴
    // setIsFavorites((prevState) => {
    //   const newToggled = [...prevState];
    //   newToggled[index] = !newToggled[index];
    //   return newToggled;
    // });

    console.log('menuOptions[index] :: ', menuFavoritesOptions[index]);

    deleteMenuFavorites(menuFavoritesOptions[index].id, {
      onSuccess: async (data: any) => {
        console.log('data', data);
        refetch();
        if (authUser?.activeTenant?.tenantId) {
          const menus = await asyncMenus(authUser?.activeTenant?.tenantId);
          updateMenu(menus);
          setActiveMenuDepth((prev) => {
            return prev?.map((menu) =>
              menu.menuId === menuFavoritesOptions[index].id
                ? { ...menu, isFavorite: false }
                : menu,
            );
          });
        }
      },
    });
  };

  return (
    <div className={cn(styles.start, styles.mymenu_wrap)}>
      <strong className={styles.tit}>{t('LABEL.common.recentMenu')}</strong>
      <div className={styles.word_contents}>
        {/* 최근 자주 사용한 메뉴 없는 경우 */}
        {recentMenu.length === 0 ? (
          <div className={styles.empty}>
            <IcoClock01 className={styles.icon_menu} width={48} height={48} stroke="#8C97AE" />
            <p className={cn(styles.text, 'whitespace-pre-wrap')}>
              {t('LABEL.message.recentMenuInfo')}
            </p>
          </div>
        ) : (
          <div className={styles.word_wrap}>
            <ChipList
              options={recentMenu}
              size="sm"
              hideBorder
              onChipClick={(e) => {
                console.log(e);
                router.navigate({ to: e.path });
              }}
              onChipDeleteClick={(e) => {
                console.log(e);
                deleteMenus(menus[e.index]);
              }}
            />
          </div>
        )}
      </div>
      <strong className={styles.tit}>{t('LABEL.common.favorites')}</strong>
      {menuFavoritesOptions?.length > 0 ? (
        <div className={styles.menu_list}>
          <List
            options={menuFavoritesOptions}
            // value={value}
            valueField={'id'}
            draggable
            hideBorder
            disabledActive
            itemRenderer={(option: any, index: number) => (
              <div className={styles.menu_box}>
                <Button
                  className={cn(styles.btn_favorites, styles.active)}
                  // 즐겨찾기 별표시 상태 ( 별표시 누르면 메뉴 삭제라서 제거 )
                  // className={cn(styles.btn_favorites, isFavorites[index] ? styles.active : '')}
                  onClick={() => handleToggle(index)}
                  onlyIcon
                >
                  <IcoStar
                    width={16}
                    height={16}
                    stroke="#FFB902"
                    fill="#FFB902"
                    className={styles.icon_star}
                  />
                </Button>
                <span className={styles.menu_name}>{option.name}</span>
              </div>
            )}
            onOptionsOrderChange={(newOptions: any, over: any) => {
              if (over && newOptions && newOptions[over.index])
                moveMenuFavorites(
                  {
                    favoritesMenuId: newOptions[over.index].favoritesMenuId,
                    sortOrder: over.index + 1,
                  },
                  {
                    onSuccess: (data: any) => {
                      console.log('data', data);
                      refetch();
                    },
                  },
                );
            }}
          />
        </div>
      ) : (
        <div className={styles.empty}>
          <IcoStar02 className={styles.icon_menu} width={48} height={48} stroke="#8C97AE" />
          <p className={cn(styles.text, 'whitespace-pre-wrap')}>
            {t('LABEL.message.favoritesMenuInfo')}
          </p>
        </div>
      )}
    </div>
  );
};

const MyMenuCompoment = () => {
  const { t } = useTranslation();

  return (
    <Popover popoverContent={<PopoverContent />}>
      {
        <span className={styles.btn_menu}>
          <IcoStar width={18} height={18} stroke="#FFB902" fill="#FFB902" />
          <span className={styles.btn_text}>{t('My menu')}</span>
        </span>
      }
    </Popover>
  );
};

export const MyMenu = memo(MyMenuCompoment);
