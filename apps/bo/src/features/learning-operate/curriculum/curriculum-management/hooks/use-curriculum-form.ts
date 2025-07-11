import { useCallback } from 'react';
import { useDynamicForm2 } from '@learnway/hooks';
import { NODE_TYPE, CurriculumFormData, ModuleFormData, LessonFormData } from '../types/form.types';

interface UseCurriculumFormProps {
  onSuccess?: (data: any, nodeType: NODE_TYPE) => void;
  onError?: (error: any) => void;
}

export const useCurriculumForm = ({ onSuccess, onError }: UseCurriculumFormProps) => {
  const { provider, getValues, updateFormData, onSubmit, formState, watch } = useDynamicForm2();

  // const submitForm = useCallback(
  //   async (data: any, nodeType: NODE_TYPE) => {
  //     try {
  //       let result;
  //       switch (nodeType) {
  //         case NODE_TYPE.CURRICULUM:
  //           result = await createCurriculum(data as CurriculumFormData);
  //           break;
  //         case NODE_TYPE.MODULE:
  //           result = await createModule(data as ModuleFormData);
  //           break;
  //         case NODE_TYPE.LESSON:
  //           result = await createLesson(data as LessonFormData);
  //           break;
  //         default:
  //           throw new Error('Invalid form type');
  //       }
  //       onSuccess?.(result, nodeType);
  //       return result;
  //     } catch (error) {
  //       onError?.(error);
  //       throw error;
  //     }
  //   },
  //   [onSuccess, onError],
  // );

  return {
    provider,
    getValues,
    updateFormData,

    onSubmit,
    formState,
    watch,
  };
};
