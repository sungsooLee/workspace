import { MAPPING_CURRICULUM_TYPE } from '@entities/curriculum';
import { DynamicFormProvider } from '@learnway/hooks';
import React from 'react';
import { FormState } from '../types/form.types';
import { CurriculumForm } from './curriculum-form';
import { LessonForm } from './lesson-form';
import { ModuleForm } from './module-form';
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
        <CurriculumForm
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

      // 부모 모듈 ID 추출 (DnD 후 변경된 정보를 우선 사용)
      const moduleId =
        // 1. 현재 선택된 노드의 data.moduleId (DND 후 업데이트된 값)
        isEditing && selectedNode?.data?.moduleId
          ? selectedNode.data.moduleId
          : // 2. 현재 선택된 노드의 moduleId 속성
            isEditing && selectedNode?.moduleId
            ? selectedNode.moduleId
            : // 3. 부모 노드가 모듈인 경우 부모 노드의 ID
              isEditing && parentNode?.type === MAPPING_CURRICULUM_TYPE.MODULE
              ? typeof parentNode.id === 'string'
                ? parseInt(parentNode.id.replace('module-', ''))
                : parentNode.id
              : // 4. 선택된 노드의 parentId (모듈인 경우)
                isEditing && selectedNode?.parentId
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
          parentNode={parentNode}
        />
      );
    }
  }
};
