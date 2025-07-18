import { memo } from 'react';
import { Link } from '@tanstack/react-router';
import { Input, Button } from '@learnway/ui';
import { IcoSearch } from '@learnway/icons';

import { RecentSearches } from './recent-searches';
import { RecommendedSearches } from './recommended-searches';
import { PopularSearches } from './popular-searches';

import styles from '@learnway/styles/fo/features/layout/ui/search-popover.module.css';

interface SearchPopoverProps {
  className?: string;
}

const SearchPopoverCompoment = ({ className }: SearchPopoverProps) => {
  return (
    <div className={`${styles.start} ${styles.search_popover} ${className}`}>
      <div className={styles.area_left}>
        {/* 최근 검색어 */}
        <RecentSearches />
      </div>
      <div className={styles.area_right}>
        <div className={styles.area_box}>
          <RecommendedSearches />
        </div>
        <div className={styles.area_box}>
          <PopularSearches />
        </div>
      </div>
    </div>
  );
};

export const SearchPopover = memo(SearchPopoverCompoment);
