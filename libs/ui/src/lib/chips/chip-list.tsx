import React, { ChangeEvent, forwardRef, KeyboardEvent, useEffect, useState } from 'react';
import { isEqual } from 'lodash';

import { cn } from '@learnway/shared';

import { Chips, ChipsComponentProps } from './chips';
import { Input } from '../input/input';

import styles from './chips.module.css';

export interface ChipListComponentProps extends Omit<ChipsComponentProps, 'option' | 'onClick'> {
  options: Array<any>;
  showInput?: boolean;
  orientation?: 'vertical' | 'horizontal';
  placeholder?: string;
  size?: 'xs' | 'sm' | 'md' | 'lg'; // xs(28) , sm(32) , md(36), lg(40)
  onItemClick?: (option: any) => void;
  onChange?: (options: Array<any>) => void;
}

const ChipListComponent = forwardRef<HTMLDivElement, ChipListComponentProps>(
  ({
    className,
    onDelete,
    onChange,
    showInput,
    options = [],
    orientation,
    placeholder = '태그를 입력해주세요.',
    size,
    labelField = 'label',
    valueField = 'value',
    onItemClick,
    ...props
  }) => {
    const [selectedOptions, setSelectedOptions] = useState<any[]>(options);
    const [inputValue, setInputValue] = useState<string>('');

    useEffect(() => {
      setSelectedOptions(options);
    }, [options]);

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
      const newOption = { [labelField]: value, [valueField]: value };
      const isDuplicated = !!selectedOptions?.find((option) => option[valueField] === value); // 새로 등록하는 chips 중복 여부

      if (event.key === 'Enter' && value && !isDuplicated) {
        setSelectedOptions([...selectedOptions, newOption]);
        setInputValue('');
      }
    };

    const handleChipClick = (event: any) => {
      onItemClick?.(event);
    };

    const handleChipDelete = (event: any) => {
      const newOptions = selectedOptions?.filter(
        (option) => option[valueField] !== event[valueField],
      );
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
            borderNone
          />
        )}

        {/* TODO: orientation(vertical, horizontal) style 처리 필요 */}
        {/* chips wrapper */}
        <div className={cn(styles.chips_wapper, orientation && styles[orientation])}>
          {selectedOptions?.map((option) => (
            <Chips
              {...props}
              key={option[valueField]}
              option={option}
              labelField={labelField}
              valueField={valueField}
              className={cn(styles.btn_chips, size && styles[size])}
              onClick={onItemClick && handleChipClick}
              onDelete={handleChipDelete}
            />
          ))}
        </div>
      </div>
    );
  },
);

export const ChipList = ChipListComponent;
