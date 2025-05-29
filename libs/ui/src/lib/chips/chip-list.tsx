import React, { ChangeEvent, forwardRef, KeyboardEvent, useState } from 'react';

import { cn } from '@learnway/shared';
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
  type?: 'line' | 'round' | 'round2';
  placeholder?: string;
  size?: 'ts' | 'xs' | 'sm' | 'md' | 'lg'; // ts(20), xs(28) , sm(32) , md(36), lg(40)
  hideBorder?: boolean;
  /** 최대 표시 개수 (한번에 보여줄 chip 개수) */
  visibleCount?: number;
  /** chips wordwrap 여부 */
  wordwrap?: boolean;
  /** empty message */
  emptyMessage?: string | React.ReactNode;
  /** label field */
  labelField?: string;
  /** value field */
  valueField?: string;
  /** readOnly 여부 */
  readOnly?: boolean;
  /** chip 클릭시 호출 */
  onChipClick?: (option: any) => void;
  /** chip 삭제 버튼 클릭시 호출 */
  onChipDeleteClick?: (option: any) => void;
  /** 추가할 chip input 에서 엔터 눌렀을때 호출 */
  onAddInputEnterKeyDown?: (text: string) => void;
  /** ... */
  onChipListClick?: () => void;
}

const ChipListComponent = forwardRef<HTMLDivElement, ChipListComponentProps>(
  (
    {
      className,
      showInput,
      options = [],
      placeholder = t('태그를 입력해주세요.'),
      orientation,
      type,
      size,
      hideBorder,
      visibleCount = 10000,
      emptyMessage,
      readOnly,
      wordwrap = false,
      labelField = 'label',
      valueField = 'value',
      onChipClick,
      onChipDeleteClick,
      onChipListClick,
      onAddInputEnterKeyDown,
      ...props
    },
    ref,
  ) => {
    const [inputValue, setInputValue] = useState<string>('');
    const overCount = options?.length - visibleCount;
    const isOverCount = overCount > 0;
    const displayOptions = isOverCount ? options?.slice(0, visibleCount) : [...options];
    const isShowEmptyMessage = !displayOptions?.length && emptyMessage && !showInput;

    const handleInputChange = (event: ChangeEvent<HTMLInputElement>) => {
      setInputValue(event.target.value);
    };

    const handleInputKeyDown = (event: KeyboardEvent<HTMLInputElement>) => {
      const value = (event.target as HTMLInputElement).value?.trim();
      if (event.key === 'Enter' && value) {
        setInputValue('');
        onAddInputEnterKeyDown?.(value);
      }
    };

    const handleChipClick = (option: any) => {
      onChipClick?.(option);
    };

    const handleChipDelete = (option: any) => {
      onChipDeleteClick?.(option);
    };

    return (
      <div
        {...props}
        ref={ref}
        className={cn(
          'nlp--chip-list',
          styles.start,
          styles.chips_list,
          className,
          wordwrap && 'wordwrap',
          readOnly && styles.readonly,
          {
            [styles.chips_box]: !hideBorder,
            [styles.border_none]: hideBorder,
          },
        )}
      >
        {/* empty message */}
        {isShowEmptyMessage && <div className={styles.empty_message}>{emptyMessage}</div>}

        {/* input */}
        {!isShowEmptyMessage && showInput && (
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
        {!isShowEmptyMessage && (
          <div className={cn(styles.chips_wapper, orientation && styles[orientation])}>
            {displayOptions?.map((option) => (
              <Chip
                {...props}
                size={size}
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
            {isOverCount && (
              <Popover
                popoverContent={
                  <ChipListMoreContent
                    options={options}
                    labelField={labelField}
                    valueField={valueField}
                  />
                }
              >
                <Button label={`...+(${overCount})`} size={'md'} variant={'gray2'} />
              </Popover>
            )}
          </div>
        )}
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
