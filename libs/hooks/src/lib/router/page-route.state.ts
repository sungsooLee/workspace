import { create } from 'zustand';

type PageRouteState = {
  pageRouteState: any; // 타입이 명확하면 any 대신 명시적으로
  setPageRouteState: (value: any) => void;
};

/**
 * @description router state jotai > zustand 변경
 */
export const usePageRouteState = create<PageRouteState>((set) => ({
  pageRouteState: null,
  setPageRouteState: (value) => set({ pageRouteState: value }),
}));

// import { atom, Provider, useAtom } from 'jotai';

// const pageRouteState = atom<any>();

// export function usePageRouteState() {
//   return useAtom(pageRouteState);
// }
