import { atom, useAtom } from 'jotai';

import { Menu } from '../../../types';

const menuState = atom<Menu[]>();

export function useActiveMenuDepthState() {
  return useAtom(menuState);
}
