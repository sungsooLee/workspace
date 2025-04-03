import { addOrRemoveItemByKey, cn, getMatchingItemsByKey } from '@learnway/shared';

import styles from './list.module.css';
import React, { isValidElement, ReactElement } from 'react';
import { IcoDelete03, IcoMenu01 } from '@learnway/icons';
import { Button } from '../button/button';
import { CommonReactElementProps } from '@/libs/ui/src';
import { ReactSortable } from 'react-sortablejs';
import { SortableEvent } from 'sortablejs';

export interface ListProps extends CommonReactElementProps {
  /** 리스트 옵션 배열 */
  options: Array<any>;
  /** 선택된 값 (싱글: 값, 멀티: 값 배열) */
  value?: any;
  /** 옵션 레이블 키 (기본: 'label') */
  labelField?: string;
  /** 옵션 값 키 (기본: 'value') */
  valueField?: string;
  /** 옵션 선택 시 활성 상태 숨김 여부 */
  disabledActive?: boolean;
  /** 다중 선택 가능 여부 */
  multiple?: boolean;
  /** 옵션 삭제 가능 여부 */
  deletable?: boolean;
  /** 리스트 테두리 숨김 여부 */
  hideBorder?: boolean;
  /** 리스트 아이템 테두리 숨김 여부 */
  showItemBorder?: boolean;
  /** 아이템 렌더링 함수
   * @param option 현재 아이템 데이터
   * @param index 현재 아이템 인덱스
   * @returns 렌더링할 ReactElement
   */
  itemRenderer?: (option: any, index: number) => ReactElement;
  /** 아이템 드래그 가능 여부 */
  draggable?: boolean;
  /** 옵션 삭제 콜백 */
  onOptionDeleteClick?: (option: any) => void;
  /** 싱글 선택 콜백 */
  onOptionSelect?: (option: any) => void;
  /** 멀티 선택 콜백 */
  onOptionsSelect?: (options: any[]) => void;
  /** 옵션 순서 변경 콜백 */
  onOptionsOrderChange?: (options: any[]) => void;
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
  showItemBorder,
  itemRenderer,
  draggable,
  onOptionDeleteClick,
  onOptionSelect,
  onOptionsSelect,
  onOptionsOrderChange,
}: ListProps) {
  // 선택된 옵션들을 valueField를 기준으로 필터링하여 가져옴
  const selectedOptions = getMatchingItemsByKey(options, value, valueField);

  /**
   * 단일 선택 모드에서 옵션 클릭 시 호출되는 핸들러
   * @param option 선택된 옵션 객체
   */
  const handleOptionClickForSingle = (option: any) => {
    onOptionSelect?.(option); // 선택된 옵션을 부모 컴포넌트로 전달
  };

  /**
   * 다중 선택 모드에서 옵션 클릭 시 호출되는 핸들러
   * @param option 선택된 옵션 객체
   */
  const handleOptionClickForMultiple = (option: any) => {
    const newSelectedOptions = addOrRemoveItemByKey(selectedOptions, option, valueField);
    onOptionsSelect?.(newSelectedOptions); // 변경된 옵션 목록을 부모 컴포넌트로 전달
  };

  /**
   * 옵션 삭제 버튼 클릭 시 호출되는 핸들러
   * @param event 클릭 이벤트 객체 (이벤트 전파를 막기 위해 사용)
   * @param option 삭제할 옵션 객체
   */
  const handleDeleteClick = (event: React.MouseEvent, option: any) => {
    event.stopPropagation(); // 이벤트 전파를 막아 오버레이 클릭 이벤트 방지
    onOptionDeleteClick?.(option); // 삭제할 옵션을 부모 컴포넌트로 전달
  };

  /**
   * 옵션 정렬이 끝났을 때 호출되는 핸들러
   * @param newIndex 새로운 위치의 인덱스
   * @param oldIndex 기존 위치의 인덱스
   */
  const handleSortEnd = ({ newIndex = -1, oldIndex = -1 }: SortableEvent) => {
    // newIndex 또는 oldIndex 가 유효하지 않은 경우 에러 로그를 출력하고 함수를 종료합니다.
    if (newIndex < 0 || oldIndex < 0) {
      console.error('Invalid indices', { newIndex, oldIndex });
      return;
    }

    const newOptions = [...options]; // 기존 옵션 배열을 복사하여 새로운 배열 생성
    const [movedItem] = newOptions.splice(oldIndex, 1); // 이동할 항목을 배열에서 제거
    newOptions.splice(newIndex, 0, movedItem); // 새로운 위치에 항목 삽입
    onOptionsOrderChange?.(newOptions); // 변경된 옵션 목록을 부모 컴포넌트로 전달
  };

  return (
    <ReactSortable
      list={options}
      setList={() => {}} // list 컴포넌트에서 option 값을 state 관리하지 않기 때문에 빈 함수 전달 (안넣으면 발생)
      onEnd={handleSortEnd}
      tag="ul"
      handle=".drag-handle"
      className={cn(
        className,
        'nlp--list',
        styles.start,
        hideBorder && styles.border_none,
        showItemBorder && styles.type_full,
      )}>
      {options?.map((d: any, i: number) => (
        <li
          className={cn(
            styles.item,
            selectedOptions?.find((x: any) => x[valueField] === d[valueField]) &&
              !disabledActive &&
              styles.active, // selected row style
          )}
          key={d[valueField]}
          onClick={() =>
            multiple ? handleOptionClickForMultiple(d) : handleOptionClickForSingle(d)
          }>
          {/*컨텐츠 영역*/}
          <div className={cn(showItemBorder && styles.line)}>
            {/* child 가 있으면 보여주고 아니면 일반 label 을 보여준다. */}
            {isValidElement(itemRenderer?.(d, i)) ? itemRenderer(d, i) : d[labelField]}
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
          </div>
          {/* draggable 버튼 */}
          {draggable && (
            <Button type="button" className={cn(styles.btn_drag, 'drag-handle')} onlyIcon>
              <IcoMenu01 width={24} height={24} fill="#A9AFB8" stroke="#8c97ae" />
            </Button>
          )}
        </li>
      ))}
    </ReactSortable>
  );
};

export const List = ListComponent;
