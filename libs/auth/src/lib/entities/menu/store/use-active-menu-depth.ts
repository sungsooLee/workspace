import { create } from 'zustand';
import { Menu } from '../../../types';
import { isArray, last } from 'lodash';

type ActiveMenuDepth = {
  activeMenuDepthMenu: Menu[] | null;
  setActiveMenuDepthMenu: (value: Menu[]) => void;
};

/**
 * @description activeMenuDepthState state jotai > zustand 변경
 */
export const useActiveMenuDepthState = create<ActiveMenuDepth>((set) => ({
  activeMenuDepthMenu: null,
  setActiveMenuDepthMenu: (value: Menu[]) => {
    if (value) {
      const lastMenuId = last(value)?.menuId;
      localStorage.setItem('last', String(lastMenuId));
    }
    set({ activeMenuDepthMenu: value });
  },
}));

// import { atom, useAtom } from 'jotai';

// import { Menu } from '../../../types';

// const menuState = atom<Menu[]>();

// export function useActiveMenuDepthState() {
//   return useAtom(menuState);
// }
