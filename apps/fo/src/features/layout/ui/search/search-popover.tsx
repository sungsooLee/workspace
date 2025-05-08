import styles from '@learnway/styles/fo/features/layout/ui/search-popover.module.css';
import { memo } from 'react';
import { RecentSearches } from './recent-search';
import { RecommendedSearch } from './recommended-search';
import { PopularSearch } from './popular-search';

interface SearchPopoverProps {
  className?: string;
}

const SearchPopoverComponent = ({ className }: SearchPopoverProps) => {
  return (
    <div className={`${styles.start} ${styles.search_popover} ${className}`}>
      <div className={styles.area_left}>
        {/* 최근 검색어 */}
        <RecentSearches />
      </div>
      <div className={styles.area_right}>
        <div className={styles.area_box}>
          <RecommendedSearch />
        </div>
        <div className={styles.area_box}>
          <PopularSearch />
        </div>
      </div>
    </div>
  );
};

export const SearchPopover = memo(SearchPopoverComponent);
