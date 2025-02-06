import React, { ChangeEvent, forwardRef, KeyboardEvent, useEffect, useState } from 'react';
import { isEqual } from 'lodash';

import { cn } from '@learnway/shared';

import { Chips } from './chips';
import { SelectOption } from '../select/type';
import { Input } from '../input/input';

import styles from './chips.module.css';

export interface ChipListComponentProps {
  options: Array<SelectOption>;
  variant?: 'primary';
  size?: 'xs' | 'sm' | 'md' | 'lg'; // xs(28) , sm(32) , md(36), lg(40)
  className?: string;
  prefixCharacter?: string;
  hideCloseButton?: boolean;
  showInput?: boolean;
  onDelete?: (option: SelectOption) => void;
  onChange?: (options: Array<SelectOption>) => void;
}

const ChipListComponent = forwardRef<HTMLElement, ChipListComponentProps>(
  ({
    className,
    variant,
    size,
    prefixCharacter = '#',
    onDelete,
    onChange,
    hideCloseButton,
    showInput,
    options,
    ...props
  }) => {
    const [selectedOptions, setSelectedOptions] = useState<SelectOption[]>(options);
    const [inputValue, setInputValue] = useState<string>('');

    useEffect(() => {
      // 내용이 변경 되었을때만
      if (!isEqual(options, selectedOptions)) {
        onChange?.(selectedOptions);
      }
    }, [selectedOptions]);

    const handleInputChange = (event: ChangeEvent<HTMLInputElement>) => {
      setInputValue(event.target.value);
    };

    const handleInputKeyDown = (event: KeyboardEvent<HTMLInputElement>) => {
      const value = (event.target as HTMLInputElement).value?.trim();
      const isDuplicated = !!selectedOptions.find((option) => option.value === value); // 새로 등록하는 chips 중복 여부

      if (event.key === 'Enter' && value && !isDuplicated) {
        setSelectedOptions([...selectedOptions, { label: value, value }]);
        setInputValue('');
      }
    };

    const handleChipDelete = (event: SelectOption) => {
      const newOptions = selectedOptions.filter((option) => option.value !== event.value);
      setSelectedOptions(newOptions);
    };

    return (
      <div {...props} className={cn(styles.start, className, 'nlp--chip-list', 'border p-3')}>
        {/* input */}
        {showInput && (
          <Input
            className={'mb-3 max-w-[200px]'}
            placeholder={'태그를 입력해주세요.'}
            onChange={handleInputChange}
            onKeyDown={handleInputKeyDown}
            value={inputValue}
          />
        )}

        {/* chips wrapper */}
        <div className={cn(styles.chips_wapper)}>
          {selectedOptions.map((option) => (
            <Chips option={option} className="mr-1" onDelete={handleChipDelete} />
          ))}
        </div>
      </div>
    );
  },
);

export const ChipList = ChipListComponent;
