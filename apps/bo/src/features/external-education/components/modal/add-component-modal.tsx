import { useGetExternalEducationComponents } from '@entities/external-education';
import {
  DEFAULT_FIELD_CONFIG,
  FieldType,
} from '@features/external-education/types/form-field.types';
import { Button } from '@learnway/ui/button';
import { GridBox } from '@learnway/ui/grid';
import { ModalBody, ModalContainer, ModalFooter, ModalTitle, useModal } from '@learnway/ui/modal';
import { createColumnHelper } from '@tanstack/react-table';
import { useEffect, useState } from 'react';

export interface ApplicationItem {
  id: number;
  fieldKey: string;
  name: string;
  type: FieldType;
  isMandatory: boolean; // 필수 여부, COMMON 타입은 true로 설정
  order: number;
  externalCourseFormComponentType: 'OPTIONAL' | 'COMMON'; // 컴포넌트 타입
  componentType?: 'OPTIONAL' | 'COMMON';
}

interface ServerComponent {
  externalCourseFormComponentId: number;
  externalCourseFormComponentFieldKey: string;
}

interface ComponentGroup {
  type: 'OPTIONAL' | 'COMMON';
  componentList: ServerComponent[];
}

interface AddComponentModalProps {
  onAdd: (newComponents: ApplicationItem[], allSelectedComponents: ApplicationItem[]) => void;
  selectedItems: ApplicationItem[];
  type: any;
}

const AddComponentModalComponent = ({ onAdd, selectedItems, type }: AddComponentModalProps) => {
  // 컴포넌트 리스트 조회
  const { data: componentData } = useGetExternalEducationComponents({
    tenantId: 1, // TODO: 실제 테넌트 ID
    externalCourseFormEnrollType: type as any,
  });

  const [components, setComponents] = useState<ApplicationItem[]>([]);
  const [selectedRows, setSelectedRows] = useState<ApplicationItem[]>(selectedItems);
  const [tableInstance, setTableInstance] = useState<any>(null);
  const { closeModal } = useModal();

  useEffect(() => {
    if (componentData?.componentGroups) {
      const tmpComponents: ApplicationItem[] = [];

      componentData.componentGroups.forEach((group: ComponentGroup) => {
        group.componentList.forEach((component: ServerComponent) => {
          const applicationItem: ApplicationItem = {
            id: component.externalCourseFormComponentId,
            fieldKey: component.externalCourseFormComponentFieldKey,
            name: component.externalCourseFormComponentFieldKey, // TODO: 실제 이름으로 매핑
            type: 'input' as FieldType, // TODO: 실제 타입으로 매핑
            isMandatory: group.type === 'COMMON', // COMMON 타입은 필수
            order: 0, // 추가 시 설정됨
            externalCourseFormComponentType: group.type,
          };

          tmpComponents.push(applicationItem);
        });
      });

      setComponents(tmpComponents);
    }
  }, [componentData]);

  useEffect(() => {
    if (tableInstance && components.length > 0 && selectedItems.length > 0) {
      setTimeout(() => {
        const selectedIds = selectedItems.map((item) => item.id);
        const rowSelectionState: Record<string, boolean> = {};

        selectedIds.forEach((id) => {
          const rowIndex = components.findIndex((comp) => comp.id === id);
          if (rowIndex !== -1) {
            const rowId = `page_0_row_${rowIndex}`;
            rowSelectionState[rowId] = true;
          }
        });

        tableInstance.setRowSelection(rowSelectionState);

        // 선택된 행들의 데이터를 handleGridRowsSelect에 전달
        const preSelectedRows = components.filter((comp) => selectedIds.includes(comp.id));
        handleGridRowsSelect(preSelectedRows);
      }, 100);
    }
  }, [tableInstance, components, selectedItems]);

  const handleConfirm = () => {
    // 기존에 없던 새로운 항목들만 필터링
    const existingIds = selectedItems.map((item) => item.id);
    const newComponents = selectedRows.filter((row) => !existingIds.includes(row.id));

    // 새로운 컴포넌트와 전체 선택된 컴포넌트를 함께 전달
    onAdd(newComponents, selectedRows);

    closeModal();
  };

  const handleCancel = () => {
    closeModal();
  };

  const columnHelper = createColumnHelper<ApplicationItem>();
  const columns = [
    columnHelper.accessor('fieldKey', {
      cell: (info) => {
        const field = DEFAULT_FIELD_CONFIG[info.getValue()];
        return field?.label || '';
      },
      header: '항목명',
      size: 200,
    }),
  ];

  const handleGridRowsSelect = (rows: ApplicationItem[]) => {
    setSelectedRows([...rows]);
  };

  const handleTableInstanceChange = (table: any) => {
    setTableInstance(table);
  };

  return (
    <ModalContainer>
      <ModalTitle>신청 항목 추가</ModalTitle>
      <ModalBody>
        <GridBox
          columns={columns}
          multiple
          data={components}
          rowId="id"
          onRowsSelect={handleGridRowsSelect}
          onTableInstanceChange={handleTableInstanceChange}
          // selectedRowIds={selectedRows.map((row) => row.id.toString())}
        />
      </ModalBody>
      <ModalFooter>
        <Button variant={'primary'} size={'lg'} onClick={handleConfirm}>
          확인
        </Button>
      </ModalFooter>
    </ModalContainer>
  );
};

export { AddComponentModalComponent as AddComponentModal };
