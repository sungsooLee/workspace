import { atom, Provider, useAtom } from 'jotai';

import { PageMeta } from '../../../types';

const pageMetaState = atom<PageMeta>();

export function usePageMetaState() {
  return useAtom(pageMetaState);
}
