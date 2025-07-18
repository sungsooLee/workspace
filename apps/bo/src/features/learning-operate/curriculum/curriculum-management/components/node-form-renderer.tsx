import React from 'react';
import { DynamicFormProvider } from '@learnway/hooks';
import { FormState } from '../types/form.types';
import { CurriculumFormSimple } from './curriculum-form-simple';
import { MAPPING_CURRICULUM_TYPE } from '@types';
import { ModuleForm } from './module-form';
import { LessonForm } from './lesson-form';
interface NodeFormRendererProps {
  formState: FormState;
  onFormSubmit: (data: any) => void;
  onFormCancel: () => void;
  provider: DynamicFormProvider;
  updateFormData: (data: Record<string, any>) => void;
  watch: any;
  clearAllValidators?: () => void;
  curriculumData?: {
    tenantId?: number;
    channelUuid?: string;
    contentType?: string;
  };
}

export const NodeFormRenderer: React.FC<NodeFormRendererProps> = ({
  formState,
  onFormSubmit,
  onFormCancel,
  provider,
  updateFormData,
  watch,
  clearAllValidators,
  curriculumData,
}) => {
  const { activeFormType, selectedNode, parentNode, isEditing } = formState;

  switch (activeFormType) {
    case MAPPING_CURRICULUM_TYPE.CURRICULUM: {
      // selectedNode.id가 "curriculum-123" 형태이거나 숫자일 수 있으므로 처리
      const curriculumId =
        isEditing && selectedNode?.id
          ? typeof selectedNode.id === 'string'
            ? parseInt(selectedNode.id.replace('curriculum-', ''))
            : selectedNode.id
          : undefined;

      return (
        <CurriculumFormSimple
          key={`curriculum-${curriculumId || 'new'}-${isEditing ? 'edit' : 'create'}`}
          parentNode={parentNode}
          selectedNode={selectedNode}
          isEditing={isEditing}
          onSubmit={onFormSubmit}
          onCancel={onFormCancel}
          provider={provider}
          updateFormData={updateFormData}
          watch={watch}
          curriculumId={curriculumId}
        />
      );
    }

    case MAPPING_CURRICULUM_TYPE.MODULE: {
      // selectedNode.id가 "module-123" 형태이거나 숫자일 수 있으므로 처리
      const moduleId =
        isEditing && selectedNode && selectedNode.id
          ? typeof selectedNode.id === 'string'
            ? parseInt(selectedNode.id.replace('module-', ''))
            : selectedNode.id
          : undefined;

      return (
        <ModuleForm
          key={`module-${moduleId || 'new'}-${isEditing ? 'edit' : 'create'}`}
          provider={provider}
          updateFormData={updateFormData}
          watch={watch}
          isEditing={isEditing}
          moduleId={moduleId}
          curriculumData={curriculumData}
        />
      );
    }

    case MAPPING_CURRICULUM_TYPE.LESSON: {
      // selectedNode.id가 "lesson-123" 형태이거나 숫자일 수 있으므로 처리
      const lessonId =
        isEditing && selectedNode && selectedNode.id
          ? typeof selectedNode.id === 'string'
            ? parseInt(selectedNode.id.replace('lesson-', ''))
            : selectedNode.id
          : undefined;

      // 부모 모듈 ID 추출 (커리큘럼에 바로 붙어있는 레슨의 경우에는 선택한 노드에서 모듈ID 추출)
      const moduleId =
        isEditing && selectedNode?.moduleId
          ? selectedNode.moduleId
          : isEditing && selectedNode?.parentId
            ? typeof selectedNode.parentId === 'string'
              ? parseInt(selectedNode.parentId.toString().replace('module-', ''))
              : selectedNode.parentId
            : undefined;
      return (
        <LessonForm
          key={`lesson-${lessonId || 'new'}`}
          provider={provider}
          updateFormData={updateFormData}
          watch={watch}
          isEditing={isEditing}
          lessonId={lessonId}
          moduleId={moduleId}
          clearAllValidators={clearAllValidators}
          curriculumData={curriculumData}
        />
      );
    }
  }
};
