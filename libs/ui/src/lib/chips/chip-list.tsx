import React, { ChangeEvent, forwardRef, KeyboardEvent, useEffect, useState } from 'react';
import { isEqual } from 'lodash';

import { cn } from '@learnway/shared';

import { useModal } from '../modal/modal.hook';
import { Chip, ChipComponentProps } from './chip';
import { Button } from '../button/button';
import { Input } from '../input/input';
import { Popover } from '../popover/popover';
import { t } from 'i18next';

import styles from './chip-list.module.css';

export interface ChipListComponentProps extends Omit<ChipComponentProps, 'option' | 'onClick'> {
  options: Array<any>;
  showInput?: boolean;
  orientation?: 'vertical' | 'horizontal';
  type?: 'line' | 'round';
  placeholder?: string;
  size?: 'xs' | 'sm' | 'md' | 'lg'; // xs(28) , sm(32) , md(36), lg(40)
  hideBorder?: boolean;
  visibleCount?: number; // 최대 표시 개수 (한번에 보여줄 chip 개수)
  wordwrap?: boolean; // wordwrap 여부
  onChipListClick?: () => void;
  onChipClick?: (option: any) => void;
  onChange?: (options: Array<any>) => void;
}

const ChipListComponent = forwardRef<HTMLDivElement, ChipListComponentProps>(
  ({
    className,
    onDelete,
    onChange,
    showInput,
    options = [],
    placeholder = t('태그를 입력해주세요.'),
    orientation,
    type,
    size,
    hideBorder,
    visibleCount = 10000,
    wordwrap = false,
    labelField = 'label',
    valueField = 'value',
    onChipClick,
    onChipListClick,
    ...props
  }) => {
    const { alert: openAlert } = useModal();
    const [selectedOptions, setSelectedOptions] = useState<any[]>(options); // 선택된 options
    const [displayOptions, setDisplayOptions] = useState<any[]>(); // 선택된 내용중 보여질 options
    const [overCount, setOverCount] = useState<number>(0); // 선택된 내용중 보여질 options
    const [inputValue, setInputValue] = useState<string>('');

    useEffect(() => {
      setSelectedOptions(options);
    }, [options]);

    useEffect(() => {
      // 내용이 변경 되었을때만
      if (!isEqual(options, selectedOptions)) {
        onChange?.(selectedOptions);
      }
      initDisplayOptions();
    }, [selectedOptions]);

    const initDisplayOptions = () => {
      const overCount = selectedOptions?.length - visibleCount;
      const isOver = overCount > 0;
      const newDisplayOptions = isOver
        ? selectedOptions?.slice(0, visibleCount)
        : [...selectedOptions];
      setDisplayOptions(newDisplayOptions);
      setOverCount(overCount);
    };

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

    const handleChipListClick = () => {
      onChipListClick?.();
    };

    const handleChipClick = (event: any) => {
      onChipClick?.(event);
    };

    const handleChipDelete = (event: any) => {
      const newOptions = selectedOptions?.filter(
        (option) => option[valueField] !== event[valueField],
      );
      setSelectedOptions(newOptions);
    };

    const handleOverChipClick = () => {
      console.log('xxxxxx');
      openAlert('기획...');
    };

    return (
      <div
        {...props}
        className={cn(styles.start, styles.chips_list, className, 'nlp--chip-list', {
          [styles.chips_box]: !hideBorder,
          [styles.border_none]: hideBorder,
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
        <div
          className={cn(styles.chips_wapper, orientation && styles[orientation])}
          onClick={handleChipListClick}>
          {displayOptions?.map((option) => (
            <Chip
              {...props}
              key={option[valueField]}
              option={option}
              labelField={labelField}
              valueField={valueField}
              className={cn(styles.btn_chips, size && styles[size], type && styles[type])}
              onClick={onChipClick && handleChipClick}
              onDelete={handleChipDelete}
            />
          ))}
          {/* 최대 표시 개수 초과 했을때 */}
          {overCount > 0 && (
            <Popover
              popoverContent={
                <ChipListMoreContent
                  options={selectedOptions}
                  labelField={labelField}
                  valueField={valueField}
                />
              }>
              <Button label={`...+(${overCount})`} size={'md'} variant={'gray2'} />
            </Popover>
          )}
        </div>
      </div>
    );
  },
);

export const ChipList = ChipListComponent;

const ChipListMoreContent = ({ options, labelField, valueField }: any) => {
  return options?.map((d: any) => (
    <div className={'border-1 flex flex-col p-1'}>
      <Chip
        key={d[valueField]}
        option={d}
        labelField={labelField}
        valueField={valueField}
        size={'sm'}
        hideCloseButton
      />
    </div>
  ));
};
