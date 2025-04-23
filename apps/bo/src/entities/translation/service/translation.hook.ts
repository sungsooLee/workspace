import { useMutation } from '@tanstack/react-query';
import { mutateOptions } from './translation.queries';
import { useModal } from '@learnway/ui';

const useTranslationHook = () => {
  const { alert: openAlert } = useModal();
  const { mutate: saveMutate } = useMutation({
    ...mutateOptions.create(),
    onSuccess: async (data: any, variables, context) => {
      openAlert({
        content: '정상적으로 저장되었습니다.',
        type: 'complete',
      });
    },
  });

  const { mutate: updateMutate } = useMutation({
    ...mutateOptions.update(),
    onSuccess: async (data: any, variables, context) => {
      console.log('data => ', data);
      openAlert({
        content: '정상적으로 수정되었습니다.',
        type: 'complete',
      });
    },
  });

  const handleSave = (saveData: any) => {
    saveMutate(saveData);
  };
  const handleUpdate = (modifyData: any) => {
    updateMutate(modifyData);
  };

  return {
    save: handleSave,
    update: handleUpdate,
  };
};

export const useTranslation = useTranslationHook;
