import React, { ChangeEvent, forwardRef, KeyboardEvent, useEffect, useState } from 'react';
import { isEqual } from 'lodash';

import { cn } from '@learnway/shared';

import { Chips, ChipsComponentProps } from './chips';
import { SelectOption } from '../select/type';
import { Input } from '../input/input';

import styles from './chips.module.css';

export interface ChipListComponentProps extends ChipsComponentProps {
  options: Array<SelectOption>;
  showInput?: boolean;
  orientation?: 'vertical' | 'horizontal';
  placeholder?: string;
  onChange?: (options: Array<SelectOption>) => void;
}

const ChipListComponent = forwardRef<HTMLElement, ChipListComponentProps>(
  ({
    className,
    onDelete,
    onChange,
    showInput,
    options,
    placeholder = '태그를 입력해주세요.',
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
      <div
        {...props}
        className={cn(styles.start, styles.chips_list, className, 'nlp--chip-list', {
          [styles.chips_box]: showInput,
        })}>
        {/* input */}
        {showInput && (
          <Input
            className={styles.input_chips}
            placeholder={placeholder}
            onChange={handleInputChange}
            onKeyDown={handleInputKeyDown}
            value={inputValue}
          />
        )}

        {/* TODO: orientation(vertical, horizontal) style 처리 필요 */}
        {/* chips wrapper */}
        <div className={cn(styles.chips_wapper)}>
          {selectedOptions.map((option) => (
            <Chips
              {...props}
              option={option}
              className={styles.btn_chips}
              onDelete={handleChipDelete}
            />
          ))}
        </div>
      </div>
    );
  },
);

export const ChipList = ChipListComponent;
