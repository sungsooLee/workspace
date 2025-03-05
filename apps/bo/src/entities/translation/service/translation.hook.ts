import { useRouter } from '@tanstack/react-router';
import { useState, useEffect } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import type { MutateOptions } from '@tanstack/react-query';
import { mutateOptions, translationQueryOptions } from './translation.queries';
import { Tenant } from '../../../types';

const useTranslationHook = () => {
  const router = useRouter();
  const [type, setType] = useState();
  const queryClient = useQueryClient();

  const { mutate, isSuccess, isError } = useMutation({
    ...mutateOptions.create(),
    onSuccess: async (data: any, variables, context) => {
      // 공통 메세지 처리 등...
      console.log('success');
    },
  });

  const handleSave = (saveData: any) => {
    mutate(saveData);
  };
  const handleModify = (modifyData: any) => {
    console.log('modify');
  };

  const handleGetTranslation = async () => {
    return await queryClient.fetchQuery(translationQueryOptions.get('1'));
  };

  return {
    save: handleSave,
    update: handleModify,
    getTranslation: handleGetTranslation,
  };
};

export const useTranslation = useTranslationHook;
