import { memo, useState, useRef } from 'react';
import { Link } from '@tanstack/react-router';
import styles from '@learnway/styles/fo/features/layout/ui/search.module.css';
import { Input } from '@learnway/ui/input';
import { IcoSearch } from '@learnway/icons';

import { SearchPopover } from './search-popover';
import { AutoCompletePopover } from './auto-complete-popover';

import searchImage from '@learnway/styles/fo/assets/images/common/logo_symbol.png';

const SearchCompoment = () => {
  const [searchPopover, setSearchPopover] = useState<boolean>(false);
  const [autoCompletePopover, setAutoCompletePopover] = useState<boolean>(false);

  return (
    <div className={`${styles.start} ${styles.search}`}>
      <i>
        <img src={searchImage} alt="" />
      </i>
      <Input placeholder="/를 눌러 검색하세요." type="text" />

      {/* 최근, 추천, 인기 popover */}
      {searchPopover && <SearchPopover className={styles.search_popover} />}

      {/* auto-complete popover */}
      {autoCompletePopover && <AutoCompletePopover className={styles.auto_complete_popover} />}
    </div>
  );
};

export const Search = memo(SearchCompoment);
