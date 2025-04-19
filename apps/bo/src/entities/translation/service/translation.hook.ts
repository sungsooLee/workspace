import { useRouter } from '@tanstack/react-router';
import { useEffect, useState } from 'react';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { mutateOptions, translationQueryOptions } from './translation.queries';
import { useModal } from '@learnway/ui';

const useTranslationHook = () => {
  const router = useRouter();
  const [processType, setProcessType] = useState('LOADING');
  const queryClient = useQueryClient();
  const [messageId, setMessageId] = useState();
  const { alert: openAlert } = useModal();
  const { mutate: saveMutate } = useMutation({
    ...mutateOptions.create(),
    onSuccess: async (data: any, variables, context) => {
      openAlert({
        description: '정상적으로 저장되었습니다.',
        type: 'complete',
        onClose: () => {
          //router.navigate({ to: '/platform/system/translation' });
        },
      });
    },
  });

  const { mutate: updateMutate } = useMutation({
    ...mutateOptions.update(),
    onSuccess: async (data: any, variables, context) => {
      openAlert({
        description: '정상적으로 수정되었습니다.',
        type: 'complete',
        onClose: () => {
          //router.navigate({ to: '/platform/system/translation' });
        },
      });
    },
  });

  const handleSave = (saveData: any) => {
    saveMutate(saveData);
  };
  const handleModify = (modifyData: any) => {
    updateMutate(modifyData);
  };

  const handleGetTranslation = async (messageId: string) => {
    return await queryClient.fetchQuery(translationQueryOptions.get(messageId));
  };

  useEffect(() => {
    const query = router.state.location.search as any;
    console.log(query);
    if ('messageId' in query) {
      setMessageId(query['messageId']);
      setProcessType('MODIFY');
    } else {
      setProcessType('REGISTER');
    }
  }, []);
  return {
    messageId,
    save: handleSave,
    update: handleModify,
    getTranslation: handleGetTranslation,
    processType,
  };
};

export const useTranslation = useTranslationHook;
