import { last } from 'lodash';
import { create } from 'zustand';
import { Menu } from '../../../types';

type ActiveMenuDepth = {
  activeMenuDepthMenu: Menu[] | null;
  setActiveMenuDepthMenu: (value: Menu[]) => void;
  currentMenu: Menu | null; // 현재 메뉴
};

/**
 * @description activeMenuDepthState state jotai > zustand 변경
 */
export const useActiveMenuDepthState = create<ActiveMenuDepth>((set) => ({
  activeMenuDepthMenu: null,
  currentMenu: null,
  setActiveMenuDepthMenu: (value: Menu[]) => {
    if (value) {
      const lastMenuId = last(value)?.menuId;
      localStorage.setItem('last', String(lastMenuId));
    }
    set({
      activeMenuDepthMenu: value,
      currentMenu: last(value),
    });
  },
}));
