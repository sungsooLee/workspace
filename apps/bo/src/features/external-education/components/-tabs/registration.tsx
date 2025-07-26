import { Button, FormSubTitle, RadioGroupFormField, TableBox, useModal } from '@learnway/ui';
import styles from '@learnway/styles/bo/pages/_layout/learning/test-detail.module.css';
import { createColumnHelper } from '@tanstack/react-table';
import { IcoPlus, IcoMinus } from '@learnway/icons';
import { useState, useContext, useEffect, useCallback } from 'react';
import { DndContext, DragEndEvent, closestCenter, MeasuringStrategy } from '@dnd-kit/core';
import { restrictToVerticalAxis } from '@dnd-kit/modifiers';
import { arrayMove } from '@dnd-kit/sortable';
import {
  AddComponentModal,
  ApplicationItem,
} from '@features/external-education/components/modal/add-component-modal';
import { DragHandleContext } from '@learnway/ui';
import {
  useGetRegistrationLayout,
  ExternalEducationService,
  useCreateExternalCourseLayout,
} from '@entities/external-education';
import { DEFAULT_FIELD_CONFIG } from '@features/external-education/types/form-field.types';
import { PreviewComponentModal } from '../modal/preview-component-modal';
import { FormPreviewModal } from '../modal/form-preview-modal';

// 드래그 핸들 컴포넌트 - DnD는 TableBox 내부에서 처리
const DragHandle = () => {
  const dragContext = useContext(DragHandleContext);
  const { listeners, attributes, setActivatorNodeRef } = dragContext || {};
  return (
    <div
      ref={setActivatorNodeRef}
      className="flex h-full w-full cursor-move items-center justify-center text-gray-400 hover:text-gray-600"
      {...attributes}
      {...listeners}
      onClick={(e) => e.stopPropagation()} // 드래그 핸들 클릭이 행 클릭으로 전파되지 않도록
    >
      <span className="text-lg">≡</span>
    </div>
  );
};

interface ApplicationItemsProps {
  formId?: number; // 등록 시에는 없을 수 있음
  onRegisterSave?: (saveFn: () => Promise<boolean>) => void;
}

export function Registration({ formId, onRegisterSave }: ApplicationItemsProps) {
  const { data: layoutList } = useGetRegistrationLayout({
    externalCourseFormId: formId || 0,
    externalCourseFormEnrollType: 'REGISTRATION' as any,
  });
  const { create: createExternalLayout } = useCreateExternalCourseLayout({});
  const [applicationItems, setApplicationItems] = useState<ApplicationItem[]>([]);
  const [selectedRows, setSelectedRows] = useState<ApplicationItem[]>([]);
  const { open: openModal } = useModal();

  useEffect(() => {
    if (layoutList && Array.isArray(layoutList)) {
      const transformedItems: ApplicationItem[] = layoutList.map((item: any, index: number) => ({
        id: item.externalCourseFormComponentId || index,
        fieldKey: item.externalCourseFormComponentFieldKey || '',
        name: item.name || item.externalCourseFormComponentFieldKey || 'Unknown',
        type: item.type || 'input',
        order: item.order || index + 1,
        isMandatory: item.isMandatory || false,
        externalCourseFormComponentType: item.externalCourseFormComponentType,
      }));
      setApplicationItems(transformedItems);
    }
  }, [layoutList]);

  // 폼 저장 함수
  const handleSave = useCallback(async (): Promise<boolean> => {
    try {
      const layouts = applicationItems.map((item) => ({
        externalCourseFormComponentId: item.id,
        isMandatory: item.isMandatory,
        sortOrder: item.order,
      }));
      const saveData = {
        externalCourseFormId: formId,
        externalCourseFormEnrollType: 'REGISTRATION',
        layouts,
      };

      if (formId && layouts.length > 0) {
        createExternalLayout(saveData, {
          onSuccess: () => {
            //
          },
        });
      }

      return true;
    } catch {
      return false;
    }
  }, [applicationItems, formId]);

  useEffect(() => {
    if (onRegisterSave) {
      onRegisterSave(handleSave);
    }
  }, [onRegisterSave, handleSave]);

  // 미리보기 모달 열기
  const handleOpenPreviewModal = (item: ApplicationItem) => {
    openModal(() => ({
      content: <PreviewComponentModal componentId={item.fieldKey} />,
    }));
  };

  // 전체 미리보기 모달 열기
  const handleOpenFormPreviewModal = () => {
    openModal(() => ({
      content: <FormPreviewModal applicationItems={applicationItems} />,
      width: 'xl',
    }));
  };

  const columnHelper = createColumnHelper<ApplicationItem>();

  const columns = [
    columnHelper.accessor('fieldKey', {
      header: '문항',
      cell: (info) => {
        const field = DEFAULT_FIELD_CONFIG[info.getValue()];
        return field.label;
      },
    }),
    columnHelper.accessor('type', {
      header: '미리보기',
      cell: (info) => {
        const rowData = info.row.original;
        return (
          <Button
            variant="text"
            size="sm"
            className="text-blue-600 underline"
            onClick={(e) => {
              e.stopPropagation(); // 미리보기 버튼 클릭이 행 클릭으로 전파되지 않도록
              handleOpenPreviewModal(rowData);
            }}
          >
            미리보기
          </Button>
        );
      },
    }),
    columnHelper.accessor('isMandatory', {
      header: '필수응답',
      cell: (info) => {
        const component = info.row.original;
        const isCommonType = component.externalCourseFormComponentType === 'COMMON';
        return (
          <RadioGroupFormField
            value={component.isMandatory}
            options={[
              { label: '필수', value: true },
              { label: '선택', value: false },
            ]}
            disabled={isCommonType}
            onChange={(value: any) => handleMandatoryChange(component.id, value as boolean)}
            onClick={(e: any) => e.stopPropagation()}
          />
        );
      },
    }),
    columnHelper.accessor('order', {
      header: '순서',
      cell: () => {
        return <DragHandle />;
      },
      size: 60,
    }),
  ];

  // 컴포넌트 추가 핸들러 - 여러 컴포넌트를 한번에 추가
  const handleAddComponents = (newComponents: ApplicationItem[]) => {
    setApplicationItems((prev) => {
      const maxOrder = prev.length > 0 ? Math.max(...prev.map((item) => item.order)) : 0;
      const componentsWithOrder = newComponents.map((component, index) => ({
        ...component,
        order: maxOrder + index + 1,
      }));
      return [...prev, ...componentsWithOrder];
    });
  };

  const handleDeleteSelected = () => {
    if (selectedRows.length > 0) {
      // 체크된 행들 삭제
      setApplicationItems((prev) => prev.filter((item) => !selectedRows.includes(item)));
    }
  };

  // 항목 추가 모달 열기
  const handleOpenAddModal = async () => {
    await openModal(() => ({
      content: (
        <AddComponentModal
          onAdd={handleAddComponents}
          selectedItems={applicationItems}
          type={'REGISTRATION'}
        />
      ),
    }));
  };

  const handleGridRowsSelect = (rows: ApplicationItem[]) => {
    setSelectedRows(rows);
  };

  // 필수응답 값 변경 핸들러
  const handleMandatoryChange = (itemId: number, isMandatory: boolean) => {
    setApplicationItems((prev) =>
      prev.map((item) => (item.id === itemId ? { ...item, isMandatory } : item)),
    );
  };

  return (
    <>
      <FormSubTitle label={'문항 정보'} />
      <div className={styles.table_wrap}>
        <DndContext
          collisionDetection={closestCenter}
          modifiers={[restrictToVerticalAxis]}
          measuring={{
            droppable: {
              strategy: MeasuringStrategy.Always,
            },
          }}
          onDragEnd={(event: DragEndEvent) => {
            const { active, over } = event;

            if (!over || active.id === over.id) {
              return;
            }

            const oldIndex = applicationItems.findIndex((item) => item.id === active.id);
            const newIndex = applicationItems.findIndex((item) => item.id === over.id);

            if (oldIndex !== -1 && newIndex !== -1) {
              // arrayMove를 사용하여 부드러운 재배열
              const reorderedItems = arrayMove(applicationItems, oldIndex, newIndex);

              // order 필드를 새로운 순서로 업데이트
              const updatedItems = reorderedItems.map((item, index) => ({
                ...item,
                order: index + 1,
              }));

              setApplicationItems(updatedItems);
            }
          }}
        >
          <TableBox
            data={applicationItems}
            columns={columns}
            multiple
            tableMode={true}
            title={'문항목록'}
            showNumberingColumn
            showTotalCount
            enableDragAndDrop={true}
            onRowsSelect={handleGridRowsSelect}
            rowId="id"
            customButtonNode={
              <>
                <Button
                  variant="secondary"
                  size="sm"
                  onClick={handleOpenFormPreviewModal}
                  disabled={applicationItems?.length === 0}
                >
                  전체 미리보기
                </Button>
                <Button
                  variant="text"
                  size="sm"
                  icon={<IcoPlus width={16} height={16} stroke="#131C30" />}
                  onClick={() => handleOpenAddModal()}
                >
                  추가
                </Button>
                <Button
                  variant="text"
                  size="sm"
                  icon={<IcoMinus width={16} height={16} stroke="#131C30" />}
                  onClick={handleDeleteSelected}
                  disabled={applicationItems?.length === 0}
                >
                  삭제
                </Button>
              </>
            }
          />
        </DndContext>
      </div>
    </>
  );
}
