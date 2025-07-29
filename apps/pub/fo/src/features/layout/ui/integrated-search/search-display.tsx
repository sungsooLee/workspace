import styles from './search-display.module.css';
import { cn } from '@learnway/shared';

import { SearchBefore } from './search-before';
import { SearchTyping } from './search-typing';
import { SearchSubmitted } from './search-submitted';

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
      <div className={styles.contents}>{renderContent()}</div>
    </div>
  );
};
