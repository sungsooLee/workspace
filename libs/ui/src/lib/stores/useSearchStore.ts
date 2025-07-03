// store/searchStore.ts
import { create } from 'zustand';
import { useEffect } from 'react';

export interface SearchState {
  isSearchOpen: boolean;
  openSearch: () => void;
  closeSearch: () => void;
}

export const useSearchStore = create<SearchState>((set) => ({
  isSearchOpen: false,

  openSearch: () => {
    set({ isSearchOpen: true });
    document.body.style.overflow = 'hidden';
    window.history.pushState({ searchOpen: true }, '');
  },

  closeSearch: () => {
    set({ isSearchOpen: false });
    document.body.style.overflow = '';
  },
}));

// 뒤로가기 이벤트 처리를 위한 훅
export function useSearchHistoryListener() {
  const isSearchOpen = useSearchStore((state) => state.isSearchOpen);
  const closeSearch = useSearchStore((state) => state.closeSearch);

  useEffect(() => {
    if (!isSearchOpen) return;

    const handlePopState = () => {
      if (isSearchOpen) {
        closeSearch();
      }
    };

    window.addEventListener('popstate', handlePopState);
    return () => window.removeEventListener('popstate', handlePopState);
  }, [isSearchOpen, closeSearch]);
}
