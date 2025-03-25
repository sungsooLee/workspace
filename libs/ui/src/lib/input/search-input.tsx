import { forwardRef, useState, useEffect, useRef } from 'react';
import { Button } from '../button/button';

import { cn } from '@learnway/shared';
import { IcoDelete03, IcoSearch } from '@learnway/icons';

import styles from './input.module.css';

export interface SearchInputProps {
  placeholder?: string;
  value?: string;
  onChange?: (value: string) => void;
  readOnly?: boolean;
  disabled?: boolean;
  className?: string;
  borderNone?: boolean;
  error?: boolean;
  onSearch?: () => void; // 검색 팝업을 열기 위한 콜백
  onClear?: () => void; // 삭제 버튼 클릭 시 콜백
}

const SearchInputComponent = forwardRef<HTMLDivElement, SearchInputProps>(
  (
    {
      placeholder = '값을 검색하세요.',
      value = '',
      onChange,
      readOnly = true, // 직접 키보드 입력 방지를 위해 기본값을 true로 설정
      disabled,
      className,
      borderNone,
      error,
      onSearch,
      onClear,
    },
    ref,
  ) => {
    const [isFocused, setIsFocused] = useState(false);
    const inputRef = useRef<HTMLInputElement>(null);

    const handleInputFocus = () => {
      setIsFocused(true);
    };

    const handleInputBlur = () => {
      setIsFocused(false);
    };

    const handleSearchClick = (event: React.MouseEvent<HTMLButtonElement>) => {
      event.preventDefault();
      onSearch?.();
    };

    const handleClearClick = (event: React.MouseEvent<HTMLButtonElement>) => {
      event.preventDefault();
      onChange?.('');
      onClear?.();
    };

    const handleInputClick = () => {
      // 입력 영역 클릭 시 검색 팝업 호출
      if (!disabled) {
        onSearch?.();
      }
    };

    return (
      <div ref={ref} className={cn(styles.start, 'nlp--input')}>
        <div
          //   className={cn(styles.input, className, error ? styles.error : '')}
          onClick={handleInputClick}>
          <input
            ref={inputRef}
            // readOnly={readOnly}
            disabled={disabled}
            type="text"
            placeholder={placeholder}
            value={value || ''}
            className={cn(styles.input, 'w-full', 'bg-transparent', 'outline-none')}
            onFocus={handleInputFocus}
            onBlur={handleInputBlur}
            style={{ caretColor: 'transparent' }}
          />
        </div>

        {/* 버튼 영역 */}
        <div className={cn(styles.button_wrap)}>
          {/* 삭제 버튼 */}
          {!disabled && isFocused && !!String(value)?.length && (
            <Button
              type="button"
              className={cn(styles.clear)}
              onlyIcon
              onMouseDown={handleClearClick}>
              <IcoDelete03 width={20} height={20} fill="#A9AFB8" stroke="#ffffff" />
            </Button>
          )}
          {/* 검색 버튼 */}
          <Button
            type="button"
            onClick={handleSearchClick}
            className={cn(styles.clear)}
            onlyIcon
            disabled={disabled}>
            <IcoSearch width={20} height={20} stroke={'#131C30'} />
          </Button>
        </div>
      </div>
    );
  },
);

export const SearchInput = SearchInputComponent;
