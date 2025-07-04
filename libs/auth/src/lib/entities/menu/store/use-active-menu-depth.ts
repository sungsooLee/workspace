import { create } from 'zustand';
import { Menu } from '../../../types';

type ActiveMenuDepth = {
  activeMenuDepthMenu: Menu[] | null;
  setActiveMenuDepthMenu: (value: Menu[]) => void;
};

/**
 * @description activeMenuDepthState state jotai > zustand 변경
 */
export const useActiveMenuDepthState = create<ActiveMenuDepth>((set) => ({
  activeMenuDepthMenu: null,
  setActiveMenuDepthMenu: (value) => set({ activeMenuDepthMenu: value }),
}));

// import { atom, useAtom } from 'jotai';

// import { Menu } from '../../../types';

// const menuState = atom<Menu[]>();

// export function useActiveMenuDepthState() {
//   return useAtom(menuState);
// }
