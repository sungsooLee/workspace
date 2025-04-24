import { atom, useAtom } from 'jotai';

const sessionTimeoutAlertState = atom<boolean>();

export function useSessionTimeoutAlertState() {
  return useAtom(sessionTimeoutAlertState);
}
