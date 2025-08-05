import { useModal } from '@learnway/ui/modal';
import { useMutation, useQuery } from '@tanstack/react-query';
import { MultilingualUpdateReqParams } from '../model/multilingual.types';
import { mutateOptions, translationQueryOptions as queryOptions } from './translation.queries';

const useTranslationHook = (options?: any) => {
  const { alert: openAlert } = useModal();

  const { mutate: updateMutate } = useMutation({
    ...mutateOptions.update(),
    onSuccess: async (data, variables, context) => {
      console.log('data => ', data);
      openAlert({
        content: '정상적으로 수정되었습니다.',
        type: 'complete',
      });
      if (options?.onSuccess) {
        options.onSuccess(data, variables, context);
      }
    },
  });

  const { mutate: createByExcelMutate } = useMutation({
    ...mutateOptions.createByExcel(),
    onSuccess: async (data: any, variables, context) => {
      console.log('data => ', data);
      if (options?.onSuccess) {
        options.onSuccess(data, variables, context);
      }
    },
  });

  const handleUpdate = (modifyData: MultilingualUpdateReqParams) => {
    updateMutate(modifyData);
  };

  const handleCreateByExcel = (saveData: any) => {
    createByExcelMutate(saveData);
  };

  return {
    update: handleUpdate,
    createByExcel: handleCreateByExcel,
  };
};

export const useTranslation = useTranslationHook;

export function useTranslationStatus(multilingualId: number) {
  return useQuery(queryOptions.getStatus(multilingualId));
}

export function useTranslationExists(keyTypeCode: string, messageCode: string) {
  return useQuery(queryOptions.checkExists(keyTypeCode, messageCode));
}

export function useDeployTranslation(options: any) {
  const mutation = useMutation({
    ...mutateOptions.deploy(),
    onSuccess: async (dataTagErrorSymbol, variables, context) => {
      if (options.onSuccess) {
        options.onSuccess(dataTagErrorSymbol, variables, context);
      }
    },
    ...options,
  });
  return {
    deploy: (payload: any, callback?: any) => {
      mutation.mutate(payload, callback);
    },
    isSuccess: mutation.isSuccess,
    isError: mutation.isError,
    data: mutation.data,
  };
}
