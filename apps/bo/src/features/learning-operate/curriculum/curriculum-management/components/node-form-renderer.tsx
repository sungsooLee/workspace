import React from 'react';
import { AutoFormProvider, TreeNode } from '@learnway/ui';
import { FormState } from '../types/form.types';
import { CurriculumFormSimple } from './curriculum-form-simple';
import { MAPPING_CURRICULUM_TYPE } from '@types';
import { ModuleForm } from './module-form';
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
      ></div>
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
        <AutoFormProvider value={autoFormContext}>
          <ModuleForm watch={watch} />
        </AutoFormProvider>
      );

    case MAPPING_CURRICULUM_TYPE.LESSON:
      return <div style={{ padding: '20px' }}></div>;
  }
};
