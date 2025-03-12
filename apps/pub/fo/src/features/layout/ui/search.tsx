import { memo } from 'react';
import { Link } from '@tanstack/react-router';
import styles from './search.module.css';
import { Input, Button } from '@learnway/ui';
import { IcoSearch } from '@learnway/icons';

import { SearchPopover } from './search-popover';

const SearchCompoment = () => {
  return (
    <div className={`${styles.start} ${styles.search}`}>
      <Input placeholder="검색어를 입력해주세요." type="text" />
      <Button aria-label="search">
        <IcoSearch width={20} height={20} stroke="#131C30" />
      </Button>
      {/* <SearchPopover className={styles.search_popover} /> */}
    </div>
  );
};

export const Search = memo(SearchCompoment);
