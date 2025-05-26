import { useEffect, useState } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { useRouter } from '@tanstack/react-router';

import { useModal } from '@learnway/ui';
import { useCurrentRoute } from '@learnway/hooks';

import { widgetsQueryOptions, mutateOptions } from './widgets.queries';

const useWidgetsHook = () => {
  const { state } = useCurrentRoute();
  const [processType, setProcessType] = useState('LOADING');
  const queryClient = useQueryClient();
  const [messageId, setMessageId] = useState();
  const { alert: openAlert } = useModal();

  const handleGetWidget = async (widgetCode: string) => {
    setProcessType('LOADING');
    return await queryClient
      .fetchQuery(widgetsQueryOptions.get(widgetCode))
      .then((response: any) => {
        setProcessType('VIEW');
        return response;
      });
  };

  useEffect(() => {
    const query = state.widgetCode;
  }, []);

  return {
    widgetCode: state.widgetCode,
    getWidget: handleGetWidget,
    processType,
  };
};

export const useWidgets = useWidgetsHook;

export function useAllTenantWidget(tenantId: number) {
  return useQuery(widgetsQueryOptions.allTenantWidget(tenantId));
}

export function useCreateTenantWidget(options: any) {
  const mutation = useMutation({
    ...mutateOptions.createTenant(),
    ...options,
  });

  return {
    createTenantWidget: (payload: any, callback?: any) => {
      mutation.mutate(payload, callback);
    },
    isSuccess: mutation.isSuccess,
    isError: mutation.isError,
    data: mutation.data,
  };
}

export function useMoveTenantWidget(options: any) {
  const mutation = useMutation({
    ...mutateOptions.moveTenantWidget(),
    ...options,
  });

  return {
    moveTenantWidget: (payload: any, callback?: any) => {
      mutation.mutate(payload, callback);
    },
    isSuccess: mutation.isSuccess,
    isError: mutation.isError,
    data: mutation.data,
  };
}

export function useUpdateTenantWidget(options: any) {
  const mutation = useMutation({
    ...mutateOptions.updateTenantWidget(),
    ...options,
  });

  return {
    updateTenantWidget: (payload: any, callback?: any) => {
      mutation.mutate(payload, callback);
    },
    isSuccess: mutation.isSuccess,
    isError: mutation.isError,
    data: mutation.data,
  };
}
