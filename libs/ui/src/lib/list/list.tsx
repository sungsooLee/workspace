import { addOrRemoveItemByKey, cn, getMatchingItemsByKey } from '@learnway/shared';

import styles from './list.module.css';
import React, { isValidElement, ReactElement } from 'react';
import { CommonReactElementProps } from '@/libs/ui/src';
import { Button } from '../button/button';
import { closestCenter, DndContext, DragEndEvent } from '@dnd-kit/core';
import {
  arrayMove,
  SortableContext,
  useSortable,
  verticalListSortingStrategy,
} from '@dnd-kit/sortable';
import { IcoDelete03, IcoMenu01 } from '@learnway/icons';

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
   * 드래그 앤 드롭이 끝났을 때 실행되는 함수
   */
  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;

    // 만약 드래그 대상이 없거나 위치 변경이 없으면 아무 작업도 수행하지 않음
    if (!over || active.id === over.id) return;

    /**
     * 옵션 목록을 재정렬하는 함수
     * @param options 기존 옵션 배열
     * @param valueField 옵션 객체에서 ID 값을 참조하는 필드명
     * @param activeId 현재 드래그 중인 요소의 ID
     * @param overId 드롭된 위치의 요소 ID
     * @returns 새로운 순서의 옵션 배열
     */
    const reorderOptions = (
      options: any[],
      valueField: string,
      activeId: string,
      overId: string,
    ) => {
      const oldIndex = options.findIndex((option) => option[valueField] === activeId);
      const newIndex = options.findIndex((option) => option[valueField] === overId);
      return arrayMove(options, oldIndex, newIndex);
    };
    // 새로운 순서로 옵션을 정렬
    const newOptions = reorderOptions(options, valueField, active.id as string, over.id as string);
    // 정렬된 옵션을 부모 컴포넌트에 전달
    onOptionsOrderChange?.(newOptions);
  };

  return (
    <DndContext collisionDetection={closestCenter} onDragEnd={handleDragEnd}>
      <SortableContext
        items={options.map((item) => item[valueField])}
        strategy={verticalListSortingStrategy}
      >
        <ul
          className={cn(
            className,
            'nlp--list',
            styles.start,
            hideBorder && styles.border_none,
            showItemBorder && styles.type_full,
          )}
        >
          {options?.map((d: any, i: number) => (
            <SortableItem
              class={cn(styles.line)}
              key={d[valueField]}
              id={d[valueField]}
              isSelected={
                !disabledActive &&
                selectedOptions?.find((x: any) => x[valueField] === d[valueField])
              }
              data={d}
              item={d}
              index={i}
              itemRenderer={itemRenderer}
              deletable={deletable}
              draggable={draggable}
              onOptionDeleteClick={onOptionDeleteClick}
              onClick={() =>
                multiple ? handleOptionClickForMultiple(d) : handleOptionClickForSingle(d)
              }
            />
          ))}
        </ul>
      </SortableContext>
    </DndContext>
  );
};

const SortableItem = ({
  item,
  id,
  index,
  onDelete,
  onClick,
  showItemBorder,
  deletable,
  draggable,
  itemRenderer,
  isSelected,
}: any) => {
  const { setNodeRef, transform, transition, listeners, attributes, isDragging } = useSortable({
    id,
  });

  const style = {
    transform: transform ? `translate3d(${transform.x}px, ${transform.y}px, 0)` : undefined,
    transition,
    opacity: isDragging ? 0.5 : 1, // 드래그 중 투명도 조절
    boxShadow: isDragging ? '0px 5px 10px rgba(0, 0, 0, 0.2)' : 'none', // 드래그 중 그림자 추가
  };

  return (
    <li
      ref={setNodeRef}
      style={style}
      className={cn(
        styles.item,
        isSelected && styles.active, // selected row style
      )}
      onClick={onClick}
    >
      <div className={cn(showItemBorder && styles.line)}>
        {isValidElement(itemRenderer?.(item, index)) ? itemRenderer(item, index) : item.label}
        {deletable && (
          <Button type="button" className={cn(styles.clear)} onlyIcon onClick={onDelete}>
            <IcoDelete03 width={20} height={20} fill="#A9AFB8" stroke="#ffffff" />
          </Button>
        )}
      </div>
      {draggable && (
        <Button
          type="button"
          className={cn(styles.btn_drag)}
          onlyIcon
          {...attributes}
          {...listeners}
        >
          <IcoMenu01 width={24} height={24} fill="#A9AFB8" stroke="#8c97ae" />
        </Button>
      )}
    </li>
  );
};

export const List = ListComponent;
