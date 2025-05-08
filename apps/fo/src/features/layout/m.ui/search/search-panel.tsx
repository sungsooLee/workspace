import { Button, useSearchHistoryListener, useSearchStore } from '@learnway/ui';
import styles from '@learnway/styles/fo/widgets/layout/m.ui/main/container/container-header.module.css';
import { IcoArrowBackward } from '@learnway/icons';
import { useEffect } from 'react';
import { Search } from '../../ui/search/search';

export const SearchOverlay = () => {
  const isSearchOpen = useSearchStore((state: any) => state.isSearchOpen);
  const closeSearch = useSearchStore((state: any) => state.closeSearch);

  useSearchHistoryListener(); // 뒤로가기 이벤트 처리

  if (!isSearchOpen) return null;

  return (
    <div className={styles.start}>
      <div className={styles.left}>
        <Button onClick={closeSearch}>
          <IcoArrowBackward width={24} height={24} stroke="#131c30"></IcoArrowBackward>
        </Button>
        <Search isMobile={true} />
      </div>
    </div>
  );
};
