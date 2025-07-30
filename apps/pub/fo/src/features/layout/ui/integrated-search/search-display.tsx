import { cn } from '@learnway/shared';
import styles from './search-display.module.css';

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
}

export const SearchDisplay: React.FC<SearchDisplayProps> = ({
  searchState,
  displayFormat,
  className,
}) => {
  const renderContent = () => {
    // 입력 전
    if (searchState === 'before') {
      return <SearchBefore />;
    }
    // 입력 중
    if (searchState === 'typing') {
      return <SearchTyping />;
    }
    // 입력 후
    if (searchState === 'submitted') {
      return <SearchSubmitted />;
    }

    return null;
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
            buttonActive={false}
            placeholder={'처음엔 다 어려워요! 추천 키워드부터 가볍게 출발~'}
          />
        )}
        {renderContent()}
      </div>
    </div>
  );
};
