import { atom, useAtom } from 'jotai';

const sessionIntervalState = atom<any>();

export function useSessionIntervalState() {
  return useAtom(sessionIntervalState);
}
