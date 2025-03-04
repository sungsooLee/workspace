import { atom, Provider, useAtom } from 'jotai';

import type { Menu } from '../../../types';

// import datae from ';
import datae from '../../../entities/mock/activeMenuDepth.json';

const menuState = atom<Menu[]>();

export function useActiveMenuDepthState() {
  return [datae];
}
