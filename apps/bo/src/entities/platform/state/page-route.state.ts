import { atom, Provider, useAtom } from 'jotai';

const pageRouteState = atom<any>();

export function usePageRouteState() {
  return useAtom(pageRouteState);
}
