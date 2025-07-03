import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { Menu } from '../../../types';

type State = {
  menus: Menu[]; // 최근본 메뉴
  setMenus: (menu: Menu) => void;
  deleteMenus: (menu: Menu) => void;
};

export const useLayoutStore = create<State>()(
  persist(
    (set, get) => ({
      menus: [],
      setMenus: (menu: Menu) => {
        const alreadyExists = get().menus.find((item) => item.menuId === menu.menuId);
        if (alreadyExists) return; // 아무것도 안 함

        // const filtered = get().menus.filter((item) => item.menuId !== menu.menuId); // 중복 제거
        // const updated = [menu, ...filtered].slice(0, 10); // 최신 항목 맨 앞에

        const updated = [menu, ...get().menus].slice(0, 10); // 최신 항목 맨 앞에
        set({ menus: updated });
      },
      deleteMenus: (menu: Menu) => {
        const filtered = get().menus.filter((item) => item.menuId !== menu.menuId); // 중복 제거
        set({ menus: filtered });
      },
    }),
    {
      name: 'layout-storage', // 로컬 스토리지에 저장될 키
    },
  ),
);
