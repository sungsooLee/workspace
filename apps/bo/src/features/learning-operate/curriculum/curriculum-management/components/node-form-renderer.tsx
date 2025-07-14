import React from 'react';
import { AutoFormProvider, TreeNode } from '@learnway/ui';
import { FormState } from '../types/form.types';
import { CurriculumFormSimple } from './curriculum-form-simple';
import { MAPPING_CURRICULUM_TYPE } from '@types';
// import { ModuleFormSimple } from './module-form-simple';    // 추후 생성
// import { LessonFormSimple } from './lesson-form-simple';    // 추후 생성

interface NodeFormRendererProps {
  formState: FormState;
  onFormSubmit: (data: any) => void;
  onFormCancel: () => void;
  autoFormContext: any;
  setValue: any;
  watch: any;
  loadFormData: (data: Record<string, any>, options?: any) => void;
  selectedNodeData?: any;
  isLoading?: boolean;
}

/**
 * 선택된 노드 타입에 따라 적절한 폼 컴포넌트를 렌더링
 */
export const NodeFormRenderer: React.FC<NodeFormRendererProps> = ({
  formState,
  onFormSubmit,
  onFormCancel,
  autoFormContext,
  setValue,
  watch,
  loadFormData,
  selectedNodeData,
  isLoading,
}) => {
  const { activeFormType, selectedNode, parentNode, isEditing } = formState;

  if (!activeFormType) {
    return (
      <div
        style={{
          padding: '40px',
          textAlign: 'center',
        }}
      >
        <p></p>
      </div>
    );
  }

  if (isLoading) {
    return (
      <div
        style={{
          padding: '40px',
          textAlign: 'center',
        }}
      >
        <p>데이터를 불러오는 중...</p>
      </div>
    );
  }

  // 노드 타입별 폼 렌더링
  switch (activeFormType) {
    case MAPPING_CURRICULUM_TYPE.CURRICULUM:
      return (
        <AutoFormProvider value={autoFormContext}>
          <CurriculumFormSimple
            parentNode={parentNode}
            selectedNode={selectedNode}
            isEditing={isEditing}
            onSubmit={onFormSubmit}
            onCancel={onFormCancel}
            watch={watch}
            setValue={setValue}
            loadFormData={loadFormData}
            initialData={selectedNodeData}
          />
        </AutoFormProvider>
      );

    case MAPPING_CURRICULUM_TYPE.MODULE:
      return (
        <div style={{ padding: '20px' }}>
          <h3>모듈 폼 (추후 구현)</h3>
          <p>선택된 노드: {selectedNode?.name}</p>
          <p>부모 노드: {parentNode?.name}</p>
          <p>편집 모드: {isEditing ? '수정' : '생성'}</p>
          {selectedNodeData && <pre>{JSON.stringify(selectedNodeData, null, 2)}</pre>}
        </div>
      );

    case MAPPING_CURRICULUM_TYPE.LESSON:
      return (
        <div style={{ padding: '20px' }}>
          <h3>레슨 폼 (추후 구현)</h3>
          <p>선택된 노드: {selectedNode?.name}</p>
          <p>부모 노드: {parentNode?.name}</p>
          <p>편집 모드: {isEditing ? '수정' : '생성'}</p>
          {selectedNodeData && <pre>{JSON.stringify(selectedNodeData, null, 2)}</pre>}
        </div>
      );

    default:
      return (
        <div
          style={{
            padding: '20px',
            color: '#f00',
          }}
        >
          <p>지원하지 않는 노드 타입: {activeFormType}</p>
        </div>
      );
  }
};
