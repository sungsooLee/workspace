import { memo, useState, useRef } from 'react';
import { Link } from '@tanstack/react-router';
import styles from './search.module.css';
import { Input, Button } from '@learnway/ui';
import { IcoSearch } from '@learnway/icons';

import { SearchPopover } from './search-popover';
import { AutoCompletePopover } from './auto-complete-popover';

const SearchCompoment = () => {
  const [searchPopover, setSearchPopover] = useState<boolean>(true);
  const [autoCompletePopover, setAutoCompletePopover] = useState<boolean>(false);

  return (
    <div className={`${styles.start} ${styles.search}`}>
      <Input placeholder="검색어를 입력해주세요." type="text" />
      <Button aria-label="search">
        <IcoSearch width={20} height={20} stroke="#131C30" />
      </Button>

      {/* 최근, 추천, 인기 popover */}
      {searchPopover && <SearchPopover className={styles.search_popover} />}

      {/* auto-complete popover */}
      {autoCompletePopover && <AutoCompletePopover className={styles.auto_complete_popover} />}
    </div>
  );
};

export const Search = memo(SearchCompoment);
