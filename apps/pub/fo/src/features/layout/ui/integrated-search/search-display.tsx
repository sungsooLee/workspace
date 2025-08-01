import { cn } from '@learnway/shared';
import { useState } from 'react';
import styles from './search-display.module.css';

import { PopHeaderActions } from './pop-header-actions';
import { SearchBefore } from './search-before';
import { SearchInputWrap } from './search-input-wrap';
import { SearchSubmitted } from './search-submitted';
import { SearchTyping } from './search-typing';

export type SearchState = 'before' | 'typing' | 'submitted';
export type displayFormat = 'popover' | 'modal';

interface SearchDisplayProps {
  searchState: SearchState;
  displayFormat?: string;
  className?: string;
  onBack?: () => void;
  onSubmitSearch?: () => void;
}

export const SearchDisplay: React.FC<SearchDisplayProps> = ({
  searchState,
  displayFormat,
  className,
  onBack,
  onSubmitSearch,
}) => {
  const [inputhValue, setInputValue] = useState('');

  const hasValue = inputhValue.trim().length > 0;

  const renderContent = () => {
    // 입력 전 : SearchBefore , 입력 중 : SearchTyping, 입력 후 : SearchSubmitted
    if (searchState === 'submitted') return <SearchSubmitted />;
    return hasValue ? <SearchTyping /> : <SearchBefore />;
  };

  return (
    <div
      className={cn(
        styles.start,
        styles.search_display,
        displayFormat && styles[displayFormat],
        'nlp--search-display',
        className,
      )}
    >
      <div className={styles.contents}>
        {(searchState === 'before' || searchState === 'typing') && (
          <SearchInputWrap
            buttonActive={hasValue ? true : false}
            placeholder={'처음엔 다 어려워요! 추천 키워드부터 가볍게 출발~'}
            value={inputhValue}
            onChange={(e) => setInputValue(e.target.value)}
            onClick={onSubmitSearch}
          />
        )}
        {searchState === 'submitted' && <PopHeaderActions onBack={onBack} />}
        {renderContent()}
      </div>
    </div>
  );
};
