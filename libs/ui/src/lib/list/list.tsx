import { addOrRemoveItemByKey, cn, getMatchingItemsByKey } from '@learnway/shared';

import styles from './list.module.css';
import React, { isValidElement, ReactElement } from 'react';
import { IcoDelete03, IcoMenu01 } from '@learnway/icons';
import { Button } from '../button/button';
import { CommonReactElementProps } from '@/libs/ui/src';

export interface ListComponentProps extends CommonReactElementProps {
  /** options */
  options: Array<any>;
  /** value */
  value?: any;
  /** option 에서 label 로 사용할 key */
  labelField?: string;
  /** option 에서 value 로 사용할 key */
  valueField?: string;
  /** option 선택시 active 표시 여부 */
  disabledActive?: boolean;
  /** 멀티 선택 가능 여부 */
  multiple?: boolean;
  /** 삭제 가능 여부 */
  deletable?: boolean;
  /** 보더 표시 여부 */
  hideBorder?: boolean;
  /** 컨텐츠 영역 보더 표시 여부 */
  hideItemBorder?: boolean;
  /** 리스트의 개별 아이템을 렌더링 하는 함수 */
  itemRenderer?: (option: any) => ReactElement;
  /** draggable 가능 여부 */
  draggable?: boolean;
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
  hideItemBorder = true,
  itemRenderer,
  draggable,
  onOptionDeleteClick,
  onOptionSelect,
  onOptionsSelect,
}: ListComponentProps) {
  const selectedOptions = getMatchingItemsByKey(options, value, valueField);

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
          {/*컨텐츠 영역*/}
          <div className={cn(!hideItemBorder && 'border')}>
            {/* child 가 있으면 보여주고 아니면 일반 label 을 보여준다. */}
            {/*{getNodeElement(d) ?? d[labelField]}*/}
            {isValidElement(itemRenderer?.(d)) ? itemRenderer(d) : d[labelField]}
          </div>
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
          {/* draggable 버튼 */}
          {draggable && (
            <Button type="button" className={cn(styles.clear)} onlyIcon>
              <IcoMenu01 width={24} height={24} fill="#A9AFB8" stroke="#131C30" />
            </Button>
          )}
        </li>
      ))}
    </ul>
  );
};

export const List = ListComponent;
