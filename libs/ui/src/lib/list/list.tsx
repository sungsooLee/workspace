import { addOrRemoveItemByKey, cn, getMatchingItemsByKey } from '@learnway/shared';

import styles from './list.module.css';
import React, { isValidElement } from 'react';
import { IcoDelete03 } from '@learnway/icons';
import { Button } from '../button/button';
import { ListOption } from './type';

export interface ListComponentProps {
  options: Array<ListOption>;
  value?: any;
  className?: string;
  labelField?: string;
  valueField?: string;
  /** option 선택시 active 표시 여부 */
  disabledActive?: boolean;
  /** 멀티 선택 가능 여부 */
  multiple?: boolean;
  /** 삭제 가능 여부 */
  deletable?: boolean;
  /** 보더 표시 여부 */
  hideBorder?: boolean;
  /** chip 삭제 버튼 클릭시 호출 */
  onOptionDeleteClick?: (option: any) => void;
  /** option 선택시 호출 (싱글 모드) */
  onOptionSelect?: (option: any) => void;
  /** option 선택시 호출 (멀티 모드) */
  onOptionsSelect?: (options: any[]) => void;
}

const ListComponent = function ({
  className,
  options,
  value,
  labelField = 'label',
  valueField = 'value',
  disabledActive = false,
  multiple,
  deletable,
  hideBorder,
  onOptionDeleteClick,
  onOptionSelect,
  onOptionsSelect,
}: ListComponentProps) {
  const selectedOptions = getMatchingItemsByKey(options, value, 'value');

  const handleOptionClickForSingle = (option: any) => {
    onOptionSelect?.(option);
  };

  const handleOptionClickForMultiple = (option: any) => {
    const newSelectedOptions = addOrRemoveItemByKey(selectedOptions, option, valueField);
    onOptionsSelect?.(newSelectedOptions);
  };

  const handleDeleteClick = (event: React.MouseEvent, option: any) => {
    event.stopPropagation(); // 이벤트 전파를 중단하여 오버레이 클릭 이벤트를 막음
    onOptionDeleteClick?.(option);
  };

  return (
    <ul className={cn(className, 'nlp--list', styles.start, hideBorder && styles.border_none)}>
      {/* options */}
      {options?.map((d: any) => (
        <li
          role="button"
          className={cn(
            styles.item,
            selectedOptions?.find((x: any) => x[valueField] === d[valueField]) &&
              !disabledActive &&
              styles.active, // selected row style
            'border',
          )}
          key={d[valueField]}
          onClick={() =>
            multiple ? handleOptionClickForMultiple(d) : handleOptionClickForSingle(d)
          }>
          {/* child 가 있으면 보여주고 아니면 일반 label 을 보여준다. */}
          {getNodeElement(d) ?? d[labelField]}
          {/* 삭제 버튼 */}
          {deletable && (
            <Button
              type="button"
              className={cn(styles.clear)}
              onlyIcon
              onClick={(event: React.MouseEvent) => handleDeleteClick(event, d)}>
              <IcoDelete03 width={20} height={20} fill="#A9AFB8" stroke="#ffffff" />
            </Button>
          )}
        </li>
      ))}
    </ul>
  );
};

export const List = ListComponent;

const getNodeElement = (d: ListOption) => {
  if (isValidElement(d.child && d.child(d))) {
    return d.child?.(d);
  }
  return null;
};
