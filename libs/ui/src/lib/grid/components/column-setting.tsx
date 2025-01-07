import React, { useState } from 'react';
import { Settings } from 'lucide-react';
import {
  DndContext,
  closestCenter,
  KeyboardSensor,
  useSensor,
  useSensors,
  DragEndEvent,
  MouseSensor,
  TouchSensor,
} from '@dnd-kit/core';
import {
  arrayMove,
  SortableContext,
  verticalListSortingStrategy,
  useSortable,
} from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import { useModalContext } from '../../modal/modal-context';
import { Button } from '../../shadcn/button';
import { useModalControl } from '../../modal/modal.hook';
import { ColumnSetting, ColumnSettingsProps, SortableItemProps } from '../types/column-settings';
import { Checkbox } from '../../shadcn/checkbox';
import { Table } from '@tanstack/react-table';

export interface DragHandleProps {
  listeners?: import('@dnd-kit/core/dist/hooks/utilities').SyntheticListenerMap | undefined;
  attributes?: import('@dnd-kit/core').DraggableAttributes;
}

const DragHandle: React.FC<DragHandleProps> = ({ listeners, attributes }) => (
  <span className="cursor-move text-gray-400 px-2" {...listeners} {...attributes}>
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
      <div className="flex items-center gap-3 p-3 bg-white border rounded-lg">
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
  const { closeModal } = useModalContext();
  const leafColumns = table.getAllLeafColumns();
  console.log(leafColumns);

  // 컬럼 순서 상태 초기화
  const [columnOrder, setColumnOrder] = useState<string[]>(() => leafColumns.map((col) => col.id));

  // 컬럼 표시/숨김 상태 초기화
  const [columnVisibility, setColumnVisibility] = useState<Record<string, boolean>>(() =>
    leafColumns.reduce((acc, col) => {
      acc[col.id] = col.getIsVisible();
      return acc;
    }, {} as Record<string, boolean>),
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
    <div className="space-y-4">
      <div className="flex items-center gap-2 p-2 border-b">
        <label className="flex items-center gap-2 cursor-pointer">
          <Checkbox
            id="select-all"
            checked={leafColumns.every((col) => columnVisibility[col.id])}
            onCheckedChange={(checked) => handleToggleAll(!!checked)}
          />
          <span className="text-sm font-medium">전체 선택</span>
        </label>
      </div>

      <DndContext sensors={sensors} collisionDetection={closestCenter} onDragEnd={handleDragEnd}>
        <SortableContext items={columnOrder} strategy={verticalListSortingStrategy}>
          <div className="space-y-2">
            {columnOrder.map((columnId) => {
              const column = leafColumns.find((col) => col.id === columnId);
              if (!column) return null;

              const header =
                typeof column.columnDef.header === 'function'
                  ? column.columnDef.header({} as any)
                  : (column.columnDef.header as string) ?? column.id;

              return (
                <SortableItem key={columnId} id={columnId}>
                  <div
                    className="flex items-center gap-2 flex-1"
                    onClick={(e) => e.stopPropagation()}>
                    <Checkbox
                      id={columnId}
                      checked={columnVisibility[columnId]}
                      onCheckedChange={(checked) => handleVisibilityChange(columnId, !!checked)}
                    />
                    <label htmlFor={columnId} className="flex-1 cursor-pointer">
                      {header}
                    </label>
                  </div>
                </SortableItem>
              );
            })}
          </div>
        </SortableContext>
      </DndContext>

      <div className="flex justify-end gap-2">
        <Button variant="outline" onClick={closeModal}>
          취소
        </Button>
        <Button onClick={handleApply}>적용</Button>
      </div>
    </div>
  );
}

function ColumnSettings<T extends object>({
  onColumnChange,
  table,
}: ColumnSettingsProps<T>): JSX.Element {
  const { open } = useModalControl();

  const handleOpenSettings = () => {
    const handleApply =
      onColumnChange ??
      (() => {
        return;
      });

    open(<ColumnSettingsContent<T> onApply={handleApply} table={table} />, {
      title: '컬럼 설정',
      width: 'md',
      height: 'auto',
    });
  };

  return (
    <Button variant="outline" size="sm" className="ml-auto" onClick={handleOpenSettings}>
      <Settings className="w-4 h-4 mr-2" />
      항목설정
    </Button>
  );
}

export default ColumnSettings;
