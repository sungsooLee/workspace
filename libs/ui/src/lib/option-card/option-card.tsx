import { addOrRemoveItemByKey, cn, getMatchingItemsByKey } from '@learnway/shared';
import React, { isValidElement, ReactElement, ReactNode } from 'react';

import { Button } from '../button/button';
import styles from './option-card.module.css';

export interface OptionCardItem {
  /** 카드에 표시할 라벨 텍스트 */
  label: string;
  /** 선택 시 사용할 값 (주로 id나 key 값) */
  value: any;
  /** 카드 왼쪽에 들어갈 아이콘 (ReactNode 형태) */
  icon?: ReactNode;
  /** 카드에 표시할 부가 설명 텍스트 */
  description?: string;
  /** 원본 데이터 객체 (서버에서 받은 데이터 등) */
  original?: any;
}

export interface OptionCardComponentProps {
  /** 렌더링할 옵션 카드 아이템 목록 */
  options: OptionCardItem[];
  /** 현재 선택된 값 (단일 선택 모드에서 사용) */
  value?: any;
  /** 컴포넌트에 적용할 커스텀 클래스 */
  className?: string;
  /** 옵션 객체에서 라벨로 사용할 필드명 (기본: 'label') */
  labelField?: string;
  /** 옵션 객체에서 값으로 사용할 필드명 (기본: 'value') */
  valueField?: string;
  /** 다중 선택 여부 (true: 다중 선택) */
  multiple?: boolean;
  /** 한 줄에 보여줄 카드 개수 */
  cols?: number; // row length
  /** 카드 크기 (중간 또는 큰 사이즈) */
  size?: 'md' | 'lg';
  /**
   * 아이템 커스텀 렌더링 함수
   * @param option 현재 아이템 데이터
   * @param index 현재 아이템 인덱스
   * @returns 렌더링할 ReactElement
   */
  itemRenderer?: (option: OptionCardItem, index: number) => ReactElement;
  /** 단일 옵션 선택 시 콜백 함수 */
  onOptionSelect?: (option: any) => void;
  /** 다중 옵션 선택 시 콜백 함수 */
  onOptionsSelect?: (options: any[]) => void;
}

const OptionCardComponent = function ({
  className,
  options,
  value,
  cols,
  size,
  multiple,
  itemRenderer,
  onOptionSelect,
  onOptionsSelect,
}: OptionCardComponentProps) {
  const selectedOptions = getMatchingItemsByKey(options, value, 'value');

  const handleOptionClickForSingle = (option: OptionCardItem) => {
    onOptionSelect?.(option);
  };

  const handleOptionClickForMultiple = (option: OptionCardItem) => {
    const newSelectedOptions = addOrRemoveItemByKey(selectedOptions, option, 'value');
    onOptionsSelect?.(newSelectedOptions);
  };

  return (
    <div
      className={cn(
        styles.start,
        styles.option_card_wrap,
        className,
        'nlp--option-card',
        !cols && styles.type_flex,
      )}
      style={cols ? { gridTemplateColumns: `repeat(${cols}, 1fr)` } : undefined}
    >
      {/* options */}
      {!itemRenderer &&
        options?.map((d: OptionCardItem) => (
          <Button
            type="button"
            className={cn(
              styles.card_item,
              selectedOptions?.find((x: OptionCardItem) => x.value === d.value) && styles.active, // selected row style
              size && styles[size],
            )}
            key={d.value}
            onClick={() =>
              multiple ? handleOptionClickForMultiple(d) : handleOptionClickForSingle(d)
            }
          >
            {/* Icon */}
            {d.icon && <span className={styles.icon}>{d.icon}</span>}
            {/* label */}
            {d.label && <span className={styles.label}>{d.label}</span>}
            {/* descrition */}
            {d.description && <span className={styles.description}>{d.description}</span>}
          </Button>
        ))}
      {/* options with itemRenderer*/}
      {itemRenderer &&
        options?.map((d: OptionCardItem, i: number) => (
          <div
            role={'button'}
            key={d.value}
            onClick={() =>
              multiple ? handleOptionClickForMultiple(d) : handleOptionClickForSingle(d)
            }
            className={cn(
              styles.card_item,
              selectedOptions?.find((x: OptionCardItem) => x.value === d.value) && styles.active, // selected row style
              size && styles[size],
            )}
          >
            {isValidElement(itemRenderer?.(d, i)) ? itemRenderer(d, i) : null}
          </div>
        ))}
    </div>
  );
};

export const OptionCard = OptionCardComponent;
