import { atom, Provider, useAtom } from 'jotai';

import type { Menu } from '../../../types';

const menuState = atom<Menu[]>();

export function useActiveMenuDepthState() {
  return useAtom(menuState);
}
