import React, { useState } from 'react';
import {
  closestCenter,
  DndContext,
  DragEndEvent,
  KeyboardSensor,
  MouseSensor,
  TouchSensor,
  useSensor,
  useSensors,
} from '@dnd-kit/core';
import {
  arrayMove,
  SortableContext,
  useSortable,
  verticalListSortingStrategy,
} from '@dnd-kit/sortable';
import { Table } from '@tanstack/react-table';
import { CSS } from '@dnd-kit/utilities';

import { Button } from '../../button/button';
import { Checkbox } from '../../checkbox/checkbox';
import { useModal } from '../../modal/modal.hook';
import { IcoSetting } from '@learnway/icons';
import {
  ModalBody,
  ModalContainer,
  ModalDescription,
  ModalFooter,
  ModalTitle,
} from '../../modal/modal-container';
import { useTranslation } from 'react-i18next';

export interface DragHandleProps {
  listeners?: import('@dnd-kit/core/dist/hooks/utilities').SyntheticListenerMap | undefined;
  attributes?: import('@dnd-kit/core').DraggableAttributes;
}

export interface ColumnSetting {
  id: string;
  header: string;
  isVisible: boolean;
}

export interface SortableItemProps {
  id: string;
  children: React.ReactNode;
}

export interface ColumnSettingsContentProps<T extends object> {
  onApply: (settings: ColumnSetting[]) => void;
  table: Table<T>;
}

export interface ColumnSettingsProps<T extends object> {
  table: Table<T>;
  onColumnChange?: (settings: ColumnSetting[]) => void;
}

const DragHandle: React.FC<DragHandleProps> = ({ listeners, attributes }) => (
  <span className="cursor-move px-2 text-gray-400" {...listeners} {...attributes}>
    ⋮⋮
  </span>
);

// 드래그앤 드랍이 가능한 개별 아이템
const SortableItem: React.FC<SortableItemProps> = ({ id, children }) => {
  //dnd-kit useSortable 훅을 사용해서 드래그앤드랍에 필요한 속성 갖고 옴
  const { attributes, listeners, setNodeRef, transform, transition } = useSortable({ id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  };

  return (
    <div ref={setNodeRef} style={style}>
      <div className="flex items-center gap-3 rounded-lg border bg-white p-3">
        <DragHandle listeners={listeners} attributes={attributes} />
        {children}
      </div>
    </div>
  );
};

// 컬럼 설정 - 모달 팝업 안에 들어갈 내용
function ColumnSettingsContent<T extends object>({
  table,
  onApply,
}: {
  table: Table<T>;
  onApply: (settings: ColumnSetting[]) => void;
}) {
  const { close: closeModal } = useModal();
  const leafColumns = table.getAllLeafColumns().filter((col) => col.id !== 'select'); //체크박스 컬럼 제외
  const { t } = useTranslation();
  console.log(leafColumns);

  // 컬럼 순서 상태 초기화
  const [columnOrder, setColumnOrder] = useState<string[]>(() => leafColumns.map((col) => col.id));

  // 컬럼 표시/숨김 상태 초기화
  const [columnVisibility, setColumnVisibility] = useState<Record<string, boolean>>(() =>
    leafColumns.reduce(
      (acc, col) => {
        acc[col.id] = col.getIsVisible();
        return acc;
      },
      {} as Record<string, boolean>,
    ),
  );

  // DnD 센서 설정
  const sensors = useSensors(
    useSensor(MouseSensor, {
      // 마우스 센서 활성화 되려면 최소 10픽셀 움직여야됨.
      activationConstraint: {
        distance: 10,
      },
    }),
    useSensor(TouchSensor, {}),
    useSensor(KeyboardSensor, {}),
  );

  // 전체 선택/해제
  const handleToggleAll = (checked: boolean) => {
    setColumnVisibility(Object.fromEntries(leafColumns.map((col) => [col.id, checked])));
  };

  // DnD 처리
  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;
    if (active && over && active.id !== over.id) {
      setColumnOrder((order) => {
        const oldIndex = order.indexOf(active.id as string);
        const newIndex = order.indexOf(over.id as string);
        return arrayMove(order, oldIndex, newIndex);
      });
    }
  };

  // 개별 컬럼 visibility 토글
  const handleVisibilityChange = (columnId: string, checked: boolean) => {
    setColumnVisibility((prev) => ({
      ...prev,
      [columnId]: checked,
    }));
  };

  // 설정 적용
  const handleApply = () => {
    const settings = columnOrder.map((columnId) => {
      const column = leafColumns.find((col) => col.id === columnId);
      return {
        id: columnId,
        header: (column?.columnDef.header as string) ?? columnId,
        isVisible: columnVisibility[columnId],
      };
    });

    onApply(settings);
    closeModal();
  };

  return (
    <ModalContainer>
      <ModalTitle>{t('Modal Title')}</ModalTitle>
      {/* <ModalDescription>{t('Modal Description')}</ModalDescription> */}
      <ModalBody>
        {/* <div className="space-y-4"> */}
        {/* <div className="flex items-center gap-2 border-b p-2"> */}
        <label className="flex cursor-pointer items-center gap-2">
          <Checkbox
            id="select-all"
            size="md"
            checked={leafColumns.every((col) => columnVisibility[col.id])}
            onCheckedChange={(checked) => handleToggleAll(!!checked)}
          />
          <span className="text-[1.8rem] font-medium">전체 선택</span>
        </label>
        {/* </div> */}

        <DndContext sensors={sensors} collisionDetection={closestCenter} onDragEnd={handleDragEnd}>
          <SortableContext items={columnOrder} strategy={verticalListSortingStrategy}>
            <div className="space-y-2">
              {columnOrder.map((columnId) => {
                const column = leafColumns.find((col) => col.id === columnId);
                if (!column) return null;

                return (
                  <SortableItem key={columnId} id={columnId}>
                    <div
                      className="flex flex-1 items-center gap-2"
                      onClick={(e) => e.stopPropagation()}>
                      <Checkbox
                        id={columnId}
                        size="md"
                        checked={columnVisibility[columnId]}
                        onCheckedChange={(checked) => handleVisibilityChange(columnId, !!checked)}
                      />
                      <label htmlFor={columnId} className="flex-1 cursor-pointer">
                        {column.id}
                      </label>
                    </div>
                  </SortableItem>
                );
              })}
            </div>
          </SortableContext>
        </DndContext>
      </ModalBody>
      <ModalFooter>
        {/* <div className="flex justify-center"> */}
        <Button variant="gray" size="lg" onClick={closeModal}>
          취소
        </Button>
        <Button variant="primary" size="lg" onClick={handleApply}>
          적용
        </Button>
        {/* </div> */}
        {/* </div> */}
      </ModalFooter>
    </ModalContainer>
  );
}

function ColumnSettings<T extends object>({
  onColumnChange,
  table,
}: ColumnSettingsProps<T>): JSX.Element {
  const { open } = useModal();

  const handleOpenSettings = () => {
    const handleApply =
      onColumnChange ??
      (() => {
        return;
      });

    open({
      content: <ColumnSettingsContent<T> onApply={handleApply} table={table} />,
      width: 'md',
    });
  };

  return (
    <Button variant="outline" size="sm" className="btn_setting" onClick={handleOpenSettings}>
      <IcoSetting width={16} height={16} stroke="#131C30" />
      항목설정
    </Button>
  );
}

export default ColumnSettings;
