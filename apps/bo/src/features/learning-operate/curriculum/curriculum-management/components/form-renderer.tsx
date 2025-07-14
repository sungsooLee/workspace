import React, { FormEventHandler } from 'react';
import { DynamicFormContextProvider } from '@learnway/hooks';
import { FormState, NODE_TYPE } from '../types/form.types';
import { CurriculumFormSimple } from './curriculum-form-simple';
import { ContentsRow } from '@shared/ui';

interface FormRendererProps {
  formState: FormState;
  formProvider: any;
  onFormSubmit: (data: any) => void;
  // onFormSubmit: (onValid: (data: Record<string, any>) => void) => FormEventHandler<HTMLFormElement>;
  onFormCancel: () => void;
}

export const FormRenderer: React.FC<FormRendererProps> = ({
  formState,
  formProvider,
  onFormSubmit,
  onFormCancel,
}) => {
  if (!formState.activeFormType) {
    return <ContentsRow>선택된 항목의 상세정보가 여기에 표시됩니다.</ContentsRow>;
  }

  return (
    // <DynamicFormContextProvider>
    //
    (() => {
      switch (formState.activeFormType) {
        case NODE_TYPE.CURRICULUM:
          return (
            <CurriculumFormSimple
              parentNode={formState.parentNode}
              selectedNode={formState.selectedNode}
              isEditing={formState.isEditing}
              provider={formProvider}
              onSubmit={onFormSubmit}
              onCancel={onFormCancel}
            />
          );
        // case NODE_TYPE.MODULE:
        //   return (
        //     <ModuleFormSimple
        //       parentNode={formState.parentNode}
        //       selectedNode={formState.selectedNode}
        //       isEditing={formState.isEditing}
        //       provider={formProvider}
        //       onSubmit={onFormSubmit}
        //       onCancel={onFormCancel}
        //     />
        //   );
        // case NODE_TYPE.LESSON:
        //   return (
        //     <LessonFormSimple
        //       parentNode={formState.parentNode}
        //       selectedNode={formState.selectedNode}
        //       isEditing={formState.isEditing}
        //       provider={formProvider}
        //       onSubmit={onFormSubmit}
        //       onCancel={onFormCancel}
        //     />
        //   );
        default:
          return <ContentsRow>선택된 항목의 상세정보가 여기에 표시됩니다.</ContentsRow>;
      }
    })()
    // </DynamicFormContextProvider>
  );
};
