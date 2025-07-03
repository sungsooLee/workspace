import { memo, useEffect, useRef, useState } from 'react';
import { Button, Input } from '@learnway/ui';
import { IcoSearch } from '@learnway/icons';
import styles from '@learnway/styles/fo/features/layout/ui/search.module.css';
import { SearchPopover } from './search-popover';
import { AutoCompletePopover } from './auto-complete-popover';

const MAX_SEARCH_LENGTH = 20;
const SearchComponent = ({ isMobile }: any) => {
  const [searchValue, setSearchValue] = useState('');

  const [isSearchPopoverOpen, setIsSearchPopoverOpen] = useState(isMobile ? true : false);
  const [isAutoCompleteOpen, setIsAutoCompleteOpen] = useState(false);

  // 검색창과 팝오버 컨테이너를 참조하기 위한 ref
  const searchContainerRef = useRef<any>(null);

  // 입력값 변경 핸들러
  const handleInputChange = (e: any) => {
    const value = e.target.value;
    setSearchValue(value);
    // 입력값이 있으면 자동완성 팝오버 표시, 없으면 최근/추천/인기 팝오버 표시
    if (value.trim()) {
      setIsAutoCompleteOpen(true);
      setIsSearchPopoverOpen(false);
    } else {
      setIsAutoCompleteOpen(false);
      setIsSearchPopoverOpen(true);
    }
  };

  // 검색창 포커스 핸들러
  const handleInputFocus = () => {
    // 입력값이 없을 때만 최근/추천/인기 팝오버 표시
    if (!searchValue.trim()) {
      setIsSearchPopoverOpen(true);
    } else {
      setIsAutoCompleteOpen(true);
    }
  };

  // 검색 버튼 클릭 핸들러
  const handleSearchClick = () => {
    // 검색 로직 구현
    console.log('검색어:', searchValue);
    // 검색 후 팝오버 닫기
    setIsSearchPopoverOpen(false);
    setIsAutoCompleteOpen(false);
  };

  // 외부 클릭 감지를 위한 이벤트 리스너
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        searchContainerRef.current &&
        event.target instanceof Node &&
        !searchContainerRef.current.contains(event.target)
      ) {
        setIsSearchPopoverOpen(false);
        setIsAutoCompleteOpen(false);
      }
    };

    // 이벤트 리스너 등록
    document.addEventListener('mousedown', handleClickOutside);

    // 컴포넌트 언마운트 시 이벤트 리스너 제거
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  return (
    <div className={`${styles.start} ${styles.search}`} ref={searchContainerRef}>
      <Input
        placeholder="현대 자동차"
        type="text"
        value={searchValue}
        onChange={handleInputChange}
        onFocus={handleInputFocus}
        onEnterKeyDown={handleSearchClick}
        maxLength={MAX_SEARCH_LENGTH}
        hideInputLength={true}
      />
      <Button aria-label="search">
        <IcoSearch width={20} height={20} stroke="#131C30" />
      </Button>
      {/* 최근, 추천, 인기 팝오버 */}
      {isSearchPopoverOpen && (
        <SearchPopover
          className={styles.search_popover}
          // onItemClick={(item) => {
          //   setSearchValue(item);
          //   setIsSearchPopoverOpen(false);
          // }}
        />
      )}

      {/* 자동완성 팝오버 */}
      {isAutoCompleteOpen && (
        <AutoCompletePopover
          className={styles.auto_complete_popover}
          // searchValue={searchValue}
          // onItemClick={(item) => {
          //   setSearchValue(item);
          //   setIsAutoCompleteOpen(false);
          // }}
        />
      )}
    </div>
  );
};

export const Search = memo(SearchComponent);
