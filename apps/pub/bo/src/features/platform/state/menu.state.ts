import { atom, Provider, useAtom } from 'jotai';

import type { Menu } from '../../../types';

// import datae from ';
import data from '../../../entities/mock/activeMenuDepth.json';

const menuState = atom<any[]>();

export function useActiveMenuDepthState() {
  return useAtom(menuState);
}
