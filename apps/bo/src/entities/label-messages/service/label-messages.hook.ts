import { useRouter } from '@tanstack/react-router';
import { useEffect, useState } from 'react';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { mutateOptions, queryOptions } from './label-messages.queries';
import { useModal } from '@learnway/ui';
import { LabelMessage } from '@types';

const useTranslationHook = () => {
  const router = useRouter();
  const queryClient = useQueryClient();
  const [processType, setProcessType] = useState('LOADING');
  const [messageId, setMessageId] = useState();
  const { alert: openAlert } = useModal();

  const { mutate: saveMutate } = useMutation({
    ...mutateOptions.create(),
    onSuccess: async (data: any, variables, context) => {
      openAlert({
        description: '정상적으로 저장되었습니다.',
        type: 'complete',
        onClose: () => {
          router.navigate({ to: '/platform/system/translation' });
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
          router.navigate({ to: '/platform/system/translation' });
        },
      });
    },
  });

  const handleGet = async (id: number) => {
    return await queryClient.fetchQuery(queryOptions.detail(id));
  };

  const handleSave = (payload: LabelMessage) => {
    saveMutate(payload);
  };
  const handleModify = (payload: LabelMessage) => {
    updateMutate(payload);
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
    get: handleGet,
    save: handleSave,
    update: handleModify,
    messageId,
    processType,
  };
};

export const useTranslation = useTranslationHook;
